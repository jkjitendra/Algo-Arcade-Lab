export const lisInfo = {
  id: 'lis',
  name: 'Longest Increasing Subsequence',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Find the length of the longest subsequence where elements are in strictly increasing order. A fundamental DP problem with applications in patience sorting and sequence analysis.',
  howItWorks: 'For each element, check all previous elements. If arr[j] < arr[i], then we can extend the LIS ending at j to include i: dp[i] = max(dp[i], dp[j]+1).',
  keyInsight: 'Each dp[i] represents the length of the longest increasing subsequence ending at index i. The answer is max of all dp values.',
  bestFor: ['Finding optimal subsequences', 'Sequence analysis', 'Understanding 2D relationships in 1D DP'],
  avoidWhen: ['Need O(n log n) time (use binary search + patience sorting)', 'Array is already sorted (answer is n)'],
  funFact: 'The LIS problem is equivalent to finding the longest chain of stackable boxes and is used in patience sorting.',
  optimizationTips: ['O(n log n) using binary search with auxiliary array', 'Store predecessor pointers to reconstruct actual LIS', 'For counting LIS, maintain count array alongside dp'],
  tags: ['DP', '1D DP', 'Intermediate', 'Subsequences', 'Classic'],
};
