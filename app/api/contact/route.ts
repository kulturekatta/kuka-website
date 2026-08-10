import { NextResponse } from "next/server";
import {
  cleanEmail,
  cleanText,
  hasValidConsent,
  isHoneypotTriggered,
  isRateLimited,
  isSubmissionTooFast,
  isValidEmail,
  sendWebsiteForm,
} from "@/app/lib/website-forms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  consent?: unknown;
  formGuard?: unknown;
  startedAt?: unknown;
  sourcePage?: unknown;
};

const interestLabels: Record<string, string> = {
  organization: "Organization enquiry",
  attend: "Attend an experience",
  partner: "Partnership enquiry",
  volunteer: "Volunteer enquiry",
  host: "Host a Katta enquiry",
  media: "Press or media enquiry",
  other: "General enquiry",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    if (isHoneypotTriggered(body.formGuard)) {
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    if (isRateLimited(request, "contact")) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions were received. Please wait a few minutes and try again.",
        },
        { status: 429 },
      );
    }

    if (isSubmissionTooFast(body.startedAt)) {
      return NextResponse.json(
        { success: false, message: "Please wait a moment and try again." },
        { status: 400 },
      );
    }

    const name = cleanText(body.name, 100);
    const email = cleanEmail(body.email);
    const phone = cleanText(body.phone, 40);
    const interest = cleanText(body.interest, 60);
    const message = cleanText(body.message, 2500);
    const sourcePage = cleanText(body.sourcePage, 200) || "/contact";
    const interestLabel = interestLabels[interest];

    if (!name || !email || !interestLabel || !message) {
      return NextResponse.json(
        { success: false, message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!hasValidConsent(body.consent)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide consent before submitting your enquiry.",
        },
        { status: 400 },
      );
    }

    await sendWebsiteForm({
      formName: "General Website Enquiry",
      internalSubject: `[KuKa Website] ${interestLabel} — ${name}`,
      submitterName: name,
      submitterEmail: email,
      acknowledgementMessage: `Thank you for contacting KultureKatta. We have received your ${interestLabel.toLowerCase()}.`,
      sourceTag: "contact_form",
      fields: [
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Phone / WhatsApp", value: phone },
        { label: "Enquiry type", value: interestLabel },
        { label: "Message", value: message },
        { label: "Source page", value: sourcePage },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been sent.",
    });
  } catch (error) {
    console.error("[contact-form] Submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Your enquiry could not be sent. Please try again or email hey@kulturekatta.com.",
      },
      { status: 500 },
    );
  }
}
