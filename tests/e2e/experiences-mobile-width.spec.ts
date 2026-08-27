import { expect, test } from "@playwright/test";
import { preparePage } from "./helpers/site";

const mobileWidths = [360, 375, 412];

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const width of mobileWidths) {
  test.describe(`Experiences hero at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("hero copy and actions stay inside the viewport", async ({ page }) => {
      await page.goto("/experiences", { waitUntil: "domcontentloaded" });

      const results = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth;
        const selectors = [
          '[data-testid="experiences-hero-grid"]',
          '[data-testid="experiences-hero-copy"]',
          '[data-testid="experiences-hero-copy"] h1',
          '[data-testid="experiences-hero-copy"] .kk-page-intro',
          '[data-testid="experiences-hero-actions"]',
          '[data-testid="experiences-hero-actions"] a',
        ];

        return selectors.flatMap((selector) =>
          Array.from(document.querySelectorAll<HTMLElement>(selector)).map(
            (element) => {
              const rect = element.getBoundingClientRect();
              return {
                selector,
                left: rect.left,
                right: rect.right,
                width: rect.width,
                viewportWidth,
              };
            },
          ),
        );
      });

      for (const result of results) {
        expect(result.left, `${result.selector} begins outside the viewport`).toBeGreaterThanOrEqual(-1);
        expect(result.right, `${result.selector} ends outside the viewport`).toBeLessThanOrEqual(
          result.viewportWidth + 1,
        );
      }

      await expect(page.locator('[data-testid="experiences-hero-actions"] a')).toHaveCount(2);
    });
  });
}
