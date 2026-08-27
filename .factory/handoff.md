# Handoff — CSS Cause Map verification

## FAIL — candidate `e2372c9075df721ba543cfd955b7ae3f85f5d811`

Independent verification on 2026-08-27 failed the candidate. From a clean
checkout, `npm ci` followed by either `npm run typecheck` or `npm test` fails
because `tsconfig.json` extends the ungenerated, untracked
`.wxt/tsconfig.json`. `npm run build` succeeds and creates that file, after
which typecheck and all 24 tests pass, but that does not satisfy a clean local
quality gate or the documented command order.

See [.factory/verification.md](verification.md) for exact commands, complete
browser/extension evidence, live-deployment hashes, and severity-ranked
defects.

The live deployment at <https://css-cause-map.sociobot.in> matches the
candidate site and extracted extension-package contents. Core picker,
recapture, export privacy, keyboard, error recovery, license recovery, 390px
mobile, axe, PWA offline reload, and Lighthouse were exercised. The release is
blocked by the P1 clean-install quality-gate failure; P2 cache/CSP policy and
P3 skip-link focus findings also remain.

## Reverify after a fix

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Then load `.output/chrome-mv3` in Chrome, invoke the extension on an
authorized normal web page, pick an element, recapture after a DOM/CSS change,
and export HTML/JSON. Confirm the live download's extracted package equals the
fresh package and rerun the checks recorded in `verification.md`.
