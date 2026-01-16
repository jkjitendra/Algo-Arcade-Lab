import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Minimum Platforms Problem
 * 
 * Find minimum number of platforms required at a train station
 * Same as Meeting Rooms - count maximum overlapping intervals
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export const minimumPlatforms: IAlgorithm<ArrayInput> = {
  id: 'minimum-platforms',
  name: 'Minimum Platforms',
  category: 'greedy',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function minPlatforms(arrivals, departures):',
    '  sort(arrivals)',
    '  sort(departures)',
    '',
    '  platforms = 0, maxPlatforms = 0',
    '  i = 0, j = 0',
    '',
    '  while i < n:',
    '    if arrivals[i] <= departures[j]:',
    '      platforms++    // Train arrives',
    '      maxPlatforms = max(maxPlatforms, platforms)',
    '      i++',
    '    else:',
    '      platforms--    // Train departs',
    '      j++',
    '',
    '  return maxPlatforms',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    { id: 'numTrains', label: 'Number of Trains', type: 'number', min: 4, max: 8, default: 6 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const numTrains = Number(params?.['numTrains'] ?? 6);

    // Generate random train schedules (times in 24h format as numbers)
    const trains: { id: number; arrival: number; departure: number }[] = [];
    for (let i = 0; i < numTrains; i++) {
      const arrival = Math.floor(Math.random() * 12) + 6; // 6:00 - 17:00
      const stayDuration = Math.floor(Math.random() * 4) + 1; // 1-4 hours
      trains.push({
        id: i + 1,
        arrival,
        departure: arrival + stayDuration,
      });
    }

    yield createEvent.message(`Train station with ${numTrains} trains`, 'info');
    yield createEvent.highlight([0]);

    // Display trains
    yield createEvent.pointer(
      [],
      trains.map(t => ({ name: `T${t.id}`, value: `${t.arrival}-${t.departure}` })),
      'Train schedules (arrival-departure)'
    );

    // Extract and sort arrival/departure times
    const arrivals = trains.map(t => t.arrival).sort((a, b) => a - b);
    const departures = trains.map(t => t.departure).sort((a, b) => a - b);

    yield createEvent.message('Sorting arrival and departure times', 'step');
    yield createEvent.highlight([1, 2]);

    yield createEvent.pointer(
      [],
      [
        { name: 'arrivals', value: arrivals.join(',') },
        { name: 'departures', value: departures.join(',') },
      ]
    );

    // Two-pointer approach
    let platforms = 0;
    let maxPlatforms = 0;
    let i = 0;
    let j = 0;

    yield createEvent.message('Processing events chronologically', 'step');
    yield createEvent.highlight([4, 5]);

    while (i < numTrains) {
      yield createEvent.highlight([7, 8]);

      if (arrivals[i] <= departures[j]) {
        // Train arrives
        platforms++;
        maxPlatforms = Math.max(maxPlatforms, platforms);

        yield createEvent.message(
          `Train arrives at ${arrivals[i]}:00 → Platforms needed: ${platforms}`,
          'step'
        );
        yield createEvent.highlight([9, 10, 11]);

        i++;
      } else {
        // Train departs
        platforms--;

        yield createEvent.message(
          `Train departs at ${departures[j]}:00 → Platforms needed: ${platforms}`,
          'step'
        );
        yield createEvent.highlight([12, 13, 14]);

        j++;
      }

      yield createEvent.pointer(
        [],
        [
          { name: 'platforms', value: platforms },
          { name: 'maxPlatforms', value: maxPlatforms, highlight: true },
          { name: 'i (arrivals)', value: i },
          { name: 'j (departures)', value: j },
        ]
      );
    }

    // Process remaining departures
    while (j < numTrains) {
      platforms--;
      yield createEvent.message(`Train departs at ${departures[j]}:00 → Platforms: ${platforms}`, 'step');
      j++;
    }

    yield createEvent.highlight([16]);
    yield createEvent.message(`Minimum platforms required: ${maxPlatforms}`, 'info');
    yield createEvent.result('string', `${maxPlatforms} platforms`, 'Minimum Platforms');
  },
};
