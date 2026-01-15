/**
 * Subarray with Zero Sum Info
 * Educational content for finding subarray with zero sum using hashing
 */
export const subarrayZeroSumInfo = {
  id: 'subarray-zero-sum',
  name: 'Subarray with Zero Sum',
  description: 'Determines if an array has a contiguous subarray that sums to zero. Using prefix sums and a hash set, we can detect this in O(n) time.',
  howItWorks: 'Compute prefix sums while iterating. If any prefix sum repeats, the elements between those indices sum to zero. Also check if any prefix sum equals zero (subarray from start sums to zero).',
  keyInsight: 'If prefixSum[i] == prefixSum[j], then sum of elements from i+1 to j is zero. The hash set detects repeated prefix sums in O(1).',
  bestFor: [
    'Detecting zero-sum subarrays',
    'Financial transaction analysis',
    'Energy balance calculations',
    'Finding equilibrium points',
  ],
  avoidWhen: [
    'Need all zero-sum subarrays (hash map with lists needed)',
    'Working with floating point (precision issues)',
    'Need subarray indices, not just existence',
  ],
  funFact: 'This technique extends to finding subarrays with any target sum by looking for prefixSum - target in the hash set!',
  optimizationTips: [
    'For finding all such subarrays, store list of indices per prefix sum',
    'Can extend to count subarrays with given sum',
    'Works with negative numbers too!',
  ],
  tags: ['Hashing', 'Array', 'Prefix Sum', 'Hash Set', 'O(n)', 'Intermediate'],
};
