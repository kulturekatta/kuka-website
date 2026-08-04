import Link from "next/link";

const sampleExperiences = [
  "Pottery celebration",
  "Food and storytelling evening",
  "Creative bachelorette",
  "Family heritage walk",
  "Parent-child art session",
  "Couple’s creative date",
  "Curated half-day Pune trail",
  "Private music baithak",
];

export default function PrivateExperiencesPage() {
  return (
    <main className="kk-page-root kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <p className="kk-page-label text-[var(--kk-accent)]">
            KuKa Private Experiences
          </p>

          <h1 className="kk-page-heading mx-auto mt-6 max-w-5xl">
            Private cultural experiences, designed around your people and
            occasion.
          </h1>

          <p className="kk-page-intro mx-auto mt-8 max-w-3xl">
            From birthdays and bachelorettes to family days and city trails, we
            shape each gathering around your group, mood, time and budget.
          </p>

          <div className="mt-10">
            <Link href="/contact" className="kk-button-dark">
              Plan a Private Experience
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERIENCE IDEAS */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label">Experience Ideas</p>

            <h2 className="kk-section-heading mt-4">
              A starting point, not a fixed menu.
            </h2>

            <p className="kk-body-large mx-auto mt-5 max-w-2xl">
              Every experience can be adapted to your people, occasion and
              setting.
            </p>
          </div>

          <div className="kk-grid-3 mt-12">
            {sampleExperiences.map((item) => (
              <article
                key={item}
                className="kk-card kk-card--centered kk-card--interactive min-h-[150px]"
              >
                <h3 className="kk-card-title">{item}</h3>
              </article>
            ))}

            <Link
              href="/contact"
              aria-label="Plan a custom private experience"
              className="kk-card kk-card--centered kk-card--interactive min-h-[150px] border-2 border-[var(--kk-accent)]"
            >
              <div className="text-center">
                <h3 className="kk-card-title">
                  Something entirely your own
                </h3>

                <p className="kk-card-meta mt-3 text-[var(--kk-accent)]">
                  Tell us what you have in mind →
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* STARTING INVESTMENT */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container text-center">
          <div className="kk-panel mx-auto max-w-4xl">
            <p className="kk-section-label">Starting Investment</p>

            <h2 className="kk-section-heading mx-auto mt-4 max-w-3xl">
              Private experiences start at ₹15,000.
            </h2>

            <p className="kk-body-large mx-auto mt-6 max-w-3xl">
              Your final quote reflects group size, duration, venue, materials,
              food, travel, collaborators and the level of customisation.
            </p>

            <div className="mt-10">
              <Link href="/contact" className="kk-button-dark">
                Share Your Occasion
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}