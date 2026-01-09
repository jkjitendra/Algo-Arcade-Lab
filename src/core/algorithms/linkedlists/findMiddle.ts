import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Find Middle Element of Linked List
 * 
 * Uses slow/fast pointer technique to find middle in one pass.
 * When fast reaches end, slow is at middle.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const pseudocode = [
  'function findMiddle(head):',
  '  if head is null: return null',
  '  slow = head',
  '  fast = head',
  '  while fast != null and fast.next != null:',
  '    slow = slow.next',
  '    fast = fast.next.next',
  '  return slow  // Middle element',
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

export const findMiddle: IAlgorithm<ArrayInput> = {
  id: 'find-middle',
  name: 'Find Middle Element',
  category: 'linkedlists',
  difficulty: 'beginner',

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
    if (input.values.length > 12) {
      return { ok: false, error: 'List size must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const { nodes, headId } = buildLinkedList([...input.values]);

    yield createEvent.message(
      `Find Middle Element (Slow/Fast Pointers)`,
      'info',
      0
    );

    const expectedMiddle = Math.floor(input.values.length / 2);
    yield createEvent.message(
      `List has ${input.values.length} elements. Expected middle at position ${expectedMiddle}`,
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

    yield* runFindMiddle(nodes, headId);
  },
};

function* runFindMiddle(nodes: LinkedListNode[], headId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([0, 1]);

  if (headId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('string', 'null', 'Empty list');
    return;
  }

  yield createEvent.highlight([2, 3]);
  yield createEvent.message(`Initialize: slow = head, fast = head`, 'explanation');

  let slowId = headId;
  let fastId = headId;
  let step = 0;

  // Show initial state
  const head = nodes.find(n => n.id === headId);
  if (head) {
    head.highlight = 'current';
  }

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
      pointers: [
        { nodeId: slowId, label: 'slow 🐢', color: 'blue' },
        { nodeId: fastId, label: 'fast 🐇', color: 'purple' },
      ],
      message: `Both pointers start at head`,
    },
  });

  while (true) {
    yield createEvent.highlight([4]);

    const fast = nodes.find(n => n.id === fastId);

    // Check termination condition
    if (!fast || fast.nextId === null) {
      break;
    }

    const fastNext = nodes.find(n => n.id === fast.nextId);
    if (!fastNext) {
      break;
    }

    // Move slow by 1
    yield createEvent.highlight([5]);
    const slow = nodes.find(n => n.id === slowId);
    if (slow && slow.nextId !== null && slow.nextId !== undefined) {
      slow.highlight = 'visited';
      slowId = slow.nextId as number;
    }

    // Move fast by 2
    yield createEvent.highlight([6]);
    if (fastNext.nextId !== null && fastNext.nextId !== undefined) {
      fastId = fastNext.nextId as number;
    } else {
      fastId = fastNext.id;
      // One more step for fast, but at end
      fast.highlight = 'visited';
      fastNext.highlight = 'fast';
    }

    step++;

    // Reset and update highlights
    nodes.forEach(n => {
      if (n.id !== slowId && n.id !== fastId) {
        n.highlight = 'visited';
      }
    });

    const slowNode = nodes.find(n => n.id === slowId);
    const fastNode = nodes.find(n => n.id === fastId);

    if (slowNode) slowNode.highlight = 'slow';
    if (fastNode) fastNode.highlight = 'fast';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [
          { nodeId: slowId, label: 'slow 🐢', color: 'blue' },
          { nodeId: fastId, label: 'fast 🐇', color: 'purple' },
        ],
        message: `Step ${step}: slow moves 1, fast moves 2`,
      },
    });

    yield createEvent.message(
      `Step ${step}: slow at ${slowNode?.value}, fast at ${fastNode?.value}`,
      'explanation'
    );

    // Check if fast has reached or passed end
    const currentFast = nodes.find(n => n.id === fastId);
    if (!currentFast || currentFast.nextId === null) {
      break;
    }
  }

  yield createEvent.highlight([7]);

  // Slow is now at middle
  const middleNode = nodes.find(n => n.id === slowId);
  nodes.forEach(n => n.highlight = undefined);
  if (middleNode) {
    middleNode.highlight = 'middle';
  }

  yield createEvent.message(`🎯 Middle element found: ${middleNode?.value}`, 'info');

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
      pointers: [
        { nodeId: slowId, label: 'MIDDLE', color: 'green' },
      ],
      message: `Middle element: ${middleNode?.value}`,
    },
  });

  // Find position
  let position = 0;
  let curr: number | null = headId;
  while (curr !== slowId && curr !== null) {
    const node = nodes.find(n => n.id === curr);
    if (node) {
      curr = node.nextId ?? null;
      position++;
    } else break;
  }

  yield createEvent.result('string', `${middleNode?.value}`, `Middle is ${middleNode?.value} at position ${position}`);
}
