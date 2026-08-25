# KultureKatta exhaustive QA suite

The baseline and exhaustive packs contain 253 logical Playwright tests. The
configured 71-test completion layer brings the complete suite to 324 logical
tests per browser, or 972 browser executions across Chromium, Firefox, and
WebKit.

## Scope

- The stabilization baseline contains 196 tests; the desktop Go to Top case is
  now tagged for the completion gate because it maps directly to OVR-005.
- Tests tagged `@exhaustive` add 57 objective cases for cookies, search,
  content/contact contracts, form edge cases, API defenses, 320px and 390px
  layouts, mobile navigation, runtime/network health, images, metadata, and
  structural accessibility.
- The real email smoke test remains controlled by
  `ALLOW_REAL_FORM_SUBMISSION=1` and must not be run once per browser.
- Human visual review, physical-device checks, real inbox verification,
  VoiceOver/TalkBack, native mobile keyboard behavior, pinch zoom, and
  Lighthouse remain in the manual/release matrix rather than being imitated by
  Playwright.

## Commands

List the full suite:

```powershell
npx playwright test --list
```

Run only the original baseline across all three browsers:

```powershell
npm run test:e2e:baseline -- --workers=1
```

Run only the new exhaustive layer in Chromium first:

```powershell
npx playwright test --project=chromium --grep "@exhaustive" --workers=1
```

After Chromium triage, run the exhaustive layer in all three browsers:

```powershell
npm run test:e2e:exhaustive -- --workers=1
```

Run the complete 324-test suite in all three browsers:

```powershell
npm run test:e2e:all -- --workers=1
```

Run one controlled real contact submission at a release checkpoint:

```powershell
$env:BASE_URL = "https://deploy-preview-1--courageous-pixie-ac53c4.netlify.app"
$env:ALLOW_REAL_FORM_SUBMISSION = "1"
$env:REAL_TEST_EMAIL = "your-controlled-test-address@example.com"
npm run test:e2e:real
```

## Triage rule

Do not weaken a new test merely because it identifies a current defect. First
classify the result as a product defect, an outdated requirement, a genuine
browser difference, or test flakiness. Update the product or requirement before
changing the assertion.

## Evidence

Save the HTML report and `test-results` folder with the tested commit hash,
branch, base URL, browser project, date, and build mode. The ZIP intentionally
contains no `.git` history, so the person running the suite must record the
commit with:

```powershell
git rev-parse HEAD
git branch --show-current
```
