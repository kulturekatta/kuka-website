/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const appDir = path.join(root, "app");
const dataDir = path.join(root, "data");
const registryPath = path.join(appDir, "data", "semanticIconRegistry.ts");
const semanticIconPath = path.join(appDir, "components", "SemanticIcon.tsx");
const sequenceMarkerPath = path.join(appDir, "components", "SequenceMarker.tsx");
const globalCssPath = path.join(appDir, "globals.css");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function fail(messages) {
  console.error("\nICON AUDIT FAILED\n");
  for (const message of messages) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

const errors = [];
const registryText = fs.readFileSync(registryPath, "utf8");
const registryEntry =
  /^\s*"([^"]+)"\s*:\s*\{\s*icon:\s*"([^"]+)",\s*key:\s*"([^"]+)"\s*\},?\s*$/gm;

const entries = [];
let match;
while ((match = registryEntry.exec(registryText)) !== null) {
  entries.push({
    label: match[1],
    icon: match[2],
    key: match[3],
  });
}

if (entries.length === 0) {
  errors.push("No semantic icon registry entries were parsed.");
}

const labels = new Set(entries.map((entry) => entry.label));
const byVisual = new Map();

for (const entry of entries) {
  if (!byVisual.has(entry.icon)) {
    byVisual.set(entry.icon, new Map());
  }

  const meanings = byVisual.get(entry.icon);
  if (!meanings.has(entry.key)) {
    meanings.set(entry.key, []);
  }
  meanings.get(entry.key).push(entry.label);
}

for (const [icon, meanings] of byVisual) {
  if (meanings.size <= 1) continue;

  const details = [...meanings.entries()]
    .map(([key, value]) => `${key} [${value.join(" / ")}]`)
    .join(" || ");

  errors.push(`Visual ${icon} represents multiple meanings: ${details}`);
}

const byUnorderedPair = new Map();

for (const entry of entries) {
  const parts = entry.icon.split(" ").filter(Boolean);
  if (parts.length !== 2) continue;

  const fingerprint = [...parts].sort().join("|");

  if (!byUnorderedPair.has(fingerprint)) {
    byUnorderedPair.set(fingerprint, new Map());
  }

  const meanings = byUnorderedPair.get(fingerprint);
  if (!meanings.has(entry.key)) {
    meanings.set(entry.key, new Set());
  }
  meanings.get(entry.key).add(entry.icon);
}

for (const [fingerprint, meanings] of byUnorderedPair) {
  const visuals = new Set(
    [...meanings.values()].flatMap((value) => [...value]),
  );

  if (meanings.size > 1 && visuals.size > 1) {
    errors.push(
      `Reversed/near-duplicate compound pair ${fingerprint}: ${[
        ...meanings.entries(),
      ]
        .map(
          ([key, icons]) => `${key} [${[...icons].join(" / ")}]`,
        )
        .join(" || ")}`,
    );
  }
}

const sourceFiles = walk(appDir).filter((file) => /\.(tsx|ts)$/.test(file));
const dataFiles = fs.existsSync(dataDir)
  ? walk(dataDir).filter((file) => /\.ts$/.test(file))
  : [];
const auditedSourceFiles = [...sourceFiles, ...dataFiles];

const literalComponentPattern =
  /<(?:SemanticIcon|IconLead|SectionHeaderIcon)\b([\s\S]*?)\/>/g;
const literalLabelPattern = /\blabel\s*=\s*"([^"]+)"/;
const iconObjectPattern =
  /\b(?:icon|emoji|mark)\s*:\s*"([^"]+)"([\s\S]{0,450}?)(?:\n\s*},|\n\s*})/g;

const unregisteredLiteralUses = [];
const unregisteredDataUses = [];

for (const file of sourceFiles) {
  const text = fs.readFileSync(file, "utf8");
  let componentMatch;

  while ((componentMatch = literalComponentPattern.exec(text)) !== null) {
    const labelMatch = componentMatch[1].match(literalLabelPattern);
    if (!labelMatch) continue;

    const label = labelMatch[1];
    if (!labels.has(label)) {
      const line =
        text.slice(0, componentMatch.index).split(/\r?\n/).length;
      unregisteredLiteralUses.push(
        `${path.relative(root, file)}:${line} — ${label}`,
      );
    }
  }

  if (text.includes("🪄")) {
    errors.push(
      `${path.relative(root, file)} still contains the unsupported 🪄 glyph.`,
    );
  }

  if (text.includes("�")) {
    errors.push(
      `${path.relative(root, file)} contains the Unicode replacement character.`,
    );
  }
}

for (const file of auditedSourceFiles) {
  const text = fs.readFileSync(file, "utf8");
  let objectMatch;

  while ((objectMatch = iconObjectPattern.exec(text)) !== null) {
    const body = objectMatch[2];
    let semanticLabel = "";

    for (const property of ["iconLabel", "title", "label", "name"]) {
      const labelMatch = body.match(
        new RegExp(`\\b${property}\\s*:\\s*"([^"]+)"`),
      );
      if (labelMatch) {
        semanticLabel = labelMatch[1];
        break;
      }
    }

    if (!semanticLabel || labels.has(semanticLabel)) continue;

    const line = text.slice(0, objectMatch.index).split(/\r?\n/).length;
    unregisteredDataUses.push(
      `${path.relative(root, file)}:${line} — ${semanticLabel}`,
    );
  }
}

if (unregisteredLiteralUses.length > 0) {
  errors.push(
    `Literal semantic labels missing from the registry:\n  ${unregisteredLiteralUses.join(
      "\n  ",
    )}`,
  );
}

if (unregisteredDataUses.length > 0) {
  errors.push(
    `Icon-bearing data labels missing from the registry:\n  ${unregisteredDataUses.join(
      "\n  ",
    )}`,
  );
}

for (const relative of [
  "kuka-universe/explore/page.tsx",
  "kuka-universe/wellness/page.tsx",
  "kuka-universe/circle/page.tsx",
]) {
  const file = path.join(appDir, relative);
  const text = fs.readFileSync(file, "utf8");
  const standaloneCrosses = [...text.matchAll(/>\s*×\s*</g)];

  for (const cross of standaloneCrosses) {
    const before = text.slice(Math.max(0, cross.index - 350), cross.index);
    if (!before.includes("data-kk-sequence")) {
      errors.push(
        `${path.relative(
          root,
          file,
        )} has an untracked × visual; mark it with data-kk-sequence.`,
      );
    }
  }
}

const semanticIconText = fs.readFileSync(semanticIconPath, "utf8");
for (const token of [
  'className={`kk-icon kk-icon--${size}',
  "data-kk-icon-key",
  "data-kk-icon-size",
  "data-kk-icon-compound",
]) {
  if (!semanticIconText.includes(token)) {
    errors.push(`SemanticIcon.tsx is missing the icon-system contract token: ${token}`);
  }
}

const sequenceMarkerText = fs.readFileSync(sequenceMarkerPath, "utf8");
if (!sequenceMarkerText.includes("kk-sequence-marker")) {
  errors.push("SequenceMarker.tsx is not using the global sequence-marker class.");
}

const globalCssText = fs.readFileSync(globalCssPath, "utf8");
for (const selector of [
  ".kk-icon {",
  ".kk-icon--page {",
  ".kk-icon--section {",
  ".kk-icon--card {",
  ".kk-icon--compact {",
  ".kk-icon--compound",
  ".kk-icon-lead {",
  ".kk-sequence-marker {",
]) {
  if (!globalCssText.includes(selector)) {
    errors.push(`globals.css is missing ${selector}`);
  }
}

if (errors.length > 0) {
  fail(errors);
}

const aliasCount = [...byVisual.values()].filter(
  (meanings) =>
    meanings.size === 1 &&
    [...meanings.values()][0].length > 1,
).length;

console.log(
  [
    "Icon audit passed.",
    `${entries.length} registered labels.`,
    `${byVisual.size} rendered semantic visuals.`,
    `${aliasCount} intentional alias visual${aliasCount === 1 ? "" : "s"}.`,
    "0 visuals assigned to different semantic meanings.",
    "0 reversed two-icon near-duplicates.",
    "0 unregistered literal SemanticIcon/IconLead labels.",
    "0 unregistered icon-bearing data labels.",
    "Global icon CSS/component contract present.",
  ].join(" "),
);