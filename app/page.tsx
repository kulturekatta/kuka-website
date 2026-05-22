import { experiences } from "@/data/experiences";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#171717]">
      {/* Hero Section */}
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 md:px-10">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#6F6A5F]">
            KultureKatta
          </p>

          <h1 className="mb-10 max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Culture is what we do.
          </h1>

          <div className="space-y-2 text-xl leading-relaxed text-[#2A2A2A] md:text-2xl">
            <p>It is what we read.</p>
            <p>What we listen to.</p>
            <p>What we eat.</p>
            <p>What we see.</p>
            <p>What we feel.</p>
            <p>What we celebrate.</p>
            <p>What we question.</p>
            <p>What we remember.</p>
            <p>What shapes our thoughts.</p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/experiences"
              className="rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#333333]"
            >
              Explore Kattas
            </a>

            <a
              href="/contact"
              className="rounded-full border border-[#171717] px-6 py-3 text-sm font-medium text-[#171717] transition hover:bg-[#171717] hover:text-white"
            >
              Talk To Us
            </a>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
            Culture is not always loud.
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-[#333333] md:text-xl">
            <p>
              It is in the stories we grow up with, the movies we watch, <br />
              the art we try to understand, the food we eat, the songs we carry, <br />
              the games we play, the objects we keep, the places we return to, <br />
              and the little things we do without even realising.
            </p>

            <p>
              It is not always performed. 
              <br />
              It is often quiet, everyday, subconscious.
            </p>

            <p>
              It shapes how we see the world.
              <br />
              And how we move through it.
            </p>
          </div>
        </div>
      </section>

      {/* Katta Section */}
      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="max-w-4xl">
            <h2 className="mb-8 text-4xl font-semibold leading-tight md:text-6xl">
              And then, there is the katta.
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-[#E8E4DA] md:text-xl">
              <p>In Marathi, a katta is a familiar gathering place.</p>

              <div className="space-y-2">
                <p>A ledge.</p>
                <p>A street corner.</p>
                <p>A neighbourhood step.</p>
                <p>
                  A place where people sit, talk, laugh, debate, listen, and
                  linger.
                </p>
              </div>

              <div className="space-y-2">
                <p>No pressure.</p>
                <p>No performance.</p>
                <p>No need to be impressive.</p>
              </div>

              <p>Just people, stories, ideas, and time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* KultureKatta Definition Section */}
<section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
  <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
    <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
      That is where KultureKatta begins.
    </h2>

    <div className="space-y-8 text-lg leading-relaxed text-[#333333] md:text-xl">
      <p>
        Think of KultureKatta as a place to try a new skill, hear a new
        story, meet new people, and spend time differently.
      </p>

      <div className="space-y-2 text-[#171717]">
        <p>A place where you can show up as you are.</p>
        <p>No pressure.</p>
        <p>No performance.</p>
        <p>No need to be impressive.</p>
      </div>

      <div className="grid gap-3 text-[#171717] sm:grid-cols-2">
        <p>A workshop.</p>
        <p>A walk.</p>
        <p>A conversation.</p>
        <p>A game.</p>
        <p>A shared table.</p>
        <p>A small gathering that opens up something new.</p>
      </div>

      <p>
        Some Kattas are about art. Some are about food. Some are about
        music, books, heritage, nature, science, movement, play, or simply
        curiosity.
      </p>

      <p>
        All of them are spaces to explore, express, connect, and belong — at
        your own pace.
      </p>
    </div>
  </div>
</section>

      {/* Closing Section */}
<section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
  <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-14">
    <div className="space-y-4 text-lg leading-relaxed text-[#333333] md:text-xl">
      <p>You come as you are.</p>
      <p>You try something.</p>
      <p>You meet someone.</p>
      <p>You leave with a story.</p>

      <div className="pt-6 space-y-3 text-[#555555]">
        <p>Sometimes with a plant.</p>
        <p>Sometimes with a pot.</p>
        <p>Sometimes with a song stuck in your head.</p>
      </div>
    </div>

    <h2 className="mt-12 text-4xl font-semibold leading-tight text-[#171717] md:text-6xl">
      That is KultureKatta.
    </h2>

    <div className="mt-10 flex flex-wrap gap-4">
      <a
        href="/experiences"
        className="rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#333333]"
      >
        See What&apos;s Coming Up
      </a>

      <a
        href="/contact"
        className="rounded-full border border-[#171717] px-6 py-3 text-sm font-medium text-[#171717] transition hover:bg-[#171717] hover:text-white"
      >
        Plan A Katta With Us
      </a>
    </div>
  </div>
</section>
    </main>
  );
}