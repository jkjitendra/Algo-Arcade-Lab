import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, LinkedListNode } from '../../events/events';

/**
 * Find Cycle Start in Linked List
 * 
 * After detecting a cycle using Floyd's algorithm, find where the cycle begins.
 * Reset one pointer to head and move both at same speed until they meet.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const pseudocode = [
  'function findCycleStart(head):',
  '  // First, detect cycle and find meeting point',
  '  slow = fast = head',
  '  while fast and fast.next:',
  '    slow = slow.next',
  '    fast = fast.next.next',
  '    if slow == fast: break',
  '  if not fast or not fast.next:',
  '    return null  // No cycle',
  '  // Reset slow to head, keep fast at meeting point',
  '  slow = head',
  '  while slow != fast:',
  '    slow = slow.next',
  '    fast = fast.next',
  '  return slow  // Cycle start',
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

  if (cyclePos >= 0 && cyclePos < values.length) {
    const lastNode = nodes[nodes.length - 1];
    lastNode.nextId = cyclePos;
    lastNode.isTail = false;
    cycleStartId = cyclePos;
  }

  return { nodes, headId: 0, cycleStartId };
}

export const findCycleStart: IAlgorithm<ArrayInput> = {
  id: 'find-cycle-start',
  name: 'Find Cycle Start',
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
      id: 'cyclePosition',
      label: 'Cycle Position (where cycle starts)',
      default: 2,
      min: 0,
      max: 8,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 3) {
      return { ok: false, error: 'List must have at least 3 elements' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'List size must be 10 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const cyclePosition = Math.min((params?.cyclePosition ?? 2) as number, input.values.length - 1);

    const { nodes, headId, cycleStartId } = buildLinkedListWithCycle([...input.values], cyclePosition);

    yield createEvent.message(
      `Find Cycle Start Position`,
      'info',
      0
    );
    yield createEvent.message(
      `Cycle starts at position ${cyclePosition} (value: ${input.values[cyclePosition]})`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        cycleStartId,
        hasCycle: true,
      },
    });

    yield* runFindCycleStart(nodes, headId, cycleStartId);
  },
};

function* runFindCycleStart(nodes: LinkedListNode[], headId: number | null, actualCycleStartId: number | null): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([0, 1, 2]);
  yield createEvent.message(`Phase 1: Detect cycle using Floyd's algorithm`, 'step');

  if (headId === null) {
    yield createEvent.result('string', 'null', 'Empty list');
    return;
  }

  let slowId = headId;
  let fastId = headId;
  let step = 0;
  const maxSteps = nodes.length * 3;
  let meetingPointId: number | null = null;

  // Phase 1: Find meeting point
  while (step < maxSteps) {
    yield createEvent.highlight([3, 4, 5]);

    const slow = nodes.find(n => n.id === slowId);
    const fast = nodes.find(n => n.id === fastId);

    if (!fast || fast.nextId === null) {
      yield createEvent.message(`No cycle detected`, 'info');
      yield createEvent.result('string', 'null', 'No cycle');
      return;
    }

    // Move slow by 1
    if (slow && slow.nextId !== null && slow.nextId !== undefined) {
      slowId = slow.nextId as number;
    }

    // Move fast by 2
    const fastNext = nodes.find(n => n.id === fast.nextId);
    if (fastNext && fastNext.nextId !== null && fastNext.nextId !== undefined) {
      fastId = fastNext.nextId as number;
    } else if (fastNext) {
      yield createEvent.highlight([7, 8]);
      yield createEvent.message(`No cycle detected`, 'info');
      yield createEvent.result('string', 'null', 'No cycle');
      return;
    }

    step++;
    const slowNode = nodes.find(n => n.id === slowId);
    const fastNode = nodes.find(n => n.id === fastId);

    nodes.forEach(n => n.highlight = undefined);
    if (slowNode) slowNode.highlight = 'slow';
    if (fastNode) fastNode.highlight = 'fast';

    yield createEvent.auxiliary({
      type: 'linkedlist',
      linkedListData: {
        nodes: [...nodes],
        listType: 'singly',
        headId,
        cycleStartId: actualCycleStartId,
        hasCycle: true,
        pointers: [
          { nodeId: slowId, label: 'slow 🐢', color: 'blue' },
          { nodeId: fastId, label: 'fast 🐇', color: 'purple' },
        ],
        message: `Phase 1 - Step ${step}`,
      },
    });

    yield createEvent.highlight([6]);
    if (slowId === fastId) {
      meetingPointId = slowId;
      yield createEvent.message(`🎯 Pointers meet at ${slowNode?.value}!`, 'info');
      break;
    }
  }

  if (meetingPointId === null) {
    yield createEvent.result('string', 'null', 'No cycle');
    return;
  }

  // Phase 2: Find cycle start
  yield createEvent.highlight([9, 10]);
  yield createEvent.message(`Phase 2: Reset slow to head, move both at same speed`, 'step');

  slowId = headId;
  step = 0;

  nodes.forEach(n => n.highlight = undefined);
  const meetingNode = nodes.find(n => n.id === meetingPointId);
  if (meetingNode) meetingNode.highlight = 'visited';

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
      cycleStartId: actualCycleStartId,
      hasCycle: true,
      meetingPointId,
      pointers: [
        { nodeId: slowId, label: 'slow', color: 'blue' },
        { nodeId: fastId, label: 'fast', color: 'purple' },
      ],
      message: `Reset slow to head`,
    },
  });

  while (slowId !== fastId && step < maxSteps) {
    yield createEvent.highlight([11, 12, 13]);

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
        cycleStartId: actualCycleStartId,
        hasCycle: true,
        pointers: [
          { nodeId: slowId, label: 'slow', color: 'blue' },
          { nodeId: fastId, label: 'fast', color: 'purple' },
        ],
        message: `Phase 2 - Step ${step}: slow at ${slowNode?.value}, fast at ${fastNode?.value}`,
      },
    });

    yield createEvent.message(
      `Step ${step}: slow → ${slowNode?.value}, fast → ${fastNode?.value}`,
      'explanation'
    );

    // Move both by 1
    if (slowNode && slowNode.nextId !== null && slowNode.nextId !== undefined) {
      slowNode.highlight = 'visited';
      slowId = slowNode.nextId as number;
    }
    if (fastNode && fastNode.nextId !== null && fastNode.nextId !== undefined) {
      fastId = fastNode.nextId as number;
    }
  }

  yield createEvent.highlight([14]);

  // Found cycle start
  const cycleStartNode = nodes.find(n => n.id === slowId);
  if (cycleStartNode) {
    cycleStartNode.highlight = 'cycle';
  }

  yield createEvent.message(`🎯 Cycle starts at node with value ${cycleStartNode?.value}!`, 'info');

  yield createEvent.auxiliary({
    type: 'linkedlist',
    linkedListData: {
      nodes: [...nodes],
      listType: 'singly',
      headId,
      cycleStartId: slowId,
      hasCycle: true,
      message: `Cycle start found: ${cycleStartNode?.value}`,
    },
  });

  yield createEvent.result('string', `${cycleStartNode?.value}`, `Cycle starts at node ${cycleStartNode?.value}`);
}
