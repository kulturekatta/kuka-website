import { expect, test } from "@playwright/test";
import { preparePage, representativeRoutes } from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const route of representativeRoutes) {
  test(`basic accessibility structure: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const duplicateIds = await page.locator("[id]").evaluateAll((elements) => {
      const ids = elements.map((element) => element.id).filter(Boolean);
      return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    });
    expect(duplicateIds, `Duplicate IDs found on ${route}`).toEqual([]);

    const imagesWithoutAlt = await page.locator("img:not([alt])").count();
    expect(imagesWithoutAlt, `Images without alt attributes on ${route}`).toBe(0);

    const unnamedButtons = await page.locator("button").evaluateAll((buttons) =>
      buttons
        .filter((button) => {
          const element = button as HTMLButtonElement;
          const accessibleText =
            element.getAttribute("aria-label") ||
            element.getAttribute("aria-labelledby") ||
            element.title ||
            element.textContent?.trim();
          return !accessibleText;
        })
        .map((button) => (button as HTMLButtonElement).outerHTML),
    );
    expect(unnamedButtons, `Buttons without accessible names on ${route}`).toEqual([]);

    const unlabeledControls = await page
      .locator('input:not([type="hidden"]), select, textarea')
      .evaluateAll((controls) =>
        controls
          .filter((control) => {
            const element = control as HTMLInputElement;
            const id = element.id;
            const hasLabel = id
              ? Boolean(document.querySelector(`label[for="${CSS.escape(id)}"]`))
              : Boolean(element.closest("label"));
            return !(
              hasLabel ||
              element.getAttribute("aria-label") ||
              element.getAttribute("aria-labelledby") ||
              element.title
            );
          })
          .map((control) => (control as HTMLElement).outerHTML),
      );
    expect(unlabeledControls, `Form controls without labels on ${route}`).toEqual([]);
  });
}
