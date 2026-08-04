"use client";

import { useState } from "react";

export default function GrowthClinicContactForm() {
  const [brandName, setBrandName] = useState("");
  const [brandLink, setBrandLink] = useState("");
  const [painPoints, setPainPoints] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !brandName.trim() ||
      !brandLink.trim() ||
      !painPoints.trim() ||
      !email.trim() ||
      !city.trim() ||
      !mobile.trim()
    ) {
      setError("Please fill in all the required fields.");
      return;
    }

    if (captcha.trim() !== "9") {
      setError("Please solve the captcha correctly.");
      return;
    }

    setError("");

    const message = `
New Growth Clinic Enquiry

Brand name: ${brandName}
Instagram / LinkedIn / Website: ${brandLink}

3 pain points:
${painPoints}

Email: ${email}
City: ${city}
Mobile / WhatsApp: ${mobile}
`;

    const whatsappNumber = "919730244996";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-base text-[var(--kk-text)] outline-none transition duration-200 placeholder:text-black/35 hover:border-black/20 focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-[var(--kk-accent)]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[var(--kk-text)] sm:text-base";

  const sectionClass =
    "rounded-3xl border border-black/[0.07] bg-black/[0.018] p-5 sm:p-7";

  const sectionNumberClass =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--kk-accent)] text-sm font-bold text-white";

  return (
    <form
      id="growth-clinic-form"
      onSubmit={handleSubmit}
      className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.07)]"
    >
      {/* FORM INTRODUCTION */}
      <div className="border-b border-black/[0.07] bg-[var(--kk-accent)]/[0.055] px-6 py-10 text-center sm:px-10 sm:py-12">
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
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
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
                value={brandLink}
                onChange={(e) => setBrandLink(e.target.value)}
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
              value={painPoints}
              onChange={(e) => setPainPoints(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="captcha" className={labelClass}>
                Quick check: What is 4 + 5?{" "}
                <span className="text-[var(--kk-accent)]">*</span>
              </label>

              <input
                id="captcha"
                name="captcha"
                type="text"
                inputMode="numeric"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="Enter the answer"
                maxLength={2}
                required
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* ERROR MESSAGE */}
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {/* SUBMIT AREA */}
        <div className="rounded-3xl bg-[var(--kk-accent)]/[0.07] px-5 py-6 text-center sm:px-8 sm:py-8">
          <button
            type="submit"
            className="kk-button-dark flex w-full items-center justify-center gap-3 px-8 py-4 sm:mx-auto sm:w-auto sm:min-w-80"
          >
            Send enquiry on WhatsApp
            <span aria-hidden="true">→</span>
          </button>

          <p className="mt-4 text-sm leading-relaxed text-[var(--kk-text-muted)]">
            Your answers will open as a pre-filled WhatsApp message to
            <br className="hidden sm:block" /> +91 97302 44996.
          </p>
        </div>
      </div>
    </form>
  );
}