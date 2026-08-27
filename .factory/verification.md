# Independent verification — FAIL

**Work order:** `css-cause-map-verify-1`  
**Candidate:** `e2372c9075df721ba543cfd955b7ae3f85f5d811`  
**Verified:** 2026-08-27  
**Live URL:** <https://css-cause-map.sociobot.in>

## Verdict

**FAIL.** The candidate cannot run its committed test or typecheck commands
from a clean checkout after the documented install step. Both require the
generated, untracked `.wxt/tsconfig.json`, but neither command generates it.
This fails the repository's clean local quality-gate requirement and makes the
prior handoff's unconditional “passed” result non-reproducible.

The deployed static site and the extension's extracted package contents do
otherwise match this candidate, and the primary extension workflow worked in
browser QA as described below.

## Release-blocking defect

### P1 — clean-install quality gates are broken

Fresh evidence, starting at the specified SHA with no `.wxt/` directory:

```text
$ npm ci
added 432 packages

$ npm run typecheck
error TS5083: Cannot read file '/work/repo/.wxt/tsconfig.json'.
entrypoints/background.ts(...): error TS2304: Cannot find name 'defineBackground'.
entrypoints/picker.ts(...): error TS2304: Cannot find name 'defineUnlistedScript'.

$ npm test
TSConfckParseError: failed to resolve "extends":"./.wxt/tsconfig.json"
Test Files  2 failed; Tests  no tests
```

`npm run build` subsequently succeeds and incidentally creates `.wxt/`. Only
after that side effect do `npm run typecheck` and `npm test` pass (24/24).
The fix should make the test/typecheck scripts generate WXT types themselves,
or commit/use a TypeScript configuration that does not depend on an untracked
build by-product. Do not rely on command ordering in a release handoff.

## Other defects and release risks

### P2 — live static assets are not immutable-cached

The live hashed JS and CSS, images, ZIP, and service worker all return
`Cache-Control: public, must-revalidate, max-age=30`. This does not meet the
product performance policy's long-lived immutable caching for hashed assets.
Examples: `/assets/main-DUZ49143.js`, `/assets/style-C7KB8kUA.css`, and
`/media/hero-lab-640.webp`. Set immutable long-lived caching for content-hashed
assets (with a short policy for HTML/service-worker) in deployment config.

### P2 — no Content-Security-Policy is served by the live site

The live root, legal pages, JS/CSS, media, ZIP, and service worker have HSTS,
`X-Content-Type-Options: nosniff`, and `Referrer-Policy`, but no
`Content-Security-Policy`, `X-Frame-Options`, or `Permissions-Policy` header.
At minimum deploy a restrictive CSP appropriate for the self-hosted static
site. This is a deployment policy gap; it does not alter the verified package
contents.

### P3 — skip link does not move keyboard focus into main

On the live landing page, Tab visibly focuses “Skip to main content”; Enter
navigates to `#main`, but `document.activeElement` is not the `<main>` target
because it is not programmatically focusable. Add `tabindex="-1"` to the main
target (or an equivalent focus handoff) so keyboard and assistive-technology
users land in content rather than merely scrolling there.

## What passed

### Build, package, and automated checks after WXT generation

- Exact production command `npm run build` passed:
  - MV3 extension: 48,578 bytes unpacked; largest JS 10,867 bytes.
  - ZIP: 26,619 bytes.
  - Site JS: 3,412 bytes raw / 1,590 bytes gzip; CSS: 11,258 bytes raw /
    3,220 bytes gzip; mobile hero WebP: 17,240 bytes.
- After the build-generated `.wxt/` files existed: `npm run typecheck` passed;
  `npm test` passed, 24/24 (20 seeded layout-ranker cases plus export privacy
  and escaping checks).
- `npm audit --omit=dev --audit-level=high` found 0 production vulnerabilities.

### Browser-extension functional QA

Chromium loaded the production MV3 output. To exercise a localhost fixture,
a disposable copy of the output manifest was granted only
`http://127.0.0.1/*`, which emulates the permission that a real toolbar-action
user receives through the shipped `activeTab` permission; the repository and
the shipped manifest were not modified.

- Pointer selection of a flex/transform/box-model target selected `div#target`
  and produced 16 ranked signals; the leading signal was `width`.
- After changing inline width from 120px to 180px and an attribute, Recapture
  reported `width +60px`, observed two changes, and raised no console/page
  errors.
- JSON export contained neither fixture DOM text (`Sensitive page text MUST NOT
  EXPORT`) nor its URL query or fragment.
- Picker keyboard flow selected `button#first` using Tab then Enter. Escape
  cancelled picker mode. Removing that selected node before Recapture produced
  “The selected element is no longer in the page. Pick it again.”
- The ordinary production side panel has one `<h1>`, a `<main>`, visible
  3px `#174f79` keyboard focus, zero axe violations, and its restricted-page
  recovery message was verified: “Chrome does not allow page inspection here.”
- The shipped permissions are conservative: `activeTab`, `scripting`,
  `storage`, `sidePanel`, and only `https://api.sociobot.in/*` as a host
  permission. There are no automatic content scripts or blanket page hosts.

### Privacy, licensing, and network checks

- Static source scan found no analytics, beacons, third-party runtime scripts,
  or remote fonts. Live landing-page requests went only to
  `https://css-cause-map.sociobot.in` until a license was intentionally tested.
- A deliberately invalid license contacted only the documented Sociobot verify
  endpoint and recovered with “This license is invalid.” The endpoint returned
  `200`, `{"expires_at":null,"reason":"invalid","valid":false}`, CORS headers,
  and `Cache-Control: no-store`.
- Visiting `/?license=returned-invalid-qa-token` saved the token under
  `sb_license:css-cause-map`, removed it from the address bar, and displayed a
  purchase-saved notice. Core diagnosis and both file exports remain ungated.
- Unit and browser checks confirmed URL query/fragment scrubbing and optional
  selector anonymization; exports do not capture DOM text or HTML.

### Live deployment comparison

- The live root HTML is byte-identical to `dist/site/index.html`: 8,148 bytes,
  SHA-256 `6327cde6035faef090087b2121fde167225cb4a6fbb214ffc8df47b92c1a6232`.
- Live `/privacy/`, `/terms/`, service worker, CSS, JS, all tested hero media,
  and the download were fetched and compared. Every extracted file from the
  live ZIP matches the freshly built ZIP exactly, including manifest and all
  JS/CSS/icons. The outer ZIP hash differs only because ZIP timestamps are
  19:33 in deployment versus 23:51 in the fresh build.
- Live response checks: all tested paths returned HTTP 200 with HTTPS/HSTS,
  `nosniff`, and strict-origin-when-cross-origin referrer policy.

### Accessibility, responsiveness, PWA, and performance

- Playwright + axe found zero violations (including zero serious/critical) on
  live desktop and 390px mobile. One `<h1>`, title, `lang`, and main landmark
  are present. Mobile document/body/client width are all exactly 390px; no
  horizontal overflow or console/page errors occurred.
- `prefers-reduced-motion: reduce` reduces live transition and animation to
  `0.00001s`; visible focus is a 3px blueprint-blue ring.
- The landing PWA registered its service worker. After activation/reload, an
  offline reload returned HTTP 200 from the cache.
- Lighthouse 13.4.1, live URL:
  - Mobile: Performance 91, Accessibility 100, Best Practices 100, SEO 100;
    LCP 1,071ms, CLS 0, TBT 367.5ms.
  - Desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100;
    LCP 310ms, CLS 0, TBT 0ms.

## Required next step

Resolve the P1 clean-install test/typecheck failure, then rerun verification
from a fresh clone. Address the P2 deployment policies before public release.
