import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Merge Two Sorted Linked Lists
 * 
 * Merge two sorted linked lists into one sorted list.
 * Uses two pointers to compare and link nodes.
 * 
 * Time Complexity: O(n + m)
 * Space Complexity: O(1) - only rearranging pointers
 */

const pseudocode = [
  'function mergeSorted(l1, l2):',
  '  dummy = createNode(0)',
  '  current = dummy',
  '  while l1 != null and l2 != null:',
  '    if l1.value <= l2.value:',
  '      current.next = l1',
  '      l1 = l1.next',
  '    else:',
  '      current.next = l2',
  '      l2 = l2.next',
  '    current = current.next',
  '  // Attach remaining nodes',
  '  if l1 != null: current.next = l1',
  '  if l2 != null: current.next = l2',
  '  return dummy.next',
];

function buildSortedList(values: number[], idOffset: number = 0): { nodes: LinkedListNode[]; headId: number | null } {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) {
    return { nodes: [], headId: null };
  }

  const nodes: LinkedListNode[] = sorted.map((value, index) => ({
    id: idOffset + index,
    value,
    nextId: index < sorted.length - 1 ? idOffset + index + 1 : null,
    isHead: index === 0,
    isTail: index === sorted.length - 1,
  }));

  return { nodes, headId: idOffset };
}

export const mergeSortedLists: IAlgorithm<ArrayInput> = {
  id: 'merge-sorted-lists',
  name: 'Merge Two Sorted Lists',
  category: 'linkedlists',
  difficulty: 'beginner',

  pseudocodeLines: pseudocode,

  timeComplexity: {
    best: 'O(n + m)',
    average: 'O(n + m)',
    worst: 'O(n + m)',
  },

  spaceComplexity: 'O(1)',

  parameters: [],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Need at least 2 elements to split into two lists' };
    }
    if (input.values.length > 12) {
      return { ok: false, error: 'Total size must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    // Split input into two lists
    const mid = Math.floor(input.values.length / 2);
    const list1Values = input.values.slice(0, mid);
    const list2Values = input.values.slice(mid);

    const { nodes: nodes1, headId: head1 } = buildSortedList(list1Values, 0);
    const { nodes: nodes2, headId: head2 } = buildSortedList(list2Values, 100);

    yield createEvent.message(
      `Merge Two Sorted Linked Lists`,
      'info',
      0
    );

    const sorted1 = [...list1Values].sort((a, b) => a - b);
    const sorted2 = [...list2Values].sort((a, b) => a - b);

    yield createEvent.message(
      `List 1: [${sorted1.join(' → ')}], List 2: [${sorted2.join(' → ')}]`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes1],
        listType: 'singly',
        headId: head1,
        secondList: [...nodes2],
        secondHeadId: head2,
      },
    });

    yield* runMerge(nodes1, head1, nodes2, head2);
  },
};

function* runMerge(
  nodes1: LinkedListNode[],
  head1: number | null,
  nodes2: LinkedListNode[],
  head2: number | null
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([0, 1, 2]);
  yield createEvent.message(`Create dummy node and current pointer`, 'step');

  // Create result list
  const resultNodes: LinkedListNode[] = [];
  let resultHeadId: number | null = null;
  let lastResultId: number | null = null;
  let resultIdCounter = 200;

  let l1Id: number | null = head1;
  let l2Id: number | null = head2;
  let step = 0;

  while (l1Id !== null && l2Id !== null) {
    yield createEvent.highlight([3]);

    const l1Node = nodes1.find(n => n.id === l1Id);
    const l2Node = nodes2.find(n => n.id === l2Id);

    if (!l1Node || !l2Node) break;

    // Highlight current comparison
    l1Node.highlight = 'current';
    l2Node.highlight = 'current';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes1],
        listType: 'singly',
        headId: head1,
        secondList: [...nodes2],
        secondHeadId: head2,
        resultList: [...resultNodes],
        resultHeadId,
        pointers: [
          { nodeId: l1Id, label: 'l1', color: 'blue' },
        ],
        message: `Comparing ${l1Node.value} vs ${l2Node.value}`,
      },
    });

    step++;
    yield createEvent.message(
      `Step ${step}: Compare ${l1Node.value} vs ${l2Node.value}`,
      'explanation'
    );

    let chosenNode: LinkedListNode;
    let chosenValue: number;

    if (l1Node.value <= l2Node.value) {
      yield createEvent.highlight([4, 5, 6]);
      chosenValue = l1Node.value;
      chosenNode = l1Node;
      l1Node.highlight = 'match';
      l1Id = l1Node.nextId ?? null;
      yield createEvent.message(`${l1Node.value} <= ${l2Node.value}, take from List 1`, 'explanation');
    } else {
      yield createEvent.highlight([7, 8, 9]);
      chosenValue = l2Node.value;
      chosenNode = l2Node;
      l2Node.highlight = 'match';
      l2Id = l2Node.nextId ?? null;
      yield createEvent.message(`${l1Node.value} > ${l2Node.value}, take from List 2`, 'explanation');
    }

    // Add to result
    const newResultNode: LinkedListNode = {
      id: resultIdCounter++,
      value: chosenValue,
      nextId: null,
      isHead: resultNodes.length === 0,
      isTail: true,
      highlight: 'current',
    };

    if (lastResultId !== null) {
      const lastNode = resultNodes.find(n => n.id === lastResultId);
      if (lastNode) {
        lastNode.nextId = newResultNode.id;
        lastNode.isTail = false;
        lastNode.highlight = undefined;
      }
    }

    resultNodes.push(newResultNode);
    if (resultHeadId === null) resultHeadId = newResultNode.id;
    lastResultId = newResultNode.id;

    yield createEvent.highlight([10]);

    // Mark chosen as visited in source
    chosenNode.highlight = 'visited';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes1],
        listType: 'singly',
        headId: head1,
        secondList: [...nodes2],
        secondHeadId: head2,
        resultList: [...resultNodes],
        resultHeadId,
        animating: 'merge',
        message: `Added ${chosenValue} to result`,
      },
    });
  }

  // Attach remaining nodes from l1
  yield createEvent.highlight([11, 12]);
  while (l1Id !== null) {
    const l1Node = nodes1.find(n => n.id === l1Id);
    if (!l1Node) break;

    yield createEvent.message(`Attaching remaining from List 1: ${l1Node.value}`, 'explanation');

    const newResultNode: LinkedListNode = {
      id: resultIdCounter++,
      value: l1Node.value,
      nextId: null,
      isHead: false,
      isTail: true,
      highlight: 'current',
    };

    if (lastResultId !== null) {
      const lastNode = resultNodes.find(n => n.id === lastResultId);
      if (lastNode) {
        lastNode.nextId = newResultNode.id;
        lastNode.isTail = false;
        lastNode.highlight = undefined;
      }
    }

    resultNodes.push(newResultNode);
    if (resultHeadId === null) resultHeadId = newResultNode.id;
    lastResultId = newResultNode.id;

    l1Node.highlight = 'visited';
    l1Id = l1Node.nextId ?? null;
  }

  // Attach remaining nodes from l2
  yield createEvent.highlight([13]);
  while (l2Id !== null) {
    const l2Node = nodes2.find(n => n.id === l2Id);
    if (!l2Node) break;

    yield createEvent.message(`Attaching remaining from List 2: ${l2Node.value}`, 'explanation');

    const newResultNode: LinkedListNode = {
      id: resultIdCounter++,
      value: l2Node.value,
      nextId: null,
      isHead: false,
      isTail: true,
      highlight: 'current',
    };

    if (lastResultId !== null) {
      const lastNode = resultNodes.find(n => n.id === lastResultId);
      if (lastNode) {
        lastNode.nextId = newResultNode.id;
        lastNode.isTail = false;
        lastNode.highlight = undefined;
      }
    }

    resultNodes.push(newResultNode);
    if (resultHeadId === null) resultHeadId = newResultNode.id;
    lastResultId = newResultNode.id;

    l2Node.highlight = 'visited';
    l2Id = l2Node.nextId ?? null;
  }

  yield createEvent.highlight([14]);

  // Clear highlights on result
  resultNodes.forEach(n => n.highlight = undefined);

  yield createEvent.message(`🎯 Merge complete!`, 'info');

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes1],
      listType: 'singly',
      headId: head1,
      secondList: [...nodes2],
      secondHeadId: head2,
      resultList: [...resultNodes],
      resultHeadId,
      message: `Merged list created`,
    },
  });

  // Build result string
  const resultValues: number[] = [];
  let curr = resultHeadId;
  while (curr !== null) {
    const node = resultNodes.find(n => n.id === curr);
    if (node) {
      resultValues.push(node.value);
      curr = node.nextId ?? null;
    } else break;
  }

  yield createEvent.result('string', resultValues.join(' → '), `Merged: [${resultValues.join(' → ')}]`);
}
