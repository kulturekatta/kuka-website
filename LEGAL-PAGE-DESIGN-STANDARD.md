# KultureKatta legal and policy page design standard

Use `app/components/LegalPageLayout.tsx` for all new terms and conditions, event rules, waivers, disclaimers, policy pages, and related legal notices. Do not create independent page styling for each new legal document.

Common layout: centered icon-led hero; document type; page title; short description; last-updated date; mobile collapsible contents; desktop sticky contents; numbered, anchored cards; shared readable typography; related legal links and contact CTA.

Optional props: `categoryLabel`, `backLink`, `closingNote`. A `LegalSection` can include `icon`, `id`, `title`, and `content`. Use per-section semantic icons consistently with the existing icon system. Keep legal content accurate and distinct per page, and preserve any required legal review.

For event-specific terms, link back to the event and keep event date, venue, eligibility and other specific information visible in the hero. When creating a new policy, use the shared layout and add only the relevant policy text and metadata.
