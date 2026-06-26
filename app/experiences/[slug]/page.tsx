import Link from "next/link";
import { notFound } from "next/navigation";
import { experienceCategories } from "../experienceCategories";

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

export default async function ExperienceCategoryPage({
  params,
}: ExperienceCategoryPageProps) {
  const { slug } = await params;

  const category = experienceCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen kk-section-light">
      <section className="kk-section-dark px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="kk-eyebrow text-[#D8B98C]">{category.label}</p>

          <h1 className="kk-page-heading mt-6 leading-tight">
            {category.heroTitle}
          </h1>

          <p className="kk-body mx-auto mt-6 max-w-3xl text-[#DCCAB6]">
            {category.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="kk-button-dark-outline">
              Plan this with us
            </Link>

            <Link href="/experiences" className="kk-button-dark-outline">
              Back to experiences
            </Link>
          </div>
        </div>
      </section>

      <section className="kk-section-light px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="kk-eyebrow text-[#8A4B2A]">What this includes</p>

            <h2 className="kk-section-heading mt-4 leading-tight">
              Small, social, participatory experiences with real cultural depth.
            </h2>

            <p className="kk-body mt-6 text-[#5F5147]">
              {category.description}
            </p>
          </div>

          <div className="rounded-3xl border border-[#E8D8C5] bg-[#FAF7F2] p-8 shadow-sm">
            <h3 className="kk-card-title text-[#17110D]">Experience ideas</h3>

            <div className="mt-6 grid gap-4">
              {category.examples.map((example) => (
                <div
                  key={example}
                  className="kk-body rounded-2xl border border-[#E8D8C5] bg-background px-5 py-4 text-[#5F5147]"
                >
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="kk-section-dark px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/[0.04] p-10 text-center shadow-sm">
          <p className="kk-eyebrow text-[#D8B98C]">
            Want this in your neighbourhood?
          </p>

          <h2 className="kk-section-heading mt-4 leading-tight">
            Let’s design a Katta around this.
          </h2>

          <p className="kk-body mx-auto mt-5 max-w-2xl text-[#DCCAB6]">
            Whether it is for a café, school, company, community, studio,
            society or a group of curious humans, we can curate something warm,
            thoughtful and participatory.
          </p>

          <Link href="/contact" className="kk-button-dark-outline mt-8">
            Talk to us
          </Link>
        </div>
      </section>
    </main>
  );
}