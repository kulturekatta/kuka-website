import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore by Mood & Intent | KultureKatta",
  description:
    "Discover KuKa experiences by what you feel like doing, experiencing, or gaining right now.",
};

const moodCards = [
  {
    icon: "🎨",
    title: "Create and express",
    description:
      "Make with your hands, explore materials, write, sing, perform, photograph, design, repair, cook, grow, or find a creative voice.",
    examples: ["make", "write", "perform", "design", "repair"],
    href: "/experiences/workshops",
    cta: "Explore creative experiences",
  },
  {
    icon: "💡",
    title: "Learn something new",
    description:
      "Try something for the first time, start a hobby, learn from an expert, understand how something works, or go deeper into a subject.",
    examples: ["beginner-friendly", "skills", "ideas", "experts"],
    href: "/experiences/talks",
    cta: "Explore learning experiences",
  },
  {
    icon: "🎲",
    title: "Play and have fun",
    description:
      "Play games, solve puzzles, laugh, improvise, compete gently, collaborate on a challenge, revisit childhood, or do something delightfully unnecessary.",
    examples: ["games", "puzzles", "improv", "friendly challenge"],
    href: "/experiences/games",
    cta: "Explore playful experiences",
  },
  {
    icon: "🏃‍♀️",
    title: "Move and feel energized",
    description:
      "Walk, stretch, dance, play physically, try a sport or movement practice, improve coordination, or simply get away from your desk.",
    examples: ["dance", "walk", "movement", "high energy"],
    href: "/experiences/movement",
    cta: "Explore movement experiences",
  },
  {
    icon: "🌿",
    title: "Slow down and restore",
    description:
      "Choose a screen-light, low-pressure experience for quiet, nature, sensory rest, mindful making, gentle movement, reflection, or breathing room.",
    examples: ["quiet", "nature", "screen-light", "gentle"],
    href: "/experiences/wellness",
    cta: "Explore slower experiences",
  },
  {
    icon: "🤝",
    title: "Meet and connect",
    description:
      "Meet new people, spend meaningful time with friends, reconnect, bond as a family, get to know colleagues differently, or feel part of something.",
    examples: ["friends", "family", "new people", "teams"],
    href: "/experiences",
    cta: "Explore social experiences",
  },
  {
    icon: "🧠",
    title: "Think and reflect",
    description:
      "Have a meaningful conversation, explore a question, challenge an assumption, examine a film or book, journal, listen deeply, or sit with wonder.",
    examples: ["salons", "reflection", "ideas", "conversation"],
    href: "/experiences/talks",
    cta: "Explore reflective experiences",
  },
  {
    icon: "🫖",
    title: "Taste and sense",
    description:
      "Taste, cook, brew, smell, listen, touch, notice atmosphere, explore sensory memory, or experience food, sound, poetry, and place together.",
    examples: ["food", "coffee", "scent", "sound", "memory"],
    href: "/experiences/food",
    cta: "Explore sensory experiences",
  },
  {
    icon: "🧭",
    title: "Explore the city and outdoors",
    description:
      "Discover a neighborhood, follow a heritage or food trail, enter nature, see a familiar place differently, host a visitor, or travel with purpose.",
    examples: ["walks", "trails", "city", "nature", "getaways"],
    href: "/experiences/walks",
    cta: "Explore place-based experiences",
  },
  {
    icon: "🎊",
    title: "Celebrate together",
    description:
      "Mark a birthday, anniversary, festival, achievement, farewell, reunion, family ritual, life transition, or a gathering that deserves more than dinner and drinks.",
    examples: ["festivals", "milestones", "private groups", "rituals"],
    href: "/experiences/festive",
    cta: "Explore celebratory experiences",
  },
  {
    icon: "🧩",
    title: "Solve, build, and contribute",
    description:
      "Generate ideas, solve a real problem, prototype, align a team, strengthen collaboration, support a cause, preserve a story, or improve a shared space.",
    examples: ["teams", "innovation", "impact", "community"],
    href: "/for-organizations",
    cta: "Explore purposeful programs",
  },
  {
    icon: "🎁",
    title: "Surprise me",
    description:
      "Step outside your usual interests, combine unexpected worlds, try something nearby, choose by available time, or let KuKa curate the doorway.",
    examples: ["unexpected", "nearby", "beginner-safe", "curated"],
    href: "/experiences",
    cta: "Show me something different",
  },
];

const supportingFilters = [
  {
    icon: "👥",
    title: "Who are you with?",
    text: "Solo, friends, family, children, a partner, colleagues, visitors, a school group, or a private gathering.",
  },
  {
    icon: "⚡",
    title: "What is your energy?",
    text: "Quiet, gentle, calm but social, lively, high-energy, adventurous, beginner-safe, or low-pressure.",
  },
  {
    icon: "⏳",
    title: "How much time do you have?",
    text: "One hour, two to three hours, half a day, a full day, a weekend, a series, or an ongoing learning journey.",
  },
  {
    icon: "📍",
    title: "What practical conditions matter?",
    text: "Nearby, indoor, outdoor, workplace, school, home, online, accessible, screen-light, dietary, language, or budget needs.",
  },
];

function PageIcon({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="mb-6 flex justify-center">
      <span
        role="img"
        aria-label={label}
        className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-black/10 bg-white text-[2.7rem] leading-none shadow-sm"
      >
        {icon}
      </span>
    </div>
  );
}

export default function ExploreByMoodPage() {
  return (
    <div className="kk-page-root min-h-screen">
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <PageIcon icon="🧭" label="Mood and intent" />

          <p className="kk-page-label">Mood & Intent Taxonomy</p>

          <h1 className="kk-page-heading mx-auto mt-5 max-w-5xl">
            What do you feel like doing, experiencing, or gaining?
          </h1>

          <p className="kk-page-intro mx-auto mt-7 max-w-4xl">
            KuKa uses “mood” broadly. It can mean your current desire, energy,
            intention, or hoped-for experience — not only an emotion.
          </p>

          <p className="kk-body-large mx-auto mt-5 max-w-4xl">
            Start with what feels right. You can refine it later by who you are
            with, how much time you have, your energy, location, accessibility,
            season, weather, or occasion.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="#moods" className="kk-button-dark">
              Choose a Mood or Intent
            </Link>
            <Link href="/moments" className="kk-button-light">
              Explore Moments & Conditions
            </Link>
          </div>
        </div>
      </section>

      <section
        id="moods"
        className="kk-section-cream kk-section-padding scroll-mt-40"
      >
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label">Choose your starting point</p>
            <h2 className="kk-section-heading mt-5">
              Browse by intention, not by a heroic mega-list.
            </h2>
            <p className="kk-body-large mt-6">
              These twelve public doorways organize the richer internal
              taxonomy without making you decode KuKa’s entire architecture
              before finding something interesting.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {moodCards.map((mood) => (
              <article
                key={mood.title}
                className="kk-card kk-card--interactive min-h-[430px]"
              >
                <span
                  aria-hidden="true"
                  className="text-center text-5xl leading-none"
                >
                  {mood.icon}
                </span>

                <h3 className="kk-card-title mt-6 text-center">
                  {mood.title}
                </h3>

                <p className="kk-card-body mt-5 flex-1 text-center">
                  {mood.description}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {mood.examples.map((example) => (
                    <span key={example} className="kk-chip">
                      {example}
                    </span>
                  ))}
                </div>

                <Link
                  href={mood.href}
                  className="kk-button-on-light mt-8 self-center"
                >
                  {mood.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label">Refine the result</p>
            <h2 className="kk-section-heading mt-5">
              Your mood is a doorway, not the whole decision.
            </h2>
            <p className="kk-body-large mt-6">
              KuKa does not treat age, gender, relationship status, audience,
              occasion, participation style, or practical constraints as moods.
              They work as separate filters around the experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {supportingFilters.map((filter) => (
              <article
                key={filter.title}
                className="kk-card kk-card--interactive"
              >
                <span aria-hidden="true" className="text-4xl leading-none">
                  {filter.icon}
                </span>
                <h3 className="kk-card-title mt-5">{filter.title}</h3>
                <p className="kk-card-body mt-4">{filter.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="kk-panel mx-auto max-w-5xl text-center">
            <PageIcon icon="🌦️" label="Moments, seasons and conditions" />
            <p className="kk-section-label">Add the moment</p>
            <h2 className="kk-section-heading mx-auto mt-5 max-w-4xl">
              What you want becomes more useful when KuKa also understands what
              suits now.
            </h2>
            <p className="kk-body-large mx-auto mt-6 max-w-3xl">
              Combine a mood such as “slow down” with a moment such as “rainy
              afternoon,” “after work,” “festival week,” “school holidays,” or
              “I only have one hour.”
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/moments" className="kk-button-dark">
                Explore Moments & Conditions
              </Link>
              <Link href="/experiences" className="kk-button-light">
                Explore All Experiences
              </Link>
              <Link href="/contact" className="kk-button-light">
                Ask KuKa to Curate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
