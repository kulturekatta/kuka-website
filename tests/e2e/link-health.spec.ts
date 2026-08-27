import { expect, test } from "@playwright/test";
import {
  normalizeInternalPath,
  preparePage,
  representativeRoutes,
} from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("internal links exposed across representative pages do not break", async ({
  page,
  request,
  baseURL,
}) => {
  expect(baseURL).toBeTruthy();
  const internalPaths = new Set<string>();

  for (const route of representativeRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href") || ""),
    );

    for (const href of hrefs) {
      const normalized = normalizeInternalPath(href, baseURL as string);
      if (normalized) {
        internalPaths.add(normalized);
      }
    }
  }

  expect(internalPaths.size).toBeGreaterThan(10);

  for (const path of [...internalPaths].sort()) {
    const response = await request.get(path, { maxRedirects: 10 });
    expect(response.status(), `Broken internal link: ${path}`).toBeLessThan(400);
  }
});
