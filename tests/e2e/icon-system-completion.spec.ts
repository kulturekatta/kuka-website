import { expect, test } from "@playwright/test";
import { preparePage, publicRoutes } from "./helpers/site";

const iconAuditRoutes = [
  ...new Set([
    ...publicRoutes,
    "/search",
    "/search?q=__kuka_icon_audit_no_results__",
    "/__kuka_icon_audit_not_found__",
  ]),
];

test.beforeEach(async ({ page }) => {
  page.setDefaultNavigationTimeout(60_000);
  await preparePage(page);
});

test("@completion ICON-01 organization design section uses the supported design icon", async ({
  page,
}) => {
  await page.goto("/for-organizations", { waitUntil: "domcontentloaded" });

  const section = page
    .getByRole("heading", {
      name: "From team days to cultural immersions.",
      exact: true,
    })
    .locator("xpath=ancestor::section[1]");

  await expect(section.locator('[data-kk-icon="📐"]')).toBeVisible();
  await expect(section).not.toContainText("🪄");
  await expect(section).not.toContainText("�");
});

test("@completion ICON-02 public pages keep semantic icons unique, present, and correctly placed", async ({
  page,
}) => {
  test.setTimeout(360_000);

  const issues: string[] = [];

  for (const route of iconAuditRoutes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });

      const main = page.locator("main");
      await expect(main.getByRole("heading", { level: 1 })).toBeVisible();

      const visibleIconValues = await main
        .locator("[data-kk-icon]:visible")
        .evaluateAll((icons) =>
          icons
            .map((icon) => icon.getAttribute("data-kk-icon") || "")
            .filter(Boolean),
        );

      const duplicateIcons = [
        ...new Set(
          visibleIconValues.filter(
            (icon, index) => visibleIconValues.indexOf(icon) !== index,
          ),
        ),
      ];

      if (duplicateIcons.length > 0) {
        issues.push(
          `${route}: repeated semantic visuals: ${duplicateIcons.join(", ")}`,
        );
      }

      const sections = main.locator("section:visible");
      for (let index = 0; index < (await sections.count()); index += 1) {
        const result = await sections.nth(index).evaluate((section) => {
          const isVisible = (node: Element) => {
            const style = window.getComputedStyle(node);
            const rect = node.getBoundingClientRect();
            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0
            );
          };

          const heading = [...section.querySelectorAll("h1, h2")].find(isVisible);
          if (!heading) {
            return { hasHeading: false, hasVisual: true, visualBeforeHeading: true };
          }

          const visual = [
            ...section.querySelectorAll(
              "[data-kk-icon], [data-kk-sequence], img, .kk-card-avatar",
            ),
          ].find(isVisible);

          if (!visual) {
            return { hasHeading: true, hasVisual: false, visualBeforeHeading: false };
          }

          const visualBeforeHeading = Boolean(
            visual.compareDocumentPosition(heading) &
              Node.DOCUMENT_POSITION_FOLLOWING,
          );

          return { hasHeading: true, hasVisual: true, visualBeforeHeading };
        });

        if (result.hasHeading && !result.hasVisual) {
          issues.push(`${route}: section ${index + 1} has no leading visual`);
        } else if (result.hasHeading && !result.visualBeforeHeading) {
          issues.push(
            `${route}: section ${index + 1} visual appears after its first H1/H2`,
          );
        }
      }

      const cards = main.locator(".kk-card:visible, .kk-panel:visible");
      for (let index = 0; index < (await cards.count()); index += 1) {
        const result = await cards.nth(index).evaluate((card) => {
          const isVisible = (node: Element) => {
            const style = window.getComputedStyle(node);
            const rect = node.getBoundingClientRect();
            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0
            );
          };

          const visual = [
            ...card.querySelectorAll(
              "[data-kk-icon], [data-kk-sequence], img, .kk-card-avatar",
            ),
          ].find(isVisible);

          const heading = [...card.querySelectorAll("h2, h3")].find(isVisible);

          if (!visual) {
            return { hasVisual: false, visualBeforeHeading: false };
          }

          if (!heading) {
            return { hasVisual: true, visualBeforeHeading: true };
          }

          const visualBeforeHeading = Boolean(
            visual.compareDocumentPosition(heading) &
              Node.DOCUMENT_POSITION_FOLLOWING,
          );

          return { hasVisual: true, visualBeforeHeading };
        });

        if (!result.hasVisual) {
          issues.push(`${route}: card/panel ${index + 1} has no visual`);
        } else if (!result.visualBeforeHeading) {
          issues.push(
            `${route}: card/panel ${index + 1} visual appears after its first H2/H3`,
          );
        }
      }

      const forms = main.locator('form:visible:not([role="search"])');
      for (let index = 0; index < (await forms.count()); index += 1) {
        const result = await forms.nth(index).evaluate((form) => {
          const isVisible = (node: Element) => {
            const style = window.getComputedStyle(node);
            const rect = node.getBoundingClientRect();
            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0
            );
          };

          const icon = [...form.querySelectorAll("[data-kk-icon]")].find(isVisible);
          const firstField = [
            ...form.querySelectorAll(
              'input:not([type="hidden"]):not([aria-hidden="true"]):not([tabindex="-1"]), select:not([aria-hidden="true"]):not([tabindex="-1"]), textarea:not([aria-hidden="true"]):not([tabindex="-1"])',
            ),
          ].find(isVisible);

          if (!icon) {
            return { hasIcon: false, iconBeforeFields: false };
          }

          if (!firstField) {
            return { hasIcon: true, iconBeforeFields: true };
          }

          const iconBeforeFields = Boolean(
            icon.compareDocumentPosition(firstField) &
              Node.DOCUMENT_POSITION_FOLLOWING,
          );

          return { hasIcon: true, iconBeforeFields };
        });

        if (!result.hasIcon) {
          issues.push(`${route}: form ${index + 1} has no semantic icon`);
        } else if (!result.iconBeforeFields) {
          issues.push(
            `${route}: form ${index + 1} icon appears after its first field`,
          );
        }
      }

      const replacementCharacters = await main.getByText("�").count();
      if (replacementCharacters > 0) {
        issues.push(`${route}: contains a replacement-character glyph`);
      }
    });
  }

  expect(
    issues,
    [
      "Icon placement/presence issues found.",
      "Page/section visuals must lead their first H1/H2.",
      "Card/panel visuals must precede their first H2/H3.",
      "Non-search forms must contain an icon before their first field.",
      "The same rendered semantic visual must not repeat on one page/state.",
    ].join("\n"),
  ).toEqual([]);
});

test("@completion ICON-03 one semantic icon has one meaning across the public site and conditional states", async ({
  page,
}) => {
  test.setTimeout(360_000);

  type IconOccurrence = {
    route: string;
    icon: string;
    key: string;
    label: string;
  };

  const occurrences: IconOccurrence[] = [];

  for (const route of iconAuditRoutes) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });

      const main = page.locator("main");
      await expect(main.getByRole("heading", { level: 1 })).toBeVisible();

      const routeIcons = await main
        .locator("[data-kk-icon]:visible")
        .evaluateAll((icons) =>
          icons.map((icon) => ({
            icon: icon.getAttribute("data-kk-icon") || "",
            key:
              icon.getAttribute("data-kk-icon-key") ||
              (icon.getAttribute("aria-label") || "")
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase(),
            label:
              icon.getAttribute("data-kk-icon-label") ||
              icon.getAttribute("aria-label") ||
              icon.getAttribute("title") ||
              "",
          })),
        );

      for (const item of routeIcons) {
        if (!item.icon || !item.key) continue;

        occurrences.push({
          route,
          icon: item.icon,
          key: item.key,
          label: item.label.replace(/\s+/g, " ").trim(),
        });
      }
    });
  }

  const byVisual = new Map<
    string,
    Map<string, { labels: Set<string>; routes: Set<string> }>
  >();

  for (const occurrence of occurrences) {
    if (!byVisual.has(occurrence.icon)) {
      byVisual.set(occurrence.icon, new Map());
    }

    const meanings = byVisual.get(occurrence.icon)!;

    if (!meanings.has(occurrence.key)) {
      meanings.set(occurrence.key, {
        labels: new Set<string>(),
        routes: new Set<string>(),
      });
    }

    meanings.get(occurrence.key)!.labels.add(occurrence.label);
    meanings.get(occurrence.key)!.routes.add(occurrence.route);
  }

  const collisions = [...byVisual.entries()]
    .filter(([, meanings]) => meanings.size > 1)
    .map(([icon, meanings]) => {
      const uses = [...meanings.entries()]
        .map(
          ([key, { labels, routes }]) =>
            `${key} [${[...labels].sort().join(" / ")}] @ ${[
              ...routes,
            ]
              .sort()
              .join(", ")}`,
        )
        .sort();

      return `${icon} :: ${uses.join(" || ")}`;
    })
    .sort();

  expect(
    collisions,
    [
      "Semantic icon collisions found.",
      "One rendered icon may represent one semantic meaning only.",
      "Intentional label aliases may share an icon only when they share the same data-kk-icon-key.",
    ].join("\n"),
  ).toEqual([]);

  const byUnorderedCompound = new Map<string, Map<string, Set<string>>>();

  for (const occurrence of occurrences) {
    const parts = occurrence.icon.split(" ").filter(Boolean);
    if (parts.length !== 2) continue;

    const fingerprint = [...parts].sort().join("|");

    if (!byUnorderedCompound.has(fingerprint)) {
      byUnorderedCompound.set(fingerprint, new Map());
    }

    const meanings = byUnorderedCompound.get(fingerprint)!;
    if (!meanings.has(occurrence.key)) {
      meanings.set(occurrence.key, new Set<string>());
    }
    meanings.get(occurrence.key)!.add(occurrence.icon);
  }

  const reversedNearDuplicates = [...byUnorderedCompound.entries()]
    .filter(([, meanings]) => meanings.size > 1)
    .map(([fingerprint, meanings]) => {
      const uses = [...meanings.entries()]
        .map(
          ([key, icons]) => `${key} [${[...icons].sort().join(" / ")}]`,
        )
        .sort();

      return `${fingerprint} :: ${uses.join(" || ")}`;
    })
    .sort();

  expect(
    reversedNearDuplicates,
    "Two-icon semantic visuals must not become near-duplicates merely by reversing the same pair.",
  ).toEqual([]);
});