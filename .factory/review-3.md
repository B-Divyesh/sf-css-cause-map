# Adversarial first-read review 3 — CSS Cause Map

**Verdict: FAIL**

**Reviewed:** 2026-08-28 UTC  
**Work order:** `css-cause-map-review-3`  
**Candidate:** `e32659efba2fb95a7354728d0a8e112a3991e47a`  
**Live URL:** <https://css-cause-map.sociobot.in>

One BLOCKING finding remains. The product is clear, immediately tryable, and
technically complete, but its most prominent copy promises an identified CSS
cause. The product actually ranks visible evidence and explicitly says it
cannot reveal Chrome's causal layout decisions. That stronger first-screen
claim is not in `.factory/claims.json` and is not proved by any test.

## Cold first read

Fresh Chromium contexts opened the live root at 390×844 and 1366×900. These
answers were recorded at `scrollY = 0` before following any link.

| Question | 390×844 | 1366×900 |
| --- | --- | --- |
| What does it do? | It ranks CSS rules and parent settings that may explain a selected element's layout gap, then produces a report. | Same. |
| For whom? | Frontend developers debugging a live layout. | Same. |
| What should I click first? | **Try it with sample data.** | **Try it with sample data.** |

The audience sentence, sample action, adjacent result, and all three facts were
visible without scrolling. On mobile, the headline ended at y=263, the sample
action at y=453, and the last fact at y=685 in the 844 px viewport. On desktop,
the same elements ended at y=334, y=503, and y=696 in the 900 px viewport.

The exact copy that makes the screen understandable is **“For frontend
developers debugging live layouts…”**, **“Try it with sample data”**, and
**“See a ranked cause report immediately.”** The causal overstatement in the
headline is the separate honesty failure below.

## Findings, ordered by severity

### BLOCKING F-3-1 — the headline and page title claim causation that the product does not establish

**Exact quote/location:** landing h1: **“Find the CSS rule causing a layout
gap”**; root `<title>` and OG/Twitter title: **“CSS Cause Map — find a layout
gap's CSS cause”**. The root meta description also says **“most likely
causing.”** The catalog description says **“Trace the CSS rules and parent
elements causing an element’s size, position, or unwanted gap.”**

**Contradicting product copy:** the same page says **“Scores rank visible CSS
evidence. They do not reveal Chrome’s internal layout decisions.”** README says
**“The report ranks visible CSS evidence. It does not claim to reveal Chrome’s
internal layout decisions.”** The brief requires computed correlation to be
distinguished from browser-layout causation.

**Claim audit:** `ranked-cause-report` proves that visible rules and parents are
ranked with measurements, reasons, and rules to test. It does not prove that
the first rule caused the gap. Its `where` field names the landing report and
method sections, not the hero, title, metadata, or social title. No other claim
entry covers actual causation. README's statement **“Each product promise is
registered in `.factory/claims.json`”** is therefore false while this copy
remains.

**Why a first-time visitor is misled:** “causing” and “CSS cause” promise the
answer, while the product supplies a ranked hypothesis to verify. The caveat
appears after the first screen, so it does not qualify the decision-making
claim a cold visitor sees first.

**Concrete fix:** use **“Rank the CSS rules shaping a layout gap”** as the h1.
Use **“CSS Cause Map — rank CSS rules shaping layout gaps”** for the root,
Open Graph, and Twitter titles. Rewrite the description to **“Rank the CSS
rules and parent elements most likely shaping an element's size, position, or
gap.”** Rewrite the catalog line as **“Rank the CSS rules and parent elements
shaping an element’s size, position, or gap.”** Align the package description
and update the metadata regression assertion. Do not add a causation claim test
unless the product can observe browser-engine causation.

## Copy audit

Counts treat hyphenated terms, paths, and inline commands as one word. The
landing average is 8.1 words and the README average is 8.4 words. No sentence
exceeds 22 words. No banned marketing word or unsupported marketing adjective
appears. CSS, HTML, JSON, MV3, and Chrome permission names are necessary jargon
for the stated frontend-developer and contributor audiences. F-3-1 is the only
copy flag.

### Landing-page sentence inventory

| ID | Words | Exact sentence | Result |
| --- | ---: | --- | --- |
| L01 | 8 | Find the CSS rule causing a layout gap. | **F-3-1: unsupported causal claim** |
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
| L23 | 6 | Notebook image generated for this product. | Pass; provenance is in `.factory/design.md` |

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
| R32 | 3 | Run `npm test`. | Pass |
| R33 | 6 | Run `npm run build` before deployment. | Pass |
| R34 | 7 | Each product promise is registered in `.factory/claims.json`. | **Fails because of F-3-1** |
| R35 | 12 | Run any listed command from a clean checkout to verify that promise. | Pass; all 12 did |
| R36 | 6 | Deploy the static contents of `dist/site/`. | Pass |
| R37 | 4 | See `.factory/brief.json` for scope. | Pass |
| R38 | 9 | See `.factory/design.md` for the visual system and asset provenance. | Pass |
| R39 | 6 | Release evidence is recorded in `.factory/handoff.md`. | Pass |
| R40 | 4 | MIT — see LICENSE. | Pass |

### Headings, actions, and terminology

All section headings make sense when read alone: **“Find a CSS rule to test
next,” “Select the affected element,” “Review the ranked CSS causes,” “Capture
the change and export,” “Inside the cause report,” “See the strongest CSS
constraint first,” “What the extension does not collect,”** and **“Ready for a
live page?”** F-3-1 applies to the h1 and root title, not their word counts.

Result-naming actions pass: **Try it with sample data**, **Download the Chrome
extension**, **Open the sample cause report**, **Read the privacy policy**,
**Download CSS Cause Map**, **Capture again**, **Export JSON**, **Export HTML**,
**Reset demo**, and **Start for real**. Navigation labels name destinations.

Terminology is consistent: the generated result is a **cause report**, context
uses **parent element**, rerunning is **capture again**, the problem is a
**layout problem/gap**, and stored items form the **report log**.

## Demo and sandbox

| Check | Result | Evidence |
| --- | --- | --- |
| One-click entry | PASS | The first-screen action opens `/demo/?demo=1` directly. |
| Immediate realistic use | PASS | At 390×844, “Ranked CSS causes” starts at y=468 and the first cause starts at y=729. The initial screen shows 312×184 px, position, and `grid-template-columns: repeat(3, 1fr)` from parent `.results`. Desktop shows the selected product card and ranked report together. |
| Banner | PASS | “Demo — sample data, nothing is saved to your real data,” Reset demo, and Start for real stay visible. |
| Capture | PASS | Width changes 312→288 px; comparison reports −24 px and the class change. |
| Reset | PASS | Width returns to 312 px, comparison disappears, and focus moves to the demo h1. |
| Isolation | PASS | A seeded `real:user-setting=keep-me` value survived capture, reset, and exit. The only product key was `demo:css-cause-map:state`; Start for real removed it. |
| Network boundary | PASS | Landing→demo→capture→exports→reset→exit used only `https://css-cause-map.sociobot.in`. No console error occurred. |
| Offline | PASS | After service-worker control, the live demo reloaded offline and Capture again still produced −24 px. |
| Exports | PASS | JSON contained three causes and no page text, query, or fragment. Anonymized HTML contained `element-1` and no real selectors, query, or page text. |

## Claim registry execution

A no-local clone was created at
`/tmp/css-cause-map-review3-clean-xbudGa`. After `npm ci`, the tracked tree was
clean and had no generated `.wxt` directory. Every command was copied from
`.factory/claims.json` and run. The full log is
`/tmp/review3-claims.log` in this disposable worker.

| Claim ID | Listed command | Result |
| --- | --- | --- |
| `ranked-cause-report` | `npm run test:claims -- --grep @claim:ranked-cause-report` | PASS |
| `demo-isolation` | `npm run test:claims -- --grep @claim:demo-isolation` | PASS |
| `offline-core` | `npm run test:claims -- --grep @claim:offline-core` | PASS |
| `private-exports` | `npm run test:claims -- --grep @claim:private-exports` | PASS |
| `capture-comparison` | `npm run test:claims -- --grep @claim:capture-comparison` | PASS |
| `free-core` | `npm run test:claims -- --grep @claim:free-core` | PASS |
| `privacy-boundaries` | `npm run test:claims -- --grep @claim:privacy-boundaries` | PASS |
| `manifest-permissions` | `npm run test:claims -- --grep @claim:manifest-permissions` | PASS |
| `picker-inputs` | `npm run test:claims -- --grep @claim:picker-inputs` | PASS |
| `local-report-log` | `npm run test:claims -- --grep @claim:local-report-log` | PASS |
| `local-data-deletion` | `npm run test:claims -- --grep @claim:local-data-deletion` | PASS |
| `production-build` | `npm run test:claims -- --grep @claim:production-build` | PASS |

The registered tests have unique tags and observable assertions. The remaining
landing and README promises map to these entries: report/ranking/measurements
to `ranked-cause-report`; sample storage to `demo-isolation`; offline behavior
to `offline-core`; removal/anonymization to `private-exports`; before/after to
`capture-comparison`; price boundary to `free-core`; local/network boundaries
to `privacy-boundaries`; permissions to `manifest-permissions`; selection to
`picker-inputs`; report storage/deletion to the two local-log claims; and build
outputs to `production-build`. F-3-1 is the only unlisted claim-like copy.

## Earlier-finding audit

All earlier files were read: `review-1.md`, `review-2.md`, `polish-1.md`,
`polish-2.md`, and the prior `handoff.md`. Closure was checked against the live
site and current source rather than accepted from those records.

### Review 1 structural and inherited verification findings

| Earlier ID | Current verification |
| --- | --- |
| B1 | FIXED — job, frontend-developer audience, sample action, outcome, and three facts are visible at both widths. |
| B2 | FIXED — one-click isolated demo, realistic report, banner, reset, exit, exports, and offline operation all work. |
| B3 | FIXED — 12 registered claims have unique tags and every listed command passes. |
| B4 | FIXED — the unavailable paid offer is absent; every current landing link resolves. |
| H1 | FIXED — an unknown live path returns HTTP 404 with the designed notebook page and return actions. |
| H2 | FIXED — all five routes have descriptions, canonicals, OG/Twitter metadata, social art, favicon, and Apple icon. |
| H3 | FIXED — forward and Back focus the new h1 and update the polite announcer. |
| M1 | FIXED — shared header/footer, Privacy, Terms, factory attribution, and Version 1.0.1 appear on every route. |
| M2 | FIXED — offline, privacy, and free facts are beside the first action. |
| N1 | FIXED — GitHub links identify GitHub and expose external-site text. |
| P1 | FIXED — typecheck, aggregate tests, and standalone claim tests prepare WXT in a clean clone. |
| P2 | FIXED — live/code checks confirm skip focus, type floors, 44×44 targets, response policies, and two-dimensional target tests. |

### Review 1 unlisted-claim findings

| ID | Current verification |
| --- | --- |
| U01 | FIXED — narrowed report promise is covered by `ranked-cause-report` and `privacy-boundaries`. |
| U02 | FIXED — local behavior is covered by `privacy-boundaries`. |
| U03 | FIXED — deterministic-ranking slogan remains removed. |
| U04 | FIXED — both exports and their removals are covered by `private-exports`. |
| U05 | FIXED — the sample exposes measurements, rules, and parents under `ranked-cause-report`. |
| U06 | FIXED — packaged picker selection is covered by `picker-inputs`. |
| U07 | FIXED — pointer, Tab/Enter, and Escape are exercised. |
| U08 | FIXED — the unsupported category list remains replaced by tested rules/parents wording. |
| U09 | FIXED — comparison and exports are covered by two registered claims. |
| U10 | FIXED — the sample's grid constraint ranks first under `ranked-cause-report`. |
| U11 | FIXED — the visible-evidence limitation is asserted. |
| U12 | FIXED — sample causes contain a reason and rule to test. |
| U13 | FIXED — final measurements and position are asserted. |
| U14 | FIXED — property and source are asserted. |
| U15 | FIXED — the unsupported eight-parent claim remains absent. |
| U16 | FIXED — exact −24 px and class change are asserted. |
| U17 | FIXED — accounts, analytics, uploads, and broad permissions are covered by `privacy-boundaries`. |
| U18 | FIXED — picker code is absent before explicit start; all inputs are exercised. |
| U19 | FIXED — text/query/fragment/selector removals are asserted. |
| U20 | FIXED — free analysis and both exports are exercised without a gate. |
| U21 | FIXED — paid/unlimited wording is absent; the retained 100-report limit is tested. |
| U22 | FIXED — price and subscription wording remain absent. |
| U23 | FIXED — license-token wording and code remain absent. |
| U24 | FIXED — visitor-facing Chrome-version promise remains absent. |
| U25 | FIXED — MV3 output and ZIP integrity are asserted. |
| U26 | FIXED — license-check offline wording remains absent. |
| U27 | FIXED — README use-case wording is covered by report/privacy claims. |
| U28 | FIXED — README evidence list is narrowed to tested output. |
| U29 | FIXED — README comparison statement is exercised. |
| U30 | FIXED — README HTML/JSON statement is exercised. |
| U31 | FIXED — explicit active-tab picker behavior is exercised. |
| U32 | FIXED — causes' reasons and rules to test are asserted. |
| U33 | FIXED — the correlation limitation is asserted. |
| U34 | FIXED — source, manifest, and request checks cover network absence. |
| U35 | FIXED — URL and optional selector removal are asserted. |
| U36 | FIXED — free analysis and exports are asserted. |
| U37 | FIXED — paid offer remains absent. |
| U38 | FIXED — restricted-page promise remains absent. |
| U39 | FIXED — cross-origin stylesheet promise remains absent. |
| U40 | FIXED — all production paths and ZIP integrity are asserted. |
| U41 | FIXED — exact conservative MV3 permissions are asserted. |
| U42 | FIXED — no host permissions or content scripts are asserted. |
| U43 | FIXED — clean preparation is enforced by package scripts. |
| U44 | FIXED — detailed test-coverage claim remains removed; README only says `Run npm test`. |
| U45 | FIXED — detailed accessibility-suite marketing copy remains removed. |
| U46 | FIXED — README no longer makes a lint-coverage claim. |
| U47 | FIXED — README no longer promises deployed headers. Live headers were checked independently. |
| U48 | FIXED — hosted-checkout copy remains absent. |
| U49 | FIXED — embedded-payment copy and code remain absent. |

### Review 1 copy findings

| ID | Current verification |
| --- | --- |
| C01 | FIXED — the audience is frontend developers, not a notebook metaphor. |
| C02 | FIXED for clarity — the h1 names the job; F-3-1 is a new honesty defect in its causal wording. |
| C03 | FIXED — the audience/result sentence is 18 words and concrete. |
| C04 | FIXED — “parent elements” replaces “ancestor chain.” |
| C05 | FIXED — hero install jargon is replaced by three facts. |
| C06 | FIXED — deterministic slogan remains absent. |
| C07 | FIXED — export copy names the removed data. |
| C08 | FIXED — method heading names the next-rule outcome. |
| C09 | FIXED — cause-report wording replaces “evidence sheet.” |
| C10 | FIXED — selection heading is direct. |
| C11 | FIXED — ranking heading names ranked CSS causes. |
| C12 | FIXED — broad CSS category list remains narrowed. |
| C13 | FIXED — heading names capture and export. |
| C14 | FIXED — capture/export instruction is plain and under 22 words. |
| C15 | FIXED — section is “Inside the cause report.” |
| C16 | FIXED — heading says the strongest constraint appears first. |
| C17 | FIXED — two short sentences state evidence and limitation. |
| C18 | FIXED — privacy heading names what is not collected. |
| C19 | FIXED — removals and anonymous labels are explicit. |
| C20 | FIXED — paid notebook metaphor remains absent. |
| C21 | FIXED — final heading names the next-rule outcome. |
| C22 | FIXED — vague field-method action remains absent. |
| C23 | FIXED — header action names the extension download. |
| C24 | FIXED — README introduction is short and direct. |
| C25 | FIXED — README now says only `Run npm test`. |
| C26 | FIXED — dense side-panel test sentence remains absent. |
| C27 | FIXED — dense deployment-policy sentence remains absent. |
| C28 | FIXED — dense manual-smoke sentence remains absent. |
| C29 | FIXED — product-record references are separate sentences. |
| C30 | FIXED — README names frontend developers and the layout problem. |
| C31 | FIXED — README uses “capture again” and names export removals. |
| C32 | FIXED — limitation uses “visible evidence” and plain language. |
| C33 | FIXED — cross-origin jargon remains absent. |
| C34 | FIXED — delta/mutation jargon remains absent. |

### Review 2 findings

| Earlier ID | Current verification |
| --- | --- |
| F-2-1 | FIXED — `pretest:claims` exists; all 12 listed commands passed from the clean clone. |
| F-2-2 | FIXED — at 390×844 the report title, measurements, and first ranked property are visible immediately. |
| F-2-3 | FIXED — README's unregistered coverage list is gone. |
| F-2-4 | FIXED — README's unregistered deployment-header promise is gone. |
| F-2-5 | FIXED — live targets meet 44×44 px; source and tests check width and height. |
| F-2-6 | FIXED — visible two-step Clear report log action and `local-data-deletion` test remove reports and notes. |

### Polish and prior handoff assertions

| Assertion | Current verification |
| --- | --- |
| Mobile masked overflow | FIXED — 390 px document/main widths are contained; live Axe has zero violations. |
| WXT update/audit | CONFIRMED — WXT 0.21.4 is installed and `npm ci` reports zero vulnerabilities. |
| Catalog/copy terminology | FAIL under F-3-1 — the line is 93 characters and starts with a verb, but repeats the unsupported “causing” claim. Other terminology remains consistent. |
| “No finding remains open” / “Known gaps: none” | REGRESSED by new F-3-1 — prior listed findings are closed, but the causal hero claim remains unlisted and unsupported. |

## Structure, accessibility, privacy, and identity

| Check | Result | Evidence |
| --- | --- | --- |
| Titles | PASS pattern/length; **FAIL honesty under F-3-1** | Root is 45 characters and route titles are unique. Root wording overclaims causation. |
| Semantics | PASS | Every inspected route has `lang=en`, one h1, one main, header, footer, and skip link. |
| Metadata | PASS except F-3-1 wording | Descriptions, canonicals, OG/Twitter, 1200×630 social art, SVG favicon, Apple icon, and theme color exist. |
| Robots/sitemap | PASS | Sitemap lists root, demo, privacy, and terms; robots points to it. |
| 404 | PASS | Unknown live path returns HTTP 404 with the notebook design and two return paths. |
| Deep links/history/focus | PASS | Direct loads work; Privacy navigation and Back focus/announce the new h1. |
| Dead links | PASS | Root, anchors, demo, legal routes, ZIP, and GitHub all returned 200. |
| Shared skeleton | PASS | Header/footer, legal links, one-liner, factory attribution, and version are consistent. |
| Accessibility | PASS | Axe found zero violations on five live routes at 390 and 1366 px. `verify-url.sh` found no console, title, lang, h1, main, alt, or button defect. |
| Motion/targets/contrast basics | PASS | Reduced-motion CSS exists; browser suites verify type and 44×44 target floors; Axe is clean. |
| Privacy | PASS | Fresh live demo traffic was same-origin only; manifest has no host permissions/content scripts; source has no extension fetch path. |
| Size | PASS | Built site JS totals about 0.78 kB gzip for root shared chunks and 2.54 kB including demo, below budget. |
| Identity | PASS | Warm drafting paper, serif/monospace type, ruled layout, blue/red annotations, generated lab art, and notebook 404 are product-specific, not a generic SaaS template. |

The fresh build's root, demo, privacy, terms, 404, hashed CSS/JS, and extension
ZIP were byte-identical to production. The ZIP passed `unzip -t`.

## Quality gates

Fresh clone results:

```text
npm ci                PASS — 304 packages; 0 vulnerabilities
npm run typecheck     PASS
npm run lint          PASS — zero warnings
npm test              PASS — 28 Vitest; 31 Playwright; 1 intentional duplicate skip
npm run build         PASS — MV3 extension, ZIP, and dist/site
12 claim commands     PASS — 12/12
verify-url.sh (live)  PASS — HTTP 200; no browser errors
live Axe              PASS — 0 violations on 5 routes × 2 viewports
```

## Missed leverage

No AI, sync, or import feature is an obvious missing part of the brief. The
tool already compares captures, exports HTML/JSON, keeps a local report log,
and deletes it. Adding AI would introduce network/key handling to a local,
deterministic CSS evidence workflow without solving a stated missing step.

## What would make this perfect

Replace the unsupported causation language in the h1, root title, social
titles, meta and package descriptions, and catalog line with the tested “rank”
and “shaping” language in F-3-1. Then rerun the copy/claim cross-check and live
metadata test. Nothing else was found to change.

## Final decision

**FAIL.** All automated claims and workflows pass, but the standard requires
zero findings and zero unlisted claims. F-3-1 is both a first-screen honesty
defect and an unlisted product claim.
