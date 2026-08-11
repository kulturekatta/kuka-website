# Remaining Test Case Suite coverage

The consolidated document was deduplicated against the 197-test baseline, the
57-test exhaustive layer and the original 46-test completion layer.

## Newly added cross-browser automation

| Document requirements | Test ID |
| --- | --- |
| `NAV-07` complete crawl from every public route | `NAV-DEEP-CRAWL` |
| `NAV-08` mobile current-page state | `NAV-MOBILE-ACTIVE` |
| `NAV-10` one-hop legacy redirects | `NAV-REDIRECT-ONCE` |
| `NAV-11` fragment target and fixed-header clearance | `NAV-ANCHORS` |
| `NAV-12` Back/Forward page and active-state restoration | `NAV-HISTORY` |
| `MOB-03`, `MOB-04`, `MOB-05` short-screen menu scroll, page lock and toggle focus | `MOBILE-MENU-SHORT` |
| `FORM-16` enabled-form boundary flows at 320px and 430px | `FORM-MOBILE-BOUNDARIES` |
| `SEO-09` noindex directives and sitemap exclusions | `SEO-NOINDEX` |

## Strengthened existing automation

| Document requirements | Test ID |
| --- | --- |
| Required page/viewport matrix and `RES-01` to `RES-03` objective checks | `RESP-VIEWPORT-MATRIX` plus the existing 320px/390px coverage |
| `MOB-11` hidden mobile contact, social and Go-to-Top controls | `MOBILE-FIXED-HIDDEN` |
| `A11Y-01` and `A11Y-05` every-page axe and landmark checks | `A11Y-AXE` |
| `A11Y-02` every-page keyboard reachability | `A11Y-KEYBOARD` |
| `RES-09` desktop-only, scroll-triggered Go to Top behavior | `RESP-GOTOTOP-01` and `RESP-GOTOTOP-02` |

## Separate Chromium-only automation

- `VIS-01` to `VIS-05`: 15 screenshot cases in `tests/visual`.
- `PERF-01` to `PERF-06`: five routes, three runs per route, median budgets,
  approved-baseline regression checks and resource/stability reporting.

## Still manual or conditional

- `MOB-10`, the visual portions of `RES-02`, `RES-04` to `RES-08`,
  `RES-10` to `RES-13`, `FORM-14`, `FORM-15`, `FORM-17`, `A11Y-03`, the
  manual portion of `A11Y-10`, `VIS-05`, `PERF-07` and the production-only
  `SEO-10` release check.
- `MOB-14` remains conditional because the contact drawer is intentionally
  unavailable on the current mobile design.
