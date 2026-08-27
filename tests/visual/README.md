# Chromium visual-regression checkpoint

This separate layer owns `VIS-01` through `VIS-05` from the consolidated test
suite. It captures Home, Experiences, For Organizations, Katta Studio and
Contact at 375x812, 768x1024 and 1440x900.

Create the first candidate baselines only after the current design has been
reviewed:

```powershell
$env:BASE_URL = "https://your-target-deployment.example"
npm run test:visual:update
```

Review all 15 PNGs under `tests/visual/__screenshots__`. Commit them only after
they are approved. Later checkpoints use:

```powershell
npm run test:visual
```

The visual configuration is Chromium-only. It disables animation and caret
rendering and reuses the normal preview-drawer suppression to avoid unstable
third-party pixels. Never update snapshots merely to make a regression green.
