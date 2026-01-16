import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Word Break Problem
 * 
 * Check if string can be segmented into dictionary words
 * Time Complexity: O(n² × m) where m is avg word length
 * Space Complexity: O(n)
 */
export const wordBreak: IAlgorithm<ArrayInput> = {
  id: 'word-break',
  name: 'Word Break',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function wordBreak(s, wordDict):',
    '  n = length(s)',
    '  dp[i] = true if s[0..i-1] can be segmented',
    '  dp[0] = true  // Empty string',
    '',
    '  for i = 1 to n:',
    '    for j = 0 to i-1:',
    '      // If s[0..j-1] is valid AND s[j..i-1] in dict',
    '      if dp[j] AND s[j:i] in wordDict:',
    '        dp[i] = true',
    '        break',
    '',
    '  return dp[n]',
  ],

  timeComplexity: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n² × m)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    { id: 'text', label: 'String', type: 'text', default: 'leetcode', maxLength: 20 },
    { id: 'dict', label: 'Dictionary (comma-separated)', type: 'text', default: 'leet,code,lee,t', maxLength: 100 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const s = String(params?.['text'] ?? 'leetcode');
    const dictStr = String(params?.['dict'] ?? 'leet,code,lee,t');
    const wordDict = new Set(dictStr.split(',').map(w => w.trim()).filter(w => w.length > 0));
    const n = s.length;

    yield createEvent.message(`Word Break: "${s}" with dictionary [${Array.from(wordDict).join(', ')}]`, 'info');
    yield createEvent.highlight([0, 1, 2, 3]);

    // DP array
    const dp: boolean[] = new Array(n + 1).fill(false);
    const wordUsed: string[] = new Array(n + 1).fill('');
    dp[0] = true;

    yield createEvent.message('Initialize: dp[0] = true (empty string is valid)', 'step');

    const colLabels = ['Position', ...Array.from({ length: n + 1 }, (_, i) => i.toString())];

    const buildCells = (highlightI?: number, highlightJ?: number): DPCell[] => {
      const cells: DPCell[] = [];
      for (let k = 0; k <= n; k++) {
        let highlight: 'current' | 'path' | undefined;
        if (k === highlightI) highlight = 'current';
        else if (k === highlightJ) highlight = 'path';
        cells.push({
          row: 0,
          col: k,
          value: dp[k] ? 1 : 0,
          highlight,
        });
      }
      return cells;
    };

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['Valid'],
        cols: colLabels,
        cells: buildCells(),
      },
    });

    // Fill DP table
    for (let i = 1; i <= n; i++) {
      yield createEvent.message(`Checking if s[0:${i}] = "${s.substring(0, i)}" can be segmented`, 'step');
      yield createEvent.highlight([5]);

      for (let j = 0; j < i; j++) {
        yield createEvent.highlight([6, 7, 8]);

        const suffix = s.substring(j, i);
        const isValidPrefix = dp[j];
        const suffixInDict = wordDict.has(suffix);

        yield createEvent.pointer(
          [],
          [
            { name: 'i', value: i },
            { name: 'j', value: j },
            { name: `s[${j}:${i}]`, value: suffix },
            { name: `dp[${j}]`, value: isValidPrefix ? 'T' : 'F' },
            { name: 'inDict', value: suffixInDict ? 'T' : 'F' },
          ],
          `"${suffix}" in dict? ${suffixInDict}`
        );

        if (isValidPrefix && suffixInDict) {
          dp[i] = true;
          wordUsed[i] = suffix;
          yield createEvent.message(
            `Match! dp[${j}]=true AND "${suffix}" in dict → dp[${i}]=true`,
            'explanation'
          );
          yield createEvent.highlight([9, 10]);

          yield createEvent.auxiliary({
            type: 'dp-table',
            dpTableState: {
              rows: ['Valid'],
              cols: colLabels,
              cells: buildCells(i, j),
            },
          });
          break;
        }
      }

      if (!dp[i]) {
        yield createEvent.auxiliary({
          type: 'dp-table',
          dpTableState: {
            rows: ['Valid'],
            cols: colLabels,
            cells: buildCells(i),
          },
        });
      }
    }

    // Reconstruct segmentation
    const words: string[] = [];
    let i = n;
    while (i > 0) {
      if (wordUsed[i]) {
        words.push(wordUsed[i]);
        i -= wordUsed[i].length;
      } else {
        break;
      }
    }
    words.reverse();

    // Final visualization
    const finalCells = buildCells();
    finalCells[n].highlight = dp[n] ? 'max' : undefined;

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['Valid'],
        cols: colLabels,
        cells: finalCells,
      },
    });

    yield createEvent.highlight([12]);
    if (dp[n]) {
      yield createEvent.message(`Can be segmented: "${words.join(' | ')}"`, 'info');
      yield createEvent.result('boolean', true, `Segmentation: ${words.join(' | ')}`);
    } else {
      yield createEvent.message(`Cannot be segmented using dictionary`, 'info');
      yield createEvent.result('boolean', false, 'No valid segmentation');
    }
  },
};
