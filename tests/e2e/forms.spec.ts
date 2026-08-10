import { expect, test, type Locator, type Page } from "@playwright/test";
import { fillRequiredFields, preparePage } from "./helpers/site";

type FormCase = {
  name: string;
  route: string;
  formSelector: string;
  endpoint: string;
};

const formCases: FormCase[] = [
  {
    name: "main contact form",
    route: "/contact",
    formSelector: "#main-content form",
    endpoint: "/api/contact",
  },
  {
    name: "organization inquiry form",
    route: "/for-organizations#organization-inquiry",
    formSelector: "#organization-inquiry form",
    endpoint: "/api/organization-inquiry",
  },
  {
    name: "Growth Clinic form",
    route: "/katta-studio#growth-clinic-form",
    formSelector: "#growth-clinic-contact-form",
    endpoint: "/api/growth-clinic",
  },
  {
    name: "Work With Us form",
    route: "/katta-studio/work-with-us#application-form",
    formSelector: "#application-form form",
    endpoint: "/api/work-with-us",
  },
];

async function mockSuccessfulSubmission(page: Page, endpoint: string) {
  await page.route(`**${endpoint}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Mock submission accepted.",
      }),
    });
  });
}

async function submitForm(form: Locator) {
  await form
    .locator('button[type="submit"], input[type="submit"]')
    .last()
    .click();
}

async function prepareValidForm(form: Locator) {
  await fillRequiredFields(form);

  const isGrowthClinic =
    (await form.getAttribute("id")) === "growth-clinic-contact-form";

  const quickCheck = form
    .locator(
      'input[placeholder*="Enter the answer" i], input[type="number"][required]:visible',
    )
    .first();

  if (isGrowthClinic && (await quickCheck.count()) > 0) {
    await quickCheck.fill("9");
    await expect(quickCheck).toHaveValue("9");
  }

  // Some forms enforce a checkbox group in custom submit logic rather than
  // with the HTML `required` attribute. Select one option so the test reaches
  // the mocked endpoint instead of correctly stopping at custom validation.
  const interestOptions = form.locator('input[name="interests"]:visible');
  if ((await interestOptions.count()) > 0) {
    await interestOptions.first().check();
  }

  // WebKit can briefly restore an earlier controlled-input value while the
  // generic helper prepares the form. Refill and verify this required field
  // last so the Growth Clinic submission starts with stable valid data.
  if (isGrowthClinic) {
    const brandName = form.locator('input[name="brandName"]:visible').first();

    if ((await brandName.count()) > 0) {
      await brandName.fill("Automated preview test");
      await expect(brandName).toHaveValue("Automated preview test");
    }
  }
}

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const formCase of formCases) {
  test(`${formCase.name}: required validation blocks an empty submission`, async ({
    page,
  }) => {
    let apiRequests = 0;
    page.on("request", (request) => {
      if (new URL(request.url()).pathname === formCase.endpoint) {
        apiRequests += 1;
      }
    });

    await page.goto(formCase.route);
    const form = page.locator(formCase.formSelector).first();
    await expect(form).toBeVisible();

    await submitForm(form);

    expect(
      await form.evaluate((element) =>
        (element as HTMLFormElement).checkValidity(),
      ),
    ).toBe(false);
    expect(
      await form.locator(":invalid").count(),
      `${formCase.name} should expose at least one invalid required field`,
    ).toBeGreaterThan(0);
    expect(apiRequests).toBe(0);
  });

  test(`${formCase.name}: mocked successful submission reaches the success state`, async ({
    page,
  }) => {
    await mockSuccessfulSubmission(page, formCase.endpoint);
    await page.goto(formCase.route);

    const form = page.locator(formCase.formSelector).first();
    await expect(form).toBeVisible();
    await prepareValidForm(form);

    const requestPromise = page.waitForRequest((request) => {
      return (
        request.method() === "POST" &&
        new URL(request.url()).pathname === formCase.endpoint
      );
    });

    await submitForm(form);
    await requestPromise;

    await expect(
      page.getByText(/confirmation email is on its way/i).first(),
    ).toBeVisible();
  });

  test(`${formCase.name}: privacy link is present and correctly linked`, async ({
    page,
  }) => {
    await page.goto(formCase.route);
    const form = page.locator(formCase.formSelector).first();
    const privacyLink = form
      .getByRole("link", { name: "Privacy Policy" })
      .first();

    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveAttribute("href", "/privacy-policy");
  });
}

test("main contact form shows a server error without losing the page", async ({
  page,
}) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({
        success: false,
        message: "Mock server error for automated testing.",
      }),
    });
  });

  await page.goto("/contact");
  const form = page.locator("#main-content form").first();
  await fillRequiredFields(form);
  await submitForm(form);

  await expect(form.getByRole("alert")).toContainText("Mock server error");
  await expect(page.locator("main#main-content")).toBeVisible();
});

test("floating contact form validates and submits safely with a mocked API", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await mockSuccessfulSubmission(page, "/api/floating-contact");
  await page.goto("/");

  await page.getByRole("button", { name: "Open contact form" }).click();
  const dialog = page.getByRole("dialog", {
    name: "Let’s start a conversation.",
  });
  const form = dialog.locator("form");

  await submitForm(form);
  expect(
    await form.evaluate((element) =>
      (element as HTMLFormElement).checkValidity(),
    ),
  ).toBe(false);

  await fillRequiredFields(form);
  const requestPromise = page.waitForRequest((request) => {
    return (
      request.method() === "POST" &&
      new URL(request.url()).pathname === "/api/floating-contact"
    );
  });
  await submitForm(form);
  await requestPromise;

  await expect(
    dialog.getByText(/confirmation email is on its way/i),
  ).toBeVisible();
});