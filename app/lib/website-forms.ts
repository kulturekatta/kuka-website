import { createHash } from "node:crypto";
import { Resend } from "resend";

export type WebsiteFormField = {
  label: string;
  value: string | string[];
};

type WebsiteFormSubmission = {
  formName: string;
  internalSubject: string;
  submitterName: string;
  submitterEmail: string;
  acknowledgementMessage: string;
  fields: WebsiteFormField[];
  sourceTag: string;
};

type WebsiteFormConfig = {
  apiKey: string;
  recipientEmail: string;
  senderEmail: string;
  publicContactEmail: string;
};

type SendWebsiteFormResult = {
  internalEmailId: string;
  acknowledgementEmailId: string | null;
};

type RateLimitEntry = {
  count: number;
  windowStartedAt: number;
};

type GlobalFormState = typeof globalThis & {
  __kukaFormRateLimits?: Map<string, RateLimitEntry>;
};

const globalFormState = globalThis as GlobalFormState;

export function cleanText(value: unknown, maxLength = 500): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\0/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

export function cleanEmail(value: unknown): string {
  return cleanText(value, 160).toLowerCase();
}

export function cleanList(value: unknown, maxItems = 20): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => cleanText(item, 160))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function hasValidConsent(value: unknown): boolean {
  return value === true;
}

export function isHoneypotTriggered(value: unknown): boolean {
  return Boolean(cleanText(value, 250));
}


export function isRateLimited(
  request: Request,
  bucket: string,
  limit = 8,
  windowMs = 10 * 60 * 1000,
): boolean {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  const realIp = request.headers.get("x-real-ip");
  const clientIdentifier = cleanText(forwardedFor || realIp, 120);

  if (!clientIdentifier) {
    return false;
  }

  if (!globalFormState.__kukaFormRateLimits) {
    globalFormState.__kukaFormRateLimits = new Map<string, RateLimitEntry>();
  }

  const now = Date.now();
  const key = createHash("sha256")
    .update(`${bucket}|${clientIdentifier}`)
    .digest("hex");
  const current = globalFormState.__kukaFormRateLimits.get(key);

  if (!current || now - current.windowStartedAt > windowMs) {
    globalFormState.__kukaFormRateLimits.set(key, {
      count: 1,
      windowStartedAt: now,
    });
    return false;
  }

  current.count += 1;
  globalFormState.__kukaFormRateLimits.set(key, current);
  return current.count > limit;
}

export function isSubmissionTooFast(value: unknown): boolean {
  const startedAt = Number(value);

  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return false;
  }

  return Date.now() - startedAt < 1_000;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeFieldValue(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not provided";
  }

  return value || "Not provided";
}

function emailRow(field: WebsiteFormField): string {
  const value = normalizeFieldValue(field.value);

  return `
    <tr>
      <td
        style="
          width: 34%;
          padding: 11px 14px;
          border-bottom: 1px solid #ece7df;
          vertical-align: top;
          font-size: 13px;
          font-weight: 700;
          color: #4b4038;
        "
      >
        ${escapeHtml(field.label)}
      </td>
      <td
        style="
          padding: 11px 14px;
          border-bottom: 1px solid #ece7df;
          vertical-align: top;
          font-size: 14px;
          line-height: 1.6;
          color: #201d1b;
          white-space: pre-wrap;
        "
      >
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function getConfig(): WebsiteFormConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const recipientEmail =
    process.env.WEBSITE_FORMS_TO_EMAIL?.trim() ||
    process.env.ORGANIZATION_INQUIRY_TO_EMAIL?.trim() ||
    "";
  const senderEmail =
    process.env.WEBSITE_FORMS_FROM_EMAIL?.trim() ||
    process.env.ORGANIZATION_INQUIRY_FROM_EMAIL?.trim() ||
    "";
  const publicContactEmail =
    process.env.PUBLIC_CONTACT_EMAIL?.trim() ||
    "hey@kulturekatta.com";

  if (!apiKey || !recipientEmail || !senderEmail) {
    throw new Error("FORM_CONFIGURATION_MISSING");
  }

  if (!isValidEmail(recipientEmail)) {
    throw new Error("FORM_RECIPIENT_INVALID");
  }

  if (!isValidEmail(publicContactEmail)) {
    throw new Error("PUBLIC_CONTACT_INVALID");
  }

  return {
    apiKey,
    recipientEmail,
    senderEmail,
    publicContactEmail,
  };
}

function buildInternalEmailHtml(
  submission: WebsiteFormSubmission,
  submittedAt: string,
): string {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(submission.formName)}</title>
      </head>
      <body style="margin:0;padding:0;background:#f7f3ed;font-family:Arial,Helvetica,sans-serif;color:#201d1b;">
        <div style="padding:30px 14px;">
          <div style="max-width:760px;margin:0 auto;overflow:hidden;border:1px solid #e4ddd4;border-radius:22px;background:#ffffff;">
            <div style="padding:28px 28px 24px;background:#201d1b;color:#ffffff;">
              <div style="margin-bottom:8px;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;opacity:0.72;">
                KultureKatta website
              </div>
              <h1 style="margin:0;font-size:28px;line-height:1.2;">
                ${escapeHtml(submission.formName)}
              </h1>
              <p style="margin:10px 0 0;font-size:14px;line-height:1.6;opacity:0.8;">
                Submitted by ${escapeHtml(submission.submitterName)}
              </p>
            </div>
            <div style="padding:26px 22px 30px;">
              <div style="margin-bottom:22px;padding:15px 17px;border-radius:14px;background:#f7f3ed;font-size:13px;line-height:1.6;color:#4b4038;">
                Submitted on ${escapeHtml(submittedAt)}
              </div>
              <table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid #ece7df;">
                ${submission.fields.map(emailRow).join("")}
              </table>
              <p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:#746a62;">
                Reply directly to this email to contact ${escapeHtml(submission.submitterName)} at ${escapeHtml(submission.submitterEmail)}.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildInternalEmailText(
  submission: WebsiteFormSubmission,
  submittedAt: string,
): string {
  const rows = submission.fields
    .map(
      (field) =>
        `${field.label}: ${normalizeFieldValue(field.value)}`,
    )
    .join("\n\n");

  return `${submission.formName.toUpperCase()}
KultureKatta Website

Submitted: ${submittedAt}

${rows}`;
}

function hasFieldValue(field: WebsiteFormField): boolean {
  if (Array.isArray(field.value)) {
    return field.value.length > 0;
  }

  return Boolean(field.value.trim());
}

function getAcknowledgementFields(
  submission: WebsiteFormSubmission,
): WebsiteFormField[] {
  return submission.fields.filter(
    (field) =>
      field.label.toLowerCase() !== "source page" && hasFieldValue(field),
  );
}

function buildAcknowledgementHtml(
  submission: WebsiteFormSubmission,
  publicContactEmail: string,
  submittedAt: string,
): string {
  const acknowledgementFields = getAcknowledgementFields(submission);

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>We received your message</title>
      </head>
      <body style="margin:0;padding:0;background:#f7f3ed;font-family:Arial,Helvetica,sans-serif;color:#201d1b;">
        <div style="padding:30px 14px;">
          <div style="max-width:680px;margin:0 auto;overflow:hidden;border:1px solid #e4ddd4;border-radius:22px;background:#ffffff;">
            <div style="padding:28px;background:#201d1b;color:#ffffff;">
              <div style="font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#f6a44c;">
                KultureKatta
              </div>
              <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">
                We received your message.
              </h1>
            </div>
            <div style="padding:28px;">
              <p style="margin:0;font-size:16px;line-height:1.7;">
                Hello ${escapeHtml(submission.submitterName)},
              </p>
              <p style="margin:18px 0 0;font-size:16px;line-height:1.7;">
                ${escapeHtml(submission.acknowledgementMessage)}
              </p>
              <p style="margin:18px 0 0;font-size:16px;line-height:1.7;">
                We will respond using the contact details you provided. For anything urgent, reply to this email or write to ${escapeHtml(publicContactEmail)}.
              </p>

              <div style="margin:26px 0 14px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#7a4a23;">
                Copy of your submission
              </div>
              <div style="margin-bottom:16px;padding:13px 15px;border-radius:12px;background:#f7f3ed;font-size:13px;line-height:1.6;color:#4b4038;">
                Submitted on ${escapeHtml(submittedAt)}
              </div>
              <table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid #ece7df;">
                ${acknowledgementFields.map(emailRow).join("")}
              </table>

              <p style="margin:26px 0 0;font-size:15px;line-height:1.7;color:#5f554d;">
                Warmly,<br />
                Team KultureKatta<br />
                <span style="font-size:13px;">Come. Hang. Play. Learn.</span>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildAcknowledgementText(
  submission: WebsiteFormSubmission,
  publicContactEmail: string,
  submittedAt: string,
): string {
  const submissionCopy = getAcknowledgementFields(submission)
    .map(
      (field) =>
        `${field.label}: ${normalizeFieldValue(field.value)}`,
    )
    .join("\n\n");

  return `Hello ${submission.submitterName},

${submission.acknowledgementMessage}

We will respond using the contact details you provided. For anything urgent, reply to this email or write to ${publicContactEmail}.

COPY OF YOUR SUBMISSION
Submitted on ${submittedAt}

${submissionCopy}

Warmly,
Team KultureKatta
Come. Hang. Play. Learn.`;
}

export async function sendWebsiteForm(
  submission: WebsiteFormSubmission,
): Promise<SendWebsiteFormResult> {
  const config = getConfig();
  const resend = new Resend(config.apiKey);
  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const internalResult = await resend.emails.send({
    from: config.senderEmail,
    to: [config.recipientEmail],
    replyTo: submission.submitterEmail,
    subject: submission.internalSubject,
    html: buildInternalEmailHtml(submission, submittedAt),
    text: buildInternalEmailText(submission, submittedAt),
    tags: [
      {
        name: "source",
        value: submission.sourceTag,
      },
    ],
  });

  if (internalResult.error || !internalResult.data?.id) {
    console.error("[website-forms] Internal email failed:", {
      formName: submission.formName,
      error: internalResult.error,
      data: internalResult.data,
    });

    throw new Error("INTERNAL_EMAIL_FAILED");
  }

  const acknowledgementResult = await resend.emails.send({
    from: config.senderEmail,
    to: [submission.submitterEmail],
    replyTo: config.publicContactEmail,
    subject: "We received your message — KultureKatta",
    html: buildAcknowledgementHtml(
      submission,
      config.publicContactEmail,
      submittedAt,
    ),
    text: buildAcknowledgementText(
      submission,
      config.publicContactEmail,
      submittedAt,
    ),
    tags: [
      {
        name: "source",
        value: `${submission.sourceTag}_ack`,
      },
    ],
  });

  if (acknowledgementResult.error || !acknowledgementResult.data?.id) {
    console.error("[website-forms] Acknowledgement email failed:", {
      formName: submission.formName,
      error: acknowledgementResult.error,
      data: acknowledgementResult.data,
    });
  }

  return {
    internalEmailId: internalResult.data.id,
    acknowledgementEmailId:
      acknowledgementResult.data?.id ?? null,
  };
}
