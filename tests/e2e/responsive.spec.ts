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

        // A parent with overflow hidden can mask content that is wider than the
        // viewport without increasing document.scrollWidth. Check the visible
        // content itself so clipped headings, paragraphs and buttons are caught.
        const clippedElements = await page.locator("main#main-content").evaluate((main) => {
          const viewportWidth = document.documentElement.clientWidth;
          const candidates = Array.from(
            main.querySelectorAll<HTMLElement>(
              'h1, h2, h3, h4, p, a, button, img, form, [role="button"]',
            ),
          );

          return candidates
            .filter((element) => {
              const style = window.getComputedStyle(element);
              const rect = element.getBoundingClientRect();

              return (
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                Number.parseFloat(style.opacity || "1") > 0 &&
                style.position !== "fixed" &&
                rect.width > 0 &&
                rect.height > 0
              );
            })
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return rect.left < -1 || rect.right > viewportWidth + 1;
            })
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                tag: element.tagName.toLowerCase(),
                text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 100),
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                viewportWidth,
              };
            });
        });

        expect(
          clippedElements,
          `${route} has visible content clipped outside the ${viewport.width}px viewport`,
        ).toEqual([]);

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
