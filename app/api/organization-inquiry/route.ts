import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type OrganizationInquiryBody = {
  inquiryType?: unknown;

  fullName?: unknown;
  designation?: unknown;
  workEmail?: unknown;
  phone?: unknown;

  organizationName?: unknown;
  organizationType?: unknown;
  organizationWebsite?: unknown;

  city?: unknown;
  experienceGoal?: unknown;
  participantCount?: unknown;
  participantProfile?: unknown;
  preferredTimeline?: unknown;
  experienceFormat?: unknown;

  interests?: unknown;
  budget?: unknown;
  details?: unknown;
  referralSource?: unknown;

  captcha?: unknown;
  consent?: unknown;

  /*
   * Hidden honeypot field.
   * Genuine users should never fill this.
   */
  formGuard?: unknown;
};

function cleanText(value: unknown, maxLength = 500): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\0/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

function cleanEmail(value: unknown): string {
  return cleanText(value, 160).toLowerCase();
}

function cleanList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => cleanText(item, 150))
    .filter(Boolean)
    .slice(0, 20);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function displayValue(value: string): string {
  return value ? escapeHtml(value) : "Not provided";
}

function emailRow(label: string, value: string): string {
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
        ${escapeHtml(label)}
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
        ${displayValue(value)}
      </td>
    </tr>
  `;
}

export async function POST(request: Request) {
  const isDevelopment = process.env.NODE_ENV !== "production";

  try {
    const body = (await request.json()) as OrganizationInquiryBody;

    /*
     * Honeypot spam protection.
     *
     * In production, bots receive a fake success response.
     * During local development, we return an error so accidental browser
     * autofill can be detected immediately.
     */
    const honeypot = cleanText(body.formGuard, 250);

    console.info("[organization-inquiry] Honeypot check:", {
      triggered: Boolean(honeypot),
    });

    if (honeypot) {
      if (isDevelopment) {
        console.warn(
          "[organization-inquiry] The honeypot field was populated. " +
            "The email was not sent.",
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "The hidden honeypot field was populated, so the email was not sent.",
            debug: {
              honeypotTriggered: true,
              emailAttempted: false,
            },
          },
          { status: 400 },
        );
      }

      /*
       * Do not reveal honeypot detection to bots in production.
       */
      return NextResponse.json({
        success: true,
        message: "Inquiry received.",
      });
    }

    const inquiryType = cleanText(body.inquiryType, 50);

    const fullName = cleanText(body.fullName, 100);
    const designation = cleanText(body.designation, 120);
    const workEmail = cleanEmail(body.workEmail);
    const phone = cleanText(body.phone, 30);

    const organizationName = cleanText(
      body.organizationName,
      160,
    );

    const organizationType = cleanText(
      body.organizationType,
      120,
    );

    const organizationWebsite = cleanText(
      body.organizationWebsite,
      250,
    );

    const city = cleanText(body.city, 120);

    const experienceGoal = cleanText(
      body.experienceGoal,
      1200,
    );

    const participantCount = cleanText(
      body.participantCount,
      60,
    );

    const participantProfile = cleanText(
      body.participantProfile,
      180,
    );

    const preferredTimeline = cleanText(
      body.preferredTimeline,
      120,
    );

    const experienceFormat = cleanText(
      body.experienceFormat,
      120,
    );

    const interests = cleanList(body.interests);
    const budget = cleanText(body.budget, 100);
    const details = cleanText(body.details, 2000);
    const referralSource = cleanText(
      body.referralSource,
      120,
    );

    const captcha = cleanText(body.captcha, 10);
    const consent = body.consent === true;

    /*
     * Validate inquiry type.
     */
    if (inquiryType !== "organization") {
      return NextResponse.json(
        {
          success: false,
          message: "The inquiry type is invalid.",
        },
        { status: 400 },
      );
    }

    /*
     * Validate required fields.
     */
    if (
      !fullName ||
      !workEmail ||
      !phone ||
      !organizationName ||
      !organizationType ||
      !city ||
      !experienceGoal ||
      !participantCount ||
      !experienceFormat ||
      interests.length === 0 ||
      !budget ||
      !details
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(workEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (captcha !== "14") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please answer the human-check question correctly.",
        },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide consent before submitting the inquiry.",
        },
        { status: 400 },
      );
    }

    /*
     * Read server-side environment variables.
     */
    const apiKey = process.env.RESEND_API_KEY?.trim();

    const recipientEmail =
      process.env.ORGANIZATION_INQUIRY_TO_EMAIL?.trim();

    const senderEmail =
      process.env.ORGANIZATION_INQUIRY_FROM_EMAIL?.trim();

    if (!apiKey || !recipientEmail || !senderEmail) {
      console.error(
        "[organization-inquiry] Required environment variables are missing:",
        {
          hasApiKey: Boolean(apiKey),
          hasRecipientEmail: Boolean(recipientEmail),
          hasSenderEmail: Boolean(senderEmail),
        },
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "The inquiry service is temporarily unavailable. Please email hey@kulturekatta.com.",
          ...(isDevelopment
            ? {
                debug: {
                  hasApiKey: Boolean(apiKey),
                  hasRecipientEmail: Boolean(recipientEmail),
                  hasSenderEmail: Boolean(senderEmail),
                },
              }
            : {}),
        },
        { status: 500 },
      );
    }

    if (!isValidEmail(recipientEmail)) {
      console.error(
        "[organization-inquiry] Invalid recipient email:",
        recipientEmail,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "The inquiry recipient email is not configured correctly.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const interestsText = interests.join(", ");

    /*
     * Remove line breaks from the organization name before placing it
     * in the email subject.
     */
    const subjectOrganizationName = organizationName
      .replace(/[\r\n]+/g, " ")
      .slice(0, 100);

    const submittedAt = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const emailHtml = `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <title>New Organization Inquiry</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background: #f7f3ed;
            font-family: Arial, Helvetica, sans-serif;
            color: #201d1b;
          "
        >
          <div style="padding: 30px 14px;">
            <div
              style="
                max-width: 760px;
                margin: 0 auto;
                overflow: hidden;
                border: 1px solid #e4ddd4;
                border-radius: 22px;
                background: #ffffff;
              "
            >
              <div
                style="
                  padding: 28px 28px 24px;
                  background: #201d1b;
                  color: #ffffff;
                "
              >
                <div
                  style="
                    margin-bottom: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    opacity: 0.72;
                  "
                >
                  KultureKatta website
                </div>

                <h1
                  style="
                    margin: 0;
                    font-size: 28px;
                    line-height: 1.2;
                  "
                >
                  New Organization Inquiry
                </h1>

                <p
                  style="
                    margin: 10px 0 0;
                    font-size: 14px;
                    line-height: 1.6;
                    opacity: 0.8;
                  "
                >
                  ${escapeHtml(organizationName)}
                </p>
              </div>

              <div style="padding: 26px 22px 30px;">
                <div
                  style="
                    margin-bottom: 22px;
                    padding: 15px 17px;
                    border-radius: 14px;
                    background: #f7f3ed;
                    font-size: 13px;
                    line-height: 1.6;
                    color: #4b4038;
                  "
                >
                  Submitted on ${escapeHtml(submittedAt)}
                </div>

                <h2
                  style="
                    margin: 0 0 12px;
                    font-size: 18px;
                    color: #201d1b;
                  "
                >
                  Contact details
                </h2>

                <table
                  role="presentation"
                  style="
                    width: 100%;
                    margin-bottom: 28px;
                    border-collapse: collapse;
                    border: 1px solid #ece7df;
                  "
                >
                  ${emailRow("Full name", fullName)}
                  ${emailRow("Designation", designation)}
                  ${emailRow("Work email", workEmail)}
                  ${emailRow("Phone / WhatsApp", phone)}
                </table>

                <h2
                  style="
                    margin: 0 0 12px;
                    font-size: 18px;
                    color: #201d1b;
                  "
                >
                  Organization
                </h2>

                <table
                  role="presentation"
                  style="
                    width: 100%;
                    margin-bottom: 28px;
                    border-collapse: collapse;
                    border: 1px solid #ece7df;
                  "
                >
                  ${emailRow(
                    "Organization",
                    organizationName,
                  )}
                  ${emailRow(
                    "Organization type",
                    organizationType,
                  )}
                  ${emailRow(
                    "Website",
                    organizationWebsite,
                  )}
                  ${emailRow("City / location", city)}
                </table>

                <h2
                  style="
                    margin: 0 0 12px;
                    font-size: 18px;
                    color: #201d1b;
                  "
                >
                  Experience requirements
                </h2>

                <table
                  role="presentation"
                  style="
                    width: 100%;
                    margin-bottom: 28px;
                    border-collapse: collapse;
                    border: 1px solid #ece7df;
                  "
                >
                  ${emailRow(
                    "Desired outcome",
                    experienceGoal,
                  )}
                  ${emailRow(
                    "Participant count",
                    participantCount,
                  )}
                  ${emailRow(
                    "Participant profile",
                    participantProfile,
                  )}
                  ${emailRow(
                    "Preferred timeline",
                    preferredTimeline,
                  )}
                  ${emailRow(
                    "Preferred format",
                    experienceFormat,
                  )}
                  ${emailRow(
                    "Areas of interest",
                    interestsText,
                  )}
                  ${emailRow(
                    "Approximate budget",
                    budget,
                  )}
                </table>

                <h2
                  style="
                    margin: 0 0 12px;
                    font-size: 18px;
                    color: #201d1b;
                  "
                >
                  Additional context
                </h2>

                <table
                  role="presentation"
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    border: 1px solid #ece7df;
                  "
                >
                  ${emailRow(
                    "Additional details",
                    details,
                  )}
                  ${emailRow(
                    "Referral source",
                    referralSource,
                  )}
                </table>

                <p
                  style="
                    margin: 28px 0 0;
                    font-size: 12px;
                    line-height: 1.6;
                    color: #746a62;
                  "
                >
                  Reply directly to this email to contact
                  ${escapeHtml(fullName)} at
                  ${escapeHtml(workEmail)}.
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
NEW ORGANIZATION INQUIRY
KultureKatta Website

Submitted: ${submittedAt}

CONTACT DETAILS
Full name: ${fullName}
Designation: ${designation || "Not provided"}
Work email: ${workEmail}
Phone / WhatsApp: ${phone}

ORGANIZATION
Organization name: ${organizationName}
Organization type: ${organizationType}
Website: ${organizationWebsite || "Not provided"}
City / location: ${city}

EXPERIENCE REQUIREMENTS
Desired outcome:
${experienceGoal}

Participant count: ${participantCount}
Participant profile: ${participantProfile || "Not provided"}
Preferred timeline: ${preferredTimeline || "Not provided"}
Preferred format: ${experienceFormat}
Areas of interest: ${interestsText}
Approximate budget: ${budget}

ADDITIONAL DETAILS
${details}

Referral source: ${referralSource || "Not provided"}
    `.trim();

    console.info(
      "[organization-inquiry] Attempting to send email:",
      {
        recipientEmail,
        senderEmail,
        replyTo: workEmail,
        organizationName,
      },
    );

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: [recipientEmail],
      replyTo: workEmail,
      subject: `New Organization Inquiry — ${subjectOrganizationName}`,
      html: emailHtml,
      text: emailText,
      tags: [
        {
          name: "source",
          value: "organization_form",
        },
      ],
    });

    console.info("[organization-inquiry] Resend response:", {
      emailId: data?.id ?? null,
      error: error ?? null,
    });

    /*
     * Resend may return an error object without throwing an exception.
     * It may also theoretically return neither an error nor an ID.
     * Both cases should be treated as failed delivery attempts.
     */
    if (error || !data?.id) {
      console.error(
        "[organization-inquiry] Resend did not accept the email:",
        {
          error,
          data,
        },
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Your inquiry could not be sent. Please try again or email hello@kulturekatta.com.",
          ...(isDevelopment
            ? {
                debug: {
                  emailAttempted: true,
                  emailAccepted: false,
                  resendError: error ?? null,
                  resendData: data ?? null,
                },
              }
            : {}),
        },
        { status: 502 },
      );
    }

    console.info(
      "[organization-inquiry] Email accepted by Resend:",
      data.id,
    );

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been sent.",
      emailId: data.id,
      ...(isDevelopment
        ? {
            debug: {
              honeypotTriggered: false,
              emailAttempted: true,
              emailAccepted: true,
            },
          }
        : {}),
    });
  } catch (error) {
    console.error(
      "[organization-inquiry] Unexpected route error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while sending your inquiry. Please try again.",
        ...(isDevelopment
          ? {
              debug: {
                error:
                  error instanceof Error
                    ? error.message
                    : "Unknown server error",
              },
            }
          : {}),
      },
      { status: 500 },
    );
  }
}