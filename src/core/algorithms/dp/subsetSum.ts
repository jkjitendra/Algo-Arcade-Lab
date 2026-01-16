import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Subset Sum Problem
 * 
 * Check if subset with target sum exists
 * Time Complexity: O(n × sum)
 * Space Complexity: O(n × sum)
 */
export const subsetSum: IAlgorithm<ArrayInput> = {
  id: 'subset-sum',
  name: 'Subset Sum',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function subsetSum(arr, target):',
    '  n = length(arr)',
    '  // dp[i][j] = true if sum j possible using first i elements',
    '',
    '  dp[i][0] = true for all i  // Empty subset has sum 0',
    '  dp[0][j] = false for j > 0  // No elements, cant make positive sum',
    '',
    '  for i = 1 to n:',
    '    for j = 1 to target:',
    '      if arr[i-1] <= j:',
    '        dp[i][j] = dp[i-1][j] OR dp[i-1][j-arr[i-1]]',
    '      else:',
    '        dp[i][j] = dp[i-1][j]',
    '',
    '  return dp[n][target]',
  ],

  timeComplexity: {
    best: 'O(n × sum)',
    average: 'O(n × sum)',
    worst: 'O(n × sum)',
  },

  spaceComplexity: 'O(n × sum)',

  parameters: [
    { id: 'target', label: 'Target Sum', type: 'number', min: 1, max: 30, default: 9 },
  ],

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'Maximum 10 elements for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && v > 0 && Number.isInteger(v))) {
      return { ok: false, error: 'All values must be positive integers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const target = Number(params?.['target'] ?? 9);

    yield createEvent.message(`Checking if subset with sum ${target} exists in [${arr.join(', ')}]`, 'info');
    yield createEvent.highlight([0, 1, 2]);

    // Create boolean DP table
    const dp: boolean[][] = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(false));

    // Base cases
    for (let i = 0; i <= n; i++) dp[i][0] = true;

    yield createEvent.message('Base case: dp[i][0] = true (empty subset has sum 0)', 'step');
    yield createEvent.highlight([4]);

    const rowLabels = ['∅', ...arr.map((v, i) => `+${v}`)];
    const colLabels = ['Sum', ...Array.from({ length: Math.min(target + 1, 12) }, (_, j) => j.toString())];

    const buildCells = (highlightI?: number, highlightJ?: number): DPCell[] => {
      const cells: DPCell[] = [];
      const maxCol = Math.min(target + 1, 11);
      for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= maxCol; j++) {
          let highlight: 'current' | 'path' | undefined;
          if (i === highlightI && j === highlightJ) highlight = 'current';
          else if (highlightI !== undefined && highlightJ !== undefined && i === highlightI - 1) {
            if (j === highlightJ || (j === highlightJ - arr[highlightI - 1])) highlight = 'path';
          }
          cells.push({ row: i, col: j, value: dp[i][j] ? 1 : 0, highlight });
        }
      }
      return cells;
    };

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: rowLabels,
        cols: colLabels,
        cells: buildCells(),
      },
    });

    // Fill DP table
    for (let i = 1; i <= n; i++) {
      yield createEvent.message(`Considering element arr[${i - 1}] = ${arr[i - 1]}`, 'step');
      yield createEvent.highlight([7]);
      yield createEvent.mark([i - 1], 'current');

      for (let j = 1; j <= target; j++) {
        yield createEvent.highlight([8, 9]);

        if (arr[i - 1] <= j) {
          dp[i][j] = dp[i - 1][j] || dp[i - 1][j - arr[i - 1]];
          const exclude = dp[i - 1][j];
          const include = dp[i - 1][j - arr[i - 1]];
          yield createEvent.message(
            `Sum ${j}: Exclude (${exclude}) OR Include (${include}) = ${dp[i][j]}`,
            'explanation'
          );
          yield createEvent.highlight([10]);
        } else {
          dp[i][j] = dp[i - 1][j];
          yield createEvent.highlight([11, 12]);
        }

        if (j <= 11) {
          yield createEvent.pointer(
            [],
            [
              { name: 'element', value: arr[i - 1] },
              { name: 'sum', value: j },
              { name: `dp[${i}][${j}]`, value: dp[i][j] ? 'T' : 'F', highlight: true },
            ]
          );
        }
      }

      yield createEvent.auxiliary({
        type: 'dp-table',
        dpTableState: {
          rows: rowLabels,
          cols: colLabels,
          cells: buildCells(i, Math.min(target, 11)),
        },
      });

      yield createEvent.unmark([i - 1]);
    }

    // Find subset if exists
    let subset: number[] = [];
    if (dp[n][target]) {
      let i = n, j = target;
      while (i > 0 && j > 0) {
        if (dp[i][j] !== dp[i - 1][j]) {
          subset.push(arr[i - 1]);
          j -= arr[i - 1];
        }
        i--;
      }
      subset.reverse();
      yield createEvent.message(`Subset found: [${subset.join(', ')}] = ${target}`, 'step');
    }

    // Final visualization
    const finalCells = buildCells();
    const targetColIdx = Math.min(target, 11);
    const targetCellIdx = finalCells.findIndex(c => c.row === n && c.col === targetColIdx);
    if (targetCellIdx >= 0) finalCells[targetCellIdx].highlight = 'max';

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: rowLabels,
        cols: colLabels,
        cells: finalCells,
      },
    });

    yield createEvent.highlight([14]);
    if (dp[n][target]) {
      yield createEvent.message(`Subset with sum ${target} EXISTS: [${subset.join(', ')}]`, 'info');
      yield createEvent.result('boolean', true, `Subset [${subset.join(', ')}] = ${target}`);
    } else {
      yield createEvent.message(`No subset with sum ${target} exists`, 'info');
      yield createEvent.result('boolean', false, `No subset sums to ${target}`);
    }
  },
};
