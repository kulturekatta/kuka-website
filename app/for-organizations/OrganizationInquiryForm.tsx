"use client";

import { FormEvent, useState } from "react";

const organizationTypes = [
  "Company or corporate team",
  "Startup or entrepreneur network",
  "School",
  "College or university",
  "NGO",
  "Foundation or trust",
  "Cultural institution",
  "Government or civic body",
  "Housing society or community",
  "Other",
];

const experienceFormats = [
  "A few-hour experience",
  "Half-day program",
  "Full-day program",
  "Multi-day program",
  "Recurring series",
  "Retreat or off-site",
  "Not sure yet",
];

const interestOptions = [
  "Creativity and hands-on making",
  "Team connection and organizational culture",
  "Learning and skill-building",
  "Wellbeing and reflection",
  "Heritage and cultural exploration",
  "Food and sensory experiences",
  "Outdoor experiences",
  "Social impact and volunteering",
  "Entrepreneurship and innovation",
  "Something custom",
];

const budgetRanges = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1 lakh",
  "₹1–₹3 lakh",
  "Above ₹3 lakh",
  "Budget not decided",
];

const referralOptions = [
  "Instagram",
  "Google search",
  "LinkedIn",
  "Friend or colleague",
  "Previous KultureKatta experience",
  "Organization or institutional referral",
  "Media or publication",
  "Other",
];

const inputClass =
  "mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3.5 text-base text-[var(--kk-text)] outline-none transition placeholder:text-black/40 focus:border-[var(--kk-accent)] focus:ring-2 focus:ring-[var(--kk-accent)]/15";

const labelClass =
  "block text-base font-semibold leading-7 text-[var(--kk-text)] md:text-[1.05rem]";

const sectionHeadingClass =
  "text-xl font-semibold tracking-[-0.02em] text-[var(--kk-text)] md:text-2xl";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function OrganizationInquiryForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const selectedInterests = formData
      .getAll("interests")
      .map((item) => String(item));

    if (selectedInterests.length === 0) {
      setStatus("error");
      setErrorMessage("Please select at least one area of interest.");
      return;
    }

    const payload = {
      inquiryType: "organization",

      fullName: String(formData.get("fullName") ?? ""),
      designation: String(formData.get("designation") ?? ""),
      workEmail: String(formData.get("workEmail") ?? ""),
      phone: String(formData.get("phone") ?? ""),

      organizationName: String(formData.get("organizationName") ?? ""),
      organizationType: String(formData.get("organizationType") ?? ""),
      organizationWebsite: String(
        formData.get("organizationWebsite") ?? "",
      ),

      city: String(formData.get("city") ?? ""),
      experienceGoal: String(formData.get("experienceGoal") ?? ""),
      participantCount: String(formData.get("participantCount") ?? ""),
      participantProfile: String(
        formData.get("participantProfile") ?? "",
      ),
      preferredTimeline: String(
        formData.get("preferredTimeline") ?? "",
      ),
      experienceFormat: String(
        formData.get("experienceFormat") ?? "",
      ),

      interests: selectedInterests,
      budget: String(formData.get("budget") ?? ""),
      details: String(formData.get("details") ?? ""),
      referralSource: String(formData.get("referralSource") ?? ""),

      captcha: String(formData.get("captcha") ?? ""),
      consent: formData.get("consent") === "on",

     // Hidden anti-spam field.
      formGuard: String(formData.get("formGuard") ?? ""),
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/organization-inquiry", {
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
            "Your inquiry could not be sent. Please try again.",
        );
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section
      id="organization-inquiry"
      className="kk-section-light scroll-mt-24 py-16 md:py-24"
    >
      <div className="kk-container">
        {/* FORM INTRODUCTION */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex justify-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl border border-black/10 bg-white text-[2.875rem] shadow-sm md:h-24 md:w-24 md:text-[3.375rem]"
              aria-hidden="true"
            >
              📝
            </div>
          </div>

          <p className="kk-section-label">Work with KuKa</p>

          <h2 className="kk-page-heading mt-3">
            Let’s Design an Experience for Your Organization
          </h2>

          <p className="kk-body-large mx-auto mt-5 max-w-2xl">
            Tell us what you are planning, who it is for, and what you
            would like the experience to achieve. We will recommend a
            suitable format or design something entirely custom.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.07)] sm:p-8 md:mt-14 md:p-10">
          {status === "success" ? (
            <div
              className="rounded-[1.75rem] border border-green-200 bg-green-50 px-6 py-10 text-center md:px-10"
              role="status"
              aria-live="polite"
            >
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-sm"
                aria-hidden="true"
              >
                ✓
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-[var(--kk-text)] md:text-3xl">
                Your Inquiry Has Been Received
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-black/65 md:text-lg">
                Thank you for telling us about your organization and
                what you are planning. The KultureKatta team will review
                the requirements and get in touch.
              </p>

              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setErrorMessage("");
                }}
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-[var(--kk-text)] transition hover:-translate-y-0.5 hover:border-black/30 hover:bg-black/[0.03] hover:shadow-md"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Hidden inquiry classification */}
              <input
                type="hidden"
                name="inquiryType"
                value="organization"
              />

              {/* Honeypot field */}
              {/* Honeypot field — genuine visitors must leave this empty */}
                <div
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="formGuard">
                    Leave this field empty
                  </label>

                  <input
                    id="formGuard"
                    name="formGuard"
                    type="text"
                    defaultValue=""
                    tabIndex={-1}
                    autoComplete="new-password"
                    data-1p-ignore="true"
                    data-lpignore="true"
                    aria-hidden="true"
                  />
                </div>

              {/* ABOUT YOU */}
              <fieldset>
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--kk-accent)]/10 text-2xl"
                    aria-hidden="true"
                  >
                    👤
                  </div>

                  <div>
                    <legend className={sectionHeadingClass}>
                      About You
                    </legend>

                    <p className="mt-1 text-base leading-7 text-black/55">
                      Who should we contact about this inquiry?
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>
                      Full name <span aria-hidden="true">*</span>
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="designation" className={labelClass}>
                      Role or designation
                    </label>

                    <input
                      id="designation"
                      name="designation"
                      type="text"
                      maxLength={120}
                      autoComplete="organization-title"
                      placeholder="Founder, HR lead, program manager..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="workEmail" className={labelClass}>
                      Work email <span aria-hidden="true">*</span>
                    </label>

                    <input
                      id="workEmail"
                      name="workEmail"
                      type="email"
                      required
                      maxLength={160}
                      autoComplete="email"
                      placeholder="name@organization.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone or WhatsApp number{" "}
                      <span aria-hidden="true">*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      maxLength={30}
                      autoComplete="tel"
                      placeholder="+91..."
                      className={inputClass}
                    />
                  </div>
                </div>
              </fieldset>

              <div className="my-10 border-t border-black/10 md:my-12" />

              {/* ABOUT YOUR ORGANIZATION */}
              <fieldset>
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--kk-accent)]/10 text-2xl"
                    aria-hidden="true"
                  >
                    🏢
                  </div>

                  <div>
                    <legend className={sectionHeadingClass}>
                      About Your Organization
                    </legend>

                    <p className="mt-1 text-base leading-7 text-black/55">
                      This helps us understand the setting and audience.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="organizationName"
                      className={labelClass}
                    >
                      Organization name{" "}
                      <span aria-hidden="true">*</span>
                    </label>

                    <input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      required
                      maxLength={160}
                      autoComplete="organization"
                      placeholder="Name of your organization"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organizationType"
                      className={labelClass}
                    >
                      Organization type{" "}
                      <span aria-hidden="true">*</span>
                    </label>

                    <select
                      id="organizationType"
                      name="organizationType"
                      required
                      defaultValue=""
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select organization type
                      </option>

                      {organizationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="organizationWebsite"
                      className={labelClass}
                    >
                      Organization website
                    </label>

                    <input
                      id="organizationWebsite"
                      name="organizationWebsite"
                      type="url"
                      maxLength={250}
                      autoComplete="url"
                      placeholder="https://..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className={labelClass}>
                      City or location{" "}
                      <span aria-hidden="true">*</span>
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      maxLength={120}
                      autoComplete="address-level2"
                      placeholder="Pune, Mumbai, Bengaluru..."
                      className={inputClass}
                    />
                  </div>
                </div>
              </fieldset>

              <div className="my-10 border-t border-black/10 md:my-12" />

              {/* WHAT ARE YOU PLANNING */}
              <fieldset>
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--kk-accent)]/10 text-2xl"
                    aria-hidden="true"
                  >
                    ✨
                  </div>

                  <div>
                    <legend className={sectionHeadingClass}>
                      What Are You Planning?
                    </legend>

                    <p className="mt-1 text-base leading-7 text-black/55">
                      An early idea is enough. We can help shape it.
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <label
                    htmlFor="experienceGoal"
                    className={labelClass}
                  >
                    What would you like participants to experience or
                    achieve? <span aria-hidden="true">*</span>
                  </label>

                  <textarea
                    id="experienceGoal"
                    name="experienceGoal"
                    required
                    minLength={10}
                    maxLength={1200}
                    rows={4}
                    placeholder="For example: strengthen team connection, develop creative confidence, explore local heritage, support wellbeing, solve a challenge..."
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="participantCount"
                      className={labelClass}
                    >
                      Approximate number of participants{" "}
                      <span aria-hidden="true">*</span>
                    </label>

                    <input
                      id="participantCount"
                      name="participantCount"
                      type="text"
                      required
                      maxLength={60}
                      placeholder="For example: 25–30"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="participantProfile"
                      className={labelClass}
                    >
                      Participant profile or age group
                    </label>

                    <input
                      id="participantProfile"
                      name="participantProfile"
                      type="text"
                      maxLength={180}
                      placeholder="Leadership team, students aged 12–15..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="preferredTimeline"
                      className={labelClass}
                    >
                      Preferred date or approximate timeline
                    </label>

                    <input
                      id="preferredTimeline"
                      name="preferredTimeline"
                      type="text"
                      maxLength={120}
                      placeholder="October 2026, next quarter, flexible..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experienceFormat"
                      className={labelClass}
                    >
                      Preferred format{" "}
                      <span aria-hidden="true">*</span>
                    </label>

                    <select
                      id="experienceFormat"
                      name="experienceFormat"
                      required
                      defaultValue=""
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select a format
                      </option>

                      {experienceFormats.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>

              <div className="my-10 border-t border-black/10 md:my-12" />

              {/* AREAS OF INTEREST */}
              <fieldset>
                <legend className="sr-only">
                  Areas of Interest
                </legend>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--kk-accent)]/10 text-2xl"
                    aria-hidden="true"
                  >
                    🎯
                  </div>

                  <div>
                    <h3 className={sectionHeadingClass}>
                      Areas of Interest
                    </h3>

                    <p className="mt-1 text-base leading-7 text-black/55">
                      Select everything that may be relevant. You can
                      choose more than one.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 md:grid-cols-2">
                  {interestOptions.map((interest) => (
                    <label
                      key={interest}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-[var(--kk-site-bg,#faf8f4)] px-4 py-4 transition hover:border-black/20 hover:bg-white"
                    >
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest}
                        className="mt-1.5 h-5 w-5 shrink-0 accent-[var(--kk-accent)]"
                      />

                      <span className="text-base font-medium leading-7 text-[var(--kk-text)]">
                        {interest}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="my-10 border-t border-black/10 md:my-12" />

              {/* PRACTICAL DETAILS */}
              <fieldset>
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--kk-accent)]/10 text-2xl"
                    aria-hidden="true"
                  >
                    📋
                  </div>

                  <div>
                    <legend className={sectionHeadingClass}>
                      Practical Details
                    </legend>

                    <p className="mt-1 text-base leading-7 text-black/55">
                      A broad budget and a little context help us propose
                      something realistic.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className={labelClass}>
                      Approximate budget{" "}
                      <span aria-hidden="true">*</span>
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      required
                      defaultValue=""
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select a budget range
                      </option>

                      {budgetRanges.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="referralSource"
                      className={labelClass}
                    >
                      How did you hear about KultureKatta?
                    </label>

                    <select
                      id="referralSource"
                      name="referralSource"
                      defaultValue=""
                      className={inputClass}
                    >
                      <option value="">Select an option</option>

                      {referralOptions.map((source) => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="details" className={labelClass}>
                    Tell us more about your idea{" "}
                    <span aria-hidden="true">*</span>
                  </label>

                  <textarea
                    id="details"
                    name="details"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={6}
                    placeholder="Share the occasion, context, challenge, desired outcome, venue requirements, themes, or any ideas already being discussed."
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </fieldset>

              <div className="my-10 border-t border-black/10 md:my-12" />

              {/* HUMAN CHECK */}
              <fieldset className="rounded-[1.5rem] border border-black/10 bg-[var(--kk-site-bg,#faf8f4)] p-5 md:p-6">
                <legend className="sr-only">
                  Human Check
                </legend>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--kk-accent)]/10 text-2xl"
                    aria-hidden="true"
                  >
                    🛡️
                  </div>

                  <div>
                    <h3 className={sectionHeadingClass}>
                      Human Check
                    </h3>

                    <p className="mt-1 text-base leading-7 text-black/55">
                      This quick question helps us prevent automated spam
                      submissions.
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <label htmlFor="captcha" className={labelClass}>
                    What is 9 + 5?{" "}
                    <span aria-hidden="true">*</span>
                  </label>

                  <input
                    id="captcha"
                    name="captcha"
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={3}
                    placeholder="Enter the answer"
                    className={`${inputClass} max-w-xs`}
                  />
                </div>
              </fieldset>

              {/* CONSENT */}
              <label className="mt-7 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-1.5 h-5 w-5 shrink-0 accent-[var(--kk-accent)]"
                />

                <span className="text-base leading-7 text-black/65">
                  I agree that KultureKatta may use the information
                  submitted here to respond to this inquiry.{" "}
                  <span aria-hidden="true">*</span>
                </span>
              </label>

              {/* ERROR MESSAGE */}
              {status === "error" && errorMessage ? (
                <div
                  className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-base leading-7 text-red-800"
                  role="alert"
                  aria-live="assertive"
                >
                  {errorMessage}
                </div>
              ) : null}

              {/* SUBMIT */}
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="kk-button-dark inline-flex min-h-12 items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    "Sending Inquiry..."
                  ) : (
                    <>
                      Send My Inquiry
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>

                <p className="text-base leading-7 text-black/50">
                  Fields marked with * are required.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}