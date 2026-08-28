# QA completion validation

> Historical record for the 54-test completion layer validated on 2026-08-11.
> For the current 71-test layer and catalogue audit, see
> `AUTOMATED_TEST_COVERAGE.md`.

Validation date: 2026-08-11

## Passed

- `npm ci --dry-run`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build` (Next.js production build; 36 static pages generated)
- Chromium discovery: 197 baseline tests in 14 files
- Chromium discovery: 57 exhaustive tests in 6 files
- Chromium discovery: 54 completion tests in 6 files
- Chromium discovery: 308 total active tests in 26 files
- Chromium discovery: 15 separate visual-regression tests in 1 file
- `node --check scripts/lighthouse-completion.mjs`

## Browser execution status

- Local production-mode Chromium completion run: **54 passed, 0 failed, 0
  flaky, 0 skipped** in approximately 5 minutes 12 seconds.
- The all-route viewport matrix passed.
- Axe and landmark checks passed on every public page after correcting the
  Public-route future-status and breadcrumb contrast.
- Every-page keyboard traversal passed.
- The 15 visual cases were discovered but baselines were intentionally not
  generated; design approval is required first.
- Lighthouse syntax/discovery passed. Performance budgets should be measured
  against the stable deploy preview, not this local validation server.

Run the 54 completion tests against the deployed preview in Chromium next,
then Firefox and WebKit after that Chromium checkpoint is clean.
