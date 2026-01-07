import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Priority Queue Algorithm
 * 
 * Queue where elements have priorities.
 * Dequeue returns highest priority element.
 * 
 * Time Complexity: O(n) for insert (sorted), O(1) for dequeue
 * Space Complexity: O(n)
 */

type PriorityQueueOperation = 'enqueue' | 'dequeue' | 'peek';

const pseudocodeMap: Record<PriorityQueueOperation, string[]> = {
  'enqueue': [
    'function enqueue(pq, element, priority):',
    '  create node with (element, priority)',
    '  find correct position based on priority',
    '  insert node at position',
    '  // Higher priority = served first',
    '  return success',
  ],
  'dequeue': [
    'function dequeue(pq):',
    '  if isEmpty():',
    '    return "Empty"',
    '  element = pq[0]  // Highest priority',
    '  remove pq[0]',
    '  return element',
  ],
  'peek': [
    'function peek(pq):',
    '  if isEmpty():',
    '    return "Empty"',
    '  return pq[0]  // Highest priority',
  ],
};

export const priorityQueue: IAlgorithm<ArrayInput> = {
  id: 'priority-queue',
  name: 'Priority Queue',
  category: 'queues',
  difficulty: 'intermediate',

  pseudocodeLines: pseudocodeMap['enqueue'],

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
      default: 'enqueue',
      options: [
        { value: 'enqueue', label: 'Enqueue with Priority' },
        { value: 'dequeue', label: 'Dequeue (removes highest)' },
        { value: 'peek', label: 'Peek (views highest)' },
      ],
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'enqueueValue',
      label: 'Value to Enqueue',
      default: 60,
      min: 1,
      max: 100,
      dependsOn: { parameterId: 'operation', values: ['enqueue'] },
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'priority',
      label: 'Priority (higher = first)',
      default: 5,
      min: 1,
      max: 10,
      dependsOn: { parameterId: 'operation', values: ['enqueue'] },
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'enqueue') as PriorityQueueOperation;
    const enqueueValue = (params?.enqueueValue || 60) as number;
    const priority = (params?.priority || 5) as number;

    // Initialize with input values and random priorities
    const elements: { value: number; priority: number }[] = input.values.map((v, i) => ({
      value: v,
      priority: (input.values.length - i) // Decreasing priorities
    }));

    // Sort by priority (descending - higher priority first)
    elements.sort((a, b) => b.priority - a.priority);

    yield createEvent.message(
      `Priority Queue Operation: ${operation.charAt(0).toUpperCase() + operation.slice(1)}`,
      'info',
      0
    );
    yield createEvent.message(
      `Initial Queue: ${elements.length} elements (sorted by priority)`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: elements.map(e => e.value),
        frontIndex: elements.length > 0 ? 0 : -1,
        rearIndex: elements.length > 0 ? elements.length - 1 : -1,
        priorities: elements.map(e => e.priority),
      },
    });

    if (operation === 'enqueue') {
      yield* runPriorityEnqueue(elements, enqueueValue, priority);
    } else if (operation === 'dequeue') {
      yield* runPriorityDequeue(elements);
    } else if (operation === 'peek') {
      yield* runPriorityPeek(elements);
    }
  },
};

function* runPriorityEnqueue(
  elements: { value: number; priority: number }[],
  value: number,
  priority: number
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Enqueueing ${value} with priority ${priority}...`, 'step');
  yield createEvent.highlight([0, 1]);

  yield createEvent.message(`Creating node: (value=${value}, priority=${priority})`, 'explanation');
  yield createEvent.highlight([2]);

  // Find position to insert (maintain sorted order by priority)
  let insertPos = 0;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].priority < priority) {
      insertPos = i;
      break;
    }
    insertPos = i + 1;
  }

  yield createEvent.message(`Finding position: Insert at index ${insertPos}`, 'explanation');
  yield createEvent.highlight([3]);

  // Insert at position
  elements.splice(insertPos, 0, { value, priority });

  yield createEvent.highlight([4, 5]);
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: elements.map(e => e.value),
      frontIndex: 0,
      rearIndex: elements.length - 1,
      priorities: elements.map(e => e.priority),
      highlight: [insertPos],
    },
  });

  yield createEvent.message(`Inserted ${value} with priority ${priority} at position ${insertPos}`, 'info');
  yield createEvent.result('string', `Inserted ${value}`, `Priority ${priority} at position ${insertPos}`);
}

function* runPriorityDequeue(
  elements: { value: number; priority: number }[]
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Dequeuing highest priority element...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (elements.length === 0) {
    yield createEvent.highlight([2]);
    yield createEvent.message(`Queue is empty!`, 'info');
    yield createEvent.result('string', 'Empty', 'No elements to dequeue');
    return;
  }

  yield createEvent.highlight([3]);
  const element = elements[0];
  yield createEvent.message(`Highest priority: ${element.value} (priority ${element.priority})`, 'explanation');

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: elements.map(e => e.value),
      frontIndex: 0,
      rearIndex: elements.length - 1,
      priorities: elements.map(e => e.priority),
      highlight: [0],
    },
  });

  elements.shift();

  yield createEvent.highlight([4, 5]);
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: elements.map(e => e.value),
      frontIndex: elements.length > 0 ? 0 : -1,
      rearIndex: elements.length > 0 ? elements.length - 1 : -1,
      priorities: elements.map(e => e.priority),
    },
  });

  yield createEvent.message(`Dequeued ${element.value} (priority ${element.priority})`, 'info');
  yield createEvent.result('string', `Dequeued ${element.value}`, `Had priority ${element.priority}`);
}

function* runPriorityPeek(
  elements: { value: number; priority: number }[]
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Peeking at highest priority element...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (elements.length === 0) {
    yield createEvent.highlight([2]);
    yield createEvent.message(`Queue is empty!`, 'info');
    yield createEvent.result('string', 'Empty', 'No elements');
    return;
  }

  yield createEvent.highlight([3]);
  const element = elements[0];

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: elements.map(e => e.value),
      frontIndex: 0,
      rearIndex: elements.length - 1,
      priorities: elements.map(e => e.priority),
      highlight: [0],
    },
  });

  yield createEvent.message(`Highest priority element: ${element.value} (priority ${element.priority})`, 'info');
  yield createEvent.result('string', `Peek: ${element.value}`, `Priority ${element.priority}`);
}
