/**
 * Priority Queue Info
 * Educational content for priority queue operations
 */
export const priorityQueueInfo = {
  id: 'priority-queue',
  name: 'Priority Queue',
  description: 'A Priority Queue is an abstract data type where each element has a priority. Elements with higher priority are served before elements with lower priority, regardless of insertion order.',
  howItWorks: 'Elements are inserted with a priority value. When dequeuing, the element with the highest priority is returned first. Can be implemented using sorted arrays, heaps, or other structures.',
  keyInsight: 'While this visualization uses a sorted array (O(n) insert, O(1) delete), real-world implementations often use heaps for O(log n) on both operations.',
  bestFor: [
    'Dijkstra\'s shortest path algorithm',
    'Huffman coding',
    'CPU task scheduling',
    'Event-driven simulation',
    'Emergency room triage',
  ],
  avoidWhen: [
    'FIFO order is strictly required',
    'All elements have equal priority',
    'Memory is extremely limited',
  ],
  funFact: 'Hospital emergency rooms are real-world priority queues - a heart attack patient (high priority) is seen before a sprained ankle (lower priority), regardless of who arrived first!',
  optimizationTips: [
    'Use binary heap for O(log n) operations',
    'Fibonacci heap gives O(1) amortized insert',
    'For fixed priorities, use multiple queues',
  ],
  tags: ['Priority', 'Heap', 'Scheduling', 'Intermediate'],
};
