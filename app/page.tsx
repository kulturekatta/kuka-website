import Link from "next/link";

const featuredExperiences = [
  {
    label: "Hands-on",
    title: "Hands-on cultural workshops",
    text: "Art, craft, pottery, kokedama, kirigami, textiles, paper crafts and more — small, warm experiences where you actually make something with your hands.",
    cta: "View experiences",
    href: "/experiences/hands-on",
  },
  {
    label: "Walks & Getaways",
    title: "Walks, trails and getaways",
    text: "Heritage walks, food trails, neighbourhood explorations, nature trails, cultural getaways and hidden histories that make places feel alive again.",
    cta: "Explore walks",
    href: "/experiences/walks-getaways",
  },
  {
    label: "Talks & Conversations",
    title: "Talks, salons and circles",
    text: "Thoughtful gatherings where stories, ideas, people, memory and culture meet without becoming a boring lecture.",
    cta: "Join a circle",
    href: "/experiences/talks-conversations",
  },
  {
    label: "Food & Senses",
    title: "Taste, smell, listen, notice",
    text: "Food experiences, tasting tables, sensory workshops and slow gatherings that help you experience culture through the body.",
    cta: "Explore sensory experiences",
    href: "/experiences/food-senses",
  },
  {
    label: "Play & Movement",
    title: "Games, movement and playful learning",
    text: "Traditional games, movement sessions, team play, outdoor activities and joyful formats where connection happens naturally.",
    cta: "Explore playful experiences",
    href: "/experiences/play-movement",
  },
  {
    label: "Stage, Screen & Stories",
    title: "Movies, music, theatre and literature",
    text: "Film nights, book clubs, music sessions, storytelling, poetry, performance and other gatherings where culture is watched, heard, read, felt and discussed.",
    cta: "Explore stories",
    href: "/experiences/stage-screen-stories",
  },
];

const moods = [
  "I want to make something",
  "I want to learn something",
  "I want to meet people",
  "I want to move my body",
  "I want to slow down",
  "I want to explore the city",
  "I want to do something with kids",
  "I want something for my team",
  "Surprise me",
];

const themes = [
  {
    icon: "🎨",
    title: "CREATE",
    text: "Hands-on, maker-led, artistic and skill-building experiences.",
  },
  {
    icon: "🧠",
    title: "THINK",
    text: "Ideas, salons, storytelling, inquiry, knowledge and reflection.",
  },
  {
    icon: "🧭",
    title: "EXPLORE",
    text: "Walks, trails, geography, travel, curiosity and place-based discovery.",
  },
  {
    icon: "🌿",
    title: "BELONG",
    text: "Heritage, ecology, community, memory, language and shared life.",
  },
  {
    icon: "💫",
    title: "SYMBOLIZE",
    text: "Ritual, myth, meaning, inner worlds, symbols and seasonal practices.",
  },
  {
    icon: "💃",
    title: "MOVE",
    text: "Body, play, games, rhythm, movement, flow and embodied learning.",
  },
  {
    icon: "🏛️",
    title: "BUILD",
    text: "Work, systems, cities, design, institutions and civic imagination.",
  },
  {
    icon: "🕯️",
    title: "REFLECT",
    text: "Stillness, memory, rest, archives, learning and slow living.",
  },
  {
    icon: "🌈",
    title: "HYBRID",
    text: "Identity, inclusion, interdisciplinarity, futures and everything in-between.",
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

const audiences = [
  {
    icon: "🧍",
    title: "Individuals",
    text: "For curious people looking for meaningful things to do beyond malls, screens and the usual weekend plans.",
  },
  {
    icon: "🏢",
    title: "Teams",
    text: "For workplaces that want connection beyond awkward icebreakers and forced fun.",
  },
  {
    icon: "🧒",
    title: "Children",
    text: "For screen-light, hands-on, playful learning through culture, stories, games and making.",
  },
  {
    icon: "🎤",
    title: "Artists",
    text: "For facilitators, makers, storytellers and cultural practitioners who want visibility, fair work and community.",
  },
  {
    icon: "☕",
    title: "Venues",
    text: "For cafés, studios, libraries and spaces that want meaningful footfall and community energy.",
  },
];

const stories = [
  {
    icon: "🌿",
    title: "A plant workshop became a pause.",
    text: "At a Kokedama workshop, strangers arrived quietly and left comparing plants, soil, string and weekend plans.",
  },
  {
    icon: "🏛️",
    title: "A city heard again.",
    text: "At a history session, Pune became less of a backdrop and more of a living archive of people, places, power and memory.",
  },
  {
    icon: "🎲",
    title: "Play did the talking.",
    text: "At game-led Kattas, people remembered that play is not just for children. It is also how adults become less awkward. Bless.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#17110D]">
      {/* HERO - LIGHT */}
      <section className="bg-[#FAF7F2] px-6 pt-16 pb-24 text-center">
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <p className="mb-5 text-3xl font-semibold uppercase tracking-[0.28em] text-[#8A4B2A]">
            KultureKatta
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Culture is what we do.
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#4A3528] sm:text-xl">
            <span className="block">
              Workshops, walks, games, conversations, food, stories, music,
              rituals, crafts and curious gatherings —
            </span>
            <span className="block">
              all designed to bring culture back into everyday life.
            </span>
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/experiences"
              className="rounded-full bg-[#17110D] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#8A4B2A]"
            >
              Explore experiences
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-[#17110D] bg-[#FFFDF8] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#17110D] hover:text-[#FAF7F2]"
            >
              Talk to us
            </Link>
          </div>

          <div className="mt-14 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#E8D8C5] bg-[#FFFDF8] shadow-sm">
            <img
              src="/images/home/hero-katta.jpg"
              alt="KultureKatta cultural experience"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHY KUKA EXISTS - DARK */}
      <section className="bg-[#17110D] px-6 py-24 text-center text-[#FAF7F2]">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#D8B98C]">
            Why KuKa exists
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Because culture is not only something we watch.
          </h2>

          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-lg leading-8 text-[#E8D8C5] sm:text-xl">
            <p>
              Culture is what we do with our hands, bodies, stories, food,
              rituals, memories, cities and communities.
            </p>

            <p>
              It lives in the everyday — in how we wake up, read, work, cook,
              move, gather, celebrate, rest and remember.
            </p>

            <div className="space-y-3">
              <p>
                KultureKatta brings that back into everyday life through small,
                warm, participatory experiences.
              </p>
              <p>Less scrolling.</p>
              <p>More showing up.</p>
              <p>Revolutionary? Maybe.</p>
              <p>Also deeply practical.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT CAN YOU DO WITH KUKA - LIGHT */}
      <section className="bg-[#F7F1E8] px-6 py-24 text-center text-[#17110D]">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#8A4B2A]">
            What can you do with KuKa?
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            <span className="block">
              You can make, learn, move, gather, wander,
            </span>
            <span className="block">reflect and belong.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4A3528]">
            KuKa is for those days when you want to do something real — not just
            scroll, consume, or wonder where all the interesting people are
            hiding.
          </p>

<div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {featuredExperiences.map((item) => (
    <div
      key={item.href}
      className="rounded-3xl border border-[#E8D8C5] bg-[#FFFDF8] p-8 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#8A4B2A] hover:shadow-md"
    >
      <p className="text-lg font-bold uppercase tracking-[0.2em] text-[#8A4B2A]">
        {item.label}
      </p>

      <h3 className="mt-4 text-2xl font-black leading-tight text-[#17110D]">
        {item.title}
      </h3>

      <p className="mt-4 leading-7 text-[#5F5147]">{item.text}</p>

      <Link
        href={item.href}
        className="mt-8 inline-flex rounded-full bg-[#17110D] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#8A4B2A]"
      >
        {item.cta}
      </Link>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* EXPLORE BY MOOD - DARK */}
      <section className="bg-[#24160F] px-6 py-24 text-center text-[#FAF7F2]">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#D8B98C]">
            Explore by mood
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            <span className="block">Not sure what you want?</span>
            <span className="block">Start with how you feel.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E8D8C5]">
            Not everyone wakes up saying, “I want a cultural experience.”
            Sometimes you just want to make something, meet someone, move
            around, or feel mildly less screen-fried.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moods.map((mood) => (
              <Link
                key={mood}
                href="/experiences"
                className="flex min-h-[130px] items-center justify-center rounded-3xl border border-[#3A2A20] bg-[#17110D] p-6 text-center text-xl font-black text-[#FAF7F2] shadow-sm transition hover:-translate-y-1 hover:border-[#D8B98C] hover:bg-[#2A1D16] hover:shadow-md"
              >
                {mood}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THEMES - LIGHT */}
      <section className="bg-[#FFFDF8] px-6 py-24 text-center text-[#17110D]">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#8A4B2A]">
            KuKa themes
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            <span className="block">A living map of culture,</span>
            <span className="block">curiosity and community.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4A3528]">
            KultureKatta works across interconnected themes — from making and
            thinking to movement, heritage, ecology, ritual, work and rest.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <div
                key={theme.title}
                className="rounded-3xl border border-[#E8D8C5] bg-[#FAF7F2] p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#8A4B2A] hover:shadow-md"
              >
                <div className="text-4xl">{theme.icon}</div>

                <h3 className="mt-5 text-2xl font-black">{theme.title}</h3>

                <p className="mt-3 leading-7 text-[#5C4435]">{theme.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO KUKA IS FOR - DARK */}
      <section className="bg-[#17110D] px-6 py-24 text-center text-[#FAF7F2]">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#D8B98C]">
            Who KuKa is for
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            <span className="block">Individuals, teams, children,</span>
            <span className="block">artists and venues.</span>
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {audiences.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#3A2A20] bg-[#211812] p-7 text-center shadow-sm transition hover:-translate-y-1 hover:bg-[#2A1D16] hover:shadow-md"
              >
                <p className="text-4xl">{item.icon}</p>

                <h3 className="mt-5 text-xl font-black">{item.title}</h3>

                <p className="mt-4 text-sm leading-7 text-[#DCCAB6]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW A KATTA WORKS - LIGHT */}
      <section className="bg-[#F7F1E8] px-6 py-24 text-center text-[#17110D]">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#8A4B2A]">
            How a Katta works
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            <span className="block">Simple. Human.</span>
            <span className="block">No awkward icebreakers, promise.</span>
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-[#E8D8C5] bg-[#FFFDF8] p-8 text-left text-[#17110D] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-5xl font-black text-[#8A4B2A]">
                  {item.step}
                </p>

                <h3 className="mt-5 text-2xl font-black">{item.title}</h3>

                <p className="mt-4 leading-7 text-[#5C4435]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF STRIP - DARK */}
      <section className="bg-[#24160F] px-6 py-24 text-center text-[#FAF7F2]">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#D8B98C]">
            KuKa so far
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            <span className="block">Small gatherings.</span>
            <span className="block">Growing impact.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E8D8C5]">
            From workshops and walks to artists, venues and curious humans —
            KuKa is slowly growing into a living cultural ecosystem.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {proofItems.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-[#3A2A20] bg-[#17110D] p-8 shadow-sm"
              >
                <p className="text-5xl font-black text-[#D8B98C]">
                  {item.number}
                </p>

                <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-[#E8D8C5]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOT JUST WORKSHOPS - LIGHT */}
      <section className="bg-[#FFFDF8] px-6 py-24 text-center text-[#17110D]">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#8A4B2A]">
            Not just workshops
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            KuKa is a cultural ecosystem.
          </h2>

          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-lg leading-8 text-[#4A3528] sm:text-xl">
            <p>
              Yes, we do workshops. But we are not a workshop listing page. KuKa
              is a growing ecosystem of experiences, artists, venues, schools,
              teams, children, communities, stories and experiments.
            </p>

            <p>
              A Katta may become a walk, a circle, a food table, a game, a
              festival, a school module, a team offsite, a children&apos;s lab,
              a content story, or a collaboration that did not exist before.
            </p>

            <p>
              The format can change. The intention stays the same: make culture
              participatory, accessible and alive.
            </p>
          </div>
        </div>
      </section>

      {/* STORIES FROM PAST KATTAS - DARK */}
      <section className="bg-[#17110D] px-6 py-24 text-center text-[#FAF7F2]">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#D8B98C]">
            Stories from past Kattas
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            <span className="block">Little moments.</span>
            <span className="block">Big aftertaste.</span>
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {stories.map((story) => (
              <div
                key={story.title}
                className="rounded-3xl border border-[#3A2A20] bg-[#211812] p-8 text-left shadow-sm transition hover:-translate-y-1 hover:bg-[#2A1D16] hover:shadow-md"
              >
                <p className="text-4xl">{story.icon}</p>

                <h3 className="mt-5 text-2xl font-black">{story.title}</h3>

                <p className="mt-4 leading-7 text-[#DCCAB6]">{story.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
  {stories.map((story) => (
    <div
      key={story.title}
      className="rounded-3xl border border-[#3A2A20] bg-[#211812] p-8 text-left shadow-sm transition hover:-translate-y-1 hover:bg-[#2A1D16] hover:shadow-md"
    >
      <p className="text-4xl">{story.icon}</p>

      <h3 className="mt-5 text-2xl font-black">{story.title}</h3>

      <p className="mt-4 leading-7 text-[#DCCAB6]">{story.text}</p>
    </div>
  ))}
</div>

{/* More stories CTA */}
<div className="mt-12 rounded-3xl border border-[#3A2A20] bg-[#211812] p-8 text-center shadow-sm">
  <p className="text-3xl font-bold uppercase tracking-[0.2em] text-[#D8B98C]">
    More Kattas. More stories.
  </p>

  <h3 className="mt-4 text-3xl font-black leading-tight text-[#FAF7F2]">
    This is just the beginning of the aftertaste.
  </h3>

  <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#DCCAB6]">
    From plants carried home to songs stuck in people’s heads, from first-time
    makers to strangers becoming familiar faces — every Katta leaves something
    behind.
  </p>

  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
    <Link
      href="/community"
      className="rounded-full bg-[#FAF7F2] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#D8B98C]"
    >
      Read more stories
    </Link>

    <Link
      href="/experiences"
      className="rounded-full border border-[#D8B98C] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#17110D]"
    >
      Explore Kattas
    </Link>
  </div>
</div>


        </div>
      </section>

      {/* CTA - LIGHT WITH DARK BOX */}
      <section className="bg-[#FAF7F2] px-6 py-24 text-center text-[#FAF7F2]">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#3A2A20] bg-[#17110D] p-8 shadow-sm sm:p-12 md:p-16">
          <p className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] text-[#D8B98C]">
            Stay in the circle
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            <span className="block">Want to know</span>
            <span className="block">what&apos;s coming next?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E8D8C5]">
            Follow us, message us, or join the KuKa circle of curious people who
            like doing things with their hands, feet, minds and hearts.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/919730244996"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#D8B98C] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#FAF7F2]"
            >
              WhatsApp us
            </a>

            <a
              href="https://www.instagram.com/kulturekatta"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#D8B98C] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#D8B98C] hover:text-[#17110D]"
            >
              Follow on Instagram
            </a>

            <Link
              href="/contact"
              className="rounded-full border border-[#D8B98C] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#D8B98C] hover:text-[#17110D]"
            >
              Join newsletter
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL EMOTIONAL CLOSING - DARK */}
      <section className="bg-[#24160F] px-6 py-24 text-center text-[#FAF7F2]">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-[#3A2A20] bg-[#17110D] p-8 shadow-sm md:p-14">
            <p className="mb-5 text-3xl font-semibold uppercase tracking-[0.3em] text-[#D8B98C]">
              The feeling
            </p>

            <h2 className="mx-auto mb-12 max-w-4xl text-4xl font-black leading-tight md:text-5xl">
              This is what a Katta feels like.
            </h2>

            <div className="mx-auto max-w-3xl space-y-4 text-lg leading-relaxed text-[#FAF7F2] md:text-xl">
              <p>You come as you are.</p>
              <p>You try something.</p>
              <p>You meet someone.</p>
              <p>You leave with a story.</p>

              <div className="space-y-3 pt-6 text-[#E8D8C5]">
                <p>Sometimes with a plant.</p>
                <p>Sometimes with a pot.</p>
                <p>Sometimes with a song stuck in your head.</p>
                <p>
                  Sometimes with a new person you actually want to meet again.
                </p>
              </div>
            </div>

            <h2 className="mx-auto mt-12 max-w-4xl text-4xl font-black leading-tight text-[#D8B98C] md:text-6xl">
              <span className="block">Culture is not somewhere you go.</span>
              <span className="block">It is something you grow.</span>
            </h2>

            <div className="mx-auto mt-6 max-w-2xl space-y-2 text-lg leading-8 text-[#E8D8C5]">
              <p>One katta at a time.</p>
              <p>One neighbourhood at a time.</p>
              <p>One curious human at a time.</p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/experiences"
                className="rounded-full bg-[#D8B98C] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#FAF7F2]"
              >
                Start exploring
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-[#D8B98C] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#D8B98C] hover:text-[#17110D]"
              >
                Plan a Katta with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}