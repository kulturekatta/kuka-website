# KultureKatta Icon System

This file defines the permanent icon architecture for the public website.

## 1. Single source of truth

`app/data/semanticIconRegistry.ts`

- A semantic meaning owns one rendered icon visual.
- Different meanings must not share the same rendered visual.
- Intentional wording aliases may share a visual only when they share the same registry `key`.
- Two-icon combinations must not become near-duplicates by reversing the same pair.
- Universal UI controls such as menu/close/check states are not semantic content icons and may remain standardized.

Examples:

- `Artists` -> `🎭`
- `Artists & facilitators` / `Artists and facilitators` -> `🎨 🤝`
- `Experience formats` -> `🧰 🎭`
- `NGOs, Foundations & Social Enterprises` -> `🤲 🌱`
- `Co-create` / “Host with KuKa” context -> `🌱`

## 2. Rendering component

`app/components/SemanticIcon.tsx`

All semantic content icons should render through `SemanticIcon`.

It resolves the requested icon + label through the registry and emits:

- `data-kk-icon`
- `data-kk-icon-key`
- `data-kk-icon-label`
- `data-kk-icon-size`
- `data-kk-icon-compound`

Do not rebuild the icon box with ad-hoc Tailwind classes in page files.

## 3. Leading icon placement

`app/components/IconLead.tsx`

Use `IconLead` for page-opening and major section-opening icons where practical.

Roles:

- `size="page"` — page/hero opening visual
- default `size="section"` — major section opening visual
- `align="start"` — left-aligned content
- `align="center"` — centered content

Existing page code can still render a `SemanticIcon` directly when needed; the Playwright contract checks that the visual appears before the relevant heading.

## 4. Global CSS

`app/globals.css`

The `/* 12. ICON SYSTEM */` variables define:

- icon container sizes
- glyph sizes
- compound-icon sizes
- border, radius, background and shadow
- emoji font stack
- lead spacing

The `.kk-icon*`, `.kk-icon-lead*`, and `.kk-sequence-marker` classes implement those tokens.

Do not put size/border/background/shadow rules back into `SemanticIcon.tsx`.

## 5. Placement and occurrence rules

CSS cannot enforce whether an icon exists. Components + tests enforce occurrence.

Public-site rules:

1. Every page hero has a page visual before the H1.
2. Every major content section with an H1/H2 has a leading visual before that heading.
3. Every semantic card/panel has an icon, sequence marker, image, or avatar.
4. Card/panel visuals appear before the first H2/H3.
5. Numbered/process cards may use `SequenceMarker` instead of a semantic icon.
6. Image-led or avatar-led cards do not need a second decorative icon.
7. Non-search forms contain a semantic form icon before their first field.
8. The same rendered semantic visual must not repeat twice on one rendered page/state.
9. One rendered visual must not represent different semantic meanings anywhere in the audited site.
10. Repeated wording aliases may share an icon only through the same registry key.
11. Deliberate “not” markers (`×`) use `data-kk-sequence` so they are tracked as intentional visuals.
12. Standard UI controls (menu, close, validation checkmarks, etc.) are exempt from semantic uniqueness.

## 6. Automated enforcement

Source audit:

```powershell
npm run audit:icons
```

This verifies:

- registry uniqueness
- alias consistency
- reversed-pair near-duplicates
- literal `SemanticIcon` / `IconLead` labels are registered
- common icon-bearing data labels are registered
- unsupported/replacement glyphs are absent
- tracked `×` visuals
- global CSS/component contract is present

Rendered audit:

```powershell
npx playwright test "tests/e2e/icon-system-completion.spec.ts" --project=chromium --workers=1 --reporter=list
```

The Playwright audit includes:

- public routes
- empty search
- no-results search
- a 404 state
- same-page duplicate checking
- section/card/form presence and placement
- site-wide semantic uniqueness
- reversed two-icon near-duplicate checking

## 7. Adding a new icon

When adding a new semantic concept:

1. Choose the meaning first.
2. Add the meaning to `semanticIconRegistry.ts`.
3. Reuse an existing registry key only if it is genuinely the same semantic meaning.
4. Render through `SemanticIcon` (or `IconLead` for page/section openings).
5. Run `npm run audit:icons`.
6. Run the icon Playwright suite.
7. Visually review on desktop and mobile.

Do not choose an icon merely because it looks different. It should still make semantic sense.
