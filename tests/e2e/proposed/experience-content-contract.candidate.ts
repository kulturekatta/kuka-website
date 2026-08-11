import { expect, test } from "@playwright/test";
import { experienceCategories } from "../../../data/experienceCategories";
import { preparePage } from "../helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("@completion EXPERIENCE-CONTENT every approved category exposes its complete content contract", async ({
  page,
}) => {
  test.setTimeout(180_000);

  for (const category of experienceCategories) {
    await test.step(category.href, async () => {
      await page.goto(category.href, { waitUntil: "domcontentloaded" });
      const main = page.locator("main#main-content");

      await expect(main.getByRole("heading", { level: 1 })).toHaveText(
        category.heroTitle,
      );
      await expect(main).toContainText(category.eyebrow);
      await expect(main).toContainText(category.heroSubtitle);
      await expect(main).toContainText(category.intro);

      await expect(
        main.getByRole("link", { name: "View All Experiences" }),
      ).toHaveAttribute("href", "/experiences");
      await expect(
        main.getByRole("link", { name: "Collaborate With Us" }),
      ).toHaveAttribute("href", "/contact");

      for (const label of [
        "What this means",
        "Includes",
        "Possible formats",
        "Explore more",
      ]) {
        await expect(main.getByText(label, { exact: true }).first()).toBeVisible();
      }

      for (const item of category.includes) {
        await expect(main.getByText(item, { exact: true })).toBeVisible();
      }
      for (const format of category.formats) {
        await expect(main.getByText(format, { exact: true })).toBeVisible();
      }

      const otherCategoryLinks = main.locator(
        'a[href^="/experiences/"]:not([href="/experiences"])',
      );
      await expect(otherCategoryLinks).toHaveCount(experienceCategories.length - 1);

      const images = main.locator("img");
      for (let index = 0; index < (await images.count()); index += 1) {
        const dimensions = await images.nth(index).evaluate(
          (image: HTMLImageElement) => ({
            complete: image.complete,
            width: image.naturalWidth,
            height: image.naturalHeight,
          }),
        );
        expect(dimensions.complete).toBe(true);
        expect(dimensions.width).toBeGreaterThan(0);
        expect(dimensions.height).toBeGreaterThan(0);
      }
    });
  }
});
