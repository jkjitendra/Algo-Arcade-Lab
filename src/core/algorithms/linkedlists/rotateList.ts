import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Rotate Linked List
 * 
 * Rotate list to the right by k positions.
 * Make it circular, find new tail, and break.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const pseudocode = [
  'function rotateRight(head, k):',
  '  if head is null or k == 0: return head',
  '  // Find length and last node',
  '  length = 1, tail = head',
  '  while tail.next != null:',
  '    tail = tail.next',
  '    length++',
  '  // Normalize k',
  '  k = k % length',
  '  if k == 0: return head',
  '  // Make circular',
  '  tail.next = head',
  '  // Find new tail (length - k - 1 steps from head)',
  '  newTail = head',
  '  for i = 0 to length - k - 2:',
  '    newTail = newTail.next',
  '  // Break circle',
  '  newHead = newTail.next',
  '  newTail.next = null',
  '  return newHead',
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

export const rotateList: IAlgorithm<ArrayInput> = {
  id: 'rotate-list',
  name: 'Rotate List',
  category: 'linkedlists',
  difficulty: 'intermediate',

  pseudocodeLines: pseudocode,

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'k',
      label: 'Rotate by K positions',
      default: 2,
      min: 1,
      max: 10,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'List must have at least 2 elements' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'List size must be 10 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const k = (params?.k ?? 2) as number;

    const { nodes, headId } = buildLinkedList([...input.values]);

    yield createEvent.message(
      `Rotate List Right by ${k} Positions`,
      'info',
      0
    );

    const effectiveK = k % input.values.length;
    yield createEvent.message(
      `List: [${input.values.join(' → ')}], K=${k} (effective: ${effectiveK})`,
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

    yield* runRotate(nodes, headId, k);
  },
};

function* runRotate(nodes: LinkedListNode[], headId: number | null, k: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([0, 1]);

  if (headId === null || k === 0) {
    yield createEvent.message(`Nothing to rotate`, 'info');
    yield createEvent.result('string', 'No rotation', 'Empty or k=0');
    return;
  }

  // Find length and tail
  yield createEvent.highlight([2, 3, 4, 5, 6]);
  yield createEvent.message(`Step 1: Find length and tail node`, 'step');

  let length = 1;
  let tailId = headId;
  let tail = nodes.find(n => n.id === tailId);

  while (tail && tail.nextId !== null) {
    tail.highlight = 'visited';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [{ nodeId: tailId as number, label: `pos ${length}`, color: 'yellow' }],
        message: `Finding length: ${length}`,
      },
    });

    tailId = tail.nextId as number;
    tail = nodes.find(n => n.id === tailId);
    length++;
  }

  yield createEvent.message(`Length = ${length}, Tail value = ${tail?.value}`, 'info');

  // Normalize k
  yield createEvent.highlight([7, 8, 9]);
  k = k % length;

  if (k === 0) {
    yield createEvent.message(`K % length = 0, no rotation needed`, 'info');
    nodes.forEach(n => n.highlight = undefined);
    yield createEvent.result('string', nodes.map(n => n.value).join(' → '), 'No rotation needed');
    return;
  }

  yield createEvent.message(`Effective rotation: ${k} positions`, 'explanation');

  // Make circular
  yield createEvent.highlight([10, 11]);
  yield createEvent.message(`Step 2: Connect tail to head (make circular)`, 'step');

  if (tail) {
    tail.nextId = headId;
    tail.isTail = false;
    tail.highlight = 'current';
  }

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular',  // Now it's circular
      headId,
      message: `List is now circular: tail → head`,
    },
  });

  // Find new tail (length - k - 1 steps from head)
  yield createEvent.highlight([12, 13, 14, 15]);
  yield createEvent.message(`Step 3: Find new tail at position ${length - k - 1}`, 'step');

  let newTailId = headId;
  let newTail = nodes.find(n => n.id === newTailId);
  const stepsToNewTail = length - k - 1;

  nodes.forEach(n => n.highlight = undefined);

  for (let i = 0; i < stepsToNewTail; i++) {
    if (newTail) {
      newTail.highlight = 'visited';

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'circular',
          headId,
          pointers: [{ nodeId: newTailId as number, label: `step ${i + 1}`, color: 'orange' }],
          message: `Moving to new tail position...`,
        },
      });

      if (newTail.nextId !== null) {
        newTailId = newTail.nextId as number;
        newTail = nodes.find(n => n.id === newTailId);
      }
    }
  }

  if (newTail) {
    newTail.highlight = 'tail';
    yield createEvent.message(`New tail found: ${newTail.value}`, 'info');
  }

  // Break circle and set new head
  yield createEvent.highlight([16, 17, 18, 19]);
  yield createEvent.message(`Step 4: Break circle and set new head`, 'step');

  const newHeadId = newTail?.nextId;
  const newHead = nodes.find(n => n.id === newHeadId);

  if (newTail) {
    newTail.nextId = null;
    newTail.isTail = true;
  }

  // Update head/tail markers
  const oldHead = nodes.find(n => n.id === headId);
  if (oldHead) oldHead.isHead = false;
  if (newHead) {
    newHead.isHead = true;
    newHead.highlight = 'head';
  }

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId: newHeadId ?? null,
      animating: 'traverse',
      message: `Rotation complete! New head: ${newHead?.value}`,
    },
  });

  yield createEvent.message(`🎯 Rotation complete! New head is ${newHead?.value}`, 'info');

  // Build result in new order
  const rotated: number[] = [];
  let curr: number | null | undefined = newHeadId;
  const visited = new Set<number>();

  while (curr !== null && curr !== undefined && !visited.has(curr)) {
    visited.add(curr);
    const node = nodes.find(n => n.id === curr);
    if (node) {
      rotated.push(node.value);
      curr = node.nextId;
    } else break;
  }

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId: newHeadId ?? null,
      message: `Rotated: [${rotated.join(' → ')}]`,
    },
  });

  yield createEvent.result('string', rotated.join(' → '), `Rotated right by ${k}`);
}
