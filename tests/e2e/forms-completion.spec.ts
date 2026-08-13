import { expect, test, type Locator, type Page } from "@playwright/test";
import {
  completionFormCases,
  completionSubmitButton,
  expectCompletionSuccess,
  mainCompletionFormCases,
  openCompletionForm,
  prepareValidCompletionForm,
  type CompletionFormCase,
  withoutSubmissionTiming,
} from "./helpers/completion";
import { preparePage } from "./helpers/site";

// Firefox on a remote preview can spend longer creating a fresh page after a
// deliberately aborted request. Keep the assertion timeouts strict while
// allowing the browser fixture enough time to recover cleanly.
test.describe.configure({ timeout: 90_000 });

async function advanceFocus(
  page: Page,
  locator: Locator,
  browserName: string,
) {
  if (browserName === "webkit") {
    // Playwright's Windows WebKit build does not expose Safari's system-level
    // full-keyboard-access preference. Enter keyboard modality, then verify
    // that the next DOM-ordered control accepts focus directly.
    await page.keyboard.press("Tab");
    await locator.focus();
    return;
  }

  await page.keyboard.press("Tab");
}

async function fillReturnMarkers(form: Locator, marker: string) {
  const firstTextInput = form
    .locator(
      'input[type="text"]:visible:not([name="formGuard"]), input[type="email"]:visible',
    )
    .first();
  const textarea = form.locator("textarea:visible").first();
  await firstTextInput.fill(marker);
  await textarea.fill(`${marker} — textarea`);
  return {
    inputName: await firstTextInput.getAttribute("name"),
    textareaName: await textarea.getAttribute("name"),
  };
}

async function expectReturnMarkers(
  page: Page,
  formCase: CompletionFormCase,
  marker: string,
  inputName: string | null,
  textareaName: string | null,
) {
  const form = page.locator(formCase.selector).first();
  await expect(form, `${formCase.name} did not remain available after Back`).toBeVisible();
  await expect(form.locator(`[name="${inputName}"]`)).toHaveValue(marker);
  await expect(form.locator(`[name="${textareaName}"]`)).toHaveValue(
    `${marker} — textarea`,
  );
}

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

for (const formCase of completionFormCases) {
  test(`@completion FORM-002 ${formCase.name} rejects an invalid phone and accepts its correction`, async ({
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

    const form = await openCompletionForm(page, formCase);
    await prepareValidCompletionForm(form);
    const phone = form.locator(`input[name="${formCase.phoneField}"]`).first();

    await phone.fill("not-a-phone-number");
    expect(
      await phone.evaluate((input: HTMLInputElement) => input.validity.valid),
      `${formCase.name} accepts an invalid phone string`,
    ).toBe(false);
    await completionSubmitButton(form).click();
    expect(requestCount).toBe(0);

    await phone.fill("+91 98765 43210");
    expect(await phone.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(
      true,
    );
    await completionSubmitButton(form).click();
    await expectCompletionSuccess(page);
    expect(requestCount).toBe(1);
  });
}

for (const formCase of completionFormCases) {
  test(`@completion FORM-002 ${formCase.name} rejects an invalid email and accepts its correction`, async ({
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

    const form = await openCompletionForm(page, formCase);
    await prepareValidCompletionForm(form);
    const email = form.locator('input[type="email"]').first();

    await email.fill("not-an-email");
    expect(await email.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(
      false,
    );
    await completionSubmitButton(form).click();
    expect(requestCount).toBe(0);
    await expect(email).toHaveAttribute("aria-invalid", "true");

    await email.fill("corrected@example.com");
    expect(await email.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(
      true,
    );
    await completionSubmitButton(form).click();
    await expectCompletionSuccess(page);
    expect(requestCount).toBe(1);
  });
}

test("@completion FORM-004 every form blocks submission without mandatory consent", async ({
  page,
}) => {
  test.setTimeout(180_000);

  for (const formCase of completionFormCases) {
    await test.step(formCase.name, async () => {
      let requestCount = 0;
      await page.route(`**${formCase.endpoint}`, async (route) => {
        requestCount += 1;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true }),
        });
      });

      const form = await openCompletionForm(page, formCase);
      await prepareValidCompletionForm(form);
      const consent = form.locator('input[name="consent"][type="checkbox"]').first();
      await expect(consent).toBeChecked();
      await consent.uncheck();
      await completionSubmitButton(form).click();

      expect(requestCount, `${formCase.name} sent without consent`).toBe(0);
      expect(
        await consent.evaluate((input: HTMLInputElement) => input.validity.valueMissing),
      ).toBe(true);
      await expect(consent).toBeFocused();
    });
  }
});

test("@completion FORM-011 every form accepts a later valid enquiry from the same email", async ({
  page,
}) => {
  test.setTimeout(240_000);

  for (const formCase of completionFormCases) {
    await test.step(formCase.name, async () => {
      const payloads: Array<Record<string, unknown>> = [];
      await page.route(`**${formCase.endpoint}`, async (route) => {
        payloads.push(route.request().postDataJSON() as Record<string, unknown>);
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, message: "Mock accepted." }),
        });
      });

      let form = await openCompletionForm(page, formCase);
      await prepareValidCompletionForm(form);
      const email = form.locator('input[type="email"]').first();
      const emailPayloadKey = await email.getAttribute("name");
      expect(emailPayloadKey, `${formCase.name} email field has no name`).toBeTruthy();
      await email.fill("repeat@example.com");
      await completionSubmitButton(form).click();
      await expectCompletionSuccess(page);
      await expect.poll(() => payloads.length).toBe(1);

      const submitAnother = page.getByRole("button", { name: "Submit Another Inquiry" });
      if (await submitAnother.isVisible()) {
        await submitAnother.click();
        form = page.locator(formCase.selector).first();
        await expect(form).toBeVisible();
      }

      await prepareValidCompletionForm(form);
      await form.locator('input[type="email"]').first().fill("repeat@example.com");
      await completionSubmitButton(form).click();
      await expect.poll(() => payloads.length).toBe(2);
      expect(payloads.map((payload) => payload[emailPayloadKey ?? ""])).toEqual([
        "repeat@example.com",
        "repeat@example.com",
      ]);
    });
  }
});

test("@completion FORM-012 Enter submits once and focuses the result on mobile and desktop", async ({
  page,
}) => {
  test.setTimeout(300_000);

  for (const viewport of [
    { name: "mobile", width: 390, height: 844, forms: mainCompletionFormCases },
    { name: "desktop", width: 1366, height: 900, forms: completionFormCases },
  ]) {
    for (const formCase of viewport.forms) {
      await test.step(`${viewport.name}: ${formCase.name}`, async () => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.unrouteAll({ behavior: "ignoreErrors" });
        let requestCount = 0;
        await page.route(`**${formCase.endpoint}`, async (route) => {
          requestCount += 1;
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ success: true, message: "Mock accepted." }),
          });
        });

        const form = await openCompletionForm(page, formCase);
        await prepareValidCompletionForm(form);
        await form.locator('input[type="email"]').first().press("Enter");

        await expectCompletionSuccess(page);
        expect(requestCount).toBe(1);
        await expect(page.locator('[role="status"][tabindex="-1"]').last()).toBeFocused();
      });
    }
  }
});

test("@completion FORM-LINKS Work With Us validates the shared portfolio/résumé field and remains upload-free", async ({
  page,
}) => {
  const formCase = mainCompletionFormCases.find(
    (candidate) => candidate.name === "Work With Us",
  );
  expect(formCase).toBeTruthy();
  const form = await openCompletionForm(page, formCase!);
  await expect(form.locator('input[type="file"]')).toHaveCount(0);

  const link = form.locator('input[name="portfolioLink"]');
  await expect(link).toHaveAttribute("type", "url");
  await expect(link).toHaveAccessibleName(/portfolio.*résumé.*work-sample link/i);
  await link.fill("not a public URL");
  expect(await link.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(
    false,
  );
  await link.fill("https://example.com/public-resume");
  expect(await link.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(
    true,
  );
});

test("@completion FORM-LONG every form preserves long multilingual and script-like text exactly as plain payload text", async ({
  page,
}) => {
  test.setTimeout(180_000);

  for (const formCase of completionFormCases) {
    await test.step(formCase.name, async () => {
      const form = await openCompletionForm(page, formCase);
      await prepareValidCompletionForm(form);
      const textarea = form.locator("textarea:visible").first();
      const fieldName = await textarea.getAttribute("name");
      expect(fieldName).toBeTruthy();

      const maximum = await textarea.evaluate(
        (element: HTMLTextAreaElement) => element.maxLength,
      );
      const targetLength = maximum > 0 ? Math.min(maximum, 900) : 900;
      const seed = `Vidula's café & façade — नमस्ते & culture\nSecond line stays intact.\n<script>window.__kukaInjected = true</script>\n`;
      const longText = seed.padEnd(targetLength, "Long-form text & café. ").slice(0, targetLength);
      await textarea.fill(longText);

      let payload: Record<string, unknown> | null = null;
      await page.route(`**${formCase.endpoint}`, async (route) => {
        payload = route.request().postDataJSON() as Record<string, unknown>;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, message: "Mock accepted." }),
        });
      });

      await completionSubmitButton(form).click();
      await expectCompletionSuccess(page);
      expect(payload?.[fieldName ?? ""]).toBe(longText);
      expect(await page.evaluate(() => (window as typeof window & { __kukaInjected?: boolean }).__kukaInjected)).not.toBe(true);
      await page.unroute(`**${formCase.endpoint}`);
    });
  }
});

for (const formCase of completionFormCases) {
  test(`@completion FORM-ABORT-RETRY ${formCase.name} retains data and sends exactly one success after an aborted request`, async ({
    page,
  }) => {
    let attempts = 0;
    let successfulRequests = 0;
    const payloads: Array<Record<string, unknown>> = [];
    await page.route(`**${formCase.endpoint}`, async (route) => {
      attempts += 1;
      payloads.push(route.request().postDataJSON() as Record<string, unknown>);
      if (attempts === 1) {
        await route.abort("connectionreset");
        return;
      }
      successfulRequests += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Mock accepted after retry." }),
      });
    });

    const form = await openCompletionForm(page, formCase);
    await prepareValidCompletionForm(form);
    const markerField = form
      .locator('input[type="text"]:visible:not([name="formGuard"])')
      .first();
    await markerField.fill("Retain me after abort");

    await completionSubmitButton(form).click();
    const alert = form.getByRole("alert");
    await expect(alert).toBeVisible();
    await expect(alert).toBeFocused();
    await expect(markerField).toHaveValue("Retain me after abort");

    await completionSubmitButton(form).click();
    await expectCompletionSuccess(page);
    expect(attempts).toBe(2);
    expect(successfulRequests).toBe(1);
    expect(withoutSubmissionTiming(payloads[1])).toEqual(
      withoutSubmissionTiming(payloads[0]),
    );
  });
}

for (const formCase of completionFormCases) {
  test(`@completion FORM-RETURN ${formCase.name} retains entered data after Privacy and Terms visits`, async ({
    context,
  }) => {
    for (const destination of ["privacy", "terms"] as const) {
      await test.step(destination, async () => {
        const stepPage = await context.newPage();
        await preparePage(stepPage);

        try {
          const form = await openCompletionForm(stepPage, formCase);
          const marker = `${formCase.name} ${destination} return`;
          const { inputName, textareaName } = await fillReturnMarkers(form, marker);

          if (destination === "privacy") {
            await Promise.all([
              stepPage.waitForURL(/\/privacy-policy$/, {
                waitUntil: "domcontentloaded",
              }),
              form.getByRole("link", { name: "Privacy Policy" }).click(),
            ]);
          } else {
            await stepPage.goto("/terms-of-use");
          }

          await stepPage.goBack();
          if (formCase.floating) {
            await expect(
              stepPage.getByRole("dialog", { name: "Let’s start a conversation." }),
            ).toBeVisible();
          }
          await expectReturnMarkers(
            stepPage,
            formCase,
            marker,
            inputName,
            textareaName,
          );
        } finally {
          await stepPage.close();
        }
      });
    }
  });
}

test("@completion FORM-VALIDATION every form focuses and describes its first invalid field", async ({
  page,
}) => {
  test.setTimeout(150_000);

  for (const formCase of completionFormCases) {
    await test.step(formCase.name, async () => {
      const form = await openCompletionForm(page, formCase);
      const firstInvalid = form
        .locator("input:invalid:visible, select:invalid:visible, textarea:invalid:visible")
        .first();
      await expect(firstInvalid).toBeVisible();
      await completionSubmitButton(form).click();
      await expect(firstInvalid).toBeFocused();
      await expect(firstInvalid).toHaveAttribute("aria-invalid", "true");

      const describedBy = await firstInvalid.getAttribute("aria-describedby");
      expect(describedBy, `${formCase.name} first invalid field has no aria-describedby`).toBeTruthy();
      for (const id of (describedBy || "").split(/\s+/).filter(Boolean)) {
        const message = page.locator(`[id="${id}"]`);
        await expect(message, `${formCase.name} is missing #${id}`).toBeVisible();
        await expect(message).not.toHaveText("");
      }
    });
  }
});

test("@completion FORM-MOBILE valid and invalid flows work at 390x844 without sending real submissions", async ({
  page,
}) => {
  test.setTimeout(180_000);
  await page.setViewportSize({ width: 390, height: 844 });

  for (const formCase of mainCompletionFormCases) {
    await test.step(formCase.name, async () => {
      let requests = 0;
      await page.route(`**${formCase.endpoint}`, async (route) => {
        requests += 1;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, message: "Mock mobile success." }),
        });
      });

      const form = await openCompletionForm(page, formCase);
      const firstInvalid = form
        .locator("input:invalid:visible, select:invalid:visible, textarea:invalid:visible")
        .first();
      await completionSubmitButton(form).click();
      await expect(firstInvalid).toBeFocused();
      expect(requests).toBe(0);

      await prepareValidCompletionForm(form);
      await completionSubmitButton(form).click();
      await expectCompletionSuccess(page);
      expect(requests).toBe(1);
    });
  }
});

test("@completion FORM-INPUT-METADATA email, phone and URL fields expose type, inputmode and autocomplete", async ({
  page,
}) => {
  for (const formCase of completionFormCases) {
    await test.step(formCase.name, async () => {
      const form = await openCompletionForm(page, formCase);
      for (const [type, autocomplete, inputmode] of [
        ["email", "email", "email"],
        ["tel", "tel", "tel"],
        ["url", "url", "url"],
      ] as const) {
        const inputs = form.locator(`input[type="${type}"]`);
        for (let index = 0; index < (await inputs.count()); index += 1) {
          const input = inputs.nth(index);
          await expect(input).toHaveAttribute("autocomplete", autocomplete);
          await expect(input).toHaveAttribute("inputmode", inputmode);
        }
      }
    });
  }
});

test("@completion FORM-DESKTOP-TAB visible controls follow DOM order at 1366px", async ({
  browserName,
  page,
}) => {
  test.setTimeout(180_000);
  await page.setViewportSize({ width: 1366, height: 900 });

  for (const formCase of completionFormCases) {
    await test.step(formCase.name, async () => {
      const form = await openCompletionForm(page, formCase);
      const controls = form.locator(
        'input:visible:not([tabindex="-1"]), select:visible, textarea:visible, a[href]:visible, button:visible:not([disabled])',
      );
      const count = await controls.count();
      expect(count).toBeGreaterThan(3);
      await controls.first().focus();
      await expect(controls.first()).toBeFocused();

      for (let index = 1; index < count; index += 1) {
        await advanceFocus(page, controls.nth(index), browserName);
        await expect(
          controls.nth(index),
          `${formCase.name} tab order diverged at control ${index + 1}`,
        ).toBeFocused();
      }
    });
  }
});

test("@completion FORM-LIVE-REGIONS every form exposes assertive errors and polite success results", async ({
  page,
}) => {
  test.setTimeout(180_000);

  for (const formCase of completionFormCases) {
    await test.step(formCase.name, async () => {
      let attempts = 0;
      await page.route(`**${formCase.endpoint}`, async (route) => {
        attempts += 1;
        await route.fulfill({
          status: attempts === 1 ? 503 : 200,
          contentType: "application/json",
          body: JSON.stringify(
            attempts === 1
              ? { success: false, message: "Mock completion failure." }
              : { success: true, message: "Mock completion success." },
          ),
        });
      });

      const form = await openCompletionForm(page, formCase);
      await prepareValidCompletionForm(form);
      await completionSubmitButton(form).click();
      const alert = page.locator('[role="alert"][tabindex="-1"]').last();
      await expect(alert).toHaveAttribute("aria-live", "assertive");
      await expect(alert).toBeFocused();

      await completionSubmitButton(form).click();
      const status = page.locator('[role="status"][tabindex="-1"]').last();
      await expect(status).toHaveAttribute("aria-live", "polite");
      await expect(status).toBeFocused();
      await page.unroute(`**${formCase.endpoint}`);
    });
  }
});
