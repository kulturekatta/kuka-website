KultureKatta SEO foundation patch

Replace these files in the project:
- app/sitemap.ts
- app/robots.ts
- app/layout.tsx

Important:
- The sitemap now imports the same canonical category dataset used by app/experiences/[slug]/page.tsx: @/data/experienceCategories.
- Do not delete data/experienceCategories.ts.
- app/experiences/experienceCategories.ts appears to be an obsolete duplicate and should only be removed after confirming no imports remain.
- layout.tsx adds metadataBase only. It intentionally does not add one global canonical URL, because each public route needs its own self-referencing canonical.

After replacing:
1. npm run lint
2. npm run build
3. npm run dev
4. Check http://localhost:3000/sitemap.xml
5. Check http://localhost:3000/robots.txt
