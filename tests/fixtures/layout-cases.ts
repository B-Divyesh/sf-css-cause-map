import type { CandidateInput } from '../../src/shared/types';

const c = (property: string, value: string, distance = 0, hasRule = true): CandidateInput => ({
  property,
  value,
  distance,
  hasRule,
  scope: distance === 0 ? 'element' : distance === 1 ? 'parent' : 'ancestor',
  origin: distance === 0 ? '.target' : distance === 1 ? '.parent' : '.ancestor'
});

export const layoutCases: Array<{ name: string; expected: string; candidates: CandidateInput[] }> = [
  { name: 'declared element width', expected: 'width', candidates: [c('width', '320px'), c('margin', '0px auto')] },
  { name: 'declared element height', expected: 'height', candidates: [c('height', '180px'), c('padding', '16px', 0, false)] },
  { name: 'max width clamp', expected: 'max-width', candidates: [c('max-width', '40rem'), c('width', '640px', 0, false)] },
  { name: 'min height clamp', expected: 'min-height', candidates: [c('min-height', '100vh'), c('height', '800px', 0, false)] },
  { name: 'flex basis starts sizing', expected: 'flex-basis', candidates: [c('flex-basis', '18rem'), c('display', 'flex', 1)] },
  { name: 'grid columns constrain child', expected: 'grid-template-columns', candidates: [c('grid-template-columns', '1fr 2fr', 1), c('width', '300px', 0, false)] },
  { name: 'parent gap creates space', expected: 'gap', candidates: [c('gap', '24px', 1), c('margin', '8px', 0, false)] },
  { name: 'transform creates visual offset', expected: 'transform', candidates: [c('transform', 'translateX(20px)'), c('left', 'auto')] },
  { name: 'position inset offsets element', expected: 'top', candidates: [c('top', '12px'), c('position', 'absolute')] },
  { name: 'border box changes final size', expected: 'box-sizing', candidates: [c('box-sizing', 'border-box'), c('padding', '12px', 0, false)] },
  { name: 'padding contributes size', expected: 'padding', candidates: [c('padding', '24px'), c('overflow', 'visible')] },
  { name: 'margin creates outside gap', expected: 'margin', candidates: [c('margin', '0 0 32px'), c('overflow', 'visible')] },
  { name: 'self alignment changes offset', expected: 'align-self', candidates: [c('align-self', 'center'), c('position', 'static', 0, false)] },
  { name: 'flex growth distributes width', expected: 'flex-grow', candidates: [c('flex-grow', '1'), c('width', '420px', 0, false)] },
  { name: 'flex shrink compresses width', expected: 'flex-shrink', candidates: [c('flex-shrink', '1'), c('width', '180px', 0, false)] },
  { name: 'grid placement selects track', expected: 'grid-column', candidates: [c('grid-column', '2 / 4'), c('width', '400px', 0, false)] },
  { name: 'aspect ratio derives dimension', expected: 'aspect-ratio', candidates: [c('aspect-ratio', '16 / 9'), c('height', '225px', 0, false)] },
  { name: 'parent justification offsets item', expected: 'justify-content', candidates: [c('justify-content', 'space-between', 1), c('margin', '0px', 0, false)] },
  { name: 'ancestor min width clamps subtree', expected: 'min-width', candidates: [c('min-width', '720px', 2), c('width', '680px', 0, false)] },
  { name: 'grid rows constrain height', expected: 'grid-template-rows', candidates: [c('grid-template-rows', 'auto 1fr', 1), c('height', '260px', 0, false)] }
];
