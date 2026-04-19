import { experiences } from "@/data/experiences";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    return <div className="p-10">Experience not found</div>;
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <a
          href="/experiences"
          className="mb-6 inline-block text-sm text-gray-400 hover:text-white"
        >
          ← Back to Experiences
        </a>

        <div className="mb-8 h-72 w-full overflow-hidden rounded-2xl md:h-96">
          <img
            src={experience.image}
            alt={experience.title}
            className="h-full w-full object-cover"
          />
        </div>

        <p className="text-sm text-gray-400">
          {experience.city} • {experience.date}
        </p>

        <h1 className="mt-2 text-4xl font-semibold">
          {experience.title}
        </h1>

        <p className="mt-6 text-lg text-gray-300">
          {experience.description}
        </p>
        <div className="mt-8">
          <button className="rounded-xl bg-white px-6 py-3 text-black transition hover:bg-gray-200">
            Book this experience
          </button>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-medium">What to expect</h2>
            <p className="mt-2 text-gray-400">{experience.whatToExpect}</p>
          </div>

          <div>
            <h2 className="text-xl font-medium">Who it’s for</h2>
            <p className="mt-2 text-gray-400">{experience.whoItsFor}</p>
          </div>
        </div>
      </div>
    </main>
  );
}