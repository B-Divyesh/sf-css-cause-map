# CSS Cause Map

CSS Cause Map is a Chrome extension for frontend developers debugging a layout problem. Select an element to rank the CSS rules and parent elements shaping it.

Capture the element again to compare its size and page changes. Export an HTML or JSON report without page text or URL query details.

- Product: <https://css-cause-map.sociobot.in>
- Isolated sample: <https://css-cause-map.sociobot.in/demo/?demo=1>
- Privacy: <https://css-cause-map.sociobot.in/privacy/>
- Terms: <https://css-cause-map.sociobot.in/terms/>

## What it does

- Starts after you choose it on the current tab.
- Shows final measurements, matched CSS rules, and parent constraints.
- Explains why each cause matters and names a rule to test.
- Compares measurements and page changes between captures.
- Keeps analysis inside Chrome and makes no network requests.
- Exports HTML and JSON without page text or private URL details.
- Stores up to 100 reports and private notes in extension storage.
- Keeps analysis and both export formats free.

The report ranks visible CSS evidence. It does not claim to reveal Chrome’s internal layout decisions.

## Try the isolated sample

Open [the sample cause report](https://css-cause-map.sociobot.in/demo/?demo=1). It starts with a selected product card, ranked causes, measurements, and parent constraints.

Choose **Capture again** to see a width change. Export both report formats, or choose **Reset demo** to restore the original sample.

Demo state uses the `demo:css-cause-map:state` key. Starting for real removes that key and never changes normal browser data.

See [.factory/demo.md](.factory/demo.md) for the sample and isolation contract.

## Develop

Use Node.js 20 or newer.

```sh
npm ci
npm run dev          # extension development server
npm run dev:site     # product site
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run build` creates the unpacked MV3 extension, its ZIP, and `dist/site/`. The site folder includes the downloadable extension ZIP.

## Install the extension locally

1. Run `npm run build`.
2. Open `chrome://extensions` and enable Developer mode.
3. Choose **Load unpacked**, then select `.output/chrome-mv3`.
4. Open a web page and select the CSS Cause Map toolbar icon.
5. Choose **Pick element** in the side panel.

The extension requests `activeTab`, `scripting`, `storage`, and `sidePanel`. It requests no website host permission.

## Test and deploy

Run `npm test`. Run `npm run build` before deployment.

Each product promise is registered in [.factory/claims.json](.factory/claims.json). Run any listed command from a clean checkout to verify that promise.

Deploy the static contents of `dist/site/`.

## Product records

See [.factory/brief.json](.factory/brief.json) for scope. See [.factory/design.md](.factory/design.md) for the visual system and asset provenance.

Release evidence is recorded in [.factory/handoff.md](.factory/handoff.md).

## License

MIT — see [LICENSE](LICENSE).
