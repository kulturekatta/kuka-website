import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, {
  type LegalSection,
} from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | KultureKatta",
  description:
    "Learn how KultureKatta collects, uses, stores, and protects information, including consent-based advertising measurement.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const linkClass =
  "font-semibold text-[var(--kk-text)] underline decoration-[var(--kk-accent)]/40 underline-offset-4 transition hover:text-[var(--kk-accent)]";

const listClass = "list-disc space-y-2 pl-6";

const sections: LegalSection[] = [
  {
    id: "about-kulturekatta",
    title: "About KultureKatta",
    content: (
      <>
        <p>
          KultureKatta is operated by BuffyFish (OPC) Private Limited
          (“KultureKatta,” “we,” “us,” or “our”).
        </p>

        <p>
          This Privacy Policy explains how we collect, use, store, and
          protect personal information when you visit our website,
          contact us, or submit an inquiry through one of our forms.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          We may collect information that you voluntarily provide through
          our forms, emails, phone calls, WhatsApp messages, or other
          communications.
        </p>

        <p>This may include:</p>

        <ul className={listClass}>
          <li>Your name</li>
          <li>Email address</li>
          <li>Phone or WhatsApp number</li>
          <li>City or location</li>
          <li>Organization or institution name</li>
          <li>Your role or designation</li>
          <li>
            The type of experience or service you are interested in
          </li>
          <li>
            Preferred dates, group size, budget, or requirements
          </li>
          <li>Information included in your message or inquiry</li>
          <li>Any other information you voluntarily provide</li>
        </ul>
      </>
    ),
  },
  {
    id: "information-collected-automatically",
    title: "Information collected automatically",
    content: (
      <>
        <p>
          When you visit the website, limited technical information may
          be collected automatically by our hosting, security, or
          analytics services.
        </p>

        <p>This may include:</p>

        <ul className={listClass}>
          <li>Internet Protocol address</li>
          <li>Browser and device type</li>
          <li>Operating system</li>
          <li>Referring website</li>
          <li>Pages visited</li>
          <li>Date and time of access</li>
          <li>
            Campaign source information, such as UTM parameters,
            Meta click identifiers, and the original landing page
          </li>
          <li>
            Approximate location derived from an Internet Protocol
            address
          </li>
          <li>Website performance and error information</li>
        </ul>

        <p>
          This information is generally used to operate, secure, and
          improve the website.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use your information",
    content: (
      <>
        <p>We may use the information we collect to:</p>

        <ul className={listClass}>
          <li>Respond to inquiries and requests</li>
          <li>
            Contact you about an experience, program, collaboration, or
            service
          </li>
          <li>Understand your requirements</li>
          <li>Prepare recommendations, estimates, or proposals</li>
          <li>
            Coordinate organization, institution, school, private-group,
            partnership, or Katta Studio inquiries
          </li>
          <li>Maintain communication and business records</li>
          <li>Improve our website, forms, and services</li>
          <li>
            Understand which campaigns or pages generate Growth
            Clinic inquiries
          </li>
          <li>
            Measure website visits and successful inquiries where you
            have accepted optional cookies
          </li>
          <li>Prevent spam, fraud, misuse, or security incidents</li>
          <li>Comply with legal or regulatory obligations</li>
          <li>Establish, exercise, or defend legal claims</li>
        </ul>
      </>
    ),
  },
  {
    id: "inquiry-forms",
    title: "Inquiry forms",
    content: (
      <>
        <p>
          Our website may allow you to submit inquiries relating to:
        </p>

        <ul className={listClass}>
          <li>KultureKatta experiences and programs</li>
          <li>Organizations and institutions</li>
          <li>Private experiences</li>
          <li>Partnerships and collaborations</li>
          <li>Katta Studio services</li>
          <li>General questions or requests</li>
        </ul>

        <p>
          We may contact you using the email address, phone number, or
          WhatsApp number you provide.
        </p>

        <p>
          Submitting an inquiry does not create a booking, contract,
          membership, or payment obligation.
        </p>

        <p>
          Submitting an inquiry also does not automatically subscribe
          you to promotional or marketing communications.
        </p>

        <p>
          A Growth Clinic inquiry may include campaign-attribution
          information associated with your visit, such as UTM
          parameters, a Meta click identifier where present, the
          original landing page, and the date and time of the first
          visit. We use this information to understand which campaign
          or page generated the inquiry.
        </p>
      </>
    ),
  },
  {
    id: "bookings-and-payments",
    title: "Bookings and payments",
    content: (
      <>
        <p>
          KultureKatta does not currently process direct bookings,
          ticket purchases, user-account registrations, or online
          payments through this website.
        </p>

        <p>
          We do not intentionally collect credit card numbers, debit
          card numbers, UPI credentials, bank-account information, or
          other payment credentials through the website.
        </p>

        <p>
          Please do not include payment credentials or sensitive
          financial information in a contact or inquiry form.
        </p>

        <p>
          If online bookings or payments are introduced in the future,
          this Privacy Policy and the related website terms will be
          updated accordingly.
        </p>
      </>
    ),
  },
  {
    id: "cookies-and-storage",
    title: "Cookies and browser storage",
    content: (
      <>
        <p>
          Our website uses browser storage to remember your cookie
          preference. When campaign information is present, we may also
          retain limited first-party attribution information so a
          Growth Clinic inquiry can be connected to the campaign or
          landing page that generated it.
        </p>

        <p>
          With your permission, we use the Meta Pixel to measure visits
          and successful Growth Clinic inquiries arising from Meta
          advertising. The Pixel remains blocked until you accept
          optional cookies.
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
          for advertising, matching, measurement, and analytics in
          accordance with the{" "}
          <a
            href="https://www.facebook.com/privacy/policy/"
            className={linkClass}
            target="_blank"
            rel="noreferrer"
          >
            Meta Privacy Policy
          </a>
          .
        </p>

        <p>
          You can review or change your preferences by selecting{" "}
          <strong className="text-[var(--kk-text)]">
            Cookie Settings
          </strong>{" "}
          in the website footer.
        </p>

        <p>
          Please read our{" "}
          <Link href="/cookie-policy" className={linkClass}>
            Cookie Policy
          </Link>{" "}
          for more information.
        </p>
      </>
    ),
  },
  {
    id: "service-providers",
    title: "Service providers",
    content: (
      <>
        <p>
          We may use trusted third-party service providers to operate
          the website and manage communications.
        </p>

        <p>These may include:</p>

        <ul className={listClass}>
          <li>Netlify for website hosting and infrastructure</li>
          <li>Resend for transmitting website-form messages</li>
          <li>
            Zoho Mail for receiving and managing business email
          </li>
          <li>
            Meta for consent-based advertising measurement through the
            Meta Pixel
          </li>
          <li>
            Other providers supporting security, analytics, storage,
            or technical operations
          </li>
        </ul>

        <p>
          These providers may process limited personal information only
          as necessary to provide their services.
        </p>
      </>
    ),
  },
  {
    id: "sharing-information",
    title: "Sharing of information",
    content: (
      <>
        <p>We do not sell or rent your personal information.</p>

        <p>We may share limited information with:</p>

        <ul className={listClass}>
          <li>
            Employees, team members, or authorized representatives who
            need it to respond to your inquiry
          </li>
          <li>
            Service providers supporting hosting, email,
            communications, security, storage, or technical operations
          </li>
          <li>
            Advertising and measurement providers where you have
            accepted the relevant optional technologies
          </li>
          <li>
            Facilitators, venues, collaborators, or partners where this
            is necessary to respond to or plan your request
          </li>
          <li>
            Professional advisers such as lawyers or accountants
          </li>
          <li>
            Government authorities, regulators, courts, or
            law-enforcement bodies where disclosure is legally required
          </li>
        </ul>

        <p>
          We aim to limit any sharing to information reasonably
          necessary for the relevant purpose.
        </p>
      </>
    ),
  },
  {
    id: "marketing-communications",
    title: "Marketing communications",
    content: (
      <>
        <p>
          We may send information about KultureKatta where:
        </p>

        <ul className={listClass}>
          <li>You have asked to receive it</li>
          <li>
            You have subscribed to a mailing list or update
          </li>
          <li>
            It relates directly to an inquiry you submitted
          </li>
          <li>
            We otherwise have an appropriate basis to contact you
          </li>
        </ul>

        <p>
          You may ask us to stop sending promotional communications at
          any time by emailing{" "}
          <a
            href="mailto:hey@kulturekatta.com"
            className={linkClass}
          >
            hey@kulturekatta.com
          </a>
          .
        </p>

        <p>
          We may still send non-promotional messages needed to respond
          to an active inquiry or address an administrative or legal
          matter.
        </p>
      </>
    ),
  },
  {
    id: "childrens-information",
    title: "Children’s information",
    content: (
      <>
        <p>
          KultureKatta offers certain experiences designed for children
          and families. However, this website is not intended to collect
          personal information directly from children without the
          involvement of a parent, guardian, school, or responsible
          adult.
        </p>

        <p>
          A person under the age of 18 should not independently submit
          personal information through the website without the knowledge
          and involvement of a parent or guardian.
        </p>

        <p>
          Where information about a child is required, it should be
          submitted by a parent, guardian, school, institution, or other
          authorized adult.
        </p>
      </>
    ),
  },
  {
    id: "sensitive-information",
    title: "Sensitive information",
    content: (
      <>
        <p>
          We do not intentionally request sensitive information through
          our general website forms.
        </p>

        <p>Please do not submit:</p>

        <ul className={listClass}>
          <li>Passwords</li>
          <li>Payment credentials</li>
          <li>Government-identification numbers</li>
          <li>Detailed medical records</li>
          <li>Biometric information</li>
          <li>
            Other highly sensitive information that is not necessary
            for your inquiry
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data retention",
    content: (
      <>
        <p>
          We retain personal information only for as long as reasonably
          necessary to:
        </p>

        <ul className={listClass}>
          <li>Respond to and manage your inquiry</li>
          <li>Maintain appropriate communication records</li>
          <li>Continue an ongoing discussion or proposal</li>
          <li>
            Meet legal, accounting, or compliance requirements
          </li>
          <li>Prevent misuse or protect website security</li>
          <li>Resolve disputes or address legal claims</li>
        </ul>

        <p>
          When information is no longer reasonably required, we may
          delete, anonymize, or securely archive it, subject to
          applicable legal obligations.
        </p>

        <p>
          First-party Growth Clinic campaign-attribution information is
          used for up to 30 days. Expired information is removed when
          it is next checked and may also be cleared or replaced
          earlier. Meta controls the retention of information it
          receives through the Meta Pixel in accordance with its own
          policies.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data security",
    content: (
      <>
        <p>
          We use reasonable administrative, technical, and
          organizational measures designed to protect personal
          information against unauthorized access, accidental loss,
          misuse, alteration, unauthorized disclosure, or destruction.
        </p>

        <p>
          However, no website, email service, storage system, or
          internet transmission can be guaranteed to be completely
          secure.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    content: (
      <>
        <p>
          Subject to applicable law, you may contact us to:
        </p>

        <ul className={listClass}>
          <li>
            Ask what personal information we hold about you
          </li>
          <li>
            Request correction of inaccurate information
          </li>
          <li>
            Request deletion of information that is no longer required
          </li>
          <li>
            Withdraw consent where processing is based on your consent
          </li>
          <li>
            Ask us to stop sending promotional communications
          </li>
          <li>
            Raise a question or concern about how your information has
            been handled
          </li>
        </ul>

        <p>
          We may need to verify your identity before acting on a
          request.
        </p>

        <p>
          Certain information may need to be retained where required by
          law or necessary for legitimate record-keeping, dispute
          resolution, or legal claims.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party links and platforms",
    content: (
      <>
        <p>
          Our website may include links to third-party websites or
          platforms, including social-media platforms, maps, video
          platforms, or websites belonging to collaborators and
          partners.
        </p>

        <p>
          We do not control the privacy practices, security, content, or
          availability of third-party services. Your use of those
          services is subject to their own privacy policies and terms.
        </p>
      </>
    ),
  },
  {
    id: "international-processing",
    title: "International processing",
    content: (
      <>
        <p>
          Some service providers used to operate the website or manage
          communications may maintain infrastructure or personnel
          outside India.
        </p>

        <p>
          Where information is processed in another country, it may be
          subject to the laws of that jurisdiction.
        </p>
      </>
    ),
  },
  {
    id: "policy-changes",
    title: "Changes to this policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy when our website, services,
          internal practices, or legal obligations change.
        </p>

        <p>
          This policy will also be reviewed when we introduce features
          such as online bookings, payments, user accounts, newsletters,
          or additional analytics or advertising technologies.
        </p>

        <p>
          The latest revision date will appear at the top of this page.
        </p>
      </>
    ),
  },
  {
    id: "privacy-requests",
    title: "Privacy questions and requests",
    content: (
      <>
        <p>
          For questions or requests concerning your personal
          information, contact:
        </p>

        <div className="rounded-2xl border border-black/10 bg-[var(--kk-surface-alt)] p-5 md:p-6">
          <p className="font-semibold text-[var(--kk-text)]">
            BuffyFish (OPC) Private Limited
          </p>

          <p>Operating as KultureKatta</p>

          <p>
            Email:{" "}
            <a
              href="mailto:hey@kulturekatta.com?subject=Privacy%20Request"
              className={linkClass}
            >
              hey@kulturekatta.com
            </a>
          </p>

          <p>
            Phone/WhatsApp:{" "}
            <a href="tel:+919730244996" className={linkClass}>
              +91 97302 44996
            </a>
          </p>

          <p className="kk-small-text">
            Please use “Privacy Request” in the email subject line and
            include enough information for us to understand and respond
            to your request.
          </p>
        </div>

        <p>
          For general questions about KultureKatta, please visit our{" "}
          <Link href="/contact" className={linkClass}>
            Contact page
          </Link>
          .
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      icon="🔐"
      iconLabel="Privacy and personal information"
      title="Privacy Policy"
      description="How KultureKatta collects, uses, stores, and protects information when you visit our website or submit an inquiry."
      lastUpdated="September 2, 2026"
      currentPath="/privacy-policy"
      sections={sections}
    />
  );
}
