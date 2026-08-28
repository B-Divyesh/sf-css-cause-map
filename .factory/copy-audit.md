# Copy audit — polish round 2

Audited on 2026-08-28. Counts treat hyphenated terms and CSS values as one word. No sentence exceeds 22 words. No banned marketing word appears.

## Landing-page sentences

| Words | Sentence | Result |
| ---: | --- | --- |
| 8 | Find the CSS rule causing a layout gap. | Pass |
| 16 | For frontend developers debugging live layouts, rank the rules and parent elements most likely shaping the selected element. | Pass |
| 6 | See a ranked cause report immediately. | Pass |
| 7 | Nothing is saved to your real data. | Pass |
| 4 | Core analysis works offline. | Pass; `@claim:offline-core` |
| 4 | Analysis stays in Chrome. | Pass; `@claim:privacy-boundaries` |
| 7 | Core analysis and exports are free. | Pass; `@claim:free-core` |
| 8 | Trace one layout effect through its parent elements. | Pass |
| 11 | See computed styles, layout measurements, and parent constraints in one cause report. | Pass; `@claim:ranked-cause-report` |
| 7 | Open the side panel. | Pass |
| 11 | Select the element with a pointer, or use Tab and Enter. | Pass |
| 10 | See the CSS rules and parent settings ranked by likely effect. | Pass; `@claim:ranked-cause-report` |
| 5 | Reproduce the layout problem. | Pass |
| 11 | Capture again, then export a private HTML or JSON report. | Pass; `@claim:capture-comparison`, `@claim:private-exports` |
| 7 | Scores rank visible CSS evidence. | Pass |
| 8 | They do not reveal Chrome’s internal layout decisions. | Pass |
| 11 | The parent creates three tracks that constrain this card. | Pass |
| 10 | There are no accounts, analytics, page uploads, or broad site permissions. | Pass; `@claim:privacy-boundaries` |
| 7 | Exports remove page text and URL queries. | Pass; `@claim:private-exports` |
| 9 | You can replace CSS selectors with anonymous labels. | Pass; `@claim:private-exports` |
| 9 | Install the ZIP as an unpacked Chrome extension. | Pass |
| 11 | Find the CSS rules and parent elements shaping a selected element. | Pass |
| 6 | Notebook image generated for this product. | Pass; provenance in `.factory/design.md` |

## Headings, labels, and actions

All headings state a task or section directly. The primary action is “Try it with sample data.” Other actions name their result: “Download the Chrome extension,” “Open the sample cause report,” and “Download CSS Cause Map.”

## README check

Every README sentence is 22 words or fewer. The round 2 test and deployment lines are direct instructions: “Run `npm test`.” and “Deploy the static contents of `dist/site/`.”

## Round 2 product copy

| Words | Sentence | Result |
| ---: | --- | --- |
| 15 | Use Clear report log in Saved reports to delete every saved report and private note. | Pass; `@claim:local-data-deletion` |
| 10 | Deletes every saved report and private note from this browser. | Pass; control help text |
| 13 | Choose Confirm clear report log to delete every saved report and private note. | Pass; specific confirmation |
| 3 | Report log cleared. | Pass; confirmed result |
| 8 | All saved reports and private notes were deleted. | Pass; confirmed result |

The catalog line is 93 characters, starts with “Trace,” and names the job without marketing words.

## Terminology

| Concept | Chosen term |
| --- | --- |
| Generated result | cause report |
| Context above the element | parent element |
| Re-running analysis | capture again |
| Defect | layout problem |
| Stored items | report log |
