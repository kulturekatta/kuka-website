import { expect, test } from "@playwright/test";
import { preparePage, representativeRoutes } from "./helpers/site";

const exactViewports = [
  { name: "large mobile", width: 430, height: 932 },
  { name: "standard laptop", width: 1366, height: 768 },
];

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const viewport of exactViewports) {
  test.describe(`@gap ${viewport.name} ${viewport.width}x${viewport.height}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of representativeRoutes) {
      test(`RESP-EXACT ${route} keeps containers and footer content inside the viewport`, async ({
        page,
      }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });

        const issues = await page.evaluate(() => {
          const viewportWidth = document.documentElement.clientWidth;
          const selectors = [
            "main#main-content article",
            "main#main-content .kk-card",
            "main#main-content .kk-panel",
            "main#main-content form",
            "footer nav",
            "footer section",
            "footer a",
            "footer button",
          ];

          return Array.from(document.querySelectorAll<HTMLElement>(selectors.join(",")))
            .filter((element) => {
              const style = window.getComputedStyle(element);
              const rect = element.getBoundingClientRect();
              return (
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                Number.parseFloat(style.opacity || "1") > 0 &&
                rect.width > 0 &&
                rect.height > 0
              );
            })
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return rect.left < -1 || rect.right > viewportWidth + 1;
            })
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                selector: element.tagName.toLowerCase(),
                className: element.className,
                text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 80),
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                viewportWidth,
              };
            });
        });

        expect(
          issues,
          `${route} has containers or footer controls outside ${viewport.width}px`,
        ).toEqual([]);
      });
    }
  });
}

test("@gap @completion OVR-005 Go to Top appears after desktop scrolling and works by mouse and keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  const button = page.getByRole("button", { name: /go to top|back to top/i });
  await expect(button).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  await expect(button).toBeVisible();
  const box = await button.boundingBox();
  expect(box).not.toBeNull();
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

  await button.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(button).toBeVisible();
  await button.focus();
  await expect(button).toBeFocused();
  await button.press("Enter");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);
});

test("@gap RESP-GOTOTOP-02 Go to Top does not cover an interactive footer control", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  const button = page.getByRole("button", { name: /go to top|back to top/i });
  await expect(button).toBeVisible();

  const overlap = await page.evaluate(() => {
    const goToTop = Array.from(document.querySelectorAll<HTMLElement>("button")).find((element) =>
      /go to top|back to top/i.test(
        element.getAttribute("aria-label") || element.textContent || "",
      ),
    );
    if (!goToTop) return null;

    const a = goToTop.getBoundingClientRect();
    const controls = Array.from(
      document.querySelectorAll<HTMLElement>("footer a, footer button"),
    ).filter((element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0;
    });

    for (const control of controls) {
      if (goToTop.contains(control) || control.contains(goToTop)) continue;
      const b = control.getBoundingClientRect();
      const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      if (width * height > 4) {
        return {
          control: control.textContent?.replace(/\s+/g, " ").trim().slice(0, 80),
          overlapArea: Math.round(width * height),
        };
      }
    }

    return null;
  });

  expect(overlap, "Go to Top overlaps a footer link or button").toBeNull();
});

test("@gap RESP-FIXED-01 visible fixed controls do not collide at large-mobile size", async ({
  page,
}) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));

  const collisions = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll<HTMLElement>("body *"));
    const fixed = all.filter((element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      if (
        style.position !== "fixed" ||
        style.display === "none" ||
        style.visibility === "hidden" ||
        Number.parseFloat(style.opacity || "1") <= 0 ||
        rect.width <= 0 ||
        rect.height <= 0
      ) {
        return false;
      }

      return !element.parentElement || window.getComputedStyle(element.parentElement).position !== "fixed";
    });

    const results: Array<{ first: string; second: string; overlapArea: number }> = [];

    for (let firstIndex = 0; firstIndex < fixed.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < fixed.length; secondIndex += 1) {
        const first = fixed[firstIndex];
        const second = fixed[secondIndex];
        if (first.contains(second) || second.contains(first)) continue;

        const a = first.getBoundingClientRect();
        const b = second.getBoundingClientRect();
        const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
        const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
        const overlapArea = width * height;

        if (overlapArea > 16) {
          results.push({
            first: first.getAttribute("aria-label") || first.className || first.tagName,
            second: second.getAttribute("aria-label") || second.className || second.tagName,
            overlapArea: Math.round(overlapArea),
          });
        }
      }
    }

    return results;
  });

  expect(collisions, "Visible fixed elements overlap one another").toEqual([]);
});

test("@gap RESP-HEADER-01 fixed or sticky header does not cover the page heading", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  const result = await page.evaluate(() => {
    const header = document.querySelector<HTMLElement>("header");
    const heading = document.querySelector<HTMLElement>("main#main-content h1");
    if (!header || !heading) return null;

    const headerStyle = window.getComputedStyle(header);
    if (!['fixed', 'sticky'].includes(headerStyle.position)) return null;

    const headerRect = header.getBoundingClientRect();
    const headingRect = heading.getBoundingClientRect();
    return {
      headerBottom: Math.round(headerRect.bottom),
      headingTop: Math.round(headingRect.top),
      covered: headingRect.top < headerRect.bottom,
    };
  });

  if (result) {
    expect(result.covered, JSON.stringify(result)).toBe(false);
  }
});

test("@gap @completion LAY-012 mobile KuKa for Organizations label keeps its approved two-line treatment", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/for-organizations", { waitUntil: "domcontentloaded" });

  const label = page.locator("main#main-content .kk-page-label").first();
  const mobileLines = label.locator("span.sm\\:hidden");
  await expect(mobileLines).toHaveCount(2);
  await expect(mobileLines.nth(0)).toBeVisible();
  await expect(mobileLines.nth(0)).toHaveText("KuKa");
  await expect(mobileLines.nth(1)).toBeVisible();
  await expect(mobileLines.nth(1)).toHaveText("for Organizations");
  await expect(label.locator("span.sm\\:inline")).toBeHidden();

  const positions = await mobileLines.evaluateAll((lines) =>
    lines.map((line) => {
      const rect = line.getBoundingClientRect();
      return {
        top: Math.round(rect.top),
        fontSize: getComputedStyle(line).fontSize,
        right: Math.round(rect.right),
      };
    }),
  );
  expect(positions[1].top).toBeGreaterThan(positions[0].top);
  expect(positions[1].fontSize).toBe(positions[0].fontSize);
  expect(positions.every((position) => position.right <= 391)).toBe(true);
});
