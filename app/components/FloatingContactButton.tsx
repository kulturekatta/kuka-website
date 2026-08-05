"use client";

import type { Ref } from "react";

type FloatingContactButtonProps = {
  buttonRef?: Ref<HTMLButtonElement>;
  expanded: boolean;
  onClick: () => void;
};

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.6 9.6 0 0 1-3.8-.8L3 21l1.8-5.1A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
    </svg>
  );
}

export default function FloatingContactButton({
  buttonRef,
  expanded,
  onClick,
}: FloatingContactButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={expanded ? "Contact form open" : "Open contact form"}
      aria-controls="floating-contact-drawer"
      aria-expanded={expanded}
      className="fixed right-0 top-1/2 z-[75] hidden -translate-y-1/2 flex-col items-center gap-3 rounded-l-2xl rounded-r-none bg-[var(--kk-accent)] px-3 py-5 font-semibold text-[var(--kk-text)] shadow-[0_14px_40px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-x-1 hover:-translate-y-1/2 hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kk-text)] focus-visible:ring-offset-2 md:flex"
    >
      <MessageIcon />

      <span className="rotate-180 text-sm [writing-mode:vertical-rl]">
        Contact Us
      </span>
    </button>
  );
}