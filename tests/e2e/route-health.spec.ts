import { expect, test } from "@playwright/test";
import {
  preparePage,
  publicRoutes,
  redirectCases,
} from "./helpers/site";

const retiredRecruitmentRoutes = new Set([
  "/work-with-us",
  "/katta-studio/work-with-us",
]);

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const route of publicRoutes.filter((route) => !retiredRecruitmentRoutes.has(route))) {
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

for (const route of retiredRecruitmentRoutes) {
  test(`retired recruitment route returns 404: ${route}`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(404);
  });
}

test("retired recruitment submission endpoint rejects public applications", async ({ request }) => {
  const response = await request.post("/api/work-with-us", { data: {} });
  expect(response.status()).toBe(410);
});
