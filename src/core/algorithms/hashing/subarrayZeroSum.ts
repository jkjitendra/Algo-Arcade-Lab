import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Subarray with Zero Sum
 * 
 * Find if there exists a subarray with sum equal to 0.
 * Uses prefix sum + HashMap approach.
 * 
 * Key insight: If prefix sum at index i equals prefix sum at index j,
 * then sum of elements from i+1 to j is 0.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

export const subarrayZeroSum: IAlgorithm<ArrayInput> = {
  id: 'subarray-zero-sum',
  name: 'Subarray Zero Sum',
  category: 'hashing',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function hasZeroSumSubarray(arr):',
    '  prefixSum = 0',
    '  hashMap = {0: -1}  // sum=0 at index -1',
    '  for i = 0 to arr.length - 1:',
    '    prefixSum += arr[i]',
    '    if prefixSum in hashMap:',
    '      return [hashMap[prefixSum] + 1, i]',
    '    hashMap[prefixSum] = i',
    '  return NOT_FOUND',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = input.values;

    yield createEvent.message(
      `Finding subarray with sum = 0 in [${arr.join(', ')}]`,
      'info',
      0
    );

    yield createEvent.highlight([0, 1, 2]);

    // Initialize
    let prefixSum = 0;
    const hashMap: Map<number, number> = new Map();
    hashMap.set(0, -1); // Important: sum 0 at virtual index -1

    const prefixSumsDisplay: { index: number; sum: number; highlight?: boolean }[] = [];
    const hashMapDisplay: { key: number; value: number | string; highlight?: boolean }[] = [
      { key: 0, value: -1, highlight: false }
    ];

    yield createEvent.auxiliary({
      type: 'hashtable',
      hashTableState: {
        buckets: [],
        capacity: arr.length,
        size: 1,
        loadFactor: 0,
        hashMethod: 'division',
        prefixSums: prefixSumsDisplay,
        hashMap: hashMapDisplay,
        message: 'Initialized: prefixSum = 0, HashMap = {0: -1}',
      },
    });

    for (let i = 0; i < arr.length; i++) {
      yield createEvent.highlight([3, 4]);
      yield createEvent.mark([i], 'current');

      prefixSum += arr[i];

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'prefixSum', value: prefixSum },
        ],
        `prefixSum += ${arr[i]} → ${prefixSum}`
      );

      prefixSumsDisplay.push({ index: i, sum: prefixSum, highlight: true });

      yield createEvent.message(
        `i=${i}: prefixSum = ${prefixSum}`,
        'step'
      );

      // Check if this prefix sum was seen before
      yield createEvent.highlight([5, 6]);

      const existsInMap = hashMap.has(prefixSum);
      const updatedHashMapDisplay = hashMapDisplay.map(entry => ({
        ...entry,
        highlight: entry.key === prefixSum,
      }));

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'checking',
        hashTableState: {
          buckets: [],
          capacity: arr.length,
          size: hashMap.size,
          loadFactor: hashMap.size / arr.length,
          hashMethod: 'division',
          prefixSums: prefixSumsDisplay.map((ps, idx) => ({
            ...ps,
            highlight: idx === prefixSumsDisplay.length - 1,
          })),
          hashMap: updatedHashMapDisplay,
          message: `Is ${prefixSum} in HashMap?`,
        },
      });

      if (existsInMap) {
        const startIdx = hashMap.get(prefixSum)! + 1;
        const endIdx = i;

        yield createEvent.message(
          `✓ Found! prefixSum ${prefixSum} was seen at index ${hashMap.get(prefixSum)}`,
          'info'
        );

        // Highlight the zero-sum subarray
        for (let j = startIdx; j <= endIdx; j++) {
          yield createEvent.mark([j], 'sorted');
        }

        // Highlight matching prefix sums
        const matchingPrefixSums = prefixSumsDisplay.map(ps => ({
          ...ps,
          highlight: ps.sum === prefixSum,
        }));

        yield createEvent.auxiliary({
          type: 'hashtable',
          phase: 'found',
          hashTableState: {
            buckets: [],
            capacity: arr.length,
            size: hashMap.size,
            loadFactor: hashMap.size / arr.length,
            hashMethod: 'division',
            prefixSums: matchingPrefixSums,
            hashMap: updatedHashMapDisplay,
            message: `Zero sum subarray: indices [${startIdx}, ${endIdx}]`,
          },
        });

        const subarray = arr.slice(startIdx, endIdx + 1);
        yield createEvent.message(
          `Subarray [${subarray.join(', ')}] has sum = 0`,
          'info'
        );

        yield createEvent.result(
          'indices',
          [startIdx, endIdx],
          `Subarray [${startIdx}..${endIdx}] = [${subarray.join(', ')}], sum = 0`
        );

        return;
      }

      // Add current prefix sum to HashMap
      yield createEvent.highlight([7]);
      yield createEvent.message(
        `${prefixSum} not in HashMap. Adding ${prefixSum} → ${i}`,
        'explanation'
      );

      hashMap.set(prefixSum, i);
      hashMapDisplay.push({ key: prefixSum, value: i, highlight: true });

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'inserting',
        hashTableState: {
          buckets: [],
          capacity: arr.length,
          size: hashMap.size,
          loadFactor: hashMap.size / arr.length,
          hashMethod: 'division',
          prefixSums: prefixSumsDisplay.map(ps => ({ ...ps, highlight: false })),
          hashMap: hashMapDisplay.map((entry, idx) => ({
            ...entry,
            highlight: idx === hashMapDisplay.length - 1,
          })),
          message: `Added: ${prefixSum} → ${i}`,
        },
      });

      yield createEvent.mark([i], 'window');
    }

    // No zero-sum subarray found
    yield createEvent.highlight([8]);

    yield createEvent.auxiliary({
      type: 'hashtable',
      phase: 'complete',
      hashTableState: {
        buckets: [],
        capacity: arr.length,
        size: hashMap.size,
        loadFactor: hashMap.size / arr.length,
        hashMethod: 'division',
        prefixSums: prefixSumsDisplay.map(ps => ({ ...ps, highlight: false })),
        hashMap: hashMapDisplay.map(e => ({ ...e, highlight: false })),
        message: 'No zero-sum subarray found',
      },
    });

    yield createEvent.message(
      'No subarray with sum = 0 exists',
      'info'
    );

    yield createEvent.result(
      'string',
      'No zero-sum subarray',
      'All prefix sums are unique'
    );
  },
};
