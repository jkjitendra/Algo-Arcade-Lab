import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Z-Algorithm
 * 
 * Pattern matching using Z-array (stores length of longest substring starting from each position that matches a prefix).
 * 
 * Time Complexity: O(n + m)
 * Space Complexity: O(n + m) for Z-array
 */
export const zAlgorithm: IAlgorithm<ArrayInput> = {
  id: 'z-algorithm',
  name: 'Z-Algorithm',
  category: 'strings',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function zAlgorithm(text, pattern):',
    '  combined = pattern + "$" + text',
    '  z = buildZArray(combined)',
    '',
    '  for i = 0 to length(combined):',
    '    if z[i] == length(pattern):',
    '      found at i - m - 1',
    '',
    'function buildZArray(str):',
    '  z[0] = 0, left = 0, right = 0',
    '  for i = 1 to n:',
    '    if i > right:',
    '      compute z[i] naively',
    '    else:',
    '      use z[i-left] as hint',
  ],

  timeComplexity: {
    best: 'O(n + m)',
    average: 'O(n + m)',
    worst: 'O(n + m)',
  },

  spaceComplexity: 'O(n + m)',

  parameters: [
    {
      type: 'text',
      id: 'pattern',
      label: 'Search Pattern',
      default: 'AB',
      placeholder: 'Enter pattern to search',
      maxLength: 10,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Text must have at least 2 characters' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Text length must be 15 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const patternStr = ((params?.pattern as string) || 'AB').toUpperCase();
    const arr = [...input.values];
    const textChars = arr.map(v => String.fromCharCode(v));
    const text = textChars.join('');
    const m = patternStr.length;

    yield createEvent.message(
      `Z-Algorithm for Pattern Matching`,
      'info',
      0
    );
    yield createEvent.message(
      `Text: "${text}" | Pattern: "${patternStr}"`,
      'explanation'
    );

    // Concatenate pattern + $ + text
    const combined = patternStr + '$' + text;
    const combinedChars = combined.split('');
    const n = combined.length;

    yield createEvent.highlight([1]);
    yield createEvent.message(
      `Combined string: "${combined}"`,
      'step'
    );

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: combinedChars.map((c, i) => ({
          char: c,
          index: i,
          highlight: i < m ? 'pattern' : undefined,
        })),
      },
    });

    // Build Z-array
    yield createEvent.message(
      `Building Z-array...`,
      'step'
    );
    yield createEvent.highlight([8, 9, 10, 11, 12, 13, 14]);

    const z = new Array(n).fill(0);
    let left = 0, right = 0;

    for (let i = 1; i < n; i++) {
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'i', value: i },
          { name: 'left', value: left },
          { name: 'right', value: right },
        ]
      );

      if (i > right) {
        // Compute naively
        left = right = i;
        while (right < n && combinedChars[right - left] === combinedChars[right]) {
          right++;
        }
        z[i] = right - left;
        right--;

        yield createEvent.message(
          `i=${i} outside Z-box: computed z[${i}] = ${z[i]} naively`,
          'explanation'
        );
      } else {
        // Use previous Z values
        const k = i - left;
        if (z[k] < right - i + 1) {
          z[i] = z[k];
          yield createEvent.message(
            `i=${i} inside Z-box: z[${i}] = z[${k}] = ${z[k]}`,
            'explanation'
          );
        } else {
          left = i;
          while (right < n && combinedChars[right - left] === combinedChars[right]) {
            right++;
          }
          z[i] = right - left;
          right--;
          yield createEvent.message(
            `i=${i} at Z-box boundary: extended to z[${i}] = ${z[i]}`,
            'explanation'
          );
        }
      }

      yield createEvent.auxiliary({
        type: 'string-chars',
        stringChars: {
          text: combinedChars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx === i ? 'current' :
              (idx >= left && idx <= right ? 'match' :
                (idx < m ? 'pattern' : undefined)),
          })),
        },
        lpsState: {
          array: z.map((v, idx) => ({
            index: idx,
            value: v,
            highlight: idx === i,
          })),
          arrayType: 'z',
          currentBuildIndex: i,
        },
      });
    }

    yield createEvent.message(
      `Z-array: [${z.join(', ')}]`,
      'info'
    );

    // Find matches
    yield createEvent.message(
      `Finding pattern matches (z[i] == ${m})...`,
      'step'
    );
    yield createEvent.highlight([4, 5, 6]);

    const matches: number[] = [];

    for (let i = m + 1; i < n; i++) {
      if (z[i] === m) {
        const textPos = i - m - 1;
        matches.push(textPos);

        yield createEvent.message(
          `z[${i}] = ${m} → Match at text position ${textPos}!`,
          'info'
        );

        // Mark in original text
        for (let k = textPos; k < textPos + m; k++) {
          yield createEvent.mark([k], 'sorted');
        }
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
  },
};
