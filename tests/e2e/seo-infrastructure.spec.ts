import { expect, test } from "@playwright/test";
import {
  preparePage,
  representativeRoutes,
  sitemapRoutes,
} from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("robots.txt is reachable and protects API routes", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toMatch(/User-Agent:\s*\*/i);
  expect(body).toMatch(/Allow:\s*\//i);
  expect(body).toMatch(/Disallow:\s*\/api\//i);
  expect(body).toMatch(/Sitemap:\s*https:\/\/kulturekatta\.com\/sitemap\.xml/i);
});

test("sitemap.xml contains every intended public sitemap route without duplicates", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);

  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(locations.length).toBeGreaterThan(0);
  expect(new Set(locations).size).toBe(locations.length);

  const paths = locations.map((location) => new URL(location).pathname);
  for (const route of sitemapRoutes) {
    expect(paths, `Sitemap is missing ${route}`).toContain(route);
  }
});

for (const route of representativeRoutes) {
  test(`metadata and document structure: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(/\S+/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S+/,
    );
    await expect(page.locator('html[lang="en"]')).toHaveCount(1);
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expect(page.locator('a[href="#main-content"]')).toHaveCount(1);
  });
}
