import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, {
  type LegalSection,
} from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | KultureKatta",
  description:
    "Learn how KultureKatta uses cookies, local storage, and similar browser technologies.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

const linkClass =
  "font-semibold text-[var(--kk-text)] underline decoration-[var(--kk-accent)]/40 underline-offset-4 transition hover:text-[var(--kk-accent)]";

const listClass = "list-disc space-y-2 pl-6";

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What are cookies and browser storage?",
    content: (
      <>
        <p>
          Cookies are small text files that a website or service may
          place on your device. They can help websites function,
          remember preferences, measure usage, or support other
          features.
        </p>

        <p>
          Browser local storage is a related technology that allows a
          website to store limited information in your browser. Unlike a
          traditional cookie, local-storage information is not
          automatically sent with every website request.
        </p>
      </>
    ),
  },
  {
    id: "what-we-store",
    title: "What KultureKatta currently stores",
    content: (
      <>
        <p>
          Based on the current website implementation, KultureKatta
          uses browser local storage to remember whether you accepted
          or declined optional cookies.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-[var(--kk-surface-alt)]">
              <tr>
                <th className="border-b border-black/10 px-4 py-4 font-semibold text-[var(--kk-text)]">
                  Name
                </th>

                <th className="border-b border-black/10 px-4 py-4 font-semibold text-[var(--kk-text)]">
                  Technology
                </th>

                <th className="border-b border-black/10 px-4 py-4 font-semibold text-[var(--kk-text)]">
                  Purpose
                </th>

                <th className="border-b border-black/10 px-4 py-4 font-semibold text-[var(--kk-text)]">
                  Duration
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="px-4 py-4 align-top font-mono text-xs">
                  kuka-cookie-consent-v1
                </td>

                <td className="px-4 py-4 align-top">
                  Browser local storage
                </td>

                <td className="px-4 py-4 align-top">
                  Remembers whether optional cookies were accepted or
                  declined
                </td>

                <td className="px-4 py-4 align-top">
                  Until changed or cleared from the browser
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "essential-technologies",
    title: "Essential technologies",
    content: (
      <>
        <p>
          Essential technologies support functions such as:
        </p>

        <ul className={listClass}>
          <li>Remembering your cookie preference</li>
          <li>Delivering website pages and forms</li>
          <li>Protecting the website against misuse and spam</li>
          <li>Maintaining security and basic functionality</li>
          <li>Diagnosing technical errors</li>
        </ul>

        <p>
          Some technical processing may also be performed by our
          website-hosting and infrastructure providers to operate and
          protect the website.
        </p>
      </>
    ),
  },
  {
    id: "optional-analytics",
    title: "Optional analytics",
    content: (
      <>
        <p>
          We may introduce optional analytics tools to understand
          general website usage—for example, which pages are visited,
          how visitors arrive at the site, or whether a page is
          functioning effectively.
        </p>

        <p>
          Optional analytics should not be loaded unless you choose to
          accept optional cookies through the cookie banner.
        </p>

        <p>
          If we add a specific analytics provider, this policy will be
          updated to identify the provider, purpose, technologies used,
          and expected duration.
        </p>
      </>
    ),
  },
  {
    id: "advertising-tracking",
    title: "Advertising and behavioral tracking",
    content: (
      <>
        <p>
          The current cookie-consent implementation does not by itself
          activate advertising, behavioral-profiling, or cross-site
          tracking technologies.
        </p>

        <p>
          If advertising or marketing technologies are introduced in
          the future, they will be described here and managed through
          the relevant consent controls where required.
        </p>
      </>
    ),
  },
  {
    id: "your-cookie-choices",
    title: "Your choices",
    content: (
      <>
        <p>When the cookie banner appears, you may:</p>

        <ul className={listClass}>
          <li>Accept optional cookies</li>
          <li>Decline optional cookies</li>
          <li>
            Read this policy before making or changing your choice
          </li>
        </ul>

        <p>
          You can change your preference later by selecting{" "}
          <strong className="text-[var(--kk-text)]">
            Cookie Settings
          </strong>{" "}
          in the website footer.
        </p>

        <p>
          If you withdraw previously granted consent, the website may
          reload so that optional scripts already running can be
          removed.
        </p>
      </>
    ),
  },
  {
    id: "browser-controls",
    title: "Browser controls",
    content: (
      <>
        <p>
          Most browsers allow you to inspect, block, or clear cookies
          and local-storage information through their privacy or
          site-data settings.
        </p>

        <p>
          Clearing browser data may remove your saved cookie preference,
          which means the cookie banner may appear again the next time
          you visit.
        </p>

        <p>
          Blocking all browser storage may affect some website
          functionality.
        </p>
      </>
    ),
  },
  {
    id: "third-party-content",
    title: "Third-party websites and embedded content",
    content: (
      <>
        <p>
          Our website may link to third-party services such as
          Instagram, LinkedIn, WhatsApp, maps, videos, booking
          platforms, or payment services.
        </p>

        <p>
          These third parties may use their own cookies or similar
          technologies when you visit their websites or interact with
          embedded content. Their own cookie and privacy policies apply.
        </p>
      </>
    ),
  },
  {
    id: "cookie-policy-changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this Cookie Policy when we introduce, remove, or
        change website technologies. The latest revision date will
        appear at the top of this page.
      </p>
    ),
  },
  {
    id: "cookie-contact",
    title: "Contact",
    content: (
      <>
        <p>
          Questions about cookies or browser storage may be sent to:
        </p>

        <div className="rounded-2xl border border-black/10 bg-[var(--kk-surface-alt)] p-5 md:p-6">
          <p className="font-semibold text-[var(--kk-text)]">
            BuffyFish (OPC) Private Limited
          </p>

          <p>Operating as KultureKatta</p>

          <p>Pune, Maharashtra, India</p>

          <p>
            Email:{" "}
            <a
              href="mailto:hey@kulturekatta.com?subject=Cookie%20Policy%20Question"
              className={linkClass}
            >
              hey@kulturekatta.com
            </a>
          </p>

          <p>
            You may also review our{" "}
            <Link href="/privacy-policy" className={linkClass}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      icon="🍪"
      iconLabel="Cookies and browser settings"
      title="Cookie Policy"
      description="How KultureKatta uses cookies, browser storage, and related technologies to operate the website and remember your choices."
      lastUpdated="August 2, 2026"
      currentPath="/cookie-policy"
      sections={sections}
    />
  );
}
