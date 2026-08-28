import { expect, test, type Locator, type Page } from "@playwright/test";
import {
  completionSubmitButton,
  expectCompletionSuccess,
  mainCompletionFormCases,
  openCompletionForm,
  prepareValidCompletionForm,
} from "./helpers/completion";
import {
  normalizeInternalPath,
  preparePage,
  publicRoutes,
  redirectCases,
  sitemapRoutes,
} from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

async function expectInsideViewport(page: Page, target: Locator, label: string) {
  await target.scrollIntoViewIfNeeded();
  const box = await target.boundingBox();
  const viewport = page.viewportSize();

  expect(box, `${label} has no visible bounding box`).not.toBeNull();
  expect(viewport, `${label} has no viewport`).not.toBeNull();
  expect(box?.x ?? -1, `${label} extends beyond the left edge`).toBeGreaterThanOrEqual(-1);
  expect(box?.y ?? -1, `${label} extends above the viewport`).toBeGreaterThanOrEqual(-1);
  expect(
    (box?.x ?? 0) + (box?.width ?? 0),
    `${label} extends beyond the right edge`,
  ).toBeLessThanOrEqual((viewport?.width ?? 0) + 1);
  expect(
    (box?.y ?? 0) + (box?.height ?? 0),
    `${label} extends below the viewport`,
  ).toBeLessThanOrEqual((viewport?.height ?? 0) + 1);
}

test("@completion NAV-DEEP-CRAWL every internal link exposed by every public page resolves", async ({
  page,
  request,
  baseURL,
}) => {
  test.setTimeout(300_000);
  expect(baseURL).toBeTruthy();
  const targets = new Set<string>();

  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href") || ""),
    );

    for (const href of hrefs) {
      const target = normalizeInternalPath(href, baseURL as string);
      if (target) targets.add(target);
    }
  }

  expect(targets.size).toBeGreaterThan(publicRoutes.length / 2);
  for (const target of [...targets].sort()) {
    const response = await request.get(target, { maxRedirects: 10 });
    expect(response.status(), `Broken internal destination: ${target}`).toBeLessThan(400);
  }
});

test("@completion NAV-MOBILE-ACTIVE every mobile primary route exposes its current-page state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const routes = [
    "/",
    "/for-organizations",
    "/private-experiences",
    "/about",
    "/katta-studio",
    "/experiences",
  ];

  for (const route of routes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.locator('summary[aria-label="Open or close navigation menu"]').click();
    await expect(
      page
        .getByRole("navigation", { name: "Mobile navigation" })
        .locator(`a[href="${route}"]`),
      `Mobile navigation does not identify ${route} as current`,
    ).toHaveAttribute("aria-current", "page");
    await page.keyboard.press("Escape");
  }
});

test("@completion NAV-REDIRECT-ONCE every legacy route redirects directly to its approved destination", async ({
  request,
  baseURL,
}) => {
  expect(baseURL).toBeTruthy();

  for (const [source, destination] of redirectCases) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), `${source} is not a redirect`).toBeGreaterThanOrEqual(300);
    expect(response.status(), `${source} returned an error redirect status`).toBeLessThan(400);

    const location = response.headers().location;
    expect(location, `${source} has no Location header`).toBeTruthy();
    const resolved = new URL(location || "", baseURL as string);
    expect(resolved.pathname, `${source} adds an unexpected redirect hop`).toBe(destination);

    const destinationResponse = await request.get(destination, { maxRedirects: 0 });
    expect(
      destinationResponse.status(),
      `${destination} unexpectedly redirects again`,
    ).toBeLessThan(300);
  }
});

test("@completion NAV-ANCHORS every in-page link reveals an existing target below any fixed header", async ({
  page,
}) => {
  test.setTimeout(300_000);
  let checked = 0;

  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const anchors = await page
      .locator('main#main-content a[href*="#"]')
      .evaluateAll((links) =>
        links.flatMap((link, index) => {
          const style = getComputedStyle(link);
          const rect = link.getBoundingClientRect();
          if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            rect.width <= 0 ||
            rect.height <= 0
          ) {
            return [];
          }
          const href = (link as HTMLAnchorElement).getAttribute("href") || "";
          const target = new URL(href, window.location.href);
          return target.hash && target.origin === window.location.origin
            ? [{ index, href, hash: target.hash }]
            : [];
        }),
      );

    for (const anchor of anchors) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
      const link = page.locator('main#main-content a[href*="#"]').nth(anchor.index);
      await link.evaluate((element: HTMLAnchorElement) => element.click());
      await expect.poll(() => new URL(page.url()).hash).toBe(anchor.hash);

      await expect
        .poll(
          () =>
            page.evaluate((hash) => {
              const id = decodeURIComponent(hash.slice(1));
              const target = document.getElementById(id);
              if (!target) return { exists: false, visible: false, covered: false };

              const rect = target.getBoundingClientRect();
              const header = document.querySelector<HTMLElement>("header");
              const headerStyle = header ? getComputedStyle(header) : null;
              const headerBottom =
                header && headerStyle && ["fixed", "sticky"].includes(headerStyle.position)
                  ? header.getBoundingClientRect().bottom
                  : 0;

              return {
                exists: true,
                visible: rect.bottom > 0 && rect.top < window.innerHeight,
                covered: rect.top < headerBottom - 1 && rect.bottom <= headerBottom,
              };
            }, anchor.hash),
          {
            message: `${route}${anchor.hash} did not settle into a visible, unobscured position`,
            timeout: 10_000,
          },
        )
        .toEqual({ exists: true, visible: true, covered: false });
      checked += 1;
    }
  }

  expect(checked, "No in-page anchors were exercised").toBeGreaterThan(5);
});

test("@completion NAV-HISTORY Back and Forward restore the page and active navigation state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");
  const primary = page.getByRole("navigation", { name: "Primary navigation" });

await Promise.all([
  page.waitForURL(/\/about\/?$/, { timeout: 30_000 }),
  primary.getByRole("link", { name: "About", exact: true }).click(),
]);

await Promise.all([
  page.waitForURL(/\/katta-studio\/?$/, { timeout: 30_000 }),
  page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Katta Studio", exact: true })
    .click(),
]);

  await page.goBack();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "About", exact: true }),
  ).toHaveAttribute("aria-current", "page");

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/about\/?$/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('summary[aria-label="Open or close navigation menu"]').click();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "About", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("@completion MOBILE-MENU-SHORT the menu scrolls on short screens and its toggle restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 812, height: 375 });
  await page.goto("/");
  const details = page.locator("details").filter({
    has: page.locator('summary[aria-label="Open or close navigation menu"]'),
  });
  const summary = details.locator("summary");
  const menu = page.locator("#mobile-navigation-menu");
  const initialScrollY = await page.evaluate(() => window.scrollY);

  await summary.click();
  await expect(details).toHaveAttribute("open", "");
  expect(await page.locator("body").evaluate((body) => body.style.overflow)).toBe("hidden");

  const dimensions = await menu.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
    overflowY: getComputedStyle(element).overflowY,
  }));
  expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.clientHeight);
  expect(dimensions.overflowY).toMatch(/auto|scroll/);

  await menu.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  expect(await menu.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Explore Experiences" }),
  ).toBeVisible();
  expect(await page.evaluate(() => window.scrollY)).toBe(initialScrollY);

  await summary.click();
  await expect(details).not.toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
  expect(await page.locator("body").evaluate((body) => body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("@completion FORM-MOBILE-BOUNDARIES every enabled mobile form submits and keeps validation/results in view at 320px and 430px", async ({
  page,
}) => {
  test.setTimeout(300_000);

  for (const width of [320, 430]) {
    await page.setViewportSize({ width, height: width === 320 ? 568 : 932 });

    for (const formCase of mainCompletionFormCases) {
      await test.step(`${width}px ${formCase.name}`, async () => {
        let requests = 0;
        await page.route(`**${formCase.endpoint}`, async (route) => {
          requests += 1;
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ success: true, message: "Mock boundary success." }),
          });
        });

        const form = await openCompletionForm(page, formCase);
        const firstInvalid = form
          .locator("input:invalid:visible, select:invalid:visible, textarea:invalid:visible")
          .first();
        await completionSubmitButton(form).click();
        await expect(firstInvalid).toBeFocused();
        await expectInsideViewport(page, firstInvalid, `${width}px ${formCase.name} validation`);
        expect(requests).toBe(0);

        await prepareValidCompletionForm(form);
        await completionSubmitButton(form).click();
        await expectCompletionSuccess(page);
        const success = page.getByText(/confirmation email is on its way/i).first();
        await expectInsideViewport(page, success, `${width}px ${formCase.name} success`);
        expect(requests).toBe(1);
      });
    }
  }
});

test("@completion SEO-008 SEO-NOINDEX sitemap exactly matches indexable routes and excludes utility pages", async ({
  page,
  request,
}) => {
  for (const route of [
    "/search?q=culture",
    "/this-route-should-not-exist-kuka-noindex-check",
  ]) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    if (route.includes("should-not-exist")) expect(response?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
  }

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  expect(sitemap).not.toContain("/search");
  expect(sitemap).not.toContain("should-not-exist-kuka-noindex-check");

  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(new Set(locations).size).toBe(locations.length);
  const parsedLocations = locations.map((location) => new URL(location));
  expect([...new Set(parsedLocations.map((location) => location.origin))]).toEqual([
    "https://kulturekatta.com",
  ]);
  expect(parsedLocations.map((location) => location.pathname).sort()).toEqual(
    [...new Set(sitemapRoutes)].sort(),
  );
});
