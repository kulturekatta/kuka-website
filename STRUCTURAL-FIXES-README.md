# KultureKatta Structural Accessibility Fixes

## Included fixes

- Kept one global `<main id="main-content">` and the visible-on-focus skip link.
- Improved mobile navigation keyboard behavior:
  - focus moves into the opened menu;
  - Escape closes the menu;
  - focus returns to the menu trigger;
  - active state also applies to Explore Experiences.
- Fixed the floating contact drawer:
  - correct `aria-expanded` state;
  - focus moves into the dialog;
  - focus is trapped inside while open;
  - Escape closes it;
  - focus returns to the original trigger;
  - background content becomes inert;
  - hidden drawer controls are no longer keyboard-focusable.
- Corrected the cookie banner to behave as a non-modal consent region.
- Restored keyboard focus when Cookie Settings is opened and closed.
- Re-enabled the cookie banner and desktop floating contact drawer in `app/layout.tsx`.
- Added Privacy Policy links to all live form-consent statements.
- Fixed three footer links that pointed to routes that did not exist.
- Redirected five planned KuKa vertical cards to the KuKa Universe status section instead of missing pages.

## Local checks to run

```bash
npm run lint
npm run build
```

Then run the site:

```bash
npm run dev
```

## Manual keyboard checks

1. Press Tab immediately after loading a page. Confirm “Skip to main content” appears.
2. Activate it and confirm focus moves to the main content.
3. On mobile width, open the menu using Enter or Space.
4. Confirm focus moves to Home.
5. Press Escape and confirm the menu closes and focus returns to the hamburger.
6. On desktop, open Contact Us.
7. Tab through the drawer and confirm focus cannot leave it.
8. Press Escape and confirm focus returns to Contact Us.
9. Open Cookie Settings from the footer, then press Escape.
10. Confirm focus returns to the Cookie Settings button.
11. Check every navbar and footer link.
12. Submit each form and confirm the Privacy Policy link works.
