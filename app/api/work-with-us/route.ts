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
  businessArea?: unknown;
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
    const businessArea = cleanText(body.businessArea, 50);
    const opportunityType = cleanText(body.opportunityType, 100);
    const workArrangement = cleanText(body.workArrangement, 100);
    const availability = cleanText(body.availability, 220);
    const compensation = cleanText(body.compensation, 220);
    const portfolioLink = cleanText(body.portfolioLink, 500);
    const experience = cleanText(body.experience, 1800);
    const message = cleanText(body.message, 1800);


    if (
      !fullName ||
      !city ||
      !email ||
      !businessArea ||
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

    if (!["KultureKatta", "Katta Studio", "Both"].includes(businessArea)) {
      return NextResponse.json(
        { success: false, message: "Please select the part of KuKa that interests you." },
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
      formName: "Work With KuKa Application",
      internalSubject: `[${businessArea}] Work With KuKa — ${opportunityType} — ${fullName}`,
      submitterName: fullName,
      submitterEmail: email,
      acknowledgementMessage:
        "Thank you for your interest in working with KuKa. We have received your application and work-sample link.",
      sourceTag: "work_with_us",
      routingEmail: "careers@kulturekatta.com",
      fields: [
        { label: "Full name", value: fullName },
        { label: "Email", value: email },
        { label: "Phone / WhatsApp", value: phone },
        { label: "City", value: city },
        { label: "Business area", value: businessArea },
        { label: "Opportunity type", value: opportunityType },
        { label: "Preferred work arrangement", value: workArrangement },
        { label: "Availability", value: availability },
        { label: "Expected compensation", value: compensation },
        { label: "Portfolio / résumé link", value: portfolioLink },
        { label: "Relevant skills and experience", value: experience },
        { label: "Why KuKa", value: message },
        ...attributionEmailFields(body),
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
          "Your application could not be sent. Please try again or email careers@kulturekatta.com.",
      },
      { status: 500 },
    );
  }
}
