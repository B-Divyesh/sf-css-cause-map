import { describe, expect, it } from 'vitest';
import { rankCauses } from '../src/analysis/rank';
import { layoutCases } from './fixtures/layout-cases';

describe('layout cause ranking across seeded fixtures', () => {
  it.each(layoutCases)('$name', ({ candidates, expected }) => {
    expect(rankCauses(candidates)[0]?.property).toBe(expected);
  });

  it('labels low-distance, rule-backed evidence clearly', () => {
    const [cause] = rankCauses([{ property: 'width', value: '20rem', scope: 'element', origin: '.card', distance: 0, hasRule: true }]);
    expect(cause?.confidence).toBe('strong');
    expect(cause?.reason).toContain('computed width');
  });
});
