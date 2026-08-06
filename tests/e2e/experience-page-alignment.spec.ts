import { expect, test } from "@playwright/test";
import { preparePage } from "./helpers/site";

const routes = [
  "/experiences/wellness",
  "/experiences/festive",
  "/experiences/custom-combination",
];

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "laptop", width: 1024, height: 768 },
];

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const viewport of viewports) {
  test.describe(`${viewport.name} experience-page alignment`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of routes) {
      test(`${route} remains left aligned`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });

        const hero = page.locator("main#main-content section").first();
        const heroHeading = hero.locator("h1");
        const heroIntro = hero.locator(".kk-page-intro");
        const heroEyebrow = hero.locator(".kk-page-label");
        const firstCard = page.locator("article.kk-card").first();
        const closingPanel = page.locator(".kk-panel").last();

        for (const element of [
          heroHeading,
          heroIntro,
          heroEyebrow,
          firstCard.locator("h3"),
          firstCard.locator("p"),
          closingPanel.locator("h2"),
          closingPanel.locator("p").first(),
        ]) {
          await expect(element).toBeVisible();
          const textAlign = await element.evaluate(
            (node) => window.getComputedStyle(node).textAlign,
          );
          expect(["left", "start"]).toContain(textAlign);
        }

        const [eyebrowBox, headingBox, introBox] = await Promise.all([
          heroEyebrow.boundingBox(),
          heroHeading.boundingBox(),
          heroIntro.boundingBox(),
        ]);

        expect(eyebrowBox).not.toBeNull();
        expect(headingBox).not.toBeNull();
        expect(introBox).not.toBeNull();

        expect(Math.abs((eyebrowBox?.x ?? 0) - (headingBox?.x ?? 0))).toBeLessThanOrEqual(2);
        expect(Math.abs((headingBox?.x ?? 0) - (introBox?.x ?? 0))).toBeLessThanOrEqual(2);
      });
    }
  });
}
