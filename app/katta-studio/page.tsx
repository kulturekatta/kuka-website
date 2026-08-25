import type { Metadata } from "next";
import KattaStudioWorkWithUs from "../components/KattaStudioWorkWithUs";
import SemanticIcon from "../components/SemanticIcon";
import GrowthClinicContactForm from "./GrowthClinicContactForm";

export const metadata: Metadata = {
  title: "Katta Studio | Strategy, Content & Growth for Creative Brands",
  description:
    "Katta Studio helps creative and culture-led brands with websites, positioning, visual identity, content, social media, and practical growth systems.",
  alternates: {
    canonical: "/katta-studio",
  },
};

const businessOutcomes = [
  { icon: "🌐", title: "Professional online presence" },
  { icon: "💬", title: "Clearer brand communication" },
  { icon: "🤝", title: "Better customer engagement" },
  { icon: "📩", title: "Improved enquiry flow" },
  { icon: "📣", title: "Consistent digital presence" },
  { icon: "⚙️", title: "Organised business systems" },
  { icon: "📈", title: "Practical growth opportunities" },
];

const coreServiceAreas = [
  {
    number: "01",
    icon: "💻",
    id: "websites-and-digital-presence",
    title: "Websites and digital presence",
    description:
      "Clear, responsive digital experiences that help people understand your work, trust your brand, and take the next step.",
    services: [
      "Business and professional websites",
      "Landing pages",
      "Mobile-responsive design",
      "Website content direction",
      "Website improvements and content restructuring",
      "WhatsApp and enquiry integration",
      "Google Business Profile support",
      "Basic search visibility and analytics setup",
    ],
  },
  {
    number: "02",
    icon: "📱",
    id: "social-media-and-content",
    title: "Social media and content",
    description:
      "Content systems and campaign communication that help your brand appear consistent, useful, and recognisable.",
    services: [
      "Social-media strategy and direction",
      "Content planning and calendars",
      "Campaign and launch communication",
      "Visual content direction",
      "Social-media creative design",
      "Captions, messaging and brand storytelling",
      "Advertising copy and campaign communication",
      "Meta Ads strategy and campaign management",
      "Basic campaign monitoring and performance reporting",
    ],
  },
  {
    number: "03",
    icon: "🔍",
    id: "growth-clinic-and-strategic-support",
    title: "Growth Clinic and strategic support",
    description:
      "Focused assessments and strategic support to identify what is blocking growth and what deserves attention first.",
    services: [
      "Business and digital-presence assessments",
      "Growth diagnosis",
      "Customer-journey review",
      "Offering and positioning clarity",
      "Communication audits",
      "Opportunity identification",
      "Priority roadmaps",
      "Founder consultations",
    ],
  },
  {
    number: "04",
    icon: "🗂️",
    id: "founder-and-business-systems",
    title: "Founder and business systems",
    description:
      "Practical internal systems that make planning, tracking, communication, and delivery easier for small and growing teams.",
    services: [
      "Notion workspace setup",
      "Project and task-management systems",
      "Lead and client tracking",
      "Content-planning systems",
      "Knowledge and document organisation",
      "Founder dashboards",
      "Standard operating procedures",
      "Business-workflow improvement",
    ],
  },
];

const audienceSegments = [
  {
    icon: "🏛️",
    title: "Culture, Heritage & Creative Economy",
    text: "Cultural organisations, museums, galleries, archives, libraries, heritage ventures, arts foundations, festivals, craft collectives, cultural institutions, and culture-led platforms.",
    featured: true,
  },
  {
    icon: "🎨",
    title: "Artists, Creators & Personal Brands",
    text: "Artists, musicians, writers, authors, filmmakers, photographers, performers, designers, influencers, podcasters, educators, speakers, and creators building businesses around their expertise.",
  },
  {
    icon: "📚",
    title: "Media, Publishing, Research & Knowledge",
    text: "Publishers, magazines, digital publications, podcast networks, documentary platforms, research organisations, think tanks, science-communication initiatives, professional associations, and knowledge platforms.",
  },
  {
    icon: "🎓",
    title: "Education, Academies & Training",
    text: "Schools, colleges, coaching centres, academies, vocational institutes, training companies, skill-development organisations, children’s learning centres, independent educators, and workshop facilitators.",
  },
  {
    icon: "⚕️",
    title: "Healthcare, Wellness & Personal Care",
    text: "Doctors, dentists, clinics, physiotherapists, psychologists, counsellors, nutritionists, allied-health practitioners, yoga and movement studios, wellness centres, salons, and beauty professionals.",
  },
  {
    icon: "📐",
    title: "Architecture, Design & Professional Services",
    text: "Architects, interior designers, design studios, consultants, coaches, trainers, facilitators, speakers, accountants, legal professionals, HR firms, marketing agencies, technology-service companies, and independent specialists.",
  },
  {
    icon: "🧳",
    title: "Hospitality, Food, Travel & Experiences",
    text: "Boutique hotels, homestays, retreats, travel businesses, local guides, restaurants, cafés, bakeries, culinary ventures, cultural venues, community spaces, and experience-led businesses.",
  },
  {
    icon: "🏆",
    title: "Events, Entertainment, Sports & Adventure",
    text: "Event planners, wedding businesses, entertainment agencies, artist-management companies, venues, production firms, athletes, sports academies, fitness studios, trek operators, scuba schools, and outdoor-experience businesses.",
  },
  {
    icon: "🛍️",
    title: "Fashion, Craft, Lifestyle & Product Brands",
    text: "Fashion labels, textile businesses, boutiques, jewellery brands, craft and handloom ventures, home-décor businesses, skincare, stationery, gifting, artisan-food, and niche consumer-product brands.",
  },
  {
    icon: "🐾",
    title: "Pet Care, Retail & Local Businesses",
    text: "Veterinary clinics, grooming salons, pet boarding businesses, trainers, pet stores, neighbourhood retailers, bookstores, speciality stores, florists, nurseries, supermarkets, and organised local-service businesses.",
  },
  {
    icon: "🤲",
    title: "Nonprofits, Social Enterprises & Growing Organisations",
    text: "Nonprofits, foundations, social enterprises, community organisations, CSR initiatives, associations, mission-led ventures, multi-location businesses, franchise networks, and founder-led organisations preparing to scale.",
  },
];

const brandHealthAreas = [
  {
    icon: "💡",
    title: "Brand clarity",
    text: "Is it immediately clear what you do, who you help, and why someone should choose you?",
  },
  {
    icon: "🖥️",
    title: "Digital presence",
    text: "Do your website, social profiles, and listings create a consistent and trustworthy first impression?",
  },
  {
    icon: "👣",
    title: "Customer journey",
    text: "Can people move easily from discovering your brand to understanding, enquiring, and buying?",
  },
  {
    icon: "🗄️",
    title: "Business systems",
    text: "Do you have workable systems for planning, leads, clients, content, projects, and follow-ups?",
  },
];

const selectedProjects = [
  {
    icon: "👗",
    title: "HiLiHiF",
    category: "Fashion and clothing brand",
    focus:
      "Build a stronger social-media presence and communicate the brand’s fabric-first identity.",
    services: [
      "Brand assessment",
      "Content strategy",
      "Reels planning",
      "Product storytelling",
      "Campaign concepts",
      "Caption and copywriting",
      "Visual-identity support",
    ],
    outcome:
      "A more cohesive content direction, stronger product storytelling, and a more consistent brand identity across digital communication.",
  },
  {
    icon: "🧁",
    title: "The Baking Room Academy",
    category: "Premium baking education brand",
    focus:
      "Increase workshop visibility, improve customer communication, and create a more structured promotion system.",
    services: [
      "Workshop campaign planning",
      "Social-media content",
      "Reel concepts and copy",
      "Meta Ads",
      "Event listings",
      "Enquiry-flow support",
      "Website recommendations",
    ],
    outcome:
      "A more streamlined marketing approach with clearer content planning, workshop promotion, and enquiry management.",
  },
  {
    icon: "🎪",
    title: "KultureKatta",
    category: "Culture-led experiences platform",
    focus:
      "Build a scalable cultural platform with structured digital experiences, audience journeys, and operational systems.",
    services: [
      "Brand strategy",
      "Website development",
      "Content systems",
      "Audience journeys",
      "Business systems and operations",
      "Partnership and growth strategy",
    ],
    outcome:
      "An event-led initiative developed into a multi-vertical platform with clearer communication, digital pathways, and organised business systems.",
  },
];

const processSteps = [
  {
    number: "01",
    icon: "👂",
    title: "Understand",
    text: "We learn about your business, goals, audience, current presence, and challenges.",
  },
  {
    number: "02",
    icon: "🔎",
    title: "Diagnose",
    text: "We identify the gaps, friction points, and opportunities affecting your growth.",
  },
  {
    number: "03",
    icon: "🎯",
    title: "Prioritise",
    text: "We focus on the actions that are most useful and realistic for your current stage.",
  },
  {
    number: "04",
    icon: "🛠️",
    title: "Build",
    text: "We create the required communication, digital solutions, content, or systems.",
  },
  {
    number: "05",
    icon: "✨",
    title: "Refine",
    text: "We improve, optimise, document, and provide ongoing support where required.",
  },
];

const inHouseSupport = [
  "Graphic design and visual communication",
  "Brand presentation and visual-identity support",
  "Social-media and campaign creatives",
  "Content design and visual storytelling",
  "Copywriting and campaign communication",
  "Meta Ads strategy, setup, and campaign management",
];

const partnerLedServices = [
  "Professional photography and videography",
  "Google Ads and specialised advertising platforms",
  "Advanced SEO",
  "Advanced CRM and marketing automation",
  "Custom e-commerce and technical integrations",
  "Public relations and media outreach",
  "Market and customer research",
  "Legal, compliance, and intellectual-property support",
];

const engagementStyles = [
  { icon: "📌", title: "Focused one-time projects" },
  { icon: "🧪", title: "Growth and digital-presence assessments" },
  { icon: "🧭", title: "Strategy consultations" },
  { icon: "⚡", title: "Short-term implementation engagements" },
  { icon: "📅", title: "Monthly support arrangements" },
  { icon: "📊", title: "Phased implementation projects" },
  { icon: "🔌", title: "Specialist partner assignments" },
];

const studioStrengths = [
  { icon: "🧠", title: "Brand strategy" },
  { icon: "⌨️", title: "Website development" },
  { icon: "📝", title: "Content systems" },
  { icon: "🗺️", title: "Audience journeys" },
  { icon: "📋", title: "Business systems and operations" },
  { icon: "🚀", title: "Partnership and growth strategy" },
];

export default function KattaStudioPage() {
  return (
    <div className="kk-page-root min-h-screen kk-section-light">
      {/* HERO */}
      <section className="kk-section-light px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6 flex justify-center">
            <SemanticIcon icon="🧰" label="Katta Studio" size="page" />
          </div>

          <p className="kk-page-label text-[var(--kk-accent)]">Katta Studio</p>

          <h1 className="kk-page-heading mx-auto max-w-6xl">
            <span className="block">Digital presence, creative direction,</span>
            <span className="block">and growth systems for businesses</span>
            <span className="block">that want to move forward.</span>
          </h1>

          <p className="kk-page-intro mx-auto mt-8 max-w-4xl">
            Katta Studio is a creative and growth-support studio for founders,
            professionals, creators, small businesses, and purpose-led
            organisations.
          </p>

          <p className="kk-page-intro mx-auto mt-4 max-w-3xl">
            We bring together digital presence, content, communication,
            strategy, and business systems to help clients build stronger
            foundations for growth.
          </p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--kk-accent)]">
            A KultureKatta initiative
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#core-services" className="kk-button-dark">
              Explore services
            </a>

            <a href="#growth-clinic-form" className="kk-button-on-light">
              Request a Growth Clinic
            </a>
          </div>
        </div>
      </section>

      {/* BUSINESS OUTCOMES */}
      <section className="kk-section-cream border-y border-black/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon
                icon="🏁"
                label="Business outcomes"
                size="section"
              />
            </div>

            <p className="kk-section-label mb-5">
              What we help businesses achieve
            </p>

            <h2 className="kk-section-heading">
              Stronger foundations for clearer, more organised growth.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl">
              Our work is designed to improve not only how a business looks, but
              how clearly it communicates, attracts enquiries, and manages the
              systems behind its growth.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {businessOutcomes.map((outcome, index) => (
              <div
                key={outcome.title}
                className={`kk-card kk-card--compact ${
                  index === businessOutcomes.length - 1
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
                }`}
              >
                <SemanticIcon
                  icon={outcome.icon}
                  label={outcome.title}
                  size="card"
                />

                <p className="kk-card-number mb-5 mt-5">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="kk-card-title">{outcome.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section id="core-services" className="kk-section-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🧩" label="Core services" size="section" />
            </div>

            <p className="kk-section-label mb-5">What we do</p>

            <h2 className="kk-section-heading">
              Four interconnected areas of support.
            </h2>

            <p className="kk-body mx-auto mt-8 max-w-3xl">
              Services can be taken independently, combined into one project, or
              implemented in phases according to your goals, timeline, and
              budget.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {coreServiceAreas.map((area) => (
              <article
                id={area.id}
                key={area.number}
                className="kk-card kk-card--roomy kk-card--interactive scroll-mt-40"
              >
                <SemanticIcon icon={area.icon} label={area.title} size="card" />

                <p className="kk-card-number mb-5 mt-5">{area.number}</p>

                <h3 className="kk-card-title">{area.title}</h3>

                <p className="kk-card-body mt-5">{area.description}</p>

                <ul className="kk-card-list mt-7 space-y-3">
                  {area.services.map((service) => (
                    <li key={service} className="kk-card-list-item flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--kk-accent)]"
                      />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section
        id="who-we-work-with"
        className="kk-section-cream border-y border-black/5 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon
                icon="👥"
                label="Who Katta Studio works with"
                size="section"
              />
            </div>

            <p className="kk-section-label mb-5">Who we work with</p>

            <h2 className="kk-section-heading">
              Different sectors. Similar growth challenges.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl">
              We work with founders, professionals, creators, institutions,
              organisations, and owner-led businesses that have meaningful work
              or strong potential—but need clearer communication, stronger
              digital visibility, or better systems for growth.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {audienceSegments.map((segment, index) => (
              <article
                key={segment.title}
                className={`kk-card kk-card--interactive ${
                  segment.featured ? "kk-card--featured" : ""
                }`}
              >
                <SemanticIcon
                  icon={segment.icon}
                  label={segment.title}
                  size="card"
                />

                <p className="kk-card-number mb-5 mt-5">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="kk-card-title">{segment.title}</h3>

                <p className="kk-card-body mt-4">{segment.text}</p>

                {segment.featured && (
                  <p className="kk-card-meta mt-6">
                    A natural extension of KultureKatta’s cultural roots.
                  </p>
                )}
              </article>
            ))}

            <article className="kk-card justify-between">
              <div>
                <SemanticIcon icon="❓" label="Your work" size="card" />

                <p className="kk-card-label mb-5 mt-5">YOUR WORK</p>

                <h3 className="kk-card-title">
                  Do not see your category here?
                </h3>

                <p className="kk-card-body mt-4">
                  These are examples, not rigid industry boxes. If you have a
                  valuable service, product, programme, or idea, we would be
                  happy to understand what you are building.
                </p>
              </div>

              <div className="mt-8">
                <a href="#growth-clinic-form" className="kk-button-dark">
                  Tell us about your work
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* GROWTH CLINIC */}
      <section className="kk-section-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🔬" label="Growth Clinic" size="section" />
            </div>

            <p className="kk-section-label mb-5">Growth Clinic</p>

            <h2 className="kk-section-heading">
              Before we build, we understand what needs attention.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl">
              The Growth Clinic is a focused business and digital-presence
              assessment. It helps identify what is unclear, disconnected,
              underperforming, or simply creating too much founder confusion.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {brandHealthAreas.map((area) => (
              <div key={area.title} className="kk-card kk-card--soft">
                <SemanticIcon icon={area.icon} label={area.title} size="card" />

                <h3 className="kk-card-title mt-5">{area.title}</h3>

                <p className="kk-card-body mt-4">{area.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="#growth-clinic-form" className="kk-button-dark">
              Request an assessment
            </a>
          </div>
        </div>
      </section>

      {/* SELECTED PROJECTS */}
      <section className="kk-section-cream border-y border-black/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="📁" label="Selected projects" size="section" />
            </div>

            <p className="kk-section-label mb-5">Selected projects</p>

            <h2 className="kk-section-heading">
              Strategy translated into practical work.
            </h2>

            <p className="kk-body mx-auto mt-8 max-w-3xl">
              Our projects bring together communication, content, digital
              presence, campaigns, and systems according to what each client
              actually needs.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {selectedProjects.map((project) => (
              <article key={project.title} className="kk-card">
                <SemanticIcon
                  icon={project.icon}
                  label={project.title}
                  size="card"
                />

                <p className="kk-card-label mt-5">{project.category}</p>

                <h3 className="kk-card-title mt-4">{project.title}</h3>

                <div className="mt-7">
                  <p className="kk-card-label">Focus</p>

                  <p className="kk-card-body mt-3">{project.focus}</p>
                </div>

                <div className="mt-7">
                  <p className="kk-card-label">Services</p>

                  <ul className="kk-card-list mt-3 space-y-2">
                    {project.services.map((service) => (
                      <li
                        key={service}
                        className="kk-card-list-item flex gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--kk-accent)]"
                        />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 border-t border-black/10 pt-7">
                  <p className="kk-card-label">Outcome</p>

                  <p className="kk-card-body mt-3">{project.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="kk-section-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="🔄" label="How we work" size="section" />
            </div>

            <p className="kk-section-label mb-5">How we work</p>

            <h2 className="kk-section-heading">
              Understand. Diagnose. Prioritise. Build. Refine.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl">
              Every engagement begins with understanding the business before
              recommending deliverables.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="kk-card kk-card--compact kk-card--centered"
              >
                <SemanticIcon icon={step.icon} label={step.title} size="card" />

                <p className="kk-card-number mt-5">{step.number}</p>

                <h3 className="kk-card-title mt-6">{step.title}</h3>

                <p className="kk-card-body mt-4">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALIST SUPPORT */}
      <section className="kk-section-cream border-y border-black/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon
                icon="💼"
                label="Creative and specialist support"
                size="section"
              />
            </div>

            <p className="kk-section-label mb-5">
              Creative and specialist support
            </p>

            <h2 className="kk-section-heading">
              The right expertise for the right project.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl">
              We provide core creative and advertising support in-house. Where a
              project requires additional specialist expertise, we can recommend
              or coordinate trusted professionals.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <article
              id="brand-positioning-and-visual-identity"
              className="kk-card kk-card--roomy scroll-mt-40"
            >
              <SemanticIcon
                icon="✏️"
                label="In-house creative support"
                size="card"
              />

              <p className="kk-card-label mt-5">In-house</p>

              <h3 className="kk-card-title mt-4">
                Creative and advertising support
              </h3>

              <ul className="kk-card-list mt-7 space-y-3">
                {inHouseSupport.map((service) => (
                  <li key={service} className="kk-card-list-item flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--kk-accent)]"
                    />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="kk-card kk-card--roomy">
              <SemanticIcon
                icon="🔗"
                label="Partner-led specialist services"
                size="card"
              />

              <p className="kk-card-label mt-5">Coordinated when required</p>

              <h3 className="kk-card-title mt-4">
                Partner-led specialist services
              </h3>

              <ul className="kk-card-list mt-7 space-y-3">
                {partnerLedServices.map((service) => (
                  <li key={service} className="kk-card-list-item flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--kk-accent)]"
                    />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <p className="kk-small-text mx-auto mt-8 max-w-4xl text-center">
            Partner-led services are recommended according to the requirements,
            scale, and budget of the project. Scope, responsibilities,
            timelines, and commercial terms are agreed upon in advance.
          </p>
        </div>
      </section>

      {/* ENGAGEMENT STYLE */}
      <section className="kk-section-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="📄" label="Engagement style" size="section" />
            </div>

            <p className="kk-section-label mb-5">Our engagement style</p>

            <h2 className="kk-section-heading">
              Support shaped around the project—not squeezed into a package.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl">
              Every engagement begins with a clear scope of work, deliverables,
              responsibilities, timelines, and commercial terms.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {engagementStyles.map((style, index) => (
              <div
                key={style.title}
                className={`kk-card kk-card--compact kk-card--centered ${
                  index === engagementStyles.length - 1
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
                }`}
              >
                <SemanticIcon icon={style.icon} label={style.title} size="card" />

                <p className="kk-card-title mt-5">{style.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY KATTA STUDIO */}
      <section className="kk-section-cream border-y border-black/5 px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-5 flex justify-center">
            <SemanticIcon icon="🔦" label="Why Katta Studio" size="section" />
          </div>

          <p className="kk-section-label mb-5">Why Katta Studio</p>

          <h2 className="kk-section-heading">
            Strategy, storytelling, digital presence, and systems—in one place.
          </h2>

          <p className="kk-body mx-auto mt-8 max-w-3xl">
            Katta Studio emerged from the experience of building KultureKatta
            itself. We understand the practical realities of developing a brand,
            communicating multiple offerings, building a website, creating
            content, managing partnerships, and organising the systems behind
            growth.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {studioStrengths.map((item) => (
              <div
                key={item.title}
                className="kk-card kk-card--compact kk-card--centered"
              >
                <SemanticIcon icon={item.icon} label={item.title} size="card" />

                <p className="kk-card-title mt-5">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIMARY CTA */}
      <section className="kk-section-light px-6 py-24">
        <div className="kk-panel mx-auto max-w-5xl text-center">
          <div className="mb-5 flex justify-center">
            <SemanticIcon icon="🌟" label="Build what is next" size="section" />
          </div>

          <p className="kk-section-label mb-5">
            Let&apos;s build what&apos;s next
          </p>

          <h2 className="kk-section-heading mx-auto max-w-4xl">
            Whether you need a website, stronger digital presence, better
            content, or growth support, Katta Studio is here to help.
          </h2>

          <p className="kk-body mx-auto mt-6 max-w-3xl">
            Start with a discovery conversation or request a Growth Clinic
            assessment to identify the most useful next step.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#growth-clinic-form" className="kk-button-dark">
              Request a Growth Clinic
            </a>

            <a
              href="https://wa.me/919730244996"
              target="_blank"
              rel="noreferrer"
              className="kk-button-on-light"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <KattaStudioWorkWithUs />

      {/* CONTACT FORM */}
      <section
        id="growth-clinic-form"
        className="kk-section-light scroll-mt-24 px-6 py-24"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <div className="mb-5 flex justify-center">
              <SemanticIcon icon="📨" label="Growth Clinic form" size="section" />
            </div>

            <p className="kk-section-label mb-5">Enquiry form</p>

            <h2 className="kk-section-heading">
              Tell us where your brand or business feels stuck.
            </h2>

            <p className="kk-body mx-auto mt-5 max-w-2xl">
              Share a few details about your work and the kind of support you
              are looking for. We will help you identify the right starting
              point.
            </p>
          </div>

          <div>
            <GrowthClinicContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
