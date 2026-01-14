import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BinaryTreeNodeData } from '../../events/events';
import { createTreeFromArray, cloneTreeNodes, setNodeHighlight } from './utils';

/**
 * Preorder Tree Traversal (Root → Left → Right)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(h) for recursion stack
 * 
 * Visits root first, then left subtree, then right subtree.
 * Useful for creating a copy of the tree.
 */
export const preorderTraversal: IAlgorithm<ArrayInput> = {
  id: 'preorder-traversal',
  name: 'Preorder Traversal',
  category: 'trees',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function preorder(node):',
    '  if node is null:',
    '    return',
    '',
    '  // Visit current node first',
    '  visit(node)',
    '',
    '  // Visit left subtree',
    '  preorder(node.left)',
    '',
    '  // Visit right subtree',
    '  preorder(node.right)',
    '',
    '  // Result: Root → Left → Right',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(h) recursion stack',

  parameters: [
    {
      type: 'select',
      id: 'method',
      label: 'Method',
      default: 'recursive',
      options: [
        { value: 'recursive', label: 'Recursive' },
        { value: 'iterative', label: 'Iterative (Stack)' },
      ],
    },
  ],

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

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const method = (params?.method as string) || 'recursive';

    const values: (number | null)[] = input.values.map(v => v === -1 ? null : v);
    const { nodes: initialNodes, rootId } = createTreeFromArray(values);

    if (!rootId) {
      yield createEvent.message('Empty tree', 'info');
      return;
    }

    let nodes = cloneTreeNodes(initialNodes);
    const traversalOrder: number[] = [];
    const nodeMap = new Map<string, BinaryTreeNodeData>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    yield createEvent.message(
      `Starting Preorder Traversal (${method}) - Root → Left → Right`,
      'info',
      0
    );
    yield createEvent.highlight([0]);
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: { nodes, rootId, traversalOrder, message: 'Starting traversal' },
    });

    if (method === 'recursive') {
      function* preorderRecursive(nodeId: string | undefined): Generator<AlgoEvent, void, unknown> {
        if (!nodeId) {
          yield createEvent.message('Node is null, returning', 'explanation', 1);
          yield createEvent.highlight([1, 2]);
          return;
        }

        const node = nodeMap.get(nodeId)!;

        // Visit current node FIRST
        yield createEvent.message(`Visiting node ${node.value}`, 'step', 5);
        yield createEvent.highlight([4, 5]);
        traversalOrder.push(node.value);
        nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'visited');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: {
            nodes,
            rootId,
            traversalOrder: [...traversalOrder],
            message: `Visited ${node.value} → Order: [${traversalOrder.join(', ')}]`,
          },
        });

        // Visit left subtree
        if (node.left) {
          yield createEvent.message(`Going to left child of ${node.value}`, 'explanation', 8);
          yield createEvent.highlight([7, 8]);
          yield* preorderRecursive(node.left);
        }

        // Visit right subtree
        if (node.right) {
          yield createEvent.message(`Going to right child of ${node.value}`, 'explanation', 11);
          yield createEvent.highlight([10, 11]);
          yield* preorderRecursive(node.right);
        }
      }

      yield* preorderRecursive(rootId);

    } else {
      // Iterative preorder using stack
      const stack: string[] = [rootId];

      yield createEvent.message('Using iterative approach with stack', 'info');

      while (stack.length > 0) {
        const current = stack.pop()!;
        const node = nodeMap.get(current)!;

        // Visit current
        traversalOrder.push(node.value);
        nodes = setNodeHighlight(cloneTreeNodes(nodes), current, 'visited');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: {
            nodes,
            rootId,
            traversalOrder: [...traversalOrder],
            message: `Pop and visit ${node.value}`,
          },
        });
        yield createEvent.message(`Pop ${node.value}, add to result`, 'step');

        // Push right first, then left (so left is processed first)
        if (node.right) {
          stack.push(node.right);
          yield createEvent.message(`Push right child to stack`, 'explanation');
        }
        if (node.left) {
          stack.push(node.left);
          yield createEvent.message(`Push left child to stack`, 'explanation');
        }
      }
    }

    yield createEvent.message(
      `Preorder traversal complete: [${traversalOrder.join(', ')}]`,
      'info',
      13
    );
    yield createEvent.highlight([13]);
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: {
        nodes,
        rootId,
        traversalOrder,
        phase: 'Complete',
        message: `Result: [${traversalOrder.join(', ')}]`,
      },
    });
    yield createEvent.result('indices', traversalOrder, 'Preorder Traversal');
  },
};
