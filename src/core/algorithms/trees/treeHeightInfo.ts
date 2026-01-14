/**
 * Tree Height Info
 * Educational content for tree height calculation
 */
export const treeHeightInfo = {
  id: 'tree-height',
  name: 'Tree Height',
  description: 'Tree height (or maximum depth) is the number of edges on the longest path from the root to a leaf. An empty tree has height -1, and a single-node tree has height 0.',
  howItWorks: 'Recursively compute the height of left and right subtrees, then return the maximum of these heights plus 1. Base case: null node returns -1.',
  keyInsight: 'Height determines the worst-case time complexity for tree operations. A balanced tree with n nodes has height O(log n), while a skewed tree has height O(n).',
  bestFor: [
    'Analyzing tree balance',
    'Determining space complexity of recursive algorithms',
    'Computing diameter of tree',
    'Checking if tree is balanced',
  ],
  avoidWhen: [
    'Only leaf counting is needed',
    'Tree structure is guaranteed to be balanced',
  ],
  funFact: 'The height of a complete binary tree with n nodes is exactly floor(log₂(n)). This is why heap operations (which use complete binary trees) are O(log n).',
  optimizationTips: [
    'Can be computed during other traversals to avoid extra passes',
    'For balance checking, return early if imbalance is detected',
    'Iterative level-order also works: count levels until queue is empty',
  ],
  tags: ['Tree', 'Properties', 'Recursion', 'Beginner'],
};
