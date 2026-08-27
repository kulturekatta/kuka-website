import { expect, test } from "@playwright/test";

const endpoints = [
  "/api/contact",
  "/api/floating-contact",
  "/api/organization-inquiry",
  "/api/growth-clinic",
  "/api/work-with-us",
];

for (const endpoint of endpoints) {
  test(`@exhaustive API-HONEYPOT ${endpoint} absorbs a bot payload without email configuration`, async ({
    request,
  }) => {
    const response = await request.post(endpoint, {
      data: {
        formGuard: "filled-by-a-bot",
        startedAt: Date.now() - 10_000,
      },
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
  });
}

test("@exhaustive API-SPEED all forms reject implausibly fast submissions", async ({
  request,
}) => {
  for (const endpoint of endpoints) {
    await test.step(endpoint, async () => {
      const response = await request.post(endpoint, {
        data: {
          formGuard: "",
          startedAt: Date.now(),
        },
      });

      expect(response.status()).toBe(400);
      expect(await response.json()).toMatchObject({
        success: false,
        message: expect.stringMatching(/wait a moment/i),
      });
    });
  }
});

test("@exhaustive API-VALIDATION rejects missing fields, invalid email, and missing consent before delivery", async ({
  request,
}) => {
  const oldStart = Date.now() - 10_000;

  const missing = await request.post("/api/contact", {
    data: { formGuard: "", startedAt: oldStart },
  });
  expect(missing.status()).toBe(400);
  expect(await missing.json()).toMatchObject({
    success: false,
    message: expect.stringMatching(/required fields/i),
  });

  const invalidEmail = await request.post("/api/contact", {
    data: {
      name: "API test",
      email: "invalid-email",
      interest: "other",
      message: "Validation test",
      consent: true,
      formGuard: "",
      startedAt: oldStart,
    },
  });
  expect(invalidEmail.status()).toBe(400);
  expect(await invalidEmail.json()).toMatchObject({
    success: false,
    message: expect.stringMatching(/valid email/i),
  });

  const missingConsent = await request.post("/api/contact", {
    data: {
      name: "API test",
      email: "api-test@example.com",
      interest: "other",
      message: "Validation test",
      consent: false,
      formGuard: "",
      startedAt: oldStart,
    },
  });
  expect(missingConsent.status()).toBe(400);
  expect(await missingConsent.json()).toMatchObject({
    success: false,
    message: expect.stringMatching(/consent/i),
  });

  const missingPortfolio = await request.post("/api/work-with-us", {
    data: {
      fullName: "API test",
      city: "Pune",
      email: "api-test@example.com",
      opportunityType: "collaboration",
      workArrangement: "remote",
      availability: "Available",
      experience: "Relevant experience",
      message: "Application",
      consent: true,
      formGuard: "",
      startedAt: oldStart,
    },
  });
  expect(missingPortfolio.status()).toBe(400);
  expect(await missingPortfolio.json()).toMatchObject({
    success: false,
    message: expect.stringMatching(/required fields/i),
  });

  const invalidPortfolio = await request.post("/api/work-with-us", {
    data: {
      fullName: "API test",
      city: "Pune",
      email: "api-test@example.com",
      opportunityType: "collaboration",
      workArrangement: "remote",
      availability: "Available",
      portfolioLink: "not a public URL",
      experience: "Relevant experience",
      message: "Application",
      consent: true,
      formGuard: "",
      startedAt: oldStart,
    },
  });
  expect(invalidPortfolio.status()).toBe(400);
  expect(await invalidPortfolio.json()).toMatchObject({
    success: false,
    message: expect.stringMatching(/valid public portfolio/i),
  });
});
