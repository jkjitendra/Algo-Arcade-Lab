import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Minimum Path Sum
 * 
 * Find minimum cost path from top-left to bottom-right
 * Time Complexity: O(m × n)
 * Space Complexity: O(m × n)
 */
export const minPathSum: IAlgorithm<ArrayInput> = {
  id: 'min-path-sum',
  name: 'Minimum Path Sum',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function minPathSum(grid):',
    '  m, n = dimensions(grid)',
    '  dp[0][0] = grid[0][0]',
    '',
    '  // Initialize first row and column',
    '  for j = 1 to n-1: dp[0][j] = dp[0][j-1] + grid[0][j]',
    '  for i = 1 to m-1: dp[i][0] = dp[i-1][0] + grid[i][0]',
    '',
    '  for i = 1 to m-1:',
    '    for j = 1 to n-1:',
    '      dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]',
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
    { id: 'rows', label: 'Rows', type: 'number', min: 2, max: 5, default: 3 },
    { id: 'cols', label: 'Columns', type: 'number', min: 2, max: 5, default: 3 },
  ],

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Grid values cannot be empty' };
    }
    if (!input.values.every((v) => typeof v === 'number' && v >= 0)) {
      return { ok: false, error: 'All values must be non-negative numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const rows = Number(params?.['rows'] ?? 3);
    const cols = Number(params?.['cols'] ?? 3);

    // Build grid from input values (or use defaults)
    const grid: number[][] = [];
    const values = input.values.length >= rows * cols ? input.values : [1, 3, 1, 1, 5, 1, 4, 2, 1];
    for (let i = 0; i < rows; i++) {
      grid.push(values.slice(i * cols, (i + 1) * cols));
    }

    yield createEvent.message(`Finding minimum path sum in ${rows}×${cols} grid`, 'info');
    yield createEvent.highlight([0, 1]);

    // Create DP table
    const dp: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));

    // Base case
    dp[0][0] = grid[0][0];
    yield createEvent.message(`Start: dp[0][0] = grid[0][0] = ${grid[0][0]}`, 'step');
    yield createEvent.highlight([2]);

    // Initialize first row
    for (let j = 1; j < cols; j++) {
      dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    yield createEvent.message('Initialize first row: cumulative sum', 'step');
    yield createEvent.highlight([5]);

    // Initialize first column
    for (let i = 1; i < rows; i++) {
      dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    yield createEvent.message('Initialize first column: cumulative sum', 'step');
    yield createEvent.highlight([6]);

    const rowLabels = Array.from({ length: rows }, (_, i) => `Row ${i}`);
    const colLabels = ['', ...Array.from({ length: cols }, (_, j) => `Col ${j}`)];

    const buildCells = (highlightI?: number, highlightJ?: number, showGrid: boolean = false): DPCell[] => {
      const cells: DPCell[] = [];
      const source = showGrid ? grid : dp;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let highlight: 'current' | 'path' | undefined;
          if (i === highlightI && j === highlightJ) highlight = 'current';
          else if (highlightI !== undefined && highlightJ !== undefined) {
            if ((i === highlightI - 1 && j === highlightJ) ||
              (i === highlightI && j === highlightJ - 1)) {
              highlight = 'path';
            }
          }
          cells.push({ row: i, col: j, value: source[i][j], highlight });
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
    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        yield createEvent.highlight([8, 9, 10]);

        const fromAbove = dp[i - 1][j];
        const fromLeft = dp[i][j - 1];
        dp[i][j] = Math.min(fromAbove, fromLeft) + grid[i][j];

        const dir = fromAbove <= fromLeft ? 'above' : 'left';
        yield createEvent.message(
          `Cell (${i}, ${j}): min(${fromAbove}, ${fromLeft}) + ${grid[i][j]} = ${dp[i][j]} (from ${dir})`,
          'explanation'
        );

        yield createEvent.pointer(
          [],
          [
            { name: 'i', value: i },
            { name: 'j', value: j },
            { name: `grid[${i}][${j}]`, value: grid[i][j] },
            { name: `dp[${i - 1}][${j}]`, value: fromAbove },
            { name: `dp[${i}][${j - 1}]`, value: fromLeft },
            { name: `dp[${i}][${j}]`, value: dp[i][j], highlight: true },
          ],
          `min(${fromAbove}, ${fromLeft}) + ${grid[i][j]} = ${dp[i][j]}`
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

    // Backtrack to find path
    const path: [number, number][] = [];
    let i = rows - 1, j = cols - 1;
    path.push([i, j]);
    while (i > 0 || j > 0) {
      if (i === 0) {
        j--;
      } else if (j === 0) {
        i--;
      } else if (dp[i - 1][j] <= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
      path.push([i, j]);
    }
    path.reverse();

    yield createEvent.message(`Optimal path: ${path.map(([r, c]) => `(${r},${c})`).join(' → ')}`, 'step');

    // Final visualization
    const finalCells = buildCells();
    const destIdx = finalCells.findIndex(c => c.row === rows - 1 && c.col === cols - 1);
    if (destIdx >= 0) finalCells[destIdx].highlight = 'max';

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: rowLabels,
        cols: colLabels,
        cells: finalCells,
        maxValue: dp[rows - 1][cols - 1],
        maxCell: { row: rows - 1, col: cols - 1 },
      },
    });

    yield createEvent.highlight([12]);
    yield createEvent.message(`Minimum path sum: ${dp[rows - 1][cols - 1]}`, 'info');
    yield createEvent.result('string', `Min sum: ${dp[rows - 1][cols - 1]}`, `Minimum path cost: ${dp[rows - 1][cols - 1]}`);
  },
};
