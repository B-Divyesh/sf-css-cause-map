# Polish round 2 — cumulative finding closure

Runtime candidate: `d56c690`  
Live site: <https://css-cause-map.sociobot.in>  
Reviewed and deployed: 2026-08-28 UTC

## Evidence key

- `E-mobile`: `.factory/evidence/polish-2-live-demo-mobile.png`; live 390×844 report title at y=467 and first cause at y=728.
- `E-delete`: `.factory/evidence/polish-2-clear-report-log.png`; packaged side panel at the specific confirmation step.
- `E-landing`: `.factory/evidence/polish-2-live-landing-mobile.png`; cold first screen.
- `T-claims`: every command in `.factory/claims.json` passed independently in fresh clone `/tmp/css-cause-map-polish2-final-zVmgXH`.
- `T-site`: `site-accessibility.spec.ts`; 390×844 and desktop Axe, sizing, overflow, routes, metadata, focus, links, 404, and offline checks.
- `T-panel`: `sidepanel-accessibility.spec.ts`; packaged MV3 side-panel focus, Axe, text, and two-dimensional target checks.
- `L-live`: cold live Chromium check of `/`, `/?demo=1`, `/demo/?demo=1`, `/privacy/`, `/terms/`, and an unknown URL.

## Review 2 findings

| ID | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | Added `pretest:claims`; the release contract now requires claim preparation. | `T-claims`: 12/12 listed commands passed independently without `.wxt`; release-contract test. |
| F-2-2 | Put the cause report before the selected-page specimen below 900 px, tightened mobile spacing, and removed intrinsic grid overflow. | `one click exposes the first ranked cause in the 390 by 844 viewport`; `E-mobile`; `L-live` y=467/y=728. |
| F-2-3 | Replaced the unregistered README coverage promise with the direct instruction “Run npm test.” | `.factory/copy-audit.md`; final claim/tag contract passes. |
| F-2-4 | Removed the unregistered deployment-header promise from README. | README cross-check; live headers were still verified independently by `verify-url.sh` and `curl`. |
| F-2-5 | Added 44 px minimum width to shared navigation targets and made both browser checks fail on width or height. Associated checkbox labels are measured as the effective target. | `T-site`, `T-panel`; `L-live` found zero undersized targets. |
| F-2-6 | Added a visible, two-step Clear report log action, privacy wording, claim entry, and packaged-extension deletion test. | `@claim:local-data-deletion`; `E-delete`; live `/privacy/` check. |

## Review 1 structural findings and prior verification findings

| ID | Change retained or completed | Evidence |
| --- | --- | --- |
| B1 | Direct job headline, named frontend-developer audience, one-click sample action, outcome, and three facts remain first. | `E-landing`; landing accessibility test; `L-live`. |
| B2 | Real isolated `/demo/?demo=1` with sample report, banner, Reset demo, Start for real, and demo-only storage; mobile result now appears first. | `@claim:demo-isolation`, `@claim:offline-core`; `E-mobile`; `L-live`. |
| B3 | Claim registry, unique tags, and clean-clone preparation are complete. | `T-claims`; release-contract claim uniqueness test. |
| B4 | Unavailable paid offer and checkout remain removed. | `@claim:free-core`; live link crawl. |
| H1 | Unknown paths return the notebook-styled 404 with navigation and HTTP 404. | designed not-found test; `L-live` unknown path. |
| H2 | Route-specific titles, descriptions, canonicals, OG/Twitter art, favicon, and Apple icon remain on every route. | metadata/shared-skeleton test; `L-live`. |
| H3 | Route and Back navigation focus and announce the new h1. | route-navigation focus test; `L-live` forward/back focus true. |
| M1 | Shared header/footer, legal links, factory attribution, and version remain on all routes. | metadata/shared-skeleton test; live route crawl. |
| M2 | Offline, in-Chrome, and free facts remain beside the first action. | `E-landing`; `@claim:offline-core`, `@claim:privacy-boundaries`, `@claim:free-core`. |
| N1 | GitHub destinations visibly identify GitHub and external-site context. | internal/external link crawl; live GitHub HTTP 200. |
| P1 | WXT preparation now covers typecheck, aggregate test, and every standalone claim command. | release-contract test; `T-claims`. |
| P2 | Security/cache policy, skip focus, type floors, and 44×44 target floors remain tested; width coverage is now real. | `T-site`, `T-panel`, live response headers. |

## Review 1 claim findings

| ID | Change retained or completed | Evidence |
| --- | --- | --- |
| U01 | Narrowed to a ranked cause report with rules, measurements, and parents. | `@claim:ranked-cause-report`; live demo. |
| U02 | Privacy wording now matches the tested request boundary. | `@claim:privacy-boundaries`; `L-live` same-origin only. |
| U03 | Removed the unsupported deterministic slogan. | Copy audit; live root text scan. |
| U04 | Kept both exports with removal assertions. | `@claim:private-exports`. |
| U05 | Demo populates measurements, rules, and parents. | `@claim:ranked-cause-report`. |
| U06 | Packaged extension performs explicit element selection. | `@claim:picker-inputs`. |
| U07 | Pointer, Tab/Enter, and Escape are exercised. | `@claim:picker-inputs`. |
| U08 | Replaced the untested category list with tested rules-and-parent wording. | `@claim:ranked-cause-report`; copy audit. |
| U09 | Capture comparison and both exports are exercised. | `@claim:capture-comparison`, `@claim:private-exports`. |
| U10 | Seeded grid constraint is first. | `@claim:ranked-cause-report`. |
| U11 | Visible-evidence limitation is shown. | `@claim:ranked-cause-report`. |
| U12 | Each seeded cause includes a reason and rule to test. | `@claim:ranked-cause-report`. |
| U13 | Final box and offset are asserted. | `@claim:ranked-cause-report`. |
| U14 | Matched property and source are asserted. | `@claim:ranked-cause-report`. |
| U15 | Removed the unsupported eight-parent number. | README/live copy scan. |
| U16 | Exact −24 px and class change are asserted. | `@claim:capture-comparison`. |
| U17 | Accounts, analytics, uploads, and broad permissions are absent. | `@claim:privacy-boundaries`. |
| U18 | Picker code starts only after explicit action. | `@claim:picker-inputs`. |
| U19 | Exported text, query, fragment, and optional selectors are removed. | `@claim:private-exports`. |
| U20 | Free analysis and both exports are exercised without a gate. | `@claim:free-core`. |
| U21 | Removed Field Kit/unlimited claims; retained the tested 100-report local log. | `@claim:local-report-log`. |
| U22 | Removed price and subscription copy with the unavailable paid tier. | Live root and Terms scan. |
| U23 | Removed license-token copy and code. | `@claim:privacy-boundaries`; manifest/source scan. |
| U24 | Removed the untested Chrome-version promise. | README/live copy scan. |
| U25 | Build and ZIP integrity are asserted. | `@claim:production-build`; live ZIP byte match. |
| U26 | Removed license-check offline wording; retained tested offline core. | `@claim:offline-core`. |
| U27 | README use case is covered by report and privacy claims. | `@claim:ranked-cause-report`, `@claim:privacy-boundaries`. |
| U28 | README evidence list was narrowed to tested output. | `@claim:ranked-cause-report`. |
| U29 | README capture comparison is exercised. | `@claim:capture-comparison`. |
| U30 | README HTML/JSON export statement is exercised. | `@claim:private-exports`. |
| U31 | Explicit active-tab picker behavior is exercised. | `@claim:picker-inputs`. |
| U32 | Cause reason and next rule are asserted. | `@claim:ranked-cause-report`. |
| U33 | Correlation limitation is asserted. | `@claim:ranked-cause-report`. |
| U34 | No extension network path and same-origin demo flow are asserted. | `@claim:privacy-boundaries`. |
| U35 | URL and selector removal are asserted in both formats. | `@claim:private-exports`. |
| U36 | Free core and exports are asserted. | `@claim:free-core`. |
| U37 | Removed the unavailable paid offer. | Live root/Terms scan. |
| U38 | Removed the untested restricted-page promise. | README scan. |
| U39 | Removed the untested cross-origin stylesheet promise. | README scan. |
| U40 | All production output paths and ZIP integrity are asserted. | `@claim:production-build`. |
| U41 | Exact conservative MV3 permissions are asserted. | `@claim:manifest-permissions`. |
| U42 | Absence of host permissions and content scripts is asserted. | `@claim:manifest-permissions`. |
| U43 | Removed the copy claim; clean preparation is enforced in scripts. | release-contract test; final clean clone. |
| U44 | Removed the unregistered test-coverage list. | F-2-3; README/copy audit. |
| U45 | Removed detailed accessibility-suite marketing copy; the suite still runs. | `T-panel`. |
| U46 | Removed the unregistered lint claim; lint still passes. | Final clean-clone `npm run lint`. |
| U47 | Removed the unregistered response-header promise; headers still ship and were live-checked. | F-2-4; live `curl` headers. |
| U48 | Removed hosted-checkout copy with the unavailable paid tier. | Live link crawl. |
| U49 | Removed embedded-payment copy and all payment code. | `@claim:free-core`, `@claim:privacy-boundaries`. |

## Review 1 copy findings

| ID | Change retained | Evidence |
| --- | --- | --- |
| C01 | Audience is “frontend developers”; no notebook positioning line. | `E-landing`; copy audit. |
| C02 | Headline states the CSS layout-gap job. | `E-landing`; `L-live`. |
| C03 | Supporting sentence is 18 words and concrete. | Copy audit. |
| C04 | “Parent elements” replaces “ancestor chain.” | Copy audit. |
| C05 | Hero install jargon is replaced by three plain facts. | `E-landing`. |
| C06 | Removed the deterministic slogan. | Live copy scan. |
| C07 | Export copy names removed data. | `@claim:private-exports`. |
| C08 | Method heading names the next-rule outcome. | Copy audit. |
| C09 | Cause-report wording names measurements and parents. | Copy audit. |
| C10 | Picker heading is “Select the affected element.” | Copy audit. |
| C11 | Ranking heading names ranked CSS causes. | Copy audit. |
| C12 | Broad category jargon was narrowed to tested wording. | Copy audit; `@claim:ranked-cause-report`. |
| C13 | Capture/export heading names both actions. | Copy audit. |
| C14 | Capture and private export wording is plain. | Copy audit. |
| C15 | Report section is “Inside the cause report.” | Copy audit. |
| C16 | Constraint heading says strongest cause appears first. | Copy audit. |
| C17 | Limitation is two short plain sentences. | Copy audit. |
| C18 | Privacy heading names what is not collected. | Copy audit. |
| C19 | Selector replacement and removals are explicit. | Copy audit. |
| C20 | Paid notebook metaphor was removed. | Live root scan. |
| C21 | Final heading names the next-rule result. | Copy audit. |
| C22 | Vague field-method action was removed. | Live root scan. |
| C23 | Header action names the extension download. | `E-landing`. |
| C24 | README introduction is short and direct. | Copy audit. |
| C25 | Dense test list was reduced to “Run npm test.” | F-2-3; copy audit. |
| C26 | Detailed 23-word side-panel sentence was removed. | README scan. |
| C27 | Deployment claim was reduced to a direct deploy instruction. | F-2-4; copy audit. |
| C28 | Dense manual-smoke sentence was removed. | README scan. |
| C29 | Product-record references are separate sentences. | Copy audit. |
| C30 | README names frontend developers and the layout problem. | Copy audit. |
| C31 | README uses “capture again” and names removed export details. | Copy audit. |
| C32 | README explains visible evidence without engine jargon. | Copy audit. |
| C33 | Removed the cross-origin jargon promise. | README scan. |
| C34 | Removed delta/mutation jargon. | README scan. |

## Final live evidence

- Cold root states the job, audience, action, and three facts without scrolling.
- `/?demo=1` redirects to `/demo/?demo=1`; only `demo:css-cause-map:state` is added, while seeded real storage survives.
- Live 390×844 has no main-content overflow, no target below 44×44, and zero Axe violations.
- Capture/reset works; an offline reload still produces the exact −24 px comparison.
- All five product routes have unique titles, one h1, one main, and zero Axe violations.
- Unknown paths return HTTP 404 with “This page is not in the notebook.”
- Live first-party flow made same-origin requests only and logged zero console errors at 390×844 and 1366×900.
- Built and live HTML, CSS, JS, legal pages, 404, and extension ZIP matched byte-for-byte. Final ZIP SHA-256: `567200f939e2f7ae600b7c4381d3f2f218eb9bd6637f483d6290ae7e0e9529d0`.

No finding remains open.
