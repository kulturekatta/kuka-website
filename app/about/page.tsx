import type { Metadata } from "next";
import Link from "next/link";
import SemanticIcon from "../components/SemanticIcon";

export const metadata: Metadata = {
  title: "About KultureKatta | Culture Made Participatory",
  description:
    "Meet KultureKatta, learn why it exists, and discover its neighborhood-first approach to participatory cultural experiences.",
  alternates: {
    canonical: "/about",
  },
};

const problemItems = [
  {
    icon: "⏰",
    title: "Timing",
    description:
      "People want to show up, but modern life is crowded. KuKa creates experiences that feel worth making time for.",
  },
  {
    icon: "🗺️",
    title: "Distance",
    description:
      "Culture often feels too far away — physically, emotionally, or socially. We bring it closer to everyday neighbourhoods.",
  },
  {
    icon: "🏡",
    title: "Space",
    description:
      "Cities need spaces where people can gather with intention, curiosity, and a little bit of wonder.",
  },
];

const whatWeDoItems = [
  {
    icon: "🎪",
    title: "We create experiences",
    description:
      "Workshops, walks, salons, circles, games, screenings, listening rooms, food experiences, and cultural gatherings.",
  },
  {
    icon: "📍",
    title: "We bring culture closer",
    description:
      "Into cafés, studios, homes, parks, libraries, schools, workplaces, and everyday neighbourhood spaces.",
  },
  {
    icon: "🙌",
    title: "We make participation easy",
    description:
      "People do not just watch. They make, ask, taste, move, reflect, share, and try.",
  },
];

const communityItems = [
  {
    icon: "🎨",
    title: "Artists & facilitators",
    description:
      "We collaborate with creators, practitioners, educators, performers, thinkers, makers, and cultural hosts.",
  },
  {
    icon: "🏠",
    title: "Venues & spaces",
    description:
      "We activate cafés, studios, homes, terraces, parks, libraries, schools, workplaces, and neighbourhood corners.",
  },
  {
    icon: "👥",
    title: "Participants & communities",
    description:
      "We bring together curious people who want to learn, make, meet, move, slow down, explore, and belong.",
  },
];

const impactStats = [
  {
    icon: "📅",
    number: "50+",
    label: "Events Hosted",
  },
  {
    icon: "🙋",
    number: "350+",
    label: "Participants",
  },
  {
    icon: "🎭",
    number: "25+",
    label: "Artists",
  },
  {
    icon: "🌐",
    number: "3",
    label: "Cities",
  },
  {
    icon: "⭐",
    number: "4.8/5",
    label: "Average Rating",
  },
];

const timeline = [
  {
    icon: "💡",
    year: "2024",
    title: "KultureKatta begins",
    description:
      "What started as a question about culture became a platform for participatory cultural experiences.",
  },
  {
    icon: "🔥",
    year: "2024",
    title: "The first kattas come alive",
    description:
      "Games, books, music, pottery, coffee, films, conversations, and workshops begin shaping the KuKa language.",
  },
  {
    icon: "🪐",
    year: "2025",
    title: "The universe expands",
    description:
      "KuKa grows across cities, formats, collaborators, neighbourhoods, schools, workplaces, and community spaces.",
  },
  {
    icon: "🚀",
    year: "Now",
    title: "Building an ecosystem",
    description:
      "KultureKatta is evolving into a wider universe of experiences, learning, storytelling, community, travel, and creative collaboration.",
  },
];

const teamMembers = [
  {
    name: "Vidula Tade",
    role: "Founder",
    description:
      "Musician, traveller, writer, and culture-curious founder building KultureKatta as a neighbourhood-first cultural platform.",
  },
  {
    name: "Anwesha",
    role: "Team KultureKatta",
    description:
      "Part of the team supporting KuKa’s growing cultural universe across people, experiences, and collaborations.",
  },
  {
    name: "Neha",
    role: "Team KultureKatta",
    description:
      "Part of the team helping bring KuKa’s experiences, ideas, and community touchpoints to life.",
  },
];

export default function AboutPage() {
  return (
    <div className="kk-page-root kk-section-light min-h-screen">
      {/* HERO */}
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <div className="mb-6 flex justify-center">
            <SemanticIcon
              icon="🏘️"
              label="About KultureKatta"
              size="page"
            />
          </div>

          <p className="kk-page-label text-[var(--kk-accent)]">
            About KultureKatta
          </p>

          <h1 className="kk-page-heading mx-auto mt-6 max-w-4xl">
            The neighbourhood katta for the curious.
          </h1>

          <p className="kk-page-intro mx-auto mt-8 max-w-3xl">
            A place to make, learn, walk, talk, play, taste, listen, create, and
            belong — without waiting for culture to happen somewhere far away.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/experiences" className="kk-button-dark">
              Explore Kattas
            </Link>

            <Link href="/contact" className="kk-button-on-light">
              Bring KuKa To Your Space
            </Link>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="❓" label="Why we exist" size="section" />
            </div>

            <p className="kk-section-label">Why We Exist</p>

            <h2 className="kk-section-heading mt-6">
              Cities are full of people. Meaningful offline connection is still
              hard to find.
            </h2>

            <p className="kk-body-large mt-6">
              Cultural and social experiences often feel far away — because of
              timing, distance, space, hesitation, or simply not knowing where
              to begin.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {problemItems.map((item) => (
              <article
                key={item.title}
                className="kk-card kk-card--centered kk-card--interactive"
              >
                <SemanticIcon icon={item.icon} label={item.title} size="card" />

                <h3 className="kk-card-title mt-5">{item.title}</h3>

                <p className="kk-card-body mt-4">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT KATTA MEANS */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container text-center">
          <div className="mb-5 flex justify-center">
            <SemanticIcon icon="☕" label="What katta means" size="section" />
          </div>

          <p className="kk-section-label">What Katta Means</p>

          <h2 className="kk-section-heading mx-auto mt-6 max-w-3xl">
            A katta is where something is always cooking.
          </h2>

          <div className="mx-auto mt-8 max-w-3xl space-y-5">
            <p className="kk-body-large">
              In Marathi, a katta is the ledge, corner, step, or neighbourhood
              spot where people gather — to talk, listen, laugh, argue, share
              ideas, and let something slowly cook.
            </p>

            <p className="kk-body-large">
              KultureKatta brings that spirit back into modern city life. Not as
              nostalgia, but as a living, breathing way to reconnect with
              culture, creativity, and each other.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🛠️" label="What we do" size="section" />
            </div>

            <p className="kk-section-label">What We Do</p>

            <h2 className="kk-section-heading mt-6">
              We make culture easier to enter, easier to practise, and easier to
              share.
            </h2>

            <p className="kk-body-large mt-6">
              KultureKatta designs hands-on, participatory cultural experiences
              that help people reconnect with curiosity, creativity, and
              community — one katta at a time.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {whatWeDoItems.map((item) => (
              <article
                key={item.title}
                className="kk-card kk-card--centered kk-card--interactive"
              >
                <SemanticIcon icon={item.icon} label={item.title} size="card" />

                <h3 className="kk-card-title mt-5">{item.title}</h3>

                <p className="kk-card-body mt-4">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE BUILD COMMUNITY */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon
                icon="🤝"
                label="How we build community"
                size="section"
              />
            </div>

            <p className="kk-section-label">How We Build Community</p>

            <h2 className="kk-section-heading mt-6">
              KuKa connects the people who create culture, the spaces that host
              it, and the communities that bring it alive.
            </h2>

            <p className="kk-body-large mt-6">
              We grow neighbourhood by neighbourhood — curating once, adapting
              everywhere, and keeping every katta local, personal, and alive.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {communityItems.map((item) => (
              <article
                key={item.title}
                className="kk-card kk-card--centered kk-card--interactive"
              >
                <SemanticIcon icon={item.icon} label={item.title} size="card" />

                <h3 className="kk-card-title mt-5">{item.title}</h3>

                <p className="kk-card-body mt-4">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KUKA SO FAR */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container text-center">
          <div className="mb-5 flex justify-center">
            <SemanticIcon icon="📈" label="KuKa so far" size="section" />
          </div>

          <p className="kk-section-label">KuKa So Far</p>

          <h2 className="kk-section-heading mx-auto mt-6 max-w-3xl">
            Proof of play, practice, and presence.
          </h2>

          <p className="kk-body-large mx-auto mt-6 max-w-3xl">
            KultureKatta has already brought together curious people, artists,
            facilitators, cafés, studios, cultural spaces, and institutions
            across multiple cities.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {impactStats.map((stat) => (
              <article
                key={stat.label}
                className="kk-card kk-card--centered kk-card--interactive"
              >
                <SemanticIcon icon={stat.icon} label={stat.label} size="card" />

                <p className="kk-card-number mt-5">{stat.number}</p>

                <p className="kk-card-meta mt-3 uppercase tracking-[0.18em]">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="📖" label="Our story" size="section" />
            </div>

            <p className="kk-section-label">Our Story</p>

            <h2 className="kk-section-heading mt-6">
              From a question about culture to a growing neighbourhood-first
              cultural ecosystem.
            </h2>

            <p className="kk-body-large mt-6">
              KultureKatta began with a simple question: what if culture became
              something we could participate in, not just observe from a
              distance?
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <article
                key={`${item.year}-${item.title}`}
                className="kk-card kk-card--centered kk-card--interactive"
              >
                <SemanticIcon icon={item.icon} label={item.title} size="card" />

                <p className="kk-card-year mt-5">{item.year}</p>

                <h3 className="kk-card-title mt-4">{item.title}</h3>

                <p className="kk-card-body mt-4">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PEOPLE BEHIND KUKA */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="💛" label="People behind KuKa" size="section" />
            </div>

            <p className="kk-section-label">People Behind KuKa</p>

            <h2 className="kk-section-heading mt-6">
              A small team building a big cultural playground.
            </h2>

            <p className="kk-body-large mt-6">
              KultureKatta is shaped by people who care about culture,
              community, creativity, and the tiny details that make gatherings
              feel alive.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="kk-card kk-card--centered kk-card--interactive"
              >
                <div className="kk-card-avatar mx-auto mb-5">
                  {member.name.charAt(0)}
                </div>

                <h3 className="kk-card-title">{member.name}</h3>

                <p className="kk-card-meta mt-2 uppercase tracking-[0.16em]">
                  {member.role}
                </p>

                <p className="kk-card-body mt-4">{member.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN THE KATTA */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container text-center">
          <div className="kk-panel mx-auto max-w-4xl">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🚪" label="Join the Katta" size="section" />
            </div>

            <p className="kk-section-label">Join the Katta</p>

            <h2 className="kk-section-heading mx-auto mt-6 max-w-3xl">
              Find your katta. Or help us build one.
            </h2>

            <p className="kk-body-large mx-auto mt-6 max-w-2xl">
              Attend one. Host one. Bring one to your neighbourhood, school,
              workplace, or community.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/experiences" className="kk-button-dark">
                Explore Kattas
              </Link>

              <Link href="/contact" className="kk-button-on-light">
                Collaborate With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
