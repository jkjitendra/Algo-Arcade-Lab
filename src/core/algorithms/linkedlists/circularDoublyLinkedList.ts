import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Circular Doubly Linked List Operations
 * 
 * A doubly linked list where last node's next points to head
 * and head's prev points to last node, forming a complete circle.
 * 
 * Time Complexity: O(1) for insert at head/tail, O(n) for others
 * Space Complexity: O(n)
 */

type CircularDoublyOperation = 'insertHead' | 'insertTail' | 'delete' | 'forwardTraverse' | 'backwardTraverse';

const pseudocodeMap: Record<CircularDoublyOperation, string[]> = {
  'insertHead': [
    'function insertAtHead(head, value):',
    '  newNode = createNode(value)',
    '  if head is null:',
    '    newNode.next = newNode.prev = newNode',
    '    return newNode',
    '  tail = head.prev',
    '  newNode.next = head',
    '  newNode.prev = tail',
    '  head.prev = newNode',
    '  tail.next = newNode',
    '  return newNode',
  ],
  'insertTail': [
    'function insertAtTail(head, value):',
    '  newNode = createNode(value)',
    '  if head is null:',
    '    newNode.next = newNode.prev = newNode',
    '    return newNode',
    '  tail = head.prev',
    '  newNode.next = head',
    '  newNode.prev = tail',
    '  tail.next = newNode',
    '  head.prev = newNode',
    '  return head',
  ],
  'delete': [
    'function delete(head, value):',
    '  if head is null: return null',
    '  current = head',
    '  do:',
    '    if current.value == value:',
    '      if current.next == current:',
    '        return null  // Single node',
    '      current.prev.next = current.next',
    '      current.next.prev = current.prev',
    '      if current == head:',
    '        return current.next',
    '      return head',
    '    current = current.next',
    '  while current != head',
    '  return head',
  ],
  'forwardTraverse': [
    'function forwardTraverse(head):',
    '  if head is null: return',
    '  current = head',
    '  do:',
    '    visit(current)',
    '    current = current.next',
    '  while current != head',
  ],
  'backwardTraverse': [
    'function backwardTraverse(head):',
    '  if head is null: return',
    '  tail = head.prev',
    '  current = tail',
    '  do:',
    '    visit(current)',
    '    current = current.prev',
    '  while current != tail',
  ],
};

function buildCircularDoublyLinkedList(values: number[]): { nodes: LinkedListNode[]; headId: number | null; tailId: number | null } {
  if (values.length === 0) {
    return { nodes: [], headId: null, tailId: null };
  }

  const len = values.length;
  const nodes: LinkedListNode[] = values.map((value, index) => ({
    id: index,
    value,
    nextId: (index + 1) % len,  // Circular: last points to first
    prevId: (index - 1 + len) % len,  // Circular: first's prev is last
    isHead: index === 0,
    isTail: index === len - 1,
  }));

  return { nodes, headId: 0, tailId: len - 1 };
}

export const circularDoublyLinkedList: IAlgorithm<ArrayInput> = {
  id: 'circular-doubly-linked-list',
  name: 'Circular Doubly Linked List',
  category: 'linkedlists',
  difficulty: 'intermediate',

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
      default: 'forwardTraverse',
      options: [
        { value: 'insertHead', label: 'Insert at Head' },
        { value: 'insertTail', label: 'Insert at Tail' },
        { value: 'delete', label: 'Delete by Value' },
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
    if (input.values.length > 10) {
      return { ok: false, error: 'List size must be 10 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'forwardTraverse') as CircularDoublyOperation;
    const value = (params?.value || 99) as number;

    let { nodes, headId, tailId } = buildCircularDoublyLinkedList([...input.values]);

    yield createEvent.message(
      `Circular Doubly Linked List: ${operation.replace(/([A-Z])/g, ' $1').trim()}`,
      'info',
      0
    );
    yield createEvent.message(
      `Initial List: ↺ [${input.values.join(' ⟷ ')}] ↺`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'circular-doubly',
        headId,
        tailId,
      },
    });

    if (operation === 'insertHead') {
      yield* runInsertHead(nodes, headId, tailId, value);
    } else if (operation === 'insertTail') {
      yield* runInsertTail(nodes, headId, tailId, value);
    } else if (operation === 'delete') {
      yield* runDelete(nodes, headId, value);
    } else if (operation === 'forwardTraverse') {
      yield* runForwardTraverse(nodes, headId);
    } else if (operation === 'backwardTraverse') {
      yield* runBackwardTraverse(nodes, headId, tailId);
    }
  },
};

function* runInsertHead(nodes: LinkedListNode[], headId: number | null, tailId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} at head...`, 'step');
  yield createEvent.highlight([0, 1]);

  const newId = nodes.length;

  if (headId === null) {
    yield createEvent.highlight([2, 3, 4]);
    const newNode: LinkedListNode = {
      id: newId,
      value,
      nextId: newId,
      prevId: newId,
      isHead: true,
      isTail: true,
      highlight: 'current',
    };
    nodes.push(newNode);

    yield createEvent.message(`List was empty, new node points to itself in both directions`, 'explanation');

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'circular-doubly',
        headId: newId,
        tailId: newId,
      },
    });

    yield createEvent.result('string', `Inserted ${value}`, `Single node, points to itself`);
    return;
  }

  yield createEvent.highlight([5]);
  const tail = nodes.find(n => n.id === tailId);
  const head = nodes.find(n => n.id === headId);

  const newNode: LinkedListNode = {
    id: newId,
    value,
    nextId: headId,
    prevId: tailId,
    isHead: true,
    isTail: false,
    highlight: 'current',
  };

  yield createEvent.highlight([6, 7]);
  yield createEvent.message(`New node: next → old head, prev → tail`, 'explanation');

  if (head) {
    head.isHead = false;
    head.prevId = newId;
    head.highlight = 'next';
  }

  yield createEvent.highlight([8]);

  if (tail) {
    tail.nextId = newId;
    tail.highlight = 'prev';
  }

  yield createEvent.highlight([9]);
  nodes.push(newNode);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular-doubly',
      headId: newId,
      tailId,
      animating: 'insert',
      animatingNodeId: newId,
    },
  });

  yield createEvent.highlight([10]);
  yield createEvent.message(`Successfully inserted ${value} at head!`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular-doubly',
      headId: newId,
      tailId,
    },
  });

  yield createEvent.result('string', `Inserted ${value}`, `New node is now the head`);
}

function* runInsertTail(nodes: LinkedListNode[], headId: number | null, tailId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Inserting ${value} at tail...`, 'step');
  yield createEvent.highlight([0, 1]);

  const newId = nodes.length;

  if (headId === null) {
    yield createEvent.highlight([2, 3, 4]);
    const newNode: LinkedListNode = {
      id: newId,
      value,
      nextId: newId,
      prevId: newId,
      isHead: true,
      isTail: true,
      highlight: 'current',
    };
    nodes.push(newNode);

    yield createEvent.message(`List was empty, new node points to itself`, 'explanation');

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'circular-doubly',
        headId: newId,
        tailId: newId,
      },
    });

    yield createEvent.result('string', `Inserted ${value}`, `Single node, points to itself`);
    return;
  }

  yield createEvent.highlight([5]);
  const tail = nodes.find(n => n.id === tailId);
  const head = nodes.find(n => n.id === headId);

  const newNode: LinkedListNode = {
    id: newId,
    value,
    nextId: headId,
    prevId: tailId,
    isHead: false,
    isTail: true,
    highlight: 'current',
  };

  yield createEvent.highlight([6, 7]);
  yield createEvent.message(`New node: next → head, prev → old tail`, 'explanation');

  if (tail) {
    tail.isTail = false;
    tail.nextId = newId;
    tail.highlight = 'prev';
  }

  yield createEvent.highlight([8]);

  if (head) {
    head.prevId = newId;
    head.highlight = 'next';
  }

  yield createEvent.highlight([9]);
  nodes.push(newNode);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular-doubly',
      headId,
      tailId: newId,
      animating: 'insert',
      animatingNodeId: newId,
    },
  });

  yield createEvent.highlight([10]);
  yield createEvent.message(`Successfully inserted ${value} at tail!`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular-doubly',
      headId,
      tailId: newId,
    },
  });

  yield createEvent.result('string', `Inserted ${value}`, `New node is now the tail`);
}

function* runDelete(nodes: LinkedListNode[], headId: number | null, value: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Deleting ${value} from circular doubly list...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (headId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('string', 'Failed', 'List is empty');
    return;
  }

  let current = nodes.find(n => n.id === headId);
  let count = 0;
  const maxIterations = nodes.length;
  let newHeadId: number | null = headId;
  let newTailId: number | null = nodes.find(n => n.id === headId)?.prevId ?? null;

  yield createEvent.highlight([2, 3]);

  do {
    if (current) {
      yield createEvent.highlight([4]);
      current.highlight = 'current';

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'circular-doubly',
          headId: newHeadId,
          tailId: newTailId,
          pointers: [{ nodeId: current.id, label: 'current', color: 'yellow' }],
        },
      });

      if (current.value === value) {
        yield createEvent.highlight([5, 6]);

        // Single node case
        if (current.nextId === current.id) {
          yield createEvent.message(`Single node, removing it`, 'explanation');
          nodes.splice(0, 1);

          yield createEvent.auxiliary({
            type: 'linkedlist',
            linkedListData: {
              nodes: [],
              listType: 'circular-doubly',
              headId: null,
              tailId: null,
            },
          });

          yield createEvent.result('string', `Deleted ${value}`, 'List is now empty');
          return;
        }

        current.highlight = 'target';
        yield createEvent.highlight([7, 8]);

        yield createEvent.auxiliary({
          type: 'linkedlist',
          linkedListData: {
            nodes: [...nodes],
            listType: 'circular-doubly',
            headId: newHeadId,
            tailId: newTailId,
            animating: 'delete',
            animatingNodeId: current.id,
          },
        });

        // Update prev and next nodes
        const prevNode = nodes.find(n => n.id === current!.prevId);
        const nextNode = nodes.find(n => n.id === current!.nextId);

        if (prevNode) {
          prevNode.nextId = current.nextId;
          if (current.isTail) prevNode.isTail = true;
        }
        if (nextNode) {
          nextNode.prevId = current.prevId;
          if (current.isHead) nextNode.isHead = true;
        }

        yield createEvent.highlight([9, 10]);

        if (current.id === headId) {
          newHeadId = current.nextId ?? null;
        }
        if (current.id === newTailId) {
          newTailId = current.prevId ?? null;
        }

        const index = nodes.findIndex(n => n.id === current!.id);
        nodes.splice(index, 1);

        yield createEvent.highlight([11]);
        yield createEvent.message(`Successfully deleted ${value}!`, 'info');

        nodes.forEach(n => n.highlight = undefined);

        yield createEvent.auxiliary({
          type: 'linkedlist',
          linkedListData: {
            nodes: [...nodes],
            listType: 'circular-doubly',
            headId: newHeadId,
            tailId: newTailId,
          },
        });

        yield createEvent.result('string', `Deleted ${value}`, 'Node removed');
        return;
      }

      yield createEvent.highlight([12]);
      current.highlight = 'visited';
      const nextNode = nodes.find(n => n.id === current!.nextId);
      current = nextNode;
    }
    count++;
  } while (current && current.id !== headId && count < maxIterations);

  yield createEvent.highlight([13, 14]);
  yield createEvent.message(`Value ${value} not found`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular-doubly',
      headId,
      tailId: newTailId,
    },
  });

  yield createEvent.result('string', 'Not Found', `Value ${value} not in list`);
}

function* runForwardTraverse(nodes: LinkedListNode[], headId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Forward traversing circular doubly list...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (headId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('string', 'Empty', 'No nodes to traverse');
    return;
  }

  const visited: number[] = [];
  let current = nodes.find(n => n.id === headId);
  let count = 0;
  const maxIterations = nodes.length;

  yield createEvent.highlight([2, 3]);

  do {
    if (current) {
      yield createEvent.highlight([4, 5]);
      current.highlight = 'current';
      visited.push(current.value);

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'circular-doubly',
          headId,
          pointers: [{ nodeId: current.id, label: 'current →', color: 'blue' }],
          message: `Forward: [${visited.join(' → ')}]`,
        },
      });

      yield createEvent.message(`Visiting: ${current.value}`, 'explanation');

      current.highlight = 'visited';
      yield createEvent.highlight([6]);

      const nextNode = nodes.find(n => n.id === current!.nextId);
      current = nextNode;
    }
    count++;
  } while (current && current.id !== headId && count < maxIterations);

  yield createEvent.message(`Forward traversal complete!`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular-doubly',
      headId,
      message: `Complete circle: [${visited.join(' → ')}] → (head)`,
    },
  });

  yield createEvent.result('string', visited.join(' → '), `Traversed ${visited.length} nodes forward`);
}

function* runBackwardTraverse(nodes: LinkedListNode[], headId: number | null, tailId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Backward traversing circular doubly list...`, 'step');
  yield createEvent.highlight([0, 1, 2]);

  if (headId === null || tailId === null) {
    yield createEvent.message(`List is empty`, 'info');
    yield createEvent.result('string', 'Empty', 'No nodes to traverse');
    return;
  }

  const visited: number[] = [];
  let current = nodes.find(n => n.id === tailId);
  let count = 0;
  const maxIterations = nodes.length;

  yield createEvent.highlight([3, 4]);

  do {
    if (current) {
      yield createEvent.highlight([5, 6]);
      current.highlight = 'current';
      visited.push(current.value);

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'circular-doubly',
          headId,
          tailId,
          pointers: [{ nodeId: current.id, label: '← current', color: 'purple' }],
          message: `Backward: [${visited.join(' ← ')}]`,
        },
      });

      yield createEvent.message(`Visiting: ${current.value}`, 'explanation');

      current.highlight = 'visited';
      yield createEvent.highlight([7]);

      const prevNode = nodes.find(n => n.id === current!.prevId);
      current = prevNode;
    }
    count++;
  } while (current && current.id !== tailId && count < maxIterations);

  yield createEvent.message(`Backward traversal complete!`, 'info');

  nodes.forEach(n => n.highlight = undefined);

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'circular-doubly',
      headId,
      tailId,
      message: `Complete circle: [${visited.join(' ← ')}] ← (tail)`,
    },
  });

  yield createEvent.result('string', visited.join(' ← '), `Traversed ${visited.length} nodes backward`);
}
