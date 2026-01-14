/**
 * BST Operations Info
 * Educational content for BST insert, search, and find min/max
 */
export const bstOperationsInfo = {
  id: 'bst-operations',
  name: 'BST Operations',
  description: 'Core Binary Search Tree operations: Insert adds a new value maintaining BST property, Search finds a value, and Find Min/Max locates extreme values by following left/right pointers.',
  howItWorks: 'Search: compare with current node, go left if smaller, right if larger. Insert: search for position, create new node at null position. Min/Max: follow left/right pointers to end.',
  keyInsight: 'All BST operations have O(h) complexity where h is height. For balanced trees h=O(log n), but for skewed trees h=O(n). This is why balanced BSTs (AVL, Red-Black) exist.',
  bestFor: [
    'Maintaining sorted data with dynamic inserts',
    'Range queries and ordered iteration',
    'Implementing sets and maps',
    'Finding kth smallest/largest element',
  ],
  avoidWhen: [
    'Data arrives in sorted order (creates skewed tree)',
    'Hash-based O(1) lookup is sufficient',
    'Data is static (sorted array with binary search is simpler)',
  ],
  funFact: 'The BST property means inorder traversal always gives sorted output. This insight is used to find kth smallest element: do inorder traversal and count k nodes.',
  optimizationTips: [
    'Use self-balancing trees (AVL, Red-Black) for guaranteed O(log n)',
    'Store parent pointers for easier predecessor/successor finding',
    'For frequent min/max queries, cache the values',
  ],
  tags: ['Tree', 'BST', 'Operations', 'Intermediate'],
};
