import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Longest Palindromic Substring
 * 
 * Find the longest palindromic substring using expand around center approach.
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export const longestPalindromicSubstring: IAlgorithm<ArrayInput> = {
  id: 'longest-palindromic-substring',
  name: 'Longest Palindrome',
  category: 'strings',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function longestPalindrome(str):',
    '  maxStart = 0, maxLen = 1',
    '',
    '  for i = 0 to n-1:',
    '    // Odd length palindromes',
    '    len1 = expandAroundCenter(i, i)',
    '    // Even length palindromes',
    '    len2 = expandAroundCenter(i, i+1)',
    '',
    '    len = max(len1, len2)',
    '    if len > maxLen:',
    '      maxLen = len',
    '      maxStart = i - (len-1)/2',
    '',
    '  return str[maxStart..maxStart+maxLen]',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },

  spaceComplexity: 'O(1)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length < 1) {
      return { ok: false, error: 'String must have at least 1 character' };
    }
    if (input.values.length > 20) {
      return { ok: false, error: 'String length must be 20 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const chars = arr.map(v => String.fromCharCode(v));
    const str = chars.join('');

    yield createEvent.message(
      `Longest Palindromic Substring (Expand Around Center)`,
      'info',
      0
    );
    yield createEvent.message(
      `Input: "${str}"`,
      'explanation'
    );
    yield createEvent.highlight([1]);

    let maxStart = 0;
    let maxLen = 1;

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: chars.map((c, i) => ({ char: c, index: i })),
      },
    });

    yield createEvent.message(
      `Expanding around each center...`,
      'step'
    );
    yield createEvent.highlight([3, 4, 5, 6, 7]);

    for (let i = 0; i < n; i++) {
      yield createEvent.pointer(
        [{ index: i, label: 'center', color: 'var(--color-primary-500)' }],
        [
          { name: 'center', value: i },
          { name: 'maxLen', value: maxLen },
          { name: 'maxStart', value: maxStart },
        ]
      );

      // Odd length palindrome (single character center)
      const len1 = yield* expandAroundCenter(chars, i, i, 'odd');

      // Even length palindrome (between characters)
      const len2 = yield* expandAroundCenter(chars, i, i + 1, 'even');

      const len = Math.max(len1, len2);

      if (len > maxLen) {
        maxLen = len;
        maxStart = i - Math.floor((len - 1) / 2);

        yield createEvent.highlight([10, 11, 12]);
        yield createEvent.message(
          `New longest palindrome: "${str.substring(maxStart, maxStart + maxLen)}" (length ${maxLen})`,
          'info'
        );

        // Mark current best
        yield createEvent.auxiliary({
          type: 'string-chars',
          stringChars: {
            text: chars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx >= maxStart && idx < maxStart + maxLen ? 'found' : undefined,
            })),
          },
        });
      }
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([14]);

    // Mark final result
    for (let i = maxStart; i < maxStart + maxLen; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    const resultString = str.substring(maxStart, maxStart + maxLen);

    // Emit result event for output display
    yield createEvent.result('string', resultString, `Longest Palindrome: "${resultString}"`);

    yield createEvent.message(
      `Longest Palindromic Substring: "${resultString}" (length ${maxLen})`,
      'info'
    );
  },
};

function* expandAroundCenter(
  chars: string[],
  left: number,
  right: number,
  type: 'odd' | 'even'
): Generator<AlgoEvent, number, unknown> {
  const n = chars.length;

  if (right >= n) return 0;

  yield createEvent.message(
    `Trying ${type} palindrome at center ${type === 'odd' ? left : `${left}-${right}`}`,
    'explanation'
  );

  while (left >= 0 && right < n && chars[left] === chars[right]) {
    yield createEvent.compare([left, right], 'eq');

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: chars.map((c, idx) => ({
          char: c,
          index: idx,
          highlight: idx === left || idx === right ? 'match' :
            (idx > left && idx < right ? 'match' : undefined),
        })),
      },
    });

    yield createEvent.message(
      `'${chars[left]}' == '${chars[right]}' at [${left}, ${right}]`,
      'explanation'
    );

    left--;
    right++;
  }

  const length = right - left - 1;

  if (length > 1) {
    yield createEvent.message(
      `Found palindrome of length ${length}`,
      'explanation'
    );
  }

  return length;
}
