import type { Metadata } from "next";
import Link from "next/link";
import SemanticIcon from "../../components/SemanticIcon";
import FestiveBusinessForm from "./FestiveBusinessForm";

export const metadata: Metadata = {
  title: "Last-Minute Festive Business Support | Katta Studio",
  description: "Last-minute festive work pending? Katta Studio offers creative support for campaigns, social media, gifting, packaging, merchandise and sales materials for your business or clients.",
  alternates: { canonical: "/katta-studio/festive-business" },
};

const services = [
  { number: "01", icon: "📣", title: "Social & digital campaigns", detail: "Festive posts, stories, carousels, ad graphics and promotional campaign assets." },
  { number: "02", icon: "🖨️", title: "Print & event collateral", detail: "Flyers, posters, menus, inserts, event signage and other print-ready communication." },
  { number: "03", icon: "📦", title: "Packaging & gifting", detail: "Gift sleeves, packaging artwork, tags, labels, inserts and presentation concepts." },
  { number: "04", icon: "🏬", title: "Retail & in-store design", detail: "Sale graphics, window signage, point-of-sale material and seasonal retail communication." },
  { number: "05", icon: "🎨", title: "Brand design support", detail: "Brand-consistent layouts, visual clean-up, adaptations and campaign-ready design systems." },
  { number: "06", icon: "📊", title: "Sales & business communication", detail: "Pitch decks, catalogues, digital brochures, offer sheets and customer-facing material." },
  { number: "07", icon: "👕", title: "Merchandise & branded products", detail: "Creative artwork for branded merchandise, giveaways, customer gifts and promotional products. Production is quoted separately." },
  { number: "08", icon: "✨", title: "Other urgent creative requirements", detail: "Have a festive brief that doesn’t fit these categories? Tell us what you need and we’ll assess what’s possible." },
];

const projects = [
  { name: "HiLiHiF", icon: "👗", category: "Fashion & clothing", description: "Brand assessment, content strategy, product storytelling and visual-identity support." },
  { name: "The Baking Room Academy", icon: "🧁", category: "Baking education", description: "Workshop campaign planning, social content, event listings, Meta Ads and enquiry-flow support." },
  { name: "KultureKatta", icon: "🎪", category: "Culture & experiences", description: "Brand strategy, website development, content systems and customer journeys for our own cultural platform." },
];

export default function FestiveBusinessPage() {
  return (
    <main className="kk-page-root min-h-screen overflow-x-clip text-[var(--kk-text)]">
      <section className="bg-[var(--kk-surface-alt)] px-6 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-4"><SemanticIcon icon="🎁 📣" label="Festive business support" size="page" /><p className="min-w-0 text-sm font-bold uppercase tracking-[0.18em] leading-relaxed text-[var(--kk-accent)]"><span className="block">Katta Studio</span><span className="block sm:whitespace-nowrap">Festive Business Support</span></p></div>
            <h1 className="mt-4 max-w-[19ch] text-[clamp(2.5rem,4.9vw,4.3rem)] font-bold leading-[1.04] tracking-[-0.05em]">Last-minute festive work pending?<span className="block">We&apos;ve got you covered.</span></h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--kk-text-muted)]">Whether it&apos;s for your business or your clients, Katta Studio helps with creative work for festive campaigns, social media, gifting, packaging, merchandise, sales materials and more. Tell us what you need and when you need it.</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--kk-text-muted)]">We&apos;ll assess the scope, timeline and availability before confirming a quote.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a className="kk-button-dark text-center" href="#enquire">Tell us what you need →</a>
              <a className="kk-button-on-light text-center" href="#services">Explore services</a>
            </div>
          </div>
          <aside className="rounded-[2rem] bg-[#2b1d18] p-7 text-[#fffaf5] shadow-[0_24px_60px_rgba(42,30,25,0.13)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#fff4e8]">For the work that cannot wait</p>
            <ul className="mt-6 space-y-5 text-lg leading-7">
              {['Campaign launching soon?', 'A gift or product range going live?', 'Print material still unfinished?', 'Need a design team for an immediate brief?'].map((item) => (
                <li key={item} className="border-b border-white/15 pb-4 last:border-0 last:pb-0"><span className="mr-3 text-[#e8bc99]" aria-hidden="true">●</span>{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-[#f4dfd0]">Urgent work is subject to scope and availability. We&apos;ll confirm a realistic delivery timeline before starting.</p>
          </aside>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3"><SemanticIcon icon="🎨 📦" label="What we can help with" size="section" /><p className="text-sm font-bold uppercase tracking-[0.17em] text-[var(--kk-accent)]">What we can help with</p></div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.3rem)] font-bold leading-tight tracking-[-0.04em] lg:whitespace-nowrap lg:text-[clamp(1.65rem,2.95vw,2.8rem)]">Creative support for the work that can&apos;t wait.</h2>
          <p className="mt-5 max-w-5xl text-sm leading-6 text-[var(--kk-text-muted)]">Design and digital files are our core offering. Printing, production, photography and specialist services, where available, are quoted separately.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {services.map((service) => (
              <article key={service.number} className={`rounded-[1.6rem] border border-black/10 bg-[var(--kk-surface-alt)] p-6 lg:col-span-4 ${service.number === "07" ? "lg:col-start-3" : ""} ${service.number === "08" ? "lg:col-start-7" : ""}`}>
                <div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-[var(--kk-accent)]">{service.number}</p><SemanticIcon icon={service.icon} label={service.title} size="card" /></div>
                <h3 className="mt-4 text-xl font-bold tracking-tight">{service.title}</h3>
                <p className="mt-3 leading-7 text-[var(--kk-text-muted)]">{service.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center"><a className="kk-button-dark inline-block text-center" href="#enquire">Tell us what you need →</a></div>
        </div>
      </section>

      <section className="bg-[var(--kk-surface-alt)] px-6 py-12 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3"><SemanticIcon icon="🏢 🤝" label="Who we work with" size="section" /><p className="text-sm font-bold uppercase tracking-[0.17em] text-[var(--kk-accent)]">Who we work with</p></div>
          <h2 className="mt-4 text-[clamp(2rem,3.4vw,2.8rem)] font-bold leading-tight tracking-[-0.04em] xl:whitespace-nowrap xl:text-[clamp(1.65rem,2.45vw,2.2rem)]">For businesses with something to launch, promote or deliver.</h2>
          <ul className="mt-6 flex flex-wrap justify-start gap-2" aria-label="Business types we support">
            {["Retail & D2C", "Cafés & restaurants", "Gifting brands", "Events", "Education", "Service businesses", "Other businesses"].map((audience) => (
              <li key={audience} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[var(--kk-text-muted)]">{audience}</li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-3"><SemanticIcon icon="📋 🚀" label="How it works" size="section" /><h3 className="text-xl font-bold tracking-tight">How it works</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[{num: "01", title: "Share the brief", detail: "Tell us what you need, the deliverables and your deadline.", icon: "📝"}, {num: "02", title: "Agree on scope", detail: "We confirm feasibility, deliverables, price and a realistic deadline.", icon: "📋"}, {num: "03", title: "Get it moving", detail: "Once scope, price and timing are agreed, we begin with clear feedback and milestones.", icon: "🚀"}].map(({num,title,detail,icon}) => (
              <article key={num} className="rounded-[1.5rem] border border-black/10 bg-white p-6"><div className="flex items-center justify-between gap-3"><p className="font-bold text-[var(--kk-accent)]">{num}</p><SemanticIcon icon={icon} label={title} size="card" /></div><h4 className="mt-3 text-xl font-bold">{title}</h4><p className="mt-3 leading-7 text-[var(--kk-text-muted)]">{detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3"><SemanticIcon icon="🖼️ 🏷️" label="Selected work" size="section" /><p className="text-sm font-bold uppercase tracking-[0.17em] text-[var(--kk-accent)]">Selected work</p></div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em]">Different businesses. Different challenges.<span className="block">Thoughtful creative solutions.</span></h2>
          <p className="mt-5 leading-7 text-[var(--kk-text-muted)] lg:whitespace-nowrap">A glimpse of the brands and projects we&apos;ve worked on across fashion, education and culture.</p>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.name} className="flex flex-col rounded-[1.6rem] border border-black/10 p-6">
                <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--kk-accent)]">{project.category}</p><SemanticIcon icon={project.icon} label={project.name} size="card" /></div>
                <h3 className="mt-3 text-xl font-bold">{project.name}</h3>
                <p className="mt-3 flex-1 leading-7 text-[var(--kk-text-muted)]">{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-24 bg-[var(--kk-surface-alt)] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div>
            <div className="flex items-center gap-3"><SemanticIcon icon="📨 🏷️" label="Start with your brief" size="section" /><p className="text-sm font-bold uppercase tracking-[0.17em] text-[var(--kk-accent)]">Start with your brief</p></div>
            <h2 className="mt-4 text-[clamp(2.1rem,4vw,3.6rem)] font-bold leading-tight tracking-[-0.04em]">What do you need, and by when?</h2>
            <p className="mt-5 text-lg leading-8 text-[var(--kk-text-muted)]">Share your brief and deadline. We&apos;ll review what&apos;s possible and get back to you with the next steps.</p>
            <p className="mt-5 text-sm leading-7 text-[var(--kk-text-muted)]">Have references or brand guidelines? Mention them in the form; we can request the files when we respond.</p>
          </div>
          <FestiveBusinessForm />
        </div>
      </section>
      <section className="bg-white px-6 py-12"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4"><p className="text-[var(--kk-text-muted)]">Need something beyond a time-sensitive campaign?</p><Link className="font-bold underline underline-offset-4" href="/katta-studio">Explore the full Katta Studio →</Link></div></section>
    </main>
  );
}
