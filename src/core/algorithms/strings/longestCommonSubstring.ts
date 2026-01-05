import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Longest Common Substring
 * 
 * Find the longest substring common to two strings using Dynamic Programming.
 * 
 * Time Complexity: O(n × m)
 * Space Complexity: O(n × m)
 */
export const longestCommonSubstring: IAlgorithm<ArrayInput> = {
  id: 'longest-common-substring',
  name: 'Longest Common Substring',
  category: 'strings',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function LCS(str1, str2):',
    '  dp[i][j] = 0 for all i, j',
    '  maxLen = 0, endPos = 0',
    '',
    '  for i = 1 to len(str1):',
    '    for j = 1 to len(str2):',
    '      if str1[i-1] == str2[j-1]:',
    '        dp[i][j] = dp[i-1][j-1] + 1',
    '        if dp[i][j] > maxLen:',
    '          maxLen = dp[i][j]',
    '          endPos = i',
    '',
    '  return str1[endPos-maxLen..endPos]',
  ],

  timeComplexity: {
    best: 'O(n × m)',
    average: 'O(n × m)',
    worst: 'O(n × m)',
  },

  spaceComplexity: 'O(n × m)',

  parameters: [
    {
      type: 'text',
      id: 'secondString',
      label: 'Second String',
      default: 'ABCXYZ',
      placeholder: 'String to compare',
      maxLength: 10,
    },
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'String must have at least 2 characters' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'String length must be 10 or less for DP table visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const chars1 = arr.map(v => String.fromCharCode(v));
    const str1 = chars1.join('');

    // Use second string from parameters
    const str2 = ((params?.secondString as string) || 'ABCXYZ').toUpperCase();
    const chars2 = str2.split('');

    const n = str1.length;
    const m = str2.length;

    yield createEvent.message(
      `Longest Common Substring (Dynamic Programming)`,
      'info',
      0
    );
    yield createEvent.message(
      `String 1: "${str1}" | String 2: "${str2}"`,
      'explanation'
    );

    // Initialize DP table
    yield createEvent.highlight([1, 2]);
    const dp: number[][] = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

    let maxLen = 0;
    let endPos = 0;

    yield createEvent.message(
      `Initializing DP table (${n + 1} × ${m + 1})...`,
      'step'
    );

    // Show initial state
    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['', ...chars1],
        cols: ['', ...chars2],
        cells: buildCells(dp, n, m),
      },
      stringChars: {
        text: chars1.map((c, i) => ({ char: c, index: i })),
        pattern: chars2.map((c, i) => ({ char: c, index: i })),
      },
    });

    yield createEvent.highlight([4, 5, 6, 7, 8, 9, 10]);
    yield createEvent.message(
      `Filling DP table...`,
      'step'
    );

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        yield createEvent.pointer(
          [{ index: i - 1, label: 'i', color: 'var(--color-primary-500)' }],
          [
            { name: 'i', value: i },
            { name: 'j', value: j },
            { name: 'str1[i-1]', value: chars1[i - 1] },
            { name: 'str2[j-1]', value: chars2[j - 1] },
          ]
        );

        if (chars1[i - 1] === chars2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;

          yield createEvent.compare([i - 1, j - 1], 'eq');
          yield createEvent.message(
            `Match: '${chars1[i - 1]}' == '${chars2[j - 1]}' → dp[${i}][${j}] = ${dp[i][j]}`,
            'explanation'
          );

          if (dp[i][j] > maxLen) {
            maxLen = dp[i][j];
            endPos = i;

            yield createEvent.message(
              `New max length: ${maxLen} ending at position ${endPos}`,
              'info'
            );
          }
        } else {
          dp[i][j] = 0;
        }

        yield createEvent.auxiliary({
          type: 'dp-table',
          dpTableState: {
            rows: ['', ...chars1],
            cols: ['', ...chars2],
            cells: buildCells(dp, n, m, i, j, maxLen > 0 ? endPos : undefined, maxLen),
            maxValue: maxLen,
            maxCell: maxLen > 0 ? { row: endPos, col: j } : undefined,
          },
          stringChars: {
            text: chars1.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === i - 1 ? 'current' :
                (maxLen > 0 && idx >= endPos - maxLen && idx < endPos ? 'found' : undefined),
            })),
            pattern: chars2.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === j - 1 ? 'current' : undefined,
            })),
          },
        });
      }
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([12]);

    // Mark the LCS in both strings
    if (maxLen > 0) {
      const lcs = str1.substring(endPos - maxLen, endPos);

      for (let i = endPos - maxLen; i < endPos; i++) {
        yield createEvent.mark([i], 'sorted');
      }

      // Emit result event
      yield createEvent.result('string', lcs, `LCS: "${lcs}" (length ${maxLen})`);

      yield createEvent.message(
        `Longest Common Substring: "${lcs}" (length ${maxLen})`,
        'info'
      );
    } else {
      yield createEvent.result('string', '', 'No common substring found');

      yield createEvent.message(
        `No common substring found.`,
        'info'
      );
    }
  },
};

function buildCells(
  dp: number[][],
  n: number,
  m: number,
  currentI?: number,
  currentJ?: number,
  maxEndPos?: number,
  maxLen?: number
) {
  const cells = [];
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      let highlight: 'current' | 'path' | 'max' | undefined;

      if (currentI !== undefined && currentJ !== undefined && i === currentI && j === currentJ) {
        highlight = 'current';
      } else if (maxEndPos !== undefined && maxLen !== undefined &&
        i === maxEndPos && dp[i][j] === maxLen) {
        highlight = 'max';
      }

      cells.push({
        row: i,
        col: j,
        value: dp[i][j],
        highlight,
      });
    }
  }
  return cells;
}
