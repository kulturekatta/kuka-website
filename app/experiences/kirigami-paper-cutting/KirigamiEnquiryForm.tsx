"use client";

import { useState } from "react";
import Link from "next/link";
import { getInquiryAttributionPayload } from "@/app/lib/campaign-attribution";

type Result = { success?: boolean; message?: string };

export default function KirigamiEnquiryForm() {
  const [startedAt] = useState(() => Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [eligible, setEligible] = useState(false);
  const [consent, setConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [mediaConsent, setMediaConsent] = useState(false);
  const [testimonialConsent, setTestimonialConsent] = useState(false);
  const [firstNameConsent, setFirstNameConsent] = useState(false);
  const [guardianAcknowledged, setGuardianAcknowledged] = useState(false);
  const [formGuard, setFormGuard] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !eligible || !consent || !termsAccepted || !guardianAcknowledged) return;
    setSubmitting(true);
    setResult(null);
    try {
      const response = await fetch("/api/experience-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, quantity, eligible, consent, termsAccepted, guardianAcknowledged, mediaConsent, testimonialConsent, firstNameConsent, formGuard, startedAt,
          eventId: "KUKA-KIR-26-11-v1.0",
          ...getInquiryAttributionPayload(),
        }),
      });
      const data = (await response.json()) as Result;
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to send enquiry.");
      setResult({ success: true, message: "Enquiry sent. We’ll contact you about availability and payment. Your seat is not booked or confirmed yet." });
    } catch (error) {
      setResult({ success: false, message: error instanceof Error ? error.message : "Unable to send enquiry. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const field = "mt-1 min-h-12 w-full rounded-xl border border-[#D9C8B6] bg-[#FFFCF8] px-4 text-[#30231E] outline-offset-2 focus-visible:outline-[#95613E]";
  return (
    <form onSubmit={submit} className="mt-7 space-y-5">
      <div><label htmlFor="kir-name" className="block text-sm font-semibold">Full name *</label><input id="kir-name" required maxLength={100} autoComplete="name" className={field} value={name} onChange={(e) => setName(e.target.value)} /></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="kir-email" className="block text-sm font-semibold">Email *</label><input id="kir-email" required type="email" autoComplete="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><label htmlFor="kir-phone" className="block text-sm font-semibold">Mobile / WhatsApp *</label><input id="kir-phone" required type="tel" autoComplete="tel" maxLength={40} className={field} value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
      </div>
      <div><label htmlFor="kir-quantity" className="block text-sm font-semibold">Number of participants *</label><select id="kir-quantity" className={field} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>{[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n}</option>)}</select><p className="mt-2 text-sm text-[#705C4E]">Estimated total: ₹{(quantity * 1750).toLocaleString("en-IN")} — payable only after availability is confirmed.</p></div>
      <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 accent-[#895C40]" type="checkbox" required checked={eligible} onChange={(e) => setEligible(e.target.checked)} /><span>I confirm every participant is at least 12 years old and can use a precision paper cutter safely and independently. *</span></label>
      <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 accent-[#895C40]" type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>I agree to KultureKatta using these details to respond to my enquiry, according to its <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Privacy Policy</Link>. *</span></label>
      <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 accent-[#895C40]" type="checkbox" required checked={guardianAcknowledged} onChange={(e) => setGuardianAcknowledged(e.target.checked)} /><span>If any participant is under 18, I confirm that I am their parent or legal guardian and consent to their participation. For adult-only bookings, I confirm this does not apply. *</span></label>
      <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 accent-[#895C40]" type="checkbox" required checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} /><span>I have read and agree to the <Link href="/experiences/kirigami-paper-cutting/terms" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">Kirigami event-specific booking and cancellation terms</Link>. *</span></label>
      <div className="rounded-2xl border border-[#E5D6C6] bg-[#FBF6EE] p-4 space-y-3"><p className="font-semibold">Optional publicity permissions</p><p className="text-sm leading-6 text-[#705C4E]">Photos and videos may be captured during the event. Your registration is not conditional on consenting to promotional use. Please tell the team if you prefer not to be photographed.</p>
      <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 accent-[#895C40]" type="checkbox" checked={mediaConsent} onChange={(e) => setMediaConsent(e.target.checked)} /><span>I consent to KultureKatta using identifiable photos or videos of me on its website and social media.</span></label>
      <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 accent-[#895C40]" type="checkbox" checked={testimonialConsent} onChange={(e) => setTestimonialConsent(e.target.checked)} /><span>I consent to the use of any testimonial I voluntarily provide for KultureKatta publicity.</span></label>
      <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 accent-[#895C40]" type="checkbox" checked={firstNameConsent} onChange={(e) => setFirstNameConsent(e.target.checked)} /><span>If I give a testimonial, KultureKatta may publish my first name alongside it.</span></label></div>
      <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="kir-website">Website</label><input id="kir-website" tabIndex={-1} autoComplete="off" value={formGuard} onChange={(e) => setFormGuard(e.target.value)} /></div>
      <button disabled={submitting} type="submit" className="min-h-12 w-full rounded-full bg-[#342720] px-6 font-semibold text-white transition hover:bg-[#6C4732] disabled:opacity-60">{submitting ? "Sending enquiry…" : "Enquire about availability"}</button>
      <p className="text-xs leading-5 text-[#78695C]">Submitting this form does not reserve a seat or collect payment. KultureKatta will confirm availability and share Google Pay QR instructions separately.</p>
      {result && <p role="status" className={`rounded-xl p-4 text-sm ${result.success ? "bg-[#E5F2E8] text-[#245335]" : "bg-[#FCE8E5] text-[#8D302B]"}`}>{result.message}</p>}
    </form>
  );
}
