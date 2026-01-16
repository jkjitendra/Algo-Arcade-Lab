import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Coin Change - Minimum Coins
 * 
 * Find minimum number of coins to make target amount
 * Time Complexity: O(amount * n) where n is number of coin types
 * Space Complexity: O(amount)
 */
export const coinChange: IAlgorithm<ArrayInput> = {
  id: 'coin-change',
  name: 'Coin Change (Min Coins)',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function coinChange(coins, amount):',
    '  dp[0] = 0  // 0 coins for amount 0',
    '  dp[1..amount] = infinity',
    '',
    '  for i = 1 to amount:',
    '    for each coin in coins:',
    '      if coin <= i and dp[i-coin] + 1 < dp[i]:',
    '        dp[i] = dp[i-coin] + 1',
    '',
    '  return dp[amount] if dp[amount] != infinity else -1',
  ],

  timeComplexity: {
    best: 'O(amount × n)',
    average: 'O(amount × n)',
    worst: 'O(amount × n)',
  },

  spaceComplexity: 'O(amount)',

  parameters: [
    { id: 'amount', label: 'Target Amount', type: 'number', min: 1, max: 30, default: 11 },
  ],

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Coins array cannot be empty' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'Maximum 10 coin types for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && v > 0 && Number.isInteger(v))) {
      return { ok: false, error: 'All coins must be positive integers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const coins = [...input.values].sort((a, b) => a - b);
    const amount = Number(params?.['amount'] ?? 11);
    const INF = amount + 1;

    yield createEvent.message(`Finding minimum coins to make amount ${amount} using coins [${coins.join(', ')}]`, 'info');
    yield createEvent.highlight([0]);

    // Initialize DP array
    const dp: number[] = new Array(amount + 1).fill(INF);
    const usedCoin: number[] = new Array(amount + 1).fill(-1);
    dp[0] = 0;

    yield createEvent.message('Initialize: dp[0] = 0 (0 coins for amount 0), others = ∞', 'step');
    yield createEvent.highlight([1, 2]);

    const cols = ['Amount', ...Array.from({ length: Math.min(amount + 1, 20) }, (_, i) => i.toString())];

    const buildCells = (upTo: number, highlightIdx?: number, coinUsed?: number): DPCell[] => {
      const cells: DPCell[] = [];
      const displayCount = Math.min(upTo + 1, 20);
      for (let k = 0; k < displayCount; k++) {
        cells.push({
          row: 0,
          col: k,
          value: dp[k] === INF ? -1 : dp[k], // -1 represents infinity
          highlight: k === highlightIdx ? 'current' :
            (coinUsed && k === highlightIdx! - coinUsed) ? 'path' : undefined,
        });
      }
      return cells;
    };

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['Coins'],
        cols: cols,
        cells: buildCells(0),
      },
    });

    // Fill DP table
    for (let i = 1; i <= amount; i++) {
      yield createEvent.message(`Computing minimum coins for amount ${i}`, 'step');
      yield createEvent.highlight([4]);

      for (const coin of coins) {
        yield createEvent.highlight([5, 6]);

        if (coin <= i) {
          yield createEvent.pointer(
            [],
            [
              { name: 'amount', value: i },
              { name: 'coin', value: coin },
              { name: `dp[${i - coin}]`, value: dp[i - coin] === INF ? '∞' : dp[i - coin] },
              { name: `dp[${i}]`, value: dp[i] === INF ? '∞' : dp[i] },
            ],
            `dp[${i - coin}] + 1 < dp[${i}] ?`
          );

          if (dp[i - coin] + 1 < dp[i]) {
            dp[i] = dp[i - coin] + 1;
            usedCoin[i] = coin;
            yield createEvent.message(`Using coin ${coin}: dp[${i}] = dp[${i - coin}] + 1 = ${dp[i]}`, 'explanation');
            yield createEvent.highlight([7]);
          }
        }
      }

      if (i <= 19) { // Only visualize first 20 amounts
        yield createEvent.auxiliary({
          type: 'dp-table',
          dpTableState: {
            rows: ['Coins'],
            cols: cols,
            cells: buildCells(i, i, usedCoin[i]),
          },
        });
      }
    }

    // Backtrack to find coins used
    const coinsUsed: number[] = [];
    let remaining = amount;
    while (remaining > 0 && usedCoin[remaining] !== -1) {
      coinsUsed.push(usedCoin[remaining]);
      remaining -= usedCoin[remaining];
    }

    // Final visualization
    const finalCells = buildCells(Math.min(amount, 19));
    if (amount < 20) {
      const lastCellIdx = finalCells.findIndex(c => c.col === amount);
      if (lastCellIdx >= 0) {
        finalCells[lastCellIdx].highlight = 'max';
      }
    }

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['Coins'],
        cols: cols,
        cells: finalCells,
        maxValue: dp[amount] === INF ? -1 : dp[amount],
        maxCell: { row: 0, col: Math.min(amount, 19) },
      },
    });

    yield createEvent.highlight([9]);

    if (dp[amount] === INF) {
      yield createEvent.message(`Cannot make amount ${amount} with given coins`, 'info');
      yield createEvent.result('string', '-1', `Impossible to make ${amount}`);
    } else {
      yield createEvent.message(`Minimum coins: ${dp[amount]} → [${coinsUsed.join(', ')}]`, 'info');
      yield createEvent.result('string', `${dp[amount]} coins: [${coinsUsed.join(', ')}]`, `Minimum ${dp[amount]} coins needed`);
    }
  },
};
