"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COOKIE_CONSENT_KEY } from "../../components/CookieBanner";
import { earliestFutureDateInIndia, FUTURE_DATE_ERROR, isFutureDateInIndia } from "../../lib/future-date";
import { PHONE_PATTERN, useAccessibleFormValidation, useFormDraft } from "../../components/formEnhancements";

type FormStatus = "idle" | "submitting" | "success" | "error";
type Attribution = Record<"utmSource" | "utmMedium" | "utmCampaign" | "utmContent" | "utmTerm" | "fbclid" | "landingPage" | "firstVisitAt", string>;
const ATTRIBUTION_STORAGE_KEY = "kuka-growth-attribution-v1";
const DRAFT_KEY = "kuka-festive-business-form-draft-v1";

function readAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  let previous: Partial<Attribution> = {};
  try { previous = JSON.parse(window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}"); } catch { /* ignore invalid stored data */ }
  const fields: Array<[keyof Attribution, string]> = [
    ["utmSource", "utm_source"], ["utmMedium", "utm_medium"], ["utmCampaign", "utm_campaign"],
    ["utmContent", "utm_content"], ["utmTerm", "utm_term"], ["fbclid", "fbclid"],
  ];
  const hasNewCampaign = fields.some(([, key]) => params.has(key));
  const attribution = {} as Attribution;
  fields.forEach(([field, key]) => { attribution[field] = params.get(key) || (hasNewCampaign ? "" : previous[field] || ""); });
  attribution.landingPage = hasNewCampaign ? `${window.location.pathname}${window.location.search}` : (previous.landingPage || `${window.location.pathname}${window.location.search}`);
  attribution.firstVisitAt = hasNewCampaign ? new Date().toISOString() : (previous.firstVisitAt || new Date().toISOString());
  if (hasNewCampaign) {
    try { window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify({...attribution, savedAt: Date.now()})); } catch { /* storage may be disabled */ }
  }
  return attribution;
}

const serviceOptions = ["Social & digital campaigns", "Print & event collateral", "Packaging & gifting", "Retail & in-store design", "Brand design support", "Sales & business communication", "Merchandise & branded products", "Other"];
const inputClass = "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-[var(--kk-text)] outline-none placeholder:text-[#59524c] focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-[var(--kk-accent)]/10";
const labelClass = "mb-2 block text-sm font-semibold text-[var(--kk-text)]";

export default function FestiveBusinessForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [consentError, setConsentError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const deadlineInput = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  const processing = useRef(false);
  const feedback = useRef<HTMLDivElement>(null);
  const attribution = useRef<Attribution | null>(null);
  const { formRef, saveDraft, clearDraft } = useFormDraft(DRAFT_KEY);
  const { handleInvalid, handleValidationInput } = useAccessibleFormValidation();

  useEffect(() => {
    startedAt.current = Date.now();
    attribution.current = readAttribution();
    if (deadlineInput.current) {
      deadlineInput.current.min = earliestFutureDateInIndia();
    }
  }, []);
  useEffect(() => { if (status === "error" || status === "success") feedback.current?.focus(); }, [status, message]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (processing.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const val = (name: string) => String(data.get(name) || "");
    if (!isFutureDateInIndia(val("deadline"))) {
      setDeadlineError(true);
      const input = form.elements.namedItem("deadline");
      if (input instanceof HTMLInputElement) input.focus();
      return;
    }
    setDeadlineError(false);
    const tracking = attribution.current || readAttribution();
    const payload = {
      businessName: val("businessName"), contactName: val("contactName"), email: val("email"), mobile: val("mobile"),
      city: val("city"), businessLink: val("businessLink"), services: data.getAll("services").map(String),
      brief: val("brief"), deadline: val("deadline"), budget: val("budget"),
      consent: data.get("consent") === "on", formGuard: val("formGuard"), startedAt: startedAt.current,
      sourcePage: `${window.location.pathname}${window.location.search}`, ...tracking,
    };
    processing.current = true;
    setStatus("submitting"); setMessage("");
    try {
      const response = await fetch("/api/festive-business", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "We could not send your inquiry. Please try again.");
      form.reset(); clearDraft(); startedAt.current = Date.now(); setConsentError(false); setDeadlineError(false);
      setStatus("success"); setMessage("Your inquiry has been sent. Please check your email for confirmation.");
      try {
        if (window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted") {
          const pixel = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
          pixel?.("track", "Lead", { content_name: "Katta Studio Festive Business", content_category: "Business creative inquiry", form_location: "Festive Business landing page" });
        }
      } catch { /* analytics must not interrupt successful submission */ }
    } catch (err) {
      setStatus("error"); setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally { processing.current = false; }
  }

  return (
    <form ref={formRef} onSubmit={submit} onInvalid={(event) => { if (event.target instanceof HTMLInputElement && event.target.name === "deadline") { setDeadlineError(true); return; } if (event.target instanceof HTMLInputElement && event.target.name === "consent") { setConsentError(true); return; } handleInvalid(event); }} onInput={(event) => { if (event.target instanceof HTMLInputElement && event.target.name === "deadline") { setDeadlineError(Boolean(event.target.value) && !isFutureDateInIndia(event.target.value)); } handleValidationInput(event); if (event.target instanceof HTMLInputElement && event.target.name === "consent" && event.target.checked) setConsentError(false); saveDraft(); }} className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_70px_rgba(42,30,25,0.09)] sm:p-8">
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="festive-guard">Leave this field empty</label><input id="festive-guard" type="text" name="formGuard" tabIndex={-1} autoComplete="new-password" /></div>
      <h3 className="text-2xl font-bold tracking-tight">Request a project quote</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--kk-text-muted)]">Fields marked * are required. We will confirm availability before committing to a deadline.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div><label className={labelClass} htmlFor="festive-business">Business or brand name *</label><input className={inputClass} id="festive-business" name="businessName" autoComplete="organization" required maxLength={160} /></div>
        <div><label className={labelClass} htmlFor="festive-contact">Your name *</label><input className={inputClass} id="festive-contact" name="contactName" autoComplete="name" required maxLength={160} /></div>
        <div><label className={labelClass} htmlFor="festive-email">Email *</label><input className={inputClass} id="festive-email" name="email" type="email" autoComplete="email" required /></div>
        <div><label className={labelClass} htmlFor="festive-mobile">Mobile / WhatsApp *</label><input className={inputClass} id="festive-mobile" name="mobile" type="tel" pattern={PHONE_PATTERN} title="Use 7–20 digits with an optional +, spaces, parentheses, or hyphens." autoComplete="tel" required /></div>
        <div><label className={labelClass} htmlFor="festive-city">City *</label><input className={inputClass} id="festive-city" name="city" autoComplete="address-level2" required /></div>
        <div><label className={labelClass} htmlFor="festive-link">Website or social profile (optional)</label><input className={inputClass} id="festive-link" name="businessLink" placeholder="Website URL or @handle" /></div>
        <fieldset className="sm:col-span-2"><legend className={labelClass}>What do you need? *</legend><div className="grid gap-3 sm:grid-cols-2">{serviceOptions.map((service) => <label key={service} className="flex items-start gap-2 text-sm leading-6"><input type="checkbox" name="services" value={service} className="mt-1 h-4 w-4 accent-[var(--kk-accent)]" /><span>{service}</span></label>)}</div><p className="mt-2 text-xs text-[var(--kk-text-muted)]">Choose one or more.</p></fieldset>
        <div><label className={labelClass} htmlFor="festive-deadline">Required delivery date *</label><input className={inputClass} id="festive-deadline" name="deadline" type="date" ref={deadlineInput} required aria-invalid={deadlineError || undefined} aria-describedby={deadlineError ? "festive-deadline-error" : "festive-deadline-hint"} onFocus={(event) => { event.currentTarget.min = earliestFutureDateInIndia(); }} onChange={(event) => setDeadlineError(Boolean(event.currentTarget.value) && !isFutureDateInIndia(event.currentTarget.value))} /><p id="festive-deadline-hint" className="mt-2 text-xs text-[var(--kk-text-muted)]">Choose tomorrow or a later date.</p>{deadlineError && <p id="festive-deadline-error" role="alert" className="mt-2 text-sm font-semibold leading-6 text-red-700">{FUTURE_DATE_ERROR}</p>}</div>
        <div><label className={labelClass} htmlFor="festive-budget">Approximate budget</label><select className={inputClass} id="festive-budget" name="budget" defaultValue=""><option value="">Select a range (optional)</option><option value="Under ₹5,000">Under ₹5,000</option><option value="₹5,000–₹15,000">₹5,000–₹15,000</option><option value="₹15,000–₹30,000">₹15,000–₹30,000</option><option value="₹30,000+">₹30,000+</option><option value="Need guidance">Need guidance</option></select></div>
        <div className="sm:col-span-2"><label className={labelClass} htmlFor="festive-brief">Tell us about the project *</label><textarea className={`${inputClass} min-h-32 resize-y`} id="festive-brief" name="brief" rows={4} required maxLength={2500} placeholder="What needs designing, how many items, where will they be used, and what is already ready?" /></div>
        <div className="rounded-2xl border border-black/10 bg-black/[0.018] p-4 sm:col-span-2">
          <label className="flex items-start gap-3">
            <input type="checkbox" name="consent" required aria-invalid={consentError || undefined} aria-describedby={consentError ? "festive-consent-error" : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[var(--kk-accent)]" onChange={(event) => { if (event.currentTarget.checked) setConsentError(false); }} />
            <span className="min-w-0 text-sm leading-6 text-[var(--kk-text-muted)]">I agree that Katta Studio may use this information to respond to my inquiry, as described in the <Link className="font-semibold underline underline-offset-2" href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>. *</span>
          </label>
          {consentError && <p id="festive-consent-error" className="mt-2 pl-8 text-sm font-semibold leading-6 text-red-700">Please complete this required field.</p>}
        </div>
      </div>
      {message && <div ref={feedback} tabIndex={-1} role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"} className={`mt-5 rounded-xl p-4 text-sm ${status === "error" ? "bg-red-50 text-red-800" : "bg-emerald-50 text-emerald-800"}`}>{message}</div>}
      <button className="kk-button-dark mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending inquiry…" : "Send project inquiry →"}</button>
      <p className="mt-4 text-center text-xs text-[var(--kk-text-muted)]">No payment is taken through this form.</p>
    </form>
  );
}