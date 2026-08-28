# Handoff — CSS Cause Map repair

## Released repair

- Repair commit: `691e83d fix: restore clean quality gates and site policies`
- Base independently verified: `b8e125c5802855eaf53d5e18f24b94c29745164e`
- Deployment: <https://css-cause-map.sociobot.in> (Azure Static Web Apps,
  deployment `ca609b22-e2a8-4cbc-acd7-4344b3fc0a8d`)

All release blockers in `.factory/verification.md` are repaired without
changing diagnosis, export, privacy, or licensing behavior.

- **P1:** `pretypecheck` and `pretest` explicitly run `wxt prepare`; direct
  typecheck and test now succeed from a clean checkout with no `.wxt/` output.
  `tests/release-contract.test.ts` protects that script contract.
- **P2:** `site/public/staticwebapp.config.json` now ships in `dist/site`.
  `/assets/*`, `/media/*`, and `/downloads/*` are immutable for one year;
  HTML revalidates in five minutes; the service worker is `no-cache`.
  The live CSP is self-only except the documented Sociobot licensing endpoint;
  X-Frame-Options, Permissions-Policy, nosniff, and referrer headers are live.
- **P3:** all three site main landmarks have `tabindex="-1"`; a browser test
  activates the skip link and asserts focus lands on `main`.

## Exact verification evidence — 2026-08-28

Fresh install: `npm ci` installed 524 packages. After removing `.wxt/`:

```text
npm run typecheck  PASS — WXT declarations are prepared then tsc succeeds
npm test           PASS — 26 unit tests and 6 Playwright tests
npm run lint       PASS
npm run build      PASS
npm audit --omit=dev --audit-level=high  PASS — 0 vulnerabilities
```

Browser coverage uses pinned Playwright 1.58.2 / Chromium at desktop and 390px:
zero axe violations; one h1 and main; skip-link focus; no overflow or console
errors; same-origin first-load requests; and an offline reload after service
worker control. The product-specific handwritten-lab-notebook system is
unchanged.

Build/consumer checks:

- MV3 output 48.58 kB; largest JS 10.87 kB. ZIP 26.62 kB; `unzip -t` passed.
- The staged landing download exactly matches the packaged ZIP.
- Site JS 3.41 kB raw / 1.59 kB gzip; CSS 11.26 kB raw / 3.22 kB gzip; mobile
  hero WebP 17.2 kB.
- Manifest remains MV3 with only `activeTab`, `scripting`, `storage`,
  `sidePanel`, and optional `https://api.sociobot.in/*` license verification.

Live evidence:

- `verify-url.sh` passed (HTTP 200, title/lang/main/h1/alt/labeled controls,
  zero console errors; 706 ms load).
- Live Playwright + axe: zero violations; skip target `#main`; no desktop
  third-party requests or errors; at 390px both viewport and scroll width=390.
- Live offline service-worker reload succeeded.
- Root matches `dist/site/index.html` byte-for-byte, SHA-256
  `b9c12710c004e2eb3506de50009eb55f165c0d3a3baa689c95d275a03ffaa67d`.
- Header probes prove immutable asset/media/ZIP caching, short HTML/SW policy,
  CSP, frame denial, and permissions policy.
- Lighthouse 13 mobile: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; LCP 1,452 ms, CLS 0, TBT 0.

## Run / deploy

```sh
npm ci
npm run typecheck
npm test
npm run lint
npm run build
/opt/fleet/lib/deploy-static.sh css-cause-map /work/repo/dist/site
```

## Known gaps

No release blockers remain. Cross-origin stylesheet selectors may still be
unavailable by browser design; results remain accurately labeled ranked
computed evidence, not browser-engine causation.
