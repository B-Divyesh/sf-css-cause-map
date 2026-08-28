# Polish round 1 — CSS Cause Map

Candidate repaired from `edc0155a2151f50764caf5522b3f2f64c544cdc3` after
review commit `a772a2936f2938a711acd40ceb005e8240c75455`.

## Evidence key

- Claim suite: `npm run test:claims` — 11 tagged claim tests pass.
- Full suite: `npm test`; package: `npm run build`.
- Browser/a11y coverage: `tests/site-accessibility.spec.ts` and
  `tests/sidepanel-accessibility.spec.ts`.
- Local visual evidence:
  `evidence/polish-1-landing-desktop.png`,
  `evidence/polish-1-landing-mobile.png`,
  `evidence/polish-1-demo-desktop.png`,
  `evidence/polish-1-demo-mobile.png`, and
  `evidence/polish-1-not-found.png`.
- Live check: deployed verification is recorded in the handoff after the
  production upload.

## Review findings

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| B1 | Replaced the metaphorical hero with “Find the CSS rule causing a layout gap,” named frontend developers, added the one-click sample action, adjacent outcome, download secondary action, and three factual lines. | Landing screenshots; `site-accessibility.spec.ts`; `@claim:offline-core`, `@claim:privacy-boundaries`, `@claim:free-core` |
| B2 | Added the real `/demo/?demo=1` sample workspace, persistent isolated-demo banner, deterministic reset, Start for real cleanup, `demo:` storage namespace, offline shell, and demo contract. `/?demo=1` redirects to it. | Demo screenshots; `@claim:demo-isolation`, `@claim:offline-core`, `@claim:capture-comparison` |
| B3 | Added `.factory/claims.json`, one unique `@claim:` test for every listed claim, and a contract test for missing or duplicate tags. | `@claim:*`; `release-contract.test.ts` |
| B4 | Removed the unavailable paid checkout, Field Kit copy, restore flow, licensing module, and related network permission. The free product is stated honestly in Terms. | `@claim:free-core`; `@claim:manifest-permissions`; link crawl in `site-accessibility.spec.ts` |
| H1 | Added the notebook-styled `/404/` document and configured static-host 404 rewriting. | `evidence/polish-1-not-found.png`; not-found route test |
| H2 | Added complete per-route descriptions, canonicals, OG/Twitter metadata, product social image, Apple touch icon, Demo and 404 routes. | metadata route test; `evidence/polish-1-not-found.png` |
| H3 | Added focusable route headings and polite route announcements on normal navigation, Back, and pageshow. | route-navigation focus test |
| M1 | Applied the same wordmark, four-link header, footer links, factory attribution, one-line description, and build ID across landing, demo, legal, and 404 routes. | metadata/shared-skeleton test; all five screenshots |
| M2 | Put privacy, offline, and free-price facts beside the first-screen sample action. | mobile landing screenshot; `@claim:offline-core`, `@claim:privacy-boundaries`, `@claim:free-core` |
| N1 | Named GitHub destinations visibly and for screen readers. Removed the unavailable external purchase destination. | `site-accessibility.spec.ts`; footer in all screenshots |

## Unlisted-claim findings

| Finding IDs | Change made | Evidence |
| --- | --- | --- |
| U01, U05, U10–U14, U27, U32, U33 | Retained only the demonstrable cause-report promise: visible CSS rules and parent elements, measurements, ranking, reason, next rule, and the correlation limitation. | `@claim:ranked-cause-report`; demo screenshots |
| U02, U17, U19, U34 | Reworded privacy around observable boundaries and tested the complete demo request flow, packaged manifest, and extension sources. | `@claim:privacy-boundaries`; `@claim:private-exports` |
| U03 | Removed the untested “same inputs, same ranking” wording. | landing copy audit |
| U04, U09, U30, U35 | Kept HTML/JSON export only with tested removal of text, query, fragment, and optional selector identifiers. | `@claim:private-exports`; `@claim:capture-comparison` |
| U06, U07, U18, U31 | Kept the picker promise and tested no automatic picker script, pointer selection, Tab/Enter selection, and Escape cancellation. | `@claim:picker-inputs` |
| U08, U28 | Replaced the broad unsupported list of CSS categories and eight-parent promise with the tested generic rules-and-parent-settings wording. | landing copy audit; `@claim:ranked-cause-report` |
| U15 | Removed the untested “up to eight ancestors” promise. | README and landing copy audit |
| U16, U29 | Kept the before/after sample and asserts its exact width delta plus class change. | `@claim:capture-comparison` |
| U20, U36 | Kept only the tested free analysis and two exports promise. | `@claim:free-core` |
| U21–U23, U26, U37, U48, U49 | Removed the unavailable paid tier, checkout, token, merchant, and license claims entirely. | source/manifest scan; `@claim:free-core` |
| U24 | Removed the visitor-facing Chrome-version promise. | landing and README copy audit |
| U25, U40 | Retained the build/package statement and verifies the MV3 output, ZIP integrity, staged download, and site paths. | `@claim:production-build` |
| U38, U39 | Removed the untested restricted-page and cross-origin limitation copy from visitor documentation. | README copy audit |
| U41, U42 | Retained exact conservative permission information and verifies it in the built MV3 manifest. | `@claim:manifest-permissions` |
| U43 | `pretest` and `pretypecheck` now run `wxt prepare`, so clean quality gates no longer require an untracked generated directory. | `release-contract.test.ts`; clean-clone commands in handoff |
| U44–U47 | Rewrote technical documentation as concise run instructions, with source contracts for test preparation and response policy. | `release-contract.test.ts`; README copy audit |

## Copy findings

| Finding IDs | Change made | Evidence |
| --- | --- | --- |
| C01–C03 | Replaced the notebook/platform slogan and vague headline with a nine-word job headline and a 16-word audience sentence. | landing screenshots; `.factory/copy-audit.md` |
| C04–C07 | Replaced ancestor, deterministic, and scrubbed jargon with parent-element, offline, privacy, and export facts. | landing screenshot; copy audit; matching claim tests |
| C08–C15 | Rewrote method, picker, rank, capture, and report headings into task-named plain language. | landing screenshot; copy audit |
| C16–C19 | Rewrote constraint, correlation, privacy, and selector wording into concise visible-evidence and privacy statements. | landing screenshot; `@claim:ranked-cause-report`, `@claim:privacy-boundaries`, `@claim:private-exports` |
| C20–C23 | Removed paid metaphors and replaced the remaining action labels with concrete download and next-rule labels. | landing screenshot; Terms; copy audit |
| C24–C34 | Rewrote README into short sentences with one stable term for each concept and removed unsupported technical promises. | `.factory/copy-audit.md`; claim registry cross-check |

## Earlier quality findings retained in the repair

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| verification P1 | Fresh-checkout test and typecheck preparation is explicit in package scripts. | `release-contract.test.ts`; clean-clone run in handoff |
| verification P2 | Static policy has immutable assets, short HTML/SW caching, a self CSP, frame and permissions protections; skip targets and documented minimum type/target sizes have browser checks. | `release-contract.test.ts`; `site-accessibility.spec.ts`; `sidepanel-accessibility.spec.ts` |
