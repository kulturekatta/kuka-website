import WorkWithUsApplicationForm from "./WorkWithUsApplicationForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work With Us | Katta Studio",
  description:
    "Explore employment, internship, freelance and project-based opportunities with Katta Studio.",
};

const opportunityTypes = [
  {
    number: "01",
    title: "Design & Visual Communication",
    text: "Create thoughtful visual communication for brands, websites, social media, brochures, presentations and digital campaigns.",
    roles: [
      "Graphic designers",
      "Brand designers",
      "Social media designers",
      "Presentation designers",
    ],
  },
  {
    number: "02",
    title: "Content & Communication",
    text: "Help businesses communicate clearly through useful, audience-aware content across websites, social platforms and campaigns.",
    roles: [
      "Copywriters",
      "Content writers",
      "Social media creators",
      "Video and reel creators",
    ],
  },
  {
    number: "03",
    title: "Websites & Digital Presence",
    text: "Design, build and improve practical digital experiences that help small businesses become more visible and generate enquiries.",
    roles: [
      "Next.js developers",
      "WordPress developers",
      "UI and UX designers",
      "SEO and analytics specialists",
    ],
  },
  {
    number: "04",
    title: "Research, Outreach & Growth",
    text: "Support prospect research, business audits, lead qualification, outreach preparation and client coordination.",
    roles: [
      "Research associates",
      "Outreach associates",
      "Business development interns",
      "Account coordinators",
    ],
  },
  {
    number: "05",
    title: "Specialist Collaborators",
    text: "Bring specialised expertise into selected assignments where a client or project requires additional capabilities.",
    roles: [
      "Photographers",
      "Videographers",
      "Performance marketers",
      "Automation specialists",
    ],
  },
  {
    number: "06",
    title: "Internships & Early-Career Roles",
    text: "Learn through real business projects while developing practical skills, professional discipline and a strong body of work.",
    roles: [
      "Design interns",
      "Content interns",
      "Research interns",
      "Digital marketing interns",
    ],
  },
];

const qualities = [
  {
    title: "Clarity",
    text: "You communicate clearly, ask useful questions and keep people informed.",
  },
  {
    title: "Reliability",
    text: "You respect timelines, take ownership and do not disappear when something becomes difficult.",
  },
  {
    title: "Curiosity",
    text: "You are willing to learn new tools, understand the client and explore better ways of working.",
  },
  {
    title: "Thoughtfulness",
    text: "You care about the purpose behind the work, not only how the final output looks.",
  },
  {
    title: "Openness",
    text: "You can receive feedback, discuss disagreements respectfully and improve your work.",
  },
  {
    title: "Professionalism",
    text: "You respect clients, collaborators, confidential information and agreed ways of working.",
  },
];

const collaborationSteps = [
  {
    step: "01",
    title: "Tell us about yourself",
    text: "Share your experience, interests, availability and the kind of opportunity you are looking for.",
  },
  {
    step: "02",
    title: "Show us your work",
    text: "Send relevant samples, case studies, links or self-initiated work that helps us understand your abilities.",
  },
  {
    step: "03",
    title: "Have a conversation",
    text: "If there appears to be a fit, we will discuss the work, expectations, availability and compensation clearly.",
  },
  {
    step: "04",
    title: "Start with clarity",
    text: "Every engagement should begin with an agreed role, scope, timeline, responsibilities and payment structure.",
  },
];

export default function WorkWithKattaStudioPage() {
  return (
    <div className="kk-page-root kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light relative overflow-hidden pb-20 pt-16 md:pb-24 md:pt-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center sm:px-10 lg:px-16">
          <p className="kk-page-label text-[var(--kk-accent)]">Katta Studio</p>

          <h1 className="kk-page-heading max-w-5xl">Work With Us</h1>

          <p className="kk-page-intro mt-8 max-w-4xl">
            Join us in helping founders, creators and owner-led businesses build
            clearer brands, stronger websites and more meaningful digital
            presences.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#application-form" className="kk-button-dark">
              Apply to Work With Us
            </a>

            <Link href="/katta-studio" className="kk-button-on-light">
              Explore Katta Studio
            </Link>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="kk-section-light pb-20 pt-12 md:pb-24 md:pt-2">
        <div className="kk-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kk-section-label mb-5">How We Work</p>

            <h2 className="kk-section-heading mt-4">
              Small team. Real work. Meaningful responsibility.
            </h2>

            <div className="kk-body-large mx-auto mt-8 max-w-3xl space-y-6">
              <p>
                Katta Studio is a growth diagnosis, strategy and digital
                presence studio for founders, creators and small businesses.
              </p>

              <p>
                Our work includes websites, digital presence audits, brand
                communication, content, social media systems, business research
                and practical growth planning.
              </p>

              <p className="text-[var(--kk-text)]">
                We are building a flexible network of team members, interns,
                freelancers and specialist collaborators who care about creating
                useful work for real businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITY TYPES */}
      <section className="kk-section-cream pb-20 pt-10 md:pb-24 md:pt-14">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label mb-5">Opportunities</p>

            <h2 className="kk-section-heading">
              Different ways to work with Katta Studio.
            </h2>

            <p className="kk-body mt-6">
              Opportunities may be full-time, part-time, internship-based,
              freelance, remote, hybrid or project-specific, depending on the
              role and the work available.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunityTypes.map((opportunity) => (
              <article
                key={opportunity.title}
                className="kk-card kk-card--interactive min-h-[470px]"
              >
                <p className="kk-card-number">{opportunity.number}</p>

                <h3 className="kk-card-title mt-5">{opportunity.title}</h3>

                <p className="kk-card-body mt-5">{opportunity.text}</p>

                <div className="kk-card-footer">
                  <p className="kk-card-label">Possible roles</p>

                  <ul className="mt-4 space-y-3">
                    {opportunity.roles.map((role) => (
                      <li key={role} className="kk-small-text flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--kk-accent)]"
                        />

                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE APPRECIATE */}
      <section className="kk-section-light pb-16 pt-8 md:pb-20 md:pt-6">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label mb-5">What We Appreciate</p>

            <h2 className="kk-section-heading">
              Skills matter. The way you work matters too.
            </h2>

            <p className="kk-body mt-6">
              We value people who combine creative or technical ability with
              responsibility, thoughtfulness and respect for the people behind
              every project.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {qualities.map((quality) => (
              <article
                key={quality.title}
                className="kk-card kk-card--interactive min-h-[220px]"
              >
                <h3 className="kk-card-title">{quality.title}</h3>

                <p className="kk-card-body mt-5">{quality.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW COLLABORATION WORKS */}
      <section className="kk-section-cream pb-20 pt-10 md:pb-24 md:pt-6">
        <div className="kk-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kk-section-label mb-5">The Process</p>

            <h2 className="kk-section-heading">
              How collaboration with Katta Studio works.
            </h2>

            <p className="kk-body mt-6">
              We prefer clear conversations and defined expectations over vague
              promises, mysterious job descriptions and interpretive dance
              around payment.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {collaborationSteps.map((item) => (
              <article key={item.step} className="kk-card kk-card--interactive">
                <p className="kk-card-number">{item.step}</p>

                <h3 className="kk-card-title mt-5">{item.title}</h3>

                <p className="kk-card-body mt-4">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORKING ARRANGEMENTS */}
      <section className="kk-section-light pb-16 pt-8 md:pb-20 md:pt-6">
        <div className="kk-container">
          <div className="grid gap-8 md:grid-cols-2">
            <article className="kk-card">
              <p className="kk-card-label mb-5">Employment & Internships</p>

              <h2 className="kk-card-title">Join the working team.</h2>

              <p className="kk-card-body mt-6">
                Suitable for people who want to work closely with Katta Studio
                across ongoing client projects, internal systems, research,
                content, design or business development.
              </p>

              <p className="kk-card-body mt-5">
                Availability depends on current requirements. Sending an
                application does not guarantee an immediate opening, but it
                helps us identify people for suitable roles.
              </p>
            </article>

            <article className="kk-card">
              <p className="kk-card-label mb-5">Freelance & Project Work</p>

              <h2 className="kk-card-title">
                Collaborate when your skills fit.
              </h2>

              <p className="kk-card-body mt-6">
                Suitable for independent professionals who can support a defined
                assignment, production requirement or specialist area without
                joining the core team permanently.
              </p>

              <p className="kk-card-body mt-5">
                The scope, timeline, deliverables, review process and
                compensation should be agreed before the project begins.
              </p>
            </article>
          </div>
        </div>
      </section>

      <WorkWithUsApplicationForm />
    </div>
  );
}
