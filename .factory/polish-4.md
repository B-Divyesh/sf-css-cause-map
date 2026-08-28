# Polish round 4 — cumulative finding closure

Runtime repair commit: `3ff448b`

Deployment: `ad2be5e7-076f-41ee-aca8-4d5675ac51ae`

Live site: <https://css-cause-map.sociobot.in>

Verified: 2026-08-28 UTC

## Evidence key

- `CLEAN`: no-local clone `/tmp/css-cause-map-polish4-73GKgd` at `3ff448b`.
  `npm ci`, all 12 claim commands, `npm run typecheck`, `npm run lint`,
  `npm test`, and `npm run build` passed.
- `T-rank`, `T-demo`, `T-offline`, `T-export`, `T-capture`, `T-free`,
  `T-privacy`, `T-manifest`, `T-picker`, `T-log`, `T-delete`, and `T-build`
  are the matching `@claim:<id>` Playwright tests in `tests/claims.spec.ts`.
- `T-site` is `tests/site-accessibility.spec.ts`: first-screen placement,
  responsive order, Axe, targets, overflow, metadata, links, focus, 404, and
  offline reload.
- `T-panel` is `tests/sidepanel-accessibility.spec.ts`: packaged MV3 panel,
  keyboard focus, text and target sizes, and Axe.
- `T-contract` is `tests/release-contract.test.ts`: claim/tag uniqueness,
  F-4-1's registered location, WXT preparation, response policy, and size
  contracts.
- `L-routes` is a cold Chromium audit of `/`, `/demo/?demo=1`, `/privacy/`,
  `/terms/`, and an unknown path at 390×844 and 1366×900. All ten scans had
  zero Axe violations, console errors, undersized targets, small text, or
  horizontal overflow. All requests stayed on the product origin.
- `L-demo` is the live one-click sample flow: capture, reset, both exports,
  real-key preservation, demo-key removal, route focus, Back, reduced motion,
  and offline reload.
- `L-package` compared the live ZIP and every deployed HTML/legal/404/robots/
  sitemap file byte-for-byte with `dist/site`; `unzip -t` passed.
- `L-perf` is Lighthouse 12.8.2 mobile: 100 performance, 100 accessibility,
  100 best practices, 100 SEO; LCP 960 ms, CLS 0, TBT 85 ms.
- Screenshots: `.factory/evidence/polish-4-live-landing-mobile.png`,
  `.factory/evidence/polish-4-live-demo-mobile.png`, and
  `.factory/evidence/polish-4-live-not-found.png`. Standard verifier evidence
  is under `.factory/evidence/polish-4-live/`.

## Review 4 finding

| ID | Change made | Evidence |
| --- | --- | --- |
| F-4-1 | Added `landing final call-to-action` to `production-build.where`. Strengthened its sole tagged test to assert the rendered installation sentence, download URL, served bytes, ZIP contents/integrity, and unpacked MV3 manifest. Added a release-contract regression for the location. | `T-build`, `T-contract`, `CLEAN`; `L-package`; live root at <https://css-cause-map.sociobot.in/>. |

## Review 3 and round-3 findings

| ID | Change retained | Evidence |
| --- | --- | --- |
| F-3-1 | The h1, titles, descriptions, social metadata, package metadata, and catalog use tested rank/shaping language instead of browser-engine causation. | `T-rank`, `T-site`, `CLEAN`; landing screenshot; `L-routes`. |
| A-3-1 | Legal-page GitHub links and all shared navigation targets remain at least 44×44 px. | `T-site`, `T-panel`; `L-routes` at both viewports. |

## Review 2 findings

| ID | Change retained | Evidence |
| --- | --- | --- |
| F-2-1 | Every clean quality-gate and standalone claim command prepares WXT. | `T-contract`; 12/12 independent commands in `CLEAN`. |
| F-2-2 | The ranked report precedes the sample page below 900 px; its heading and first cause appear inside 390×844. | `T-site` “one click exposes the first ranked cause”; demo screenshot; `L-routes`. |
| F-2-3 | README states only the direct instruction “Run npm test.” | `T-contract`; README/copy audit; `CLEAN` aggregate run. |
| F-2-4 | README has no unregistered response-header promise. | Claim cross-check; live headers verified separately in `L-package`. |
| F-2-5 | Effective links and controls have 44 px minimum width and height; tests check both dimensions. | `T-site`, `T-panel`; `L-routes` ten-route/viewport checks. |
| F-2-6 | The packaged extension exposes a two-step Clear report log action that deletes reports and private notes. | `T-delete`, `T-panel`, `CLEAN`; Privacy live check. |

## Review 1 structural and verification findings

| ID | Change retained | Evidence |
| --- | --- | --- |
| B1 | The first screen names the ranking job, frontend developers, sample action, immediate result, and three facts. | `T-rank`, `T-site`; landing screenshot; `L-routes`. |
| B2 | `/?demo=1` enters a realistic isolated demo with banner, reset, exit, captures, exports, and offline support. | `T-demo`, `T-offline`, `T-capture`, `T-export`; demo screenshot; `L-demo`. |
| B3 | Twelve registry entries have unique IDs and exactly one matching tagged test. | `T-contract`; 12/12 independent commands in `CLEAN`. |
| B4 | The unavailable checkout, paid offer, and license flow remain removed. | `T-free`, `T-privacy`; `L-routes` link/request audit. |
| H1 | Unknown URLs return the notebook-styled recovery page with HTTP 404. | `T-site`; 404 screenshot; `L-routes` unknown-path check. |
| H2 | Every route has a unique title, description, canonical, social image metadata, favicon, and Apple icon. | `T-site`; `L-routes` metadata check. |
| H3 | Route navigation and browser Back focus and announce the destination h1. | `T-site`; `L-demo` focus/Back check. |
| M1 | Header/footer, legal links, one-line description, factory credit, and version are shared on every route. | `T-site`; all three screenshots; `L-routes`. |
| M2 | The offline, in-Chrome, and free facts remain beside the sample action and inside the mobile first screen. | `T-site`, `T-offline`, `T-privacy`, `T-free`; landing screenshot; `L-routes`. |
| N1 | External repository links name GitHub and expose external-site text. | `T-site`; live GitHub HTTP 200 crawl. |
| P1 | Clean checkout preparation covers typecheck and every test entry point. | `T-contract`; `CLEAN`. |
| P2 | Security policy, skip focus, 16 px site text, 14 px panel utility text, reduced motion, and 44×44 targets remain implemented. | `T-contract`, `T-site`, `T-panel`; `L-routes`, `L-demo`. |

## Review 1 claim findings

| ID | Change retained | Evidence |
| --- | --- | --- |
| U01 | The promise is narrowed to ranked rules, measurements, and parent evidence. | `T-rank`, `T-privacy`; `L-demo`. |
| U02 | In-Chrome privacy wording matches the tested request boundary. | `T-privacy`; `L-demo` same-origin flow. |
| U03 | The unsupported deterministic-ranking slogan remains absent. | Copy audit; live root scan in `L-routes`. |
| U04 | Both HTML and JSON exports retain removal checks. | `T-export`; `L-demo`. |
| U05 | The sample populates measurements, matched rules, and parent evidence. | `T-rank`; demo screenshot; `L-demo`. |
| U06 | The packaged extension selects a live fixture element. | `T-picker`, `CLEAN`. |
| U07 | Pointer, Tab/Enter, and Escape picker paths are exercised. | `T-picker`, `CLEAN`. |
| U08 | The unsupported category list stays replaced by tested rules-and-parent wording. | `T-rank`; copy audit; live root scan. |
| U09 | Capture comparison and both exports are exercised. | `T-capture`, `T-export`; `L-demo`. |
| U10 | The seeded grid constraint ranks first. | `T-rank`; demo screenshot. |
| U11 | The visible-evidence limitation remains visible and asserted. | `T-rank`; `L-demo`. |
| U12 | Every seeded cause includes a reason and rule to test. | `T-rank`; demo screenshot. |
| U13 | Final size and position are asserted. | `T-rank`; `L-demo`. |
| U14 | CSS property and source are asserted. | `T-rank`; `L-demo`. |
| U15 | The unsupported eight-parent promise remains removed. | README and live copy scans. |
| U16 | The exact 312→288 px change and class change are asserted. | `T-capture`; `L-demo`. |
| U17 | Accounts, analytics, uploads, and broad permissions remain absent. | `T-privacy`; `L-routes`, `L-demo`. |
| U18 | Picker code remains absent until the explicit start action. | `T-picker`, `CLEAN`. |
| U19 | Both exports remove text, query, fragment, and optional selectors. | `T-export`; `L-demo`. |
| U20 | Analysis and both export formats work without a payment gate. | `T-free`; `L-demo`. |
| U21 | Field Kit/unlimited copy stays removed; the retained 100-report limit is tested. | `T-log`; live root scan. |
| U22 | Price and subscription promises remain absent with the unavailable tier. | `T-free`; live root/Terms scan. |
| U23 | License-token copy, storage, and verification remain absent. | `T-privacy`; source and live request scans. |
| U24 | The untested minimum-Chrome-version promise remains absent. | README and live root scans. |
| U25 | The MV3 download, contents, byte identity, and ZIP integrity are asserted. | `T-build`; `L-package`. |
| U26 | License-check offline copy remains absent; tested offline core remains. | `T-offline`; `L-demo`. |
| U27 | README's audience/use case maps to report and privacy claims. | `T-rank`, `T-privacy`; README cross-check. |
| U28 | README output names only tested measurements, rules, and parents. | `T-rank`; README cross-check. |
| U29 | README capture comparison is exercised. | `T-capture`; `L-demo`. |
| U30 | README HTML/JSON export wording is exercised. | `T-export`; `L-demo`. |
| U31 | Explicit current-tab picker behavior is exercised. | `T-picker`, `CLEAN`. |
| U32 | Cause reasons and rules to test are asserted. | `T-rank`; `L-demo`. |
| U33 | The correlation/internal-layout limitation is asserted. | `T-rank`; live demo and Terms scans. |
| U34 | Source, manifest, and runtime checks prove no extension network path. | `T-privacy`; `L-demo`. |
| U35 | URL details and optional selectors are removed in both formats. | `T-export`; `L-demo`. |
| U36 | Free analysis and both exports are asserted. | `T-free`; `L-demo`. |
| U37 | The unavailable paid offer remains removed. | `T-free`; live root/Terms scans. |
| U38 | The untested restricted-page promise remains removed. | README scan in the final tree. |
| U39 | The untested cross-origin stylesheet promise remains removed. | README scan in the final tree. |
| U40 | Build outputs, staged download, manifest, and ZIP integrity are asserted. The landing location is now registered. | `T-build`, `T-contract`; `L-package`. |
| U41 | The exact conservative MV3 permission set is asserted. | `T-manifest`, `CLEAN`. |
| U42 | Absence of host permissions and content scripts is asserted. | `T-manifest`, `T-privacy`. |
| U43 | WXT preparation is enforced for every clean quality-gate script. | `T-contract`; `CLEAN`. |
| U44 | The detailed README test-coverage promise remains removed. | README/copy audit; `T-contract`. |
| U45 | Detailed accessibility-suite marketing copy remains removed while the suite runs. | README scan; `T-site`, `T-panel`. |
| U46 | The unregistered README lint-coverage promise remains removed. | README scan; clean `npm run lint`. |
| U47 | The unregistered deployed-header promise remains removed. | README scan; live headers verified in `L-package`. |
| U48 | Hosted-checkout copy remains absent. | `T-free`; live link crawl. |
| U49 | Embedded-payment copy and code remain absent. | `T-free`, `T-privacy`; live request audit. |

## Review 1 copy findings

| ID | Change retained | Evidence |
| --- | --- | --- |
| C01 | The first screen names frontend developers instead of a notebook metaphor. | Copy audit; landing screenshot; `L-routes`. |
| C02 | The h1 states the tested ranking job without claiming causation. | `T-rank`; landing screenshot; `L-routes`. |
| C03 | The 18-word supporting sentence names the situation and result. | Copy audit; landing screenshot. |
| C04 | Visitor copy consistently uses “parent element.” | Copy audit; live root/demo scans. |
| C05 | Three plain facts replace the MV3/install fragment stack. | `T-site`; landing screenshot. |
| C06 | The deterministic slogan remains removed. | Copy audit; live root scan. |
| C07 | Export copy names the data removed. | `T-export`; live root/demo scans. |
| C08 | The method heading names the next-rule outcome. | Copy audit; landing screenshot. |
| C09 | Cause-report wording names measurements and parent constraints. | `T-rank`; live root scan. |
| C10 | The picker heading directly names element selection. | Copy audit; landing screenshot. |
| C11 | The ranking heading names ranked CSS causes. | `T-rank`; demo screenshot. |
| C12 | The broad category list stays narrowed to tested wording. | `T-rank`; copy audit. |
| C13 | The heading names capture and export. | Copy audit; landing screenshot. |
| C14 | Capture and private-export instructions remain short and concrete. | `T-capture`, `T-export`; live root scan. |
| C15 | The report section remains “Inside the cause report.” | Copy audit; landing screenshot. |
| C16 | The heading says the strongest constraint appears first. | `T-rank`; landing screenshot. |
| C17 | Two short sentences explain visible evidence and browser limits. | `T-rank`; live root scan. |
| C18 | The privacy heading names what is not collected. | `T-privacy`; landing screenshot. |
| C19 | Export removals and anonymous labels remain explicit. | `T-export`; `L-demo`. |
| C20 | The paid notebook metaphor remains removed. | Live root scan. |
| C21 | The final heading names the next-rule result. | Copy audit; landing screenshot. |
| C22 | The vague field-method action remains removed. | Live root scan. |
| C23 | The header action names the extension download. | `T-site`; all screenshots. |
| C24 | README introduction remains short and direct. | Copy audit; README scan. |
| C25 | README says only “Run npm test.” | Copy audit; README scan. |
| C26 | The dense side-panel test sentence remains removed. | README scan. |
| C27 | Deployment wording remains a direct instruction, not a header claim. | Copy audit; README scan. |
| C28 | The dense manual-smoke sentence remains removed. | README scan. |
| C29 | Product-record references remain separate sentences. | Copy audit; README scan. |
| C30 | README names frontend developers and the layout problem. | Copy audit; README scan. |
| C31 | README uses “capture again” and names export removals. | `T-capture`, `T-export`; README scan. |
| C32 | README describes visible evidence without claiming engine causation. | `T-rank`; README scan. |
| C33 | Crowded cross-origin jargon remains absent. | README scan. |
| C34 | Delta/mutation jargon remains absent. | README scan. |

## Final result

Every current and inherited finding is closed. No TODO, stub, deferred minor
item, paid path, or untested public claim remains. The WXT MV3 extension and
static-site deployment class are unchanged, as is the product-specific
handwritten lab-notebook visual system.
