export type VerticalStatus = "active" | "developing" | "future";

export type KukaVertical = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  status: VerticalStatus;
  href?: string;
  logoSrc: string;
  logoAlt: string;
  mark: string;
  audiences: string[];
  themes: string[];
};

export const kukaVerticals: KukaVertical[] = [
  {
    slug: "explore",
    name: "KuKa Explore",
    shortName: "Explore",
    tagline: "See places differently.",
    description:
      "Walks, trails, journeys, and place-based cultural experiences that reveal the stories, people, landscapes, and everyday life of a destination.",
    status: "active",
    href: "/kuka-universe/explore",
    logoSrc: "/images/verticals/kuka-explore.jpg",
    logoAlt: "KuKa Explore logo",
    mark: "🧭",
    audiences: [
      "Individuals",
      "Private groups",
      "Organizations",
      "Schools",
      "Visiting groups",
    ],
    themes: [
      "Cities",
      "Heritage",
      "Nature",
      "Travel",
      "Food",
      "Everyday life",
    ],
  },
  {
    slug: "circle",
    name: "KuKa Circle",
    shortName: "Circle",
    tagline: "Curiosity-led cultural learning for children.",
    description:
      "Screen-light, hands-on experiences where children make, move, play, question, reflect, and belong.",
    status: "active",
    href: "/kuka-universe/circle",
    logoSrc: "/images/verticals/kuka-circle.png",
    logoAlt: "KuKa Circle logo",
    mark: "🧩",
    audiences: [
      "Children",
      "Families",
      "Schools",
      "Homeschooling groups",
      "Institutions",
    ],
    themes: ["Play", "Making", "Culture", "Nature", "Stories", "Inquiry"],
  },
  {
    slug: "5-senses",
    name: "KuKa 5 Senses",
    shortName: "5 Senses",
    tagline: "Culture you can sense.",
    description:
      "Multisensory experiences built around taste, touch, scent, sound, and sight—and the memories and meanings they carry.",
    status: "active",
    href: "/kuka-universe/5-senses",
    logoSrc: "/images/verticals/kuka-5-senses-placeholder.svg",
    logoAlt: "Temporary KuKa 5 Senses logo",
    mark: "✨",
    audiences: [
      "Individuals",
      "Private groups",
      "Organizations",
      "Schools",
      "Hospitality partners",
    ],
    themes: [
      "Food",
      "Beverages",
      "Scent",
      "Sound",
      "Materials",
      "Visual culture",
    ],
  },
  {
    slug: "wellness",
    name: "KuKa Wellness",
    shortName: "Wellness",
    tagline: "Wellbeing through culture, creativity, and connection.",
    description:
      "Slow, embodied, and reflective experiences involving movement, nature, making, rest, sound, and community.",
    status: "developing",
    href: "/kuka-universe/wellness",
    logoSrc: "/images/verticals/kuka-wellness-placeholder.svg",
    logoAlt: "Temporary KuKa Wellness logo",
    mark: "🌿",
    audiences: [
      "Individuals",
      "Private groups",
      "Organizations",
      "Institutions",
    ],
    themes: [
      "Rest",
      "Movement",
      "Nature",
      "Reflection",
      "Sound",
      "Mindful making",
    ],
  },
  {
    slug: "ground",
    name: "The Ground by KuKa",
    shortName: "The Ground",
    tagline: "Outdoor, land-based, and immersive experiences.",
    description:
      "A future home for deeper outdoor learning, adventure, ecology, practical skills, and land-based experiences.",
    status: "future",
    logoSrc: "/images/verticals/the-ground.png",
    logoAlt: "The Ground by KuKa logo",
    mark: "⛰️",
    audiences: ["Individuals", "Groups", "Organizations"],
    themes: ["Outdoors", "Land", "Adventure", "Ecology"],
  },
  {
    slug: "chronicles",
    name: "KuKa Chronicles",
    shortName: "Chronicles",
    tagline: "Stories, archives, and cultural memory.",
    description:
      "KuKa’s editorial and documentation platform for stories, interviews, essays, films, field notes, and living archives.",
    status: "developing",
    logoSrc: "/images/verticals/kuka-chronicles.png",
    logoAlt: "KuKa Chronicles logo",
    mark: "📖",
    audiences: ["Readers", "Creators", "Researchers", "Communities"],
    themes: ["Stories", "Archives", "Memory", "Media"],
  },
  {
    slug: "exchange",
    name: "KuKa Exchange",
    shortName: "Exchange",
    tagline: "Culture across places and borders.",
    description:
      "Cultural exchanges connecting practitioners, communities, institutions, and ideas across regions and countries.",
    status: "future",
    logoSrc: "/images/verticals/kuka-exchange.png",
    logoAlt: "KuKa Exchange logo",
    mark: "🌍",
    audiences: [
      "Artists",
      "Institutions",
      "Travelers",
      "International partners",
    ],
    themes: ["Exchange", "Residencies", "Travel", "Collaboration"],
  },
  {
    slug: "digital",
    name: "KuKa Digital",
    shortName: "Digital",
    tagline: "Cultural participation beyond physical distance.",
    description:
      "Future digital formats, archives, and interactive cultural experiences designed without losing KuKa’s human character.",
    status: "future",
    logoSrc: "/images/verticals/kuka-digital.jpg",
    logoAlt: "KuKa Digital logo",
    mark: "💻",
    audiences: ["Remote participants", "Institutions", "Global communities"],
    themes: ["Digital culture", "Archives", "Learning", "Connection"],
  },
  {
    slug: "impact",
    name: "KuKa Impact",
    shortName: "Impact",
    tagline: "Culture as access, agency, and public good.",
    description:
      "Inclusive cultural programs created with NGOs, foundations, communities, schools, and social-impact partners.",
    status: "developing",
    logoSrc: "/images/verticals/kuka-impact-placeholder.svg",
    logoAlt: "Temporary KuKa Impact logo",
    mark: "🤝",
    audiences: [
      "NGOs",
      "Foundations",
      "CSR teams",
      "Schools",
      "Communities",
    ],
    themes: ["Access", "Inclusion", "Livelihoods", "Community"],
  },
];

export function getKukaVertical(slug: string) {
  return kukaVerticals.find((vertical) => vertical.slug === slug);
}
