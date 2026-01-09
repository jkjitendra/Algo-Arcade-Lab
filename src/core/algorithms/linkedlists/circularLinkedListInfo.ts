/**
 * Circular Linked List Info
 * Educational content for circular linked list operations
 */
export const circularLinkedListInfo = {
  id: 'circular-linked-list',
  name: 'Circular Linked List',
  description: 'A Circular Linked List is a variation where the last node points back to the first node instead of null, forming a continuous loop. This enables endless traversal.',
  howItWorks: 'Similar to singly linked list but the last node\'s next pointer references the head. Traversal stops when we reach the starting node again.',
  keyInsight: 'There is no null terminator - every node always has a valid next pointer. This is useful for round-robin scheduling and circular buffers.',
  bestFor: [
    'Round-robin scheduling (CPU scheduling)',
    'Circular buffers and queues',
    'Music/media playlist loops',
    'Games with circular turn orders',
  ],
  avoidWhen: [
    'Need to detect end of list easily',
    'Linear traversal with clear termination is needed',
    'Simpler data structure suffices',
  ],
  funFact: 'Circular linked lists are used in operating systems for CPU scheduling algorithms like Round Robin, where each process gets a time slice in a circular order.',
  optimizationTips: [
    'Track the tail node for O(1) insertion at both ends',
    'Use a count variable to know when traversal is complete',
    'Consider using a sentinel node to simplify operations',
  ],
  tags: ['Circular', 'Dynamic', 'Data Structure', 'Beginner'],
};
