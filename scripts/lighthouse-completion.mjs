import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";
import { launch } from "chrome-launcher";
import lighthouse, {
  defaultConfig,
  desktopConfig,
  generateReport,
} from "lighthouse";

const profile = process.argv[2];

if (!new Set(["mobile", "desktop"]).has(profile)) {
  throw new Error(
    "Choose a Lighthouse profile: node scripts/lighthouse-completion.mjs mobile|desktop",
  );
}

const baseUrl = (process.env.BASE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);
const routes = [
  "/",
  "/experiences",
  "/for-organizations",
  "/katta-studio",
  "/contact",
];
const runsPerRoute = 3;
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(
  scriptDirectory,
  "../lighthouse-results",
  profile,
);
const baselinePath = path.resolve(
  scriptDirectory,
  "../lighthouse-approved-baselines.json",
);
const updateBaseline = process.env.LIGHTHOUSE_UPDATE_BASELINE === "1";

const budgets = {
  mobile: {
    performance: 0.8,
    accessibility: 0.95,
    "best-practices": 0.9,
    seo: 0.9,
    "largest-contentful-paint": 4_000,
    "cumulative-layout-shift": 0.1,
    "total-blocking-time": 600,
  },
  desktop: {
    performance: 0.85,
    accessibility: 0.95,
    "best-practices": 0.9,
    seo: 0.9,
    "largest-contentful-paint": 2_500,
    "cumulative-layout-shift": 0.1,
    "total-blocking-time": 300,
  },
};

const scoreKeys = ["performance", "accessibility", "best-practices", "seo"];
const timingKeys = [
  "largest-contentful-paint",
  "cumulative-layout-shift",
  "total-blocking-time",
];

function safeRouteName(route) {
  return route === "/" ? "home" : route.slice(1).replace(/[^a-z0-9]+/gi, "-");
}

function median(values) {
  const sorted = values.filter(Number.isFinite).sort((first, second) => first - second);
  if (sorted.length === 0) return null;
  return sorted[Math.floor(sorted.length / 2)];
}

function extractMetrics(result) {
  return {
    performance: result.categories.performance?.score ?? null,
    accessibility: result.categories.accessibility?.score ?? null,
    "best-practices": result.categories["best-practices"]?.score ?? null,
    seo: result.categories.seo?.score ?? null,
    "largest-contentful-paint":
      result.audits["largest-contentful-paint"]?.numericValue ?? null,
    "cumulative-layout-shift":
      result.audits["cumulative-layout-shift"]?.numericValue ?? null,
    "total-blocking-time":
      result.audits["total-blocking-time"]?.numericValue ?? null,
  };
}

function extractResourceSignals(result) {
  const unusedJavaScript = result.audits["unused-javascript"]?.details;
  const renderBlocking = result.audits["render-blocking-resources"]?.details;
  const layoutShiftElements = result.audits["layout-shift-elements"]?.details;

  return {
    "total-byte-weight": result.audits["total-byte-weight"]?.numericValue ?? null,
    "unused-javascript-savings-bytes": unusedJavaScript?.overallSavingsBytes ?? null,
    "render-blocking-savings-ms": renderBlocking?.overallSavingsMs ?? null,
    "layout-shift-element-count": Array.isArray(layoutShiftElements?.items)
      ? layoutShiftElements.items.length
      : 0,
  };
}

function medianObject(records) {
  const keys = new Set(records.flatMap((record) => Object.keys(record)));
  return Object.fromEntries(
    [...keys].map((key) => [
      key,
      median(records.map((record) => record[key]).filter((value) => typeof value === "number")),
    ]),
  );
}

function budgetFailures(metrics) {
  const selected = budgets[profile];
  const failures = [];

  for (const category of scoreKeys) {
    const actual = metrics[category];
    const minimum = selected[category];
    if (typeof actual !== "number" || actual < minimum) {
      failures.push(
        `${category}: ${actual ?? "missing"} is below the ${minimum} minimum`,
      );
    }
  }

  for (const audit of timingKeys) {
    const actual = metrics[audit];
    const maximum = selected[audit];
    if (typeof actual !== "number" || actual > maximum) {
      failures.push(`${audit}: ${actual ?? "missing"} exceeds the ${maximum} maximum`);
    }
  }

  return failures;
}

function regressionFailures(metrics, baseline) {
  const failures = [];
  for (const key of scoreKeys) {
    if (
      typeof metrics[key] === "number" &&
      typeof baseline[key] === "number" &&
      metrics[key] < baseline[key] - 0.05
    ) {
      failures.push(`${key}: ${metrics[key]} regressed from ${baseline[key]}`);
    }
  }

  const tolerances = {
    "largest-contentful-paint": 500,
    "cumulative-layout-shift": 0.03,
    "total-blocking-time": 150,
  };
  for (const key of timingKeys) {
    if (
      typeof metrics[key] === "number" &&
      typeof baseline[key] === "number" &&
      metrics[key] > baseline[key] + tolerances[key]
    ) {
      failures.push(`${key}: ${metrics[key]} regressed from ${baseline[key]}`);
    }
  }

  return failures;
}

async function readBaselines() {
  try {
    return JSON.parse(await readFile(baselinePath, "utf8"));
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") return {};
    throw error;
  }
}

await mkdir(outputDirectory, { recursive: true });

const chrome = await launch({
  chromePath: process.env.LIGHTHOUSE_CHROME_PATH || chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  logLevel: "error",
});

const failures = [];
const approvedBaselines = await readBaselines();
const profileSummary = {
  profile,
  baseUrl,
  generatedAt: new Date().toISOString(),
  runsPerRoute,
  routes: {},
};

try {
  for (const route of routes) {
    const url = new URL(route, `${baseUrl}/`).toString();
    const results = [];
    const name = safeRouteName(route);

    for (let runIndex = 1; runIndex <= runsPerRoute; runIndex += 1) {
      const run = await lighthouse(
        url,
        {
          port: chrome.port,
          logLevel: "error",
          onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        },
        profile === "desktop" ? desktopConfig : defaultConfig,
      );

      if (!run) {
        failures.push(`${route} run ${runIndex}: Lighthouse returned no result`);
        continue;
      }

      results.push(run.lhr);
      await Promise.all([
        writeFile(
          path.join(outputDirectory, `${name}-run-${runIndex}.html`),
          generateReport(run.lhr, "html"),
        ),
        writeFile(
          path.join(outputDirectory, `${name}-run-${runIndex}.json`),
          generateReport(run.lhr, "json"),
        ),
      ]);
    }

    if (results.length !== runsPerRoute) continue;

    const metrics = medianObject(results.map(extractMetrics));
    const resources = medianObject(results.map(extractResourceSignals));
    profileSummary.routes[route] = { metrics, resources };
    failures.push(...budgetFailures(metrics).map((failure) => `${route}: ${failure}`));

    const baseline = approvedBaselines[profile]?.routes?.[route]?.metrics;
    if (!updateBaseline && baseline) {
      failures.push(
        ...regressionFailures(metrics, baseline).map(
          (failure) => `${route} baseline regression: ${failure}`,
        ),
      );
    }
  }
} finally {
  chrome.kill();
}

await writeFile(
  path.join(outputDirectory, "summary.json"),
  `${JSON.stringify(profileSummary, null, 2)}\n`,
);

if (updateBaseline) {
  approvedBaselines[profile] = profileSummary;
  await writeFile(baselinePath, `${JSON.stringify(approvedBaselines, null, 2)}\n`);
  console.log(`Updated candidate ${profile} baseline: ${baselinePath}`);
} else if (!approvedBaselines[profile]) {
  console.log(
    `No approved ${profile} baseline exists yet; absolute budgets were enforced and baseline comparison was skipped.`,
  );
}

if (failures.length > 0) {
  throw new Error(`Lighthouse ${profile} failures:\n${failures.join("\n")}`);
}

console.log(
  `Lighthouse ${profile} budgets passed for ${routes.join(", ")} using the median of ${runsPerRoute} runs. Reports: ${outputDirectory}`,
);
