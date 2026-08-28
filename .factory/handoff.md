# Handoff — polish round 2

## Status

PASS. Every finding in review 1, polish 1, and review 2 is closed. Runtime candidate `d56c690` is deployed at <https://css-cause-map.sociobot.in>.

## What changed

- Standalone claim commands now prepare WXT from a clean clone.
- The mobile demo presents the ranked cause report before the selected-page specimen. Its first cause is visible at 390×844.
- Navigation targets are at least 44×44 px, and browser tests measure both dimensions.
- Saved reports now have a visible two-step Clear report log action. The privacy page and a packaged-extension claim test cover deletion.
- Unregistered README test-coverage and response-header promises were replaced with direct instructions.
- The masked mobile demo overflow found during visual verification was removed and added to regression coverage.
- WXT was updated to 0.21.4, removing all npm audit findings.
- The catalog description and copy audit were updated. The handwritten lab-notebook identity and browser-extension artifact class are unchanged.

The exhaustive finding map is in `.factory/polish-2.md`. Screenshots are in `.factory/evidence/polish-2-*.png`.

## Exact verification

Final clean clone: `/tmp/css-cause-map-polish2-final-zVmgXH` from `d56c690`.

```text
npm ci                                      PASS — 304 packages
12 commands from .factory/claims.json      PASS — 12/12 independently
npm run typecheck                           PASS
npm run lint                                PASS — zero warnings
npm test                                    PASS — 28 Vitest; 31 Playwright; 1 intentional duplicate mobile extension check skipped
npm run build                               PASS — MV3 extension, ZIP, and dist/site
npm audit --audit-level=high                PASS — 0 vulnerabilities
unzip -t packaged ZIP                       PASS
```

The one Playwright skip is intentional: the packaged side-panel test runs once in desktop Chromium; the site suite runs at both desktop and mobile sizes.

Build sizes: extension 46.63 kB total; ZIP 25.45 kB; site JS 0.38 kB + 0.40 kB gzip; demo JS 1.76 kB gzip; CSS 4.71 kB gzip. These are below the product budgets.

Lighthouse 12.4.0 against the built site and again against production: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 0.9 s, CLS 0, TBT 0 ms.

`verify-url.sh` against production: HTTP 200, 600 ms load, correct title and `lang`, one h1, one main, no missing alt text, no unlabeled buttons, and no console errors.

Live cold checks at 390×844 and 1366×900 confirmed:

- first-screen job, audience, primary sample action, and three facts;
- direct and compatibility demo URLs, isolated storage, reset, exit, export, and offline capture;
- first ranked cause at y=728 in the initial 844 px viewport;
- zero Axe violations, zero undersized effective targets, zero clipped main content, and zero console errors;
- per-route metadata, forward/Back focus, shared legal links, and product-styled HTTP 404;
- same-origin-only demo traffic and live cache/security headers;
- byte-identical live HTML/CSS/JS/legal/404/ZIP artifacts. ZIP SHA-256 is `567200f939e2f7ae600b7c4381d3f2f218eb9bd6637f483d6290ae7e0e9529d0`.

## Run and deploy

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
```

The work-order deployment command is `npm ci && npm test && npm run build:site`; deploy `dist/site/` as a static site.

## Known gaps and next steps

None.
