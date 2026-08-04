"use client";

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M6.5 8.2H3.3V20h3.2V8.2ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3ZM20.7 13.2c0-3.6-1.9-5.3-4.5-5.3a4.1 4.1 0 0 0-3.7 2V8.2H9.3V20h3.2v-5.8c0-1.5.3-3 2.2-3s2 1.8 2 3.1V20h3.2l.8-6.8Z" />
    </svg>
  );
}

function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.2 7.8c.3-.6.7-.6 1-.6h.4c.2 0 .4.1.5.5l.7 1.7c.1.3.1.5-.1.7l-.6.8c-.2.2-.1.4 0 .6.6 1 1.5 1.8 2.5 2.4.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.7.8c.3.2.5.3.5.5 0 .2-.1 1.2-.7 1.8-.5.6-1.3.9-2.2.8-1.1-.1-2.5-.6-4.2-2-2-1.6-3.3-3.6-3.7-4.8-.4-1.2 0-2.1.3-2.5l.4-.4Z" />
    </svg>
  );
}

function EmailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kulturekatta",
    icon: InstagramIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kulturekatta/",
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919730244996",
    icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:hey@kulturekatta.com",
    icon: EmailIcon,
    external: false,
  },
];

export default function FloatingSocialBar() {
  return (
    <nav
      aria-label="KultureKatta social and contact links"
      className="fixed bottom-5 left-3 z-[70] flex overflow-visible rounded-2xl border border-white/10 bg-[var(--kk-text)] p-1.5 text-white shadow-[0_14px_40px_rgba(0,0,0,0.22)] md:bottom-auto md:left-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:rounded-l-none md:rounded-r-2xl md:px-1.5 md:py-2"
    >
      {socialLinks.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            aria-label={item.label}
            title={item.label}
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-white/75 transition duration-200 hover:bg-white/10 hover:text-[var(--kk-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kk-accent)]"
          >
            <Icon className="h-5 w-5" />

            <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg bg-[var(--kk-text)] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}