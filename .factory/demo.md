# Demo contract

## Entry points

- Catalog and test URL: `https://css-cause-map.sociobot.in/demo/?demo=1`
- Compatibility URL: `https://css-cause-map.sociobot.in/?demo=1`, which redirects to the demo route
- Local URL: `http://127.0.0.1:4173/demo/?demo=1`

## Sample

The demo opens with `article.product-card` selected in a three-column product grid. It includes final size and position, three ranked CSS causes, source selectors, two parent constraints, and rules to test.

**Capture again** applies a deterministic after-state. The card width changes from 312 px to 288 px and records one class change.

Both HTML and JSON exports use the sample report. They remove URL query details and contain no page text. The selector option replaces selectors with stable anonymous labels.

## Isolation and reset

The demo reads and writes only `localStorage["demo:css-cause-map:state"]`. It never reads or changes normal product or extension keys.

**Reset demo** restores the original sample. **Start for real** deletes the demo key and returns home. The service worker caches the demo shell so reset, capture, and export remain available offline after the first visit.
