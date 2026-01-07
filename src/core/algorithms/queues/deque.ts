import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Deque (Double-Ended Queue) Algorithm
 * 
 * Supports insertion and deletion from both ends.
 * Combines features of both stack and queue.
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n)
 */

type DequeOperation = 'insertFront' | 'insertRear' | 'deleteFront' | 'deleteRear' | 'getFront' | 'getRear';

const pseudocodeMap: Record<DequeOperation, string[]> = {
  'insertFront': [
    'function insertFront(deque, element):',
    '  if isFull():',
    '    return "Overflow"',
    '  front = front - 1',
    '  if front < 0: front = capacity - 1',
    '  deque[front] = element',
    '  return success',
  ],
  'insertRear': [
    'function insertRear(deque, element):',
    '  if isFull():',
    '    return "Overflow"',
    '  rear = rear + 1',
    '  if rear >= capacity: rear = 0',
    '  deque[rear] = element',
    '  return success',
  ],
  'deleteFront': [
    'function deleteFront(deque):',
    '  if isEmpty():',
    '    return "Underflow"',
    '  element = deque[front]',
    '  front = front + 1',
    '  if front >= capacity: front = 0',
    '  return element',
  ],
  'deleteRear': [
    'function deleteRear(deque):',
    '  if isEmpty():',
    '    return "Underflow"',
    '  element = deque[rear]',
    '  rear = rear - 1',
    '  if rear < 0: rear = capacity - 1',
    '  return element',
  ],
  'getFront': [
    'function getFront(deque):',
    '  if isEmpty():',
    '    return "Empty"',
    '  return deque[front]',
  ],
  'getRear': [
    'function getRear(deque):',
    '  if isEmpty():',
    '    return "Empty"',
    '  return deque[rear]',
  ],
};

export const deque: IAlgorithm<ArrayInput> = {
  id: 'deque',
  name: 'Deque (Double-Ended Queue)',
  category: 'queues',
  difficulty: 'intermediate',

  pseudocodeLines: pseudocodeMap['insertFront'],

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
      default: 'insertFront',
      options: [
        { value: 'insertFront', label: 'Insert Front' },
        { value: 'insertRear', label: 'Insert Rear' },
        { value: 'deleteFront', label: 'Delete Front' },
        { value: 'deleteRear', label: 'Delete Rear' },
        { value: 'getFront', label: 'Get Front' },
        { value: 'getRear', label: 'Get Rear' },
      ],
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'capacity',
      label: 'Capacity',
      default: 8,
      min: 4,
      max: 12,
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'insertValue',
      label: 'Value to Insert',
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
    const operation = (params?.operation || 'insertFront') as DequeOperation;
    const capacity = (params?.capacity || 8) as number;
    const insertValue = (params?.insertValue || 99) as number;

    const deque: number[] = [...input.values.slice(0, capacity)];

    yield createEvent.message(
      `Deque Operation: ${operation.replace(/([A-Z])/g, ' $1').trim()}`,
      'info',
      0
    );
    yield createEvent.message(
      `Initial Deque: [${deque.length > 0 ? deque.join(', ') : 'empty'}] | Size: ${deque.length}/${capacity}`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [...deque],
        capacity,
        frontIndex: deque.length > 0 ? 0 : -1,
        rearIndex: deque.length > 0 ? deque.length - 1 : -1,
        isDeque: true,
      },
    });

    if (operation === 'insertFront') {
      yield* runInsertFront(deque, capacity, insertValue);
    } else if (operation === 'insertRear') {
      yield* runInsertRear(deque, capacity, insertValue);
    } else if (operation === 'deleteFront') {
      yield* runDeleteFront(deque, capacity);
    } else if (operation === 'deleteRear') {
      yield* runDeleteRear(deque, capacity);
    } else if (operation === 'getFront') {
      yield* runGetFront(deque, capacity);
    } else if (operation === 'getRear') {
      yield* runGetRear(deque, capacity);
    }
  },
};

function* runInsertFront(deque: number[], capacity: number, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} at front...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (deque.length >= capacity) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Overflow! Deque is full`, 'info');
    yield createEvent.result('string', `Cannot insert ${value}`, 'Deque Overflow');
    return;
  }

  yield createEvent.highlight([3, 4, 5]);
  deque.unshift(value);

  yield createEvent.message(`Inserted ${value} at front`, 'explanation');
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...deque],
      capacity,
      frontIndex: 0,
      rearIndex: deque.length - 1,
      isDeque: true,
      highlight: [0],
    },
  });

  yield createEvent.highlight([6]);
  yield createEvent.message(`Successfully inserted ${value} at front! Size: ${deque.length}/${capacity}`, 'info');
  yield createEvent.result('string', `Inserted ${value}`, 'Inserted at front');
}

function* runInsertRear(deque: number[], capacity: number, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} at rear...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (deque.length >= capacity) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Overflow! Deque is full`, 'info');
    yield createEvent.result('string', `Cannot insert ${value}`, 'Deque Overflow');
    return;
  }

  yield createEvent.highlight([3, 4, 5]);

  // Show animation FIRST (element sliding in from right) - before adding to queue
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...deque], // Show current state WITHOUT the new element yet
      capacity,
      frontIndex: deque.length > 0 ? 0 : -1,
      rearIndex: deque.length > 0 ? deque.length - 1 : -1,
      isDeque: true,
      animating: 'enqueue',
      animatingValue: value,
    },
  });

  yield createEvent.message(`Inserting ${value} at rear position...`, 'explanation');

  // NOW add the element to the queue
  deque.push(value);

  // Show final state with element inserted
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...deque],
      capacity,
      frontIndex: 0,
      rearIndex: deque.length - 1,
      isDeque: true,
      highlight: [deque.length - 1],
    },
  });

  yield createEvent.highlight([6]);
  yield createEvent.message(`Successfully inserted ${value} at rear! Size: ${deque.length}/${capacity}`, 'info');
  yield createEvent.result('string', `Inserted ${value}`, 'Inserted at rear');
}

function* runDeleteFront(deque: number[], capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Deleting from front...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (deque.length === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Underflow! Deque is empty`, 'info');
    yield createEvent.result('string', 'Cannot delete', 'Deque Underflow');
    return;
  }

  yield createEvent.highlight([3]);
  const element = deque[0];
  yield createEvent.message(`Front element: ${element}`, 'explanation');

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...deque],
      capacity,
      frontIndex: 0,
      rearIndex: deque.length - 1,
      isDeque: true,
      highlight: [0],
      animating: 'dequeue',
      animatingValue: element,
    },
  });

  deque.shift();

  yield createEvent.highlight([4, 5, 6]);
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...deque],
      capacity,
      frontIndex: deque.length > 0 ? 0 : -1,
      rearIndex: deque.length > 0 ? deque.length - 1 : -1,
      isDeque: true,
    },
  });

  yield createEvent.message(`Deleted ${element} from front! Size: ${deque.length}/${capacity}`, 'info');
  yield createEvent.result('string', `Deleted ${element}`, 'Removed from front');
}

function* runDeleteRear(deque: number[], capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Deleting from rear...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (deque.length === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Underflow! Deque is empty`, 'info');
    yield createEvent.result('string', 'Cannot delete', 'Deque Underflow');
    return;
  }

  yield createEvent.highlight([3]);
  const element = deque[deque.length - 1];
  yield createEvent.message(`Rear element: ${element}`, 'explanation');

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...deque],
      capacity,
      frontIndex: 0,
      rearIndex: deque.length - 1,
      isDeque: true,
      highlight: [deque.length - 1],
      animating: 'dequeueRear',
      animatingValue: element,
    },
  });

  deque.pop();

  yield createEvent.highlight([4, 5, 6]);
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...deque],
      capacity,
      frontIndex: deque.length > 0 ? 0 : -1,
      rearIndex: deque.length > 0 ? deque.length - 1 : -1,
      isDeque: true,
    },
  });

  yield createEvent.message(`Deleted ${element} from rear! Size: ${deque.length}/${capacity}`, 'info');
  yield createEvent.result('string', `Deleted ${element}`, 'Removed from rear');
}

function* runGetFront(deque: number[], capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Getting front element...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (deque.length === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Deque is empty!`, 'info');
    yield createEvent.result('string', 'Empty', 'No front element');
    return;
  }

  yield createEvent.highlight([3]);
  const element = deque[0];

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...deque],
      capacity,
      frontIndex: 0,
      rearIndex: deque.length - 1,
      isDeque: true,
      highlight: [0],
    },
  });

  yield createEvent.message(`Front element: ${element}`, 'info');
  yield createEvent.result('string', `Front: ${element}`, `Front element is ${element}`);
}

function* runGetRear(deque: number[], capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Getting rear element...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (deque.length === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Deque is empty!`, 'info');
    yield createEvent.result('string', 'Empty', 'No rear element');
    return;
  }

  yield createEvent.highlight([3]);
  const element = deque[deque.length - 1];

  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...deque],
      capacity,
      frontIndex: 0,
      rearIndex: deque.length - 1,
      isDeque: true,
      highlight: [deque.length - 1],
    },
  });

  yield createEvent.message(`Rear element: ${element}`, 'info');
  yield createEvent.result('string', `Rear: ${element}`, `Rear element is ${element}`);
}
