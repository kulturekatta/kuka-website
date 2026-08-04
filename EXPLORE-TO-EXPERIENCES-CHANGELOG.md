# Explore → Experiences route consolidation

## What changed

- Removed the parallel `app/explore` route.
- Kept `app/experiences` as the single master experience route.
- Moved the richer category data to `data/experienceCategories.ts`.
- Rebuilt `app/experiences/[slug]/page.tsx` to serve these nine routes:
  - `/experiences/workshops`
  - `/experiences/food`
  - `/experiences/walks`
  - `/experiences/talks`
  - `/experiences/words`
  - `/experiences/sound`
  - `/experiences/stories`
  - `/experiences/movement`
  - `/experiences/games`
- Updated homepage, About, Search, Moods, Footer, and category links.
- Made the nine category cards on `/experiences` clickable.
- Kept `/kuka-universe/explore` unchanged because it is the separate KuKa Explore vertical.
- Added permanent redirects for old `/explore` URLs and the previous broad `/experiences/...` slugs.
- Fixed three pre-existing broken links found during route validation:
  - `/organizations#organization-inquiry`
  - `/stories`
  - `/for-organisations`

## Apply the update

Replace the corresponding files and folders in your project with the files in this package. In particular:

1. Delete your old `app/explore` folder.
2. Delete `app/experiences/experienceCategories.ts`.
3. Delete `data/exploreCategories.ts`.
4. Copy the updated `app`, `data`, and `next.config.ts` into the project.
5. Run:

```bash
npm run build
```

The included `next.config.ts` preserves old links through permanent redirects.
