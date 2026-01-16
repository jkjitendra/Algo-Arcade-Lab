import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * 0/1 Knapsack Problem
 * 
 * Maximize value within weight capacity
 * Time Complexity: O(n * W)
 * Space Complexity: O(n * W)
 */
export const knapsack: IAlgorithm<ArrayInput> = {
  id: 'knapsack-01',
  name: '0/1 Knapsack',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function knapsack(weights, values, capacity):',
    '  n = length(weights)',
    '  dp[i][w] = max value using first i items with capacity w',
    '',
    '  for i = 1 to n:',
    '    for w = 0 to capacity:',
    '      if weights[i-1] <= w:',
    '        // Include or exclude item i',
    '        dp[i][w] = max(dp[i-1][w], dp[i-1][w-weights[i-1]] + values[i-1])',
    '      else:',
    '        dp[i][w] = dp[i-1][w]',
    '',
    '  return dp[n][capacity]',
  ],

  timeComplexity: {
    best: 'O(n × W)',
    average: 'O(n × W)',
    worst: 'O(n × W)',
  },

  spaceComplexity: 'O(n × W)',

  parameters: [
    { id: 'capacity', label: 'Knapsack Capacity', type: 'number', min: 5, max: 20, default: 10 },
  ],

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Items array cannot be empty' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'Maximum 10 items for visualization' };
    }
    if (input.values.length % 2 !== 0) {
      return { ok: false, error: 'Input must have pairs of (weight, value). Provide even count of numbers.' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    // Parse input as pairs of (weight, value)
    const rawValues = input.values;
    const n = rawValues.length / 2;
    const weights: number[] = [];
    const values: number[] = [];
    for (let i = 0; i < n; i++) {
      weights.push(rawValues[i * 2]);
      values.push(rawValues[i * 2 + 1]);
    }

    const capacity = Number(params?.['capacity'] ?? 10);

    yield createEvent.message(`0/1 Knapsack: ${n} items, capacity ${capacity}`, 'info');
    yield createEvent.message(`Items: ${weights.map((w, i) => `(w=${w}, v=${values[i]})`).join(', ')}`, 'step');
    yield createEvent.highlight([0, 1, 2]);

    // Create DP table
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

    const rowLabels = ['Item 0', ...weights.map((w, i) => `Item ${i + 1} (w=${w})`).slice(0, n)];
    const colLabels = ['Cap', ...Array.from({ length: capacity + 1 }, (_, i) => i.toString())];

    const buildCells = (upToRow: number, upToCol: number, highlightRow?: number, highlightCol?: number): DPCell[] => {
      const cells: DPCell[] = [];
      for (let i = 0; i <= upToRow; i++) {
        for (let w = 0; w <= Math.min(upToCol, capacity); w++) {
          let highlight: 'current' | 'path' | undefined;
          if (i === highlightRow && w === highlightCol) highlight = 'current';
          else if (highlightRow !== undefined && highlightCol !== undefined) {
            if ((i === highlightRow - 1 && w === highlightCol) ||
              (i === highlightRow - 1 && w === highlightCol - weights[highlightRow - 1])) {
              highlight = 'path';
            }
          }
          cells.push({ row: i, col: w, value: dp[i][w], highlight });
        }
      }
      return cells;
    };

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: rowLabels.slice(0, 2),
        cols: colLabels.slice(0, Math.min(capacity + 2, 12)),
        cells: buildCells(0, Math.min(capacity, 10)),
      },
    });

    // Fill DP table
    for (let i = 1; i <= n; i++) {
      yield createEvent.message(`Processing item ${i}: weight=${weights[i - 1]}, value=${values[i - 1]}`, 'step');
      yield createEvent.highlight([4]);

      for (let w = 0; w <= capacity; w++) {
        yield createEvent.highlight([5, 6]);

        if (weights[i - 1] <= w) {
          const include = dp[i - 1][w - weights[i - 1]] + values[i - 1];
          const exclude = dp[i - 1][w];
          dp[i][w] = Math.max(include, exclude);

          if (dp[i][w] === include && include > exclude) {
            yield createEvent.message(
              `Cap ${w}: Include item (${exclude} vs ${include}) → ${dp[i][w]}`,
              'explanation'
            );
            yield createEvent.highlight([7, 8]);
          } else {
            yield createEvent.message(
              `Cap ${w}: Exclude item (${exclude} vs ${include}) → ${dp[i][w]}`,
              'explanation'
            );
          }
        } else {
          dp[i][w] = dp[i - 1][w];
          yield createEvent.highlight([9, 10]);
        }

        yield createEvent.pointer(
          [],
          [
            { name: 'item', value: i },
            { name: 'capacity', value: w },
            { name: `dp[${i}][${w}]`, value: dp[i][w], highlight: true },
          ]
        );
      }

      // Update visualization every row
      yield createEvent.auxiliary({
        type: 'dp-table',
        dpTableState: {
          rows: rowLabels.slice(0, i + 2),
          cols: colLabels.slice(0, Math.min(capacity + 2, 12)),
          cells: buildCells(i, Math.min(capacity, 10), i, i === n ? capacity : undefined),
        },
      });
    }

    // Backtrack to find selected items
    const selected: number[] = [];
    let w = capacity;
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected.push(i);
        w -= weights[i - 1];
      }
    }
    selected.reverse();

    yield createEvent.message(`Selected items: [${selected.join(', ')}]`, 'step');

    // Final visualization
    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: rowLabels.slice(0, n + 1),
        cols: colLabels.slice(0, Math.min(capacity + 2, 12)),
        cells: buildCells(n, Math.min(capacity, 10)),
        maxValue: dp[n][capacity],
        maxCell: { row: n, col: Math.min(capacity, 10) },
      },
    });

    yield createEvent.highlight([12]);
    yield createEvent.message(`Maximum value: ${dp[n][capacity]}`, 'info');
    yield createEvent.result(
      'string',
      `Max value: ${dp[n][capacity]}, Items: [${selected.join(', ')}]`,
      `Maximum value achievable: ${dp[n][capacity]}`
    );
  },
};
