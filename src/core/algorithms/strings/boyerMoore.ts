import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Boyer-Moore Algorithm (Bad Character Heuristic)
 * 
 * Efficient pattern matching that skips sections using bad character rule.
 * 
 * Time Complexity: O(n/m) best case, O(n × m) worst case
 * Space Complexity: O(k) where k is alphabet size
 */
export const boyerMoore: IAlgorithm<ArrayInput> = {
  id: 'boyer-moore',
  name: 'Boyer-Moore Algorithm',
  category: 'strings',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function boyerMoore(text, pattern):',
    '  // Build bad character table',
    '  badChar = buildBadCharTable(pattern)',
    '',
    '  shift = 0',
    '  while shift <= n - m:',
    '    j = m - 1  // Start from end',
    '',
    '    while j >= 0 and pattern[j] == text[shift+j]:',
    '      j--',
    '',
    '    if j < 0:',
    '      found at shift',
    '      shift += (pattern bad shift)',
    '    else:',
    '      shift += max(1, j - badChar[text[shift+j]])',
  ],

  timeComplexity: {
    best: 'O(n/m)',
    average: 'O(n)',
    worst: 'O(n × m)',
  },

  spaceComplexity: 'O(k)',

  parameters: [
    {
      type: 'text',
      id: 'pattern',
      label: 'Search Pattern',
      default: 'ABC',
      placeholder: 'Enter pattern to search',
      maxLength: 10,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length < 3) {
      return { ok: false, error: 'Text must have at least 3 characters' };
    }
    if (input.values.length > 20) {
      return { ok: false, error: 'Text length must be 20 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const patternStr = ((params?.pattern as string) || 'ABC').toUpperCase();
    const arr = [...input.values];
    const n = arr.length;
    const textChars = arr.map(v => String.fromCharCode(v));
    const text = textChars.join('');
    const patternChars = patternStr.split('');
    const m = patternChars.length;

    yield createEvent.message(
      `Boyer-Moore Algorithm (Bad Character Heuristic)`,
      'info',
      0
    );
    yield createEvent.message(
      `Text: "${text}" | Pattern: "${patternStr}"`,
      'explanation'
    );

    // Build bad character table
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(
      `Building bad character table...`,
      'step'
    );

    const badChar: Map<string, number> = new Map();
    for (let i = 0; i < m; i++) {
      badChar.set(patternChars[i], i);
    }

    // Show bad character table
    const badCharDisplay = Array.from(badChar.entries())
      .map(([char, idx]) => `'${char}'→${idx}`)
      .join(', ');

    yield createEvent.message(
      `Bad character table: {${badCharDisplay}}`,
      'explanation'
    );

    const matches: number[] = [];
    let shift = 0;
    let comparisons = 0;

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: textChars.map((c, i) => ({ char: c, index: i })),
        pattern: patternChars.map((c, i) => ({ char: c, index: i })),
        patternOffset: 0,
        matchPositions: [],
      },
    });

    yield createEvent.highlight([4, 5, 6]);
    yield createEvent.message(
      `Matching right-to-left, skipping on mismatch...`,
      'step'
    );

    while (shift <= n - m) {
      yield createEvent.pointer(
        [{ index: shift, label: 'shift', color: 'var(--color-primary-500)' }],
        [
          { name: 'shift', value: shift },
          { name: 'window', value: `[${shift}..${shift + m - 1}]` },
        ]
      );

      yield createEvent.auxiliary({
        type: 'string-chars',
        stringChars: {
          text: textChars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx >= shift && idx < shift + m ? 'current' :
              (matches.some(pos => idx >= pos && idx < pos + m) ? 'found' : undefined),
          })),
          pattern: patternChars.map((c, idx) => ({ char: c, index: idx })),
          patternOffset: shift,
          matchPositions: matches,
        },
      });

      let j = m - 1;

      yield createEvent.highlight([7, 8, 9]);
      yield createEvent.message(
        `Comparing right-to-left at shift ${shift}...`,
        'explanation'
      );

      while (j >= 0 && patternChars[j] === textChars[shift + j]) {
        comparisons++;
        yield createEvent.compare([shift + j, j], 'eq');

        yield createEvent.auxiliary({
          type: 'string-chars',
          stringChars: {
            text: textChars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === shift + j ? 'match' :
                (idx >= shift && idx < shift + m && idx > shift + j ? 'match' : undefined),
            })),
            pattern: patternChars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === j ? 'match' : (idx > j ? 'match' : undefined),
            })),
            patternOffset: shift,
            matchPositions: matches,
          },
        });

        yield createEvent.message(
          `text[${shift + j}]='${textChars[shift + j]}' == pattern[${j}]='${patternChars[j]}' ✓`,
          'explanation'
        );
        j--;
      }

      if (j < 0) {
        // Match found
        matches.push(shift);
        yield createEvent.highlight([11, 12, 13]);
        yield createEvent.message(
          `Match found at position ${shift}!`,
          'info'
        );

        for (let k = shift; k < shift + m; k++) {
          yield createEvent.mark([k], 'sorted');
        }

        // Shift pattern
        shift += (shift + m < n) ? m - (badChar.get(textChars[shift + m]) ?? -1) : 1;
      } else {
        // Mismatch
        comparisons++;
        yield createEvent.compare([shift + j, j], 'lt');

        const badCharShift = badChar.get(textChars[shift + j]) ?? -1;
        const skipAmount = Math.max(1, j - badCharShift);

        yield createEvent.auxiliary({
          type: 'string-chars',
          stringChars: {
            text: textChars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === shift + j ? 'mismatch' : undefined,
            })),
            pattern: patternChars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === j ? 'mismatch' : undefined,
            })),
            patternOffset: shift,
            matchPositions: matches,
          },
        });

        yield createEvent.highlight([14, 15]);
        yield createEvent.message(
          `Mismatch: '${textChars[shift + j]}' ≠ '${patternChars[j]}'. Bad char shift: max(1, ${j} - ${badCharShift}) = ${skipAmount}`,
          'explanation'
        );

        shift += skipAmount;
      }
    }

    yield createEvent.pointer([], []);

    // Emit result event
    yield createEvent.result(
      'indices',
      matches,
      matches.length > 0 ? `Pattern found at indices: [${matches.join(', ')}]` : `Pattern "${patternStr}" not found`
    );

    if (matches.length > 0) {
      yield createEvent.message(
        `Found ${matches.length} match(es) at position(s): [${matches.join(', ')}]`,
        'info'
      );
    } else {
      yield createEvent.message(
        `Pattern "${patternStr}" not found in text.`,
        'info'
      );
    }

    yield createEvent.message(
      `Total comparisons: ${comparisons}`,
      'explanation'
    );
  },
};
