"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const mobileMenuSummaryRef = useRef<HTMLElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const lastMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const previousBodyOverflowRef = useRef<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const lockBodyScroll = () => {
    if (previousBodyOverflowRef.current === null) {
      previousBodyOverflowRef.current = document.body.style.overflow;
    }

    document.body.style.overflow = "hidden";
  };

  const unlockBodyScroll = () => {
    if (previousBodyOverflowRef.current === null) {
      return;
    }

    document.body.style.overflow = previousBodyOverflowRef.current;
    previousBodyOverflowRef.current = null;
  };

  const closeMobileMenu = (restoreFocus = false) => {
    if (!mobileMenuRef.current) {
      return;
    }

    mobileMenuRef.current.open = false;
    setIsMobileMenuOpen(false);
    unlockBodyScroll();

    if (restoreFocus) {
      mobileMenuSummaryRef.current?.focus();
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const details = mobileMenuRef.current;

      if (!details?.open) {
        return;
      }

      const target = event.target;

      if (target instanceof Node && details.contains(target)) {
        return;
      }

      // Prevent links/buttons behind the open mobile menu from activating.
      event.preventDefault();
      event.stopPropagation();

      details.open = false;
      setIsMobileMenuOpen(false);

      if (previousBodyOverflowRef.current !== null) {
        document.body.style.overflow = previousBodyOverflowRef.current;
        previousBodyOverflowRef.current = null;
      }

      mobileMenuSummaryRef.current?.focus();
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);

      if (previousBodyOverflowRef.current !== null) {
        document.body.style.overflow = previousBodyOverflowRef.current;
        previousBodyOverflowRef.current = null;
      }
    };
  }, []);

  const handleMobileMenuToggle = () => {
    const details = mobileMenuRef.current;

    if (!details) {
      return;
    }

    if (!details.open) {
      setIsMobileMenuOpen(false);
      unlockBodyScroll();
      return;
    }

    setIsMobileMenuOpen(true);
    lockBodyScroll();

    window.requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });
  };

  const handleMobileMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!mobileMenuRef.current?.open) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMobileMenu(true);
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const firstLink = firstMobileLinkRef.current;
    const lastLink = lastMobileLinkRef.current;

    if (!firstLink || !lastLink) {
      return;
    }

    if (event.shiftKey && document.activeElement === firstLink) {
      event.preventDefault();
      lastLink.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastLink) {
      event.preventDefault();
      firstLink.focus();
    }
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

          <form
            action="/search"
            role="search"
            className={styles.mobileSearchForm}
          >
            <label htmlFor="mobile-site-search" className={styles.srOnly}>
              Search KultureKatta
            </label>

            <input
              id="mobile-site-search"
              name="q"
              type="search"
              inputMode="search"
              autoComplete="off"
              placeholder="Search"
            />
          </form>

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
              aria-expanded={isMobileMenuOpen}
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
                      ref={lastMobileLinkRef}
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
