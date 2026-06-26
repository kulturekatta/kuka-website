import Link from "next/link";

const titleClass = "text-3xl font-semibold uppercase tracking-[0.18em]";

const lightTitleClass = `${titleClass} text-[#2A1E19]`;
const darkTitleClass = `${titleClass} text-[#D8BFAF]`;

const audienceCards = [
  {
    title: "Companies & Teams",
    text: "For employee engagement, offsites, festive gatherings, leadership meets, client visits, team rituals, rewards, and culture-led workplace experiences.",
  },
  {
    title: "Schools",
    text: "For hands-on, screen-light learning experiences that support creativity, curiosity, movement, storytelling, cultural literacy, and real-world learning.",
  },
  {
    title: "Institutions",
    text: "For colleges, cultural organisations, NGOs, foundations, campuses, and visiting groups looking for cultural programming, immersions, exchanges, and India-first-hand experiences.",
  },
];

const whatWeCreate = [
  {
    title: "Employee Engagement",
    text: "Creative, participatory sessions for teams that need something warmer, more human, and more memorable than another conference room activity.",
  },
  {
    title: "Offsites & Retreat Add-ons",
    text: "Culture-led trails, workshops, games, food experiences, and reflective sessions that can plug into team offsites, retreats, and leadership gatherings.",
  },
  {
    title: "Festive & Internal Celebrations",
    text: "Thoughtful experiences for Women’s Day, Founder’s Day, Culture Day, Diwali, Christmas, annual days, milestone celebrations, and team rituals.",
  },
  {
    title: "School & College Programs",
    text: "Hands-on cultural learning, interdisciplinary modules, city walks, creative labs, storytelling sessions, and campus engagement programs.",
  },
  {
    title: "Wellness & Slow Gatherings",
    text: "Screen-light, calming, reflective experiences designed around presence, creativity, listening, movement, food, nature, and meaningful connection.",
  },
  {
    title: "City & Heritage Experiences",
    text: "Walks, trails, clue hunts, neighbourhood explorations, food stories, and place-based experiences that help people discover a city differently.",
  },
];

const beyondTeamBonding = [
  {
    label: "Visitor Immersions",
    title: "Client & Delegation Visits",
    text: "For companies hosting clients, partners, investors, or visiting teams who want to experience India beyond hotels, boardrooms, and standard sightseeing.",
  },
  {
    label: "Global Learning",
    title: "India Immersion for Student Groups",
    text: "For students, exchange groups, schools, colleges, and international learning cohorts who want to experience India through culture, people, food, craft, place, and stories.",
  },
  {
    label: "Regional Culture",
    title: "Local, Regional & Cross-Border Experiences",
    text: "For organisations that want cultural programming across cities, regions, or countries — from Pune culture days to India immersion programs and artist exchanges.",
  },
  {
    label: "Digital Culture",
    title: "Online & Cross-Border Experiences",
    text: "For remote teams, global teams, and distributed learning groups who want online workshops, cultural discussions, digital exchanges, and shared experiences across locations.",
  },
  {
    label: "At Workplaces & Campuses",
    title: "Experience Booths & Cultural Concierge",
    text: "A KuKa experience desk for companies, campuses, coworking spaces, and festivals — helping people discover curated experiences, outings, getaways, and cultural plans.",
  },
  {
    label: "Rewards & Gifting",
    title: "Experience Rewards & Getaway Gifts",
    text: "For employee incentives, performance rewards, festive gifting, client gifting, and team achievement celebrations through workshops, trails, vouchers, and getaways.",
  },
];

const occasions = [
  "Team bonding",
  "Employee engagement",
  "Client visits",
  "Delegation visits",
  "Student immersions",
  "Campus festivals",
  "Festive gatherings",
  "Offsites and retreats",
  "Leadership meets",
  "Induction programs",
  "Wellness days",
  "Women’s Day",
  "Founder’s Day",
  "Culture Day",
  "Employee rewards",
  "Experience gifting",
];

const formats = [
  {
    title: "Make",
    text: "Hands-on workshops, maker labs, art, craft, pottery, textiles, food, gardening, and slow creative sessions.",
  },
  {
    title: "Walk",
    text: "Heritage walks, food trails, neighbourhood explorations, nature walks, clue trails, and city discovery experiences.",
  },
  {
    title: "Play",
    text: "Mind games, cultural games, team challenges, treasure hunts, puzzles, collaborative tasks, and playful group formats.",
  },
  {
    title: "Listen",
    text: "Story circles, listening rooms, music sessions, oral histories, founder stories, book-led conversations, and reflective gatherings.",
  },
  {
    title: "Taste",
    text: "Food-led culture sessions, tastings, regional food stories, coffee or tea experiences, baking, fermentation, and shared-table formats.",
  },
  {
    title: "Learn",
    text: "School, college, and institution-friendly cultural modules that connect creativity, heritage, ecology, science, storytelling, and everyday life.",
  },
];

const examples = [
  "Heritage clue walk",
  "Creative team workshop",
  "Food and culture session",
  "Storytelling for teams",
  "Music / listening room",
  "Mind games and team challenge",
  "Festival-themed experience",
  "Art / craft workshop",
  "Pune in 3 hours team trail",
  "Campus culture lab",
  "India immersion day",
  "Client visit cultural trail",
  "Experience reward voucher",
  "Cultural concierge booth",
  "Regional food and craft trail",
];

const process = [
  {
    step: "01",
    title: "Tell us the context",
    text: "Share the group size, city, occasion, preferred date, time available, budget range, and the kind of energy you want.",
  },
  {
    step: "02",
    title: "We suggest formats",
    text: "We recommend experience ideas that fit your people, setting, time, and purpose — instead of forcing a fixed catalogue.",
  },
  {
    step: "03",
    title: "We curate the details",
    text: "KuKa coordinates the concept, facilitator, flow, materials, venue inputs, and experience structure.",
  },
  {
    step: "04",
    title: "Your group shows up",
    text: "The experience is hosted with care, warmth, and enough structure to feel smooth without feeling stiff.",
  },
];

export default function ForTeamsPage() {
  return (
    <main className="kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light kk-hero-padding">
        <div className="kk-container text-center">
          <p className={lightTitleClass}>KuKa for Teams</p>

          <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-[#1F1712] sm:text-5xl lg:text-6xl">
            Culture-led experiences for teams, organisations, and institutions.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-black/70">
            We design hands-on, thoughtful, and memorable cultural experiences
            for companies, schools, colleges, campuses, institutions, visiting
            groups, and organisations.
          </p>

          <div className="mt-10 flex justify-center">
            <Link href="/contact" className="kk-button-dark">
              Plan for a Team
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className={lightTitleClass}>Who we work with</p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1F1712]">
              Companies, schools, and institutions that want people to gather
              with more meaning.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {audienceCards.map((item) => (
              <article
                key={item.title}
                className="kk-card-light flex h-full flex-col transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-2xl font-semibold leading-snug text-[#1F1712]">
                  {item.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-black/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE CREATE */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className={lightTitleClass}>What we create</p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1F1712]">
              Not another generic team activity.
            </h2>

            <p className="mt-6 text-lg leading-8 text-black/70">
              KuKa creates experiences that help people connect through culture,
              creativity, food, heritage, play, stories, movement, and making.
              Every experience is shaped around your group, occasion, time,
              budget, and desired mood.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whatWeCreate.map((item) => (
              <article
                key={item.title}
                className="kk-card-cream flex h-full flex-col transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-2xl font-semibold text-[#1F1712]">
                  {item.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-black/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND TEAM BONDING */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className={lightTitleClass}>Beyond team bonding</p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1F1712]">
              Cultural access for visitors, campuses, employees, and global
              learning groups.
            </h2>

            <p className="mt-6 text-lg leading-8 text-black/70">
              KuKa can also design cultural experiences for client visits,
              student groups, visiting teams, campus programs, international
              guests, remote teams, employee rewards, experience-led gifting,
              and cultural getaways.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beyondTeamBonding.map((item) => (
              <article
                key={item.title}
                className="kk-card-light flex h-full flex-col transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/40">
                  {item.label}
                </p>

                <h3 className="mt-5 text-2xl font-semibold leading-snug text-[#1F1712]">
                  {item.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-black/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className={lightTitleClass}>When to call us</p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1F1712]">
              When your people need to gather, learn, celebrate, reset, travel,
              or connect.
            </h2>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {occasions.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black/70 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE FORMATS */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className={lightTitleClass}>Experience formats</p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1F1712]">
              Different ways your group can enter culture.
            </h2>

            <p className="mt-6 text-lg leading-8 text-black/70">
              Some teams need energy. Some need calm. Some need bonding. Some
              need learning. Some need a shared memory that does not feel forced.
              We design the format around that.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {formats.map((item) => (
              <article
                key={item.title}
                className="kk-card-light flex h-full flex-col transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-2xl font-semibold text-[#171717]">
                  {item.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-black/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className={lightTitleClass}>Examples</p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1F1712]">
              Experiences we can shape for your team, campus, or visiting
              group.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-black/10 bg-white p-5 text-black/70 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className={lightTitleClass}>How it works</p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1F1712]">
              Simple, custom, and thoughtfully held.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <article
                key={item.step}
                className="kk-card-light flex h-full flex-col transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-semibold tracking-[0.24em] text-black/35">
                  {item.step}
                </p>

                <h3 className="mt-5 text-xl font-semibold text-[#1F1712]">
                  {item.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-black/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="kk-section-dark kk-section-padding">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/5 p-10 text-center">
            <p className={darkTitleClass}>Start here</p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white">
              Tell us about your group. We’ll shape the experience.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Share the group size, city, occasion, budget range, and the kind
              of energy you want. We’ll suggest a KuKa experience that makes
              sense.
            </p>

            <div className="mt-8">
              <Link href="/contact" className="kk-button-light">
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}