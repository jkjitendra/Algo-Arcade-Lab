import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Edit Distance (Levenshtein Distance)
 * 
 * Minimum operations to transform one string to another
 * Time Complexity: O(m × n)
 * Space Complexity: O(m × n)
 */
export const editDistance: IAlgorithm<ArrayInput> = {
  id: 'edit-distance',
  name: 'Edit Distance (Levenshtein)',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function editDistance(word1, word2):',
    '  m, n = length(word1), length(word2)',
    '  // dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]',
    '',
    '  // Base cases: empty string transformations',
    '  dp[i][0] = i, dp[0][j] = j',
    '',
    '  for i = 1 to m:',
    '    for j = 1 to n:',
    '      if word1[i-1] == word2[j-1]:',
    '        dp[i][j] = dp[i-1][j-1]  // No operation',
    '      else:',
    '        dp[i][j] = 1 + min(dp[i-1][j],      // Delete',
    '                          dp[i][j-1],      // Insert',
    '                          dp[i-1][j-1])    // Replace',
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
    { id: 'word1', label: 'Word 1', type: 'text', default: 'HORSE', maxLength: 8 },
    { id: 'word2', label: 'Word 2', type: 'text', default: 'ROS', maxLength: 8 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const word1 = String(params?.['word1'] ?? 'HORSE');
    const word2 = String(params?.['word2'] ?? 'ROS');
    const m = word1.length;
    const n = word2.length;

    yield createEvent.message(`Computing edit distance from "${word1}" to "${word2}"`, 'info');
    yield createEvent.highlight([0, 1, 2]);

    // Create DP table
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // Base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    yield createEvent.message('Base cases: dp[i][0] = i (delete all), dp[0][j] = j (insert all)', 'step');
    yield createEvent.highlight([4, 5]);

    const rowLabels = ['', ...word1.split('')];
    const colLabels = ['', '', ...word2.split('')];

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
        yield createEvent.highlight([7, 8]);

        if (word1[i - 1] === word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
          yield createEvent.message(
            `Match: '${word1[i - 1]}' == '${word2[j - 1]}', no operation: dp[${i}][${j}] = ${dp[i][j]}`,
            'explanation'
          );
          yield createEvent.highlight([9, 10]);
        } else {
          const deleteOp = dp[i - 1][j] + 1;
          const insertOp = dp[i][j - 1] + 1;
          const replaceOp = dp[i - 1][j - 1] + 1;
          dp[i][j] = Math.min(deleteOp, insertOp, replaceOp);

          let operation = '';
          if (dp[i][j] === replaceOp) operation = `Replace '${word1[i - 1]}' with '${word2[j - 1]}'`;
          else if (dp[i][j] === deleteOp) operation = `Delete '${word1[i - 1]}'`;
          else operation = `Insert '${word2[j - 1]}'`;

          yield createEvent.message(
            `${operation}: dp[${i}][${j}] = min(${deleteOp}, ${insertOp}, ${replaceOp}) = ${dp[i][j]}`,
            'explanation'
          );
          yield createEvent.highlight([11, 12, 13, 14]);
        }

        yield createEvent.pointer(
          [],
          [
            { name: `word1[${i - 1}]`, value: word1[i - 1] },
            { name: `word2[${j - 1}]`, value: word2[j - 1] },
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

    // Backtrack to find operations
    const operations: string[] = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && word1[i - 1] === word2[j - 1]) {
        i--;
        j--;
      } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
        operations.push(`Replace '${word1[i - 1]}' → '${word2[j - 1]}'`);
        i--;
        j--;
      } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
        operations.push(`Delete '${word1[i - 1]}'`);
        i--;
      } else {
        operations.push(`Insert '${word2[j - 1]}'`);
        j--;
      }
    }
    operations.reverse();

    yield createEvent.message(`Operations: ${operations.join(' → ') || 'None (strings equal)'}`, 'step');

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

    yield createEvent.highlight([16]);
    yield createEvent.message(`Edit Distance: ${dp[m][n]} operations`, 'info');
    yield createEvent.result('string', `Distance: ${dp[m][n]}`, `Minimum ${dp[m][n]} operations`);
  },
};
