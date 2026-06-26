import Link from "next/link";

const sampleExperiences = [
  "Pottery birthday",
  "Food and storytelling evening",
  "Creative bachelorette",
  "Family heritage walk",
  "Mother-daughter art session",
  "Girls’ day experience",
  "Couple creative date",
  "Traveller half-day Pune trail",
  "Few hours to kill in the city experience",
  "Music baithak for a private group",
  "Festival-themed home gathering",
];

const bestFor = [
  "Birthdays",
  "Bachelorettes",
  "Kitty groups",
  "Families",
  "Friend groups",
  "Couples",
  "Travellers",
  "Visiting guests",
  "Women’s groups",
  "Parent-child groups",
  "Small celebrations",
  "Private cultural evenings",
];

export default function PrivateExperiencesPage() {
  return (
    <main className="kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <p className="kk-section-label text-[#2A1E19]">
            KuKa Private Experiences
          </p>

          <h1 className="kk-page-heading mx-auto mt-6 max-w-5xl text-[#1F1712]">
            Custom cultural experiences for birthdays, families, friends, travellers and private groups.
          </h1>

          <p className="kk-body-large mx-auto mt-8 max-w-3xl text-black/70">
            KultureKatta creates private experiences for people who want to celebrate,
            connect or explore the city in a more meaningful way. Instead of a standard
            restaurant plan or a generic party, we help you design something personal,
            creative and memorable.
          </p>

          <div className="mt-10">
            <Link href="/contact" className="kk-button-dark">
              Plan a Private Experience
            </Link>
          </div>
        </div>
      </section>

      {/* BEST FOR */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="kk-grid-2 items-start">
            <div>
              <p className="kk-section-label text-[#2A1E19]">Best For</p>

              <h2 className="kk-section-heading mt-4 text-[#1F1712]">
                For people who already have a group, an occasion and a reason to gather.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {bestFor.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="kk-body font-semibold text-[#1F1712]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE EXPERIENCES */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label text-[#2A1E19]">
              Sample Experiences
            </p>

            <h2 className="kk-section-heading mt-4 text-[#1F1712]">
              We begin with your mood, people, time and budget.
            </h2>
          </div>

          <div className="kk-grid-3 mt-12">
            {sampleExperiences.map((item) => (
              <article
                key={item}
                className="kk-card-cream flex min-h-[150px] items-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="kk-card-title text-[#1F1712]">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STARTING INVESTMENT */}
      <section className="kk-section-dark kk-section-padding">
        <div className="kk-container text-center">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/5 p-10">
            <p className="kk-section-label text-[#D8BFAF]">
              Starting Investment
            </p>

            <h2 className="kk-section-heading mx-auto mt-4 max-w-3xl text-white">
              Private experiences start at ₹15,000 onwards.
            </h2>

            <p className="kk-body-large mx-auto mt-6 max-w-3xl text-white/70">
              Final pricing depends on group size, duration, format, artist or expert fees,
              materials, food, venue, travel and level of customisation.
            </p>

            <div className="mt-10">
              <Link href="/contact" className="kk-button-light">
                Share Your Occasion
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}