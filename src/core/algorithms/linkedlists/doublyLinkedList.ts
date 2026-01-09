import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Doubly Linked List Operations
 * 
 * Operations demonstrating doubly linked list with bidirectional traversal.
 * Each node has pointers to both next and previous nodes.
 * 
 * Time Complexity: O(n) for most operations, O(1) for insert at head/tail
 * Space Complexity: O(n)
 */

type DoublyLinkedListOperation = 'insertHead' | 'insertTail' | 'deleteValue' | 'forwardTraverse' | 'backwardTraverse';

const pseudocodeMap: Record<DoublyLinkedListOperation, string[]> = {
  'insertHead': [
    'function insertAtHead(head, tail, value):',
    '  newNode = createNode(value)',
    '  newNode.next = head',
    '  newNode.prev = null',
    '  if head != null:',
    '    head.prev = newNode',
    '  head = newNode',
    '  if tail == null: tail = newNode',
    '  return head',
  ],
  'insertTail': [
    'function insertAtTail(head, tail, value):',
    '  newNode = createNode(value)',
    '  newNode.next = null',
    '  newNode.prev = tail',
    '  if tail != null:',
    '    tail.next = newNode',
    '  tail = newNode',
    '  if head == null: head = newNode',
    '  return tail',
  ],
  'deleteValue': [
    'function delete(head, tail, value):',
    '  current = head',
    '  while current != null:',
    '    if current.value == value:',
    '      if current.prev != null:',
    '        current.prev.next = current.next',
    '      else: head = current.next',
    '      if current.next != null:',
    '        current.next.prev = current.prev',
    '      else: tail = current.prev',
    '      return true',
    '    current = current.next',
    '  return false',
  ],
  'forwardTraverse': [
    'function forwardTraverse(head):',
    '  current = head',
    '  while current != null:',
    '    visit(current)',
    '    current = current.next',
  ],
  'backwardTraverse': [
    'function backwardTraverse(tail):',
    '  current = tail',
    '  while current != null:',
    '    visit(current)',
    '    current = current.prev',
  ],
};

function buildDoublyLinkedList(values: number[]): { nodes: LinkedListNode[]; headId: number | null; tailId: number | null } {
  if (values.length === 0) {
    return { nodes: [], headId: null, tailId: null };
  }

  const nodes: LinkedListNode[] = values.map((value, index) => ({
    id: index,
    value,
    nextId: index < values.length - 1 ? index + 1 : null,
    prevId: index > 0 ? index - 1 : null,
    isHead: index === 0,
    isTail: index === values.length - 1,
  }));

  return { nodes, headId: 0, tailId: values.length - 1 };
}

export const doublyLinkedList: IAlgorithm<ArrayInput> = {
  id: 'doubly-linked-list',
  name: 'Doubly Linked List',
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
        { value: 'deleteValue', label: 'Delete by Value' },
        { value: 'forwardTraverse', label: 'Forward Traverse' },
        { value: 'backwardTraverse', label: 'Backward Traverse' },
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
    if (input.values.length > 12) {
      return { ok: false, error: 'List size must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'insertHead') as DoublyLinkedListOperation;
    const value = (params?.value || 99) as number;

    let { nodes, headId, tailId } = buildDoublyLinkedList([...input.values]);

    yield createEvent.message(
      `Doubly Linked List: ${operation.replace(/([A-Z])/g, ' $1').trim()}`,
      'info',
      0
    );
    yield createEvent.message(
      `Initial List: [${input.values.join(' ⟷ ')}]`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'doubly',
        headId,
        tailId,
      },
    });

    if (operation === 'insertHead') {
      yield* runInsertHead(nodes, headId, tailId, value);
    } else if (operation === 'insertTail') {
      yield* runInsertTail(nodes, headId, tailId, value);
    } else if (operation === 'deleteValue') {
      yield* runDelete(nodes, headId, tailId, value);
    } else if (operation === 'forwardTraverse') {
      yield* runForwardTraverse(nodes, headId);
    } else if (operation === 'backwardTraverse') {
      yield* runBackwardTraverse(nodes, tailId);
    }
  },
};

function* runInsertHead(nodes: LinkedListNode[], headId: number | null, tailId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} at head...`, 'step');
  yield createEvent.highlight([0, 1]);

  const newId = nodes.length;
  const newNode: LinkedListNode = {
    id: newId,
    value,
    nextId: headId,
    prevId: null,
    isHead: true,
    isTail: nodes.length === 0,
    highlight: 'current',
  };

  yield createEvent.highlight([2, 3]);
  yield createEvent.message(`Created new node with value ${value}`, 'explanation');

  if (headId !== null) {
    yield createEvent.highlight([4, 5]);
    const oldHead = nodes.find(n => n.id === headId);
    if (oldHead) {
      oldHead.isHead = false;
      oldHead.prevId = newId;
      oldHead.highlight = 'next';
    }
    yield createEvent.message(`Updated old head's prev pointer`, 'explanation');
  }

  nodes.push(newNode);

  yield createEvent.highlight([6]);
  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'doubly',
      headId: newId,
      tailId: nodes.length === 1 ? newId : tailId,
      animating: 'insert',
      animatingNodeId: newId,
    },
  });

  yield createEvent.highlight([7, 8]);
  yield createEvent.message(`Successfully inserted ${value} at head!`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'doubly',
      headId: newId,
      tailId: nodes.length === 1 ? newId : tailId,
    },
  });

  yield createEvent.result('string', `Inserted ${value}`, `Node ${value} is now the head`);
}

function* runInsertTail(nodes: LinkedListNode[], headId: number | null, tailId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} at tail...`, 'step');
  yield createEvent.highlight([0, 1]);

  const newId = nodes.length;
  const newNode: LinkedListNode = {
    id: newId,
    value,
    nextId: null,
    prevId: tailId,
    isHead: nodes.length === 0,
    isTail: true,
    highlight: 'current',
  };

  yield createEvent.highlight([2, 3]);
  yield createEvent.message(`Created new node with value ${value}`, 'explanation');

  if (tailId !== null) {
    yield createEvent.highlight([4, 5]);
    const oldTail = nodes.find(n => n.id === tailId);
    if (oldTail) {
      oldTail.isTail = false;
      oldTail.nextId = newId;
      oldTail.highlight = 'prev';
    }
    yield createEvent.message(`Updated old tail's next pointer`, 'explanation');
  }

  nodes.push(newNode);

  yield createEvent.highlight([6]);
  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'doubly',
      headId: nodes.length === 1 ? newId : headId,
      tailId: newId,
      animating: 'insert',
      animatingNodeId: newId,
    },
  });

  yield createEvent.highlight([7, 8]);
  yield createEvent.message(`Successfully inserted ${value} at tail!`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'doubly',
      headId: nodes.length === 1 ? newId : headId,
      tailId: newId,
    },
  });

  yield createEvent.result('string', `Inserted ${value}`, `Node ${value} is now the tail`);
}

function* runDelete(nodes: LinkedListNode[], headId: number | null, tailId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Deleting node with value ${value}...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (headId === null) {
    yield createEvent.message(`List is empty, nothing to delete`, 'info');
    yield createEvent.result('string', 'Failed', 'List is empty');
    return;
  }

  let current = nodes.find(n => n.id === headId);
  let newHeadId: number | null = headId;
  let newTailId: number | null = tailId;

  while (current) {
    yield createEvent.highlight([2, 3]);
    current.highlight = 'current';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'doubly',
        headId: newHeadId,
        tailId: newTailId,
        pointers: [{ nodeId: current.id, label: 'current', color: 'yellow' }],
      },
    });

    if (current.value === value) {
      yield createEvent.highlight([3, 4]);
      current.highlight = 'target';
      yield createEvent.message(`Found ${value}, removing it`, 'explanation');

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'doubly',
          headId: newHeadId,
          tailId: newTailId,
          animating: 'delete',
          animatingNodeId: current.id,
        },
      });

      // Update prev node
      if (current.prevId !== null) {
        yield createEvent.highlight([4, 5]);
        const prevNode = nodes.find(n => n.id === current!.prevId);
        if (prevNode) {
          prevNode.nextId = current.nextId;
        }
      } else {
        yield createEvent.highlight([6]);
        newHeadId = current.nextId ?? null;
        if (newHeadId !== null) {
          const newHead = nodes.find(n => n.id === newHeadId);
          if (newHead) newHead.isHead = true;
        }
      }

      // Update next node
      if (current.nextId !== null) {
        yield createEvent.highlight([7, 8]);
        const nextNode = nodes.find(n => n.id === current!.nextId);
        if (nextNode) {
          nextNode.prevId = current.prevId;
        }
      } else {
        yield createEvent.highlight([9]);
        newTailId = current.prevId ?? null;
        if (newTailId !== null) {
          const newTail = nodes.find(n => n.id === newTailId);
          if (newTail) newTail.isTail = true;
        }
      }

      // Remove from array
      const index = nodes.findIndex(n => n.id === current!.id);
      nodes.splice(index, 1);

      yield createEvent.highlight([10]);
      yield createEvent.message(`Successfully deleted ${value}!`, 'info');

      nodes.forEach(n => n.highlight = undefined);

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'doubly',
          headId: newHeadId,
          tailId: newTailId,
        },
      });

      yield createEvent.result('string', `Deleted ${value}`, `Node ${value} removed`);
      return;
    }

    current.highlight = 'visited';
    yield createEvent.highlight([11]);
    const nextNode = current.nextId !== null ? nodes.find(n => n.id === current!.nextId) : undefined;
    current = nextNode;
  }

  yield createEvent.highlight([12]);
  yield createEvent.message(`Value ${value} not found in list`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'doubly',
      headId,
      tailId,
    },
  });

  yield createEvent.result('string', 'Not Found', `Value ${value} not in list`);
}

function* runForwardTraverse(nodes: LinkedListNode[], headId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Forward traversing the doubly linked list...`, 'step');
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
        listType: 'doubly',
        headId,
        pointers: [{ nodeId: current.id, label: 'current →', color: 'blue' }],
        message: `Forward: [${visited.join(' → ')}]`,
      },
    });

    yield createEvent.message(`Visiting node with value ${current.value}`, 'explanation');

    current.highlight = 'visited';
    yield createEvent.highlight([4]);

    const nextNode = current.nextId !== null ? nodes.find(n => n.id === current!.nextId) : undefined;
    current = nextNode;
  }

  yield createEvent.message(`Forward traversal complete! Visited ${visited.length} nodes`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'doubly',
      headId,
      message: `Forward order: [${visited.join(' → ')}]`,
    },
  });

  yield createEvent.result('string', visited.join(' → '), `Traversed ${visited.length} nodes forward`);
}

function* runBackwardTraverse(nodes: LinkedListNode[], tailId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Backward traversing the doubly linked list...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (tailId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('string', 'Empty', 'No nodes to traverse');
    return;
  }

  const visited: number[] = [];
  let current = nodes.find(n => n.id === tailId);

  while (current) {
    yield createEvent.highlight([2, 3]);
    current.highlight = 'current';
    visited.push(current.value);

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'doubly',
        tailId,
        pointers: [{ nodeId: current.id, label: '← current', color: 'purple' }],
        message: `Backward: [${visited.join(' ← ')}]`,
      },
    });

    yield createEvent.message(`Visiting node with value ${current.value}`, 'explanation');

    current.highlight = 'visited';
    yield createEvent.highlight([4]);

    const prevNode = current.prevId !== null ? nodes.find(n => n.id === current!.prevId) : undefined;
    current = prevNode;
  }

  yield createEvent.message(`Backward traversal complete! Visited ${visited.length} nodes`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'doubly',
      tailId,
      message: `Backward order: [${visited.join(' ← ')}]`,
    },
  });

  yield createEvent.result('string', visited.join(' ← '), `Traversed ${visited.length} nodes backward`);
}
