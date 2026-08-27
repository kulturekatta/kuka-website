import { NextResponse } from "next/server";
import {
  cleanEmail,
  cleanText,
  hasValidConsent,
  isHoneypotTriggered,
  isRateLimited,
  isSubmissionTooFast,
  isValidEmail,
  isValidHttpUrl,
  sendWebsiteForm,
} from "@/app/lib/website-forms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WorkWithUsBody = {
  fullName?: unknown;
  city?: unknown;
  email?: unknown;
  phone?: unknown;
  opportunityType?: unknown;
  workArrangement?: unknown;
  availability?: unknown;
  compensation?: unknown;
  portfolioLink?: unknown;
  experience?: unknown;
  message?: unknown;
  consent?: unknown;
  formGuard?: unknown;
  startedAt?: unknown;
  sourcePage?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WorkWithUsBody;

    if (isHoneypotTriggered(body.formGuard)) {
      return NextResponse.json({ success: true, message: "Application received." });
    }

    if (isRateLimited(request, "work-with-us")) {
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

    const fullName = cleanText(body.fullName, 100);
    const city = cleanText(body.city, 120);
    const email = cleanEmail(body.email);
    const phone = cleanText(body.phone, 40);
    const opportunityType = cleanText(body.opportunityType, 100);
    const workArrangement = cleanText(body.workArrangement, 100);
    const availability = cleanText(body.availability, 220);
    const compensation = cleanText(body.compensation, 220);
    const portfolioLink = cleanText(body.portfolioLink, 500);
    const experience = cleanText(body.experience, 1800);
    const message = cleanText(body.message, 1800);
    const sourcePage =
      cleanText(body.sourcePage, 200) || "/katta-studio/work-with-us";

    if (
      !fullName ||
      !city ||
      !email ||
      !opportunityType ||
      !workArrangement ||
      !availability ||
      !portfolioLink ||
      !experience ||
      !message
    ) {
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

    if (!isValidHttpUrl(portfolioLink)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid public portfolio or résumé link.",
        },
        { status: 400 },
      );
    }

    if (!hasValidConsent(body.consent)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide consent before submitting your application.",
        },
        { status: 400 },
      );
    }

    await sendWebsiteForm({
      formName: "Katta Studio Work With Us Application",
      internalSubject: `[Katta Studio] Work With Us Application — ${opportunityType} — ${fullName}`,
      submitterName: fullName,
      submitterEmail: email,
      acknowledgementMessage:
        "Thank you for applying to work with Katta Studio. We have received your application and work-sample link.",
      sourceTag: "work_with_us",
      fields: [
        { label: "Full name", value: fullName },
        { label: "Email", value: email },
        { label: "Phone / WhatsApp", value: phone },
        { label: "City", value: city },
        { label: "Opportunity type", value: opportunityType },
        { label: "Preferred work arrangement", value: workArrangement },
        { label: "Availability", value: availability },
        { label: "Expected compensation", value: compensation },
        { label: "Portfolio / résumé link", value: portfolioLink },
        { label: "Relevant skills and experience", value: experience },
        { label: "Why Katta Studio", value: message },
        { label: "Source page", value: sourcePage },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Your application has been sent.",
    });
  } catch (error) {
    console.error("[work-with-us] Submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Your application could not be sent. Please try again or email hey@kulturekatta.com.",
      },
      { status: 500 },
    );
  }
}
