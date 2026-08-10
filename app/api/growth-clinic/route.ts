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

type GrowthClinicBody = {
  brandName?: unknown;
  brandLink?: unknown;
  painPoints?: unknown;
  email?: unknown;
  city?: unknown;
  mobile?: unknown;
  consent?: unknown;
  formGuard?: unknown;
  startedAt?: unknown;
  sourcePage?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GrowthClinicBody;

    if (isHoneypotTriggered(body.formGuard)) {
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    if (isRateLimited(request, "growth-clinic")) {
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

    const brandName = cleanText(body.brandName, 160);
    const brandLink = cleanText(body.brandLink, 500);
    const painPoints = cleanText(body.painPoints, 2500);
    const email = cleanEmail(body.email);
    const city = cleanText(body.city, 120);
    const mobile = cleanText(body.mobile, 40);
    const sourcePage = cleanText(body.sourcePage, 200) || "/katta-studio";

    if (!brandName || !brandLink || !painPoints || !email || !city || !mobile) {
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
      formName: "Katta Studio Growth Clinic Enquiry",
      internalSubject: `[Katta Studio] Growth Clinic Enquiry — ${brandName}`,
      submitterName: brandName,
      submitterEmail: email,
      acknowledgementMessage:
        "Thank you for contacting the Katta Studio Growth Clinic. We have received your enquiry and the challenges you shared.",
      sourceTag: "growth_clinic",
      fields: [
        { label: "Brand name", value: brandName },
        { label: "Website or social profile", value: brandLink },
        { label: "Main pain points", value: painPoints },
        { label: "Email", value: email },
        { label: "City", value: city },
        { label: "Mobile / WhatsApp", value: mobile },
        { label: "Source page", value: sourcePage },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been sent.",
    });
  } catch (error) {
    console.error("[growth-clinic] Submission failed:", error);

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
