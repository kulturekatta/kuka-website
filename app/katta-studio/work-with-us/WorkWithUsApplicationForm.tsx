"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

const opportunityOptions = [
  "Full-time role",
  "Part-time role",
  "Internship",
  "Freelance assignment",
  "Project-based collaboration",
  "Specialist collaboration",
  "Not sure yet",
];

const workArrangementOptions = [
  "Remote",
  "Hybrid",
  "On-site",
  "Flexible",
  "Open to discussion",
];

const applicationTips = [
  {
    number: "01",
    title: "Share relevant work",
    description:
      "Add a portfolio, résumé, LinkedIn profile, Google Drive folder or links to work samples.",
  },
  {
    number: "02",
    title: "State your availability",
    description:
      "Tell us when you can begin and how many hours or days you can commit.",
  },
  {
    number: "03",
    title: "Mention your expectations",
    description:
      "Share your expected salary, stipend, hourly rate or project fee wherever possible.",
  },
];

const inputClassName =
  "mt-2.5 w-full rounded-2xl border border-black/15 bg-white px-4 py-3.5 text-base text-[var(--kk-text)] shadow-sm outline-none transition duration-200 placeholder:text-black/35 hover:border-black/30 focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-[var(--kk-accent)]/15";

const labelClassName =
  "block text-[0.95rem] font-semibold leading-6 text-[var(--kk-text)]";

const helperClassName = "mt-2 text-sm leading-6 text-black/55";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function WorkWithUsApplicationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const getValue = (fieldName: string) =>
      String(formData.get(fieldName) ?? "").trim();

    const payload = {
      fullName: getValue("fullName"),
      city: getValue("city"),
      email: getValue("email"),
      phone: getValue("phone"),
      opportunityType: getValue("opportunityType"),
      workArrangement: getValue("workArrangement"),
      availability: getValue("availability"),
      compensation: getValue("compensation"),
      portfolioLink: getValue("portfolioLink"),
      experience: getValue("experience"),
      message: getValue("message"),
      consent: formData.get("consent") === "on",
      formGuard: getValue("formGuard"),
      startedAt: startedAtRef.current,
      sourcePage: "/katta-studio/work-with-us#application-form",
    };

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/work-with-us", {
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
            "Your application could not be sent. Please try again.",
        );
      }

      form.reset();
      startedAtRef.current = Date.now();
      setStatus("success");
      setStatusMessage(
        "Thank you. Your application has been sent, and a confirmation email is on its way.",
      );
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section
      id="application-form"
      className="kk-section-cream scroll-mt-32 py-20 md:py-24"
    >
      <div className="kk-container">
        {/* FORM INTRODUCTION */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="kk-section-label text-[var(--kk-accent)]">
            Apply to Work With Us
          </p>

          <h2 className="kk-section-heading mt-4">
            Tell us what you do and how you would like to work with us.
          </h2>

          <p className="kk-body mx-auto mt-5 max-w-2xl">
            Share the essentials below. We value relevant work, reliability and
            willingness to learn more than an elaborate cover letter.
          </p>
        </div>

        {/* MAIN FORM CARD */}
        <div className="mx-auto mt-12 max-w-7xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(45,35,25,0.10)] md:mt-16">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            {/* INFORMATION COLUMN */}
            <aside className="relative overflow-hidden border-b border-black/10 bg-[var(--kk-surface-alt)] p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[36px] border-white/35"
              />

              <div className="relative">
                <p className="kk-section-label">Before You Apply</p>

                <h3 className="kk-card-title mt-4 max-w-sm">
                  Keep it clear and useful.
                </h3>

                <p className="kk-body mt-4 max-w-md">
                  A few specific details will help us understand where you could
                  fit and what kind of opportunity may work for both sides.
                </p>

                <div className="mt-9 space-y-4">
                  {applicationTips.map((tip) => (
                    <div
                      key={tip.number}
                      className="rounded-2xl border border-black/10 bg-white/75 p-5 backdrop-blur-sm"
                    >
                      <div className="flex gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--kk-accent)] text-xs font-bold tracking-[0.08em] text-white">
                          {tip.number}
                        </span>

                        <div>
                          <h4 className="font-semibold leading-6 text-[var(--kk-text)]">
                            {tip.title}
                          </h4>

                          <p className="mt-1.5 text-sm leading-6 text-black/60">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-dashed border-black/20 p-5">
                  <p className="text-sm font-semibold text-[var(--kk-text)]">
                    Sharing a résumé or portfolio?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-black/60">
                    Add a publicly accessible portfolio, LinkedIn, Google Drive,
                    or résumé link in the form.
                  </p>
                </div>
              </div>
            </aside>

            {/* APPLICATION FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-7 sm:p-10 lg:p-12 xl:p-14"
            >
              <div className="mb-10 flex flex-col gap-2 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--kk-accent)]">
                    Application Form
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-[var(--kk-text)]">
                    Let’s get to know you.
                  </h3>
                </div>

                <p className="text-sm text-black/50">
                  <span className="font-bold text-[var(--kk-accent)]">*</span>{" "}
                  Required fields
                </p>
              </div>

              {/* STEP 1 */}
              <fieldset>
                <legend className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--kk-text)] text-sm font-bold text-white">
                    1
                  </span>
                  <span className="text-lg font-semibold text-[var(--kk-text)]">
                    About you
                  </span>
                </legend>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className={labelClassName}>
                      Full name{" "}
                      <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className={labelClassName}>
                      City <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      autoComplete="address-level2"
                      placeholder="Your current city"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClassName}>
                      Email address{" "}
                      <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClassName}>
                      Phone or WhatsApp
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91..."
                      className={inputClassName}
                    />
                  </div>
                </div>
              </fieldset>

              {/* STEP 2 */}
              <fieldset className="mt-10 border-t border-black/10 pt-10">
                <legend className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--kk-text)] text-sm font-bold text-white">
                    2
                  </span>
                  <span className="text-lg font-semibold text-[var(--kk-text)]">
                    The opportunity
                  </span>
                </legend>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="opportunityType"
                      className={labelClassName}
                    >
                      Opportunity type{" "}
                      <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <select
                      id="opportunityType"
                      name="opportunityType"
                      required
                      defaultValue=""
                      className={`${inputClassName} cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select an opportunity
                      </option>

                      {opportunityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="workArrangement"
                      className={labelClassName}
                    >
                      Preferred work arrangement{" "}
                      <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <select
                      id="workArrangement"
                      name="workArrangement"
                      required
                      defaultValue=""
                      className={`${inputClassName} cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select an arrangement
                      </option>

                      {workArrangementOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="availability" className={labelClassName}>
                      Availability{" "}
                      <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <input
                      id="availability"
                      name="availability"
                      type="text"
                      required
                      placeholder="For example: Available immediately"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="compensation" className={labelClassName}>
                      Expected compensation
                    </label>

                    <input
                      id="compensation"
                      name="compensation"
                      type="text"
                      placeholder="Salary, stipend, hourly or project rate"
                      className={inputClassName}
                    />
                  </div>
                </div>
              </fieldset>

              {/* STEP 3 */}
              <fieldset className="mt-10 border-t border-black/10 pt-10">
                <legend className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--kk-text)] text-sm font-bold text-white">
                    3
                  </span>
                  <span className="text-lg font-semibold text-[var(--kk-text)]">
                    Your work and interests
                  </span>
                </legend>

                <div>
                  <label htmlFor="portfolioLink" className={labelClassName}>
                    Portfolio, résumé or work-sample link{" "}
                    <span className="text-[var(--kk-accent)]">*</span>
                  </label>

                  <input
                    id="portfolioLink"
                    name="portfolioLink"
                    type="text"
                    required
                    placeholder="Portfolio, LinkedIn, Google Drive or résumé link"
                    className={inputClassName}
                  />

                  <p className={helperClassName}>
                    Make sure the link is publicly accessible or shared with the
                    recipient.
                  </p>
                </div>

                <div className="mt-6">
                  <label htmlFor="experience" className={labelClassName}>
                    Relevant skills and experience{" "}
                    <span className="text-[var(--kk-accent)]">*</span>
                  </label>

                  <textarea
                    id="experience"
                    name="experience"
                    required
                    rows={5}
                    maxLength={1200}
                    placeholder="Tell us about your skills, tools, experience and relevant projects."
                    className={`${inputClassName} min-h-36 resize-y`}
                  />
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className={labelClassName}>
                    Why would you like to work with Katta Studio?{" "}
                    <span className="text-[var(--kk-accent)]">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={1200}
                    placeholder="Tell us what interests you about the work and what you would like to contribute."
                    className={`${inputClassName} min-h-36 resize-y`}
                  />
                </div>
              </fieldset>

              {/* STEP 4 */}
              <fieldset className="mt-10 border-t border-black/10 pt-10">
                <legend className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--kk-text)] text-sm font-bold text-white">
                    4
                  </span>
                  <span className="text-lg font-semibold text-[var(--kk-text)]">
                    Final check
                  </span>
                </legend>

                <div
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="work-with-us-form-guard">
                    Leave this field empty
                  </label>
                  <input
                    id="work-with-us-form-guard"
                    name="formGuard"
                    type="text"
                    tabIndex={-1}
                    autoComplete="new-password"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-3xl border border-[var(--kk-accent)]/25 bg-[var(--kk-surface-alt)] p-5 sm:p-6">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-5 w-5 shrink-0 accent-[var(--kk-accent)]"
                  />
                  <span className="text-sm leading-6 text-black/60">
                    I agree that KultureKatta and Katta Studio may use the
                    information submitted here to review and respond to my
                    application as described in the{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-semibold underline decoration-black/30 underline-offset-2 hover:decoration-black"
                    >
                      Privacy Policy
                    </Link>.{" "}
                    <span aria-hidden="true">*</span>
                  </span>
                </label>
              </fieldset>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="kk-button-dark w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting"
                    ? "Sending application..."
                    : "Apply to Work With Us"}{" "}
                  <span aria-hidden="true">→</span>
                </button>

                <p className="kk-small-text mt-4 max-w-2xl">
                  Keep your portfolio and résumé links publicly accessible. You
                  will receive an automatic confirmation after submission.
                </p>

                {statusMessage && (
                  <p
                    role={status === "error" ? "alert" : "status"}
                    aria-live={status === "error" ? "assertive" : "polite"}
                    className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
                      status === "error"
                        ? "border border-red-200 bg-red-50 text-red-800"
                        : "border border-emerald-200 bg-emerald-50 text-emerald-800"
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}

                <p className="kk-small-text mt-5">
                  Submission trouble? Email{" "}
                  <a
                    href="mailto:hey@kulturekatta.com?subject=Katta%20Studio%20Work%20With%20Us"
                    className="font-semibold text-[var(--kk-text)] underline decoration-[var(--kk-accent)] underline-offset-4 transition hover:text-black/60"
                  >
                    hey@kulturekatta.com
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}