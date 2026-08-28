# Handoff — CSS Cause Map verification 2

## Status: FAIL

Candidate `0b628f32034a62380faec91f3d0390c9b8ac1ade` was independently tested
from a clean install and compared with <https://css-cause-map.sociobot.in> on
2026-08-28. The repaired clean-install gates and live response policies work,
and production matches the candidate, but acceptance remains **FAIL**.

## Why it fails

1. **P2 keyboard accessibility:** the extension side-panel “Skip to cause map”
   link does not move focus to `<main>` after Enter (`focusMain: false`). Its
   main landmark lacks a programmatic focus target.
2. **P2 documented sizing:** shipped site copy repeatedly renders at 10–15px,
   extension utility copy at 11–13px, and the extension Recapture control has
   `min-height: 36px`. These conflict with the design record's 16px site copy,
   14px panel utility copy, and 44px control minimum; mobile brand links are
   also only 34px high.

See `.factory/verification-2.md` for exact reproduction and all evidence.

## What passed

```sh
npm ci
npm run typecheck
npm test
npm run lint
npm run build
npm audit --omit=dev --audit-level=high
```

All passed (26 unit + 6 browser tests; 0 production vulnerabilities). The
extension's actual pointer/keyboard picker, ranker, recapture, stale-target
recovery, scrubbed export, and Escape cancellation passed in Chromium. Live
desktop and 390px QA had zero axe violations/errors, successful offline reload,
and Lighthouse mobile 99 performance / 100 accessibility / 100 best practices
/ 100 SEO. Public rebuilt artifacts are byte-identical to production; extracted
downloaded extension contents exactly match the fresh build.

## Next steps

Add `tabindex="-1"` (or equivalent focus transfer) to the extension main
landmark with a browser regression test. Raise the affected text sizes and
interactive targets to the documented minima, then rerun an independent clean
verification. No product code was changed during this audit.
