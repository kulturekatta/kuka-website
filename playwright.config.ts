import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.BASE_URL?.trim().replace(/\/$/, "");
const baseURL = externalBaseUrl || "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  // Netlify may challenge a burst of parallel automated requests. Keep the
  // deployed-preview run deliberately gentle while retaining normal local speed.
  fullyParallel: !externalBaseUrl,
  forbidOnly: Boolean(process.env.CI),
  retries: externalBaseUrl ? 1 : process.env.CI ? 1 : 0,
  workers: externalBaseUrl ? 1 : process.env.CI ? 2 : undefined,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: externalBaseUrl
    ? undefined
    : {
        command: "npm run dev",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
