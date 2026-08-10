import type { Metadata } from "next";
import VerticalAudience from "../../components/verticals/VerticalAudience";
import VerticalCTA from "../../components/verticals/VerticalCTA";
import VerticalExperienceGrid from "../../components/verticals/VerticalExperienceGrid";
import VerticalFormats from "../../components/verticals/VerticalFormats";
import VerticalHero from "../../components/verticals/VerticalHero";
import VerticalIntro from "../../components/verticals/VerticalIntro";
import VerticalProcess from "../../components/verticals/VerticalProcess";
import { getKukaVertical } from "../../data/kukaVerticals";

export const metadata: Metadata = {
  title: "KuKa Circle | Hands-On Cultural Learning for Children",
  description:
    "KuKa Circle creates screen-light, hands-on, curiosity-led cultural experiences for children, families, schools, and learning communities.",
  alternates: {
    canonical: "/kuka-universe/circle",
  },
};

const vertical = getKukaVertical("circle")!;

const pathways = [
  {
    icon: "🎨",
    title: "Create",
    description:
      "Art, craft, music, storytelling, materials, tools, open-ended making, and the confidence that grows through trying.",
  },
  {
    icon: "🧠",
    title: "Think",
    description:
      "Playful logic, everyday science, philosophy through stories, questions, puzzles, experiments, and multiple ways of knowing.",
  },
  {
    icon: "🌍",
    title: "Belong",
    description:
      "Local histories, languages, traditions, identity, community, memory, intergenerational learning, and openness to the world.",
  },
  {
    icon: "🏃",
    title: "Move",
    description:
      "Games, rhythm, nature exploration, body-led learning, coordination, collaboration, movement, and outdoor play.",
  },
  {
    icon: "🕯️",
    title: "Reflect",
    description:
      "Emotional literacy, quiet making, observation, journaling, seasons, symbols, and age-appropriate reflection.",
  },
  {
    icon: "🧩",
    title: "Connect the Dots",
    description:
      "Interdisciplinary experiences where art meets science, history meets play, and the neighborhood becomes a classroom.",
  },
];

const formats = [
  {
    title: "Weekly or Monthly Circles",
    description:
      "A recurring rhythm of making, inquiry, play, stories, movement, and reflection.",
  },
  {
    title: "Pop-Ups & Play Labs",
    description:
      "Standalone experiences for neighborhoods, communities, venues, festivals, and private groups.",
  },
  {
    title: "School Modules",
    description:
      "Subject-linked, interdisciplinary, club-time, enrichment, or term-based experiential programs.",
  },
  {
    title: "Camps & Culture Days",
    description:
      "Half-day, full-day, weekend, or seasonal programs with several connected experiences.",
  },
  {
    title: "Parent–Child Experiences",
    description:
      "Shared learning where adults and children make, play, explore, and discover together.",
  },
  {
    title: "Festivals & Showcases",
    description:
      "Participatory school or community events centered on process, curiosity, and cultural discovery.",
  },
];

const process = [
  {
    title: "Understand the children and context",
    description:
      "Age, group size, setting, learning environment, access needs, energy, and purpose shape the design.",
  },
  {
    title: "Curate a process-first journey",
    description:
      "We combine materials, stories, play, movement, questions, and real-world exploration without forcing identical outcomes.",
  },
  {
    title: "Facilitate with care",
    description:
      "Experiences are age-appropriate, inclusive, non-competitive, and delivered with clear safety and safeguarding expectations.",
  },
];

export default function KukaCirclePage() {
  return (
    <div className="kk-page-root min-h-screen">
      <VerticalHero
        name={vertical.name}
        tagline="Childhood is not preparation for life. It is life itself."
        description="Screen-light, hands-on cultural learning where children make, move, play, question, reflect, and belong."
        logoSrc={vertical.logoSrc}
        logoAlt={vertical.logoAlt}
        status={vertical.status}
        primaryLabel="Bring Circle to Your School"
        primaryHref="/contact"
        secondaryLabel="Plan a Private Experience"
        secondaryHref="/private-experiences"
      />

      <VerticalIntro
        label="Why KuKa Circle exists"
        title="Learning returns to the hands, body, neighborhood, and real world."
        paragraphs={[
          "KuKa Circle is the children-focused universe of KultureKatta. It creates slow, joyful, human learning spaces where curiosity leads and culture becomes the classroom.",
          "It does not teach children what to think. It gives them safe, stimulating spaces to learn how to think, feel, relate, explore, and create.",
        ]}
        principles={[
          "Process-first",
          "Joyful",
          "Non-competitive",
          "Inclusive",
          "Age-appropriate",
          "Screen-light",
        ]}
      />

      <VerticalExperienceGrid
        label="Circle pathways"
        title="Children learn through many parts of themselves."
        description="KuKa Circle draws from the wider KultureKatta ecosystem and adapts it thoughtfully for childhood."
        items={pathways}
      />

      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label">What KuKa Circle is not</p>
            <h2 className="kk-section-heading mt-5">
              We protect curiosity by being clear about what we will not become.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Not tuition or coaching",
              "Not a hobby-class factory",
              "Not screen-based learning",
              "Not competitive or comparison-driven",
              "Not childcare or supervision-only",
              "Not about keeping children busy",
              "Not culture as decoration",
              "Not one-size-fits-all",
              "Not rushing childhood",
            ].map((item) => (
              <article key={item} className="kk-card kk-card--centered">
                <p className="text-3xl" aria-hidden="true">
                  ×
                </p>
                <h3 className="kk-card-title mt-4">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <VerticalFormats
        label="Program formats"
        title="A circle can be recurring, embedded, or beautifully occasional."
        items={formats}
      />

      <VerticalAudience
        title="For children—and the ecosystems around them."
        description="KuKa Circle is primarily designed for children around 6–12 years old, with formats adapted for families, schools, homeschooling communities, and institutions."
        audiences={vertical.audiences}
      />

      <VerticalProcess
        label="Design & safeguarding"
        title="Joy needs thoughtful structure behind it."
        description="The experience may feel playful and effortless to a child; the planning behind it should not be casual."
        items={process}
      />

      <VerticalCTA
        title="Bring more curiosity, culture, and play into childhood."
        description="Talk to us about a school program, recurring circle, camp, cultural day, neighborhood experience, or parent–child gathering."
        primaryLabel="Discuss a School Program"
        primaryHref="/contact"
        secondaryLabel="Private Children’s Experiences"
        secondaryHref="/private-experiences"
      />
    </div>
  );
}
