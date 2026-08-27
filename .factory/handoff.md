# Handoff — CSS Cause Map v1

## Shipped

- WXT + TypeScript Manifest V3 Chrome extension with a side-panel workflow.
- User-initiated element picker with pointer and keyboard paths (Tab/Shift+Tab,
  Enter, Escape), a live overlay, and clear errors for restricted pages.
- Deterministic analysis of final box metrics, matched CSS declarations, box
  model, flex/grid participation, positioning, transforms, and constraints from
  up to eight ancestors. Evidence is ranked and always labeled as computed
  correlation rather than browser-engine causation.
- Recapture workflow with width/height/x/y deltas plus locally observed
  attribute and child-list mutations for before/after proof.
- Scrubbed standalone HTML and JSON exports. Page text/HTML is never captured;
  URL queries/fragments are removed, and selectors can be anonymized.
- Local-first Field Kit tier: $12 one-time Sociobot checkout, returned-license
  capture, daily verification cache, offline-safe free experience, pasted-key
  restore, unlimited local report log, and private notes. Core analysis,
  accessibility, recapture, and both export formats remain free.
- Responsive static product site plus `/privacy/` and `/terms/`, offline shell,
  install ZIP at `/downloads/css-cause-map-chrome.zip`, robots/sitemap, and no
  analytics, remote fonts, third-party runtime scripts, or CDN dependencies.
- Product-specific handwritten lab-notebook visual system in `design.md`.
  Original hero generated with the factory image model; prompt/provenance are in
  `assets/src/`. Runtime WebP derivatives are 17 KB mobile and 58 KB desktop.

## Build and verification

Exact production command:

```sh
npm install
npm run build
```

Static deploy root: `./dist/site` (`index.html` is at that root). The packaged
extension is copied to
`./dist/site/downloads/css-cause-map-chrome.zip`; the unpacked extension is in
`./.output/chrome-mv3`.

Verified on 2026-08-27:

- `npm run typecheck` — passed.
- `npm test` — 24/24 passed, including 20 seeded flex/grid/clamp/box-model/
  margin/position ranking scenarios and three export privacy tests.
- `npm run build` — passed from project sources.
- Extension production bundle — 48.58 KB total; largest individual JavaScript
  file 10.87 KB. Packaged ZIP — 26.62 KB.
- Static site initial JavaScript — 3.41 KB raw / 1.59 KB gzip; CSS — 11.26 KB
  raw / 3.22 KB gzip; mobile hero — 17 KB.
- Lighthouse 12.8.2 against the production preview:
  - Mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100;
    LCP 0.9 s, CLS 0, TBT 0 ms.
  - Desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100;
    LCP 0.3 s, CLS 0, TBT 0 ms.
- axe-core 4.10.3: zero violations on `/`, `/privacy/`, and `/terms/`.
- Factory `verify-url.sh`: HTTP 200, title/lang/main/alt/button checks passed,
  zero console or page errors, and responsive screenshots captured.
- Chrome 145 headless: extension loaded as MV3; side panel rendered at narrow
  width with one `h1`, a `main` landmark, no horizontal overflow, and no page
  console errors. Landing page visually inspected at desktop and a true 390 px
  emulated viewport; no overflow at 390 px.
- `npm audit --omit=dev` — zero production vulnerabilities.

## Permissions and privacy

Extension permissions are limited to `activeTab`, `scripting`, `storage`, and
`sidePanel`. The only host permission is `https://api.sociobot.in/*`, used for
optional license verification. It has no blanket web host permission and no
content script that runs automatically.

## Known limits

- Cross-origin stylesheets can affect computed values but browser security may
  prevent the extension from naming their selector/source.
- Closed shadow roots and browser-owned pages cannot be inspected.
- Ranking is deterministic evidence, not the browser engine’s internal layout
  trace; the report tells users to confirm a lead by toggling the named rule.
- The build targets Chrome 116+ only in v1. Firefox packaging is not included.
- Hosted checkout/product registration and deployment are factory operations;
  no product IDs, billing credentials, DNS, or infrastructure were added here.

## Suggested next steps

1. Register the production Sociobot product/return URL and smoke-test purchase,
   refund revocation, and cross-device paste restore.
2. Run the 20 layout fixtures as full browser-extension E2E tests in CI in
   addition to the deterministic ranker coverage.
3. After user feedback, add opt-in pseudo-element and closed-component-owner
   hints without expanding default permissions.
