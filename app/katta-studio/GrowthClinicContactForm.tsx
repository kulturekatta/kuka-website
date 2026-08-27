"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  PHONE_PATTERN,
  useAccessibleFormValidation,
  useFormDraft,
} from "../components/formEnhancements";
import SemanticIcon from "../components/SemanticIcon";

type FormStatus = "idle" | "submitting" | "success" | "error";
const GROWTH_CLINIC_DRAFT_KEY =
  "kuka-growth-clinic-form-draft-v1";

export default function GrowthClinicContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedAtRef = useRef(0);
  const statusMessageRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef(false);
  const { formRef, saveDraft, clearDraft } = useFormDraft(
    GROWTH_CLINIC_DRAFT_KEY,
  );
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
      formGuard: String(formData.get("formGuard") ?? ""),
      startedAt: startedAtRef.current,
      sourcePage: "/katta-studio#growth-clinic-form",
    };

    isSubmittingRef.current = true;
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/growth-clinic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    "min-w-0 w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-base text-[var(--kk-text)] outline-none transition duration-200 placeholder:text-black/35 hover:border-black/20 focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-[var(--kk-accent)]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[var(--kk-text)] sm:text-base";

  const sectionClass =
    "rounded-3xl border border-black/[0.07] bg-black/[0.018] p-5 sm:p-7";

  const sectionNumberClass =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--kk-accent)] text-sm font-bold text-white";

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
      className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.07)]"
    >
      <div
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="growth-clinic-form-guard">
          Leave this field empty
        </label>
        <input
          id="growth-clinic-form-guard"
          name="formGuard"
          type="text"
          tabIndex={-1}
          autoComplete="new-password"
        />
      </div>

      {/* FORM INTRODUCTION */}
      <div className="border-b border-black/[0.07] bg-[var(--kk-accent)]/[0.055] px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="mb-5 flex justify-center">
          <SemanticIcon icon="🌡️" label="Growth Clinic enquiry" size="section" />
        </div>

        <p className="kk-page-label text-[var(--kk-accent)]">
          Get in touch
        </p>

        <h2 className="kk-section-heading mx-auto mt-3 max-w-3xl">
          Let’s look at what is really blocking your growth.
        </h2>

        <p className="kk-body mx-auto mt-5 max-w-2xl">
          Tell us about your brand, where you feel stuck, and what you are
          trying to grow. We will review it and suggest the next step.
        </p>
      </div>

      <div className="grid gap-6 p-5 sm:p-8 lg:p-10">
        {/* SECTION 1 */}
        <section className={sectionClass}>
          <div className="mb-6 flex items-start gap-4">
            <span className={sectionNumberClass}>1</span>

            <SemanticIcon icon="🏷️" label="About your brand" size="compact" />

            <div>
              <h3 className="text-xl font-bold text-[var(--kk-text)]">
                About your brand
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-[var(--kk-text-muted)]">
                Give us a quick introduction to your business or project.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="brandName" className={labelClass}>
                Brand name <span className="text-[var(--kk-accent)]">*</span>
              </label>

              <input
                id="brandName"
                name="brandName"
                type="text"
                placeholder="Your brand name"
                autoComplete="organization"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="brandLink" className={labelClass}>
                Website or social profile{" "}
                <span className="text-[var(--kk-accent)]">*</span>
              </label>

              <input
                id="brandLink"
                name="brandLink"
                type="text"
                placeholder="@yourhandle or website link"
                required
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className={sectionClass}>
          <div className="mb-6 flex items-start gap-4">
            <span className={sectionNumberClass}>2</span>

            <SemanticIcon
              icon="🚧"
              label="Where you are feeling stuck"
              size="compact"
            />

            <div>
              <h3 className="text-xl font-bold text-[var(--kk-text)]">
                Where are you feeling stuck?
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-[var(--kk-text-muted)]">
                Share the three most important problems you want to solve.
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="painPoints" className={labelClass}>
              Your three main pain points{" "}
              <span className="text-[var(--kk-accent)]">*</span>
            </label>

            <textarea
              id="painPoints"
              name="painPoints"
              placeholder={`For example:\n1. Our website is not generating enquiries\n2. Our social media feels inconsistent\n3. We are unsure what to prioritise`}
              rows={6}
              required
              className={`${inputClass} min-h-40 resize-y leading-relaxed`}
            />

            <p className="mt-2 text-xs leading-relaxed text-[var(--kk-text-muted)]">
              A few clear sentences are enough. No corporate essay required.
            </p>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className={sectionClass}>
          <div className="mb-6 flex items-start gap-4">
            <span className={sectionNumberClass}>3</span>

            <SemanticIcon icon="☎️" label="Contact details" size="compact" />

            <div>
              <h3 className="text-xl font-bold text-[var(--kk-text)]">
                Your contact details
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-[var(--kk-text-muted)]">
                Let us know where and how we can reach you.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email address{" "}
                <span className="text-[var(--kk-accent)]">*</span>
              </label>

              <input
                id="email"
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
              <label htmlFor="city" className={labelClass}>
                City <span className="text-[var(--kk-accent)]">*</span>
              </label>

              <input
                id="city"
                name="city"
                type="text"
                placeholder="Your city"
                autoComplete="address-level2"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="mobile" className={labelClass}>
                Mobile / WhatsApp number{" "}
                <span className="text-[var(--kk-accent)]">*</span>
              </label>

              <input
                id="mobile"
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

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 md:col-span-2">
              <SemanticIcon
                icon="🛡️"
                label="Privacy consent"
                size="compact"
              />

              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-5 w-5 shrink-0 accent-[var(--kk-accent)]"
              />
              <span className="text-sm leading-6 text-[var(--kk-text-muted)]">
                I agree that Katta Studio may use the information submitted
                here to review and respond to my enquiry as described in the{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold underline decoration-black/30 underline-offset-2 hover:decoration-black"
                >
                  Privacy Policy
                </Link>.{" "}
                <span aria-hidden="true">*</span>
              </span>
            </label>
          </div>
        </section>

        {/* FORM STATUS */}
        {statusMessage && (
          <div
            ref={statusMessageRef}
            tabIndex={-1}
            role={status === "error" ? "alert" : "status"}
            aria-live={status === "error" ? "assertive" : "polite"}
            className={`rounded-2xl px-5 py-4 text-sm font-medium ${
              status === "error"
                ? "border border-red-200 bg-red-50 text-red-700"
                : "border border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* SUBMIT AREA */}
        <div className="rounded-3xl bg-[var(--kk-accent)]/[0.07] px-5 py-6 text-center sm:px-8 sm:py-8">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="kk-button-dark flex w-full items-center justify-center gap-3 px-8 py-4 disabled:cursor-not-allowed disabled:opacity-60 sm:mx-auto sm:w-auto sm:min-w-80"
          >
            {status === "submitting" ? "Sending enquiry..." : "Send enquiry"}
            <span aria-hidden="true">→</span>
          </button>

          <p className="mt-4 text-sm leading-relaxed text-[var(--kk-text-muted)]">
            You will receive an automatic confirmation after a successful
            submission.
          </p>
        </div>
      </div>
    </form>
  );
}
