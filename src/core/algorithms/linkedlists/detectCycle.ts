import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Detect Cycle in Linked List (Floyd's Algorithm)
 * 
 * Uses slow and fast pointers (tortoise and hare) to detect cycles.
 * If slow and fast meet, there's a cycle.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const pseudocode = [
  'function hasCycle(head):',
  '  if head is null: return false',
  '  slow = head',
  '  fast = head',
  '  while fast != null and fast.next != null:',
  '    slow = slow.next',
  '    fast = fast.next.next',
  '    if slow == fast:',
  '      return true  // Cycle detected!',
  '  return false  // No cycle',
];

function buildLinkedListWithCycle(values: number[], cyclePos: number): { nodes: LinkedListNode[]; headId: number | null; cycleStartId: number | null } {
  if (values.length === 0) {
    return { nodes: [], headId: null, cycleStartId: null };
  }

  const nodes: LinkedListNode[] = values.map((value, index) => ({
    id: index,
    value,
    nextId: index < values.length - 1 ? index + 1 : null,
    isHead: index === 0,
    isTail: index === values.length - 1,
  }));

  let cycleStartId: number | null = null;

  // Create cycle if valid position
  if (cyclePos >= 0 && cyclePos < values.length) {
    const lastNode = nodes[nodes.length - 1];
    lastNode.nextId = cyclePos;
    lastNode.isTail = false;
    cycleStartId = cyclePos;
  }

  return { nodes, headId: 0, cycleStartId };
}

export const detectCycle: IAlgorithm<ArrayInput> = {
  id: 'detect-cycle',
  name: 'Detect Cycle (Floyd\'s)',
  category: 'linkedlists',
  difficulty: 'intermediate',

  pseudocodeLines: pseudocode,

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'cyclePosition',
      label: 'Cycle Position (-1 = no cycle)',
      default: 2,
      min: -1,
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
    const cyclePosition = (params?.cyclePosition ?? 2) as number;

    const { nodes, headId, cycleStartId } = buildLinkedListWithCycle([...input.values], cyclePosition);

    yield createEvent.message(
      `Floyd's Cycle Detection (Tortoise and Hare)`,
      'info',
      0
    );

    const hasCycleMsg = cyclePosition >= 0 && cyclePosition < input.values.length
      ? `List has a cycle at position ${cyclePosition}`
      : `List has no cycle`;
    yield createEvent.message(hasCycleMsg, 'explanation');

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        cycleStartId,
        hasCycle: cycleStartId !== null,
      },
    });

    yield* runFloydDetection(nodes, headId, cycleStartId);
  },
};

function* runFloydDetection(nodes: LinkedListNode[], headId: number | null, cycleStartId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([0, 1]);

  if (headId === null) {
    yield createEvent.message(`List is empty, no cycle`, 'info');
    yield createEvent.result('boolean', false, 'Empty list');
    return;
  }

  yield createEvent.highlight([2, 3]);
  yield createEvent.message(`Initialize: slow = head, fast = head`, 'explanation');

  let slowId = headId;
  let fastId = headId;
  let step = 0;
  const maxSteps = nodes.length * 3;  // Prevent infinite loop in visualization

  // Color reset
  nodes.forEach(n => n.highlight = undefined);

  while (step < maxSteps) {
    yield createEvent.highlight([4]);

    const fast = nodes.find(n => n.id === fastId);

    // Check if fast or fast.next is null
    if (!fast || fast.nextId === null) {
      yield createEvent.message(`Fast pointer reached end - no cycle!`, 'info');

      nodes.forEach(n => n.highlight = undefined);

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId,
          hasCycle: false,
          message: `No cycle detected`,
        },
      });

      yield createEvent.result('boolean', false, 'No cycle exists');
      return;
    }

    // Move slow by 1
    yield createEvent.highlight([5]);
    const slow = nodes.find(n => n.id === slowId);
    if (slow) {
      slow.highlight = undefined;
      slowId = slow.nextId!;
    }

    // Move fast by 2
    yield createEvent.highlight([6]);
    const fastNext = nodes.find(n => n.id === fast.nextId);
    if (fastNext && fastNext.nextId !== null && fastNext.nextId !== undefined) {
      fastId = fastNext.nextId as number;
    } else if (fastNext) {
      fastId = fastNext.id;
      fast.highlight = undefined;

      // Fast reached near end
      yield createEvent.message(`Fast pointer near end - no cycle!`, 'info');

      nodes.forEach(n => n.highlight = undefined);

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId,
          hasCycle: false,
          message: `No cycle detected`,
        },
      });

      yield createEvent.result('boolean', false, 'No cycle exists');
      return;
    }

    // Highlight current positions
    const slowNode = nodes.find(n => n.id === slowId);
    const fastNode = nodes.find(n => n.id === fastId);

    if (slowNode) slowNode.highlight = 'slow';
    if (fastNode) fastNode.highlight = 'fast';

    step++;

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        cycleStartId,
        hasCycle: cycleStartId !== null,
        pointers: [
          { nodeId: slowId, label: 'slow 🐢', color: 'blue' },
          { nodeId: fastId, label: 'fast 🐇', color: 'purple' },
        ],
        message: `Step ${step}: slow at ${slowNode?.value}, fast at ${fastNode?.value}`,
      },
    });

    yield createEvent.message(
      `Step ${step}: slow → ${slowNode?.value}, fast → ${fastNode?.value}`,
      'explanation'
    );

    // Check if slow meets fast
    yield createEvent.highlight([7, 8]);
    if (slowId === fastId) {
      if (slowNode) slowNode.highlight = 'cycle';

      yield createEvent.message(`🎯 Slow and Fast meet at node ${slowNode?.value}! Cycle detected!`, 'info');

      yield createEvent.auxiliary({
        type: 'linkedlist',
        linkedListData: {
          nodes: [...nodes],
          listType: 'singly',
          headId,
          cycleStartId,
          hasCycle: true,
          meetingPointId: slowId,
          message: `Cycle detected! Meeting point: ${slowNode?.value}`,
        },
      });

      yield createEvent.result('boolean', true, `Cycle detected at node ${slowNode?.value}`);
      return;
    }

    // Reset highlights for next iteration (but keep cycle node marked)
    nodes.forEach(n => {
      if (n.id !== slowId && n.id !== fastId && n.id !== cycleStartId) {
        n.highlight = undefined;
      }
    });
  }

  yield createEvent.highlight([9]);
  yield createEvent.message(`No cycle detected`, 'info');
  yield createEvent.result('boolean', false, 'No cycle');
}
