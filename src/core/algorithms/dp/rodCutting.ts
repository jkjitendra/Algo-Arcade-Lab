import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Rod Cutting Problem
 * 
 * Maximize profit from cutting rod into pieces
 * Time Complexity: O(n²)
 * Space Complexity: O(n)
 */
export const rodCutting: IAlgorithm<ArrayInput> = {
  id: 'rod-cutting',
  name: 'Rod Cutting',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function rodCutting(prices, n):',
    '  // prices[i] = price for rod of length i+1',
    '  dp[0] = 0',
    '',
    '  for len = 1 to n:',
    '    dp[len] = -infinity',
    '    for cut = 1 to len:',
    '      // Try cutting piece of length "cut"',
    '      dp[len] = max(dp[len], prices[cut-1] + dp[len-cut])',
    '',
    '  return dp[n]',
  ],

  timeComplexity: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    { id: 'rodLength', label: 'Rod Length', type: 'number', min: 1, max: 10, default: 5 },
  ],

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Prices array cannot be empty' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'Maximum 10 price entries for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && v >= 0)) {
      return { ok: false, error: 'All prices must be non-negative numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const prices = [...input.values];
    const rodLength = Number(params?.['rodLength'] ?? Math.min(prices.length, 5));

    const priceStr = prices.slice(0, rodLength).map((p, i) => `len${i + 1}=$${p}`).join(', ');
    yield createEvent.message(`Rod Cutting: Rod length ${rodLength}, Prices: ${priceStr}`, 'info');
    yield createEvent.highlight([0, 1, 2]);

    // DP array
    const dp: number[] = new Array(rodLength + 1).fill(0);
    const cuts: number[][] = Array.from({ length: rodLength + 1 }, () => []);

    yield createEvent.message('Initialize: dp[0] = 0 (no rod, no profit)', 'step');

    const colLabels = ['Length', ...Array.from({ length: rodLength + 1 }, (_, i) => i.toString())];

    const buildCells = (highlightLen?: number): DPCell[] => {
      const cells: DPCell[] = [];
      for (let j = 0; j <= rodLength; j++) {
        cells.push({
          row: 0,
          col: j,
          value: dp[j],
          highlight: j === highlightLen ? 'current' : undefined,
        });
      }
      return cells;
    };

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['Max Profit'],
        cols: colLabels,
        cells: buildCells(),
      },
    });

    // Fill DP table
    for (let len = 1; len <= rodLength; len++) {
      yield createEvent.message(`Computing max profit for rod of length ${len}`, 'step');
      yield createEvent.highlight([4, 5]);

      let maxProfit = 0;
      let bestCut = 0;

      for (let cut = 1; cut <= len && cut <= prices.length; cut++) {
        const profit = prices[cut - 1] + dp[len - cut];

        yield createEvent.highlight([6, 7, 8]);
        yield createEvent.pointer(
          [],
          [
            { name: 'length', value: len },
            { name: 'cut', value: cut },
            { name: `prices[${cut - 1}]`, value: prices[cut - 1] },
            { name: `dp[${len - cut}]`, value: dp[len - cut] },
            { name: 'profit', value: profit },
          ],
          `Cut ${cut}: $${prices[cut - 1]} + dp[${len - cut}] = $${profit}`
        );

        if (profit > maxProfit) {
          maxProfit = profit;
          bestCut = cut;
          yield createEvent.message(`New best: cut=${cut}, profit=$${profit}`, 'explanation');
        }
      }

      dp[len] = maxProfit;
      cuts[len] = bestCut > 0 ? [bestCut, ...cuts[len - bestCut]] : [];

      yield createEvent.auxiliary({
        type: 'dp-table',
        dpTableState: {
          rows: ['Max Profit'],
          cols: colLabels,
          cells: buildCells(len),
        },
      });
    }

    // Reconstruct optimal cuts
    const optimalCuts = cuts[rodLength];
    yield createEvent.message(`Optimal cuts: [${optimalCuts.join(', ')}]`, 'step');

    // Final visualization
    const finalCells = buildCells();
    finalCells[rodLength].highlight = 'max';

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['Max Profit'],
        cols: colLabels,
        cells: finalCells,
        maxValue: dp[rodLength],
        maxCell: { row: 0, col: rodLength },
      },
    });

    yield createEvent.highlight([10]);
    yield createEvent.message(`Maximum profit: $${dp[rodLength]} with cuts [${optimalCuts.join(', ')}]`, 'info');
    yield createEvent.result(
      'string',
      `Max profit: $${dp[rodLength]}, Cuts: [${optimalCuts.join(', ')}]`,
      `Maximum profit $${dp[rodLength]}`
    );
  },
};
