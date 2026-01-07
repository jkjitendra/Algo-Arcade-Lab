/**
 * Queue Operations Info
 * Educational content for basic queue operations
 */
export const queueOperationsInfo = {
  id: 'queue-operations',
  name: 'Queue Operations',
  description: 'A Queue is a linear data structure that follows the FIFO (First In, First Out) principle. The first element added to the queue is the first one to be removed.',
  howItWorks: 'Select an operation: Enqueue adds an element to the rear, Dequeue removes the front element, Front views the first element, Rear views the last element, isEmpty and isFull check capacity.',
  keyInsight: 'All queue operations have O(1) time complexity when implemented with proper data structures.',
  bestFor: [
    'Task scheduling (OS process queue)',
    'Print job spooling',
    'BFS graph traversal',
    'Buffer management',
    'Handling requests in order',
  ],
  avoidWhen: [
    'Need LIFO order (use Stack instead)',
    'Need random access to elements',
    'Need to access middle elements frequently',
  ],
  funFact: 'The first computer queuing systems were developed in the 1950s for batch processing - jobs were literally queued on punch cards!',
  optimizationTips: [
    'Use circular queue to avoid shifting elements',
    'Use linked list for dynamic size queues',
    'Consider deque for double-ended operations',
  ],
  tags: ['FIFO', 'O(1)', 'Data Structure', 'Beginner'],
};
