# Handoff — CSS Cause Map polish round 3

## Status

PASS. All findings in `review-1.md`, `review-2.md`, and `review-3.md` are
closed. The WXT MV3 browser extension and static landing-site deployment class
are unchanged.

Runtime repair commit: `e6edc7d`

Deployment ID: `8b0f7023-86fb-496c-b0dd-aeb8b120f198`

Live site: <https://css-cause-map.sociobot.in>

## What changed

- Replaced the unsupported “find the cause” promise with “rank the rules
  shaping” language in the h1, page/social titles, description, catalog,
  package metadata, and extension manifest.
- Extended `ranked-cause-report` to cover every changed surface and assert the
  exact public wording.
- Proved the compatibility entry `/?demo=1` redirects into the isolated
  `/demo/?demo=1` workspace. Reset and Start for real preserve normal storage.
- Added first-screen 390×844 assertions for the job, audience, sample action,
  outcome, three facts, report heading, and first ranked rule.
- Added standalone WXT preparation for unit and browser test entry points.
- Added a regression assertion for the production 404 rewrite.
- Added missing fragment-removal coverage for the anonymized HTML export.
- Corrected all round-3 copy-audit counts and updated the verb-first,
  83-character catalog description.
- During the cold live audit, found and fixed undersized inline legal-page
  links. Privacy and Terms links now have 44 px targets, checked on every route.
- Preserved the warm paper, graphite, blueprint, and vermilion lab-notebook
  visual system and its original generated illustration.

The cumulative ID-by-ID record is in `.factory/polish-3.md`.

## Clean-clone verification

Final clone: `/tmp/css-cause-map-polish3-e6edc7d-9GpEyc`

```text
npm ci                    PASS — 304 packages, 0 vulnerabilities
ranked-cause-report       PASS
demo-isolation            PASS
offline-core              PASS
private-exports           PASS
capture-comparison        PASS
free-core                 PASS
privacy-boundaries        PASS
manifest-permissions      PASS
picker-inputs             PASS
local-report-log          PASS
local-data-deletion       PASS
production-build          PASS
npm run typecheck         PASS
npm run lint              PASS — zero warnings
npm test                  PASS — 28 Vitest; 31 Playwright; 1 intentional duplicate skip
npm run build             PASS
```

The build produced the unpacked Chrome MV3 extension, a 25.44 kB ZIP, and
`dist/site/`. Landing JavaScript is 0.78 kB gzip; all site JavaScript totals
2.54 kB gzip. CSS is 4.73 kB gzip. The mobile hero is 17.24 kB.

## Accessibility and performance

- Local `verify-url.sh`: correct title/lang/h1/main/alt text; zero console
  errors.
- Playwright Axe: zero violations on the landing site, demo, and packaged side
  panel.
- Final live audit: zero Axe violations and zero undersized targets on root,
  demo, privacy, terms, and 404 at 390×844 and 1366×900.
- Lighthouse mobile: 100 performance, 100 accessibility, 100 best practices,
  and 100 SEO. LCP 1002 ms, CLS 0, TBT 0 ms.
- Reduced motion, responsive layout, visible focus, skip links, focus on route
  headings, and Back navigation were rechecked.

## Live verification

- Cold first screen shows the exact ranked-evidence wording and every required
  fact before the 844 px fold.
- `/?demo=1` redirects to `/demo/?demo=1`; the banner, reset, capture, both
  exports, offline reload, and Start for real work.
- A seeded normal storage value survived the full demo; only the `demo:` key
  was added, and it was removed on exit.
- The full demo flow requested only `https://css-cause-map.sociobot.in` and
  logged no browser error.
- Privacy, Terms, Demo, root, and 404 metadata and shared skeleton passed.
- Browser forward/Back focused the route h1. An unknown URL returned HTTP 404
  with the notebook-styled recovery page.
- CSP, frame, permissions, referrer, nosniff, and cache headers are live.
- The live ZIP passed `unzip -t` and matched the built artifact at SHA-256
  `2be3f18b4c42db094f259f2607bff714331b5f4a1e77d1630fd78e3eed874158`.

Screenshots:

- `.factory/evidence/polish-3-live-landing-mobile.png`
- `.factory/evidence/polish-3-live-demo-mobile.png`
- `.factory/evidence/polish-3-live-not-found.png`
- `.factory/evidence/polish-3-landing-desktop.png`

## Known gaps and next steps

None. No finding, stub, or deferred work remains.
