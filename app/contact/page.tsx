"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import {
  PHONE_PATTERN,
  useAccessibleFormValidation,
} from "../components/formEnhancements";
import SemanticIcon from "../components/SemanticIcon";

const contactOptions = [
  {
    icon: "🏢",
    label: "Organizations",
    title: "Organizations & Institutions",
    text: "Planning an experience for your team, school, startup, NGO, foundation, community, or institution?",
    buttonText: "Make an organizational inquiry",
    href: "/for-organizations#organization-inquiry",
  },
  {
    icon: "💬",
    label: "General enquiry",
    title: "Ask us anything",
    text: "Have a question about KultureKatta, our events, cities, formats, or upcoming plans? Start here.",
    buttonText: "Email us",
    href: "mailto:hey@kulturekatta.com?subject=General%20Enquiry%20for%20KultureKatta",
  },
  {
    icon: "🤝",
    label: "Partnerships",
    title: "Work / Partner with KultureKatta",
    text: "For venues, cafés, studios, cultural spaces, brands, collectives, and collaborators who want to create something meaningful with us.",
    buttonText: "Partner with us",
    href: "mailto:hey@kulturekatta.com?subject=Partnership%20Enquiry%20for%20KultureKatta",
  },
  {
    icon: "🙌",
    label: "Volunteer",
    title: "Volunteer with KultureKatta",
    text: "Want to help at events, support artists, assist with community building, documentation, research, or on-ground coordination?",
    buttonText: "Volunteer with us",
    href: "mailto:hey@kulturekatta.com?subject=Volunteer%20with%20KultureKatta",
  },
  {
    icon: "🎤",
    label: "Host",
    title: "Host a Katta",
    text: "Are you an artist, facilitator, storyteller, maker, teacher, performer, chef, walker, thinker, or curious human with something to share?",
    buttonText: "Become a host",
    href: "mailto:hey@kulturekatta.com?subject=Host%20a%20Katta",
  },
  {
    icon: "📰",
    label: "Press / Media",
    title: "Media, stories and features",
    text: "For interviews, media features, press enquiries, cultural stories, founder conversations, and documentation requests.",
    buttonText: "Contact for media",
    href: "mailto:hey@kulturekatta.com?subject=Media%20Enquiry%20for%20KultureKatta",
  },
];

const quickLinks = [
  {
    icon: "✉️",
    title: "Email",
    value: "hey@kulturekatta.com",
    href: "mailto:hey@kulturekatta.com",
  },
  {
    icon: "📱",
    title: "WhatsApp / Call",
    value: "+91 97302 44996",
    href: "https://wa.me/919730244996",
  },
  {
    icon: "📸",
    title: "Instagram",
    value: "@kulturekatta",
    href: "https://www.instagram.com/kulturekatta",
  },
];

const inputClassName =
  "mt-2.5 w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-[var(--kk-text)] outline-none transition duration-200 placeholder:text-black/35 hover:border-black/25 focus:border-[var(--kk-accent)] focus:ring-4 focus:ring-black/5";

const labelClassName =
  "kk-form-label block text-sm font-semibold tracking-[0.01em] text-[var(--kk-text)]";

type FormStatus = "idle" | "submitting" | "success" | "error";
const CONTACT_DRAFT_KEY = "kuka-contact-form-draft-v1";

const subscribeToClientReady = () => () => {};
const getClientReadySnapshot = () => true;
const getServerReadySnapshot = () => false;

type ContactDraft = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  consent: boolean;
};

export default function ContactPage() {
  const isClientReady = useSyncExternalStore(
    subscribeToClientReady,
    getClientReadySnapshot,
    getServerReadySnapshot,
  );
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedAtRef = useRef(0);
  const statusMessageRef = useRef<HTMLParagraphElement>(null);
  const isSubmittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { handleInvalid, handleValidationInput } =
    useAccessibleFormValidation();

  useEffect(() => {
    startedAtRef.current = Date.now();

    const savedDraft = window.sessionStorage.getItem(CONTACT_DRAFT_KEY);

    if (!savedDraft || !formRef.current) {
      return;
    }

    try {
      const draft = JSON.parse(savedDraft) as Partial<ContactDraft>;
      const form = formRef.current;
      const setValue = (name: keyof Omit<ContactDraft, "consent">) => {
        const control = form.elements.namedItem(name);

        if (
          control instanceof HTMLInputElement ||
          control instanceof HTMLSelectElement ||
          control instanceof HTMLTextAreaElement
        ) {
          control.value = typeof draft[name] === "string" ? draft[name] : "";
        }
      };

      setValue("name");
      setValue("email");
      setValue("phone");
      setValue("interest");
      setValue("message");

      const consent = form.elements.namedItem("consent");
      if (consent instanceof HTMLInputElement) {
        consent.checked = draft.consent === true;
      }
    } catch {
      window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
    }
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") {
      statusMessageRef.current?.focus();
    }
  }, [status]);

  const saveContactDraft = () => {
    const form = formRef.current;

    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const draft: ContactDraft = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
    };

    window.sessionStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify(draft));
  };

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
      sourcePage: "/contact",
    };

    isSubmittingRef.current = true;
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
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
      window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
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

  return (
    <div className="kk-page-root kk-contact-page kk-section-light min-h-screen">
      {/* HERO SECTION */}
      <section className="kk-section-light relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center sm:px-10 lg:px-16">
          <div className="mb-6 flex justify-center">
            <SemanticIcon icon="👋" label="Contact KultureKatta" size="page" />
          </div>

          <p className="kk-page-label text-[var(--kk-accent)]">
            Contact KultureKatta
          </p>

          <h1 className="kk-page-heading max-w-4xl">
            Let’s start at the very beginning.
          </h1>

          <p className="kk-page-intro mt-8 max-w-4xl">
            Some conversations become workshops. Some become collaborations.
            Some become communities. Some simply begin with a hello —
            suspiciously powerful little word.
          </p>

          <p className="kk-page-intro mt-6 max-w-4xl">
            Want to host, collaborate, volunteer, partner, or bring a Katta to
            your space? We’d love to hear from you.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="https://wa.me/919730244996"
              target="_blank"
              rel="noopener noreferrer"
              className="kk-button-dark"
            >
              WhatsApp us
            </Link>

            <Link
              href="mailto:hey@kulturekatta.com"
              className="kk-button-on-light"
            >
              Email us
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="kk-section-light">
        {/* Separator */}
        <div className="kk-container">
          <div className="border-t border-black/10" />
        </div>

        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🚪" label="Choose your doorway" size="section" />
            </div>

            <p className="kk-section-label mb-5">Choose your doorway</p>

            <h2 className="kk-section-heading">
              <span className="block">What would you like</span>
              <span className="block">to talk about?</span>
            </h2>

            <p className="kk-body mt-6">
              Whether you are planning something for an organization, looking to
              host, partner, volunteer, or simply ask a question, there’s a
              place to begin.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contactOptions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group kk-card kk-card--interactive flex min-h-[360px] flex-col"
              >
                <SemanticIcon icon={item.icon} label={item.title} size="card" />

                <p className="kk-card-label mt-6">{item.label}</p>

                <h3 className="kk-card-title kk-doorway-card-title mt-3">
                  {item.title}
                </h3>

                <p className="kk-card-body mt-4 flex-1">{item.text}</p>

                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--kk-text)] transition group-hover:gap-3">
                  {item.buttonText}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT CONTACT */}
      <section className="kk-section-light px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="📇" label="Direct contact" size="section" />
            </div>

            <p className="kk-section-label mb-5">Direct contact</p>

            <h2 className="kk-section-heading">
              <span className="block">Prefer the</span>
              <span className="block">old-school way?</span>
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-2xl">
              Email, call, WhatsApp, or find us on Instagram. We are very much
              real humans. No mysterious ticketing portal energy here.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-2xl gap-5">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="kk-card kk-card--interactive text-left"
              >
                <SemanticIcon icon={item.icon} label={item.title} size="card" />

                <p className="kk-card-title mt-5">{item.title}</p>

                <p className="kk-card-value mt-3 break-words">{item.value}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="kk-section-light px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="📝" label="Enquiry form" size="section" />
            </div>

            <p className="kk-section-label mb-5">Enquiry form</p>

            <h2 className="kk-section-heading">
              <span className="block">Tell us what</span>
              <span className="block">you’re thinking.</span>
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-2xl">
              Share the essentials with us. A rough idea is perfectly fine — we
              can shape the details together.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(45,35,25,0.10)]">
            <div className="grid min-w-0 lg:grid-cols-[0.78fr_1.22fr]">
              <aside className="relative min-w-0 overflow-hidden bg-[var(--kk-text)] px-7 py-10 text-white sm:px-10 lg:px-11 lg:py-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full border border-white/10"
                />

                <div className="relative flex h-full flex-col">
                  <SemanticIcon
                    icon="🧩"
                    label="Shape of your idea"
                    size="card"
                    className="mb-5"
                  />

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-white">
                    A good place to begin
                  </p>

                  <h3 className="mt-5 text-3xl font-semibold leading-tight text-white">
                    Tell us the shape of your idea.
                  </h3>

                  <p className="mt-5 leading-7 !text-white">
                    It does not need to be perfectly formed. These three details
                    give us enough to start a useful conversation.
                  </p>

                  <ul className="mt-9 space-y-5">
                    {[
                      "What you have in mind",
                      "Who the experience is for",
                      "Where and roughly when",
                    ].map((item, index) => (
                      <li key={item} className="flex items-start gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/80">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="pt-1 text-sm leading-6 text-white/80">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 border-t border-white/15 pt-7 lg:mt-auto">
                    <p className="text-sm !text-white">
                      Prefer a quick conversation?
                    </p>
                    <Link
                      href="https://wa.me/919730244996"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex font-semibold text-white underline decoration-[var(--kk-accent)] decoration-2 underline-offset-4 transition hover:text-[var(--kk-accent)]"
                    >
                      WhatsApp us instead
                    </Link>
                  </div>
                </div>
              </aside>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                onInvalid={handleInvalid}
                onInput={(event) => {
                  handleValidationInput(event);
                  saveContactDraft();
                }}
                className="min-w-0 px-7 py-10 sm:px-10 lg:px-12 lg:py-12"
              >
                <div className="flex min-w-0 flex-col items-start gap-2 border-b border-black/10 pb-7 sm:flex-row sm:justify-between sm:gap-5">
                  <div>
                    <SemanticIcon
                      icon="✍️"
                      label="Start the conversation"
                      size="compact"
                      className="mb-3"
                    />

                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kk-accent)]">
                      Your enquiry
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--kk-text)]">
                      Start the conversation
                    </h3>
                  </div>

                  <p className="pt-1 text-xs text-black/65 sm:shrink-0">
                    * Required
                  </p>
                </div>

                <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClassName}>
                      Name <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClassName}>
                      Email <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <input
                      id="email"
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
                    <label htmlFor="phone" className={labelClassName}>
                      Phone / WhatsApp
                    </label>

                    <input
                      id="phone"
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
                    <label htmlFor="interest" className={labelClassName}>
                      I want to{" "}
                      <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <select
                      id="interest"
                      name="interest"
                      className={`${inputClassName} cursor-pointer`}
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      <option value="organization">
                        Plan an experience for my organization
                      </option>
                      <option value="attend">Attend an experience</option>
                      <option value="partner">
                        Work / partner with KultureKatta
                      </option>
                      <option value="volunteer">
                        Volunteer with KultureKatta
                      </option>
                      <option value="host">Host a Katta</option>
                      <option value="media">Press / media enquiry</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelClassName}>
                      Tell us a little more{" "}
                      <span className="text-[var(--kk-accent)]">*</span>
                    </label>

                    <textarea
                      id="message"
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
                    <label htmlFor="contact-form-guard">
                      Leave this field empty
                    </label>
                    <input
                      id="contact-form-guard"
                      name="formGuard"
                      type="text"
                      tabIndex={-1}
                      autoComplete="new-password"
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--kk-accent)]"
                    />
                    <span className="text-sm leading-6 text-black/60">
                      I agree that KultureKatta may use the information submitted
                      here to respond to my enquiry as described in the{" "}
                      <Link
                        href="/privacy-policy"
                        className="font-semibold underline decoration-black/30 underline-offset-2 hover:decoration-black"
                      >
                        Privacy Policy
                      </Link>.{" "}
                      <span className="text-[var(--kk-accent)]" aria-hidden="true">
                        *
                      </span>
                    </span>
                  </label>

                  {statusMessage && (
                    <p
                      ref={statusMessageRef}
                      tabIndex={-1}
                      role={status === "error" ? "alert" : "status"}
                      aria-live={status === "error" ? "assertive" : "polite"}
                      className={`kk-small-text rounded-2xl px-5 py-4 font-semibold sm:col-span-2 ${
                        status === "error"
                          ? "border border-red-200 bg-red-50 text-red-800"
                          : "border border-green-200 bg-green-50 text-green-800"
                      }`}
                    >
                      {statusMessage}
                    </p>
                  )}

                  <div className="flex flex-col gap-4 border-t border-black/10 pt-7 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-xs leading-5 text-black/65">
                      We will use your details only to respond to your enquiry.
                    </p>

                    <button
                      type="submit"
                      disabled={!isClientReady || status === "submitting"}
                      className="kk-button-dark w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {status === "submitting" ? "Sending enquiry..." : "Send enquiry"}
                    </button>
                  </div>

                  <p className="text-xs leading-5 text-black/65 sm:col-span-2">
                    You will receive an automatic confirmation after a successful
                    submission.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="kk-section-light px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-5 flex justify-center">
            <SemanticIcon icon="☕" label="Start with hello" size="section" />
          </div>

          <p className="kk-section-label mb-5">Start with hello</p>

          <h2 className="kk-section-heading">
            <span className="block">Some ideas need a room,</span>
            <span className="block">a table, and a few curious people.</span>
          </h2>

          <p className="kk-body mx-auto mt-6 max-w-3xl">
            If you have a space, a skill, a community, a question, a wild idea,
            or just a strong feeling that culture should be more alive — talk to
            us.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://wa.me/919730244996"
              target="_blank"
              rel="noopener noreferrer"
              className="kk-button-dark"
            >
              WhatsApp us
            </Link>

            <Link href="/experiences" className="kk-button-on-light">
              Explore experiences
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}