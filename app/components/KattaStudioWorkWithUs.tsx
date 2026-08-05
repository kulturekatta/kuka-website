import Link from "next/link";

export default function KattaStudioWorkWithUs() {
  return (
    <section
      aria-labelledby="katta-studio-work-with-us-heading"
      className="kk-section-light border-t border-black/10 px-6 py-20 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="kk-panel kk-panel--flush">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="kk-eyebrow">Work With Katta Studio</p>

              <h2
                id="katta-studio-work-with-us-heading"
                className="kk-section-heading mt-5"
              >
                Help thoughtful businesses build a stronger digital presence
              </h2>

              <p className="kk-body-large mt-6 max-w-2xl">
                We work with designers, content creators, developers,
                researchers, strategists, interns and independent specialists
                who enjoy solving real business problems with clarity,
                creativity and care.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/katta-studio/work-with-us"
                  className="kk-button-dark"
                >
                  Explore Opportunities
                </Link>

                <Link
                  href="/katta-studio/work-with-us#application-form"
                  className="kk-button-on-light"
                >
                  Apply With Your Portfolio
                </Link>
              </div>
            </div>

            <div className="flex items-center bg-[var(--kk-surface-alt)] p-8 sm:p-12 lg:p-14">
              <div>
                <p className="kk-card-meta font-semibold uppercase tracking-[0.18em]">
                  We may collaborate with
                </p>

                <ul className="kk-body mt-6 space-y-4">
                  <li className="border-b border-black/10 pb-4">
                    Visual and brand designers
                  </li>
                  <li className="border-b border-black/10 pb-4">
                    Content creators and copywriters
                  </li>
                  <li className="border-b border-black/10 pb-4">
                    Website developers
                  </li>
                  <li className="border-b border-black/10 pb-4">
                    Research and outreach associates
                  </li>
                  <li>Interns and project-based collaborators</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
