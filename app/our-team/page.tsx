import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import IconLead from "../components/IconLead";

export const metadata: Metadata = {
  title: "Our Team | KultureKatta",
  description:
    "Meet the small, curious team behind KultureKatta — Vidula, Anwesha, and Neha.",
  alternates: {
    canonical: "/our-team",
  },
};

const creativeTeam = [
  {
    name: "Anwesha",
    role: "Visual Content Designer",
    image: "/images/team/anwesha.webp",
    alt: "Anwesha, Visual Content Designer at KultureKatta",
    paragraphs: [
      "Quietly observant and endlessly curious about how ideas take visual form, Anwesha brings KultureKatta’s stories to life through branding, social media and creative content. Growing up in Santiniketan shaped much of how she sees creativity — as something where art, literature, music, nature and everyday life naturally meet.",
      "She especially loves building visual identities and finding the small details that give a brand its own personality. Currently, she’s exploring new approaches to branding, visual storytelling and meaningful design systems, while drawing inspiration from Satyajit Ray and contemporary designers.",
      "Outside design, travel is one subject she could happily talk about for hours — particularly how places, people and cultures shape the way we see and create.",
    ],
  },
  {
    name: "Neha Murumkar",
    role: "Visual Content Designer",
    image: "/images/team/neha.webp",
    alt: "Neha Murumkar, Visual Content Designer at KultureKatta",
    paragraphs: [
      "Neha turns ideas, stories and experiences into thoughtful visual communication at KultureKatta. She loves the process of finding a visual language for an idea — from the big concept to the tiny details in typography, colour, packaging or composition that most people might miss.",
      "Inspired by culturally rooted storytelling and designers like Sabyasachi Mukherjee, she is especially interested in work that feels contemporary without losing its sense of place and heritage.",
      "Outside design, Neha is drawn to travel, photography and history, and can happily spend hours discovering the stories, architecture and traditions that make a place unique. Her ideal KultureKatta gathering? Good food, hands-on creativity, meaningful conversation, interesting people — and preferably, very few screens.",
    ],
  },
];

export default function OurTeamPage() {
  return (
    <div className="kk-page-root kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <IconLead
            icon="👥 ✨"
            label="Our Team"
            size="page"
            align="center"
          />

          <p className="kk-page-label text-[var(--kk-accent)]">Our Team</p>

          <h1 className="kk-page-heading mx-auto mt-5 max-w-4xl">
            The humans behind the katta.
          </h1>

          <p className="kk-page-intro mx-auto mt-6 max-w-3xl">
            A small team with a suspiciously large number of ideas, questions,
            cultural rabbit holes and things we want to try.
          </p>
        </div>
      </section>

      {/* VIDULA */}
      <section className="kk-section-light kk-section-padding pt-0">
        <div className="kk-container">

            
          <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm sm:p-10 lg:p-12">
        <div className="mb-7 lg:float-left lg:mb-6 lg:mr-10 lg:w-[40%]">
          <Image
            src="/images/team/vidula.webp"
            alt="Vidula, Founder and Chief Curiosity Instigator at KultureKatta"
            width={900}
            height={1600}
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full rounded-[1.5rem] object-contain object-top"
          />
        </div>

        <p className="kk-card-label">
          Founder
        </p>

        <h2 className="kk-section-heading mt-4">
          Vidula
        </h2>

        <p className="mt-3 text-lg font-bold text-[var(--kk-text)]">
          Founder &amp; Chief Curiosity Instigator
        </p>

        <div className="mt-7 space-y-5">
          <p className="kk-body-large">
            Vidula started KultureKatta because she has never been particularly
            good at being interested in just one thing. She is a musician, writer,
            traveller, entrepreneur, mountain-lover, chronic question-asker and
            enthusiastic collector of ideas, people, stories and experiences. She
            is fascinated by everything from music, food and folk traditions to
            philosophy, cities, nature, obscure cultural practices and the
            wonderfully strange things humans do.
          </p>

          <p className="kk-body-large">
            KultureKatta grew out of that curiosity — and a belief that culture
            shouldn’t only be something we watch, visit or read about. It should be
            something we actually <em>do</em>.
          </p>

          <p className="kk-body-large">
            At KuKa, Vidula spends a suspicious amount of time connecting dots that
            don’t obviously belong together, dreaming up new experiences, asking
            “What if we tried this?”, and figuring out how to turn curiosity into
            something people can participate in.
          </p>

          <p className="kk-body-large">
            Away from KuKa, you’ll probably find her singing, writing, travelling
            somewhere new, walking towards a mountain, hunting for a brilliant film
            or book, or being reminded by her cat who really runs the organisation.
          </p>
        </div>

        <div className="clear-both" />
      </article>
        </div>
      </section>

      {/* ANWESHA + NEHA */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <IconLead icon="🎨 👥" label="Creative Team" align="center" />

            <p className="kk-card-label">
              Creative Team
            </p>

            <h2 className="kk-section-heading mt-5">
              The people giving KuKa its visual language.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {creativeTeam.map((person) => (
              <article
                key={person.name}
                className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={person.image}
                    alt={person.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-7 sm:p-9">
                  <p className="kk-card-label">
                    {person.role}
                  </p>

                  <h3 className="kk-section-heading mt-4">{person.name}</h3>

                  <div className="mt-6 space-y-5">
                    {person.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="kk-card-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="kk-section-light kk-section-padding pt-0">
        <div className="kk-container">
          <div className="rounded-[2rem] border border-black/10 bg-white px-7 py-12 text-center shadow-sm sm:px-10 sm:py-14">
            <IconLead icon="🕯️ 🤝" label="Shared belief" align="center" />

            <p className="kk-card-label">
              Small team. Many rabbit holes.
            </p>

            <h2 className="kk-section-heading mx-auto mt-5 max-w-3xl">
              One shared belief: culture is something you do.
            </h2>

            <p className="kk-body-large mx-auto mt-6 max-w-2xl">
              We’re building KultureKatta by staying curious, making things,
              testing ideas, listening closely and keeping the human part at the
              centre.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/about" className="kk-button-dark">
                About KultureKatta
              </Link>

              <Link href="/contact" className="kk-button-light">
                Say hello
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
