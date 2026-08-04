import Link from "next/link";
import OrganizationInquiryForm from "./OrganizationInquiryForm";

const sectionLabelClass = "kk-section-label";

type CardItem = {
  title: string;
  text: string;
  icon: string;
};

type ProcessItem = CardItem & {
  step: string;
};

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  icon: string;
};

const audienceCards: CardItem[] = [
  {
    title: "Companies & Startups",
    text: "Employee engagement, team offsites, leadership gatherings, onboarding, celebrations, and client experiences.",
    icon: "🏢",
  },
  {
    title: "Schools, Colleges & Universities",
    text: "Experiences for faculty teams, administrative groups, student councils, campus communities, and visiting groups.",
    icon: "🎓",
  },
  {
    title: "Hospitals, Clinics & Healthcare Teams",
    text: "Creative and restorative experiences for doctors, nurses, therapists, support staff, and administrative teams.",
    icon: "🏥",
  },
  {
    title: "NGOs, Foundations & Social Enterprises",
    text: "Staff retreats, volunteer engagement, field-team connection, community programs, and purpose-led gatherings.",
    icon: "🌱",
  },
  {
    title: "Cultural, Civic & Public Institutions",
    text: "Participatory programs for museums, galleries, libraries, government bodies, cultural centers, and public organizations.",
    icon: "🏛️",
  },
  {
    title: "Associations, Networks & Communities",
    text: "Gatherings for professional bodies, coworking communities, alumni groups, founder networks, clubs, and members.",
    icon: "🌐",
  },
];

const offerings: CardItem[] = [
  {
    title: "Team Engagement & Offsites",
    text: "Participatory experiences that help teams connect, reset, collaborate, and create a shared memory.",
    icon: "🧩",
  },
  {
    title: "Celebrations & Milestones",
    text: "Thoughtful formats for festive gatherings, annual days, achievements, team rituals, and important occasions.",
    icon: "🎉",
  },
  {
    title: "Learning & Institutional Programs",
    text: "Creative and interdisciplinary programs for educators, faculty teams, students, staff, and institutional communities.",
    icon: "📚",
  },
  {
    title: "Client, Delegation & City Experiences",
    text: "Locally rooted walks, food trails, cultural sessions, and hosted experiences for clients, partners, and visiting groups.",
    icon: "🗺️",
  },
  {
    title: "Startup & Entrepreneur Experiences",
    text: "Interactive, culture-led experiences delivered as focused few-hour sessions, single-day programs, or immersive multi-day formats. Participants learn, solve real business challenges, build meaningful connections, and turn ideas into practical action.",
    icon: "🚀",
  },
  {
    title: "Design Your Own Experience",
    text: "Have an idea for your organization? Share it with us, and we’ll help shape it into a thoughtful, participatory experience built around your people, purpose, and vision.",
    icon: "🧰",
  },
];

const formats: CardItem[] = [
  {
    title: "Make",
    text: "Pottery, textiles, art, craft, gardening, food, and other tactile creative experiences.",
    icon: "🎨",
  },
  {
    title: "Walk",
    text: "Heritage walks, food trails, nature walks, clue trails, and neighborhood discoveries.",
    icon: "🥾",
  },
  {
    title: "Play",
    text: "Traditional games, treasure hunts, team challenges, puzzles, and collaborative group formats.",
    icon: "🎲",
  },
  {
    title: "Listen",
    text: "Story circles, music sessions, oral histories, listening rooms, and reflective conversations.",
    icon: "🎧",
  },
  {
    title: "Taste",
    text: "Regional food stories, tastings, coffee, tea, baking, fermentation, and shared-table experiences.",
    icon: "🍲",
  },
  {
    title: "Learn",
    text: "Cultural modules, creative labs, demonstrations, discussions, and interdisciplinary learning experiences.",
    icon: "💡",
  },
];

const process: ProcessItem[] = [
  {
    step: "01",
    title: "Share the brief",
    text: "Tell us the group size, city, occasion, date, budget, and the kind of energy you want.",
    icon: "💬",
  },
  {
    step: "02",
    title: "We shape the experience",
    text: "We recommend a direction and curate the format, facilitator, materials, venue, and flow.",
    icon: "✨",
  },
  {
    step: "03",
    title: "We bring it to life",
    text: "KuKa coordinates and hosts the experience so your group can simply show up and participate.",
    icon: "🎪",
  },
];

function IconBox({
  icon,
  size = "card",
}: {
  icon: string;
  size?: "hero" | "section" | "card";
}) {
  const sizeClasses =
    size === "hero"
      ? "h-16 w-16 text-[2rem] md:h-20 md:w-20 md:text-[2.5rem]"
      : size === "section"
        ? "h-20 w-20 text-[2.875rem] md:h-24 md:w-24 md:text-[3.375rem]"
        : "h-14 w-14 text-3xl";

  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-sm ${sizeClasses}`}
    >
      <span className="leading-none">{icon}</span>
    </div>
  );
}

function SectionHeader({
  label,
  title,
  description,
  icon,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-5 flex justify-center">
        <IconBox icon={icon} size="section" />
      </div>

      <p className={sectionLabelClass}>{label}</p>

      <h2 className="kk-section-heading mt-5">{title}</h2>

      {description ? (
        <p className="kk-body-large mt-6">{description}</p>
      ) : null}
    </div>
  );
}

export default function ForOrganizationsPage() {
  return (
    <main className="kk-page-root kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light flex min-h-[calc(100svh-13.75rem)] items-center overflow-hidden pt-6 pb-5 md:pt-7 md:pb-6">
        <div className="kk-container text-center">
          <div className="mb-3 flex justify-center">
            <IconBox icon="🤝" size="hero" />
          </div>

          <p className="kk-page-label whitespace-nowrap text-[var(--kk-accent)]">
            KuKa for Organizations
          </p>

          <h1 className="mx-auto mt-3 max-w-4xl text-[clamp(2rem,3.8vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em] text-[var(--kk-text)]">
            Culture-led experiences for organizations, teams, and communities.
          </h1>

          <p className="kk-page-intro mx-auto mt-4 max-w-3xl">
            Custom workshops, walks, food, stories, and play designed around
            your people, purpose, and occasion.
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              href="#organization-inquiry"
              className="kk-button-dark inline-flex items-center gap-2"
            >
              Plan an Experience
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <SectionHeader
            label="Who we work with"
            title="Experiences for every kind of organization."
            icon="👥"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audienceCards.map((item) => (
              <article
                key={item.title}
                className="group kk-card kk-card--interactive"
              >
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <IconBox icon={item.icon} />
                </div>

                <h3 className="kk-card-title mt-6">{item.title}</h3>

                <p className="kk-card-body mt-4">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DESIGN */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <SectionHeader
            label="What we design"
            title="From team days to cultural immersions."
            description="Every experience is shaped around your people, purpose, setting, time, and budget—not pulled from a fixed catalog."
            icon="🪄"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {offerings.map((item) => (
              <article
                key={item.title}
                className="group kk-card kk-card--interactive"
              >
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <IconBox icon={item.icon} />
                </div>

                <h3 className="kk-card-title mt-6">{item.title}</h3>

                <p className="kk-card-body mt-4">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE FORMATS */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <SectionHeader
            label="Experience formats"
            title="Choose the energy. We’ll shape the format."
            description="From energetic and playful to calm and reflective, choose the kind of experience you want your group to have."
            icon="🎭"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {formats.map((item) => (
              <article
                key={item.title}
                className="group kk-card kk-card--interactive"
              >
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <IconBox icon={item.icon} />
                </div>

                <h3 className="kk-card-title mt-6">{item.title}</h3>

                <p className="kk-card-body mt-4">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <SectionHeader
            label="How it works"
            title="Simple, custom, and thoughtfully hosted."
            description="You share the essentials. We take care of the concept, coordination, and experience design."
            icon="🧭"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {process.map((item) => (
              <article
                key={item.step}
                className="group kk-card kk-card--interactive"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="kk-card-number">{item.step}</p>

                  <div className="transition-transform duration-300 group-hover:-translate-y-1">
                    <IconBox icon={item.icon} />
                  </div>
                </div>

                <h3 className="kk-card-title mt-6">{item.title}</h3>

                <p className="kk-card-body mt-4">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="kk-panel mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <IconBox icon="📩" size="section" />
            </div>

            <p className={sectionLabelClass}>Start here</p>

            <h2 className="kk-section-heading mt-5">
              Tell us what you are planning.
            </h2>

            <p className="kk-body-large mx-auto mt-6 max-w-2xl">
              Planning something for your team, institution, or community?
              Share what you have in mind, and we’ll recommend a suitable
              direction.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="#organization-inquiry"
                className="kk-button-dark inline-flex items-center gap-2"
              >
                Inquire Now
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIZATION INQUIRY FORM */}
      <OrganizationInquiryForm />
    </main>
  );
}