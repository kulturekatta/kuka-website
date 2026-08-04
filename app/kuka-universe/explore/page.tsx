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
  title: "KuKa Explore | Culture-Led Walks, Trails & Journeys",
  description:
    "Discover KuKa Explore: city walks, cultural trails, nature experiences, day trips, getaways, and place-based journeys designed by KultureKatta.",
};

const vertical = getKukaVertical("explore")!;

const experiencePathways = [
  {
    icon: "🏛️",
    title: "Heritage & Hidden Histories",
    description:
      "Living-history walks, old neighborhoods, monuments, memory trails, archives, and the stories that conventional sightseeing often misses.",
  },
  {
    icon: "🍲",
    title: "Food & Neighborhood Culture",
    description:
      "Markets, regional foods, family-run establishments, food histories, kitchens, rituals, and the people behind what a place eats.",
  },
  {
    icon: "🌿",
    title: "Nature & Ecology",
    description:
      "Biodiversity walks, farms, gardens, rivers, forests, conservation stories, seasonal observation, and practical earth connection.",
  },
  {
    icon: "🏙️",
    title: "Art, Architecture & Design",
    description:
      "Street art, studios, built environments, design histories, public spaces, architecture, and creative neighborhoods.",
  },
  {
    icon: "🧳",
    title: "People & Everyday Life",
    description:
      "Local knowledge, occupations, languages, rituals, migration, transport, markets, and the ordinary details that make a place distinct.",
  },
  {
    icon: "🥾",
    title: "Outdoor Skills & Adventure",
    description:
      "Hiking, navigation, camping, nature skills, outdoor play, and responsible adventure designed with qualified partners where required.",
  },
];

const formats = [
  {
    title: "A Few Hours",
    description:
      "A focused walk, trail, tasting, neighborhood encounter, or place-based workshop within a city.",
  },
  {
    title: "A Full Day",
    description:
      "A layered city experience combining movement, stories, food, people, and hands-on participation.",
  },
  {
    title: "Day Trips",
    description:
      "Nearby cultural, ecological, craft, food, heritage, or outdoor discoveries beyond the city.",
  },
  {
    title: "Weekend Journeys",
    description:
      "Two-day experiences with a slower rhythm, local context, shared meals, and multiple activities.",
  },
  {
    title: "Longer Itineraries",
    description:
      "Multi-day routes built around culture, nature, makers, regional knowledge, and responsible travel.",
  },
  {
    title: "Armchair Travel",
    description:
      "Travel salons, listening rooms, demonstrations, films, stories, food, and sensory journeys without leaving the city.",
  },
];

const process = [
  {
    title: "Begin with the place",
    description:
      "We study its histories, people, routes, rhythms, ecology, living practices, and overlooked stories.",
  },
  {
    title: "Choose the experience lens",
    description:
      "Heritage, food, nature, architecture, craft, adventure, everyday life—or a thoughtful combination.",
  },
  {
    title: "Design participation",
    description:
      "The journey may include walking, tasting, observing, making, listening, meeting, documenting, or reflecting.",
  },
];

export default function KukaExplorePage() {
  return (
    <main className="kk-page-root min-h-screen">
      <VerticalHero
        name={vertical.name}
        tagline={vertical.tagline}
        description="Walks, trails, city discoveries, day trips, getaways, and culturally rooted journeys that make the nearby newly visible—and the unfamiliar more human."
        logoSrc={vertical.logoSrc}
        logoAlt={vertical.logoAlt}
        status={vertical.status}
        primaryLabel="Plan an Explore Experience"
        primaryHref="/contact"
        secondaryLabel="View All Experiences"
        secondaryHref="/experiences"
      />

      <VerticalIntro
        label="What KuKa Explore is"
        title="Discovery with context—not checklist tourism."
        paragraphs={[
          "KuKa Explore is for people who want to understand a place rather than merely pass through it. Experiences are built around local knowledge, stories, landscapes, practices, people, and everyday life.",
          "A KuKa journey may be playful, reflective, sensory, adventurous, scholarly, or social—but it should always help participants notice more, participate more, and leave with a deeper relationship to place.",
        ]}
        principles={[
          "Locally rooted",
          "Small-group",
          "Participatory",
          "Context-led",
          "Responsible",
          "Adaptable",
        ]}
      />

      <VerticalExperienceGrid
        label="Ways to explore"
        title="A place can be entered through many doorways."
        description="KuKa Explore can begin with one lens or combine several into a layered experience."
        items={experiencePathways}
      />

      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="kk-panel grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="kk-section-label">What it is not</p>
              <h2 className="kk-section-heading mt-5">
                Not tourism with a KuKa sticker on it.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Not rushed sightseeing",
                "Not generic package tours",
                "Not context-free photo stops",
                "Not extractive cultural display",
                "Not adventure without safety",
                "Not identical in every city",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg font-semibold leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VerticalFormats
        label="Journey lengths"
        title="From one curious afternoon to a deeper journey."
        description="Formats can be adapted to the place, purpose, group, season, and level of immersion."
        items={formats}
      />

      <VerticalAudience
        title="For locals, visitors, groups, and institutions."
        description="An Explore experience can be public, private, educational, organizational, or designed for a visiting delegation."
        audiences={vertical.audiences}
      />

      <VerticalProcess
        title="We turn a location into a participatory cultural experience."
        description="Every route is shaped by purpose and context—not simply by a list of attractions."
        items={process}
      />

      <VerticalCTA
        title="Bring us a place, a group, or a reason to explore."
        description="We can shape a private trail, visiting-group experience, organizational outing, educational journey, day trip, or custom cultural itinerary."
        primaryLabel="Plan an Explore Experience"
        primaryHref="/contact"
        secondaryLabel="For Organizations"
        secondaryHref="/for-organizations"
      />
    </main>
  );
}
