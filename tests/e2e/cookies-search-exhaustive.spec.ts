import { expect, test } from "@playwright/test";
import { COOKIE_CONSENT_KEY } from "./helpers/site";

async function startWithCookieChoice(
  page: import("@playwright/test").Page,
  choice: "accepted" | "rejected" | null,
) {
  await page.addInitScript(
    ({ key, value }) => {
      const initializationMarker = `${key}-test-initialized`;

      if (window.sessionStorage.getItem(initializationMarker)) {
        return;
      }

      if (value) {
        window.localStorage.setItem(key, value);
      } else {
        window.localStorage.removeItem(key);
      }

      window.sessionStorage.setItem(initializationMarker, "true");
    },
    { key: COOKIE_CONSENT_KEY, value: choice },
  );
}

async function startWithoutCookieChoice(page: import("@playwright/test").Page) {
  await startWithCookieChoice(page, null);
}

test("@exhaustive COOKIE-01 a first-time visitor sees both cookie choices and legal links", async ({
  page,
}) => {
  await startWithoutCookieChoice(page);
  await page.goto("/");

  const banner = page.getByRole("region", { name: "A tiny cookie note 🍪" });
  await expect(banner).toBeVisible();
  await expect(
    banner.getByRole("button", { name: "Decline optional cookies" }),
  ).toBeVisible();
  await expect(
    banner.getByRole("button", { name: "Accept optional cookies" }),
  ).toBeVisible();
  await expect(banner.getByRole("link", { name: "Cookie Policy" })).toHaveAttribute(
    "href",
    "/cookie-policy",
  );
  await expect(banner.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
    "href",
    "/privacy-policy",
  );
});

test("@exhaustive COOKIE-02 declining optional cookies survives reload", async ({
  page,
}) => {
  await startWithoutCookieChoice(page);
  await page.goto("/");
  await page
    .getByRole("button", { name: "Decline optional cookies" })
    .click();

  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), COOKIE_CONSENT_KEY))
    .toBe("rejected");
  await expect(page.getByRole("region", { name: "A tiny cookie note 🍪" })).toBeHidden();

  await page.reload();
  await expect(page.getByRole("region", { name: "A tiny cookie note 🍪" })).toBeHidden();
});

test("@exhaustive COOKIE-03 accepting cookies persists and Cookie Settings restores focus", async ({
  page,
}) => {
  await startWithoutCookieChoice(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Accept optional cookies" }).click();

  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), COOKIE_CONSENT_KEY))
    .toBe("accepted");

  const settings = page.getByRole("button", { name: "Cookie Settings" }).first();
  await settings.scrollIntoViewIfNeeded();
  await settings.focus();
  await settings.press("Enter");

  const banner = page.getByRole("region", { name: "A tiny cookie note 🍪" });
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("button", { name: "Close cookie settings" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(banner).toBeHidden();
  await expect(settings).toBeFocused();
});

test("@exhaustive COOKIE-04 an accepted choice can be changed to rejected", async ({
  page,
}) => {
  await startWithCookieChoice(page, "accepted");
  await page.goto("/");

  const settings = page.getByRole("button", { name: "Cookie Settings" }).first();
  await settings.click();
  await page
    .getByRole("button", { name: "Decline optional cookies" })
    .click();

  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), COOKIE_CONSENT_KEY))
    .toBe("rejected");
  await expect(page.getByRole("region", { name: "A tiny cookie note 🍪" })).toBeHidden();
});

test("@exhaustive COOKIE-05 cookie controls fit at 320px and meet the 44px target", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await startWithoutCookieChoice(page);
  await page.goto("/");

  const banner = page.getByRole("region", { name: "A tiny cookie note 🍪" });
  await expect(banner).toBeVisible();

  const result = await banner.evaluate((element) => {
    const viewportWidth = document.documentElement.clientWidth;
    const buttons = Array.from(element.querySelectorAll<HTMLButtonElement>("button"));
    return {
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth,
      buttons: buttons.map((button) => {
        const rect = button.getBoundingClientRect();
        return {
          name: button.textContent?.replace(/\s+/g, " ").trim(),
          width: rect.width,
          height: rect.height,
          left: rect.left,
          right: rect.right,
        };
      }),
    };
  });

  expect(result.documentWidth).toBeLessThanOrEqual(result.viewportWidth + 1);
  for (const button of result.buttons) {
    expect(button.height, `${button.name} is shorter than 44px`).toBeGreaterThanOrEqual(44);
    expect(button.left, `${button.name} starts outside the viewport`).toBeGreaterThanOrEqual(-1);
    expect(button.right, `${button.name} ends outside the viewport`).toBeLessThanOrEqual(
      result.viewportWidth + 1,
    );
  }
});

test("@exhaustive COOKIE-06 cookie choices do not collide with other fixed controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await startWithoutCookieChoice(page);
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  const banner = page.getByRole("region", { name: "A tiny cookie note 🍪" });
  await expect(banner).toBeVisible();
  const collisions = await page.evaluate(() => {
    const region = document.querySelector<HTMLElement>('[aria-labelledby="cookie-banner-title"]');
    if (!region) return [];
    const a = region.getBoundingClientRect();
    return Array.from(
      document.querySelectorAll<HTMLElement>(
        "button, a, [role='button'], [tabindex]:not([tabindex='-1'])",
      ),
    ).flatMap((element) => {
      if (region.contains(element) || element.contains(region)) return [];
      const style = getComputedStyle(element);
      const b = element.getBoundingClientRect();
      if (
        style.position !== "fixed" ||
        style.display === "none" ||
        style.visibility === "hidden" ||
        style.pointerEvents === "none" ||
        b.width <= 0 ||
        b.height <= 0
      ) return [];
      const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      return width * height > 16
        ? [{
            control: element.getAttribute("aria-label") || element.textContent?.replace(/\s+/g, " ").trim().slice(0, 70),
            overlapArea: Math.round(width * height),
          }]
        : [];
    });
  });
  expect(collisions, "Cookie banner overlaps another visible fixed control").toEqual([]);
});

test("@exhaustive SEARCH-01 utility search is keyboard operable and opens a Kokedama result", async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), COOKIE_CONSENT_KEY);
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  const search = page.getByRole("search");
  const field = search.getByRole("searchbox", { name: "Search KultureKatta" });
  await field.focus();
  await expect(field).toBeFocused();
  await field.fill("Kokedama");
  await field.press("Enter");

  await expect(page).toHaveURL(/\/search\?q=Kokedama$/);
  const result = page.getByRole("link", { name: /Hands-On Workshops/i });
  await expect(result).toBeVisible();
  await expect(result).toHaveAttribute("href", "/experiences/workshops");
});

test("@exhaustive SEARCH-02 wellness search returns at least one relevant destination", async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), COOKIE_CONSENT_KEY);
  await page.goto("/search?q=wellness");

  const resultLinks = page.locator('main#main-content a[href^="/"]');
  await expect(resultLinks.first()).toBeVisible();
  await expect(page.getByText(/Showing \d+ results? for/i)).toBeVisible();
});

test("@exhaustive SEARCH-03 empty and no-result searches have useful states", async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), COOKIE_CONSENT_KEY);
  await page.goto("/search");
  await expect(page.getByRole("heading", { name: "Start with a word." })).toBeVisible();

  await page.goto("/search?q=%3Cscript%3E%26%25%3C%2Fscript%3E");
  await expect(page.getByRole("heading", { name: "No results found." })).toBeVisible();
  await expect(
    page
      .locator("main#main-content")
      .getByRole("link", { name: "Explore experiences", exact: true }),
  ).toHaveAttribute("href", "/experiences");
});

test("@exhaustive SEARCH-04 a second search replaces the first query cleanly", async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), COOKIE_CONSENT_KEY);
  await page.goto("/search?q=music");
  const searchForm = page.locator('main#main-content form[role="search"]');
  const searchbox = searchForm.getByRole("searchbox");
  await searchbox.fill("walks");
  await searchForm.getByRole("button", { name: "Search" }).click();

  await expect(page).toHaveURL(/\/search\?q=walks$/);
  await expect(searchbox).toHaveValue("walks");
  await expect(page.getByRole("link", { name: /Walks & Trails/i })).toBeVisible();
});
