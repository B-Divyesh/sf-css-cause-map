# Independent verification 2 — FAIL

**Work order:** `css-cause-map-verify-2`  
**Candidate:** `0b628f32034a62380faec91f3d0390c9b8ac1ade`  
**Verified:** 2026-08-28  
**Live URL:** <https://css-cause-map.sociobot.in>

## Verdict

**FAIL.** The previously reported clean-install and deployment-policy defects
are fixed. The candidate builds, its actual extension workflow works, and the
live deployment matches the rebuilt candidate. It nevertheless fails the
factory acceptance contract's keyboard and sizing requirements in the shipped
extension, and does not meet its own visual-thesis minimum typography claims.

## Acceptance defects

### P2 — extension skip link does not transfer keyboard focus to the main landmark

The production extension side panel has a visible `Skip to cause map` link,
but activating it leaves focus off `<main>` because
`entrypoints/sidepanel/index.html` has `<main id="main">` without
`tabindex="-1"`. Fresh Chromium QA against the production output found:

```text
h1: 1; main: 1; axe violations: 0; console errors: 0
focusMain after Tab/Enter on “Skip to cause map”: false
```

This fails the keyboard-only requirement: a skip link must move both the view
and keyboard/assistive-technology focus into main content. Add a programmatic
focus target (`tabindex="-1"` is sufficient) and a browser regression test for
the extension page, analogous to the repaired site test.

### P2 — shipped typography and a control miss the documented minimums

The visual thesis says site body copy never drops below 16 px and side-panel
utility copy is 14 px with controls at least 44 px tall. Actual production
measurements do not meet that contract:

| Surface | Fresh measurement | Contract |
| --- | --- | --- |
| Landing page | body `16px`, but visible copy is repeatedly `10–15px` (method steps `15px`, install note/final note `11px`, several labels `10–13px`) | Site body copy ≥ `16px` |
| Extension side panel | body `12px`, status `13px`, microcopy `11px` | Compact utility copy ≥ `14px` |
| Extension Recapture control | `.compact` `min-height: 36px`, `font-size: 12px` | Controls ≥ `44px` |
| Mobile landing branding links | header/footer brand links are `34px` high | Touch targets ≥ `44px` |

This is readily visible at the requested 390px viewport and conflicts with
the explicit product-specific design record and the attached accessibility
baseline. Axe does not flag minimum font size or target size, so its clean run
does not negate this defect.

## Clean local verification

Started from the requested SHA with `.wxt/` absent, then ran `npm ci`.

```text
npm ci                 PASS — 524 packages installed
npm run typecheck      PASS — pretypecheck runs `wxt prepare`, then tsc
npm test               PASS — 26 Vitest + 6 Playwright tests
npm run lint           PASS — ESLint, zero warnings
npm run build          PASS — MV3 build, ZIP, staged site
npm audit --omit=dev --audit-level=high  PASS — 0 production vulnerabilities
```

The exact production build produced a 48.58 kB unpacked MV3 extension; largest
JS is 10.87 kB; ZIP is 26.62 kB. Site JS is 3,412 bytes raw / 1,590 gzip; CSS
is 11,258 bytes raw / 3,220 gzip; mobile hero WebP is 17,240 bytes. All are
inside the stated static budgets. `unzip -t` passed.

## Extension end-to-end QA

Loaded the freshly built MV3 output in Chromium. A disposable test-only copy
of its manifest added `http://127.0.0.1:<random-port>/*` so a local fixture
could be inspected; the repository and shipped manifest were untouched. The
fixture permission emulates the selected-tab authority that the shipping
`activeTab` flow receives.

- Pointer selected `div#target` in a flex/transform/box-model fixture. It
  produced 16 ranked signals, including `width`.
- After changing `width` from 120px to 180px and changing an attribute,
  Recapture reported `width +60px`, recorded two observed changes, and raised
  no errors.
- Exported JSON omitted fixture text (`Sensitive page text MUST NOT EXPORT`),
  query token, and URL fragment.
- Removing the selected node before Recapture recovered with: “The selected
  element is no longer in the page. Pick it again.”
- Picker keyboard flow selected `button#first` with Tab then Enter; Escape
  cancelled picker mode. The status returned to the ready state.
- The release manifest is MV3 and conservatively declares only `activeTab`,
  `scripting`, `storage`, `sidePanel`, plus the documented Sociobot license
  host. There are no automatic content scripts or blanket webpage hosts.
- Extension side-panel axe scan had zero violations and zero console errors;
  the separate keyboard-focus defect above remains.

## Live deployment, privacy, security, and browser QA

- Rebuilt `index.html`, JS, CSS, media, legal pages, robots, sitemap, icon,
  service worker, and download were compared with production. All public
  artifacts were byte-identical. The outer ZIP SHA differs only from archive
  metadata; extracting it and comparing to `.output/chrome-mv3` was exact,
  and `unzip -t` passed.
- Live root, legal pages, JS/CSS/media/ZIP return HTTP 200 with HTTPS/HSTS,
  `nosniff`, strict-origin referrer policy, restrictive self CSP (only the
  documented Sociobot API in `connect-src`), `X-Frame-Options: DENY`, and a
  restrictive Permissions-Policy. HTML is five-minute revalidated; assets,
  media, and ZIP are `public, max-age=31536000, immutable`; `sw.js` is
  `no-cache, max-age=0, must-revalidate`.
- First-load desktop and 390px mobile network captures used only
  `https://css-cause-map.sociobot.in`; source scan found no analytics,
  beacons, remote fonts, or third-party runtime scripts. The only intentional
  cross-origin behavior is the Sociobot checkout/license API.
- A returned invalid license was stored under `sb_license:css-cause-map`,
  removed from the URL, and shown as a saved-purchase notice. Pasting an
  invalid token recovered with “This license is invalid… Get Field Kit.” Only
  the documented `https://api.sociobot.in/api/v1/products/css-cause-map/verify`
  endpoint was requested. It returned `200`, `{"valid":false,"reason":"invalid"}`
  with `Cache-Control: no-store`; with the live Origin header it returns the
  appropriate CORS allow-origin response.
- Live desktop and 390px: title/lang, one h1, main landmark, no horizontal
  overflow, no console/page errors, zero axe violations (including zero
  serious/critical), and the **site** skip link correctly transfers focus.
  Reduced motion returns `0.00001s` durations. After service-worker control,
  an offline reload returned HTTP 200 with the expected h1.
- Lighthouse 13.4.1 mobile run: Performance **99**, Accessibility **100**,
  Best Practices **100**, SEO **100**; LCP **1.0 s**, CLS **0**, TBT **120 ms**.

## Required next step

Fix the extension's skip-link focus transfer and the documented minimum
typography/touch-target violations, add regression coverage, then repeat this
verification from a clean checkout. No deployment-only failure was found:
production is serving this candidate's public artifacts and repaired response
policies.
