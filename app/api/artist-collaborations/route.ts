import { attributionEmailFields } from "@/app/lib/website-attribution-email";
import { NextResponse } from "next/server";
import {
  cleanEmail, cleanText, hasValidConsent, isHoneypotTriggered,
  isRateLimited, isSubmissionTooFast, isValidEmail, isValidHttpUrl,
  sendWebsiteForm,
} from "@/app/lib/website-forms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const disciplines = new Set([
  "Visual art / Craft / Design",
  "Music / Singing / Sound",
  "Dance / Theatre / Performance",
  "Writing / Storytelling / Literature",
  "Food / Culinary Culture",
  "Heritage / History / Local Culture",
  "Nature / Outdoor / Adventure",
  "Education / Play / Learning",
  "Wellness / Movement",
  "Other Creative Practice",
]);

const formats = new Set([
  "Hands-on workshop",
  "Performance or demonstration",
  "Walk, trail or outdoor experience",
  "Talk or storytelling session",
  "Family, school or children's experience",
  "Ongoing series or community program",
  "Open to exploring",
]);

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ success: false, message: "Invalid submission format." }, { status: 415 });
    }
    const body = await request.json() as Record<string, unknown>;
    if (isHoneypotTriggered(body.formGuard)) return NextResponse.json({ success: true, message: "Introduction received." });
    if (isRateLimited(request, "artist-collaborations")) return NextResponse.json({ success: false, message: "Too many attempts. Please try again later." }, { status: 429 });
    if (isSubmissionTooFast(body.startedAt)) return NextResponse.json({ success: false, message: "Please wait a moment and try again." }, { status: 400 });

    const fullName = cleanText(body.fullName, 100);
    const email = cleanEmail(body.email);
    const city = cleanText(body.city, 120);
    const phone = cleanText(body.phone, 40);
    const practiceName = cleanText(body.practiceName, 120);
    const discipline = cleanText(body.discipline, 100);
    const portfolioLink = cleanText(body.portfolioLink, 500);
    const idea = cleanText(body.idea, 1800);
    const preferredLocations = cleanText(body.preferredLocations, 250);
    const practicalNotes = cleanText(body.practicalNotes, 1000);

    if (!fullName || !email || !city || !disciplines.has(discipline) || !idea) {
      return NextResponse.json({ success: false, message: "Please complete the required fields." }, { status: 400 });
    }
    if (!isValidEmail(email)) return NextResponse.json({ success: false, message: "Please enter a valid email." }, { status: 400 });
    if (portfolioLink && !isValidHttpUrl(portfolioLink)) return NextResponse.json({ success: false, message: "Please enter a valid portfolio URL." }, { status: 400 });
    if (body.formats !== undefined && (!Array.isArray(body.formats) || body.formats.length > formats.size || body.formats.some((value: unknown) => typeof value !== "string" || !formats.has(value)))) {
      return NextResponse.json({ success: false, message: "Please select valid experience formats." }, { status: 400 });
    }
    const selectedFormats = Array.isArray(body.formats) ? [...new Set(body.formats as string[])] : [];
    if (!hasValidConsent(body.consent)) return NextResponse.json({ success: false, message: "Consent is required." }, { status: 400 });

    await sendWebsiteForm({
      formName: "KuKa Artist Collaborations — Introduction",
      internalSubject: `[KuKa Artist Collaboration] ${discipline} — ${fullName}`,
      submitterName: fullName,
      submitterEmail: email,
      acknowledgementMessage: "Thank you for introducing your creative practice. We'll review your idea and get in touch if there is a suitable collaboration opportunity.",
      sourceTag: "artist_collaborations",
      routingEmail: "partners@kulturekatta.com",
      fields: [
        { label: "Internal form ID", value: "kuka_artist_collaboration" },
        { label: "Submission page", value: "/artist-collaborations" },
        { label: "Name", value: fullName },
        { label: "Email", value: email },
        { label: "City / location", value: city },
        { label: "Phone / WhatsApp", value: phone },
        { label: "Practice / collective name", value: practiceName },
        { label: "Primary discipline", value: discipline },
        { label: "Experience formats", value: selectedFormats.join(", ") || "Not specified" },
        { label: "Portfolio / profile", value: portfolioLink },
        { label: "Creative practice / proposed experience", value: idea },
        { label: "Preferred collaboration locations", value: preferredLocations },
        { label: "Practical considerations", value: practicalNotes },
        ...attributionEmailFields(body),
      ],
    });
    return NextResponse.json({ success: true, message: "Artist collaboration introduction sent." });
  } catch (error) {
    console.error("[artist-collaborations] Submission failed", error);
    return NextResponse.json({ success: false, message: "Unable to send your introduction. Please email partners@kulturekatta.com." }, { status: 500 });
  }
}
