"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import SemanticIcon from "../components/SemanticIcon";

const experienceTypes = [
  "Art, craft or creative workshop", "Food and drink", "Music or performing arts",
  "Walk, trail or exploration", "Wellness and mindful experiences",
  "Games, stories or conversation", "A combination of experiences", "Something else / not sure yet",
];
const venueOptions = ["At my location", "Please suggest a venue", "Outdoors", "Not sure yet"];
const inputClass = "mt-2 block w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[var(--kk-text)] outline-none focus:border-[var(--kk-accent)] focus:ring-2 focus:ring-[var(--kk-accent)]/20";
const labelClass = "block text-sm font-semibold text-[var(--kk-text)]";
type Status = "idle" | "submitting" | "success" | "error";

export default function PrivateExperiencesForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const startedAt = useRef(0);
  const submitting = useRef(false);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    submitting.current = true;
    setStatus("submitting"); setFeedback("");
    try {
      const response = await fetch("/api/private-experiences", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: value("fullName"), email: value("email"), phone: value("phone"),
          city: value("city"), experienceType: value("experienceType"), occasion: value("occasion"),
          preferredDate: value("preferredDate"), participants: value("participants"),
          venuePreference: value("venuePreference"), budget: value("budget"),
          message: value("message"), consent: data.get("consent") === "on",
          formGuard: value("formGuard"), startedAt: startedAt.current,
          sourcePage: "/private-experiences",
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your enquiry.");
      form.reset(); startedAt.current = Date.now();
      setStatus("success"); setFeedback("Thank you! Your enquiry has been sent. Please check your email for a confirmation.");
    } catch (error) {
      setStatus("error"); setFeedback(error instanceof Error ? error.message : "Please try again.");
    } finally { submitting.current = false; }
  }

  return (
    <section id="private-enquiry" className="kk-section-cream kk-section-padding scroll-mt-24" aria-labelledby="private-enquiry-heading">
      <div className="kk-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex justify-center"><SemanticIcon icon="✉️" label="Private experience enquiry" size="section" /></div>
          <p className="kk-section-label">Plan With Us</p>
          <h2 id="private-enquiry-heading" className="kk-section-heading mt-4">Tell us what you have in mind.</h2>
          <p className="kk-body-large mt-5">A few details are enough to get started. We will help you shape the rest.</p>
        </div>
        <form onSubmit={submit} className="kk-panel mx-auto mt-12 max-w-4xl p-6 sm:p-10" aria-label="Private experiences enquiry form">
          <p className="kk-card-body mb-7">Fields marked * are required.</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className={labelClass}>Full name *<input name="fullName" className={inputClass} maxLength={100} autoComplete="name" required /></label>
            <label className={labelClass}>Email *<input type="email" name="email" className={inputClass} maxLength={160} autoComplete="email" required /></label>
            <label className={labelClass}>Phone / WhatsApp<input type="tel" name="phone" className={inputClass} maxLength={40} autoComplete="tel" /></label>
            <label className={labelClass}>City / location *<input name="city" className={inputClass} maxLength={120} required /></label>
            <label className={labelClass}>Type of experience *<select name="experienceType" defaultValue="" className={inputClass} required><option value="" disabled>Select an experience</option>{experienceTypes.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className={labelClass}>Occasion / purpose<input name="occasion" className={inputClass} maxLength={160} placeholder="Birthday, family gathering, just because…" /></label>
            <label className={labelClass}>Preferred date<input name="preferredDate" className={inputClass} type="date" /></label>
            <label className={labelClass}>Approximate number of participants<input name="participants" className={inputClass} type="number" min={1} max={10000} placeholder="For example, 12" /></label>
            <label className={labelClass}>Venue preference<select name="venuePreference" defaultValue="" className={inputClass}><option value="">Select if known</option>{venueOptions.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className={labelClass}>Approximate budget (₹)<input name="budget" className={inputClass} maxLength={100} placeholder="Optional — total budget or range" /></label>
          </div>
          <label className={`${labelClass} mt-6`}>Tell us what you have in mind<textarea name="message" rows={4} maxLength={1800} className={inputClass} placeholder="Your ideas, group preferences, accessibility needs, anything helpful…" /></label>
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="private-form-guard">Leave empty</label><input id="private-form-guard" name="formGuard" tabIndex={-1} autoComplete="off" /></div>
          <label className="mt-7 flex items-start gap-3 text-sm leading-6 text-[var(--kk-text)]"><input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--kk-accent)]" /><span>I agree to KultureKatta using these details to respond to my enquiry, as described in the <Link href="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link>. *</span></label>
          <div className="mt-8"><button type="submit" disabled={status === "submitting"} className="kk-button-dark w-full justify-center disabled:opacity-60 sm:w-auto">{status === "submitting" ? "Sending enquiry…" : "Send Private Experience Enquiry"}</button></div>
          {feedback && <p tabIndex={-1} role={status === "error" ? "alert" : "status"} aria-live="polite" className={`mt-5 rounded-xl p-4 text-sm ${status === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>{feedback}</p>}
          <p className="kk-small-text mt-5">Trouble submitting? Email <a href="mailto:tailored@kulturekatta.com" className="underline">tailored@kulturekatta.com</a>.</p>
        </form>
      </div>
    </section>
  );
}
