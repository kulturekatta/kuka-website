export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#1F1B16]">
      {/* Hero Section */}
      <section className="bg-[#F7F1E8]">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 pt-10 pb-20 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pt-14">
          <div>
            <p className="mb-5 text-3xl font-semibold uppercase tracking-[0.18em] text-[#8B3A2B] md:text-4xl">
              Kulture Katta
            </p>

            <h1 className="max-w-3xl font-serif text-5xl leading-tight text-[#1F1B16] md:text-7xl">
              Culture is what we do.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4A4038]">
              It is what we read. What we listen to. What we eat. What we make.
              What we remember. What we pass on.
            </p>

            <p className="mt-4 max-w-xl text-lg leading-8 text-[#4A4038]">
              Workshops, walks, getaways, games, conversations, and hands-on experiences
              that bring forth and awaken, a sense of curiosity, creativity, and community.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/experiences"
                className="rounded-full bg-[#8B3A2B] px-6 py-3 text-white transition hover:bg-[#6f2f24]"
              >
                Explore Kattas
              </a>

              <a
                href="/contact"
                className="rounded-full border border-[#8B3A2B] px-6 py-3 text-[#8B3A2B] transition hover:bg-[#8B3A2B] hover:text-white"
              >
                Talk To Us
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] shadow-xl">
            <img
              src="/images/home/hero-katta.jpg"
              alt="People at a KultureKatta experience"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="bg-white text-[#1F1B16]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              Culture is not always loud.
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-[#333333] md:text-xl">
              <p>
                It is in the stories we grow up with, the movies we watch,
                <br />
                the art we try to understand, the food we eat, the songs we
                carry,
                <br />
                the games we play, the objects we keep, the places we return to,
                <br />
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
        </div>
      </section>

      {/* Katta Section */}
      <section className="bg-[#111111] text-[#F7F1E8]">
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
      <section className="bg-[#F7F1E8] text-[#1F1B16]">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
              This is where KultureKatta begins.
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
                music, books, heritage, nature, science, movement, play, or
                simply curiosity.
              </p>

              <p>
                All of them are spaces to explore, express, connect, and belong
                — at your own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-[#8B3A2B] text-[#FFF8EF]">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="rounded-[2rem] bg-[#FFF8EF] p-8 shadow-sm md:p-14">
            <div className="space-y-4 text-lg leading-relaxed text-[#1F1B16] md:text-xl">
              <p>You come as you are.</p>
              <p>You try something.</p>
              <p>You meet someone.</p>
              <p>You leave with a story.</p>

              <div className="space-y-3 pt-6 text-[#4A4038]">
                <p>Sometimes with a plant.</p>
                <p>Sometimes with a pot.</p>
                <p>Sometimes with a song stuck in your head.</p>
              </div>
            </div>

            <h2 className="mt-12 text-4xl font-semibold leading-tight text-[#8B3A2B] md:text-6xl">
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
        </div>
      </section>
    </main>
  );
}