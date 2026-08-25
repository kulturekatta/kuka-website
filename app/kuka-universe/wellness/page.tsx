import type { Metadata } from "next";
import VerticalAudience from "../../components/verticals/VerticalAudience";
import VerticalCTA from "../../components/verticals/VerticalCTA";
import VerticalExperienceGrid from "../../components/verticals/VerticalExperienceGrid";
import VerticalFormats from "../../components/verticals/VerticalFormats";
import VerticalHero from "../../components/verticals/VerticalHero";
import VerticalIntro from "../../components/verticals/VerticalIntro";
import VerticalProcess from "../../components/verticals/VerticalProcess";
import SemanticIcon from "../../components/SemanticIcon";
import { getKukaVertical } from "../../data/kukaVerticals";

export const metadata: Metadata = {
  title: "KuKa Wellness | Creative, Cultural & Community Wellbeing",
  description:
    "KuKa Wellness brings together rest, movement, creativity, nature, reflection, sound, food, and community through thoughtful participatory experiences.",
  alternates: {
    canonical: "/kuka-universe/wellness",
  },
};

const vertical = getKukaVertical("wellness")!;

const pathways = [
  {
    icon: "🛋️",
    title: "Stillness & Rest",
    description:
      "Quiet experiences, rest practices, attention, slowness, boredom, pauses, and permission to do less without turning rest into another task.",
  },
  {
    icon: "🎨",
    title: "Mindful Making",
    description:
      "Clay, paper, textiles, gardening, drawing, craft, and repetitive handwork used as attentive creative practice rather than performance.",
  },
  {
    icon: "💃",
    title: "Movement & Embodiment",
    description:
      "Gentle movement, rhythm, dance, mobility, breath, body awareness, and culturally rooted practices delivered by suitable facilitators.",
  },
  {
    icon: "🍃",
    title: "Nature Connection",
    description:
      "Gardens, plants, walking, observation, outdoor time, seasonal awareness, ecology, and restorative contact with the living world.",
  },
  {
    icon: "✍️",
    title: "Reflection & Journaling",
    description:
      "Writing, art, prompts, story, memory, values, personal rituals, and facilitated reflection without forced disclosure.",
  },
  {
    icon: "🎧",
    title: "Sound & Listening",
    description:
      "Listening rooms, singing, rhythm, sound journeys, silence, field recordings, and attention through the ear.",
  },
  {
    icon: "🍵",
    title: "Food & Nourishment",
    description:
      "Mindful tasting, tea, food rituals, shared tables, seasonal ingredients, and cultural relationships with nourishment.",
  },
  {
    icon: "🤝",
    title: "Community & Belonging",
    description:
      "Small circles, shared practice, gentle conversation, collective making, and human connection without compulsory networking.",
  },
];

const formats = [
  {
    title: "Slow Gatherings",
    description:
      "Small, gently facilitated experiences combining quiet, making, listening, conversation, or ritual.",
  },
  {
    title: "Creative Wellbeing Workshops",
    description:
      "Hands-on sessions where the process supports attention, expression, connection, and rest.",
  },
  {
    title: "Movement Sessions",
    description:
      "Body-led experiences adapted to the group, setting, access needs, and facilitator qualifications.",
  },
  {
    title: "Nature-Based Experiences",
    description:
      "Walks, gardens, outdoor reflection, horticultural activities, seasonal practices, and micro-retreats.",
  },
  {
    title: "Reflection Circles",
    description:
      "Prompt-led journaling, story, listening, values, emotional literacy, or life-stage conversations.",
  },
  {
    title: "Organizational Programs",
    description:
      "Meaningful pauses, team connection, creative recovery, gentle movement, and alternatives to generic wellness days.",
  },
];

const process = [
  {
    title: "Define the purpose honestly",
    description:
      "Rest, connection, movement, creative expression, nature, reflection, or a thoughtful combination—not a vague promise to fix everything.",
  },
  {
    title: "Match the facilitator and boundaries",
    description:
      "We distinguish cultural wellbeing from clinical care and involve qualified professionals when an activity requires them.",
  },
  {
    title: "Design for choice and access",
    description:
      "Participation should allow different comfort levels, bodies, abilities, energy, and needs without pressure to disclose or perform.",
  },
];

export default function KukaWellnessPage() {
  return (
    <div className="kk-page-root min-h-screen">
      <VerticalHero
        name={vertical.name}
        mark={vertical.mark}
        tagline="Slow down without switching off from life."
        description="Creative, cultural, embodied, and community-based experiences that make room for rest, attention, movement, expression, nature, and connection."
        logoSrc={vertical.logoSrc}
        logoAlt={vertical.logoAlt}
        status={vertical.status}
        primaryLabel="Discuss a Wellness Program"
        primaryHref="/contact"
        secondaryLabel="For Organizations"
        secondaryHref="/for-organizations"
      />

      <VerticalIntro
        label="What wellness means at KuKa"
        title="Wellbeing is not one activity—and it is not another performance target."
        paragraphs={[
          "KuKa Wellness explores wellbeing through culture, creativity, the body, nature, food, sound, rest, reflection, and community. It makes room for forms of care that are social, embodied, everyday, and human.",
          "Programs are designed with clear scope. KuKa Wellness does not present a cultural experience as medical treatment, and it does not use the language of therapy unless an appropriately qualified professional is involved.",
        ]}
        principles={[
          "Choice-led",
          "Non-performative",
          "Embodied",
          "Creative",
          "Community-based",
          "Clearly scoped",
        ]}
      />

      <VerticalExperienceGrid
        label="Wellness pathways"
        title="There are many ways to return to yourself and others."
        items={pathways}
      />

      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="kk-panel grid gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <SemanticIcon
                icon="🛡️"
                label="KuKa Wellness boundaries"
                size="section"
                className="mb-5"
              />

              <p className="kk-section-label">What it is not</p>
              <h2 className="kk-section-heading mt-5">
                Careful promises. Clear boundaries.
              </h2>
              <p className="kk-body-large mt-6">
                KuKa can create meaningful wellbeing experiences without
                pretending that one workshop can solve structural, medical, or
                psychological problems.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Not medical treatment",
                "Not therapy without qualified professionals",
                "Not forced vulnerability",
                "Not productivity disguised as wellness",
                "Not one-size-fits-all",
                "Not compulsory positivity",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg font-semibold leading-7"
                >
                  <span
                    className="mr-3 text-2xl"
                    aria-hidden="true"
                    data-kk-sequence={`not-${index + 1}`}
                  >
                    ×
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VerticalFormats
        label="Program formats"
        title="A meaningful pause can take many forms."
        items={formats}
      />

      <VerticalAudience
        title="For individuals, groups, workplaces, and institutions."
        description="Each program is adapted to purpose, participant needs, context, facilitator scope, group size, and accessibility."
        audiences={vertical.audiences}
      />

      <VerticalProcess
        label="Responsible design"
        title="We build wellbeing programs without overclaiming."
        description="Good intentions are not enough; scope, facilitation, consent, access, and participant choice matter."
        items={process}
      />

      <VerticalCTA
        title="Create a gentler, more human kind of gathering."
        description="Talk to us about a private group, organization, community, retreat, creative wellbeing session, nature-based experience, or custom program."
        primaryLabel="Plan a Wellness Experience"
        primaryHref="/contact"
        secondaryLabel="Private Experiences"
        secondaryHref="/private-experiences"
      />
    </div>
  );
}
