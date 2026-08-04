import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Moments, Seasons & Conditions | KultureKatta",
  description:
    "Discover KuKa possibilities shaped by season, weather, time of day, cultural calendars, natural windows, and the time you have available.",
};

const momentCards = [
  {
    icon: "🍂",
    title: "Seasonal rhythms",
    question: "What suits this season?",
    text: "Monsoon, summer, cooler months, flowering and growing seasons, harvest periods, school vacations, and the changing character of a place.",
    examples: ["monsoon", "summer", "cooler months", "flowering"],
  },
  {
    icon: "🌦️",
    title: "Weather conditions",
    question: "What becomes possible because of the weather?",
    text: "Rain-enhanced, heat-safe, clear-sky, windy, misty, indoor, outdoor, or weather-sensitive experiences with appropriate alternatives.",
    examples: ["rainy and cozy", "clear and outdoorsy", "keep me indoors"],
  },
  {
    icon: "🌅",
    title: "Time of day",
    question: "When does the experience feel most alive?",
    text: "Dawn, morning, afternoon, golden hour, sunset, evening, after dark, overnight, or a flexible window.",
    examples: ["before breakfast", "after work", "at sunset", "after dark"],
  },
  {
    icon: "🪔",
    title: "Calendar and cultural moments",
    question: "What is the calendar asking us to notice?",
    text: "Festivals, regional calendars, new year, year-end, heritage weeks, local fairs, graduation, wedding season, and other shared occasions.",
    examples: ["festival week", "year-end", "heritage week", "graduation"],
  },
  {
    icon: "🦋",
    title: "Natural and ephemeral windows",
    question: "What is here briefly?",
    text: "First rain, flowering, fruiting, harvest, migration, firefly activity, clear skies, meteor showers, lunar phases, tides, fog, and other natural cycles.",
    examples: ["first rain", "fireflies", "meteor shower", "full moon"],
  },
  {
    icon: "⏳",
    title: "The time you have",
    question: "How much space is there in your day?",
    text: "One hour, a free afternoon, an after-work window, one full day, a weekend, a short getaway, a series, or a recurring ritual.",
    examples: ["one hour", "free afternoon", "full day", "weekend"],
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Personal and social moments",
    question: "What is happening in your life right now?",
    text: "Visitors in town, children on vacation, relatives visiting, a reunion, a transition, a quiet holiday, a family ritual, or reconnecting after time apart.",
    examples: ["guests visiting", "school holiday", "reunion", "new ritual"],
  },
  {
    icon: "🏢",
    title: "Institutional rhythms",
    question: "What does the organization or learning calendar need?",
    text: "Onboarding periods, offsite season, financial-year close, academic milestones, post-deadline restoration, cultural weeks, and team transitions.",
    examples: ["onboarding", "offsite", "year close", "academic calendar"],
  },
];

const weatherRelationships = [
  {
    icon: "🏠",
    title: "Weather-independent",
    text: "Indoor workshops, salons, games, film conversations, listening rooms, storytelling, cooking, and repair sessions that can run in most conditions.",
  },
  {
    icon: "🌧️",
    title: "Weather-enhanced",
    text: "Experiences that become richer because of rain, mist, cool weather, wind, clouds, seasonal food, or changing light.",
  },
  {
    icon: "🔭",
    title: "Weather-dependent",
    text: "Experiences that genuinely require a natural condition, such as clear-sky astronomy, firefly observation, flowering, migration, tides, or harvest activity.",
  },
  {
    icon: "🥾",
    title: "Weather-sensitive",
    text: "Outdoor programs such as hiking, farm visits, river walks, cycling, games, and wilderness activity that run only within defined safe limits.",
  },
];

const discoveryExamples = [
  {
    mood: "I want to slow down",
    moment: "It is raining and I have Sunday afternoon free",
    result:
      "A rain listening session, monsoon poetry and chai, mindful making, cloud journaling, or an indoor sensory table.",
  },
  {
    mood: "I want to explore",
    moment: "The morning is cool and I have three hours",
    result:
      "A sunrise heritage walk, birding trail, neighborhood breakfast route, market-awakening walk, or city sketch expedition.",
  },
  {
    mood: "I want to celebrate",
    moment: "A festival is approaching and several generations are gathering",
    result:
      "A food-and-memory table, regional games, oral-history circle, craft tradition, music session, or family ritual-making experience.",
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

export default function MomentsPage() {
  return (
    <main className="kk-page-root min-h-screen">
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <PageIcon icon="🌦️" label="Moments, seasons and conditions" />

          <p className="kk-page-label">Moments, Seasons & Conditions</p>

          <h1 className="kk-page-heading mx-auto mt-5 max-w-5xl">
            What suits this particular time and situation?
          </h1>

          <p className="kk-page-intro mx-auto mt-7 max-w-4xl">
            Some experiences make sense because of the season, weather, time of
            day, cultural calendar, natural world, or the small window you have
            available.
          </p>

          <p className="kk-body-large mx-auto mt-5 max-w-4xl">
            This layer helps KuKa notice what is happening around you now —
            without pretending that every natural phenomenon, date, or
            experience is always available on demand.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="#moments" className="kk-button-dark">
              Explore the Moment
            </Link>
            <Link href="/moods" className="kk-button-light">
              Start With a Mood
            </Link>
          </div>
        </div>
      </section>

      <section
        id="moments"
        className="kk-section-cream kk-section-padding scroll-mt-40"
      >
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label">Made for this moment</p>
            <h2 className="kk-section-heading mt-5">
              Eight ways context can shape a KuKa experience.
            </h2>
            <p className="kk-body-large mt-6">
              These are not separate KuKa verticals or replacements for the
              experience families. They are contextual lenses that can work
              across workshops, walks, food, music, wellness, play, learning,
              private gatherings, and organization programs.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {momentCards.map((moment) => (
              <article
                key={moment.title}
                className="kk-card kk-card--interactive min-h-[450px]"
              >
                <span
                  aria-hidden="true"
                  className="text-center text-5xl leading-none"
                >
                  {moment.icon}
                </span>

                <h3 className="kk-card-title mt-6 text-center">
                  {moment.title}
                </h3>

                <p className="mt-4 text-center font-semibold leading-relaxed text-[var(--kk-text)]">
                  {moment.question}
                </p>

                <p className="kk-card-body mt-4 flex-1 text-center">
                  {moment.text}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {moment.examples.map((example) => (
                    <span key={example} className="kk-chip">
                      {example}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label">Mood + Moment</p>
            <h2 className="kk-section-heading mt-5">
              One tells us what you want. The other tells us what fits now.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {discoveryExamples.map((example) => (
              <article key={example.mood} className="kk-card">
                <p className="kk-card-label">Mood</p>
                <h3 className="kk-card-title mt-3">{example.mood}</h3>

                <p className="kk-card-label mt-7">Moment</p>
                <p className="kk-card-body mt-3">{example.moment}</p>

                <div className="kk-card-footer mt-7">
                  <p className="kk-card-label">Possible result</p>
                  <p className="kk-card-body mt-3">{example.result}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label">Weather relationship</p>
            <h2 className="kk-section-heading mt-5">
              “Seasonal” does not mean careless about conditions.
            </h2>
            <p className="kk-body-large mt-6">
              KuKa distinguishes between experiences that can run anywhere,
              those enriched by conditions, those that require a particular
              natural window, and those that need strict safety limits.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {weatherRelationships.map((relationship) => (
              <article
                key={relationship.title}
                className="kk-card kk-card--interactive"
              >
                <span aria-hidden="true" className="text-4xl leading-none">
                  {relationship.icon}
                </span>
                <h3 className="kk-card-title mt-5">
                  {relationship.title}
                </h3>
                <p className="kk-card-body mt-4">{relationship.text}</p>
              </article>
            ))}
          </div>

          <div className="kk-panel mx-auto mt-8 max-w-5xl">
            <p className="kk-card-label">Our promise</p>
            <h3 className="kk-card-title mt-4">
              We promise the guided act of looking, learning, making, and
              noticing — not a guaranteed spectacle.
            </h3>
            <p className="kk-body mt-5">
              Wildlife sightings, flowering, meteor visibility, rainfall,
              migration, tides, or other natural phenomena cannot always be
              guaranteed. Weather-sensitive experiences need clear ideal,
              acceptable, and unsafe conditions, plus an alternate, reschedule,
              relocation, or cancellation plan.
            </p>
          </div>
        </div>
      </section>

      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="kk-panel mx-auto max-w-5xl text-center">
            <PageIcon icon="✨" label="Best experienced now" />
            <p className="kk-section-label">Here briefly</p>
            <h2 className="kk-section-heading mx-auto mt-5 max-w-4xl">
              Ask KuKa what may be especially meaningful right now.
            </h2>
            <p className="kk-body-large mx-auto mt-6 max-w-3xl">
              At this stage, seasonal and moment-led ideas may lead to a custom
              concept or inquiry rather than implying that every option is
              already scheduled and bookable.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="kk-button-dark">
                Ask KuKa to Curate
              </Link>
              <Link href="/moods" className="kk-button-light">
                Combine With a Mood
              </Link>
              <Link href="/experiences" className="kk-button-light">
                Explore Experiences
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
