/**
 * Circular Doubly Linked List Info
 * Educational content for circular doubly linked list operations
 */
export const circularDoublyLinkedListInfo = {
  id: 'circular-doubly-linked-list',
  name: 'Circular Doubly Linked List',
  description: 'A Circular Doubly Linked List combines the features of doubly linked and circular lists. Each node has prev and next pointers, and the structure forms a complete circle in both directions.',
  howItWorks: 'Head\'s prev points to tail, and tail\'s next points to head, while each internal node has both prev and next pointers. This enables O(1) access to both ends and bidirectional circular traversal.',
  keyInsight: 'This is the most flexible linked list variant - it supports O(1) operations at both ends and bidirectional traversal, making it ideal for complex navigation needs.',
  bestFor: [
    'Fibonacci heap implementation',
    'Music players with bi-directional skip and loop',
    'Browser with forward/back navigation and history loop',
    'Complex scheduling algorithms',
  ],
  avoidWhen: [
    'Memory is constrained (highest overhead per node)',
    'Simpler variants suffice for the use case',
    'Complexity of pointer management is a concern',
  ],
  funFact: 'The Fibonacci heap, used in Dijkstra\'s algorithm for graph shortest paths, uses circular doubly linked lists to achieve O(1) insert and O(log n) amortized delete-min operations.',
  optimizationTips: [
    'Use sentinel nodes to eliminate edge cases',
    'Cache size for O(1) length queries',
    'Consider using XOR links to reduce memory if bidirectional access is needed but memory is tight',
  ],
  tags: ['Circular', 'Bidirectional', 'Data Structure', 'Intermediate'],
};
