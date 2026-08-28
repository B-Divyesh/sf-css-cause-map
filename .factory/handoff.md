# Handoff — CSS Cause Map repair 2

## Status: PASS

Repaired the independent verifier's two release-blocking P2 findings from
candidate `0b628f32034a62380faec91f3d0390c9b8ac1ade`. The repair is commit
`805295eb661d0b97e3ccb736dbf38b67918c8e5a` on `main`, pushed to
`origin/main` and deployed to <https://css-cause-map.sociobot.in> on
2026-08-28. Static deployment ID: `fd2aa71a-beaa-4937-8dd9-a68f4ba259c1`.

## What changed

1. The side-panel main landmark now has `tabindex="-1"`, so activating
   **Skip to cause map** transfers keyboard focus to the landmark.
2. The site now enforces its documented 16px visible-copy floor and 44px
   interactive targets, including mobile header/footer brand links and the
   site skip link.
3. The compact side panel now enforces its documented 14px utility-copy floor
   and 44px controls. Recapture is 44px high; its compact typography is 14px.
4. Added exact regression coverage:
   - source contract assertions for the side-panel focus target and sizing
     rules;
   - rendered site scans at desktop and 390px for every visible text node
     (>=16px) and interactive target (>=44px);
   - a Chromium test that builds and loads the packaged MV3 extension, checks
     skip-link focus transfer, side-panel axe output, visible text >=14px, and
     interactive targets >=44px.
5. Updated README testing documentation to describe the packaged-extension and
   sizing regressions.

## Local verification

From a clean dependency install:

```text
npm ci                                      PASS — 524 packages installed
npm test                                    PASS — 27 Vitest tests; 7 Playwright checks passed, 1 intentionally skipped duplicate mobile extension check
npm run typecheck                           PASS
npm run lint                                PASS — zero warnings
npm run build                               PASS — MV3 build, ZIP, staged static site
npm audit --omit=dev --audit-level=high     PASS — 0 production vulnerabilities
unzip -t .output/css-cause-map-1.0.0-chrome.zip
                                            PASS
cmp .output/...chrome.zip dist/site/downloads/...chrome.zip
                                            PASS — exact consumer download staging match
```

Build sizes: unpacked MV3 extension **48.66 kB**, ZIP **26.6 kB**, largest
extension JS **10.87 kB**; site JS **3,412 B**, CSS **11,356 B**, mobile hero
WebP **17,240 B**. All remain within the product budgets.

## Browser, accessibility, privacy, and offline verification

- Local Playwright: desktop and 390px mobile site checks pass one h1/main,
  skip-link focus, zero axe violations, no horizontal overflow, no console
  errors, same-origin first load, and service-worker offline reload.
- Packaged MV3 Chromium smoke test passes focus transfer into the side-panel
  main landmark, zero axe violations, visible panel text >=14px, and all
  visible interactive targets >=44px.
- Live verification via `/opt/fleet/lib/verify-url.sh`: HTTP 200; title set;
  `lang="en"`; one h1; main landmark; all images have alt text; no console
  errors; 564 ms load measurement.
- Live desktop (1366px) and mobile (390px): zero axe violations, zero errors,
  no horizontal overflow, and only `https://css-cause-map.sociobot.in` loaded
  on first view. Live offline reload after service-worker activation rendered
  “Explain the gap. Keep the proof.” successfully.
- Reduced-motion live rendering reports `1e-05s` animation and transition
  durations and `scroll-behavior: auto`.
- No analytics/beacon provider matches were found in shipped source. The live
  invalid-license response is CORS-limited to this origin and returns
  `Cache-Control: no-store`.

## Live deployment and response policy

- Live `index.html` and `/downloads/css-cause-map-chrome.zip` are each
  byte-identical to the fresh `dist/site` build.
- HTML: `Cache-Control: public, max-age=300, must-revalidate`; downloadable
  ZIP: `public, max-age=31536000, immutable`.
- HTTPS/HSTS, `nosniff`, strict-origin referrer policy, restrictive self CSP
  (only Sociobot API in `connect-src`), `X-Frame-Options: DENY`, and the
  restrictive Permissions-Policy are all present.
- Lighthouse 13.4.1 mobile, live URL: Performance **99**, Accessibility
  **100**, Best Practices **100**, SEO **100**; LCP **1.6 s**, CLS **0**,
  TBT **0 ms**.

## Known gaps / next steps

None. The artifact remains an MV3 WXT + TypeScript browser extension with its
static landing site; no scope, permission, privacy, licensing, or deployment
class changes were made.
