import type { Metadata } from "next";
import ExperienceCategoryPage from "../../components/ExperienceCategoryPage";

export const metadata: Metadata = {
  title: "Wellness & Slowing Down Experiences | KultureKatta",
  description:
    "Culture-led wellness experiences through mindful making, nature connection, gentle movement, reflection, sensory rest, and screen-light pauses.",
  alternates: {
    canonical: "/experiences/wellness",
  },
};

const experiences = [
  {
    icon: "🧶",
    title: "Mindful Making",
    text: "Slow, tactile activities such as clay, paper, textiles, gardening, journaling, and repetitive craft that help attention settle naturally.",
  },
  {
    icon: "🌱",
    title: "Nature Connection",
    text: "Plant-led workshops, nature walks, sensory observation, gardening, earth-based practices, and quiet encounters with the outdoors.",
  },
  {
    icon: "🧘‍♀️",
    title: "Gentle Movement",
    text: "Accessible movement, stretching, rhythm, breath-led practices, walking, and embodied sessions designed without pressure or performance.",
  },
  {
    icon: "📔",
    title: "Reflection & Journaling",
    text: "Guided reflection, expressive writing, memory work, creative prompts, and small-group conversations that create space to notice and process.",
  },
  {
    icon: "👃",
    title: "Sensory Rest",
    text: "Experiences using sound, scent, touch, taste, light, silence, and simple rituals to help participants slow down and reconnect with their senses.",
  },
  {
    icon: "📵",
    title: "Digital Well-Being",
    text: "Screen-light and screen-free formats that replace constant stimulation with making, conversation, play, presence, and unhurried shared time.",
  },
];

const process = [
  {
    icon: "🎯",
    title: "Choose the intention",
    text: "We begin with the group’s needs: rest, reconnection, creativity, nature, reflection, movement, or a meaningful pause from routine.",
  },
  {
    icon: "🧩",
    title: "Shape the format",
    text: "The experience is adapted to the setting, group size, accessibility needs, available time, energy level, and desired depth.",
  },
  {
    icon: "🌿",
    title: "Create breathing room",
    text: "Participants leave with more than a wellness activity: a practice, object, reflection, memory, or small ritual they can carry forward.",
  },
];

export default function WellnessExperiencesPage() {
  return (
    <ExperienceCategoryPage
      icon="🌿"
      iconLabel="Wellness and slowing down"
      eyebrow="Wellness & slowing down"
      title="Breathing room, made human."
      intro="KuKa wellness experiences bring together culture, creativity, nature, movement, reflection, and sensory awareness. They are designed as thoughtful pauses rather than clinical programs or productivity exercises — helping people slow down, reconnect, and spend time with greater attention."
      firstSectionTitle="Rest can be creative, cultural, social, and alive."
      firstSectionIntro="A KuKa wellness experience may be quiet or playful, solitary or shared, indoors or outside. The common thread is presence: less pressure, less performance, and more room to notice."
      experiences={experiences}
      secondSectionTitle="Designed around the people in the room."
      secondSectionIntro="These experiences can be created for workplaces, private groups, schools and colleges, women’s groups, caregivers, communities, retreats, visiting groups, and special occasions."
      process={process}
      closingTitle="Slow does not have to mean dull."
      closingText="We can create a single mindful session, a culture-led wellness day, a recurring series, or a custom combination of making, nature, movement, food, sound, stories, and reflection."
      primaryCta="Plan a wellness experience"
    />
  );
}
