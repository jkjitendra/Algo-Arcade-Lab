import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Count Distinct Elements in Window
 * 
 * For each sliding window of size k, count distinct elements.
 * Uses HashMap with frequency counts.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */

export const countDistinctWindow: IAlgorithm<ArrayInput> = {
  id: 'count-distinct-window',
  name: 'Count Distinct in Window',
  category: 'hashing',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function countDistinctInWindows(arr, k):',
    '  freqMap = empty map',
    '  distinct = 0',
    '  // Process first window',
    '  for i = 0 to k-1:',
    '    if arr[i] not in freqMap: distinct++',
    '    freqMap[arr[i]]++',
    '  result = [distinct]',
    '  // Slide window',
    '  for i = k to arr.length - 1:',
    '    // Remove leftmost element',
    '    if --freqMap[arr[i-k]] == 0: distinct--',
    '    // Add rightmost element',
    '    if arr[i] not in freqMap: distinct++',
    '    freqMap[arr[i]]++',
    '    result.append(distinct)',
    '  return result',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(k)',

  parameters: [
    {
      type: 'number',
      id: 'windowSize',
      label: 'Window Size (k)',
      default: 3,
      min: 2,
      max: 8,
      step: 1,
    },
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Need at least 2 elements' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const arr = input.values;
    const k = Math.min((params?.windowSize as number) || 3, arr.length);

    yield createEvent.message(
      `Counting distinct elements in sliding windows of size ${k}`,
      'info',
      0
    );

    yield createEvent.highlight([0, 1, 2]);

    const freqMap: Map<number, number> = new Map();
    let distinct = 0;
    const results: number[] = [];

    const getFrequencies = () =>
      Array.from(freqMap.entries()).map(([key, count]) => ({ key, count }));

    yield createEvent.auxiliary({
      type: 'hashtable',
      hashTableState: {
        buckets: [],
        capacity: arr.length,
        size: 0,
        loadFactor: 0,
        hashMethod: 'division',
        windowData: {
          start: 0,
          end: k - 1,
          distinctCount: 0,
          frequencies: [],
        },
        message: 'Initializing frequency map...',
      },
    });

    // Process first window
    yield createEvent.highlight([3, 4, 5, 6]);
    yield createEvent.message('Processing first window...', 'step');

    for (let i = 0; i < k; i++) {
      const elem = arr[i];

      yield createEvent.mark([i], 'current');

      if (!freqMap.has(elem)) {
        distinct++;
        yield createEvent.message(
          `New element ${elem} - distinct count: ${distinct}`,
          'explanation'
        );
      } else {
        yield createEvent.message(
          `Element ${elem} already seen`,
          'explanation'
        );
      }

      freqMap.set(elem, (freqMap.get(elem) || 0) + 1);

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'building',
        hashTableState: {
          buckets: [],
          capacity: arr.length,
          size: freqMap.size,
          loadFactor: freqMap.size / k,
          hashMethod: 'division',
          windowData: {
            start: 0,
            end: i,
            distinctCount: distinct,
            frequencies: getFrequencies(),
          },
          message: `Added ${elem}, freq[${elem}] = ${freqMap.get(elem)}`,
        },
      });

      yield createEvent.mark([i], 'window');
    }

    // First window result
    yield createEvent.highlight([7]);
    results.push(distinct);

    yield createEvent.message(
      `First window [0..${k - 1}]: ${distinct} distinct elements`,
      'info'
    );

    yield createEvent.auxiliary({
      type: 'hashtable',
      phase: 'result',
      hashTableState: {
        buckets: [],
        capacity: arr.length,
        size: freqMap.size,
        loadFactor: freqMap.size / k,
        hashMethod: 'division',
        windowData: {
          start: 0,
          end: k - 1,
          distinctCount: distinct,
          frequencies: getFrequencies(),
        },
        message: `Window [0..${k - 1}]: ${distinct} distinct`,
      },
    });

    // Slide window
    yield createEvent.highlight([8, 9]);

    for (let i = k; i < arr.length; i++) {
      const outElem = arr[i - k];
      const inElem = arr[i];
      const windowStart = i - k + 1;
      const windowEnd = i;

      yield createEvent.message(
        `Sliding window: remove ${outElem}, add ${inElem}`,
        'step'
      );

      // Remove outgoing element
      yield createEvent.highlight([10, 11]);
      yield createEvent.unmark([i - k]);

      const newFreqOut = freqMap.get(outElem)! - 1;
      if (newFreqOut === 0) {
        freqMap.delete(outElem);
        distinct--;
        yield createEvent.message(
          `Removed last ${outElem} - distinct count: ${distinct}`,
          'explanation'
        );
      } else {
        freqMap.set(outElem, newFreqOut);
        yield createEvent.message(
          `Decremented ${outElem} freq to ${newFreqOut}`,
          'explanation'
        );
      }

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'removing',
        hashTableState: {
          buckets: [],
          capacity: arr.length,
          size: freqMap.size,
          loadFactor: freqMap.size / k,
          hashMethod: 'division',
          windowData: {
            start: windowStart,
            end: windowEnd - 1,
            distinctCount: distinct,
            frequencies: getFrequencies(),
          },
          message: `Removed ${outElem} from window`,
        },
      });

      // Add incoming element
      yield createEvent.highlight([12, 13, 14]);
      yield createEvent.mark([i], 'current');

      if (!freqMap.has(inElem)) {
        distinct++;
        yield createEvent.message(
          `New element ${inElem} - distinct count: ${distinct}`,
          'explanation'
        );
      } else {
        yield createEvent.message(
          `Element ${inElem} already in window`,
          'explanation'
        );
      }

      freqMap.set(inElem, (freqMap.get(inElem) || 0) + 1);
      yield createEvent.mark([i], 'window');

      // Mark current window
      for (let j = windowStart; j <= windowEnd; j++) {
        yield createEvent.mark([j], 'window');
      }

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'adding',
        hashTableState: {
          buckets: [],
          capacity: arr.length,
          size: freqMap.size,
          loadFactor: freqMap.size / k,
          hashMethod: 'division',
          windowData: {
            start: windowStart,
            end: windowEnd,
            distinctCount: distinct,
            frequencies: getFrequencies(),
          },
          message: `Added ${inElem}, window [${windowStart}..${windowEnd}]: ${distinct} distinct`,
        },
      });

      // Record result
      yield createEvent.highlight([15]);
      results.push(distinct);

      yield createEvent.message(
        `Window [${windowStart}..${windowEnd}]: ${distinct} distinct elements`,
        'info'
      );
    }

    // Final summary
    yield createEvent.highlight([16]);

    yield createEvent.auxiliary({
      type: 'hashtable',
      phase: 'complete',
      hashTableState: {
        buckets: [],
        capacity: arr.length,
        size: freqMap.size,
        loadFactor: freqMap.size / k,
        hashMethod: 'division',
        windowData: {
          start: arr.length - k,
          end: arr.length - 1,
          distinctCount: distinct,
          frequencies: getFrequencies(),
        },
        message: `All windows processed. Results: [${results.join(', ')}]`,
      },
    });

    yield createEvent.message(
      `Distinct counts for each window: [${results.join(', ')}]`,
      'info'
    );

    yield createEvent.result(
      'string',
      `[${results.join(', ')}]`,
      `Distinct count for each of ${results.length} windows`
    );
  },
};
