import { expect, test } from "@playwright/test";
import { fillRequiredFields, preparePage } from "./helpers/site";

const allowRealSubmission = process.env.ALLOW_REAL_FORM_SUBMISSION === "1";
const realTestEmail = process.env.REAL_TEST_EMAIL;

test.skip(
  !allowRealSubmission || !realTestEmail,
  "Set ALLOW_REAL_FORM_SUBMISSION=1 and REAL_TEST_EMAIL before running this controlled smoke test.",
);

test("one real contact submission succeeds on the deployed environment", async ({ page }) => {
  await preparePage(page);
  await page.goto("/contact");

  const form = page.locator("#main-content form").first();
  await fillRequiredFields(form);
  await form.locator('input[name="name"]').fill("KultureKatta automated preview smoke test");
  await form.locator('input[name="email"]').fill(realTestEmail as string);
  await form
    .locator('textarea[name="message"]')
    .fill("Automated Netlify preview stabilization test. Please ignore this message.");

  await form.locator('button[type="submit"]').click();
  await expect(page.getByText(/confirmation email is on its way/i)).toBeVisible({
    timeout: 30_000,
  });
});
