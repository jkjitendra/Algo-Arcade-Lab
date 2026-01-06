/**
 * Largest Rectangle in Histogram Info
 */
export const largestRectangleHistogramInfo = {
  id: 'largest-rectangle-histogram',
  name: 'Largest Rectangle in Histogram',
  description: 'Find the largest rectangular area that can be formed in a histogram represented as an array of bar heights.',
  howItWorks: 'Use a monotonic stack to find left and right boundaries for each bar. When a shorter bar is encountered, calculate areas for all taller bars in the stack.',
  keyInsight: 'Each bar can extend left until a shorter bar and right until a shorter bar - stack efficiently finds these boundaries.',
  bestFor: [
    'Image processing (maximal rectangles)',
    'Maximal rectangle in binary matrix',
    'Skyline problems',
  ],
  avoidWhen: [
    'Simple brute force is acceptable',
    'Histogram is very simple (sorted)',
  ],
  funFact: 'This is considered one of the classic hard stack problems and frequently appears in FAANG interviews!',
  optimizationTips: [
    'Add sentinel value (0) at end to flush remaining stack',
    'Same algorithm works for row-by-row matrix analysis',
  ],
  tags: ['Monotonic Stack', 'O(n)', 'Hard', 'Advanced'],
};
