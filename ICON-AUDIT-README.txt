KultureKatta — Site-wide Semantic Icon Audit Fix
Date: 2026-08-15

WHAT THIS PACKAGE DOES
- Centralizes the semantic icon vocabulary in app/data/semanticIconRegistry.ts.
- Resolves the 102 duplicate-icon collision groups reported by ICON-03.
- Covers 370 labels from the collision inventory, consolidated into 366 semantic meanings.
- Allows intentional aliases for the same meaning (for example Artists / Artists & facilitators / Artists and facilitators).
- Uses compact two-icon families when a single emoji is already owned by another semantic meaning.
- Prevents reversed two-icon near-duplicates such as A+B vs B+A for different meanings.
- Keeps exact repeated meanings consistent across routes.
- Keeps the existing SemanticIcon shape, accessibility label, sizing, border, background and shadow system.
- Adds data-kk-icon-key so automated tests distinguish semantic identity from display wording.

USER-REPORTED DUPLICATES FIXED
- NGOs, Foundations & Social Enterprises => 🤲 🌱
- Co-create / Host with KuKa => 🌱
- Artists / Artists & facilitators / Artists and facilitators => 🎭
- Experience formats => 🧰 🎭

OTHER EXAMPLE FIXES
- What we design => 📐
- Architecture, Design & Professional Services => 📐 🏛️
- KuKa Senses => 👁️
- Senses => 👁️ 👃
- How it works => ⚙️
- Responsible design => 🛡️ ⚙️

FILES TO REPLACE
1. app/components/SemanticIcon.tsx
2. app/data/semanticIconRegistry.ts   (new file)
3. tests/e2e/icon-system-completion.spec.ts

VALIDATION ALREADY DONE ON THE PACKAGE
- Registry TypeScript syntax/type check: PASS
- Every semantic collision label from the supplied ICON-03 output is represented: PASS
- No rendered icon is assigned to two different semantic keys in the audited inventory: PASS
- No two different semantic keys use the same two-icon pair in reversed order: PASS
- Existing KuKa Circle data-kk-sequence fix is present in the supplied source baseline: CONFIRMED

RUN AFTER COPYING THE FILES
Keep your dev server running in Window 1.

Window 2:
npx playwright test "tests/e2e/icon-system-completion.spec.ts" --project=chromium --workers=1 --reporter=list

Expected: 3 passed

Then:
npm run lint
npm run build

After those pass, visually review localhost at desktop and mobile widths. Compound icons are intentionally rendered slightly smaller so two symbols fit inside the existing square icon container.
