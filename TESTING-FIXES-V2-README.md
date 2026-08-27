# Playwright fixes v2

This patch fixes the nine failures from the first Netlify preview run.

## Website fix
- Gives the Growth Clinic `<form>` its own unique ID: `growth-clinic-contact-form`.
- Keeps the surrounding section ID as `growth-clinic-form`, so existing anchor links continue to work.

## Test fixes
- Updates the Growth Clinic form selector.
- Selects one organization-interest checkbox before a mocked successful submission.
- Scopes the contact-form alert assertion to the form, avoiding Next.js route announcer strict-mode collisions.
- Runs external preview tests with one worker and one retry to reduce Netlify security challenges caused by parallel request bursts.

## After extracting
Run:

```powershell
npm run lint
npm run build
powershell -ExecutionPolicy Bypass -File .\scripts\run-preview-tests.ps1 -PreviewUrl "https://deploy-preview-1--courageous-pixie-ac53c4.netlify.app"
```
