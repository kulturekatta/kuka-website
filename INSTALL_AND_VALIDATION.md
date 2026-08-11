# KultureKatta corrected website and Playwright files

Prepared: August 10, 2026

This package contains 47 replacement or new files. Their paths are relative to
the root of the KultureKatta Next.js project.

## Install

1. Commit or back up the current project.
2. Extract the ZIP directly into the project root.
3. Allow the listed files to overwrite their current versions. Two new layout
   files will be added at `app/contact/layout.tsx` and
   `app/experiences/layout.tsx`.
4. Do not copy `node_modules`, `.next`, `playwright-report`, or `test-results`
   from another machine.

## Validate

```powershell
npm ci
npm run lint
npx tsc --noEmit
npm run build
npx playwright test --project=chromium --grep "@exhaustive" --workers=1
```

After Chromium passes, run the complete three-browser suite:

```powershell
npm run test:e2e:all -- --workers=1
```

The corrected suite contains 254 logical tests in 20 files: 197 baseline tests
and 57 tests tagged `@exhaustive`. The Chromium exhaustive layer completed
57/57 successfully during preparation. A three-browser run creates 762 test
executions.

## Corrections included

- Allows intentional sequential resubmission of identical data through all
  five form APIs while retaining per-IP rate limits and honeypot/timing checks.
- Keeps synchronous in-flight guards on all five browser forms so a rapid
  double-click or `requestSubmit()` cannot create two concurrent requests.
- Adds one sequential-repeat browser test for each form, including the floating
  contact drawer.
- Corrects native email and public HTTP(S) portfolio-link validation.
- Preserves an unfinished Contact draft across Privacy Policy navigation and
  browser Back; clears the draft after success.
- Focuses floating-form server errors and prevents duplicate floating requests.
- Corrects cookie persistence test setup and avoids fixed-control collisions.
- Adds the missing Wellness search result, a labelled main search control, and
  stable unique search-result keys.
- Adds unique page metadata and matching canonical links to indexable routes.
- Corrects 320px/390px overflow, mobile-menu width/closure, footer reflow,
  200% text-resize behavior, and important mobile tap targets.
- Narrows over-broad assertions for subject-bearing mail links, hidden
  honeypots, inline legal links, duplicate search controls, fixed wrappers, and
  runtime navigation readiness.

No real form delivery or email was triggered during the automated checks.

