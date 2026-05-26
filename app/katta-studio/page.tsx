import Link from "next/link";

export default function KattaStudioPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#171717]">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:px-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#7A5C3E]">
              Katta Studio Growth Clinic
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              A business health check-up for creative founders and small brands.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-700 md:text-xl">
              We help you find what is really blocking your growth — unclear
              positioning, scattered content, weak funnels, poor conversions, or
              simply too many ideas with no system.
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-700">
              Come in with your confusion. Leave with sharper direction.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-black px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Book a Growth Clinic
              </Link>

              <a
                href="#diagnose"
                className="rounded-full border border-black px-7 py-4 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white"
              >
                See what we diagnose
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xl font-semibold uppercase tracking-[0.2em] text-gray-500">
              Founder note
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-snug">
              This is not “just post more reels” advice.
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-700">
              The Growth Clinic looks at your brand like a whole system — your
              positioning, content, offers, audience, enquiry flow, and sales
              conversations.
            </p>

            <div className="mt-8 rounded-3xl bg-[#F4EFE7] p-5">
              <p className="text-sm font-medium text-gray-800">
                Best for founders who are thinking:
              </p>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
                <li>• “People like my work, but enquiries are slow.”</li>
                <li>• “My content feels scattered.”</li>
                <li>• “People ask the price and disappear.”</li>
                <li>• “I know I need a system, but where do I begin?”</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#7A5C3E]">
              The real problem
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              You may not have a content problem.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              You may be posting regularly, running ads, trying reels, changing
              your bio every three weeks, and still wondering why the right
              enquiries are not coming in.
            </p>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              Often, the real issue is not effort. It is clarity.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Positioning gap",
                text: "People see what you do, but do not immediately understand why it matters or why they should choose you.",
              },
              {
                title: "Content gap",
                text: "You are posting, but your content is not building enough trust, desire, clarity, or recall.",
              },
              {
                title: "Funnel gap",
                text: "People like your work, but there is no clear journey from Instagram to WhatsApp to enquiry to sale.",
              },
              {
                title: "Offer gap",
                text: "Your product or service may be good, but the packaging, pricing, promise, or entry point needs sharpening.",
              },
              {
                title: "Conversion gap",
                text: "People enquire, ask the price, disappear, or say they will get back. The sales conversation needs structure.",
              },
              {
                title: "System gap",
                text: "There are too many ideas, too many tasks, and no simple rhythm that connects content, enquiries, and sales.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-black/10 bg-[#FAFAF7] p-6"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-gray-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS GROWTH CLINIC */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#7A5C3E]">
              What it is
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              What happens inside the Growth Clinic?
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              The Growth Clinic is a focused strategy session where we study
              your brand, audience, content, offers, sales flow, and current
              growth blockers.
            </p>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              It is not a generic consultation. It is a diagnosis.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                number: "01",
                title: "We study your current presence",
                text: "Instagram, website, WhatsApp flow, offers, audience clarity, and recent marketing efforts.",
              },
              {
                number: "02",
                title: "We identify the real blockers",
                text: "Not vague advice. We look for the specific gaps stopping people from discovering, trusting, enquiring, or buying.",
              },
              {
                number: "03",
                title: "We map practical next steps",
                text: "Content direction, positioning changes, funnel ideas, offer restructuring, ad direction, or website improvements.",
              },
              {
                number: "04",
                title: "You leave with a clear action path",
                text: "No 60-slide jargon monster. Just useful, founder-friendly clarity.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="flex gap-5 rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  {item.number}
                </div>

                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-700">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#D8B98F]">
              Who it is for
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Built for people building something of their own.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Especially if your work is creative, service-led, founder-led, or
              deeply personal — and now needs a clearer growth system.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Creative founders",
              "Artists, makers and designers",
              "Small businesses",
              "Instagram-first brands",
              "Coaches, educators and consultants",
              "B2C and B2B service brands",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/15 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSE */}
      <section id="diagnose" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#7A5C3E]">
            What we diagnose
          </p>

          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            We look at the full growth picture.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-700">
            Because growth rarely breaks in only one place. Sometimes your
            content is fine, but your offer is unclear. Sometimes the ads are
            working, but the WhatsApp conversation is leaking leads.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Brand positioning",
              text: "Who you are, who you serve, what you stand for, and why people should care.",
            },
            {
              title: "Instagram clarity",
              text: "Bio, pinned posts, highlights, content buckets, trust signals, and first impression.",
            },
            {
              title: "Content strategy",
              text: "What to post, why to post it, and how every post should support trust, enquiry, or recall.",
            },
            {
              title: "Instagram to WhatsApp funnel",
              text: "How people move from seeing your content to starting a real conversation.",
            },
            {
              title: "Offer structure",
              text: "Entry offers, core offers, packages, pricing direction, and easier buying paths.",
            },
            {
              title: "Lead generation",
              text: "Organic and paid ways to create more qualified enquiries.",
            },
            {
              title: "Meta ads direction",
              text: "Messaging, creative, targeting, and why previous ads may not have converted.",
            },
            {
              title: "Website direction",
              text: "What your website should say, what pages you need, and how it should support enquiries.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU WALK AWAY WITH */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div>
              <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#7A5C3E]">
                What you get
              </p>

              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                You leave with clarity, not homework panic.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-700">
                Think of it as a business mirror — but kinder, sharper, and
                less likely to say “just be consistent” without telling you how.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#F4EFE7] p-6 md:p-8">
              <ul className="space-y-4 text-base leading-7 text-gray-800">
                <li>• A clear diagnosis of your current growth gaps</li>
                <li>• Sharper audience and positioning clarity</li>
                <li>• Practical content direction</li>
                <li>• Suggested funnel improvements</li>
                <li>• Offer or pricing observations</li>
                <li>• Immediate next steps for the next 2–4 weeks</li>
                <li>• Optional roadmap for longer-term support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#7A5C3E]">
            Formats
          </p>

          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Start with the clinic. Continue only if it makes sense.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Growth Clinic Session",
              text: "A focused diagnosis session for founders and small brands who need clarity on what to fix first.",
              best: "Best for: direction and decision-making.",
            },
            {
              title: "Growth Clinic + Action Note",
              text: "A deeper session followed by a written summary of recommendations and immediate next steps.",
              best: "Best for: founders who want implementation clarity.",
            },
            {
              title: "Growth Clinic to Growth Plan",
              text: "For brands that want to move from diagnosis into a 30-day or 45-day strategy and execution roadmap.",
              best: "Best for: ongoing content, funnel, ads, or website support.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm"
            >
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-gray-700">
                {item.text}
              </p>
              <p className="mt-6 text-sm font-semibold text-[#7A5C3E]">
                {item.best}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY KATTA STUDIO */}
      <section className="bg-[#F4EFE7]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#7A5C3E]">
                Why Katta Studio
              </p>

              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                We are not here to make your brand louder.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-gray-800">
                Katta Studio sits at the intersection of strategy, storytelling,
                content, and growth.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-800">
                We understand creative businesses because we build one
                ourselves. We do not only look at marketing as posts and ads. We
                look at your whole ecosystem.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "What are you saying?",
                  "Who are you saying it to?",
                  "Why should they trust you?",
                  "What happens after they enquire?",
                  "Where is the sale getting stuck?",
                  "What needs to become simpler?",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white p-5 text-base font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-8 text-2xl font-semibold leading-snug">
                We are here to make your brand clearer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="rounded-[2rem] bg-black p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <p className="mb-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#D8B98F]">
                Get in touch
              </p>

              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Bring us your brand confusion. We’ll bring the diagnosis.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                Whether you are stuck with content, low enquiries, weak
                conversions, unclear positioning, or too many ideas fighting for
                oxygen — the Growth Clinic is a good place to begin.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-6 text-black">
              <h3 className="text-2xl font-semibold">Book a Growth Clinic</h3>

              <p className="mt-4 text-base leading-7 text-gray-700">
                Write to us with your brand name, Instagram or website link, and
                what you feel stuck with.
              </p>

              <div className="mt-6 space-y-3 text-base">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:kulturekatta@gmail.com"
                    className="underline underline-offset-4"
                  >
                    kulturekatta@gmail.com
                  </a>
                </p>

                <p>
                  <span className="font-semibold">WhatsApp:</span>{" "}
                  <a
                    href="https://wa.me/919730244996"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    +91-9730244996
                  </a>
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-block rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Get in touch with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}