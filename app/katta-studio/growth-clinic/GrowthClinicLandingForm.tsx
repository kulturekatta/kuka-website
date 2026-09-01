"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  PHONE_PATTERN,
  useAccessibleFormValidation,
  useFormDraft,
} from "../../components/formEnhancements";

type FormStatus = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const DRAFT_KEY = "kuka-growth-clinic-landing-form-draft-v1";

export default function GrowthClinicLandingForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedAtRef = useRef(0);
  const statusMessageRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef(false);
  const { formRef, saveDraft, clearDraft } = useFormDraft(DRAFT_KEY);
  const { handleInvalid, handleValidationInput } =
    useAccessibleFormValidation();

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") {
      statusMessageRef.current?.focus();
    }
  }, [status, statusMessage]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const getValue = (fieldName: string) =>
      String(formData.get(fieldName) ?? "");

    const payload = {
      brandName: getValue("brandName"),
      brandLink: getValue("brandLink"),
      painPoints: getValue("painPoints"),
      email: getValue("email"),
      city: getValue("city"),
      mobile: getValue("mobile"),
      consent: formData.get("consent") === "on",
      formGuard: getValue("formGuard"),
      startedAt: startedAtRef.current,
      sourcePage: `${window.location.pathname}${window.location.search}`,
    };

    isSubmittingRef.current = true;
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/growth-clinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Your enquiry could not be sent. Please try again.",
        );
      }

      form.reset();
      clearDraft();
      startedAtRef.current = Date.now();
      setStatus("success");
      setStatusMessage(
        "Thank you. Your Growth Clinic enquiry has been sent, and a confirmation email is on its way.",
      );

      window.dispatchEvent(
        new CustomEvent("kuka:growth-clinic-lead", {
          detail: { sourcePage: payload.sourcePage },
        }),
      );
      window.fbq?.("track", "Lead", {
        content_name: "Growth Clinic enquiry",
        content_category: "Katta Studio",
      });
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-base text-[var(--kk-text)] outline-none transition duration-200 placeholder:text-black/35 hover:border-black/20 focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-[var(--kk-accent)]/10";
  const labelClass =
    "mb-2 block text-sm font-semibold text-[var(--kk-text)] sm:text-base";

  return (
    <form
      ref={formRef}
      id="growth-clinic-contact-form"
      onSubmit={handleSubmit}
      onInvalid={handleInvalid}
      onInput={(event) => {
        handleValidationInput(event);
        saveDraft();
      }}
      className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_70px_rgba(42,30,25,0.09)] sm:p-8"
    >
      <div
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="growth-clinic-landing-form-guard">
          Leave this field empty
        </label>
        <input
          id="growth-clinic-landing-form-guard"
          name="formGuard"
          type="text"
          tabIndex={-1}
          autoComplete="new-password"
        />
      </div>

      <div className="mb-7 border-b border-black/[0.07] pb-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--kk-accent)]">
          Request a Growth Clinic
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-[-0.025em] text-[var(--kk-text)] sm:text-3xl">
          Tell us where your business feels stuck.
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--kk-text-muted)]">
          A few clear sentences are enough. We will review your enquiry and
          suggest the most useful next step.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="landing-brandName" className={labelClass}>
            Business or brand name{" "}
            <span className="text-[var(--kk-accent)]">*</span>
          </label>
          <input
            id="landing-brandName"
            name="brandName"
            type="text"
            placeholder="Your business name"
            autoComplete="organization"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="landing-brandLink" className={labelClass}>
            Website or social profile{" "}
            <span className="text-[var(--kk-accent)]">*</span>
          </label>
          <input
            id="landing-brandLink"
            name="brandLink"
            type="text"
            placeholder="Website or @handle"
            required
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="landing-painPoints" className={labelClass}>
            Where are you feeling stuck?{" "}
            <span className="text-[var(--kk-accent)]">*</span>
          </label>
          <textarea
            id="landing-painPoints"
            name="painPoints"
            placeholder="For example: Our website is not generating enquiries, our message feels unclear, and we are unsure what to prioritise."
            rows={4}
            required
            className={`${inputClass} min-h-32 resize-y leading-relaxed`}
          />
        </div>

        <div>
          <label htmlFor="landing-email" className={labelClass}>
            Email address <span className="text-[var(--kk-accent)]">*</span>
          </label>
          <input
            id="landing-email"
            name="email"
            type="email"
            inputMode="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="landing-mobile" className={labelClass}>
            Mobile / WhatsApp{" "}
            <span className="text-[var(--kk-accent)]">*</span>
          </label>
          <input
            id="landing-mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            pattern={PHONE_PATTERN}
            title="Use 7–20 digits with an optional +, spaces, parentheses, or hyphens."
            required
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="landing-city" className={labelClass}>
            City <span className="text-[var(--kk-accent)]">*</span>
          </label>
          <input
            id="landing-city"
            name="city"
            type="text"
            placeholder="Your city"
            autoComplete="address-level2"
            required
            className={inputClass}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-black/[0.018] p-4 sm:col-span-2">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--kk-accent)]"
          />
          <span className="text-sm leading-6 text-[var(--kk-text-muted)]">
            I agree that Katta Studio may use this information to review and
            respond to my enquiry as described in the{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold underline decoration-black/30 underline-offset-2 hover:decoration-black"
            >
              Privacy Policy
            </Link>. <span aria-hidden="true">*</span>
          </span>
        </label>
      </div>

      {statusMessage && (
        <div
          ref={statusMessageRef}
          tabIndex={-1}
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
          className={`mt-5 rounded-2xl px-5 py-4 text-sm font-medium ${
            status === "error"
              ? "border border-red-200 bg-red-50 text-red-700"
              : "border border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="kk-button-dark mt-6 flex w-full items-center justify-center gap-3 px-8 py-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting"
          ? "Sending enquiry..."
          : "Request my Growth Clinic"}
        <span aria-hidden="true">→</span>
      </button>

      <p className="mt-4 text-center text-sm leading-6 text-[var(--kk-text-muted)]">
        You will receive an email confirmation after submission.
      </p>
    </form>
  );
}
