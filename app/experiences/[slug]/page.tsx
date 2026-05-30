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
    <main className="min-h-screen bg-[#FAF7F2] text-[#17110D]">
      <section className="px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8A4B2A]">
            {category.label}
          </p>

          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {category.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5F5147]">
            {category.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-[#17110D] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#8A4B2A]"
            >
              Plan this with us
            </Link>

            <Link
              href="/experiences"
              className="rounded-full border border-[#17110D] bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#17110D] hover:text-[#FAF7F2]"
            >
              Back to experiences
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#17110D] px-6 py-20 text-[#FAF7F2] sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D8B98C]">
              What this includes
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Small, social, participatory experiences with real cultural depth.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#DCCAB6]">
              {category.description}
            </p>
          </div>

          <div className="rounded-3xl border border-[#3A2A20] bg-[#211812] p-8">
            <h3 className="text-2xl font-black text-[#FAF7F2]">
              Experience ideas
            </h3>

            <div className="mt-6 grid gap-4">
              {category.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-2xl border border-[#3A2A20] bg-[#17110D] px-5 py-4 text-[#DCCAB6]"
                >
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#E8D8C5] bg-[#FFFDF8] p-10 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8A4B2A]">
            Want this in your neighbourhood?
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            Let’s design a Katta around this.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#5F5147]">
            Whether it is for a café, school, company, community, studio,
            society or a group of curious humans, we can curate something warm,
            thoughtful and participatory.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-[#17110D] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#8A4B2A]"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </main>
  );
}