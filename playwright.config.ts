import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.BASE_URL?.trim().replace(/\/$/, "");
const baseURL = externalBaseUrl || "http://localhost:3000";
const isCI = Boolean(process.env.CI);
const chromiumExecutablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?.trim();

export default defineConfig({
  testDir: "./tests/e2e",

  // Keep deployed-preview and CI runs deliberately sequential. This avoids
  // Netlify challenge responses and prevents interactive tests from competing
  // for a single Next.js server during hydration.
  fullyParallel: !externalBaseUrl && !isCI,
  forbidOnly: isCI,
  retries: externalBaseUrl || isCI ? 1 : 0,
  workers: externalBaseUrl || isCI ? 1 : undefined,

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
    video: chromiumExecutablePath ? "off" : "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: chromiumExecutablePath
          ? { executablePath: chromiumExecutablePath }
          : undefined,
      },
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
        // CI tests the same production mode used for deployment. Local
        // development keeps the faster dev server unless BASE_URL is supplied.
        command: isCI ? "npm run start" : "npm run dev",
        url: baseURL,
        reuseExistingServer: !isCI,
        timeout: 180_000,
      },
});
