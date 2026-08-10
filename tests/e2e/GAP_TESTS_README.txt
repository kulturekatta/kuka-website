KultureKatta gap-only Playwright tests
======================================

Copy these four .spec.ts files into the existing e2e folder:

- routes-seo-gaps.spec.ts
- forms-interaction-gaps.spec.ts
- navigation-gaps.spec.ts
- responsive-layout-gaps.spec.ts

Keep helpers/site.ts where it already is.

List only the new tests:

  npx playwright test --list --grep "@gap"

Run only the new tests in Chromium first:

  npx playwright test --project=chromium --grep "@gap"

After Chromium passes, run the new tests across every configured browser:

  npx playwright test --grep "@gap"

Then run the full regression suite once:

  npm run test:e2e

Important:
- These files deliberately do not repeat the existing tests for basic route health,
  simple form success, simple mobile-menu opening, or existing viewport overflow.
- Honeypot rejection is not included because the uploaded e2e folder does not reveal
  the honeypot field name or whether rejection occurs client-side or server-side.
  That test should be written only after inspecting the form/API source contract.
- Screenshot visual regression is not included because it requires approved baseline
  images. Adding snapshots without approved baselines would merely approve the current
  appearance, including any current defects.
- Automatic route discovery from the Next.js filesystem is not included because the
  uploaded ZIP contains only e2e tests, not the app route tree.
- Explicit environment-variable validation belongs in CI or a validation script, not
  in browser E2E tests.
