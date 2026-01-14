import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BinaryTreeNodeData } from '../../events/events';
import { createTreeFromArray, cloneTreeNodes, setNodeHighlight } from './utils';

/**
 * Check if Binary Tree is Balanced
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(h) for recursion stack
 * 
 * A balanced tree has height difference of at most 1 between
 * left and right subtrees for every node.
 */
export const isBalanced: IAlgorithm<ArrayInput> = {
  id: 'is-balanced',
  name: 'Is Balanced?',
  category: 'trees',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function isBalanced(node):',
    '  if node is null:',
    '    return true, height = -1',
    '',
    '  leftBalanced, leftHeight = isBalanced(node.left)',
    '  rightBalanced, rightHeight = isBalanced(node.right)',
    '',
    '  // Check if current node is balanced',
    '  balanced = |leftHeight - rightHeight| <= 1',
    '',
    '  return leftBalanced AND rightBalanced AND balanced',
    '         height = max(leftHeight, rightHeight) + 1',
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
      yield createEvent.message('Empty tree is balanced', 'info');
      yield createEvent.result('boolean', true, 'Is Balanced');
      return;
    }

    let nodes = cloneTreeNodes(initialNodes);
    const nodeMap = new Map<string, BinaryTreeNodeData>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    yield createEvent.message('Checking if tree is height-balanced', 'info', 0);
    yield createEvent.highlight([0]);
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: { nodes, rootId, message: 'A tree is balanced if height diff ≤ 1 at every node' },
    });

    function* checkBalanced(nodeId: string | undefined): Generator<AlgoEvent, { balanced: boolean; height: number }, unknown> {
      if (!nodeId) {
        yield createEvent.highlight([1, 2]);
        return { balanced: true, height: -1 };
      }

      const node = nodeMap.get(nodeId)!;
      nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'current');
      yield createEvent.auxiliary({
        type: 'tree',
        treeData: { nodes, rootId, message: `Checking balance at node ${node.value}` },
      });
      yield createEvent.message(`Checking node ${node.value}`, 'step');

      // Check left subtree
      yield createEvent.highlight([4]);
      const left: { balanced: boolean; height: number } = yield* checkBalanced(node.left);

      // Check right subtree
      yield createEvent.highlight([5]);
      const right: { balanced: boolean; height: number } = yield* checkBalanced(node.right);

      // Calculate balance
      const heightDiff = Math.abs(left.height - right.height);
      const currentBalanced = heightDiff <= 1;
      const height = Math.max(left.height, right.height) + 1;

      yield createEvent.message(
        `Node ${node.value}: left_h=${left.height}, right_h=${right.height}, diff=${heightDiff}`,
        'explanation',
        8
      );
      yield createEvent.highlight([8]);

      const isNodeBalanced = left.balanced && right.balanced && currentBalanced;

      nodes = nodes.map(n => n.id === nodeId ? {
        ...n,
        balanceFactor: left.height - right.height,
        highlight: isNodeBalanced ? 'visited' : 'deleted'
      } : n);

      yield createEvent.auxiliary({
        type: 'tree',
        treeData: {
          nodes,
          rootId,
          message: isNodeBalanced ? `Node ${node.value} is balanced` : `Node ${node.value} is UNBALANCED!`,
        },
      });

      if (!isNodeBalanced) {
        yield createEvent.message(`⚠️ Node ${node.value} is unbalanced!`, 'step');
      }

      yield createEvent.highlight([10, 11]);
      return { balanced: isNodeBalanced, height };
    }

    const result: { balanced: boolean; height: number } = yield* checkBalanced(rootId);

    const message = result.balanced
      ? '✓ Tree is balanced!'
      : '✗ Tree is NOT balanced!';

    yield createEvent.message(message, 'info');
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: {
        nodes,
        rootId,
        phase: 'Complete',
        message,
      },
    });
    yield createEvent.result('boolean', result.balanced, 'Is Balanced');
  },
};
