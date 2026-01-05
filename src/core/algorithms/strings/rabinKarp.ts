import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Rabin-Karp Algorithm
 * 
 * Pattern matching using rolling hash for efficient comparison.
 * 
 * Time Complexity: O(n + m) average, O(n × m) worst case
 * Space Complexity: O(1)
 */
export const rabinKarp: IAlgorithm<ArrayInput> = {
  id: 'rabin-karp',
  name: 'Rabin-Karp Algorithm',
  category: 'strings',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function rabinKarp(text, pattern):',
    '  base = 256, mod = 101',
    '  pHash = hash(pattern)',
    '  tHash = hash(text[0..m-1])',
    '',
    '  for i = 0 to n - m:',
    '    if pHash == tHash:',
    '      if verify(text[i..i+m-1], pattern):',
    '        found at i',
    '',
    '    // Rolling hash',
    '    if i < n - m:',
    '      tHash = roll(tHash, text[i], text[i+m])',
  ],

  timeComplexity: {
    best: 'O(n + m)',
    average: 'O(n + m)',
    worst: 'O(n × m)',
  },

  spaceComplexity: 'O(1)',

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
    if (input.values.length > 20) {
      return { ok: false, error: 'Text length must be 20 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const patternStr = ((params?.pattern as string) || 'AB').toUpperCase();
    const arr = [...input.values];
    const n = arr.length;
    const textChars = arr.map(v => String.fromCharCode(v));
    const text = textChars.join('');
    const patternChars = patternStr.split('');
    const m = patternChars.length;

    const BASE = 31;  // Prime base
    const MOD = 1000000007;  // Large prime modulus

    yield createEvent.message(
      `Rabin-Karp Algorithm (Rolling Hash)`,
      'info',
      0
    );
    yield createEvent.message(
      `Text: "${text}" | Pattern: "${patternStr}"`,
      'explanation'
    );
    yield createEvent.highlight([1]);

    yield createEvent.message(
      `Using base=${BASE}, mod=${MOD} for hash computation`,
      'explanation'
    );

    // Compute pattern hash
    let patternHash = 0;
    let h = 1;  // BASE^(m-1) for rolling hash

    for (let i = 0; i < m - 1; i++) {
      h = (h * BASE) % MOD;
    }

    for (let i = 0; i < m; i++) {
      patternHash = (patternHash * BASE + patternChars[i].charCodeAt(0)) % MOD;
    }

    yield createEvent.highlight([2]);
    yield createEvent.message(
      `Pattern hash("${patternStr}") = ${patternHash}`,
      'step'
    );

    // Compute initial text window hash
    let textHash = 0;
    for (let i = 0; i < m; i++) {
      textHash = (textHash * BASE + textChars[i].charCodeAt(0)) % MOD;
    }

    yield createEvent.highlight([3]);
    yield createEvent.message(
      `Initial window hash("${text.substring(0, m)}") = ${textHash}`,
      'step'
    );

    const matches: number[] = [];

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: textChars.map((c, i) => ({ char: c, index: i })),
        pattern: patternChars.map((c, i) => ({ char: c, index: i })),
        patternOffset: 0,
        matchPositions: [],
      },
      hashState: {
        textHash,
        patternHash,
        windowStart: 0,
        windowEnd: m - 1,
        base: BASE,
        modulo: MOD,
        isMatch: textHash === patternHash,
      },
    });

    yield createEvent.highlight([5, 6, 7, 8]);
    yield createEvent.message(
      `Sliding window and comparing hashes...`,
      'step'
    );

    for (let i = 0; i <= n - m; i++) {
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'window', value: `[${i}..${i + m - 1}]` },
          { name: 'textHash', value: textHash, highlight: true },
          { name: 'patternHash', value: patternHash },
        ],
        `hash("${text.substring(i, i + m)}") = ${textHash}`
      );

      yield createEvent.auxiliary({
        type: 'string-chars',
        stringChars: {
          text: textChars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx >= i && idx < i + m ? 'current' :
              (matches.some(mPos => idx >= mPos && idx < mPos + m) ? 'found' : undefined),
          })),
          pattern: patternChars.map((c, idx) => ({ char: c, index: idx })),
          patternOffset: i,
          matchPositions: matches,
        },
        hashState: {
          textHash,
          patternHash,
          windowStart: i,
          windowEnd: i + m - 1,
          base: BASE,
          modulo: MOD,
          isMatch: textHash === patternHash,
        },
      });

      // Check if hashes match
      if (textHash === patternHash) {
        yield createEvent.message(
          `Hash match! Verifying characters...`,
          'explanation'
        );

        // Verify character by character
        let match = true;
        for (let j = 0; j < m; j++) {
          yield createEvent.compare([i + j, j]);
          if (textChars[i + j] !== patternChars[j]) {
            match = false;
            yield createEvent.message(
              `Spurious hit: '${textChars[i + j]}' ≠ '${patternChars[j]}' (hash collision)`,
              'explanation'
            );
            break;
          }
        }

        if (match) {
          matches.push(i);
          yield createEvent.message(
            `Match confirmed at position ${i}!`,
            'info'
          );

          for (let k = i; k < i + m; k++) {
            yield createEvent.mark([k], 'sorted');
          }
        }
      } else {
        yield createEvent.message(
          `Hash mismatch: ${textHash} ≠ ${patternHash}`,
          'explanation'
        );
      }

      // Rolling hash for next window
      if (i < n - m) {
        const oldChar = textChars[i].charCodeAt(0);
        const newChar = textChars[i + m].charCodeAt(0);

        // Remove leftmost, add rightmost
        textHash = ((textHash - oldChar * h) % MOD + MOD) % MOD;
        textHash = (textHash * BASE + newChar) % MOD;

        yield createEvent.highlight([11, 12]);
        yield createEvent.message(
          `Rolling hash: remove '${textChars[i]}', add '${textChars[i + m]}' → ${textHash}`,
          'explanation'
        );
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
