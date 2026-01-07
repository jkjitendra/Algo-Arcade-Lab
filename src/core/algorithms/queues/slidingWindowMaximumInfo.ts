/**
 * Sliding Window Maximum Info
 */
export const slidingWindowMaximumInfo = {
  id: 'sliding-window-maximum',
  name: 'Sliding Window Maximum',
  description: 'Find the maximum element in each sliding window of size k. Uses a deque (double-ended queue) to maintain potential maximum candidates efficiently.',
  howItWorks: 'Maintain a deque of indices in decreasing order of values. Remove from front if outside window, remove from back if smaller than current. Front always has maximum.',
  keyInsight: 'Each element is added and removed from the deque at most once, giving amortized O(1) per element - O(n) total, regardless of window size!',
  bestFor: [
    'Finding rolling maximum/minimum',
    'Stock price analysis',
    'Temperature extremes',
    'Network traffic peaks',
    'Any sliding window aggregation',
  ],
  avoidWhen: [
    'Window size is 1 (trivial case)',
    'Need multiple statistics (use segment tree)',
    'Array is very small (brute force simpler)',
  ],
  funFact: 'This is LeetCode Hard #239! The naive O(n*k) is too slow, but the deque solution is elegant and interviewer-impressive.',
  optimizationTips: [
    'Same technique works for minimum',
    'Can extend to sliding window median (two heaps)',
    'Multiset can handle arbitrary k-th statistic',
  ],
  tags: ['Deque', 'Sliding Window', 'O(n)', 'Advanced', 'LeetCode Hard'],
};
