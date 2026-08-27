param(
  [Parameter(Mandatory = $true)]
  [string]$PreviewUrl,

  [switch]$AllBrowsers
)

$ErrorActionPreference = "Stop"
$env:BASE_URL = $PreviewUrl.TrimEnd("/")

Write-Host "Testing Netlify preview: $env:BASE_URL" -ForegroundColor Cyan

if ($AllBrowsers) {
  npm run test:e2e:all
} else {
  npm run test:e2e
}

exit $LASTEXITCODE
