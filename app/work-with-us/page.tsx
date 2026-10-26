import type { Metadata } from "next";
import Link from "next/link";
import SemanticIcon from "../components/SemanticIcon";
import WorkWithUsApplicationForm from "../katta-studio/work-with-us/WorkWithUsApplicationForm";

export const metadata: Metadata = {
  title: "Work With KuKa | KultureKatta",
  description:
    "Explore roles, internships, freelance assignments and project opportunities with KultureKatta and Katta Studio.",
  alternates: { canonical: "/work-with-us" },
};

const areas = [
  {
    icon: "🎭",
    name: "KultureKatta",
    description:
      "Cultural experiences, programming, community, events, research, outreach and operations.",
  },
  {
    icon: "🎨",
    name: "Katta Studio",
    description:
      "Design, brand communication, content, websites, digital presence, research and creative projects.",
  },
];

const ways = [
  { icon: "💼", title: "Employment", description: "Full-time and part-time roles when an opening is available." },
  { icon: "🎓", title: "Internships", description: "Practical learning through real projects and meaningful responsibilities." },
  { icon: "🧩", title: "Freelance & project work", description: "Defined assignments for independent professionals and specialists." },
];

export default function WorkWithKuKaPage() {
  return (
    <div className="kk-page-root kk-section-light min-h-screen">
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <div className="mb-6 flex justify-center">
            <SemanticIcon icon="💼" label="Work With KuKa" size="page" />
          </div>
          <p className="kk-page-label text-[var(--kk-accent)]">Work With KuKa</p>
          <h1 className="kk-page-heading mx-auto mt-6 max-w-4xl">
            Curious minds. Different skills. Shared possibilities.
          </h1>
          <p className="kk-page-intro mx-auto mt-8 max-w-3xl">
            We work with people who bring curiosity, care, reliability and useful skills — across cultural experiences and creative business projects.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#application-form" className="kk-button-dark">Apply to Work With Us</a>
            <Link href="/partner-with-us" className="kk-button-on-light">Looking to Partner?</Link>
          </div>
        </div>
      </section>

      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center"><SemanticIcon icon="🧭" label="Where you could work" size="section" /></div>
            <p className="kk-section-label">Where You Could Work</p>
            <h2 className="kk-section-heading mt-6">Two sides of KuKa. Plenty of ways to contribute.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {areas.map((area) => (
              <article key={area.name} className="kk-card kk-card--centered kk-card--interactive">
                <SemanticIcon icon={area.icon} label={area.name} size="card" />
                <h3 className="kk-card-title mt-5">{area.name}</h3>
                <p className="kk-card-body mt-4">{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center"><SemanticIcon icon="🚪" label="Ways to work with us" size="section" /></div>
            <p className="kk-section-label">Ways to Work Together</p>
            <h2 className="kk-section-heading mt-6">There isn&apos;t just one way to join in.</h2>
            <p className="kk-body-large mt-6">Opportunities depend on current projects and requirements. An application is an expression of interest, not a promise of an immediate opening.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {ways.map((way) => (
              <article
                key={way.title}
                className="kk-card kk-card--centered kk-card--interactive !flex !flex-col !items-center !justify-start"
              >
                <div className="flex h-24 w-full shrink-0 items-center justify-center">
                  <SemanticIcon icon={way.icon} label={way.title} size="card" />
                </div>
                <h3 className="kk-card-title mt-5 flex min-h-24 items-center justify-center text-center">
                  {way.title}
                </h3>
                <p className="kk-card-body mt-4 text-center">{way.description}</p>
              </article>
            ))}
          </div>
          <p className="kk-body mx-auto mt-10 max-w-3xl text-center">
            Interested specifically in design, digital, content or growth roles?{" "}
            <Link href="/katta-studio/work-with-us" className="font-semibold underline underline-offset-4">Explore Katta Studio opportunities</Link>.
          </p>
        </div>
      </section>

      <WorkWithUsApplicationForm sourcePage="/work-with-us#application-form" />

      <section className="kk-section-light kk-section-padding">
        <div className="kk-container text-center">
          <div className="mb-5 flex justify-center"><SemanticIcon icon="🪢" label="Collaboration alternatives" size="section" /></div>
          <h2 className="kk-section-heading">Looking for a collaboration instead?</h2>
          <p className="kk-body-large mx-auto mt-6 max-w-3xl">If you are an artist, facilitator, venue, sponsor or cultural collaborator proposing an experience or partnership, use our dedicated partnership form.</p>
          <Link href="/partner-with-us" className="kk-button-on-light mt-8">Partner With Us</Link>
        </div>
      </section>
    </div>
  );
}
