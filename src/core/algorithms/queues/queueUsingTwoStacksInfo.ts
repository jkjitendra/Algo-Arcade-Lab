/**
 * Queue Using Two Stacks Info
 */
export const queueUsingTwoStacksInfo = {
  id: 'queue-using-two-stacks',
  name: 'Queue Using Two Stacks',
  description: 'Implements a queue (FIFO) using two stacks (LIFO). One stack handles enqueue operations, the other handles dequeue. When dequeue stack is empty, elements are transferred from enqueue stack.',
  howItWorks: 'Stack1 receives all new elements. When dequeue is needed and Stack2 is empty, all elements from Stack1 are popped and pushed to Stack2, reversing their order to achieve FIFO.',
  keyInsight: 'Reversing a stack twice gives original order! Push to Stack1 (reverse once), then pop to Stack2 (reverse twice = original FIFO order).',
  bestFor: [
    'Interview question practice',
    'Understanding stack-queue relationship',
    'Systems with only stack primitives available',
  ],
  avoidWhen: [
    'Real queue needed (use proper queue)',
    'Memory efficiency is critical',
    'Worst-case O(1) is required',
  ],
  funFact: 'This technique demonstrates the fundamental duality between stacks and queues - any LIFO structure can simulate FIFO with some cleverness!',
  optimizationTips: [
    'Lazy transfer: only transfer when Stack2 is empty',
    'Batching improves amortized performance',
    'Consider maintaining count for O(1) size query',
  ],
  tags: ['Stack', 'Queue', 'Interview', 'Amortized O(1)', 'Intermediate'],
};
