# KultureKatta completion QA layer

This layer contains **71 active Playwright tests in seven specification files**. It
incorporates the automatable, not-previously-covered cases from:

- `Missing Test Cases.docx`
- `Tests that need separate mobile and desktop runs(1).docx`
- `TCs - Yet to run(1).docx`
- `Remaining Test Case Suite.docx`

Together with 196 baseline and 57 exhaustive tests, the active suite contains
**324 logical tests per browser**.

## What was added

| Document area | Completion test IDs | Coverage added |
| --- | --- | --- |
| Cookies | `COOKIE-PROFILE`, `COOKIE-DECISION-FOCUS`, `COOKIE-RANGE`, `COOKIE-DESKTOP` | Accepted/rejected `storageState`, post-decision focus, the complete 320/360/390/430 range, and desktop placement/tab order |
| Search | `SRCH-001` through `SRCH-006` | Separate mobile and desktop pointer/keyboard, known-term, destination, empty, special-character, and repeated-search flows |
| Contact/content/runtime | `CONTACT-EXACT`, `NAV-004`/`NAV-013`/`NAV-014`/`NAV-015`, `CONTENT-LEGACY`, `RUNTIME-DATA` | Cross-viewport contact/footer contracts, expanded obsolete/placeholder/link checks, and failed or repeated fetch/XHR detection |
| Desktop/laptop | `DESKTOP-GRIDS`, `DESKTOP-HEADER-FOOTER`, `DESKTOP-FIXED` | 1024/1366/1920 layout structure, header/footer alignment and interaction, fixed-control placement |
| Forms | `FORM-002`, `FORM-004`, `FORM-011`, `FORM-012`, `FORM-LINKS`, `FORM-LONG`, `FORM-ABORT-RETRY`, `FORM-RETURN`, `FORM-VALIDATION`, `FORM-MOBILE`, `FORM-INPUT-METADATA`, `FORM-DESKTOP-TAB`, `FORM-LIVE-REGIONS` | Email/phone/URL correction, mandatory consent, legitimate sequential submission, Enter submission, exact complex payloads, retry/return state, validation, 390px flows, semantic attributes, tab order, and live regions across all five forms |
| Consolidated navigation | `NAV-DEEP-CRAWL`, `NAV-MOBILE-ACTIVE`, `NAV-REDIRECT-ONCE`, `NAV-ANCHORS`, `NAV-HISTORY`, `MOBILE-MENU-SHORT` | Every-page link crawling, mobile active states, one-hop legacy redirects, anchored-section visibility, Back/Forward restoration and short-screen menu scrolling |
| Mobile/responsive | `RESP-VIEWPORT-MATRIX`, `MOBILE-NAV-ARIA`, `MOBILE-FIXED-HIDDEN`, `MOB-012`, `MOBILE-TARGETS`, `MOBILE-OVERLAP`, `LAY-012`, `OVR-005` | Every public route at required viewports, explicit menu state, approved fixed-control behavior, blocker hit-testing, target/collision checks, the Organizations label, and desktop Go to Top by mouse and keyboard |
| Form/SEO completion | `FORM-MOBILE-BOUNDARIES`, `SEO-008`/`SEO-NOINDEX` | Every enabled form at 320px and 430px, noindex handling, and exact sitemap-inventory equality |
| Accessibility | `A11Y-AXE`, `A11Y-AXE-STATES`, `A11Y-KEYBOARD`, `A11Y-002`, `A11Y-012`, `A11Y-FOCUS-VISIBLE` | Axe and landmark checks, open-state scans, desktop/mobile keyboard traversal, ID/ARIA-reference integrity, and visible focus |

Several requested cases remain primarily in the `@exhaustive` layer and are not
duplicated here: fresh-cookie/settings flows; homepage/KuKa Universe contracts;
image, metadata, heading, and runtime checks; floating-form loading/error and
duplicate-submit checks; 320px, orientation, text-resize, every mobile-menu
destination, outside-click, and one-column card-order checks.

## Approved contact interpretation

The current product exposes `+91 97302 44996` through the approved WhatsApp
destination `https://wa.me/919730244996`. `CONTACT-EXACT` requires the exact
email, visible number and WhatsApp target on the relevant surfaces. A `tel:`
link is not invented or required; if the product adds one, the test requires it
to normalize to the same approved number.

## Approved experience-page contract

`experience-content-contract.spec.ts` actively requires, for every category in
`data/experienceCategories.ts`:

- exact H1, eyebrow, subtitle and introduction;
- `View All Experiences` → `/experiences`;
- `Collaborate With Us` → `/contact`;
- the labels `What this means`, `Includes`, `Possible formats` and
  `Explore more`;
- every exact `includes` and `formats` item;
- links to all other experience categories;
- valid intrinsic dimensions and an `alt` attribute for every image that is
  present;
- non-placeholder, non-filename alt text for informative images, while allowing
  an empty alt value for decorative images.

Images remain optional on these category-overview pages. If an image is added,
the contract validates it; the contract does not require an image count.

## Run order

Install and validate the suite:

```powershell
npm ci
npx playwright install
npm run build
npx tsc --noEmit
npm run lint
npx playwright test --list --grep "@completion" --project=chromium
```

Run the completion layer against the target deployment in Chromium first:

```powershell
$env:BASE_URL = "https://your-target-deployment.example"
npm run test:e2e:completion -- --project=chromium --workers=1
```

Triage genuine product failures without weakening the assertions. Once
Chromium is clean, run the same layer in Firefox and WebKit:

```powershell
npm run test:e2e:completion -- --project=firefox --workers=1
npm run test:e2e:completion -- --project=webkit --workers=1
```

Finally run all 324 logical tests across the configured projects:

```powershell
npm run test:e2e:all -- --workers=1
```

Open the Playwright HTML evidence with `npm run test:e2e:report`. Record the
tested revision and environment in `COMPLETION_RUN_RECORD.md`.

The separate Chromium-only visual layer contains 15 screenshot comparisons.
Its baseline-approval workflow is documented in `tests/visual/README.md`.

Chromium-only Lighthouse and credentialed real-email guidance is in
`SEPARATE_AND_MANUAL_QA.md`; neither belongs in the ordinary three-browser run.
