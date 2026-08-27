import { expect, test } from "@playwright/test";
import { preparePage } from "../e2e/helpers/site";

const routes = [
  { name: "home", route: "/" },
  { name: "experiences", route: "/experiences" },
  { name: "organizations", route: "/for-organizations" },
  { name: "katta-studio", route: "/katta-studio" },
  { name: "contact", route: "/contact" },
];

const viewports = [
  { name: "phone", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

test.beforeEach(async ({ page }) => {
  await preparePage(page);
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
});

for (const viewport of viewports) {
  for (const route of routes) {
    test(`@visual VIS-${viewport.name}-${route.name} approved full-page layout remains stable`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(route.route, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(250);

      await expect(page).toHaveScreenshot(
        `${route.name}-${viewport.width}x${viewport.height}.png`,
        {
          fullPage: true,
          animations: "disabled",
          caret: "hide",
          maxDiffPixelRatio: 0.01,
        },
      );
    });
  }
}
