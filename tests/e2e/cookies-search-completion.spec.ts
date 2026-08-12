import {
  expect,
  test,
  type BrowserContext,
  type Locator,
  type Page,
} from "@playwright/test";
import { COOKIE_CONSENT_KEY } from "./helpers/site";
import { completionLayoutIssues } from "./helpers/completion";

const cookieRegionName = "A tiny cookie note 🍪";

async function suppressPreviewDrawer(context: BrowserContext) {
  await context.addInitScript(() => {
    const style = document.createElement("style");
    style.dataset.playwrightNetlifyDrawer = "hidden";
    style.textContent = `
      div[data-netlify-deploy-id][data-netlify-site-id],
      iframe[title="Netlify Drawer"] {
        display: none !important;
        pointer-events: none !important;
      }
    `;
    const installStyle = () => {
      if (!style.isConnected) {
        document.documentElement?.appendChild(style);
      }
    };
    installStyle();
    document.addEventListener("DOMContentLoaded", installStyle, {
      once: true,
    });
  });
}

async function startWithoutCookieChoice(page: Page) {
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
  }, COOKIE_CONSENT_KEY);
}

async function tabTo(page: Page, locator: Locator, limit = 80) {
  for (let index = 0; index < limit; index += 1) {
    await page.keyboard.press("Tab");
    if (await locator.evaluate((element) => element === document.activeElement)) {
      return;
    }
  }

  throw new Error(`Keyboard focus did not reach ${await locator.getAttribute("name")}`);
}

test("@completion COOKIE-PROFILE accepted and rejected choices survive reload and a restored browser profile", async ({
  browser,
  baseURL,
}) => {
  expect(baseURL).toBeTruthy();

  for (const choice of ["accepted", "rejected"] as const) {
    await test.step(choice, async () => {
      const context = await browser.newContext({ baseURL });
      await suppressPreviewDrawer(context);
      const page = await context.newPage();
      await page.goto("/");

      const banner = page.getByRole("region", { name: cookieRegionName });
      await expect(banner).toBeVisible();
      await banner
        .getByRole("button", {
          name:
            choice === "accepted"
              ? "Accept optional cookies"
              : "Decline optional cookies",
        })
        .click();

      await expect
        .poll(() =>
          page.evaluate(
            (key) => window.localStorage.getItem(key),
            COOKIE_CONSENT_KEY,
          ),
        )
        .toBe(choice);
      await page.reload();
      await expect(banner).toBeHidden();

      const storageState = await context.storageState();
      await context.close();

      const restoredContext = await browser.newContext({
        baseURL,
        storageState,
      });
      await suppressPreviewDrawer(restoredContext);
      const restoredPage = await restoredContext.newPage();
      await restoredPage.goto("/");
      await expect
        .poll(() =>
          restoredPage.evaluate(
            (key) => window.localStorage.getItem(key),
            COOKIE_CONSENT_KEY,
          ),
        )
        .toBe(choice);
      await expect(
        restoredPage.getByRole("region", { name: cookieRegionName }),
      ).toBeHidden();
      await restoredContext.close();
    });
  }
});

for (const choice of ["Accept", "Decline"] as const) {
  test(`@completion COOKIE-DECISION-FOCUS ${choice.toLowerCase()} moves keyboard focus to main content`, async ({
    context,
    page,
  }) => {
    await suppressPreviewDrawer(context);
    await startWithoutCookieChoice(page);
    await page.goto("/");

    const button = page.getByRole("button", {
      name: `${choice} optional cookies`,
    });
    await button.focus();
    await button.press("Enter");

    await expect(
      page.getByRole("region", { name: cookieRegionName }),
    ).toBeHidden();
    await expect(page.locator("main#main-content")).toBeFocused();
  });
}

test("@completion COOKIE-RANGE banner content and controls remain usable from 320px through 430px", async ({
  context,
  page,
}) => {
  await suppressPreviewDrawer(context);
  await startWithoutCookieChoice(page);

  for (const width of [320, 360, 390, 430]) {
    await test.step(`${width}px`, async () => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      const banner = page.getByRole("region", { name: cookieRegionName });
      await expect(banner).toBeVisible();

      const result = await banner.evaluate((element) => {
        const viewportWidth = document.documentElement.clientWidth;
        const controls = Array.from(
          element.querySelectorAll<HTMLElement>("a, button"),
        );
        const text = element.querySelector<HTMLElement>(
          "#cookie-banner-description",
        );
        const textRect = text?.getBoundingClientRect();

        return {
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth,
          textInside:
            !textRect ||
            (textRect.left >= -1 && textRect.right <= viewportWidth + 1),
          controls: controls.map((control) => {
            const rect = control.getBoundingClientRect();
            return {
              name: control.textContent?.replace(/\s+/g, " ").trim(),
              left: rect.left,
              right: rect.right,
              height: rect.height,
            };
          }),
        };
      });

      expect(result.documentWidth).toBeLessThanOrEqual(result.viewportWidth + 1);
      expect(result.textInside).toBe(true);
      for (const control of result.controls) {
        expect(control.left, `${control.name} starts outside ${width}px`).toBeGreaterThanOrEqual(-1);
        expect(control.right, `${control.name} ends outside ${width}px`).toBeLessThanOrEqual(
          result.viewportWidth + 1,
        );
        expect(control.height, `${control.name} is shorter than 44px`).toBeGreaterThanOrEqual(44);
      }
    });
  }
});

test("@completion COOKIE-DESKTOP banner placement and keyboard order work at 1366x768", async ({
  context,
  page,
}) => {
  await suppressPreviewDrawer(context);
  await page.setViewportSize({ width: 1366, height: 768 });
  await startWithoutCookieChoice(page);
  await page.goto("/");

  const banner = page.getByRole("region", { name: cookieRegionName });
  await expect(banner).toBeVisible();
  const box = await banner.boundingBox();
  expect(box).not.toBeNull();
  expect((box?.x ?? -1) + (box?.width ?? 0)).toBeLessThanOrEqual(1367);
  expect((box?.y ?? -1) + (box?.height ?? 0)).toBeLessThanOrEqual(769);

  const cookiePolicy = banner.getByRole("link", { name: "Cookie Policy" });
  const privacyPolicy = banner.getByRole("link", { name: "Privacy Policy" });
  const decline = banner.getByRole("button", {
    name: "Decline optional cookies",
  });
  const accept = banner.getByRole("button", {
    name: "Accept optional cookies",
  });

  await cookiePolicy.focus();
  await page.keyboard.press("Tab");
  await expect(privacyPolicy).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(decline).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(accept).toBeFocused();
});

test("@completion SEARCH-DESKTOP pointer and keyboard flows open the Kokedama destination", async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), COOKIE_CONSENT_KEY);
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  let searchbox = page.getByRole("searchbox", { name: "Search KultureKatta" }).first();
  await searchbox.click();
  await expect(searchbox).toBeFocused();
  await searchbox.fill("Kokedama");
  await page.getByRole("search").first().getByRole("button", { name: "Search" }).click();
  const result = page.getByRole("link", { name: /Hands-On Workshops/i });
  await expect(result).toHaveAttribute("href", "/experiences/workshops");
  await result.click();
  await expect(page).toHaveURL(/\/experiences\/workshops\/?$/);

  await page.goto("/");
  searchbox = page.getByRole("searchbox", { name: "Search KultureKatta" }).first();
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await tabTo(page, searchbox);
  await expect(searchbox).toBeFocused();
  await searchbox.fill("Kokedama");
  await searchbox.press("Enter");
  await expect(page).toHaveURL(/\/search\?q=Kokedama$/);
});

test("@completion SEARCH-WELLNESS returns the exact approved destination", async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), COOKIE_CONSENT_KEY);
  await page.goto("/search?q=wellness");

  const hrefs = await page
    .locator('main#main-content a[href^="/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(hrefs).toEqual(["/experiences/wellness"]);
  await expect(
    page.getByRole("link", { name: /Wellness & Slowing Down/i }),
  ).toBeVisible();
});

test("@completion SEARCH-MOBILE logo navigation, search access and results fit a 390px header flow", async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), COOKIE_CONSENT_KEY);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about", { waitUntil: "domcontentloaded" });

  const logo = page.getByRole("link", { name: "KultureKatta home" }).first();
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("href", "/");
  await logo.focus();
  await expect(logo).toBeFocused();
  await Promise.all([
    page.waitForURL(/\/$/, { waitUntil: "domcontentloaded", timeout: 30_000 }),
    logo.press("Enter"),
  ]);

  const mobileSearchbox = page.locator("#mobile-site-search");
  await expect(
    mobileSearchbox,
    "Mobile users need a visible search control in the header flow",
  ).toBeVisible();
  await expect(mobileSearchbox).toBeEditable();
  await mobileSearchbox.fill("Kokedama");
  await expect(mobileSearchbox).toBeFocused();
  await mobileSearchbox.press("Enter");
  await expect(page).toHaveURL(/\/search\?q=Kokedama$/);
  const issues = await completionLayoutIssues(page);
  expect(issues.documentWidth).toBeLessThanOrEqual(issues.viewportWidth + 1);
  expect(issues.clipped).toEqual([]);
});
