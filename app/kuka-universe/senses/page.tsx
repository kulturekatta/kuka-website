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
  title: "KuKa Senses | Multisensory Cultural Experiences",
  description:
    "KuKa Senses creates participatory experiences through taste, touch, scent, sound, and sight for individuals, private groups, organizations, and institutions.",
  alternates: {
    canonical: "/kuka-universe/senses",
  },
};

const vertical = getKukaVertical("senses")!;

const senses = [
  {
    icon: "👅",
    title: "Taste",
    description:
      "Food, coffee, tea, fermentation, baking, regional cuisines, pairings, tasting vocabulary, and the cultural stories carried by flavor.",
  },
  {
    icon: "👐",
    title: "Touch",
    description:
      "Clay, textiles, paper, plants, wood, tools, material culture, tactile making, and learning through the intelligence of the hands.",
  },
  {
    icon: "🌸",
    title: "Scent",
    description:
      "Perfume, botanicals, spices, incense, memory, place, ritual, extraction, blending, and the invisible architecture of smell.",
  },
  {
    icon: "🎧",
    title: "Sound",
    description:
      "Listening rooms, sound walks, voice, music, silence, field recordings, rhythm, acoustic ecology, and attention through hearing.",
  },
  {
    icon: "👁️",
    title: "Sight",
    description:
      "Color, light, visual perception, pattern, photography, design, observation, food presentation, and learning to see more carefully.",
  },
  {
    icon: "🧠",
    title: "Memory & Meaning",
    description:
      "The senses rarely work alone. We explore how they connect to emotion, identity, ritual, memory, belonging, and place.",
  },
];

const formats = [
  {
    title: "Tastings",
    description:
      "Guided tasting journeys with context, vocabulary, stories, comparisons, and conversation.",
  },
  {
    title: "Hands-On Workshops",
    description:
      "Participants brew, blend, cook, make, touch, assemble, observe, or experiment.",
  },
  {
    title: "Sensory Labs",
    description:
      "Focused explorations of one sense—or carefully designed multisensory experiments.",
  },
  {
    title: "Story Tables & Dinners",
    description:
      "Food, objects, sound, memory, storytelling, and shared tables woven into one experience.",
  },
  {
    title: "Walks & Soundwalks",
    description:
      "Neighborhoods, markets, nature, food, architecture, and sound explored through sensory attention.",
  },
  {
    title: "Installations & Pop-Ups",
    description:
      "Interactive sensory stations for festivals, workplaces, institutions, and private gatherings.",
  },
];

const combinations = [
  {
    icon: "☕",
    title: "Coffee + Place",
    description:
      "Brewing, aroma, tasting, trade routes, local café culture, and the social rituals around a cup.",
  },
  {
    icon: "🌺",
    title: "Scent + Memory",
    description:
      "Fragrance materials, personal memory, cultural associations, blending, and reflective storytelling.",
  },
  {
    icon: "🧵",
    title: "Textiles + Touch",
    description:
      "Fiber, weave, texture, regional practices, material histories, and hands-on textile exploration.",
  },
  {
    icon: "🎶",
    title: "Sound + Neighborhood",
    description:
      "A listening walk through voices, traffic, birds, tools, music, worship, commerce, and everyday life.",
  },
  {
    icon: "🍽️",
    title: "Food + Oral History",
    description:
      "Recipes, migration, family memory, ingredients, techniques, and the stories that survive through cooking.",
  },
  {
    icon: "🎨",
    title: "Color + Taste",
    description:
      "A playful exploration of expectation, presentation, perception, language, and how senses influence one another.",
  },
];

const process = [
  {
    title: "Choose the sensory question",
    description:
      "What should people notice, compare, make, remember, understand, or experience differently?",
  },
  {
    title: "Add cultural context",
    description:
      "Materials and techniques are connected to people, histories, regions, rituals, livelihoods, and contemporary practice.",
  },
  {
    title: "Design active participation",
    description:
      "Participants taste, touch, smell, listen, observe, create, discuss, and reflect rather than passively receive information.",
  },
];

export default function KukaSensesPage() {
  return (
    <div className="kk-page-root min-h-screen">
      <VerticalHero
        name={vertical.name}
        mark={vertical.mark}
        tagline="Culture you can taste, touch, smell, hear, and see."
        description="Multisensory gatherings that connect perception with craft, memory, place, ritual, stories, and human connection."
        logoSrc={vertical.logoSrc}
        logoAlt={vertical.logoAlt}
        status={vertical.status}
        primaryLabel="Design a Sensory Experience"
        primaryHref="/contact"
        secondaryLabel="Explore Experiences"
        secondaryHref="/experiences"
      />

      <VerticalIntro
        label="What KuKa Senses is"
        title="The senses are not decoration. They are ways of knowing."
        paragraphs={[
          "KuKa Senses brings together food, beverages, fragrance, sound, texture, materials, color, light, and observation through participatory cultural experiences.",
          "The purpose is not sensory spectacle for its own sake. Each experience connects what people perceive with memory, culture, craft, ecology, livelihood, identity, and place.",
        ]}
        principles={[
          "Multisensory",
          "Hands-on",
          "Culturally grounded",
          "Accessible",
          "Story-led",
          "Memorable",
        ]}
      />

      <VerticalExperienceGrid
        label="The sensory pathways"
        title="Five senses—and the worlds they open."
        items={senses}
      />

      <VerticalFormats
        label="Experience formats"
        title="From a ten-minute encounter to an immersive shared table."
        description="The same sensory theme can become a workshop, walk, tasting, installation, dinner, or organizational program."
        items={formats}
      />

      <VerticalExperienceGrid
        label="Sample combinations"
        sectionIcon="💫"
        title="The most interesting experiences often cross senses and subjects."
        items={combinations}
      />

      <VerticalAudience
        title="For curious people, private groups, teams, and institutions."
        description="Programs can be intimate or large-scale, playful or reflective, educational or celebratory."
        audiences={vertical.audiences}
      />

      <VerticalProcess
        title="We design for attention—not overload."
        description="A successful sensory experience is coherent, contextual, participatory, and considerate of different bodies and access needs."
        items={process}
      />

      <VerticalCTA
        title="Tell us what you want people to notice, feel, make, or remember."
        description="We can design a tasting, sensory lab, private gathering, team program, school experience, story dinner, walk, or custom multisensory format."
        primaryLabel="Plan a KuKa Senses Experience"
        primaryHref="/contact"
        secondaryLabel="Private Experiences"
        secondaryHref="/private-experiences"
      />
    </div>
  );
}
