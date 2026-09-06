# Review 6 — CSS layout diagnosis

**Verdict: PASS**

**Reviewed:** 2026-09-06 UTC  
**Work order:** `css-cause-map-review-6`  
**Live URL:** <https://css-cause-map.sociobot.in>  
**Implementation reviewed:** `e6edc7dc796c2573e2b4d619e0730d9cbd4f368f` (`fix: enlarge legal links for touch access`)  
**Documentation checkout:** `1b05229d51e2a753b09a518012f2d5c41d5f0749` (`docs: add adversarial review five`)

## Result

**PASS.** This independent re-review found **zero findings** and **zero untested
claims**. Product code was not modified. The live root, demo document, and
downloaded extension ZIP are byte-identical to a fresh build of this checkout.

## First screen

Fresh Chromium desktop (1440×950) and phone (390×844) contexts were opened
without scrolling.

| Check | Desktop and phone result |
| --- | --- |
| Job | “Rank the CSS rules shaping a layout gap.” |
| Audience | “For frontend developers debugging live layouts.” |
| First action | “Try it with sample data”; it says a ranked cause report appears immediately and nothing is saved to real data. |

The title is `CSS Cause Map — rank CSS rules shaping layout gaps`; each fresh
page had `lang="en"`, exactly one `h1`, and a `main` landmark. Neither viewport
had horizontal overflow or console/page errors.

## Demo and user paths

The first action entered `/demo/?demo=1` in one click. The populated report
shows the selected product card, final size and position (312 px by 184 px),
three ranked rules including the parent grid constraint, parent evidence, and
rules to test. The persistent banner says that the sample is not saved to real
data and provides Reset demo and Start for real.

- Normal path: Capture again reported the expected −24 px width change and
  page-class change.
- Reset path: Reset restored the initial sample state.
- Isolation boundary: a seeded `real:review-6` local-storage value survived
  capture, reset, and exit; the demo used `demo:css-cause-map:state` only.
- Recovery path: Start for real removed the demo key, returned home, and did
  not change the seeded real value.
- Offline path: after service-worker control, a fresh offline reload opened
  the demo with title `Demo — CSS Cause Map` and its sample `h1`.
- Export/privacy path: registered tests downloaded both formats and verified
  that page text, query details, fragments, and opted-out selectors are
  removed. Fresh live demo traffic used only the product origin.

The product is a static landing site and packaged browser extension; it has no
product backend, tenant, health, restart, or rate-limit endpoint to test.
The packaged extension workflow is exercised in the claim suite in a fresh
Chromium profile: pointer and Tab/Enter selection, Escape cancellation,
recapture after a removed selection, report-log save/delete, and private
exports all passed.

## Claims and local checks

`npm ci` was run in the clean checkout before verification. Every command in
`.factory/claims.json` was run independently and passed.

| Claim ID | Result |
| --- | --- |
| `ranked-cause-report` | PASS |
| `demo-isolation` | PASS |
| `offline-core` | PASS |
| `private-exports` | PASS |
| `capture-comparison` | PASS |
| `free-core` | PASS |
| `privacy-boundaries` | PASS |
| `manifest-permissions` | PASS |
| `picker-inputs` | PASS |
| `local-report-log` | PASS |
| `local-data-deletion` | PASS |
| `production-build` | PASS |

Additional clean-checkout commands:

```text
npm run typecheck  PASS
npm run lint       PASS
npm test           PASS — 28 Vitest; 31 Playwright; 1 documented duplicate skip
npm run build      PASS — unpacked MV3 extension, ZIP, and dist/site
```

The production manifest is MV3 and requests only `activeTab`, `scripting`,
`storage`, and `sidePanel`; it has no host permissions or automatic content
scripts. Playwright axe found zero violations on live root and demo at both
viewport sizes. The live skip link transfers focus to `main` when activated;
forward navigation and browser Back move focus to and announce the new `h1`.
Reduced motion, visible focus, 44 px targets, legal routes, metadata, and
designed 404 recovery were checked. `/not-a-real-route/` deliberately returns
HTTP 404 and the product-designed page with a return link; this is expected,
not a defect.

## Live comparison and requests

| Artifact | Live SHA-256 and fresh build SHA-256 | Result |
| --- | --- | --- |
| `/` | `32d22e8eff22727dcbce4a69d46146d5c056636c6dbb078fd7dd3a5d840759b4` | Exact match |
| `/demo/` | `468ac1345ba9a869b5e13a60c12bbb19fdee8cd3ad6f253672eb9a7adc14430e` | Exact match |
| `/downloads/css-cause-map-chrome.zip` | `2be3f18b4c42db094f259f2607bff714331b5f4a1e77d1630fd78e3eed874158` | Exact match |

Root, demo, privacy, terms, robots, sitemap, and download returned HTTP 200.
The deliberate unknown route returned HTTP 404. The live first-load and demo
flow made no cross-origin request, and the response CSP permits only self.

## Earlier finding disposition

Every earlier review, verification, and polish finding was checked against the
current live site and candidate rather than accepted from a prior report.

| Earlier findings | Current disposition |
| --- | --- |
| Review 1 B1–B4, H1–H3, M1–M2, N1 | Fixed: clear first screen, isolated demo, registered claims, no unavailable checkout, designed 404, complete route metadata, focus/Back behavior, shared skeleton, three facts, and identified external links. |
| Review 1 U01–U49 and C01–C34 | Fixed: current public copy is plain and uses ranked/shaping evidence rather than unsupported browser-engine causation; every remaining observable promise is listed in the 12-claim registry and passed its test. |
| Verification P1–P2 | Fixed: clean setup prepares WXT; type, target, skip-focus, response-policy, and extension accessibility checks pass. |
| Review 2 F-2-1–F-2-6 | Fixed: independent claim commands run cleanly; mobile shows the report immediately; README and privacy promises are registered; target sizing and report-log deletion pass. |
| Review 3 F-3-1 | Fixed: headline, title, metadata, README, and sample say rules and parents are “shaping” the layout rather than claiming proved browser causation. |
| Review 4 F-4-1 | Fixed: the final install/download statement is listed under `production-build`, whose test checks the staged ZIP and MV3 artifact. |
| Review 5 | Remains verified: no regression in prior zero-finding result. |

## Findings

None.
