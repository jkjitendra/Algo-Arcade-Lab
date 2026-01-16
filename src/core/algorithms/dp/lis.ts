import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Longest Increasing Subsequence (LIS)
 * 
 * Find length of longest increasing subsequence
 * Time Complexity: O(n²) for DP, O(n log n) with binary search
 * Space Complexity: O(n)
 */
export const lis: IAlgorithm<ArrayInput> = {
  id: 'lis',
  name: 'Longest Increasing Subsequence',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function LIS(arr):',
    '  n = length(arr)',
    '  dp[i] = 1 for all i  // Base: each element is LIS of 1',
    '',
    '  for i = 1 to n-1:',
    '    for j = 0 to i-1:',
    '      if arr[j] < arr[i]:',
    '        dp[i] = max(dp[i], dp[j] + 1)',
    '',
    '  return max(dp)',
  ],

  timeComplexity: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },

  spaceComplexity: 'O(n)',

  parameters: [],

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(`Finding Longest Increasing Subsequence in array of ${n} elements`, 'info');
    yield createEvent.highlight([0, 1]);

    // Initialize DP array - each element is LIS of length 1
    const dp: number[] = new Array(n).fill(1);
    const predecessor: number[] = new Array(n).fill(-1);

    yield createEvent.message('Initialize: Each element forms LIS of length 1', 'step');
    yield createEvent.highlight([2]);

    const cols = ['i', ...Array.from({ length: n }, (_, i) => i.toString())];

    const buildCells = (highlightI?: number, highlightJ?: number): DPCell[] => {
      const cells: DPCell[] = [];
      // Array values row
      for (let k = 0; k < n; k++) {
        cells.push({
          row: 0,
          col: k,
          value: arr[k],
          highlight: k === highlightI ? 'current' : k === highlightJ ? 'path' : undefined,
        });
      }
      // DP row
      for (let k = 0; k < n; k++) {
        cells.push({
          row: 1,
          col: k,
          value: dp[k],
          highlight: k === highlightI ? 'current' : k === highlightJ ? 'path' : undefined,
        });
      }
      return cells;
    };

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['arr', 'dp'],
        cols: cols,
        cells: buildCells(),
      },
    });

    // O(n²) DP approach
    for (let i = 1; i < n; i++) {
      yield createEvent.message(`Processing element arr[${i}] = ${arr[i]}`, 'step');
      yield createEvent.highlight([4]);
      yield createEvent.mark([i], 'current');

      for (let j = 0; j < i; j++) {
        yield createEvent.highlight([5, 6]);
        yield createEvent.mark([j], 'pivot');

        yield createEvent.auxiliary({
          type: 'dp-table',
          dpTableState: {
            rows: ['arr', 'dp'],
            cols: cols,
            cells: buildCells(i, j),
          },
        });

        yield createEvent.pointer(
          [
            { index: j, label: 'j', color: 'var(--color-accent-compare)' },
            { index: i, label: 'i', color: 'var(--color-accent-current)' },
          ],
          [
            { name: `arr[${j}]`, value: arr[j] },
            { name: `arr[${i}]`, value: arr[i] },
            { name: `dp[${j}]`, value: dp[j] },
            { name: `dp[${i}]`, value: dp[i] },
          ],
          `arr[${j}] < arr[${i}] ? ${arr[j]} < ${arr[i]}`
        );

        if (arr[j] < arr[i]) {
          if (dp[j] + 1 > dp[i]) {
            yield createEvent.message(
              `arr[${j}]=${arr[j]} < arr[${i}]=${arr[i]}: Update dp[${i}] = dp[${j}]+1 = ${dp[j] + 1}`,
              'explanation'
            );
            yield createEvent.highlight([7]);
            dp[i] = dp[j] + 1;
            predecessor[i] = j;
          }
        }

        yield createEvent.unmark([j]);
      }

      yield createEvent.unmark([i]);
    }

    // Find maximum LIS length and backtrack
    let maxLen = 0;
    let maxIdx = 0;
    for (let i = 0; i < n; i++) {
      if (dp[i] > maxLen) {
        maxLen = dp[i];
        maxIdx = i;
      }
    }

    // Backtrack to find actual LIS
    const lisSequence: number[] = [];
    let idx = maxIdx;
    while (idx !== -1) {
      lisSequence.push(arr[idx]);
      idx = predecessor[idx];
    }
    lisSequence.reverse();

    yield createEvent.message(`LIS found: [${lisSequence.join(', ')}] with length ${maxLen}`, 'step');

    // Mark LIS elements in array
    idx = maxIdx;
    while (idx !== -1) {
      yield createEvent.mark([idx], 'selected');
      idx = predecessor[idx];
    }

    // Final visualization
    const finalCells: DPCell[] = [];
    for (let k = 0; k < n; k++) {
      finalCells.push({ row: 0, col: k, value: arr[k] });
      finalCells.push({
        row: 1,
        col: k,
        value: dp[k],
        highlight: dp[k] === maxLen ? 'max' : undefined,
      });
    }

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['arr', 'dp'],
        cols: cols,
        cells: finalCells,
        maxValue: maxLen,
        maxCell: { row: 1, col: maxIdx },
      },
    });

    yield createEvent.highlight([9]);
    yield createEvent.message(`Longest Increasing Subsequence has length ${maxLen}`, 'info');
    yield createEvent.result('string', `Length: ${maxLen}, LIS: [${lisSequence.join(', ')}]`, `LIS of length ${maxLen}`);
  },
};
