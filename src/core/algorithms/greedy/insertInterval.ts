import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Insert Interval
 * 
 * Insert a new interval and merge if necessary
 * Greedy approach: Find position and merge overlapping intervals
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const insertInterval: IAlgorithm<ArrayInput> = {
  id: 'insert-interval',
  name: 'Insert Interval',
  category: 'greedy',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function insertInterval(intervals, newInterval):',
    '  result = []',
    '  i = 0',
    '',
    '  // Add all intervals that end before newInterval starts',
    '  while i < n and intervals[i].end < newInterval.start:',
    '    result.add(intervals[i])',
    '    i++',
    '',
    '  // Merge overlapping intervals with newInterval',
    '  while i < n and intervals[i].start <= newInterval.end:',
    '    newInterval.start = min(newInterval.start, intervals[i].start)',
    '    newInterval.end = max(newInterval.end, intervals[i].end)',
    '    i++',
    '',
    '  result.add(newInterval)',
    '',
    '  // Add remaining intervals',
    '  while i < n:',
    '    result.add(intervals[i])',
    '    i++',
    '',
    '  return result',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    { id: 'numIntervals', label: 'Number of Existing Intervals', type: 'number', min: 4, max: 7, default: 5 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const numIntervals = Number(params?.['numIntervals'] ?? 5);

    // Generate non-overlapping sorted intervals
    const intervals: { start: number; end: number }[] = [];
    let pos = 1;
    for (let i = 0; i < numIntervals; i++) {
      const start = pos + Math.floor(Math.random() * 3);
      const length = Math.floor(Math.random() * 3) + 1;
      intervals.push({ start, end: start + length });
      pos = start + length + 1 + Math.floor(Math.random() * 2);
    }

    // Generate new interval that will overlap with some
    const midPoint = Math.floor(intervals.length / 2);
    const newInterval = {
      start: intervals[midPoint].start - 1,
      end: intervals[midPoint].end + 2,
    };

    yield createEvent.message(`Inserting interval [${newInterval.start}, ${newInterval.end}]`, 'info');
    yield createEvent.highlight([0]);

    // Display intervals
    yield createEvent.pointer(
      [],
      [
        ...intervals.map((inv, i) => ({ name: `I${i + 1}`, value: `[${inv.start},${inv.end}]` })),
        { name: 'NEW', value: `[${newInterval.start},${newInterval.end}]`, highlight: true },
      ],
      'Intervals'
    );

    const result: typeof intervals = [];
    let i = 0;
    const mergedNew = { ...newInterval };

    // Phase 1: Add intervals that end before newInterval starts
    yield createEvent.message('Phase 1: Adding intervals before new interval', 'step');
    yield createEvent.highlight([4, 5, 6, 7]);

    while (i < intervals.length && intervals[i].end < newInterval.start) {
      result.push(intervals[i]);

      yield createEvent.message(`[${intervals[i].start}, ${intervals[i].end}] ends at ${intervals[i].end} < ${newInterval.start} → Add to result`, 'step');
      i++;
    }

    yield createEvent.pointer(
      [],
      [
        { name: 'result', value: result.map(inv => `[${inv.start},${inv.end}]`).join(' ') || 'empty' },
        { name: 'i', value: i },
      ]
    );

    // Phase 2: Merge overlapping intervals
    yield createEvent.message('Phase 2: Merging overlapping intervals', 'step');
    yield createEvent.highlight([9, 10, 11, 12, 13]);

    while (i < intervals.length && intervals[i].start <= mergedNew.end) {
      mergedNew.start = Math.min(mergedNew.start, intervals[i].start);
      mergedNew.end = Math.max(mergedNew.end, intervals[i].end);

      yield createEvent.message(
        `Merging [${intervals[i].start}, ${intervals[i].end}] → New interval becomes [${mergedNew.start}, ${mergedNew.end}]`,
        'step'
      );

      i++;
    }

    // Add merged interval
    result.push(mergedNew);
    yield createEvent.message(`Adding merged interval [${mergedNew.start}, ${mergedNew.end}]`, 'step');
    yield createEvent.highlight([15]);

    yield createEvent.pointer(
      [],
      [
        { name: 'merged', value: `[${mergedNew.start},${mergedNew.end}]`, highlight: true },
        { name: 'i', value: i },
      ]
    );

    // Phase 3: Add remaining intervals
    yield createEvent.message('Phase 3: Adding remaining intervals', 'step');
    yield createEvent.highlight([17, 18, 19, 20]);

    while (i < intervals.length) {
      result.push(intervals[i]);
      yield createEvent.message(`Adding [${intervals[i].start}, ${intervals[i].end}] to result`, 'step');
      i++;
    }

    yield createEvent.highlight([22]);
    const resultStr = result.map(inv => `[${inv.start},${inv.end}]`).join(', ');
    yield createEvent.message(`Result: ${resultStr}`, 'info');
    yield createEvent.result('string', `${result.length} intervals`, 'Insert Interval');
  },
};
