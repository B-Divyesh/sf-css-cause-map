import type { CandidateInput, Cause } from '../shared/types';

const WEIGHTS: Record<string, number> = {
  display: 94,
  width: 91,
  height: 91,
  'max-width': 90,
  'min-width': 88,
  'max-height': 90,
  'min-height': 88,
  'flex-basis': 92,
  'flex-grow': 86,
  'flex-shrink': 86,
  'grid-template-columns': 92,
  'grid-template-rows': 92,
  'grid-column': 86,
  'grid-row': 86,
  'justify-content': 84,
  'align-items': 84,
  'align-self': 86,
  gap: 88,
  'row-gap': 88,
  'column-gap': 88,
  position: 83,
  top: 86,
  right: 86,
  bottom: 86,
  left: 86,
  inset: 86,
  transform: 89,
  'box-sizing': 78,
  padding: 78,
  margin: 76,
  overflow: 70,
  'aspect-ratio': 88
};

const PRESENTATIONAL_DEFAULTS = new Set(['auto', 'none', 'normal', '0px', '0', 'static', 'visible']);

export function rankCauses(inputs: CandidateInput[]): Cause[] {
  const seen = new Set<string>();
  return inputs
    .filter((input) => {
      const key = `${input.scope}:${input.origin}:${input.property}:${input.value}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return !PRESENTATIONAL_DEFAULTS.has(input.value) || ['display', 'position', 'box-sizing'].includes(input.property);
    })
    .map((input, index) => {
      const base = WEIGHTS[input.property] ?? (/^(padding|border)-/.test(input.property) ? 76 : /^(margin)-/.test(input.property) ? 74 : 60);
      const score = Math.max(35, Math.min(99, base + (input.hasRule ? 5 : -8) + (input.important ? 3 : 0) - input.distance * 4));
      return {
        id: `${input.property}-${input.distance}-${index}`,
        property: input.property,
        value: input.value,
        score,
        confidence: score >= 88 ? 'strong' : score >= 70 ? 'likely' : 'context',
        scope: input.scope,
        origin: input.origin,
        distance: input.distance,
        reason: input.reason ?? explain(input),
        source: input.source
      } satisfies Cause;
    })
    .sort((a, b) => b.score - a.score || a.distance - b.distance)
    .slice(0, 16);
}

function explain(input: CandidateInput): string {
  const who = input.distance === 0 ? 'The selected element' : input.distance === 1 ? 'Its parent' : `An ancestor ${input.distance} levels up`;
  switch (input.property) {
    case 'display': return `${who} establishes a ${input.value} formatting context.`;
    case 'width':
    case 'height': return `${who} contributes a computed ${input.property} of ${input.value}.`;
    case 'max-width':
    case 'max-height':
    case 'min-width':
    case 'min-height': return `${who} clamps the available ${input.property.includes('width') ? 'width' : 'height'} with ${input.property}: ${input.value}.`;
    case 'gap':
    case 'row-gap':
    case 'column-gap': return `${who} inserts track/item spacing of ${input.value}.`;
    case 'justify-content':
    case 'align-items':
    case 'align-self': return `${who} positions items on the ${input.property.includes('justify') ? 'main' : 'cross'} axis.`;
    case 'flex-basis': return `${who} starts flex sizing from ${input.value} before free space is distributed.`;
    case 'flex-grow':
    case 'flex-shrink': return `${who} participates in flex free-space distribution with ${input.property}: ${input.value}.`;
    case 'grid-template-columns':
    case 'grid-template-rows': return `${who} defines grid tracks that constrain the selected item.`;
    case 'box-sizing': return `${who} uses ${input.value}, changing whether padding and border are included in its declared size.`;
    case 'transform': return `${who} is visually offset by ${input.value} after layout.`;
    case 'position': return `${who} uses ${input.value} positioning, which can change its containing block or normal-flow participation.`;
    default: return `${who} contributes ${input.property}: ${input.value}.`;
  }
}
