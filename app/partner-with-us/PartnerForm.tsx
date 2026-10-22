"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";

const categories = [
  "Artist / Performer / Creative Practitioner",
  "Workshop Facilitator / Educator",
  "Venue / Hospitality / Space Partner",
  "Cultural Organization / Institution",
  "Brand / Business / Corporate Representative",
  "Community / Collective / Club",
  "Artisan / Maker / Producer",
  "Travel / Tourism / Local Experience Partner",
  "Other Collaborator",
];

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

export default function PartnerForm() {
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
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/partner-with-us", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: get("fullName"), email: get("email"), phone: get("phone"),
          city: get("city"), organization: get("organization"),
          partnerType: get("partnerType"), interests: fd.getAll("interests").map(String),
          portfolioLink: get("portfolioLink"), message: get("message"),
          consent: fd.get("consent") === "on", formGuard: get("formGuard"),
          startedAt: startedAt.current, sourcePage: "/partner-with-us",
        }),
      });
      const result: { message?: string } = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to submit your enquiry.");
      setStatus("success"); setMessage("Thank you. We have received your partnership enquiry.");
      form.reset(); startedAt.current = Date.now();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again later.");
    }
  }

  const input = "mt-2.5 block min-h-11 w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-[var(--kk-text)] outline-none transition duration-200 placeholder:text-black/35 hover:border-black/25 focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-black/5";
  const field = "kk-form-label block text-sm font-semibold tracking-[0.01em] text-[var(--kk-text)]";
  return (
    <form onSubmit={submit} className="kk-panel p-6 sm:p-9" aria-label="Partner With Us enquiry form">
      <h2 className="kk-card-title">Tell us about yourself</h2>
      <p className="kk-card-body mt-3">Fields marked * are required. Please share links rather than uploading files.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className={field}>Name *<input className={input} name="fullName" maxLength={100} autoComplete="name" required /></label>
        <label className={field}>Email *<input className={input} type="email" name="email" maxLength={160} autoComplete="email" required /></label>
        <label className={field}>City / location *<input className={input} name="city" maxLength={120} required /></label>
        <label className={field}>Phone / WhatsApp<input className={input} name="phone" type="tel" maxLength={40} autoComplete="tel" /></label>
        <label className={field}>Your organization / practice<input className={input} name="organization" maxLength={120} /></label>
        <label className={field}>Which best describes you? *<select className={input} name="partnerType" defaultValue="" required><option value="" disabled>Select one</option>{categories.map((x)=><option key={x}>{x}</option>)}</select></label>
      </div>
      <fieldset className="mt-6">
        <legend className={field}>I&apos;m interested in… (select all that apply)</legend>
        <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {interests.map((interest) => (
            <label key={interest} className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[var(--kk-text)]">
              <input
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--kk-accent)]"
                type="checkbox"
                name="interests"
                value={interest}
              />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className={`${field} mt-5`}>Portfolio, website or social profile (optional)<input className={input} name="portfolioLink" type="url" maxLength={500} placeholder="https://" /></label>
      <label className={`${field} mt-5`}>Tell us a little more about your idea (optional)<textarea className={input} name="message" rows={3} maxLength={1800} placeholder="Have something specific in mind? Tell us about it. If you’re just exploring possibilities, that’s fine too." /></label>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label>Leave this empty<input name="formGuard" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[var(--kk-text)]"><input className="mt-1 h-4 w-4" type="checkbox" name="consent" required /><span>I agree to KultureKatta using these details to respond to my enquiry, as described in the <Link className="font-semibold underline underline-offset-4 hover:text-[var(--kk-accent)]" href="/privacy-policy">Privacy Policy</Link>. *</span></label>
      <button type="submit" disabled={status === "sending"} className="kk-button-dark mt-6 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-50">{status === "sending" ? "Sending…" : "Send partnership enquiry"}</button>
      {message && <p role={status === "error" ? "alert" : "status"} className={`mt-4 text-sm ${status === "error" ? "text-red-700" : "text-green-800"}`}>{message}</p>}
    </form>
  );
}
