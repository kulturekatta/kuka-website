import type { Metadata } from "next";
import ExperienceCategoryPage from "../../components/ExperienceCategoryPage";

export const metadata: Metadata = {
  title: "Festive & Seasonal Experiences | KultureKatta",
  description:
    "Culture-led festive and seasonal programs around rituals, food, crafts, music, stories, masks, calendars, and regional traditions.",
  alternates: {
    canonical: "/experiences/festive",
  },
};

const experiences = [
  {
    icon: "🕯️",
    title: "Festivals & Rituals",
    text: "Participatory programs that explore the meaning, making, symbols, practices, and living traditions connected with festivals and shared rituals.",
  },
  {
    icon: "🍲",
    title: "Food & Seasonal Tables",
    text: "Festival foods, regional recipes, tastings, culinary stories, seasonal ingredients, edible traditions, and shared-table experiences.",
  },
  {
    icon: "🎨",
    title: "Crafts & Decorations",
    text: "Hands-on making through paper, clay, textiles, natural materials, masks, ornaments, floral practices, and regionally rooted decorative arts.",
  },
  {
    icon: "🎵",
    title: "Music, Dance & Performance",
    text: "Songs, rhythm, folk movement, performance traditions, listening sessions, and participatory cultural expression connected to a season or celebration.",
  },
  {
    icon: "📖",
    title: "Stories, Myths & Memory",
    text: "Folklore, legends, oral traditions, family memories, histories, seasonal narratives, and conversations that add meaning beyond the decoration.",
  },
  {
    icon: "📅",
    title: "Calendars & Seasons",
    text: "Programs around harvests, monsoons, solstices, lunar cycles, new years, regional calendars, rites of passage, and the many ways cultures mark time.",
  },
];

const process = [
  {
    icon: "🧭",
    title: "Choose the cultural lens",
    text: "We identify the festival, season, region, tradition, community, or calendar moment and decide what deserves deeper attention.",
  },
  {
    icon: "🤝",
    title: "Curate with context",
    text: "We work with suitable artists, practitioners, storytellers, cooks, musicians, historians, and facilitators rather than reducing culture to décor.",
  },
  {
    icon: "✨",
    title: "Make it participatory",
    text: "The final experience invites people to make, taste, listen, move, discuss, play, or reflect — not merely watch a themed performance.",
  },
];

export default function FestiveExperiencesPage() {
  return (
    <ExperienceCategoryPage
      icon="🎊"
      iconLabel="Festive and seasonal experiences"
      eyebrow="Festive & seasonal experiences"
      title="Celebrate with meaning, not just decoration."
      intro="KuKa creates culture-led programs around festivals, seasons, rituals, food, stories, crafts, music, masks, calendars, and regional traditions. Each gathering is designed to make celebration participatory, contextual, and genuinely connected to the culture from which it comes."
      firstSectionTitle="Many ways to enter a season or celebration."
      firstSectionIntro="A festive experience can be intimate or large, playful or reflective, traditional or contemporary. We combine living knowledge with hands-on participation so the program feels relevant rather than performative."
      experiences={experiences}
      secondSectionTitle="Rooted in context. Adapted to your group."
      secondSectionIntro="Festive programs can be designed for organizations, schools, colleges, institutions, housing communities, families, private celebrations, visiting groups, and public cultural programs."
      process={process}
      closingTitle="Every celebration carries a world within it."
      closingText="We can create one focused workshop, a festive cultural day, a multi-activity celebration, a seasonal series, or a custom program combining food, craft, music, storytelling, games, movement, and ritual."
      primaryCta="Plan a festive experience"
    />
  );
}
