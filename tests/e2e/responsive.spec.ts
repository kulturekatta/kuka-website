import { expect, test } from "@playwright/test";
import { preparePage, representativeRoutes } from "./helpers/site";

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide desktop", width: 1920, height: 1080 },
];

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const viewport of viewports) {
  test.describe(`${viewport.name} layout`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of representativeRoutes) {
      test(`${route} has no horizontal page overflow`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });

        const dimensions = await page.evaluate(() => ({
          viewportWidth: document.documentElement.clientWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
        }));

        expect(
          dimensions.documentWidth,
          `${route} overflows at ${viewport.width}px`,
        ).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
        expect(dimensions.bodyWidth).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
        await expect(page.locator("main#main-content")).toBeVisible();
      });
    }

    test("navigation changes at the intended breakpoint", async ({ page }) => {
      await page.goto("/");

      const desktopNav = page.getByRole("navigation", { name: "Primary navigation" });
      const mobileSummary = page.locator(
        'summary[aria-label="Open or close navigation menu"]',
      );
      const floatingContact = page.getByRole("button", { name: "Open contact form" });

      if (viewport.width < 1024) {
        await expect(desktopNav).toBeHidden();
        await expect(mobileSummary).toBeVisible();
      } else {
        await expect(desktopNav).toBeVisible();
        await expect(mobileSummary).toBeHidden();
      }

      if (viewport.width < 768) {
        await expect(floatingContact).toBeHidden();
      } else {
        await expect(floatingContact).toBeVisible();
      }
    });
  });
}
