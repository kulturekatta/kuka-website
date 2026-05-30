import Link from "next/link";

const contactOptions = [
  {
    label: "General enquiry",
    title: "Ask us anything",
    text: "Have a question about KultureKatta, our events, cities, formats, or upcoming plans? Start here.",
    buttonText: "Email us",
    href: "mailto:hello@kulturekatta.com?subject=General%20Enquiry%20for%20KultureKatta",
  },
  {
    label: "Partnerships",
    title: "Work / Partner with KultureKatta",
    text: "For venues, cafés, studios, cultural spaces, brands, institutions, collectives, and collaborators who want to create something meaningful with us.",
    buttonText: "Partner with us",
    href: "mailto:hello@kulturekatta.com?subject=Partnership%20Enquiry%20for%20KultureKatta",
  },
  {
    label: "Volunteer",
    title: "Volunteer with KultureKatta",
    text: "Want to help at events, support artists, assist with community building, documentation, research, or on-ground coordination?",
    buttonText: "Volunteer with us",
    href: "mailto:hello@kulturekatta.com?subject=Volunteer%20with%20KultureKatta",
  },
  {
    label: "Host",
    title: "Host a Katta",
    text: "Are you an artist, facilitator, storyteller, maker, teacher, performer, chef, walker, thinker, or curious human with something to share?",
    buttonText: "Become a host",
    href: "mailto:hello@kulturekatta.com?subject=Host%20a%20Katta",
  },
  {
    label: "Schools / Companies",
    title: "Bring KultureKatta to your space",
    text: "For schools, colleges, corporates, NGOs, housing societies, libraries, and communities looking for warm, participatory cultural experiences.",
    buttonText: "Bring KuKa to us",
    href: "mailto:hello@kulturekatta.com?subject=Bring%20KultureKatta%20to%20Our%20Space",
  },
  {
    label: "Press / Media",
    title: "Media, stories and features",
    text: "For interviews, media features, press enquiries, cultural stories, founder conversations, and documentation requests.",
    buttonText: "Contact for media",
    href: "mailto:hello@kulturekatta.com?subject=Media%20Enquiry%20for%20KultureKatta",
  },
];

const quickLinks = [
  {
    title: "Email",
    value: "hello@kulturekatta.com",
    href: "mailto:hello@kulturekatta.com",
  },
  {
    title: "WhatsApp / Call",
    value: "+91 97302 44996",
    href: "https://wa.me/919730244996",
  },
  {
    title: "Instagram",
    value: "@kulturekatta",
    href: "https://www.instagram.com/kulturekatta",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#17110D]">
      {/* Hero Section */}
      <section className="bg-[#17110D] px-6 py-24 text-[#FAF7F2] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-3xl font-bold uppercase tracking-[0.28em] text-[#D8B98C]">
            Contact KultureKatta
          </p>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
                <span className="block">Let’s make</span>
                <span className="block">something happen.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#E8D8C5] sm:text-xl">
                Want to host, collaborate, volunteer, partner, or bring a Katta
                to your space? We’d love to hear from you.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#3A2A20] bg-[#211812] p-8 shadow-sm">
              <p className="text-2xl font-black text-[#FAF7F2]">
                Let’s start at the very beginning.
              </p>

              <p className="mt-4 leading-7 text-[#DCCAB6]">
                Some conversations become workshops. Some become
                collaborations. Some become communities. Some simply begin with
                a hello — suspiciously powerful little word.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col">
                <Link
                  href="https://wa.me/919730244996"
                  className="rounded-full bg-[#FAF7F2] px-7 py-4 text-center text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#D8B98C]"
                >
                  WhatsApp us
                </Link>

                <Link
                  href="mailto:hello@kulturekatta.com"
                  className="rounded-full border border-[#D8B98C] px-7 py-4 text-center text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#D8B98C] hover:text-[#17110D]"
                >
                  Email us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="bg-[#FAF7F2] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-3xl font-bold uppercase tracking-[0.28em] text-[#8A4B2A]">
              Choose your doorway
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              <span className="block">What would you like</span>
              <span className="block">to talk about?</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#5F4A3D]">
              Whether you want to attend, host, partner, volunteer, or build a
              cultural experience with us, there’s a place to begin.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contactOptions.map((item) => (
              <div
                key={item.title}
                className="group flex min-h-[320px] flex-col rounded-[2rem] border border-[#E8D8C5] bg-[#FFFDF8] p-8 shadow-sm transition hover:-translate-y-1 hover:border-[#8A4B2A] hover:shadow-md"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8A4B2A]">
                  {item.label}
                </p>

                <h3 className="mt-5 text-2xl font-black leading-tight text-[#17110D]">
                  {item.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-[#5F4A3D]">
                  {item.text}
                </p>

                <Link
                  href={item.href}
                  className="mt-8 inline-flex w-fit rounded-full bg-[#17110D] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition group-hover:bg-[#8A4B2A]"
                >
                  {item.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Contact Details */}
      <section className="bg-[#EFE2D0] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-3xl font-bold uppercase tracking-[0.28em] text-[#8A4B2A]">
              Direct contact
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              <span className="block">Prefer the</span>
              <span className="block">old-school way?</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5F4A3D]">
              Email, call, WhatsApp, or find us on Instagram. We are very much
              real humans. No mysterious ticketing portal energy here.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-2xl gap-5">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="rounded-[2rem] border border-[#D8B98C] bg-[#FFFDF8] p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#8A4B2A] hover:shadow-md"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8A4B2A]">
                  {item.title}
                </p>

                <p className="mt-4 break-words text-xl font-black leading-snug text-[#17110D]">
                  {item.value}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Placeholder */}
      <section className="bg-[#FFFDF8] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-3xl font-bold uppercase tracking-[0.28em] text-[#8A4B2A]">
              Enquiry form
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              <span className="block">Tell us what</span>
              <span className="block">you’re thinking.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5F4A3D]">
              This can later connect to your actual form, CRM, Google Sheet,
              email, or whatever slightly chaotic but effective system we use
              before becoming fancy.
            </p>
          </div>

          <form className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-[#E8D8C5] bg-[#FAF7F2] p-8 shadow-sm">
            <div className="grid gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-m font-bold uppercase tracking-[0.18em] text-[#8A4B2A]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-3 w-full rounded-2xl border border-[#E8D8C5] bg-[#FFFDF8] px-5 py-4 text-[#17110D] outline-none transition placeholder:text-[#9B8A7C] focus:border-[#8A4B2A]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-m font-bold uppercase tracking-[0.18em] text-[#8A4B2A]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-3 w-full rounded-2xl border border-[#E8D8C5] bg-[#FFFDF8] px-5 py-4 text-[#17110D] outline-none transition placeholder:text-[#9B8A7C] focus:border-[#8A4B2A]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="text-m font-bold uppercase tracking-[0.18em] text-[#8A4B2A]"
                >
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91..."
                  className="mt-3 w-full rounded-2xl border border-[#E8D8C5] bg-[#FFFDF8] px-5 py-4 text-[#17110D] outline-none transition placeholder:text-[#9B8A7C] focus:border-[#8A4B2A]"
                />
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="text-m font-bold uppercase tracking-[0.18em] text-[#8A4B2A]"
                >
                  I want to
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="mt-3 w-full rounded-2xl border border-[#E8D8C5] bg-[#FFFDF8] px-5 py-4 text-[#17110D] outline-none transition focus:border-[#8A4B2A]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option value="attend">Attend an experience</option>
                  <option value="partner">Work / partner with KultureKatta</option>
                  <option value="volunteer">Volunteer with KultureKatta</option>
                  <option value="host">Host a Katta</option>
                  <option value="school">Bring KuKa to a school / college</option>
                  <option value="corporate">Bring KuKa to a company</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-m font-bold uppercase tracking-[0.18em] text-[#8A4B2A]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us a little more..."
                  className="mt-3 w-full resize-none rounded-2xl border border-[#E8D8C5] bg-[#FFFDF8] px-5 py-4 text-[#17110D] outline-none transition placeholder:text-[#9B8A7C] focus:border-[#8A4B2A]"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-[#17110D] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#8A4B2A]"
              >
                Send enquiry
              </button>

              <p className="text-sm leading-6 text-[#5F4A3D]">
                Note: This form is currently front-end only. Once your backend
                or form tool is connected, the submit button can send real
                enquiries.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#F6D8C6] px-6 py-24 text-[#17110D] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-3xl font-bold uppercase tracking-[0.28em] text-[#8A4B2A]">
            Start with hello
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            <span className="block">Some ideas need a room,</span>
            <span className="block">a table, and a few curious people.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5F4A3D]">
            If you have a space, a skill, a community, a question, a wild idea,
            or just a strong feeling that culture should be more alive — talk to
            us.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://wa.me/919730244996"
              className="rounded-full bg-[#17110D] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#FAF7F2] transition hover:bg-[#8A4B2A]"
            >
              WhatsApp us
            </Link>

            <Link
              href="/experiences"
              className="rounded-full border border-[#17110D] bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#17110D] transition hover:bg-[#17110D] hover:text-[#FAF7F2]"
            >
              Explore experiences
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}