import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, {
  type LegalSection,
} from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | KultureKatta",
  description:
    "Learn how KultureKatta uses cookies, local storage, the Meta Pixel, and similar browser technologies.",
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
          KultureKatta uses browser local storage to remember your
          cookie preference and, when campaign information is present,
          to retain limited first-party attribution information for
          Growth Clinic inquiries. If you accept optional cookies, the
          Meta Pixel may also set or use Meta browser identifiers.
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

              <tr className="border-t border-black/10">
                <td className="px-4 py-4 align-top font-mono text-xs">
                  kuka-growth-attribution-v1
                </td>

                <td className="px-4 py-4 align-top">
                  Browser local storage
                </td>

                <td className="px-4 py-4 align-top">
                  Retains campaign source information, such as UTM
                  parameters, a Meta click identifier where present,
                  the original landing page, and first-visit time, so a
                  Growth Clinic inquiry can be attributed after site
                  navigation
                </td>

                <td className="px-4 py-4 align-top">
                  Used for up to 30 days; expired information is removed
                  when next checked, or earlier if cleared or replaced
                </td>
              </tr>

              <tr className="border-t border-black/10">
                <td className="px-4 py-4 align-top font-mono text-xs">
                  _fbp and _fbc, where set
                </td>

                <td className="px-4 py-4 align-top">
                  Meta cookies or browser identifiers
                </td>

                <td className="px-4 py-4 align-top">
                  Help Meta identify browsers and associate website
                  visits and successful inquiries with Meta advertising
                </td>

                <td className="px-4 py-4 align-top">
                  Up to 90 days, subject to Meta and browser settings
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
        <p>Essential technologies support functions such as:</p>

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
    id: "first-party-attribution",
    title: "First-party campaign attribution",
    content: (
      <>
        <p>
          When campaign information is included in a website address,
          we may store limited attribution information in your browser.
          This can include UTM parameters, Meta&apos;s fbclid value, the
          original landing page, and the date and time of the first
          visit.
        </p>

        <p>
          This information helps us understand which campaign or page
          generated a Growth Clinic inquiry if you move between pages
          before submitting the form. The storage does not itself load
          the Meta Pixel or send an event to Meta.
        </p>
      </>
    ),
  },
  {
    id: "meta-pixel",
    title: "Meta Pixel and advertising measurement",
    content: (
      <>
        <p>
          With your permission, KultureKatta uses the Meta Pixel to
          understand visits arising from Meta advertising and measure
          successful Growth Clinic inquiries.
        </p>

        <p>The Meta Pixel records:</p>

        <ul className={listClass}>
          <li>A PageView event when an accepted page is viewed</li>
          <li>
            A Lead event after a Growth Clinic inquiry is successfully
            submitted
          </li>
          <li>
            Limited technical information such as page address,
            browser and device information, Internet Protocol address,
            event time, and Meta cookie or click identifiers where
            available
          </li>
        </ul>

        <p>
          We do not deliberately include your form-field contents, such
          as your name, email address, phone number, business details,
          or message, in the Meta Lead event.
        </p>

        <p>
          Meta may use information received through its business tools
          for advertising, matching, measurement, and analytics. You
          can learn more in the{" "}
          <a
            href="https://www.facebook.com/privacy/policy/"
            className={linkClass}
            target="_blank"
            rel="noreferrer"
          >
            Meta Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://www.facebook.com/privacy/policies/cookies/"
            className={linkClass}
            target="_blank"
            rel="noreferrer"
          >
            Meta Cookies Policy
          </a>
          .
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
          <li>
            Accept optional cookies, which allows the Meta Pixel to load
          </li>
          <li>
            Decline optional cookies, which keeps the Meta Pixel blocked
          </li>
          <li>
            Read this policy before making or changing your choice
          </li>
        </ul>

        <p>
          You can use the website and submit an inquiry if you decline
          optional cookies. No Meta PageView or Lead event will be sent
          by our implementation while optional-cookie consent is absent
          or rejected.
        </p>

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
      description="How KultureKatta uses cookies, browser storage, the Meta Pixel, and related technologies to operate the website, remember your choices, and measure advertising performance."
      lastUpdated="September 2, 2026"
      currentPath="/cookie-policy"
      sections={sections}
    />
  );
}
