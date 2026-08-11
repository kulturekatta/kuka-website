import { expect, test } from "@playwright/test";
import { experienceCategories } from "../../data/experienceCategories";
import { preparePage } from "./helpers/site";

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

      for (const otherCategory of experienceCategories.filter(
        (item) => item.slug !== category.slug,
      )) {
        await expect(
          main.locator(`a[href="${otherCategory.href}"]`),
          `${category.href} must link to ${otherCategory.href}`,
        ).toHaveCount(1);
      }

      const images = main.locator("img");
      for (let index = 0; index < (await images.count()); index += 1) {
        const image = images.nth(index);
        await image.scrollIntoViewIfNeeded();

        await expect
          .poll(() =>
            image.evaluate((element: HTMLImageElement) => ({
              complete: element.complete,
              width: element.naturalWidth,
              height: element.naturalHeight,
            })),
          )
          .toMatchObject({ complete: true });

        const details = await image.evaluate((element: HTMLImageElement) => ({
          alt: element.getAttribute("alt"),
          source: element.currentSrc || element.src,
          width: element.naturalWidth,
          height: element.naturalHeight,
        }));

        expect(details.alt, `${category.href}: ${details.source} needs an alt attribute`).not.toBeNull();
        expect(details.width, `${category.href}: ${details.source} has no width`).toBeGreaterThan(0);
        expect(details.height, `${category.href}: ${details.source} has no height`).toBeGreaterThan(0);

        if (details.alt?.trim()) {
          expect(
            details.alt,
            `${category.href}: ${details.source} has placeholder alt text`,
          ).not.toMatch(/^(?:image|photo|picture|placeholder|untitled|img[-_ ]?\d*)$/i);
          expect(
            details.alt,
            `${category.href}: ${details.source} uses a filename as alt text`,
          ).not.toMatch(/\.(?:avif|gif|jpe?g|png|svg|webp)$/i);
        }
      }
    });
  }
});
