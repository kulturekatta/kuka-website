import { expect, test } from "@playwright/test";
import { preparePage, publicRoutes } from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("@exhaustive CONTENT-01 utility contact and search destinations are exact", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  const header = page.locator("body > div").first();
  await expect(page.locator('a[href="https://wa.me/919730244996"]').first()).toContainText(
    "+91 97302 44996",
  );
  await expect(page.locator('a[href="mailto:hey@kulturekatta.com"]').first()).toContainText(
    "hey@kulturekatta.com",
  );
  await expect(page.getByRole("search")).toHaveAttribute("action", "/search");
  await expect(header).toBeAttached();
});

test("@exhaustive CONTENT-02 footer exposes every required section and destination", async ({
  page,
}) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();

  const requiredHeadings = [
    "Experiences",
    "KuKa Universe",
    "Studio Services",
    "Connect",
    "Legal",
  ];
  for (const heading of requiredHeadings) {
    await expect(footer.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }

  const requiredLinks: Array<[string, string]> = [
    ["All Experiences", "/experiences"],
    ["Explore by Mood", "/moods"],
    ["For Organizations", "/for-organizations"],
    ["Private Experiences", "/private-experiences"],
    ["KuKa Universe", "/kuka-universe"],
    ["KuKa Explore", "/kuka-universe/explore"],
    ["KuKa Circle", "/kuka-universe/circle"],
    ["About Katta Studio", "/katta-studio"],
    ["Website Development", "/katta-studio#websites-and-digital-presence"],
    ["Brand Positioning & Visual Identity", "/katta-studio#brand-positioning-and-visual-identity"],
    ["Social Media Presence", "/katta-studio#social-media-and-content"],
    ["Privacy Policy", "/privacy-policy"],
    ["Terms of Use", "/terms-of-use"],
    ["Cookie Policy", "/cookie-policy"],
  ];

  for (const [name, href] of requiredLinks) {
    await expect(
      footer.getByRole("link", { name, exact: true }).first(),
      `Missing footer link: ${name}`,
    ).toHaveAttribute("href", href);
  }

  await expect(footer).toContainText(
    "KultureKatta is operated by BuffyFish (OPC) Private Limited.",
  );
});

test("@exhaustive CONTENT-03 external links use approved URLs and safe new-tab attributes", async ({
  page,
}) => {
  await page.goto("/");

  const expected = [
    "https://www.instagram.com/kulturekatta/",
    "https://www.linkedin.com/company/kulturekatta/",
    "https://wa.me/919730244996",
  ];

  for (const href of expected) {
    const links = page.locator(`a[href="${href}"]`);
    await expect(links.first(), `Missing external destination ${href}`).toBeAttached();

    for (let index = 0; index < (await links.count()); index += 1) {
      const link = links.nth(index);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("rel", /noreferrer/);
      await expect(link).toHaveAccessibleName(/\S+/);
    }
  }
});

test("@exhaustive CONTENT-04 homepage hero and primary destinations are exact", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Culture-led experiences for organizations and private groups.",
  );
  await expect(page.getByRole("link", { name: "Plan for an Organization" })).toHaveAttribute(
    "href",
    "/for-organizations",
  );
  await expect(page.getByRole("link", { name: "Plan a Private Experience" })).toHaveAttribute(
    "href",
    "/private-experiences",
  );
  await expect(
    page.getByRole("link", { name: "Explore the complete KuKa Universe" }),
  ).toHaveAttribute("href", "/kuka-universe");
});

test("@exhaustive CONTENT-05 every approved 'What can you do with KuKa?' card is linked", async ({
  page,
}) => {
  await page.goto("/");

  const section = page.locator("section").filter({ hasText: "What can you do with KuKa?" }).first();
  await expect(section).toBeVisible();

  const expectedDestinations = [
    "/experiences/workshops",
    "/experiences/food",
    "/experiences/walks",
    "/experiences/talks",
    "/experiences/words",
    "/experiences/sound",
    "/experiences/stories",
    "/experiences/movement",
    "/experiences/games",
    "/experiences/wellness",
    "/experiences/festive",
    "/experiences/custom-combination",
  ];

  for (const href of expectedDestinations) {
    await expect(section.locator(`a[href="${href}"]`), `Missing homepage card ${href}`).toHaveCount(1);
  }
});

test("@exhaustive CONTENT-06 contact details remain consistent on representative surfaces", async ({
  page,
}) => {
  for (const route of ["/", "/contact"]) {
    await test.step(route, async () => {
      await page.goto(route);
      await expect(page.locator('a[href="mailto:hey@kulturekatta.com"]').first()).toBeAttached();
      await expect(page.locator('a[href="https://wa.me/919730244996"]').first()).toBeAttached();
      expect(await page.locator('a[href^="mailto:"]').evaluateAll((links) => [
        ...new Set(
          links.map((link) =>
            (link.getAttribute("href") || "")
              .slice("mailto:".length)
              .split("?")[0]
              .toLowerCase(),
          ),
        ),
      ])).toEqual(["hey@kulturekatta.com"]);
      expect(await page.locator('a[href*="wa.me/"]').evaluateAll((links) => [
        ...new Set(links.map((link) => link.getAttribute("href"))),
      ])).toEqual(["https://wa.me/919730244996"]);
    });
  }
});

test("@exhaustive CONTENT-07 public pages contain no placeholders, localhost URLs, or doubled CTA labels", async ({
  page,
}) => {
  test.setTimeout(150_000);

  const forbiddenText = /\b(?:lorem ipsum|todo|tbd|replace me|placeholder date)\b/i;

  for (const route of publicRoutes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const mainText = (await page.locator("main#main-content").innerText()).replace(/\s+/g, " ");
      expect(mainText, `${route} contains placeholder copy`).not.toMatch(forbiddenText);

      const localLinks = await page.locator('a[href*="localhost"], a[href*="127.0.0.1"]').count();
      expect(localLinks, `${route} exposes a local-only URL`).toBe(0);

      const doubledLabels = await page.locator("main#main-content a").evaluateAll((links) =>
        links.flatMap((link) => {
          const text = (link.textContent || "").replace(/\s+/g, " ").trim();
          const words = text.split(" ").filter(Boolean);
          if (words.length < 2 || words.length % 2 !== 0) return [];
          const half = words.length / 2;
          return words.slice(0, half).join(" ") === words.slice(half).join(" ")
            ? [text]
            : [];
        }),
      );
      expect(doubledLabels, `${route} contains a duplicated link label`).toEqual([]);
    });
  }
});