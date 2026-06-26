import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerLinks: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Explore Kattas", href: "/explore" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "KultureKatta",
    links: [
      { label: "For Teams", href: "/for-teams" },
      { label: "Private Experiences", href: "/private-experiences" },
      { label: "Workshops", href: "/explore/workshops" },
      { label: "Walks", href: "/explore/walks" },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        label: "Instagram",
        href: "https://instagram.com/kulturekatta",
        external: true,
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/917030371411",
        external: true,
      },
      {
        label: "Email",
        href: "mailto:kulturekatta@gmail.com",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="kk-footer-dark px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          {/* BRAND COLUMN */}
          <div>
            <Link
              href="/"
              className="text-2xl font-semibold tracking-tight text-white"
            >
              K u l t u r e K a t t a
            </Link>

            <p className="mt-5 max-w-sm text-lg leading-7 text-white/70">
              Culture-led experiences, thoughtfully designed for teams, private
              groups, celebrations, and curious people.
            </p>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#D8BFAF]">
              Culture is what we do.
            </p>
          </div>

          {/* FOOTER LINKS */}
          <div className="grid gap-14 text-left sm:grid-cols-3 sm:text-center">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold uppercase tracking-[0.25em] text-[#D8BFAF]">
                  {section.title}
                </h2>

                <ul className="mt-5 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target={
                            link.href.startsWith("mailto:")
                              ? undefined
                              : "_blank"
                          }
                          rel={
                            link.href.startsWith("mailto:")
                              ? undefined
                              : "noreferrer"
                          }
                          className="text-lg text-white/70 transition hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-lg text-white/70 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 border-t border-white/15 pt-8">
          <div className="flex flex-col gap-4 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} KultureKatta. All rights reserved.
            </p>

            <p>Thoughtful cultural experiences for your people.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}