import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Activity Selection Problem
 * 
 * Select maximum number of non-overlapping activities
 * Greedy choice: Always pick the activity that finishes earliest
 * 
 * Time Complexity: O(n log n) for sorting + O(n) for selection
 * Space Complexity: O(n) for storing activities
 */
export const activitySelection: IAlgorithm<ArrayInput> = {
  id: 'activity-selection',
  name: 'Activity Selection',
  category: 'greedy',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function activitySelection(activities):',
    '  // Sort activities by finish time',
    '  sort(activities, by = finish_time)',
    '',
    '  selected = [activities[0]]',
    '  lastFinish = activities[0].finish',
    '',
    '  for i = 1 to n-1:',
    '    if activities[i].start >= lastFinish:',
    '      selected.add(activities[i])',
    '      lastFinish = activities[i].finish',
    '',
    '  return selected',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    { id: 'numActivities', label: 'Number of Activities', type: 'number', min: 3, max: 10, default: 6 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const numActivities = Number(params?.['numActivities'] ?? 6);

    // Generate random activities with start and finish times
    const activities: { id: number; start: number; finish: number }[] = [];
    for (let i = 0; i < numActivities; i++) {
      const start = Math.floor(Math.random() * 20);
      const duration = Math.floor(Math.random() * 5) + 1;
      activities.push({ id: i + 1, start, finish: start + duration });
    }

    yield createEvent.message(`Generated ${numActivities} activities`, 'info');
    yield createEvent.highlight([0, 1]);

    // Display activities as finish times (the key sorting criterion)
    yield createEvent.set(0, activities.map(a => a.finish).join(','));
    yield createEvent.pointer(
      [],
      activities.map((a, i) => ({ name: `A${a.id}[${a.start}-${a.finish}]`, value: a.finish }))
    );

    // Sort by finish time
    yield createEvent.message('Sorting activities by finish time (greedy choice)', 'step');
    yield createEvent.highlight([2]);

    activities.sort((a, b) => a.finish - b.finish);

    yield createEvent.pointer(
      [],
      activities.map((a, i) => ({ name: `A${a.id}[${a.start}-${a.finish}]`, value: a.finish })),
      'Sorted by finish time'
    );

    // Select first activity
    const selected: typeof activities = [activities[0]];
    let lastFinish = activities[0].finish;

    yield createEvent.message(`Select A${activities[0].id} (first by finish time, ends at ${lastFinish})`, 'step');
    yield createEvent.highlight([4, 5]);

    yield createEvent.pointer(
      [],
      [
        { name: 'lastFinish', value: lastFinish },
        { name: 'selected', value: `A${activities[0].id}` },
      ]
    );

    // Iterate through remaining activities
    for (let i = 1; i < activities.length; i++) {
      const activity = activities[i];

      yield createEvent.message(`Checking A${activity.id}: start=${activity.start}, finish=${activity.finish}`, 'step');
      yield createEvent.highlight([7, 8]);

      if (activity.start >= lastFinish) {
        // Activity doesn't overlap - select it
        selected.push(activity);
        lastFinish = activity.finish;

        yield createEvent.message(`✓ A${activity.id} starts at ${activity.start} >= ${lastFinish - (activity.finish - activity.start)} → Selected!`, 'step');
        yield createEvent.highlight([9, 10]);
      } else {
        // Activity overlaps - reject it
        yield createEvent.message(`✗ A${activity.id} starts at ${activity.start} < ${lastFinish} → Rejected (overlaps)`, 'step');
      }

      yield createEvent.pointer(
        [],
        [
          { name: 'lastFinish', value: lastFinish },
          { name: 'selected', value: selected.length },
          { name: 'activities', value: selected.map(a => `A${a.id}`).join(',') },
        ]
      );
    }

    // Final result
    yield createEvent.highlight([12]);
    yield createEvent.message(
      `Maximum ${selected.length} non-overlapping activities: ${selected.map(a => `A${a.id}`).join(', ')}`,
      'info'
    );
    yield createEvent.result('string', `${selected.length} activities selected`, 'Activity Selection');
  },
};
