import { expect, test, type Locator } from "@playwright/test";
import { fillRequiredFields, preparePage } from "./helpers/site";

type FormCase = {
  name: string;
  route: string;
  selector: string;
  endpoint: string;
};

type SequentialFormCase = FormCase & {
  open?: (page: import("@playwright/test").Page) => Promise<void>;
  prepareForAnother?: (page: import("@playwright/test").Page) => Promise<void>;
};

const formCases: FormCase[] = [
  {
    name: "main contact",
    route: "/contact",
    selector: "#main-content form",
    endpoint: "/api/contact",
  },
  {
    name: "organization inquiry",
    route: "/for-organizations#organization-inquiry",
    selector: "#organization-inquiry form",
    endpoint: "/api/organization-inquiry",
  },
  {
    name: "Growth Clinic",
    route: "/katta-studio#growth-clinic-form",
    selector: "#growth-clinic-contact-form",
    endpoint: "/api/growth-clinic",
  },
  {
    name: "Work With Us",
    route: "/katta-studio/work-with-us#application-form",
    selector: "#application-form form",
    endpoint: "/api/work-with-us",
  },
];

const sequentialFormCases: SequentialFormCase[] = [
  ...formCases.map((formCase) =>
    formCase.name === "organization inquiry"
      ? {
          ...formCase,
          prepareForAnother: async (page: import("@playwright/test").Page) => {
            await page.getByRole("button", { name: "Submit Another Inquiry" }).click();
          },
        }
      : formCase,
  ),
  {
    name: "floating contact",
    route: "/",
    selector: '[role="dialog"][aria-labelledby="floating-contact-title"] form',
    endpoint: "/api/floating-contact",
    open: async (page) => {
      await page.getByRole("button", { name: "Open contact form" }).click();
    },
  },
];

async function prepareValidForm(form: Locator) {
  await fillRequiredFields(form);

  const quickCheck = form
    .locator('input[placeholder*="Enter the answer" i], input[type="number"][required]:visible')
    .first();
  if ((await quickCheck.count()) > 0) {
    await quickCheck.fill("9");
  }

  const interestOptions = form.locator('input[name="interests"]:visible');
  if ((await interestOptions.count()) > 0) {
    await interestOptions.first().check();
  }

  const brandName = form.locator('input[name="brandName"]:visible').first();
  if ((await brandName.count()) > 0) {
    await brandName.fill("Automated exhaustive test");
    await expect(brandName).toHaveValue("Automated exhaustive test");
  }
}

function submitButton(form: Locator) {
  return form.locator('button[type="submit"], input[type="submit"]').last();
}

function userPayload(payload: Record<string, unknown>) {
  const userFields = { ...payload };
  delete userFields.startedAt;
  return userFields;
}

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const formCase of formCases) {
  test(`@exhaustive FORM-EMAIL ${formCase.name} rejects an invalid email and accepts the correction`, async ({
    page,
  }) => {
    let requestCount = 0;
    await page.route(`**${formCase.endpoint}`, async (route) => {
      requestCount += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Mock accepted." }),
      });
    });

    await page.goto(formCase.route);
    const form = page.locator(formCase.selector).first();
    await prepareValidForm(form);

    const email = form.locator('input[type="email"]:visible').first();
    await email.fill("not-an-email");
    await submitButton(form).click();

    expect(await email.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(false);
    expect(requestCount).toBe(0);

    await email.fill("corrected@example.com");
    const request = page.waitForRequest(
      (candidate) => new URL(candidate.url()).pathname === formCase.endpoint,
    );
    await submitButton(form).click();
    await request;
    expect(requestCount).toBe(1);
  });
}

for (const formCase of formCases) {
  test(`@exhaustive FORM-CHAR ${formCase.name} preserves line breaks and special characters in its JSON payload`, async ({
    page,
  }) => {
    const specialText = `Vidula's café & façade\n<script>alert("text only")</script>`;

    await page.goto(formCase.route);
    const form = page.locator(formCase.selector).first();
    await prepareValidForm(form);

    const textarea = form.locator("textarea:visible").first();
    const fieldName = await textarea.getAttribute("name");
    expect(fieldName).toBeTruthy();
    await textarea.fill(specialText);

    let capturedPayload: Record<string, unknown> | null = null;
    await page.route(`**${formCase.endpoint}`, async (route) => {
      capturedPayload = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Mock accepted." }),
      });
    });

    await submitButton(form).click();
    await expect(page.getByText(/confirmation email is on its way/i).first()).toBeVisible();
    expect(capturedPayload?.[fieldName ?? ""]).toBe(specialText);
    await expect(page.locator("script").filter({ hasText: "text only" })).toHaveCount(0);
  });
}

test("@exhaustive FORM-LINK Work With Us is link-only and validates its portfolio field as a URL", async ({
  page,
}) => {
  await page.goto("/katta-studio/work-with-us#application-form");
  const form = page.locator("#application-form form");

  await expect(form.locator('input[type="file"]')).toHaveCount(0);
  const portfolio = form.locator('input[name="portfolioLink"]');
  await expect(portfolio).toHaveAttribute("type", "url");

  await portfolio.fill("not a public link");
  expect(await portfolio.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(false);
  await portfolio.fill("https://example.com/portfolio");
  expect(await portfolio.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(true);
});

test("@exhaustive FORM-SEMANTICS email, phone and URL fields expose browser-friendly input attributes", async ({
  page,
}) => {
  for (const formCase of formCases) {
    await test.step(formCase.name, async () => {
      await page.goto(formCase.route, { waitUntil: "domcontentloaded" });
      const form = page.locator(formCase.selector).first();
      const emails = form.locator('input[type="email"]');
      await expect(emails.first()).toHaveAttribute("autocomplete", "email");

      const phones = form.locator('input[type="tel"]');
      for (let index = 0; index < (await phones.count()); index += 1) {
        await expect(phones.nth(index)).toHaveAttribute("autocomplete", "tel");
      }

      const urls = form.locator('input[type="url"]');
      for (let index = 0; index < (await urls.count()); index += 1) {
        await expect(urls.nth(index)).toHaveAttribute("autocomplete", "url");
      }
    });
  }
});

test("@exhaustive FORM-RETURN main Contact data survives a Privacy Policy visit and browser Back", async ({
  page,
}) => {
  await page.goto("/contact");
  const form = page.locator("#main-content form").first();
  await form.locator('input[name="name"]').fill("Return-state test");
  await form.locator('input[name="email"]').fill("return@example.com");
  await form.locator('textarea[name="message"]').fill("Please keep this text.");

  await form.getByRole("link", { name: "Privacy Policy" }).click();
  await expect(page).toHaveURL(/\/privacy-policy$/);
  await page.goBack();

  await expect(form.locator('input[name="name"]')).toHaveValue("Return-state test");
  await expect(form.locator('input[name="email"]')).toHaveValue("return@example.com");
  await expect(form.locator('textarea[name="message"]')).toHaveValue("Please keep this text.");
});

test("@exhaustive FORM-FLOAT-ERR floating contact retains data and focuses a server error", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.route("**/api/floating-contact", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ success: false, message: "Temporary floating-form failure." }),
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Open contact form" }).click();

  const dialog = page.getByRole("dialog", { name: "Let’s start a conversation." });
  const form = dialog.locator("form");
  await prepareValidForm(form);
  const name = form.locator('input[name="name"]');
  await name.fill("Floating retention test");
  await submitButton(form).click();

  const alert = dialog.getByRole("alert");
  await expect(alert).toContainText("Temporary floating-form failure");
  await expect(alert).toBeFocused();
  await expect(name).toHaveValue("Floating retention test");
});

test("@exhaustive FORM-FLOAT-LOAD floating contact disables submit and prevents duplicate requests", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  let requests = 0;
  await page.route("**/api/floating-contact", async (route) => {
    requests += 1;
    await new Promise((resolve) => setTimeout(resolve, 700));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "Mock accepted." }),
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Open contact form" }).click();
  const form = page.getByRole("dialog", { name: "Let’s start a conversation." }).locator("form");
  await prepareValidForm(form);
  const button = submitButton(form);

  const firstRequest = page.waitForRequest((request) =>
    new URL(request.url()).pathname.endsWith("/api/floating-contact"),
  );
  await button.click();
  await firstRequest;
  await expect(button).toBeDisabled();
  await form.evaluate((element) => (element as HTMLFormElement).requestSubmit());
  await expect(page.getByText(/confirmation email is on its way/i).first()).toBeVisible();
  expect(requests).toBe(1);
});

for (const formCase of sequentialFormCases) {
  test(`@exhaustive FORM-REPEAT ${formCase.name} accepts the same user data again after the first request completes`, async ({
    page,
  }) => {
    const payloads: Array<Record<string, unknown>> = [];
    await page.route(`**${formCase.endpoint}`, async (route) => {
      payloads.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Mock accepted." }),
      });
    });

    await page.goto(formCase.route);
    await formCase.open?.(page);
    let form = page.locator(formCase.selector).first();
    await prepareValidForm(form);
    await submitButton(form).click();
    await expect.poll(() => payloads.length).toBe(1);
    await expect(page.getByText(/confirmation email is on its way/i).first()).toBeVisible();

    await formCase.prepareForAnother?.(page);
    form = page.locator(formCase.selector).first();
    await prepareValidForm(form);
    await submitButton(form).click();
    await expect.poll(() => payloads.length).toBe(2);

    expect(userPayload(payloads[1])).toEqual(userPayload(payloads[0]));
  });
}

test("@exhaustive FORM-OFFLINE main Contact retains data offline and succeeds after reconnecting", async ({
  context,
  page,
}) => {
  await page.goto("/contact");
  const form = page.locator("#main-content form").first();
  await prepareValidForm(form);
  const message = form.locator('textarea[name="message"]');
  await message.fill("Keep this text through an offline retry.");

  await context.setOffline(true);
  await submitButton(form).click();
  const alert = form.getByRole("alert");
  await expect(alert).toBeVisible();
  await expect(alert).toBeFocused();
  await expect(message).toHaveValue("Keep this text through an offline retry.");

  await context.setOffline(false);
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "Mock accepted after reconnect." }),
    });
  });
  await submitButton(form).click();
  await expect(page.getByText(/confirmation email is on its way/i).first()).toBeVisible();
});

test("@exhaustive FORM-MOBILE visible fields and controls stay inside a 390px viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const formCase of formCases) {
    await test.step(formCase.name, async () => {
      await page.goto(formCase.route, { waitUntil: "domcontentloaded" });
      const form = page.locator(formCase.selector).first();
      await expect(form).toBeVisible();

      const issues = await form.locator("input:visible, select:visible, textarea:visible, button:visible, a:visible").evaluateAll(
        (controls) => {
          const width = document.documentElement.clientWidth;
          return controls.flatMap((control) => {
            if (control.closest('[aria-hidden="true"]') || control.getAttribute("tabindex") === "-1") {
              return [];
            }
            const rect = control.getBoundingClientRect();
            if (rect.left >= -1 && rect.right <= width + 1) return [];
            return [{
              control: control.getAttribute("name") || control.textContent?.trim() || control.tagName,
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width,
            }];
          });
        },
      );
      expect(issues, `${formCase.name} has controls outside the viewport`).toEqual([]);
    });
  }
});
