import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Merge Intervals
 * 
 * Merge all overlapping intervals
 * Greedy approach: Sort by start, merge with previous if overlapping
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export const mergeIntervals: IAlgorithm<ArrayInput> = {
  id: 'merge-intervals',
  name: 'Merge Intervals',
  category: 'greedy',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function mergeIntervals(intervals):',
    '  // Sort intervals by start time',
    '  sort(intervals, by = start)',
    '',
    '  merged = [intervals[0]]',
    '',
    '  for i = 1 to n-1:',
    '    lastMerged = merged[last]',
    '    current = intervals[i]',
    '',
    '    if current.start <= lastMerged.end:',
    '      // Overlapping - extend the end',
    '      lastMerged.end = max(lastMerged.end, current.end)',
    '    else:',
    '      // Non-overlapping - add new interval',
    '      merged.add(current)',
    '',
    '  return merged',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    { id: 'numIntervals', label: 'Number of Intervals', type: 'number', min: 4, max: 8, default: 6 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const numIntervals = Number(params?.['numIntervals'] ?? 6);

    // Generate random intervals with some overlaps
    const intervals: { id: number; start: number; end: number }[] = [];
    for (let i = 0; i < numIntervals; i++) {
      const start = Math.floor(Math.random() * 15) + 1;
      const length = Math.floor(Math.random() * 5) + 2;
      intervals.push({ id: i + 1, start, end: start + length });
    }

    yield createEvent.message(`Merging ${numIntervals} intervals`, 'info');
    yield createEvent.highlight([0]);

    // Display intervals
    yield createEvent.pointer(
      [],
      intervals.map(inv => ({ name: `I${inv.id}`, value: `[${inv.start},${inv.end}]` })),
      'Intervals'
    );

    // Sort by start time
    yield createEvent.message('Sorting intervals by start time', 'step');
    yield createEvent.highlight([1, 2]);

    intervals.sort((a, b) => a.start - b.start);

    yield createEvent.pointer(
      [],
      intervals.map(inv => ({ name: `I${inv.id}`, value: `[${inv.start},${inv.end}]` })),
      'Sorted by start'
    );

    // Initialize merged with first interval
    const merged: typeof intervals = [{ ...intervals[0] }];

    yield createEvent.message(`Start with first interval [${intervals[0].start}, ${intervals[0].end}]`, 'step');
    yield createEvent.highlight([4]);

    // Process remaining intervals
    for (let i = 1; i < intervals.length; i++) {
      const current = intervals[i];
      const lastMerged = merged[merged.length - 1];

      yield createEvent.message(`Checking interval [${current.start}, ${current.end}]`, 'step');
      yield createEvent.highlight([6, 7, 8]);

      yield createEvent.pointer(
        [],
        [
          { name: 'lastMerged', value: `[${lastMerged.start},${lastMerged.end}]` },
          { name: 'current', value: `[${current.start},${current.end}]` },
        ]
      );

      if (current.start <= lastMerged.end) {
        // Overlapping - merge
        const oldEnd = lastMerged.end;
        lastMerged.end = Math.max(lastMerged.end, current.end);

        yield createEvent.message(
          `✓ Overlapping! ${current.start} <= ${oldEnd} → Extend to [${lastMerged.start}, ${lastMerged.end}]`,
          'step'
        );
        yield createEvent.highlight([10, 11, 12]);
      } else {
        // Non-overlapping - add new
        merged.push({ ...current });

        yield createEvent.message(
          `✗ Non-overlapping: ${current.start} > ${lastMerged.end} → Add new interval`,
          'step'
        );
        yield createEvent.highlight([13, 14, 15]);
      }

      // Show current merged state
      yield createEvent.pointer(
        [],
        merged.map((inv, idx) => ({ name: `M${idx + 1}`, value: `[${inv.start},${inv.end}]` })),
        'Merged intervals'
      );
    }

    yield createEvent.highlight([17]);
    const result = merged.map(inv => `[${inv.start},${inv.end}]`).join(', ');
    yield createEvent.message(`Merged into ${merged.length} intervals: ${result}`, 'info');
    yield createEvent.result('string', `${merged.length} intervals`, 'Merge Intervals');
  },
};
