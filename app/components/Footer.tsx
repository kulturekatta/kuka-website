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
    title: "KuKa Universe",
    links: [
      {
        label: "KuKa Universe",
        href: "/kuka-universe",
      },
      {
        label: "KuKa Explore",
        href: "/kuka-universe/explore",
      },
      {
        label: "KuKa Circle",
        href: "/kuka-universe/circle",
      },
      {
        label: "About Us",
        href: "/about",
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
        href: "/katta-studio#website-development",
      },
      {
        label: "Social Media Presence",
        href: "/katta-studio#social-media",
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
            grid w-full items-start gap-x-8 gap-y-12
            sm:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-[minmax(240px,280px)_repeat(5,max-content)]
            xl:justify-between
            xl:gap-x-6
          "
        >
          {/* BRAND */}
            <div className="min-w-0 xl:pr-2">
              <Link
                href="/"
                className="inline-flex text-2xl font-semibold tracking-tight text-white"
                aria-label="KultureKatta home"
              >
                KultureKatta
              </Link>

              <div
                className="
                  mt-5
                  xl:grid
                  xl:grid-rows-[repeat(4,24px)]
                  xl:gap-y-3
                "
              >
                <p className="max-w-[280px] text-base leading-7 text-white/70 xl:row-span-3 xl:leading-6">
                  Culture-led experiences, thoughtfully designed for organizations, teams,
                  private groups, celebrations, and curious people.
                </p>

                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-white/50 xl:row-start-4 xl:mt-0 xl:self-center">
                  Come. Hang. Play. Learn.
                </p>
              </div>
            </div>

          {/* FOOTER NAVIGATION */}
          <nav className="contents" aria-label="Footer navigation">
              {footerSections.map((section) => {
              const totalItems =
                section.links.length + (section.showCookieSettings ? 1 : 0);

              return (
                <div key={section.title} className="min-w-0 xl:pt-[10px]">
                  <h2 className="whitespace-nowrap text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white">
                    {section.title}
                  </h2>

                  <ul
                    className="
                      mt-5 flex flex-col gap-3
                      xl:grid
                      xl:grid-rows-[repeat(4,24px)]
                      xl:gap-y-3
                    "
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
                            className="inline-block whitespace-nowrap text-sm font-normal leading-6 text-white/65 transition-colors duration-200 hover:text-white"
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
                        <CookieSettingsButton className="inline-block whitespace-nowrap text-left !text-sm !font-normal font-[inherit] leading-6 text-white/65 transition-colors duration-200 hover:text-white" />
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </nav>  
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 border-t border-white/15 pt-6 md:mt-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-white/60">
                © {new Date().getFullYear()} KultureKatta. All rights reserved.
              </p>

              <p className="mt-2 text-sm leading-6 text-white/45">
                KultureKatta is operated by BuffyFish (OPC) Private Limited.
              </p>

              <p className="mt-1 text-sm leading-6 text-white/45">
                Thoughtful cultural experiences for organizations, teams, and
                communities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/privacy-policy"
                className="text-sm font-normal leading-6 text-white/60 transition-colors duration-200 hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-of-use"
                className="text-sm font-normal leading-6 text-white/60 transition-colors duration-200 hover:text-white"
              >
                Terms of Use
              </Link>

              <Link
                href="/cookie-policy"
                className="text-sm font-normal leading-6 text-white/60 transition-colors duration-200 hover:text-white"
              >
                Cookie Policy
              </Link>

              <CookieSettingsButton className="inline-block text-left !text-sm !font-normal font-[inherit] leading-6 text-white/65 transition-colors duration-200 hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}