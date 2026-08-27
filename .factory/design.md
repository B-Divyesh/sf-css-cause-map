# CSS Cause Map — visual thesis

## Direction: handwritten lab notebook

CSS debugging is investigative work: measure, form a hypothesis, cross out a
false lead, and keep the proof. The product therefore behaves like a careful
engineer's field notebook rather than a generic dashboard. Warm drafting paper,
graphite type, blue construction marks, red causal annotations, ruled baselines,
and clipped evidence slips make the causal chain feel inspectable and
shareable. Decoration only appears where it explains the workflow.

This is an intentionally single-mode treatment. The explicitly painted warm
paper canvas is the identity and keeps screenshots/reports consistent between
the extension, exports, and landing page.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#F6F0DF` | canvas |
| `paper-raised` | `#FFFDF5` | evidence slips and controls |
| `ink` | `#172026` | primary text (13.9:1 on paper) |
| `pencil` | `#566067` | secondary text (6.1:1 on paper) |
| `rule` | `#C9BEA6` | notebook rules and dividers |
| `blueprint` | `#174F79` | links, focus, selected measurements |
| `blueprint-deep` | `#0D3858` | blue control hover |
| `vermilion` | `#A73A2A` | primary cause / destructive emphasis |
| `vermilion-deep` | `#77271D` | primary control hover |
| `moss` | `#315F46` | verified/success |
| `ochre` | `#8A5A00` | uncertainty/warning |
| `danger` | `#8C2525` | errors |

Every status also uses an icon and text label. Focus is a 3 px blueprint ring
with a paper offset, not color alone.

## Typography

- Notes and headlines: `Georgia, 'Times New Roman', serif`; the uneven serif
  rhythm evokes written observation without using a novelty handwriting font.
- Measurements and interface: `ui-monospace, SFMono-Regular, Menlo, Consolas,
  monospace`; CSS values stay aligned and scannable with tabular figures.
- Scale: 12, 14, 16, 20, 28, 46 px. Body never drops below 16 px on the site;
  the compact browser side panel uses 14 px utility copy while controls remain
  at least 44 px tall.
- No remote fonts or runtime font files.

## Layout and spacing

An 8 px base grid with 4 px for optical corrections. Site measures are capped
at 1180 px; prose at 68 characters. Extension layout is a narrow lab sheet:
status and action first, selected element second, ranked causes third, evidence
details last. Cards are reserved for independent evidence groups; related
causes use a continuous ruled timeline.

On 390 px screens the site navigation compresses to essential links, hero copy
stacks above the specimen, comparison columns become a sequence, and floating
decoration is removed. Safe-area padding is applied. The side panel itself is
usable from 320 px and never depends on hover.

## Interaction grammar

- **Circle:** selecting an element is a blue pencil outline drawn on the page.
- **Underline:** the strongest causal property receives a red annotation rule.
- **Pin:** expanding a cause reveals its evidence in place, preserving context.
- **Tear off:** export creates a scrubbed report, visually echoed as a paper
  slip; JSON and HTML remain core free exports.
- All immediate actions acknowledge with label/state changes and an `aria-live`
  message. Picker mode can be cancelled with Escape.

## Motion

Controls respond in 160 ms; cause rows enter over 220 ms from their measured
origin using opacity and a 4 px translate. The picker outline does not pulse.
No movement loops. Under `prefers-reduced-motion: reduce`, transitions and
scroll behavior become instant; hierarchy remains through ink, rules, and
layering.

## Original asset plan and art direction

One generated hero still-life supports the landing page: a top-down lab desk
with a browser-layout specimen, calipers, thread-like causal arrows, and paper
layers. It depicts the mental model, not a fictional screenshot. Product icons,
cause arrows, and the extension mark are hand-authored SVG/CSS primitives.

Prompt sheet:

- Subject: a forensic CSS layout investigation represented as paper rectangles,
  measurement calipers, ancestor nesting, and red/blue pencil cause lines.
- World: quiet frontend engineer's lab notebook on a drafting desk.
- Materials: fibrous cream paper, graphite, colored pencil, metal ruler,
  translucent tracing paper, binder clips.
- Light/lens: soft northern window light, top-down 50 mm editorial still life,
  shallow natural shadows, crisp central detail.
- Palette words: warm ivory, graphite, blueprint blue, restrained vermilion,
  oxidized brass.
- Negative list: no people, hands, faces, legible text, logos, brands,
  watermarks, screens with fake UI, neon, gradients, glossy 3D, excessive props.

Final generation prompt:

> Use case: stylized-concept. Asset type: wide landing-page hero illustration.
> Primary request: top-down editorial still life of a forensic CSS layout
> investigation in a handwritten lab notebook. Scene: fibrous cream drafting
> paper on a quiet engineer's desk. Subject: nested blank paper rectangles held
> with tiny binder clips, precise measurement calipers, a metal ruler, graphite
> dimension marks, and thread-like blueprint-blue and vermilion pencil lines
> tracing one layout cause through several ancestor layers. Style: tactile
> analogue mixed-media photography, restrained, intelligent, plausible.
> Composition: landscape, important diagram in the right two-thirds, calm
> negative space toward upper left, no cropped key objects. Lighting: soft north
> window light, top-down 50 mm, shallow natural shadows. Palette: warm ivory,
> graphite, blueprint blue, restrained vermilion, oxidized brass. Constraints:
> no people, no hands, no faces, no legible text, no letters, no logos, no
> brands, no watermark, no fake software interface, no neon, no gradients, no
> glossy 3D, no clutter.

Provenance: generated for this product using the Param Factory Azure image
deployment (`factory-image`) on 2026-08-27. Original generated work; no external
reference images. The final asset and prompt sidecar live in `assets/src/`.

