# KultureKatta automated test coverage

Source catalogue: `KultureKatta_Master_Test_Catalogue(1).docx`  
Repository snapshot reviewed: `94fe0d9`  
Review date: 2026-08-13

## Coverage outcome

The catalogue contains 148 logical cases: 107 Automated, 18 Hybrid, 16 Manual,
5 Controlled, and 2 Conditional. All 107 Automated cases now have an
implementation path in the repository:

- 98 functional, route, API, responsive, accessibility, content, SEO, and
  technical cases map to the Playwright E2E suites.
- VIS-002 through VIS-004 map to the 15-case Chromium visual-regression suite.
  They become executable after the Controlled VIS-001 baseline-approval step.
- PERF-001 through PERF-006 map to the Lighthouse completion runner, which
  covers five routes, mobile and desktop profiles, three runs per route,
  median scoring, budgets, and approved-baseline regression checks.

Hybrid, Manual, Controlled, and Conditional cases remain outside the ordinary
automated release gate by design. They should be performed after the automated
packs are green.

## Playwright inventory

Logical tests discovered per browser:

| Pack | Tests | Files |
| --- | ---: | ---: |
| Baseline | 196 | 14 |
| Exhaustive | 57 | 6 |
| Completion | 71 | 7 |
| Total E2E | 324 | 26 |

The Completion pack discovers 213 executions across Chromium, Firefox, and
WebKit. The visual configuration discovers another 15 Chromium comparisons.

## Catalogue areas and owning suites

| Catalogue area | Primary automation |
| --- | --- |
| REL | `release-readiness-completion.spec.ts`, route/runtime suites |
| NAV | `route-integrity.spec.ts`, `navigation-gaps.spec.ts`, `consolidated-suite-completion.spec.ts`, `content-runtime-device-completion.spec.ts` |
| SRCH | `cookies-search-exhaustive.spec.ts`, `cookies-search-completion.spec.ts` |
| MOB, LAY, OVR | responsive baseline, exhaustive, gap, and completion suites |
| FORM | form baseline, edge, completion, API, and real-form smoke suites |
| CK | cookie baseline, exhaustive, and completion suites |
| A11Y | accessibility baseline, runtime exhaustive, and responsive completion suites |
| CNT | content contracts, experience contracts, and content/runtime completion suites |
| SEO | SEO infrastructure, route/SEO gap, runtime exhaustive, and completion suites |
| TECH | runtime accessibility/exhaustive and content/runtime completion suites |
| VIS | `tests/visual/visual-regression.spec.ts` |
| PERF | `scripts/lighthouse-completion.mjs` |

## Gaps closed in this review

- NAV-004, NAV-013, NAV-014, and NAV-015: exact footer, contact, social,
  WhatsApp, legal, and safe-new-tab contracts now run at mobile and desktop
  widths.
- SRCH-001 through SRCH-006: separate mobile and desktop pointer/keyboard,
  known-term, destination, empty, special-character, and repeated-search flows.
- MOB-012: every public mobile page is scrolled and sampled controls are
  hit-tested for invisible overlays or fixed blockers.
- LAY-012: the approved two-line mobile "KuKa for Organizations" treatment is
  asserted explicitly.
- OVR-005: desktop Go to Top now verifies both mouse and keyboard activation.
- FORM-002: invalid-email correction now joins the existing invalid-phone
  coverage for all five forms.
- FORM-004: all five forms explicitly prove that missing consent sends no
  request.
- FORM-011: all five forms accept a later valid submission from the same email.
- FORM-012: Enter submission, single-request behavior, and focused results run
  for all enabled mobile forms and all desktop forms. The floating drawer is
  desktop-only because the approved mobile contract hides that control.
- A11Y-002: full mobile focus traversal complements the existing desktop
  traversal and the menu, cookie, overlay, and form keyboard behavior tests.
- A11Y-012: every public page now checks duplicate IDs and broken ARIA ID
  references.
- SEO-008: sitemap contents must exactly equal the approved indexable route
  inventory and use only the production origin.

## Validation completed here

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; 36 static pages generated.
- Playwright discovery: passed for baseline, exhaustive, completion, total E2E,
  and visual configurations.
- Server-rendered smoke checks: homepage, known searches, special-character
  no-result search, organization label, and sitemap all passed. The sitemap
  returned 30 unique production URLs with no duplicate or invalid origin.

This environment did not contain a Playwright browser binary, and its network
policy returned empty archives when Chromium installation was attempted.
Therefore no new browser assertion was reported as passed or failed here. Run
the packs below in an environment with Playwright browsers installed.

## Automated execution order

```bash
npm ci
npx playwright install
npm run test:e2e:baseline
npm run test:e2e:exhaustive
npm run test:e2e:completion
```

For the preview-only quality gates:

```bash
BASE_URL=https://your-preview.example npm run test:lighthouse:all
BASE_URL=https://your-preview.example npm run test:visual
```

If approved visual baselines do not yet exist, run
`BASE_URL=https://your-preview.example npm run test:visual:update`, review every
image, and approve the Controlled VIS-001 step before using `test:visual` as a
release gate.
