# KultureKatta completion QA layer

This layer adds **54 active Playwright tests in six specification files**. It
incorporates the automatable, not-previously-covered cases from:

- `Missing Test Cases.docx`
- `Tests that need separate mobile and desktop runs(1).docx`
- `TCs - Yet to run(1).docx`
- `Remaining Test Case Suite.docx`

The earlier baseline and exhaustive files remain unchanged. With their 254
logical tests, the active suite now contains **308 logical tests per browser**.

## What was added

| Document area | Completion test IDs | Coverage added |
| --- | --- | --- |
| Cookies | `COOKIE-PROFILE`, `COOKIE-DECISION-FOCUS`, `COOKIE-RANGE`, `COOKIE-DESKTOP` | Accepted/rejected `storageState`, post-decision focus, the complete 320/360/390/430 range, and desktop placement/tab order |
| Search | `SEARCH-DESKTOP`, `SEARCH-WELLNESS`, `SEARCH-MOBILE` | Pointer plus keyboard flow, an exact approved Wellness destination, and narrow mobile-header/results behavior |
| Contact/content/runtime | `CONTACT-EXACT`, `CONTENT-LEGACY`, `RUNTIME-DATA` | Cross-surface approved contact values, expanded obsolete/placeholder/link checks, and failed or repeated fetch/XHR detection |
| Desktop/laptop | `DESKTOP-GRIDS`, `DESKTOP-HEADER-FOOTER`, `DESKTOP-FIXED` | 1024/1366/1920 layout structure, header/footer alignment and interaction, fixed-control placement |
| Forms | `FORM-PHONE`, `FORM-LINKS`, `FORM-LONG`, `FORM-ABORT-RETRY`, `FORM-RETURN`, `FORM-VALIDATION`, `FORM-MOBILE`, `FORM-INPUT-METADATA`, `FORM-DESKTOP-TAB`, `FORM-LIVE-REGIONS` | Phone/URL correction, exact complex payloads, aborted retry, state after legal-page visits, validation focus/associations, 390px flows, semantic attributes, tab order and live regions across all five forms |
| Consolidated navigation | `NAV-DEEP-CRAWL`, `NAV-MOBILE-ACTIVE`, `NAV-REDIRECT-ONCE`, `NAV-ANCHORS`, `NAV-HISTORY`, `MOBILE-MENU-SHORT` | Every-page link crawling, mobile active states, one-hop legacy redirects, anchored-section visibility, Back/Forward restoration and short-screen menu scrolling |
| Mobile/responsive | `RESP-VIEWPORT-MATRIX`, `MOBILE-NAV-ARIA`, `MOBILE-FIXED-HIDDEN`, `MOBILE-TARGETS`, `MOBILE-OVERLAP` | Every public route at all remaining required viewports, explicit menu state, hidden mobile contact/social/Go-to-Top controls, expanded target-size and collision checks |
| Form/SEO completion | `FORM-MOBILE-BOUNDARIES`, `SEO-NOINDEX` | Every enabled form at 320px and 430px, and explicit noindex/sitemap exclusion for Search and custom 404 pages |
| Accessibility | `A11Y-AXE`, `A11Y-AXE-STATES`, `A11Y-KEYBOARD`, `A11Y-FOCUS-VISIBLE` | Axe and landmark checks on every public page, open-state scans, every-page keyboard traversal and visible focus |

Several requested cases already exist in the `@exhaustive` layer and are not
duplicated here: fresh-cookie/settings flows; empty, special-character,
no-result and repeated searches; exact footer/homepage/KuKa Universe/external
link contracts; image/metadata/heading/runtime checks; invalid-email and
floating-form loading/error/duplicate-submit checks; 320px, orientation,
text-resize, every mobile-menu destination, outside-click and one-column card
order checks.

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

Finally run all 308 logical tests across the configured projects:

```powershell
npm run test:e2e:all -- --workers=1
```

Open the Playwright HTML evidence with `npm run test:e2e:report`. Record the
tested revision and environment in `COMPLETION_RUN_RECORD.md`.

The separate Chromium-only visual layer contains 15 screenshot comparisons.
Its baseline-approval workflow is documented in `tests/visual/README.md`.

Chromium-only Lighthouse and credentialed real-email guidance is in
`SEPARATE_AND_MANUAL_QA.md`; neither belongs in the ordinary three-browser run.
