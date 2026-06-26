import Link from "next/link";
import { notFound } from "next/navigation";
import { exploreCategories } from "@/data/exploreCategories";

type ExplorePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return exploreCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: ExplorePageProps) {
  const { slug } = await params;

  const category = exploreCategories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Explore Kattas | KultureKatta",
    };
  }

  return {
    title: `${category.heroTitle} | KultureKatta`,
    description: category.heroSubtitle,
  };
}

export default async function ExploreCategoryPage({
  params,
}: ExplorePageProps) {
  const { slug } = await params;

  const category = exploreCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const otherCategories = exploreCategories.filter(
    (item) => item.slug !== category.slug
  );

  return (
    <main className="kk-section-light">
      <section className="kk-section-dark px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kk-eyebrow text-[#D8BFAF]">{category.eyebrow}</p>

          <h1 className="kk-page-heading mt-6 max-w-4xl">
            {category.heroTitle}
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/80">
            {category.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/experiences"
              className="kk-rounded-button border-white/30 px-7 py-4 text-center text-sm uppercase tracking-[0.2em] text-white hover:border-white hover:bg-white hover:text-[#171717]"
            >
              View Experiences
            </Link>

            <Link
              href="/contact"
              className="kk-rounded-button border-white/30 px-7 py-4 text-center text-sm uppercase tracking-[0.2em] text-white hover:border-white hover:bg-white hover:text-[#171717]"
            >
              Collaborate With Us
            </Link>
          </div>
        </div>
      </section>

      <section className="kk-section-light px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="kk-section-label text-[#8B5E3C]">
              What this means
            </p>

            <h2 className="kk-section-heading mt-5 max-w-3xl">
              Culture becomes real when people participate in it.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">
              {category.intro}
            </p>

            {"mood" in category && category.mood ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">
                {category.mood}
              </p>
            ) : null}
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <p className="kk-eyebrow text-[#8B5E3C]">Includes</p>

            <ul className="mt-6 space-y-4">
              {category.includes.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8B5E3C]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="kk-section-cream px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="kk-section-label text-[#8B5E3C]">
            Possible formats
          </p>

          <h2 className="kk-section-heading mt-5 max-w-3xl">
            Different ways this can come alive as a Katta.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.formats.map((format) => (
              <div
                key={format}
                className="rounded-3xl border border-black/10 bg-[#FAFAF7] p-6"
              >
                <p className="kk-card-title">{format}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-light px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="kk-section-label text-[#8B5E3C]">Explore more</p>

          <h2 className="kk-section-heading mt-5">
            Other ways to enter the KuKa universe.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherCategories.map((item) => (
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