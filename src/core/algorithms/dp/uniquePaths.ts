import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Unique Paths
 * 
 * Count paths from top-left to bottom-right (only right/down moves)
 * Time Complexity: O(m × n)
 * Space Complexity: O(m × n)
 */
export const uniquePaths: IAlgorithm<ArrayInput> = {
  id: 'unique-paths',
  name: 'Unique Paths',
  category: 'dp',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function uniquePaths(m, n):',
    '  // dp[i][j] = number of paths to reach (i, j)',
    '  dp[0][j] = 1 for all j  // First row',
    '  dp[i][0] = 1 for all i  // First column',
    '',
    '  for i = 1 to m-1:',
    '    for j = 1 to n-1:',
    '      dp[i][j] = dp[i-1][j] + dp[i][j-1]',
    '',
    '  return dp[m-1][n-1]',
  ],

  timeComplexity: {
    best: 'O(m × n)',
    average: 'O(m × n)',
    worst: 'O(m × n)',
  },

  spaceComplexity: 'O(m × n)',

  parameters: [
    { id: 'rows', label: 'Rows (m)', type: 'number', min: 2, max: 8, default: 3 },
    { id: 'cols', label: 'Columns (n)', type: 'number', min: 2, max: 8, default: 4 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const m = Number(params?.['rows'] ?? 3);
    const n = Number(params?.['cols'] ?? 4);

    yield createEvent.message(`Finding unique paths in ${m}×${n} grid (top-left to bottom-right)`, 'info');
    yield createEvent.highlight([0, 1]);

    // Create DP table
    const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));

    // Initialize first row and column
    for (let j = 0; j < n; j++) dp[0][j] = 1;
    for (let i = 0; i < m; i++) dp[i][0] = 1;

    yield createEvent.message('Initialize: First row and column = 1 (only one way to reach)', 'step');
    yield createEvent.highlight([2, 3]);

    const rowLabels = Array.from({ length: m }, (_, i) => `Row ${i}`);
    const colLabels = ['', ...Array.from({ length: n }, (_, j) => `Col ${j}`)];

    const buildCells = (highlightI?: number, highlightJ?: number): DPCell[] => {
      const cells: DPCell[] = [];
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          let highlight: 'current' | 'path' | undefined;
          if (i === highlightI && j === highlightJ) highlight = 'current';
          else if (highlightI !== undefined && highlightJ !== undefined) {
            if ((i === highlightI - 1 && j === highlightJ) ||
              (i === highlightI && j === highlightJ - 1)) {
              highlight = 'path';
            }
          }
          cells.push({ row: i, col: j, value: dp[i][j], highlight });
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
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        yield createEvent.highlight([5, 6, 7]);

        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];

        yield createEvent.message(
          `Cell (${i}, ${j}): Come from above (${dp[i - 1][j]}) + left (${dp[i][j - 1]}) = ${dp[i][j]}`,
          'explanation'
        );

        yield createEvent.pointer(
          [],
          [
            { name: 'i', value: i },
            { name: 'j', value: j },
            { name: `dp[${i - 1}][${j}]`, value: dp[i - 1][j] },
            { name: `dp[${i}][${j - 1}]`, value: dp[i][j - 1] },
            { name: `dp[${i}][${j}]`, value: dp[i][j], highlight: true },
          ],
          `${dp[i - 1][j]} + ${dp[i][j - 1]} = ${dp[i][j]}`
        );

        yield createEvent.auxiliary({
          type: 'dp-table',
          dpTableState: {
            rows: rowLabels,
            cols: colLabels,
            cells: buildCells(i, j),
          },
        });
      }
    }

    // Final visualization
    const finalCells = buildCells();
    // Mark destination
    const destIdx = finalCells.findIndex(c => c.row === m - 1 && c.col === n - 1);
    if (destIdx >= 0) finalCells[destIdx].highlight = 'max';

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: rowLabels,
        cols: colLabels,
        cells: finalCells,
        maxValue: dp[m - 1][n - 1],
        maxCell: { row: m - 1, col: n - 1 },
      },
    });

    yield createEvent.highlight([9]);
    yield createEvent.message(`Total unique paths: ${dp[m - 1][n - 1]}`, 'info');
    yield createEvent.result('string', `${dp[m - 1][n - 1]} paths`, `${dp[m - 1][n - 1]} unique paths`);
  },
};
