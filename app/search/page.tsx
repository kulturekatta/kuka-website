import Link from "next/link";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

const searchableItems = [
  {
    title: "Home",
    href: "/",
    type: "Page",
    description:
      "Start here. Discover KultureKatta, our philosophy, featured experiences, and the KuKa universe.",
    keywords: ["home", "kulturekatta", "kuka", "culture", "events"],
  },
  {
    title: "About",
    href: "/about",
    type: "Page",
    description:
      "Read about KultureKatta, our story, our purpose, and what culture means to us.",
    keywords: ["about", "story", "manifesto", "purpose", "culture"],
  },
  {
    title: "Experiences",
    href: "/experiences",
    type: "Page",
    description:
      "Explore workshops, walks, games, talks, music, food, craft, and cultural experiences.",
    keywords: [
      "experiences",
      "events",
      "workshops",
      "walks",
      "games",
      "talks",
      "music",
      "food",
      "craft",
      "pottery",
      "heritage",
    ],
  },
  {
    title: "Hands-On Workshops",
    href: "/explore/workshops",
    type: "Experience Category",
    description:
      "Make, learn, build, taste, shape, stitch, paint, plant, cook, and create with your hands.",
    keywords: [
      "workshops",
      "hands-on",
      "pottery",
      "art",
      "craft",
      "painting",
      "baking",
      "cooking",
      "gardening",
      "kirigami",
      "kokedama",
    ],
  },
  {
    title: "Walks & Trails",
    href: "/explore/walks",
    type: "Experience Category",
    description:
      "Heritage walks, nature trails, city explorations, food walks, and neighbourhood discoveries.",
    keywords: [
      "walks",
      "trails",
      "heritage",
      "nature",
      "city",
      "pune",
      "explore",
      "outdoor",
    ],
  },
  {
    title: "Talks & Conversations",
    href: "/explore/talks",
    type: "Experience Category",
    description:
      "Storytelling, salons, discussions, expert sessions, ideas, and cultural conversations.",
    keywords: [
      "talks",
      "conversation",
      "storytelling",
      "salon",
      "ideas",
      "history",
      "forensics",
      "wildlife",
    ],
  },
  {
    title: "Music & Sound",
    href: "/explore/sound",
    type: "Experience Category",
    description:
      "Listening rooms, music gatherings, jam sessions, songwriting, sound, rhythm, and performance.",
    keywords: [
      "music",
      "sound",
      "songs",
      "singing",
      "jam",
      "performance",
      "open mic",
    ],
  },
  {
    title: "Theatre & Films",
    href: "/explore/stage-and-screen",
    type: "Experience Category",
    description:
      "Film screenings, theatre, acting, screen culture, storytelling, scripts, and performance.",
    keywords: [
      "theatre",
      "films",
      "movies",
      "acting",
      "screen",
      "stage",
      "cinema",
    ],
  },
  {
    title: "Games & Play",
    href: "/explore/games",
    type: "Experience Category",
    description:
      "Traditional games, board games, puzzles, playful learning, interactive culture, and game nights.",
    keywords: [
      "games",
      "play",
      "board games",
      "traditional games",
      "puzzles",
      "interactive",
    ],
  },
  {
    title: "For Organisations",
    href: "/for-organisations",
    type: "Page",
    description:
      "Culture-led workshops, team experiences, school programs, institutional collaborations, and corporate kattas.",
    keywords: [
      "organisations",
      "corporate",
      "schools",
      "colleges",
      "institutions",
      "b2b",
      "b2i",
      "team building",
    ],
  },
  {
    title: "Katta Studio",
    href: "/katta-studio",
    type: "Page",
    description:
      "Creative cultural studio for content, storytelling, collaborations, documentation, and cultural media.",
    keywords: [
      "katta studio",
      "studio",
      "content",
      "stories",
      "media",
      "collaboration",
    ],
  },
  {
    title: "Stories",
    href: "/stories",
    type: "Page",
    description:
      "Read stories, reflections, recaps, cultural notes, essays, and behind-the-scenes from KultureKatta.",
    keywords: ["stories", "blog", "articles", "recaps", "essays", "culture"],
  },
  {
    title: "Contact",
    href: "/contact",
    type: "Page",
    description:
      "Get in touch with KultureKatta for events, collaborations, workshops, schools, corporates, or partnerships.",
    keywords: [
      "contact",
      "email",
      "whatsapp",
      "collaboration",
      "enquiry",
      "partnership",
    ],
  },
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params?.q?.trim() || "";
  const normalizedQuery = query.toLowerCase();

  const results =
    normalizedQuery.length > 0
      ? searchableItems.filter((item) => {
          const searchableText = [
            item.title,
            item.type,
            item.description,
            ...item.keywords,
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(normalizedQuery);
        })
      : [];

  return (
    <main className="min-h-screen kk-section-light">
      <section className="kk-section-dark px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="kk-eyebrow mb-3 text-white/50">Search KultureKatta</p>

          <h1 className="kk-page-heading max-w-4xl leading-tight">
            Find your next katta.
          </h1>

          <p className="kk-body mt-6 max-w-3xl text-lg text-white/70">
            Search for workshops, walks, music, food, pottery, heritage, stories,
            organisations, schools, and more.
          </p>

          <form
            action="/search"
            className="mt-10 flex max-w-3xl flex-col gap-4 sm:flex-row"
          >
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Try pottery, walks, music, schools..."
              className="w-full rounded-full border border-white/20 bg-white px-6 py-4 text-base text-[#171717] outline-none transition placeholder:text-black/40 focus:border-[#D8BFAF]"
            />

            <button
              type="submit"
              className="kk-rounded-button whitespace-nowrap border-white/30 text-white hover:border-white hover:bg-white hover:text-[#171717]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="kk-section-light px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          {query.length === 0 ? (
            <div className="rounded-3xl border border-black/10 bg-white p-8">
              <h2 className="kk-section-heading">Start with a word.</h2>

              <p className="kk-body mt-4 max-w-2xl text-black/70">
                Try searching for pottery, music, walks, games, schools,
                workshops, stories, or corporate experiences.
              </p>
            </div>
          ) : results.length > 0 ? (
            <>
              <p className="kk-body mb-6 text-black/60">
                Showing {results.length} result{results.length === 1 ? "" : "s"}{" "}
                for <span className="font-semibold text-black">“{query}”</span>
              </p>

              <div className="grid gap-5">
                {results.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-3xl border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-black/30 hover:shadow-lg"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="kk-eyebrow mb-2 text-black/40">
                          {item.type}
                        </p>

                        <h2 className="kk-card-title text-2xl transition group-hover:underline group-hover:underline-offset-8">
                          {item.title}
                        </h2>

                        <p className="kk-body mt-3 max-w-3xl text-black/70">
                          {item.description}
                        </p>
                      </div>

                      <span className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-black/50 transition group-hover:text-black">
                        Open
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-black/10 bg-white p-8">
              <h2 className="kk-section-heading">No results found.</h2>

              <p className="kk-body mt-4 max-w-2xl text-black/70">
                We could not find anything for{" "}
                <span className="font-semibold text-black">“{query}”</span>. Try
                a broader word like workshops, walks, music, games, schools,
                food, pottery, or heritage.
              </p>

              <Link
                href="/experiences"
                className="kk-rounded-button kk-button-dark mt-8"
              >
                Explore experiences
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}