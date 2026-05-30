"use client";

import Link from "next/link";
import { useState } from "react";

const experienceTypes = [
  {
    label: "Make",
    title: "For the hands-on humans",
    emoji: "🎨",
    text: "Pottery, paper cutting, kokedama, textiles, printmaking, perfume, candles, messy tables and very proud takeaways.",
  },
  {
    label: "Walk",
    title: "For the city wanderers",
    emoji: "🧭",
    text: "Heritage walks, food trails, nature walks, neighbourhood stories and routes that make familiar places feel slightly magical again.",
  },
  {
    label: "Taste",
    title: "For the hungry curious",
    emoji: "🍲",
    text: "Food labs, tasting tables, coffee rituals, fermentation experiments and gatherings where culture lands directly on your plate.",
  },
  {
    label: "Listen",
    title: "For the story collectors",
    emoji: "🎙️",
    text: "Music kattas, listening rooms, oral histories, storytelling nights, poetry circles and conversations that stay with you.",
  },
  {
    label: "Play",
    title: "For the grown-up children",
    emoji: "🤹",
    text: "Traditional games, juggling, puzzles, movement, play labs and beautifully unserious things that are secretly very good for the soul.",
  },
  {
    label: "Wonder",
    title: "For the question askers",
    emoji: "🪐",
    text: "Science, philosophy, art history, mythology, astronomy, strange facts, big questions and tiny revelations.",
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
  "Join a food experience where every bite has a backstory.",
  "Pick a conversation that makes your brain do a tiny cartwheel.",
  "Choose a play-based Katta. Serious adults need silly rituals too.",
  "Find a slow gathering. Your nervous system may send a thank-you note.",
];

const sampleKattas = [
  {
    eyebrow: "Hands-on",
    title: "Make a Thing, Keep a Story",
    text: "Small-format maker workshops where you leave with something tangible — a plant, a pot, a print, a poem, a strange new confidence.",
  },
  {
    eyebrow: "Walks & Trails",
    title: "The City Has Been Waiting to Gossip",
    text: "Neighbourhood walks, hidden histories, food trails, architecture trails and memory maps for people who like places with personality.",
  },
  {
    eyebrow: "Talks & Salons",
    title: "Big Ideas, Small Rooms",
    text: "Warm, intimate conversations around culture, science, philosophy, art, books, ecology, identity and the mildly dramatic business of being human.",
  },
  {
    eyebrow: "Food & Senses",
    title: "Taste, Smell, Listen, Notice",
    text: "Sensory gatherings, food stories, coffee rituals, fermentation labs and tasting sessions where your senses finally get promoted.",
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
    <main className="min-h-screen bg-[#FAF7F2] text-[#17110D]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#17110D] px-6 py-24 text-[#FAF7F2] sm:px-10 lg:px-16">
        <div className="absolute left-8 top-8 hidden h-24 w-24 rounded-full border border-[#D8B98C]/30 lg:block" />
        <div className="absolute bottom-10 right-10 hidden h-40 w-40 rounded-full bg-[#8A4B2A]/30 blur-3xl lg:block" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#D8B98C]">
              Explore Experiences
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Pick a rabbit hole.
              <br />
              We’ll bring the culture.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#E8D8C4]">
              KultureKatta experiences are small, warm, participatory gatherings
              where you make, walk, taste, listen, play, question, and leave
              with a story. Sometimes with a plant. Sometimes with flour on
              your sleeve. Occasionally with a new obsession.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-[#FAF7F2] px-8 py-4 text-center text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#D8B98C]"
              >
                Plan a Katta with us
              </Link>

              <Link
                href="#curiosity-generator"
                className="rounded-full border border-[#D8B98C] px-8 py-4 text-center text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#D8B98C] hover:text-[#17110D]"
              >
                I’m feeling curious
              </Link>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-[#3A2A20] bg-[#211812] p-6 shadow-2xl">
            <div className="rounded-[2rem] bg-[#FAF7F2] p-6 text-[#17110D]">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8A4B2A]">
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
                    className="rounded-2xl border border-[#E7D8C6] bg-[#FFFDF8] px-5 py-4 text-lg font-black"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-6 text-[#5C4638]">
                Choose one. Or become all six. We are not here to limit your
                cultural chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE TYPES */}
      <section className="bg-[#FFF7EA] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8A4B2A]">
              Doors into KuKa
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Don’t browse by category.
              <br />
              Browse by instinct.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#5C4638]">
              Some people come to make. Some come to walk. Some come because
              they saw the word “fermentation” and felt personally summoned.
              All are valid entry points.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experienceTypes.map((item) => (
              <div
                key={item.title}
                className="group rounded-[2rem] border border-[#E8D4BC] bg-[#FFFDF8] p-7 transition hover:-translate-y-1 hover:border-[#8A4B2A] hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-5xl">{item.emoji}</span>

                  <span className="rounded-full bg-[#17110D] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FAF7F2]">
                    {item.label}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-black">{item.title}</h3>

                <p className="mt-4 leading-7 text-[#5C4638]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOOD GRID */}
      <section className="bg-[#F8DDE3] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8A4B2A]">
              Explore by mood
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              What kind of curious are you today?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5C4638]">
              No pressure to know what you want. Most good things begin with a
              vague feeling and a questionable decision to leave the house.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {moodCards.map((mood, index) => (
              <div
                key={mood}
                className="rounded-[2rem] border border-[#E5B7C3] bg-[#FFF8F5] p-6 shadow-sm transition hover:-rotate-1 hover:scale-[1.02] hover:shadow-xl"
              >
                <p className="text-sm font-black text-[#8A4B2A]">
                  0{index + 1}
                </p>

                <h3 className="mt-4 text-xl font-black leading-snug">
                  {mood}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURIOSITY GENERATOR */}
      <section
        id="curiosity-generator"
        className="bg-[#24131A] px-6 py-24 text-[#FAF7F2] sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#D8B98C]">
              Tiny chaos machine
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              The “I’m Feeling Curious” button
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#DCCAB6]">
              For days when you don’t know what you want — only that you want
              life to feel a little less copy-paste.
            </p>

            <button
              type="button"
              onClick={handleCuriousClick}
              className="mt-8 rounded-full bg-[#D8B98C] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#FAF7F2]"
            >
              Shuffle my curiosity
            </button>
          </div>

          <div className="rounded-[2.5rem] border border-[#5A2F3C] bg-[#321B24] p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#D8B98C]">
              Your KuKa prescription
            </p>

            <h3 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">
              {curiousPick}
            </h3>

            <p className="mt-6 leading-7 text-[#DCCAB6]">
              Side effects may include: new friends, sudden hobbies, better
              weekends, fewer doom-scroll spirals, and the occasional urge to
              tell everyone, “You had to be there.”
            </p>
          </div>
        </div>
      </section>

      {/* SAMPLE KATTAS */}
      <section className="bg-[#EFE2D0] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8A4B2A]">
              What you’ll find here
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Not events.
              <br />
              Little cultural adventures.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {sampleKattas.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-[#D7BFA2] bg-[#FFFDF8] p-8"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8A4B2A]">
                  {item.eyebrow}
                </p>

                <h3 className="mt-4 text-3xl font-black">{item.title}</h3>

                <p className="mt-4 leading-7 text-[#5C4638]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFF7EA] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#8A4B2A] p-10 text-center text-[#FAF7F2] shadow-xl sm:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F2D9B8]">
            Coming alive soon
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            The calendar is brewing.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#F7E8D6]">
            We’re building a warmer way to discover Kattas by mood, city,
            format, curiosity level, and whether you are willing to get clay
            under your nails.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-[#FAF7F2] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#D8B98C]"
            >
              Tell us what you want
            </Link>

            <a
              href="https://wa.me/919730244996"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#FAF7F2] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#17110D]"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}