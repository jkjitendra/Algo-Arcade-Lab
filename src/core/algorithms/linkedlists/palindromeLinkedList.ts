import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Palindrome Linked List
 * 
 * Check if a linked list is a palindrome by:
 * 1. Finding the middle
 * 2. Reversing the second half
 * 3. Comparing both halves
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const pseudocode = [
  'function isPalindrome(head):',
  '  // Find middle using slow/fast pointers',
  '  slow = fast = head',
  '  while fast and fast.next:',
  '    slow = slow.next',
  '    fast = fast.next.next',
  '  // Reverse second half',
  '  prev = null',
  '  while slow:',
  '    next = slow.next',
  '    slow.next = prev',
  '    prev = slow',
  '    slow = next',
  '  // Compare both halves',
  '  left = head, right = prev',
  '  while right:',
  '    if left.val != right.val:',
  '      return false',
  '    left = left.next',
  '    right = right.next',
  '  return true',
];

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

export const palindromeLinkedList: IAlgorithm<ArrayInput> = {
  id: 'palindrome-linked-list',
  name: 'Palindrome Linked List',
  category: 'linkedlists',
  difficulty: 'intermediate',

  pseudocodeLines: pseudocode,

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 1) {
      return { ok: false, error: 'List must have at least 1 element' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'List size must be 10 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const { nodes, headId } = buildLinkedList([...input.values]);

    yield createEvent.message(
      `Check if Linked List is Palindrome`,
      'info',
      0
    );

    const isPalin = input.values.join('') === [...input.values].reverse().join('');
    yield createEvent.message(
      `List: [${input.values.join(' → ')}] - Expected: ${isPalin ? 'IS' : 'is NOT'} a palindrome`,
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

    yield* runPalindromeCheck(nodes, headId);
  },
};

function* runPalindromeCheck(nodes: LinkedListNode[], headId: number | null): Generator<AlgoEvent, void, unknown> {
  if (headId === null) {
    yield createEvent.message(`Empty list is a palindrome`, 'info');
    yield createEvent.result('boolean', true, 'Empty - palindrome');
    return;
  }

  // Single node is palindrome
  const head = nodes.find(n => n.id === headId);
  if (head && head.nextId === null) {
    yield createEvent.message(`Single node is a palindrome`, 'info');
    yield createEvent.result('boolean', true, 'Single node - palindrome');
    return;
  }

  // Phase 1: Find middle
  yield createEvent.message(`Phase 1: Find middle using slow/fast pointers`, 'step');
  yield createEvent.highlight([0, 1, 2, 3, 4, 5]);

  let slowId = headId;
  let fastId = headId;
  let step = 0;

  while (true) {
    const fast = nodes.find(n => n.id === fastId);
    if (!fast || fast.nextId === null) break;

    const slow = nodes.find(n => n.id === slowId);
    const fastNext = nodes.find(n => n.id === fast.nextId);

    if (slow) {
      slow.highlight = 'slow';
      if (slow.nextId !== null && slow.nextId !== undefined) {
        slowId = slow.nextId as number;
      }
    }

    if (fast) fast.highlight = 'fast';

    if (fastNext && fastNext.nextId !== null && fastNext.nextId !== undefined) {
      fastId = fastNext.nextId as number;
    } else {
      break;
    }

    step++;

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [
          { nodeId: slowId, label: 'slow', color: 'blue' },
          { nodeId: fastId, label: 'fast', color: 'purple' },
        ],
        message: `Finding middle... step ${step}`,
      },
    });
  }

  const middle = nodes.find(n => n.id === slowId);
  yield createEvent.message(`Middle found at value ${middle?.value}`, 'info');

  // Phase 2: Reverse second half (from slow onwards)
  yield createEvent.message(`Phase 2: Reverse second half of the list`, 'step');
  yield createEvent.highlight([6, 7, 8, 9, 10, 11, 12]);

  nodes.forEach(n => n.highlight = undefined);

  let prevId: number | null = null;
  let currentId: number | null = slowId;
  let reversedHeadId: number | null = null;

  while (currentId !== null) {
    const current = nodes.find(n => n.id === currentId);
    if (!current) break;

    const nextId = current.nextId;

    current.highlight = 'current';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [
          ...(prevId !== null ? [{ nodeId: prevId as number, label: 'prev', color: 'orange' }] : []),
          { nodeId: currentId as number, label: 'current', color: 'yellow' },
          ...(nextId !== null && nextId !== undefined ? [{ nodeId: nextId as number, label: 'next', color: 'cyan' }] : []),
        ],
        message: `Reversing: ${current.value}.next = ${prevId !== null ? nodes.find(n => n.id === prevId)?.value : 'null'}`,
      },
    });

    current.nextId = prevId;
    current.highlight = 'visited';

    prevId = currentId;
    currentId = nextId ?? null;
  }

  reversedHeadId = prevId;

  yield createEvent.message(`Second half reversed`, 'info');

  // Phase 3: Compare both halves
  yield createEvent.message(`Phase 3: Compare first and reversed second half`, 'step');
  yield createEvent.highlight([13, 14, 15, 16, 17, 18, 19]);

  nodes.forEach(n => n.highlight = undefined);

  let leftId: number | null = headId;
  let rightId: number | null = reversedHeadId;
  let isPalindrome = true;
  let compareStep = 0;

  while (rightId !== null) {
    const left = nodes.find(n => n.id === leftId);
    const right = nodes.find(n => n.id === rightId);

    if (!left || !right) break;

    left.highlight = 'slow';
    right.highlight = 'fast';

    compareStep++;

    const match = left.value === right.value;

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [
          { nodeId: leftId!, label: 'left', color: 'blue' },
          { nodeId: rightId, label: 'right', color: 'purple' },
        ],
        message: `Compare: ${left.value} ${match ? '==' : '!='} ${right.value} → ${match ? '✓' : '✗'}`,
      },
    });

    yield createEvent.message(
      `Compare step ${compareStep}: ${left.value} vs ${right.value} → ${match ? 'Match!' : 'Mismatch!'}`,
      'explanation'
    );

    if (!match) {
      isPalindrome = false;
      left.highlight = 'target';
      right.highlight = 'target';

      yield createEvent.message(`❌ Mismatch found! Not a palindrome`, 'info');

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId,
          message: `Not a palindrome: ${left.value} ≠ ${right.value}`,
        },
      });

      yield createEvent.result('boolean', false, `Not a palindrome`);
      return;
    }

    left.highlight = 'match';
    right.highlight = 'match';

    leftId = left.nextId ?? null;
    rightId = right.nextId ?? null;
  }

  yield createEvent.highlight([20]);

  yield createEvent.message(`✓ All pairs matched! It's a palindrome!`, 'info');

  nodes.forEach(n => n.highlight = 'match');

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
      message: `✓ Palindrome confirmed!`,
    },
  });

  yield createEvent.result('boolean', true, `Is a palindrome`);
}
