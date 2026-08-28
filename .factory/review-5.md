# Adversarial first-read review 5 — CSS Cause Map

**Verdict: PASS**

**Reviewed:** 2026-08-28 UTC  
**Work order:** `css-cause-map-review-5`  
**Candidate:** `e794ede55311fbd85bdd35bce75e48f3cbc018ee`  
**Live URL:** <https://css-cause-map.sociobot.in>

No findings remain. The deployed site and a fresh local clone were reviewed from
scratch. No product code was changed.

## Cold first read

Fresh Chromium contexts were used at 390×844 and 1366×900 without scrolling.

| Question | Answer from the first screen |
| --- | --- |
| What does it do? | It ranks CSS rules and parent elements that shape a selected element's layout gap. |
| For whom? | Frontend developers debugging live layouts. |
| What should I click first? | **Try it with sample data** to open a ranked cause report immediately. |

The 390 px screen shows the h1, audience sentence, primary action, immediate
outcome, and three facts. The exact text is “Rank the CSS rules shaping a layout
gap”; “For frontend developers debugging live layouts, rank the rules and parent
elements most likely shaping the selected element”; and “Try it with sample
data.” The cold-read test passes.

## Copy audit

Counts treat hyphenated terms, CSS values, and code tokens as one word. No
sentence exceeds 22 words. No banned marketing adjective, ambiguous primary
button, inconsistent visitor-facing term, or out-of-context heading was found.
The terminology remains consistent: **cause report**, **parent element**,
**capture again**, **layout problem**, and **report log**.

### Landing-page sentences

| Words | Sentence |
| ---: | --- |
| 8 | Rank the CSS rules shaping a layout gap. |
| 18 | For frontend developers debugging live layouts, rank the rules and parent elements most likely shaping the selected element. |
| 6 | See a ranked cause report immediately. |
| 7 | Nothing is saved to your real data. |
| 4 | Core analysis works offline. |
| 4 | Analysis stays in Chrome. |
| 6 | Core analysis and exports are free. |
| 8 | Trace one layout effect through its parent elements. |
| 12 | See computed styles, layout measurements, and parent constraints in one cause report. |
| 4 | Open the side panel. |
| 11 | Select the element with a pointer, or use Tab and Enter. |
| 11 | See the CSS rules and parent settings ranked by likely effect. |
| 4 | Reproduce the layout problem. |
| 10 | Capture again, then export a private HTML or JSON report. |
| 5 | Scores rank visible CSS evidence. |
| 8 | They do not reveal Chrome’s internal layout decisions. |
| 9 | The parent creates three tracks that constrain this card. |
| 11 | There are no accounts, analytics, page uploads, or broad site permissions. |
| 7 | Exports remove page text and URL queries. |
| 8 | You can replace CSS selectors with anonymous labels. |
| 8 | Install the ZIP as an unpacked Chrome extension. |
| 11 | Find the CSS rules and parent elements shaping a selected element. |
| 6 | Notebook image generated for this product. |

The h1 has eight words. Other headings name their task or content. The actions
name results: “Try it with sample data,” “Download the Chrome extension,” “Open
the sample cause report,” and “Download CSS Cause Map.”

### README sentences

| Words | Sentence |
| ---: | --- |
| 14 | CSS Cause Map is a Chrome extension for frontend developers debugging a layout problem. |
| 13 | Select an element to rank the CSS rules and parent elements shaping it. |
| 11 | Capture the element again to compare its size and page changes. |
| 13 | Export an HTML or JSON report without page text or URL query details. |
| 9 | Starts after you choose it on the current tab. |
| 9 | Shows final measurements, matched CSS rules, and parent constraints. |
| 11 | Explains why each cause matters and names a rule to test. |
| 7 | Compares measurements and page changes between captures. |
| 9 | Keeps analysis inside Chrome and makes no network requests. |
| 11 | Exports HTML and JSON without page text or private URL details. |
| 11 | Stores up to 100 reports and private notes in extension storage. |
| 7 | Keeps analysis and both export formats free. |
| 7 | The report ranks visible CSS evidence. |
| 10 | It does not claim to reveal Chrome’s internal layout decisions. |
| 5 | Open the sample cause report. |
| 13 | It starts with a selected product card, ranked causes, measurements, and parent constraints. |
| 8 | Choose Capture again to see a width change. |
| 12 | Export both report formats, or choose Reset demo to restore the original sample. |
| 4 | Demo state uses the `demo:css-cause-map:state` key. |
| 12 | Starting for real removes that key and never changes normal browser data. |
| 8 | See `.factory/demo.md` for the sample and isolation contract. |
| 6 | Use Node.js 20 or newer. |
| 12 | `npm run build` creates the unpacked MV3 extension, its ZIP, and `dist/site/`. |
| 8 | The site folder includes the downloadable extension ZIP. |
| 4 | Run `npm run build`. |
| 7 | Open `chrome://extensions` and enable Developer mode. |
| 6 | Choose Load unpacked, then select `.output/chrome-mv3`. |
| 12 | Open a web page and select the CSS Cause Map toolbar icon. |
| 6 | Choose Pick element in the side panel. |
| 8 | The extension requests `activeTab`, `scripting`, `storage`, and `sidePanel`. |
| 6 | It requests no website host permission. |
| 3 | Run `npm test`. |
| 6 | Run `npm run build` before deployment. |
| 7 | Each product promise is registered in `.factory/claims.json`. |
| 12 | Run any listed command from a clean checkout to verify that promise. |
| 7 | Deploy the static contents of `dist/site/`. |
| 4 | See `.factory/brief.json` for scope. |
| 9 | See `.factory/design.md` for the visual system and asset provenance. |
| 6 | Release evidence is recorded in `.factory/handoff.md`. |
| 3 | MIT — see `LICENSE`. |

README labels, links, code blocks, and numbered labels are not sentences. Every
claim-like landing and README statement maps to one of the twelve registered
claims. No unlisted claim was found.

## Demo and sandbox

The landing action reaches `/demo/?demo=1` in one click. Its initial 390 px
viewport already shows **Ranked CSS causes**, final measurements, and the first
realistic cause for the selected product card. The persistent banner reads
“Demo — sample data, nothing is saved to your real data.”

A fresh live context was seeded with `localStorage["real:review-5"]`.
Capture again changed the width from 312 px to 288 px; Reset demo returned it
to 312 px. The normal key remained unchanged and the only product key was
`demo:css-cause-map:state`. Request interception recorded only
`css-cause-map.sociobot.in`. After service-worker control, offline reload and
Capture again succeeded and showed the expected −24 px comparison.

## Claims and quality gates

The registry has twelve unique entries with one matching `@claim:` test each.
Every listed command ran independently in the fresh clone at
`/tmp/css-cause-map-review5-bIDtzf` and passed:

`ranked-cause-report`, `demo-isolation`, `offline-core`,
`private-exports`, `capture-comparison`, `free-core`,
`privacy-boundaries`, `manifest-permissions`, `picker-inputs`,
`local-report-log`, `local-data-deletion`, and `production-build`.

```text
npm run typecheck   PASS
npm run lint        PASS
npm test            PASS — 28 Vitest; 31 Playwright; 1 intentional mobile-panel skip
npm run build       PASS — MV3 extension, ZIP, and dist/site
```

## Structure, routing, and identity

Live checks covered `/`, `/demo/?demo=1`, `/privacy/`, `/terms/`,
`/404/`, and an unknown URL. Each intended route has one h1 and main
landmark, English metadata, a route-appropriate title, description, canonical
URL, OG image, favicon, Apple touch icon, shared header/footer, and legal links.
The unknown URL returns the designed notebook 404 with HTTP 404 and a way home.
All internal links and the extension ZIP returned HTTP 200.

Privacy navigation and browser Back both focused the destination h1. Cold
contexts produced no console errors. The warm-paper, graphite, blueprint, and
vermilion notebook treatment and original notebook art remain product-specific,
not a generic SaaS template.

## Earlier findings recheck

Every earlier finding was checked live and in code rather than accepted from its
marked status.

| Earlier IDs | Result |
| --- | --- |
| B1, B2, B3, B4 | PASS — clear first screen, isolated demo, claim registry/tests, and no unavailable paid path. |
| H1, H2, H3, M1, M2, N1, P1, P2 | PASS — 404, metadata, focus/Back, shared skeleton, facts, link labeling, clean setup, and accessibility baseline. |
| U01–U49 | PASS — public promises remain covered by observed claim tests or remain removed; live/root/README cross-check found no regression. |
| C01–C34 | PASS — the full sentence inventory above confirms the repaired wording, lengths, headings, and terms. |
| F-2-1, F-2-2, F-2-3, F-2-4, F-2-5, F-2-6 | PASS — clean preparation, mobile demo visibility, direct README copy, no header claim, 44 px targets, and report-log deletion verify. |
| F-3-1 | PASS — live copy promises ranked evidence rather than browser-engine causation. |
| F-4-1 | PASS — the final installation statement is registered under `production-build`; its test checks CTA, ZIP bytes/integrity, and MV3 manifest. |

## Missed leverage

No expected capability is absent from the brief: the extension selects a live
element, ranks visible rule and parent evidence, captures changes, keeps a
local report log, and exports scrubbed HTML or JSON. AI would not improve this
local diagnostic job and would weaken its explicit offline/privacy model, so no
Sociobot gateway feature is expected.

## What would make this perfect

Keep the contract intact as dependencies and deployment tooling change: run each
registered claim from a new clone, recheck live offline/demo behavior, crawl
links, and retain the concise first screen. No product change is required in
this round.
