import { experiences } from "@/data/experiences";
export default function HomePage() {
  return (
<main className="min-h-screen bg-[#FAFAF7] text-[#171717] px-6 py-20 space-y-24">        {/* 🔥 HERO */}
      <section className="max-w-4xl">
        <h1 className="text-5xl font-semibold leading-tight">
          Culture is what we do.
        </h1>

        <p className="mt-6 text-xl text-gray-700">
          Workshops, talks, walks, games, food experiences, and thoughtful gatherings — 
          designed to bring people together in more real, participatory ways.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/experiences"
            className="px-6 py-3 bg-white text-black rounded-lg"
          >
            Explore Experiences
          </a>

          <a
            href="/for-organisations"
            className="px-6 py-3 border border-black rounded-lg"
          >
            For Organisations
          </a>
        </div>
      </section>

      {/* 🌱 WHAT IS KUKA */}
      <section className="max-w-3xl">
        <h2 className="text-2xl font-semibold">
          What is KultureKatta?
        </h2>

        <p className="mt-4 text-lg text-gray-700">
          KultureKatta is a neighbourhood-first platform for hands-on, screen-light cultural experiences.
          We bring together artists, spaces, and curious people through making, learning, playing, and sharing.
        </p>
      </section>

      {/* 🌍 EXPLORE KUKA (VERTICALS) */}
      <section>
        <h2 className="text-3xl font-semibold">
          Explore KuKa
        </h2>

               <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Real card from data */}
          <a
            href={`/experiences/${experiences[0].slug}`}
            className="block border rounded-xl overflow-hidden hover:shadow"
          >
            <img
              src={experiences[0].image}
              alt={experiences[0].title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold">{experiences[0].title}</h3>
              <p className="mt-2 text-gray-600">{experiences[0].description}</p>
            </div>
          </a>

          {/* Temporary manual card */}
          <a
            href="/experiences"
            className="block border rounded-xl overflow-hidden hover:shadow"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-5">
              <h3 className="text-xl font-semibold">Coffee Brewing Katta</h3>
              <p className="mt-2 text-gray-600">
                Learn the basics of brewing, tasting, and enjoying coffee more thoughtfully.
              </p>
            </div>
          </a>

          {/* Temporary manual card */}
          <a
            href="/experiences"
            className="block border rounded-xl overflow-hidden hover:shadow"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-5">
              <h3 className="text-xl font-semibold">Juggling Workshop</h3>
              <p className="mt-2 text-gray-600">
                A playful, beginner-friendly session in movement, rhythm, and coordination.
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* 👥 FOR PEOPLE, FAMILIES, AND ORGANISATIONS */}
      <section>
        <h2 className="text-3xl font-semibold">
          Find your way in
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-gray-700">
          Whether you’re here to try something new, plan something meaningful, or build something for a group,
          there’s a way to explore KultureKatta.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/experiences"
            className="block border rounded-xl p-6 hover:shadow"
          >
            <h3 className="text-xl font-semibold">For Curious People</h3>
            <p className="mt-3 text-gray-600">
              Workshops, talks, walks, games, and cultural experiences for individuals and communities.
            </p>
          </a>

          <a
            href="/circle"
            className="block border rounded-xl p-6 hover:shadow"
          >
            <h3 className="text-xl font-semibold">For Families & Kids</h3>
            <p className="mt-3 text-gray-600">
              Screen-light, hands-on experiences for children, parents, and families to learn, play, and explore together.
            </p>
          </a>

          <a
            href="/for-organisations"
            className="block border rounded-xl p-6 hover:shadow"
          >
            <h3 className="text-xl font-semibold">For Organisations</h3>
            <p className="mt-3 text-gray-600">
              Designed experiences for teams, schools, institutions, and communities that want something more meaningful than a standard workshop.
            </p>
          </a>
        </div>
      </section>

      {/* 🌿 WHY KULTUREKATTA */}
      <section>
        <h2 className="text-3xl font-semibold">
          Why KultureKatta
        </h2>

        <p className="mt-4 max-w-3xl text-lg text-gray-700">
          We design experiences that are thoughtful, participatory, and rooted in real life —
          the kind that help people slow down, connect, make, learn, and feel more present.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold">Hands-on</h3>
            <p className="mt-3 text-gray-600">
              We believe culture is something you do — not just something you watch.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold">Screen-light</h3>
            <p className="mt-3 text-gray-600">
              Most of our experiences create space away from constant scrolling and digital noise.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold">Neighbourhood-first</h3>
            <p className="mt-3 text-gray-600">
              We bring meaningful cultural experiences closer to where people already live and gather.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold">Human</h3>
            <p className="mt-3 text-gray-600">
              We care about participation, presence, curiosity, and real connection over performance.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
  <h2 className="text-3xl font-semibold">Explore KuKa</h2>

  <p className="mt-4 text-lg text-gray-700 max-w-3xl">
    Different ways to experience culture, community, curiosity, and connection.
  </p>

  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="rounded-2xl border p-6 bg-white shadow-sm">
      <h3 className="text-xl font-semibold">Engage</h3>
      <p className="mt-3 text-gray-600">
        Workshops, talks, walks, games, and public experiences designed for curious people.
      </p>
    </div>

    <div className="rounded-2xl border p-6 bg-white shadow-sm">
      <h3 className="text-xl font-semibold">Work</h3>
      <p className="mt-3 text-gray-600">
        Culture-led experiences for teams, organisations, institutions, and workplaces.
      </p>
    </div>

    <div className="rounded-2xl border p-6 bg-white shadow-sm">
      <h3 className="text-xl font-semibold">Celebrations</h3>
      <p className="mt-3 text-gray-600">
        Birthdays, milestones, and private gatherings made more meaningful and memorable.
      </p>
    </div>

    <div className="rounded-2xl border p-6 bg-white shadow-sm">
      <h3 className="text-xl font-semibold">Studio</h3>
      <p className="mt-3 text-gray-600">
        Storytelling, strategy, and creative growth support for artists, founders, and brands.
      </p>
    </div>

    <div className="rounded-2xl border p-6 bg-white shadow-sm">
      <h3 className="text-xl font-semibold">Chronicles</h3>
      <p className="mt-3 text-gray-600">
        Stories, reflections, event recaps, discoveries, and ideas from the KuKa universe.
      </p>
    </div>

    <div className="rounded-2xl border p-6 bg-white shadow-sm">
      <h3 className="text-xl font-semibold">Ground</h3>
      <p className="mt-3 text-gray-600">
        Games, movement, outdoor play, and shared experiences that bring people together.
      </p>
    </div>

    <div className="rounded-2xl border p-6 bg-white shadow-sm sm:col-span-2 lg:col-span-1">
      <h3 className="text-xl font-semibold">5 Senses</h3>
      <p className="mt-3 text-gray-600">
        Food, beverages, taste, smell, and sensory-led experiences that connect culture and everyday life.
      </p>
    </div>
  </div>
</section>


            {/* 📖 CHRONICLES PREVIEW */}
      <section>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">From the Chronicles</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-700">
              Stories, reflections, recaps, and cultural rabbit holes from the world of KultureKatta —
              from support circles and community meetups to storytelling sessions, knowledge nuggets, and everyday discovery.
            </p>
          </div>

          <a href="/stories" className="text-sm underline whitespace-nowrap">
            View all
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/stories" className="block border rounded-xl p-6 hover:shadow">
            <h3 className="text-xl font-semibold">
              Why hands-on experiences matter
            </h3>
            <p className="mt-3 text-gray-600">
              A look at why making, doing, and participating stay with us longer than passive consumption.
            </p>
          </a>

          <a href="/stories" className="block border rounded-xl p-6 hover:shadow">
            <h3 className="text-xl font-semibold">
              What happens at a Katta?
            </h3>
            <p className="mt-3 text-gray-600">
              A small peek into how people gather, learn, share, and surprise themselves at KuKa experiences.
            </p>
          </a>

          <a href="/stories" className="block border rounded-xl p-6 hover:shadow">
            <h3 className="text-xl font-semibold">
              Culture in everyday life
            </h3>
            <p className="mt-3 text-gray-600">
              Not just festivals and performances — but the rituals, habits, and practices that shape how we live.
            </p>
          </a>
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="border-t pt-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold">
            Come, be a part of it.
          </h2>

          <p className="mt-4 text-lg text-gray-700">
            Whether you’re looking to try something new, meet people, host an experience,
            or build something meaningful — there’s a place for you here.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/experiences"
              className="px-6 py-3 bg-white text-black rounded-lg"
            >
              Explore Experiences
            </a>

            <a
              href="/for-organisations"
              className="px-6 py-3 border border-black rounded-lg"
            >
              Work with us
            </a>

            <a
              href="/contact"
              className="px-6 py-3 border border-black rounded-lg"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>


    </main>
  );
}