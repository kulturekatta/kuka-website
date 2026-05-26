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

    if (captcha.trim() !== "9") {
      setError("Please solve the captcha correctly.");
      return;
    }

    if (
  !brandName.trim() ||
  !brandLink.trim() ||
  !painPoints.trim() ||
  !email.trim() ||
  !city.trim() ||
  !mobile.trim()
) {
  setError("Please fill all required fields.");
  return;
}

    setError("");

    const message = `
New Growth Clinic Enquiry

Brand name: ${brandName || "Not shared"}
Instagram / LinkedIn / Website: ${brandLink || "Not shared"}

3 pain points:
${painPoints}

Email: ${email}
City: ${city}
Mobile / WhatsApp: ${mobile}
`;

    const whatsappNumber = "919730244996";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const inputClass =
    "w-full rounded-2xl border border-white/15 bg-white px-5 py-4 text-lg text-[#17110D] outline-none transition placeholder:text-[#9B8B80] focus:border-[#F4C95D] focus:ring-2 focus:ring-[#F4C95D]/40 md:text-xl";

  const labelClass =
    "mb-3 block text-base font-semibold text-white md:text-lg";

  return (
    <form
      id="growth-clinic-form"
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-[#111111] p-8 text-white shadow-xl ring-1 ring-white/10 md:p-12"
    >
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F4C95D]">
          Get in touch
        </p>

        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
          Let’s look at what is really blocking your growth.
        </h2>

        <p className="mt-6 text-lg leading-8 text-white/75 md:text-xl">
          Tell us a little about your brand, where you feel stuck, and what you
          are trying to grow. We will get back to you with the next step.
        </p>
      </div>

      <div className="grid gap-7">
        <div>
          <label className={labelClass}>Brand name *</label>

          <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Your brand name"
          required
          className={inputClass}
        />
        </div>

        <div>
          <label className={labelClass}>
          Instagram / LinkedIn handle or Website *
          </label>

          <input
            type="text"
            value={brandLink}
            onChange={(e) => setBrandLink(e.target.value)}
            placeholder="@yourhandle or website link"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>3 pain points *</label>

          <textarea
            value={painPoints}
            onChange={(e) => setPainPoints(e.target.value)}
            placeholder="Tell us 3 things you are currently struggling with..."
            rows={5}
            required
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          <div>
            <label className={labelClass}>Email address *</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>City *</label>

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Your city"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Mobile / WhatsApp number *</label>

          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="+91..."
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Captcha: What is 4 + 5? *</label>

          <input
            type="text"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            placeholder="Enter answer"
            required
            className={inputClass}
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-red-50 px-5 py-4 text-base font-medium leading-7 text-red-700 md:text-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-2 rounded-full bg-[#F4C95D] px-8 py-5 text-lg font-bold text-[#17110D] transition hover:bg-white md:text-xl"
        >
          Send enquiry on WhatsApp
        </button>

        <p className="text-center text-base leading-7 text-white/60 md:text-lg">
          Your details will open as a pre-filled WhatsApp message to
          +91-9730244996.
        </p>
      </div>
    </form>
  );
}