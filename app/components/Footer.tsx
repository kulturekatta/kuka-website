
import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";

type FooterLink = {
  label: string;
  href?: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
  showCookieSettings?: boolean;
};

// Unpublished destinations are text, not dead links.
const footerSections: FooterSection[] = [
  {
    title: "KultureKatta",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/our-team" },
      { label: "Partner With KuKa", href: "/partner-with-us" },
      { label: "Work With KuKa", href: "/work-with-us" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { label: "All Experiences", href: "/experiences" },
      { label: "Upcoming — Coming Soon" },
      { label: "Explore by Mood", href: "/moods" },
      { label: "For Organizations", href: "/for-organizations" },
      { label: "Private Experiences", href: "/private-experiences" },
    ],
  },
  {
    title: "Katta Studio",
    links: [
      { label: "About Katta Studio", href: "/katta-studio" },
      {
        label: "Digital Presence",
        href: "/katta-studio#websites-and-digital-presence",
      },
      {
        label: "Growth Strategy",
        href: "/katta-studio#growth-clinic-and-strategic-support",
      },
      {
        label: "Design & Branding",
        href: "/katta-studio#brand-and-design",
      },
      {
        label: "Work With Katta Studio",
        href: "/katta-studio/work-with-us",
      },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/kulturekatta/",
        external: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/kulturekatta/",
        external: true,
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/919730244996",
        external: true,
      },
      { label: "Email", href: "mailto:hey@kulturekatta.com" },
      { label: "Connect", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
    showCookieSettings: true,
  },
];

export default function Footer() {
  return (
    <footer className="kk-footer-dark overflow-x-clip bg-[#2A1E19] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-10 md:px-8 md:py-12">
        {/* MAIN FOOTER CONTENT */}
        <div
          className="
            grid w-full grid-cols-2 items-start gap-x-6 gap-y-8
            sm:gap-x-8
            md:grid-cols-3 md:gap-y-10
            xl:grid-cols-[minmax(220px,1.3fr)_repeat(5,minmax(0,1fr))]
            xl:gap-x-5
          "
        >
          {/* BRAND */}
          <div className="col-span-2 min-w-0 md:col-span-1 xl:pr-2">
            <Link
              href="/"
              className="inline-flex min-h-11 min-w-11 items-center text-2xl font-semibold tracking-tight text-white"
              aria-label="KultureKatta home"
            >
              KultureKatta
            </Link>

            <div className="mt-5">
              <p className="max-w-[280px] text-base leading-7 text-white/70 xl:leading-6">
                Culture-led experiences, thoughtfully designed for
                organizations, teams, private groups, celebrations, and curious
                people.
              </p>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
                Come. Hang. Play. Learn.
              </p>
            </div>
          </div>

          {/* FOOTER NAVIGATION */}
          <nav className="contents" aria-label="Footer navigation">
            {footerSections.map((section) => {
              const isLegalSection = section.title === "Legal";
              const isMobileFullWidth = section.showCookieSettings;

              return (
                <div
                  key={section.title}
                  className={`min-w-0 xl:pt-[10px] ${
                    isMobileFullWidth ? "col-span-2 md:col-span-1" : ""
                  }`}
                >
                  <h2 className="break-words text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white">
                    {section.title}
                  </h2>

                  <ul
                    className="
                      mt-3 flex flex-col gap-y-0
                      md:mt-5 md:gap-3
                      xl:grid xl:grid-cols-1
                      xl:grid-rows-[repeat(5,minmax(44px,auto))]
                      xl:gap-y-0
                    "
                  >
                    {section.links.map((link) => {
                      const opensNewTab = link.external || isLegalSection;

                      return (
                        <li key={`${section.title}-${link.label}`}>
                          {link.href ? (
                            <Link
                              href={link.href}
                              target={opensNewTab ? "_blank" : undefined}
                              rel={
                                opensNewTab
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="inline-flex min-h-11 min-w-11 max-w-full items-center break-words text-sm font-normal leading-6 text-white/65 transition-colors duration-200 hover:text-white"
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <span
                              aria-disabled="true"
                              className="inline-flex min-h-11 items-center text-sm leading-6 text-white/45"
                            >
                              {link.label}
                            </span>
                          )}
                        </li>
                      );
                    })}

                    {section.showCookieSettings && (
                      <li>
                        <CookieSettingsButton
                          className="inline-flex min-h-11 min-w-11 max-w-full items-center break-words text-left !text-sm !font-normal font-[inherit] leading-6 text-white/65 transition-colors duration-200 hover:text-white xl:whitespace-nowrap"
                        />
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-8 border-t border-white/15 pt-5">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} KultureKatta. All rights reserved.
            </p>

            <p className="text-sm leading-6 text-white/60">
              KultureKatta is operated by BuffyFish (OPC) Private Limited.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
