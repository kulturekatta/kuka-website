import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageLayoutProps = {
  icon: string;
  iconLabel: string;
  title: string;
  description: string;
  lastUpdated: string;
  currentPath: string;
  sections: LegalSection[];
};

const legalPages = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Cookie Policy",
    href: "/cookie-policy",
  },
  {
    label: "Terms of Use",
    href: "/terms-of-use",
  },
];

function LegalIcon({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-black/10 bg-white text-[2.6rem] leading-none shadow-sm md:h-24 md:w-24 md:text-[3rem]"
      style={{
        fontFamily:
          '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
      }}
    >
      {icon}
    </div>
  );
}

function ContentsLinks({
  sections,
}: {
  sections: LegalSection[];
}) {
  return (
    <ol className="mt-5 space-y-3">
      {sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="group flex items-start gap-3 text-sm leading-6 text-[var(--kk-text-muted)] transition-colors hover:text-[var(--kk-accent)]"
          >
            <span className="shrink-0 font-semibold text-[var(--kk-accent)]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span>{section.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function LegalPageLayout({
  icon,
  iconLabel,
  title,
  description,
  lastUpdated,
  currentPath,
  sections,
}: LegalPageLayoutProps) {
  const relatedPages = legalPages.filter(
    (page) => page.href !== currentPath,
  );

  return (
    <div className="kk-page-root kk-site-bg min-h-screen">
      {/* HERO */}
      <section className="kk-section-light overflow-hidden">
        <div className="kk-container text-center">
          <div className="flex justify-center">
            <LegalIcon icon={icon} label={iconLabel} />
          </div>

          <p className="kk-page-label mt-6">Legal</p>

          <h1 className="kk-page-heading mx-auto mt-5 max-w-4xl">
            {title}
          </h1>

          <p className="kk-page-intro mx-auto mt-7 max-w-3xl">
            {description}
          </p>

          <div className="mt-8 flex justify-center">
            <span className="kk-chip">
              Last updated: {lastUpdated}
            </span>
          </div>
        </div>
      </section>

      {/* LEGAL CONTENT */}
      <section className="kk-section-cream kk-section-padding">
        <div className="kk-container">
          {/* MOBILE CONTENTS */}
          <details className="kk-panel mb-8 lg:hidden">
            <summary className="cursor-pointer font-semibold text-[var(--kk-text)]">
              On this page
            </summary>

            <ContentsLinks sections={sections} />
          </details>

          <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* DESKTOP CONTENTS */}
            <aside className="sticky top-28 hidden lg:block">
              <div className="kk-card kk-card--compact">
                <p className="kk-card-label">On this page</p>

                <ContentsLinks sections={sections} />
              </div>
            </aside>

            {/* SECTIONS */}
            <div className="min-w-0 space-y-6">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="kk-card scroll-mt-28"
                >
                  <p className="kk-card-label">
                    Section {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2 className="kk-card-title mt-4">
                    {section.title}
                  </h2>

                  <div className="kk-card-body mt-6 space-y-4">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED LEGAL PAGES */}
      <section className="kk-section-light kk-section-padding">
        <div className="kk-container">
          <div className="kk-panel mx-auto max-w-4xl text-center">
            <div className="flex justify-center">
              <LegalIcon icon="🗂️" label="Legal information" />
            </div>

            <p className="kk-section-label mt-6">
              Legal information
            </p>

            <h2 className="kk-section-heading mx-auto mt-5 max-w-3xl">
              You may also want to read
            </h2>

            <p className="kk-body mx-auto mt-6 max-w-2xl">
              These pages explain how the KultureKatta website works,
              how information is handled, and the terms that apply when
              you use it.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              {relatedPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="kk-button-on-light"
                >
                  {page.label}
                </Link>
              ))}

              <Link href="/contact" className="kk-button-dark">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
