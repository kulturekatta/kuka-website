# Separate automation and manual QA

## Chromium-only Lighthouse automation

The Lighthouse runner audits Home, Experiences, For Organizations, Katta
Studio and Contact separately with mobile and desktop profiles. It runs every
page three times, enforces the median result, writes individual HTML/JSON files
plus `summary.json` under `lighthouse-results/<profile>/`, and exits non-zero
when a budget or approved-baseline regression fails.

| Budget | Mobile | Desktop |
| --- | ---: | ---: |
| Performance score | ≥ 0.80 | ≥ 0.85 |
| Accessibility score | ≥ 0.95 | ≥ 0.95 |
| Best Practices score | ≥ 0.90 | ≥ 0.90 |
| SEO score | ≥ 0.90 | ≥ 0.90 |
| Largest Contentful Paint | ≤ 4,000 ms | ≤ 2,500 ms |
| Cumulative Layout Shift | ≤ 0.10 | ≤ 0.10 |
| Total Blocking Time | ≤ 600 ms | ≤ 300 ms |

Run against a deployment:

```powershell
$env:BASE_URL = "https://your-target-deployment.example"
npm run test:lighthouse:mobile
npm run test:lighthouse:desktop
```

The summary also reports total page weight, estimated unused-JavaScript
savings, render-blocking savings and layout-shift element counts. To create a
candidate baseline after reviewing a stable deployment:

```powershell
$env:LIGHTHOUSE_UPDATE_BASELINE = "1"
npm run test:lighthouse:mobile
npm run test:lighthouse:desktop
Remove-Item Env:LIGHTHOUSE_UPDATE_BASELINE
```

Review the reports before approving and committing
`lighthouse-approved-baselines.json`. Later runs fail for a category-score drop
greater than 0.05, LCP growth greater than 500ms, CLS growth greater than 0.03,
or TBT growth greater than 150ms.

For a local build, start `npm run dev` or `npm run build && npm run start` in a
separate terminal; the runner defaults to `http://localhost:3000`. If Chrome
cannot be discovered, set `LIGHTHOUSE_CHROME_PATH` to a Chromium or Chrome
executable. These budgets are explicit initial gates; change them only as a
recorded product decision, not to make a failing run green.

## Controlled real-email verification

`real-form-smoke.spec.ts` performs one explicitly enabled Chromium submission.
It must not be included in cross-browser reruns.

```powershell
$env:BASE_URL = "https://your-target-deployment.example"
$env:ALLOW_REAL_FORM_SUBMISSION = "1"
$env:REAL_TEST_EMAIL = "your-controlled-inbox@example.com"
npm run test:e2e:real
```

That browser check proves that the deployed API accepted the request. Complete
delivery verification still requires one of these controlled integrations:

- poll a dedicated test mailbox and assert the acknowledgement recipient,
  subject and correlation timestamp; or
- query Resend logs/API for the internal notification and acknowledgement.

Do not add mailbox or Resend credentials to the repository. Until test
credentials are provisioned, record the two delivered messages manually in the
run record.

## Chromium-only visual regression

The 15 screenshot cases cover five key pages at 375x812, 768x1024 and
1440x900. They are deliberately outside the three-browser functional suite.
Use `npm run test:visual:update` only to create a reviewed candidate baseline;
use `npm run test:visual` for later comparisons. See `tests/visual/README.md`.

## Physical-device or human-review checks

The following cases from the three source documents cannot be represented
faithfully by desktop browser emulation and remain manual:

- real iPhone Safari and Android Chrome, including browser bars and safe areas;
- virtual-keyboard resize/obscuring behavior and real portrait/landscape rotation;
- VoiceOver and TalkBack announcements and gestures;
- native pinch zoom and increased operating-system text size;
- actual phone dialer, WhatsApp, mail-client and third-party app handoff;
- visual judgment of typography, cropping, spacing, alignment, icon meaning,
  proofreading and laptop/wide-screen balance;
- remote-device slow-network and mid-request connection changes.

Browser automation does cover the objective counterparts: 320–430px layout,
emulated rotation, 200% text resizing, structural accessibility, target sizes,
collision detection, request abort/retry and external-link contracts.
