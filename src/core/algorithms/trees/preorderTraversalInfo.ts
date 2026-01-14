/**
 * Preorder Traversal Info
 * Educational content for preorder tree traversal
 */
export const preorderTraversalInfo = {
  id: 'preorder-traversal',
  name: 'Preorder Traversal',
  description: 'Preorder traversal visits nodes in the order: Root → Left subtree → Right subtree. The root is always processed first before its children.',
  howItWorks: 'Visit the current node first, then recursively traverse the left subtree, followed by the right subtree. Can be implemented iteratively using a stack.',
  keyInsight: 'Preorder traversal is ideal for creating a copy of the tree or serializing tree structure, as the root appears before its subtrees.',
  bestFor: [
    'Creating a copy of a tree',
    'Serializing tree structure',
    'Expression tree to prefix notation',
    'Generating pre-order expression for compilers',
  ],
  avoidWhen: [
    'Sorted output is needed (use inorder for BST)',
    'Post-processing of children before parent is required',
  ],
  funFact: 'Preorder and postorder traversals together can uniquely reconstruct a binary tree, but not a just any binary tree—only those where every node has 0 or 2 children.',
  optimizationTips: [
    'Iterative version: push right child first, then left, so left is processed first',
    'For serialization, use special markers for null nodes',
    'Can be combined with depth tracking for level-based operations',
  ],
  tags: ['Tree', 'Traversal', 'DFS', 'Recursion', 'Beginner'],
};
