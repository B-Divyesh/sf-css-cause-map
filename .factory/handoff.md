# Handoff — CSS Cause Map review round 4

## Status

FAIL. This review made no product-code changes. It found one remaining
claim-registry location omission: F-4-1 in `review-4.md`.

The WXT MV3 browser extension and static landing-site deployment class are
unchanged. All prior product defects remain verified as fixed.

## Review 4 verification

- Opened the live root cold in fresh 390×844 and 1366×900 contexts. The first
  screen states the job, audience, first action, immediate result, and facts.
- Exercised the live one-click demo: sample report, banner, capture/reset,
  start-for-real exit, demo-only storage, real-key preservation, and
  same-origin request interception all passed.
- Created clean clone `/tmp/css-cause-map-review4-CqSsJb`, ran `npm ci`, then
  ran every command in `.factory/claims.json` independently: 12/12 passed.
- In that clone, `npm test`, `npm run typecheck`, `npm run lint`, and
  `npm run build` passed. `npm test` reported 28 Vitest and 31 Playwright
  passes with one intentional skip.
- Live Axe scans found zero violations on root, demo, privacy, terms, and a
  designed unknown-route 404. Link crawl, metadata, routing, Back/focus, and
  title checks passed.

## Required follow-up

Add the landing final call-to-action location to
`production-build.where` in `.factory/claims.json` (or remove its sentence):
**“Install the ZIP as an unpacked Chrome extension.”** Keep the production-build
test asserting the staged downloadable unpacked MV3 ZIP. Then rerun the review
4 claim-location cross-check.

## History

Detailed closure evidence for rounds 1–3 remains in `polish-1.md`,
`polish-2.md`, and `polish-3.md`. Review 4 independently rechecked those
findings; the only current gap is F-4-1.
