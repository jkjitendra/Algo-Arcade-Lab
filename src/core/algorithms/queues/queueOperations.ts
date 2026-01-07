import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Queue Operations Algorithm
 * 
 * Basic queue operations demonstrating FIFO behavior.
 * Operations: Enqueue, Dequeue, Front, Rear, isEmpty, isFull
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is queue capacity
 */

type QueueOperationType = 'enqueue' | 'dequeue' | 'front' | 'rear' | 'isEmpty' | 'isFull';

const pseudocodeMap: Record<QueueOperationType, string[]> = {
  'enqueue': [
    'function enqueue(queue, element):',
    '  if isFull(queue):',
    '    return "Queue Overflow"',
    '  rear = rear + 1',
    '  queue[rear] = element',
    '  return success',
  ],
  'dequeue': [
    'function dequeue(queue):',
    '  if isEmpty(queue):',
    '    return "Queue Underflow"',
    '  element = queue[front]',
    '  front = front + 1',
    '  return element',
  ],
  'front': [
    'function front(queue):',
    '  if isEmpty(queue):',
    '    return "Queue Empty"',
    '  return queue[front]',
  ],
  'rear': [
    'function rear(queue):',
    '  if isEmpty(queue):',
    '    return "Queue Empty"',
    '  return queue[rear]',
  ],
  'isEmpty': [
    'function isEmpty(queue):',
    '  return front > rear',
  ],
  'isFull': [
    'function isFull(queue):',
    '  return rear == capacity - 1',
  ],
};

export const queueOperations: IAlgorithm<ArrayInput> = {
  id: 'queue-operations',
  name: 'Queue Operations',
  category: 'queues',
  difficulty: 'beginner',

  pseudocodeLines: pseudocodeMap['enqueue'],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'enqueue',
      options: [
        { value: 'enqueue', label: 'Enqueue' },
        { value: 'dequeue', label: 'Dequeue' },
        { value: 'front', label: 'Front' },
        { value: 'rear', label: 'Rear' },
        { value: 'isEmpty', label: 'isEmpty' },
        { value: 'isFull', label: 'isFull' },
      ],
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'capacity',
      label: 'Queue Capacity',
      default: 8,
      min: 4,
      max: 12,
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
    // Allow empty arrays for queues
    if (input.values.length > 12) {
      return { ok: false, error: 'Queue size must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'enqueue') as QueueOperationType;
    const enqueueValue = (params?.enqueueValue || 99) as number;

    // Calculate default capacity based on input size and operation
    const inputSize = input.values.length;
    let defaultCapacity: number;

    if (operation === 'isFull') {
      // For isFull, capacity equals elements so user can see it's full
      defaultCapacity = Math.max(inputSize, 1);
    } else {
      // For other operations, add some buffer
      defaultCapacity = inputSize < 5 ? inputSize + 2 : inputSize + 1;
    }

    // Use user-provided capacity if present and valid, otherwise use calculated default
    const capacity = params?.capacity ? (params.capacity as number) : defaultCapacity;

    // Initialize queue with input values
    const queue: number[] = [...input.values];
    let front = 0;
    let rear = queue.length - 1;

    yield createEvent.message(
      `Queue Operation: ${operation.charAt(0).toUpperCase() + operation.slice(1)}`,
      'info',
      0
    );
    yield createEvent.message(
      `Initial Queue: [${queue.length > 0 ? queue.join(', ') : 'empty'}] | Front: ${front} | Rear: ${rear} | Capacity: ${capacity}`,
      'explanation'
    );

    // Show initial queue state
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [...queue],
        capacity,
        frontIndex: queue.length > 0 ? front : -1,
        rearIndex: queue.length > 0 ? rear : -1,
      },
    });

    if (operation === 'enqueue') {
      yield* runEnqueue(queue, front, rear, capacity, enqueueValue);
    } else if (operation === 'dequeue') {
      yield* runDequeue(queue, front, rear, capacity);
    } else if (operation === 'front') {
      yield* runFront(queue, front, rear, capacity);
    } else if (operation === 'rear') {
      yield* runRear(queue, front, rear, capacity);
    } else if (operation === 'isEmpty') {
      yield* runIsEmpty(queue, front, rear, capacity);
    } else if (operation === 'isFull') {
      yield* runIsFull(queue, front, rear, capacity);
    }
  },
};

function* runEnqueue(queue: number[], front: number, rear: number, capacity: number, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Enqueueing ${value} to the queue...`, 'step');
  yield createEvent.highlight([0, 1]);

  // Check if full
  if (queue.length >= capacity) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Queue Overflow! Cannot enqueue - queue is full (${queue.length}/${capacity})`, 'info');
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [...queue],
        capacity,
        frontIndex: front,
        rearIndex: rear,
        highlight: Array.from({ length: queue.length }, (_, i) => i),
      },
    });
    yield createEvent.result('string', `Cannot insert ${value}`, 'Queue Overflow - Queue is Full');
    return;
  }

  // Show animation of element entering from right
  yield createEvent.highlight([3, 4]);
  yield createEvent.message(`Inserting ${value} at rear (index ${rear + 1})...`, 'explanation');
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: front,
      rearIndex: rear,
      animating: 'enqueue',
      animatingValue: value,
    },
  });

  // Increment rear and add element
  rear++;
  queue.push(value);

  // Show element in queue after animation
  yield createEvent.message(`Incremented rear: ${rear - 1} → ${rear}`, 'explanation');
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: front,
      rearIndex: rear,
      highlight: [rear],
    },
  });

  yield createEvent.highlight([5]);
  yield createEvent.message(`Successfully enqueued ${value}! Queue size: ${queue.length}/${capacity}`, 'info');

  // Final state
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: front,
      rearIndex: rear,
    },
  });

  yield createEvent.result('string', `Inserted ${value}`, `Element ${value} enqueued successfully`);
}

function* runDequeue(queue: number[], front: number, rear: number, capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Dequeuing element from the queue...`, 'step');
  yield createEvent.highlight([0, 1]);

  // Check if empty
  if (queue.length === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Queue Underflow! Cannot dequeue - queue is empty`, 'info');
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [],
        capacity,
        frontIndex: -1,
        rearIndex: -1,
      },
    });
    yield createEvent.result('string', 'Cannot dequeue', 'Queue Underflow - Queue is Empty');
    return;
  }

  // Get front element
  yield createEvent.highlight([3]);
  const element = queue[front];
  yield createEvent.message(`Element at front: queue[${front}] = ${element}`, 'explanation');

  // Highlight the element to be dequeued
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: front,
      rearIndex: rear,
      highlight: [front],
    },
  });

  // Remove element
  queue.shift();
  rear--;

  yield createEvent.highlight([4]);
  yield createEvent.message(`Removing ${element} from front`, 'explanation');

  // Show dequeue animation with updated queue
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: queue.length > 0 ? 0 : -1,
      rearIndex: queue.length > 0 ? rear : -1,
      animating: 'dequeue',
      animatingValue: element,
    },
  });

  yield createEvent.highlight([5]);
  yield createEvent.message(`Successfully dequeued ${element}! Queue size: ${queue.length}`, 'info');

  // Final state
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: queue.length > 0 ? 0 : -1,
      rearIndex: queue.length > 0 ? queue.length - 1 : -1,
    },
  });

  yield createEvent.result('string', `Dequeued ${element}`, `Element ${element} removed from queue`);
}

function* runFront(queue: number[], front: number, rear: number, capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Getting front element...`, 'step');
  yield createEvent.highlight([0, 1]);

  // Check if empty
  if (queue.length === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Queue is empty! No front element`, 'info');
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [],
        capacity,
        frontIndex: -1,
        rearIndex: -1,
      },
    });
    yield createEvent.result('string', 'Queue Empty', 'No element at front');
    return;
  }

  // Get front element without removing
  yield createEvent.highlight([3]);
  const element = queue[front];

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: front,
      rearIndex: rear,
      highlight: [front],
    },
  });

  yield createEvent.message(`Front element: queue[${front}] = ${element}`, 'info');
  yield createEvent.message(`Queue remains unchanged after front operation`, 'explanation');

  yield createEvent.result('string', `Front: ${element}`, `Front element is ${element}`);
}

function* runRear(queue: number[], front: number, rear: number, capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Getting rear element...`, 'step');
  yield createEvent.highlight([0, 1]);

  // Check if empty
  if (queue.length === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Queue is empty! No rear element`, 'info');
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [],
        capacity,
        frontIndex: -1,
        rearIndex: -1,
      },
    });
    yield createEvent.result('string', 'Queue Empty', 'No element at rear');
    return;
  }

  // Get rear element without removing
  yield createEvent.highlight([3]);
  const element = queue[rear];

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: front,
      rearIndex: rear,
      highlight: [rear],
    },
  });

  yield createEvent.message(`Rear element: queue[${rear}] = ${element}`, 'info');
  yield createEvent.message(`Queue remains unchanged after rear operation`, 'explanation');

  yield createEvent.result('string', `Rear: ${element}`, `Rear element is ${element}`);
}

function* runIsEmpty(queue: number[], front: number, rear: number, capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Checking if queue is empty...`, 'step');
  yield createEvent.highlight([0, 1]);

  yield createEvent.pointer(
    [],
    [
      { name: 'front', value: front, highlight: true },
      { name: 'rear', value: rear, highlight: true },
    ],
    `Checking: queue.length == 0 ? → ${queue.length} == 0 ?`
  );

  const isEmpty = queue.length === 0;

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: queue.length > 0 ? front : -1,
      rearIndex: queue.length > 0 ? rear : -1,
    },
  });

  if (isEmpty) {
    yield createEvent.message(`Queue IS empty (size = 0)`, 'info');
    yield createEvent.result('boolean', true, 'Queue is EMPTY');
  } else {
    yield createEvent.message(`Queue is NOT empty (size = ${queue.length})`, 'info');
    yield createEvent.result('boolean', false, `Queue has ${queue.length} element(s)`);
  }
}

function* runIsFull(queue: number[], front: number, rear: number, capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Checking if queue is full...`, 'step');
  yield createEvent.highlight([0, 1]);

  yield createEvent.pointer(
    [],
    [
      { name: 'size', value: queue.length, highlight: true },
      { name: 'capacity', value: capacity },
    ],
    `Checking: size == capacity ? → ${queue.length} == ${capacity} ?`
  );

  const isFull = queue.length >= capacity;

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...queue],
      capacity,
      frontIndex: queue.length > 0 ? front : -1,
      rearIndex: queue.length > 0 ? rear : -1,
      highlight: isFull ? Array.from({ length: queue.length }, (_, i) => i) : undefined,
    },
  });

  if (isFull) {
    yield createEvent.message(`Queue IS full (${queue.length}/${capacity})`, 'info');
    yield createEvent.result('boolean', true, 'Queue is FULL');
  } else {
    yield createEvent.message(`Queue is NOT full (${queue.length}/${capacity} elements)`, 'info');
    yield createEvent.result('boolean', false, `Queue has ${capacity - queue.length} slot(s) available`);
  }
}
