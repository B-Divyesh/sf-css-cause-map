# Adversarial first-read review 4 — CSS Cause Map

**Verdict: FAIL**

**Reviewed:** 2026-08-28 UTC  
**Work order:** `css-cause-map-review-4`  
**Candidate:** `ff6b70f376f420c0ef36e0f6c5fc70e0eeef6a5d`  
**Live URL:** <https://css-cause-map.sociobot.in>

One claim-registration defect remains. The product is clear, tryable, visually
specific, and its tested workflows passed, but the acceptance standard is zero
findings and every claim location must be registered.

## Cold first read

Fresh Chromium contexts opened the live root at 390×844 and 1366×900. Neither
context was scrolled before answering.

| Question | 390 px answer | Desktop answer |
| --- | --- | --- |
| What does it do? | It ranks CSS rules and parent elements that are likely shaping a selected element's layout gap. | Same. |
| For whom? | Frontend developers debugging live layouts. | Same. |
| What should I click first? | **Try it with sample data** to see a ranked cause report immediately. | Same. |

The answers are explicit in the first screen: **“Rank the CSS rules shaping a
layout gap”**, **“For frontend developers debugging live layouts”**, and
**“Try it with sample data.”** The adjacent result note says **“See a ranked
cause report immediately. Nothing is saved to your real data.”** The three
facts are visible before scrolling: offline core analysis, analysis in Chrome,
and free core analysis/exports. No first-read blocking finding was observed.

## Findings, ordered by severity

### MEDIUM F-4-1 — the final landing-page installation claim is not registered at its live location

**Location and quote:** root landing page, final call-to-action, **“Install the
ZIP as an unpacked Chrome extension.”**

**Evidence:** `.factory/claims.json` has `production-build`, whose test proves
the built unpacked MV3 output and ZIP, but its `where` is only **“README”**.
No entry lists the landing page's final installation statement. The claims
contract requires `where` to list every visitor-facing occurrence of a relied-on
statement; this sentence tells a visitor what the downloaded ZIP is and how it
is usable.

**Why this matters:** the statement is currently true and the build test passes,
but the registry cannot show that the live landing-page promise is intentionally
covered. A later copy or staging change could make the final action misleading
without changing the registered location inventory.

**Concrete fix:** add `landing final call-to-action` to `production-build.where`
and retain or extend `@claim:production-build` to assert that the staged site's
download is a valid unpacked MV3 ZIP. Alternatively remove the sentence. Do not
claim PASS until the location is registered.

## Copy audit

Counts treat hyphenated terms, URLs, code identifiers, and CSS values as one
word. The audit found no sentence above 22 words, banned marketing adjective,
inconsistent product term, context-free heading, or non-result-naming action.
The one claim-registration issue is F-4-1 above, not a plain-words failure.

### Landing-page sentences

| ID | Words | Exact sentence | Result |
| --- | ---: | --- | --- |
| L01 | 8 | Rank the CSS rules shaping a layout gap. | Pass |
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
| L21 | 8 | Install the ZIP as an unpacked Chrome extension. | F-4-1 registry location omitted |
| L22 | 11 | Find the CSS rules and parent elements shaping a selected element. | Pass |
| L23 | 6 | Notebook image generated for this product. | Pass; provenance is in `design.md` |

Headings make sense in isolation: **Find a CSS rule to test next**, **Select the
affected element**, **Review the ranked CSS causes**, **Capture the change and
export**, **Inside the cause report**, **See the strongest CSS constraint
first**, and **What the extension does not collect**. Actions name a result:
**Try it with sample data**, **Download the Chrome extension**, **Open the
sample cause report**, **Read the privacy policy**, and **Download CSS Cause
Map**.

### README sentences

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
| R34 | 7 | Each product promise is registered in `.factory/claims.json`. | Pass after F-4-1 is repaired |
| R35 | 12 | Run any listed command from a clean checkout to verify that promise. | Pass |
| R36 | 6 | Deploy the static contents of `dist/site/`. | Pass |
| R37 | 4 | See `.factory/brief.json` for scope. | Pass |
| R38 | 9 | See `.factory/design.md` for the visual system and asset provenance. | Pass |
| R39 | 6 | Release evidence is recorded in `.factory/handoff.md`. | Pass |
| R40 | 4 | MIT — see LICENSE. | Pass |

The terminology table remains consistent: result = **cause report**; surrounding
context = **parent element**; repeat capture = **capture again**; defect =
**layout problem**; saved items = **report log**.

## Demo and sandbox verification

The first-screen **Try it with sample data** link opened
`/demo/?demo=1` in one click. At 390×844, the first demo view already showed a
selected `article.product-card`, a 312 px width, position, ranked CSS causes,
the `grid-template-columns: repeat(3, 1fr)` rule, its `.results` parent, and a
rule to test. This is realistic sample use, not a blank setup screen.

The persistent top banner read **“Demo — sample data, nothing is saved to your
real data”** and exposed **Reset demo** and **Start for real**. After Capture
again, the live report showed a −24 px width change and a class change. Reset
restored 312 px and removed the comparison. A seeded
`real:user-setting=keep-me` survived capture, reset, and exit. The only product
key added during demo was `demo:css-cause-map:state`; Start for real removed it.

Fresh-context request interception across landing → demo → capture → both
exports → reset → exit observed only `https://css-cause-map.sociobot.in`.
The registered `@claim:offline-core` command passed after service-worker setup,
offline reload, and capture. The registered `@claim:privacy-boundaries` command
passed with request interception and manifest inspection.

## Claims execution

I created clean clone `/tmp/css-cause-map-review4-CqSsJb`, ran `npm ci`, then
ran every command copied from `.factory/claims.json` independently. All passed.

| Claim | Result |
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

The live and README claim cross-check maps report/ranking to
`ranked-cause-report`, demo storage to `demo-isolation`, offline to
`offline-core`, export removals to `private-exports`, comparison to
`capture-comparison`, free use to `free-core`, network/storage boundaries to
`privacy-boundaries`, permissions to `manifest-permissions`, picker behavior to
`picker-inputs`, log behavior to the two local-log claims, and package output to
`production-build`. F-4-1 is the one incomplete live location listing.

## Earlier-finding audit

I read `review-1.md`, `review-2.md`, `review-3.md`, `polish-1.md`,
`polish-2.md`, `polish-3.md`, and the prior handoff. The following confirms each
earlier finding against the live site and current source/tests, rather than
accepting an earlier closure note.

| Earlier IDs | Current check | Result |
| --- | --- | --- |
| B1 | First screen has job, frontend-developer audience, demo action, immediate outcome, and three facts at both widths. | Fixed |
| B2 | One-click `/demo/?demo=1`, realistic report, banner, reset/exit, `demo:` namespace, exports, and offline claim test. | Fixed |
| B3, P1 | Twelve unique registry entries and tags; every clean-clone listed command passed. | Fixed |
| B4, U21–U24, U37, U48–U49 | No paid offer, checkout, license-token flow, browser-version promise, or payment path appears. | Fixed |
| H1 | Unknown live URL returned HTTP 404 with the designed notebook page and recovery links. | Fixed |
| H2 | Root, demo, privacy, terms, and 404 each have unique title/description/canonical/social metadata and two icons. | Fixed |
| H3 | Privacy navigation and browser Back focused the destination h1 and updated the live announcer. | Fixed |
| M1 | Header/footer are shared; footer includes one-liner, Privacy, Terms, factory credit, and version. | Fixed |
| M2 | Privacy, offline, and free facts are beside the first action at 390 px. | Fixed |
| N1 | GitHub links name GitHub and contain external-site screen-reader text. | Fixed |
| P2, F-2-5, A-3-1 | Route and panel accessibility tests pass; live Axe found zero violations. Existing target checks cover width and height. | Fixed |
| U01–U20 | Current rank/demo/privacy/export/capture/free claims each have registered observable tests; unsupported broad wording is absent. | Fixed, except F-4-1's separate location omission |
| U25–U36 | Build/package, offline, README use case, evidence, comparison, exports, picker, limitation, and free-core wording remain covered by listed tests. | Fixed |
| U38–U47 | Restricted-page, stylesheet, coverage-suite, lint, and header promises remain removed; build/manifest facts retain tests. | Fixed |
| C01–C34 | Audience/job, plain wording, headings, facts, actions, export language, README wording, and terminology pass the full copy inventory above. | Fixed |
| F-2-1 | `pretest:claims` prepares WXT; all independent claim commands passed clean. | Fixed |
| F-2-2 | First mobile demo screen contains report and first ranked cause. | Fixed |
| F-2-3 | README has no unregistered test-coverage list. | Fixed |
| F-2-4 | README has no deployment-header claim. | Fixed |
| F-2-6 | Packaged extension deletion test passes and Privacy describes the clear action. | Fixed |
| F-3-1 | H1/title/metadata/catalog use tested rank/shaping language, not browser-engine causation. | Fixed |

## Structure, accessibility, privacy, and identity

- Every inspected route had one h1, one main, `lang=en`, a route-appropriate
  title, description, canonical, OG image, SVG favicon, and Apple touch icon.
  Titles were: root **CSS Cause Map — rank CSS rules shaping layout gaps**;
  **Demo — CSS Cause Map**; **Privacy — CSS Cause Map**; **Terms — CSS Cause
  Map**; and **Page not found — CSS Cause Map**.
- `robots.txt` and `sitemap.xml` were live. The sitemap lists root, demo,
  privacy, and terms. All crawlable root/demo/legal/404 links resolved 200;
  the designed unknown route returned 404. The download ZIP and GitHub link
  also resolved 200.
- Privacy navigation and Back updated focus to the destination h1 and announced
  the route. Direct routes loaded correctly. Header/footer remain consistent.
- Axe found zero violations on root, demo, privacy, terms, and unknown 404 at
  390×844. Console listeners recorded no errors during cold root or demo flow.
- The live CSP permits only self resources; the demo interception observed only
  same-origin requests. The manifest/privacy claim test confirms no extension
  host permission or content script.
- The visual system is distinct: warm ruled drafting paper, serif notebooks,
  monospaced measurements, red/blue evidence marks, original lab-still-life
  art, and notebook-style 404. It does not present as a generic SaaS template.

Clean-clone quality commands also passed: `npm test` (28 Vitest, 31 Playwright,
one intentional mobile-panel skip), `npm run typecheck`, `npm run lint`, and
`npm run build`.

## Missed leverage

No omitted import, export, sync, or AI step is required by the brief. The
extension already exports HTML/JSON, compares captures, saves/deletes local
reports, and avoids network use. An AI feature would introduce a key and data
boundary without addressing a stated layout-diagnosis gap.

## What would make this perfect

Register the final landing installation statement under `production-build` and
ensure its test continues to validate the staged downloadable unpacked MV3 ZIP.
Then rerun the claim-location cross-check. No other change was found.

## Final decision

**FAIL.** The demo, real-data isolation, offline/private behavior, visual
identity, routes, accessibility, and all registered tests pass. F-4-1 means a
visitor-facing landing claim is not fully registered at its location, so the
zero-finding requirement is not met.
