"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import FloatingContactButton from "./FloatingContactButton";
import {
  PHONE_PATTERN,
  useAccessibleFormValidation,
  useFormDraft,
} from "./formEnhancements";
import SemanticIcon from "./SemanticIcon";

const inputClassName =
  "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[var(--kk-text)] outline-none transition placeholder:text-black/35 hover:border-black/25 focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-black/5";

const labelClassName =
  "block text-sm font-semibold text-[var(--kk-text)]";

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

type FormStatus = "idle" | "submitting" | "success" | "error";
const FLOATING_CONTACT_DRAFT_KEY =
  "kuka-floating-contact-form-draft-v1";
const FLOATING_CONTACT_RESUME_PATH_KEY =
  "kuka-floating-contact-resume-path-v1";

export default function FloatingContactDrawer() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const portalRootRef = useRef<HTMLDivElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const startedAtRef = useRef(0);
  const statusMessageRef = useRef<HTMLParagraphElement>(null);
  const isSubmittingRef = useRef(false);
  const { formRef, saveDraft, clearDraft } = useFormDraft(
    FLOATING_CONTACT_DRAFT_KEY,
    isOpen,
  );
  const { handleInvalid, handleValidationInput } =
    useAccessibleFormValidation();

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        if (
          window.sessionStorage.getItem(
            FLOATING_CONTACT_RESUME_PATH_KEY,
          ) === pathname
        ) {
          setIsOpen(true);
        }
      } catch {
        // A blocked storage area should never prevent drawer use.
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (status === "success" || status === "error") {
      statusMessageRef.current?.focus();
    }
  }, [status, statusMessage]);

  const openDrawer = () => {
    lastActiveElementRef.current = triggerButtonRef.current;
    try {
      window.sessionStorage.setItem(
        FLOATING_CONTACT_RESUME_PATH_KEY,
        pathname,
      );
    } catch {
      // A blocked storage area should never prevent drawer use.
    }
    setIsOpen(true);
  };

  const closeDrawer = useCallback(() => {
    try {
      window.sessionStorage.removeItem(
        FLOATING_CONTACT_RESUME_PATH_KEY,
      );
    } catch {
      // A blocked storage area should never prevent drawer use.
    }
    setIsOpen(false);
    setStatus("idle");
    setStatusMessage("");
    startedAtRef.current = Date.now();
  }, []);

  const suspendDrawerForNavigation = () => {
    setIsOpen(false);
    setStatus("idle");
    setStatusMessage("");
  };

  useEffect(() => {
    if (!isOpen || !drawerRef.current || !portalRootRef.current) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const backgroundElements = Array.from(document.body.children).filter(
      (element) => element !== portalRootRef.current,
    );

    const previouslyInert = new Map<Element, boolean>();

    document.body.style.overflow = "hidden";

    backgroundElements.forEach((element) => {
      previouslyInert.set(element, element.hasAttribute("inert"));
      element.setAttribute("inert", "");
    });

    const getFocusableElements = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(","),
        ) ?? [],
      ).filter(
        (element) =>
          element.getClientRects().length > 0 &&
          !element.hasAttribute("hidden"),
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        closeButtonRef.current?.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      backgroundElements.forEach((element) => {
        const wasPreviouslyInert = previouslyInert.get(element);

        if (!wasPreviouslyInert) {
          element.removeAttribute("inert");
        }
      });

      window.requestAnimationFrame(() => {
        lastActiveElementRef.current?.focus();
      });
    };
  }, [closeDrawer, isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      formGuard: String(formData.get("formGuard") ?? ""),
      startedAt: startedAtRef.current,
      sourcePage: window.location.pathname,
    };

    isSubmittingRef.current = true;
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/floating-contact", {
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
      try {
        window.sessionStorage.removeItem(
          FLOATING_CONTACT_RESUME_PATH_KEY,
        );
      } catch {
        // A blocked storage area should never prevent drawer use.
      }
      startedAtRef.current = Date.now();

      setStatus("success");
      setStatusMessage(
        "Thank you. Your enquiry has been sent, and a confirmation email is on its way.",
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

  const drawerPortal =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={portalRootRef}
            className="fixed inset-0 pointer-events-auto"
            style={{ zIndex: 2147483646 }}
          >
            <div
              className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
              aria-hidden="true"
              onClick={closeDrawer}
            />

            <aside
              ref={drawerRef}
              id="floating-contact-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="floating-contact-title"
              aria-describedby="floating-contact-description"
              className="absolute right-0 top-0 z-[1] h-dvh w-full max-w-[460px] overflow-y-auto overscroll-contain bg-[var(--kk-surface-alt)] shadow-[-20px_0_60px_rgba(0,0,0,0.22)]"
            >
              <div className="relative overflow-hidden bg-[var(--kk-text)] px-6 pb-8 pt-6 text-white sm:px-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/10"
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <SemanticIcon
                        icon="💌"
                        label="Contact KultureKatta"
                        size="card"
                        className="mb-4"
                      />

                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
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

                  <p
                    id="floating-contact-description"
                    className="mt-4 max-w-sm text-sm leading-6 text-white/65"
                  >
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
                ref={formRef}
                onSubmit={handleSubmit}
                onInvalid={handleInvalid}
                onInput={(event) => {
                  handleValidationInput(event);
                  saveDraft();
                }}
                className="relative space-y-5 px-6 py-8 sm:px-8"
              >
                <div>
                  <label
                    htmlFor="floating-contact-name"
                    className={labelClassName}
                  >
                    Name{" "}
                    <span className="text-[var(--kk-accent)]">*</span>
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
                  <label
                    htmlFor="floating-contact-email"
                    className={labelClassName}
                  >
                    Email{" "}
                    <span className="text-[var(--kk-accent)]">*</span>
                  </label>

                  <input
                    id="floating-contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="floating-contact-phone"
                    className={labelClassName}
                  >
                    Phone / WhatsApp
                  </label>

                  <input
                    id="floating-contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    pattern={PHONE_PATTERN}
                    title="Use 7–20 digits with an optional +, spaces, parentheses, or hyphens."
                    placeholder="+91 98765 43210"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="floating-contact-interest"
                    className={labelClassName}
                  >
                    I want to{" "}
                    <span className="text-[var(--kk-accent)]">*</span>
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

                    <option value="attend">Attend an experience</option>

                    <option value="partner">
                      Work or partner with KultureKatta
                    </option>

                    <option value="volunteer">
                      Volunteer with KultureKatta
                    </option>

                    <option value="host">Host a Katta</option>

                    <option value="media">Press or media enquiry</option>

                    <option value="other">Something else</option>
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

                <div
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="floating-contact-form-guard">
                    Leave this field empty
                  </label>

                  <input
                    id="floating-contact-form-guard"
                    name="formGuard"
                    type="text"
                    tabIndex={-1}
                    autoComplete="new-password"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-5 w-5 shrink-0 accent-[var(--kk-accent)]"
                  />

                  <span className="text-xs leading-5 text-black/55">
                    I agree that KultureKatta may use these details to respond
                    to my enquiry as described in the{" "}
                    <Link
                      href="/privacy-policy"
                      onClick={suspendDrawerForNavigation}
                      className="font-semibold underline decoration-black/30 underline-offset-2 hover:decoration-black"
                    >
                      Privacy Policy
                    </Link>
                    . <span aria-hidden="true">*</span>
                  </span>
                </label>

                {statusMessage && (
                  <p
                    ref={statusMessageRef}
                    tabIndex={-1}
                    role={status === "error" ? "alert" : "status"}
                    aria-live={
                      status === "error" ? "assertive" : "polite"
                    }
                    className={`rounded-xl px-4 py-3 text-sm font-medium leading-6 ${
                      status === "error"
                        ? "border border-red-200 bg-red-50 text-red-800"
                        : "border border-green-200 bg-green-50 text-green-800"
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="kk-button-dark w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? "Sending enquiry..."
                    : "Send enquiry"}
                </button>

                <p className="text-center text-xs leading-5 text-black/65">
                  You will receive an automatic confirmation after a successful
                  submission.
                </p>

                <div className="border-t border-black/10 pt-5 text-center">
                  <Link
                    href="/contact"
                    onClick={closeDrawer}
                    className="text-sm font-semibold text-[var(--kk-text)] underline decoration-[var(--kk-accent)] decoration-2 underline-offset-4 transition hover:text-[var(--kk-accent)]"
                  >
                    Open the full contact page
                  </Link>
                </div>
              </form>
            </aside>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <FloatingContactButton
        buttonRef={triggerButtonRef}
        expanded={isOpen}
        onClick={openDrawer}
      />

      {drawerPortal}
    </>
  );
}
