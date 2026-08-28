# Handoff — adversarial review 2

## Status: FAIL recorded

Reviewed commit: `062876abbc095b6bd42d114c23e682c79a895fcb`

Live site: <https://css-cause-map.sociobot.in>

Full report: `.factory/review-2.md`

## What was done

- Reviewed the live landing page cold at 390×844 and 1366×900.
- Audited every landing and README sentence, heading, action, and claim-like
  statement.
- Exercised the live demo, reset, exit, exports, storage separation,
  same-origin request boundary, and offline reload.
- Checked route metadata, 404 handling, links, browser Back/focus, shared
  skeleton, mobile containment, visual identity, console output, and Axe.
- Rechecked every finding from review 1 and polish 1 against live behavior and
  repository code.
- Ran every command in `.factory/claims.json` from a clean clone.
- Ran the aggregate test and production build afterward to separate the
  clean-command defect from general product failures.

No product code was modified.

## Verification results

```text
Fresh clone + npm ci: PASS
11/11 individual claims.json commands: FAIL before test execution
  cause: missing .wxt/tsconfig.json; test:claims has no WXT preparation hook
npm test after its pretest hook: PASS — 28 Vitest, 28 Playwright, 1 intentional skip
npm run build: PASS — MV3 extension, ZIP, and dist/site
verify-url.sh against live root: PASS
Live Axe, desktop and 390 px demo: 0 violations
Live console errors: 0
Live internal/external link crawl: PASS
Live demo storage/network/offline exercise: PASS
```

Clean-clone evidence directory:
`/tmp/css-cause-map-review2-clean-rHPlrg` (disposable).

## Findings left for the repair round

- F-2-1: all registered claim commands fail from a clean clone.
- F-2-2: the ranked cause report begins below the first mobile viewport.
- F-2-3: README test-coverage promise remains unlisted.
- F-2-4: README deployment-header promise remains unlisted.
- F-2-5: “Demo” links are 38.53×44 px while tests check only height.
- F-2-6: the privacy page's saved-report deletion promise is unlisted and
  untested.

See `.factory/review-2.md` for exact quotes, evidence, required fixes, complete
copy inventory, and the prior-finding audit.
