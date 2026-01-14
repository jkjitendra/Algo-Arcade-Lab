/**
 * Level Order Traversal Info
 * Educational content for level order (BFS) tree traversal
 */
export const levelOrderTraversalInfo = {
  id: 'level-order-traversal',
  name: 'Level Order Traversal',
  description: 'Level order traversal visits nodes level by level from top to bottom, left to right. Also known as Breadth-First Search (BFS) on trees.',
  howItWorks: 'Use a queue to process nodes. Start with root, dequeue a node, visit it, then enqueue its children (left first, then right). Repeat until queue is empty.',
  keyInsight: 'Level order traversal naturally groups nodes by their depth level, making it ideal for problems involving tree width or finding nodes at specific depths.',
  bestFor: [
    'Finding tree width or maximum width level',
    'Shortest path problems in unweighted trees',
    'Printing tree level by level',
    'Building a complete binary tree from array',
  ],
  avoidWhen: [
    'Memory is very limited (queue can hold O(n/2) nodes at widest level)',
    'Deep-first exploration is needed',
  ],
  funFact: 'Level order traversal is the natural way to represent a complete binary tree as an array—the array index directly maps to tree position using formulas like left_child = 2i+1.',
  optimizationTips: [
    'Track level boundaries by counting nodes at each level',
    'Use level separators (null markers) to identify level ends',
    'For zigzag traversal, alternate deque insertion direction',
  ],
  tags: ['Tree', 'Traversal', 'BFS', 'Queue', 'Beginner'],
};
