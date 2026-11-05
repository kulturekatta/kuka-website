import Image from "next/image";
import Link from "next/link";
import SemanticIcon from "../../components/SemanticIcon";
import { ArrowDownRight, ArrowRight, CalendarDays, Clock3, Compass, MapPin, Scissors, Sparkles, Ticket } from "lucide-react";

const art = "/images/events/kirigami";
export default function UpcomingExperiencesPage() {
  return <main className="kuka-experiences-surface min-h-screen overflow-x-clip bg-[var(--kk-background)] text-[var(--kk-text)]">
    <section className="relative isolate overflow-hidden bg-[#251C1B] text-[#FFF9ED]">
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-[#B87739]/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="relative z-10"><div className="mb-6"><SemanticIcon icon="📅" label="Upcoming experiences" size="section" /></div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#E7B875]/40 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#F4CB91]"><Sparkles size={15} aria-hidden="true" /> The good kind of getting out</p>
          <h1 className="mt-7 max-w-[720px] font-serif text-[clamp(3.3rem,7vw,6.3rem)] leading-[.99] tracking-[-.045em]">Your next story <span className="italic text-[#EAB66F]">starts here.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#F9EDE1]/75">Curious minds. Clever hands. Unexpected discoveries. Small, soulful experiences worth making time for—whenever curiosity calls.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#upcoming" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#F3C17C] px-6 font-semibold text-[#32241F] transition hover:bg-[#F8D5A2]">See what&apos;s on <ArrowDownRight size={18} aria-hidden="true" /></a>
            <Link href="/experiences" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 font-semibold text-white transition hover:bg-white/10">Explore all possibilities <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[530px] pb-7 pl-5 sm:pl-9">
          <div className="absolute left-0 top-12 z-20 -rotate-12 rounded-xl bg-[#EAC18A] px-5 py-3 text-sm font-bold text-[#33251E] shadow-xl">Make a little magic ✦</div>
          <div className="relative aspect-[4/4.3] overflow-hidden rounded-[45%_45%_2rem_2rem] border-[8px] border-white/10 shadow-[0_30px_90px_rgba(0,0,0,.4)]"><Image src={`${art}/lantern-village.jpg`} alt="Beautiful glowing layered paper lantern featuring a miniature winter village" fill priority sizes="(max-width:1024px) 90vw, 530px" className="object-cover" /></div>
          <div className="absolute -bottom-1 right-0 rounded-2xl border border-[#E9C591]/30 bg-[#392922] px-5 py-4 shadow-2xl"><span className="block text-xs uppercase tracking-[.16em] text-[#F2C385]">Next up</span><span className="mt-1 block font-serif text-2xl">14 November</span></div>
        </div>
      </div>
    </section>

    <section id="upcoming" className="scroll-mt-24 px-6 py-18 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6"><div><div className="mb-5"><SemanticIcon icon="📅" label="Upcoming experiences" size="section" /></div><p className="kk-section-label">The calendar</p><h2 className="kk-section-heading mt-5 text-[clamp(2.5rem,4vw,3.6rem)]">Coming up at the Katta</h2><p className="kk-body mt-6 max-w-xl">One good experience can change an ordinary day. Here&apos;s your invitation.</p></div><span className="inline-flex items-center gap-2 rounded-full bg-[#F1E4D4] px-4 py-2 text-sm font-medium"><CalendarDays size={17} aria-hidden="true"/> November 2026</span></div>
        <article className="group mt-10 grid overflow-hidden rounded-[2rem] border border-[#E8DAC9] bg-white shadow-[0_20px_65px_rgba(78,45,29,.08)] lg:grid-cols-[.96fr_1.04fr]">
          <Link href="/experiences/kirigami-paper-cutting" aria-label="Explore the Kirigami workshop" className="relative block min-h-[320px] overflow-hidden bg-[#241D1B] sm:min-h-[440px]"><Image src={`${art}/lantern-collection.jpg`} alt="Collection of illuminated intricately cut paper lanterns" fill sizes="(max-width:1024px) 100vw, 600px" className="object-cover transition duration-700 group-hover:scale-105"/><span className="absolute left-5 top-5 rounded-full bg-[#F9EBD8] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#4B3224]">Featured experience</span></Link>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12"><p className="inline-flex items-center gap-2 text-sm sm:text-base font-bold uppercase tracking-[.17em] text-[#A16C40]"><Scissors size={17} aria-hidden="true" /> Hands-on / Paper art</p><h3 className="kk-section-heading mt-5 text-[clamp(2.5rem,4vw,3.6rem)]">A little paper.<br/><span className="italic text-[#A76C3B]">A lot of magic.</span></h3><p className="kk-card-body mt-5 max-w-lg">Meet Kirigami: a joyful morning of cutting, creating and bringing a tiny paper world to light, guided by artist Shruti Amritkar.</p>
          <div className="mt-7 grid gap-3 text-sm sm:grid-cols-2"><p className="flex items-start gap-2"><CalendarDays className="mt-0.5 shrink-0 text-[#A16C40]" size={18} aria-hidden="true"/> Sat, 14 Nov 2026</p><p className="flex items-start gap-2"><Clock3 className="mt-0.5 shrink-0 text-[#A16C40]" size={18} aria-hidden="true"/> 10 AM–12 noon</p><p className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0 text-[#A16C40]" size={18} aria-hidden="true"/> QALA, Baner · Pune</p><p className="flex items-start gap-2"><Ticket className="mt-0.5 shrink-0 text-[#A16C40]" size={18} aria-hidden="true"/> ₹1,750 per person</p></div>
          <Link href="/experiences/kirigami-paper-cutting" className="kk-button-dark mt-9 w-fit gap-3">Discover the workshop <ArrowRight size={18} aria-hidden="true" /></Link></div>
        </article>
      </div>
    </section>
    <section className="bg-[#EEE3D3] px-6 py-18 sm:px-10 sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><div className="mb-5"><SemanticIcon icon="🧭" label="Explore more experiences" size="section" /></div><p className="kk-section-label">Curiosity doesn&apos;t have a category</p><h2 className="kk-section-heading mt-5 text-[clamp(2.5rem,4vw,3.6rem)]">More than a workshop. <span className="italic">A whole universe.</span></h2><p className="kk-body mt-6 max-w-2xl">We also make room for trails, food stories, art, music, little adventures and big questions. Explore the kinds of experiences that make KuKa, KuKa.</p></div><Link href="/experiences" className="kk-button-on-light w-fit gap-2"><Compass size={19} aria-hidden="true"/> Discover experiences <ArrowRight size={17} aria-hidden="true"/></Link></div></section>
  </main>;
}
