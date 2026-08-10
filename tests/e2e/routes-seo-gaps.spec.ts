import { expect, test } from "@playwright/test";
import {
  normalizeInternalPath,
  preparePage,
  publicRoutes,
  representativeRoutes,
} from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("@gap RSEO-01 custom 404 shows useful content and a working Home link", async ({
  page,
}) => {
  const response = await page.goto(
    "/this-route-should-not-exist-kuka-custom-404-gap-check",
    { waitUntil: "domcontentloaded" },
  );

  expect(response?.status()).toBe(404);

  const main = page.locator("main#main-content");
  await expect(main).toBeVisible();
  await expect(main.locator("h1").first()).toBeVisible();

  const mainText = (await main.innerText()).replace(/\s+/g, " ").trim();
  expect(mainText.length, "The custom 404 page should not be blank").toBeGreaterThan(20);
  expect(mainText).toMatch(/404|not found|couldn['’]?t find|page.*missing/i);

  const homeLink = main.locator('a[href="/"]').first();
  await expect(homeLink).toBeVisible();
  await homeLink.click();
  await expect(page).toHaveURL(/\/$/);
});

test("@gap RSEO-02 every URL parsed from sitemap.xml resolves successfully", async ({
  request,
}) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);

  const xml = await sitemapResponse.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(locations.length).toBeGreaterThan(0);

  for (const location of locations) {
    const parsed = new URL(location);
    const path = `${parsed.pathname}${parsed.search}`;
    const response = await request.get(path, { maxRedirects: 10 });

    expect(
      response.status(),
      `Sitemap URL failed: ${location}`,
    ).toBeLessThan(400);
  }
});

test("@gap RSEO-03 no representative page exposes an obsolete /for-teams link", async ({
  page,
  baseURL,
}) => {
  expect(baseURL).toBeTruthy();
  const obsoleteLinks: Array<{ route: string; href: string }> = [];

  for (const route of representativeRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href") || ""),
    );

    for (const href of hrefs) {
      const normalized = normalizeInternalPath(href, baseURL as string);
      if (normalized && /^\/for-teams(?:[/?#]|$)/i.test(normalized)) {
        obsoleteLinks.push({ route, href });
      }
    }
  }

  expect(obsoleteLinks, "Obsolete /for-teams links were found").toEqual([]);
});

test("@gap RSEO-04 public routes contain meaningful main content, not a shell-only page", async ({
  page,
}) => {
  test.setTimeout(90_000);

  const blankRoutes: Array<{ route: string; textLength: number; meaningfulElements: number }> = [];

  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const result = await page.locator("main#main-content").evaluate((main) => {
      const text = (main.textContent || "").replace(/\s+/g, " ").trim();
      const meaningfulElements = main.querySelectorAll(
        "h1, h2, h3, p, article, img, form, a, button",
      ).length;

      return {
        textLength: text.length,
        meaningfulElements,
      };
    });

    if (result.textLength < 40 || result.meaningfulElements < 2) {
      blankRoutes.push({ route, ...result });
    }
  }

  expect(blankRoutes, "Potentially blank or shell-only routes were found").toEqual([]);
});