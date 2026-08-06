import { expect, test } from "@playwright/test";
import { preparePage } from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("desktop navbar, active state, logo and footer navigation work", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primaryNav).toBeVisible();
  await expect(primaryNav.getByRole("link", { name: "Home", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );

  await primaryNav.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", {
      name: "About",
      exact: true,
    }),
  ).toHaveAttribute("aria-current", "page");

  await page.getByRole("link", { name: "KultureKatta home" }).first().click();
  await expect(page).toHaveURL(/\/$/);

  const footerNav = page.getByRole("navigation", { name: "Footer navigation" });
  await footerNav.getByRole("link", { name: "Privacy Policy" }).click();
  await expect(page).toHaveURL(/\/privacy-policy\/?$/);
});

test("mobile menu opens, focuses, closes with Escape and closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menu = page.locator("details").filter({
    has: page.locator('summary[aria-label="Open or close navigation menu"]'),
  });
  const summary = menu.locator("summary");

  await expect(summary).toBeVisible();
  await summary.click();
  expect(await menu.evaluate((element) => (element as HTMLDetailsElement).open)).toBe(true);

  const firstLink = page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Home", exact: true });
  await expect(firstLink).toBeFocused();

  await page.keyboard.press("Escape");
  expect(await menu.evaluate((element) => (element as HTMLDetailsElement).open)).toBe(false);
  await expect(summary).toBeFocused();

  await summary.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();

  await expect(page).toHaveURL(/\/about\/?$/);
  expect(await menu.evaluate((element) => (element as HTMLDetailsElement).open)).toBe(false);
});

test("mobile navigation controls meet the minimum 44px tap-target size", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const summary = page.locator('summary[aria-label="Open or close navigation menu"]');
  await summary.click();

  const targets = page.locator(
    'summary[aria-label="Open or close navigation menu"], nav[aria-label="Mobile navigation"] a',
  );

  for (let index = 0; index < (await targets.count()); index += 1) {
    const target = targets.nth(index);
    const box = await target.boundingBox();

    expect(box, `Tap target ${index + 1} has no visible bounding box`).not.toBeNull();
    expect(box?.width ?? 0, `Tap target ${index + 1} is too narrow`).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0, `Tap target ${index + 1} is too short`).toBeGreaterThanOrEqual(44);
  }
});

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

test("contact drawer locks the background, traps focus and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Open contact form" });
  await expect(trigger).toBeVisible();
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Let’s start a conversation." });
  const closeButton = dialog.getByRole("button", { name: "Close contact form" });

  await expect(dialog).toBeVisible();
  await expect(closeButton).toBeFocused();
  await expect(page.locator("header")).toHaveAttribute("inert", "");
  expect(await page.locator("body").evaluate((body) => body.style.overflow)).toBe("hidden");

  const focusable = dialog.locator(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  await focusable.last().focus();
  await page.keyboard.press("Tab");
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("header")).not.toHaveAttribute("inert", "");

  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(100, 100);
  await expect(dialog).toBeHidden();
});
