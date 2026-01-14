import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BinaryTreeNodeData } from '../../events/events';
import { createTreeFromArray, cloneTreeNodes, setNodeHighlight } from './utils';

/**
 * Calculate Tree Height / Maximum Depth
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(h) for recursion stack
 * 
 * Height is the number of edges on the longest path from root to leaf.
 * Depth of root is 0, height of empty tree is -1 (or 0 for some definitions).
 */
export const treeHeight: IAlgorithm<ArrayInput> = {
  id: 'tree-height',
  name: 'Tree Height',
  category: 'trees',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function height(node):',
    '  if node is null:',
    '    return -1  // or 0 for depth',
    '',
    '  // Recursively find height of subtrees',
    '  leftHeight = height(node.left)',
    '  rightHeight = height(node.right)',
    '',
    '  // Height is max of children + 1',
    '  return max(leftHeight, rightHeight) + 1',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(h) recursion stack',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 31) {
      return { ok: false, error: 'Tree size must be 31 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const values: (number | null)[] = input.values.map(v => v === -1 ? null : v);
    const { nodes: initialNodes, rootId } = createTreeFromArray(values);

    if (!rootId) {
      yield createEvent.message('Empty tree has height -1', 'info', 1);
      yield createEvent.highlight([1, 2]);
      yield createEvent.result('search', -1, 'Tree Height');
      return;
    }

    let nodes = cloneTreeNodes(initialNodes);
    const nodeMap = new Map<string, BinaryTreeNodeData>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    yield createEvent.message('Starting tree height calculation', 'info', 0);
    yield createEvent.highlight([0]);
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: { nodes, rootId, message: 'Calculating height recursively' },
    });

    function* calculateHeight(nodeId: string | undefined): Generator<AlgoEvent, number, unknown> {
      if (!nodeId) {
        yield createEvent.message('Null node, return -1', 'explanation', 1);
        yield createEvent.highlight([1, 2]);
        return -1;
      }

      const node = nodeMap.get(nodeId)!;
      nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'current');
      yield createEvent.auxiliary({
        type: 'tree',
        treeData: { nodes, rootId, message: `Calculating height at node ${node.value}` },
      });
      yield createEvent.message(`At node ${node.value}`, 'step');

      // Calculate left height
      yield createEvent.message(`Calculate left subtree height`, 'explanation', 5);
      yield createEvent.highlight([5]);
      const leftHeight: number = yield* calculateHeight(node.left);

      // Calculate right height
      yield createEvent.message(`Calculate right subtree height`, 'explanation', 6);
      yield createEvent.highlight([6]);
      const rightHeight: number = yield* calculateHeight(node.right);

      // Return max + 1
      const height = Math.max(leftHeight, rightHeight) + 1;
      yield createEvent.message(
        `Node ${node.value}: max(${leftHeight}, ${rightHeight}) + 1 = ${height}`,
        'step',
        9
      );
      yield createEvent.highlight([8, 9]);

      // Update node to show height
      nodes = nodes.map(n => n.id === nodeId ? { ...n, height, highlight: 'visited' as const } : n);
      yield createEvent.auxiliary({
        type: 'tree',
        treeData: { nodes, rootId, message: `Height at ${node.value} = ${height}` },
      });

      return height;
    }

    const treeHeight: number = yield* calculateHeight(rootId);

    yield createEvent.message(`Tree height: ${treeHeight}`, 'info');
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: {
        nodes,
        rootId,
        phase: 'Complete',
        message: `Tree Height = ${treeHeight}`,
      },
    });
    yield createEvent.result('search', treeHeight, 'Tree Height');
  },
};
