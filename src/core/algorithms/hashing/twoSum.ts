import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Two Sum (HashMap Approach)
 * 
 * Find two numbers in array that add up to target sum.
 * Uses HashMap to achieve O(n) time complexity.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

export const twoSumHashmap: IAlgorithm<ArrayInput> = {
  id: 'two-sum-hashmap',
  name: 'Two Sum (HashMap)',
  category: 'hashing',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function twoSum(nums, target):',
    '  hashMap = empty map',
    '  for i = 0 to nums.length - 1:',
    '    complement = target - nums[i]',
    '    if complement in hashMap:',
    '      return [hashMap[complement], i]',
    '    hashMap[nums[i]] = i',
    '  return NOT_FOUND',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'number',
      id: 'targetSum',
      label: 'Target Sum',
      default: 10,
      min: 0,
      max: 200,
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
    const targetSum = (params?.targetSum as number) ?? 10;
    const nums = input.values;

    yield createEvent.message(
      `Finding two numbers that sum to ${targetSum}`,
      'info',
      0
    );

    yield createEvent.highlight([0, 1]);

    // HashMap to store value -> index
    const hashMap: Map<number, number> = new Map();
    const hashMapDisplay: { key: number; value: number | string; highlight?: boolean }[] = [];

    yield createEvent.auxiliary({
      type: 'hashtable',
      hashTableState: {
        buckets: [],
        capacity: nums.length,
        size: 0,
        loadFactor: 0,
        hashMethod: 'division',
        hashMap: hashMapDisplay,
        message: 'Empty HashMap initialized',
      },
    });

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const complement = targetSum - num;

      yield createEvent.highlight([2, 3]);
      yield createEvent.mark([i], 'current');
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'num', value: num, highlight: true },
          { name: 'complement', value: complement },
          { name: 'target', value: targetSum },
        ],
        `complement = ${targetSum} - ${num} = ${complement}`
      );

      yield createEvent.message(
        `i=${i}: num=${num}, need complement=${complement}`,
        'step'
      );

      // Check if complement exists in hashMap
      yield createEvent.highlight([4, 5]);

      // Highlight the complement in hashMap if it exists
      const complementInMap = hashMap.has(complement);
      const updatedHashMapDisplay = hashMapDisplay.map(entry => ({
        ...entry,
        highlight: entry.key === complement,
      }));

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'searching',
        hashTableState: {
          buckets: [],
          capacity: nums.length,
          size: hashMap.size,
          loadFactor: hashMap.size / nums.length,
          hashMethod: 'division',
          hashMap: updatedHashMapDisplay,
          message: `Looking for ${complement} in HashMap...`,
        },
      });

      if (complementInMap) {
        const complementIndex = hashMap.get(complement)!;

        yield createEvent.message(
          `✓ Found! complement ${complement} at index ${complementIndex}`,
          'info'
        );

        yield createEvent.mark([complementIndex], 'sorted');
        yield createEvent.mark([i], 'sorted');

        yield createEvent.auxiliary({
          type: 'hashtable',
          phase: 'found',
          hashTableState: {
            buckets: [],
            capacity: nums.length,
            size: hashMap.size,
            loadFactor: hashMap.size / nums.length,
            hashMethod: 'division',
            hashMap: updatedHashMapDisplay,
            foundPair: [complementIndex, i],
            message: `Found pair! nums[${complementIndex}] + nums[${i}] = ${complement} + ${num} = ${targetSum}`,
          },
        });

        yield createEvent.result(
          'indices',
          [complementIndex, i],
          `Indices [${complementIndex}, ${i}] → values [${complement}, ${num}]`
        );

        return;
      }

      // Add current number to hashMap
      yield createEvent.highlight([6]);
      yield createEvent.message(
        `${complement} not found. Adding ${num} → ${i} to HashMap`,
        'explanation'
      );

      hashMap.set(num, i);
      hashMapDisplay.push({ key: num, value: i, highlight: true });

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'inserting',
        hashTableState: {
          buckets: [],
          capacity: nums.length,
          size: hashMap.size,
          loadFactor: hashMap.size / nums.length,
          hashMethod: 'division',
          hashMap: hashMapDisplay.map((entry, idx) => ({
            ...entry,
            highlight: idx === hashMapDisplay.length - 1,
          })),
          message: `Added: ${num} → index ${i}`,
        },
      });

      yield createEvent.mark([i], 'window');
    }

    // No pair found
    yield createEvent.highlight([7]);
    yield createEvent.message(
      `No two numbers sum to ${targetSum}`,
      'info'
    );

    yield createEvent.auxiliary({
      type: 'hashtable',
      phase: 'complete',
      hashTableState: {
        buckets: [],
        capacity: nums.length,
        size: hashMap.size,
        loadFactor: hashMap.size / nums.length,
        hashMethod: 'division',
        hashMap: hashMapDisplay.map(e => ({ ...e, highlight: false })),
        message: 'No valid pair found',
      },
    });

    yield createEvent.result(
      'string',
      'No solution',
      `No two numbers in array sum to ${targetSum}`
    );
  },
};
