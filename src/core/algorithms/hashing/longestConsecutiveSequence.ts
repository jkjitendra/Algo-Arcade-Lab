import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Longest Consecutive Sequence
 * 
 * Find the length of the longest consecutive elements sequence.
 * Uses HashSet to achieve O(n) time complexity.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

export const longestConsecutiveSequence: IAlgorithm<ArrayInput> = {
  id: 'longest-consecutive-sequence',
  name: 'Longest Consecutive Sequence',
  category: 'hashing',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function longestConsecutive(nums):',
    '  numSet = HashSet(nums)',
    '  longest = 0',
    '  for num in nums:',
    '    if (num - 1) not in numSet:  // is start of sequence',
    '      length = 1',
    '      while (num + length) in numSet:',
    '        length++',
    '      longest = max(longest, length)',
    '  return longest',
  ],

  timeComplexity: {
    best: 'O(n)',
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
    if (input.values.length > 20) {
      return { ok: false, error: 'Array size must be 20 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const nums = input.values;

    yield createEvent.message(
      `Finding longest consecutive sequence in [${nums.join(', ')}]`,
      'info',
      0
    );

    yield createEvent.highlight([0, 1]);

    // Create HashSet
    const numSet = new Set(nums);
    const sequenceDisplay: { value: number; inSequence: boolean; isStart?: boolean }[] =
      nums.map(n => ({ value: n, inSequence: false }));

    yield createEvent.auxiliary({
      type: 'hashtable',
      hashTableState: {
        buckets: [],
        capacity: nums.length,
        size: numSet.size,
        loadFactor: 1,
        hashMethod: 'division',
        sequence: sequenceDisplay,
        message: `Created HashSet with ${numSet.size} unique elements`,
      },
    });

    yield createEvent.highlight([2]);
    let longest = 0;
    let longestStart = -1;

    yield createEvent.message('HashSet created. Finding sequence starts...', 'step');

    // Find sequences
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];

      yield createEvent.highlight([3, 4]);
      yield createEvent.mark([i], 'current');

      // Check if this is a sequence start (num - 1 not in set)
      const isStart = !numSet.has(num - 1);

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'num', value: num, highlight: true },
          { name: 'num-1', value: num - 1 },
          { name: 'isStart', value: isStart ? 'Yes' : 'No' },
        ],
        `${num - 1} in set? ${numSet.has(num - 1) ? 'Yes (skip)' : 'No (start)'}`
      );

      if (!isStart) {
        yield createEvent.message(
          `${num}: ${num - 1} exists in set - not a sequence start, skipping`,
          'explanation'
        );
        yield createEvent.mark([i], 'window');
        continue;
      }

      yield createEvent.message(
        `${num}: ${num - 1} NOT in set - this is a sequence start!`,
        'step'
      );

      // Mark as sequence start in display
      const startIdx = sequenceDisplay.findIndex(s => s.value === num);
      if (startIdx >= 0) {
        sequenceDisplay[startIdx].isStart = true;
        sequenceDisplay[startIdx].inSequence = true;
      }

      // Count sequence length
      yield createEvent.highlight([5, 6, 7]);
      let length = 1;
      let current = num;

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'counting',
        hashTableState: {
          buckets: [],
          capacity: nums.length,
          size: numSet.size,
          loadFactor: 1,
          hashMethod: 'division',
          sequence: sequenceDisplay,
          longestLength: longest,
          message: `Counting sequence starting at ${num}...`,
        },
      });

      while (numSet.has(current + 1)) {
        length++;
        current++;

        // Mark current in sequence
        const currIdx = sequenceDisplay.findIndex(s => s.value === current);
        if (currIdx >= 0) {
          sequenceDisplay[currIdx].inSequence = true;
        }

        yield createEvent.message(
          `Found ${current} in set, length = ${length}`,
          'explanation'
        );

        yield createEvent.auxiliary({
          type: 'hashtable',
          phase: 'extending',
          hashTableState: {
            buckets: [],
            capacity: nums.length,
            size: numSet.size,
            loadFactor: 1,
            hashMethod: 'division',
            sequence: sequenceDisplay,
            longestLength: longest,
            message: `Sequence: ${num} to ${current}, length = ${length}`,
          },
        });
      }

      yield createEvent.message(
        `Sequence [${num}...${current}] has length ${length}`,
        'step'
      );

      // Update longest if needed
      yield createEvent.highlight([8]);
      if (length > longest) {
        longest = length;
        longestStart = num;

        yield createEvent.message(
          `New longest! ${length} > previous ${longest - length}`,
          'info'
        );
      }

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'comparing',
        hashTableState: {
          buckets: [],
          capacity: nums.length,
          size: numSet.size,
          loadFactor: 1,
          hashMethod: 'division',
          sequence: sequenceDisplay,
          longestLength: longest,
          message: `Current longest = ${longest}`,
        },
      });

      // Reset sequence display for next iteration (keep longest marked)
      if (length < longest) {
        for (const s of sequenceDisplay) {
          if (s.value >= num && s.value <= current) {
            s.inSequence = false;
            s.isStart = false;
          }
        }
      }

      yield createEvent.mark([i], 'sorted');
    }

    // Final result - highlight the longest sequence
    const finalSequence = sequenceDisplay.map(s => {
      if (longestStart !== -1 && s.value >= longestStart && s.value < longestStart + longest) {
        return { ...s, inSequence: true, isStart: s.value === longestStart };
      }
      return { ...s, inSequence: false, isStart: false };
    });

    yield createEvent.highlight([9]);

    yield createEvent.auxiliary({
      type: 'hashtable',
      phase: 'complete',
      hashTableState: {
        buckets: [],
        capacity: nums.length,
        size: numSet.size,
        loadFactor: 1,
        hashMethod: 'division',
        sequence: finalSequence,
        longestLength: longest,
        message: `Longest consecutive sequence: ${longest} elements`,
      },
    });

    yield createEvent.message(
      `Longest consecutive sequence has length ${longest}`,
      'info'
    );

    const longestSequenceStr = longestStart !== -1
      ? `[${Array.from({ length: longest }, (_, i) => longestStart + i).join(', ')}]`
      : 'None';

    yield createEvent.result(
      'string',
      `Length: ${longest}`,
      `Sequence: ${longestSequenceStr}`
    );
  },
};
