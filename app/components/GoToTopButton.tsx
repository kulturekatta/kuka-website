"use client";

import { useEffect, useState } from "react";

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.innerWidth >= 768 && window.scrollY >= 320);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Go to top"
      title="Go to top"
      className="kk-go-to-top-button"
      style={{
        position: "fixed",
        right: "1rem",
        bottom: "1rem",
        zIndex: 2147483647,
        display: "flex",
        width: "3rem",
        height: "3rem",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        border: "1px solid var(--kk-dark)",
        borderRadius: "9999px",
        background: "var(--kk-dark)",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        fontSize: "1.4rem",
        lineHeight: 1,
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
