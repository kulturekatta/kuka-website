import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SemanticIcon from "../components/SemanticIcon";
import UniverseVerticalCard from "../components/verticals/UniverseVerticalCard";
import { kukaVerticals } from "../data/kukaVerticals";

export const metadata: Metadata = {
  title: "The KuKa Universe | KultureKatta",
  description:
    "Discover the KuKa Universe, its nine connected verticals, and the Mood & Intent and Moments, Seasons & Conditions discovery layers.",
  alternates: {
    canonical: "/kuka-universe",
  },
};

const sharedPrinciples = [
  {
    icon: "👐",
    title: "Participation",
    description:
      "Culture is something people make, practice, question, share, and live—not merely consume.",
  },
  {
    icon: "🔎",
    title: "Curiosity",
    description:
      "Every vertical creates approachable doorways into unfamiliar ideas, skills, places, and perspectives.",
  },
  {
    icon: "💞",
    title: "Connection",
    description:
      "Experiences are designed to bring people into meaningful contact with one another and their surroundings.",
  },
  {
    icon: "📍",
    title: "Context",
    description:
      "KuKa stays attentive to place, people, history, language, ecology, and the stories behind a practice.",
  },
  {
    icon: "🧵",
    title: "Continuity",
    description:
      "A KuKa experience can begin as a gathering and grow into a habit, program, journey, archive, or community.",
  },
  {
    icon: "🌱",
    title: "Care",
    description:
      "We value dignity, accessibility, cultural sensitivity, fair collaboration, and thoughtful growth.",
  },
];

const discoveryLayers = [
  {
    icon: "🧠",
    label: "Mood & Intent Taxonomy",
    question: "What do I feel like doing?",
    description:
      "A participant-facing discovery layer organized around desire, energy, intention, and hoped-for experience rather than demographics or formats.",
    examples: [
      "Create and express",
      "Learn something new",
      "Play and have fun",
      "Slow down and restore",
      "Meet and connect",
      "Surprise me",
    ],
    href: "/moods",
    cta: "Explore moods and intents",
  },
  {
    icon: "🌦️",
    label: "Moments, Seasons & Conditions",
    question: "What suits this particular time and situation?",
    description:
      "A contextual discovery layer shaped by season, weather, time of day, cultural calendars, natural windows, available time, and practical conditions.",
    examples: [
      "This season",
      "Good for rainy days",
      "After work",
      "At sunrise or sunset",
      "Festival and seasonal",
      "Best experienced now",
    ],
    href: "/moments",
    cta: "Explore moments and conditions",
  },
];

const combinations = [
  {
    icon: "🍽️",
    title: "Explore × 5 Senses",
    description:
      "A neighborhood food trail combining local history, tasting, conversations, and sensory observation.",
  },
  {
    icon: "🎒",
    title: "Circle × Impact",
    description:
      "Accessible, play-led cultural learning designed with schools, NGOs, or community organizations.",
  },
  {
    icon: "🏕️",
    title: "Wellness × The Ground",
    description:
      "A nature-based day of walking, rest, reflection, practical outdoor learning, and shared meals.",
  },
  {
    icon: "📬",
    title: "Chronicles × Exchange",
    description:
      "An international oral-history or creative documentation project connecting communities across places.",
  },
  {
    icon: "🎧",
    title: "Digital × Chronicles",
    description:
      "An accessible digital archive, listening experience, field-note series, or participatory story collection.",
  },
  {
    icon: "🧺",
    title: "Impact × 5 Senses",
    description:
      "A livelihood-centered program that supports local food, craft, material, or sensory practitioners.",
  },
];

export default function KukaUniversePage() {
  return (
    <div className="kk-page-root min-h-screen">
      <section className="kk-section-light kk-hero-padding overflow-hidden">
        <div className="kk-container">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.65fr)] lg:gap-16">
            <div>
              <SemanticIcon
                icon="🌌"
                label="The KuKa Universe"
                size="page"
                className="mb-6"
              />

              <p className="kk-page-label">The KuKa Universe</p>
              <h1 className="kk-page-heading mt-5 max-w-4xl">
                One cultural ecosystem. Many ways to experience it.
              </h1>
              <p className="kk-page-intro mt-7 max-w-3xl">
                KultureKatta is growing as a connected universe of experiences,
                learning, travel, wellbeing, stories, exchange, outdoor
                exploration, digital participation, and culture-led impact.
              </p>
              <p className="kk-body-large mt-5 max-w-3xl">
                Each vertical has a distinct purpose. Together, they help
                people live more curiously, creatively, and connectedly.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="#discovery" className="kk-button-dark">
                  Explore the Discovery Layers
                </Link>
                <Link href="#verticals" className="kk-button-light">
                  Explore the 9 Verticals
                </Link>
                <Link href="/contact" className="kk-button-light">
                  Work With KuKa
                </Link>
              </div>
            </div>

            <div className="kk-panel flex min-h-[340px] items-center justify-center !p-6 sm:min-h-[420px]">
              <div className="relative h-[290px] w-full sm:h-[360px]">
                <Image
                  src="/logo.png"
                  alt="KultureKatta"
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon
                icon="🔗"
                label="What connects the KuKa Universe"
                size="section"
              />
            </div>

            <p className="kk-section-label">What connects it all</p>
            <h2 className="kk-section-heading mt-5">
              Different doorways. One KuKa way of working.
            </h2>
            <p className="kk-body-large mt-6">
              Every vertical is rooted in the same belief: culture becomes
              meaningful when people participate in it.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sharedPrinciples.map((principle) => (
              <article
                key={principle.title}
                className="kk-card kk-card--interactive"
              >
                <SemanticIcon
                  icon={principle.icon}
                  label={principle.title}
                  size="card"
                />
                <h3 className="kk-card-title mt-6">{principle.title}</h3>
                <p className="kk-card-body mt-4">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section
        id="discovery"
        className="kk-section-light kk-section-padding scroll-mt-40"
      >
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon
                icon="🚪"
                label="KuKa discovery layers"
                size="section"
              />
            </div>

            <p className="kk-section-label">How people enter the universe</p>
            <h2 className="kk-section-heading mt-5">
              Two discovery layers help people find what fits.
            </h2>
            <p className="kk-body-large mt-6">
              The verticals describe which part of KuKa brings an experience to
              life. These two layers help a participant discover the right
              possibility before they know its domain, format, or vertical.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {discoveryLayers.map((layer) => (
              <article
                key={layer.label}
                className="kk-card kk-card--interactive min-h-[500px]"
              >
                <SemanticIcon icon={layer.icon} label={layer.label} size="card" />

                <p className="kk-card-label mt-6 text-center">
                  Discovery layer
                </p>

                <h3 className="kk-card-title mt-4 text-center">
                  {layer.label}
                </h3>

                <p className="mt-5 text-center text-xl font-semibold leading-relaxed text-[var(--kk-text)]">
                  {layer.question}
                </p>

                <p className="kk-card-body mt-5 text-center">
                  {layer.description}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {layer.examples.map((example) => (
                    <span key={example} className="kk-chip">
                      {example}
                    </span>
                  ))}
                </div>

                <Link
                  href={layer.href}
                  className="kk-button-dark mt-8 self-center"
                >
                  {layer.cta}
                </Link>
              </article>
            ))}
          </div>

          <div className="kk-panel mx-auto mt-8 max-w-5xl">
            <SemanticIcon
              icon="➕"
              label="Mood plus moment"
              size="card"
              className="mb-5"
            />

            <div className="grid gap-8 text-center md:grid-cols-[0.8fr_1.2fr] md:text-left">
              <div>
                <p className="kk-card-label">A simple example</p>
                <h3 className="kk-card-title mt-4">
                  Mood + Moment becomes a precise doorway.
                </h3>
              </div>

              <div className="space-y-4">
                <p className="kk-body">
                  <strong className="text-[var(--kk-text)]">Mood:</strong>{" "}
                  I want to slow down.
                </p>
                <p className="kk-body">
                  <strong className="text-[var(--kk-text)]">Moment:</strong>{" "}
                  It is raining, I have Sunday afternoon free, and I am coming
                  with friends.
                </p>
                <p className="kk-body">
                  <strong className="text-[var(--kk-text)]">
                    Possible KuKa result:
                  </strong>{" "}
                  A monsoon listening room, sensory table, poetry-and-chai
                  gathering, mindful making session, or indoor nature
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="verticals" className="kk-section-light kk-section-padding scroll-mt-40">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🌠" label="The nine verticals" size="section" />
            </div>

            <p className="kk-section-label">The 9 verticals</p>
            <h2 className="kk-section-heading mt-5">
              Meet the wider KuKa ecosystem.
            </h2>
            <p className="kk-body-large mt-6">
              Some verticals are active, some are being developed, and some are
              clear future directions. They are shown together so the long-term
              architecture remains visible without pretending that everything
              is already fully launched.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {kukaVerticals.map((vertical) => (
              <UniverseVerticalCard key={vertical.slug} vertical={vertical} />
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon
                icon="🔀"
                label="Connected KuKa verticals"
                size="section"
              />
            </div>

            <p className="kk-section-label">Designed to connect</p>
            <h2 className="kk-section-heading mt-5">
              The verticals can stand alone—or combine.
            </h2>
            <p className="kk-body-large mt-6">
              KuKa can combine audiences, purposes, domains, and formats to
              create experiences that do not fit neatly inside one box.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {combinations.map((combination) => (
              <article key={combination.title} className="kk-card">
                <SemanticIcon
                  icon={combination.icon}
                  label={combination.title}
                  size="card"
                />

                <h3 className="kk-card-title mt-5">{combination.title}</h3>
                <p className="kk-card-body mt-4">
                  {combination.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-light kk-section-padding">
        <div className="kk-container text-center">
          <div className="kk-panel mx-auto max-w-5xl">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="📣" label="Find your doorway" size="section" />
            </div>

            <p className="kk-section-label">Find your doorway</p>
            <h2 className="kk-section-heading mx-auto mt-5 max-w-4xl">
              Join an experience, commission a program, or build something new
              with KuKa.
            </h2>
            <p className="kk-body-large mx-auto mt-6 max-w-3xl">
              We work with individuals, private groups, organizations, schools,
              institutions, facilitators, cultural partners, and communities.
            </p>

            <div className="mx-auto mt-9 grid max-w-3xl gap-4 sm:grid-cols-2 lg:flex lg:max-w-none lg:flex-wrap lg:justify-center">
              <Link
                href="/experiences"
                className="kk-button-dark w-full justify-center lg:w-auto"
              >
                Explore Experiences
              </Link>
              <Link
                href="/private-experiences"
                className="kk-button-light w-full justify-center lg:w-auto"
              >
                Private Experiences
              </Link>
              <Link
                href="/for-organizations"
                className="kk-button-light w-full justify-center lg:w-auto"
              >
                For Organizations
              </Link>
              <Link
                href="/contact"
                className="kk-button-light w-full justify-center lg:w-auto"
              >
                Contact KuKa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
