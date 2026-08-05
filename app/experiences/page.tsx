"use client";

import Link from "next/link";
import { useState } from "react";

const experienceTypes = [
  {
    label: "Workshops",
    title: "Explore workshops",
    emoji: "🎨",
    text: "Art, craft, pottery, kokedama, kirigami, textiles, paper crafts and other hands-on experiences where you make something with your hands.",
    href: "/experiences/workshops",
  },
  {
    label: "Food & Senses",
    title: "Explore food and the senses",
    emoji: "🍲",
    text: "Food stories, coffee rituals, tasting tables, baking, fermentation, scent, texture and sensory experiences where culture is felt, not just understood.",
    href: "/experiences/food",
  },
  {
    label: "Walks & Trails",
    title: "Explore walks and trails",
    emoji: "🧭",
    text: "Heritage walks, food trails, nature walks, neighbourhood stories and routes that make familiar places feel fresh, layered and alive.",
    href: "/experiences/walks",
  },
  {
    label: "Talks & Salons",
    title: "Explore talks and salons",
    emoji: "🗣️",
    text: "Warm, intimate sessions around culture, science, philosophy, art, books, ecology, identity and the wonderfully strange business of being human.",
    href: "/experiences/talks",
  },
  {
    label: "Words & Open Mics",
    title: "Explore words and open mics",
    emoji: "🎙️",
    text: "Writing circles, poetry, book clubs, storytelling, spoken word and language-led gatherings for readers, writers, performers and listeners.",
    href: "/experiences/words",
  },
  {
    label: "Music & Sound",
    title: "Explore music and sound",
    emoji: "🎵",
    text: "Listening rooms, singing circles, songwriting, jam sessions, sound journeys and musical gatherings that invite you to hear more deeply.",
    href: "/experiences/sound",
  },
  {
    label: "Stories & Screen",
    title: "Explore stories and screen",
    emoji: "🎬",
    text: "Theatre, film, documentaries, puppetry, oral histories, visual storytelling and narrative experiences that stay with you after you leave.",
    href: "/experiences/stories",
  },
  {
    label: "Dance & Movement",
    title: "Explore dance and movement",
    emoji: "💃",
    text: "Dance, rhythm, flow arts, embodied storytelling, physical theatre and movement-led experiences where culture lives in the body.",
    href: "/experiences/movement",
  },
  {
    label: "Games & Play",
    title: "Explore games and play",
    emoji: "🎲",
    text: "Traditional games, puzzles, juggling, playful challenges and beautifully unserious formats that bring people together without the stiff-chair energy.",
    href: "/experiences/games",
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
    <div className="kk-page-root min-h-screen kk-section-light">
      {/* HERO */}
      <section className="relative overflow-hidden kk-section-light px-6 pb-20 pt-14 sm:px-10 lg:px-16">
        <div className="absolute bottom-10 right-10 hidden h-40 w-40 rounded-full bg-[var(--kk-accent)]/10 blur-3xl lg:block" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="mt-0">
            <p className="kk-page-label text-[var(--kk-accent)]">
              Explore Experiences
            </p>

            <h1 className="kk-page-heading mt-6 max-w-4xl">
              Pick a rabbit hole.
              <br />
              We’ll bring the culture.
            </h1>

            <p className="kk-page-intro mt-8 max-w-2xl">
              KultureKatta experiences are small, warm, participatory gatherings
              where you make, walk, taste, listen, play, question, and leave
              with a story. Sometimes with a plant. Sometimes with flour on your
              sleeve. Occasionally with a new obsession.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="kk-button-light">
                Plan a Katta with us
              </Link>

              <Link href="#curiosity-generator" className="kk-button-light">
                I’m feeling curious
              </Link>
            </div>
          </div>

          <div className="kk-card">
            <div className="rounded-[2rem] bg-background p-6 text-foreground">
              <p className="kk-eyebrow">Today’s possible personality</p>

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
                    className="kk-card kk-card--compact kk-card-title"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="kk-small-text mt-6">
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
            <p className="kk-section-label">Doors into KuKa</p>

            <h2 className="kk-section-heading mt-4">
              Browse by the kind of experience you want.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-2xl">
              Start with what you feel like doing — making, walking, talking,
              tasting, playing, or listening to stories. KuKa has many doors;
              choose the one that calls you in first.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experienceTypes.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="kk-card kk-card--centered kk-card--interactive group"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <span className="text-5xl">{item.emoji}</span>

                  <span className="kk-badge rounded-full bg-[var(--kk-dark)] px-4 py-2">
                    {item.label}
                  </span>
                </div>

                <h3 className="kk-card-title mt-8">{item.title}</h3>

                <p className="kk-card-body mx-auto mt-4 max-w-sm">
                  {item.text}
                </p>

                <span className="kk-link-dark mt-6">View category</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MOOD GRID */}
      <section className="kk-section-cream px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="kk-section-label">Explore by mood</p>

            <h2 className="kk-section-heading mt-4">
              What kind of curious are you today?
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-2xl">
              No pressure to know what you want. Most good things begin with a
              vague feeling and a questionable decision to leave the house.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {moodCards.map((mood, index) => (
              <div
                key={mood}
                className="kk-card kk-card--compact kk-card--centered kk-card--interactive"
              >
                <p className="kk-card-number">0{index + 1}</p>

                <h3 className="kk-card-title mt-4">{mood}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURIOSITY GENERATOR */}
      <section
        id="curiosity-generator"
        className="kk-section-light px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="kk-section-label">Tiny chaos machine</p>

            <h2 className="kk-section-heading mt-4">
              The “I’m Feeling Curious” button
            </h2>

            <p className="kk-body mt-6">
              For days when you don’t know what you want — only that you want
              life to feel a little less copy-paste.
            </p>

            <button
              type="button"
              onClick={handleCuriousClick}
              className="kk-button-light mt-8"
            >
              Shuffle my curiosity
            </button>
          </div>

          <div className="kk-card">
            <p className="kk-card-label">Your KuKa prescription</p>

            <h3 className="kk-card-title mt-6">{curiousPick}</h3>

            <p className="kk-card-body mt-6">
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
            <p className="kk-section-label">What you’ll find here</p>

            <h2 className="kk-section-heading mt-4">
              Not events.
              <br />
              Little cultural adventures.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleKattas.map((item) => (
              <div key={item.title} className="kk-card kk-card--centered">
                <p className="kk-card-label">{item.eyebrow}</p>

                <h3 className="kk-card-title mt-4">{item.title}</h3>

                <p className="kk-card-body mx-auto mt-4 max-w-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="kk-section-cream px-6 py-24 sm:px-10 lg:px-16">
        <div className="kk-panel mx-auto max-w-5xl text-center">
          <p className="kk-section-label">Coming alive soon</p>

          <h2 className="kk-section-heading mt-4">The calendar is brewing.</h2>

          <p className="kk-body mx-auto mt-6 max-w-2xl">
            We’re building a warmer way to discover Kattas by mood, city,
            format, curiosity level, and whether you are willing to get clay
            under your nails.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="kk-button-light">
              Tell us what you want
            </Link>

            <a
              href="https://wa.me/919730244996"
              target="_blank"
              rel="noreferrer"
              className="kk-button-light"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
