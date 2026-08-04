"use client";

import { useEffect, useState } from "react";

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Go to top"
      className={`fixed bottom-6 right-6 z-[9999] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--kk-dark)] bg-[var(--kk-dark)] text-2xl leading-none text-[var(--kk-cream)] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[var(--kk-accent)] hover:bg-[var(--kk-accent)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--kk-dark)] focus:ring-offset-2 focus:ring-offset-[var(--kk-light)] ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      ↑
    </button>
  );
}