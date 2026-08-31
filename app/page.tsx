import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import IconLead from "./components/IconLead";
import SemanticIcon from "./components/SemanticIcon";

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
      <SemanticIcon
        icon={icon}
        label={label}
        size={compact ? "compact" : "card"}
      />

      <span className="inline-flex rounded-full bg-[#2a1b16] px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-white">
        {label}
      </span>
    </div>
  );
}

type SectionHeaderIconProps = {
  icon: string;
  label: string;
  page?: boolean;
};

function SectionHeaderIcon({
  icon,
  label,
  page = false,
}: SectionHeaderIconProps) {
  return (
    <IconLead
      icon={icon}
      label={label}
      size={page ? "page" : "section"}
      align="center"
    />
  );
}

const discoveryLayers = [
  {
    icon: "🧭",
    iconLabel: "Mood",
    eyebrow: "Start with how you feel",
    title: "Browse by Mood",
    question: "How do you feel—or how would you like to feel?",
    text: "Begin with your energy, desire, or emotional state and discover experiences that can meet you there.",
    examples: [
      "Curious",
      "Playful",
      "Reflective",
      "Social",
      "Restless",
      "In need of calm",
    ],
    href: "/moods",
    cta: "Explore All Moods",
  },
  {
    icon: "⏳",
    iconLabel: "Moment",
    eyebrow: "Start with what is happening",
    title: "Browse by Moment",
    question: "What is happening in your life or around you?",
    text: "Find experiences suited to an occasion, season, relationship, transition, time of day, or meaningful chapter.",
    examples: [
      "A rainy afternoon",
      "A birthday",
      "A slow Sunday",
      "A team milestone",
      "A new beginning",
      "Time with family",
    ],
    href: "/moments",
    cta: "Explore All Moments",
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
    iconLabel: "Historic games",
    title: "Medieval Indian Games",
    place: "Pune",
    text: "A playful dive into traditional and historic Indian games, strategy, and social play.",
  },
  {
    icon: "☕",
    iconLabel: "Coffee brewing",
    title: "Coffee Brewing Katta",
    place: "Pune",
    text: "A slow, sensory session exploring coffee, brewing techniques, taste, and ritual.",
  },
  {
    icon: "🔎",
    iconLabel: "Forensic storytelling",
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
    iconLabel: "Juggling",
    title: "Juggling Workshop",
    place: "Mumbai",
    text: "A movement-based, playful workshop exploring rhythm, coordination, and flow.",
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
    icon: "🗂️",
    number: "50+",
    label: "Curated experiences",
  },
  {
    icon: "🏙️",
    number: "3",
    label: "Cities and growing",
  },
  {
    icon: "🎭",
    number: "25+",
    label: "Artists and facilitators",
  },
  {
    icon: "👥",
    number: "400+",
    label: "Participants so far",
  },
];

const whatWeCreate = [
  {
    icon: "🎟️",
    iconLabel: "Open",
    title: "Open Experiences",
    text: "Discover upcoming workshops, walks, gatherings, performances, conversations, sensory sessions, and other cultural experiences that are open for anyone to join.",
    href: "/experiences",
    cta: "Explore Open Experiences",
  },
  {
    icon: "🎉",
    iconLabel: "Private",
    title: "Private Experiences",
    text: "Commission a thoughtful experience for birthdays, families, friends, couples, visiting guests, celebrations, or simply meaningful time together—shaped around your people, occasion, mood, and pace.",
    href: "/private-experiences",
    cta: "Plan a Private Experience",
  },
  {
    icon: "🏢",
    iconLabel: "Organizations",
    title: "Experiences for Organizations",
    text: "Explore one-time experiences, curated packages, and longer programmes for companies, schools, colleges, NGOs, institutions, communities, and teams that want to connect, create, learn, or celebrate together.",
    href: "/for-organizations",
    cta: "Explore for Organizations",
  },
];

export default function HomePage() {
  return (
    <div className="kk-page-root kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light relative overflow-hidden pt-16 pb-20 md:pt-14 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center sm:px-10 lg:px-16">
          <SectionHeaderIcon icon="🕯️" label="KultureKatta" page />

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
            {/* PRIMARY EXPERIENCE PATHWAYS */}
      <section className="kk-section-light pt-12 pb-20 md:pt-6 md:pb-24">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeaderIcon icon="🚪" label="Pick your doorway" />

            <p className="kk-section-label mb-5">Pick Your Doorway</p>

            <h2 className="kk-section-heading mt-4">
              How would you like to experience KuKa?
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl">
              Join an experience open to everyone, create something for your
              own group, or bring KuKa to your organization.
            </p>
          </div>

          <div className="mt-14 grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
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

                <Link
                  href={item.href}
                  className="kk-button-dark mt-8 self-center"
                >
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVERY LAYERS */}
            {/* MOODS AND MOMENTS */}
      <section className="kk-section-cream pt-10 pb-20 md:pt-14 md:pb-24">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeaderIcon icon="🧭" label="Moods and moments" />

            <p className="kk-section-label mb-5">
              Find your way into KuKa
            </p>

            <h2 className="kk-section-heading">
              Find an experience that meets you where you are.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl">
              Start with how you feel, how you would like to feel, or what is
              happening in your life and around you.
            </p>
          </div>

          <div className="mt-14 grid items-stretch gap-7 md:grid-cols-2">
            {discoveryLayers.map((layer) => (
              <article
                key={layer.title}
                className="kk-card kk-card--interactive min-h-[500px]"
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
                <SemanticIcon
                  icon={item.icon}
                  label={item.label}
                  size="compact"
                />

                <p className="kk-card-number mt-5">{item.number}</p>

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


    </div>
  );
}
