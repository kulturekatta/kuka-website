import Link from "next/link";

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

function PageIcon({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="mb-6 flex justify-start">
      <span
        role="img"
        aria-label={label}
        className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-black/10 bg-white text-[2.7rem] leading-none shadow-sm"
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        }}
      >
        {icon}
      </span>
    </div>
  );
}

function SmallIcon({ icon, label }: { icon: string; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="text-[2.5rem] leading-none"
      style={{
        fontFamily:
          '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
      }}
    >
      {icon}
    </span>
  );
}

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
          <PageIcon icon={icon} label={iconLabel} />

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
                <SmallIcon icon={item.icon} label={item.title} />
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
                <SmallIcon icon={item.icon} label={item.title} />
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
            <PageIcon icon={icon} label={iconLabel} />
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
