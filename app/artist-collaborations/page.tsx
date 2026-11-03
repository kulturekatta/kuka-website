import type { Metadata } from "next";
import Link from "next/link";
import SemanticIcon from "../components/SemanticIcon";
import ArtistCollaborationForm from "./ArtistCollaborationForm";

export const metadata: Metadata = {
  title: "Artist Collaborations | KultureKatta",
  description:
    "Create experiences with KultureKatta. Artists, performers, makers, guides and facilitators can introduce their practice and propose a collaboration.",
  alternates: { canonical: "/artist-collaborations" },
};

const possibilities = [
  {
    icon: "🎨",
    title: "Make & create",
    description: "Lead hands-on sessions in art, craft, design or making.",
  },
  {
    icon: "🎶",
    title: "Perform & share",
    description: "Bring music, storytelling, performance or cultural traditions to life.",
  },
  {
    icon: "🥾",
    title: "Explore & discover",
    description: "Guide walks, trails, heritage explorations or nature experiences.",
  },
  {
    icon: "🧩",
    title: "Imagine something new",
    description: "Co-create an experiment, a series or a format we haven't tried yet.",
  },
];

export default function ArtistCollaborationsPage() {
  return (
    <div className="kk-page-root kk-section-light min-h-screen">
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <div className="mb-6 flex justify-center">
            <SemanticIcon icon="🎭" label="Artist Collaborations" size="page" />
          </div>
          <p className="kk-page-label text-[var(--kk-accent)]">Create With KuKa</p>
          <h1 className="kk-page-heading mx-auto mt-6 max-w-4xl">Bring your craft. We&apos;ll make room for curiosity.</h1>
          <p className="kk-page-intro mx-auto mt-8 max-w-3xl">
            Are you an artist, performer, maker, educator, storyteller, guide or facilitator?
            KultureKatta brings people together through participatory cultural experiences.
            Tell us what you love doing — and what you might enjoy creating with others.
          </p>
          <a className="kk-button-dark mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3" href="#artist-introduction">
            Introduce yourself
          </a>
        </div>
      </section>

      <section className="kk-section-light kk-section-padding" aria-labelledby="artist-ways-heading">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🧩" label="Ways to create together" size="section" />
            </div>
            <p className="kk-section-label">Ways to Create Together</p>
            <h2 id="artist-ways-heading" className="kk-section-heading mt-6">Different practices. Shared possibilities.</h2>
            <p className="kk-body-large mt-6">You don&apos;t need a ready-made workshop to start a conversation. A thoughtful idea is a good beginning.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {possibilities.map((possibility) => (
              <article key={possibility.title} className="kk-card kk-card--centered kk-card--interactive !flex !flex-col !items-center !justify-start">
                <div className="flex w-full shrink-0 justify-center">
                  <SemanticIcon icon={possibility.icon} label={possibility.title} size="card" />
                </div>
                <h3 className="kk-card-title mt-5 flex min-h-[3.2em] w-full items-center justify-center text-center">{possibility.title}</h3>
                <p className="kk-card-body mt-4 w-full text-center">{possibility.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-light kk-section-padding" aria-labelledby="artist-how-heading">
        <div className="kk-container max-w-4xl">
          <div className="text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🤝" label="Collaboration process" size="section" />
            </div>
            <p className="kk-section-label">What Happens Next</p>
            <h2 id="artist-how-heading" className="kk-section-heading mt-6">A conversation, not an audition.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Tell us about yourself", "Introduce your practice, ideas and the kinds of experiences you&apos;d like to explore."],
              ["02", "We look for a fit", "We review possibilities based on the experience, audience, location and practical needs."],
              ["03", "Co-create when it aligns", "If there&apos;s a suitable opportunity, we'll contact you to discuss a format and next steps."],
            ].map(([number, title, description]) => (
              <div key={number} className="kk-panel p-6 text-center">
                <p className="kk-section-label">{number}</p>
                <h3 className="kk-card-title mt-3 flex min-h-[3.2em] items-center justify-center">{title}</h3>
                <p className="kk-card-body mt-3">{description}</p>
              </div>
            ))}
          </div>
          <p className="kk-card-body mx-auto mt-8 max-w-3xl text-center">
            This is an invitation to explore collaborations, not a job application or a promise of paid work.
            Project terms, responsibilities and fees, where applicable, are discussed before any engagement.
          </p>
        </div>
      </section>

      <section id="artist-introduction" className="kk-section-light kk-section-padding scroll-mt-24" aria-labelledby="artist-form-heading">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center"><SemanticIcon icon="💌" label="Introduce your practice" size="section" /></div>
            <p className="kk-section-label">Start Here</p>
            <h2 id="artist-form-heading" className="kk-section-heading mt-6">Tell us what you bring to the katta.</h2>
            <p className="kk-body-large mt-6">Share a little about your work and what you&apos;d like to create. Links are welcome; uploads aren&apos;t necessary.</p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl"><ArtistCollaborationForm /></div>
          <p className="kk-card-body mx-auto mt-8 max-w-3xl text-center">
            Looking for a venue, institutional or brand partnership instead? Visit <Link className="font-semibold underline underline-offset-4" href="/partner-with-us">Partner With KuKa</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
