import Link from "next/link";
import { exploreCategories } from "@/data/exploreCategories";

export default function ExplorePage() {
  return (
    <main className="kk-section-light">
      <section className="kk-section-dark px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kk-eyebrow text-[#D8BFAF]">Explore Kattas</p>

          <h1 className="kk-page-heading mt-6 max-w-4xl">
            Find your way into the KuKa universe.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/80">
            Choose from hands-on workshops, food and sensory experiences,
            walks, talks, words, sound, stories, movement, games and playful
            cultural gatherings.
          </p>
        </div>
      </section>

      <section className="kk-section-light px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="kk-section-label text-[#8B5E3C]">Categories</p>

          <h2 className="kk-section-heading mt-5 max-w-3xl">
            Different ways to enter culture through doing.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exploreCategories.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group rounded-3xl border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="kk-card-title">
                  {item.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>

                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#8B5E3C] underline decoration-[#D8BFAF] underline-offset-8">
                  {item.ctaLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}