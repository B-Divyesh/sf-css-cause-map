# Adversarial first-read review 2 — CSS Cause Map

**Verdict: FAIL**

**Reviewed:** 2026-08-28 UTC

**Work order:** `css-cause-map-review-2`

**Candidate:** `062876abbc095b6bd42d114c23e682c79a895fcb`

**Live URL:** <https://css-cause-map.sociobot.in>

Five blocking findings and one high finding remain. The landing page now explains the job, audience,
and first action. The live sandbox is isolated and works offline. However, every
claim command fails from a clean clone, two earlier unlisted README claims
remain unlisted, the mobile demo hides the cause report below its first
viewport, and the advertised 44 px target floor checks only height.

## Cold first read

Fresh Chromium contexts opened the live root at 390×844 and 1366×900. No
scrolling occurred before these answers were recorded.

| Question | 390×844 | 1366×900 |
| --- | --- | --- |
| What does it do? | Finds and ranks CSS rules and parent settings likely to cause a selected element's layout gap. | Same. |
| For whom? | Frontend developers debugging live layouts. | Same. |
| What should I click first? | **Try it with sample data.** | **Try it with sample data.** |

The first screen passes. The exact text doing the work is **“Find the CSS rule
causing a layout gap”**, **“For frontend developers debugging live layouts…”**,
and **“Try it with sample data.”** The action, adjacent outcome, and privacy,
offline, and price facts are visible without scrolling at both widths.

## Findings, ordered by severity

### BLOCKING F-2-1 — all 11 registered claim commands fail from a clean clone (reopens B3 and P1)

**Quote/location:** every `.factory/claims.json` entry uses
`npm run test:claims -- --grep @claim:<id>`. README says, **“Run any listed
command from a clean checkout to verify that promise.”**

**Evidence:** a fresh `git clone --no-local` followed by `npm ci` and each
listed command produced 11 failures. Playwright could not start its web server:

```text
Cannot find base config file "./.wxt/tsconfig.json"
[vite:build-html] failed to resolve "extends":"./.wxt/tsconfig.json"
Process from config.webServer was not able to start. Exit code: 1
```

The failing claim IDs were `ranked-cause-report`, `demo-isolation`,
`offline-core`, `private-exports`, `capture-comparison`, `free-core`,
`privacy-boundaries`, `manifest-permissions`, `picker-inputs`,
`local-report-log`, and `production-build`. No listed command reached its
tagged test. Running `npm test` later in the same clone passed because its
`pretest` hook ran `wxt prepare`; `test:claims` has no equivalent hook.

**Why this misleads:** the claim registry presents every promise as independently
verifiable from a clean state, but none is. This directly fails the claims
contract regardless of the later aggregate-suite result.

**Concrete fix:** add `"pretest:claims": "npm run prepare:wxt"` or include the
preparation in `test:claims`. Extend the release contract to delete `.wxt`, run
each command from `claims.json`, and require one passing matching test.

### BLOCKING F-2-2 — the mobile demo does not show the cause report in its first screen (reopens B2)

**Quote/location:** live `/demo/?demo=1` at 390×844. The first viewport shows
**“Inspect a sample layout gap”** and the selected sample card. The core output,
**“Ranked CSS causes,”** begins at y=1,002; the cause-report container begins at
y=948, below the 844 px viewport. The first cause list begins at y=1,350.

**Why this loses a first-time visitor:** after the promised one-click trial, a
phone visitor sees the input selection but not the product's ranked result.
The desktop viewport shows both panes, so the demo is only half-fixed for the
required mobile-first check.

**Concrete fix:** put the cause-report pane before the selected-page pane below
the mobile breakpoint, or place a compact first-ranked-cause summary directly
under the demo heading. Add a 390×844 test that clicks from `/` without
scrolling and asserts `#report-title` plus the first `#demo-causes` item are in
the viewport.

### BLOCKING F-2-3 — the README test-coverage promise is still unlisted (reopens U44)

**Quote/location:** README: **“Run `npm test` for unit, claim, browser, mobile,
accessibility, privacy, and offline checks.”** No `.factory/claims.json` entry
lists or tests this promise.

**Why this misleads:** a contributor can rely on the named suite coverage, but
the claim registry does not keep that list synchronized. The earlier finding
was shortened, not removed or registered.

**Concrete fix:** rewrite it as the instruction **“Run `npm test`.”** If the
coverage list is retained, add a `test-coverage` claim whose tagged test
confirms each named class actually runs.

### BLOCKING F-2-4 — the deployment-header promise is still unlisted (reopens U47)

**Quote/location:** README: **“The deployment configuration adds cache and
security headers.”** There is no response-policy claim in `.factory/claims.json`.

**Why this misleads:** source configuration alone does not prove a deployed host
returns those headers. The live host did return CSP, cache, frame, permissions,
nosniff, and referrer headers during this review, but the published promise has
no registered repeatable test.

**Concrete fix:** remove that sentence, or add `response-policies` to the claim
registry with a test against deployed response headers. A source-string test
alone is not sufficient.

### BLOCKING F-2-5 — “Demo” links are narrower than the 44 px target floor (reopens P2)

**Quote/location:** the live **“Demo”** link is 38.53×44 px in the desktop header
and in every footer; the footer instance remains 38.53×44 px at 390×844. The
current `undersizedTargets` helper in `tests/site-accessibility.spec.ts` measures
only `height`.

**Why this matters:** the attached accessibility contract requires targets to
be at least 44 px, but the test can pass a control that is too narrow. The
polish record claims a 44 px target floor that the live page does not meet.

**Concrete fix:** give short navigation links at least 44 px of clickable width
with padding or `min-width`. Update the Playwright helper to fail when either
width or height is below 44 px, while treating a checkbox's associated label as
its effective target.

### HIGH F-2-6 — the privacy page makes an unlisted deletion claim

**Quote/location:** live `/privacy/`: **“Clear extension data or uninstall the
extension to remove saved reports.”** Neither `local-report-log` nor another
entry in `.factory/claims.json` states or tests deletion.

**Why this matters:** a person deciding whether to save private notes may rely
on the promised deletion path. The claim cross-check cannot treat storage and
deletion as the same observable outcome.

**Concrete fix:** add a `local-data-deletion` claim and a packaged-extension
test that saves a report, performs the documented clearing action, reloads, and
asserts the report and note are absent. Prefer a visible **Clear report log**
action over requiring removal of the whole extension.

## Copy audit

Counts treat hyphenated terms, paths, commands, and CSS values as one token.
No sentence exceeds 22 words and no banned marketing word appears. Current
headings make sense out of context. Landing actions name their result; the two
unlisted README claims are findings F-2-3 and F-2-4.

### Landing-page sentence inventory

| ID | Words | Exact sentence | Result |
| --- | ---: | --- | --- |
| L01 | 8 | Find the CSS rule causing a layout gap. | Pass |
| L02 | 18 | For frontend developers debugging live layouts, rank the rules and parent elements most likely shaping the selected element. | Pass |
| L03 | 6 | See a ranked cause report immediately. | Pass |
| L04 | 7 | Nothing is saved to your real data. | Pass |
| L05 | 4 | Core analysis works offline. | Pass |
| L06 | 4 | Analysis stays in Chrome. | Pass |
| L07 | 6 | Core analysis and exports are free. | Pass |
| L08 | 8 | Trace one layout effect through its parent elements. | Pass |
| L09 | 12 | See computed styles, layout measurements, and parent constraints in one cause report. | Pass |
| L10 | 4 | Open the side panel. | Pass |
| L11 | 11 | Select the element with a pointer, or use Tab and Enter. | Pass |
| L12 | 11 | See the CSS rules and parent settings ranked by likely effect. | Pass |
| L13 | 4 | Reproduce the layout problem. | Pass |
| L14 | 10 | Capture again, then export a private HTML or JSON report. | Pass |
| L15 | 5 | Scores rank visible CSS evidence. | Pass |
| L16 | 8 | They do not reveal Chrome’s internal layout decisions. | Pass |
| L17 | 9 | The parent creates three tracks that constrain this card. | Pass |
| L18 | 11 | There are no accounts, analytics, page uploads, or broad site permissions. | Pass |
| L19 | 7 | Exports remove page text and URL queries. | Pass |
| L20 | 8 | You can replace CSS selectors with anonymous labels. | Pass |
| L21 | 8 | Install the ZIP as an unpacked Chrome extension. | Pass |
| L22 | 11 | Find the CSS rules and parent elements shaping a selected element. | Pass |
| L23 | 6 | Notebook image generated for this product. | Pass; provenance is recorded in `.factory/design.md` |

Average: 8.1 words. The headline is eight words and the supporting sentence is
18 words.

### Landing headings and actions

| Type | Copy with word count | Result |
| --- | --- | --- |
| Section headings | CSS layout diagnosis for frontend developers (6); Three diagnosis steps (3); Find a CSS rule to test next (7); Select the affected element (4); Review the ranked CSS causes (5); Capture the change and export (5); Inside the cause report (4); See the strongest CSS constraint first (6); Privacy boundaries (2); What the extension does not collect (6); Ready for a live page? (5) | Pass; each names its context or result |
| Primary and result actions | Try it with sample data (6); Download the Chrome extension (5); Open the sample cause report (5); Read the privacy policy (4); Download CSS Cause Map (4) | Pass |
| Navigation links | Demo (1); How it works (3); Privacy (1); Download extension (2); Terms (1); View source on GitHub (4) | Pass as destinations; target-size failure is F-2-5 |

### README sentence inventory

| ID | Words | Exact sentence | Result |
| --- | ---: | --- | --- |
| R01 | 14 | CSS Cause Map is a Chrome extension for frontend developers debugging a layout problem. | Pass |
| R02 | 13 | Select an element to rank the CSS rules and parent elements shaping it. | Pass |
| R03 | 11 | Capture the element again to compare its size and page changes. | Pass |
| R04 | 13 | Export an HTML or JSON report without page text or URL query details. | Pass |
| R05 | 9 | Starts after you choose it on the current tab. | Pass |
| R06 | 9 | Shows final measurements, matched CSS rules, and parent constraints. | Pass |
| R07 | 11 | Explains why each cause matters and names a rule to test. | Pass |
| R08 | 7 | Compares measurements and page changes between captures. | Pass |
| R09 | 9 | Keeps analysis inside Chrome and makes no network requests. | Pass |
| R10 | 11 | Exports HTML and JSON without page text or private URL details. | Pass |
| R11 | 11 | Stores up to 100 reports and private notes in extension storage. | Pass |
| R12 | 7 | Keeps analysis and both export formats free. | Pass |
| R13 | 6 | The report ranks visible CSS evidence. | Pass |
| R14 | 10 | It does not claim to reveal Chrome’s internal layout decisions. | Pass |
| R15 | 5 | Open the sample cause report. | Pass |
| R16 | 13 | It starts with a selected product card, ranked causes, measurements, and parent constraints. | Pass |
| R17 | 8 | Choose Capture again to see a width change. | Pass |
| R18 | 13 | Export both report formats, or choose Reset demo to restore the original sample. | Pass |
| R19 | 6 | Demo state uses the `demo:css-cause-map:state` key. | Pass |
| R20 | 12 | Starting for real removes that key and never changes normal browser data. | Pass |
| R21 | 8 | See `.factory/demo.md` for the sample and isolation contract. | Pass |
| R22 | 5 | Use Node.js 20 or newer. | Pass |
| R23 | 12 | `npm run build` creates the unpacked MV3 extension, its ZIP, and `dist/site/`. | Pass |
| R24 | 8 | The site folder includes the downloadable extension ZIP. | Pass |
| R25 | 4 | Run `npm run build`. | Pass |
| R26 | 6 | Open `chrome://extensions` and enable Developer mode. | Pass |
| R27 | 6 | Choose Load unpacked, then select `.output/chrome-mv3`. | Pass |
| R28 | 12 | Open a web page and select the CSS Cause Map toolbar icon. | Pass |
| R29 | 7 | Choose Pick element in the side panel. | Pass |
| R30 | 8 | The extension requests `activeTab`, `scripting`, `storage`, and `sidePanel`. | Pass |
| R31 | 6 | It requests no website host permission. | Pass |
| R32 | 13 | Run `npm test` for unit, claim, browser, mobile, accessibility, privacy, and offline checks. | **F-2-3** |
| R33 | 6 | Run `npm run build` before deployment. | Pass |
| R34 | 7 | Each product promise is registered in `.factory/claims.json`. | Fails while F-2-3 and F-2-4 remain |
| R35 | 12 | Run any listed command from a clean checkout to verify that promise. | **F-2-1** |
| R36 | 6 | Deploy the static contents of `dist/site/`. | Pass |
| R37 | 8 | The deployment configuration adds cache and security headers. | **F-2-4** |
| R38 | 4 | See `.factory/brief.json` for scope. | Pass |
| R39 | 9 | See `.factory/design.md` for the visual system and asset provenance. | Pass |
| R40 | 6 | Release evidence is recorded in `.factory/handoff.md`. | Pass |
| R41 | 4 | MIT — see LICENSE. | Pass |

Average: 8.7 words. README headings — **What it does**, **Try the isolated
sample**, **Develop**, **Install the extension locally**, **Test and deploy**,
**Product records**, and **License** — all make sense out of context. Commands
and UI instructions start with concrete verbs.

Terminology is consistent: generated output is a **cause report**, context uses
**parent element**, rerunning is **capture again**, and the defect is a **layout
problem** or the narrower **layout gap** named by the headline.

## Demo and sandbox verification

| Check | Result | Evidence |
| --- | --- | --- |
| One-click entry | PASS | Landing primary action navigates directly to `/demo/?demo=1`. |
| Realistic seeded state | PASS, desktop; BLOCKING on first mobile viewport | Product card, measurements, three ranked causes, parent constraints, rules to test, and before/after state are present. F-2-2 records the mobile placement failure. |
| Persistent banner | PASS | “Demo — sample data, nothing is saved to your real data,” Reset demo, and Start for real remain sticky. |
| Reset | PASS | Capture changes width 312→288 px and records a class change; Reset restores 312 px, clears the comparison, and focuses the demo h1. |
| Storage isolation | PASS | Seeded `real:user-setting=keep-me` survived capture, reset, and exit. The only new key was `demo:css-cause-map:state`; Start for real removed it. |
| Network boundary | PASS for the live demo | The complete landing→demo→capture→reset→export→exit flow requested only `https://css-cause-map.sociobot.in`. |
| Offline | PASS for the live demo | After service-worker control, offline reload succeeded and Capture again produced the −24 px result. |
| Exports | PASS in manual live exercise | JSON downloaded with three causes and no page text, query, or fragment; registered tests cover JSON and anonymized HTML after preparation. |

## Claim registry execution

The commands below were copied exactly from `.factory/claims.json` and run
after `npm ci` in `/tmp/css-cause-map-review2-clean-rHPlrg`, a clone with no
generated `.wxt` directory.

| Claim ID | Listed command result |
| --- | --- |
| `ranked-cause-report` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `demo-isolation` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `offline-core` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `private-exports` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `capture-comparison` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `free-core` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `privacy-boundaries` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `manifest-permissions` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `picker-inputs` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `local-report-log` | **FAIL** before test: missing `.wxt/tsconfig.json` |
| `production-build` | **FAIL** before test: missing `.wxt/tsconfig.json` |

After `npm test` prepared WXT, the aggregate run passed all 11 tagged tests.
That diagnostic does not change the required clean-clone results above. The
landing and README cross-check found the two unlisted promises in F-2-3 and
F-2-4. The full live-route cross-check also found the deletion promise in
F-2-6.

## Earlier-finding audit

### Review 1 structural findings and polish carryovers

| Earlier ID | Status verified live and in code |
| --- | --- |
| B1 | FIXED — first screen names the job, frontend developers, sample action, outcome, and three facts at both widths. |
| B2 | **HALF-FIXED / BLOCKING — F-2-2**; isolation works, but the mobile first screen hides the cause report. |
| B3 | **REGRESSED / BLOCKING — F-2-1**; registry and tags exist, but no listed command runs from a clean clone. |
| B4 | FIXED — paid offer and dead checkout are absent; live link crawl returned 200 for every current destination. |
| H1 | FIXED — unknown URL returns HTTP 404 with the notebook-styled product page, h1, main, and return links. |
| H2 | FIXED — every route has the expected title, description, canonical, OG/Twitter image, favicon, and Apple touch icon. |
| H3 | FIXED — forward navigation and browser Back focus and announce the destination h1. |
| M1 | FIXED — header/footer skeleton, legal links, factory attribution, and Version 1.0.1 are shared across routes. |
| M2 | FIXED — privacy, offline, and free facts are beside the primary action. |
| N1 | FIXED — GitHub links name the external destination and include accessible external-site text. |
| P1 | **PARTIAL / BLOCKING — F-2-1**; `npm test` and typecheck prepare WXT, but the registry's `test:claims` command does not. |
| P2 | **REGRESSED / BLOCKING — F-2-5**; policies and type floors pass, but 44 px target tests ignore width. |

### Review 1 unlisted-claim findings

“Covered” below means the current wording exists in `.factory/claims.json` and
the corresponding tagged test passed in the prepared aggregate suite. It does
not override F-2-1's clean-command failure.

| ID | Verification |
| --- | --- |
| U01 | Covered by `ranked-cause-report` and `privacy-boundaries`; live demo shows the named evidence. |
| U02 | Covered by `privacy-boundaries`; extension sources and manifest contain no network permission/path. |
| U03 | Fixed by removal of the deterministic-ranking claim. |
| U04 | Covered by `private-exports`; both formats download. |
| U05 | Covered by `ranked-cause-report`; measurements, rules, and parents are populated. |
| U06 | Covered by `picker-inputs`; packaged extension selects the fixture. |
| U07 | Covered by `picker-inputs`; pointer, Tab/Enter, and Escape are exercised. |
| U08 | Fixed by narrowing the copy to tested CSS rules and parent settings. |
| U09 | Covered by `capture-comparison` and `private-exports`. |
| U10 | Covered by `ranked-cause-report`; grid columns are first in the seeded report. |
| U11 | Covered by `ranked-cause-report`; limitation copy is visible. |
| U12 | Covered by `ranked-cause-report`; causes include reasons and rules to test. |
| U13 | Covered by `ranked-cause-report`; final size and position are asserted. |
| U14 | Covered by `ranked-cause-report`; matched property and origin are shown. |
| U15 | Fixed by removing the eight-parent claim. |
| U16 | Covered by `capture-comparison`; exact −24 px change is asserted. |
| U17 | Covered by `privacy-boundaries`. |
| U18 | Covered by `picker-inputs`; picker script is absent before explicit start. |
| U19 | Covered by `private-exports`. |
| U20 | Covered by `free-core`. |
| U21 | Fixed by removing Field Kit; the remaining 100-report log is covered by `local-report-log`. |
| U22 | Fixed by removing price and subscription copy. |
| U23 | Fixed by removing license-token copy and code. |
| U24 | Fixed by removing the Chrome 116+ claim. |
| U25 | Covered by `production-build`. |
| U26 | Fixed by removing the license-check offline claim. |
| U27 | Rewritten and covered by `ranked-cause-report` and `privacy-boundaries`. |
| U28 | Rewritten and covered by `ranked-cause-report`. |
| U29 | Covered by `capture-comparison`. |
| U30 | Covered by `private-exports`. |
| U31 | Covered by `picker-inputs`. |
| U32 | Covered by `ranked-cause-report`. |
| U33 | Covered by `ranked-cause-report`. |
| U34 | Covered by `privacy-boundaries`. |
| U35 | Covered by `private-exports`. |
| U36 | Covered by `free-core`. |
| U37 | Fixed by removing the paid offer. |
| U38 | Fixed by removing the restricted-page claim from README. |
| U39 | Fixed by removing the cross-origin stylesheet claim. |
| U40 | Covered by `production-build`; build artifacts and ZIP integrity pass after preparation. |
| U41 | Rewritten and covered by `manifest-permissions`; license network access was removed. |
| U42 | Covered by `manifest-permissions`; no host permissions are present. |
| U43 | Fixed by removing the explicit clean-typecheck promise; `pretypecheck` is present. |
| U44 | **HALF-FIXED / BLOCKING — F-2-3**; shortened claim remains unlisted. |
| U45 | Fixed by removing the detailed side-panel suite claim from README. |
| U46 | Fixed by removing the lint-coverage claim from README. |
| U47 | **HALF-FIXED / BLOCKING — F-2-4**; shortened header claim remains unlisted. |
| U48 | Fixed by removing payment-provider copy. |
| U49 | Fixed by removing payment-provider copy. |

### Review 1 copy findings

| ID | Verification |
| --- | --- |
| C01 | Fixed — audience is “frontend developers”; no field-notebook positioning remains. |
| C02 | Fixed — headline directly says “Find the CSS rule causing a layout gap.” |
| C03 | Fixed — supporting copy is 18 words and removes compact/box/DOM jargon. |
| C04 | Fixed — “parent elements” replaces “ancestor chain.” |
| C05 | Fixed — the MV3 fragment stack is gone from the hero. |
| C06 | Fixed — deterministic slogan removed. |
| C07 | Fixed — export copy names what is removed. |
| C08 | Fixed — heading names the next CSS rule outcome. |
| C09 | Fixed — cause-report wording replaces “evidence sheet.” |
| C10 | Fixed — heading is “Select the affected element.” |
| C11 | Fixed — heading is “Review the ranked CSS causes.” |
| C12 | Fixed — broad category list was narrowed to tested rules and parent settings. |
| C13 | Fixed — heading names capture and export. |
| C14 | Fixed — “Capture again” and private formats are stated plainly. |
| C15 | Fixed — section is “Inside the cause report.” |
| C16 | Fixed — heading says the strongest constraint appears first. |
| C17 | Fixed — two short sentences explain visible evidence and the browser limit. |
| C18 | Fixed — privacy heading names what is not collected. |
| C19 | Fixed — copy names removed text/queries and anonymous labels. |
| C20 | Fixed — paid notebook heading removed. |
| C21 | Fixed — final heading names the rule-to-test result. |
| C22 | Fixed — vague field-method action removed. |
| C23 | Fixed — header action is “Download extension.” |
| C24 | Fixed — README introduction is split into short sentences. |
| C25 | Fixed as copy — current test sentence is 13 words; its unlisted status is F-2-3. |
| C26 | Fixed — 23-word side-panel sentence removed. |
| C27 | Fixed as copy — current header sentence is eight words; its unlisted status is F-2-4. |
| C28 | Fixed — dense manual-smoke sentence removed. |
| C29 | Fixed — product-record references are split. |
| C30 | Fixed — README names the audience and layout problem directly. |
| C31 | Fixed — “capture again” and removed details replace recapture/scrubbed jargon. |
| C32 | Fixed — visible-evidence limitation is two plain sentences. |
| C33 | Fixed — cross-origin jargon was removed. |
| C34 | Fixed — delta/mutation jargon was removed. |

## Structure, accessibility, privacy, and identity

| Check | Result | Evidence |
| --- | --- | --- |
| Titles | PASS | Root title is 45 characters and uses “Product — what it does”; Demo, Privacy, Terms, and 404 use route-specific patterns. |
| Semantics | PASS | Each inspected route has `lang=en`, one h1, one main, ordered headings, skip link, header, and footer. |
| Metadata | PASS | Descriptions, canonicals, OG/Twitter image, SVG favicon, 180×180 Apple touch icon, theme color, robots, and sitemap are present. Social image is 1200×630. |
| 404 | PASS | Unknown URL returns HTTP 404 with the product-styled notebook page and routes home/demo. |
| Deep links and history | PASS | All real routes reload directly; forward and Back restore the route and focus the h1 with a polite announcement. |
| Link crawl | PASS | All internal routes, ZIP, assets, and GitHub destination returned 200. |
| Header/footer | PASS except F-2-5 | Shared content, Privacy, Terms, factory attribution, and build version appear throughout. |
| Console and axe | PASS | No console errors; Axe found zero violations on the live demo at desktop and 390 px. |
| Touch targets | **BLOCKING — F-2-5** | “Demo” is 38.53 px wide. |
| Reduced motion | PASS | `prefers-reduced-motion: reduce` removes transitions/animation/scroll behavior. |
| First-load size | PASS | Built landing JS is 0.38 kB gzip plus a 0.40 kB shared module, below the static budget. |
| Visual identity | PASS | Warm drafting paper, serif/monospace pairing, ruled notebook rhythm, red/blue annotations, original lab image, and matching 404 are distinct from a generic SaaS template. |

`/opt/fleet/lib/verify-url.sh` passed the live root: HTTP 200 in 551 ms,
correct title/lang/h1/main, no missing alt, no unlabeled button, and no console
error. Live response headers included self-only CSP, immutable asset rules,
frame denial, permissions policy, nosniff, strict-origin referrer policy, and
HSTS.

## Missed leverage

No additional AI, sync, or import feature is implied strongly enough to add.
The brief's obvious high-value extensions are before/after capture, private
HTML/JSON export, and a local report log; all are present. AI would add network
and key handling to a deterministic local-first debugger without improving its
core causal-evidence job.

## What would make this perfect

1. Make every `claims.json` command prepare WXT and pass independently from a
   clone with no generated files.
2. Move the first ranked cause into the initial 390×844 demo viewport.
3. Remove or register the README test-coverage and response-header promises.
4. Make every effective target at least 44×44 px and test both dimensions.
5. Add and test a user-visible way to clear the local report log.
6. Re-run this full review from a fresh clone and fresh live contexts; PASS only
   if the result contains zero findings and zero untested claims.

## Final decision

**FAIL.** The live product is substantially clearer and the primary workflows
work, but the review contract permits no claim-test failure, unlisted claim,
half-fixed earlier finding, or target-size regression.
