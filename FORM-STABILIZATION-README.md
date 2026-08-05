# KultureKatta Website Form Stabilization

## What changed

All enquiry and application forms now submit directly through Resend instead of relying on `mailto:` or WhatsApp-prefilled messages.

Updated forms:

1. Main Contact form
2. Floating Contact drawer
3. Organization Inquiry form
4. Katta Studio Work With Us application
5. Katta Studio Growth Clinic enquiry

Each form now includes:

- Server-side validation
- Honeypot spam protection
- Minimum submission-time check
- Best-effort rate limiting
- Best-effort duplicate-submission protection
- Consent checkbox
- Loading, success, and error states
- Reply-To set to the visitor's email address
- Automatic acknowledgement email to the visitor
- Consistent delivery to `kuka.forms@kulturekatta.com`

The public contact address remains `hey@kulturekatta.com`.

## Environment variables

Add these variables to `.env.local` and Netlify:

```env
RESEND_API_KEY=your_existing_resend_api_key
WEBSITE_FORMS_TO_EMAIL=kuka.forms@kulturekatta.com
WEBSITE_FORMS_FROM_EMAIL="KultureKatta Website <kuka.forms@kulturekatta.com>"
PUBLIC_CONTACT_EMAIL=hey@kulturekatta.com
```

Do not commit the real API key.

The older organization-specific email variables are retained only as temporary fallbacks in the shared server utility.

## Deployment steps

1. Back up the current project or create a Git branch.
2. Replace the project files with the updated files.
3. Add the four environment variables locally and in Netlify.
4. Confirm that `kulturekatta.com` is verified in Resend and that the sender address is permitted.
5. Run:

```bash
npm install
npm run lint
npm run build
```

6. Deploy to a Netlify preview first.
7. Submit one test through each of the five forms.
8. Verify both:
   - The internal notification reaches `kuka.forms@kulturekatta.com`.
   - The visitor receives an acknowledgement email.
9. Check Resend logs for accepted and delivered messages.
10. Promote the tested preview to production.

## Test subjects you should see

- `[KuKa Website] ...`
- `[KuKa Website] Quick Enquiry ...`
- `[KuKa Organizations] New Enquiry ...`
- `[Katta Studio] Work With Us Application ...`
- `[Katta Studio] Growth Clinic Enquiry ...`

## Build verification note

The modified TypeScript and TSX files passed a syntax/transpile check. A full local `npm ci`, lint, and production build could not be completed in the audit environment because its internal npm mirror was missing the `zod-validation-error@4.0.2` tarball. Run the normal lint and build commands on the local project before deployment.
