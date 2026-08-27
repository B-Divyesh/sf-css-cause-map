import { rankCauses } from './rank';
import type { AnalysisReport, AncestorEvidence, CandidateInput, DomChange, RuleSource } from '../shared/types';

const PROPERTIES = [
  'display', 'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
  'box-sizing', 'aspect-ratio', 'position', 'top', 'right', 'bottom', 'left', 'inset',
  'transform', 'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'flex', 'flex-basis', 'flex-grow', 'flex-shrink', 'align-self', 'grid-column', 'grid-row'
] as const;

const ANCESTOR_PROPERTIES = [
  'display', 'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
  'position', 'overflow', 'transform', 'contain', 'gap', 'row-gap', 'column-gap',
  'justify-content', 'align-items', 'grid-template-columns', 'grid-template-rows'
] as const;

export function selectorFor(element: Element): string {
  const tag = element.tagName.toLowerCase();
  if (element.id) return `${tag}#${CSS.escape(element.id)}`;
  const classes = Array.from(element.classList).slice(0, 2).map((name) => `.${CSS.escape(name)}`).join('');
  return `${tag}${classes}`;
}

export function analyzeElement(element: Element, changes: DomChange[] = []): AnalysisReport {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  const candidates: CandidateInput[] = [];
  const ancestors: AncestorEvidence[] = [];

  addProperties(candidates, element, style, PROPERTIES, 0);

  let current = element.parentElement;
  let distance = 1;
  while (current && distance <= 8) {
    const computed = getComputedStyle(current);
    const selector = selectorFor(current);
    ancestors.push({
      selector,
      tag: current.tagName.toLowerCase(),
      distance,
      display: computed.display,
      position: computed.position,
      width: computed.width,
      height: computed.height,
      overflow: computed.overflow
    });
    addProperties(candidates, current, computed, ANCESTOR_PROPERTIES, distance);
    current = current.parentElement;
    distance += 1;
  }

  return {
    schema: 'css-cause-map/v1',
    capturedAt: new Date().toISOString(),
    page: { url: location.href },
    target: { selector: selectorFor(element), tag: element.tagName.toLowerCase() },
    box: {
      x: round(rect.x), y: round(rect.y), width: round(rect.width), height: round(rect.height),
      margin: sides(style, 'margin'), padding: sides(style, 'padding'), border: sides(style, 'border', '-width')
    },
    causes: rankCauses(candidates),
    ancestors,
    changes: changes.slice(-30),
    caveat: 'Ranked computed evidence, not the browser engine’s internal causal trace. Confirm by toggling the named rule.'
  };
}

function addProperties(
  output: CandidateInput[],
  element: Element,
  style: CSSStyleDeclaration,
  properties: readonly string[],
  distance: number
): void {
  for (const property of properties) {
    const value = style.getPropertyValue(property).trim();
    if (!value) continue;
    if (distance > 0 && !isRelevantAncestorProperty(property, value)) continue;
    const source = findRuleSource(element, property);
    output.push({
      property,
      value,
      scope: distance === 0 ? 'element' : distance === 1 ? 'parent' : 'ancestor',
      origin: selectorFor(element),
      distance,
      hasRule: Boolean(source),
      important: source?.important,
      source
    });
  }
}

function isRelevantAncestorProperty(property: string, value: string): boolean {
  if (property === 'display') return value === 'flex' || value === 'inline-flex' || value === 'grid' || value === 'inline-grid';
  if (property === 'position') return value !== 'static';
  if (property === 'overflow') return value !== 'visible';
  if (property === 'transform') return value !== 'none';
  if (property === 'contain') return value !== 'none';
  if (/^(min|max)-/.test(property)) return value !== 'none' && value !== '0px';
  if (property === 'width' || property === 'height') return value !== 'auto';
  if (property.includes('gap')) return value !== 'normal' && value !== '0px';
  return true;
}

function findRuleSource(element: Element, property: string): RuleSource | undefined {
  if ((element as HTMLElement).style?.getPropertyValue(property)) {
    return {
      selector: 'style attribute', location: 'inline', inline: true,
      important: (element as HTMLElement).style.getPropertyPriority(property) === 'important'
    };
  }
  let found: RuleSource | undefined;
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try { rules = sheet.cssRules; } catch { continue; }
    visitRules(rules, (rule) => {
      if (!rule.style.getPropertyValue(property)) return;
      try {
        if (!element.matches(rule.selectorText)) return;
      } catch { return; }
      found = {
        selector: rule.selectorText,
        location: sourceLocation(sheet.href),
        important: rule.style.getPropertyPriority(property) === 'important'
      };
    });
  }
  return found;
}

function visitRules(rules: CSSRuleList, callback: (rule: CSSStyleRule) => void): void {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) callback(rule);
    else if ('cssRules' in rule) {
      try { visitRules((rule as CSSGroupingRule).cssRules, callback); } catch { /* cross-origin nested sheet */ }
    }
  }
}

function sourceLocation(href: string | null): string {
  if (!href) return 'document stylesheet';
  try {
    const url = new URL(href);
    return `${url.origin}${url.pathname}`;
  } catch { return 'stylesheet'; }
}

function sides(style: CSSStyleDeclaration, base: string, suffix = ''): [string, string, string, string] {
  return ['top', 'right', 'bottom', 'left'].map((side) => style.getPropertyValue(`${base}-${side}${suffix}`)) as [string, string, string, string];
}

function round(value: number): number { return Math.round(value * 10) / 10; }
