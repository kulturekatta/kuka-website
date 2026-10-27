import { attributionEmailFields } from "@/app/lib/website-attribution-email";
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

type FloatingContactBody = {
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
  organization: "Organization experience enquiry",
  private: "Private experience enquiry",
  studio: "Work with Katta Studio enquiry",
  partner: "Partnership or volunteering enquiry",
  host: "Host a Katta enquiry",
  career: "Work with KultureKatta enquiry",
  attend: "Attend an experience enquiry",
  media: "Press or media enquiry",
  other: "General enquiry",
  // Retain support for older form drafts saved in visitors' browsers.
  volunteer: "Volunteering enquiry",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FloatingContactBody;

    if (isHoneypotTriggered(body.formGuard)) {
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    if (isRateLimited(request, "floating-contact")) {
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
    const message = cleanText(body.message, 1800);

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

    const routingByInterest: Record<string, string> = {
      organization: "organizations@kulturekatta.com",
      private: "tailored@kulturekatta.com",
      studio: "studio@kulturekatta.com",
      partner: "partners@kulturekatta.com",
      volunteer: "partners@kulturekatta.com",
      host: "partners@kulturekatta.com",
      career: "careers@kulturekatta.com",
      attend: "hey@kulturekatta.com", // Until experiences@ is established.
      media: "hey@kulturekatta.com",
      other: "hey@kulturekatta.com",
    };
    const routingEmail = routingByInterest[interest] || "hey@kulturekatta.com";

    await sendWebsiteForm({
      formName: "Quick Website Enquiry",
      internalSubject: `[KuKa Website] Quick Inquiry — ${interestLabel} — ${name}`,
      submitterName: name,
      submitterEmail: email,
      acknowledgementMessage: `Thank you for contacting KultureKatta. We have received your ${interestLabel.toLowerCase()}.`,
      sourceTag: "floating_contact",
      routingEmail,
      fields: [
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Phone / WhatsApp", value: phone },
        { label: "Enquiry type", value: interestLabel },
        { label: "Message", value: message },
        ...attributionEmailFields(body),
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been sent.",
    });
  } catch (error) {
    console.error("[floating-contact] Submission failed:", error);

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
