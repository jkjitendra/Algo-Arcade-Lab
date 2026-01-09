/**
 * Doubly Linked List Info
 * Educational content for doubly linked list operations
 */
export const doublyLinkedListInfo = {
  id: 'doubly-linked-list',
  name: 'Doubly Linked List',
  description: 'A Doubly Linked List is a linked list where each node has two pointers: one to the next node and one to the previous node. This enables bidirectional traversal.',
  howItWorks: 'Each node contains three fields: data, next pointer, and prev pointer. Both head and tail can be maintained for O(1) operations at both ends.',
  keyInsight: 'The extra prev pointer enables O(1) deletion when you have a reference to the node, and allows backward traversal without additional space.',
  bestFor: [
    'Bidirectional traversal needs',
    'Browser history (back and forward)',
    'Undo/redo with both directions',
    'LRU Cache implementation',
  ],
  avoidWhen: [
    'Memory is very constrained (extra pointer per node)',
    'Only forward traversal is needed',
    'Simpler singly linked list suffices',
  ],
  funFact: 'The doubly linked list is the foundation of the std::list in C++ STL and LinkedList in Java, providing efficient insertions and deletions anywhere in the list.',
  optimizationTips: [
    'Use sentinel/dummy nodes at head and tail to simplify edge cases',
    'Consider XOR linked list to save memory (stores XOR of prev and next)',
  ],
  tags: ['Bidirectional', 'Dynamic', 'Data Structure', 'Beginner'],
};
