import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BinaryTreeNodeData } from '../../events/events';
import { createTreeFromArray, cloneTreeNodes, setNodeHighlight } from './utils';

/**
 * Level Order Tree Traversal (BFS)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is maximum width
 * 
 * Visits nodes level by level from left to right.
 * Uses a queue for BFS traversal.
 */
export const levelOrderTraversal: IAlgorithm<ArrayInput> = {
  id: 'level-order-traversal',
  name: 'Level Order Traversal',
  category: 'trees',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function levelOrder(root):',
    '  if root is null:',
    '    return []',
    '',
    '  queue = [root]',
    '  result = []',
    '',
    '  while queue is not empty:',
    '    node = queue.dequeue()',
    '    result.add(node.value)',
    '',
    '    if node.left exists:',
    '      queue.enqueue(node.left)',
    '    if node.right exists:',
    '      queue.enqueue(node.right)',
    '',
    '  return result',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(w) queue width',

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
      yield createEvent.message('Empty tree', 'info', 1);
      yield createEvent.highlight([1, 2]);
      return;
    }

    let nodes = cloneTreeNodes(initialNodes);
    const traversalOrder: number[] = [];
    const nodeMap = new Map<string, BinaryTreeNodeData>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    yield createEvent.message(
      'Starting Level Order Traversal (BFS) - Level by Level',
      'info',
      0
    );
    yield createEvent.highlight([0]);
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: { nodes, rootId, traversalOrder, message: 'Starting BFS traversal' },
    });

    // Initialize queue with root
    const queue: string[] = [rootId];
    yield createEvent.message('Initialize queue with root', 'step', 4);
    yield createEvent.highlight([4, 5]);

    let level = 0;
    while (queue.length > 0) {
      const levelSize = queue.length;
      const levelValues: number[] = [];

      yield createEvent.message(`Processing level ${level} (${levelSize} nodes)`, 'step', 7);
      yield createEvent.highlight([7]);

      for (let i = 0; i < levelSize; i++) {
        const current = queue.shift()!;
        const node = nodeMap.get(current)!;

        // Visit current node
        traversalOrder.push(node.value);
        levelValues.push(node.value);

        yield createEvent.message(`Dequeue node ${node.value}`, 'explanation', 8);
        yield createEvent.highlight([8, 9]);

        nodes = setNodeHighlight(cloneTreeNodes(nodes), current, 'visited');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: {
            nodes,
            rootId,
            traversalOrder: [...traversalOrder],
            message: `Visit ${node.value} (Level ${level})`,
          },
        });

        // Enqueue children
        if (node.left) {
          queue.push(node.left);
          yield createEvent.message(`Enqueue left child`, 'explanation', 12);
          yield createEvent.highlight([11, 12]);
        }
        if (node.right) {
          queue.push(node.right);
          yield createEvent.message(`Enqueue right child`, 'explanation', 14);
          yield createEvent.highlight([13, 14]);
        }
      }

      yield createEvent.message(
        `Level ${level} complete: [${levelValues.join(', ')}]`,
        'step'
      );
      level++;
    }

    yield createEvent.message(
      `Level order traversal complete: [${traversalOrder.join(', ')}]`,
      'info',
      16
    );
    yield createEvent.highlight([16]);
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
    yield createEvent.result('indices', traversalOrder, 'Level Order Traversal');
  },
};
