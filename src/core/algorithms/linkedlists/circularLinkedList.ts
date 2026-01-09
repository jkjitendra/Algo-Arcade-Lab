import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Circular Linked List Operations
 * 
 * A singly linked list where the last node points back to the first.
 * Enables continuous traversal without needing to track boundaries.
 * 
 * Time Complexity: O(n) for most operations
 * Space Complexity: O(n)
 */

type CircularLinkedListOperation = 'insert' | 'delete' | 'traverse' | 'search';

const pseudocodeMap: Record<CircularLinkedListOperation, string[]> = {
  'insert': [
    'function insert(head, value):',
    '  newNode = createNode(value)',
    '  if head is null:',
    '    newNode.next = newNode  // Points to itself',
    '    return newNode',
    '  current = head',
    '  while current.next != head:',
    '    current = current.next',
    '  current.next = newNode',
    '  newNode.next = head',
    '  return head',
  ],
  'delete': [
    'function delete(head, value):',
    '  if head is null: return null',
    '  if head.value == value and head.next == head:',
    '    return null  // Single node',
    '  current = head',
    '  while current.next != head:',
    '    if current.next.value == value:',
    '      current.next = current.next.next',
    '      return head',
    '    current = current.next',
    '  if head.value == value:',
    '    current.next = head.next',
    '    return head.next',
    '  return head',
  ],
  'traverse': [
    'function traverse(head):',
    '  if head is null: return',
    '  current = head',
    '  do:',
    '    visit(current)',
    '    current = current.next',
    '  while current != head',
  ],
  'search': [
    'function search(head, value):',
    '  if head is null: return -1',
    '  current = head',
    '  position = 0',
    '  do:',
    '    if current.value == value:',
    '      return position',
    '    current = current.next',
    '    position++',
    '  while current != head',
    '  return -1',
  ],
};

function buildCircularLinkedList(values: number[]): { nodes: LinkedListNode[]; headId: number | null } {
  if (values.length === 0) {
    return { nodes: [], headId: null };
  }

  const nodes: LinkedListNode[] = values.map((value, index) => ({
    id: index,
    value,
    nextId: (index + 1) % values.length,  // Circular: last points to first
    isHead: index === 0,
    isTail: index === values.length - 1,
  }));

  return { nodes, headId: 0 };
}

export const circularLinkedList: IAlgorithm<ArrayInput> = {
  id: 'circular-linked-list',
  name: 'Circular Linked List',
  category: 'linkedlists',
  difficulty: 'beginner',

  pseudocodeLines: pseudocodeMap['traverse'],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'traverse',
      options: [
        { value: 'insert', label: 'Insert (at end)' },
        { value: 'delete', label: 'Delete by Value' },
        { value: 'traverse', label: 'Traverse (circular)' },
        { value: 'search', label: 'Search' },
      ],
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'value',
      label: 'Value',
      default: 99,
      min: 1,
      max: 100,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'List size must be 10 or less for circular visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'traverse') as CircularLinkedListOperation;
    const value = (params?.value || 99) as number;

    let { nodes, headId } = buildCircularLinkedList([...input.values]);

    yield createEvent.message(
      `Circular Linked List: ${operation.charAt(0).toUpperCase() + operation.slice(1)}`,
      'info',
      0
    );
    yield createEvent.message(
      `Initial List: [${input.values.join(' → ')}] → (back to head)`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'circular',
        headId,
      },
    });

    if (operation === 'insert') {
      yield* runInsert(nodes, headId, value);
    } else if (operation === 'delete') {
      yield* runDelete(nodes, headId, value);
    } else if (operation === 'traverse') {
      yield* runTraverse(nodes, headId);
    } else if (operation === 'search') {
      yield* runSearch(nodes, headId, value);
    }
  },
};

function* runInsert(nodes: LinkedListNode[], headId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} into circular list...`, 'step');
  yield createEvent.highlight([0, 1]);

  const newId = nodes.length;
  const newNode: LinkedListNode = {
    id: newId,
    value,
    nextId: headId ?? newId,  // Points to head, or itself if empty
    isHead: false,
    isTail: true,
    highlight: 'current',
  };

  if (headId === null) {
    yield createEvent.highlight([2, 3, 4]);
    yield createEvent.message(`List is empty, new node points to itself`, 'explanation');
    newNode.isHead = true;
    newNode.nextId = newId;
    nodes.push(newNode);

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'circular',
        headId: newId,
      },
    });

    yield createEvent.result('string', `Inserted ${value}`, `Node ${value} is now the only node`);
    return;
  }

  yield createEvent.highlight([5, 6]);
  yield createEvent.message(`Finding the last node (the one pointing to head)...`, 'explanation');

  // Find the last node (one that points to head)
  let current = nodes.find(n => n.id === headId);
  let count = 0;
  const maxIterations = nodes.length + 1;

  while (current && current.nextId !== headId && count < maxIterations) {
    current.highlight = 'visited';
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'circular',
        headId,
        pointers: [{ nodeId: current.id, label: 'current', color: 'yellow' }],
      },
    });
    yield createEvent.highlight([7]);

    const nextNode = nodes.find(n => n.id === current!.nextId);
    current = nextNode;
    count++;
  }

  if (current) {
    yield createEvent.highlight([8, 9]);
    current.highlight = 'prev';
    current.isTail = false;
    current.nextId = newId;

    yield createEvent.message(`Found last node, linking to new node`, 'explanation');
  }

  nodes.push(newNode);

  yield createEvent.highlight([10]);
  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular',
      headId,
      animating: 'insert',
      animatingNodeId: newId,
    },
  });

  yield createEvent.message(`Successfully inserted ${value}!`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular',
      headId,
    },
  });

  yield createEvent.result('string', `Inserted ${value}`, `Node added, points back to head`);
}

function* runDelete(nodes: LinkedListNode[], headId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Deleting ${value} from circular list...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (headId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('string', 'Failed', 'List is empty');
    return;
  }

  const head = nodes.find(n => n.id === headId);

  // Single node case
  if (head && head.nextId === headId && head.value === value) {
    yield createEvent.highlight([2, 3]);
    yield createEvent.message(`Single node with value ${value}, removing it`, 'explanation');

    const index = nodes.findIndex(n => n.id === headId);
    nodes.splice(index, 1);

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [],
        listType: 'circular',
        headId: null,
      },
    });

    yield createEvent.result('string', `Deleted ${value}`, 'List is now empty');
    return;
  }

  yield createEvent.highlight([4, 5]);
  // Find node before the one to delete and handle head case
  let prev = nodes.find(n => n.id === headId);
  let count = 0;
  const maxIterations = nodes.length;
  let newHeadId: number | null = headId;

  // First, find a node whose next is the target
  while (prev && count < maxIterations) {
    const nextNode = nodes.find(n => n.id === prev!.nextId);

    if (nextNode && nextNode.value === value && nextNode.id !== headId) {
      yield createEvent.highlight([6, 7, 8]);
      prev.highlight = 'prev';
      nextNode.highlight = 'target';

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'circular',
          headId,
          animating: 'delete',
          animatingNodeId: nextNode.id,
        },
      });

      yield createEvent.message(`Found ${value}, removing it`, 'explanation');

      prev.nextId = nextNode.nextId;
      if (nextNode.isTail) prev.isTail = true;

      const index = nodes.findIndex(n => n.id === nextNode.id);
      nodes.splice(index, 1);

      nodes.forEach(n => n.highlight = undefined);

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'circular',
          headId,
        },
      });

      yield createEvent.result('string', `Deleted ${value}`, 'Node removed from circular list');
      return;
    }

    prev.highlight = 'visited';
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'circular',
        headId,
        pointers: [{ nodeId: prev.id, label: 'prev', color: 'orange' }],
      },
    });

    prev = nextNode;
    count++;
  }

  // Check if head needs to be deleted
  if (head && head.value === value) {
    yield createEvent.highlight([10, 11, 12]);
    head.highlight = 'target';

    // Find last node to update its next
    let last = nodes.find(n => n.id === headId);
    while (last && last.nextId !== headId) {
      last = nodes.find(n => n.id === last!.nextId);
    }

    yield createEvent.message(`Deleting head node`, 'explanation');

    newHeadId = head.nextId ?? null;
    if (newHeadId !== null && newHeadId !== headId) {
      const newHead = nodes.find(n => n.id === newHeadId);
      if (newHead) newHead.isHead = true;
      if (last) last.nextId = newHeadId;
    }

    const index = nodes.findIndex(n => n.id === headId);
    nodes.splice(index, 1);

    nodes.forEach(n => n.highlight = undefined);

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'circular',
        headId: nodes.length > 0 ? newHeadId : null,
      },
    });

    yield createEvent.result('string', `Deleted ${value}`, 'Head node removed');
    return;
  }

  yield createEvent.highlight([13]);
  yield createEvent.message(`Value ${value} not found`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular',
      headId,
    },
  });

  yield createEvent.result('string', 'Not Found', `Value ${value} not in list`);
}

function* runTraverse(nodes: LinkedListNode[], headId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Traversing circular list...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (headId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('string', 'Empty', 'No nodes to traverse');
    return;
  }

  const visited: number[] = [];
  let current = nodes.find(n => n.id === headId);
  let count = 0;
  const maxIterations = nodes.length * 2;  // Allow showing circular nature

  yield createEvent.highlight([2, 3]);

  // Do-while simulation: visit at least once, then continue until back at head
  do {
    if (current) {
      yield createEvent.highlight([4, 5]);
      current.highlight = 'current';
      visited.push(current.value);

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'circular',
          headId,
          pointers: [{ nodeId: current.id, label: 'current', color: 'yellow' }],
          message: `Visited: [${visited.join(' → ')}]`,
        },
      });

      yield createEvent.message(`Visiting node with value ${current.value}`, 'explanation');

      current.highlight = 'visited';
      yield createEvent.highlight([6]);

      const nextNode = nodes.find(n => n.id === current!.nextId);
      current = nextNode;
    }
    count++;
  } while (current && current.id !== headId && count < maxIterations);

  // Show that we're back at head
  if (current && current.id === headId) {
    yield createEvent.highlight([6]);
    current.highlight = 'head';
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'circular',
        headId,
        pointers: [{ nodeId: current.id, label: 'back to HEAD', color: 'green' }],
        message: `Completed circle! [${visited.join(' → ')}] → HEAD`,
      },
    });
    yield createEvent.message(`Back at head - traversal complete!`, 'info');
  }

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular',
      headId,
      message: `Circular traversal: [${visited.join(' → ')}] → (head)`,
    },
  });

  yield createEvent.result('string', visited.join(' → '), `Traversed ${visited.length} nodes in circle`);
}

function* runSearch(nodes: LinkedListNode[], headId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Searching for ${value} in circular list...`, 'step');
  yield createEvent.highlight([0, 1, 2, 3]);

  if (headId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('search', -1, 'List is empty');
    return;
  }

  let current = nodes.find(n => n.id === headId);
  let position = 0;
  let count = 0;
  const maxIterations = nodes.length;

  do {
    if (current) {
      yield createEvent.highlight([4, 5]);
      current.highlight = 'current';

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'circular',
          headId,
          pointers: [{ nodeId: current.id, label: `pos ${position}`, color: 'yellow' }],
        },
      });

      yield createEvent.message(`Checking position ${position}: value = ${current.value}`, 'explanation');

      if (current.value === value) {
        yield createEvent.highlight([6]);
        current.highlight = 'match';

        yield createEvent.auxiliary({
          type: 'linkedlist',
          linkedListData: {
            nodes: [...nodes],
            listType: 'circular',
            headId,
          },
        });

        yield createEvent.message(`Found ${value} at position ${position}!`, 'info');
        yield createEvent.result('search', position, `Found at position ${position}`);
        return;
      }

      current.highlight = 'visited';
      yield createEvent.highlight([7, 8]);

      const nextNode = nodes.find(n => n.id === current!.nextId);
      current = nextNode;
      position++;
    }
    count++;
  } while (current && current.id !== headId && count < maxIterations);

  yield createEvent.highlight([9, 10]);
  yield createEvent.message(`Value ${value} not found in circular list`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular',
      headId,
    },
  });

  yield createEvent.result('search', -1, 'Not found');
}
