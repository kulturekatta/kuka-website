export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-3 text-sm uppercase tracking-wide text-gray-500">
          About Us
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
          Culture is what we do.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
          KultureKatta creates hands-on, participatory, screen-light experiences
          that help people reconnect with curiosity, creativity, and community.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">What Katta means</h2>
          <p className="mt-4 leading-8 text-gray-700">
            In Marathi, a katta is the ledge by the kitchen, the street corner,
            or the neighbourhood step — a place where something is always
            cooking, and people gather to talk, listen, and share ideas. That
            spirit — informal, creative, and alive — is what KultureKatta brings
            into everyday life.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">What we mean by culture</h2>
          <p className="mt-4 leading-8 text-gray-700">
            We do not see culture as something distant, formal, or separate from
            life. It lives in what we make, how we gather, how we move, how we
            learn, and how we spend time together. For us, culture is practice —
            not performance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-semibold">Why KultureKatta exists</h2>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-700">
          In an increasingly automated and screen-heavy world, presence, touch,
          and togetherness are becoming rare. KultureKatta exists to protect that
          space. We design tactile, human experiences where people can make,
          think, explore, reflect, and belong — together.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="text-3xl font-semibold">What we do</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold">Workshops & Labs</h3>
            <p className="mt-3 text-gray-700">
              Hands-on sessions where people make, taste, build, learn, and
              discover.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold">Talks & Salons</h3>
            <p className="mt-3 text-gray-700">
              Spaces for ideas, stories, questions, and conversations that do
              not need to rush to conclusions.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold">Walks & Trails</h3>
            <p className="mt-3 text-gray-700">
              Experiences that turn neighbourhoods, streets, and cities into
              places of curiosity and discovery.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold">Gatherings & Celebrations</h3>
            <p className="mt-3 text-gray-700">
              Shared experiences built around making, playing, connecting, and
              meaningful time together.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-semibold">What we stand for</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-6">
            <h3 className="text-lg font-semibold">Participation over performance</h3>
            <p className="mt-3 text-gray-700">
              We care more about doing than displaying.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-6">
            <h3 className="text-lg font-semibold">Depth over hype</h3>
            <p className="mt-3 text-gray-700">
              We would rather build something meaningful than something loud.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-6">
            <h3 className="text-lg font-semibold">Screen-light, human-first</h3>
            <p className="mt-3 text-gray-700">
              Most of our gatherings are designed to bring people back to real
              presence and connection.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-6">
            <h3 className="text-lg font-semibold">Curiosity as a way of life</h3>
            <p className="mt-3 text-gray-700">
              We want culture to become part of everyday living, not an
              occasional event.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-semibold">How we work</h2>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-700">
          KultureKatta connects artists and facilitators, venues and spaces, and
          curious participants. We grow neighbourhood by neighbourhood, keeping
          each experience local, personal, and alive.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">
          Come, hang, meet, play, learn.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-700">
          Whether you are here to try something new, slow down, meet people, or
          build culture into everyday life, there is a Katta for you.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/experiences"
            className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
          >
            Explore Experiences
          </a>
          <a
            href="/contact"
            className="rounded-full border border-black px-6 py-3 text-sm font-medium text-black"
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}