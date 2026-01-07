import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Circular Queue Algorithm
 * 
 * Fixed-size circular buffer implementation.
 * Efficiently uses space by wrapping around.
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is capacity
 */

type CircularQueueOperation = 'enqueue' | 'dequeue' | 'front' | 'rear' | 'isEmpty' | 'isFull';

const pseudocodeMap: Record<CircularQueueOperation, string[]> = {
  'enqueue': [
    'function enqueue(queue, element):',
    '  if isFull():',
    '    return "Queue Overflow"',
    '  rear = (rear + 1) % capacity',
    '  queue[rear] = element',
    '  size++',
    '  return success',
  ],
  'dequeue': [
    'function dequeue(queue):',
    '  if isEmpty():',
    '    return "Queue Underflow"',
    '  element = queue[front]',
    '  front = (front + 1) % capacity',
    '  size--',
    '  return element',
  ],
  'front': [
    'function front(queue):',
    '  if isEmpty():',
    '    return "Queue Empty"',
    '  return queue[front]',
  ],
  'rear': [
    'function rear(queue):',
    '  if isEmpty():',
    '    return "Queue Empty"',
    '  return queue[rear]',
  ],
  'isEmpty': [
    'function isEmpty():',
    '  return size == 0',
  ],
  'isFull': [
    'function isFull():',
    '  return size == capacity',
  ],
};

export const circularQueue: IAlgorithm<ArrayInput> = {
  id: 'circular-queue',
  name: 'Circular Queue',
  category: 'queues',
  difficulty: 'intermediate',

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
      label: 'Capacity',
      default: 6,
      min: 4,
      max: 10,
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
    const operation = (params?.operation || 'enqueue') as CircularQueueOperation;
    const capacity = (params?.capacity || 6) as number;
    const enqueueValue = (params?.enqueueValue || 99) as number;

    // Initialize circular queue - store actual values in sparse array
    const initialValues = input.values.slice(0, capacity);
    const queue: (number | null)[] = Array(capacity).fill(null);

    // Fill initial values starting from index 0
    for (let i = 0; i < initialValues.length; i++) {
      queue[i] = initialValues[i];
    }

    let front = initialValues.length > 0 ? 0 : -1;
    let rear = initialValues.length > 0 ? initialValues.length - 1 : -1;
    let size = initialValues.length;

    yield createEvent.message(
      `Circular Queue Operation: ${operation.charAt(0).toUpperCase() + operation.slice(1)}`,
      'info',
      0
    );
    yield createEvent.message(
      `Initial: Size=${size}/${capacity} | Front=${front} | Rear=${rear}`,
      'explanation'
    );

    // Show initial state
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: queue.filter(v => v !== null) as number[],
        capacity,
        frontIndex: front,
        rearIndex: rear,
        isCircular: true,
      },
    });

    if (operation === 'enqueue') {
      yield* runCircularEnqueue(queue, front, rear, size, capacity, enqueueValue);
    } else if (operation === 'dequeue') {
      yield* runCircularDequeue(queue, front, rear, size, capacity);
    } else if (operation === 'front') {
      yield* runCircularFront(queue, front, size, capacity);
    } else if (operation === 'rear') {
      yield* runCircularRear(queue, rear, size, capacity);
    } else if (operation === 'isEmpty') {
      yield* runCircularIsEmpty(queue, front, rear, size, capacity);
    } else if (operation === 'isFull') {
      yield* runCircularIsFull(queue, front, rear, size, capacity);
    }
  },
};

function* runCircularEnqueue(
  queue: (number | null)[],
  front: number,
  rear: number,
  size: number,
  capacity: number,
  value: number
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Enqueueing ${value}...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (size >= capacity) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Queue Overflow! Queue is full (${size}/${capacity})`, 'info');
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: queue.filter(v => v !== null) as number[],
        capacity,
        frontIndex: front,
        rearIndex: rear,
        isCircular: true,
        highlight: Array.from({ length: size }, (_, i) => i),
      },
    });
    yield createEvent.result('string', `Cannot insert ${value}`, 'Queue Overflow');
    return;
  }

  yield createEvent.highlight([3, 4]);
  const newRear = (rear + 1) % capacity;
  yield createEvent.message(`Moving rear: (${rear} + 1) % ${capacity} = ${newRear}`, 'explanation');

  queue[newRear] = value;
  rear = newRear;
  if (front === -1) front = 0;
  size++;

  yield createEvent.highlight([5, 6]);
  yield createEvent.message(`Inserted ${value} at index ${rear}`, 'explanation');

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue.filter(v => v !== null) as number[],
      capacity,
      frontIndex: front,
      rearIndex: rear,
      isCircular: true,
      highlight: [rear],
    },
  });

  yield createEvent.message(`Successfully enqueued ${value}! Size: ${size}/${capacity}`, 'info');
  yield createEvent.result('string', `Inserted ${value}`, `Enqueued at circular index ${rear}`);
}

function* runCircularDequeue(
  queue: (number | null)[],
  front: number,
  rear: number,
  size: number,
  capacity: number
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Dequeuing from circular queue...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (size === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Queue Underflow! Queue is empty`, 'info');
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [],
        capacity,
        frontIndex: -1,
        rearIndex: -1,
        isCircular: true,
      },
    });
    yield createEvent.result('string', 'Cannot dequeue', 'Queue Underflow');
    return;
  }

  yield createEvent.highlight([3]);
  const element = queue[front];
  yield createEvent.message(`Element at front[${front}] = ${element}`, 'explanation');

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue.filter(v => v !== null) as number[],
      capacity,
      frontIndex: front,
      rearIndex: rear,
      isCircular: true,
      highlight: [front],
    },
  });

  queue[front] = null;
  const newFront = (front + 1) % capacity;
  size--;

  yield createEvent.highlight([4, 5]);
  yield createEvent.message(`Moving front: (${front} + 1) % ${capacity} = ${newFront}`, 'explanation');

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue.filter(v => v !== null) as number[],
      capacity,
      frontIndex: size > 0 ? newFront : -1,
      rearIndex: size > 0 ? rear : -1,
      isCircular: true,
    },
  });

  yield createEvent.highlight([6]);
  yield createEvent.message(`Dequeued ${element}! Size: ${size}/${capacity}`, 'info');
  yield createEvent.result('string', `Dequeued ${element}`, `Removed from circular index ${front}`);
}

function* runCircularFront(
  queue: (number | null)[],
  front: number,
  size: number,
  capacity: number
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Getting front element...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (size === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Queue is empty!`, 'info');
    yield createEvent.result('string', 'Queue Empty', 'No front element');
    return;
  }

  yield createEvent.highlight([3]);
  const element = queue[front];
  yield createEvent.message(`Front element at index[${front}] = ${element}`, 'info');

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue.filter(v => v !== null) as number[],
      capacity,
      frontIndex: front,
      rearIndex: -1,
      isCircular: true,
      highlight: [0],
    },
  });

  yield createEvent.result('string', `Front: ${element}`, `Element at front is ${element}`);
}

function* runCircularRear(
  queue: (number | null)[],
  rear: number,
  size: number,
  capacity: number
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Getting rear element...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (size === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Queue is empty!`, 'info');
    yield createEvent.result('string', 'Queue Empty', 'No rear element');
    return;
  }

  yield createEvent.highlight([3]);
  const element = queue[rear];
  yield createEvent.message(`Rear element at index[${rear}] = ${element}`, 'info');

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue.filter(v => v !== null) as number[],
      capacity,
      frontIndex: -1,
      rearIndex: rear,
      isCircular: true,
      highlight: [size - 1],
    },
  });

  yield createEvent.result('string', `Rear: ${element}`, `Element at rear is ${element}`);
}

function* runCircularIsEmpty(
  queue: (number | null)[],
  front: number,
  rear: number,
  size: number,
  capacity: number
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Checking if circular queue is empty...`, 'step');
  yield createEvent.highlight([0, 1]);

  yield createEvent.pointer(
    [],
    [{ name: 'size', value: size, highlight: true }],
    `Checking: size == 0 ? → ${size} == 0 ?`
  );

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue.filter(v => v !== null) as number[],
      capacity,
      frontIndex: front,
      rearIndex: rear,
      isCircular: true,
    },
  });

  if (size === 0) {
    yield createEvent.message(`Queue IS empty`, 'info');
    yield createEvent.result('boolean', true, 'Queue is EMPTY');
  } else {
    yield createEvent.message(`Queue is NOT empty (size = ${size})`, 'info');
    yield createEvent.result('boolean', false, `Queue has ${size} element(s)`);
  }
}

function* runCircularIsFull(
  queue: (number | null)[],
  front: number,
  rear: number,
  size: number,
  capacity: number
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Checking if circular queue is full...`, 'step');
  yield createEvent.highlight([0, 1]);

  yield createEvent.pointer(
    [],
    [
      { name: 'size', value: size, highlight: true },
      { name: 'capacity', value: capacity },
    ],
    `Checking: size == capacity ? → ${size} == ${capacity} ?`
  );

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: queue.filter(v => v !== null) as number[],
      capacity,
      frontIndex: front,
      rearIndex: rear,
      isCircular: true,
      highlight: size >= capacity ? Array.from({ length: size }, (_, i) => i) : undefined,
    },
  });

  if (size >= capacity) {
    yield createEvent.message(`Queue IS full (${size}/${capacity})`, 'info');
    yield createEvent.result('boolean', true, 'Queue is FULL');
  } else {
    yield createEvent.message(`Queue is NOT full (${size}/${capacity})`, 'info');
    yield createEvent.result('boolean', false, `${capacity - size} slot(s) available`);
  }
}
