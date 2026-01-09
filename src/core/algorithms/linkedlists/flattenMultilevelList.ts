import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Flatten Multilevel Doubly Linked List
 * 
 * Flatten a list where nodes may have child pointers to sublists.
 * Insert child list inline before continuing to next.
 * 
 * Time Complexity: O(n) where n is total nodes
 * Space Complexity: O(1) iterative / O(depth) recursive
 */

const pseudocode = [
  'function flatten(head):',
  '  if head is null: return null',
  '  current = head',
  '  while current != null:',
  '    if current.child != null:',
  '      // Save next',
  '      next = current.next',
  '      child = current.child',
  '      // Connect current to child',
  '      current.next = child',
  '      child.prev = current',
  '      current.child = null',
  '      // Find tail of child list',
  '      tail = child',
  '      while tail.next != null:',
  '        tail = tail.next',
  '      // Connect tail to saved next',
  '      if next != null:',
  '        tail.next = next',
  '        next.prev = tail',
  '    current = current.next',
  '  return head',
];

interface MultilevelNode extends LinkedListNode {
  childId?: number | null;
  level: number;
}

function buildMultilevelList(values: number[]): { nodes: MultilevelNode[]; headId: number | null } {
  if (values.length === 0) {
    return { nodes: [], headId: null };
  }

  // Create a simple multilevel structure
  // Main list: values[0] through values[mid-1]
  // Child list: values[mid] through end
  const mid = Math.floor(values.length * 0.6);

  const nodes: MultilevelNode[] = [];
  let idCounter = 0;

  // Main list
  for (let i = 0; i < mid; i++) {
    nodes.push({
      id: idCounter++,
      value: values[i],
      nextId: i < mid - 1 ? idCounter : null,
      isHead: i === 0,
      isTail: i === mid - 1,
      childId: null,
      level: 0,
    });
  }

  // Add child list to middle node of main list
  const childParentIdx = Math.floor(mid / 2);
  const childStartId = idCounter;

  for (let i = mid; i < values.length; i++) {
    nodes.push({
      id: idCounter++,
      value: values[i],
      nextId: i < values.length - 1 ? idCounter : null,
      isHead: false,
      isTail: i === values.length - 1,
      childId: null,
      level: 1,
    });
  }

  // Connect parent to child
  if (childParentIdx < nodes.length && childStartId < idCounter) {
    nodes[childParentIdx].childId = childStartId;
  }

  return { nodes, headId: 0 };
}

export const flattenMultilevelList: IAlgorithm<ArrayInput> = {
  id: 'flatten-multilevel-list',
  name: 'Flatten Multilevel List',
  category: 'linkedlists',
  difficulty: 'advanced',

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
    if (input.values.length < 3) {
      return { ok: false, error: 'Need at least 3 elements for multilevel structure' };
    }
    if (input.values.length > 12) {
      return { ok: false, error: 'Total size must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const { nodes, headId } = buildMultilevelList([...input.values]);

    yield createEvent.message(
      `Flatten Multilevel Linked List`,
      'info',
      0
    );

    // Find which node has child
    const parentNode = nodes.find(n => n.childId !== null);
    const childNodes = nodes.filter(n => n.level === 1);

    yield createEvent.message(
      `Main list has a child branch at node ${parentNode?.value}. Child: [${childNodes.map(n => n.value).join(' → ')}]`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'multilevel',
        headId,
        message: `Multilevel structure with child at node ${parentNode?.value}`,
      },
    });

    yield* runFlatten(nodes, headId);
  },
};

function* runFlatten(nodes: MultilevelNode[], headId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([0, 1, 2]);

  if (headId === null) {
    yield createEvent.message(`Empty list`, 'info');
    yield createEvent.result('string', 'Empty', 'Nothing to flatten');
    return;
  }

  let currentId = headId;
  let step = 0;

  yield createEvent.message(`Traverse list, flatten when child found`, 'step');

  while (currentId !== null) {
    yield createEvent.highlight([3, 4]);

    const current = nodes.find(n => n.id === currentId) as MultilevelNode | undefined;
    if (!current) break;

    current.highlight = 'current';
    step++;

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'multilevel',
        headId,
        pointers: [{ nodeId: currentId, label: 'current', color: 'yellow' }],
        message: `Step ${step}: Checking node ${current.value}`,
      },
    });

    if (current.childId !== null) {
      yield createEvent.highlight([5, 6, 7, 8, 9, 10, 11]);
      yield createEvent.message(`Found child at node ${current.value}! Flattening...`, 'info');

      const nextId = current.nextId;
      const childId = current.childId;
      const child = nodes.find(n => n.id === childId);

      // Connect current to child
      current.nextId = childId;
      if (child) {
        child.prevId = currentId;
        child.highlight = 'next';
      }
      current.childId = null;

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'multilevel',
          headId,
          pointers: [
            { nodeId: currentId, label: 'current', color: 'yellow' },
            ...(childId !== null && childId !== undefined ? [{ nodeId: childId as number, label: 'child', color: 'cyan' }] : []),
          ],
          animating: 'merge',
          message: `Connecting ${current.value} → ${child?.value}`,
        },
      });

      yield createEvent.message(`Connected ${current.value}.next → ${child?.value}`, 'explanation');

      // Find tail of child list
      yield createEvent.highlight([12, 13, 14, 15]);
      let tailId = childId;
      let tail = nodes.find(n => n.id === tailId);

      while (tail && tail.nextId !== null) {
        tail.highlight = 'visited';
        tailId = tail.nextId;
        tail = nodes.find(n => n.id === tailId);
      }

      if (tail) {
        tail.highlight = 'prev';
        yield createEvent.message(`Found child tail: ${tail.value}`, 'explanation');
      }

      // Connect tail to saved next
      yield createEvent.highlight([16, 17, 18, 19]);
      if (nextId !== null && tail) {
        tail.nextId = nextId;
        const nextNode = nodes.find(n => n.id === nextId);
        if (nextNode) {
          nextNode.prevId = tailId;
          nextNode.highlight = 'next';
        }

        yield createEvent.auxiliary({
          type: 'linkedlist',
          linkedListData: {
            nodes: [...nodes],
            listType: 'singly',  // Now it's flattened
            headId,
            pointers: [
              ...(tailId !== null && tailId !== undefined ? [{ nodeId: tailId as number, label: 'tail', color: 'orange' }] : []),
              ...(nextId !== null ? [{ nodeId: nextId as number, label: 'next', color: 'purple' }] : []),
            ],
            message: `Connected ${tail.value} → ${nextNode?.value}`,
          },
        });

        yield createEvent.message(`Connected ${tail.value}.next → ${nextNode?.value}`, 'explanation');
      }

      // Update all child nodes to level 0
      nodes.forEach(n => {
        if (n.level === 1) n.level = 0;
      });
    }

    current.highlight = 'visited';
    yield createEvent.highlight([20]);
    currentId = current.nextId as number;
  }

  yield createEvent.message(`🎯 Flattening complete!`, 'info');

  // Clear highlights
  nodes.forEach(n => n.highlight = undefined);

  // Build flattened result
  const flattened: number[] = [];
  let curr: number | null = headId;
  const visited = new Set<number>();

  while (curr !== null && !visited.has(curr)) {
    visited.add(curr);
    const node = nodes.find(n => n.id === curr);
    if (node) {
      flattened.push(node.value);
      curr = node.nextId ?? null;
    } else break;
  }

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
      message: `Flattened: [${flattened.join(' → ')}]`,
    },
  });

  yield createEvent.result('string', flattened.join(' → '), `Flattened to single level`);
}
