import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { type LegalSection } from "../../../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Kirigami Workshop — Event Terms | KultureKatta",
  description: "Event-specific attendance, cancellation, transfer, privacy and filming terms for the 14 November 2026 Kirigami workshop at QALA in Pune.",
  alternates: { canonical: "/experiences/kirigami-paper-cutting/terms" },
};

const topics = [
  {title:"Eligibility and safety",icon:"🛡️", paragraphs:["This Kirigami workshop is open to people aged 12 and above. Each participant must be able to handle a precision paper cutter safely and independently. No previous Kirigami experience is required.","A parent or legal guardian must make or authorise bookings for participants younger than 18, and must provide the permissions required for their participation and any publicity use."]},
  {title:"Booking and payment",icon:"🎟️", paragraphs:["Submitting an enquiry does not reserve a seat. A seat is confirmed only after KultureKatta verifies the payment and issues a booking confirmation and reference number.","Bookings depend on available seats. The quoted ticket price is ₹1,750 per participant, including the workshop materials and ₹250 QALA food coupon as described on the workshop page."]},
  {title:"If a participant cancels",icon:"↩️", paragraphs:["Participant-initiated cancellations are non-refundable, subject to applicable law.","You may request to transfer your booking to another eligible person, subject to advance notification, event capacity and KultureKatta’s confirmation. The replacement participant must meet the same event-specific age and safety requirements."]},
  {title:"Moving to another experience",icon:"🔄", paragraphs:["Instead of attending, you may request to move your booking to a similar or different KultureKatta experience, including one held at another venue or in another city, subject to availability and approval before the originally booked session begins.","A switch to a higher-priced experience requires payment of the price difference. A switch to an equal- or lower-priced experience does not automatically create a cash refund or credit for any price difference. Contact us to agree the details before switching."]},
  {title:"If KultureKatta cancels or changes the event",icon:"📅", paragraphs:["If KultureKatta cancels the workshop, you may choose a refund or an offered replacement session, where available.","If the event date or venue is changed, we will notify registered participants. You may accept the revised details or request a refund if the new arrangement does not work for you. Any refund will be returned through an agreed, verifiable method; you will receive confirmation of the refund process."]},
  {title:"Photography, video and testimonials",icon:"📷", paragraphs:["KultureKatta may photograph or film the event for documentation. Please tell the organising team if you do not wish to appear in identifiable photographs or recordings.","We will request separate, optional permission before using identifiable images, videos or voluntarily supplied testimonials for publicity on our website and social media. We will request separate optional permission before publishing your first name with a testimonial. We do not publish your email address, phone number or other contact details.","Where someone younger than 18 is involved, publicity permission must come from their parent or legal guardian. A participant may withdraw optional publicity permission by contacting KultureKatta; withdrawal will apply to future use where feasible, although previously distributed material cannot always be fully recalled."]},
  {title:"Event updates and communication",icon:"✉️", paragraphs:["We use the contact information provided with a booking to communicate essential event details, changes, payment verification and booking information. Promotional subscriptions and publicity permissions are separate and optional.","Please contact KultureKatta as soon as possible if a booking needs correction, transfer, or accessibility assistance. Statutory consumer rights remain unaffected by these terms."]},
];
const sections: LegalSection[] = topics.map((topic, index) => ({
  id: `term-${index + 1}`,
  title: topic.title,
  icon: topic.icon,
  content: (
    <>
      {topic.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  ),
}));

export default function KirigamiTerms() {
  return (
    <LegalPageLayout
      icon="📜"
      iconLabel="Kirigami workshop terms"
      categoryLabel="Event-specific terms"
      title="Good plans. Clear terms."
      description="Kirigami Paper Cutting Workshop · Saturday, 14 November 2026 · 10 AM–12 noon · QALA Café & Co-works, Baner, Pune. Ages 12 and above; independent precision cutter use required."
      lastUpdated="November 5, 2026"
      currentPath="/experiences/kirigami-paper-cutting/terms"
      backLink={{ href: "/experiences/kirigami-paper-cutting", label: "Back to the workshop" }}
      sections={sections}
      closingNote={
        <div className="space-y-4 text-center">
          <p className="kk-card-title">Questions about your booking?</p>
          <p className="kk-body mx-auto max-w-2xl">
            Contact KultureKatta before making payment if you need clarification about transfers, age restrictions, refunds, or publicity permissions.
          </p>
          <Link href="/contact" className="kk-button-dark inline-flex">
            Contact us
          </Link>
        </div>
      }
    />
  );
}
