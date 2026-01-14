import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BinaryTreeNodeData } from '../../events/events';
import { createTreeFromArray, cloneTreeNodes, setNodeHighlight } from './utils';

/**
 * BST Operations: Insert, Search, Delete, Find Min/Max
 * 
 * Time Complexity: O(h) where h is height
 * Space Complexity: O(h) for recursion
 * 
 * For balanced BST: O(log n), for skewed: O(n)
 */
export const bstOperations: IAlgorithm<ArrayInput> = {
  id: 'bst-operations',
  name: 'BST Operations',
  category: 'trees',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function insert(node, value):',
    '  if node is null:',
    '    return new Node(value)',
    '  if value < node.value:',
    '    node.left = insert(node.left, value)',
    '  else:',
    '    node.right = insert(node.right, value)',
    '  return node',
    '',
    'function search(node, value):',
    '  if node is null: return false',
    '  if value == node.value: return true',
    '  if value < node.value: return search(node.left)',
    '  return search(node.right)',
  ],

  timeComplexity: {
    best: 'O(log n)',
    average: 'O(log n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(h) recursion stack',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'insert',
      options: [
        { value: 'insert', label: 'Insert' },
        { value: 'search', label: 'Search' },
        { value: 'findMin', label: 'Find Minimum' },
        { value: 'findMax', label: 'Find Maximum' },
      ],
    },
    {
      type: 'number',
      id: 'targetValue',
      label: 'Target Value',
      default: 25,
      min: 1,
      max: 100,
      dependsOn: { parameterId: 'operation', values: ['insert', 'search'] },
    },
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length > 31) {
      return { ok: false, error: 'Tree size must be 31 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation as string) || 'insert';
    const targetValue = Number(params?.targetValue) || 25;

    const values: (number | null)[] = input.values.map(v => v === -1 ? null : v);
    const { nodes: initialNodes, rootId } = createTreeFromArray(values);

    let nodes = cloneTreeNodes(initialNodes);
    const nodeMap = new Map<string, BinaryTreeNodeData>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    yield createEvent.auxiliary({
      type: 'tree',
      treeData: { nodes, rootId, message: `BST ${operation} operation` },
    });

    if (operation === 'insert') {
      yield createEvent.message(`Inserting ${targetValue} into BST`, 'info', 0);
      yield createEvent.highlight([0]);

      let currentId = rootId;
      let parentId: string | undefined;
      let isLeft = true;

      // Handle empty tree
      if (!currentId) {
        const newNodeId = 'node-0';
        nodes.push({ id: newNodeId, value: targetValue, highlight: 'inserted' });
        yield createEvent.message(`Tree was empty, ${targetValue} becomes root`, 'step', 2);
        yield createEvent.highlight([1, 2]);
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: { nodes, rootId: newNodeId, phase: 'Complete', message: `Inserted ${targetValue} as root` },
        });
        return;
      }

      while (currentId) {
        const node: BinaryTreeNodeData = nodeMap.get(currentId)!;
        nodes = setNodeHighlight(cloneTreeNodes(nodes), currentId, 'current');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: { nodes, rootId, message: `Comparing ${targetValue} with ${node.value}` },
        });

        yield createEvent.message(`At node ${node.value}: comparing with ${targetValue}`, 'step');

        if (targetValue < node.value) {
          yield createEvent.message(`${targetValue} < ${node.value}, go left`, 'explanation', 4);
          yield createEvent.highlight([3, 4]);
          parentId = currentId;
          isLeft = true;
          currentId = node.left;
        } else {
          yield createEvent.message(`${targetValue} >= ${node.value}, go right`, 'explanation', 6);
          yield createEvent.highlight([5, 6]);
          parentId = currentId;
          isLeft = false;
          currentId = node.right;
        }
      }

      // Insert new node
      const newNodeId = `node-${nodes.length}`;
      nodes.push({ id: newNodeId, value: targetValue, highlight: 'inserted' });

      if (parentId) {
        nodes = nodes.map(n => {
          if (n.id === parentId) {
            return isLeft ? { ...n, left: newNodeId } : { ...n, right: newNodeId };
          }
          return n;
        });
      }

      yield createEvent.message(`Inserted ${targetValue}`, 'info', 2);
      yield createEvent.highlight([1, 2]);
      yield createEvent.auxiliary({
        type: 'tree',
        treeData: { nodes, rootId, phase: 'Complete', message: `Inserted ${targetValue}` },
      });

    } else if (operation === 'search') {
      yield createEvent.message(`Searching for ${targetValue} in BST`, 'info', 9);
      yield createEvent.highlight([9]);

      if (!rootId) {
        yield createEvent.message('Tree is empty', 'info');
        yield createEvent.result('boolean', false, 'Search Result');
        return;
      }

      let currentId: string | undefined = rootId;
      let found = false;

      while (currentId) {
        const node: BinaryTreeNodeData = nodeMap.get(currentId)!;
        nodes = setNodeHighlight(cloneTreeNodes(nodes), currentId, 'current');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: { nodes, rootId, message: `Checking node ${node.value}` },
        });

        if (node.value === targetValue) {
          yield createEvent.message(`Found ${targetValue}!`, 'step', 11);
          yield createEvent.highlight([11]);
          found = true;
          nodes = setNodeHighlight(cloneTreeNodes(nodes), currentId, 'found');
          yield createEvent.auxiliary({
            type: 'tree',
            treeData: { nodes, rootId, phase: 'Complete', message: `Found ${targetValue}!` },
          });
          break;
        } else if (targetValue < node.value) {
          yield createEvent.message(`${targetValue} < ${node.value}, go left`, 'explanation', 12);
          yield createEvent.highlight([12]);
          nodes = setNodeHighlight(cloneTreeNodes(nodes), currentId, 'visited');
          currentId = node.left;
        } else {
          yield createEvent.message(`${targetValue} > ${node.value}, go right`, 'explanation', 13);
          yield createEvent.highlight([13]);
          nodes = setNodeHighlight(cloneTreeNodes(nodes), currentId, 'visited');
          currentId = node.right;
        }
      }

      if (!found) {
        yield createEvent.message(`${targetValue} not found in BST`, 'info', 10);
        yield createEvent.highlight([10]);
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: { nodes, rootId, phase: 'Complete', message: `${targetValue} not found` },
        });
      }

      yield createEvent.result('boolean', found, 'Search Result');

    } else if (operation === 'findMin' || operation === 'findMax') {
      if (!rootId) {
        yield createEvent.message('Tree is empty', 'info');
        return;
      }

      const findingMin = operation === 'findMin';
      yield createEvent.message(
        `Finding ${findingMin ? 'minimum' : 'maximum'} value`,
        'info'
      );

      let currentId: string | undefined = rootId;
      let result: number = 0;

      while (currentId) {
        const node: BinaryTreeNodeData = nodeMap.get(currentId)!;
        result = node.value;

        nodes = setNodeHighlight(cloneTreeNodes(nodes), currentId, 'current');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: {
            nodes,
            rootId,
            message: `At ${node.value}, going ${findingMin ? 'left' : 'right'}`,
          },
        });
        yield createEvent.message(`At node ${node.value}`, 'step');

        const nextId: string | undefined = findingMin ? node.left : node.right;
        if (nextId) {
          nodes = setNodeHighlight(cloneTreeNodes(nodes), currentId, 'visited');
          currentId = nextId;
        } else {
          nodes = setNodeHighlight(cloneTreeNodes(nodes), currentId, 'found');
          yield createEvent.auxiliary({
            type: 'tree',
            treeData: {
              nodes,
              rootId,
              phase: 'Complete',
              message: `${findingMin ? 'Minimum' : 'Maximum'} is ${result}`,
            },
          });
          break;
        }
      }

      yield createEvent.message(`${findingMin ? 'Minimum' : 'Maximum'}: ${result}`, 'info');
      yield createEvent.result('search', result, findingMin ? 'Minimum' : 'Maximum');
    }
  },
};
