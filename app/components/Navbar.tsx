"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type KeyboardEvent } from "react";
import styles from "./Navbar.module.css";

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
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const mobileMenuSummaryRef = useRef<HTMLElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMobileMenu = (restoreFocus = false) => {
    if (!mobileMenuRef.current) {
      return;
    }

    mobileMenuRef.current.open = false;

    if (restoreFocus) {
      mobileMenuSummaryRef.current?.focus();
    }
  };

  const handleMobileMenuToggle = () => {
    if (!mobileMenuRef.current?.open) {
      return;
    }

    window.requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });
  };

  const handleMobileMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !mobileMenuRef.current?.open) {
      return;
    }

    event.preventDefault();
    closeMobileMenu(true);
  };

  return (
    <>
      {/* TOP UTILITY BAR */}
      <div className={styles.utilityBar}>
        <div className={styles.utilityInner}>
          <div className={styles.contactDetails}>
            <a
              href="https://wa.me/919730244996"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 97302 44996
            </a>

            <a href="mailto:hey@kulturekatta.com">
              hey@kulturekatta.com
            </a>

            <a
              href="https://www.instagram.com/kulturekatta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>

          <form
            action="/search"
            role="search"
            className={styles.searchForm}
          >
            <label htmlFor="site-search" className={styles.srOnly}>
              Search KultureKatta
            </label>

            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search workshops, walks, music..."
            />

            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link
            href="/"
            aria-label="KultureKatta home"
            className={styles.logoLink}
            onClick={() => closeMobileMenu()}
          >
            <Image
              src="/logo.png"
              alt="KultureKatta"
              width={140}
              height={40}
              className={styles.logo}
              priority
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Primary navigation"
            className={styles.desktopNavigation}
          >
            {navLinks.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? styles.desktopLinkActive
                      : styles.desktopLink
                  }
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/experiences"
              aria-current={isActive("/experiences") ? "page" : undefined}
              className={styles.exploreButton}
            >
              Explore Experiences
            </Link>
          </nav>

          {/* NATIVE MOBILE MENU */}
          <details
            ref={mobileMenuRef}
            className={styles.mobileMenuDetails}
            onToggle={handleMobileMenuToggle}
            onKeyDown={handleMobileMenuKeyDown}
          >
            <summary
              ref={mobileMenuSummaryRef}
              className={styles.mobileMenuSummary}
              aria-label="Open or close navigation menu"
              aria-controls="mobile-navigation-menu"
            >
              <span
                className={styles.menuIcon}
                aria-hidden="true"
              >
                ☰
              </span>

              <span
                className={styles.closeIcon}
                aria-hidden="true"
              >
                ×
              </span>
            </summary>

            <div id="mobile-navigation-menu" className={styles.mobileMenu}>
              <nav aria-label="Mobile navigation">
                <ul className={styles.mobileMenuList}>
                  {navLinks.map((item, index) => {
                    const active = isActive(item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          ref={index === 0 ? firstMobileLinkRef : undefined}
                          href={item.href}
                          aria-current={
                            active ? "page" : undefined
                          }
                          className={
                            active
                              ? styles.mobileLinkActive
                              : styles.mobileLink
                          }
                          onClick={() => closeMobileMenu()}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}

                  <li className={styles.mobileExploreItem}>
                    <Link
                      href="/experiences"
                      aria-current={isActive("/experiences") ? "page" : undefined}
                      className={styles.mobileExploreButton}
                      onClick={() => closeMobileMenu()}
                    >
                      Explore Experiences
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}