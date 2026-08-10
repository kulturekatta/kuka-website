import { NextResponse } from "next/server";
import {
  cleanEmail,
  cleanList,
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
  consent?: unknown;
  formGuard?: unknown;
  startedAt?: unknown;
  sourcePage?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrganizationInquiryBody;

    if (isHoneypotTriggered(body.formGuard)) {
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    if (isRateLimited(request, "organization-inquiry")) {
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

    const inquiryType = cleanText(body.inquiryType, 50);
    const fullName = cleanText(body.fullName, 100);
    const designation = cleanText(body.designation, 120);
    const workEmail = cleanEmail(body.workEmail);
    const phone = cleanText(body.phone, 40);
    const organizationName = cleanText(body.organizationName, 160);
    const organizationType = cleanText(body.organizationType, 120);
    const organizationWebsite = cleanText(body.organizationWebsite, 500);
    const city = cleanText(body.city, 120);
    const experienceGoal = cleanText(body.experienceGoal, 1600);
    const participantCount = cleanText(body.participantCount, 80);
    const participantProfile = cleanText(body.participantProfile, 240);
    const preferredTimeline = cleanText(body.preferredTimeline, 160);
    const experienceFormat = cleanText(body.experienceFormat, 160);
    const interests = cleanList(body.interests);
    const budget = cleanText(body.budget, 120);
    const details = cleanText(body.details, 3000);
    const referralSource = cleanText(body.referralSource, 160);
    const sourcePage =
      cleanText(body.sourcePage, 200) || "/for-organizations";

    if (inquiryType !== "organization") {
      return NextResponse.json(
        { success: false, message: "The inquiry type is invalid." },
        { status: 400 },
      );
    }

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
        { success: false, message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(workEmail)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!hasValidConsent(body.consent)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide consent before submitting the inquiry.",
        },
        { status: 400 },
      );
    }

    const subjectOrganizationName = organizationName
      .replace(/[\r\n]+/g, " ")
      .slice(0, 100);

    await sendWebsiteForm({
      formName: "Organization Inquiry",
      internalSubject: `[KuKa Organizations] New Enquiry — ${subjectOrganizationName}`,
      submitterName: fullName,
      submitterEmail: workEmail,
      acknowledgementMessage:
        "Thank you for contacting KuKa for Organizations. We have received your inquiry and the experience requirements you shared.",
      sourceTag: "organization_form",
      fields: [
        { label: "Full name", value: fullName },
        { label: "Designation", value: designation },
        { label: "Work email", value: workEmail },
        { label: "Phone / WhatsApp", value: phone },
        { label: "Organization", value: organizationName },
        { label: "Organization type", value: organizationType },
        { label: "Organization website", value: organizationWebsite },
        { label: "City / location", value: city },
        { label: "Desired outcome", value: experienceGoal },
        { label: "Participant count", value: participantCount },
        { label: "Participant profile", value: participantProfile },
        { label: "Preferred timeline", value: preferredTimeline },
        { label: "Preferred format", value: experienceFormat },
        { label: "Areas of interest", value: interests },
        { label: "Approximate budget", value: budget },
        { label: "Additional details", value: details },
        { label: "Referral source", value: referralSource },
        { label: "Source page", value: sourcePage },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been sent.",
    });
  } catch (error) {
    console.error("[organization-inquiry] Submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Your inquiry could not be sent. Please try again or email hey@kulturekatta.com.",
      },
      { status: 500 },
    );
  }
}
