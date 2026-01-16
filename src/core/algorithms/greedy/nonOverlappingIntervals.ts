import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Non-overlapping Intervals
 * 
 * Find minimum number of intervals to remove for non-overlapping set
 * Greedy choice: Keep interval with earliest end time (same as Activity Selection)
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
export const nonOverlappingIntervals: IAlgorithm<ArrayInput> = {
  id: 'non-overlapping-intervals',
  name: 'Non-overlapping Intervals',
  category: 'greedy',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function eraseOverlapIntervals(intervals):',
    '  // Sort by end time (greedy choice)',
    '  sort(intervals, by = end)',
    '',
    '  removals = 0',
    '  prevEnd = intervals[0].end',
    '',
    '  for i = 1 to n-1:',
    '    if intervals[i].start < prevEnd:',
    '      // Overlapping - remove current (has later end)',
    '      removals++',
    '    else:',
    '      // Non-overlapping - update prevEnd',
    '      prevEnd = intervals[i].end',
    '',
    '  return removals',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    { id: 'numIntervals', label: 'Number of Intervals', type: 'number', min: 5, max: 10, default: 7 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const numIntervals = Number(params?.['numIntervals'] ?? 7);

    // Generate intervals with some overlaps
    const intervals: { id: number; start: number; end: number }[] = [];
    for (let i = 0; i < numIntervals; i++) {
      const start = Math.floor(Math.random() * 15) + 1;
      const length = Math.floor(Math.random() * 5) + 2;
      intervals.push({ id: i + 1, start, end: start + length });
    }

    yield createEvent.message(`Finding minimum removals for ${numIntervals} intervals`, 'info');
    yield createEvent.highlight([0]);

    // Display intervals
    yield createEvent.pointer(
      [],
      intervals.map(inv => ({ name: `I${inv.id}`, value: `[${inv.start},${inv.end}]` })),
      'Intervals'
    );

    // Sort by end time
    yield createEvent.message('Sorting intervals by end time (greedy choice)', 'step');
    yield createEvent.highlight([1, 2]);

    intervals.sort((a, b) => a.end - b.end);

    yield createEvent.pointer(
      [],
      intervals.map(inv => ({ name: `I${inv.id}`, value: `[${inv.start},${inv.end}]` })),
      'Sorted by end time'
    );

    // Greedy selection
    let removals = 0;
    let prevEnd = intervals[0].end;
    const kept: number[] = [intervals[0].id];

    yield createEvent.message(`Keep first interval [${intervals[0].start}, ${intervals[0].end}]`, 'step');
    yield createEvent.highlight([4, 5]);

    yield createEvent.pointer(
      [],
      [
        { name: 'prevEnd', value: prevEnd },
        { name: 'kept', value: kept.join(',') },
        { name: 'removals', value: removals },
      ]
    );

    for (let i = 1; i < intervals.length; i++) {
      const current = intervals[i];

      yield createEvent.message(`Checking [${current.start}, ${current.end}]`, 'step');
      yield createEvent.highlight([7, 8]);

      if (current.start < prevEnd) {
        // Overlapping - remove
        removals++;

        yield createEvent.message(
          `✗ Overlapping: ${current.start} < ${prevEnd} → Remove interval`,
          'step'
        );
        yield createEvent.highlight([9, 10]);
      } else {
        // Non-overlapping - keep
        prevEnd = current.end;
        kept.push(current.id);

        yield createEvent.message(
          `✓ Non-overlapping: ${current.start} >= ${prevEnd - (current.end - current.start)} → Keep interval`,
          'step'
        );
        yield createEvent.highlight([11, 12, 13]);
      }

      yield createEvent.pointer(
        [],
        [
          { name: 'prevEnd', value: prevEnd },
          { name: 'kept', value: kept.length },
          { name: 'removals', value: removals, highlight: true },
        ]
      );
    }

    yield createEvent.highlight([15]);
    yield createEvent.message(
      `Minimum removals: ${removals} (kept ${kept.length} intervals)`,
      'info'
    );
    yield createEvent.result('string', `${removals} removals`, 'Non-overlapping Intervals');
  },
};
