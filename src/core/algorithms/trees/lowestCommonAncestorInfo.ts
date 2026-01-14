/**
 * Lowest Common Ancestor Info
 * Educational content for LCA algorithm
 */
export const lowestCommonAncestorInfo = {
  id: 'lowest-common-ancestor',
  name: 'Lowest Common Ancestor',
  description: 'The Lowest Common Ancestor (LCA) of two nodes p and q is the deepest node that has both p and q as descendants. A node can be a descendant of itself.',
  howItWorks: 'Recursively search left and right subtrees. If current node is p or q, return it. If both subtrees return non-null, current node is LCA. Otherwise, return the non-null subtree result.',
  keyInsight: 'The LCA is found when p and q are in different subtrees of a node, or when one of them IS the current node. This is the "split point" in the tree.',
  bestFor: [
    'Finding common ancestors in family trees',
    'Computing distance between two nodes',
    'Network routing and topology problems',
    'Version control merge-base finding',
  ],
  avoidWhen: [
    'Tree structure changes frequently (preprocessing-based methods may be better)',
    'Thousands of LCA queries needed (consider binary lifting)',
  ],
  funFact: 'Git uses LCA to find the "merge base" when merging branches—the most recent commit that both branches share. This determines what changes need to be merged.',
  optimizationTips: [
    'For BST, use value comparisons: if both p,q < node, go left; if both > node, go right',
    'Binary Lifting: O(n log n) preprocessing for O(log n) queries',
    'Euler Tour + RMQ: O(n) preprocessing for O(1) queries',
  ],
  tags: ['Tree', 'LCA', 'Recursion', 'Intermediate'],
};
