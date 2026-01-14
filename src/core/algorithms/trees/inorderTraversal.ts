import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BinaryTreeNodeData } from '../../events/events';
import { createTreeFromArray, cloneTreeNodes, setNodeHighlight, clearAllHighlights } from './utils';

/**
 * Inorder Tree Traversal (Left → Root → Right)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(h) for recursion stack, O(n) for output
 * 
 * Visits left subtree, then root, then right subtree.
 * For BST, this produces sorted order.
 */
export const inorderTraversal: IAlgorithm<ArrayInput> = {
  id: 'inorder-traversal',
  name: 'Inorder Traversal',
  category: 'trees',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function inorder(node):',
    '  if node is null:',
    '    return',
    '',
    '  // Visit left subtree first',
    '  inorder(node.left)',
    '',
    '  // Visit current node',
    '  visit(node)',
    '',
    '  // Visit right subtree',
    '  inorder(node.right)',
    '',
    '  // Result: Left → Root → Right',
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

    // Convert array to tree structure (LeetCode format: null = empty)
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
      `Starting Inorder Traversal (${method}) - Left → Root → Right`,
      'info',
      0
    );
    yield createEvent.highlight([0]);
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: { nodes, rootId, traversalOrder, message: 'Starting traversal' },
    });

    if (method === 'recursive') {
      // Recursive inorder traversal
      function* inorderRecursive(nodeId: string | undefined): Generator<AlgoEvent, void, unknown> {
        if (!nodeId) {
          yield createEvent.message('Node is null, returning', 'explanation', 1);
          yield createEvent.highlight([1, 2]);
          return;
        }

        const node = nodeMap.get(nodeId)!;

        // Highlight current node
        nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'current');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: { nodes, rootId, traversalOrder, message: `At node ${node.value}` },
        });
        yield createEvent.message(`At node ${node.value}`, 'step');

        // Visit left subtree
        if (node.left) {
          yield createEvent.message(`Going to left child of ${node.value}`, 'explanation', 5);
          yield createEvent.highlight([4, 5]);
          yield* inorderRecursive(node.left);
        }

        // Visit current node
        yield createEvent.message(`Visiting node ${node.value}`, 'step', 8);
        yield createEvent.highlight([7, 8]);
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

        // Visit right subtree
        if (node.right) {
          yield createEvent.message(`Going to right child of ${node.value}`, 'explanation', 11);
          yield createEvent.highlight([10, 11]);
          yield* inorderRecursive(node.right);
        }
      }

      yield* inorderRecursive(rootId);

    } else {
      // Iterative inorder traversal using stack
      const stack: string[] = [];
      let current: string | undefined = rootId;

      yield createEvent.message('Using iterative approach with stack', 'info');

      while (current || stack.length > 0) {
        // Go to leftmost node
        while (current) {
          const node = nodeMap.get(current)!;
          stack.push(current);
          nodes = setNodeHighlight(cloneTreeNodes(nodes), current, 'current');
          yield createEvent.auxiliary({
            type: 'tree',
            treeData: {
              nodes,
              rootId,
              traversalOrder,
              message: `Push ${node.value} to stack`,
            },
          });
          yield createEvent.message(`Push ${node.value} to stack, go left`, 'step');
          current = node.left;
        }

        // Pop and visit
        current = stack.pop();
        if (current) {
          const node = nodeMap.get(current)!;
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

          // Go to right subtree
          current = node.right;
          if (current) {
            yield createEvent.message(`Move to right child of ${node.value}`, 'explanation');
          }
        }
      }
    }

    // Final result
    yield createEvent.message(
      `Inorder traversal complete: [${traversalOrder.join(', ')}]`,
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
    yield createEvent.result('indices', traversalOrder, 'Inorder Traversal');
  },
};
