export type Confidence = 'strong' | 'likely' | 'context';

export interface BoxMetrics {
  x: number;
  y: number;
  width: number;
  height: number;
  margin: [string, string, string, string];
  padding: [string, string, string, string];
  border: [string, string, string, string];
}

export interface RuleSource {
  selector: string;
  location: string;
  important: boolean;
  inline?: boolean;
}

export interface Cause {
  id: string;
  property: string;
  value: string;
  score: number;
  confidence: Confidence;
  scope: 'element' | 'parent' | 'ancestor';
  origin: string;
  distance: number;
  reason: string;
  source?: RuleSource;
}

export interface AncestorEvidence {
  selector: string;
  tag: string;
  distance: number;
  display: string;
  position: string;
  width: string;
  height: string;
  overflow: string;
}

export interface DomChange {
  kind: 'attribute' | 'child-list';
  target: string;
  detail: string;
  at: string;
}

export interface AnalysisReport {
  schema: 'css-cause-map/v1';
  capturedAt: string;
  page: { url: string };
  target: { selector: string; tag: string };
  box: BoxMetrics;
  causes: Cause[];
  ancestors: AncestorEvidence[];
  changes: DomChange[];
  comparison?: {
    previousCapturedAt: string;
    widthDelta: number;
    heightDelta: number;
    xDelta: number;
    yDelta: number;
  };
  caveat: string;
}

export interface CandidateInput {
  property: string;
  value: string;
  scope: Cause['scope'];
  origin: string;
  distance: number;
  hasRule?: boolean;
  important?: boolean;
  reason?: string;
  source?: RuleSource;
}

export type ExtensionMessage =
  | { type: 'CCM_START_PICKER' }
  | { type: 'CCM_RECAPTURE' }
  | { type: 'CCM_CANCEL_PICKER' }
  | { type: 'CCM_ANALYSIS'; report: AnalysisReport }
  | { type: 'CCM_PICKER_STATE'; state: 'ready' | 'picking' | 'cancelled'; message?: string }
  | { type: 'CCM_ERROR'; message: string };
