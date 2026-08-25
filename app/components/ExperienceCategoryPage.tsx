import Link from "next/link";
import IconLead from "./IconLead";
import SemanticIcon from "./SemanticIcon";

type ExperienceItem = {
  icon: string;
  title: string;
  text: string;
};

type ExperienceCategoryPageProps = {
  icon: string;
  iconLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  firstSectionTitle: string;
  firstSectionIntro: string;
  experiences: ExperienceItem[];
  secondSectionTitle: string;
  secondSectionIntro: string;
  process: ExperienceItem[];
  closingTitle: string;
  closingText: string;
  primaryCta?: string;
};

export default function ExperienceCategoryPage({
  icon,
  iconLabel,
  eyebrow,
  title,
  intro,
  firstSectionTitle,
  firstSectionIntro,
  experiences,
  secondSectionTitle,
  secondSectionIntro,
  process,
  closingTitle,
  closingText,
  primaryCta = "Plan this experience",
}: ExperienceCategoryPageProps) {
  return (
    <div className="kk-page-root kk-site-bg min-h-screen">
      <section className="kk-section-light pt-16 pb-20 md:pt-20 md:pb-24">
        <div className="kk-container text-left">
          <IconLead icon={icon} label={iconLabel} size="page" />

          <p className="kk-page-label text-[var(--kk-accent)]">{eyebrow}</p>

          <h1 className="kk-page-heading max-w-5xl">{title}</h1>

          <p className="kk-page-intro mt-8 max-w-4xl">{intro}</p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
            <Link href="/contact" className="kk-button-dark">
              {primaryCta}
            </Link>

            <Link href="/experiences" className="kk-button-on-light">
              Explore all experiences
            </Link>
          </div>
        </div>
      </section>

      <section className="kk-section-cream pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="kk-container">
          <div className="max-w-3xl text-left">
            <IconLead
              icon="📋"
              label="What this experience can include"
            />

            <p className="kk-section-label mb-5">What it can include</p>
            <h2 className="kk-section-heading">{firstSectionTitle}</h2>
            <p className="kk-body mt-6">{firstSectionIntro}</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((item) => (
              <article
                key={item.title}
                className="kk-card kk-card--interactive min-h-[285px] text-left"
              >
                <SemanticIcon icon={item.icon} label={item.title} size="card" />
                <h3 className="kk-card-title mt-5">{item.title}</h3>
                <p className="kk-card-body mt-4 flex-1">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-light pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="kk-container">
          <div className="max-w-3xl text-left">
            <IconLead icon="⚙️" label="How this experience works" />

            <p className="kk-section-label mb-5">How it works</p>
            <h2 className="kk-section-heading">{secondSectionTitle}</h2>
            <p className="kk-body mt-6">{secondSectionIntro}</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {process.map((item) => (
              <article
                key={item.title}
                className="kk-card kk-card--interactive min-h-[270px] text-left"
              >
                <SemanticIcon icon={item.icon} label={item.title} size="card" />
                <h3 className="kk-card-title mt-5">{item.title}</h3>
                <p className="kk-card-body mt-4">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section-cream pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="kk-container">
          <div className="kk-panel max-w-5xl text-left">
            <IconLead icon="🌟" label="Plan this experience" />
            <h2 className="kk-section-heading">{closingTitle}</h2>
            <p className="kk-body mt-6 max-w-3xl">{closingText}</p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="kk-button-dark">
                {primaryCta}
              </Link>

              <Link href="/for-organizations" className="kk-button-on-light">
                Plan for an organization
              </Link>

              <Link href="/private-experiences" className="kk-button-on-light">
                Plan for a private group
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
