/**
 * Next Smaller Element Info
 */
export const nextSmallerElementInfo = {
  id: 'next-smaller-element',
  name: 'Next Smaller Element',
  description: 'Find the next smaller element for each element in an array - the first element to the right that is smaller.',
  howItWorks: 'Use an increasing monotonic stack. When we find a smaller element, pop all larger elements and assign the smaller element as their NSE.',
  keyInsight: 'Mirror of Next Greater Element - just flip the comparison from > to <.',
  bestFor: [
    'Histogram rectangle problems',
    'Stock trading (next lower price)',
    'Finding valleys in data',
  ],
  avoidWhen: [
    'Next Greater Element variant is needed',
    'Brute force is acceptable for small inputs',
  ],
  funFact: 'Combined with Next Greater Element, you can solve many advanced problems like largest rectangle in histogram!',
  optimizationTips: [
    'Same index-based approach as NGE',
    'Can find Previous Smaller by scanning right-to-left',
  ],
  tags: ['Monotonic Stack', 'O(n)', 'Pattern', 'Intermediate'],
};
