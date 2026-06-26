"use client";

import Link from "next/link";
import { useState } from "react";

const experienceTypes = [
  {
    label: "Workshops",
    title: "Explore workshops",
    emoji: "🎨",
    text: "Art, craft, pottery, kokedama, kirigami, textiles, paper crafts and other hands-on experiences where you make something with your hands.",
  },
  {
    label: "Walks",
    title: "Explore walks",
    emoji: "🧭",
    text: "Heritage walks, food trails, nature walks, neighbourhood stories and routes that make familiar places feel fresh, layered and alive.",
  },
  {
    label: "Talks",
    title: "Explore talks",
    emoji: "🗣️",
    text: "Warm, intimate sessions around culture, science, philosophy, art, books, ecology, identity and the wonderfully strange business of being human.",
  },
  {
    label: "Senses",
    title: "Explore the senses",
    emoji: "🍲",
    text: "Food stories, coffee rituals, tasting tables, sound, scent, texture and sensory experiences where culture is felt, not just understood.",
  },
  {
    label: "Games",
    title: "Explore games",
    emoji: "🎲",
    text: "Traditional games, puzzles, juggling, playful challenges and beautifully unserious formats that bring people together without the stiff-chair energy.",
  },
  {
    label: "Stories",
    title: "Explore stories",
    emoji: "📖",
    text: "Storytelling nights, oral histories, poetry circles, listening rooms, memory-led sessions and conversations that stay with you after you leave.",
  },
];

const moodCards = [
  "I want to make something with my hands",
  "I want to meet people without networking",
  "I want to leave my house but not my personality",
  "I want to learn something strange and specific",
  "I want a slow Sunday with meaning",
  "I want culture without the stiff-chair energy",
  "I want to walk, notice, and eavesdrop on history",
  "I want to eat my way into knowledge",
  "I want to feel like a child, but with better coffee",
];

const curiousPrompts = [
  "Try a workshop where you make something imperfect and love it anyway.",
  "Go for a walk where the city becomes the main character.",
  "Join a sensory experience where every bite, sound, scent or texture has a backstory.",
  "Pick a talk that makes your brain do a tiny cartwheel.",
  "Choose a play-based Katta. Serious adults need silly rituals too.",
  "Find a story-led gathering. Your inner listener may send a thank-you note.",
];

const sampleKattas = [
  {
    eyebrow: "Workshops",
    title: "Make something with your hands",
    text: "Hands-on cultural workshops where you learn by doing — pottery, kokedama, kirigami, textiles, paper crafts, art forms, maker labs and other tactile experiences.",
  },
  {
    eyebrow: "Walks",
    title: "Step into the story of a place",
    text: "Heritage walks, food trails, nature walks, neighbourhood routes and city explorations that make familiar places feel layered, alive and full of gossip.",
  },
  {
    eyebrow: "Talks",
    title: "Sit with an idea for a while",
    text: "Intimate talks, salons and expert-led conversations around culture, science, books, art, philosophy, ecology, history and the strange beauty of everyday life.",
  },
  {
    eyebrow: "The Senses",
    title: "Taste, smell, listen, notice",
    text: "Food stories, coffee rituals, tasting tables, sound-led gatherings, scent-based sessions and sensory experiences where culture is felt, not just understood.",
  },
  {
    eyebrow: "Games",
    title: "Play your way into culture",
    text: "Traditional games, puzzles, juggling, playful challenges, strategy sessions and interactive formats that bring people together without making it awkward.",
  },
  {
    eyebrow: "Stories",
    title: "Listen, remember, retell",
    text: "Storytelling nights, oral histories, poetry circles, book-led gatherings, memory sessions and narrative experiences that stay with you after you leave.",
  },
];

export default function ExperiencesPage() {
  const [curiousPick, setCuriousPick] = useState(curiousPrompts[0]);

  const handleCuriousClick = () => {
    let next = curiousPick;

    while (next === curiousPick) {
      next = curiousPrompts[Math.floor(Math.random() * curiousPrompts.length)];
    }

    setCuriousPick(next);
  };

  return (
    <main className="min-h-screen kk-section-light">
      {/* HERO */}
      <section className="relative overflow-hidden kk-section-dark px-6 pb-20 pt-14 sm:px-10 lg:px-16">
        <div className="absolute bottom-10 right-10 hidden h-40 w-40 rounded-full bg-[#8A4B2A]/30 blur-3xl lg:block" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="mt-0">
            <p className="kk-section-label text-[#D8B98C]">
              Explore Experiences
            </p>

            <h1 className="kk-page-heading mt-6 max-w-4xl leading-[0.95]">
              Pick a rabbit hole.
              <br />
              We’ll bring the culture.
            </h1>

            <p className="kk-body mt-8 max-w-2xl text-lg text-[#E8D8C4]">
              KultureKatta experiences are small, warm, participatory gatherings
              where you make, walk, taste, listen, play, question, and leave
              with a story. Sometimes with a plant. Sometimes with flour on
              your sleeve. Occasionally with a new obsession.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="kk-button-dark-outline">
                Plan a Katta with us
              </Link>

              <Link href="#curiosity-generator" className="kk-button-dark-outline">
                I’m feeling curious
              </Link>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/15 bg-white/[0.04] p-6 shadow-2xl">
            <div className="rounded-[2rem] bg-background p-6 text-foreground">
              <p className="kk-eyebrow text-[#8A4B2A]">
                Today’s possible personality
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "urban explorer",
                  "clay philosopher",
                  "coffee archaeologist",
                  "bookish goblin",
                  "heritage detective",
                  "plant parent in training",
                ].map((item) => (
                  <div
                    key={item}
                    className="kk-card-title rounded-2xl border border-[#E7D8C6] bg-[#FFFDF8] px-5 py-4"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="kk-small-text mt-6 text-[#5C4638]">
                Choose one. Or become all six. We are not here to limit your
                cultural chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE TYPES */}
      <section className="kk-section-light px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label text-[#8A4B2A]">Doors into KuKa</p>

            <h2 className="kk-section-heading mt-4">
              Browse by the kind of experience you want.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-2xl text-[#5C4638]">
              Start with what you feel like doing — making, walking, talking,
              tasting, playing, or listening to stories. KuKa has many doors;
              choose the one that calls you in first.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experienceTypes.map((item) => (
              <div
                key={item.title}
                className="group rounded-[2rem] border border-[#E8D4BC] bg-[#FFFDF8] p-7 text-center transition hover:-translate-y-1 hover:border-[#8A4B2A] hover:shadow-xl"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <span className="text-5xl">{item.emoji}</span>

                  <span className="kk-eyebrow rounded-full bg-[#2A1E19] px-4 py-2 text-[#FAF7F2]">
                    {item.label}
                  </span>
                </div>

                <h3 className="kk-card-title mt-8">{item.title}</h3>

                <p className="kk-body mx-auto mt-4 max-w-sm text-[#5C4638]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOOD GRID */}
      <section className="kk-section-cream px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="kk-section-label text-[#8A4B2A]">Explore by mood</p>

            <h2 className="kk-section-heading mt-4">
              What kind of curious are you today?
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-2xl text-[#5C4638]">
              No pressure to know what you want. Most good things begin with a
              vague feeling and a questionable decision to leave the house.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {moodCards.map((mood, index) => (
              <div
                key={mood}
                className="rounded-[2rem] border border-[#E8D4BC] bg-[#FFFDF8] p-6 text-center shadow-sm transition hover:-rotate-1 hover:scale-[1.02] hover:shadow-xl"
              >
                <p className="kk-small-text font-semibold text-[#8A4B2A]">
                  0{index + 1}
                </p>

                <h3 className="kk-card-title mt-4 leading-snug">{mood}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURIOSITY GENERATOR */}
      <section
        id="curiosity-generator"
        className="kk-section-dark px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="kk-section-label text-[#D8B98C]">
              Tiny chaos machine
            </p>

            <h2 className="kk-section-heading mt-4">
              The “I’m Feeling Curious” button
            </h2>

            <p className="kk-body mt-6 text-[#DCCAB6]">
              For days when you don’t know what you want — only that you want
              life to feel a little less copy-paste.
            </p>

            <button
              type="button"
              onClick={handleCuriousClick}
              className="kk-button-dark-outline mt-8"
            >
              Shuffle my curiosity
            </button>
          </div>

          <div className="rounded-[2.5rem] border border-white/15 bg-white/[0.04] p-8">
            <p className="kk-eyebrow text-[#D8B98C]">
              Your KuKa prescription
            </p>

            <h3 className="kk-section-heading mt-6 leading-tight">
              {curiousPick}
            </h3>

            <p className="kk-body mt-6 text-[#DCCAB6]">
              Side effects may include: new friends, sudden hobbies, better
              weekends, fewer doom-scroll spirals, and the occasional urge to
              tell everyone, “You had to be there.”
            </p>
          </div>
        </div>
      </section>

      {/* SAMPLE KATTAS */}
      <section className="kk-section-light px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label text-[#8A4B2A]">
              What you’ll find here
            </p>

            <h2 className="kk-section-heading mt-4">
              Not events.
              <br />
              Little cultural adventures.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleKattas.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-[#E8D4BC] bg-[#FFFDF8] p-8 text-center"
              >
                <p className="kk-eyebrow text-[#8A4B2A]">{item.eyebrow}</p>

                <h3 className="kk-card-title mt-4">{item.title}</h3>

                <p className="kk-body mx-auto mt-4 max-w-sm text-[#5C4638]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="kk-section-cream px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] kk-section-dark p-10 text-center shadow-xl sm:p-14">
          <p className="kk-section-label text-[#F2D9B8]">Coming alive soon</p>

          <h2 className="kk-section-heading mt-4">The calendar is brewing.</h2>

          <p className="kk-body mx-auto mt-6 max-w-2xl text-[#F7E8D6]">
            We’re building a warmer way to discover Kattas by mood, city,
            format, curiosity level, and whether you are willing to get clay
            under your nails.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="kk-button-dark-outline">
              Tell us what you want
            </Link>

            <a
              href="https://wa.me/919730244996"
              target="_blank"
              rel="noreferrer"
              className="kk-button-dark-outline"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}