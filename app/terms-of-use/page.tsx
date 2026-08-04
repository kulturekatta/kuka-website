import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, {
  type LegalSection,
} from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Use | KultureKatta",
  description:
    "Terms governing your use of the KultureKatta website and services.",
};

const linkClass =
  "font-semibold text-[var(--kk-text)] underline decoration-[var(--kk-accent)]/40 underline-offset-4 transition hover:text-[var(--kk-accent)]";

const listClass = "list-disc space-y-2 pl-6";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    content: (
      <>
        <p>
          By accessing or using this website, you agree to these Terms
          of Use and our{" "}
          <Link href="/privacy-policy" className={linkClass}>
            Privacy Policy
          </Link>
          .
        </p>

        <p>
          If you do not agree with these terms, please do not use the
          website or submit information through it.
        </p>
      </>
    ),
  },
  {
    id: "about",
    title: "About KultureKatta",
    content: (
      <>
        <p>
          KultureKatta is operated by{" "}
          <strong className="text-[var(--kk-text)]">
            BuffyFish (OPC) Private Limited
          </strong>
          .
        </p>

        <p>
          We design and coordinate culture-led experiences, including
          workshops, walks, trails, talks, salons, creative sessions,
          private experiences, institutional programs, and
          organization-focused engagements.
        </p>
      </>
    ),
  },
  {
    id: "website-purpose",
    title: "Website purpose",
    content: (
      <>
        <p>
          This website provides general information about
          KultureKatta, its services, experience formats, and ways to
          contact us.
        </p>

        <p>
          Unless expressly stated otherwise, information on the website
          is not a binding offer, guarantee, or confirmed booking. An
          experience is confirmed only when the relevant scope, date,
          price, payment terms, and other conditions have been accepted
          through an appropriate written confirmation, proposal,
          booking page, invoice, or agreement.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <>
        <p>
          You must be legally capable of entering into a binding
          agreement to make a booking or engage our services.
        </p>

        <p>
          Inquiries or registrations concerning a child must be
          submitted by a parent, legal guardian, school, teacher, or
          another properly authorized adult.
        </p>
      </>
    ),
  },
  {
    id: "inquiries-proposals",
    title: "Inquiries and proposals",
    content: (
      <>
        <p>
          Submitting an inquiry does not create a contract, reserve a
          date, guarantee facilitator availability, or confirm an
          experience.
        </p>

        <p>Proposals and quotations may be subject to:</p>

        <ul className={listClass}>
          <li>A stated validity period</li>
          <li>Facilitator and venue availability</li>
          <li>Minimum or maximum group sizes</li>
          <li>Location and travel requirements</li>
          <li>Material, equipment, and production costs</li>
          <li>Taxes and third-party charges</li>
          <li>Advance-payment requirements</li>
          <li>Specific cancellation and rescheduling terms</li>
        </ul>
      </>
    ),
  },
  {
    id: "bookings-payments",
    title: "Bookings and payments",
    content: (
      <>
        <p>
          Where bookings or payments are available, the price, taxes,
          inclusions, exclusions, payment schedule, and confirmation
          process will be displayed or communicated before
          confirmation.
        </p>

        <p>
          A booking may remain provisional until the required payment,
          information, documentation, or written confirmation has been
          received.
        </p>

        <p>
          Payment-processing services may be provided by third-party
          providers. Their own terms and privacy policies may apply.
        </p>
      </>
    ),
  },
  {
    id: "cancellations",
    title: "Cancellations, rescheduling, and refunds",
    content: (
      <>
        <p>
          Cancellation, rescheduling, transfer, and refund conditions
          may vary depending on the experience, facilitator, venue,
          group size, materials, travel, and other committed costs.
        </p>

        <p>
          The terms displayed on the booking page, proposal, quotation,
          invoice, confirmation email, or agreement for a specific
          experience will take priority over this general section.
        </p>

        <p>
          Where no separate terms have been communicated, please
          contact us as early as possible. Any refund or credit will be
          assessed after considering non-recoverable costs already
          committed for the experience.
        </p>
      </>
    ),
  },
  {
    id: "changes-by-kulturekatta",
    title: "Changes or cancellation by KultureKatta",
    content: (
      <>
        <p>
          We may need to modify, postpone, relocate, replace, or cancel
          an experience because of:
        </p>

        <ul className={listClass}>
          <li>Facilitator illness or unavailability</li>
          <li>Venue issues</li>
          <li>Low participation</li>
          <li>Safety or weather conditions</li>
          <li>Government restrictions</li>
          <li>Transport or supply disruption</li>
          <li>Events beyond reasonable control</li>
        </ul>

        <p>
          Where reasonably possible, we will offer an alternative date,
          facilitator, format, credit, or refund appropriate to the
          circumstances and the specific booking terms.
        </p>

        <p>
          Unless required by law or agreed otherwise, we are not
          responsible for separate travel, accommodation, or incidental
          costs incurred by a participant.
        </p>
      </>
    ),
  },
  {
    id: "participant-responsibilities",
    title: "Participant responsibilities",
    content: (
      <>
        <p>Participants are expected to:</p>

        <ul className={listClass}>
          <li>Provide accurate registration information</li>
          <li>
            Follow reasonable safety, venue, and facilitator
            instructions
          </li>
          <li>
            Treat facilitators, staff, partners, and other participants
            respectfully
          </li>
          <li>
            Disclose relevant allergies, accessibility needs, or safety
            concerns where reasonably necessary
          </li>
          <li>Use equipment and materials only as instructed</li>
          <li>
            Avoid conduct that is unlawful, threatening,
            discriminatory, abusive, or disruptive
          </li>
        </ul>

        <p>
          We may refuse participation or ask someone to leave where
          their behavior creates a safety risk, seriously disrupts the
          experience, or affects the dignity and wellbeing of others.
        </p>
      </>
    ),
  },
  {
    id: "health-and-outdoor",
    title: "Health, food, wellness, and outdoor experiences",
    content: (
      <>
        <p>
          Some experiences may involve movement, outdoor activity,
          tools, materials, food, allergens, plants, travel, or other
          physical participation.
        </p>

        <p>
          Participants are responsible for considering whether an
          activity is appropriate for their circumstances and for
          informing us of relevant accessibility, allergy, or safety
          requirements before the experience.
        </p>

        <p>
          Wellness, movement, food, nature, or educational content is
          experiential and informational. It is not medical,
          psychological, nutritional, legal, financial, or other
          professional advice.
        </p>
      </>
    ),
  },
  {
    id: "children-family",
    title: "Children and family programs",
    content: (
      <>
        <p>
          A parent, guardian, school, or commissioning institution must
          provide accurate information and follow the supervision,
          consent, pickup, emergency-contact, and safeguarding
          requirements communicated for a child-focused experience.
        </p>

        <p>
          Unless expressly offered as supervised childcare,
          KultureKatta experiences should not be treated as childcare
          or a substitute for appropriate adult supervision.
        </p>
      </>
    ),
  },
  {
    id: "organizations-private-groups",
    title: "Organizations and private groups",
    content: (
      <>
        <p>
          For experiences commissioned by an organization, school,
          institution, private group, or other client, the commissioning
          party is responsible for:
        </p>

        <ul className={listClass}>
          <li>Providing accurate participant and venue details</li>
          <li>
            Obtaining necessary internal permissions and participant
            consents
          </li>
          <li>
            Communicating relevant requirements to participants
          </li>
          <li>
            Ensuring suitable access, infrastructure, and supervision
            where agreed
          </li>
          <li>
            Complying with the accepted proposal, quotation, or
            agreement
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          Unless otherwise stated, the website and its original
          content—including text, branding, graphics, illustrations,
          layouts, experience descriptions, frameworks, documents,
          photographs, and design elements—belong to BuffyFish (OPC)
          Private Limited or are used with permission.
        </p>

        <p>
          You may view and share links to public website pages for
          personal or legitimate business reference. You may not copy,
          reproduce, republish, sell, license, scrape, modify, or
          commercially exploit substantial website content without
          prior written permission.
        </p>
      </>
    ),
  },
  {
    id: "participant-work",
    title: "Participant-created work",
    content: (
      <>
        <p>
          Unless separate terms state otherwise, participants generally
          retain ownership of original work they create during an
          experience.
        </p>

        <p>
          Participation does not give anyone the right to copy,
          reproduce, or commercially use another participant’s work, a
          facilitator’s proprietary material, or KultureKatta’s
          experience-design materials.
        </p>
      </>
    ),
  },
  {
    id: "photography",
    title: "Photography and documentation",
    content: (
      <>
        <p>
          Photography, video, audio, testimonials, or other
          documentation may occur only in accordance with the
          information and consent process communicated for the relevant
          experience.
        </p>

        <p>
          Additional and appropriate authorization will be sought
          before identifiable images of children are used for
          promotional purposes.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable website use",
    content: (
      <>
        <p>You must not:</p>

        <ul className={listClass}>
          <li>Use the website for an unlawful purpose</li>
          <li>
            Attempt to gain unauthorized access to the website, server,
            forms, accounts, or related systems
          </li>
          <li>Transmit malware, harmful code, or automated spam</li>
          <li>Interfere with website performance or security</li>
          <li>
            Impersonate another person or submit knowingly false
            information
          </li>
          <li>
            Scrape, harvest, or extract information at scale without
            permission
          </li>
          <li>
            Infringe intellectual property, privacy, or other rights
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party services and links",
    content: (
      <>
        <p>
          The website may link to or use third-party services,
          including social-media platforms, maps, messaging, payment
          providers, booking tools, and external websites.
        </p>

        <p>
          We do not control their availability, security, accuracy,
          content, or privacy practices. Your use of those services is
          governed by their own terms.
        </p>
      </>
    ),
  },
  {
    id: "availability-accuracy",
    title: "Website availability and accuracy",
    content: (
      <>
        <p>
          We aim to keep website information useful and current, but we
          do not guarantee that every page will always be complete,
          uninterrupted, error-free, or available.
        </p>

        <p>
          Experience descriptions, availability, prices, facilitators,
          locations, and schedules may change.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, BuffyFish (OPC)
          Private Limited and KultureKatta will not be liable for
          indirect, incidental, special, or consequential losses
          resulting solely from use of, or inability to use, this
          website.
        </p>

        <p>
          Nothing in these terms excludes or limits liability that
          cannot lawfully be excluded, or affects mandatory consumer
          rights available under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    content: (
      <p>
        These Terms of Use are governed by the laws of India. Subject to
        applicable consumer-protection and other mandatory laws, courts
        with jurisdiction in Pune, Maharashtra, will have jurisdiction
        over disputes arising from these terms or the website.
      </p>
    ),
  },
  {
    id: "terms-changes",
    title: "Changes to these terms",
    content: (
      <>
        <p>
          We may update these terms as our website and services evolve.
          The latest version and effective date will appear on this
          page.
        </p>

        <p>
          Continued use of the website after an update means the
          revised terms will apply to subsequent website use. Existing
          confirmed engagements will continue to be governed by their
          accepted terms unless otherwise agreed.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>Questions about these terms may be sent to:</p>

        <div className="rounded-2xl border border-black/10 bg-[var(--kk-surface-alt)] p-5 md:p-6">
          <p className="font-semibold text-[var(--kk-text)]">
            BuffyFish (OPC) Private Limited
          </p>

          <p>Operating as KultureKatta</p>

          <p>Pune, Maharashtra, India</p>

          <p>
            Email:{" "}
            <a
              href="mailto:hey@kulturekatta.com?subject=Terms%20of%20Use%20Question"
              className={linkClass}
            >
              hey@kulturekatta.com
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout
      icon="📜"
      iconLabel="Terms and website conditions"
      title="Terms of Use"
      description="The terms that apply when you access the KultureKatta website, submit an inquiry, or engage with our experiences and services."
      lastUpdated="August 2, 2026"
      currentPath="/terms-of-use"
      sections={sections}
    />
  );
}