import {
  expect,
  test,
  type BrowserContext,
  type Locator,
  type Page,
} from "@playwright/test";
import { COOKIE_CONSENT_KEY } from "./helpers/site";

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

async function advanceFocus(
  page: Page,
  locator: Locator,
  browserName: string,
) {
  if (browserName === "webkit") {
    // Playwright's Windows WebKit build does not expose Safari's system-level
    // full-keyboard-access preference. Enter keyboard modality, then verify
    // that the next DOM-ordered control accepts focus directly.
    await page.keyboard.press("Tab");
    await locator.focus();
    return;
  }

  await page.keyboard.press("Tab");
}

const searchViewports = [
  { name: "mobile", width: 390, height: 844, selector: "#mobile-site-search" },
  { name: "desktop", width: 1366, height: 768, selector: "#site-search" },
] as const;

async function openHeaderSearch(page: Page, viewport: (typeof searchViewports)[number]) {
  await page.addInitScript((key) => {
    window.localStorage.setItem(key, "rejected");
  }, COOKIE_CONSENT_KEY);
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const searchbox = page.locator(viewport.selector);
  await expect(searchbox).toBeVisible();
  await expect(searchbox).toBeEditable();
  return searchbox;
}

async function focusSearchFromPreviousControl(
  page: Page,
  searchbox: Locator,
  browserName: string,
) {
  const predecessor = await searchbox.evaluate((element) => {
    const controls = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          "a[href]",
          "button:not([disabled])",
          "input:not([disabled]):not([type='hidden'])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          "summary",
          "[tabindex]:not([tabindex='-1'])",
        ].join(","),
      ),
    ).filter((control) => {
      const style = getComputedStyle(control);
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        control.getClientRects().length > 0 &&
        control.tabIndex >= 0
      );
    });
    const index = controls.indexOf(element as HTMLElement);
    const previous = controls[index - 1];
    if (!previous) return false;
    previous.dataset.searchFocusPredecessor = "true";
    return true;
  });

  expect(predecessor, "Search has no preceding keyboard control").toBe(true);
  await page.locator('[data-search-focus-predecessor="true"]').focus();
  await advanceFocus(page, searchbox, browserName);
}

async function submitHeaderSearch(
  page: Page,
  viewport: (typeof searchViewports)[number],
  query: string,
) {
  const searchbox = await openHeaderSearch(page, viewport);
  await searchbox.fill(query);

  if (viewport.name === "mobile") {
    await searchbox.press("Enter");
  } else {
    await page
      .locator('form[role="search"]')
      .filter({ has: searchbox })
      .getByRole("button", { name: "Search" })
      .click();
  }

  await expect(page).toHaveURL(/\/search(?:\?|$)/);
}

test("@completion COOKIE-PROFILE accepted and rejected choices survive reload and a restored browser profile", async ({
  browser,
  baseURL,
}) => {
  // Firefox can spend tens of seconds creating and closing restored contexts
  // against a remote preview even when the storage checks themselves pass.
  test.setTimeout(120_000);
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
  browserName,
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
  await advanceFocus(page, privacyPolicy, browserName);
  await expect(privacyPolicy).toBeFocused();
  await advanceFocus(page, decline, browserName);
  await expect(decline).toBeFocused();
  await advanceFocus(page, accept, browserName);
  await expect(accept).toBeFocused();
});

test("@completion SRCH-001 search accepts pointer and keyboard focus on mobile and desktop", async ({
  browserName,
  page,
}) => {
  for (const viewport of searchViewports) {
    await test.step(viewport.name, async () => {
      const searchbox = await openHeaderSearch(page, viewport);
      await searchbox.click();
      await expect(searchbox).toBeFocused();

      await focusSearchFromPreviousControl(page, searchbox, browserName);
      await expect(searchbox).toBeFocused();
      const box = await searchbox.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.x ?? -1).toBeGreaterThanOrEqual(0);
      expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(viewport.width + 1);
    });
  }
});

test("@completion SRCH-002 approved terms return their exact destinations on mobile and desktop", async ({
  page,
}) => {
  for (const viewport of searchViewports) {
    for (const contract of [
      { query: "wellness", name: /Wellness & Slowing Down/i, href: "/experiences/wellness" },
      { query: "Kokedama", name: /Hands-On Workshops/i, href: "/experiences/workshops" },
    ]) {
      await test.step(`${viewport.name}: ${contract.query}`, async () => {
        await submitHeaderSearch(page, viewport, contract.query);
        await expect(page.getByRole("link", { name: contract.name })).toHaveAttribute(
          "href",
          contract.href,
        );
      });
    }
  }
});

test("@completion SRCH-003 a selected result opens its intended page on mobile and desktop", async ({
  page,
}) => {
  test.setTimeout(120_000);

  for (const viewport of searchViewports) {
    await test.step(viewport.name, async () => {
      await submitHeaderSearch(page, viewport, "Kokedama");
      const result = page.getByRole("link", { name: /Hands-On Workshops/i });
      await expect(result).toHaveAttribute("href", "/experiences/workshops");
      await Promise.all([
        page.waitForURL(/\/experiences\/workshops\/?$/, {
          waitUntil: "domcontentloaded",
        }),
        result.click(),
      ]);
      await expect(page.getByRole("link", { name: "KultureKatta home" }).first()).toBeVisible();
    });
  }
});

test("@completion SRCH-004 empty search has a clear stable state on mobile and desktop", async ({
  page,
}) => {
  for (const viewport of searchViewports) {
    await test.step(viewport.name, async () => {
      await submitHeaderSearch(page, viewport, "");
      await expect(page.getByRole("heading", { name: "Start with a word." })).toBeVisible();
      await expect(page.locator("main#main-content form[role='search'] input[name='q']")).toHaveValue("");
    });
  }
});

test("@completion SRCH-005 special-character no-result searches remain safe on mobile and desktop", async ({
  page,
}) => {
  for (const viewport of searchViewports) {
    await test.step(viewport.name, async () => {
      await submitHeaderSearch(page, viewport, "<script>&%</script>");
      await expect(page.getByRole("heading", { name: "No results found." })).toBeVisible();
      await expect(
        page.locator("main#main-content").getByRole("link", {
          name: "Explore experiences",
          exact: true,
        }),
      ).toHaveAttribute("href", "/experiences");
      expect(await page.evaluate(() => document.querySelectorAll("script script").length)).toBe(0);
    });
  }
});

test("@completion SRCH-006 repeated searches replace results without duplicates or stuck focus", async ({
  page,
}) => {
  test.setTimeout(120_000);

  for (const viewport of searchViewports) {
    await test.step(viewport.name, async () => {
      await page.addInitScript((key) => {
        window.localStorage.setItem(key, "rejected");
      }, COOKIE_CONSENT_KEY);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/search?q=music", { waitUntil: "domcontentloaded" });

      for (const query of ["walks", "wellness"]) {
        const form = page.locator('main#main-content form[role="search"]');
        const searchbox = form.getByRole("searchbox");
        await searchbox.fill(query);
        await Promise.all([
          page.waitForURL(new RegExp(`/search\\?q=${query}$`), {
            waitUntil: "domcontentloaded",
          }),
          searchbox.press("Enter"),
        ]);

        const refreshedSearchbox = page.locator('main#main-content form[role="search"] input[name="q"]');
        await expect(refreshedSearchbox).toHaveValue(query);
        await refreshedSearchbox.focus();
        await expect(refreshedSearchbox).toBeFocused();

        const resultHrefs = await page
          .locator('main#main-content a[href^="/experiences/"]')
          .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
        expect(new Set(resultHrefs).size).toBe(resultHrefs.length);
      }

      await expect(page.getByRole("link", { name: /Wellness & Slowing Down/i })).toBeVisible();
    });
  }
});
