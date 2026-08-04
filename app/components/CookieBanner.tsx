"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const COOKIE_CONSENT_KEY = "kuka-cookie-consent-v1";

export type CookieConsentChoice = "accepted" | "rejected";

function isValidCookieChoice(
  value: string | null
): value is CookieConsentChoice {
  return value === "accepted" || value === "rejected";
}

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(
      COOKIE_CONSENT_KEY
    );

    if (isValidCookieChoice(savedChoice)) {
      setCanClose(true);
    } else {
      setIsOpen(true);
      setCanClose(false);
    }

    const openCookieSettings = () => {
      setCanClose(true);
      setIsOpen(true);
    };

    window.addEventListener(
      "kuka:open-cookie-settings",
      openCookieSettings
    );

    return () => {
      window.removeEventListener(
        "kuka:open-cookie-settings",
        openCookieSettings
      );
    };
  }, []);

  const saveChoice = (choice: CookieConsentChoice) => {
    const previousChoice = window.localStorage.getItem(
      COOKIE_CONSENT_KEY
    );

    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);

    window.dispatchEvent(
      new CustomEvent<CookieConsentChoice>(
        "kuka:cookie-consent-changed",
        {
          detail: choice,
        }
      )
    );

    setCanClose(true);
    setIsOpen(false);

    // Reload when optional-cookie consent is withdrawn so that
    // any optional scripts already running are removed.
    if (
      previousChoice === "accepted" &&
      choice === "rejected"
    ) {
      window.location.reload();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-5 rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-2xl sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        {canClose && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close cookie settings"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-black/50 transition hover:bg-black/5 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            ×
          </button>
        )}

        <div className="max-w-3xl pr-8 lg:pr-0">
          <p
            id="cookie-banner-title"
            className="text-lg font-semibold text-[var(--kk-text)]"
          >
            A tiny cookie note 🍪
          </p>

          <p
            id="cookie-banner-description"
            className="mt-2 text-sm leading-6 text-black/65"
          >
            We use essential cookies and browser storage to keep the
            KultureKatta website working. With your permission, we may
            also use optional analytics cookies to understand how people
            use the site and improve their experience.
          </p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/cookie-policy"
              className="text-sm font-semibold text-[var(--kk-text)] underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
            >
              Cookie Policy
            </Link>

            <Link
              href="/privacy-policy"
              className="text-sm font-semibold text-[var(--kk-text)] underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => saveChoice("rejected")}
            className="min-h-12 rounded-full border border-black/20 bg-white px-6 text-sm font-semibold text-[var(--kk-text)] transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Decline optional cookies
          </button>

          <button
            type="button"
            onClick={() => saveChoice("accepted")}
            className="min-h-12 rounded-full border border-[var(--kk-accent)] bg-[var(--kk-accent)] px-6 text-sm font-semibold text-[var(--kk-text)] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Accept optional cookies
          </button>
        </div>
      </div>
    </div>
  );
}