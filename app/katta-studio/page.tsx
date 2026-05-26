import GrowthClinicContactForm from "./GrowthClinicContactForm";

import Link from "next/link";

export default function KattaStudioPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#171717]">
      {/* HERO */}
      {/* Katta Studio Growth Clinic - Hero */}
<section className="bg-[#17110D] px-6 py-24 text-white">
  <div className="mx-auto max-w-5xl text-center">
    <p className="mb-5 text-3xl font-semibold uppercase tracking-[0.28em] text-[#D8B98C]">
      Katta Studio Growth Clinic
    </p>

    <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
      A business health check-up for creative founders and small brands.
    </h1>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
      We help you find what is really blocking your growth — unclear
      positioning, scattered content, weak funnels, poor conversions, or simply
      too many ideas with no system.
    </p>

    <p className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-8 text-white md:text-2xl">
      Come in with your confusion. Leave with sharper direction.
    </p>

    {/* Founder Note */}
    <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-sm backdrop-blur md:p-10">
      <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#D8B98C]">
        Founder note
      </p>

      <h2 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
        This is not “just post more reels” advice.
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
        The Growth Clinic looks at your brand like a whole system — your
        positioning, content, offers, audience, enquiry flow, and sales
        conversations.
      </p>
    </div>
  </div>
</section>

{/* Founder Thinking Boxes */}
<section className="bg-white px-6 pt-8 py-24 text-[#17110D]">
  <div className="mx-auto max-w-6xl">
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#9A6B3F]">
        Best for founders who are thinking
      </p>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-3xl bg-[#FAF7F2] p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-8 text-[#17110D]">
          “People like my work, but enquiries are slow.”
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-8 text-[#17110D]">
          “My content feels scattered.”
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-8 text-[#17110D]">
          “People ask the price and disappear.”
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-8 text-[#17110D]">
          “I know I need a system, but where do I begin?”
        </p>
      </div>
    </div>
  </div>
</section>

<section className="bg-[#FAF7F2] px-6 py-12 text-[#17110D]">
  <div className="mx-auto max-w-5xl rounded-3xl bg-[#17110D] px-8 py-12 text-center text-white shadow-xl">
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#E8C766]">
      Katta Studio Growth Clinic
    </p>

    <h2 className="mb-6 text-3xl font-bold md:text-5xl">
      Book a 30-minute brand growth call
    </h2>

    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
      We work with early-stage founders and creative businesses to build visibility,
      clarity, and growth — whether that means stronger positioning, better content,
      a website, LinkedIn presence, lead generation, or a simple sales funnel.
    </p>

    <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
      We are currently opening a few slots for a practical, no-pressure 30-minute
      Growth Clinic where we look at your current online presence and share
      2–3 actionable ideas to improve visibility, enquiries, and sales.
    </p>

    <div className="mt-8 rounded-2xl bg-white px-6 py-6 text-[#17110D]">
      <p className="text-xl font-bold md:text-2xl">
        Answer a few questions, get your brand profiled, and then we’ll set up
        your initial 30-minute call.
      </p>
    </div>

    <div className="mt-8">
  <a
    href="#growth-clinic-form"
    className="inline-flex rounded-full bg-[#E8C766] px-8 py-4 text-base font-bold text-[#17110D] transition hover:bg-white"
  >
    Start with the Growth Clinic
  </a>
</div>
  </div>
</section>

      {/* PROBLEM SECTION */}
      {/* The Real Problem */}
<section className="bg-[#111111] px-6 py-24 text-white">
  <div className="mx-auto max-w-5xl text-center">
    <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#F4C95D]">
      The real problem
    </p>

    <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
      What may be getting in the way
    </h2>

    <div className="mx-auto mt-8 max-w-3xl space-y-6 text-lg leading-8 text-white/80 md:text-xl">
      <p>
        You may be posting regularly, running ads, trying reels, changing your
        bio every three weeks, and still wondering why the right enquiries are
        not coming in.
      </p>

      <p>
        Often, the real issue is not effort. It is clarity.
      </p>

      <p className="font-semibold text-white">
        Growth usually gets stuck because of one or more of these gaps.
      </p>
    </div>
  </div>
</section>

{/* The Gaps */}
<section className="bg-[#FAF7F2] px-6 pt-2 pb-20 text-[#17110D]">
  <div className="mx-auto max-w-6xl">

    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Positioning gap
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          People see what you do, but do not immediately understand why it
          matters or why they should choose you.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Content gap
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          You are posting, but your content is not building enough trust,
          desire, clarity, or recall.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Funnel gap
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          People like your work, but there is no clear journey from Instagram
          to WhatsApp to enquiry to sale.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Offer gap
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Your product or service may be good, but the packaging, pricing,
          promise, or entry point needs sharpening.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Conversion gap
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          People enquire, ask the price, disappear, or say they will get back.
          The sales conversation needs structure.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          System gap
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          There are too many ideas, too many tasks, and no simple rhythm that
          connects content, enquiries, and sales.
        </p>
      </div>
    </div>
  </div>
</section>

{/* What It Is */}
<section className="bg-[#17110D] px-6 py-24 text-white">
  <div className="mx-auto max-w-4xl text-center">
    <p className="mb-5 text-2xl  font-semibold uppercase tracking-[0.28em] text-[#D8B98C]">
      What is it
    </p>

    <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
      What happens inside <br />a Growth Clinic?
    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
      The Growth Clinic is a focused strategy session where we study your brand,
      audience, content, offers, sales flow, and current growth blockers.
    </p>

    <p className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-8 text-white md:text-2xl">
      It is not a generic consultation. It is a diagnosis.
    </p>
  </div>
</section>

{/* What Happens Inside - Boxes */}
<section className="bg-white px-6 pt-6 py-24 text-[#17110D]">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-3xl bg-[#FAF7F2] p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="mb-6 text-6xl font-semibold leading-none text-[#C49A6C] md:text-7xl">
          01
        </p>

        <h3 className="text-xl font-semibold text-[#17110D]">
          We study your current presence
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Instagram, website, WhatsApp flow, offers, audience clarity, and
          recent marketing efforts.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="mb-6 text-6xl font-semibold leading-none text-[#C49A6C] md:text-7xl">
          02
        </p>

        <h3 className="text-xl font-semibold text-[#17110D]">
          We identify the real blockers
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Not vague advice. We look for the specific gaps stopping people from
          discovering, trusting, enquiring, or buying.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="mb-6 text-6xl font-semibold leading-none text-[#C49A6C] md:text-7xl">
          03
        </p>

        <h3 className="text-xl font-semibold text-[#17110D]">
          We map practical next steps
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Content direction, positioning changes, funnel ideas, offer
          restructuring, ad direction, or website improvements.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="mb-6 text-6xl font-semibold leading-none text-[#C49A6C] md:text-7xl">
          04
        </p>

        <h3 className="text-xl font-semibold text-[#17110D]">
          You leave with a clear action path
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          No 60-slide jargon monster. Just useful, founder-friendly clarity.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* WHO IT IS FOR */}
      {/* Who It Is For */}
<section className="bg-[#17110D] px-6 py-24 text-white">
  <div className="mx-auto max-w-4xl text-center">
    <p className="mb-5 text-2xl font-semibold uppercase tracking-[0.28em] text-[#D8B98C]">
      Who it is for
    </p>

    <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
      Built for people building something of their own.
    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
      Especially if your work is creative, service-led, founder-led, or deeply
      personal — and now needs a clearer growth system.
    </p>
  </div>
</section>

{/* Who It Is For - Boxes */}
<section className="bg-white px-6 pt-6 py-24 text-[#17110D]">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Creative founders
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Artists, makers, educators, designers, chefs, facilitators,
          consultants, and experience-led businesses.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Service-led brands
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Businesses where trust, clarity, positioning, and personal connection
          matter more than just pushing offers.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Early-stage businesses
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Brands that have started showing up online, but now need a sharper
          system for content, enquiries, and growth.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Personal brands
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Founder-led work where the story, voice, offer, and audience journey
          need to feel clearer and more intentional.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* DIAGNOSE */}
      {/* What We Diagnose */}
<section className="bg-[#17110D] px-6 py-24 text-white">
  <div className="mx-auto max-w-4xl text-center">
    <p className="mb-5 text-2xl font-semibold uppercase tracking-[0.28em] text-[#D8B98C]">
      What we diagnose
    </p>

    <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
      We look at the full growth picture.
    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
      Because growth rarely breaks in only one place. Sometimes your content is
      fine, but your offer is unclear. Sometimes the ads are working, but the
      WhatsApp conversation is leaking leads.
    </p>
  </div>
</section>

{/* Diagnosis Areas */}
<section className="bg-white px-6 pt-6 py-24 text-[#17110D]">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Brand positioning
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Who you are, who you serve, what you stand for, and why people should
          care.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Instagram clarity
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Bio, pinned posts, highlights, content buckets, trust signals, and
          first impression.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Content strategy
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          What to post, why to post it, and how every post should support trust,
          enquiry, or recall.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Instagram to WhatsApp funnel
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          How people move from seeing your content to starting a real
          conversation.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Offer structure
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Entry offers, core offers, packages, pricing direction, and easier
          buying paths.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Lead generation
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Organic and paid ways to create more qualified enquiries.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Meta ads direction
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Messaging, creative, targeting, and why previous ads may not have
          converted.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Website direction
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          What your website should say, what pages you need, and how it should
          support enquiries.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* WHAT YOU WALK AWAY WITH */}
      {/* What You Get */}
<section className="bg-[#17110D] px-6 py-24 text-white">
  <div className="mx-auto max-w-4xl text-center">
    <p className="mb-5 text-2xl font-semibold uppercase tracking-[0.28em] text-[#D8B98C]">
      What you get
    </p>

    <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
      You leave with clarity, not homework panic.
    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
      Think of it as a business mirror — but kinder, sharper, and less likely to
      say “just be consistent” without telling you how.
    </p>
  </div>
</section>

{/* What You Get - Boxes */}
<section className="bg-white px-6 pt-6 py-24 text-[#17110D]">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Growth gap diagnosis
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          A clear diagnosis of your current growth gaps.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Audience clarity
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Sharper audience and positioning clarity.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Content direction
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Practical content direction.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Funnel improvements
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Suggested funnel improvements.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Offer observations
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Offer or pricing observations.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Growth roadmap
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          Roadmap for the near future and long term support.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* FORMATS */}
      {/* Formats */}
<section className="bg-[#17110D] px-6 py-24 text-white">
  <div className="mx-auto max-w-4xl text-center">
    <p className="mb-5 text-2xl font-semibold uppercase tracking-[0.28em] text-[#D8B98C]">
      Formats
    </p>

    <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
      Start with the clinic. <br />Continue only if it makes sense.
    </h2>
  </div>
</section>

{/* Formats - Cards */}
<section className="bg-white px-6 pt-6 py-24 text-[#17110D]">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Growth Clinic Session
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          A focused diagnosis session for founders and small brands who need
          clarity on what to fix first.
        </p>

        <p className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#17110D] ring-1 ring-black/5">
          Best for: direction and decision-making.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Growth Clinic + Action Note
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          A deeper session followed by a written summary of recommendations and
          immediate next steps.
        </p>

        <p className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#17110D] ring-1 ring-black/5">
          Best for: founders who want implementation clarity.
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <h3 className="text-2xl font-semibold text-[#17110D]">
          Growth Clinic to Growth Plan
        </h3>

        <p className="mt-4 text-base leading-7 text-[#6A5A50]">
          For brands that want to move from diagnosis into a 30-day or 45-day
          strategy and execution roadmap.
        </p>

        <p className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#17110D] ring-1 ring-black/5">
          Best for: ongoing content, funnel, ads, or website support.
        </p>
      </div>
    </div>
  </div>
</section>

            {/* Why Katta Studio */}
<section className="bg-[#17110D] px-6 py-24 text-white">
  <div className="mx-auto max-w-4xl text-center">
    <p className="mb-5 text-2xl font-semibold uppercase tracking-[0.28em] text-[#D8B98C]">
      Why Katta Studio
    </p>

    <div className="mx-auto mt-16 max-w-4xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5 md:p-14">
  <h3 className="text-4xl font-bold leading-tight text-[#17110D] md:text-6xl">
    We are here to make your brand clearer.
  </h3>
</div>

    <div className="mx-auto mt-8 max-w-3xl space-y-6 text-lg leading-8 text-white/80 md:text-xl">
      <p>
        Katta Studio sits at the intersection of strategy, storytelling,
        content, and growth.
      </p>

      <p>
        We understand creative businesses because we build one ourselves. We do
        not only look at marketing as posts and ads. We look at your whole
        ecosystem.
      </p>
    </div>
  </div>
</section>

{/* Why Katta Studio - Questions */}
<section className="bg-white px-6 pt-6 py-24 text-[#17110D]">
  <div className="mx-auto max-w-5xl text-center">
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-7 text-[#17110D]">
          What are you saying?
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-7 text-[#17110D]">
          Who are you saying it to?
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-7 text-[#17110D]">
          Why should they trust you?
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-7 text-[#17110D]">
          What happens after they enquire?
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-7 text-[#17110D]">
          Where is the sale getting stuck?
        </p>
      </div>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow-sm ring-1 ring-black/5">
        <p className="text-xl font-semibold leading-7 text-[#17110D]">
          What needs to become simpler?
        </p>
      </div>
    </div>
  </div>
</section>

{/* Get In Touch */}
<section className="bg-[#17110D] px-6 py-24 text-white">
  <div className="mx-auto max-w-4xl text-center">
    <p className="mb-5 text-2xl font-semibold uppercase tracking-[0.28em] text-[#D8B98C]">
      Get in touch
    </p>

    <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
      Bring us your brand confusion. We’ll bring the diagnosis.
    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
      Whether you are stuck with content, low enquiries, weak conversions,
      unclear positioning, or too many ideas fighting for oxygen — the Growth
      Clinic is a good place to begin.
    </p>
  </div>
</section>

{/* Contact Form */}
<section className="bg-white px-6 pt-8 py-24 text-[#17110D]">
  <div className="mx-auto max-w-3xl">
    <div className="mb-10 text-center">
      <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#9A6B3F]">
        Start here
      </p>

      <h2 className="text-3xl font-semibold leading-tight text-[#17110D] md:text-5xl">
        Tell us where your brand feels stuck.
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6A5A50] md:text-xl">
        Share a few details about your brand and the growth problems you are
        facing. We’ll use this to understand whether the Growth Clinic is the
        right starting point.
      </p>
    </div>

    <GrowthClinicContactForm />
  </div>
</section>

    </main>
  );
}