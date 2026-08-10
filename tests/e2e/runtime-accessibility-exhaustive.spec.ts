import { expect, test } from "@playwright/test";
import { preparePage, publicRoutes } from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("@exhaustive RUNTIME-01 public routes have no console errors, page errors, or failed critical resources", async ({
  page,
}) => {
  test.setTimeout(150_000);
  let consoleErrors: string[] = [];
  let pageErrors: string[] = [];
  let failedResources: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    if (["document", "script", "stylesheet", "font", "image"].includes(request.resourceType())) {
      failedResources.push(`${request.resourceType()}: ${request.url()} — ${request.failure()?.errorText}`);
    }
  });
  page.on("response", (response) => {
    const type = response.request().resourceType();
    if (["document", "script", "stylesheet", "font", "image"].includes(type) && response.status() >= 400) {
      failedResources.push(`${type}: ${response.status()} ${response.url()}`);
    }
  });

  for (const route of publicRoutes) {
    await test.step(route, async () => {
      consoleErrors = [];
      pageErrors = [];
      failedResources = [];

      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("load");
      await page.waitForTimeout(150);

      expect(consoleErrors, `Console errors on ${route}`).toEqual([]);
      expect(pageErrors, `Page errors on ${route}`).toEqual([]);
      expect(failedResources, `Failed critical resources on ${route}`).toEqual([]);
    });
  }
});

test("@exhaustive RUNTIME-02 every rendered image loads with non-zero intrinsic dimensions", async ({
  page,
}) => {
  test.setTimeout(150_000);

  for (const route of publicRoutes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const images = page.locator("main#main-content img, header img, footer img");

      for (let index = 0; index < (await images.count()); index += 1) {
        const image = images.nth(index);
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() => image.evaluate((element: HTMLImageElement) => ({
            complete: element.complete,
            width: element.naturalWidth,
            height: element.naturalHeight,
          })))
          .toMatchObject({ complete: true });

        const dimensions = await image.evaluate((element: HTMLImageElement) => ({
          source: element.currentSrc || element.src,
          width: element.naturalWidth,
          height: element.naturalHeight,
        }));
        expect(dimensions.width, `${route}: ${dimensions.source} has no width`).toBeGreaterThan(0);
        expect(dimensions.height, `${route}: ${dimensions.source} has no height`).toBeGreaterThan(0);
      }
    });
  }
});

test("@exhaustive SEO-META every indexable route has unique metadata and a matching canonical", async ({
  page,
}) => {
  const routes = publicRoutes.filter((route) => !route.startsWith("/search"));
  const records: Array<{
    route: string;
    title: string;
    description: string;
    canonical: string | null;
  }> = [];

  for (const route of routes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const description = page.locator('meta[name="description"]');
    const canonical = page.locator('link[rel="canonical"]');
    records.push({
      route,
      title: await page.title(),
      description: (await description.count()) > 0
        ? (await description.first().getAttribute("content")) || ""
        : "",
      canonical: (await canonical.count()) > 0
        ? await canonical.first().getAttribute("href")
        : null,
    });
  }

  const missingOrWrongCanonical = records.flatMap((record) => {
    if (!record.canonical) return [`${record.route}: missing canonical`];
    const canonical = new URL(record.canonical, "https://kulturekatta.com");
    const expectedPath = record.route === "/" ? "/" : record.route.replace(/\/$/, "");
    const actualPath = canonical.pathname === "/" ? "/" : canonical.pathname.replace(/\/$/, "");
    return canonical.origin === "https://kulturekatta.com" && actualPath === expectedPath
      ? []
      : [`${record.route}: ${record.canonical}`];
  });

  const duplicates = (field: "title" | "description") => {
    const byValue = new Map<string, string[]>();
    for (const record of records) {
      const value = record[field].trim();
      const routesForValue = byValue.get(value) || [];
      routesForValue.push(record.route);
      byValue.set(value, routesForValue);
    }
    return [...byValue.entries()]
      .filter(([value, routesForValue]) => !value || routesForValue.length > 1)
      .map(([value, routesForValue]) => ({ value, routes: routesForValue }));
  };

  expect(missingOrWrongCanonical, "Canonical metadata gaps").toEqual([]);
  expect(duplicates("title"), "Duplicate or empty page titles").toEqual([]);
  expect(duplicates("description"), "Duplicate or empty meta descriptions").toEqual([]);
});

test("@exhaustive A11Y-HEADINGS every public page has one H1 and no skipped heading level", async ({
  page,
}) => {
  const failures: Array<{ route: string; headings: Array<{ level: number; text: string }> }> = [];

  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const headings = await page.locator("main#main-content h1, main#main-content h2, main#main-content h3, main#main-content h4, main#main-content h5, main#main-content h6").evaluateAll(
      (elements) => elements.map((element) => ({
        level: Number(element.tagName.slice(1)),
        text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 90) || "",
      })),
    );

    const h1Count = headings.filter((heading) => heading.level === 1).length;
    const skips = headings.some((heading, index) =>
      index > 0 && heading.level > headings[index - 1].level + 1,
    );
    if (h1Count !== 1 || headings[0]?.level !== 1 || skips) {
      failures.push({ route, headings });
    }
  }

  expect(failures, "Heading hierarchy failures").toEqual([]);
});

test("@exhaustive A11Y-NAMES visible controls across public pages expose usable names and labels", async ({
  page,
}) => {
  const failures: Array<{ route: string; controls: unknown[] }> = [];

  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const controls = await page.locator("a:visible, button:visible, input:visible, select:visible, textarea:visible").evaluateAll(
      (elements) => elements.flatMap((element) => {
        const html = element as HTMLElement;
        const input = element as HTMLInputElement;
        if (input.type === "hidden") return [];

        const labelledBy = html.getAttribute("aria-labelledby");
        const labelledText = labelledBy
          ? labelledBy.split(/\s+/).map((id) => document.getElementById(id)?.textContent || "").join(" ")
          : "";
        const labelText = "labels" in input
          ? Array.from(input.labels || []).map((label) => label.textContent || "").join(" ")
          : "";
        const imageAlt = html.querySelector("img")?.getAttribute("alt") || "";
        const name = [
          html.getAttribute("aria-label"),
          labelledText,
          labelText,
          input.value && ["button", "submit", "reset"].includes(input.type) ? input.value : "",
          html.textContent,
          imageAlt,
          html.getAttribute("title"),
        ].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

        return name ? [] : [{
          tag: html.tagName.toLowerCase(),
          type: input.type || "",
          href: html.getAttribute("href"),
          id: html.id,
        }];
      }),
    );

    if (controls.length > 0) failures.push({ route, controls });
  }

  expect(failures, "Unnamed visible controls").toEqual([]);
});
