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

    if (!painPoints.trim() || !email.trim() || !city.trim() || !mobile.trim()) {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5 md:p-12"
    >
      <div className="grid gap-7">
        <div>
          <label className="mb-3 block text-base font-semibold text-[#17110D] md:text-lg">
            Brand name{" "}
            <span className="font-normal text-[#6A5A50]">(optional)</span>
          </label>

          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Your brand name"
            className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg outline-none transition placeholder:text-[#9B8B80] focus:border-[#C49A6C] md:text-xl"
          />
        </div>

        <div>
          <label className="mb-3 block text-base font-semibold text-[#17110D] md:text-lg">
            Instagram / LinkedIn handle or website{" "}
            <span className="font-normal text-[#6A5A50]">(optional)</span>
          </label>

          <input
            type="text"
            value={brandLink}
            onChange={(e) => setBrandLink(e.target.value)}
            placeholder="@yourhandle or website link"
            className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg outline-none transition placeholder:text-[#9B8B80] focus:border-[#C49A6C] md:text-xl"
          />
        </div>

        <div>
          <label className="mb-3 block text-base font-semibold text-[#17110D] md:text-lg">
            3 pain points *
          </label>

          <textarea
            value={painPoints}
            onChange={(e) => setPainPoints(e.target.value)}
            placeholder="Tell us 3 things you are currently struggling with..."
            rows={5}
            required
            className="w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg outline-none transition placeholder:text-[#9B8B80] focus:border-[#C49A6C] md:text-xl"
          />
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-base font-semibold text-[#17110D] md:text-lg">
              Email address *
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg outline-none transition placeholder:text-[#9B8B80] focus:border-[#C49A6C] md:text-xl"
            />
          </div>

          <div>
            <label className="mb-3 block text-base font-semibold text-[#17110D] md:text-lg">
              City *
            </label>

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Your city"
              required
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg outline-none transition placeholder:text-[#9B8B80] focus:border-[#C49A6C] md:text-xl"
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-base font-semibold text-[#17110D] md:text-lg">
            Mobile / WhatsApp number *
          </label>

          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="+91..."
            required
            className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg outline-none transition placeholder:text-[#9B8B80] focus:border-[#C49A6C] md:text-xl"
          />
        </div>

        <div>
          <label className="mb-3 block text-base font-semibold text-[#17110D] md:text-lg">
            Captcha: What is 4 + 5? *
          </label>

          <input
            type="text"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            placeholder="Enter answer"
            required
            className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg outline-none transition placeholder:text-[#9B8B80] focus:border-[#C49A6C] md:text-xl"
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-red-50 px-5 py-4 text-base font-medium leading-7 text-red-700 md:text-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-2 rounded-full bg-[#17110D] px-8 py-5 text-lg font-semibold text-white transition hover:bg-[#2A1D16] md:text-xl"
        >
          Send enquiry on WhatsApp
        </button>

        <p className="text-center text-base leading-7 text-[#6A5A50] md:text-lg">
          Your details will open as a pre-filled WhatsApp message to
          +91-9730244996.
        </p>
      </div>
    </form>
  );
}