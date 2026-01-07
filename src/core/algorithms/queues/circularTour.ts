import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Circular Tour (Gas Station Problem)
 * 
 * Find starting point for circular tour of gas stations.
 * Uses queue-like traversal to find valid start.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

export const circularTour: IAlgorithm<ArrayInput> = {
  id: 'circular-tour',
  name: 'Circular Tour (Gas Station)',
  category: 'queues',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function canCompleteCircuit(petrol[], distance[]):',
    '  start = 0, curr_fuel = 0, total_fuel = 0',
    '  for i = 0 to n-1:',
    '    diff = petrol[i] - distance[i]',
    '    curr_fuel += diff',
    '    total_fuel += diff',
    '    if curr_fuel < 0:',
    '      start = i + 1  // Reset start',
    '      curr_fuel = 0',
    '  if total_fuel >= 0:',
    '    return start',
    '  return -1  // No solution',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2 || input.values.length % 2 !== 0) {
      return { ok: false, error: 'Need pairs of petrol and distance values' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    // Input format: [petrol1, distance1, petrol2, distance2, ...]
    const n = input.values.length / 2;
    const stations: { petrol: number; distance: number }[] = [];

    for (let i = 0; i < n; i++) {
      stations.push({
        petrol: input.values[i * 2],
        distance: input.values[i * 2 + 1],
      });
    }

    yield createEvent.message(`Finding starting point for circular tour`, 'info', 0);
    yield createEvent.message(`${n} stations: petrol/distance`, 'explanation');

    let start = 0;
    let currFuel = 0;
    let totalFuel = 0;

    yield createEvent.highlight([0, 1]);
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [],
        frontIndex: -1,
        rearIndex: -1,
        stations: [...stations],
        currentStation: 0,
        fuel: 0,
        startStation: 0,
      },
    });

    for (let i = 0; i < n; i++) {
      yield createEvent.highlight([2, 3]);
      const diff = stations[i].petrol - stations[i].distance;
      currFuel += diff;
      totalFuel += diff;

      yield createEvent.message(
        `Station ${i}: petrol=${stations[i].petrol}, dist=${stations[i].distance}, gain=${diff}`,
        'step'
      );
      yield createEvent.highlight([4, 5]);

      yield createEvent.auxiliary({
        type: 'queue',
        queueData: {
          elements: [],
          frontIndex: -1,
          rearIndex: -1,
          stations: [...stations],
          currentStation: i,
          fuel: currFuel,
          startStation: start,
          message: `Fuel after station ${i}: ${currFuel}`,
        },
      });

      if (currFuel < 0) {
        yield createEvent.highlight([6, 7, 8]);
        yield createEvent.message(`Fuel negative! Resetting start to ${i + 1}`, 'explanation');
        start = i + 1;
        currFuel = 0;

        yield createEvent.auxiliary({
          type: 'queue',
          queueData: {
            elements: [],
            frontIndex: -1,
            rearIndex: -1,
            stations: [...stations],
            currentStation: i,
            fuel: 0,
            startStation: start,
            message: `New start: station ${start}`,
          },
        });
      }
    }

    yield createEvent.highlight([9, 10, 11]);
    if (totalFuel >= 0) {
      yield createEvent.message(`Solution found! Start from station ${start}`, 'info');
      yield createEvent.auxiliary({
        type: 'queue',
        queueData: {
          elements: [],
          frontIndex: -1,
          rearIndex: -1,
          stations: [...stations],
          startStation: start,
          message: `✓ Start from station ${start}`,
        },
      });
      yield createEvent.result('string', `${start}`, `Start from station ${start}`);
    } else {
      yield createEvent.message(`No solution exists! Total fuel deficit`, 'info');
      yield createEvent.result('string', '-1', 'No valid starting point');
    }
  },
};
