import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Remove N-th Node from End
 * 
 * Remove the n-th node from the end using two pointers.
 * First pointer advances n steps, then both move until first reaches end.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const pseudocode = [
  'function removeNthFromEnd(head, n):',
  '  dummy = Node(0, head)  // Dummy before head',
  '  first = dummy',
  '  second = dummy',
  '  // Advance first by n+1 steps',
  '  for i = 0 to n:',
  '    first = first.next',
  '  // Move both until first reaches end',
  '  while first != null:',
  '    first = first.next',
  '    second = second.next',
  '  // second.next is the node to remove',
  '  second.next = second.next.next',
  '  return dummy.next',
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

export const removeNthFromEnd: IAlgorithm<ArrayInput> = {
  id: 'remove-nth-from-end',
  name: 'Remove N-th from End',
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
      id: 'n',
      label: 'N (from end, 1 = last)',
      default: 2,
      min: 1,
      max: 10,
    } as AlgorithmParameter,
  ],

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

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const n = Math.min((params?.n ?? 2) as number, input.values.length);

    const { nodes, headId } = buildLinkedList([...input.values]);

    yield createEvent.message(
      `Remove ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} Node from End`,
      'info',
      0
    );

    const targetPos = input.values.length - n;
    yield createEvent.message(
      `List has ${input.values.length} nodes. Will remove node at position ${targetPos} (value: ${input.values[targetPos]})`,
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

    yield* runRemoveNth(nodes, headId, n);
  },
};

function* runRemoveNth(nodes: LinkedListNode[], headId: number | null, n: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([0, 1, 2, 3]);

  if (headId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('string', 'Empty', 'Nothing to remove');
    return;
  }

  // We'll simulate dummy by tracking positions
  // firstId will be n+1 steps ahead of secondId

  let firstId: number | null = headId;
  let secondId: number | null = null;  // null means "at dummy before head"
  let secondPrevPosition = -1;  // -1 means at dummy position

  yield createEvent.message(`Advance first pointer by ${n + 1} steps (n+1 for dummy offset)`, 'step');
  yield createEvent.highlight([4, 5, 6]);

  // Advance first by n steps
  for (let i = 0; i < n && firstId !== null; i++) {
    const firstNode = nodes.find(nd => nd.id === firstId);
    if (firstNode) {
      firstNode.highlight = 'fast';

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId,
          pointers: [
            { nodeId: firstId, label: `first (step ${i + 1})`, color: 'purple' },
          ],
          message: `First advances: step ${i + 1}/${n}`,
        },
      });

      firstNode.highlight = 'visited';
      firstId = firstNode.nextId ?? null;
    }
  }

  // Now move both until first reaches null
  yield createEvent.message(`Now move both pointers until first reaches end`, 'step');
  yield createEvent.highlight([7, 8, 9, 10]);

  secondId = headId;
  let prevSecondId: number | null = null;
  let step = 0;

  while (firstId !== null) {
    const firstNode = nodes.find(nd => nd.id === firstId);
    const secondNode = nodes.find(nd => nd.id === secondId);

    // Clear previous highlights
    nodes.forEach(nd => nd.highlight = undefined);

    if (firstNode) firstNode.highlight = 'fast';
    if (secondNode) secondNode.highlight = 'slow';

    step++;

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [
          ...(firstId !== null ? [{ nodeId: firstId, label: 'first', color: 'purple' }] : []),
          ...(secondId !== null ? [{ nodeId: secondId, label: 'second', color: 'blue' }] : []),
        ],
        message: `Step ${step}: Gap of ${n} maintained`,
      },
    });

    yield createEvent.message(
      `Step ${step}: first at ${firstNode?.value ?? 'null'}, second at ${secondNode?.value ?? 'dummy'}`,
      'explanation'
    );

    // Move both
    if (firstNode) {
      firstId = firstNode.nextId ?? null;
    }

    prevSecondId = secondId;
    if (secondNode && secondNode.nextId !== null && secondNode.nextId !== undefined) {
      secondId = secondNode.nextId;
    } else if (secondId === null) {
      secondId = headId;
    }
  }

  yield createEvent.highlight([11, 12]);

  // Now secondId points to the node before the one to remove
  // We need to remove the node AFTER prevSecondId (or remove head if prevSecondId is before head)

  const nodeToRemove = nodes.find(nd => nd.id === secondId);

  if (!nodeToRemove) {
    yield createEvent.message(`Could not find node to remove`, 'info');
    yield createEvent.result('string', 'Error', 'Node not found');
    return;
  }

  nodeToRemove.highlight = 'target';

  yield createEvent.message(`Node to remove: ${nodeToRemove.value}`, 'info');

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
      animating: 'delete',
      animatingNodeId: nodeToRemove.id,
      message: `Removing node ${nodeToRemove.value}`,
    },
  });

  // Update pointers
  let newHeadId: number | null = headId;
  if (prevSecondId !== null) {
    const prevNode = nodes.find(nd => nd.id === prevSecondId);
    if (prevNode) {
      prevNode.nextId = nodeToRemove.nextId;
      if (nodeToRemove.isTail) prevNode.isTail = true;
    }
  } else {
    // Removing the head
    newHeadId = nodeToRemove.nextId ?? null;
    if (newHeadId !== null) {
      const newHead = nodes.find(nd => nd.id === newHeadId);
      if (newHead) newHead.isHead = true;
    }
  }

  // Remove from array
  const removeIndex = nodes.findIndex(nd => nd.id === nodeToRemove.id);
  const removedValue = nodeToRemove.value;
  nodes.splice(removeIndex, 1);

  yield createEvent.highlight([13]);

  nodes.forEach(nd => nd.highlight = undefined);

  yield createEvent.message(`Successfully removed ${removedValue}!`, 'info');

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId: newHeadId,
      message: `Removed ${removedValue} (${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} from end)`,
    },
  });

  // Build remaining list
  const remaining: number[] = [];
  let curr = newHeadId;
  while (curr !== null) {
    const node = nodes.find(nd => nd.id === curr);
    if (node) {
      remaining.push(node.value);
      curr = node.nextId ?? null;
    } else break;
  }

  yield createEvent.result('string', remaining.join(' → '), `Removed ${removedValue}, remaining: [${remaining.join(' → ')}]`);
}
