import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Generate Binary Numbers
 * 
 * Generate binary numbers from 1 to n using a queue.
 * Uses BFS-like generation by appending 0 and 1.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

export const generateBinaryNumbers: IAlgorithm<ArrayInput> = {
  id: 'generate-binary-numbers',
  name: 'Generate Binary Numbers',
  category: 'queues',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function generateBinary(n):',
    '  queue = []',
    '  result = []',
    '  queue.enqueue("1")',
    '  for i = 1 to n:',
    '    front = queue.dequeue()',
    '    result.add(front)',
    '    queue.enqueue(front + "0")',
    '    queue.enqueue(front + "1")',
    '  return result',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'number',
      id: 'count',
      label: 'Generate 1 to N',
      default: 10,
      min: 1,
      max: 20,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const n = (params?.count || 10) as number;
    const queue: string[] = [];
    const result: string[] = [];

    yield createEvent.message(`Generating binary numbers from 1 to ${n}`, 'info', 0);
    yield createEvent.highlight([0, 1, 2]);

    // Start with "1"
    queue.push("1");
    yield createEvent.highlight([3]);
    yield createEvent.message(`Starting queue with "1"`, 'explanation');

    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: queue,
        frontIndex: 0,
        rearIndex: 0,
        generatedNumbers: [...result],
      },
    });

    for (let i = 1; i <= n; i++) {
      yield createEvent.highlight([4, 5]);
      const front = queue.shift()!;
      result.push(front);

      yield createEvent.message(`Step ${i}: Dequeued "${front}"`, 'step');

      yield createEvent.highlight([6]);
      yield createEvent.message(`Added "${front}" to result`, 'explanation');

      yield createEvent.highlight([7, 8]);
      queue.push(front + "0");
      queue.push(front + "1");
      yield createEvent.message(`Enqueued "${front}0" and "${front}1"`, 'explanation');

      yield createEvent.auxiliary({
        type: 'queue',
        queueData: {
          elements: queue,
          frontIndex: queue.length > 0 ? 0 : -1,
          rearIndex: queue.length > 0 ? queue.length - 1 : -1,
          generatedNumbers: [...result],
          message: `Generated: ${front}`,
        },
      });
    }

    yield createEvent.highlight([9]);
    yield createEvent.message(`Generated ${n} binary numbers: [${result.join(', ')}]`, 'info');
    yield createEvent.result('string', result.join(', '), 'Binary numbers 1 to ' + n);
  },
};
