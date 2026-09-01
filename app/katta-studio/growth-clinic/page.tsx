import type { Metadata } from "next";
import Link from "next/link";
import IconLead from "../../components/IconLead";
import GrowthClinicLandingForm from "./GrowthClinicLandingForm";

export const metadata: Metadata = {
  title: "Growth Clinic | Katta Studio",
  description:
    "A focused review of your website, messaging, digital presence, customer journey, and practical growth opportunities.",
  alternates: {
    canonical: "/katta-studio/growth-clinic",
  },
};

const reviewAreas = [
  {
    number: "01",
    title: "Website",
    text: "Clarity, trust, usability, and whether visitors can take the next step easily.",
  },
  {
    number: "02",
    title: "Messaging",
    text: "How clearly your business explains what it does, who it helps, and why it matters.",
  },
  {
    number: "03",
    title: "Digital presence",
    text: "How consistently your website, social profiles, and business listings work together.",
  },
  {
    number: "04",
    title: "Customer journey",
    text: "The path from discovering your business to understanding, enquiring, and buying.",
  },
  {
    number: "05",
    title: "Growth opportunities",
    text: "The practical gaps and possibilities most worth your attention at this stage.",
  },
];

const signs = [
  "Your business has evolved, but your website or social presence has not kept up.",
  "People see your work, but enquiries are inconsistent or not the right fit.",
  "Your message feels scattered, generic, or difficult to explain simply.",
  "You are doing many marketing activities but are unsure what deserves priority.",
];

const projects = [
  {
    title: "The Baking Room Academy",
    category: "Premium baking education",
    challenge:
      "Workshop visibility, customer communication, and a more structured promotion system.",
    work: "Campaign planning, content, Meta Ads, event listings, and enquiry-flow support.",
  },
  {
    title: "HiLiHiF",
    category: "Fashion and clothing",
    challenge:
      "A stronger social presence and clearer communication of the brand’s fabric-first identity.",
    work: "Brand assessment, content strategy, product storytelling, and visual-identity support.",
  },
  {
    title: "KultureKatta",
    category: "Culture-led experiences",
    challenge:
      "Turning an event-led initiative into a clearer, more scalable platform and customer journey.",
    work: "Brand strategy, website development, content systems, audience journeys, and operations.",
  },
];

export default function GrowthClinicLandingPage() {
  return (
    <div className="kk-page-root min-h-screen overflow-x-clip">
      <section className="relative border-b border-black/[0.07] px-6 py-16 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] bg-[var(--kk-accent)]/[0.055] lg:block"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          <div>
            <IconLead icon="🔬" label="Growth Clinic" size="page" />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--kk-accent)]">
              Katta Studio · Growth Clinic
            </p>

            <h1 className="mt-5 max-w-4xl text-[clamp(2.55rem,6vw,5.35rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[var(--kk-text)]">
              Your business has grown. Has your digital presence?
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--kk-text-muted)] sm:text-xl sm:leading-9">
              The Growth Clinic is a focused review for founders and growing
              businesses that need clarity on what is blocking enquiries,
              communication, or their next stage of growth.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#request" className="kk-button-dark text-center">
                Request a Growth Clinic
              </a>
              <a
                href="#what-we-review"
                className="kk-button-on-light text-center"
              >
                See what we review
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-black/10 bg-[var(--kk-dark)] p-7 text-white shadow-[0_28px_80px_rgba(42,30,25,0.16)] sm:p-9">
            <p
              className="text-sm font-bold uppercase tracking-[0.16em]"
              style={{ color: "#ffffff" }}
            >
              A useful starting point when
            </p>
            <ul className="mt-6 grid gap-5">
              {[
                "Your message is not landing",
                "Your digital presence feels disconnected",
                "Enquiries are inconsistent",
                "You are unsure what to fix first",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-white/10 pb-5 text-lg leading-7 last:border-b-0 last:pb-0"
                >
                  <span
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d3a77c]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section
        id="what-we-review"
        className="scroll-mt-24 bg-white px-6 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <IconLead icon="📋 🔎" label="Growth Clinic review" />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--kk-accent)]">
              What we review
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--kk-text)]">
              Five connected parts of your growth journey.
            </h2>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-5">
            {reviewAreas.map((area) => (
              <article key={area.title} className="bg-white p-6 lg:min-h-72">
                <p className="text-sm font-bold tracking-[0.12em] text-[var(--kk-accent)]">
                  {area.number}
                </p>
                <h3 className="mt-8 text-xl font-bold tracking-[-0.02em] text-[var(--kk-text)]">
                  {area.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--kk-text-muted)]">
                  {area.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.07] bg-[var(--kk-surface-alt)] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <IconLead
              icon="🎯 👥"
              label="Who the Growth Clinic is for"
            />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--kk-accent)]">
              Who this is for
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--kk-text)]">
              Built for the “something is not quite working” stage.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--kk-text-muted)]">
              For founders, professionals, creators, small businesses, and
              purpose-led organisations that have moved beyond guesswork—but
              still need a clearer way forward.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {signs.map((sign, index) => (
              <div
                key={sign}
                className="rounded-3xl border border-black/10 bg-white p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--kk-accent)]/[0.1] text-sm font-bold text-[var(--kk-accent)]">
                  {index + 1}
                </span>
                <p className="mt-5 text-base leading-7 text-[var(--kk-text)]">
                  {sign}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <IconLead icon="📁" label="Selected projects" />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--kk-accent)]">
              Selected work
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--kk-text)]">
              Different businesses. Clearer next steps.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex flex-col rounded-[1.75rem] border border-black/10 bg-white p-7 shadow-[0_12px_36px_rgba(42,30,25,0.05)]"
              >
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--kk-accent)]">
                  {project.category}
                </p>
                <h3 className="mt-4 text-2xl font-bold tracking-[-0.025em] text-[var(--kk-text)]">
                  {project.title}
                </h3>
                <div className="mt-6 border-t border-black/10 pt-5">
                  <p className="text-sm font-bold text-[var(--kk-text)]">
                    The challenge
                  </p>
                  <p className="mt-2 text-base leading-7 text-[var(--kk-text-muted)]">
                    {project.challenge}
                  </p>
                </div>
                <div className="mt-5">
                  <p className="text-sm font-bold text-[var(--kk-text)]">
                    Our work
                  </p>
                  <p className="mt-2 text-base leading-7 text-[var(--kk-text-muted)]">
                    {project.work}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="request"
        className="scroll-mt-20 border-t border-black/[0.07] bg-[var(--kk-surface-alt)] px-6 py-16 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <IconLead icon="🚧" label="Where you are feeling stuck" />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--kk-accent)]">
              Start here
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--kk-text)]">
              You do not need to arrive with the answer.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--kk-text-muted)]">
              Tell us what feels stuck. We will review your enquiry and help
              identify the most useful starting point.
            </p>
            <p className="mt-7 text-sm leading-6 text-[var(--kk-text-muted)]">
              Want the broader picture first?{" "}
              <Link
                href="/katta-studio"
                className="font-bold text-[var(--kk-text)] underline decoration-black/25 underline-offset-4 hover:decoration-black"
              >
                Explore Katta Studio
              </Link>
            </p>
          </div>

          <GrowthClinicLandingForm />
        </div>
      </section>
    </div>
  );
}
