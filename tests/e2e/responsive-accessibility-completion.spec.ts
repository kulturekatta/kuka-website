import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";
import {
  completionLayoutIssues,
  mainCompletionFormCases,
  openCompletionForm,
} from "./helpers/completion";
import {
  COOKIE_CONSENT_KEY,
  preparePage,
  publicRoutes,
} from "./helpers/site";

function axeSummary(violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"]) {
  return violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    targets: violation.nodes.slice(0, 5).map((node) => node.target.join(" ")),
  }));
}

async function runAxe(page: Page, label: string) {
  const result = await new AxeBuilder({ page })
    .exclude('iframe[title="Netlify Drawer"]')
    .exclude("div[data-netlify-deploy-id][data-netlify-site-id]")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(axeSummary(result.violations), `${label} has automated WCAG violations`).toEqual(
    [],
  );
}

async function tabTo(page: Page, locator: Locator, limit = 140) {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  for (let index = 0; index < limit; index += 1) {
    await page.keyboard.press("Tab");
    if (await locator.evaluate((element) => element === document.activeElement)) {
      return;
    }
  }
  throw new Error("Keyboard focus did not reach the requested control");
}

async function expectVisibleFocus(locator: Locator, label: string) {
  const style = await locator.evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      outlineStyle: computed.outlineStyle,
      outlineWidth: Number.parseFloat(computed.outlineWidth),
      boxShadow: computed.boxShadow,
      borderColor: computed.borderColor,
    };
  });
  const visible =
    (style.outlineStyle !== "none" && style.outlineWidth > 0) ||
    style.boxShadow !== "none";
  expect(visible, `${label} has no visible keyboard focus indicator: ${JSON.stringify(style)}`).toBe(
    true,
  );
}

test("@completion RESP-VIEWPORT-MATRIX every public route fits all remaining required viewports", async ({
  page,
}) => {
  test.setTimeout(1_200_000);
  await preparePage(page);
  const remainingViewports = [
    { name: "standard phone", width: 375, height: 812 },
    { name: "Android phone", width: 412, height: 915 },
    { name: "large phone", width: 430, height: 932 },
    { name: "mobile landscape", width: 812, height: 375 },
    { name: "large mobile landscape", width: 932, height: 430 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "laptop", width: 1024, height: 768 },
    { name: "standard laptop", width: 1366, height: 768 },
    { name: "desktop", width: 1440, height: 900 },
    { name: "wide desktop", width: 1920, height: 1080 },
  ];

  for (const viewport of remainingViewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of publicRoutes) {
      await test.step(`${viewport.name} ${viewport.width}x${viewport.height} ${route}`, async () => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        const issues = await completionLayoutIssues(page);
        expect(
          issues.documentWidth,
          `${route} creates document overflow at ${viewport.width}x${viewport.height}`,
        ).toBeLessThanOrEqual(issues.viewportWidth + 1);
        expect(
          issues.bodyWidth,
          `${route} creates body overflow at ${viewport.width}x${viewport.height}`,
        ).toBeLessThanOrEqual(issues.viewportWidth + 1);
        expect(
          issues.clipped,
          `${route} clips visible content at ${viewport.width}x${viewport.height}`,
        ).toEqual([]);
      });
    }
  }
});

test("@completion MOBILE-NAV-ARIA hamburger exposes synchronized accessible expanded state", async ({
  page,
}) => {
  await preparePage(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const details = page.locator("details").filter({
    has: page.locator('summary[aria-label="Open or close navigation menu"]'),
  });
  const summary = details.locator("summary");

  await expect(summary).toHaveAccessibleName("Open or close navigation menu");
  await expect(summary).toHaveAttribute("aria-expanded", "false");
  await summary.click();
  await expect(details).toHaveAttribute("open", "");
  await expect(summary).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(summary).toHaveAttribute("aria-expanded", "false");
});

test("@completion MOBILE-FIXED-HIDDEN contact, social and Go to Top controls stay hidden through 430px", async ({
  page,
}) => {
  await preparePage(page);

  for (const width of [320, 375, 390, 412, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(
      page.getByRole("button", { name: "Open contact form" }),
      `Floating contact trigger is visible at ${width}px`,
    ).toBeHidden();
    await expect(
      page.getByRole("navigation", {
        name: "KultureKatta social and contact links",
      }),
      `Floating social controls are visible at ${width}px`,
    ).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Go to top" }),
      `Go to Top is visible at ${width}px`,
    ).toBeHidden();
  }
});

test("@completion MOBILE-TARGETS important header, card, form, footer and legal targets meet 44x44px", async ({
  page,
}) => {
  test.setTimeout(180_000);
  await preparePage(page);
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ["/", "/contact", "/privacy-policy", "/search?q=wellness"]) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const selector = [
        'header a[aria-label="KultureKatta home"]:visible',
        "header summary:visible",
        "main#main-content a.kk-card:visible",
        "main#main-content a.kk-rounded-button:visible",
        "main#main-content a.kk-button-dark:visible",
        "main#main-content a.kk-button-on-light:visible",
        "main#main-content button:visible",
        'main#main-content input:visible:not([type="checkbox"]):not([type="radio"]):not([name="formGuard"])',
        "main#main-content select:visible",
        "main#main-content textarea:visible",
        'main#main-content label:has(input[type="checkbox"]):visible',
        "footer a:visible",
        "footer button:visible",
      ].join(",");
      const undersized = await page.locator(selector).evaluateAll((controls) =>
        controls.flatMap((control) => {
          const rect = control.getBoundingClientRect();
          return rect.width >= 44 && rect.height >= 44
            ? []
            : [
                {
                  name:
                    control.getAttribute("aria-label") ||
                    control.textContent?.replace(/\s+/g, " ").trim().slice(0, 70),
                  width: Math.round(rect.width),
                  height: Math.round(rect.height),
                },
              ];
        }),
      );
      expect(undersized, `${route} has undersized important targets`).toEqual([]);
    });
  }

  await page.goto("/");
  const summary = page.locator('summary[aria-label="Open or close navigation menu"]');
  await summary.click();
  const undersizedMenuLinks = await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link")
    .evaluateAll((links) =>
      links.flatMap((link) => {
        const rect = link.getBoundingClientRect();
        return rect.width >= 44 && rect.height >= 44
          ? []
          : [{ name: link.textContent?.trim(), width: rect.width, height: rect.height }];
      }),
    );
  expect(undersizedMenuLinks).toEqual([]);
});

test("@completion MOBILE-OVERLAP adjacent actions and fixed controls do not cover consent, privacy or submit controls", async ({
  page,
}) => {
  test.setTimeout(180_000);
  await preparePage(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const adjacentOverlaps = await page
    .locator(
      'main#main-content a.kk-card:visible, main#main-content a.kk-rounded-button:visible, main#main-content button:visible, footer a:visible, footer button:visible',
    )
    .evaluateAll((controls) => {
      const elements = controls as HTMLElement[];
      const failures: Array<{ first: string; second: string; area: number }> = [];
      for (let firstIndex = 0; firstIndex < elements.length; firstIndex += 1) {
        for (let secondIndex = firstIndex + 1; secondIndex < elements.length; secondIndex += 1) {
          const first = elements[firstIndex];
          const second = elements[secondIndex];
          if (first.contains(second) || second.contains(first)) continue;
          const a = first.getBoundingClientRect();
          const b = second.getBoundingClientRect();
          const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
          const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
          if (width * height > 4) {
            failures.push({
              first: first.textContent?.replace(/\s+/g, " ").trim().slice(0, 50) || first.tagName,
              second: second.textContent?.replace(/\s+/g, " ").trim().slice(0, 50) || second.tagName,
              area: Math.round(width * height),
            });
          }
        }
      }
      return failures;
    });
  expect(adjacentOverlaps, "Mobile actions overlap one another").toEqual([]);

  for (const formCase of mainCompletionFormCases) {
    await test.step(formCase.name, async () => {
      const form = await openCompletionForm(page, formCase);
      const targets = [
        form.locator('label:has(input[name="consent"])').first(),
        form.getByRole("link", { name: "Privacy Policy" }).first(),
        form.locator('button[type="submit"]').last(),
      ];

      for (const target of targets) {
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(80);
        const overlaps = await target.evaluate((element) => {
          const targetRect = element.getBoundingClientRect();
          return Array.from(
            document.querySelectorAll<HTMLElement>("a, button, [role='button']"),
          ).flatMap((control) => {
            if (control === element || control.contains(element) || element.contains(control)) {
              return [];
            }
            const style = getComputedStyle(control);
            const rect = control.getBoundingClientRect();
            if (
              style.position !== "fixed" ||
              style.display === "none" ||
              style.visibility === "hidden" ||
              style.pointerEvents === "none" ||
              rect.width <= 0 ||
              rect.height <= 0
            ) {
              return [];
            }
            const width = Math.max(
              0,
              Math.min(targetRect.right, rect.right) - Math.max(targetRect.left, rect.left),
            );
            const height = Math.max(
              0,
              Math.min(targetRect.bottom, rect.bottom) - Math.max(targetRect.top, rect.top),
            );
            return width * height > 4
              ? [
                  {
                    control:
                      control.getAttribute("aria-label") ||
                      control.textContent?.replace(/\s+/g, " ").trim().slice(0, 60),
                    area: Math.round(width * height),
                  },
                ]
              : [];
          });
        });
        expect(overlaps, `${formCase.name} has a covered form control`).toEqual([]);
      }
    });
  }
});

test("@completion A11Y-AXE every public page passes automated WCAG scans and landmark checks", async ({
  page,
}) => {
  test.setTimeout(600_000);
  await preparePage(page);

  for (const route of publicRoutes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main#main-content")).toHaveCount(1);
      await expect(page.locator("main main")).toHaveCount(0);
      await runAxe(page, route);
    });
  }
});

test("@completion A11Y-AXE-STATES cookie, mobile-menu and contact-drawer states pass automated WCAG scans", async ({
  page,
}) => {
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
    const style = document.createElement("style");
    style.textContent = `
      div[data-netlify-deploy-id][data-netlify-site-id],
      iframe[title="Netlify Drawer"] { display: none !important; pointer-events: none !important; }
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
  }, COOKIE_CONSENT_KEY);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await runAxe(page, "cookie banner");
  await page.getByRole("button", { name: "Decline optional cookies" }).click();

  await page.locator('summary[aria-label="Open or close navigation menu"]').click();
  await runAxe(page, "mobile navigation");
  await page.keyboard.press("Escape");

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.reload();
  await page.getByRole("button", { name: "Open contact form" }).click();
  await runAxe(page, "floating contact dialog");
});

test("@completion A11Y-KEYBOARD every visible control on every public page is reachable in keyboard order", async ({
  page,
}) => {
  test.setTimeout(600_000);
  await preparePage(page);
  await page.setViewportSize({ width: 1366, height: 900 });

  for (const route of publicRoutes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const expected = await page.evaluate(() => {
        const selectors = [
          "a[href]",
          "button:not([disabled])",
          "input:not([disabled]):not([type='hidden'])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          "summary",
          "[tabindex]:not([tabindex='-1'])",
        ];
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selectors.join(",")),
        ).filter((element) => {
          if (element.closest("details:not([open])") && element.tagName !== "SUMMARY") return false;
          const style = getComputedStyle(element);
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            element.getClientRects().length > 0 &&
            element.tabIndex >= 0
          );
        });
        elements.forEach((element, index) => {
          (
            element as HTMLElement & { __completionFocusId?: string }
          ).__completionFocusId = String(index);
        });
        return elements.map(
          (element) =>
            (element as HTMLElement & { __completionFocusId?: string })
              .__completionFocusId || "",
        );
      });

      await page.evaluate(() => {
        const active = document.activeElement;
        if (active instanceof HTMLElement) active.blur();
      });
      const visited = new Set<string>();
      for (let index = 0; index < expected.length + 8; index += 1) {
        await page.keyboard.press("Tab");
        const id = await page.evaluate(
          () =>
            (
              document.activeElement as
                | (HTMLElement & { __completionFocusId?: string })
                | null
            )?.__completionFocusId || "",
        );
        if (id) visited.add(id);
        if (expected.every((candidate) => visited.has(candidate))) break;
      }
      expect(
        expected.filter((candidate) => !visited.has(candidate)),
        `${route} has controls unreachable by Tab`,
      ).toEqual([]);
    });
  }
});

test("@completion A11Y-FOCUS-VISIBLE key desktop controls display a visible keyboard-focus indicator", async ({
  page,
}) => {
  await preparePage(page);
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");

  const homeTargets: Array<[Locator, string]> = [
    [page.getByRole("link", { name: "Skip to main content" }), "skip link"],
    [page.getByRole("link", { name: "KultureKatta home" }).first(), "logo"],
    [page.getByRole("searchbox", { name: "Search KultureKatta" }).first(), "search field"],
    [page.getByRole("link", { name: "Plan for an Organization" }), "primary CTA"],
  ];
  for (const [target, label] of homeTargets) {
    await tabTo(page, target);
    await expectVisibleFocus(target, label);
  }

  await page.goto("/contact");
  const form = page.locator("#main-content form").first();
  const contactTargets: Array<[Locator, string]> = [
    [form.locator('input[name="name"]'), "contact name field"],
    [form.locator('button[type="submit"]'), "contact submit button"],
  ];
  for (const [target, label] of contactTargets) {
    await tabTo(page, target);
    await expectVisibleFocus(target, label);
  }
});
