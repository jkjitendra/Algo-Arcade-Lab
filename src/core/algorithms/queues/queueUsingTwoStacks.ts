import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Queue Using Two Stacks
 * 
 * Implements a queue using two stacks.
 * Stack1 for enqueue, Stack2 for dequeue.
 * 
 * Time Complexity: O(1) amortized for both operations
 * Space Complexity: O(n)
 */

type QueueStackOperation = 'enqueue' | 'dequeue';

const pseudocodeMap: Record<QueueStackOperation, string[]> = {
  'enqueue': [
    'function enqueue(element):',
    '  push element to stack1',
    '  // All enqueue goes to stack1',
    '  return success',
  ],
  'dequeue': [
    'function dequeue():',
    '  if stack2 is empty:',
    '    while stack1 is not empty:',
    '      pop from stack1, push to stack2',
    '  if stack2 is empty:',
    '    return "Queue Empty"',
    '  return pop from stack2',
  ],
};

export const queueUsingTwoStacks: IAlgorithm<ArrayInput> = {
  id: 'queue-using-two-stacks',
  name: 'Queue Using Two Stacks',
  category: 'queues',
  difficulty: 'intermediate',

  pseudocodeLines: pseudocodeMap['dequeue'],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(1) amortized',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'dequeue',
      options: [
        { value: 'enqueue', label: 'Enqueue' },
        { value: 'dequeue', label: 'Dequeue' },
      ],
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'enqueueValue',
      label: 'Value to Enqueue',
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
    const operation = (params?.operation || 'dequeue') as QueueStackOperation;
    const enqueueValue = (params?.enqueueValue || 99) as number;

    // Stack1 holds new enqueued elements, Stack2 holds elements ready for dequeue
    const stack1: number[] = [...input.values];
    const stack2: number[] = [];

    yield createEvent.message(
      `Queue Using Two Stacks: ${operation.charAt(0).toUpperCase() + operation.slice(1)}`,
      'info',
      0
    );
    yield createEvent.message(
      `Stack1 (input): [${stack1.join(', ') || 'empty'}] | Stack2 (output): [${stack2.join(', ') || 'empty'}]`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [...stack1, ...stack2.slice().reverse()],
        frontIndex: stack2.length > 0 ? 0 : (stack1.length > 0 ? 0 : -1),
        rearIndex: stack1.length + stack2.length - 1,
        secondaryStack1: [...stack1],
        secondaryStack2: [...stack2],
      },
    });

    if (operation === 'enqueue') {
      yield* runQueueStackEnqueue(stack1, stack2, enqueueValue);
    } else {
      yield* runQueueStackDequeue(stack1, stack2);
    }
  },
};

function* runQueueStackEnqueue(stack1: number[], stack2: number[], value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Enqueueing ${value}...`, 'step');
  yield createEvent.highlight([0, 1]);

  yield createEvent.message(`Note: Stack 2 is used only during Dequeue operations`, 'explanation');

  // Show current state before adding new element
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...stack1, ...stack2.slice().reverse()],
      frontIndex: 0,
      rearIndex: stack1.length + stack2.length - 1,
      secondaryStack1: [...stack1],
      secondaryStack2: [...stack2],
      message: `Stack 2 is used only during Dequeue`,
    },
  });

  yield createEvent.message(`Pushing ${value} to Stack1...`, 'explanation');

  // Show animation of element entering Stack 1 (element NOT in stack yet)
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...stack1, ...stack2.slice().reverse()],
      frontIndex: 0,
      rearIndex: stack1.length + stack2.length - 1,
      secondaryStack1: [...stack1], // Stack 1 still WITHOUT the new element
      secondaryStack2: [...stack2],
      animating: 'enqueue',
      animatingValue: value,
      message: `Adding ${value} to Stack1...`,
    },
  });

  // NOW add the element to stack1
  stack1.push(value);

  // Show final state with element pushed
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...stack1, ...stack2.slice().reverse()],
      frontIndex: 0,
      rearIndex: stack1.length + stack2.length - 1,
      secondaryStack1: [...stack1], // Now includes the new element
      secondaryStack2: [...stack2],
      message: `Pushed ${value} to Stack1`,
    },
  });

  yield createEvent.highlight([2, 3]);
  yield createEvent.message(`Successfully enqueued ${value}!`, 'info');
  yield createEvent.result('string', `Enqueued ${value}`, 'Added to Stack1');
}

function* runQueueStackDequeue(stack1: number[], stack2: number[]): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Dequeuing from queue...`, 'step');
  yield createEvent.highlight([0, 1]);

  // If stack2 is empty, transfer from stack1
  if (stack2.length === 0) {
    yield createEvent.message(`Stack2 is empty, need to transfer from Stack1...`, 'explanation');

    // Show current state before transfer
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [...stack1, ...stack2.slice().reverse()],
        frontIndex: 0,
        rearIndex: stack1.length + stack2.length - 1,
        secondaryStack1: [...stack1],
        secondaryStack2: [...stack2],
        message: `Stack1 has ${stack1.length} elements, Stack2 is empty`,
      },
    });

    yield createEvent.highlight([2, 3]);
    yield createEvent.message(`Starting transfer: Stack1 → Stack2`, 'explanation');

    while (stack1.length > 0) {
      const elem = stack1.pop()!;
      stack2.push(elem);

      yield createEvent.message(`Moving ${elem}: Stack1 → Stack2`, 'explanation');
      yield createEvent.auxiliary({
        type: 'queue',
        queueData: {
          elements: [...stack1, ...stack2.slice().reverse()],
          frontIndex: 0,
          rearIndex: stack1.length + stack2.length - 1,
          secondaryStack1: [...stack1],
          secondaryStack2: [...stack2],
          transferringElement: elem,
          transferDirection: 'stack1ToStack2',
          message: `Transferring ${elem}`,
        },
      });
    }

    yield createEvent.message(`Transfer complete! Stack2 now has elements in queue order`, 'explanation');
  }

  yield createEvent.highlight([4, 5]);
  if (stack2.length === 0) {
    yield createEvent.message(`Queue is empty!`, 'info');
    yield createEvent.result('string', 'Empty', 'No elements to dequeue');
    return;
  }

  yield createEvent.highlight([6]);
  const element = stack2.pop()!;

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...stack1, ...stack2.slice().reverse()],
      frontIndex: stack2.length > 0 ? 0 : (stack1.length > 0 ? 0 : -1),
      rearIndex: stack1.length + stack2.length - 1,
      secondaryStack1: [...stack1],
      secondaryStack2: [...stack2],
      message: `Dequeued ${element}`,
    },
  });

  yield createEvent.message(`Dequeued ${element} from Stack2`, 'info');
  yield createEvent.result('string', `Dequeued ${element}`, 'Removed FIFO order');
}
