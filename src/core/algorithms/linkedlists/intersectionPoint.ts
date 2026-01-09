import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Intersection Point of Two Linked Lists
 * 
 * Find where two linked lists intersect using length difference.
 * Advance the longer list by the difference, then move together.
 * 
 * Time Complexity: O(n + m)
 * Space Complexity: O(1)
 */

const pseudocode = [
  'function getIntersection(headA, headB):',
  '  // Get lengths of both lists',
  '  lenA = getLength(headA)',
  '  lenB = getLength(headB)',
  '  // Advance longer list by difference',
  '  diff = abs(lenA - lenB)',
  '  if lenA > lenB:',
  '    for i = 0 to diff: headA = headA.next',
  '  else:',
  '    for i = 0 to diff: headB = headB.next',
  '  // Move both together until they meet',
  '  while headA != headB:',
  '    headA = headA.next',
  '    headB = headB.next',
  '  return headA  // Intersection or null',
];

function buildIntersectingLists(valuesA: number[], valuesB: number[], intersectPos: number): {
  nodesA: LinkedListNode[];
  nodesB: LinkedListNode[];
  headA: number | null;
  headB: number | null;
  intersectionId: number | null;
} {
  // Build first list
  const nodesA: LinkedListNode[] = valuesA.map((value, index) => ({
    id: index,
    value,
    nextId: index < valuesA.length - 1 ? index + 1 : null,
    isHead: index === 0,
    isTail: index === valuesA.length - 1,
  }));

  // Build second list with offset IDs
  const offset = 100;
  const nodesB: LinkedListNode[] = valuesB.map((value, index) => ({
    id: offset + index,
    value,
    nextId: index < valuesB.length - 1 ? offset + index + 1 : null,
    isHead: index === 0,
    isTail: index === valuesB.length - 1,
  }));

  let intersectionId: number | null = null;

  // Create intersection if valid
  if (intersectPos >= 0 && intersectPos < valuesA.length && nodesB.length > 0) {
    const lastB = nodesB[nodesB.length - 1];
    lastB.nextId = intersectPos;
    lastB.isTail = false;
    intersectionId = intersectPos;

    // Mark intersection point
    const intersectNode = nodesA.find(n => n.id === intersectPos);
    if (intersectNode) {
      intersectNode.highlight = 'cycle';  // Will show differently
    }
  }

  return {
    nodesA,
    nodesB,
    headA: nodesA.length > 0 ? 0 : null,
    headB: nodesB.length > 0 ? offset : null,
    intersectionId,
  };
}

export const intersectionPoint: IAlgorithm<ArrayInput> = {
  id: 'intersection-point',
  name: 'Intersection Point',
  category: 'linkedlists',
  difficulty: 'intermediate',

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
    if (input.values.length < 4) {
      return { ok: false, error: 'Need at least 4 elements for two lists' };
    }
    if (input.values.length > 12) {
      return { ok: false, error: 'Total size must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    // Split input: first part is list A, second part is list B partial
    // Last elements of A will be the shared intersection
    const mid = Math.floor(input.values.length * 0.6);
    const intersectSize = Math.max(2, Math.floor(input.values.length * 0.3));

    const listA = input.values.slice(0, mid + intersectSize);
    const listB = input.values.slice(mid - 1, mid + 1);  // Unique part of B
    const intersectPos = mid;  // Where B joins A

    const { nodesA, nodesB, headA, headB, intersectionId } = buildIntersectingLists(
      listA,
      listB,
      intersectPos
    );

    yield createEvent.message(
      `Find Intersection Point of Two Lists`,
      'info',
      0
    );

    yield createEvent.message(
      `List A: ${listA.length} nodes, List B (unique): ${listB.length} nodes, merge at position ${intersectPos}`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodesA],
        listType: 'singly',
        headId: headA,
        secondList: [...nodesB],
        secondHeadId: headB,
        intersectionId,
      },
    });

    yield* runFindIntersection(nodesA, nodesB, headA, headB, intersectionId);
  },
};

function* runFindIntersection(
  nodesA: LinkedListNode[],
  nodesB: LinkedListNode[],
  headA: number | null,
  headB: number | null,
  actualIntersectionId: number | null
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([0, 1, 2, 3]);
  yield createEvent.message(`Step 1: Calculate lengths of both lists`, 'step');

  // Calculate length of A
  let lenA = 0;
  let currA: number | null = headA;
  while (currA !== null) {
    const node = nodesA.find(n => n.id === currA);
    if (node) {
      lenA++;
      currA = node.nextId ?? null;
    } else break;
  }

  // Calculate length of B (including shared part from A)
  let lenB = 0;
  let currB: number | null = headB;
  while (currB !== null) {
    let node = nodesB.find(n => n.id === currB);
    if (!node) node = nodesA.find(n => n.id === currB);
    if (node) {
      lenB++;
      currB = node.nextId ?? null;
    } else break;
  }

  yield createEvent.message(`Length A: ${lenA}, Length B: ${lenB}`, 'info');

  // Calculate difference
  yield createEvent.highlight([4, 5]);
  const diff = Math.abs(lenA - lenB);
  yield createEvent.message(`Difference: ${diff} nodes`, 'explanation');

  // Advance longer list
  let ptrA: number | null = headA;
  let ptrB: number | null = headB;

  if (lenA > lenB) {
    yield createEvent.highlight([6, 7]);
    yield createEvent.message(`Advancing List A by ${diff} steps...`, 'step');

    for (let i = 0; i < diff && ptrA !== null; i++) {
      const node = nodesA.find(n => n.id === ptrA);
      if (node) {
        node.highlight = 'visited';

        yield createEvent.auxiliary({
          type: 'linkedlist',
          linkedListData: {
            nodes: [...nodesA],
            listType: 'singly',
            headId: headA,
            secondList: [...nodesB],
            secondHeadId: headB,
            pointers: [
              { nodeId: ptrA, label: `advance ${i + 1}`, color: 'blue' },
            ],
            intersectionId: actualIntersectionId,
          },
        });

        ptrA = node.nextId ?? null;
      }
    }
  } else if (lenB > lenA) {
    yield createEvent.highlight([8, 9]);
    yield createEvent.message(`Advancing List B by ${diff} steps...`, 'step');

    for (let i = 0; i < diff && ptrB !== null; i++) {
      let node = nodesB.find(n => n.id === ptrB);
      if (!node) node = nodesA.find(n => n.id === ptrB);
      if (node) {
        node.highlight = 'visited';

        yield createEvent.auxiliary({
          type: 'linkedlist',
          linkedListData: {
            nodes: [...nodesA],
            listType: 'singly',
            headId: headA,
            secondList: [...nodesB],
            secondHeadId: headB,
            pointers: [
              { nodeId: ptrB, label: `advance ${i + 1}`, color: 'purple' },
            ],
            intersectionId: actualIntersectionId,
          },
        });

        ptrB = node.nextId ?? null;
      }
    }
  }

  // Now move together
  yield createEvent.highlight([10, 11, 12, 13]);
  yield createEvent.message(`Step 2: Move both pointers together until they meet`, 'step');

  nodesA.forEach(n => n.highlight = undefined);
  nodesB.forEach(n => n.highlight = undefined);

  let step = 0;
  const maxSteps = lenA + lenB;

  while (ptrA !== ptrB && step < maxSteps) {
    const nodeA = nodesA.find(n => n.id === ptrA);
    let nodeB = nodesB.find(n => n.id === ptrB);
    if (!nodeB) nodeB = nodesA.find(n => n.id === ptrB);

    if (nodeA) nodeA.highlight = 'slow';
    if (nodeB) nodeB.highlight = 'fast';

    step++;

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodesA],
        listType: 'singly',
        headId: headA,
        secondList: [...nodesB],
        secondHeadId: headB,
        pointers: [
          ...(ptrA !== null ? [{ nodeId: ptrA, label: 'ptrA', color: 'blue' }] : []),
          ...(ptrB !== null ? [{ nodeId: ptrB, label: 'ptrB', color: 'purple' }] : []),
        ],
        intersectionId: actualIntersectionId,
        message: `Step ${step}: A at ${nodeA?.value ?? 'null'}, B at ${nodeB?.value ?? 'null'}`,
      },
    });

    yield createEvent.message(
      `Step ${step}: ptrA at ${nodeA?.value ?? 'null'}, ptrB at ${nodeB?.value ?? 'null'}`,
      'explanation'
    );

    if (nodeA) {
      nodeA.highlight = 'visited';
      ptrA = nodeA.nextId ?? null;
    }
    if (nodeB) {
      nodeB.highlight = 'visited';
      ptrB = nodeB.nextId ?? null;
    }
  }

  yield createEvent.highlight([14]);

  if (ptrA === ptrB && ptrA !== null) {
    const intersectNode = nodesA.find(n => n.id === ptrA);

    if (intersectNode) {
      intersectNode.highlight = 'match';
      yield createEvent.message(`🎯 Intersection found at node ${intersectNode.value}!`, 'info');
    }

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodesA],
        listType: 'singly',
        headId: headA,
        secondList: [...nodesB],
        secondHeadId: headB,
        intersectionId: ptrA,
        message: `Intersection at: ${intersectNode?.value}`,
      },
    });

    yield createEvent.result('string', `${intersectNode?.value}`, `Intersection at node ${intersectNode?.value}`);
  } else {
    yield createEvent.message(`No intersection found`, 'info');

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodesA],
        listType: 'singly',
        headId: headA,
        secondList: [...nodesB],
        secondHeadId: headB,
        message: `No intersection`,
      },
    });

    yield createEvent.result('string', 'null', 'Lists do not intersect');
  }
}
