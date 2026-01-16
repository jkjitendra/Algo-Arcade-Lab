import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Climbing Stairs
 * 
 * Count ways to reach the nth step (can climb 1 or 2 steps)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const climbingStairs: IAlgorithm<ArrayInput> = {
  id: 'climbing-stairs',
  name: 'Climbing Stairs',
  category: 'dp',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function climbStairs(n):',
    '  if n <= 2: return n',
    '',
    '  dp[1] = 1  // 1 way to reach step 1',
    '  dp[2] = 2  // 2 ways to reach step 2',
    '',
    '  for i = 3 to n:',
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
    { id: 'n', label: 'Number of stairs', type: 'number', min: 1, max: 20, default: 6 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const n = Number(params?.['n'] ?? 6);

    yield createEvent.message(`Counting ways to climb ${n} stairs (1 or 2 steps at a time)`, 'info');
    yield createEvent.highlight([0]);

    if (n <= 2) {
      yield createEvent.message(`Base case: ${n} stair(s) = ${n} way(s)`, 'step');
      yield createEvent.highlight([1]);
      yield createEvent.result('string', `Ways to climb ${n} stairs: ${n}`, `${n} ways`);
      return;
    }

    const dp: number[] = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;

    yield createEvent.message('Base cases: dp[1] = 1 (take 1 step), dp[2] = 2 (1+1 or 2)', 'step');
    yield createEvent.highlight([3, 4]);

    const cols = Array.from({ length: n + 1 }, (_, i) => i.toString());
    let cells: DPCell[] = [
      { row: 0, col: 1, value: 1, highlight: 'current' },
      { row: 0, col: 2, value: 2, highlight: 'current' },
    ];

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['Ways'],
        cols: ['Step', ...cols],
        cells: cells,
      },
    });

    yield createEvent.pointer(
      [],
      [
        { name: 'dp[1]', value: 1 },
        { name: 'dp[2]', value: 2 },
      ]
    );

    // Fill DP table
    for (let i = 3; i <= n; i++) {
      yield createEvent.message(
        `Step ${i}: Can come from step ${i - 1} (${dp[i - 1]} ways) or step ${i - 2} (${dp[i - 2]} ways)`,
        'step'
      );
      yield createEvent.highlight([6, 7]);

      dp[i] = dp[i - 1] + dp[i - 2];

      cells = [];
      for (let j = 1; j <= i; j++) {
        let highlight: 'current' | 'path' | undefined;
        if (j === i) highlight = 'current';
        else if (j === i - 1 || j === i - 2) highlight = 'path';
        cells.push({ row: 0, col: j, value: dp[j], highlight });
      }

      yield createEvent.auxiliary({
        type: 'dp-table',
        dpTableState: {
          rows: ['Ways'],
          cols: ['Step', ...cols],
          cells: cells,
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
    for (let j = 1; j <= n; j++) {
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
        rows: ['Ways'],
        cols: ['Step', ...cols],
        cells: finalCells,
        maxValue: dp[n],
        maxCell: { row: 0, col: n },
      },
    });

    yield createEvent.highlight([9]);
    yield createEvent.message(`Total ways to climb ${n} stairs: ${dp[n]}`, 'info');
    yield createEvent.result('string', `Ways: ${dp[n]}`, `${dp[n]} distinct ways to climb ${n} stairs`);
  },
};
