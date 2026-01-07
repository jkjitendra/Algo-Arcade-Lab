/**
 * Circular Queue Info
 * Educational content for circular queue operations
 */
export const circularQueueInfo = {
  id: 'circular-queue',
  name: 'Circular Queue',
  description: 'A Circular Queue is a linear data structure that connects the end back to the beginning, forming a circle. This overcomes the limitation of linear queues where space is wasted after dequeue operations.',
  howItWorks: 'Uses modulo arithmetic to wrap indices. When rear reaches the end, it wraps to the beginning if space is available. Front and rear pointers chase each other around the circle.',
  keyInsight: 'The formula (index + 1) % capacity creates the circular behavior, making rear wrap to 0 when it exceeds capacity.',
  bestFor: [
    'Fixed-size buffers (audio/video streaming)',
    'CPU scheduling (round-robin)',
    'Traffic light systems',
    'Memory management',
    'Circular buffers in embedded systems',
  ],
  avoidWhen: [
    'Need dynamic sizing (use linked list queue)',
    'Size varies dramatically',
    'Memory is not a constraint',
  ],
  funFact: 'Circular buffers are fundamental in audio processing - your music player uses them to stream data smoothly without gaps!',
  optimizationTips: [
    'Use power-of-2 capacity for faster modulo (use bitwise AND)',
    'Track size separately to distinguish full from empty',
    'Consider lock-free implementations for multi-threading',
  ],
  tags: ['Circular', 'Fixed-Size', 'Buffer', 'O(1)', 'Intermediate'],
};
