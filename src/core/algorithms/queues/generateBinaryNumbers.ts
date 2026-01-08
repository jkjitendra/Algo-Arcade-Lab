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

// Helper to calculate level from binary string
function getLevel(binary: string): number {
  return binary.length;
}

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

    // Track all tree nodes for visualization
    const treeNodes: Map<string, { value: string; level: number; processed: boolean }> = new Map();

    yield createEvent.message(`Generating binary numbers from 1 to ${n}`, 'info', 0);
    yield createEvent.highlight([0, 1, 2]);

    // Start with "1"
    queue.push("1");
    treeNodes.set("1", { value: "1", level: 1, processed: false });

    yield createEvent.highlight([3]);
    yield createEvent.message(`Starting queue with "1"`, 'explanation');

    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [...queue],
        frontIndex: 0,
        rearIndex: 0,
        generatedNumbers: [...result],
        binaryTreeNodes: Array.from(treeNodes.values()),
      },
    });

    for (let i = 1; i <= n; i++) {
      yield createEvent.highlight([4, 5]);
      const front = queue.shift()!;
      result.push(front);

      // Mark as processed in tree
      const node = treeNodes.get(front);
      if (node) node.processed = true;

      yield createEvent.message(`Step ${i}: Dequeued "${front}"`, 'step');

      yield createEvent.highlight([6]);
      yield createEvent.message(`Added "${front}" to result`, 'explanation');

      yield createEvent.highlight([7, 8]);
      const child0 = front + "0";
      const child1 = front + "1";
      queue.push(child0);
      queue.push(child1);

      // Add children to tree
      treeNodes.set(child0, { value: child0, level: getLevel(child0), processed: false });
      treeNodes.set(child1, { value: child1, level: getLevel(child1), processed: false });

      yield createEvent.message(`Enqueued "${child0}" and "${child1}"`, 'explanation');

      yield createEvent.auxiliary({
        type: 'queue',
        queueData: {
          elements: [...queue],
          frontIndex: queue.length > 0 ? 0 : -1,
          rearIndex: queue.length > 0 ? queue.length - 1 : -1,
          generatedNumbers: [...result],
          binaryTreeNodes: Array.from(treeNodes.values()),
          message: `Generated: ${front}`,
        },
      });
    }

    yield createEvent.highlight([9]);
    yield createEvent.message(`Generated ${n} binary numbers: [${result.join(', ')}]`, 'info');
    yield createEvent.result('string', result.join(', '), 'Binary numbers 1 to ' + n);
  },
};
