# KultureKatta card system

All website cards now inherit their visual styling and typography from
`app/globals.css`.

## Global controls

Edit the `/* 8. CARDS */` variables in `:root` to change every card:

- `--kk-card-background`
- `--kk-card-background-soft`
- `--kk-card-border-color`
- `--kk-card-shadow`
- `--kk-card-hover-shadow`
- `--kk-card-title-size`
- `--kk-card-body-size`
- `--kk-card-number-size`
- `--kk-card-year-size`
- `--kk-card-meta-size`
- `--kk-card-padding`
- `--kk-card-padding-compact`
- `--kk-card-padding-roomy`
- `--kk-card-radius`

`--kk-card-body-size` is linked to `--kk-body-size`, so increasing the global
body size also updates card descriptions and list text.

## Card classes

Use `kk-card` on every card container. Add only the modifiers the card needs:

- `kk-card--interactive` for clickable or hoverable cards
- `kk-card--compact` for small cards
- `kk-card--roomy` for cards with longer content
- `kk-card--centered` for centred cards
- `kk-card--soft` for a neutral alternate surface
- `kk-card--featured` for a highlighted card

Use these semantic text roles inside cards:

- `kk-card-label`
- `kk-card-title`
- `kk-card-body`
- `kk-card-number`
- `kk-card-year`
- `kk-card-value`
- `kk-card-meta`
- `kk-card-tag`
- `kk-card-list` and `kk-card-list-item`
- `kk-card-footer`

Use `kk-panel` for large CTA, form, or content panels. Add
`kk-panel--flush` when the panel's children provide their own internal padding.

## Example

```tsx
<article className="kk-card kk-card--interactive">
  <p className="kk-card-label">Workshops</p>
  <h3 className="kk-card-title">Hands-on cultural experiences</h3>
  <p className="kk-card-body">
    Creative, participatory experiences for teams and private groups.
  </p>
  <div className="kk-card-footer">
    <p className="kk-card-meta">Available for custom groups</p>
  </div>
</article>
```

Grid columns, gaps, minimum heights, widths, and placement remain in each page
because they describe layout rather than card design. Do not add page-level
`text-*`, `p-*`, `rounded-*`, `border-*`, `bg-*`, `shadow-*`, or custom hover
classes to a card unless the design system is deliberately being extended.
