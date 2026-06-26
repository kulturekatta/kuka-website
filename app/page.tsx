import Link from "next/link";

const experienceTypes = [
  {
    label: "01",
    title: "Hands-On Workshops",
    titleLines: ["Hands-On", "Workshops"],
    text: "Art, craft, pottery, gardening, textiles, paper, DIY, making, building, and slow creative experiences where your hands are very much part of the conversation.",
    href: "/explore/workshops",
    cta: "Explore workshops",
    ctaLines: ["Explore", "workshops"],
  },
  {
    label: "02",
    title: "Food & Senses",
    titleLines: ["Food", "& Senses"],
    text: "Cooking, baking, coffee, tea, tastings, food stories, fermentation, regional cuisines, and shared tables where culture is experienced through flavour.",
    href: "/explore/food",
    cta: "Explore food",
    ctaLines: ["Explore", "food"],
  },
  {
    label: "03",
    title: "Walks & Trails",
    titleLines: ["Walks", "& Trails"],
    text: "Heritage walks, food trails, nature walks, neighbourhood explorations, and place-based experiences rooted in people, places, and stories.",
    href: "/explore/walks",
    cta: "Explore walks",
    ctaLines: ["Explore", "walks"],
  },
  {
    label: "04",
    title: "Talks & Salons",
    titleLines: ["Talks", "& Salons"],
    text: "Expert talks, intimate salons, storytelling sessions, discussions, and idea-led gatherings that make learning social.",
    href: "/explore/talks",
    cta: "Explore talks",
    ctaLines: ["Explore", "talks"],
  },
  {
    label: "05",
    title: "Words & Open Mics",
    titleLines: ["Words", "& Open Mics"],
    text: "Book clubs, writing circles, literature, poetry, storytelling, spoken word, open mics, and language-led gatherings for readers, writers, and listeners.",
    href: "/explore/words",
    cta: "Explore words",
    ctaLines: ["Explore", "words"],
  },
  {
    label: "06",
    title: "Music & Sound",
    titleLines: ["Music", "& Sound"],
    text: "Live music, jam sessions, singing circles, sound journeys, listening rooms, and experiences that invite you to hear, feel, notice, and reflect.",
    href: "/explore/sound",
    cta: "Explore sound",
    ctaLines: ["Explore", "sound"],
  },
  {
    label: "07",
    title: "Stories & Screen",
    titleLines: ["Stories", "& Screen"],
    text: "Theatre, acting, improv, movie screenings, documentaries, short films, visual storytelling, and post-screening conversations that bring stories alive.",
    href: "/explore/stories",
    cta: "Explore stories",
    ctaLines: ["Explore", "stories"],
  },
  {
    label: "08",
    title: "Dance & Movement",
    titleLines: ["Dance", "& Movement"],
    text: "Dance, movement, rhythm, body-led expression, performance, flow, and embodied experiences that bring culture into motion.",
    href: "/explore/movement",
    cta: "Explore movement",
    ctaLines: ["Explore", "movement"],
  },
  {
    label: "09",
    title: "Games & Play",
    titleLines: ["Games", "& Play"],
    text: "Traditional games, board games, puzzles, ancient and medieval games, playful challenges, and interactive experiences that bring people together through strategy, laughter, and curiosity.",
    href: "/explore/games",
    cta: "Explore games",
    ctaLines: ["Explore", "games"],
  },
];

const moods = [
  {
    title: "I want to make something",
    href: "/moods",
  },
  {
    title: "I want to learn something",
    href: "/moods",
  },
  {
    title: "I want to meet people",
    href: "/moods",
  },
  {
    title: "I want to move my body",
    href: "/moods",
  },
  {
    title: "I want to slow down",
    href: "/moods",
  },
  {
    title: "I want to explore the city",
    href: "/moods",
  },
  {
    title: "I want to do something with kids",
    href: "/moods",
  },
  {
    title: "I want something for my team",
    href: "/moods",
  },
  {
    title: "Surprise me",
    href: "/moods",
  },
];

const upcomingExperiences = [
  {
    eyebrow: "Coming soon",
    title: "New Kattas are brewing",
    text: "We’re curating upcoming workshops, walks, conversations, games, and cultural gatherings across cities.",
    meta: "Dates to be announced",
  },
  {
    eyebrow: "For curious people",
    title: "Explore what’s next",
    text: "From hands-on making to city walks and sensory experiences, the next KuKa calendar is being shaped with care.",
    meta: "Watch this space",
  },
  {
    eyebrow: "Want to host?",
    title: "Bring a Katta to life",
    text: "Artists, facilitators, venues, schools, corporates, and cultural collaborators can co-create with KuKa.",
    meta: "Collaborations open",
  },
];

const pastExperiences = [
  {
    title: "Kokedama Workshops",
    place: "Pune & Goa",
    text: "Hands-on plant-making experiences across cafés, studios, and community spaces.",
  },
  {
    title: "Medieval Indian Games",
    place: "Pune",
    text: "A playful dive into traditional and historic Indian games, strategy, and social play.",
  },
  {
    title: "Coffee Brewing Katta",
    place: "Pune",
    text: "A slow, sensory session exploring coffee, brewing techniques, taste, and ritual.",
  },
  {
    title: "Storytelling, but Forensics",
    place: "Pune",
    text: "A gripping expert-led session that turned forensic science into an accessible story.",
  },
  {
    title: "Kirigami Katta",
    place: "Pune",
    text: "A paper-cutting experience rooted in patience, precision, and creative focus.",
  },
  {
    title: "Juggling Workshop",
    place: "Mumbai",
    text: "A movement-based, playful workshop exploring rhythm, coordination, and flow.",
  },
];

const verticals = [
  {
    title: "KuKa Engage",
    text: "Workshops, walks, games, conversations, and cultural gatherings for individuals and communities.",
    href: "/experiences",
  },
  {
    title: "KuKa Circle",
    text: "Experiential, hands-on cultural learning for children, schools, families, and young curious minds.",
    href: "/about",
  },
  {
    title: "KuKa Explore",
    text: "Getaways, trails, immersive journeys, and culture-led travel experiences rooted in discovery.",
    href: "/about",
  },
  {
    title: "KuKa Work",
    text: "Creative, cultural, and human-centred experiences for teams, workplaces, and organisations.",
    href: "/contact",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose your katta",
    text: "Pick an experience by mood, theme, city, age group or occasion.",
  },
  {
    step: "02",
    title: "Show up",
    text: "Come as you are. No pressure to be an expert. Curiosity is enough.",
  },
  {
    step: "03",
    title: "Make, learn, move or listen",
    text: "Every katta is participatory. Your hands, body, mind or stories are involved.",
  },
  {
    step: "04",
    title: "Leave with a story",
    text: "With a new skill, story, friend, idea, habit or memory.",
  },
];

const proofItems = [
  {
    number: "50+",
    label: "Curated experiences",
  },
  {
    number: "3",
    label: "Cities and growing",
  },
  {
    number: "25+",
    label: "Artists and facilitators",
  },
  {
    number: "400+",
    label: "Participants so far",
  },
];

const whatWeCreate = [
  {
    title: "KuKa For Teams",
    text: "Employee engagement, team workshops, offsite add-ons, festive programming, city-based activities and creative cultural sessions for companies, startups, schools, colleges and institutions. Designed for groups that want their people to connect, create, reflect, celebrate and experience culture together in a more human way.",
    href: "/for-teams",
    cta: "Explore For Teams",
  },
  {
    title: "KuKa Private Experiences",
    text: "Custom experiences for birthdays, bachelorettes, families, friends, couples, travellers, visiting guests, women’s groups and intimate celebrations. Designed for groups who want something warmer than a regular outing — hands-on, hosted, personal and shaped around the people, occasion, mood and pace of the gathering.",
    href: "/private-experiences",
    cta: "Explore Private Experiences",
  },
];

export default function HomePage() {
  return (
    <main className="kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light kk-hero-padding relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center sm:px-10 lg:px-16">
          <p className="kk-section-label mb-5 inline-flex rounded-full border border-black/10 px-4 py-2 text-[#2A1E19]">
            Kulture Katta
          </p>

          <h1 className="kk-page-heading max-w-5xl text-[#1F1712] lg:text-7xl">
            Culture-led experiences for teams and private groups.
          </h1>

          <p className="kk-body mt-8 max-w-4xl text-black/70 sm:text-xl">
            Workshops, walks, games, conversations, food, performances,
            screenings, stories, music, rituals, crafts, and curious cultural
            experiences that help you spend your time more meaningfully.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/for-teams" className="kk-button-dark">
              Plan for a Team
            </Link>

            <Link href="/private-experiences" className="kk-button-on-light">
              Plan a Private Experience
            </Link>
          </div>

          <div className="mt-14 w-full overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
            <img
              src="/images/home/hero-katta.jpg"
              alt="KultureKatta cultural experience"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHAT WE CREATE */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label mb-5 text-[#2A1E19]">
              What We Create
            </p>

            <h2 className="kk-section-heading mt-4 text-[#1F1712]">
              Thoughtful cultural experiences for groups that want something
              more meaningful.
            </h2>

            <div className="kk-body-large mx-auto mt-8 max-w-3xl space-y-6 text-xl text-black/70 sm:text-2xl">
              <p>
                KuKa designs culture-led experiences for teams, celebrations,
                visiting groups, wellness days, and private occasions —
                thoughtful gatherings made around your people.
              </p>

              <p className="text-[#1F1712]">
                The larger dream is a cultural ecosystem where people do not
                just watch culture, but enter it, experience it, and feel part
                of it.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {whatWeCreate.map((item) => (
              <article
                key={item.title}
                className="kk-card-cream flex min-h-[390px] flex-col transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="kk-card-title text-[#1F1712]">{item.title}</h3>

                <p className="kk-body mt-5 flex-1 text-black/70">
                  {item.text}
                </p>

                <Link href={item.href} className="kk-button-dark mt-8 w-fit">
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CAN YOU DO */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label mb-5 text-[#2A1E19]">
              What can you do with KuKa?
            </p>

            <h2 className="kk-section-heading text-[#1F1712]">
              Pick your doorway.
            </h2>

            <p className="kk-body mt-6 text-black/70 sm:text-xl">
              Whether you want to make, taste, walk, discuss, write, listen,
              watch, move, or simply try something new — there’s a Katta waiting
              for you.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experienceTypes.map((item) => (
              <article
                key={item.title}
                className="kk-card-light flex min-h-[360px] flex-col transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="kk-card-title uppercase tracking-[0.25em] text-[#9A6A4F]">
                  {item.label}
                </p>

                <h3 className="kk-card-title mt-5 text-[#1F1712]">
                  {item.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                <p className="kk-body mt-5 flex-1 text-black/70">
                  {item.text}
                </p>

                <Link
                  href={item.href}
                  className="mt-8 inline-flex text-xl font-semibold uppercase tracking-[0.2em] text-[#1F1712] underline decoration-[#D8BFAF] underline-offset-8 transition hover:text-black/60"
                >
                  <span>
                    {item.ctaLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE BY MOOD */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label mb-5 text-[#2A1E19]">
              Explore by mood
            </p>

            <h2 className="kk-section-heading text-[#1F1712]">
              Not sure what you want? Start with how you feel.
            </h2>

            <p className="kk-body mt-6 text-black/70">
              Not everyone wakes up saying, “I want a cultural experience.”
              Sometimes you just want to make something, meet someone, move
              around, or feel mildly less screen-fried.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moods.map((mood) => (
              <Link
                key={mood.title}
                href={mood.href}
                className="kk-card-title flex min-h-[130px] items-center justify-center rounded-[2rem] border border-black/10 bg-white p-6 text-center text-[#1F1712] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {mood.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EXPERIENCES */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="kk-section-label mb-5 text-[#2A1E19]">
                Upcoming experiences
              </p>

              <h2 className="kk-section-heading text-[#1F1712]">
                New Kattas are on the way.
              </h2>

              <p className="kk-body mt-6 text-black/70">
                We’re shaping the next calendar of cultural experiences. Until
                the dates go live, you can explore the kinds of gatherings KuKa
                curates.
              </p>
            </div>

            <Link href="/experiences" className="kk-button-dark">
              View experiences
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {upcomingExperiences.map((item) => (
              <article
                key={item.title}
                className="kk-card-light transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="kk-card-title uppercase tracking-[0.25em] text-[#9A6A4F]">
                  {item.eyebrow}
                </p>

                <h3 className="kk-card-title mt-5 text-[#1F1712]">
                  {item.title}
                </h3>

                <p className="kk-body mt-4 text-black/70">{item.text}</p>

                <p className="kk-card-title mt-8 border-t border-black/10 pt-5 text-[#1F1712]">
                  {item.meta}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PAST EXPERIENCES */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label mb-5 text-[#2A1E19]">
              Proof of play, practice and presence
            </p>

            <h2 className="kk-section-heading text-[#1F1712]">
              Kattas we’ve already brought to life.
            </h2>

            <p className="kk-body mt-6 text-black/70">
              From plant-making and paper-cutting to games, coffee, forensics,
              juggling, music, movie nights, and heritage — KuKa has already
              begun building its world one gathering at a time.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastExperiences.map((item) => (
              <article
                key={item.title}
                className="kk-card-light transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="kk-card-title uppercase tracking-[0.25em] text-[#9A6A4F]">
                  {item.place}
                </p>

                <h3 className="kk-card-title mt-5 text-[#1F1712]">
                  {item.title}
                </h3>

                <p className="kk-body mt-4 text-black/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KUKA SO FAR */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container text-center">
          <p className="kk-section-label mb-5 text-[#2A1E19]">KuKa so far</p>

          <h2 className="kk-section-heading text-[#1F1712]">
            Small gatherings. Growing impact.
          </h2>

          <p className="kk-body mx-auto mt-6 max-w-3xl text-black/70">
            From workshops and walks to artists, venues and curious humans —
            KuKa is slowly growing into a living cultural ecosystem.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {proofItems.map((item) => (
              <article key={item.label} className="kk-card-light">
                <p className="text-5xl font-semibold text-[#9A6A4F]">
                  {item.number}
                </p>

                <p className="kk-small-text mt-3 font-semibold uppercase tracking-[0.18em] text-black/70">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW A KATTA WORKS */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label mb-5 text-[#2A1E19]">
              How a Katta works
            </p>

            <h2 className="kk-section-heading text-[#1F1712]">
              Simple. Human. No awkward icebreakers, promise.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {howItWorks.map((item) => (
              <article
                key={item.step}
                className="kk-card-light transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-5xl font-semibold text-[#9A6A4F]">
                  {item.step}
                </p>

                <h3 className="kk-card-title mt-5 text-[#1F1712]">
                  {item.title}
                </h3>

                <p className="kk-body mt-4 text-black/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KUKA UNIVERSE */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label mb-5 text-[#2A1E19]">
              The KuKa universe
            </p>

            <h2 className="kk-section-heading text-[#1F1712]">
              A few doorways into a much larger world.
            </h2>

            <p className="kk-body mt-6 text-black/70">
              KuKa is growing beyond individual experiences into a wider
              cultural ecosystem across community, learning, travel, work, and
              culture-led impact.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {verticals.map((item) => (
              <article
                key={item.title}
                className="kk-card-light flex min-h-[300px] flex-col transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="kk-card-title text-[#1F1712]">{item.title}</h3>

                <p className="kk-body mt-5 flex-1 text-black/70">
                  {item.text}
                </p>

                <Link
                  href={item.href}
                  className="mt-8 inline-flex text-xl font-semibold uppercase tracking-[0.2em] text-[#1F1712] underline decoration-[#D8BFAF] underline-offset-8 transition hover:text-black/60"
                >
                  Explore more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container text-center">
          <p className="kk-section-label mb-5 text-[#2A1E19]">
            Find your next Katta
          </p>

          <h2 className="kk-section-heading text-[#1F1712]">
            Come make, walk, play, taste, listen, think, and belong.
          </h2>

          <p className="kk-body mx-auto mt-6 max-w-3xl text-black/70">
            Whether you’re a participant, artist, facilitator, venue, school,
            workplace, or fellow curious human — there’s a way to enter the
            KuKa world.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/experiences" className="kk-button-on-light">
              Explore experiences
            </Link>

            <Link href="/contact" className="kk-button-on-light">
              Host a Katta
            </Link>

            <Link href="/contact" className="kk-button-on-light">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* EMOTIONAL CLOSING */}
      <section className="kk-section-dark kk-section-padding">
        <div className="kk-container">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-sm md:p-14">
            <p className="kk-section-label mb-5 text-[#D8BFAF]">
              The feeling
            </p>

            <h2 className="kk-section-heading mx-auto max-w-4xl text-white">
              This is what a Katta feels like.
            </h2>

            <div className="kk-body mx-auto mt-10 max-w-3xl space-y-4 text-white/75">
              <p>You come as you are.</p>
              <p>You try something.</p>
              <p>You meet someone.</p>
              <p>You leave with a story.</p>

              <div className="space-y-3 pt-6">
                <p>Sometimes with a plant.</p>
                <p>Sometimes with a pot.</p>
                <p>Sometimes with a song stuck in your head.</p>
                <p>
                  Sometimes with a new person you actually want to meet again.
                </p>
              </div>
            </div>

            <h2 className="kk-section-heading mx-auto mt-12 max-w-4xl text-white">
              Culture is not somewhere you go. It is something you grow.
            </h2>

            <div className="kk-body mx-auto mt-6 max-w-2xl space-y-2 text-white/75">
              <p>One katta at a time.</p>
              <p>One neighbourhood at a time.</p>
              <p>One curious human at a time.</p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/experiences" className="kk-button-light">
                Start exploring
              </Link>

              <Link href="/contact" className="kk-button-on-dark">
                Plan a Katta with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}