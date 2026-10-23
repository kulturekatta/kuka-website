import { NextResponse } from "next/server";
import { FUTURE_DATE_ERROR, isFutureDateInIndia } from "@/app/lib/future-date";
import {
  cleanEmail, cleanList, cleanText, hasValidConsent, isHoneypotTriggered,
  isRateLimited, isSubmissionTooFast, isValidEmail, sendWebsiteForm,
} from "@/app/lib/website-forms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedServices = new Set([
  "Social & digital campaigns", "Print & event collateral", "Packaging & gifting",
  "Retail & in-store design", "Brand design support", "Sales & business communication", "Merchandise & branded products", "Other",
]);

type Body = Record<string, unknown>;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    if (isHoneypotTriggered(body.formGuard)) return NextResponse.json({ success: true, message: "Enquiry received." });
    if (isRateLimited(request, "festive-business")) return NextResponse.json({ success: false, message: "Too many submissions. Please wait a few minutes and try again." }, { status: 429 });
    if (isSubmissionTooFast(body.startedAt)) return NextResponse.json({ success: false, message: "Please wait a moment and try again." }, { status: 400 });

    const businessName = cleanText(body.businessName, 160);
    const contactName = cleanText(body.contactName, 160);
    const email = cleanEmail(body.email);
    const mobile = cleanText(body.mobile, 40);
    const city = cleanText(body.city, 120);
    const businessLink = cleanText(body.businessLink, 500);
    const services = cleanList(body.services, 8).filter((service) => allowedServices.has(service));
    const brief = cleanText(body.brief, 2500);
    const deadline = cleanText(body.deadline, 30);
    const budget = cleanText(body.budget, 80);

    if (!businessName || !contactName || !email || !mobile || !city || !brief || !deadline || !services.length) {
      return NextResponse.json({ success: false, message: "Please complete all required fields and select at least one service." }, { status: 400 });
    }
    if (!isValidEmail(email)) return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    if (!isFutureDateInIndia(deadline)) {
      return NextResponse.json({ success: false, message: FUTURE_DATE_ERROR }, { status: 400 });
    }
    if (!hasValidConsent(body.consent)) return NextResponse.json({ success: false, message: "Please agree to the Privacy Policy before submitting." }, { status: 400 });

    const trackingFields: Array<[string, string, number]> = [
      ["Submission page", "sourcePage", 500], ["Original landing page", "landingPage", 500],
      ["First visit", "firstVisitAt", 80], ["UTM source", "utmSource", 160],
      ["UTM medium", "utmMedium", 160], ["UTM campaign", "utmCampaign", 200],
      ["UTM content", "utmContent", 200], ["UTM term", "utmTerm", 200], ["Meta click ID", "fbclid", 500],
    ];
    await sendWebsiteForm({
      formName: "Katta Studio Festive Business Enquiry",
      internalSubject: `[Katta Studio] Festive Business Enquiry — ${businessName}`,
      submitterName: contactName, submitterEmail: email,
      acknowledgementMessage: "Thank you for your Katta Studio project enquiry. We have received your brief and requested delivery date. Our team will review feasibility and respond with next steps. Submission does not confirm a booking or delivery timeline.",
      sourceTag: "festive_business",
      routingEmail: "studio@kulturekatta.com",
      fields: [
        { label: "Business", value: businessName }, { label: "Contact", value: contactName },
        { label: "Email", value: email }, { label: "Mobile / WhatsApp", value: mobile },
        { label: "City", value: city }, { label: "Website / social", value: businessLink },
        { label: "Services", value: services }, { label: "Required delivery date", value: deadline },
        { label: "Indicative budget", value: budget }, { label: "Project brief", value: brief },
        ...trackingFields.map(([label, field, max]) => ({ label, value: cleanText(body[field], max) || "Unavailable" })),
      ],
    });
    return NextResponse.json({ success: true, message: "Your enquiry has been sent." });
  } catch (error) {
    console.error("[festive-business] Submission failed:", error);
    return NextResponse.json({ success: false, message: "Your enquiry could not be sent. Please try again or email studio@kulturekatta.com." }, { status: 500 });
  }
}
