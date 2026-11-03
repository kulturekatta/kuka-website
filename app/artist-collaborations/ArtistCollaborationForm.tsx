"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import SemanticIcon from "../components/SemanticIcon";
import { getInquiryAttributionPayload } from "../lib/campaign-attribution";

const disciplines = [
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
];

const formats = [
  "Hands-on workshop",
  "Performance or demonstration",
  "Walk, trail or outdoor experience",
  "Talk or storytelling session",
  "Family, school or children's experience",
  "Ongoing series or community program",
  "Open to exploring",
];

export default function ArtistCollaborationForm() {
  const startedAt = useRef(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    const get = (name: string) => String(fd.get(name) ?? "").trim();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/artist-collaborations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...getInquiryAttributionPayload(),
          fullName: get("fullName"), email: get("email"), city: get("city"),
          phone: get("phone"), practiceName: get("practiceName"),
          discipline: get("discipline"),
          formats: fd.getAll("formats").map(String),
          portfolioLink: get("portfolioLink"),
          idea: get("idea"), preferredLocations: get("preferredLocations"),
          practicalNotes: get("practicalNotes"),
          consent: fd.get("consent") === "on",
          formGuard: get("formGuard"), startedAt: startedAt.current,
          sourcePage: "/artist-collaborations",
        }),
      });
      const result: { message?: string } = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to submit your introduction.");
      setStatus("success");
      setMessage("Thank you! We've received your introduction. We'll be in touch if a suitable collaboration opportunity arises.");
      form.reset();
      startedAt.current = Date.now();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again later.");
    }
  }

  const input = "mt-2.5 block min-h-11 w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-[var(--kk-text)] outline-none transition duration-200 placeholder:text-black/35 hover:border-black/25 focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-black/5";
  const field = "kk-form-label block text-sm font-semibold tracking-[0.01em] text-[var(--kk-text)]";

  return (
    <form onSubmit={submit} className="kk-panel p-6 sm:p-9" aria-label="Artist collaboration introduction form">
      <div className="mb-5 flex justify-center"><SemanticIcon icon="🎨" label="Artist collaboration details" size="card" /></div>
      <h3 className="kk-card-title">Introduce your creative practice</h3>
      <p className="kk-card-body mt-3">Fields marked * are required. Please share links instead of uploading files.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className={field}>Your name *<input className={input} name="fullName" autoComplete="name" maxLength={100} required /></label>
        <label className={field}>Email *<input className={input} type="email" name="email" autoComplete="email" maxLength={160} required /></label>
        <label className={field}>City / location *<input className={input} name="city" maxLength={120} required /></label>
        <label className={field}>Phone / WhatsApp<input className={input} type="tel" name="phone" autoComplete="tel" maxLength={40} /></label>
        <label className={field}>Practice / collective name (optional)<input className={input} name="practiceName" maxLength={120} /></label>
        <label className={field}>Your primary discipline *<select className={input} name="discipline" defaultValue="" required><option value="" disabled>Choose a discipline</option>{disciplines.map((discipline) => <option key={discipline} value={discipline}>{discipline}</option>)}</select></label>
      </div>
      <fieldset className="mt-6">
        <legend className={field}>What formats interest you? (Select any)</legend>
        <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {formats.map((format) => (
            <label key={format} className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[var(--kk-text)]">
              <input className="mt-1 h-4 w-4 shrink-0 accent-[var(--kk-accent)]" type="checkbox" name="formats" value={format} />
              <span>{format}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className={`${field} mt-6`}>Portfolio, website or social profile<input className={input} name="portfolioLink" type="url" maxLength={500} placeholder="https://" /></label>
      <label className={`${field} mt-6`}>What would you love to create with KuKa? *<textarea className={input} name="idea" rows={4} maxLength={1800} required placeholder="Tell us about your practice, an idea, or a kind of experience you could facilitate." /></label>
      <label className={`${field} mt-6`}>Locations where you could collaborate<input className={input} name="preferredLocations" maxLength={250} placeholder="e.g. Pune, Mumbai, online, or open to travel" /></label>
      <label className={`${field} mt-6`}>Anything else we should know? (optional)<textarea className={input} name="practicalNotes" rows={3} maxLength={1000} placeholder="Group sizes, materials, accessibility or other practical considerations" /></label>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label>Leave this empty<input name="formGuard" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[var(--kk-text)]">
        <input className="mt-1 h-4 w-4" type="checkbox" name="consent" required />
        <span>I agree to KultureKatta using these details to respond to my collaboration enquiry, as described in the <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">Privacy Policy</Link>. *</span>
      </label>
      <div className="mt-6 grid w-full grid-cols-1 items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
        <button type="button" disabled={status === "sending"} onClick={(event) => {
          const form = event.currentTarget.form;
          if (!form) return;
          form.reset(); setStatus("idle"); setMessage(""); startedAt.current = Date.now();
        }} className="flex min-h-12 w-full items-center justify-center rounded-full border border-[#2A1E19]/25 !bg-white px-4 py-3 text-center text-sm font-semibold leading-snug !text-[#2A1E19] transition-colors hover:!bg-[#f8f5f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A1E19] disabled:opacity-50">Clear Form</button>
        <button type="submit" disabled={status === "sending"} className="kk-button-dark flex min-h-12 w-full items-center justify-center rounded-full border border-[#2A1E19] !bg-[#2A1E19] px-4 py-3 text-center text-sm font-semibold leading-snug !text-white transition-colors hover:!bg-[#402b23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A1E19] disabled:opacity-60">{status === "sending" ? "Sending…" : "Send my introduction"}</button>
      </div>
      {message && <p role={status === "error" ? "alert" : "status"} aria-live="polite" className={`mt-4 text-sm ${status === "error" ? "text-red-700" : "text-green-800"}`}>{message}</p>}
    </form>
  );
}
