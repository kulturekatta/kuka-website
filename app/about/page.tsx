import Link from "next/link";

const problemItems = [
  {
    title: "Timing",
    description:
      "People want to show up, but modern life is crowded. KuKa creates experiences that feel worth making time for.",
  },
  {
    title: "Distance",
    description:
      "Culture often feels too far away — physically, emotionally, or socially. We bring it closer to everyday neighbourhoods.",
  },
  {
    title: "Space",
    description:
      "Cities need spaces where people can gather with intention, curiosity, and a little bit of wonder.",
  },
];

const whatWeDoItems = [
  {
    title: "We create experiences",
    description:
      "Workshops, walks, salons, circles, games, screenings, listening rooms, food experiences, and cultural gatherings.",
  },
  {
    title: "We bring culture closer",
    description:
      "Into cafés, studios, homes, parks, libraries, schools, workplaces, and everyday neighbourhood spaces.",
  },
  {
    title: "We make participation easy",
    description:
      "People do not just watch. They make, ask, taste, move, reflect, share, and try.",
  },
];

const universeItems = [
  {
    title: "KuKa Engage",
    description:
      "Public workshops, walks, games, conversations, and cultural gatherings for individuals and communities.",
  },
  {
    title: "KuKa Circle",
    description:
      "Experiential, hands-on cultural learning for children, schools, families, and young curious minds.",
  },
  {
    title: "KuKa Explore",
    description:
      "Getaways, trails, immersive journeys, and culture-led travel experiences rooted in discovery.",
  },
  {
    title: "KuKa Work",
    description:
      "Creative, cultural, and human-centred experiences for teams, workplaces, founders, and organisations.",
  },
];

const communityItems = [
  {
    title: "Artists & facilitators",
    description:
      "We collaborate with creators, practitioners, educators, performers, thinkers, makers, and cultural hosts.",
  },
  {
    title: "Venues & spaces",
    description:
      "We activate cafés, studios, homes, terraces, parks, libraries, schools, workplaces, and neighbourhood corners.",
  },
  {
    title: "Participants & communities",
    description:
      "We bring together curious people who want to learn, make, meet, move, slow down, explore, and belong.",
  },
];

const impactStats = [
  {
    number: "50+",
    label: "Events Hosted",
  },
  {
    number: "350+",
    label: "Participants",
  },
  {
    number: "25+",
    label: "Artists",
  },
  {
    number: "3",
    label: "Cities",
  },
  {
    number: "4.8/5",
    label: "Average Rating",
  },
];

const timeline = [
  {
    year: "2024",
    title: "KultureKatta begins",
    description:
      "What started as a question about culture became a platform for participatory cultural experiences.",
  },
  {
    year: "2024",
    title: "The first kattas come alive",
    description:
      "Games, books, music, pottery, coffee, films, conversations, and workshops begin shaping the KuKa language.",
  },
  {
    year: "2025",
    title: "The universe expands",
    description:
      "KuKa grows across cities, formats, collaborators, neighbourhoods, schools, workplaces, and community spaces.",
  },
  {
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
    <main className="kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <p className="kk-section-label text-[#2A1E19]">
            About KultureKatta
          </p>

          <h1 className="kk-page-heading mx-auto mt-6 max-w-5xl leading-tight text-[#1F1712]">
            The neighbourhood katta for the curious.
          </h1>

          <p className="kk-body-large mx-auto mt-8 max-w-3xl text-black/70">
            A place to make, learn, walk, talk, play, taste, listen, create, and
            belong — without waiting for culture to happen somewhere far away.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/explore" className="kk-button-dark">
              Explore Kattas
            </Link>

            <Link href="/contact" className="kk-button-on-light">
              Bring KuKa To Your Space
            </Link>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label text-[#2A1E19]">Why We Exist</p>

            <h2 className="kk-section-heading mt-6 text-[#1F1712]">
              Cities are full of people. Meaningful offline connection is still
              hard to find.
            </h2>

            <p className="kk-body-large mt-6 text-black/70">
              Cultural and social experiences often feel far away — because of
              timing, distance, space, hesitation, or simply not knowing where to
              begin.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {problemItems.map((item) => (
              <article
                key={item.title}
                className="kk-card-light text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="kk-card-title text-[#1F1712]">{item.title}</h3>

                <p className="kk-body mt-4 text-black/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT KATTA MEANS */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container text-center">
          <p className="kk-section-label text-[#2A1E19]">What Katta Means</p>

          <h2 className="kk-section-heading mx-auto mt-6 max-w-3xl text-[#1F1712]">
            A katta is where something is always cooking.
          </h2>

          <div className="mx-auto mt-8 max-w-3xl space-y-5">
            <p className="kk-body-large text-black/70">
              In Marathi, a katta is the ledge, corner, step, or neighbourhood
              spot where people gather — to talk, listen, laugh, argue, share
              ideas, and let something slowly cook.
            </p>

            <p className="kk-body-large text-black/70">
              KultureKatta brings that spirit back into modern city life. Not as
              nostalgia, but as a living, breathing way to reconnect with
              culture, creativity, and each other.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label text-[#2A1E19]">What We Do</p>

            <h2 className="kk-section-heading mt-6 text-[#1F1712]">
              We make culture easier to enter, easier to practise, and easier to
              share.
            </h2>

            <p className="kk-body-large mt-6 text-black/70">
              KultureKatta designs hands-on, participatory cultural experiences
              that help people reconnect with curiosity, creativity, and
              community — one katta at a time.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {whatWeDoItems.map((item) => (
              <article
                key={item.title}
                className="kk-card-light text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="kk-card-title text-[#1F1712]">{item.title}</h3>

                <p className="kk-body mt-4 text-black/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THE KUKA UNIVERSE */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label text-[#2A1E19]">
              The KuKa Universe
            </p>

            <h2 className="kk-section-heading mt-6 text-[#1F1712]">
              KuKa is not one kind of event. It is a growing universe of
              cultural experiences.
            </h2>

            <p className="kk-body-large mt-6 text-black/70">
              Some you attend, some you learn through, some you travel for, and
              some you bring into schools, workplaces, and communities.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {universeItems.map((item) => (
              <article
                key={item.title}
                className="kk-card-cream text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="kk-card-title text-[#1F1712]">{item.title}</h3>

                <p className="kk-body mt-4 text-black/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE BUILD COMMUNITY */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label text-[#2A1E19]">
              How We Build Community
            </p>

            <h2 className="kk-section-heading mt-6 text-[#1F1712]">
              KuKa connects the people who create culture, the spaces that host
              it, and the communities that bring it alive.
            </h2>

            <p className="kk-body-large mt-6 text-black/70">
              We grow neighbourhood by neighbourhood — curating once, adapting
              everywhere, and keeping every katta local, personal, and alive.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {communityItems.map((item) => (
              <article
                key={item.title}
                className="kk-card-light text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="kk-card-title text-[#1F1712]">{item.title}</h3>

                <p className="kk-body mt-4 text-black/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KUKA SO FAR */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container text-center">
          <p className="kk-section-label text-[#2A1E19]">KuKa So Far</p>

          <h2 className="kk-section-heading mx-auto mt-6 max-w-3xl text-[#1F1712]">
            Proof of play, practice, and presence.
          </h2>

          <p className="kk-body-large mx-auto mt-6 max-w-3xl text-black/70">
            KultureKatta has already brought together curious people, artists,
            facilitators, cafés, studios, cultural spaces, and institutions
            across multiple cities.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {impactStats.map((stat) => (
              <article
                key={stat.label}
                className="kk-card-cream transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-4xl font-semibold tracking-tight text-[#9A6A4F]">
                  {stat.number}
                </p>

                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/60">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label text-[#2A1E19]">Our Story</p>

            <h2 className="kk-section-heading mt-6 text-[#1F1712]">
              From a question about culture to a growing neighbourhood-first
              cultural ecosystem.
            </h2>

            <p className="kk-body-large mt-6 text-black/70">
              KultureKatta began with a simple question: what if culture became
              something we could participate in, not just observe from a
              distance?
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <article
                key={`${item.year}-${item.title}`}
                className="kk-card-light text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="kk-eyebrow text-[#9A6A4F]">{item.year}</p>

                <h3 className="kk-card-title mt-4 text-[#1F1712]">
                  {item.title}
                </h3>

                <p className="kk-body mt-4 text-black/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PEOPLE BEHIND KUKA */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label text-[#2A1E19]">
              People Behind KuKa
            </p>

            <h2 className="kk-section-heading mt-6 text-[#1F1712]">
              A small team building a big cultural playground.
            </h2>

            <p className="kk-body-large mt-6 text-black/70">
              KultureKatta is shaped by people who care about culture,
              community, creativity, and the tiny details that make gatherings
              feel alive.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="kk-card-cream text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white text-2xl font-semibold text-[#9A6A4F]">
                  {member.name.charAt(0)}
                </div>

                <h3 className="kk-card-title text-[#1F1712]">
                  {member.name}
                </h3>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
                  {member.role}
                </p>

                <p className="kk-body mt-4 text-black/70">
                  {member.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN THE KATTA */}
      <section className="kk-section-dark kk-section-padding">
        <div className="kk-container text-center">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/5 p-10">
            <p className="kk-section-label text-[#D8BFAF]">Join the Katta</p>

            <h2 className="kk-section-heading mx-auto mt-6 max-w-3xl text-white">
              Find your katta. Or help us build one.
            </h2>

            <p className="kk-body-large mx-auto mt-6 max-w-2xl text-white/70">
              Attend one. Host one. Bring one to your neighbourhood, school,
              workplace, or community.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/explore" className="kk-button-light">
                Explore Kattas
              </Link>

              <Link href="/contact" className="kk-button-on-dark">
                Collaborate With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}