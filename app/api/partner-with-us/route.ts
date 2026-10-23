import { attributionEmailFields } from "@/app/lib/website-attribution-email";
import { NextResponse } from "next/server";
import {
  cleanEmail, cleanText, hasValidConsent, isHoneypotTriggered,
  isRateLimited, isSubmissionTooFast, isValidEmail, isValidHttpUrl,
  sendWebsiteForm,
} from "@/app/lib/website-forms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const partnerTypes = new Set([
  "Artist / Performer / Creative Practitioner",
  "Workshop Facilitator / Educator",
  "Venue / Hospitality / Space Partner",
  "Cultural Organization / Institution",
  "Brand / Business / Corporate Representative",
  "Community / Collective / Club",
  "Artisan / Maker / Producer",
  "Travel / Tourism / Local Experience Partner",
  "Other Collaborator",
]);

const interests = [
  "Host or facilitate experiences",
  "Provide a venue or space",
  "Co-create a programme or event",
  "Sponsor or fund cultural activities",
  "Showcase or sell creative work",
  "Collaborate on content or storytelling",
  "Reach new audiences or communities",
  "Explore a long-term partnership",
  "Something else",
];

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return NextResponse.json({ success: false, message: "Invalid submission format." }, { status: 415 });
    const body = await request.json() as Record<string, unknown>;
    if (isHoneypotTriggered(body.formGuard)) return NextResponse.json({ success: true, message: "Enquiry received." });
    if (isRateLimited(request, "partner-with-us")) return NextResponse.json({ success: false, message: "Too many attempts. Please try again later." }, { status: 429 });
    if (isSubmissionTooFast(body.startedAt)) return NextResponse.json({ success: false, message: "Please wait a moment and try again." }, { status: 400 });
    const fullName = cleanText(body.fullName, 100);
    const email = cleanEmail(body.email);
    const city = cleanText(body.city, 120);
    const phone = cleanText(body.phone, 40);
    const organization = cleanText(body.organization, 120);
    const partnerType = cleanText(body.partnerType, 100);
    if (body.interests !== undefined && (!Array.isArray(body.interests) || body.interests.length > interests.length || body.interests.some((item: unknown) => typeof item !== "string" || !interests.includes(item)))) {
      return NextResponse.json({ success: false, message: "Please select valid collaboration interests." }, { status: 400 });
    }
    const selectedInterests: string[] = Array.isArray(body.interests) ? [...new Set(body.interests as string[])] : [];
    const portfolioLink = cleanText(body.portfolioLink, 500);
    const message = cleanText(body.message, 1800);
    if (!fullName || !email || !city || !partnerTypes.has(partnerType)) return NextResponse.json({ success: false, message: "Please complete the required fields." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ success: false, message: "Please enter a valid email." }, { status: 400 });
    if (portfolioLink && !isValidHttpUrl(portfolioLink)) return NextResponse.json({ success: false, message: "Please enter a valid website or profile URL." }, { status: 400 });
    if (!hasValidConsent(body.consent)) return NextResponse.json({ success: false, message: "Consent is required." }, { status: 400 });
    await sendWebsiteForm({
      formName: "Partner With KuKa Enquiry",
      internalSubject: `[Partner With KuKa] ${partnerType} — ${fullName}`,
      submitterName: fullName, submitterEmail: email,
      acknowledgementMessage: "Thank you for introducing yourself and sharing your collaboration idea. We'll review it and get in touch if there's a suitable next step.",
      sourceTag: "partner_with_us",
      routingEmail: "partners@kulturekatta.com",
      fields: [
        { label: "Name", value: fullName }, { label: "Email", value: email },
        { label: "City", value: city }, { label: "Phone / WhatsApp", value: phone },
        { label: "Organization / practice", value: organization }, { label: "Partner type", value: partnerType },
        { label: "Interested in", value: selectedInterests.join(", ") || "Not specified" },
        { label: "Profile / portfolio", value: portfolioLink },
        { label: "Additional details / collaboration idea", value: message },
        ...attributionEmailFields(body),
      ],
    });
    return NextResponse.json({ success: true, message: "Partnership enquiry sent." });
  } catch (error) {
    console.error("[partner-with-us] Submission failed", error);
    return NextResponse.json({ success: false, message: "Unable to submit the enquiry. Please email partners@kulturekatta.com." }, { status: 500 });
  }
}
