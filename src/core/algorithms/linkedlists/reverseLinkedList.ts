import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Reverse Linked List Algorithm
 * 
 * Reverse a singly linked list using iterative or recursive approach.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) iterative, O(n) recursive
 */

type ReverseMethod = 'iterative' | 'recursive';

const pseudocodeMap: Record<ReverseMethod, string[]> = {
  'iterative': [
    'function reverse(head):',
    '  prev = null',
    '  current = head',
    '  while current != null:',
    '    next = current.next',
    '    current.next = prev',
    '    prev = current',
    '    current = next',
    '  return prev',
  ],
  'recursive': [
    'function reverse(head):',
    '  if head is null or head.next is null:',
    '    return head',
    '  newHead = reverse(head.next)',
    '  head.next.next = head',
    '  head.next = null',
    '  return newHead',
  ],
};

function buildLinkedList(values: number[]): { nodes: LinkedListNode[]; headId: number | null } {
  if (values.length === 0) {
    return { nodes: [], headId: null };
  }

  const nodes: LinkedListNode[] = values.map((value, index) => ({
    id: index,
    value,
    nextId: index < values.length - 1 ? index + 1 : null,
    isHead: index === 0,
    isTail: index === values.length - 1,
  }));

  return { nodes, headId: 0 };
}

export const reverseLinkedList: IAlgorithm<ArrayInput> = {
  id: 'reverse-linked-list',
  name: 'Reverse Linked List',
  category: 'linkedlists',
  difficulty: 'beginner',

  pseudocodeLines: pseudocodeMap['iterative'],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1) iterative / O(n) recursive',

  parameters: [
    {
      type: 'select',
      id: 'method',
      label: 'Method',
      default: 'iterative',
      options: [
        { value: 'iterative', label: 'Iterative (3 pointers)' },
        { value: 'recursive', label: 'Recursive' },
      ],
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'List must have at least 2 elements to reverse' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'List size must be 10 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const method = (params?.method || 'iterative') as ReverseMethod;

    const { nodes, headId } = buildLinkedList([...input.values]);

    yield createEvent.message(
      `Reverse Linked List (${method})`,
      'info',
      0
    );
    yield createEvent.message(
      `Original: [${input.values.join(' → ')}]`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
      },
    });

    if (method === 'iterative') {
      yield* runIterative(nodes, headId);
    } else {
      yield* runRecursive(nodes, headId);
    }
  },
};

function* runIterative(nodes: LinkedListNode[], headId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Using iterative approach with 3 pointers: prev, current, next`, 'step');
  yield createEvent.highlight([0, 1, 2]);

  if (headId === null) {
    yield createEvent.result('string', 'Empty', 'Nothing to reverse');
    return;
  }

  let prevId: number | null = null;
  let currentId: number | null = headId;
  let newHeadId: number | null = headId;

  yield createEvent.message(`Initialize: prev = null, current = head`, 'explanation');

  while (currentId !== null) {
    yield createEvent.highlight([3, 4]);

    const current = nodes.find(n => n.id === currentId);
    if (!current) break;

    const nextId = current.nextId;
    const next = nextId !== null ? nodes.find(n => n.id === nextId) : null;
    const prev = prevId !== null ? nodes.find(n => n.id === prevId) : null;

    // Highlight current state
    if (prev) prev.highlight = 'prev';
    current.highlight = 'current';
    if (next) next.highlight = 'next';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId: newHeadId,
        pointers: [
          ...(prevId !== null ? [{ nodeId: prevId as number, label: 'prev', color: 'orange' }] : []),
          ...(currentId !== null ? [{ nodeId: currentId as number, label: 'current', color: 'yellow' }] : []),
          ...(nextId !== null && nextId !== undefined ? [{ nodeId: nextId as number, label: 'next', color: 'cyan' }] : []),
        ],
        message: `Step: Reversing pointer at node ${current.value}`,
      },
    });

    yield createEvent.message(`Save next = ${next?.value ?? 'null'}`, 'explanation');

    // Reverse the link
    yield createEvent.highlight([5]);
    current.nextId = prevId;
    yield createEvent.message(`Reverse: ${current.value}.next = ${prev?.value ?? 'null'}`, 'explanation');

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId: currentId,  // Current becomes temporary head of reversed portion
        animating: 'reverse',
        animatingNodeId: currentId,
        pointers: [
          ...(prevId !== null ? [{ nodeId: prevId as number, label: 'prev', color: 'orange' }] : []),
          ...(currentId !== null ? [{ nodeId: currentId as number, label: 'current', color: 'yellow' }] : []),
          ...(nextId !== null && nextId !== undefined ? [{ nodeId: nextId as number, label: 'next', color: 'cyan' }] : []),
        ],
      },
    });

    // Move pointers forward
    yield createEvent.highlight([6, 7]);

    // Update head/tail status
    if (current.isHead) current.isHead = false;
    if (nextId === null) {
      current.isHead = true;
      current.isTail = false;
      newHeadId = currentId;
    }

    prevId = currentId;
    currentId = nextId ?? null;

    yield createEvent.message(`Move: prev = ${current.value}, current = ${next?.value ?? 'null'}`, 'explanation');

    // Clear highlights
    nodes.forEach(n => n.highlight = undefined);
  }

  yield createEvent.highlight([8]);

  // Fix head/tail
  const originalHead = nodes.find(n => n.id === headId);
  if (originalHead) {
    originalHead.isHead = false;
    originalHead.isTail = true;
  }

  const newHead = nodes.find(n => n.id === newHeadId);
  if (newHead) {
    newHead.isHead = true;
    newHead.isTail = false;
  }

  yield createEvent.message(`Reversal complete! New head is ${newHead?.value}`, 'info');

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId: newHeadId,
      message: `Reversed successfully!`,
    },
  });

  // Build reversed order for result
  const reversed: number[] = [];
  let curr: number | null = newHeadId;
  while (curr !== null) {
    const node = nodes.find(n => n.id === curr);
    if (node) {
      reversed.push(node.value);
      curr = node.nextId ?? null;
    } else break;
  }

  yield createEvent.result('string', reversed.join(' → '), `Reversed list`);
}

function* runRecursive(nodes: LinkedListNode[], headId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Using recursive approach`, 'step');
  yield createEvent.highlight([0]);

  if (headId === null) {
    yield createEvent.result('string', 'Empty', 'Nothing to reverse');
    return;
  }

  // Simulate recursion with stack
  const stack: number[] = [];
  let curr: number | null = headId;

  // Build call stack
  yield createEvent.message(`Building recursion stack to reach end of list...`, 'explanation');

  while (curr !== null) {
    stack.push(curr);
    const node = nodes.find(n => n.id === curr);
    if (node) {
      node.highlight = 'visited';
      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId,
          pointers: curr !== null ? [{ nodeId: curr as number, label: `call ${stack.length}`, color: 'purple' }] : [],
          message: `Recursion depth: ${stack.length}`,
        },
      });
      curr = node.nextId ?? null;
    } else break;
  }

  yield createEvent.highlight([1, 2]);
  yield createEvent.message(`Base case reached at end of list`, 'explanation');

  // The last node becomes new head
  const newHeadId = stack[stack.length - 1];
  const newHead = nodes.find(n => n.id === newHeadId);
  if (newHead) {
    newHead.highlight = 'head';
    newHead.isHead = true;
    newHead.isTail = false;
  }

  // Process stack in reverse (simulating recursion unwinding)
  yield createEvent.highlight([3]);
  yield createEvent.message(`Unwinding recursion and reversing pointers...`, 'step');

  for (let i = stack.length - 2; i >= 0; i--) {
    const currentId = stack[i];
    const nextId = stack[i + 1];

    const current = nodes.find(n => n.id === currentId);
    const next = nodes.find(n => n.id === nextId);

    if (current && next) {
      yield createEvent.highlight([4, 5]);
      current.highlight = 'current';
      next.highlight = 'next';

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId: newHeadId,
          pointers: [
            { nodeId: currentId, label: 'head', color: 'yellow' },
            { nodeId: nextId, label: 'head.next', color: 'cyan' },
          ],
          message: `Reversing: ${next.value}.next = ${current.value}`,
        },
      });

      // head.next.next = head
      next.nextId = currentId;
      yield createEvent.message(`${next.value}.next = ${current.value}`, 'explanation');

      // head.next = null
      current.nextId = null;
      yield createEvent.message(`${current.value}.next = null`, 'explanation');

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId: newHeadId,
          animating: 'reverse',
          animatingNodeId: currentId,
        },
      });

      current.highlight = undefined;
      next.highlight = undefined;
    }
  }

  yield createEvent.highlight([6]);

  // Fix head/tail
  const originalHead = nodes.find(n => n.id === headId);
  if (originalHead) {
    originalHead.isHead = false;
    originalHead.isTail = true;
  }

  yield createEvent.message(`Reversal complete! New head is ${newHead?.value}`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId: newHeadId,
      message: `Reversed successfully!`,
    },
  });

  // Build reversed order for result
  const reversed: number[] = [];
  curr = newHeadId;
  while (curr !== null) {
    const node = nodes.find(n => n.id === curr);
    if (node) {
      reversed.push(node.value);
      curr = node.nextId ?? null;
    } else break;
  }

  yield createEvent.result('string', reversed.join(' → '), `Reversed list`);
}
