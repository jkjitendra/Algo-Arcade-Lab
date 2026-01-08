import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Stack Using Two Queues
 * 
 * Implements a stack (LIFO) using two queues (FIFO).
 * Uses costly push approach.
 * 
 * Time Complexity: O(n) for push, O(1) for pop
 * Space Complexity: O(n)
 */

type StackQueueOperation = 'push' | 'pop';

export const stackUsingTwoQueues: IAlgorithm<ArrayInput> = {
  id: 'stack-using-two-queues',
  name: 'Stack Using Two Queues',
  category: 'queues',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function push(element):',
    '  enqueue element to queue2',
    '  while queue1 is not empty:',
    '    dequeue from queue1, enqueue to queue2',
    '  swap queue1 and queue2',
    '  return success',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'push',
      options: [
        { value: 'push', label: 'Push' },
        { value: 'pop', label: 'Pop' },
      ],
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'pushValue',
      label: 'Value to Push',
      default: 99,
      min: 1,
      max: 100,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'push') as StackQueueOperation;
    const pushValue = (params?.pushValue || 99) as number;

    // Queue1 maintains stack order, Queue2 is auxiliary
    const queue1: number[] = [...input.values];
    const queue2: number[] = [];

    yield createEvent.message(
      `Stack Using Two Queues: ${operation.charAt(0).toUpperCase() + operation.slice(1)}`,
      'info',
      0
    );
    yield createEvent.message(
      `Queue1: [${queue1.join(', ') || 'empty'}] | Queue2: [${queue2.join(', ') || 'empty'}]`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: queue1,
        frontIndex: queue1.length > 0 ? 0 : -1,
        rearIndex: queue1.length > 0 ? queue1.length - 1 : -1,
        secondaryQueue1: [...queue1],
        secondaryQueue2: [...queue2],
      },
    });

    if (operation === 'push') {
      yield* runStackQueuePush(queue1, queue2, pushValue);
    } else {
      yield* runStackQueuePop(queue1, queue2);
    }
  },
};

function* runStackQueuePush(queue1: number[], queue2: number[], value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Pushing ${value}...`, 'step');
  yield createEvent.highlight([0, 1]);

  // Show animation of element entering Queue 2 from right
  yield createEvent.message(`Enqueueing ${value} to Queue2...`, 'explanation');
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue1,
      frontIndex: 0,
      rearIndex: queue1.length - 1,
      secondaryQueue1: [...queue1],
      secondaryQueue2: [...queue2],
      queueTransferElement: value,
      queueTransferDirection: 'enqueueQueue2',
      message: `Adding ${value} to Queue2...`,
    },
  });

  // Enqueue to queue2
  queue2.push(value);

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue1,
      frontIndex: 0,
      rearIndex: queue1.length - 1,
      secondaryQueue1: [...queue1],
      secondaryQueue2: [...queue2],
      message: `Added ${value} to Queue2`,
    },
  });

  yield createEvent.highlight([2, 3]);
  yield createEvent.message(`Transferring all elements from Queue1 → Queue2...`, 'explanation');

  // Transfer all from queue1 to queue2
  while (queue1.length > 0) {
    const elem = queue1.shift()!; // Remove element from Queue 1 FIRST

    // Show element removed from Queue 1 and now transferring to Queue 2
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: queue2,
        frontIndex: 0,
        rearIndex: queue2.length - 1,
        secondaryQueue1: [...queue1], // Queue 1 now WITHOUT the element
        secondaryQueue2: [...queue2], // Queue 2 not yet with the element
        queueTransferElement: elem,
        queueTransferDirection: 'queue1ToQueue2',
        message: `Transferring ${elem}...`,
      },
    });

    // Add element to Queue 2
    queue2.push(elem);
    yield createEvent.message(`Moved ${elem}: Queue1 → Queue2`, 'explanation');

    // Show final state after transfer
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: queue2,
        frontIndex: 0,
        rearIndex: queue2.length - 1,
        secondaryQueue1: [...queue1],
        secondaryQueue2: [...queue2], // Queue 2 now WITH the element
        message: `Transferred ${elem}`,
      },
    });
  }

  yield createEvent.highlight([4]);
  // Swap queues
  while (queue2.length > 0) {
    queue1.push(queue2.shift()!);
  }

  yield createEvent.message(`Swapped queues: Queue1 now has stack order`, 'explanation');
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue1,
      frontIndex: 0,
      rearIndex: queue1.length - 1,
      secondaryQueue1: [...queue1],
      secondaryQueue2: [...queue2],
      message: `Swap complete`,
    },
  });

  yield createEvent.highlight([5]);
  yield createEvent.message(`Pushed ${value}! Top is now ${queue1[0]}`, 'info');
  yield createEvent.result('string', `Pushed ${value}`, 'Added to stack');
}

function* runStackQueuePop(queue1: number[], queue2: number[]): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Popping from stack...`, 'step');

  if (queue1.length === 0) {
    yield createEvent.message(`Stack is empty!`, 'info');
    yield createEvent.result('string', 'Empty', 'No elements to pop');
    return;
  }

  // Simply dequeue from queue1 (front is top of stack)
  const element = queue1.shift()!;

  yield createEvent.message(`Popped ${element} from front of Queue1`, 'explanation');
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue1,
      frontIndex: queue1.length > 0 ? 0 : -1,
      rearIndex: queue1.length > 0 ? queue1.length - 1 : -1,
      secondaryQueue1: [...queue1],
      secondaryQueue2: [...queue2],
      message: `Popped ${element}`,
    },
  });

  yield createEvent.message(`Popped ${element}!`, 'info');
  yield createEvent.result('string', `Popped ${element}`, 'Removed from stack');
}
