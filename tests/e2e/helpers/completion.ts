import { expect, type Locator, type Page } from "@playwright/test";
import { fillRequiredFields } from "./site";

export type CompletionFormCase = {
  name: string;
  route: string;
  selector: string;
  endpoint: string;
  floating?: boolean;
  phoneField: "phone" | "mobile";
};

export const mainCompletionFormCases: CompletionFormCase[] = [
  {
    name: "main contact",
    route: "/contact",
    selector: "#main-content form",
    endpoint: "/api/contact",
    phoneField: "phone",
  },
  {
    name: "organization inquiry",
    route: "/for-organizations#organization-inquiry",
    selector: "#organization-inquiry form",
    endpoint: "/api/organization-inquiry",
    phoneField: "phone",
  },
  {
    name: "Growth Clinic",
    route: "/katta-studio#growth-clinic-form",
    selector: "#growth-clinic-contact-form",
    endpoint: "/api/growth-clinic",
    phoneField: "mobile",
  },
  {
    name: "Work With Us",
    route: "/katta-studio/work-with-us#application-form",
    selector: "#application-form form",
    endpoint: "/api/work-with-us",
    phoneField: "phone",
  },
];

export const completionFormCases: CompletionFormCase[] = [
  ...mainCompletionFormCases,
  {
    name: "floating contact",
    route: "/",
    selector: '[role="dialog"][aria-labelledby="floating-contact-title"] form',
    endpoint: "/api/floating-contact",
    floating: true,
    phoneField: "phone",
  },
];

export async function openCompletionForm(
  page: Page,
  formCase: CompletionFormCase,
) {
  if (formCase.floating) {
    await page.setViewportSize({ width: 1280, height: 900 });
  }

  await page.goto(formCase.route, { waitUntil: "domcontentloaded" });

  if (formCase.floating) {
    const dialog = page.getByRole("dialog", {
      name: "Let’s start a conversation.",
    });

    const shouldResume = await page.evaluate(
      () =>
        window.sessionStorage.getItem(
          "kuka-floating-contact-resume-path-v1",
        ) === window.location.pathname,
    );

    if (shouldResume) {
      await expect(dialog).toBeVisible();
    } else if (!(await dialog.isVisible())) {
      await page.getByRole("button", { name: "Open contact form" }).click();
    }
  }

  const form = page.locator(formCase.selector).first();
  await expect(form, `${formCase.name} form did not open`).toBeVisible();
  return form;
}

export async function prepareValidCompletionForm(form: Locator) {
  await fillRequiredFields(form);

  const quickCheck = form
    .locator(
      'input[placeholder*="Enter the answer" i], input[type="number"][required]:visible',
    )
    .first();
  if ((await quickCheck.count()) > 0) {
    await quickCheck.fill("9");
  }

  const interests = form.locator('input[name="interests"]:visible');
  if ((await interests.count()) > 0) {
    await interests.first().check();
  }

  const brandName = form.locator('input[name="brandName"]:visible').first();
  if ((await brandName.count()) > 0) {
    await brandName.fill("Automated completion test");
  }
}

export function completionSubmitButton(form: Locator) {
  return form.locator('button[type="submit"], input[type="submit"]').last();
}

export async function expectCompletionSuccess(page: Page) {
  await expect(
    page.getByText(/confirmation email is on its way/i).first(),
  ).toBeVisible();
}

export function withoutSubmissionTiming(payload: Record<string, unknown>) {
  const copy = { ...payload };
  delete copy.startedAt;
  return copy;
}

export async function completionLayoutIssues(page: Page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const selectors = [
      "header",
      "main#main-content h1",
      "main#main-content h2",
      "main#main-content h3",
      "main#main-content p",
      "main#main-content img",
      "main#main-content form",
      "main#main-content input",
      "main#main-content select",
      "main#main-content textarea",
      "main#main-content button",
      "main#main-content a",
      "footer",
      "footer a",
      "footer button",
    ];

    const clipped = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(",")),
    )
      .filter((element) => {
        if (element.closest('[aria-hidden="true"]')) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          Number.parseFloat(style.opacity || "1") > 0 &&
          style.position !== "fixed" &&
          rect.width > 0 &&
          rect.height > 0 &&
          (rect.left < -1 || rect.right > viewportWidth + 1)
        );
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          name:
            element.getAttribute("name") ||
            element.textContent?.replace(/\s+/g, " ").trim().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          viewportWidth,
        };
      });

    return {
      viewportWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      clipped,
    };
  });
}
