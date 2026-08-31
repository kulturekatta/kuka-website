import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
  showCookieSettings?: boolean;
};

const footerSections: FooterSection[] = [
  {
    title: "Experiences",
    links: [
      {
        label: "All Experiences",
        href: "/experiences",
      },
      {
        label: "Explore by Mood",
        href: "/moods",
      },
      {
        label: "For Organizations",
        href: "/for-organizations",
      },
      {
        label: "Private Experiences",
        href: "/private-experiences",
      },
    ],
  },
  {
  title: "KultureKatta",
  links: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Our Team",
      href: "/our-team",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ],
},
  {
    title: "Studio Services",
    links: [
      {
        label: "About Katta Studio",
        href: "/katta-studio",
      },
      {
        label: "Website Development",
        href: "/katta-studio#websites-and-digital-presence",
      },
      {
        label: "Brand Identity",
        href: "/katta-studio#brand-positioning-and-visual-identity",
      },
      {
        label: "Social Media Presence",
        href: "/katta-studio#social-media-and-content",
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
        label: "WhatsApp/Phone",
        href: "https://wa.me/919730244996",
        external: true,
      },
      {
        label: "Email",
        href: "mailto:hey@kulturekatta.com",
        external: true,
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        label: "Terms of Use",
        href: "/terms-of-use",
      },
      {
        label: "Cookie Policy",
        href: "/cookie-policy",
      },
    ],
    showCookieSettings: true,
  },
];

export default function Footer() {
  return (
    <footer className="kk-footer-dark overflow-x-clip bg-[#2A1E19] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-14 md:px-8 md:py-16">
        {/* MAIN FOOTER CONTENT */}
        <div
          className="
            grid w-full grid-cols-2 items-start gap-x-6 gap-y-10
            sm:gap-x-8 sm:gap-y-12
            md:grid-cols-3
            xl:grid-cols-[minmax(220px,1.3fr)_repeat(5,minmax(0,1fr))]
            xl:gap-x-6
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
                Culture-led experiences, thoughtfully designed for organizations, teams,
                private groups, celebrations, and curious people.
              </p>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
                Come. Hang. Play. Learn.
              </p>
            </div>
          </div>

          {/* FOOTER NAVIGATION */}
          <nav className="contents" aria-label="Footer navigation">
            {footerSections.map((section) => {
              const totalItems =
                section.links.length + (section.showCookieSettings ? 1 : 0);
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
                    className={`
                      mt-3 gap-y-0 md:mt-5 md:flex md:flex-col md:gap-3
                      xl:grid xl:grid-cols-1
                      xl:grid-rows-[repeat(4,minmax(44px,auto))]
                      xl:gap-y-0
                      ${
                        isMobileFullWidth
                          ? "grid grid-cols-2 gap-x-6"
                          : "flex flex-col"
                      }
                    `}
                  >
                    {section.links.map((link, index) => {
                      const isLastItem = index === section.links.length - 1;
                      const shouldUseLastRow =
                        isLastItem &&
                        !section.showCookieSettings &&
                        totalItems < 4;

                      return (
                        <li
                          key={`${section.title}-${link.label}`}
                          className={shouldUseLastRow ? "xl:row-start-4" : undefined}
                        >
                          <Link
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className="inline-flex min-h-11 min-w-11 max-w-full items-center break-words text-sm font-normal leading-6 text-white/65 transition-colors duration-200 hover:text-white xl:whitespace-nowrap"
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}

                    {section.showCookieSettings && (
                      <li
                        className={
                          totalItems < 4 ? "xl:row-start-4" : undefined
                        }
                      >
                        <CookieSettingsButton className="inline-flex min-h-11 min-w-11 max-w-full items-center break-words text-left !text-sm !font-normal font-[inherit] leading-6 text-white/65 transition-colors duration-200 hover:text-white xl:whitespace-nowrap" />
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 border-t border-white/15 pt-6 md:mt-16">
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-white/60">
                © {new Date().getFullYear()} KultureKatta. All rights reserved.
              </p>

              <p className="mt-2 text-sm leading-6 text-white/60">
                KultureKatta is operated by BuffyFish (OPC) Private Limited.
              </p>

              <p className="mt-1 text-sm leading-6 text-white/60">
                Thoughtful cultural experiences for organizations, teams, and
                communities.
              </p>
            </div>

            <div className="hidden min-w-0 max-w-full flex-wrap items-center gap-x-5 gap-y-3 md:flex">
              <Link
                href="/privacy-policy"
                className="inline-flex min-h-11 min-w-11 max-w-full items-center break-words text-sm font-normal leading-6 text-white/60 transition-colors duration-200 hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-of-use"
                className="inline-flex min-h-11 min-w-11 max-w-full items-center break-words text-sm font-normal leading-6 text-white/60 transition-colors duration-200 hover:text-white"
              >
                Terms of Use
              </Link>

              <Link
                href="/cookie-policy"
                className="inline-flex min-h-11 min-w-11 max-w-full items-center break-words text-sm font-normal leading-6 text-white/60 transition-colors duration-200 hover:text-white"
              >
                Cookie Policy
              </Link>

              <CookieSettingsButton className="inline-flex min-h-11 min-w-11 max-w-full items-center break-words text-left !text-sm !font-normal font-[inherit] leading-6 text-white/65 transition-colors duration-200 hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
