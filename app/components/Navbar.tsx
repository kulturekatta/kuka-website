"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/for-organizations", label: "For Organizations" },
  { href: "/private-experiences", label: "Private Experiences" },
  { href: "/kuka-universe", label: "KuKa Universe" },
  { href: "/about", label: "About" },
  { href: "/katta-studio", label: "Katta Studio" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* TOP UTILITY BAR */}
      <div className="kk-utility-bar w-full">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between">
          {/* CONTACT DETAILS - LEFT */}
          
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/65">
              <a
                href="https://wa.me/919730244996"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact KultureKatta on WhatsApp"
                className="whitespace-nowrap transition hover:text-[var(--kk-accent)]"
              >
                +91 97302 44996
              </a>

              <a
                href="mailto:hey@kulturekatta.com"
                aria-label="Email KultureKatta"
                className="whitespace-nowrap transition hover:text-[var(--kk-accent)]"
              >
                hey@kulturekatta.com
              </a>

              <a
                href="https://www.instagram.com/kulturekatta"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap transition hover:text-[var(--kk-accent)]"
              >
                Instagram
              </a>
            </div>

          {/* SEARCH - RIGHT */}
          <form
            action="/search"
            className="flex w-full items-center rounded-full border border-black/15 bg-white px-4 py-2 md:max-w-md"
          >
            <input
              type="search"
              name="q"
              placeholder="Search workshops, walks, music..."
              className="w-full bg-transparent text-sm text-[var(--kk-text)] placeholder:text-black/45 outline-none"
            />

            <button
              type="submit"
              className="ml-3 text-sm font-medium normal-case tracking-normal text-black/50 transition hover:text-[var(--kk-accent)]"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className="kk-header-dark sticky top-0 z-50 w-full border-b border-white/10 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="KultureKatta"
              width={140}
              height={40}
              className="h-28 w-auto"
              priority
            />
          </Link>

          {/* NAV LINKS + CTA */}
          <nav className="hidden items-center gap-4 text-base font-medium text-white/75 lg:flex">
            {navLinks.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap transition ${
                    active
                      ? "text-white underline decoration-[var(--kk-accent)] decoration-2 underline-offset-8"
                      : "hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* CTA BUTTON */}
            <Link
              href="/experiences"
              className="kk-button-light whitespace-nowrap px-5 py-3"
            >
              Explore Experiences
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}