import { NextResponse } from "next/server";
import {
  cleanEmail, cleanText, hasValidConsent, isHoneypotTriggered,
  isRateLimited, isSubmissionTooFast, isValidEmail, sendWebsiteForm,
} from "@/app/lib/website-forms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const experienceTypes = new Set([
  "Art, craft or creative workshop", "Food and drink", "Music or performing arts",
  "Walk, trail or exploration", "Wellness and mindful experiences",
  "Games, stories or conversation", "A combination of experiences", "Something else / not sure yet",
]);
const venueOptions = new Set(["", "At my location", "Please suggest a venue", "Outdoors", "Not sure yet"]);

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ success: false, message: "Invalid submission format." }, { status: 415 });
    }
    const body = (await request.json()) as Record<string, unknown>;
    if (isHoneypotTriggered(body.formGuard)) return NextResponse.json({ success: true, message: "Enquiry received." });
    if (isRateLimited(request, "private-experiences")) return NextResponse.json({ success: false, message: "Too many attempts. Please try again later." }, { status: 429 });
    if (isSubmissionTooFast(body.startedAt)) return NextResponse.json({ success: false, message: "Please wait a moment and try again." }, { status: 400 });
    const fullName = cleanText(body.fullName, 100);
    const email = cleanEmail(body.email);
    const phone = cleanText(body.phone, 40);
    const city = cleanText(body.city, 120);
    const experienceType = cleanText(body.experienceType, 100);
    const occasion = cleanText(body.occasion, 160);
    const preferredDate = cleanText(body.preferredDate, 20);
    const participants = cleanText(body.participants, 10);
    const venuePreference = cleanText(body.venuePreference, 100);
    const budget = cleanText(body.budget, 100);
    const message = cleanText(body.message, 1800);
    if (!fullName || !isValidEmail(email) || !city || !experienceTypes.has(experienceType)) {
      return NextResponse.json({ success: false, message: "Please complete the required fields correctly." }, { status: 400 });
    }
    if (preferredDate && (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || !Number.isFinite(Date.parse(preferredDate)))) {
      return NextResponse.json({ success: false, message: "Please enter a valid date." }, { status: 400 });
    }
    if (participants && (!/^\d+$/.test(participants) || Number(participants) < 1 || Number(participants) > 10000)) {
      return NextResponse.json({ success: false, message: "Please enter a valid group size." }, { status: 400 });
    }
    if (!venueOptions.has(venuePreference)) return NextResponse.json({ success: false, message: "Please select a valid venue preference." }, { status: 400 });
    if (!hasValidConsent(body.consent)) return NextResponse.json({ success: false, message: "Consent is required." }, { status: 400 });
    await sendWebsiteForm({
      formName: "KuKa Private Experiences Enquiry",
      internalSubject: `[Private Experiences] ${experienceType} — ${fullName}`,
      submitterName: fullName,
      submitterEmail: email,
      acknowledgementMessage: "Thank you for sharing your ideas for a private experience. We have received your enquiry and will be in touch to discuss what we can create together.",
      sourceTag: "private_experiences",
      routingEmail: "tailored@kulturekatta.com",
      fields: [
        { label: "Name", value: fullName }, { label: "Email", value: email },
        { label: "Phone / WhatsApp", value: phone }, { label: "City / location", value: city },
        { label: "Experience type", value: experienceType }, { label: "Occasion", value: occasion },
        { label: "Preferred date", value: preferredDate }, { label: "Participants", value: participants },
        { label: "Venue preference", value: venuePreference }, { label: "Approximate budget", value: budget },
        { label: "Additional details", value: message }, { label: "Source page", value: "/private-experiences" },
      ],
    });
    return NextResponse.json({ success: true, message: "Private experience enquiry received." });
  } catch (error) {
    console.error("[private-experiences] Submission failed", error);
    return NextResponse.json({ success: false, message: "Unable to submit. Please email tailored@kulturekatta.com." }, { status: 500 });
  }
}
