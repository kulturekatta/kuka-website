import type { Metadata } from "next";
import Link from "next/link";
import SemanticIcon from "../components/SemanticIcon";
import PartnerForm from "./PartnerForm";

export const metadata: Metadata = {
  title: "Partner With Us | KultureKatta",
  description:
    "Connect with KultureKatta as an artist, facilitator, venue, institution or cultural collaborator.",
  alternates: { canonical: "/partner-with-us" },
};

const partnershipWays = [
  {
    icon: "🎨",
    title: "Create & facilitate",
    description:
      "Lead workshops, walks, demonstrations or hands-on cultural experiences.",
  },
  {
    icon: "🏡",
    title: "Offer a space",
    description:
      "Host experiences at a venue, studio, home or other cultural space.",
  },
  {
    icon: "🏫",
    title: "Collaborate as an institution",
    description:
      "Co-create experiences with schools, institutions or cultural organizations.",
  },
  {
    icon: "💡",
    title: "Bring another idea",
    description:
      "Suggest an interesting partnership, collaboration or new format.",
  },
];

export default function PartnerWithUsPage() {
  return (
    <div className="kk-page-root kk-section-light min-h-screen">
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <div className="mb-6 flex justify-center">
            <SemanticIcon icon="🤝" label="Partner With Us" size="page" />
          </div>
          <p className="kk-page-label text-[var(--kk-accent)]">
            Make Something Together
          </p>
          <h1 className="kk-page-heading mx-auto mt-6 max-w-4xl">
            Partner With Us
          </h1>
          <p className="kk-page-intro mx-auto mt-8 max-w-3xl">
            KultureKatta works with people and spaces that make culture
            something we do, not just watch. Artists, makers, facilitators,
            venues, institutions and independent collaborators are welcome
            to introduce themselves.
          </p>
        </div>
      </section>

      <section className="kk-section-light kk-section-padding" aria-labelledby="ways-to-partner-heading">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🧩" label="Ways to collaborate" size="section" />
            </div>
            <p className="kk-section-label">Ways to Collaborate</p>
            <h2 id="ways-to-partner-heading" className="kk-section-heading mt-6">
              There is more than one way to make a katta happen.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnershipWays.map((way) => (
              <article
                key={way.title}
                className="kk-card kk-card--centered kk-card--interactive !flex !flex-col !items-center !justify-start"
              >
                <div className="flex w-full shrink-0 justify-center">
                  <SemanticIcon icon={way.icon} label={way.title} size="card" />
                </div>
                <h3 className="kk-card-title mt-5 flex min-h-[3.2em] w-full items-center justify-center text-center">
                  {way.title}
                </h3>
                <p className="kk-card-body mt-4 w-full text-center">
                  {way.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-light kk-section-padding" aria-labelledby="partner-enquiry-heading">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="📝" label="Introduce yourself" size="section" />
            </div>
            <p className="kk-section-label">Start a Conversation</p>
            <h2 id="partner-enquiry-heading" className="kk-section-heading mt-6">
              Tell us what you have in mind.
            </h2>
            <p className="kk-body-large mt-6">
              Tell us about your work, your space or an idea you would like
              to explore with KuKa.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <PartnerForm />
            <p className="kk-card-body mt-7 text-center">
              Looking for a job or internship instead? Visit{" "}
              <Link href="/work-with-us" className="font-semibold underline underline-offset-4 hover:text-[var(--kk-accent)]">
                Work With KuKa
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
