import { AlgoEvent, AuxiliaryState } from '../events/events';

/**
 * Player status states
 */
export type PlayerStatus = 'idle' | 'playing' | 'paused' | 'finished';

/**
 * Speed presets
 */
export type SpeedPreset = 'slow' | 'normal' | 'fast';

export const speedValues: Record<SpeedPreset, number> = {
  slow: 1000,
  normal: 500,
  fast: 200,
};

/**
 * Pointer to show above bars (i, j, etc.)
 */
export interface VariablePointer {
  index: number;
  label: string;
  color?: string;
}

/**
 * Variable values to display in panel
 */
export interface VariableValue {
  name: string;
  value: string | number;
  highlight?: boolean;
}

/**
 * Snapshot of algorithm state at a given step
 */
export interface AlgorithmSnapshot {
  step: number;
  arrayState: number[];
  markedIndices: Map<number, string>; // index -> mark type
  message?: string;
  highlightedLines: number[];
  metrics: {
    comparisons: number;
    swaps: number;
  };
  // Pointers and variables
  pointers: VariablePointer[];
  variables: VariableValue[];
  expression?: string;
  // Algorithm-specific visualization state
  auxiliaryState?: AuxiliaryState;
  // Algorithm result (for displaying output)
  result?: {
    type: 'string' | 'indices' | 'boolean' | 'frequency' | 'search';
    value: string | number[] | boolean | number;
    label?: string;
  };
}

/**
 * Player state interface
 */
export interface PlayerState {
  // Playback state
  status: PlayerStatus;
  currentStep: number;
  speed: number;
  speedPreset: SpeedPreset;

  // Algorithm data
  algorithmId: string | null;
  events: AlgoEvent[];
  snapshots: AlgorithmSnapshot[];

  // Input
  input: any;

  // Current visual state (derived from snapshot)
  currentSnapshot: AlgorithmSnapshot | null;

  // Validation error message
  validationError: string | null;
}

/**
 * Player actions interface
 */
export interface PlayerActions {
  // Playback controls
  play: () => void;
  pause: () => void;
  step: () => void;
  stepBack: () => void;
  seek: (step: number) => void;
  reset: () => void;

  // Speed control
  setSpeed: (preset: SpeedPreset) => void;
  setSpeedMs: (ms: number) => void;

  // Algorithm setup
  loadAlgorithm: (algorithmId: string, input: any, params?: Record<string, number | string>) => void;
  clearError: () => void;

  // Derived state helpers
  getProgress: () => number;
  getTotalSteps: () => number;
}

export type PlayerStore = PlayerState & PlayerActions;
