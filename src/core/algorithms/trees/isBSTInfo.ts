/**
 * Is BST Info
 * Educational content for validating Binary Search Tree
 */
export const isBSTInfo = {
  id: 'is-bst',
  name: 'Is Valid BST?',
  description: 'A valid Binary Search Tree (BST) satisfies: for every node, all values in left subtree are less than node value, and all values in right subtree are greater.',
  howItWorks: 'Use min/max range checking: pass valid range to each recursive call. Left subtree max is parent value, right subtree min is parent value. Check if current value is within range.',
  keyInsight: 'Simply checking node.left < node < node.right is NOT sufficient! You must ensure ALL descendants follow BST property, not just immediate children.',
  bestFor: [
    'Validating user-constructed trees',
    'Checking tree after modifications',
    'Interview problems on BST properties',
    'Understanding BST invariant deeply',
  ],
  avoidWhen: [
    'Tree was constructed using standard BST insert (guaranteed valid)',
    'Duplicate values are allowed (requires modified definition)',
  ],
  funFact: 'A common mistake is checking only parent-child relationship. The tree [5, 1, 6, null, null, 3, 7] appears valid locally (6 > 5), but 3 is in right subtree of 5 yet less than 5!',
  optimizationTips: [
    'Use Long.MIN_VALUE and Long.MAX_VALUE to avoid integer overflow issues',
    'Inorder traversal alternative: values should be strictly increasing',
    'Early termination: return false immediately when violation found',
  ],
  tags: ['Tree', 'BST', 'Validation', 'Recursion', 'Intermediate'],
};
