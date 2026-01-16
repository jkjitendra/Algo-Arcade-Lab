import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Meeting Rooms Problem
 * 
 * Find minimum number of meeting rooms required
 * Greedy approach: Process by start time, use min-heap for end times
 * Alternative: Count overlapping intervals at any point
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export const meetingRooms: IAlgorithm<ArrayInput> = {
  id: 'meeting-rooms',
  name: 'Meeting Rooms',
  category: 'greedy',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function minMeetingRooms(intervals):',
    '  // Separate start and end times',
    '  starts = sort(all start times)',
    '  ends = sort(all end times)',
    '',
    '  rooms = 0, endPtr = 0',
    '',
    '  for each start in starts:',
    '    if start < ends[endPtr]:',
    '      rooms++     // Need new room',
    '    else:',
    '      endPtr++    // Reuse room',
    '',
    '  return rooms',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    { id: 'numMeetings', label: 'Number of Meetings', type: 'number', min: 4, max: 8, default: 5 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const numMeetings = Number(params?.['numMeetings'] ?? 5);

    // Generate random meeting intervals
    const meetings: { id: number; start: number; end: number }[] = [];
    for (let i = 0; i < numMeetings; i++) {
      const start = Math.floor(Math.random() * 12) + 8; // 8-19 (8am-7pm)
      const duration = Math.floor(Math.random() * 3) + 1; // 1-3 hours
      meetings.push({ id: i + 1, start, end: start + duration });
    }

    yield createEvent.message(`Generated ${numMeetings} meetings`, 'info');
    yield createEvent.highlight([0]);

    yield createEvent.pointer(
      [],
      meetings.map(m => ({ name: `M${m.id}`, value: `${m.start}-${m.end}` })),
      'Meeting intervals'
    );

    // Extract and sort start/end times
    const starts = meetings.map(m => ({ time: m.start, id: m.id })).sort((a, b) => a.time - b.time);
    const ends = meetings.map(m => m.end).sort((a, b) => a - b);

    yield createEvent.message('Separating and sorting start/end times', 'step');
    yield createEvent.highlight([1, 2, 3]);

    yield createEvent.pointer(
      [],
      [
        { name: 'starts', value: starts.map(s => s.time).join(',') },
        { name: 'ends', value: ends.join(',') },
      ]
    );

    // Two-pointer approach
    let rooms = 0;
    let maxRooms = 0;
    let endPtr = 0;

    yield createEvent.message('Processing meetings by start time', 'step');
    yield createEvent.highlight([5, 7]);

    for (let i = 0; i < starts.length; i++) {
      const currentStart = starts[i];

      yield createEvent.message(`Processing meeting M${currentStart.id} starting at ${currentStart.time}`, 'step');
      yield createEvent.highlight([7, 8]);

      if (currentStart.time < ends[endPtr]) {
        // Need a new room
        rooms++;
        maxRooms = Math.max(maxRooms, rooms);

        yield createEvent.message(`✓ Start ${currentStart.time} < End ${ends[endPtr]} → Need new room (Total: ${rooms})`, 'step');
        yield createEvent.highlight([9]);
      } else {
        // Reuse a room
        yield createEvent.message(`✓ Start ${currentStart.time} >= End ${ends[endPtr]} → Reuse room`, 'step');
        yield createEvent.highlight([10, 11]);

        endPtr++;
      }

      yield createEvent.pointer(
        [],
        [
          { name: 'currentRooms', value: rooms },
          { name: 'maxRooms', value: maxRooms, highlight: true },
          { name: 'endPtr', value: endPtr },
          { name: 'nextEnd', value: ends[endPtr] ?? 'done' },
        ]
      );
    }

    yield createEvent.highlight([13]);
    yield createEvent.message(`Minimum meeting rooms required: ${maxRooms}`, 'info');
    yield createEvent.result('string', `${maxRooms} rooms`, 'Meeting Rooms');
  },
};
