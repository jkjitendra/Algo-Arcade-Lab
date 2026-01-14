/**
 * Tree utility functions for creating tree nodes from array input
 * and converting between tree representations.
 */

import { BinaryTreeNodeData } from '@/core/events/events';

/**
 * Create a binary tree from a level-order array representation
 * where null represents empty nodes (LeetCode style)
 * Example: [1, 2, 3, null, 5] represents:
 *      1
 *     / \
 *    2   3
 *     \
 *      5
 */
export function createTreeFromArray(values: (number | null)[]): {
  nodes: BinaryTreeNodeData[];
  rootId: string | undefined;
} {
  if (!values.length || values[0] === null) {
    return { nodes: [], rootId: undefined };
  }

  const nodes: BinaryTreeNodeData[] = [];
  const queue: { id: string; index: number }[] = [];

  // Create root
  const rootId = 'node-0';
  nodes.push({
    id: rootId,
    value: values[0]!,
  });
  queue.push({ id: rootId, index: 0 });

  let arrayIndex = 1;
  let nodeCounter = 1;

  while (queue.length > 0 && arrayIndex < values.length) {
    const { id: parentId } = queue.shift()!;
    const parent = nodes.find(n => n.id === parentId)!;

    // Process left child
    if (arrayIndex < values.length) {
      if (values[arrayIndex] !== null) {
        const leftId = `node-${nodeCounter++}`;
        nodes.push({
          id: leftId,
          value: values[arrayIndex]!,
        });
        parent.left = leftId;
        queue.push({ id: leftId, index: arrayIndex });
      }
      arrayIndex++;
    }

    // Process right child
    if (arrayIndex < values.length) {
      if (values[arrayIndex] !== null) {
        const rightId = `node-${nodeCounter++}`;
        nodes.push({
          id: rightId,
          value: values[arrayIndex]!,
        });
        parent.right = rightId;
        queue.push({ id: rightId, index: arrayIndex });
      }
      arrayIndex++;
    }
  }

  return { nodes, rootId };
}

/**
 * Create a balanced BST from a sorted array
 */
export function createBSTFromSortedArray(values: number[]): {
  nodes: BinaryTreeNodeData[];
  rootId: string | undefined;
} {
  if (!values.length) {
    return { nodes: [], rootId: undefined };
  }

  const nodes: BinaryTreeNodeData[] = [];
  let nodeCounter = 0;

  function buildBST(start: number, end: number): string | undefined {
    if (start > end) return undefined;

    const mid = Math.floor((start + end) / 2);
    const nodeId = `node-${nodeCounter++}`;

    nodes.push({
      id: nodeId,
      value: values[mid],
    });

    const leftId = buildBST(start, mid - 1);
    const rightId = buildBST(mid + 1, end);

    const node = nodes.find(n => n.id === nodeId)!;
    if (leftId) node.left = leftId;
    if (rightId) node.right = rightId;

    return nodeId;
  }

  const rootId = buildBST(0, values.length - 1);
  return { nodes, rootId };
}

/**
 * Deep clone tree nodes to avoid mutation
 */
export function cloneTreeNodes(nodes: BinaryTreeNodeData[]): BinaryTreeNodeData[] {
  return nodes.map(node => ({ ...node }));
}

/**
 * Find a node by ID
 */
export function findNode(nodes: BinaryTreeNodeData[], id: string): BinaryTreeNodeData | undefined {
  return nodes.find(n => n.id === id);
}

/**
 * Update node highlight
 */
export function setNodeHighlight(
  nodes: BinaryTreeNodeData[],
  id: string,
  highlight: BinaryTreeNodeData['highlight']
): BinaryTreeNodeData[] {
  return nodes.map(n => n.id === id ? { ...n, highlight } : n);
}

/**
 * Clear all highlights
 */
export function clearAllHighlights(nodes: BinaryTreeNodeData[]): BinaryTreeNodeData[] {
  return nodes.map(n => ({ ...n, highlight: undefined }));
}
