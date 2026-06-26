import Link from "next/link";

const moodCards = [
  {
    title: "i want to make something",
    description:
      "Come get your hands busy — fold, paint, plant, brew, stitch, shape, or build something you can take back with you.",
    examples: ["pottery", "kirigami", "kokedama", "baking", "candle making"],
    href: "/experiences/workshops",
    cta: "explore making experiences",
  },
  {
    title: "i want to learn something",
    description:
      "For the curious ones who like ideas, stories, conversations, questions, and the occasional beautiful rabbit hole.",
    examples: ["talks", "salons", "storytelling", "history", "science"],
    href: "/explore-talks",
    cta: "explore learning experiences",
  },
  {
    title: "i want to go somewhere",
    description:
      "Step out into the city, follow a trail, notice a street, enter a neighbourhood, and come back seeing it differently.",
    examples: [
      "heritage walks",
      "nature trails",
      "food walks",
      "city explorations",
    ],
    href: "/explore-walks",
    cta: "explore walks & trails",
  },
  {
    title: "i want to meet people",
    description:
      "For when you want to be around people without the pressure of networking, performing, or pretending to be fascinating.",
    examples: ["kattas", "circles", "game nights", "community gatherings"],
    href: "/experiences",
    cta: "explore social experiences",
  },
  {
    title: "i want to slow down",
    description:
      "Soft, screen-light experiences for rest, reflection, making, listening, breathing, and returning to yourself.",
    examples: [
      "journaling",
      "mindful making",
      "plant sessions",
      "sensory experiences",
    ],
    href: "/experiences",
    cta: "explore slow experiences",
  },
  {
    title: "i want to play",
    description:
      "Games, puzzles, ancient play, modern play, movement, curiosity, and the very serious business of having fun.",
    examples: ["board games", "ancient games", "puzzles", "interactive culture"],
    href: "/explore-games",
    cta: "explore playful experiences",
  },
  {
    title: "i want to feel inspired",
    description:
      "Music, poetry, theatre, film, stories, performance, and experiences that leave a little echo behind.",
    examples: ["music", "poetry", "stage", "screen", "performance"],
    href: "/explore-stage-and-screen",
    cta: "explore inspiring experiences",
  },
  {
    title: "i want something different",
    description:
      "The odd, the unexpected, the quietly brilliant, the ‘wait, this exists?’ kind of cultural rabbit hole.",
    examples: ["experimental formats", "surprise sessions", "curious gatherings"],
    href: "/experiences",
    cta: "surprise me",
  },
];

export default function ExploreByMoodPage() {
  return (
    <main className="min-h-screen kk-section-dark">
      {/* Hero */}
      <section className="kk-section-dark px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <p className="kk-section-label mb-4 text-[#D6A85A]">
            explore by mood
          </p>

          <h1 className="kk-page-heading max-w-4xl">
            What are you in the mood for?
          </h1>

          <p className="kk-body mt-6 max-w-3xl text-[#E7DED1] sm:text-lg sm:leading-8">
            Some days you want to make something. Some days you want to walk,
            listen, play, learn, meet people, or simply slow down. Start with
            how you feel — we’ll help you find your katta.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/experiences"
              className="kk-rounded-button border-[#FAF7F2] bg-[#FAF7F2] text-[#17110D] hover:border-[#D6A85A] hover:bg-[#D6A85A]"
            >
              explore all experiences
            </Link>

            <Link
              href="/contact"
              className="kk-rounded-button border-[#FAF7F2]/30 text-[#FAF7F2] hover:border-[#D6A85A] hover:text-[#D6A85A]"
            >
              get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Mood Cards */}
      <section className="kk-section-light px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="kk-section-label mb-3 text-[#8A5A28]">
              choose your starting point
            </p>

            <h2 className="kk-section-heading">
              Browse experiences by feeling, not by folder.
            </h2>

            <p className="kk-body mt-4 text-[#5B5047]">
              Because nobody wakes up saying, “today I seek a meta-category.”
              Usually, it is simpler than that. You want to make, move, wonder,
              rest, connect, or play.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {moodCards.map((mood) => (
              <article
                key={mood.title}
                className="flex min-h-[360px] flex-col justify-between rounded-[2rem] border border-[#17110D]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <h3 className="kk-card-title tracking-tight">
                    {mood.title}
                  </h3>

                  <p className="kk-small-text mt-4 text-[#5B5047]">
                    {mood.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {mood.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-full bg-[#F0E7DA] px-3 py-1 text-xs font-medium text-[#5B3A1E]"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={mood.href}
                  className="kk-rounded-button mt-8 w-fit border-[#17110D] text-[#17110D] hover:bg-[#17110D] hover:text-[#FAF7F2]"
                >
                  {mood.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge */}
      <section className="kk-section-dark px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="kk-section-label mb-4 text-[#D6A85A]">
              not sure yet?
            </p>

            <h2 className="kk-section-heading">That is allowed.</h2>
          </div>

          <div>
            <p className="kk-body text-[#E7DED1] sm:text-lg sm:leading-8">
              KultureKatta is for curiosity in all its forms — planned,
              impulsive, quiet, playful, deeply nerdy, mildly chaotic, and
              occasionally snack-led. Start anywhere. The point is to begin.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/experiences"
                className="kk-rounded-button border-[#D6A85A] bg-[#D6A85A] text-[#17110D] hover:border-[#FAF7F2] hover:bg-[#FAF7F2]"
              >
                explore all kattas
              </Link>

              <Link
                href="/contact"
                className="kk-rounded-button border-[#FAF7F2]/30 text-[#FAF7F2] hover:border-[#D6A85A] hover:text-[#D6A85A]"
              >
                suggest a mood
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}