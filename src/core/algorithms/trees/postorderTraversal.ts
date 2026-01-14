import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BinaryTreeNodeData } from '../../events/events';
import { createTreeFromArray, cloneTreeNodes, setNodeHighlight } from './utils';

/**
 * Postorder Tree Traversal (Left → Right → Root)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(h) for recursion stack
 * 
 * Visits left subtree, then right subtree, then root.
 * Useful for deleting the tree (children first).
 */
export const postorderTraversal: IAlgorithm<ArrayInput> = {
  id: 'postorder-traversal',
  name: 'Postorder Traversal',
  category: 'trees',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function postorder(node):',
    '  if node is null:',
    '    return',
    '',
    '  // Visit left subtree first',
    '  postorder(node.left)',
    '',
    '  // Visit right subtree',
    '  postorder(node.right)',
    '',
    '  // Visit current node last',
    '  visit(node)',
    '',
    '  // Result: Left → Right → Root',
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
        { value: 'iterative', label: 'Iterative (Two Stacks)' },
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
      `Starting Postorder Traversal (${method}) - Left → Right → Root`,
      'info',
      0
    );
    yield createEvent.highlight([0]);
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: { nodes, rootId, traversalOrder, message: 'Starting traversal' },
    });

    if (method === 'recursive') {
      function* postorderRecursive(nodeId: string | undefined): Generator<AlgoEvent, void, unknown> {
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

        // Visit left subtree
        if (node.left) {
          yield createEvent.message(`Going to left child of ${node.value}`, 'explanation', 5);
          yield createEvent.highlight([4, 5]);
          yield* postorderRecursive(node.left);
        }

        // Visit right subtree
        if (node.right) {
          yield createEvent.message(`Going to right child of ${node.value}`, 'explanation', 8);
          yield createEvent.highlight([7, 8]);
          yield* postorderRecursive(node.right);
        }

        // Visit current node LAST
        yield createEvent.message(`Visiting node ${node.value}`, 'step', 11);
        yield createEvent.highlight([10, 11]);
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
      }

      yield* postorderRecursive(rootId);

    } else {
      // Iterative postorder using two stacks
      const stack1: string[] = [rootId];
      const stack2: string[] = [];

      yield createEvent.message('Using two-stack approach', 'info');

      // First pass: fill stack2 in reverse postorder
      while (stack1.length > 0) {
        const current = stack1.pop()!;
        stack2.push(current);
        const node = nodeMap.get(current)!;

        nodes = setNodeHighlight(cloneTreeNodes(nodes), current, 'current');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: { nodes, rootId, traversalOrder, message: `Processing ${node.value}` },
        });

        if (node.left) stack1.push(node.left);
        if (node.right) stack1.push(node.right);
      }

      // Second pass: pop from stack2 for postorder
      while (stack2.length > 0) {
        const current = stack2.pop()!;
        const node = nodeMap.get(current)!;

        traversalOrder.push(node.value);
        nodes = setNodeHighlight(cloneTreeNodes(nodes), current, 'visited');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: {
            nodes,
            rootId,
            traversalOrder: [...traversalOrder],
            message: `Visit ${node.value} from stack2`,
          },
        });
        yield createEvent.message(`Pop ${node.value} from stack2, add to result`, 'step');
      }
    }

    yield createEvent.message(
      `Postorder traversal complete: [${traversalOrder.join(', ')}]`,
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
    yield createEvent.result('indices', traversalOrder, 'Postorder Traversal');
  },
};
