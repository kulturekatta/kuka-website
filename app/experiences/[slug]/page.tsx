import Link from "next/link";
import { notFound } from "next/navigation";
import { experienceCategories } from "@/data/experienceCategories";
import IconLead from "@/app/components/IconLead";
import SemanticIcon from "@/app/components/SemanticIcon";
import SequenceMarker from "@/app/components/SequenceMarker";

type ExperienceCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return experienceCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: ExperienceCategoryPageProps) {
  const { slug } = await params;

  const category = experienceCategories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Experiences | KultureKatta",
    };
  }

  return {
    title: `${category.heroTitle} | KultureKatta`,
    description: category.heroSubtitle,
    alternates: {
      canonical: `/experiences/${slug}`,
    },
  };
}

export default async function ExperienceCategoryPage({
  params,
}: ExperienceCategoryPageProps) {
  const { slug } = await params;

  const category = experienceCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const otherCategories = experienceCategories.filter(
    (item) => item.slug !== category.slug,
  );

  const mood =
    "mood" in category && typeof category.mood === "string"
      ? category.mood
      : null;

  return (
    <div className="kk-page-root kk-section-light">
      <section className="kk-section-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <IconLead
            icon={category.icon}
            label={category.title}
            size="page"
          />

          <p className="kk-page-label">{category.eyebrow}</p>

          <h1 className="kk-page-heading mt-6 max-w-4xl">
            {category.heroTitle}
          </h1>

          <p className="kk-page-intro mt-8 max-w-3xl">
            {category.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/experiences" className="kk-button-on-light px-7 py-4">
              View All Experiences
            </Link>

            <Link href="/contact" className="kk-button-on-light px-7 py-4">
              Collaborate With Us
            </Link>
          </div>
        </div>
      </section>

      <section className="kk-section-light px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <IconLead icon="📖" label="What this experience means" />

            <p className="kk-section-label">What this means</p>

            <h2 className="kk-section-heading mt-5 max-w-3xl">
              Culture becomes real when people participate in it.
            </h2>

            <p className="kk-body-large mt-6 max-w-3xl">{category.intro}</p>

            {mood ? (
              <p className="kk-body-large mt-6 max-w-3xl">{mood}</p>
            ) : null}
          </div>

          <div className="kk-card">
            <SemanticIcon icon="📋" label="Includes" size="card" />

            <p className="kk-card-label mt-5">Includes</p>

            <ul className="mt-6 space-y-4">
              {category.includes.map((item) => (
                <li key={item} className="kk-card-list-item flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--kk-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="kk-section-cream px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <IconLead icon="🧰" label="Possible formats" />

          <p className="kk-section-label">Possible formats</p>

          <h2 className="kk-section-heading mt-5 max-w-3xl">
            Different ways this can come alive as a Katta.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.formats.map((format, index) => (
              <div
                key={format}
                className="kk-card kk-card--compact kk-card--soft"
              >
                <SequenceMarker index={index} label={format} />

                <p className="kk-card-title mt-4">{format}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-light px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <IconLead icon="🌐" label="Explore more experiences" />

          <p className="kk-section-label">Explore more</p>

          <h2 className="kk-section-heading mt-5">
            Other ways to enter the KuKa universe.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherCategories.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="kk-card kk-card--compact kk-card--interactive group"
              >
                <SemanticIcon
                  icon={item.icon}
                  label={item.title}
                  size="card"
                />

                <p className="kk-card-title mt-5">
                  {item.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>

                <p className="kk-link-dark mt-5">
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
    </div>
  );
}
