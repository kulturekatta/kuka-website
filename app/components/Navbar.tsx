"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/for-teams", label: "For Teams" },
  { href: "/private-experiences", label: "Private Experiences" },
  { href: "/about", label: "About" },
  { href: "/katta-studio", label: "Katta Studio" },
  { href: "/contact", label: "Contact" },
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
      <div className="kk-header-dark w-full border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between">
          {/* QUICK CONTACT LINKS - LEFT */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <a
              href="https://wa.me/917030371411"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              WhatsApp
            </a>

            <a
              href="mailto:kulturekatta@gmail.com"
              className="transition hover:text-white"
            >
              Email
            </a>

            <a
              href="https://www.instagram.com/kulturekatta"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Instagram
            </a>
          </div>

          {/* SEARCH - RIGHT */}
          <form
            action="/search"
            className="flex w-full items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 md:max-w-md"
          >
            <input
              type="search"
              name="q"
              placeholder="Search workshops, walks, music..."
              className="w-full bg-transparent text-sm text-white placeholder:text-white/60 outline-none"
            />

            <button
              type="submit"
              className="ml-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className="kk-header-dark sticky top-0 z-50 w-full border-b border-white/10">
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
          <nav className="hidden items-center gap-5 text-lg font-medium text-white/75 lg:flex">
            {navLinks.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition ${
                    active
                      ? "text-white underline decoration-[#D8BFAF] decoration-2 underline-offset-8"
                      : "hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* CTA BUTTON */}
            <Link href="/experiences" className="kk-button-light">
              Explore
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}