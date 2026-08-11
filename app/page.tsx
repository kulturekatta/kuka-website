import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "KultureKatta | Culture-Led Experiences for Organizations & Private Groups",
  description:
    "KultureKatta designs culture-led workshops, city trails, creative sessions, festive experiences, and custom gatherings for organizations, teams, and private groups.",
  alternates: {
    canonical: "/",
  },
};

type IllustratedIconProps = {
  icon: string;
  label: string;
  compact?: boolean;
};

function IllustratedIcon({
  icon,
  label,
  compact = false,
}: IllustratedIconProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span
        aria-hidden="true"
        className={`block leading-none drop-shadow-sm ${
          compact ? "text-[2.6rem]" : "text-[3.35rem]"
        }`}
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        }}
      >
        {icon}
      </span>

      <span className="inline-flex rounded-full bg-[#2a1b16] px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-white">
        {label}
      </span>
    </div>
  );
}

type SectionHeaderIconProps = {
  icon: string;
  label: string;
  compact?: boolean;
};

function SectionHeaderIcon({
  icon,
  label,
  compact = false,
}: SectionHeaderIconProps) {
  return (
    <div className="mb-5 flex justify-center">
      <span
        role="img"
        aria-label={label}
        className={`flex items-center justify-center rounded-[1.4rem] border border-black/10 bg-white leading-none shadow-sm ${
          compact
            ? "h-14 w-14 text-[1.85rem]"
            : "h-16 w-16 text-[2.15rem]"
        }`}
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        }}
      >
        {icon}
      </span>
    </div>
  );
}

const experienceTypes = [
  {
    label: "01",
    icon: "🎨",
    iconLabel: "Making",
    title: "Hands-On Workshops",
    titleLines: ["Hands-On", "Workshops"],
    text: "Art, craft, pottery, gardening, textiles, paper, DIY, making, building, and slow creative experiences where your hands are very much part of the conversation.",
    href: "/experiences/workshops",
    cta: "Explore workshops",
    ctaLines: ["Explore", "workshops"],
  },
  {
    label: "02",
    icon: "🍲",
    iconLabel: "Senses",
    title: "Food & Senses",
    titleLines: ["Food", "& Senses"],
    text: "Cooking, baking, coffee, tea, tastings, food stories, fermentation, regional cuisines, and shared tables where culture is experienced through flavor.",
    href: "/experiences/food",
    cta: "Explore food",
    ctaLines: ["Explore", "food"],
  },
  {
    label: "03",
    icon: "🥾",
    iconLabel: "Explore",
    title: "Walks & Trails",
    titleLines: ["Walks", "& Trails"],
    text: "Heritage walks, food trails, nature walks, neighborhood explorations, and place-based experiences rooted in people, places, and stories.",
    href: "/experiences/walks",
    cta: "Explore walks",
    ctaLines: ["Explore", "walks"],
  },
  {
    label: "04",
    icon: "💬",
    iconLabel: "Ideas",
    title: "Talks & Salons",
    titleLines: ["Talks", "& Salons"],
    text: "Expert talks, intimate salons, storytelling sessions, discussions, and idea-led gatherings that make learning social.",
    href: "/experiences/talks",
    cta: "Explore talks",
    ctaLines: ["Explore", "talks"],
  },
  {
    label: "05",
    icon: "🎙️",
    iconLabel: "Words",
    title: "Words & Open Mics",
    titleLines: ["Words", "& Open Mics"],
    text: "Book clubs, writing circles, literature, poetry, storytelling, spoken word, open mics, and language-led gatherings for readers, writers, and listeners.",
    href: "/experiences/words",
    cta: "Explore words",
    ctaLines: ["Explore", "words"],
  },
  {
    label: "06",
    icon: "🎼",
    iconLabel: "Sound",
    title: "Music & Sound",
    titleLines: ["Music", "& Sound"],
    text: "Live music, jam sessions, singing circles, sound journeys, listening rooms, and experiences that invite you to hear, feel, notice, and reflect.",
    href: "/experiences/sound",
    cta: "Explore sound",
    ctaLines: ["Explore", "sound"],
  },
  {
    label: "07",
    icon: "🎬",
    iconLabel: "Stories",
    title: "Stories & Screen",
    titleLines: ["Stories", "& Screen"],
    text: "Theatre, acting, improv, movie screenings, documentaries, short films, visual storytelling, and post-screening conversations that bring stories alive.",
    href: "/experiences/stories",
    cta: "Explore stories",
    ctaLines: ["Explore", "stories"],
  },
  {
    label: "08",
    icon: "💃",
    iconLabel: "Movement",
    title: "Dance & Movement",
    titleLines: ["Dance", "& Movement"],
    text: "Dance, movement, rhythm, body-led expression, performance, flow, and embodied experiences that bring culture into motion.",
    href: "/experiences/movement",
    cta: "Explore movement",
    ctaLines: ["Explore", "movement"],
  },
  {
    label: "09",
    icon: "🎲",
    iconLabel: "Games",
    title: "Games & Play",
    titleLines: ["Games", "& Play"],
    text: "Traditional games, board games, puzzles, ancient and medieval games, playful challenges, and interactive experiences that bring people together through strategy, laughter, and curiosity.",
    href: "/experiences/games",
    cta: "Explore games",
    ctaLines: ["Explore", "games"],
  },
  {
    label: "10",
    icon: "🌾",
    iconLabel: "Wellness",
    title: "Wellness & Slowing Down",
    titleLines: ["Wellness", "& Slowing Down"],
    text: "Mindful making, nature connection, gentle movement, reflection, sensory rest, digital well-being, and screen-light experiences that create breathing room.",
    href: "/experiences/wellness",
    cta: "Explore wellness",
    ctaLines: ["Explore", "wellness"],
  },
  {
    label: "11",
    icon: "🎊",
    iconLabel: "Seasonal",
    title: "Festive & Seasonal Experiences",
    titleLines: ["Festive & Seasonal", "Experiences"],
    text: "Culture-led programs around festivals, seasons, rituals, food, stories, crafts, music, masks, calendars, and regional traditions.",
    href: "/experiences/festive",
    cta: "Explore festive experiences",
    ctaLines: ["Explore festive", "experiences"],
  },
  {
    label: "12",
    icon: "🧩",
    iconLabel: "Custom",
    title: "Want a Custom Combination?",
    titleLines: ["Want a Custom", "Combination?"],
    text: "Blend two or more KuKa doorways into one experience shaped around your people, purpose, occasion, location, group size, and available time — from craft and food to stories, music, games, walks, and wellness.",
    href: "/experiences/custom-combination",
    cta: "Build your combination",
    ctaLines: ["Build your", "combination"],
  },
];


const discoveryLayers = [
  {
    icon: "🧭",
    iconLabel: "Mood and intent",
    eyebrow: "Start with what you want",
    title: "Mood & Intent Taxonomy",
    question: "What do I feel like doing?",
    text: "Begin with your current desire, energy, intention, or hoped-for experience — whether you want to create, learn, play, connect, move, slow down, explore, celebrate, reflect, contribute, or be surprised.",
    examples: [
      "Create",
      "Learn",
      "Play",
      "Connect",
      "Slow down",
      "Surprise me",
    ],
    href: "/moods",
    cta: "Explore by mood & intent",
  },
  {
    icon: "🌦️",
    iconLabel: "Moments and conditions",
    eyebrow: "Start with what suits now",
    title: "Moments, Seasons & Conditions",
    question: "What suits this particular time and situation?",
    text: "Discover possibilities shaped by the season, weather, time of day, cultural calendar, natural rhythms, available time, location, and what may be especially meaningful right now.",
    examples: [
      "This season",
      "Rainy days",
      "After work",
      "At sunset",
      "This weekend",
      "Best right now",
    ],
    href: "/moments",
    cta: "Explore by moment",
  },
];

const upcomingExperiences = [
  {
    icon: "🧪",
    iconLabel: "Brewing",
    eyebrow: "Coming soon",
    title: "New Kattas are brewing",
    text: "We’re curating workshops, walks, conversations, games, and cultural gatherings across cities.",
    meta: "Dates opening soon",
  },
  {
    icon: "🔭",
    iconLabel: "Discover",
    eyebrow: "Curious minds",
    title: "Explore what’s next",
    text: "From hands-on making to city walks and sensory experiences, the next KuKa calendar is taking shape.",
    meta: "Watch this space",
  },
  {
    icon: "🌱",
    iconLabel: "Co-create",
    eyebrow: "Host with KuKa",
    title: "Bring a Katta to life",
    text: "Artists, facilitators, venues, schools, organizations, and collaborators can co-create with KuKa.",
    meta: "Collaborations open",
  },
];

const pastExperiences = [
  {
  icon: "🍃",
  iconLabel: "Plants",
  title: "Kokedama Workshops",
  place: "Pune & Goa",
  text: "Hands-on plant-making experiences across cafés, studios, and community spaces.",
},
  {
    icon: "♟️",
    iconLabel: "Games",
    title: "Medieval Indian Games",
    place: "Pune",
    text: "A playful dive into traditional and historic Indian games, strategy, and social play.",
  },
  {
    icon: "☕",
    iconLabel: "Senses",
    title: "Coffee Brewing Katta",
    place: "Pune",
    text: "A slow, sensory session exploring coffee, brewing techniques, taste, and ritual.",
  },
  {
    icon: "🔎",
    iconLabel: "Stories",
    title: "Storytelling, but Forensics",
    place: "Pune",
    text: "A gripping expert-led session that turned forensic science into an accessible story.",
  },
  {
    icon: "✂️",
    iconLabel: "Paper",
    title: "Kirigami Katta",
    place: "Pune",
    text: "A paper-cutting experience rooted in patience, precision, and creative focus.",
  },
  {
    icon: "🤹",
    iconLabel: "Movement",
    title: "Juggling Workshop",
    place: "Mumbai",
    text: "A movement-based, playful workshop exploring rhythm, coordination, and flow.",
  },
];

const verticals = [
  {
    icon: "🧭",
    iconLabel: "Place and discovery",
    eyebrow: "Travel, place and discovery",
    title: "KuKa Explore",
    text: "Walks, trails, city discoveries, day trips, getaways, and culture-led journeys that help people encounter places more deeply.",
    href: "/kuka-universe/explore",
    cta: "Discover KuKa Explore",
  },
  {
    icon: "🪁",
    iconLabel: "Childhood and learning",
    eyebrow: "Childhood and learning",
    title: "KuKa Circle",
    text: "Screen-light, hands-on cultural learning for children, families, schools, homeschool communities, and curious young minds.",
    href: "/kuka-universe/circle",
    cta: "Discover KuKa Circle",
  },
  {
  icon: "👁️",
  iconLabel: "Sensory culture",
  eyebrow: "Taste, touch, scent, sound and sight",
  title: "KuKa 5 Senses",
  text: "Multisensory experiences through taste, touch, scent, sound, sight, memory, and culture.",
  href: "/kuka-universe/5-senses",
  cta: "Discover KuKa 5 Senses",
},
  {
    icon: "🌿",
    iconLabel: "Wellbeing and slowness",
    eyebrow: "Wellbeing and slowness",
    title: "KuKa Wellness",
    text: "Creative and culture-led experiences for rest, reflection, gentle movement, nature connection, sensory calm, and digital wellbeing.",
    href: "/kuka-universe/wellness",
    cta: "Discover KuKa Wellness",
  },
  {
    icon: "🏕️",
    iconLabel: "Nature and adventure",
    eyebrow: "Nature and adventure",
    title: "The Ground by KuKa",
    text: "Outdoor learning, hiking, adventure, ecology, field skills, nature immersion, and experiences that bring people closer to the living world.",
    href: "/kuka-universe#verticals",
    cta: "Coming soon",
    isPlanned: true,
  },
  {
    icon: "📜",
    iconLabel: "Stories and memory",
    eyebrow: "Stories, memory and archives",
    title: "KuKa Chronicles",
    text: "Stories, oral histories, cultural memory, archives, conversations, publications, and documentation that preserve how people and places live.",
    href: "/kuka-universe#verticals",
    cta: "Coming soon",
    isPlanned: true,
  },
  {
    icon: "💻",
    iconLabel: "Digital participation",
    eyebrow: "Digital participation",
    title: "KuKa Digital",
    text: "Online and hybrid cultural experiences, digital storytelling, learning, archives, and new ways for people to participate across distance.",
    href: "/kuka-universe#verticals",
    cta: "Coming soon",
    isPlanned: true,
  },
  {
    icon: "🌍",
    iconLabel: "Cultural exchange",
    eyebrow: "Local and global exchange",
    title: "KuKa Exchange",
    text: "Cultural exchanges, residencies, visiting groups, collaborative programs, and encounters that connect local knowledge with the wider world.",
    href: "/kuka-universe#verticals",
    cta: "Coming soon",
    isPlanned: true,
  },
  {
    icon: "🤲",
    iconLabel: "Culture-led impact",
    eyebrow: "Culture-led impact",
    title: "KuKa Impact",
    text: "Programs that widen access, support creative livelihoods, strengthen communities, encourage inclusion, and connect culture with meaningful action.",
    href: "/kuka-universe#verticals",
    cta: "Coming soon",
    isPlanned: true,
  },
];

const howItWorks = [
  {
    step: "01",
    icon: "🎯",
    iconLabel: "Choose",
    title: "Choose your doorway",
    text: "Start with a mood, a moment, an experience family, or a specific idea.",
  },
  {
    step: "02",
    icon: "👣",
    iconLabel: "Arrive",
    title: "Show up",
    text: "Come as you are. No pressure to be an expert. Curiosity is enough.",
  },
  {
    step: "03",
    icon: "🙌",
    iconLabel: "Participate",
    title: "Make, learn, move or listen",
    text: "Every katta is participatory. Your hands, body, mind or stories are involved.",
  },
  {
    step: "04",
    icon: "📔",
    iconLabel: "Remember",
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
    icon: "🏢",
    iconLabel: "Organizations",
    title: "KuKa for Organizations",
    text: "Employee engagement, team workshops, offsite add-ons, faculty and staff programs, city-based activities, and creative cultural sessions for companies, startups, schools, colleges, NGOs, foundations, healthcare groups, and institutions. Designed for organizations that want their people to connect, create, reflect, celebrate, and experience culture together in a more human way.",
    href: "/for-organizations",
    cta: "Explore Organization Experiences",
  },
  {
    icon: "🎉",
    iconLabel: "Private",
    title: "KuKa Private Experiences",
    text: "Custom experiences for birthdays, bachelorettes, families, friends, couples, travelers, visiting guests, women’s groups and intimate celebrations. Designed for groups who want something warmer than a regular outing — hands-on, hosted, personal and shaped around the people, occasion, mood and pace of the gathering.",
    href: "/private-experiences",
    cta: "Explore Private Experiences",
  },
];

export default function HomePage() {
  return (
    <div className="kk-page-root kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light relative overflow-hidden pt-16 pb-20 md:pt-14 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center sm:px-10 lg:px-16">
          <SectionHeaderIcon icon="🪔" label="KultureKatta" />

          <p className="kk-page-label text-[var(--kk-accent)]">
            Kulture Katta
          </p>

          <h1 className="kk-page-heading max-w-4xl">
            Culture-led experiences for organizations and private groups.
          </h1>

          <p className="kk-page-intro mt-8 max-w-4xl">
            Workshops, walks, games, conversations, food, performances,
            screenings, stories, music, rituals, crafts, and curious cultural
            experiences that help you spend your time more meaningfully.
          </p>

          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <Link href="/for-organizations" className="kk-button-dark">
              Plan for an Organization
            </Link>

            <Link href="/private-experiences" className="kk-button-on-light">
              Plan a Private Experience
            </Link>
          </div>

          <div className="mt-14 w-full overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
            <Image
              src="/images/home/hero-katta.jpg"
              alt="KultureKatta cultural experience"
              width={4000}
              height={2256}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* WHAT WE CREATE */}
      <section className="kk-section-light pt-12 pb-20 md:pt-2 md:pb-24">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeaderIcon icon="🏗️" label="What we create" />

            <p className="kk-section-label mb-5">What We Create</p>

            <h2 className="kk-section-heading mt-4">
              Thoughtful cultural experiences for groups that want something
              more meaningful.
            </h2>

            <div className="kk-body-large mx-auto mt-8 max-w-3xl space-y-6">
              <p>
                KuKa designs culture-led experiences for organizations,
                private celebrations, visiting groups, wellness days, and
                special occasions — thoughtful gatherings made around your
                people.
              </p>

              <p className="text-[var(--kk-text)]">
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
                className="kk-card kk-card--interactive min-h-[390px]"
              >
                <IllustratedIcon
                  icon={item.icon}
                  label={item.iconLabel}
                />

                <h3 className="kk-card-title mt-6 text-center">
                  {item.title}
                </h3>

                <p className="kk-card-body mt-5 flex-1 text-center">
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
      <section className="kk-section-cream pt-10 pb-20 md:pt-6 md:pb-24">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeaderIcon icon="🚪" label="Explore KuKa experiences" />

            <p className="kk-section-label mb-5">
              What can you do with KuKa?
            </p>

            <h2 className="kk-section-heading">Pick your doorway.</h2>

            <p className="kk-body mt-6">
              Whether you want to make, taste, walk, discuss, write, listen,
              watch, move, or simply try something new — there’s a Katta waiting
              for you.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experienceTypes.map((item) => (
              <article
                key={item.title}
                className="kk-card kk-card--interactive min-h-[360px]"
              >
                <IllustratedIcon
                  icon={item.icon}
                  label={item.iconLabel}
                />

                <h3 className="kk-card-title mt-6 text-center">
                  {item.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                <p className="kk-card-body mt-5 flex-1">{item.text}</p>

                <Link href={item.href} className="kk-link-dark mt-8">
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


      {/* DISCOVERY LAYERS */}
      <section className="kk-section-light pt-8 pb-16 md:pt-6 md:pb-20">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeaderIcon icon="🧭" label="Find your way into KuKa" />

            <p className="kk-section-label mb-5">
              Find your way into KuKa
            </p>

            <h2 className="kk-section-heading">
              Begin with what you want — or what this moment makes possible.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl">
              KuKa has two complementary discovery layers. Mood & Intent starts
              with you. Moments, Seasons & Conditions starts with the world,
              calendar, weather, and time around you.
            </p>
          </div>

          <div className="mt-14 grid items-stretch gap-7 md:grid-cols-2">
            {discoveryLayers.map((layer) => (
              <article
                key={layer.title}
                className="kk-card kk-card--interactive min-h-[520px]"
              >
                <IllustratedIcon
                  icon={layer.icon}
                  label={layer.iconLabel}
                />

                <p className="kk-card-label mt-6 text-center">
                  {layer.eyebrow}
                </p>

                <h3 className="kk-card-title mt-4 text-center">
                  {layer.title}
                </h3>

                <p className="mt-5 text-center text-xl font-semibold leading-relaxed text-[var(--kk-text)]">
                  {layer.question}
                </p>

                <p className="kk-card-body mt-5 flex-1 text-center">
                  {layer.text}
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

          <div className="kk-panel mx-auto mt-8 max-w-5xl text-center">
            <p className="kk-card-label">Mood + Moment</p>

            <h3 className="kk-card-title mt-4">
              The two layers become more useful when they work together.
            </h3>

            <p className="kk-body mx-auto mt-5 max-w-3xl">
              “I want to slow down” + “It is a rainy Sunday afternoon” could
              lead to a listening room, mindful making session, sensory table,
              poetry-and-chai gathering, or an indoor nature experience.
            </p>
          </div>
        </div>
      </section>

      {/* UPCOMING EXPERIENCES */}
      <section className="kk-section-cream pt-10 pb-20 md:pt-14 md:pb-24">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeaderIcon icon="📅" label="Upcoming experiences" />

            <p className="kk-section-label mb-5">Upcoming experiences</p>

            <h2 className="kk-section-heading">
              New Kattas are on the way.
            </h2>

            <p className="kk-body mt-6">
              We’re shaping the next calendar of cultural experiences. Until the
              dates go live, you can explore the kinds of gatherings KuKa
              curates.
            </p>
          </div>

          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
            {upcomingExperiences.map((item) => (
              <article
                key={item.title}
                className="kk-card kk-card--interactive min-h-[430px]"
              >
                <IllustratedIcon
                  icon={item.icon}
                  label={item.iconLabel}
                />

                <p className="kk-card-label mt-5 text-center">
                  {item.eyebrow}
                </p>

                <h3 className="kk-card-title mt-4 min-h-[4.8rem] text-center">
                  {item.title}
                </h3>

                <p className="kk-card-body mt-4 min-h-[7.5rem]">
                  {item.text}
                </p>

                <div className="kk-card-footer">
                  <p className="kk-card-meta">{item.meta}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/experiences" className="kk-button-dark">
              View upcoming experiences
            </Link>
          </div>
        </div>
      </section>

      {/* PAST EXPERIENCES */}
      <section className="kk-section-light pt-8 pb-16 md:pt-6 md:pb-20">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeaderIcon icon="📸" label="Past KultureKatta experiences" />

            <p className="kk-section-label mb-5">
              Proof of play, practice and presence
            </p>

            <h2 className="kk-section-heading">
              Kattas we’ve already brought to life.
            </h2>

            <p className="kk-body mt-6">
              From plant-making and paper-cutting to games, coffee, forensics,
              juggling, music, movie nights, and heritage — KuKa has already
              begun building its world one gathering at a time.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastExperiences.map((item) => (
              <article
                key={item.title}
                className="kk-card kk-card--interactive"
              >
                <IllustratedIcon
                  icon={item.icon}
                  label={item.iconLabel}
                />

                <p className="kk-card-label mt-5 text-center">
                  {item.place}
                </p>

                <h3 className="kk-card-title mt-4 text-center">
                  {item.title}
                </h3>

                <p className="kk-card-body mt-4 text-center">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KUKA SO FAR */}
      <section className="kk-section-cream pt-10 pb-20 md:pt-6 md:pb-24">
        <div className="kk-container text-center">
          <SectionHeaderIcon icon="📈" label="KultureKatta impact" />

          <p className="kk-section-label mb-5">KuKa so far</p>

          <h2 className="kk-section-heading">
            Small gatherings. Growing impact.
          </h2>

          <p className="kk-body mx-auto mt-6 max-w-3xl">
            From workshops and walks to artists, venues and curious humans —
            KuKa is slowly growing into a living cultural ecosystem.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {proofItems.map((item) => (
              <article
                key={item.label}
                className="kk-card kk-card--centered"
              >
                <p className="kk-card-number">{item.number}</p>

                <p className="kk-card-meta mt-3 uppercase tracking-[0.18em]">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW A KATTA WORKS */}
      <section className="kk-section-light pt-8 pb-16 md:pt-6 md:pb-20">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeaderIcon icon="🛠️" label="How a Katta works" />

            <p className="kk-section-label mb-5">How a Katta works</p>

            <h2 className="kk-section-heading">
              Simple. Human. No awkward icebreakers, promise.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {howItWorks.map((item) => (
              <article
                key={item.step}
                className="kk-card kk-card--interactive"
              >
                <IllustratedIcon
                  icon={item.icon}
                  label={item.iconLabel}
                />

                <h3 className="kk-card-title mt-6 text-center">
                  {item.title}
                </h3>

                <p className="kk-card-body mt-4 text-center">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KUKA UNIVERSE */}
          <section className="kk-section-cream pt-10 pb-20 md:pt-8 md:pb-24">
            <div className="kk-container">
              <div className="mx-auto max-w-4xl text-center">
                <SectionHeaderIcon icon="🪐" label="The KuKa Universe" />

                <p className="kk-section-label mb-5">The KuKa Universe</p>

                <h2 className="kk-section-heading">
                  One cultural ecosystem. Many ways to enter it.
                </h2>

                <div className="kk-body mx-auto mt-6 max-w-3xl space-y-5">
                  <p>
                    KuKa’s verticals explore different ways of experiencing culture —
                    through the senses, childhood, wellbeing, travel, nature, stories,
                    technology, exchange, and social impact.
                  </p>

                  <p>
                    Each vertical has its own purpose and personality, while drawing from
                    the same wider world of curiosity, creativity, participation, and
                    human connection.
                  </p>
                </div>
              </div>

              <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                {verticals.map((item) => {
                  const cardContent = (
                    <>
                      <IllustratedIcon
                        icon={item.icon}
                        label={item.iconLabel}
                      />

                      <div className="mt-6 flex min-h-[3.75rem] items-center justify-center">
                        <p className="kk-card-label text-center">
                          {item.eyebrow}
                        </p>
                      </div>

                      <div className="mt-3 flex min-h-[3.5rem] items-center justify-center">
                        <h3 className="kk-card-title text-center">
                          {item.title}
                        </h3>
                      </div>

                      <p className="kk-card-body mt-4 flex-1 text-center">
                        {item.text}
                      </p>

                      {item.isPlanned ? (
                        <span className="mt-8 self-center text-xs font-semibold uppercase tracking-[0.16em] text-black/65">
                          Coming soon
                        </span>
                      ) : (
                        <span className="kk-link-dark mt-8 self-center">
                          {item.cta}
                        </span>
                      )}
                    </>
                  );

                  if (item.isPlanned) {
                    return (
                      <article
                        key={item.title}
                        className="kk-card min-h-[350px]"
                      >
                        {cardContent}
                      </article>
                    );
                  }

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      aria-label={item.cta}
                      className="kk-card kk-card--interactive group min-h-[350px]"
                    >
                      {cardContent}
                    </Link>
                  );
                })}
              </div>

              {/* EXPLORE THE UNIVERSE CARD */}
              <Link
                href="/kuka-universe"
                aria-label="Explore the complete KuKa Universe"
                className="kk-card kk-card--interactive group mt-8 overflow-hidden md:p-10"
              >
                <div className="grid items-center gap-8 text-center md:grid-cols-[auto_1fr_auto] md:text-left">
                  <div className="flex justify-center">
                    <span
                      aria-hidden="true"
                      className="block text-[4rem] leading-none drop-shadow-sm md:text-[5rem]"
                      style={{
                        fontFamily:
                          '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                      }}
                    >
                      🌌
                    </span>
                  </div>

                  <div>
                    <p className="kk-card-label">
                      The complete ecosystem
                    </p>

                    <h3 className="kk-card-title mt-3">
                      Explore the KuKa Universe
                    </h3>

                    <p className="kk-card-body mt-4 max-w-3xl">
                      See how the nine verticals connect, what each one offers, and how
                      KuKa is growing into a larger ecosystem of experiences, learning,
                      community, exchange, storytelling, and culture-led impact.
                    </p>
                  </div>

                  <div className="flex justify-center md:justify-end">
                    <span className="kk-button-dark">
                      Explore the Universe
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

      {/* FINAL CTA */}
      <section className="kk-section-light pt-10 pb-20 md:pt-6 md:pb-24">
        <div className="kk-container text-center">
          <SectionHeaderIcon icon="🧭" label="Find your next Katta" />

          <p className="kk-section-label mb-5">Find your next Katta</p>

          <h2 className="kk-section-heading">
            Come make, walk, play, taste, listen, think, and belong.
          </h2>

          <p className="kk-body mx-auto mt-6 max-w-3xl">
            Whether you’re a participant, artist, facilitator, venue, school,
            workplace, or fellow curious human — there’s a way to enter the KuKa
            world.
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
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="kk-panel text-center">
            <SectionHeaderIcon icon="✨" label="The feeling of a Katta" />

            <p className="kk-section-label mb-5">The feeling</p>

            <h2 className="kk-section-heading mx-auto max-w-4xl">
              This is what a Katta feels like.
            </h2>

            <div className="kk-body mx-auto mt-10 max-w-3xl space-y-4">
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

            <h2 className="kk-section-heading mx-auto mt-12 max-w-4xl">
              Culture is not somewhere you go. It is something you grow.
            </h2>

            <div className="kk-body mx-auto mt-6 max-w-2xl space-y-2">
              <p>One katta at a time.</p>
              <p>One neighborhood at a time.</p>
              <p>One curious human at a time.</p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/experiences" className="kk-button-dark">
                Start exploring
              </Link>

              <Link href="/contact" className="kk-button-on-light">
                Plan a Katta with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
