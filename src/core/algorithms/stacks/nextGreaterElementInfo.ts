/**
 * Next Greater Element Info
 */
export const nextGreaterElementInfo = {
  id: 'next-greater-element',
  name: 'Next Greater Element',
  description: 'Find the next greater element for each element in an array - the first element to the right that is larger.',
  howItWorks: 'Use a decreasing monotonic stack. When we find a larger element, pop all smaller elements and assign the larger element as their NGE.',
  keyInsight: 'Each element is pushed and popped at most once, giving O(n) despite the nested loops.',
  bestFor: [
    'Stock price analysis (next higher price)',
    'Temperature prediction (next warmer day)',
    'Histogram problems',
  ],
  avoidWhen: [
    'Simple brute force O(n²) is acceptable',
    'Array is already sorted',
  ],
  funFact: 'This is a classic monotonic stack problem that appears frequently in coding interviews!',
  optimizationTips: [
    'Store indices instead of values for flexibility',
    'For circular arrays, iterate twice through the array',
  ],
  tags: ['Monotonic Stack', 'O(n)', 'Pattern', 'Intermediate'],
};
