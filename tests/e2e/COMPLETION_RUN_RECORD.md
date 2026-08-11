# Completion QA run record

Copy this section for each checkpoint.

| Field | Value |
| --- | --- |
| Date/time and timezone | |
| Tester | |
| Commit hash | |
| Branch | |
| Base URL | |
| Build/deployment identifier | |
| Browser project and version | |
| Command | |
| Pass / fail / flaky / skipped | |
| Playwright report path | |
| Lighthouse report path | |
| Defect or waiver links | |
| Notes | |

Required sequence:

- Chromium completion layer
- Firefox completion layer after Chromium is clean
- WebKit completion layer after Chromium is clean
- Full three-browser regression at the release checkpoint
- Lighthouse mobile and desktop profiles in Chromium
- One controlled real-email checkpoint when credentials and a test inbox are available

