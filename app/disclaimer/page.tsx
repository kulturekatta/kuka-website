import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { type LegalSection } from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Disclaimer | KultureKatta",
  description:
    "Important information about KultureKatta experiences, participation, facilitators, website content, and Katta Studio services.",
  alternates: { canonical: "/disclaimer" },
};

const linkClass =
  "font-semibold text-[var(--kk-text)] underline decoration-[var(--kk-accent)]/40 underline-offset-4 transition hover:text-[var(--kk-accent)]";

const sections: LegalSection[] = [
  {
    id: "website-information",
    title: "Website information",
    content: (
      <>
        <p>
          KultureKatta is operated by BuffyFish (OPC) Private Limited, Pune,
          India. We make reasonable efforts to keep information on this website
          accurate and current, but descriptions, availability, schedules,
          pricing, locations, images and other details may change.
        </p>
        <p>
          Website information is provided for general awareness. An enquiry
          does not constitute a confirmed booking or contractual commitment.
          Written booking terms, proposals and agreements govern confirmed
          engagements where applicable.
        </p>
      </>
    ),
  },
  {
    id: "experiences",
    title: "Experiences, events and programmes",
    content: (
      <>
        <p>
          Cultural, creative, educational and recreational experiences may be
          affected by facilitator availability, venue requirements, weather,
          safety considerations or circumstances beyond our reasonable control.
          Materials, formats, locations and timings may therefore change.
        </p>
        <p>
          We will make reasonable efforts to communicate material changes to
          confirmed participants. Applicable cancellation, rescheduling and
          refund terms, together with mandatory legal rights, continue to apply.
        </p>
      </>
    ),
  },
  {
    id: "participation-safety",
    title: "Participation and safety",
    content: (
      <>
        <p>
          Some experiences involve outdoor activity, movement, food, tools,
          plants, art materials or other hands-on participation. Participants
          should consider their personal circumstances and follow reasonable
          instructions from facilitators and venues.
        </p>
        <p>
          Please inform us in advance about relevant allergies, accessibility
          needs or participation requirements so reasonable arrangements can
          be explored. Children require the supervision or authorisation
          specified for their particular experience.
        </p>
        <p>
          KultureKatta and its collaborators are expected to exercise
          reasonable care. Nothing on this page excuses negligence or removes
          responsibilities imposed by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "wellness",
    title: "Wellness and wellbeing",
    content: (
      <>
        <p>
          Unless expressly identified otherwise, experiences relating to
          mindfulness, sensory awareness, movement, food or general wellbeing
          are not medical, psychological or nutritional services. They are
          not intended to diagnose, treat or prevent a condition and should
          not replace advice from a qualified professional.
        </p>
      </>
    ),
  },
  {
    id: "collaborators",
    title: "Independent facilitators and collaborators",
    content: (
      <>
        <p>
          KultureKatta may work with independent artists, educators,
          performers, facilitators, venues and other partners. Their opinions,
          creative expressions and recommendations do not necessarily
          represent the views of KultureKatta.
        </p>
        <p>
          Responsibilities in a particular collaboration depend on the
          arrangements made and applicable law.
        </p>
      </>
    ),
  },
  {
    id: "katta-studio",
    title: "Katta Studio services",
    content: (
      <>
        <p>
          Katta Studio offers design, branding, content, website, marketing
          and related business services. Recommendations and deliverables are
          developed using the agreed brief, available information and scope of
          work.
        </p>
        <p>
          Business results depend on factors beyond our control, including
          market conditions, client implementation, budgets, user behaviour
          and third-party platforms. Unless expressly agreed in writing, we
          do not guarantee specific revenue, sales, enquiries, search
          rankings, advertising results or business growth.
        </p>
        <p>
          Deliverables, timelines, revisions, payment terms, usage rights and
          other commercial obligations are governed by the accepted proposal
          or agreement.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party websites and services",
    content: (
      <>
        <p>
          Links to external platforms, social networks, booking services,
          payment providers or collaborators are provided for convenience.
          We do not control their independent content or practices. Please
          review the terms and privacy notices applicable to those services.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Content and intellectual property",
    content: (
      <>
        <p>
          Text, branding, images, designs and other content may be owned by
          BuffyFish (OPC) Private Limited or used with permission from their
          rights holders. Except as permitted by law or authorised by the
          relevant owner, please do not reproduce or commercially exploit
          these materials.
        </p>
        <p>
          If you believe content on the website infringes your rights,
          please contact us with supporting details.
        </p>
      </>
    ),
  },
  {
    id: "liability-rights",
    title: "Liability and legal rights",
    content: (
      <>
        <p>
          To the extent permitted by applicable law, KultureKatta is not
          responsible for losses arising solely from reliance on general
          website information, interruptions outside our reasonable control
          or the independent conduct of unrelated third parties.
        </p>
        <p>
          Nothing in this Disclaimer excludes liability that cannot lawfully
          be excluded, limits mandatory consumer rights or overrides specific
          obligations we have accepted in a written agreement.
        </p>
      </>
    ),
  },
  {
    id: "updates-contact",
    title: "Updates and contact",
    content: (
      <>
        <p>
          We may update this Disclaimer as our activities, website and
          services evolve. The latest revision date appears above.
        </p>
        <p>
          Questions or concerns may be sent to{" "}
          <a className={linkClass} href="mailto:hey@kulturekatta.com">
            hey@kulturekatta.com
          </a>
          , or through our{" "}
          <Link className={linkClass} href="/contact">
            Contact page
          </Link>
          . You may also wish to review our{" "}
          <Link className={linkClass} href="/terms-of-use" target="_blank" rel="noopener noreferrer">
            Terms of Use
          </Link>, our{" "}
          <Link className={linkClass} href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link className={linkClass} href="/cookie-policy" target="_blank" rel="noopener noreferrer">
            Cookie Policy
          </Link>.

        </p>
      </>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      icon="⚖️"
      iconLabel="Important notices and responsibilities"
      title="Disclaimer"
      description="Important information about our cultural experiences, website content, collaborators, and Katta Studio services."
      lastUpdated="October 25, 2026"
      currentPath="/disclaimer"
      sections={sections}
    />
  );
}
