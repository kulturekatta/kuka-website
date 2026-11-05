import { NextResponse } from "next/server";
import { attributionEmailFields } from "@/app/lib/website-attribution-email";
import { cleanEmail, cleanText, hasValidConsent, isHoneypotTriggered, isRateLimited, isSubmissionTooFast, isValidEmail, sendWebsiteForm } from "@/app/lib/website-forms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENT_ID = "KUKA-KIR-26-11-v1.0";
const TICKET_PRICE = 1750;
type EnquiryBody = { name?: unknown; email?: unknown; phone?: unknown; quantity?: unknown; eligible?: unknown; consent?: unknown; termsAccepted?: unknown; guardianAcknowledged?: unknown; mediaConsent?: unknown; testimonialConsent?: unknown; firstNameConsent?: unknown; formGuard?: unknown; startedAt?: unknown; eventId?: unknown; sourcePage?: unknown; landingPage?: unknown; referrer?: unknown; firstVisitAt?: unknown; utmSource?: unknown; utmMedium?: unknown; utmCampaign?: unknown; utmContent?: unknown; utmTerm?: unknown; fbclid?: unknown };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryBody;
    if (isHoneypotTriggered(body.formGuard)) return NextResponse.json({ success: true, message: "Enquiry received." });
    if (isRateLimited(request, "experience-enquiry")) return NextResponse.json({ success: false, message: "Too many submissions. Please try again later." }, { status: 429 });
    if (isSubmissionTooFast(body.startedAt)) return NextResponse.json({ success: false, message: "Please wait a moment and try again." }, { status: 400 });
    const name = cleanText(body.name, 100);
    const email = cleanEmail(body.email);
    const phone = cleanText(body.phone, 40);
    const quantity = Number(body.quantity);
    if (body.eventId !== EVENT_ID || !name || !isValidEmail(email) || !phone || !Number.isInteger(quantity) || quantity < 1 || quantity > 6 || body.eligible !== true || body.termsAccepted !== true || body.guardianAcknowledged !== true || !hasValidConsent(body.consent)) {
      return NextResponse.json({ success: false, message: "Please check your details, eligibility and consent." }, { status: 400 });
    }
    await sendWebsiteForm({
      formName: "Upcoming Experience — Kirigami Workshop Enquiry",
      internalSubject: `[KuKa Upcoming Experience] Kirigami 14 Nov | ${quantity} seat${quantity === 1 ? "" : "s"} | ${name}`,
      submitterName: name,
      submitterEmail: email,
      acknowledgementMessage: "We received your Kirigami workshop enquiry. Your seat is not yet reserved or confirmed. Our team will contact you with availability and payment information.",
      sourceTag: "upcoming_experience_kirigami",
      routingEmail: process.env.EXPERIENCE_ENQUIRY_TO_EMAIL?.trim() || process.env.WEBSITE_FORMS_TO_EMAIL?.trim() || "hey@kulturekatta.com",
      fields: [
        { label: "Experience", value: "Kirigami Paper Cutting Workshop" },
        { label: "Internal event ID", value: EVENT_ID },
        { label: "Date and time", value: "Saturday, 14 November 2026 | 10 AM–12 noon" },
        { label: "Venue", value: "QALA Café & Co-works, Baner, Pune" },
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Mobile / WhatsApp", value: phone },
        { label: "Requested participants", value: String(quantity) },
        { label: "Estimated total", value: `INR ${quantity * TICKET_PRICE}` },
        { label: "Eligibility acknowledged", value: "All participants 12+ and able to use precision cutter independently" },
        { label: "Event terms accepted", value: "Yes" },
        { label: "Parent/guardian acknowledgement", value: "Yes (applies to any under-18 participant)" },
        { label: "Identifiable photo/video publicity consent", value: body.mediaConsent === true ? "Yes" : "No" },
        { label: "Testimonial publicity consent", value: body.testimonialConsent === true ? "Yes" : "No" },
        { label: "First-name publicity consent", value: body.firstNameConsent === true ? "Yes" : "No" },
        { label: "Booking status", value: "Enquiry only — NO PAYMENT / NO SEAT CONFIRMED" },
        ...attributionEmailFields(body),
      ],
    });
    return NextResponse.json({ success: true, message: "Your workshop enquiry was sent. This is not a confirmed booking." });
  } catch (error) {
    console.error("[experience-enquiry] Submission failed:", error);
    return NextResponse.json({ success: false, message: "Unable to send the workshop enquiry. Please try again." }, { status: 500 });
  }
}
