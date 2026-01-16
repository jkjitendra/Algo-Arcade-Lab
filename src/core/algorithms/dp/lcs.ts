import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Longest Common Subsequence (LCS)
 * 
 * Find length of longest common subsequence between two strings
 * Time Complexity: O(m × n)
 * Space Complexity: O(m × n)
 */
export const lcs: IAlgorithm<ArrayInput> = {
  id: 'lcs',
  name: 'Longest Common Subsequence',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function LCS(X, Y):',
    '  m, n = length(X), length(Y)',
    '  dp[i][j] = LCS length of X[0..i-1] and Y[0..j-1]',
    '',
    '  for i = 1 to m:',
    '    for j = 1 to n:',
    '      if X[i-1] == Y[j-1]:',
    '        dp[i][j] = dp[i-1][j-1] + 1  // Match',
    '      else:',
    '        dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
    '',
    '  return dp[m][n]',
  ],

  timeComplexity: {
    best: 'O(m × n)',
    average: 'O(m × n)',
    worst: 'O(m × n)',
  },

  spaceComplexity: 'O(m × n)',

  parameters: [
    { id: 'text1', label: 'String 1', type: 'text', default: 'ABCBDAB', maxLength: 10 },
    { id: 'text2', label: 'String 2', type: 'text', default: 'BDCAB', maxLength: 10 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const X = String(params?.['text1'] ?? 'ABCBDAB');
    const Y = String(params?.['text2'] ?? 'BDCAB');
    const m = X.length;
    const n = Y.length;

    yield createEvent.message(`Finding LCS of "${X}" and "${Y}"`, 'info');
    yield createEvent.highlight([0, 1, 2]);

    // Create DP table
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    const rowLabels = ['', ...X.split('')];
    const colLabels = ['', '', ...Y.split('')];

    const buildCells = (highlightI?: number, highlightJ?: number): DPCell[] => {
      const cells: DPCell[] = [];
      for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
          let highlight: 'current' | 'path' | undefined;
          if (i === highlightI && j === highlightJ) highlight = 'current';
          else if (highlightI !== undefined && highlightJ !== undefined) {
            if ((i === highlightI - 1 && j === highlightJ - 1) ||
              (i === highlightI - 1 && j === highlightJ) ||
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
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        yield createEvent.highlight([4, 5]);

        if (X[i - 1] === Y[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          yield createEvent.message(
            `Match! X[${i - 1}]='${X[i - 1]}' == Y[${j - 1}]='${Y[j - 1]}': dp[${i}][${j}] = ${dp[i - 1][j - 1]} + 1 = ${dp[i][j]}`,
            'explanation'
          );
          yield createEvent.highlight([6, 7]);
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          yield createEvent.message(
            `No match: dp[${i}][${j}] = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
            'explanation'
          );
          yield createEvent.highlight([8, 9]);
        }

        yield createEvent.pointer(
          [],
          [
            { name: `X[${i - 1}]`, value: X[i - 1] },
            { name: `Y[${j - 1}]`, value: Y[j - 1] },
            { name: `dp[${i}][${j}]`, value: dp[i][j], highlight: true },
          ]
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

    // Backtrack to find actual LCS
    let lcsStr = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (X[i - 1] === Y[j - 1]) {
        lcsStr = X[i - 1] + lcsStr;
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    yield createEvent.message(`LCS found: "${lcsStr}" with length ${dp[m][n]}`, 'step');

    // Final visualization
    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: rowLabels,
        cols: colLabels,
        cells: buildCells(),
        maxValue: dp[m][n],
        maxCell: { row: m, col: n },
      },
    });

    yield createEvent.highlight([11]);
    yield createEvent.message(`Longest Common Subsequence: "${lcsStr}" (length ${dp[m][n]})`, 'info');
    yield createEvent.result('string', `LCS: "${lcsStr}", Length: ${dp[m][n]}`, `LCS of length ${dp[m][n]}`);
  },
};
