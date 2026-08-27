import { expect, test, type Locator } from "@playwright/test";
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
  }

  const interestOptions = form.locator('input[name="interests"]:visible');

  if ((await interestOptions.count()) > 0) {
    await interestOptions.first().check();
  }

  if (isGrowthClinic) {
    const brandName = form.locator('input[name="brandName"]:visible').first();

    if ((await brandName.count()) > 0) {
      await brandName.fill("Automated preview test");
      await expect(brandName).toHaveValue("Automated preview test");
    }
  }
}

async function invalidFormControls(form: Locator) {
  return form.locator("input, select, textarea").evaluateAll((controls) =>
    controls.flatMap((control) => {
      const element = control as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;

      if (element.checkValidity()) {
        return [];
      }

      return [
        {
          name: element.name || element.id || element.tagName.toLowerCase(),
          label:
            element.labels?.[0]?.textContent?.replace(/\s+/g, " ").trim() || "",
          type:
            element instanceof HTMLInputElement
              ? element.type
              : element.tagName.toLowerCase(),
          value: element.value,
          validationMessage: element.validationMessage,
        },
      ];
    }),
  );
}

async function submitButton(form: Locator) {
  return form.locator('button[type="submit"], input[type="submit"]').last();
}

async function captureFormState(form: Locator) {
  return form.locator("input, select, textarea").evaluateAll((controls) =>
    controls.map((control, index) => {
      const element = control as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;

      const key = `${
        element.name || element.id || element.tagName.toLowerCase()
      }-${index}`;

      const type = (element as HTMLInputElement).type?.toLowerCase();

      if (type === "checkbox" || type === "radio") {
        return [key, (element as HTMLInputElement).checked] as const;
      }

      return [key, element.value] as const;
    }),
  );
}

async function findConsentCheckbox(form: Locator) {
  const checkboxes = form.locator('input[type="checkbox"]:visible');

  for (let index = 0; index < (await checkboxes.count()); index += 1) {
    const checkbox = checkboxes.nth(index);

    const context = await checkbox.evaluate((element) => {
      const input = element as HTMLInputElement;

      const label = input.id
        ? document.querySelector(`label[for="${CSS.escape(input.id)}"]`)
        : input.closest("label");

      const nearbyText =
        label?.textContent || input.parentElement?.textContent || "";

      return `${input.name} ${input.id} ${nearbyText}`
        .replace(/\s+/g, " ")
        .trim();
    });

    if (/consent|privacy|agree|permission|terms/i.test(context)) {
      return checkbox;
    }
  }

  return null;
}

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const formCase of formCases) {
  test(`@gap FORM-ERR ${formCase.name} retains entered data and focuses an error result`, async ({
    page,
  }) => {
    await page.route(`**${formCase.endpoint}`, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Mock gap server error. Please try again.",
        }),
      });
    });

    await page.goto(formCase.route);

    const form = page.locator(formCase.formSelector).first();

    await expect(form).toBeVisible();

    await prepareValidForm(form);

    const before = await captureFormState(form);

    await (await submitButton(form)).click();

    const alert = page
      .getByRole("alert")
      .filter({
        hasText: /error|try again|unable|went wrong/i,
      })
      .first();

    await expect(alert).toBeVisible();
    await expect(alert).toBeFocused();

    expect(await captureFormState(form)).toEqual(before);

    await expect(page.locator("main#main-content")).toBeVisible();
  });

  test(`@gap FORM-LOAD ${formCase.name} shows loading, disables submit and blocks duplicate requests`, async ({
    page,
  }) => {
    test.setTimeout(60_000);

    let requestCount = 0;

    await page.route(`**${formCase.endpoint}`, async (route) => {
      requestCount += 1;

      await new Promise((resolve) => setTimeout(resolve, 900));

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Mock submission accepted.",
        }),
      });
    });

    await page.goto(formCase.route);

    const form = page.locator(formCase.formSelector).first();

    await expect(form).toBeVisible();

    await prepareValidForm(form);

    const invalidControls = await invalidFormControls(form);

    expect(
      invalidControls,
      `${formCase.name} had invalid controls before submission:\n${JSON.stringify(
        invalidControls,
        null,
        2,
      )}`,
    ).toEqual([]);

    const button = await submitButton(form);

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    const [firstRequest] = await Promise.all([
      page.waitForRequest(
        (request) =>
          request.method() === "POST" &&
          new URL(request.url()).pathname === formCase.endpoint,
        {
          timeout: 30_000,
        },
      ),
      button.click(),
    ]);

    expect(firstRequest.method()).toBe("POST");

    await expect(button).toBeDisabled();

    const loadingLabel = await button.evaluate((element) =>
      element instanceof HTMLInputElement
        ? element.value
        : element.textContent || "",
    );

    expect(loadingLabel).toMatch(/sending|submitting|please wait|processing/i);

    await form.evaluate((element) =>
      (element as HTMLFormElement).requestSubmit(),
    );

    await expect(
      page.getByText(/confirmation email is on its way/i).first(),
    ).toBeVisible();

    expect(requestCount, `${formCase.name} submitted more than once`).toBe(1);
  });

  test(`@gap FORM-CONSENT ${formCase.name} blocks submission without consent`, async ({
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

    await prepareValidForm(form);

    const consent = await findConsentCheckbox(form);

    test.skip(
      !consent,
      `${formCase.name} has no identifiable consent checkbox`,
    );

    await consent?.uncheck();

    await (await submitButton(form)).click();

    await page.waitForTimeout(200);

    expect(apiRequests).toBe(0);

    const nativeInvalid = await form.evaluate(
      (element) => !(element as HTMLFormElement).checkValidity(),
    );

    const consentMessageVisible = await page
      .getByText(/consent|privacy|agree|permission|required/i)
      .evaluateAll(
        (elements) =>
          elements.filter((element) => {
            const style = window.getComputedStyle(element);

            const rect = element.getBoundingClientRect();

            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0
            );
          }).length,
      )
      .catch(() => 0);

    expect(
      nativeInvalid || consentMessageVisible > 0,
      `${formCase.name} blocked submission but did not expose a consent error`,
    ).toBe(true);
  });

  test(`@gap FORM-KEYBOARD ${formCase.name} submits with Enter and focuses the success result`, async ({
    page,
  }) => {
    await page.route(`**${formCase.endpoint}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Mock submission accepted.",
        }),
      });
    });

    await page.goto(formCase.route);

    const form = page.locator(formCase.formSelector).first();

    await expect(form).toBeVisible();

    await prepareValidForm(form);

    const textInput = form
      .locator(
        'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):visible',
      )
      .first();

    await textInput.focus();

    const requestPromise = page.waitForRequest(
      (request) =>
        request.method() === "POST" &&
        new URL(request.url()).pathname === formCase.endpoint,
    );

    await page.keyboard.press("Enter");

    await requestPromise;

    const success = page.getByText(/confirmation email is on its way/i).first();

    await expect(success).toBeVisible();
    await expect(success).toBeFocused();
  });
}

test("@gap FORM-FLOATING-PRIVACY floating contact form has a working Privacy Policy link", async ({
  page,
}) => {
  await page.setViewportSize({
    width: 1280,
    height: 900,
  });

  await page.goto("/");

  await page
    .getByRole("button", {
      name: "Open contact form",
    })
    .click();

  const dialog = page.getByRole("dialog", {
    name: "Let’s start a conversation.",
  });

  const privacyLink = dialog
    .getByRole("link", {
      name: "Privacy Policy",
    })
    .first();

  await expect(privacyLink).toBeVisible();

  await expect(privacyLink).toHaveAttribute("href", "/privacy-policy");
});