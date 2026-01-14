/**
 * Inorder Traversal Info
 * Educational content for inorder tree traversal
 */
export const inorderTraversalInfo = {
  id: 'inorder-traversal',
  name: 'Inorder Traversal',
  description: 'Inorder traversal visits nodes in the order: Left subtree → Root → Right subtree. For a Binary Search Tree (BST), this produces nodes in sorted ascending order.',
  howItWorks: 'Recursively traverse the left subtree, visit the current node, then recursively traverse the right subtree. Uses a stack for iterative implementation.',
  keyInsight: 'Inorder traversal of a BST gives nodes in sorted order, making it useful for converting BST to a sorted array or checking if a tree is a valid BST.',
  bestFor: [
    'Getting sorted elements from a BST',
    'Expression tree evaluation (infix notation)',
    'Validating BST property',
    'Creating a balanced BST from sorted array',
  ],
  avoidWhen: [
    'Level-by-level processing is needed',
    'Root must be processed first',
    'Memory is limited (recursive depth can be O(n))',
  ],
  funFact: 'Inorder traversal is named because it processes the root "in" the middle of processing its children, unlike preorder (before) and postorder (after).',
  optimizationTips: [
    'Use Morris traversal for O(1) space complexity',
    'Iterative version avoids stack overflow for deep trees',
    'For BST validation, track min/max bounds instead of storing all values',
  ],
  tags: ['Tree', 'Traversal', 'BST', 'Recursion', 'Beginner'],
};
