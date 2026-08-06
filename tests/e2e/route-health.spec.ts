import { expect, test } from "@playwright/test";
import {
  preparePage,
  publicRoutes,
  redirectCases,
} from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const route of publicRoutes) {
  test(`route health: ${route}`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(response, `No navigation response was returned for ${route}`).not.toBeNull();
    expect(response?.status(), `${route} returned an error status`).toBeLessThan(400);
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).toHaveTitle(/\S+/);

    await page.waitForTimeout(150);
    expect(pageErrors, `Browser errors on ${route}`).toEqual([]);
  });
}

test("the intentional missing route returns the 404 response", async ({ page }) => {
  const response = await page.goto(
    "/this-route-should-not-exist-kuka-stabilization-check",
    { waitUntil: "domcontentloaded" },
  );

  expect(response?.status()).toBe(404);
});

for (const [source, destination] of redirectCases) {
  test(`redirect: ${source} → ${destination}`, async ({ page }) => {
    const response = await page.goto(source, { waitUntil: "domcontentloaded" });

    expect(response?.status()).toBeLessThan(400);
    expect(new URL(page.url()).pathname).toBe(destination);
  });
}
