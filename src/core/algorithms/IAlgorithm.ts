import { AlgoEvent } from '../events/events';

/**
 * Result type for validation
 */
export type ValidationResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Parameter types for algorithm configuration
 */
export type AlgorithmParameterType = 'number' | 'select' | 'text';

export interface NumberParameter {
  type: 'number';
  id: string;
  label: string;
  default: number;
  min: number;
  max: number;
  step?: number;
  /** Show this parameter only when another parameter has specific value(s) */
  dependsOn?: { parameterId: string; values: string[] };
}

export interface SelectParameter {
  type: 'select';
  id: string;
  label: string;
  default: string;
  options: { value: string; label: string }[];
  /** Show this parameter only when another parameter has specific value(s) */
  dependsOn?: { parameterId: string; values: string[] };
}

export interface TextParameter {
  type: 'text';
  id: string;
  label: string;
  default: string;
  placeholder?: string;
  maxLength?: number;
  /** Show this parameter only when another parameter has specific value(s) */
  dependsOn?: { parameterId: string; values: string[] };
}

export type AlgorithmParameter = NumberParameter | SelectParameter | TextParameter;

/**
 * Algorithm interface - all algorithms must implement this
 * Following Dependency Inversion Principle (DIP)
 */
export interface IAlgorithm<TInput> {
  /** Unique identifier for the algorithm */
  id: string;

  /** Display name (can be localized) */
  name: string;

  /** Category for grouping (e.g., 'sorting', 'graph', 'tree') */
  category: string;

  /** Difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  /** Pseudocode lines for display */
  pseudocodeLines: string[];

  /** Time complexity */
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };

  /** Space complexity */
  spaceComplexity: string;

  /** Optional configurable parameters */
  parameters?: AlgorithmParameter[];

  /** Validate input before running */
  validate(input: TInput): ValidationResult;

  /**
   * Run the algorithm and yield events
   * Uses generator for memory efficiency with large inputs
   * @param input - The input data
   * @param params - Optional algorithm parameters (key-value pairs)
   */
  run(input: TInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown>;
}

/**
 * Algorithm metadata for catalog/search
 */
export interface AlgorithmMeta {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  description: string;
}
