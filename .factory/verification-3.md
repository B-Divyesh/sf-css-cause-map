# Independent verification 3 — PASS

**Work order:** `css-cause-map-verify-3`  
**Candidate:** `057ec082596ce487c5b3d8a1d8c99471049948da`  
**Verified:** 2026-08-28  
**Live URL:** <https://css-cause-map.sociobot.in>

## Verdict

**PASS.** Fresh clean-checkout verification found no release-blocking defect.
The live landing page's generated HTML, JS, and CSS are byte-identical to a
fresh production build of this commit. Its downloadable extension ZIP has
different outer archive bytes (ZIP metadata), but both archives extract to an
identical MV3 tree, byte-for-byte, including the manifest and all code/assets.
The prior candidate's side-panel skip-link and sizing defects are fixed in
this candidate.

## Clean local quality gates

Started with a clean worktree at the candidate SHA and ran:

```text
npm ci                                      PASS — 524 packages installed
npm run typecheck                           PASS — WXT prepare + tsc --noEmit
npm run lint                                PASS — zero warnings
npm test                                    PASS — 27 Vitest tests; 7 Playwright checks passed, 1 intentional duplicate mobile extension check skipped
npm run build                               PASS — MV3 build, packaged ZIP, staged static site
npm audit --omit=dev --audit-level=high     PASS — 0 production vulnerabilities
unzip -t .output/...chrome.zip              PASS
cmp packaged ZIP dist/site/download ZIP     PASS
```

Fresh build sizes are within the stated budgets: extension total **48.66 kB**
(largest JS **10.87 kB**), extension ZIP **26.60 kB**, site JS **3,412 B**
(**1,590 B** gzip), CSS **11,356 B** (**3,220 B** gzip), and mobile hero WebP
**17,240 B**. The static initial JS/CSS and image budgets therefore pass.

## Extension end-to-end verification

Loaded the freshly built MV3 extension in Chromium. A disposable copy of the
generated manifest granted only a temporary localhost fixture host permission;
the repository and shipping manifest were not changed. The extension's actual
picker, background-to-tab relay, panel, report generation, and export code
were exercised against the fixture.

- Normal flex/transform/box-model selection produced a ranked map containing
  the target's `width` signal.
- Changing width from 120px to 180px and adding an attribute produced
  `Since previous: width +60px` and two observed DOM changes.
- JSON export contained the scrubbed origin/path but omitted fixture page text,
  query token, and fragment.
- Removing the selected target before recapture recovered with: “The selected
  element is no longer in the page. Pick it again.”
- Keyboard picker Tab/Enter selected `button#first`; Escape cancelled picker
  mode and restored the ready message.
- The packaged side-panel smoke test independently passed skip-link focus to
  `<main>`, zero axe violations, visible utility text >=14px, and all visible
  controls >=44px.

The release manifest is MV3 with only `activeTab`, `scripting`, `storage`, and
`sidePanel`; its sole host permission is the documented Sociobot license API.
There are no automatic content scripts or broad site host permissions.

## Accessibility, responsive, PWA, and privacy checks

- Local Playwright covered desktop and 390px mobile: one h1 and main landmark,
  zero axe violations, no horizontal overflow, visible site copy >=16px,
  visible controls >=44px, site skip-link focus transfer, no console errors,
  same-origin first load, and offline reload after service-worker control.
- Fresh live Chromium checks at 1366px and 390px found one h1/main, no
  horizontal overflow, no console or page errors, zero axe violations
  (including zero serious/critical), a visible `rgb(23, 79, 121) solid 3px`
  keyboard focus outline, correct skip-link focus transfer, and no visible
  text below 16px or visible targets below 44px.
- First-view live requests were only to `https://css-cause-map.sociobot.in`.
  Source and request scans found no analytics, beacon, remote font, or other
  third-party runtime request. The source has an explicit reduced-motion media
  rule that reduces animation/transition duration to `.01ms` and sets scrolling
  to automatic.
- The supplied `verify-url.sh` fresh live pass returned HTTP 200 in **733 ms**,
  title present, `lang="en"`, one h1, main landmark, no missing image alt text,
  no unlabeled buttons, and no browser errors.

## Live deployment, response policy, and identity

Fresh download comparisons:

| Artifact | Result |
| --- | --- |
| `/` `index.html` | byte-identical to `dist/site/index.html` |
| `/assets/main-DfDUlwot.js` | byte-identical |
| `/assets/style-CjkuSNDY.css` | byte-identical |
| `/downloads/css-cause-map-chrome.zip` | extracted contents identical to fresh package and `.output/chrome-mv3`; outer ZIP metadata differs |

Live root, legal pages, JS/CSS, WebP, ZIP, and service worker returned HTTP
200. HTML uses `public, max-age=300, must-revalidate`; assets/media/ZIP use
`public, max-age=31536000, immutable`; `sw.js` uses
`no-cache, max-age=0, must-revalidate`. HTTPS/HSTS, `nosniff`,
`strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, restrictive
Permissions-Policy, and a self CSP (with only the Sociobot license API in
`connect-src`) are present.

The live invalid-license request returned `200`,
`{"valid":false,"reason":"invalid","expires_at":null}`, the exact-origin
CORS allow header, and `Cache-Control: no-store`.

## Defects by severity

None found.

## Verification limitation

`npm exec lighthouse` 13.4.1 was available but its browser process crashed
before producing a score even with the installed Playwright Chromium supplied
as `CHROME_PATH`. This is an environment/tool failure, not a page error:
direct Chromium, axe, offline, response-policy, and measured bundle-budget
checks above passed. No Lighthouse score is claimed in this verification.
