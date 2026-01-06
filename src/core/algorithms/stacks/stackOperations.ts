import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Stack Operations Algorithm
 * 
 * Basic stack operations demonstrating LIFO behavior.
 * Operations: Push, Pop, Peek, isEmpty, isFull
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is stack capacity
 */

type StackOperationType = 'push' | 'pop' | 'peek' | 'isEmpty' | 'isFull';

const pseudocodeMap: Record<StackOperationType, string[]> = {
  'push': [
    'function push(stack, element):',
    '  if isFull(stack):',
    '    return "Stack Overflow"',
    '  top = top + 1',
    '  stack[top] = element',
    '  return success',
  ],
  'pop': [
    'function pop(stack):',
    '  if isEmpty(stack):',
    '    return "Stack Underflow"',
    '  element = stack[top]',
    '  top = top - 1',
    '  return element',
  ],
  'peek': [
    'function peek(stack):',
    '  if isEmpty(stack):',
    '    return "Stack Empty"',
    '  return stack[top]',
  ],
  'isEmpty': [
    'function isEmpty(stack):',
    '  return top == -1',
  ],
  'isFull': [
    'function isFull(stack):',
    '  return top == capacity - 1',
  ],
};

export const stackOperations: IAlgorithm<ArrayInput> = {
  id: 'stack-operations',
  name: 'Stack Operations',
  category: 'stacks',
  difficulty: 'beginner',

  pseudocodeLines: pseudocodeMap['push'],

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
      default: 'push',
      options: [
        { value: 'push', label: 'Push' },
        { value: 'pop', label: 'Pop' },
        { value: 'peek', label: 'Peek / Top' },
        { value: 'isEmpty', label: 'isEmpty' },
        { value: 'isFull', label: 'isFull' },
      ],
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'capacity',
      label: 'Stack Capacity',
      default: 8,
      min: 4,
      max: 12,
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
    // Stack operations allow empty arrays (for isEmpty check)
    if (input.values.length > 12) {
      return { ok: false, error: 'Stack size must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'push') as StackOperationType;
    const capacity = (params?.capacity || 8) as number;
    const pushValue = (params?.pushValue || 99) as number;

    // Initialize stack with input values
    const stack: number[] = [...input.values];
    let top = stack.length - 1;

    yield createEvent.message(
      `Stack Operation: ${operation.charAt(0).toUpperCase() + operation.slice(1)}`,
      'info',
      0
    );
    yield createEvent.message(
      `Initial Stack: [${stack.length > 0 ? stack.join(', ') : 'empty'}] | Top Index: ${top} | Capacity: ${capacity}`,
      'explanation'
    );

    // Show initial stack state
    yield createEvent.auxiliary({
      type: 'stack',
      stackData: {
        elements: [...stack],
        capacity,
        topIndex: top,
      },
    });

    if (operation === 'push') {
      yield* runPush(stack, top, capacity, pushValue);
    } else if (operation === 'pop') {
      yield* runPop(stack, top, capacity);
    } else if (operation === 'peek') {
      yield* runPeek(stack, top, capacity);
    } else if (operation === 'isEmpty') {
      yield* runIsEmpty(stack, top, capacity);
    } else if (operation === 'isFull') {
      yield* runIsFull(stack, top, capacity);
    }
  },
};

function* runPush(stack: number[], top: number, capacity: number, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Pushing ${value} onto the stack...`, 'step');
  yield createEvent.highlight([0, 1]);

  // Check if full
  if (top >= capacity - 1) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Stack Overflow! Cannot push - stack is full (${top + 1}/${capacity})`, 'info');
    yield createEvent.auxiliary({
      type: 'stack',
      stackData: {
        elements: [...stack],
        capacity,
        topIndex: top,
        highlight: Array.from({ length: stack.length }, (_, i) => i),
      },
    });
    yield createEvent.result('string', `Cannot insert ${value}`, 'Stack Overflow - Stack is Full');
    return;
  }

  // Show animation of element coming down
  yield createEvent.highlight([3, 4]);
  yield createEvent.message(`Inserting ${value} at stack[${top + 1}]...`, 'explanation');
  yield createEvent.auxiliary({
    type: 'stack',
    stackData: {
      elements: [...stack],
      capacity,
      topIndex: top,
      animating: 'push',
      animatingValue: value,
    },
  });

  // Increment top and push element
  top++;
  stack.push(value);

  // Show element in stack after animation
  yield createEvent.message(`Incremented top: ${top - 1} → ${top}`, 'explanation');
  yield createEvent.auxiliary({
    type: 'stack',
    stackData: {
      elements: [...stack],
      capacity,
      topIndex: top,
      highlight: [top],
    },
  });

  yield createEvent.push(value, 'stack');
  yield createEvent.highlight([5]);
  yield createEvent.message(`Successfully pushed ${value}! Stack size: ${stack.length}/${capacity}`, 'info');

  // Final state
  yield createEvent.auxiliary({
    type: 'stack',
    stackData: {
      elements: [...stack],
      capacity,
      topIndex: top,
    },
  });

  yield createEvent.result('string', `Inserted ${value}`, `Element ${value} pushed successfully`);
}

function* runPop(stack: number[], top: number, capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Popping element from the stack...`, 'step');
  yield createEvent.highlight([0, 1]);

  // Check if empty
  if (top < 0 || stack.length === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Stack Underflow! Cannot pop - stack is empty`, 'info');
    yield createEvent.auxiliary({
      type: 'stack',
      stackData: {
        elements: [],
        capacity,
        topIndex: -1,
      },
    });
    yield createEvent.result('string', 'Cannot pop', 'Stack Underflow - Stack is Empty');
    return;
  }

  // Get element
  yield createEvent.highlight([3]);
  const element = stack[top];
  yield createEvent.message(`Element at top: stack[${top}] = ${element}`, 'explanation');

  // Highlight the element to be popped
  yield createEvent.auxiliary({
    type: 'stack',
    stackData: {
      elements: [...stack],
      capacity,
      topIndex: top,
      highlight: [top],
    },
  });

  // Pop animation AND element removal in same step - remove element first before animation
  stack.pop();
  top--;

  yield createEvent.highlight([4]);
  yield createEvent.message(`Popping ${element} and decrementing top: ${top + 1} → ${top}`, 'explanation');

  // Show pop animation with updated stack (element already removed visually)
  yield createEvent.auxiliary({
    type: 'stack',
    stackData: {
      elements: [...stack],  // Element already removed from stack
      capacity,
      topIndex: top,
      animating: 'pop',
      animatingValue: element,  // Show the popped element animating out
    },
  });

  yield createEvent.pop(element, 'stack');
  yield createEvent.highlight([5]);
  yield createEvent.message(`Successfully popped ${element}! Stack size: ${stack.length}`, 'info');

  // Final state
  yield createEvent.auxiliary({
    type: 'stack',
    stackData: {
      elements: [...stack],
      capacity,
      topIndex: top,
    },
  });

  yield createEvent.result('string', `Popped ${element}`, `Element ${element} removed from stack`);
}

function* runPeek(stack: number[], top: number, capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Peeking at top element...`, 'step');
  yield createEvent.highlight([0, 1]);

  // Check if empty
  if (top < 0 || stack.length === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Stack is empty! Nothing to peek`, 'info');
    yield createEvent.auxiliary({
      type: 'stack',
      stackData: {
        elements: [],
        capacity,
        topIndex: -1,
      },
    });
    yield createEvent.result('string', 'Stack Empty', 'No element to peek');
    return;
  }

  // Get top element without removing
  yield createEvent.highlight([3]);
  const element = stack[top];

  yield createEvent.auxiliary({
    type: 'stack',
    stackData: {
      elements: [...stack],
      capacity,
      topIndex: top,
      highlight: [top],
    },
  });

  yield createEvent.message(`Top element: stack[${top}] = ${element}`, 'info');
  yield createEvent.message(`Stack remains unchanged after peek operation`, 'explanation');

  yield createEvent.result('string', `Top: ${element}`, `Peek returned ${element}`);
}

function* runIsEmpty(stack: number[], top: number, capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Checking if stack is empty...`, 'step');
  yield createEvent.highlight([0, 1]);

  yield createEvent.pointer(
    [],
    [
      { name: 'top', value: top, highlight: true },
    ],
    `Checking: top == -1 ? → ${top} == -1 ?`
  );

  const isEmpty = top === -1 || stack.length === 0;

  yield createEvent.auxiliary({
    type: 'stack',
    stackData: {
      elements: [...stack],
      capacity,
      topIndex: top,
    },
  });

  if (isEmpty) {
    yield createEvent.message(`Stack IS empty (top = ${top})`, 'info');
    yield createEvent.result('boolean', true, 'Stack is EMPTY');
  } else {
    yield createEvent.message(`Stack is NOT empty (top = ${top}, size = ${stack.length})`, 'info');
    yield createEvent.result('boolean', false, `Stack has ${stack.length} element(s)`);
  }
}

function* runIsFull(stack: number[], top: number, capacity: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Checking if stack is full...`, 'step');
  yield createEvent.highlight([0, 1]);

  yield createEvent.pointer(
    [],
    [
      { name: 'top', value: top, highlight: true },
      { name: 'capacity', value: capacity },
    ],
    `Checking: top == capacity - 1 ? → ${top} == ${capacity - 1} ?`
  );

  const isFull = top >= capacity - 1;

  yield createEvent.auxiliary({
    type: 'stack',
    stackData: {
      elements: [...stack],
      capacity,
      topIndex: top,
      highlight: isFull ? Array.from({ length: stack.length }, (_, i) => i) : undefined,
    },
  });

  if (isFull) {
    yield createEvent.message(`Stack IS full (top = ${top}, capacity = ${capacity})`, 'info');
    yield createEvent.result('boolean', true, 'Stack is FULL');
  } else {
    yield createEvent.message(`Stack is NOT full (${stack.length}/${capacity} elements)`, 'info');
    yield createEvent.result('boolean', false, `Stack has ${capacity - stack.length} slot(s) available`);
  }
}
