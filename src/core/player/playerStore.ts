import { create } from 'zustand';
import {
  PlayerStore,
  PlayerStatus,
  SpeedPreset,
  speedValues,
  AlgorithmSnapshot
} from './types';
import { AlgoEvent } from '../events/events';
import { getAlgorithm } from '../algorithms/registry';

/**
 * Create initial snapshot from input array
 */
/**
 * Create initial snapshot from input
 */
const createInitialSnapshot = (input: any): AlgorithmSnapshot => ({
  step: 0,
  arrayState: Array.isArray(input) ? [...input] : (input?.values ? [...input.values] : []),
  markedIndices: new Map(),
  message: 'Ready to start',
  highlightedLines: [],
  metrics: {
    comparisons: 0,
    swaps: 0,
  },
  pointers: [],
  variables: [],
  expression: undefined,
  auxiliaryState: undefined, // Explicitly clear to prevent carryover from previous algorithm
});

/**
 * Apply an event to create a new snapshot
 */
const applyEvent = (
  prevSnapshot: AlgorithmSnapshot,
  event: AlgoEvent,
  step: number
): AlgorithmSnapshot => {
  const newSnapshot: AlgorithmSnapshot = {
    ...prevSnapshot,
    step,
    arrayState: [...prevSnapshot.arrayState],
    markedIndices: new Map(prevSnapshot.markedIndices),
    highlightedLines: [...prevSnapshot.highlightedLines],
    metrics: { ...prevSnapshot.metrics },
    pointers: [...prevSnapshot.pointers],
    variables: [...prevSnapshot.variables],
    auxiliaryState: prevSnapshot.auxiliaryState ? { ...prevSnapshot.auxiliaryState } : undefined,
  };

  switch (event.type) {
    case 'compare':
      newSnapshot.markedIndices.clear();
      newSnapshot.markedIndices.set(event.indices[0], 'comparing');
      newSnapshot.markedIndices.set(event.indices[1], 'comparing');
      newSnapshot.metrics.comparisons++;
      break;

    case 'swap':
      const [i, j] = event.indices;
      const temp = newSnapshot.arrayState[i];
      newSnapshot.arrayState[i] = newSnapshot.arrayState[j];
      newSnapshot.arrayState[j] = temp;
      newSnapshot.markedIndices.clear();
      newSnapshot.markedIndices.set(i, 'swapping');
      newSnapshot.markedIndices.set(j, 'swapping');
      newSnapshot.metrics.swaps++;
      break;

    case 'mark':
      event.indices.forEach((idx) => {
        newSnapshot.markedIndices.set(idx, event.markType);
      });
      break;

    case 'unmark':
      event.indices.forEach((idx) => {
        newSnapshot.markedIndices.delete(idx);
      });
      break;

    case 'message':
      newSnapshot.message = event.text;
      if (event.highlightLine !== undefined) {
        newSnapshot.highlightedLines = [event.highlightLine];
      }
      break;

    case 'highlight':
      newSnapshot.highlightedLines = event.lineNumbers;
      break;

    case 'set':
      newSnapshot.arrayState[event.index] = event.value as number;
      break;

    case 'pointer':
      newSnapshot.pointers = event.pointers;
      // Merge variables: update existing ones and add new ones (cumulative tracking)
      if (event.variables && event.variables.length > 0) {
        const existingVars = new Map(newSnapshot.variables.map(v => [v.name, v]));
        for (const newVar of event.variables) {
          existingVars.set(newVar.name, newVar);
        }
        newSnapshot.variables = Array.from(existingVars.values());
      }
      if (event.expression !== undefined) {
        newSnapshot.expression = event.expression;
      }
      break;

    case 'auxiliary':
      newSnapshot.auxiliaryState = event.state;
      break;

    case 'result':
      newSnapshot.result = {
        type: event.resultType,
        value: event.value,
        label: event.label,
      };
      break;

    default:
      break;
  }

  return newSnapshot;
};

/**
 * Generate all snapshots from events
 */
const generateSnapshots = (
  input: any,
  events: AlgoEvent[]
): AlgorithmSnapshot[] => {
  const snapshots: AlgorithmSnapshot[] = [createInitialSnapshot(input)];

  let currentSnapshot = snapshots[0];
  events.forEach((event, index) => {
    currentSnapshot = applyEvent(currentSnapshot, event, index + 1);
    snapshots.push(currentSnapshot);
  });

  return snapshots;
};

/**
 * Player store using Zustand
 */
export const usePlayerStore = create<PlayerStore>((set, get) => {
  let playIntervalId: NodeJS.Timeout | null = null;

  const clearPlayInterval = () => {
    if (playIntervalId) {
      clearInterval(playIntervalId);
      playIntervalId = null;
    }
  };

  const advanceStep = () => {
    const state = get();
    const nextStep = state.currentStep + 1;

    if (nextStep >= state.snapshots.length) {
      clearPlayInterval();
      set({
        status: 'finished',
        currentSnapshot: state.snapshots[state.snapshots.length - 1],
      });
      return;
    }

    set({
      currentStep: nextStep,
      currentSnapshot: state.snapshots[nextStep],
    });
  };

  return {
    // Initial state
    status: 'idle',
    currentStep: 0,
    speed: speedValues.normal,
    speedPreset: 'normal',
    algorithmId: null,
    events: [],
    snapshots: [],
    input: [],
    currentSnapshot: null,
    validationError: null,

    // Actions
    play: () => {
      const state = get();
      if (state.status === 'playing') return;
      if (state.snapshots.length === 0) return;
      if (state.currentStep >= state.snapshots.length - 1) {
        // If at end, restart
        set({
          currentStep: 0,
          currentSnapshot: state.snapshots[0],
        });
      }

      clearPlayInterval();
      playIntervalId = setInterval(advanceStep, state.speed);
      set({ status: 'playing' });
    },

    pause: () => {
      clearPlayInterval();
      set({ status: 'paused' });
    },

    step: () => {
      clearPlayInterval();
      const state = get();
      const nextStep = state.currentStep + 1;

      if (nextStep >= state.snapshots.length) {
        set({ status: 'finished' });
        return;
      }

      set({
        status: 'paused',
        currentStep: nextStep,
        currentSnapshot: state.snapshots[nextStep],
      });
    },

    stepBack: () => {
      clearPlayInterval();
      const state = get();
      const prevStep = Math.max(0, state.currentStep - 1);

      set({
        status: 'paused',
        currentStep: prevStep,
        currentSnapshot: state.snapshots[prevStep],
      });
    },

    seek: (step: number) => {
      clearPlayInterval();
      const state = get();
      const clampedStep = Math.max(0, Math.min(step, state.snapshots.length - 1));

      set({
        status: 'paused',
        currentStep: clampedStep,
        currentSnapshot: state.snapshots[clampedStep],
      });
    },

    reset: () => {
      clearPlayInterval();
      const state = get();

      if (state.snapshots.length > 0) {
        set({
          status: 'idle',
          currentStep: 0,
          currentSnapshot: state.snapshots[0],
        });
      } else {
        set({
          status: 'idle',
          currentStep: 0,
          currentSnapshot: null,
        });
      }
    },

    setSpeed: (preset: SpeedPreset) => {
      const state = get();
      const newSpeed = speedValues[preset];

      set({
        speed: newSpeed,
        speedPreset: preset,
      });

      // If playing, restart with new speed
      if (state.status === 'playing') {
        clearPlayInterval();
        playIntervalId = setInterval(advanceStep, newSpeed);
      }
    },

    setSpeedMs: (ms: number) => {
      const state = get();
      // Clamp speed between 100ms and 2000ms
      const newSpeed = Math.max(100, Math.min(2000, ms));

      set({
        speed: newSpeed,
        speedPreset: 'normal', // Reset preset when using custom speed
      });

      // If playing, restart with new speed
      if (state.status === 'playing') {
        clearPlayInterval();
        playIntervalId = setInterval(advanceStep, newSpeed);
      }
    },

    loadAlgorithm: (algorithmId: string, input: any, params?: Record<string, number | string>) => {
      clearPlayInterval();

      const algorithm = getAlgorithm(algorithmId);
      if (!algorithm) {
        console.error(`Algorithm ${algorithmId} not found`);
        set({ validationError: `Algorithm ${algorithmId} not found` });
        return;
      }

      // Handle input format: wrap array inputs if raw array, pass objects as-is
      // Graph algorithms expect { nodes: ..., edges: ... }, Array algos expect { values: ... }
      // If input is array, assume it's for Array algo and wrap it
      const inputObj = Array.isArray(input) ? { values: input } : input;

      // Validate input
      const validation = algorithm.validate(inputObj);
      if (!validation.ok) {
        set({ validationError: validation.error || 'Invalid input' });
        return;
      }

      // Clear any previous validation errors
      set({ validationError: null });

      // Collect all events (pass params to run)
      const events: AlgoEvent[] = [];
      const runResult = algorithm.run(inputObj, params);

      try {
        for (const event of runResult) {
          events.push(event);
        }
      } catch (err) {
        console.error('Error running algorithm:', err);
        set({ validationError: 'Error executing algorithm: ' + (err instanceof Error ? err.message : String(err)) });
        return;
      }

      // Generate snapshots
      const snapshots = generateSnapshots(input, events);

      set({
        status: 'idle',
        currentStep: 0,
        algorithmId,
        events,
        snapshots,
        input: input,
        currentSnapshot: snapshots[0],
      });
    },

    getProgress: () => {
      const state = get();
      if (state.snapshots.length <= 1) return 0;
      return (state.currentStep / (state.snapshots.length - 1)) * 100;
    },

    getTotalSteps: () => {
      return get().snapshots.length - 1;
    },

    clearError: () => {
      set({ validationError: null });
    },
  };
});
