import type { Locator, Page } from "@playwright/test";
import { experienceCategories } from "../../data/experienceCategories";

export const COOKIE_CONSENT_KEY = "kuka-cookie-consent-v1";

const staticRoutes = [
  "/",
  "/experiences",
  "/moods",
  "/moments",
  "/experiences/custom-combination",
  "/experiences/festive",
  "/experiences/wellness",
  "/for-organizations",
  "/private-experiences",
  "/kuka-universe",
  "/kuka-universe/senses",
  "/kuka-universe/circle",
  "/kuka-universe/explore",
  "/kuka-universe/wellness",
  "/about",
  "/katta-studio",
  "/katta-studio/work-with-us",
  "/contact",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-of-use",
  "/search?q=culture",
];

export const publicRoutes = [
  ...staticRoutes,
  ...experienceCategories.map((category) => category.href),
];

export const sitemapRoutes = publicRoutes.filter(
  (route) => !route.startsWith("/search"),
);

export const representativeRoutes = [
  "/",
  "/experiences",
  "/experiences/workshops",
  "/for-organizations",
  "/private-experiences",
  "/kuka-universe",
  "/about",
  "/katta-studio",
  "/contact",
];

export const redirectCases = [
  ["/universe", "/kuka-universe"],
  ["/explore", "/experiences"],
  ["/explore/workshops", "/experiences/workshops"],
  ["/explore-talks", "/experiences/talks"],
  ["/explore-walks", "/experiences/walks"],
  ["/explore-games", "/experiences/games"],
  ["/explore-stage-and-screen", "/experiences/stories"],
  ["/experiences/hands-on", "/experiences/workshops"],
  ["/experiences/walks-getaways", "/experiences/walks"],
  ["/experiences/talks-conversations", "/experiences/talks"],
  ["/experiences/food-senses", "/experiences/food"],
  ["/experiences/play-movement", "/experiences"],
  ["/experiences/stage-screen-stories", "/experiences/stories"],
  ["/for-organisations", "/for-organizations"],
] as const;

export async function preparePage(page: Page) {
  await page.addInitScript((key) => {
    window.localStorage.setItem(key, "rejected");

    const hideNetlifyPreviewDrawer = () => {
      if (document.querySelector("style[data-playwright-netlify-drawer]")) return;

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
    };

    if (document.documentElement) {
      hideNetlifyPreviewDrawer();
    } else {
      document.addEventListener("DOMContentLoaded", hideNetlifyPreviewDrawer, { once: true });
    }
  }, COOKIE_CONSENT_KEY);
}

export async function fillRequiredFields(form: Locator) {
  const textInputs = form.locator(
    'input[required]:not([type="checkbox"]):not([type="radio"]):not([type="hidden"]):visible',
  );

  for (let index = 0; index < (await textInputs.count()); index += 1) {
    const input = textInputs.nth(index);
    const type = (await input.getAttribute("type"))?.toLowerCase() || "text";
    const name = (await input.getAttribute("name"))?.toLowerCase() || "";

    let value = "Automated preview test";

    if (type === "email" || name.includes("email")) {
      value = "preview-test@example.com";
    } else if (type === "url" || name.includes("website") || name.includes("link")) {
      value = "https://example.com/preview-test";
    } else if (type === "tel" || name.includes("phone") || name.includes("mobile")) {
      value = "+91 98765 43210";
    } else if (type === "number") {
      value = "12";
    } else if (type === "date") {
      value = "2026-12-01";
    }

    await input.fill(value);
  }

  const textareas = form.locator("textarea[required]:visible");
  for (let index = 0; index < (await textareas.count()); index += 1) {
    await textareas
      .nth(index)
      .fill("Automated stabilization preview test. No action is required.");
  }

  const selects = form.locator("select[required]:visible");
  for (let index = 0; index < (await selects.count()); index += 1) {
    const select = selects.nth(index);
    const firstValidValue = await select.locator("option").evaluateAll((options) => {
      const validOption = options.find((option) => {
        const htmlOption = option as HTMLOptionElement;
        return !htmlOption.disabled && htmlOption.value.trim().length > 0;
      }) as HTMLOptionElement | undefined;

      return validOption?.value || "";
    });

    if (firstValidValue) {
      await select.selectOption(firstValidValue);
    }
  }

  const checkboxes = form.locator('input[type="checkbox"][required]:visible');
  for (let index = 0; index < (await checkboxes.count()); index += 1) {
    await checkboxes.nth(index).check();
  }

  const requiredRadioGroups = await form
    .locator('input[type="radio"][required]:visible')
    .evaluateAll((radios) => [
      ...new Set(
        radios.map((radio) => (radio as HTMLInputElement).name).filter(Boolean),
      ),
    ]);

  for (const groupName of requiredRadioGroups) {
    await form.locator(`input[type="radio"][name="${groupName}"]`).first().check();
  }
}

export function normalizeInternalPath(href: string, baseURL: string) {
  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return null;
  }

  const previewOrigin = new URL(baseURL).origin;
  const parsed = new URL(href, previewOrigin);
  const isKultureKattaProduction =
    parsed.hostname === "kulturekatta.com" ||
    parsed.hostname === "www.kulturekatta.com";

  if (parsed.origin !== previewOrigin && !isKultureKattaProduction) {
    return null;
  }

  return `${parsed.pathname}${parsed.search}`;
}
