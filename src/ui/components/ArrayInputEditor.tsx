"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Shuffle, Check, AlertCircle, Play } from "lucide-react";

interface ArrayInputEditorProps {
  value: number[];
  onChange: (values: number[]) => void;
  onApply?: () => void;
  maxSize?: number;
  algorithmParams?: ReactNode;
  algorithmId?: string;
  onParamsChange?: (params: Record<string, string>) => void;
}

// Pre-defined rotated sorted arrays for better visualization
const rotatedArraySamples = [
  [4, 5, 6, 7, 0, 1, 2, 3],
  [6, 7, 8, 9, 10, 1, 2, 3, 4, 5],
  [15, 18, 22, 25, 3, 5, 8, 10, 12],
  [50, 60, 70, 80, 10, 20, 30, 40],
  [7, 9, 11, 13, 15, 1, 3, 5],
  [23, 34, 45, 56, 67, 12, 14, 17, 19],
  [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7],
  [40, 50, 60, 5, 10, 15, 20, 25, 30],
  [11, 13, 15, 17, 19, 2, 4, 6, 8, 10],
  [70, 80, 90, 100, 20, 30, 40, 50, 60],
  [5, 6, 7, 8, 9, 10, 1, 2, 3, 4],
  [25, 30, 35, 40, 5, 10, 15, 20],
  [9, 12, 15, 18, 21, 3, 6],
  [33, 44, 55, 66, 11, 22],
  [16, 18, 20, 22, 24, 2, 4, 6, 8, 10, 12, 14],
];

// Stack and Queue algorithms that allow empty arrays
const emptyArrayAllowedAlgorithms = [
  // Stack algorithms
  'stack-operations',
  'balanced-parentheses',
  'infix-to-postfix',
  'infix-to-prefix',
  'postfix-evaluation',
  'prefix-evaluation',
  'next-greater-element',
  'next-smaller-element',
  'stock-span',
  'largest-rectangle-histogram',
  'valid-stack-sequences',
  // Queue algorithms
  'queue-operations',
  'circular-queue',
  'deque',
  'priority-queue',
  'queue-using-two-stacks',
  'stack-using-two-queues',
  'lru-cache',
  'sliding-window-maximum',
  'first-non-repeating-character',
  'generate-binary-numbers',
  'circular-tour',
];

export function ArrayInputEditor({
  value,
  onChange,
  onApply,
  maxSize = 20,
  algorithmParams,
  algorithmId,
  onParamsChange,
}: ArrayInputEditorProps) {
  const [inputText, setInputText] = useState(value.join(", "));
  const [error, setError] = useState<string | null>(null);
  const lastExternalValue = useRef<string>(value.join(", "));

  // Check if this is a stack/queue algorithm (allows empty arrays)
  const isStackOrQueueAlgorithm = algorithmId && emptyArrayAllowedAlgorithms.includes(algorithmId);

  // Get minimum required elements based on algorithm
  const getMinElements = () => {
    if (isStackOrQueueAlgorithm) {
      // All queue algorithms can have empty arrays (for isEmpty, dequeue from empty, etc.)
      // Queue algorithms are identified by their category in emptyArrayAllowedAlgorithms
      const queueAlgorithms = [
        'queue-operations', 'circular-queue', 'deque', 'priority-queue',
        'queue-using-two-stacks', 'stack-using-two-queues', 'lru-cache',
        'sliding-window-maximum', 'first-non-repeating-character',
        'generate-binary-numbers', 'circular-tour'
      ];

      // All queue algorithms allow empty arrays
      if (algorithmId && queueAlgorithms.includes(algorithmId)) return 0;

      // Stack operations (isEmpty check) also need 0
      if (algorithmId === 'stack-operations') return 0;

      // Other stack algorithms need at least 1 element
      return 1;
    }
    // Sorting and other algorithms need at least 2
    return 2;
  };

  // Sync internal state ONLY when value prop changes from external source
  useEffect(() => {
    const newValueStr = value.join(", ");
    // Only sync if this is a different value than what we last saw AND 
    // different from current parsed input (external change, not user typing)
    if (newValueStr !== lastExternalValue.current) {
      lastExternalValue.current = newValueStr;
      setInputText(newValueStr);
      setError(null);
    }
  }, [value]);

  const parseInput = (text: string): { values: number[]; error: string | null } => {
    const minElements = getMinElements();

    // Allow empty for stack operations isEmpty check
    if (!text.trim()) {
      if (minElements === 0) {
        return { values: [], error: null };
      }
      return { values: [], error: "Please enter some values" };
    }

    const parts = text.split(/[,\s]+/).filter((p) => p.trim());
    const values: number[] = [];

    for (const part of parts) {
      const num = parseInt(part, 10);
      if (isNaN(num)) {
        return { values: [], error: `Invalid number: "${part}"` };
      }
      if (num < -100 || num > 100) {
        return { values: [], error: `Values must be between -100 and 100` };
      }
      values.push(num);
    }

    if (values.length > maxSize) {
      return { values: [], error: `Maximum ${maxSize} values allowed` };
    }

    if (values.length < minElements) {
      if (minElements === 1) {
        return { values: [], error: "Need at least 1 value" };
      }
      return { values: [], error: "Need at least 2 values to sort" };
    }

    return { values, error: null };
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    const { values, error } = parseInput(text);
    setError(error);
    if (!error) {
      lastExternalValue.current = values.join(", "); // Track what we're sending up
      onChange(values);
    }
  };

  const handleApply = () => {
    const { values, error } = parseInput(inputText);
    if (!error) {
      onChange(values);
    }
  };

  const generateRandom = () => {
    let values: number[];

    // For rotated array algorithms, use pre-defined valid rotated arrays
    if (algorithmId === 'rotated-array-search' || algorithmId === 'rotated-array-min') {
      values = rotatedArraySamples[Math.floor(Math.random() * rotatedArraySamples.length)];
    } else if (algorithmId === 'balanced-parentheses') {
      // Generate random parentheses expressions (using ASCII codes)
      const parenthesesSamples = [
        [40, 41],  // ()
        [40, 40, 41, 41],  // (())
        [40, 91, 93, 41],  // ([])
        [123, 40, 91, 93, 41, 125],  // {([])
        [40, 123, 91, 93, 125, 41],  // ({[]})
        [40, 41, 91, 93, 123, 125],  // ()[]{}
        [91, 40, 123, 125, 41, 93],  // [({})
        [40, 91, 123, 125, 93, 41],  // ([{}])
        [123, 123, 91, 91, 40, 40, 41, 41, 93, 93, 125, 125],  // {{[[()]]}}
        [40, 91, 41, 93],  // ([)] - unbalanced for variety
        [40, 40, 40, 41, 41],  // ((() - unbalanced
        [91, 93, 40, 41, 123, 91, 93, 125],  // [](]{[]}
        [40, 123, 40, 41, 125, 41],  // ({()})
      ];
      values = parenthesesSamples[Math.floor(Math.random() * parenthesesSamples.length)];
    } else if (algorithmId === 'valid-stack-sequences') {
      // Generate push sequence (1 to n)
      const size = Math.floor(Math.random() * 5) + 3; // 3-7 elements
      values = Array.from({ length: size }, (_, i) => i + 1);

      // Generate a valid or invalid pop sequence
      const isValid = Math.random() > 0.3; // 70% chance of valid sequence
      let popSequence: number[];

      if (isValid) {
        // Generate valid pop sequence using simulation
        popSequence = generateValidPopSequence(values);
      } else {
        // Generate random (likely invalid) pop sequence
        popSequence = [...values].sort(() => Math.random() - 0.5);
      }

      // Update the pop sequence parameter
      if (onParamsChange) {
        onParamsChange({ popSequence: popSequence.join(',') });
      }
    } else if (isStackOrQueueAlgorithm) {
      // Stack/Queue algorithms - generate smaller random array
      const size = Math.floor(Math.random() * 6) + 3; // 3-8 elements
      values = Array.from({ length: size }, () =>
        Math.floor(Math.random() * 50) + 1
      );
    } else {
      // Default random generation for other algorithms
      const size = Math.floor(Math.random() * 10) + 5; // 5-14 elements
      values = Array.from({ length: size }, () =>
        Math.floor(Math.random() * 100) + 1
      );
    }

    setInputText(values.join(", "));
    setError(null);
    onChange(values);
    // Auto-apply when generating random
    setTimeout(() => onApply?.(), 0);
  };

  // Helper function to generate a valid pop sequence
  const generateValidPopSequence = (pushed: number[]): number[] => {
    const stack: number[] = [];
    const popped: number[] = [];
    const remaining = [...pushed];

    while (remaining.length > 0 || stack.length > 0) {
      // Randomly decide to push or pop
      if (stack.length === 0 || (remaining.length > 0 && Math.random() > 0.5)) {
        // Push next element
        if (remaining.length > 0) {
          stack.push(remaining.shift()!);
        }
      } else {
        // Pop from stack
        popped.push(stack.pop()!);
      }
    }

    return popped;
  };

  const minElements = getMinElements();
  const isValid = !error && value.length >= minElements;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          Input Array
        </label>
        <Button
          variant="outline"
          size="sm"
          onClick={generateRandom}
          className="gap-1.5"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Random
        </Button>
      </div>

      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={isStackOrQueueAlgorithm ? "Enter numbers (can be empty for isEmpty check)" : "Enter numbers separated by commas (e.g., 64, 34, 25, 12, 22)"}
          className={`w-full px-3 py-2 rounded-lg border text-sm font-mono resize-none bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 transition-all ${error
            ? "border-red-500 focus:ring-red-500/20"
            : isValid
              ? "border-green-500 focus:ring-green-500/20"
              : "border-[var(--border-primary)] focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)]"
            }`}
          rows={2}
        />

        {/* Status icon */}
        <div className="absolute right-3 top-2">
          {error && <AlertCircle className="h-4 w-4 text-red-500" />}
          {isValid && <Check className="h-4 w-4 text-green-500" />}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}

      {/* Algorithm Parameters (inline) */}
      {algorithmParams}

      {/* Apply button */}
      <Button
        onClick={() => {
          handleApply();
          onApply?.();
        }}
        disabled={!!error}
        className="w-full gap-2 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-secondary-600)] disabled:opacity-50"
      >
        <Play className="h-4 w-4" />
        Apply & Run
      </Button>

      {/* Preview */}
      {isValid && (
        <div className="text-xs text-[var(--text-secondary)]">
          <span className="font-medium">{value.length} elements: </span>
          <span className="font-mono break-all">
            [{value.length > 0 ? value.join(", ") : "empty"}]
          </span>
        </div>
      )}
    </div>
  );
}
