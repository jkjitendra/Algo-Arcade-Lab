/**
 * Deque Info
 * Educational content for double-ended queue operations
 */
export const dequeInfo = {
  id: 'deque',
  name: 'Deque (Double-Ended Queue)',
  description: 'A Deque (pronounced "deck") allows insertion and deletion at both ends. It combines the features of both stacks and queues, providing maximum flexibility.',
  howItWorks: 'Maintains two pointers (front and rear). Insert/delete operations at either end update the corresponding pointer. Can be used as both a stack (one end) or queue (both ends).',
  keyInsight: 'Deque is the most versatile linear data structure - it can simulate a stack, queue, or both simultaneously!',
  bestFor: [
    'Sliding window problems',
    'Palindrome checking',
    'Undo/Redo with both ends',
    'A-Steal work scheduling',
    'Browser history (forward/back)',
  ],
  avoidWhen: [
    'Simple FIFO needed (use queue)',
    'Simple LIFO needed (use stack)',
    'Random access required',
  ],
  funFact: 'The Python collections.deque is implemented as a doubly-linked list of fixed-size blocks, giving O(1) operations at both ends!',
  optimizationTips: [
    'Use circular array for O(1) at both ends',
    'Double-linked list avoids resizing overhead',
    'Consider restricted deques (input/output restricted)',
  ],
  tags: ['Double-Ended', 'Flexible', 'O(1)', 'Intermediate'],
};
