/**
 * Is Balanced Info
 * Educational content for checking if tree is balanced
 */
export const isBalancedInfo = {
  id: 'is-balanced',
  name: 'Is Balanced?',
  description: 'A height-balanced binary tree is one where the left and right subtrees of every node differ in height by at most 1. This property ensures O(log n) operations.',
  howItWorks: 'Recursively check if left and right subtrees are balanced AND their height difference is at most 1. Return both balance status and height from each recursive call.',
  keyInsight: 'Checking balance naively (computing height for each node separately) is O(n²). The optimized approach combines height calculation with balance checking for O(n).',
  bestFor: [
    'Validating tree structure before operations',
    'Deciding if tree rebalancing is needed',
    'Understanding AVL tree invariant',
    'Performance analysis of tree algorithms',
  ],
  avoidWhen: [
    'Perfect balance is required (all leaves at same level)',
    'Tree is guaranteed balanced by construction (e.g., from sorted array)',
  ],
  funFact: 'AVL trees maintain balance factor (left height - right height) of -1, 0, or 1 at every node. This is the origin of the "balanced" definition: |BF| ≤ 1.',
  optimizationTips: [
    'Return -1 (invalid height) early if imbalance detected',
    'Compute height and balance in a single pass',
    'For very deep trees, consider iterative approach to avoid stack overflow',
  ],
  tags: ['Tree', 'Validation', 'Recursion', 'Intermediate'],
};
