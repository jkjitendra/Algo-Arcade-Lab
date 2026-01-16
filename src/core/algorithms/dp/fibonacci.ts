import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Fibonacci with DP Approaches
 * 
 * Compares recursive, memoization, and tabulation approaches
 * Time Complexity: O(n) for DP approaches
 * Space Complexity: O(n) for tabulation
 */
export const fibonacci: IAlgorithm<ArrayInput> = {
  id: 'fibonacci-dp',
  name: 'Fibonacci (DP)',
  category: 'dp',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function fibonacci(n):',
    '  // Tabulation approach - bottom up',
    '  dp[0] = 0, dp[1] = 1',
    '',
    '  for i = 2 to n:',
    '    dp[i] = dp[i-1] + dp[i-2]',
    '',
    '  return dp[n]',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    { id: 'n', label: 'N (Fibonacci number)', type: 'number', min: 2, max: 20, default: 10 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const n = Number(params?.['n'] ?? 10);
    const dp: number[] = new Array(n + 1).fill(0);

    yield createEvent.message(`Computing Fibonacci(${n}) using Dynamic Programming (Tabulation)`, 'info');
    yield createEvent.highlight([0, 1]);

    // Base cases
    dp[0] = 0;
    dp[1] = 1;

    yield createEvent.message('Base cases: F(0) = 0, F(1) = 1', 'step');
    yield createEvent.highlight([2]);

    // Build DP table visualization
    const cells: DPCell[] = [
      { row: 0, col: 0, value: 0, highlight: 'current' },
      { row: 0, col: 1, value: 1, highlight: 'current' },
    ];
    const cols = Array.from({ length: n + 1 }, (_, i) => i.toString());

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['F(i)'],
        cols: ['i', ...cols],
        cells: [...cells],
      },
    });

    yield createEvent.pointer(
      [],
      [
        { name: 'dp[0]', value: 0 },
        { name: 'dp[1]', value: 1 },
      ]
    );

    // Fill the DP table
    for (let i = 2; i <= n; i++) {
      yield createEvent.message(`Computing F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]}`, 'step');
      yield createEvent.highlight([4, 5]);

      dp[i] = dp[i - 1] + dp[i - 2];

      // Update visualization - mark previous cells and current
      const updatedCells: DPCell[] = [];
      for (let j = 0; j <= i; j++) {
        let highlight: 'current' | 'path' | undefined;
        if (j === i) highlight = 'current';
        else if (j === i - 1 || j === i - 2) highlight = 'path';
        updatedCells.push({ row: 0, col: j, value: dp[j], highlight });
      }

      yield createEvent.auxiliary({
        type: 'dp-table',
        dpTableState: {
          rows: ['F(i)'],
          cols: ['i', ...cols],
          cells: updatedCells,
        },
      });

      yield createEvent.pointer(
        [],
        [
          { name: 'i', value: i },
          { name: `dp[${i - 2}]`, value: dp[i - 2] },
          { name: `dp[${i - 1}]`, value: dp[i - 1] },
          { name: `dp[${i}]`, value: dp[i], highlight: true },
        ],
        `${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`
      );
    }

    // Final result
    const finalCells: DPCell[] = [];
    for (let j = 0; j <= n; j++) {
      finalCells.push({
        row: 0,
        col: j,
        value: dp[j],
        highlight: j === n ? 'max' : undefined,
      });
    }

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['F(i)'],
        cols: ['i', ...cols],
        cells: finalCells,
        maxValue: dp[n],
        maxCell: { row: 0, col: n },
      },
    });

    yield createEvent.highlight([7]);
    yield createEvent.message(`Fibonacci(${n}) = ${dp[n]}`, 'info');
    yield createEvent.result('string', `F(${n}) = ${dp[n]}`, `Fibonacci of ${n}`);
  },
};
