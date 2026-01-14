import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BinaryTreeNodeData } from '../../events/events';
import { createTreeFromArray, cloneTreeNodes, setNodeHighlight } from './utils';

/**
 * Lowest Common Ancestor in Binary Tree
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(h) for recursion
 * 
 * Find the lowest node that has both p and q as descendants.
 */
export const lowestCommonAncestor: IAlgorithm<ArrayInput> = {
  id: 'lowest-common-ancestor',
  name: 'Lowest Common Ancestor',
  category: 'trees',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function LCA(node, p, q):',
    '  if node is null: return null',
    '  if node == p or node == q: return node',
    '',
    '  left = LCA(node.left, p, q)',
    '  right = LCA(node.right, p, q)',
    '',
    '  // If both sides return non-null, current is LCA',
    '  if left and right: return node',
    '',
    '  // Return the non-null side',
    '  return left if left else right',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(h) recursion stack',

  parameters: [
    {
      type: 'number',
      id: 'nodeP',
      label: 'Node P Value',
      default: 2,
      min: 1,
      max: 100,
    },
    {
      type: 'number',
      id: 'nodeQ',
      label: 'Node Q Value',
      default: 8,
      min: 1,
      max: 100,
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
    const pValue = Number(params?.nodeP) || 2;
    const qValue = Number(params?.nodeQ) || 8;

    const values: (number | null)[] = input.values.map(v => v === -1 ? null : v);
    const { nodes: initialNodes, rootId } = createTreeFromArray(values);

    if (!rootId) {
      yield createEvent.message('Empty tree', 'info');
      return;
    }

    let nodes = cloneTreeNodes(initialNodes);
    const nodeMap = new Map<string, BinaryTreeNodeData>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    // Find node IDs for p and q
    let pId: string | undefined;
    let qId: string | undefined;
    nodes.forEach(n => {
      if (n.value === pValue) pId = n.id;
      if (n.value === qValue) qId = n.id;
    });

    if (!pId || !qId) {
      yield createEvent.message(`Nodes ${pValue} and/or ${qValue} not found in tree`, 'info');
      return;
    }

    // Highlight target nodes
    nodes = setNodeHighlight(nodes, pId, 'ancestor');
    nodes = setNodeHighlight(nodes, qId, 'ancestor');

    yield createEvent.message(`Finding LCA of ${pValue} and ${qValue}`, 'info', 0);
    yield createEvent.highlight([0]);
    yield createEvent.auxiliary({
      type: 'tree',
      treeData: { nodes, rootId, message: `Finding LCA of ${pValue} (P) and ${qValue} (Q)` },
    });

    function* findLCA(nodeId: string | undefined): Generator<AlgoEvent, string | undefined, unknown> {
      if (!nodeId) {
        yield createEvent.highlight([1]);
        return undefined;
      }

      const node = nodeMap.get(nodeId)!;

      // Skip highlighting if this is P or Q (already highlighted)
      if (nodeId !== pId && nodeId !== qId) {
        nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'current');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: { nodes, rootId, message: `Checking node ${node.value}` },
        });
      }
      yield createEvent.message(`At node ${node.value}`, 'step');

      // Base case: if current node is p or q, return it
      if (node.value === pValue || node.value === qValue) {
        yield createEvent.message(`Found target node ${node.value}`, 'explanation', 2);
        yield createEvent.highlight([2]);
        return nodeId;
      }

      // Search in left subtree
      yield createEvent.highlight([4]);
      const left: string | undefined = yield* findLCA(node.left);

      // Search in right subtree
      yield createEvent.highlight([5]);
      const right: string | undefined = yield* findLCA(node.right);

      // If both sides found something, this is the LCA
      if (left && right) {
        yield createEvent.message(`Both subtrees found targets, ${node.value} is LCA!`, 'step', 8);
        yield createEvent.highlight([7, 8]);
        nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'found');
        yield createEvent.auxiliary({
          type: 'tree',
          treeData: { nodes, rootId, message: `LCA found: ${node.value}` },
        });
        return nodeId;
      }

      // Return the non-null result
      yield createEvent.highlight([10, 11]);
      if (nodeId !== pId && nodeId !== qId) {
        nodes = setNodeHighlight(cloneTreeNodes(nodes), nodeId, 'visited');
      }
      return left || right;
    }

    const lcaId: string | undefined = yield* findLCA(rootId);

    if (lcaId) {
      const lcaNode = nodeMap.get(lcaId)!;
      yield createEvent.message(`LCA of ${pValue} and ${qValue} is ${lcaNode.value}`, 'info');
      yield createEvent.auxiliary({
        type: 'tree',
        treeData: {
          nodes,
          rootId,
          phase: 'Complete',
          message: `LCA = ${lcaNode.value}`,
        },
      });
      yield createEvent.result('search', lcaNode.value, 'Lowest Common Ancestor');
    }
  },
};
