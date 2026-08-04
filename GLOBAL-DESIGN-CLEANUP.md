# KultureKatta Global Design System

The website’s visual system is controlled from the `:root` block at the top of
`app/globals.css`. Change those variables first; page files should not need to
be edited for routine typography, colour, card, button, or spacing changes.

## Page opening

Every route now uses the same three roles:

- `.kk-page-label` — the short label immediately below the navbar
- `.kk-page-heading` — the main page headline
- `.kk-page-intro` — the introductory text immediately below the headline

Change these variables:

- `--kk-page-label-size`, `--kk-page-label-color`
- `--kk-page-title-size`, `--kk-page-title-color`
- `--kk-page-intro-size`, `--kk-page-intro-color`
- `--kk-page-start-space` — space between the navbar and first page content

## Section typography

- `.kk-section-label` and `.kk-eyebrow` use the section-label controls
- `.kk-section-heading` and `.kk-section-title` use the section-title controls

Change:

- `--kk-section-label-size`, `--kk-section-label-color`
- `--kk-section-title-size`, `--kk-section-title-color`

## Body text

- `.kk-body` is standard body copy
- `.kk-body-large` is larger supporting copy

Change:

- `--kk-body-size`, `--kk-body-line`, `--kk-body-color`
- `--kk-body-large-size`, `--kk-body-large-line`

## Cards

All shared cards use a white/light surface and dark text. Their text roles are:

- `.kk-card-title`
- `.kk-card-body`
- `.kk-card-number` / `.kk-card-marker`
- `.kk-card-meta` / `.kk-card-tag`

Change:

- `--kk-card-title-size`, `--kk-card-title-color`
- `--kk-card-body-size`, `--kk-card-body-color`
- `--kk-card-number-size`, `--kk-card-number-color`
- `--kk-card-meta-size`, `--kk-card-meta-color`
- `--kk-card-padding`, `--kk-card-radius`

Card titles and card numbers have deliberately been increased from the earlier
version.

## Buttons

Primary and outline buttons share one global text system.

Change:

- `--kk-button-size`, `--kk-button-text-color`
- `--kk-button-background`, `--kk-button-border`
- `--kk-button-hover-size`, `--kk-button-hover-text-color`
- `--kk-button-hover-background`, `--kk-button-hover-border`
- `--kk-button-padding-y`, `--kk-button-padding-x`

## Section spacing

All top-level page sections use:

- `--kk-section-space`

This has been reduced from the earlier spacing. Change one value to make every
page more compact or more spacious.

## Background rules

- Utility/contact/search bar: light background
- Navbar: dark background
- Footer: dark background
- Main pages and content sections: light background
- Cards and content blocks: light background with dark text

The old `kk-section-cream` and `kk-card-cream` names remain as compatibility
aliases, but they no longer create peach sections or cards.

## Editing rule for future pages

Use the semantic `kk-*` role for typography and colour. Tailwind utilities may
still be used for layout, widths, grids, margins, and responsive placement.

Example:

```tsx
<p className="kk-page-label">About KultureKatta</p>
<h1 className="kk-page-heading">The neighbourhood katta for the curious.</h1>
<p className="kk-page-intro">Introductory copy goes here.</p>
```

Avoid adding local utilities such as `text-7xl`, `text-black/70`, or a
hard-coded hex colour to elements that already have a semantic typography
class.
