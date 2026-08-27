# CSS Cause Map

CSS Cause Map is a local-first Chrome extension for frontend developers who are
debugging a live size, offset, or gap. Pick an element and it produces a ranked,
compact map of the element’s computed box, matched CSS declarations, flex/grid
context, positioning, and constraints from up to eight ancestors. Recapture
adds before/after dimensions and observed DOM changes. Reports export as
scrubbed HTML or JSON.

Live product page: <https://css-cause-map.sociobot.in>

## What it does

- Runs only after the user invokes it on the active tab.
- Names a contributing rule or ancestor and explains why it is relevant.
- Labels the result as computed correlation, not browser-engine causation.
- Never collects DOM text or sends page data to a server.
- Strips URL queries and fragments from exports; optionally anonymizes selectors.
- Keeps core analysis, recapture, and exports free.
- Offers a $12 one-time Field Kit license for an on-device report log and notes.

Chrome blocks extensions from inspecting browser-owned pages such as
`chrome://extensions`. Cross-origin stylesheets may contribute computed values
but cannot always expose their source selector to page JavaScript.

## Develop

Requirements: Node.js 20+ and npm.

```sh
npm install
npm run dev          # WXT extension dev server
npm run dev:site     # landing page
npm run typecheck
npm test
npm run build
```

The exact production command is `npm run build`. It creates:

- `.output/chrome-mv3/` — unpacked MV3 extension
- `.output/css-cause-map-1.0.0-chrome.zip` — packaged extension
- `dist/site/index.html` — static deployment root
- `dist/site/downloads/css-cause-map-chrome.zip` — landing-page download

## Install the extension locally

1. Run `npm run build`.
2. Open `chrome://extensions` and enable Developer mode.
3. Choose **Load unpacked** and select `.output/chrome-mv3`.
4. Open a normal web page, select the CSS Cause Map toolbar icon, and choose
   **Pick element** in the side panel.

The extension requests `activeTab`, `scripting`, `storage`, and `sidePanel`, plus
network access to `api.sociobot.in` solely for optional license verification.
It requests no blanket website host permission.

## Testing

`npm test` runs deterministic ranker tests against 20 seeded layout scenarios
(flex, grid, clamps, box model, margin, transform, and positioning) plus report
privacy/escaping tests. `npm run typecheck` checks the extension, site, and tests.

For a manual smoke test, select elements in flex and grid layouts, change a
class or viewport size, press **Recapture**, and export both formats. Verify the
delta and mutation note in the report.

## Privacy and payment

See [/privacy](https://css-cause-map.sociobot.in/privacy/) and
[/terms](https://css-cause-map.sociobot.in/terms/). Payment uses only the
Sociobot hosted checkout; Dodo is merchant of record. No payment provider is
embedded in the extension or site.

The product contract is in [.factory/brief.json](.factory/brief.json), the
product-specific visual system and asset provenance are in
[.factory/design.md](.factory/design.md), and release verification is recorded
in [.factory/handoff.md](.factory/handoff.md).

## License

MIT — see [LICENSE](LICENSE).
