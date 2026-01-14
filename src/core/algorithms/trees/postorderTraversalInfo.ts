/**
 * Postorder Traversal Info
 * Educational content for postorder tree traversal
 */
export const postorderTraversalInfo = {
  id: 'postorder-traversal',
  name: 'Postorder Traversal',
  description: 'Postorder traversal visits nodes in the order: Left subtree → Right subtree → Root. Children are always processed before their parent.',
  howItWorks: 'Recursively traverse the left subtree, then the right subtree, and finally visit the current node. Iterative version uses two stacks or a modified single-stack approach.',
  keyInsight: 'Postorder is perfect for deletion operations because children are deleted before parents, ensuring no orphaned references.',
  bestFor: [
    'Deleting or freeing a tree',
    'Evaluating expression trees (postfix)',
    'Computing sizes of subtrees',
    'Certain tree transformation algorithms',
  ],
  avoidWhen: [
    'Root needs to be processed first',
    'Level-order (breadth-first) output is needed',
  ],
  funFact: 'Postorder traversal is used in compilers to generate postfix (Reverse Polish Notation) expressions, which can be evaluated using a simple stack.',
  optimizationTips: [
    'Two-stack method: simpler but uses O(n) extra space',
    'Single-stack method: more complex but uses O(h) space',
    'Useful for computing aggregate values bottom-up (height, size)',
  ],
  tags: ['Tree', 'Traversal', 'DFS', 'Recursion', 'Beginner'],
};
