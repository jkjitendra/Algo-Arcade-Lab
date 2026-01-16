import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Matrix Chain Multiplication
 * 
 * Find optimal parenthesization for matrix multiplication
 * Time Complexity: O(n³)
 * Space Complexity: O(n²)
 */
export const matrixChainMultiplication: IAlgorithm<ArrayInput> = {
  id: 'matrix-chain-multiplication',
  name: 'Matrix Chain Multiplication',
  category: 'dp',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function matrixChain(dims):',
    '  n = length(dims) - 1  // number of matrices',
    '  // dp[i][j] = min cost to multiply matrices i to j',
    '',
    '  for len = 2 to n:        // chain length',
    '    for i = 1 to n-len+1:  // start',
    '      j = i + len - 1      // end',
    '      dp[i][j] = infinity',
    '      for k = i to j-1:    // split point',
    '        cost = dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j]',
    '        if cost < dp[i][j]:',
    '          dp[i][j] = cost',
    '',
    '  return dp[1][n]',
  ],

  timeComplexity: {
    best: 'O(n³)',
    average: 'O(n³)',
    worst: 'O(n³)',
  },

  spaceComplexity: 'O(n²)',

  parameters: [],

  validate(input: ArrayInput) {
    if (!input.values || input.values.length < 3) {
      return { ok: false, error: 'Need at least 3 dimensions (2 matrices)' };
    }
    if (input.values.length > 8) {
      return { ok: false, error: 'Maximum 7 matrices for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && v > 0 && Number.isInteger(v))) {
      return { ok: false, error: 'All dimensions must be positive integers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const dims = [...input.values];
    const numMatrices = dims.length - 1;

    const matrixDesc = dims.slice(0, -1).map((d, i) => `M${i + 1}(${d}×${dims[i + 1]})`).join(', ');
    yield createEvent.message(`Finding optimal multiplication order for ${numMatrices} matrices: ${matrixDesc}`, 'info');
    yield createEvent.highlight([0, 1, 2]);

    // Create DP table
    const dp: number[][] = Array.from({ length: numMatrices + 1 }, () => new Array(numMatrices + 1).fill(0));
    const split: number[][] = Array.from({ length: numMatrices + 1 }, () => new Array(numMatrices + 1).fill(0));
    const INF = Number.MAX_SAFE_INTEGER;

    const rowLabels = ['', ...Array.from({ length: numMatrices }, (_, i) => `M${i + 1}`)];
    const colLabels = ['', '', ...Array.from({ length: numMatrices }, (_, i) => `M${i + 1}`)];

    const buildCells = (highlightI?: number, highlightJ?: number): DPCell[] => {
      const cells: DPCell[] = [];
      for (let i = 1; i <= numMatrices; i++) {
        for (let j = 1; j <= numMatrices; j++) {
          if (j >= i) {
            let highlight: 'current' | 'path' | undefined;
            if (i === highlightI && j === highlightJ) highlight = 'current';
            cells.push({
              row: i,
              col: j,
              value: dp[i][j] === INF ? -1 : dp[i][j],
              highlight,
            });
          }
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

    // Fill DP table by chain length
    for (let len = 2; len <= numMatrices; len++) {
      yield createEvent.message(`Processing chains of length ${len}`, 'step');
      yield createEvent.highlight([4]);

      for (let i = 1; i <= numMatrices - len + 1; i++) {
        const j = i + len - 1;
        dp[i][j] = INF;

        yield createEvent.message(`Computing optimal cost for M${i} to M${j}`, 'step');
        yield createEvent.highlight([5, 6, 7]);

        for (let k = i; k < j; k++) {
          yield createEvent.highlight([8, 9]);

          const cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j];

          yield createEvent.pointer(
            [],
            [
              { name: 'i', value: i },
              { name: 'j', value: j },
              { name: 'k', value: k },
              { name: 'cost', value: cost },
              { name: `dp[${i}][${j}]`, value: dp[i][j] === INF ? '∞' : dp[i][j] },
            ],
            `(M${i}..M${k}) × (M${k + 1}..M${j}): ${dp[i][k]} + ${dp[k + 1][j]} + ${dims[i - 1]}×${dims[k]}×${dims[j]} = ${cost}`
          );

          if (cost < dp[i][j]) {
            dp[i][j] = cost;
            split[i][j] = k;
            yield createEvent.message(`New minimum: split at k=${k}, cost=${cost}`, 'explanation');
            yield createEvent.highlight([10, 11]);
          }
        }

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

    // Build optimal parenthesization string
    function buildParens(i: number, j: number): string {
      if (i === j) return `M${i}`;
      const k = split[i][j];
      return `(${buildParens(i, k)} × ${buildParens(k + 1, j)})`;
    }

    const optimalOrder = buildParens(1, numMatrices);

    yield createEvent.message(`Optimal order: ${optimalOrder}`, 'step');

    // Final visualization
    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: rowLabels,
        cols: colLabels,
        cells: buildCells(),
        maxValue: dp[1][numMatrices],
        maxCell: { row: 1, col: numMatrices },
      },
    });

    yield createEvent.highlight([13]);
    yield createEvent.message(`Minimum cost: ${dp[1][numMatrices]} scalar multiplications`, 'info');
    yield createEvent.result(
      'string',
      `Min cost: ${dp[1][numMatrices]}, Order: ${optimalOrder}`,
      `${dp[1][numMatrices]} multiplications`
    );
  },
};
