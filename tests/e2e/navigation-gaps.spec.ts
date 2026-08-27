import { expect, test } from "@playwright/test";
import { normalizeInternalPath, preparePage } from "./helpers/site";

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("@gap NAV-01 every internal desktop navbar link can be clicked", async ({
  page,
  baseURL,
}) => {
  test.setTimeout(120_000);

  expect(baseURL).toBeTruthy();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const primaryNav = page.getByRole("navigation", {
    name: "Primary navigation",
  });

  const hrefs = await primaryNav.locator("a[href]").evaluateAll((links) =>
    links.map(
      (link) => (link as HTMLAnchorElement).getAttribute("href") || "",
    ),
  );

  for (let index = 0; index < hrefs.length; index += 1) {
    const target = normalizeInternalPath(
      hrefs[index],
      baseURL as string,
    );

    if (!target) continue;

    // Avoid testing a link while already sitting on the same URL.
    // This prevents WebKit from racing two navigations to "/".
    const sourcePath = target === "/" ? "/about" : "/";

    await page.goto(sourcePath, {
      waitUntil: "domcontentloaded",
    });

    const link = page
      .getByRole("navigation", {
        name: "Primary navigation",
      })
      .locator("a[href]")
      .nth(index);

    await link.click();

    await expect
      .poll(
        () => {
          const currentURL = new URL(page.url());
          return `${currentURL.pathname}${currentURL.search}`;
        },
        {
          message: `Navbar link did not navigate to ${target}`,
        },
      )
      .toBe(target);
  }
});

test("@gap NAV-02 every internal footer link can be clicked", async ({
  page,
  baseURL,
}) => {
  test.setTimeout(120_000);

  expect(baseURL).toBeTruthy();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const footer = page.locator("footer");

  const hrefs = await footer.locator("a[href]").evaluateAll((links) =>
    links.map(
      (link) => (link as HTMLAnchorElement).getAttribute("href") || "",
    ),
  );

  for (let index = 0; index < hrefs.length; index += 1) {
    const target = normalizeInternalPath(
      hrefs[index],
      baseURL as string,
    );

    if (!target) continue;

    // The Home footer link points to "/".
    // Start from /about for that link so WebKit does not begin a
    // second navigation to "/" while the first is still settling.
    const sourcePath = target === "/" ? "/about" : "/";

    await page.goto(sourcePath, {
      waitUntil: "domcontentloaded",
    });

    const link = page.locator("footer a[href]").nth(index);

    await link.scrollIntoViewIfNeeded();
    await link.click();

    await expect
      .poll(
        () => {
          const currentURL = new URL(page.url());
          return `${currentURL.pathname}${currentURL.search}`;
        },
        {
          message: `Footer link did not navigate to ${target}`,
        },
      )
      .toBe(target);
  }
});

test("@gap NAV-03 every primary-route navbar link exposes the active-page state", async ({
  page,
  baseURL,
}) => {
  expect(baseURL).toBeTruthy();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const links = await page
    .getByRole("navigation", {
      name: "Primary navigation",
    })
    .locator("a[href]")
    .evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        href:
          (anchor as HTMLAnchorElement).getAttribute("href") || "",
        text:
          anchor.textContent?.replace(/\s+/g, " ").trim() || "",
      })),
    );

  for (const linkData of links) {
    const target = normalizeInternalPath(
      linkData.href,
      baseURL as string,
    );

    if (!target) continue;

    await page.goto(target, {
      waitUntil: "domcontentloaded",
    });

    const activeLink = page
      .getByRole("navigation", {
        name: "Primary navigation",
      })
      .locator(
        `a[href="${linkData.href.replace(/"/g, '\\"')}"]`,
      )
      .first();

    await expect(
      activeLink,
      `Missing active state for ${linkData.text || target}`,
    ).toHaveAttribute("aria-current", "page");
  }
});

test("@gap NAV-04 mobile menu traps Tab and Shift+Tab at its boundaries", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const summary = page.locator(
    'summary[aria-label="Open or close navigation menu"]',
  );

  await summary.click();

  const mobileNav = page.getByRole("navigation", {
    name: "Mobile navigation",
  });

  const links = mobileNav.getByRole("link");
  const first = links.first();
  const last = links.last();

  await last.focus();
  await page.keyboard.press("Tab");
  await expect(first).toBeFocused();

  await first.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(last).toBeFocused();
});

test("@gap NAV-05 mobile menu locks page scroll and blocks a background click", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const backgroundLink = page
    .locator("main#main-content a[href]")
    .first();

  await expect(backgroundLink).toBeVisible();
  await backgroundLink.scrollIntoViewIfNeeded();

  const box = await backgroundLink.boundingBox();

  expect(box).not.toBeNull();

  const initialURL = page.url();

  const summary = page.locator(
    'summary[aria-label="Open or close navigation menu"]',
  );

  await summary.click();

  expect(
    await page
      .locator("body")
      .evaluate((body) => body.style.overflow),
  ).toBe("hidden");

  await page.mouse.click(
    (box?.x ?? 0) + (box?.width ?? 0) / 2,
    (box?.y ?? 0) + (box?.height ?? 0) / 2,
  );

  expect(page.url()).toBe(initialURL);
});

test("@gap NAV-06 closing the mobile menu leaves no invisible click-blocking overlay", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const summary = page.locator(
    'summary[aria-label="Open or close navigation menu"]',
  );

  await summary.click();
  await page.keyboard.press("Escape");

  await summary.click();

  const aboutLink = page
    .getByRole("navigation", {
      name: "Mobile navigation",
    })
    .getByRole("link", {
      name: "About",
      exact: true,
    });

  await aboutLink.click();

  await expect(page).toHaveURL(/\/about\/?$/);
});

test("@gap NAV-07 contact drawer close button works and clicking inside does not close it", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const trigger = page.getByRole("button", {
    name: "Open contact form",
  });

  await trigger.click();

  const dialog = page.getByRole("dialog", {
    name: "Let’s start a conversation.",
  });

  const closeButton = dialog.getByRole("button", {
    name: "Close contact form",
  });

  await expect(dialog).toBeVisible();

  const firstField = dialog
    .locator(
      "input:visible, textarea:visible, select:visible",
    )
    .first();

  await firstField.click();
  await expect(dialog).toBeVisible();

  await closeButton.click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("@gap NAV-08 navbar remains on one line at an intermediate desktop width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1100, height: 800 });
  await page.goto("/");

  const links = page
    .getByRole("navigation", {
      name: "Primary navigation",
    })
    .getByRole("link");

  const verticalCenters = await links.evaluateAll((anchors) =>
    anchors.map((anchor) => {
      const rect = anchor.getBoundingClientRect();
      return rect.top + rect.height / 2;
    }),
  );

  expect(verticalCenters.length).toBeGreaterThan(0);

  const centerSpread =
    Math.max(...verticalCenters) -
    Math.min(...verticalCenters);

  expect(
    centerSpread,
    "Primary navigation links wrapped onto multiple rows",
  ).toBeLessThanOrEqual(4);
});