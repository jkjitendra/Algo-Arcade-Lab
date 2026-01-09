import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Singly Linked List Operations
 * 
 * Basic operations demonstrating singly linked list behavior.
 * Operations: Insert (Head/Tail/Position), Delete, Search, Traverse
 * 
 * Time Complexity: O(n) for most operations, O(1) for insert at head
 * Space Complexity: O(n)
 */

type SinglyLinkedListOperation = 'insertHead' | 'insertTail' | 'insertAt' | 'deleteValue' | 'search' | 'traverse';

const pseudocodeMap: Record<SinglyLinkedListOperation, string[]> = {
  'insertHead': [
    'function insertAtHead(head, value):',
    '  newNode = createNode(value)',
    '  newNode.next = head',
    '  head = newNode',
    '  return head',
  ],
  'insertTail': [
    'function insertAtTail(head, value):',
    '  newNode = createNode(value)',
    '  if head is null:',
    '    return newNode',
    '  current = head',
    '  while current.next != null:',
    '    current = current.next',
    '  current.next = newNode',
    '  return head',
  ],
  'insertAt': [
    'function insertAt(head, value, position):',
    '  if position == 0:',
    '    return insertAtHead(head, value)',
    '  newNode = createNode(value)',
    '  current = head',
    '  for i = 0 to position - 2:',
    '    current = current.next',
    '  newNode.next = current.next',
    '  current.next = newNode',
    '  return head',
  ],
  'deleteValue': [
    'function delete(head, value):',
    '  if head is null: return null',
    '  if head.value == value:',
    '    return head.next',
    '  current = head',
    '  while current.next != null:',
    '    if current.next.value == value:',
    '      current.next = current.next.next',
    '      return head',
    '    current = current.next',
    '  return head',
  ],
  'search': [
    'function search(head, value):',
    '  current = head',
    '  position = 0',
    '  while current != null:',
    '    if current.value == value:',
    '      return position',
    '    current = current.next',
    '    position++',
    '  return -1',
  ],
  'traverse': [
    'function traverse(head):',
    '  current = head',
    '  while current != null:',
    '    visit(current)',
    '    current = current.next',
  ],
};

// Helper to build linked list from array
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

export const singlyLinkedList: IAlgorithm<ArrayInput> = {
  id: 'singly-linked-list',
  name: 'Singly Linked List',
  category: 'linkedlists',
  difficulty: 'beginner',

  pseudocodeLines: pseudocodeMap['insertHead'],

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
      default: 'insertHead',
      options: [
        { value: 'insertHead', label: 'Insert at Head' },
        { value: 'insertTail', label: 'Insert at Tail' },
        { value: 'insertAt', label: 'Insert at Position' },
        { value: 'deleteValue', label: 'Delete by Value' },
        { value: 'search', label: 'Search' },
        { value: 'traverse', label: 'Traverse' },
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
    {
      type: 'number',
      id: 'position',
      label: 'Position',
      default: 2,
      min: 0,
      max: 10,
      dependsOn: { parameterId: 'operation', values: ['insertAt'] },
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length > 12) {
      return { ok: false, error: 'List size must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'insertHead') as SinglyLinkedListOperation;
    const value = (params?.value || 99) as number;
    const position = (params?.position || 2) as number;

    // Build initial linked list
    let { nodes, headId } = buildLinkedList([...input.values]);

    yield createEvent.message(
      `Singly Linked List: ${operation.replace(/([A-Z])/g, ' $1').trim()}`,
      'info',
      0
    );
    yield createEvent.message(
      `Initial List: [${input.values.join(' → ')}]`,
      'explanation'
    );

    // Show initial state
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
      },
    });

    if (operation === 'insertHead') {
      yield* runInsertHead(nodes, headId, value);
    } else if (operation === 'insertTail') {
      yield* runInsertTail(nodes, headId, value);
    } else if (operation === 'insertAt') {
      yield* runInsertAt(nodes, headId, value, position);
    } else if (operation === 'deleteValue') {
      yield* runDelete(nodes, headId, value);
    } else if (operation === 'search') {
      yield* runSearch(nodes, headId, value);
    } else if (operation === 'traverse') {
      yield* runTraverse(nodes, headId);
    }
  },
};

function* runInsertHead(nodes: LinkedListNode[], headId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} at head...`, 'step');
  yield createEvent.highlight([0, 1]);

  // Create new node
  const newId = nodes.length;
  // Note: We don't push to nodes array yet for the pending state
  const pendingNode: LinkedListNode = {
    id: newId,
    value,
    nextId: headId,
    isHead: true,
    isTail: nodes.length === 0,
    highlight: 'current',
  };

  yield createEvent.highlight([2]);
  yield createEvent.message(`Creating new node with value ${value}`, 'explanation');

  // Step 1: Show pending node below the current head
  if (headId !== null) {
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        animating: 'pending-insert',
        pendingNode: pendingNode,
        pendingNextNodeId: headId, // Position under the current head
      },
    });
    yield createEvent.message(`New node points to head`, 'explanation');
  } else {
    // Empty list case - just show separate
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        animating: 'pending-insert',
        pendingNode: pendingNode,
        pendingNextNodeId: null, // No next node
        // We might need a special case for empty list pending if we want it to show up?
        // Existing logic relies on pendingInsertAfterNodeId matches node.id.
        // If list is empty, there are no nodes to match.
        // For empty list, simpler to just proceed to insertion as "pending" implies connecting to something.
      },
    });
  }

  // Update old head
  if (headId !== null) {
    const oldHead = nodes.find(n => n.id === headId);
    if (oldHead) {
      oldHead.isHead = false;
      oldHead.highlight = 'next';
    }
  }

  yield createEvent.highlight([3]);
  yield createEvent.message(`Pointing new node's next to old head`, 'explanation');

  nodes.push(pendingNode);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId: newId,
      animating: 'insert',
      animatingNodeId: newId,
    },
  });

  yield createEvent.highlight([4]);
  yield createEvent.message(`Successfully inserted ${value} at head!`, 'info');

  // Clear highlights
  nodes.forEach(n => n.highlight = undefined);
  pendingNode.highlight = 'head';

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId: newId,
    },
  });

  yield createEvent.result('string', `Inserted ${value}`, `Node ${value} is now the head`);
}

function* runInsertTail(nodes: LinkedListNode[], headId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} at tail...`, 'step');
  yield createEvent.highlight([0, 1]);

  const newId = nodes.length;
  const newNode: LinkedListNode = {
    id: newId,
    value,
    nextId: null,
    isHead: nodes.length === 0,
    isTail: true,
  };

  if (headId === null) {
    yield createEvent.highlight([2, 3]);
    yield createEvent.message(`List is empty, new node becomes head`, 'explanation');
    nodes.push(newNode);

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId: newId,
      },
    });

    yield createEvent.result('string', `Inserted ${value}`, `Node ${value} is now the head and tail`);
    return;
  }

  yield createEvent.highlight([4, 5]);
  yield createEvent.message(`Traversing to find tail...`, 'explanation');

  // Find tail
  let current = nodes.find(n => n.id === headId);
  while (current && current.nextId !== null) {
    current.highlight = 'visited';
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [{ nodeId: current.id, label: 'current', color: 'yellow' }],
      },
    });

    yield createEvent.highlight([6]);
    const nextNode = nodes.find(n => n.id === current!.nextId);
    current = nextNode;
  }

  if (current) {
    yield createEvent.highlight([7]);
    current.highlight = 'tail';

    // Note: We don't push to nodes array yet for the pending state
    // Re-create the new node here since we didn't push it earlier
    const pendingNode: LinkedListNode = {
      id: newId,
      value,
      nextId: null,
      isHead: false,
      isTail: true,
      highlight: 'current',
    };

    yield createEvent.message(`Creating new node ${value}`, 'explanation');

    // Step 1: Show pending node after the tail
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        animating: 'pending-insert',
        pendingNode: pendingNode,
        pendingInsertAfterNodeId: current.id,
        pendingNextNodeId: null, // Tail insertion, so no next node
        pointers: [{ nodeId: current.id, label: 'current', color: 'yellow' }],
      },
    });

    yield createEvent.message(`Found tail, linking to new node`, 'explanation');

    current.isTail = false;
    current.nextId = newId;

    nodes.push(pendingNode);
    pendingNode.highlight = 'current';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        animating: 'insert',
        animatingNodeId: newId,
      },
    });
  }

  yield createEvent.highlight([8]);
  yield createEvent.message(`Successfully inserted ${value} at tail!`, 'info');

  // Clear highlights
  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
    },
  });

  yield createEvent.result('string', `Inserted ${value}`, `Node ${value} is now the tail`);
}

function* runInsertAt(nodes: LinkedListNode[], headId: number | null, value: number, position: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} at position ${position}...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (position === 0) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Position is 0, inserting at head`, 'explanation');
    yield* runInsertHead(nodes, headId, value);
    return;
  }

  if (headId === null || position > nodes.length) {
    yield createEvent.message(`Invalid position for current list size`, 'info');
    yield createEvent.result('string', 'Failed', `Cannot insert at position ${position}`);
    return;
  }

  yield createEvent.highlight([3, 4]);
  yield createEvent.message(`Traversing to position ${position - 1}...`, 'explanation');

  let current = nodes.find(n => n.id === headId);
  let currentPos = 0;

  while (current && currentPos < position - 1) {
    current.highlight = 'visited';
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [{ nodeId: current.id, label: `pos ${currentPos}`, color: 'yellow' }],
      },
    });

    yield createEvent.highlight([5, 6]);
    const nextNode = nodes.find(n => n.id === current!.nextId);
    current = nextNode;
    currentPos++;
  }

  if (current) {
    yield createEvent.highlight([7, 8]);
    current.highlight = 'prev';

    const newId = nodes.length;
    // Note: We don't push to nodes array yet for the pending state
    const pendingNode: LinkedListNode = {
      id: newId,
      value,
      nextId: current.nextId,
      isHead: false,
      isTail: current.nextId === null,
      highlight: 'current',
    };

    // Step 1: Show pending node below the list
    yield createEvent.message(`Creating new node ${value}`, 'explanation');
    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        animating: 'pending-insert',
        pendingNode: pendingNode,
        pendingInsertAfterNodeId: current.id,
        pendingNextNodeId: current.nextId, // Pass the next node ID for positioning
        pointers: [{ nodeId: current.id, label: 'current', color: 'yellow' }],
      },
    });

    // Step 2: Show link from new node to next node
    yield createEvent.message(`Pointing new node to next node`, 'explanation');
    // We visualize this by keeping the pending state but updating the message/highlight
    // The view component will draw the arrow based on pendingNode.nextId

    // Step 3: Complete insertion
    // Update tail status
    if (current.isTail) {
      current.isTail = false;
    }

    current.nextId = newId;
    nodes.push(pendingNode);

    yield createEvent.message(`Inserted ${value} after position ${position - 1}`, 'explanation');

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        animating: 'insert',
        animatingNodeId: newId,
      },
    });

    yield createEvent.highlight([9]);
    yield createEvent.message(`Successfully inserted ${value} at position ${position}!`, 'info');

    // Clear highlights
    nodes.forEach(n => n.highlight = undefined);

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
      },
    });

    yield createEvent.result('string', `Inserted ${value}`, `Node inserted at position ${position}`);
  }
}

function* runDelete(nodes: LinkedListNode[], headId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Deleting node with value ${value}...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (headId === null) {
    yield createEvent.message(`List is empty, nothing to delete`, 'info');
    yield createEvent.result('string', 'Failed', 'List is empty');
    return;
  }

  const head = nodes.find(n => n.id === headId);

  // Check if head is the target
  if (head && head.value === value) {
    yield createEvent.highlight([2, 3]);
    head.highlight = 'target';
    yield createEvent.message(`Head node contains ${value}, removing it`, 'explanation');

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        animating: 'delete',
        animatingNodeId: head.id,
      },
    });

    // Update new head
    const newHeadId = head.nextId;
    if (newHeadId !== null) {
      const newHead = nodes.find(n => n.id === newHeadId);
      if (newHead) newHead.isHead = true;
    }

    // Remove from array
    const index = nodes.findIndex(n => n.id === head.id);
    nodes.splice(index, 1);

    yield createEvent.message(`Successfully deleted ${value}!`, 'info');

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId: newHeadId,
      },
    });

    yield createEvent.result('string', `Deleted ${value}`, `Node ${value} removed from head`);
    return;
  }

  yield createEvent.highlight([4, 5]);
  yield createEvent.message(`Searching for node with value ${value}...`, 'explanation');

  let current = head;
  while (current && current.nextId !== null) {
    current.highlight = 'visited';
    const nextNode = nodes.find(n => n.id === current!.nextId);

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [{ nodeId: current.id, label: 'current', color: 'yellow' }],
      },
    });

    if (nextNode && nextNode.value === value) {
      yield createEvent.highlight([6, 7]);
      nextNode.highlight = 'target';
      yield createEvent.message(`Found ${value}, removing it`, 'explanation');

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId,
          animating: 'delete',
          animatingNodeId: nextNode.id,
        },
      });

      // Update pointer
      current.nextId = nextNode.nextId;
      if (nextNode.isTail) {
        current.isTail = true;
      }

      // Remove from array
      const index = nodes.findIndex(n => n.id === nextNode.id);
      nodes.splice(index, 1);

      yield createEvent.highlight([8]);
      yield createEvent.message(`Successfully deleted ${value}!`, 'info');

      // Clear highlights
      nodes.forEach(n => n.highlight = undefined);

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId,
        },
      });

      yield createEvent.result('string', `Deleted ${value}`, `Node ${value} removed`);
      return;
    }

    current = nextNode;
  }

  yield createEvent.highlight([9, 10]);
  yield createEvent.message(`Value ${value} not found in list`, 'info');

  // Clear highlights
  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
    },
  });

  yield createEvent.result('string', 'Not Found', `Value ${value} not in list`);
}

function* runSearch(nodes: LinkedListNode[], headId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Searching for ${value}...`, 'step');
  yield createEvent.highlight([0, 1, 2]);

  if (headId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('search', -1, 'List is empty');
    return;
  }

  let current = nodes.find(n => n.id === headId);
  let position = 0;

  while (current) {
    yield createEvent.highlight([3, 4]);
    current.highlight = 'current';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [{ nodeId: current.id, label: `pos ${position}`, color: 'yellow' }],
      },
    });

    yield createEvent.message(`Checking position ${position}: value = ${current.value}`, 'explanation');

    if (current.value === value) {
      yield createEvent.highlight([4, 5]);
      current.highlight = 'match';

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId,
        },
      });

      yield createEvent.message(`Found ${value} at position ${position}!`, 'info');
      yield createEvent.result('search', position, `Found at position ${position}`);
      return;
    }

    current.highlight = 'visited';
    yield createEvent.highlight([6, 7]);

    const nextNode = current.nextId !== null ? nodes.find(n => n.id === current!.nextId) : undefined;
    current = nextNode;
    position++;
  }

  yield createEvent.highlight([8]);
  yield createEvent.message(`Value ${value} not found in list`, 'info');

  // Clear highlights
  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
    },
  });

  yield createEvent.result('search', -1, 'Not found');
}

function* runTraverse(nodes: LinkedListNode[], headId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Traversing the linked list...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (headId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('string', 'Empty', 'No nodes to traverse');
    return;
  }

  const visited: number[] = [];
  let current = nodes.find(n => n.id === headId);

  while (current) {
    yield createEvent.highlight([2, 3]);
    current.highlight = 'current';
    visited.push(current.value);

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        pointers: [{ nodeId: current.id, label: 'current', color: 'yellow' }],
        message: `Visited: [${visited.join(' → ')}]`,
      },
    });

    yield createEvent.message(`Visiting node with value ${current.value}`, 'explanation');

    current.highlight = 'visited';
    yield createEvent.highlight([4]);

    const nextNode = current.nextId !== null ? nodes.find(n => n.id === current!.nextId) : undefined;
    current = nextNode;
  }

  yield createEvent.message(`Traversal complete! Visited ${visited.length} nodes`, 'info');

  // Clear highlights
  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
      message: `Traversal order: [${visited.join(' → ')}]`,
    },
  });

  yield createEvent.result('string', visited.join(' → '), `Traversed ${visited.length} nodes`);
}
