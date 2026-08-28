# Adversarial first-read review 1 — CSS Cause Map

**Verdict: FAIL**

**Reviewed:** 2026-08-28 UTC

**Work order:** `css-cause-map-review-1`

**Candidate:** `edc0155a2151f50764caf5522b3f2f64c544cdc3`

**Live URL:** <https://css-cause-map.sociobot.in>

The product has four BLOCKING findings. The first screen does not identify its
user or offer a tryable path, the required sample-data demo does not exist, the
claim registry and claim-tagged tests do not exist, and the live paid action is
a dead link. The visual treatment is distinct and the existing automated suite
passes, but those facts do not make the product clear, tryable, or claim-audited.

## Cold first read: 390 px, then desktop

Fresh Chromium contexts were used without scrolling.

| Question | 390 px answer after one screen | Desktop answer after one screen |
| --- | --- | --- |
| What does it do? | A Chrome extension that selects an element and ranks CSS rules, box measurements, and parent constraints affecting its layout. | Same. |
| For whom? | **Cannot answer.** I can infer a technical Chrome user, but the screen never says “frontend developer” or names the debugging situation. | **Cannot answer.** The wider layout adds no audience statement. |
| What should I click first? | The visually primary action is **“Download for Chrome v1.0”**. It downloads a ZIP that must be loaded in developer mode; it does not let me try the product. | Same. |

The exact text that fails the audience test is **“A layout field notebook for
Chrome”**: it names a platform and uses a metaphor, but does not name the user.
The headline **“Explain the gap. Keep the proof.”** also requires the paragraph
to explain the job. The primary action is **“Download for Chrome v1.0”**, while
the adjacent note says **“Free core · MV3 · active tab only · load unpacked in
developer mode.”** There is no first-screen sample action.

## Findings, ordered by severity

### BLOCKING B1 — the first screen does not say who this is for or offer an immediate trial

**Quote:** “A layout field notebook for Chrome”; “Explain the gap. Keep the
proof.”; “Download for Chrome v1.0”.

**Why this loses a first-time visitor:** “Chrome” is not an audience. “Field
notebook” and “proof” are metaphors, so the visitor must decode the page before
learning that this is for frontend developers debugging a live layout. The only
primary path asks the visitor to download and manually load an unpacked
extension. That is not a credible 30-second trial.

**Concrete fix:** use this first-screen copy and structure:

- Headline: **“Find the CSS rule causing a layout gap”**
- Supporting sentence: **“For frontend developers debugging live layouts, rank the rules and parent elements most likely shaping the selected element.”**
- Primary action: **“Try it with sample data”**
- Adjacent explanation: **“See a ranked cause map immediately. Nothing is saved.”**
- Secondary action: **“Download the Chrome extension”**
- Three facts: **“Core analysis works offline.” “Analysis stays in Chrome.” “Field Kit costs $12 once.”** Add claim tests before publishing these exact facts.

### BLOCKING B2 — there is no demo, and the expected demo entry point uses normal storage

**Quote/evidence:** there is no “Try it with sample data” action. `GET /demo`
returns 404 with the platform copy **“404: Not Found — We couldn’t find that
page, please check the URL and try again.”** `/?demo=1` renders the ordinary
landing page. It has no **“Demo — sample data, nothing is saved”** banner, no
**“Reset demo”**, and no **“Start for real”**.

In a fresh context opened at `/?demo=1`, submitting `review-demo-token` through
the restore dialog wrote the normal keys `sb_license:css-cause-map` and
`sb_license_cache:css-cause-map`, and requested the live Sociobot verification
endpoint. There is no demo namespace or isolation boundary to verify. Reset,
sample availability offline, and preservation of real data therefore cannot be
tested.

**Concrete fix:** ship `/demo` as a real, one-click sandbox containing a realistic
selected element, ranked CSS causes, box measurements, ancestor constraints,
and a before/after capture. Keep demo state in a `demo:` storage namespace (or
memory), show the persistent banner and both required actions, make reset
deterministic, and prove that no normal storage key or nonessential network
request is touched. Document it in `.factory/demo.md` and link it from the hero
and README.

### BLOCKING B3 — `.factory/claims.json` and all `@claim:` tests are absent

**Quote/evidence:** reading `.factory/claims.json` fails because the file does
not exist. A repository search finds zero `@claim:` tags. Therefore there are no
listed tests to run from a clean clone. The ordinary clean-clone suite passes
(27 unit tests; 7 Playwright tests passed and 1 duplicate mobile extension test
was skipped), but it is not a substitute for the required one-test-per-claim
contract.

Every row in “Unlisted claim findings” below is independently unlisted.

**Concrete fix:** add `.factory/claims.json`, give each distinct observable
promise exactly one tagged test, list every page/README location in `where`, and
remove any promise that cannot be exercised through `/demo` from a fresh
context. Make missing or duplicate claim tags fail CI.

### BLOCKING B4 — the live paid action is dead

**Quote:** **“Buy Field Kit”** links to
`https://api.sociobot.in/api/v1/products/css-cause-map/checkout`.

**Evidence:** both HEAD and GET returned HTTP 404. The GET body was
`{"error":"enabled factory product","status":404}`.

**Why this misleads:** the page advertises a $12 product and presents a purchase
button, but the advertised result cannot be reached.

**Concrete fix:** point the link at a working Sociobot hosted checkout that
accepts browser GET navigation, or remove the paid offer until enabled. Add a
scheduled or build-time link test that follows the public action and requires a
successful hosted-checkout response or redirect without creating a charge.

### HIGH H1 — the 404 is an unstyled Azure platform page

**Quote:** “Azure Static Web Apps - 404: Not found” and “We couldn’t find that
page, please check the URL and try again.”

**Why this loses a visitor:** it drops the product identity, has no `<main>` or
`<h1>`, and offers no link home. It also exposes the hosting provider rather
than explaining where the visitor can go.

**Concrete fix:** add a product-styled `/404` using the notebook identity, with
one `<h1>` such as **“This page is not in the notebook”**, a **“Return to CSS
Cause Map”** link, the normal header/footer, and static-host routing to serve it
for unknown paths.

### HIGH H2 — route metadata is incomplete

The landing route has a 54-character title, description, canonical, SVG
favicon, `lang="en"`, one `<h1>`, and one `<main>`. `/privacy/` and `/terms/`
have correct title patterns but no meta description or canonical. No route has
Open Graph tags, Twitter card tags, a 1200×630 product image, or an Apple touch
icon. `/demo` has no product route or title. The generic 404 has no product
metadata.

**Concrete fix:** add route-specific descriptions and canonicals to legal
pages; add product-specific OG/Twitter metadata, a 1200×630 image derived from
the notebook art, and a 180 px Apple touch icon; add **“Demo — CSS Cause Map”**
and **“Page not found — CSS Cause Map”** titles for those routes.

### HIGH H3 — route changes and browser Back do not focus the new heading

Following Privacy or Terms leaves `document.activeElement` on `<body>`. Going
Back to `/` also leaves focus on `<body>`. The address bar and history work, but
the required focus move and route announcement do not.

**Concrete fix:** on each route load/change, focus the route `<h1>` using a
temporary or permanent `tabindex="-1"` target and announce the heading in an
`aria-live="polite"` region. Add forward and back Playwright coverage.

### MEDIUM M1 — the shared site skeleton is inconsistent across routes

The landing header offers Method, Field Kit, Privacy, and Download. Legal pages
replace that with Product plus only the other legal page. The landing footer
says “Built by the Param Factory” and links Source; legal footers do neither.
No footer contains a version/build ID.

**Concrete fix:** render one shared header/footer on `/`, `/demo`, `/privacy/`,
`/terms/`, and `/404`; include Privacy, Terms, the product one-line description,
“Built by Param Factory,” and a visible version/build ID everywhere.

### MEDIUM M2 — the required three first-screen facts are absent

The mobile first screen shows **“Free core · MV3 · active tab only · load
unpacked in developer mode”**. This is four fragments dominated by install
jargon, not three plain privacy/offline/price facts. The desktop quality strip
uses Local/Deterministic/Shareable, omits offline and price, and sits below the
primary action; it is below the initial mobile screen.

**Concrete fix:** put three short facts directly beside the sample action:
privacy, offline behavior, and exact price. Register and test each before using
the wording proposed in B1.

### MINOR N1 — external links are not identified as external

**“Buy Field Kit”** leaves the product origin for `api.sociobot.in`, and
**“Source” / “project repository”** leave it for GitHub, without visible or
accessible destination cues.

**Concrete fix:** label them **“Buy Field Kit on Sociobot”** and **“View source
on GitHub”** (or add equivalent accessible text). If they open a new tab, say
so and use `rel="noopener"`.

## Unlisted claim findings

All of these lack a `.factory/claims.json` entry. Repeated wording still needs
one shared claim entry whose `where` lists every occurrence.

| ID | Location and exact claim-like copy | Concrete fix / test to add |
| --- | --- | --- |
| U01 | Landing: “Pick a live element and get a compact map of the rules, box metrics, and ancestor constraints most likely shaping it—without sending your DOM anywhere.” | `@claim:ranked-local-map`: use `/demo`, assert populated ranked rules/metrics/parents; intercept all requests and assert no page data leaves origin. |
| U02 | Landing: “Your DOM stays in Chrome.” | `@claim:no-dom-egress`: exercise the full demo while intercepting requests and payloads. |
| U03 | Landing: “Same inputs, same ranking.” | `@claim:deterministic-ranking`: reset twice and compare ordered output exactly. |
| U04 | Landing: “Scrubbed HTML + JSON.” | `@claim:html-json-export`: download both formats and assert expected records plus removal rules. |
| U05 | Landing: “Cause Map compresses the useful parts of Computed, Layout, and the ancestor chain into one evidence sheet.” | `@claim:evidence-sheet-fields`: assert the named fields are populated in the sample report. |
| U06 | Landing: “Open the side panel and pick the element on the live page.” | `@claim:element-picker`: select the sample target through the packaged extension or demo equivalent. |
| U07 | Landing: “Hover, click, or use Tab and Enter.” | `@claim:picker-inputs`: verify pointer and keyboard selection separately. |
| U08 | Landing: “Direct rules, flex/grid context, clamping sizes, box model, positioning, and transforms are ranked with their source selector.” | `@claim:ranked-css-evidence`: seed each category and assert rank reason plus selector. |
| U09 | Landing: “Trigger the defect, recapture observed DOM changes, then export scrubbed HTML or JSON for the bug report.” | `@claim:recapture-export`: mutate the sample, assert delta, then validate both downloads. |
| U10 | Landing: “The likely constraint rises to the top.” | `@claim:likely-cause-first`: use a fixture with an unambiguous constraint and assert first place. |
| U11 | Landing: “Scores are evidence strength, never a claim that CSS Cause Map can expose a browser engine’s private causal graph.” | `@claim:correlation-label`: assert the report visibly labels this limitation. |
| U12 | Landing: “Each lead includes the reason and the rule to toggle next.” | `@claim:lead-reason-next-rule`: assert every sample lead has both fields. |
| U13 | Landing: “Final box and offset.” | Add this field assertion to `@claim:evidence-sheet-fields`. |
| U14 | Landing: “Matched CSS source.” | Add this field assertion to `@claim:evidence-sheet-fields`. |
| U15 | Landing: “Up to eight ancestors.” | `@claim:eight-ancestors`: use a deeper fixture and assert the cap and ordering. |
| U16 | Landing: “Changes between captures.” | Add an observable delta assertion to `@claim:recapture-export`. |
| U17 | Landing: “No accounts, analytics, remote diagnosis, DOM upload, or broad browsing permission.” | `@claim:privacy-boundaries`: inspect the manifest, storage, scripts, and intercepted full demo flow. |
| U18 | Landing: “The extension runs only after you invoke it on the active tab.” | `@claim:active-tab-only`: verify no content script/action before user invocation. |
| U19 | Landing: “Exports omit page text and strip URL queries; selectors can be anonymized too.” | `@claim:scrubbed-exports`: export seeded secrets, query, fragment, and selectors; assert required removal in both formats. |
| U20 | Landing: “The free edition includes the complete live map, recapture, and both export formats.” | `@claim:free-core`: run each feature with no license and assert no gate. |
| U21 | Landing: “Field Kit adds an unlimited on-device report log and private notes.” | `@claim:field-kit-features`: use a valid sandbox entitlement, save more than the free threshold, reload locally, and assert notes. Remove “unlimited” if no safe boundary test exists. |
| U22 | Landing: “$12 one time” and “No subscription.” | `@claim:field-kit-price`: assert displayed price and hosted checkout terms from a noncharging test product. |
| U23 | Landing: “Your token is stored only in this browser.” | `@claim:license-local-storage`: intercept verification and assert no token destination other than the documented endpoint and local key. Rewrite because verification necessarily sends the token to Sociobot. |
| U24 | Landing: “Works on Chrome 116+.” | `@claim:chrome-116`: run the packaged extension in the minimum supported Chromium version. |
| U25 | Landing: “The ZIP contains an unpacked MV3 extension.” | `@claim:mv3-package`: download, unzip, and assert a valid MV3 manifest and loadable package. |
| U26 | Landing runtime: “The page is cached; license checks will resume when connected.” | `@claim:offline-shell`: after first load, go offline, reload, and assert shell plus deferred verification. |
| U27 | README: “CSS Cause Map is a local-first Chrome extension for frontend developers who are debugging a live size, offset, or gap.” | List README under `@claim:ranked-local-map` and `@claim:no-dom-egress`; exercise the named use case. |
| U28 | README: “Pick an element and it produces a ranked, compact map of the element’s computed box, matched CSS declarations, flex/grid context, positioning, and constraints from up to eight ancestors.” | List README under `@claim:ranked-css-evidence` and `@claim:eight-ancestors`. |
| U29 | README: “Recapture adds before/after dimensions and observed DOM changes.” | List README under `@claim:recapture-export`. |
| U30 | README: “Reports export as scrubbed HTML or JSON.” | List README under `@claim:html-json-export` and `@claim:scrubbed-exports`. |
| U31 | README: “Runs only after the user invokes it on the active tab.” | List README under `@claim:active-tab-only`. |
| U32 | README: “Names a contributing rule or ancestor and explains why it is relevant.” | Add README to `@claim:lead-reason-next-rule`. |
| U33 | README: “Labels the result as computed correlation, not browser-engine causation.” | Add README to `@claim:correlation-label`. |
| U34 | README: “Never collects DOM text or sends page data to a server.” | Add README to `@claim:no-dom-egress`; inspect request bodies during the whole flow. |
| U35 | README: “Strips URL queries and fragments from exports; optionally anonymizes selectors.” | Add README to `@claim:scrubbed-exports`. |
| U36 | README: “Keeps core analysis, recapture, and exports free.” | Add README to `@claim:free-core`. |
| U37 | README: “Offers a $12 one-time Field Kit license for an on-device report log and notes.” | Add README to `@claim:field-kit-price` and `@claim:field-kit-features`. |
| U38 | README: “Chrome blocks extensions from inspecting browser-owned pages such as `chrome://extensions`.” | `@claim:restricted-page-error`: invoke there and assert the recovery message. |
| U39 | README: “Cross-origin stylesheets may contribute computed values but cannot always expose their source selector to page JavaScript.” | `@claim:cross-origin-style-limit`: use a cross-origin fixture and assert the limitation is represented honestly. |
| U40 | README: “The exact production command is `npm run build`.” plus the four stated output paths | `@claim:production-build`: run it in a clean clone and assert every path and package integrity. |
| U41 | README: “The extension requests `activeTab`, `scripting`, `storage`, and `sidePanel`, plus network access to `api.sociobot.in` solely for optional license verification.” | `@claim:manifest-permissions`: inspect the built manifest and intercept nonlicense/license flows. |
| U42 | README: “It requests no blanket website host permission.” | Add a negative host-permission assertion to `@claim:manifest-permissions`. |
| U43 | README: “`npm run typecheck` always prepares WXT's generated declarations first, so it works from a fresh checkout.” | `@claim:clean-typecheck`: execute in a clean clone with `.wxt` absent. |
| U44 | README: “`npm test` runs deterministic ranker tests … and an offline PWA reload.” | `@claim:test-coverage`: assert the named test files/tags run; keep the detailed list synchronized or shorten it. |
| U45 | README: “It also launches the packaged MV3 extension in Chromium to verify the side-panel skip link, 14px utility-copy floor, 44px targets, and axe scan.” | `@claim:extension-accessibility-suite`: assert each named measurement against the packaged build. |
| U46 | README: “`npm run lint` checks the TypeScript source.” | `@claim:lint-command`: run lint in CI or remove this as a product claim from the registry scope. |
| U47 | README: “The static build includes `staticwebapp.config.json`: immutable caching … and restrictive CSP, frame, permissions, nosniff, and referrer policies.” | `@claim:response-policies`: start the built site with the deployment policy or test live headers; a source-string assertion alone is insufficient. |
| U48 | README: “Payment uses only the Sociobot hosted checkout; Dodo is merchant of record.” | `@claim:hosted-checkout`: follow a noncharging sandbox checkout and assert provider/merchant disclosure. |
| U49 | README: “No payment provider is embedded in the extension or site.” | `@claim:no-embedded-payment`: inspect runtime frames/scripts/requests during checkout initiation. |

## Copy audit findings and rewrites

The landing copy averages 8.7 words per sentence and the README copy averages
12.1, both below the 14-word preference. One landing sentence and six README
sentences exceed the 22-word hard cap. No explicitly banned marketing word was
found. “Compact,” “useful,” and “complete” are unsupported adjectives; the
main issue is dense CSS/build jargon and notebook metaphors.

Each row below is a separate copy finding.

| ID | Quote | Flag | Proposed rewrite |
| --- | --- | --- | --- |
| C01 | “A layout field notebook for Chrome” | Does not name the user; metaphor instead of job. | “CSS layout diagnosis for frontend developers” |
| C02 | “Explain the gap. Keep the proof.” | Headline is metaphorical and needs the paragraph. | “Find the CSS rule causing a layout gap” |
| C03 | Landing L03 (26 words) | Over 22 words; “compact,” “box metrics,” “ancestor constraints,” and DOM are dense. | “Select an element. See the CSS rules and parent constraints most likely causing its size, position, or gap.” |
| C04 | “Follow one measured effect through its ancestor chain.” | “Ancestor chain” is implementation jargon. | “Trace one layout effect through its parent elements.” |
| C05 | “Free core · MV3 · active tab only · load unpacked in developer mode” | Fragment stack; “MV3” and “active tab” are unexplained. | “Free. Runs only on the tab you choose. Install it as an unpacked Chrome extension.” |
| C06 | “DETERMINISTIC Same inputs, same ranking” | “Deterministic” is unnecessary jargon. | “REPEATABLE Same page and element, same ranking” |
| C07 | “SHAREABLE Scrubbed HTML + JSON” | “Scrubbed” is undefined and the fragment does not say what is removed. | “PRIVATE EXPORTS Page text and URL queries are removed” |
| C08 | “From ‘why?’ to a testable lead.” | Heading is vague out of context. | “Find a CSS rule to test next” |
| C09 | “Cause Map compresses the useful parts of Computed, Layout, and the ancestor chain into one evidence sheet.” | UI names and “evidence sheet” assume context; “useful” is subjective. | “See computed styles, layout measurements, and parent constraints in one report.” |
| C10 | “Circle the specimen” | Heading uses a lab metaphor instead of the action. | “Select the affected element” |
| C11 | “Read the chain” | Heading does not name the result. | “Review the ranked CSS causes” |
| C12 | Landing L11 | “Clamping sizes” and “source selector” are dense and the list hides the outcome. | “See direct rules, parent flex or grid settings, size limits, positioning, and transforms, ranked by likely effect.” |
| C13 | “Reproduce and tear off” | “Tear off” is metaphorical and does not name export. | “Recapture the change and export the report” |
| C14 | Landing L12 | “Recapture,” “observed DOM changes,” and “scrubbed” are unexplained. | “Reproduce the layout bug, capture the change, then export a private HTML or JSON report.” |
| C15 | “A report that says enough” | Heading does not say what the section contains. | “What the cause report includes” |
| C16 | “The likely constraint rises to the top.” | Passive and abstract. | “See the strongest CSS constraint first” |
| C17 | Landing L14 | “Evidence strength” and “private causal graph” are defensive jargon. | “Scores rank visible CSS evidence. They do not reveal Chrome’s internal layout decisions.” |
| C18 | “Private by construction” / “The page is evidence, not inventory.” | Two slogans delay the concrete privacy statement. | “What the extension does not collect” |
| C19 | Landing L20 | “Selectors can be anonymized” is technical and passive. | “Exports remove page text and URL queries. You can replace CSS selectors with anonymous labels.” |
| C20 | “Keep the notebook.” | Does not name the paid result. | “Save reports and private notes” |
| C21 | “Don’t toggle blind.” | Negative metaphor; no result. | “Find the CSS rule to test next” |
| C22 | “See the field method ↓” | Action does not name a concrete result. | “See the three diagnosis steps” |
| C23 | Header action “Download” | Button-styled action omits what is downloaded. | “Download extension” |
| C24 | README R03 (28 words) | Over 22 words and dense noun list. | “Pick an element. The extension ranks its box measurements, CSS rules, layout context, positioning, and constraints from up to eight parents.” |
| C25 | README R34 (50 words) | Over 22 words; too many test claims in one sentence. | “`npm test` runs ranker and export tests. Playwright checks desktop and 390px layouts, keyboard focus, accessibility, request origins, and offline reload.” |
| C26 | README R35 (23 words) | Over 22 words. | “Playwright also checks the packaged side panel. It verifies skip-link focus, 14px utility text, 44px targets, and axe results.” |
| C27 | README R37 (30 words) | Over 22 words; configuration jargon stack. | “The static build includes deployment headers. Assets use immutable caching; HTML revalidates quickly; CSP and related headers restrict browser access.” |
| C28 | README R38 (24 words) | Over 22 words and four actions in one sentence. | “For a manual smoke test, select a flex or grid element and change its class or viewport. Recapture, then export both formats.” |
| C29 | README R44 (23 words) | Over 22 words and three separate references. | “See `.factory/brief.json` for scope and `.factory/design.md` for the visual system. Verification is recorded in `.factory/handoff.md`.” |
| C30 | README R02 | “Local-first” and “live size, offset, or gap” are compressed jargon. | “CSS Cause Map is a Chrome extension for frontend developers debugging an element’s size, position, or unwanted gap.” |
| C31 | README R04–R05 | “Recapture,” “observed DOM changes,” and “scrubbed” are not defined. | “Capture the element again to see size and page changes. Export a report with page text and URL details removed.” |
| C32 | README R10 | “Computed correlation” and “browser-engine causation” are hard to parse. | “The report ranks visible CSS evidence. It does not claim to reveal Chrome’s internal layout decisions.” |
| C33 | README R16 | “Cross-origin,” “computed values,” and “source selector” are necessary technical terms but crowded. | “Styles from another domain can affect the result. Browser security may hide the exact CSS selector that set them.” |
| C34 | README R39 | “Delta and mutation note” is jargon. | “Confirm that the report shows the size change and the detected page change.” |

Terminology is inconsistent:

| Concept | Current terms | Use one term |
| --- | --- | --- |
| Generated result | map, live map, evidence sheet, report, notebook | **cause report** |
| Parent context | ancestor, ancestor chain, parent | **parent element** in visitor copy; reserve “ancestor” for technical detail |
| Re-running analysis | recapture, capture, reproduce | **capture again** in visitor copy; keep **Recapture** only as the control label |
| Problem | gap, defect, effect, live size/offset/gap | **layout problem** |
| Paid storage | Field Kit, notebook, field log, report log | **Field Kit report log** |

Result-naming actions that pass: **Download for Chrome**, **Read the privacy
note**, **Buy Field Kit** (destination currently broken), **Restore purchase**,
**Verify license**, and **Download CSS Cause Map**.

## Complete landing-page sentence inventory

Counts treat hyphenated/slashed technical tokens as one word. Heading-like
fragments and controls are audited separately above.

| ID | Words | Sentence | Flag |
| --- | ---: | --- | --- |
| L01 | 3 | Explain the gap. | C02 |
| L02 | 3 | Keep the proof. | C02 |
| L03 | 26 | Pick a live element and get a compact map of the rules, box metrics, and ancestor constraints most likely shaping it—without sending your DOM anywhere. | C03; over 22 |
| L04 | 8 | Follow one measured effect through its ancestor chain. | C04 |
| L05 | 5 | Your DOM stays in Chrome. | Unlisted claim U02 |
| L06 | 4 | Same inputs, same ranking. | Unlisted claim U03 |
| L07 | 6 | From “why?” to a testable lead. | C08 |
| L08 | 17 | Cause Map compresses the useful parts of Computed, Layout, and the ancestor chain into one evidence sheet. | C09 |
| L09 | 12 | Open the side panel and pick the element on the live page. | U06 |
| L10 | 7 | Hover, click, or use Tab and Enter. | U07 |
| L11 | 17 | Direct rules, flex/grid context, clamping sizes, box model, positioning, and transforms are ranked with their source selector. | C12 |
| L12 | 17 | Trigger the defect, recapture observed DOM changes, then export scrubbed HTML or JSON for the bug report. | C14 |
| L13 | 7 | The likely constraint rises to the top. | C16 |
| L14 | 19 | Scores are evidence strength, never a claim that CSS Cause Map can expose a browser engine’s private causal graph. | C17 |
| L15 | 11 | Each lead includes the reason and the rule to toggle next. | U12 |
| L16 | 9 | The parent defines tracks that constrain the selected item. | Example report copy; clear in context |
| L17 | 6 | The page is evidence, not inventory. | C18 |
| L18 | 11 | No accounts, analytics, remote diagnosis, DOM upload, or broad browsing permission. | U17 |
| L19 | 12 | The extension runs only after you invoke it on the active tab. | U18 |
| L20 | 13 | Exports omit page text and strip URL queries; selectors can be anonymized too. | C19 |
| L21 | 3 | Keep the notebook. | C20 |
| L22 | 13 | The free edition includes the complete live map, recapture, and both export formats. | U20; “complete” unsupported adjective |
| L23 | 11 | Field Kit adds an unlimited on-device report log and private notes. | U21; “unlimited” quantitative claim |
| L24 | 8 | Your token is stored only in this browser. | U23; contradicts remote verification behavior unless qualified |
| L25 | 3 | Don’t toggle blind. | C21 |
| L26 | 4 | Works on Chrome 116+. | U24 |
| L27 | 7 | The ZIP contains an unpacked MV3 extension. | U25 |
| L28 | 2 | You’re offline. | Clear state message |
| L29 | 10 | The page is cached; license checks will resume when connected. | U26 |
| L30 | 4 | Field Kit license verified. | Runtime result; add a license-flow test |
| L31 | 8 | Paste this same key into the extension settings. | Clear next action |
| L32 | 5 | Could not verify while offline. | Clear cause |
| L33 | 4 | Try again when connected. | Clear recovery action |
| L34 | 4 | This license is [reason]. | Runtime template; clear when reason is plain text |
| L35 | 7 | You can get a new license below. | Clear recovery action; destination is broken |
| L36 | 5 | Purchase saved in this browser. | Add a returned-license flow claim test |
| L37 | 14 | Open the extension’s settings and paste the same license key to unlock Field Kit there. | Clear |
| L38 | 5 | Built by the Param Factory. | Clear |
| L39 | 10 | Hero imagery generated for this product with the factory image model. | Clear; provenance exists in `.factory/design.md` |

## Complete README copy inventory

This includes headings and list items so no prose unit is hidden from the
audit. Code-block commands are not sentences and are omitted.

| ID | Type | Words | Copy | Flag |
| --- | --- | ---: | --- | --- |
| R01 | Heading | 3 | CSS Cause Map | Clear product heading |
| R02 | Sentence | 20 | CSS Cause Map is a local-first Chrome extension for frontend developers who are debugging a live size, offset, or gap. | C30 |
| R03 | Sentence | 28 | Pick an element and it produces a ranked, compact map of the element’s computed box, matched CSS declarations, flex/grid context, positioning, and constraints from up to eight ancestors. | C24; over 22 |
| R04 | Sentence | 8 | Recapture adds before/after dimensions and observed DOM changes. | C31 |
| R05 | Sentence | 7 | Reports export as scrubbed HTML or JSON. | C31 |
| R06 | Other | 5 | Live product page: https://css-cause-map.sociobot.in | Clear |
| R07 | Heading | 3 | What it does | Clear |
| R08 | Sentence | 11 | Runs only after the user invokes it on the active tab. | U31 |
| R09 | Sentence | 12 | Names a contributing rule or ancestor and explains why it is relevant. | U32 |
| R10 | Sentence | 9 | Labels the result as computed correlation, not browser-engine causation. | C32 |
| R11 | Sentence | 11 | Never collects DOM text or sends page data to a server. | U34 |
| R12 | Sentence | 10 | Strips URL queries and fragments from exports; optionally anonymizes selectors. | U35 |
| R13 | Sentence | 7 | Keeps core analysis, recapture, and exports free. | U36 |
| R14 | Sentence | 14 | Offers a $12 one-time Field Kit license for an on-device report log and notes. | U37 |
| R15 | Sentence | 11 | Chrome blocks extensions from inspecting browser-owned pages such as `chrome://extensions`. | U38 |
| R16 | Sentence | 16 | Cross-origin stylesheets may contribute computed values but cannot always expose their source selector to page JavaScript. | C33 |
| R17 | Heading | 1 | Develop | Clear |
| R18 | Sentence | 5 | Requirements: Node.js 20+ and npm. | Clear |
| R19 | Sentence | 8 | The exact production command is `npm run build`. | U40 |
| R20 | Fragment | 2 | It creates: | Clear with following list |
| R21 | List item | 4 | `.output/chrome-mv3/` — unpacked MV3 extension | U40 |
| R22 | List item | 3 | `.output/css-cause-map-1.0.0-chrome.zip` — packaged extension | U40 |
| R23 | List item | 4 | `dist/site/index.html` — static deployment root | U40 |
| R24 | List item | 3 | `dist/site/downloads/css-cause-map-chrome.zip` — landing-page download | U40 |
| R25 | Heading | 4 | Install the extension locally | Clear |
| R26 | Instruction | 4 | Run `npm run build`. | Result-naming command |
| R27 | Instruction | 7 | Open `chrome://extensions` and enable Developer mode. | Clear for target reader |
| R28 | Instruction | 6 | Choose **Load unpacked** and select `.output/chrome-mv3`. | Exact UI label |
| R29 | Instruction | 20 | Open a normal web page, select the CSS Cause Map toolbar icon, and choose **Pick element** in the side panel. | Clear; at preferred limit |
| R30 | Sentence | 18 | The extension requests `activeTab`, `scripting`, `storage`, and `sidePanel`, plus network access to `api.sociobot.in` solely for optional license verification. | U41 |
| R31 | Sentence | 7 | It requests no blanket website host permission. | U42 |
| R32 | Heading | 1 | Testing | Clear |
| R33 | Sentence | 16 | `npm run typecheck` always prepares WXT's generated declarations first, so it works from a fresh checkout. | U43 |
| R34 | Sentence | 50 | `npm test` runs deterministic ranker tests against seeded layout scenarios (flex, grid, clamps, box model, margin, transform, and positioning), report privacy/escaping tests, and Playwright checks at desktop and 390px: skip-link focus, axe accessibility, 16px site-copy and 44px target floors, no horizontal overflow, same-origin first-load requests, and an offline PWA reload. | C25; over 22 |
| R35 | Sentence | 23 | It also launches the packaged MV3 extension in Chromium to verify the side-panel skip link, 14px utility-copy floor, 44px targets, and axe scan. | C26; over 22 |
| R36 | Sentence | 7 | `npm run lint` checks the TypeScript source. | U46 |
| R37 | Sentence | 30 | The static build includes `staticwebapp.config.json`: immutable caching for hashed assets, media, and the downloadable ZIP; a short revalidation policy for HTML; and restrictive CSP, frame, permissions, nosniff, and referrer policies. | C27; over 22 |
| R38 | Sentence | 24 | For a manual smoke test, select elements in flex and grid layouts, change a class or viewport size, press **Recapture**, and export both formats. | C28; over 22 |
| R39 | Sentence | 9 | Verify the delta and mutation note in the report. | C34 |
| R40 | Heading | 3 | Privacy and payment | Clear |
| R41 | Sentence | 4 | See `/privacy` and `/terms`. | Clear |
| R42 | Sentence | 12 | Payment uses only the Sociobot hosted checkout; Dodo is merchant of record. | U48 |
| R43 | Sentence | 10 | No payment provider is embedded in the extension or site. | U49 |
| R44 | Sentence | 23 | The product contract is in `.factory/brief.json`, the product-specific visual system and asset provenance are in `.factory/design.md`, and release verification is recorded in `.factory/handoff.md`. | C29; over 22 |
| R45 | Heading | 1 | License | Clear |
| R46 | Sentence | 3 | MIT — see `LICENSE`. | Clear and directly verifiable |

## Structure, accessibility, privacy, and identity checks

| Check | Result | Evidence |
| --- | --- | --- |
| Root title pattern | PASS | “CSS Cause Map — explain the layout, not the whole page”, 54 characters |
| Route titles | PARTIAL | Privacy and Terms pass; Demo is missing; 404 uses Azure’s title |
| One h1 / main / lang | PASS on `/`, `/privacy/`, `/terms/`; FAIL on 404 | Fresh browser DOM checks |
| Meta description / canonical | PARTIAL | Present only on `/`; missing on both legal routes |
| OG / Twitter / Apple touch | FAIL | Missing on every inspected product route |
| Favicon | PASS, partial format set | SVG favicon exists; Apple touch icon does not |
| Designed 404 | FAIL | Generic Azure 404, no product navigation |
| Deep links | PASS for legal pages | `/privacy/` and `/terms/` return 200 |
| Browser Back | PARTIAL | URL and prior scroll position return, but focus remains on `<body>` |
| Route-change focus/announcement | FAIL | Neither legal navigation nor Back focuses `<h1>`; no route announcer |
| Link crawl | FAIL | All internal links and GitHub return 200; Buy Field Kit returns 404 |
| Header/footer consistency | FAIL | Legal and landing navigation/attribution differ; no build ID |
| Visual identity | PASS | Handwritten lab-notebook palette, typography, ruled layout, original generated hero, and provenance are product-specific rather than generic SaaS styling |
| Skeleton order | PARTIAL | Product preview, three-step method, privacy, paid tier, and footer exist; required sample action and three hero facts do not |
| Axe at 390 and desktop | PASS | Zero violations on live landing page |
| Keyboard/touch/size suite | PASS for tested landing and packaged panel cases | Clean-clone Playwright suite passed |
| First-load request privacy | PASS for landing shell | Only `https://css-cause-map.sociobot.in` was requested before an explicit license action |
| Offline landing reload | PASS | Service-worker-controlled reload succeeded offline and showed the offline banner |
| Demo privacy/offline | FAIL / untestable | No demo exists; expected query uses normal license storage and network |

## Commands and observed results

- `/opt/fleet/lib/verify-url.sh https://css-cause-map.sociobot.in <temp-dir>`:
  PASS — HTTP 200 in 591 ms, no console errors, title/lang/one h1/main/alt/button
  checks passed.
- Live Playwright + axe, fresh 390×844 and 1440×900 contexts: PASS — zero
  violations, no console errors on `/`, only same-origin first-load requests.
- Live offline exercise: PASS for the cached landing shell at both viewports.
- Clean clone from the candidate SHA: `npm ci && npm test`: PASS — 27 unit
  tests, 7 Playwright tests passed, 1 intentional duplicate skipped.
- Working tree: `npm run build`: PASS — extension, ZIP, and `dist/site/` built.
- Claims: NOT RUN — `.factory/claims.json` has no file to parse and there are
  zero listed test commands.
- Same-origin and external link crawl: FAIL — the purchase URL returns 404.

## Final decision

**FAIL.** There are four BLOCKING findings and substantially more than three
minor findings. A repeat review should start only after the first screen names
the user, `/demo` is a real isolated sample workflow, the claim registry and
tagged tests cover every retained promise, and the paid link works or is
removed.
