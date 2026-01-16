import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * House Robber
 * 
 * Maximum sum without selecting adjacent elements
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const houseRobber: IAlgorithm<ArrayInput> = {
  id: 'house-robber',
  name: 'House Robber',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function rob(houses):',
    '  n = length(houses)',
    '  if n == 0: return 0',
    '  if n == 1: return houses[0]',
    '',
    '  dp[0] = houses[0]',
    '  dp[1] = max(houses[0], houses[1])',
    '',
    '  for i = 2 to n-1:',
    '    // Include current OR exclude current',
    '    dp[i] = max(dp[i-1], dp[i-2] + houses[i])',
    '',
    '  return dp[n-1]',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
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
    if (!input.values.every((v) => typeof v === 'number' && v >= 0)) {
      return { ok: false, error: 'All values must be non-negative numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const houses = [...input.values];
    const n = houses.length;

    yield createEvent.message(`Finding maximum loot from ${n} houses without robbing adjacent ones`, 'info');
    yield createEvent.highlight([0, 1]);

    // Show houses array
    for (let i = 0; i < n; i++) {
      yield createEvent.mark([i], 'current');
    }

    if (n === 0) {
      yield createEvent.message('No houses to rob!', 'step');
      yield createEvent.result('string', '0', 'Maximum loot: $0');
      return;
    }

    if (n === 1) {
      yield createEvent.message(`Only one house: rob it for $${houses[0]}`, 'step');
      yield createEvent.highlight([3]);
      yield createEvent.result('string', `${houses[0]}`, `Maximum loot: $${houses[0]}`);
      return;
    }

    const dp: number[] = new Array(n).fill(0);
    const decisions: ('include' | 'exclude')[] = new Array(n).fill('exclude');

    // Base cases
    dp[0] = houses[0];
    decisions[0] = 'include';

    yield createEvent.message(`Base case: dp[0] = houses[0] = $${houses[0]}`, 'step');
    yield createEvent.highlight([5]);
    yield createEvent.mark([0], 'selected');

    dp[1] = Math.max(houses[0], houses[1]);
    decisions[1] = houses[1] > houses[0] ? 'include' : 'exclude';

    yield createEvent.message(`Base case: dp[1] = max($${houses[0]}, $${houses[1]}) = $${dp[1]}`, 'step');
    yield createEvent.highlight([6]);

    const cols = ['House', ...Array.from({ length: n }, (_, i) => i.toString())];

    // Build visualization with houses and DP values
    const buildCells = (upTo: number, currentIdx?: number): DPCell[] => {
      const cells: DPCell[] = [];

      // Values row (row 0)
      for (let j = 0; j <= upTo; j++) {
        cells.push({
          row: 0,
          col: j,
          value: houses[j],
          highlight: j === currentIdx ? 'current' : undefined,
        });
      }

      // DP row (row 1)
      for (let j = 0; j <= upTo; j++) {
        cells.push({
          row: 1,
          col: j,
          value: dp[j],
          highlight: j === currentIdx ? 'current' : j === currentIdx! - 2 ? 'path' : undefined,
        });
      }

      return cells;
    };

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['$', 'Max', 'dp'],
        cols: cols,
        cells: buildCells(1),
      },
    });

    yield createEvent.pointer(
      [],
      [
        { name: 'dp[0]', value: dp[0] },
        { name: 'dp[1]', value: dp[1] },
      ]
    );

    // Fill DP table
    for (let i = 2; i < n; i++) {
      const includeValue = dp[i - 2] + houses[i];
      const excludeValue = dp[i - 1];

      yield createEvent.message(
        `House ${i}: Include ($${dp[i - 2]} + $${houses[i]} = $${includeValue}) vs Exclude ($${excludeValue})`,
        'step'
      );
      yield createEvent.highlight([8, 9, 10]);

      yield createEvent.mark([i], 'current');

      if (includeValue > excludeValue) {
        dp[i] = includeValue;
        decisions[i] = 'include';
        yield createEvent.message(`Include house ${i}: $${includeValue} > $${excludeValue}`, 'explanation');
      } else {
        dp[i] = excludeValue;
        decisions[i] = 'exclude';
        yield createEvent.message(`Exclude house ${i}: $${excludeValue} >= $${includeValue}`, 'explanation');
      }

      yield createEvent.auxiliary({
        type: 'dp-table',
        dpTableState: {
          rows: ['$', 'Max', 'dp'],
          cols: cols,
          cells: buildCells(i, i),
        },
      });

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-accent-current)' }],
        [
          { name: 'i', value: i },
          { name: `houses[${i}]`, value: houses[i] },
          { name: `dp[${i - 2}] + houses[${i}]`, value: includeValue },
          { name: `dp[${i - 1}]`, value: excludeValue },
          { name: `dp[${i}]`, value: dp[i], highlight: true },
        ],
        `max(${excludeValue}, ${includeValue}) = ${dp[i]}`
      );
    }

    // Final result with backtracking to show selected houses
    const selected: number[] = [];
    let i = n - 1;
    while (i >= 0) {
      if (i === 0 || dp[i] !== dp[i - 1]) {
        selected.push(i);
        i -= 2;
      } else {
        i -= 1;
      }
    }
    selected.reverse();

    yield createEvent.message(`Optimal selection: Houses [${selected.join(', ')}]`, 'step');

    for (const idx of selected) {
      yield createEvent.mark([idx], 'selected');
    }

    const finalCells = buildCells(n - 1);
    // Highlight max
    const maxCellIdx = finalCells.findIndex(c => c.row === 1 && c.col === n - 1);
    if (maxCellIdx >= 0) {
      finalCells[maxCellIdx].highlight = 'max';
    }

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['$', 'Max', 'dp'],
        cols: cols,
        cells: finalCells,
        maxValue: dp[n - 1],
        maxCell: { row: 1, col: n - 1 },
      },
    });

    yield createEvent.highlight([12]);
    yield createEvent.message(`Maximum loot: $${dp[n - 1]}`, 'info');
    yield createEvent.result('string', `$${dp[n - 1]}`, `Maximum loot from houses: $${dp[n - 1]}`);
  },
};
