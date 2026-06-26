import GrowthClinicContactForm from "./GrowthClinicContactForm";

const brandHealthAreas = [
  {
    title: "Brand clarity",
    text: "Is it immediately clear what you do, who you help, and why someone should choose you?",
  },
  {
    title: "Social presence",
    text: "Does your profile, content, bio, and first impression create trust and make enquiries easy?",
  },
  {
    title: "Website direction",
    text: "Does your website explain your work clearly and guide people towards taking action?",
  },
  {
    title: "Lead flow",
    text: "Is there a simple journey from discovery to enquiry to follow-up to sale?",
  },
];

const offerings = [
  {
    title: "Website design & development",
    text: "Clean, conversion-friendly websites for founders, small brands, studios, creators, and service-led businesses.",
  },
  {
    title: "Landing pages",
    text: "Focused pages for workshops, services, campaigns, launches, lead generation, and paid ads.",
  },
  {
    title: "Social profile clean-up",
    text: "Bio writing, profile clean-up, highlight structure, pinned post direction, and first-impression improvement.",
  },
  {
    title: "Brand messaging",
    text: "Sharper language for your offer, audience, promise, website sections, social bios, and enquiry touchpoints.",
  },
  {
    title: "Content direction",
    text: "Content buckets, post ideas, storytelling angles, campaign themes, and simple posting systems.",
  },
  {
    title: "WhatsApp enquiry flow",
    text: "Cleaner enquiry replies, follow-up messages, service explanations, and basic sales conversation structure.",
  },
  {
    title: "Meta ads direction",
    text: "Ad messaging, creative direction, landing page suggestions, and basic campaign structure for lead generation.",
  },
  {
    title: "Content & campaign planning",
    text: "Monthly content themes, launch calendars, campaign ideas, and a practical marketing rhythm for small teams.",
  },
  {
    title: "Growth Clinic session",
    text: "A focused brand health check-up to understand what needs fixing first before jumping into execution.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "We review your current presence",
    text: "Your website, social profiles, content, WhatsApp flow, offers, and overall brand clarity.",
  },
  {
    number: "02",
    title: "We identify what needs attention",
    text: "Not in a scary audit way. More like a friendly brand check-up with practical observations.",
  },
  {
    number: "03",
    title: "We suggest the right next step",
    text: "That may be a website, profile clean-up, content direction, landing page, ads support, or messaging work.",
  },
];

export default function KattaStudioPage() {
  return (
    <main className="min-h-screen kk-section-light">
      {/* HERO - DARK */}
      <section className="kk-section-dark px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="kk-section-label mb-5 text-[#D8B98C]">
            Katta Studio
          </p>

          <h1 className="kk-page-heading mx-auto max-w-4xl leading-tight">
            Healthy digital presence for founders, creators, and small brands.
          </h1>

          <p className="kk-body mx-auto mt-8 max-w-3xl text-white/80 md:text-xl">
            We help you make your brand clearer, cleaner, and easier to discover
            — through websites, landing pages, social profile clean-ups, brand
            messaging, content direction, and practical growth clinics.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#studio-offerings"
              className="kk-rounded-button border-[#E8C766] bg-[#E8C766] text-[#17110D] hover:border-white hover:bg-white"
            >
              Explore services
            </a>

            <a
              href="#growth-clinic-form"
              className="kk-rounded-button border-white/30 text-white hover:border-white hover:bg-white hover:text-[#17110D]"
            >
              Start with a brand check-up
            </a>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR - WHITE */}
      <section className="kk-section-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="kk-section-label mb-5 text-[#9A6B3F]">
                Who this is for
              </p>

              <h2 className="kk-section-heading leading-tight md:text-5xl">
                For people building something with heart — but needing more
                structure.
              </h2>

              <p className="kk-body mt-6 text-[#5F574F] md:text-xl">
                Katta Studio is especially useful for founders and small teams
                who are doing meaningful work, but need better digital presence,
                clearer messaging, and a more reliable path to enquiries.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl bg-[#F7F7F4] p-8 shadow-sm ring-1 ring-black/5">
                <h3 className="kk-card-title">Creative founders</h3>
                <p className="kk-body mt-4 text-[#5F574F]">
                  Artists, makers, educators, designers, chefs, facilitators,
                  coaches, and experience-led businesses.
                </p>
              </div>

              <div className="rounded-3xl bg-[#F7F7F4] p-8 shadow-sm ring-1 ring-black/5">
                <h3 className="kk-card-title">Service brands</h3>
                <p className="kk-body mt-4 text-[#5F574F]">
                  Businesses where trust, clarity, credibility, and personal
                  connection matter.
                </p>
              </div>

              <div className="rounded-3xl bg-[#F7F7F4] p-8 shadow-sm ring-1 ring-black/5">
                <h3 className="kk-card-title">Early-stage brands</h3>
                <p className="kk-body mt-4 text-[#5F574F]">
                  Brands that have started showing up but now need cleaner
                  systems, better pages, and sharper communication.
                </p>
              </div>

              <div className="rounded-3xl bg-[#F7F7F4] p-8 shadow-sm ring-1 ring-black/5">
                <h3 className="kk-card-title">Personal brands</h3>
                <p className="kk-body mt-4 text-[#5F574F]">
                  Founder-led work where the story, profile, offer, and online
                  presence need to feel more intentional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO - DARK */}
      <section className="kk-section-dark px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="kk-section-label mb-4 text-[#D8B98C]">
            What we do
          </p>

          <h2 className="kk-section-heading mx-auto max-w-4xl leading-tight md:text-5xl">
            We help your brand show up better online.
          </h2>

          <p className="kk-body mx-auto mt-8 max-w-3xl text-white/75 md:text-xl">
            Many small brands are already doing good work. The problem is often
            not the work itself — it is how clearly that work is presented,
            explained, discovered, and followed up.
          </p>

          <p className="kk-body mx-auto mt-5 max-w-3xl text-white/75 md:text-xl">
            Katta Studio helps you clean up the digital pieces that affect
            visibility, trust, enquiries, and conversions.
          </p>
        </div>
      </section>

      {/* BRAND HEALTH CHECK - WHITE */}
      <section className="kk-section-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label mb-4 text-[#9A6B3F]">
              Brand health check-up
            </p>

            <h2 className="kk-section-heading leading-tight md:text-5xl">
              Before we build, we understand what needs fixing.
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-3xl text-[#5F574F] md:text-xl">
              Think of this as a calm, practical check-up for your brand’s
              online presence. No panic. No jargon parade. Just useful clarity.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {brandHealthAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-3xl bg-[#F7F7F4] p-8 shadow-sm ring-1 ring-black/5"
              >
                <h3 className="kk-card-title text-[#17110D]">
                  {area.title}
                </h3>

                <p className="kk-body mt-4 text-[#5F574F]">
                  {area.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERINGS - DARK */}
      <section
        id="studio-offerings"
        className="kk-section-dark px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label mb-5 text-[#D8B98C]">
              Studio offerings
            </p>

            <h2 className="kk-page-heading leading-tight">
              Practical digital services for small brands.
            </h2>

            <p className="kk-body mx-auto mt-8 max-w-3xl text-white/75 md:text-xl">
              Choose one service, combine a few, or start with the Growth Clinic
              if you are not sure what you need yet.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:text-[#17110D]"
              >
                <h3 className="kk-card-title">{service.title}</h3>

                <p className="kk-body mt-4 opacity-80">
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - WHITE */}
      <section className="kk-section-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label mb-5 text-[#9A6B3F]">
              How it works
            </p>

            <h2 className="kk-section-heading leading-tight md:text-5xl">
              Simple, founder-friendly, and not wildly overcomplicated.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl bg-[#F7F7F4] p-8 text-center shadow-sm ring-1 ring-black/5"
              >
                <p className="mb-6 text-6xl font-semibold leading-none text-[#9A6B3F] md:text-7xl">
                  {step.number}
                </p>

                <h3 className="kk-card-title text-[#17110D]">
                  {step.title}
                </h3>

                <p className="kk-body mt-4 text-[#5F574F]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY KATTA STUDIO - DARK */}
      <section className="kk-section-dark px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="kk-section-label mb-5 text-[#D8B98C]">
            Why Katta Studio
          </p>

          <h2 className="kk-page-heading leading-tight">
            Strategy, storytelling, and execution — in one place.
          </h2>

          <p className="kk-body mx-auto mt-8 max-w-3xl text-white/80 md:text-xl">
            We understand creative businesses because we build one ourselves.
            We do not only look at posts or ads. We look at the whole journey —
            how people discover you, understand you, trust you, enquire, and
            decide to buy.
          </p>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-6 text-center ring-1 ring-white/10">
              <p className="kk-card-title">Clearer message</p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 text-center ring-1 ring-white/10">
              <p className="kk-card-title">Cleaner presence</p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 text-center ring-1 ring-white/10">
              <p className="kk-card-title">Better enquiry path</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - WHITE */}
      <section className="kk-section-light px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#F7F7F4] p-10 text-center shadow-sm ring-1 ring-black/5 md:p-14">
          <p className="kk-section-label mb-4 text-[#9A6B3F]">
            Start here
          </p>

          <h2 className="kk-section-heading mx-auto max-w-4xl leading-tight md:text-5xl">
            Not sure whether you need a website, social profile clean-up,
            content direction, ads, or better messaging?
          </h2>

          <p className="kk-body mx-auto mt-6 max-w-3xl text-[#5F574F] md:text-xl">
            Start with a brand health check-up. We’ll look at where you are now
            and suggest the most useful next step.
          </p>

          <div className="mt-8">
            <a
              href="#growth-clinic-form"
              className="kk-rounded-button border-[#17110D] bg-[#17110D] text-white hover:border-[#E8C766] hover:bg-[#E8C766] hover:text-[#17110D]"
            >
              Tell us what you need help with
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM - DARK */}
      <section
        id="growth-clinic-form"
        className="kk-section-dark px-6 py-24"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="kk-section-label mb-4 text-[#D8B98C]">
              Enquiry form
            </p>

            <h2 className="kk-section-heading leading-tight text-white md:text-5xl">
              Tell us where your brand feels stuck.
            </h2>

            <p className="kk-body mx-auto mt-5 max-w-2xl text-white/75 md:text-xl">
              Share a few details about your brand and the kind of support you
              are looking for. We’ll help you figure out the right starting
              point.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-[#17110D] shadow-sm md:p-8">
            <GrowthClinicContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}