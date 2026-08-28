# Handoff — CSS Cause Map polish round 4

## Status

PASS. F-4-1 and every inherited review finding are closed. The cumulative
ID-by-ID record is in `.factory/polish-4.md`. No known gap remains.

Runtime repair commit: `3ff448b`

Deployment ID: `ad2be5e7-076f-41ee-aca8-4d5675ac51ae`

Live site: <https://css-cause-map.sociobot.in>

## What changed

- Registered the final landing installation statement under the
  `production-build` claim, closing F-4-1.
- Strengthened `@claim:production-build` to check the rendered statement,
  its download URL, served bytes, archive contents and integrity, and the
  unpacked MV3 manifest.
- Added a release-contract regression that requires the landing CTA location
  to remain registered.
- Updated the catalog description to an 87-character verb-first sentence:
  “Rank CSS rules and parent elements shaping a selected element’s size,
  position, or gap.”
- Updated the copy audit and added fresh live screenshots without changing the
  warm paper, graphite, blueprint, and vermilion notebook visual system.

The artifact remains a WXT TypeScript MV3 browser extension with a static Vite
landing site in `dist/site/`.

## Clean-clone verification

Clone: `/tmp/css-cause-map-polish4-73GKgd` at `3ff448b`

```text
npm ci                    PASS — 304 packages, 0 vulnerabilities
12 claim commands         PASS — 12/12 independently
npm run typecheck         PASS
npm run lint              PASS — zero warnings
npm test                  PASS — 28 Vitest; 31 Playwright; 1 intentional duplicate mobile-panel skip
npm run build             PASS — MV3 extension, ZIP, and dist/site
```

The final build's root loads 1.405 kB of JavaScript before gzip; all site
scripts total 5.274 kB. CSS is 19.09 kB before gzip, and the extension ZIP is
25,440 bytes. These remain below the static budgets. The live and built ZIPs match at SHA-256
`2be3f18b4c42db094f259f2607bff714331b5f4a1e77d1630fd78e3eed874158`.

## Live verification after deployment

- `/opt/fleet/lib/verify-url.sh` passed the cold root with the correct title,
  language, h1, main landmark, alt text, and no console errors. Its report and
  screenshots are under `.factory/evidence/polish-4-live/`.
- Fresh Chromium contexts checked root, demo, Privacy, Terms, and an unknown
  path at 390×844 and 1366×900. Ten Axe scans had zero violations. No target
  was below 44×44 px, no own-text node was below 16 px, and no page overflowed.
- The 390×844 root shows the job, audience, sample action, immediate result,
  and all three facts without scrolling. The demo's report heading and first
  ranked cause also appear in its initial viewport.
- The one-click live demo captured 312→288 px, recorded the class change,
  reset to 312 px, and exported private JSON plus anonymous HTML.
- A seeded normal storage key survived the demo. Only the `demo:` key was
  added, and Start for real removed it. All requests stayed same-origin.
- The demo reloaded and captured offline after service-worker activation.
  Route navigation and Back focused and announced each h1. Reduced-motion
  mode removed the decorative transform.
- Every route exposed its title, description, canonical, social metadata,
  favicon, Apple icon, one h1, one main, shared header/footer, and legal links.
  The unknown URL returned the designed notebook page with HTTP 404.
- Built and live root/demo/legal/404/robots/sitemap files matched byte-for-byte.
  The live ZIP matched the build and passed `unzip -t`.
- Live response headers include a self-only CSP, frame denial, permissions
  policy, nosniff, strict-origin referrer policy, HSTS, and the expected cache
  policy.
- Lighthouse 12.8.2 mobile: 100 performance, 100 accessibility, 100 best
  practices, and 100 SEO. LCP 960 ms, CLS 0, TBT 85 ms, Speed Index 867 ms.

Visual evidence:

- `.factory/evidence/polish-4-live-landing-mobile.png`
- `.factory/evidence/polish-4-live-demo-mobile.png`
- `.factory/evidence/polish-4-live-not-found.png`

## How to verify

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
```

Run each `test` command in `.factory/claims.json` independently from a clean
checkout. Deploy the static contents of `dist/site/`.

## Known gaps and next steps

None. No finding, stub, TODO, deferred minor item, or untested product claim
remains.
