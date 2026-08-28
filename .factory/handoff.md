# Handoff — adversarial first-read review 1

## Status: FAIL

Reviewed candidate `edc0155a2151f50764caf5522b3f2f64c544cdc3` and the live site
at <https://css-cause-map.sociobot.in> on 2026-08-28. No product code was
modified. The full ordered findings, exact copy inventory, claim inventory,
and rewrites are in `.factory/review-1.md`.

## What was done

- Opened the live site cold in fresh Chromium contexts at 390×844 and
  1440×900 before scrolling.
- Audited every landing/README sentence, headings, action labels, word counts,
  jargon, terminology, and hard-cap violations.
- Checked `/demo`, `/?demo=1`, reset/banner/start controls, storage namespaces,
  offline behavior, and network destinations.
- Checked `.factory/claims.json` and `@claim:` coverage. Neither exists.
- Crawled public landing/legal/download/source/checkout links.
- Checked titles, h1/main/lang, descriptions, canonicals, social metadata,
  favicon variants, 404 behavior, deep links, Back behavior, focus, shared
  header/footer, and visual identity.
- Ran live axe at mobile and desktop and the supplied `verify-url.sh`.
- Ran `npm ci && npm test` from a temporary clean clone and `npm run build` in
  the worktree.

## Verification results

- Clean-clone tests: 27 unit passed; 7 Playwright passed; 1 intentional
  duplicate mobile extension test skipped.
- Build: passed; extension, ZIP, and `dist/site/` were produced.
- Live landing: zero axe violations at both viewports, same-origin first load,
  offline cached reload passed, and the URL smoke script reported no console
  errors.
- Review verdict: FAIL with four blockers — unclear audience/no trial on the
  first screen, no isolated sample demo, no claims registry/tagged tests, and a
  live “Buy Field Kit” link returning HTTP 404.

## Required next steps

Implement the sample sandbox and claim contract first. Then rewrite the first
screen, repair or remove checkout, add the designed 404 and complete metadata,
make route focus/header/footer behavior consistent, and repeat this review from
a clean context. The existing passing general tests do not cover those gaps.
