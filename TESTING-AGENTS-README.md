# KultureKatta Playwright Testing Agents

This suite automates the current stabilization checkpoint without sending real form emails by default.

## What is covered

- Route health and intended redirects
- Navbar, footer, mobile menu, skip link and active-page state
- Contact drawer focus, background locking and focus return
- Required form validation, privacy links, mocked success and mocked server failure
- Mobile, tablet, laptop, desktop and wide-desktop overflow checks
- Internal links
- `robots.txt` and `sitemap.xml`
- Basic accessibility structure
- An optional controlled real-email form smoke test

## First-time installation

From the project folder:

```powershell
npm install
npx playwright install chromium
```

`npm install` adds the Playwright package recorded in `package.json` and updates `package-lock.json`.

## Run against localhost

```powershell
npm run test:e2e
```

Playwright starts the Next.js development server automatically if `BASE_URL` is not set.

## Run against the current Netlify Deploy Preview

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-preview-tests.ps1 -PreviewUrl "https://deploy-preview-1--courageous-pixie-ac53c4.netlify.app"
```

For Chromium, Firefox and WebKit:

```powershell
npx playwright install
powershell -ExecutionPolicy Bypass -File .\scripts\run-preview-tests.ps1 -PreviewUrl "https://deploy-preview-1--courageous-pixie-ac53c4.netlify.app" -AllBrowsers
```

## View the HTML report

```powershell
npm run test:e2e:report
```

Failed tests automatically retain screenshots, video and browser traces under `test-results/` and the HTML report under `playwright-report/`.

## Optional real form submission

The standard suite intercepts form requests, so it does not send Resend emails. To perform one controlled real contact-form submission:

```powershell
$env:BASE_URL="https://deploy-preview-1--courageous-pixie-ac53c4.netlify.app"
$env:ALLOW_REAL_FORM_SUBMISSION="1"
$env:REAL_TEST_EMAIL="your-email@example.com"
npm run test:e2e:real
```

This sends one clearly labeled contact enquiry. Clear the variables afterward:

```powershell
Remove-Item Env:ALLOW_REAL_FORM_SUBMISSION
Remove-Item Env:REAL_TEST_EMAIL
Remove-Item Env:BASE_URL
```

## GitHub Actions

`.github/workflows/playwright.yml` runs the Chromium suite automatically on pull requests and pushes to `main`.

It can also be run manually from GitHub Actions. Supply a Netlify Deploy Preview URL in the optional `base_url` field to test that deployed preview.
