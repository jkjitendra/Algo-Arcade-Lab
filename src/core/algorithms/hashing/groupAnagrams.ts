import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Group Anagrams
 * 
 * Group strings that are anagrams of each other.
 * Uses sorted string as hash key.
 * 
 * Time Complexity: O(n * k log k) where k is max string length
 * Space Complexity: O(n * k)
 */

// Define a custom input that includes strings
interface StringArrayInput extends ArrayInput {
  strings?: string[];
}

export const groupAnagrams: IAlgorithm<StringArrayInput> = {
  id: 'group-anagrams',
  name: 'Group Anagrams',
  category: 'hashing',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function groupAnagrams(strings):',
    '  hashMap = empty map',
    '  for each str in strings:',
    '    key = sort(str)  // sorted string as key',
    '    if key not in hashMap:',
    '      hashMap[key] = []',
    '    hashMap[key].append(str)',
    '  return values of hashMap',
  ],

  timeComplexity: {
    best: 'O(n × k log k)',
    average: 'O(n × k log k)',
    worst: 'O(n × k log k)',
  },

  spaceComplexity: 'O(n × k)',

  validate(input: StringArrayInput) {
    // Use values as character codes or string indices
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    return { ok: true };
  },

  *run(input: StringArrayInput): Generator<AlgoEvent, void, unknown> {
    // Demo strings for anagram grouping
    const demoStrings = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];

    // If input values provided, use them to select subset of demo strings
    const count = Math.min(input.values.length, demoStrings.length);
    const strings = demoStrings.slice(0, count);

    yield createEvent.message(
      `Grouping anagrams from ${strings.length} strings: [${strings.join(', ')}]`,
      'info',
      0
    );

    yield createEvent.highlight([0, 1]);

    const hashMap: Map<string, string[]> = new Map();
    const groupsDisplay: { key: string; items: string[]; highlight?: boolean }[] = [];

    yield createEvent.auxiliary({
      type: 'hashtable',
      hashTableState: {
        buckets: [],
        capacity: strings.length,
        size: 0,
        loadFactor: 0,
        hashMethod: 'division',
        groups: groupsDisplay,
        message: 'Empty HashMap initialized',
      },
    });

    for (let i = 0; i < strings.length; i++) {
      const str = strings[i];
      const sortedKey = str.split('').sort().join('');

      yield createEvent.highlight([2, 3]);
      yield createEvent.mark([i], 'current');

      yield createEvent.message(
        `Processing "${str}": sorted key = "${sortedKey}"`,
        'step'
      );

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'str', value: `"${str}"`, highlight: true },
          { name: 'key', value: `"${sortedKey}"` },
        ],
        `key = sort("${str}") = "${sortedKey}"`
      );

      // Check if key exists
      yield createEvent.highlight([4, 5, 6]);

      if (!hashMap.has(sortedKey)) {
        yield createEvent.message(
          `New key "${sortedKey}" - creating group`,
          'explanation'
        );
        hashMap.set(sortedKey, []);
        groupsDisplay.push({ key: sortedKey, items: [], highlight: true });
      }

      hashMap.get(sortedKey)!.push(str);

      // Update groups display
      const groupIdx = groupsDisplay.findIndex(g => g.key === sortedKey);
      groupsDisplay[groupIdx].items = [...hashMap.get(sortedKey)!];
      groupsDisplay[groupIdx].highlight = true;

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'grouping',
        hashTableState: {
          buckets: [],
          capacity: strings.length,
          size: hashMap.size,
          loadFactor: i / strings.length,
          hashMethod: 'division',
          groups: groupsDisplay.map((g, idx) => ({
            ...g,
            highlight: idx === groupIdx,
          })),
          message: `Added "${str}" to group "${sortedKey}"`,
        },
      });

      yield createEvent.message(
        `Added "${str}" to group [${hashMap.get(sortedKey)!.join(', ')}]`,
        'explanation'
      );

      yield createEvent.mark([i], 'sorted');
    }

    // Final result
    yield createEvent.highlight([7]);

    const result = Array.from(hashMap.values());

    yield createEvent.auxiliary({
      type: 'hashtable',
      phase: 'complete',
      hashTableState: {
        buckets: [],
        capacity: strings.length,
        size: hashMap.size,
        loadFactor: 1,
        hashMethod: 'division',
        groups: groupsDisplay.map(g => ({ ...g, highlight: false })),
        message: `Found ${hashMap.size} anagram groups`,
      },
    });

    yield createEvent.message(
      `Grouping complete: ${hashMap.size} groups found`,
      'info'
    );

    // Format result for display
    const resultStr = result.map(group => `[${group.join(', ')}]`).join(', ');

    yield createEvent.result(
      'string',
      `${hashMap.size} groups`,
      resultStr
    );
  },
};
