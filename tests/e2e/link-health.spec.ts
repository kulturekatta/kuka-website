import { expect, test } from "@playwright/test";
import {
  normalizeInternalPath,
  preparePage,
  representativeRoutes,
} from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

// Keep the original broad-coverage guard, but do not spend time requesting links here.
test("link health discovers more than ten distinct internal destinations", async ({
  page,
  baseURL,
}) => {
  test.setTimeout(120_000);
  expect(baseURL).toBeTruthy();
  const internalPaths = new Set<string>();

  for (const route of representativeRoutes) {
    await test.step(`Discover links on ${route}`, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const hrefs = await page.locator("a[href]").evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute("href") || ""),
      );
      for (const href of hrefs) {
        const path = normalizeInternalPath(href, baseURL as string);
        if (path) internalPaths.add(path);
      }
    });
  }

  expect(internalPaths.size).toBeGreaterThan(10);
});

// A slow route or destination now fails its own test instead of timing out the entire crawl.
for (const route of representativeRoutes) {
  test(`internal links on ${route} do not break`, async ({ page, request, baseURL }) => {
    test.setTimeout(120_000);
    expect(baseURL).toBeTruthy();

    await page.goto(route, { waitUntil: "domcontentloaded" });
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href") || ""),
    );

    const internalPaths = new Set<string>();
    for (const href of hrefs) {
      const path = normalizeInternalPath(href, baseURL as string);
      if (path) internalPaths.add(path);
    }

    for (const path of [...internalPaths].sort()) {
      await test.step(`Check ${path}`, async () => {
        const response = await request.get(path, {
          maxRedirects: 10,
          timeout: 20_000,
        });
        expect(response.status(), `Broken internal link from ${route}: ${path}`).toBeLessThan(400);
      });
    }
  });
}
