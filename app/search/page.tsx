import type { Metadata } from "next";
import Link from "next/link";
import SemanticIcon from "../components/SemanticIcon";

export const metadata: Metadata = {
  title: "Search KultureKatta",
  description:
    "Search KultureKatta workshops, walks, music, food, culture-led programs, and group experiences.",
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

const searchableItems = [
  {
    icon: "🏠",
    title: "Home",
    href: "/",
    type: "Page",
    description:
      "Start here. Discover KultureKatta, our philosophy, featured experiences, and the KuKa universe.",
    keywords: ["home", "kulturekatta", "kuka", "culture", "events"],
  },
  {
    icon: "📖",
    title: "About",
    href: "/about",
    type: "Page",
    description:
      "Read about KultureKatta, our story, our purpose, and what culture means to us.",
    keywords: ["about", "story", "manifesto", "purpose", "culture"],
  },
  {
    icon: "🎪",
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
    icon: "🎨",
    title: "Hands-On Workshops",
    href: "/experiences/workshops",
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
    icon: "🥾",
    title: "Walks & Trails",
    href: "/experiences/walks",
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
    icon: "💬",
    title: "Talks & Conversations",
    href: "/experiences/talks",
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
    icon: "🎵",
    title: "Music & Sound",
    href: "/experiences/sound",
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
    icon: "🎬",
    title: "Theatre & Films",
    href: "/experiences/stories",
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
    icon: "🎲",
    title: "Games & Play",
    href: "/experiences/games",
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
    icon: "🌿",
    title: "Wellness & Slowing Down",
    href: "/experiences/wellness",
    type: "Experience Category",
    description:
      "Mindful making, nature connection, gentle movement, reflection, sensory rest, and screen-light pauses.",
    keywords: [
      "wellness",
      "wellbeing",
      "slow down",
      "mindful",
      "nature",
      "reflection",
      "sensory rest",
    ],
  },
  {
    icon: "🏢",
    title: "For Organizations",
    href: "/for-organizations",
    type: "Page",
    description:
      "Culture-led workshops, team experiences, school programs, institutional collaborations, and corporate kattas.",
    keywords: [
      "organizations",
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
    icon: "🧰",
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
    icon: "🎭",
    title: "Stories & Screen",
    href: "/experiences/stories",
    type: "Experience Category",
    description:
      "Explore theatre, film, oral histories, puppetry, visual storytelling, memoir, and screen-led culture.",
    keywords: [
      "stories",
      "theatre",
      "film",
      "cinema",
      "oral history",
      "puppetry",
      "storytelling",
    ],
  },
  {
    icon: "✉️",
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
    <div className="kk-page-root min-h-screen kk-section-light">
      <section className="kk-section-light px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex justify-start">
            <SemanticIcon icon="🔎" label="Search KultureKatta" size="page" />
          </div>

          <p className="kk-page-label text-[var(--kk-accent)]">
            Search KultureKatta
          </p>

          <h1 className="kk-page-heading max-w-4xl">Find your next katta.</h1>

          <p className="kk-page-intro mt-6 max-w-3xl">
            Search for workshops, walks, music, food, pottery, heritage,
            stories, organisations, schools, and more.
          </p>

          <form
            action="/search"
            role="search"
            className="mt-10 flex max-w-3xl flex-col gap-4 sm:flex-row"
          >
            <SemanticIcon
              icon="⌨️"
              label="Search query"
              size="compact"
              className="self-start sm:self-center"
            />

            <label htmlFor="search-page-query" className="sr-only">
              Search KultureKatta
            </label>
            <input
              id="search-page-query"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Try pottery, walks, music, schools..."
              className="w-full rounded-full border border-black/10 bg-white px-6 py-4 text-base text-[var(--kk-text)] outline-none transition placeholder:text-black/40 focus:border-[var(--kk-accent)]"
            />

            <button
              type="submit"
              className="kk-rounded-button kk-button-dark whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="kk-section-light px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          {query.length === 0 ? (
            <div className="kk-panel">
              <SemanticIcon icon="💡" label="Start with a word" size="section" />

              <h2 className="kk-section-heading mt-5">Start with a word.</h2>

              <p className="kk-body mt-4 max-w-2xl">
                Try searching for pottery, music, walks, games, schools,
                workshops, stories, or corporate experiences.
              </p>
            </div>
          ) : results.length > 0 ? (
            <>
              <p className="kk-body mb-6">
                Showing {results.length} result{results.length === 1 ? "" : "s"}{" "}
                for <span className="font-semibold text-black">“{query}”</span>
              </p>

              <div className="grid gap-5">
                {results.map((item) => (
                  <Link
                    key={`${item.href}-${item.title}`}
                    href={item.href}
                    className="kk-card kk-card--compact kk-card--interactive group"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex min-w-0 flex-col items-start">
                        <SemanticIcon
                          icon={item.icon}
                          label={item.title}
                          size="card"
                        />

                        <p className="kk-eyebrow mb-2 mt-5">{item.type}</p>

                        <h2 className="kk-card-title transition group-hover:underline group-hover:underline-offset-8">
                          {item.title}
                        </h2>

                        <p className="kk-body mt-3 max-w-3xl">
                          {item.description}
                        </p>
                      </div>

                      <span className="kk-card-meta mt-2 uppercase tracking-[0.2em] transition group-hover:text-black">
                        Open
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="kk-panel">
              <SemanticIcon icon="🕵️" label="No results" size="section" />

              <h2 className="kk-section-heading mt-5">No results found.</h2>

              <p className="kk-body mt-4 max-w-2xl">
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
    </div>
  );
}
