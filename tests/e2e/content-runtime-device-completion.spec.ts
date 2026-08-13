import { expect, test, type Locator, type Page } from "@playwright/test";
import {
  completionLayoutIssues,
} from "./helpers/completion";
import { preparePage, publicRoutes } from "./helpers/site";

async function advanceFocus(
  page: Page,
  locator: Locator,
  browserName: string,
) {
  if (browserName === "webkit") {
    // Playwright's Windows WebKit build does not expose Safari's system-level
    // full-keyboard-access preference. Enter keyboard modality, then verify
    // that the requested control accepts focus directly.
    await page.keyboard.press("Tab");
    await locator.focus();
    return;
  }

  await page.keyboard.press("Tab");
}

async function tabTo(
  page: Page,
  locator: Locator,
  browserName: string,
  limit = 120,
) {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  for (let index = 0; index < limit; index += 1) {
    await advanceFocus(page, locator, browserName);
    if (await locator.evaluate((element) => element === document.activeElement)) {
      return;
    }
  }
  throw new Error("Keyboard focus did not reach the requested desktop control");
}

function hasVisibleFocus(style: {
  outlineStyle: string;
  outlineWidth: string;
  boxShadow: string;
}) {
  return (
    (style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) > 0) ||
    style.boxShadow !== "none"
  );
}

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("@completion CONTACT-EXACT approved email, phone and WhatsApp targets stay consistent across surfaces", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });

  for (const route of ["/", "/contact"]) {
    await test.step(route, async () => {
      await page.goto(route);
      const mailTargets = await page.locator('a[href^="mailto:"]').evaluateAll((links) => [
        ...new Set(
          links.map((link) =>
            (link.getAttribute("href") || "")
              .slice("mailto:".length)
              .split("?")[0]
              .toLowerCase(),
          ),
        ),
      ]);
      const whatsAppTargets = await page.locator('a[href*="wa.me/"]').evaluateAll((links) => [
        ...new Set(links.map((link) => link.getAttribute("href"))),
      ]);
      const telephoneTargets = await page.locator('a[href^="tel:"]').evaluateAll((links) => [
        ...new Set(links.map((link) => link.getAttribute("href"))),
      ]);

      expect(mailTargets).toEqual(["hey@kulturekatta.com"]);
      expect(whatsAppTargets).toEqual(["https://wa.me/919730244996"]);
      expect(
        telephoneTargets.every((target) => target === "tel:+919730244996"),
        `${route} contains an inconsistent tel: target`,
      ).toBe(true);
      await expect(page.getByText(/\+91[- ]?97302[- ]?44996/).first()).toBeAttached();
      await expect(page.getByText("hey@kulturekatta.com").first()).toBeAttached();
    });
  }
});

test("@completion CONTENT-LEGACY public pages expose no obsolete routes, placeholder copy or placeholder dates", async ({
  page,
}) => {
  test.setTimeout(180_000);
  const forbiddenCopy = /\b(?:lorem ipsum|todo|tbd|replace me|dummy text|sample copy|placeholder date)\b|\[(?:insert )?(?:date|year|title|text)\]|(?:dd\/mm\/yyyy|mm\/dd\/yyyy|yyyy-mm-dd|00\/00\/0000)/i;
  const obsoleteHref = /^\/(?:for-teams|for-organisations|explore-talks|explore-walks|explore-games|explore-stage-and-screen)(?:[/?#]|$)/i;

  for (const route of publicRoutes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const mainText = (await page.locator("main#main-content").innerText()).replace(/\s+/g, " ");
      expect(mainText, `${route} contains placeholder copy or a placeholder date`).not.toMatch(
        forbiddenCopy,
      );

      const invalidLinks = await page.locator("a[href]").evaluateAll(
        (links, obsoleteSource) => {
          const obsolete = new RegExp(obsoleteSource, "i");
          return links.flatMap((link) => {
            const href = (link.getAttribute("href") || "").trim();
            if (
              !href ||
              href.startsWith("#") ||
              href.startsWith("mailto:") ||
              href.startsWith("tel:")
            ) {
              return [];
            }
            if (
              /localhost|127\.0\.0\.1/i.test(href) ||
              /^javascript:/i.test(href) ||
              obsolete.test(href)
            ) {
              return [href];
            }
            return [];
          });
        },
        obsoleteHref.source,
      );
      expect(invalidLinks, `${route} exposes obsolete or local-only links`).toEqual([]);
    });
  }
});

test("@completion RUNTIME-DATA public routes have no failed internal fetch/XHR requests or duplicate API calls", async ({
  page,
}) => {
  test.setTimeout(180_000);
  let failures: string[] = [];
  let apiCounts = new Map<string, number>();

  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.pathname.startsWith("/api/")) {
      apiCounts.set(url.pathname, (apiCounts.get(url.pathname) || 0) + 1);
    }
  });
  page.on("requestfailed", (request) => {
    if (!["fetch", "xhr"].includes(request.resourceType())) return;
    const url = new URL(request.url());
    const pageUrl = page.url() ? new URL(page.url()) : null;
    if (!pageUrl || url.origin !== pageUrl.origin) return;
    const failure = request.failure()?.errorText || "unknown failure";
    const isNavigationCancellation =
      url.searchParams.has("_rsc") &&
      ["NS_BINDING_ABORTED", "net::ERR_ABORTED", "Load request cancelled"].includes(
        failure,
      );
    if (!isNavigationCancellation) {
      failures.push(`${request.resourceType()}: ${url.pathname}${url.search} — ${failure}`);
    }
  });
  page.on("response", (response) => {
    const request = response.request();
    if (!["fetch", "xhr"].includes(request.resourceType())) return;
    const url = new URL(response.url());
    const pageUrl = page.url() ? new URL(page.url()) : null;
    if (pageUrl && url.origin === pageUrl.origin && response.status() >= 400) {
      failures.push(`${request.resourceType()}: ${response.status()} ${url.pathname}${url.search}`);
    }
  });

  for (const route of publicRoutes) {
    await test.step(route, async () => {
      failures = [];
      apiCounts = new Map();
      await page.goto(route, { waitUntil: "load" });
      await page.waitForTimeout(200);

      const repeatedApiCalls = [...apiCounts.entries()].filter(([, count]) => count > 1);
      expect(failures, `Internal fetch/XHR failures on ${route}`).toEqual([]);
      expect(repeatedApiCalls, `Repeated API calls on ${route}`).toEqual([]);
    });
  }
});

test("@completion DESKTOP-GRIDS laptop, desktop and wide-desktop layouts retain multi-column structure without overflow", async ({
  page,
}) => {
  for (const width of [1024, 1366, 1920]) {
    await test.step(`${width}px`, async () => {
      await page.setViewportSize({ width, height: width === 1024 ? 768 : 900 });
      for (const route of ["/", "/experiences", "/contact"]) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        const issues = await completionLayoutIssues(page);
        expect(issues.documentWidth, `${route} overflows at ${width}px`).toBeLessThanOrEqual(
          issues.viewportWidth + 1,
        );
        expect(issues.clipped, `${route} clips content at ${width}px`).toEqual([]);
      }

      await page.goto("/");
      const cardColumns = await page.locator("main#main-content .kk-card:visible").evaluateAll(
        (cards) => [
          ...new Set(cards.map((card) => Math.round(card.getBoundingClientRect().left))),
        ],
      );
      expect(cardColumns.length, `Homepage cards did not form columns at ${width}px`).toBeGreaterThan(1);
    });
  }
});

test("@completion DESKTOP-HEADER-FOOTER columns, hover states and keyboard focus remain usable at 1366px", async ({
  browserName,
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");

  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("search").first()).toBeVisible();

  const footerHeadings = page.locator("footer h2:visible");
  await expect(footerHeadings).toHaveCount(5);
  const headingPositions = await footerHeadings.evaluateAll((headings) =>
    headings.map((heading) => {
      const rect = heading.getBoundingClientRect();
      return { left: Math.round(rect.left), top: Math.round(rect.top) };
    }),
  );
  expect(new Set(headingPositions.map((heading) => heading.left)).size).toBe(5);
  expect(Math.max(...headingPositions.map((heading) => heading.top)) - Math.min(...headingPositions.map((heading) => heading.top))).toBeLessThanOrEqual(2);

  const about = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About", exact: true });
  const beforeHover = await about.evaluate((element) => getComputedStyle(element).color);
  await about.hover();
  await page.waitForTimeout(220);
  const afterHover = await about.evaluate((element) => getComputedStyle(element).color);
  expect(afterHover).not.toBe(beforeHover);

  await tabTo(page, about, browserName);
  const navFocusStyle = await about.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      boxShadow: style.boxShadow,
    };
  });
  expect(hasVisibleFocus(navFocusStyle), "Desktop About link has no visible keyboard focus").toBe(true);

  const footerPrivacy = page.locator("footer").getByRole("link", { name: "Privacy Policy", exact: true }).first();
  await tabTo(page, footerPrivacy, browserName);
  const footerFocusStyle = await footerPrivacy.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      boxShadow: style.boxShadow,
    };
  });
  expect(hasVisibleFocus(footerFocusStyle), "Footer Privacy link has no visible keyboard focus").toBe(true);
});

test("@completion DESKTOP-FIXED fixed controls retain separate placement and do not cover page actions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });

  for (const route of ["/", "/contact", "/privacy-policy"]) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));
      await page.waitForTimeout(150);

      const overlaps = await page.evaluate(() => {
        const visible = (element: HTMLElement) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            style.pointerEvents !== "none" &&
            rect.width > 0 &&
            rect.height > 0 &&
            rect.right > 0 &&
            rect.left < window.innerWidth &&
            rect.bottom > 0 &&
            rect.top < window.innerHeight
          );
        };
        const fixed = Array.from(
          document.querySelectorAll<HTMLElement>("a, button, [role='button']"),
        ).filter(
          (element) => visible(element) && getComputedStyle(element).position === "fixed",
        );
        const actions = Array.from(
          document.querySelectorAll<HTMLElement>(
            "main#main-content a, main#main-content button",
          ),
        ).filter(visible);
        const pairs: Array<{ first: string; second: string; area: number }> = [];
        const compare = (first: HTMLElement, second: HTMLElement) => {
          if (first === second || first.contains(second) || second.contains(first)) return;
          const a = first.getBoundingClientRect();
          const b = second.getBoundingClientRect();
          const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
          const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
          if (width * height > 16) {
            pairs.push({
              first: first.getAttribute("aria-label") || first.textContent?.trim().slice(0, 50) || first.tagName,
              second: second.getAttribute("aria-label") || second.textContent?.trim().slice(0, 50) || second.tagName,
              area: Math.round(width * height),
            });
          }
        };
        fixed.forEach((first, index) => {
          fixed.slice(index + 1).forEach((second) => compare(first, second));
          actions.forEach((action) => compare(first, action));
        });
        return pairs;
      });

      expect(overlaps, `${route} has overlapping desktop fixed controls`).toEqual([]);
    });
  }
});
