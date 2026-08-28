# Handoff — adversarial first-read review 3

## Status

FAIL. Review 3 found one BLOCKING issue: the live h1 and root/social titles
promise an identified CSS cause, while the product and registered claim only
rank visible evidence and disclaim browser-layout causation.

The complete review is in `.factory/review-3.md`. No product code was changed.

## What was done

- Read the brief, visual thesis, claim registry, README, demo contract, every
  earlier review/polish record, and the prior handoff.
- Repeated the cold 390×844 and 1366×900 first-read audit in fresh live browser
  contexts.
- Exercised the one-click demo, capture, reset, exit, both exports, storage
  isolation, offline reload, same-origin request boundary, and console state.
- Ran every command in `.factory/claims.json` from a clean no-local clone.
- Rechecked all prior finding IDs against the live site and current source.
- Crawled links; checked route metadata, HTTP 404, focus/Back behavior, shared
  skeleton, target sizing, reduced-motion source, and product identity.
- Ran live Axe on five routes at mobile and desktop sizes and ran the factory
  URL verifier.
- Compared the fresh build with production. Root, demo, privacy, terms, 404,
  hashed CSS/JS, and the extension ZIP matched byte-for-byte.

## Verification

Clean clone: `/tmp/css-cause-map-review3-clean-xbudGa`

```text
npm ci                PASS — 304 packages; 0 vulnerabilities
12 claim commands     PASS — 12/12
npm run typecheck     PASS
npm run lint          PASS
npm test              PASS — 28 Vitest; 31 Playwright; 1 intentional skip
npm run build         PASS
verify-url.sh          PASS against production
live Axe               PASS — zero violations on 10 route/viewport checks
unzip -t               PASS for the live extension ZIP
```

The standalone claim output is at `/tmp/review3-claims.log` for the lifetime of
this disposable worker.

## Required next step

Apply F-3-1's exact copy fix: use “Rank the CSS rules shaping a layout gap” for
the h1 and matching non-causal wording in root, Open Graph, Twitter, meta,
package, and catalog copy. Update the metadata regression assertion, deploy,
and repeat the full review. No other gap was found.
