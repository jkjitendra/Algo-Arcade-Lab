import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BinaryTreeNodeData } from '../../events/events';
import { createTreeFromArray, cloneTreeNodes, setNodeHighlight } from './utils';

/**
 * Validate Binary Search Tree
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(h) for recursion stack
 * 
 * A valid BST has all left descendants < node < all right descendants.
 * Uses min/max range checking approach.
 */
export const isBST: IAlgorithm<ArrayInput> = {
  id: 'is-bst',
  name: 'Is Valid BST?',
  category: 'trees',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function isBST(node, min, max):',
    '  if node is null:',
    '    return true',
    '',
    '  // Check if node value is in valid range',
    '  if node.value <= min or node.value >= max:',
    '    return false  // Violates BST property',
    '',
    '  // Left subtree: max is current node',
    '  // Right subtree: min is current node',
    '  return isBST(node.left, min, node.value)',
    '     AND isBST(node.right, node.value, max)',
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
      yield createEvent.message('Empty tree is a valid BST', 'info');
      yield createEvent.result('boolean', true, 'Is BST');
      return;
    }

    let nodes = cloneTreeNodes(initialNodes);
    const nodeMap = new Map<string, BinaryTreeNodeData>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    yield createEvent.message('Validating Binary Search Tree property', 'info', 0);
    yield createEvent.highlight([0]);
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: { nodes, rootId, message: 'BST: left < node < right for all nodes' },
    });

    let isValid = true;
    let invalidNode: string | undefined;

    function* validateBST(
      nodeId: string | undefined,
      min: number,
      max: number
    ): Generator<AlgoEvent, boolean, unknown> {
      if (!nodeId) {
        yield createEvent.highlight([1, 2]);
        return true;
      }

      const node = nodeMap.get(nodeId)!;
      nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'current');
      yield createEvent.auxiliary({
        type: 'tree',
        treeData: {
          nodes,
          rootId,
          message: `Checking ${node.value}: must be in range (${min === -Infinity ? '-∞' : min}, ${max === Infinity ? '∞' : max})`,
        },
      });
      yield createEvent.message(
        `Node ${node.value}: valid range (${min === -Infinity ? '-∞' : min}, ${max === Infinity ? '∞' : max})`,
        'step'
      );

      // Check if current value is in valid range
      if (node.value <= min || node.value >= max) {
        yield createEvent.message(
          `❌ Node ${node.value} violates BST property!`,
          'step',
          5
        );
        yield createEvent.highlight([5, 6]);
        isValid = false;
        invalidNode = nodeId;

        nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'deleted');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: {
            nodes,
            rootId,
            message: `INVALID: ${node.value} is not in range (${min === -Infinity ? '-∞' : min}, ${max === Infinity ? '∞' : max})`,
          },
        });
        return false;
      }

      yield createEvent.message(`✓ Node ${node.value} is in valid range`, 'explanation');
      yield createEvent.highlight([4, 5]);

      // Check left subtree (all values must be < current)
      yield createEvent.message(`Check left subtree: range (${min === -Infinity ? '-∞' : min}, ${node.value})`, 'explanation', 10);
      yield createEvent.highlight([9, 10]);
      const leftValid: boolean = yield* validateBST(node.left, min, node.value);

      if (!leftValid) return false;

      // Check right subtree (all values must be > current)
      yield createEvent.message(`Check right subtree: range (${node.value}, ${max === Infinity ? '∞' : max})`, 'explanation', 11);
      yield createEvent.highlight([11]);
      const rightValid: boolean = yield* validateBST(node.right, node.value, max);

      if (leftValid && rightValid) {
        nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'visited');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: { nodes, rootId, message: `Subtree rooted at ${node.value} is valid` },
        });
      }

      return leftValid && rightValid;
    }

    const result: boolean = yield* validateBST(rootId, -Infinity, Infinity);

    const message = result
      ? '✓ Tree is a valid BST!'
      : `✗ Tree is NOT a valid BST!`;

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
    yield createEvent.result('boolean', result, 'Is Valid BST');
  },
};
