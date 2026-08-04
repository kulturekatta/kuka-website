"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import FloatingContactButton from "./FloatingContactButton";

const inputClassName =
  "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[var(--kk-text)] outline-none transition placeholder:text-black/35 hover:border-black/25 focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-black/5";

const labelClassName =
  "block text-sm font-semibold text-[var(--kk-text)]";

const interestLabels: Record<string, string> = {
  organization: "Plan an experience for my organization",
  private: "Plan a private experience",
  attend: "Attend an experience",
  partner: "Work or partner with KultureKatta",
  volunteer: "Volunteer with KultureKatta",
  host: "Host a Katta",
  media: "Press or media enquiry",
  other: "Something else",
};

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.2 7.8c.3-.6.7-.6 1-.6h.4c.2 0 .4.1.5.5l.7 1.7c.1.3.1.5-.1.7l-.6.8c-.2.2-.1.4 0 .6.6 1 1.5 1.8 2.5 2.4.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.7.8" />
    </svg>
  );
}

export default function FloatingContactDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeDrawer = () => {
    setIsOpen(false);
    setStatusMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const interest = String(formData.get("interest") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const interestLabel =
      interestLabels[interest] ?? "General website enquiry";

    const subject = encodeURIComponent(
      `Website enquiry: ${interestLabel}`,
    );

    const emailBody = encodeURIComponent(
      [
        "Hello KultureKatta,",
        "",
        "I am contacting you through the KultureKatta website.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone || "Not provided"}`,
        `Enquiry type: ${interestLabel}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    );

    setStatusMessage(
      "Opening your email application with the enquiry details filled in.",
    );

    window.location.href =
      `mailto:hey@kulturekatta.com?subject=${subject}&body=${emailBody}`;
  };

  return (
    <>
      {!isOpen && (
        <FloatingContactButton onClick={() => setIsOpen(true)} />
      )}

      <div
        className={`fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px] transition duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      <aside
        id="floating-contact-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="floating-contact-title"
        className={`fixed right-0 top-0 z-[90] h-dvh w-full max-w-[460px] overflow-y-auto bg-[var(--kk-surface-alt)] shadow-[-20px_0_60px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-out ${
          isOpen
            ? "translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="relative overflow-hidden bg-[var(--kk-text)] px-6 pb-8 pt-6 text-white sm:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/10"
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kk-accent)]">
                  Contact KultureKatta
                </p>

                <h2
                  id="floating-contact-title"
                  className="mt-3 text-3xl font-semibold leading-tight text-white"
                >
                  Let’s start a conversation.
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeDrawer}
                aria-label="Close contact form"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-white/30 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kk-accent)]"
              >
                <CloseIcon />
              </button>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              Share the rough shape of your idea. It does not need to be
              perfectly formed—we can work out the details together.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/919730244996"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-white/80 transition hover:border-[var(--kk-accent)] hover:text-[var(--kk-accent)]"
              >
                <WhatsAppIcon />
                +91-9730244996
              </a>

              <a
                href="mailto:hey@kulturekatta.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-white/80 transition hover:border-[var(--kk-accent)] hover:text-[var(--kk-accent)]"
              >
                <EmailIcon />
                hey@kulturekatta.com
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-6 py-8 sm:px-8"
        >
          <div>
            <label htmlFor="floating-contact-name" className={labelClassName}>
              Name <span className="text-[var(--kk-accent)]">*</span>
            </label>

            <input
              id="floating-contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="floating-contact-email" className={labelClassName}>
              Email <span className="text-[var(--kk-accent)]">*</span>
            </label>

            <input
              id="floating-contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="floating-contact-phone" className={labelClassName}>
              Phone / WhatsApp
            </label>

            <input
              id="floating-contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="floating-contact-interest"
              className={labelClassName}
            >
              I want to <span className="text-[var(--kk-accent)]">*</span>
            </label>

            <select
              id="floating-contact-interest"
              name="interest"
              defaultValue=""
              required
              className={`${inputClassName} cursor-pointer`}
            >
              <option value="" disabled>
                Choose one
              </option>

              <option value="organization">
                Plan an experience for my organization
              </option>

              <option value="private">
                Plan a private experience
              </option>

              <option value="attend">
                Attend an experience
              </option>

              <option value="partner">
                Work or partner with KultureKatta
              </option>

              <option value="volunteer">
                Volunteer with KultureKatta
              </option>

              <option value="host">
                Host a Katta
              </option>

              <option value="media">
                Press or media enquiry
              </option>

              <option value="other">
                Something else
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="floating-contact-message"
              className={labelClassName}
            >
              Tell us a little more{" "}
              <span className="text-[var(--kk-accent)]">*</span>
            </label>

            <textarea
              id="floating-contact-message"
              name="message"
              rows={5}
              placeholder="What are you hoping to create, and who is it for?"
              required
              className={`${inputClassName} resize-y`}
            />
          </div>

          {statusMessage && (
            <p
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium leading-6 text-green-800"
            >
              {statusMessage}
            </p>
          )}

          <button
            type="submit"
            className="kk-button-dark w-full justify-center"
          >
            Send enquiry
          </button>

          <p className="text-center text-xs leading-5 text-black/45">
            This will open your default email application with your enquiry
            already filled in.
          </p>

          <div className="border-t border-black/10 pt-5 text-center">
            <a
              href="/contact"
              onClick={closeDrawer}
              className="text-sm font-semibold text-[var(--kk-text)] underline decoration-[var(--kk-accent)] decoration-2 underline-offset-4 transition hover:text-[var(--kk-accent)]"
            >
              Open the full contact page
            </a>
          </div>
        </form>
      </aside>
    </>
  );
}