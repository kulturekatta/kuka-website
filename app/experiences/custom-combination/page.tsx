import type { Metadata } from "next";
import ExperienceCategoryPage from "../../components/ExperienceCategoryPage";

export const metadata: Metadata = {
  title: "Custom Combination Experiences | KultureKatta",
  description:
    "Combine KuKa workshops, food, walks, stories, music, games, movement, wellness, and seasonal culture into one custom group experience.",
};

const experiences = [
  {
    icon: "🎨",
    title: "Make + Reflect",
    text: "Pair a tactile workshop with journaling, storytelling, conversation, music, or a quiet closing ritual that gives the making greater meaning.",
  },
  {
    icon: "🥾",
    title: "Walk + Taste",
    text: "Combine a neighborhood, heritage, nature, or food walk with a tasting, shared meal, local story session, sketching activity, or photo prompt.",
  },
  {
    icon: "🎵",
    title: "Listen + Create",
    text: "Bring together music, sound, poetry, visual art, movement, memory, and collaborative creation in one multisensory experience.",
  },
  {
    icon: "🧩",
    title: "Play + Learn",
    text: "Use games, puzzles, role-play, quizzes, historical play, or team challenges to explore culture, ideas, communication, and connection.",
  },
  {
    icon: "🌿",
    title: "Nature + Wellness",
    text: "Blend outdoor observation, gentle movement, mindful making, plant work, sensory rest, reflective writing, and screen-light shared time.",
  },
  {
    icon: "🪔",
    title: "Celebrate + Explore",
    text: "Build a festival or occasion around food, craft, music, stories, regional traditions, games, rituals, and a theme meaningful to your group.",
  },
];

const process = [
  {
    icon: "👥",
    title: "Tell us who it is for",
    text: "We consider the participants, ages, group size, relationships, accessibility needs, interests, and how familiar people are with one another.",
  },
  {
    icon: "🎯",
    title: "Define the purpose",
    text: "The combination can be shaped for connection, celebration, learning, reflection, team culture, play, discovery, wellness, or simply meaningful time together.",
  },
  {
    icon: "🛠️",
    title: "We build the experience",
    text: "KuKa combines suitable domains, formats, facilitators, materials, timing, flow, and setting into one coherent program rather than a pile of unrelated activities.",
  },
];

export default function CustomCombinationPage() {
  return (
    <ExperienceCategoryPage
      icon="🧬"
      iconLabel="Custom combination"
      eyebrow="Want a custom combination?"
      title="More than one doorway. One thoughtfully designed experience."
      intro="Not every group fits neatly into a single category. KuKa can combine workshops, food, walks, talks, stories, music, screen, movement, games, wellness, and seasonal culture into one experience shaped around your people, purpose, occasion, location, group size, and available time."
      firstSectionTitle="Combinations that feel connected, not crowded."
      firstSectionIntro="A good custom program is not three random activities placed next to one another. Each element should build the same mood, story, purpose, or participant journey."
      experiences={experiences}
      secondSectionTitle="You bring the context. We design the journey."
      secondSectionIntro="Custom combinations work especially well for organization programs, offsites, visiting groups, birthdays, anniversaries, family gatherings, school programs, cultural days, retreats, and celebrations that need something more personal."
      process={process}
      closingTitle="Tell us the feeling you want to create."
      closingText="You do not need to arrive with a finished brief. Share who the experience is for, what the occasion is, how much time you have, and what you want people to feel or take away. We will translate that into a KuKa combination."
      primaryCta="Build a custom combination"
    />
  );
}
