import { experiences } from "@/data/experiences";

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <h1 className="text-4xl font-semibold">Experiences</h1>
      <p className="mt-6 text-lg text-gray-700">
        Browse all KultureKatta experiences here.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {experiences.map((exp) => (
          <a
            key={exp.slug}
            href={`/experiences/${exp.slug}`}
            className="group overflow-hidden rounded-2xl border border-gray-800 bg-black text-white transition hover:border-gray-500"
          >
            <div className="h-56 w-full overflow-hidden">
              <img
                src={exp.image}
                alt={exp.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-400">
                {exp.city} • {exp.date}
              </p>

              <h2 className="mt-2 text-2xl font-medium group-hover:underline">
                {exp.title}
              </h2>

              <p className="mt-4 text-sm text-gray-500">View experience →</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}