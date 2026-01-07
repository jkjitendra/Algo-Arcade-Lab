/**
 * Stack Using Two Queues Info
 */
export const stackUsingTwoQueuesInfo = {
  id: 'stack-using-two-queues',
  name: 'Stack Using Two Queues',
  description: 'Implements a stack (LIFO) using two queues (FIFO). The costly push approach makes push O(n) but pop O(1) by maintaining reversed order.',
  howItWorks: 'On push: add new element to Queue2, then transfer all elements from Queue1 to Queue2, then swap. This maintains newest element at the front for O(1) pop.',
  keyInsight: 'There are two approaches: costly push (O(n) push, O(1) pop) shown here, or costly pop (O(1) push, O(n) pop). Choose based on operation frequency.',
  bestFor: [
    'Understanding queue-stack duality',
    'Interview preparation',
    'Systems with only queue primitives',
  ],
  avoidWhen: [
    'Real stack is available',
    'Push-heavy workloads (use stack)',
    'Performance critical applications',
  ],
  funFact: 'While academically interesting, in practice you\'d never implement a stack with queues - this is primarily an interview question to test understanding of both data structures!',
  optimizationTips: [
    'Choose push-costly or pop-costly based on usage pattern',
    'Single queue with rotation is also possible',
    'Track size to avoid recomputation',
  ],
  tags: ['Stack', 'Queue', 'Interview', 'O(n)', 'Intermediate'],
};
