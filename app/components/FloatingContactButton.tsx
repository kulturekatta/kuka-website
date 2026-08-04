"use client";

type FloatingContactButtonProps = {
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
  onClick,
}: FloatingContactButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open contact form"
      aria-controls="floating-contact-drawer"
      aria-expanded="false"
      className="fixed bottom-24 right-4 z-[75] flex items-center gap-2 rounded-full bg-[var(--kk-accent)] px-5 py-3.5 font-semibold text-[var(--kk-text)] shadow-[0_14px_40px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kk-text)] focus-visible:ring-offset-2 md:bottom-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-3 md:rounded-l-2xl md:rounded-r-none md:px-3 md:py-5 md:hover:-translate-x-1 md:hover:-translate-y-1/2"
    >
      <MessageIcon />

      <span className="text-sm md:[writing-mode:vertical-rl] md:rotate-180">
        Contact Us
      </span>
    </button>
  );
}