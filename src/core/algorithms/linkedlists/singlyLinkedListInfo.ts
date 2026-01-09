/**
 * Singly Linked List Info
 * Educational content for singly linked list operations
 */
export const singlyLinkedListInfo = {
  id: 'singly-linked-list',
  name: 'Singly Linked List',
  description: 'A Singly Linked List is a linear data structure where each element (node) contains data and a reference (pointer) to the next node in the sequence. Unlike arrays, elements are not stored in contiguous memory locations.',
  howItWorks: 'Each node has two fields: data and next pointer. The first node is called the head, and the last node points to null. Operations traverse from head following next pointers.',
  keyInsight: 'Insertion and deletion at the head is O(1), but accessing or modifying elements at arbitrary positions requires O(n) traversal.',
  bestFor: [
    'Dynamic memory allocation',
    'Frequent insertions/deletions at the beginning',
    'Implementing stacks and queues',
    'When size is unknown beforehand',
  ],
  avoidWhen: [
    'Random access is frequently needed',
    'Memory overhead is a concern (extra pointer per node)',
    'Cache performance is critical',
    'Backward traversal is required',
  ],
  funFact: 'Linked lists were invented in 1955-1956 by Allen Newell, Cliff Shaw, and Herbert A. Simon at RAND Corporation as the primary data structure for their Information Processing Language (IPL).',
  optimizationTips: [
    'Maintain a tail pointer for O(1) insertion at the end',
    'Use a dummy head node to simplify edge cases',
    'Consider using a doubly linked list if backward traversal is needed',
  ],
  tags: ['Linear', 'Dynamic', 'Data Structure', 'Beginner'],
};
