# Handoff — polish round 1

## Status: deployed and verified

Repair commit: `3034f13bdf88d86e9bea57ec2df426d61d6112fb`
Base reviewed: `edc0155a2151f50764caf5522b3f2f64c544cdc3`
Review report: `a772a2936f2938a711acd40ceb005e8240c75455`
Live site: <https://css-cause-map.sociobot.in>

## What changed

- Rewrote the first screen for frontend developers and made **Try it with
  sample data** the primary action.
- Added the standalone `/demo/?demo=1` sandbox with a realistic layout report,
  persistent isolation banner, deterministic reset, `demo:` storage, exports,
  capture comparison, and offline shell.
- Removed the unavailable paid checkout and license code. The extension,
  report log, and file exports are free.
- Added claim registry and 11 tagged claim tests. Added generated social/touch
  assets, complete metadata, legal routes, shared skeleton, route focus/live
  announcement, styled 404, link checks, security/cache policy, and mobile
  layouts.
- Preserved the handwritten lab-notebook identity, with its provenance and
  visual-system record in `.factory/design.md`.

The complete finding-to-change-to-evidence map is in `.factory/polish-1.md`.

## Exact verification evidence

### Fresh clean clone

Created a fresh clone at `3034f13` with no generated WXT directory, then ran:

```text
npm ci                                      PASS — 524 packages installed
npm run typecheck                           PASS
npm run lint                                PASS
npm audit --omit=dev --audit-level=high     PASS — 0 production vulnerabilities
npm run test:claims                         PASS — 11/11 tagged claim tests
each of the 11 claims.json test commands    PASS — 1 matching test each
npm test                                    PASS — 28 Vitest + 29 Playwright checks; 1 intentional mobile skip
npm run build                               PASS — MV3 output, ZIP, and dist/site
```

Every `claims.json` command was invoked separately from that clone:
`ranked-cause-report`, `demo-isolation`, `offline-core`, `private-exports`,
`capture-comparison`, `free-core`, `privacy-boundaries`,
`manifest-permissions`, `picker-inputs`, `local-report-log`, and
`production-build`.

The fresh production build measured 45.81 kB unpacked extension, 25.5 kB ZIP,
0.38 kB gzip landing JS, 4.62 kB gzip CSS, and a 17.2 kB mobile WebP hero.

### Production deployment and cold live check

Deployed `dist/site/` with `/opt/fleet/lib/deploy-static.sh css-cause-map dist/site`.
Azure deployment `ed71626a-e232-4151-a185-ef8028918844` completed successfully.

- `/opt/fleet/lib/verify-url.sh https://css-cause-map.sociobot.in .factory/evidence/live`
  passed: HTTP 200 in 589 ms, correct title/lang, one h1/main, no missing image
  alt text, no unlabeled buttons, and no console errors.
- Fresh mobile live context confirmed `/?demo=1` redirects to `/demo/?demo=1`,
  the banner is present, capture/reset restores 312 px, normal storage remains
  unchanged, and **Start for real** deletes the demo key.
- Fresh live checks confirmed `/`, `/demo/?demo=1`, `/privacy/`, `/terms/`, and
  `/404/` return 200 with their expected titles. An unknown path returns the
  product-styled 404 with HTTP 404. Internal landing links all returned 200.
- Forward navigation and browser Back moved focus to the destination h1. The
  normal cold live flow reported no console errors.
- Playwright Axe ran on live demo at 1366×900 and 390×844: 0 violations and
  0 console errors.
- Live headers include immutable assets, self-only CSP, `X-Frame-Options: DENY`,
  restrictive Permissions Policy, `nosniff`, and strict-origin referrer policy.

Screenshots: `.factory/evidence/polish-1-landing-desktop.png`,
`.factory/evidence/polish-1-landing-mobile.png`,
`.factory/evidence/polish-1-demo-desktop.png`,
`.factory/evidence/polish-1-demo-mobile.png`,
`.factory/evidence/polish-1-not-found.png`, and `.factory/evidence/live/`.

Lighthouse 13.4.1 was attempted with the installed Chromium, but its tab
crashed before producing a report. No Lighthouse score is claimed. The direct
bundle-budget, Playwright accessibility, offline, privacy, response-policy,
and live smoke checks above passed.

## Run and deploy

```sh
npm ci
npm test
npm run build
/opt/fleet/lib/deploy-static.sh css-cause-map dist/site
```

## Known gaps

None in the reviewed acceptance scope. Lighthouse scoring remains unavailable
in this container because the Lighthouse browser process crashes.
