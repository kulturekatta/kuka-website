import { expect, test } from "@playwright/test";
import { preparePage, publicRoutes, representativeRoutes } from "./helpers/site";

async function layoutIssues(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const selectors = [
      "main#main-content h1",
      "main#main-content h2",
      "main#main-content h3",
      "main#main-content p",
      "main#main-content a",
      "main#main-content button",
      "main#main-content input",
      "main#main-content select",
      "main#main-content textarea",
      "main#main-content img",
      "main#main-content form",
      "footer a",
      "footer button",
    ];

    const clipped = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(",")))
      .filter((element) => {
        if (element.closest('[aria-hidden="true"]')) {
          return false;
        }

        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          Number.parseFloat(style.opacity || "1") > 0 &&
          style.position !== "fixed" &&
          rect.width > 0 &&
          rect.height > 0 &&
          (rect.left < -1 || rect.right > viewportWidth + 1)
        );
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          name: element.getAttribute("name") || element.textContent?.replace(/\s+/g, " ").trim().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          viewportWidth,
        };
      });

    return {
      viewportWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      clipped,
    };
  });
}

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("@exhaustive RESP-320 every public page remains usable at 320x568", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 320, height: 568 });

  for (const route of publicRoutes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const issues = await layoutIssues(page);
      expect(issues.documentWidth, `${route} creates document overflow`).toBeLessThanOrEqual(
        issues.viewportWidth + 1,
      );
      expect(issues.bodyWidth, `${route} creates body overflow`).toBeLessThanOrEqual(
        issues.viewportWidth + 1,
      );
      expect(issues.clipped, `${route} clips visible content`).toEqual([]);
    });
  }
});

test("@exhaustive RESP-390 forms, legal pages, Moods, Moments and verticals fit 390x844", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const routes = [
    "/moods",
    "/moments",
    "/privacy-policy",
    "/cookie-policy",
    "/terms-of-use",
    "/kuka-universe/5-senses",
    "/kuka-universe/circle",
    "/kuka-universe/explore",
    "/kuka-universe/wellness",
    "/katta-studio/work-with-us",
  ];

  for (const route of routes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const issues = await layoutIssues(page);
      expect(issues.documentWidth).toBeLessThanOrEqual(issues.viewportWidth + 1);
      expect(issues.clipped, `${route} clips visible content`).toEqual([]);
    });
  }
});

test("@exhaustive RESP-TEXT doubling rendered text does not clip representative pages", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  for (const route of representativeRoutes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => {
        const textSelectors = [
          "main#main-content h1",
          "main#main-content h2",
          "main#main-content h3",
          "main#main-content p",
          "main#main-content a",
          "main#main-content button",
          "main#main-content label",
          "main#main-content input",
          "main#main-content select",
          "main#main-content textarea",
          "footer a",
          "footer button",
          "footer p",
        ];

        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(textSelectors.join(",")),
        );
        const originalSizes = elements.map((element) =>
          Number.parseFloat(getComputedStyle(element).fontSize),
        );

        for (const [index, element] of elements.entries()) {
          element.style.fontSize = `${originalSizes[index] * 2}px`;
        }
      });
      const issues = await layoutIssues(page);
      expect(issues.documentWidth, `${route} overflows after text resizing`).toBeLessThanOrEqual(
        issues.viewportWidth + 1,
      );
      expect(issues.clipped, `${route} clips content after text resizing`).toEqual([]);
    });
  }
});

test("@exhaustive RESP-ORIENTATION portrait-landscape resizing leaves no stuck menu or overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const details = page.locator("details").filter({
    has: page.locator('summary[aria-label="Open or close navigation menu"]'),
  });
  const summary = details.locator("summary");
  await summary.click();
  await expect(details).toHaveAttribute("open", "");

  await page.setViewportSize({ width: 844, height: 390 });
  let issues = await layoutIssues(page);
  expect(issues.documentWidth).toBeLessThanOrEqual(issues.viewportWidth + 1);

  await page.keyboard.press("Escape");
  await expect(details).not.toHaveAttribute("open", "");
  expect(await page.locator("body").evaluate((body) => body.style.overflow)).toBe("");

  await page.setViewportSize({ width: 390, height: 844 });
  issues = await layoutIssues(page);
  expect(issues.documentWidth).toBeLessThanOrEqual(issues.viewportWidth + 1);
});

test("@exhaustive MOBILE-NAV every menu destination closes the menu and opens correctly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  const hrefs = await menu.locator('a[href^="/"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href") || "").filter(Boolean),
  );

  for (const href of hrefs) {
    await test.step(href, async () => {
      await page.goto("/");
      const details = page.locator("details").filter({
        has: page.locator('summary[aria-label="Open or close navigation menu"]'),
      });
      await details.locator("summary").click();
      await menu.locator(`a[href="${href}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?$`));
      await expect(details).not.toHaveAttribute("open", "");
    });
  }
});

test("@exhaustive MOBILE-NAV semantics and outside-tap closure remain synchronized", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const details = page.locator("details").filter({
    has: page.locator('summary[aria-label="Open or close navigation menu"]'),
  });
  const summary = details.locator("summary");

  await expect(summary).toHaveAccessibleName(/navigation menu/i);
  await expect(summary).toHaveAttribute("aria-controls", "mobile-navigation-menu");
  await summary.click();
  await expect(details).toHaveAttribute("open", "");
  expect(await page.locator("body").evaluate((body) => body.style.overflow)).toBe("hidden");

  await page.locator("main#main-content").evaluate((element) => {
    element.dispatchEvent(new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    }));
  });
  await expect(details).not.toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
  expect(await page.locator("body").evaluate((body) => body.style.overflow)).toBe("");
});

test("@exhaustive MOBILE-TARGET important cards, CTAs, footer and legal controls meet 44x44px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ["/", "/contact", "/privacy-policy"]) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const undersized = await page.locator(
        "main#main-content a.kk-card:visible, main#main-content button.kk-card:visible, main#main-content .kk-button-dark:visible, main#main-content .kk-button-on-light:visible, main#main-content button:visible, footer a:visible, footer button:visible",
      ).evaluateAll((controls) =>
        controls.flatMap((control) => {
          const rect = control.getBoundingClientRect();
          if (rect.width >= 44 && rect.height >= 44) return [];
          return [{
            name: control.getAttribute("aria-label") || control.textContent?.replace(/\s+/g, " ").trim(),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          }];
        }),
      );
      expect(undersized, `${route} contains undersized important tap targets`).toEqual([]);
    });
  }
});

test("@exhaustive MOBILE-CARDS homepage card grids use one-column DOM order at 390px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const cards = await page.locator("main#main-content .kk-card:visible").evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 60),
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
      };
    }),
  );

  expect(cards.length).toBeGreaterThan(10);
  for (let index = 1; index < cards.length; index += 1) {
    expect(cards[index].top, `${cards[index].text} appears before the previous DOM card`).toBeGreaterThanOrEqual(
      cards[index - 1].top,
    );
    expect(cards[index].left).toBeGreaterThanOrEqual(-1);
    expect(cards[index].right).toBeLessThanOrEqual(391);
  }
});
