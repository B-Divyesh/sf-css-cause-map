# Polish round 3 — cumulative finding closure

Runtime commit: `e6edc7d`

Final deployment: `8b0f7023-86fb-496c-b0dd-aeb8b120f198`

Live site: <https://css-cause-map.sociobot.in>

Verified: 2026-08-28 UTC

## Evidence key

- `CLEAN`: clean no-local clone `/tmp/css-cause-map-polish3-e6edc7d-9GpEyc`.
  `npm ci`, every command in `.factory/claims.json`, `npm run typecheck`,
  `npm run lint`, `npm test`, and `npm run build` passed.
- `T-rank`, `T-demo`, `T-offline`, `T-export`, `T-capture`, `T-free`,
  `T-privacy`, `T-manifest`, `T-picker`, `T-log`, `T-delete`, and `T-build`
  are the matching `@claim:<id>` tests in `tests/claims.spec.ts`.
- `T-site`: `tests/site-accessibility.spec.ts` covers first-screen placement,
  mobile ordering, Axe, target size, overflow, metadata, routes, focus, links,
  404, and offline reload.
- `T-panel`: `tests/sidepanel-accessibility.spec.ts` covers the packaged MV3
  panel, skip focus, text size, target size, and Axe.
- `L-live`: cold production browser audit of five routes at 390×844 and
  1366×900. Ten Axe scans had zero violations; no target was below 44×44;
  no overflow, cross-origin request, or console error was found.
- `E-landing`: `.factory/evidence/polish-3-live-landing-mobile.png`.
- `E-demo`: `.factory/evidence/polish-3-live-demo-mobile.png`.
- `E-404`: `.factory/evidence/polish-3-live-not-found.png`.

## Review 3 finding

| ID | Change made | Evidence |
| --- | --- | --- |
| F-3-1 | Replaced causal promises with tested rank/shaping language in the h1, title, description, OG/Twitter titles and image alt text, catalog, package description, and MV3 description. Expanded `ranked-cause-report` locations and assertions. | `T-rank`; `T-site` metadata and offline tests; `.factory/copy-audit.md`; `E-landing`; `L-live` exact title, h1, and description. |

## Review 2 findings

| ID | Change retained or completed | Evidence |
| --- | --- | --- |
| F-2-1 | Standalone claim, unit, browser, aggregate test, and typecheck scripts prepare WXT in a clean checkout. | `CLEAN`: all 12 registry commands passed independently; release contract “prepares WXT types before every clean local quality gate.” |
| F-2-2 | The ranked report precedes the sample page below 900 px, and the first cause remains inside 390×844. | `T-site` “one click exposes the first ranked cause”; `E-demo`; `L-live`. |
| F-2-3 | README retains only the direct instruction “Run npm test.” | `.factory/copy-audit.md`; release claim/tag contract. |
| F-2-4 | The unregistered deployment-header promise remains removed from README. | README cross-check; live headers were separately verified after deployment. |
| F-2-5 | Shared navigation and every legal-page inline link now meet 44×44; all-route tests check both dimensions. | `T-site` “each route has unique metadata and the shared skeleton”; `T-panel`; `L-live` on ten route/viewport combinations. |
| F-2-6 | The two-step Clear report log action deletes all saved reports and private notes. | `T-delete`; privacy page live check; prior `.factory/evidence/polish-2-clear-report-log.png`. |

## Review 1 structural and inherited findings

| ID | Change retained or completed | Evidence |
| --- | --- | --- |
| B1 | First screen names the ranking job and frontend developers, offers the sample first, explains the result, and shows three facts. | `T-rank`; `T-site` 390×844 first-screen assertions; `E-landing`; `L-live`. |
| B2 | `/?demo=1` redirects to the isolated `/demo/?demo=1` workspace with realistic evidence, persistent banner, reset, exit, exports, and offline operation. | `T-demo`, `T-offline`, `T-capture`, `T-export`; `E-demo`; `L-live`. |
| B3 | `.factory/claims.json` contains 12 unique claims with exactly one matching tagged test each. | Release contract “registers every claim once”; `CLEAN` 12/12 standalone claim commands. |
| B4 | The unavailable paid offer, dead checkout, license state, and payment network path remain absent. | `T-free`; `T-privacy`; live link crawl. |
| H1 | Unknown paths use the notebook 404 and return HTTP 404 with two recovery links. | Release 404 rewrite contract; `T-site` designed 404 test; `E-404`; live unknown URL returned 404. |
| H2 | Root, demo, privacy, terms, and 404 have unique titles, descriptions, canonicals, social metadata, icons, and product art. | `T-site` metadata test; `T-rank`; `L-live`. |
| H3 | Route loads and browser Back focus and announce the destination h1. | `T-site` route navigation/Back test; `L-live`. |
| M1 | The wordmark, four-link header, footer, legal links, factory credit, description, and version are shared across routes. | `T-site` shared-skeleton test; `L-live`. |
| M2 | Privacy, offline, and free facts sit beside the first action and remain above the 390×844 fold. | `T-site` first-screen assertions; `T-offline`, `T-privacy`, `T-free`; `E-landing`. |
| N1 | GitHub destinations name GitHub and include accessible external-site text. | `T-site` link crawl and all-route target checks; `L-live`. |
| P1 | Clean-checkout preparation is explicit for typecheck and every test entry point. | `CLEAN`; release preparation contract. |
| P2 | Static response policy, skip focus, text floors, reduced motion, and 44×44 targets are implemented and tested on every route and the panel. | Release policy/size contracts; `T-site`; `T-panel`; live headers; `L-live`. |

## Review 1 unlisted-claim findings

| ID | Change retained or completed | Evidence |
| --- | --- | --- |
| U01 | Narrowed the result to ranked visible rules, measurements, and parent evidence. | `T-rank`, `T-privacy`. |
| U02 | Privacy wording matches the tested in-Chrome and request boundary. | `T-privacy`; `L-live` same-origin-only flow. |
| U03 | Removed the deterministic-ranking slogan. | `.factory/copy-audit.md`; live root scan. |
| U04 | Retained HTML/JSON exports with observable removal checks. | `T-export`. |
| U05 | The sample populates measurements, rules, and parent evidence. | `T-rank`; `E-demo`. |
| U06 | The packaged picker selects a live fixture element. | `T-picker`. |
| U07 | Pointer, Tab/Enter, and Escape paths are exercised. | `T-picker`. |
| U08 | Replaced the unsupported category list with tested rules-and-parent wording. | `T-rank`; `.factory/copy-audit.md`. |
| U09 | Capture comparison and both exports are exercised. | `T-capture`, `T-export`. |
| U10 | The seeded grid constraint ranks first. | `T-rank`. |
| U11 | The visible-evidence limitation is present and asserted. | `T-rank`; live demo. |
| U12 | Each sample cause includes a reason and rule to test. | `T-rank`. |
| U13 | Final size and position are asserted. | `T-rank`. |
| U14 | CSS property and source are asserted. | `T-rank`. |
| U15 | Removed the unsupported eight-parent promise. | README and live copy audit. |
| U16 | The exact 312→288 px change and class change are asserted. | `T-capture`; live demo flow. |
| U17 | Accounts, analytics, uploads, and broad permissions are absent. | `T-privacy`. |
| U18 | Picker code remains absent until explicit start. | `T-picker`. |
| U19 | Both formats remove text, query, fragment, and optional selectors. | `T-export`; live downloads. |
| U20 | Analysis and both exports work without a gate. | `T-free`. |
| U21 | Removed Field Kit/unlimited copy; the remaining 100-report log is bounded and tested. | `T-log`. |
| U22 | Removed price and subscription claims with the unavailable tier. | `T-free`; live copy scan. |
| U23 | Removed license-token copy, storage, and verification code. | `T-privacy`; source scan. |
| U24 | Removed the visitor-facing Chrome-version promise. | README/live scan. |
| U25 | The MV3 ZIP and its integrity are tested. | `T-build`; live ZIP `unzip -t`. |
| U26 | Removed license-check offline copy; retained the tested offline core. | `T-offline`. |
| U27 | README use-case wording is covered by report and privacy claims. | `T-rank`, `T-privacy`. |
| U28 | README output wording is narrowed to tested measurements, rules, and parents. | `T-rank`. |
| U29 | README comparison wording is exercised. | `T-capture`. |
| U30 | README HTML/JSON wording is exercised. | `T-export`. |
| U31 | Explicit active-tab picker behavior is exercised. | `T-picker`. |
| U32 | Cause reasons and rules to test are asserted. | `T-rank`. |
| U33 | The correlation/internal-layout limitation is asserted. | `T-rank`. |
| U34 | Source, manifest, and runtime checks prove no extension network path. | `T-privacy`. |
| U35 | Query, fragment, and selector removal are asserted in both formats. | `T-export`. |
| U36 | Free analysis and both export formats are asserted. | `T-free`. |
| U37 | Removed the unavailable paid offer. | `T-free`; live root/terms scan. |
| U38 | Removed the untested restricted-page promise. | README scan. |
| U39 | Removed the untested cross-origin stylesheet promise. | README scan. |
| U40 | Build outputs, staged download, manifest, and ZIP integrity are asserted. | `T-build`; `CLEAN`. |
| U41 | Exact conservative MV3 permissions are asserted. | `T-manifest`. |
| U42 | No host permissions or content scripts are asserted. | `T-manifest`. |
| U43 | WXT preparation is enforced for every clean quality-gate script. | Release preparation contract; `CLEAN`. |
| U44 | Removed the detailed README coverage promise. | README/copy audit. |
| U45 | Removed detailed accessibility-suite marketing copy while retaining the tests. | README scan; `T-site`, `T-panel`. |
| U46 | Removed the README lint-coverage claim; lint still passes. | `CLEAN` lint. |
| U47 | Removed the README deployed-header promise; headers were verified separately. | Live header check after deployment. |
| U48 | Removed hosted-checkout copy with the unavailable tier. | Live link crawl. |
| U49 | Removed embedded-payment copy and code. | `T-free`, `T-privacy`. |

## Review 1 copy findings

| ID | Change retained or completed | Evidence |
| --- | --- | --- |
| C01 | Names frontend developers instead of a notebook metaphor. | `.factory/copy-audit.md`; `E-landing`. |
| C02 | The h1 now names the tested ranking job without claiming causation. | `T-rank`; `E-landing`; `L-live`. |
| C03 | The 18-word supporting sentence names the situation and result. | `.factory/copy-audit.md`. |
| C04 | Uses “parent element” in visitor copy. | `.factory/copy-audit.md`. |
| C05 | Replaced MV3/install fragments with three plain facts. | `E-landing`; `T-site`. |
| C06 | Removed the deterministic slogan. | Live copy scan. |
| C07 | Export copy names removed data. | `T-export`. |
| C08 | Method heading names the next-rule outcome. | `.factory/copy-audit.md`. |
| C09 | Cause-report wording names measurements and parents. | `T-rank`. |
| C10 | Picker heading directly names element selection. | `.factory/copy-audit.md`. |
| C11 | Ranking heading names ranked CSS causes. | `E-demo`. |
| C12 | Broad CSS-category jargon remains replaced by tested wording. | `T-rank`. |
| C13 | Capture/export heading names both actions. | `.factory/copy-audit.md`. |
| C14 | Capture and private-export instructions are short and concrete. | `.factory/copy-audit.md`; `T-capture`, `T-export`. |
| C15 | The section is “Inside the cause report.” | `.factory/copy-audit.md`. |
| C16 | The heading says the strongest constraint appears first. | `T-rank`. |
| C17 | Two short sentences state evidence and browser limits. | `T-rank`. |
| C18 | Privacy heading names what is not collected. | `T-privacy`. |
| C19 | Export removals and anonymous labels are explicit. | `T-export`. |
| C20 | Removed the paid notebook metaphor. | Live root scan. |
| C21 | Final heading names the next-rule result. | `.factory/copy-audit.md`. |
| C22 | Removed the vague field-method action. | Live root scan. |
| C23 | Header action names the extension download. | `E-landing`. |
| C24 | README introduction is short and direct. | `.factory/copy-audit.md`. |
| C25 | README uses only “Run npm test.” | README/copy audit. |
| C26 | Removed the dense side-panel test sentence. | README scan. |
| C27 | Deployment wording is a direct instruction, not a header claim. | README/copy audit. |
| C28 | Removed the dense manual-smoke sentence. | README scan. |
| C29 | Product-record references are separate sentences. | README/copy audit. |
| C30 | README names frontend developers and the layout problem. | README/copy audit. |
| C31 | README uses “capture again” and names export removals. | `T-capture`, `T-export`. |
| C32 | README describes visible evidence without claiming engine causation. | `T-rank`. |
| C33 | Removed crowded cross-origin jargon. | README scan. |
| C34 | Removed delta/mutation jargon. | README scan. |

## Additional round-3 production finding

| ID | Change made | Evidence |
| --- | --- | --- |
| A-3-1 | The cold live audit found 19 px-tall inline GitHub links on Privacy and Terms. Added a 44 px legal-link target and extended all-route target regression coverage. | `T-site` metadata/shared-skeleton test at desktop and mobile; final `L-live` found zero undersized targets across ten checks. |

## Final verification

```text
npm ci                    PASS — 304 packages, 0 vulnerabilities
12 claim commands         PASS — 12/12 independently from CLEAN
npm run typecheck         PASS
npm run lint              PASS — zero warnings
npm test                  PASS — 28 Vitest; 31 Playwright; 1 intentional duplicate skip
npm run build             PASS — MV3 extension, ZIP, and dist/site
Lighthouse mobile         100 performance / 100 accessibility / 100 best practices / 100 SEO
LCP / CLS / TBT            1002 ms / 0 / 0 ms
live verify-url.sh        PASS — no console or semantic defect
live Axe                  PASS — 0 violations on 5 routes × 2 viewports
live unknown route        PASS — HTTP 404 with product page
live request boundary     PASS — same origin only
live ZIP                  PASS — SHA-256 2be3f18b4c42db094f259f2607bff714331b5f4a1e77d1630fd78e3eed874158
```

Every review finding is closed. No known gap remains.
