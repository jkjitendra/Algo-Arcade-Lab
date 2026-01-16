export const houseRobberInfo = {
  id: 'house-robber',
  name: 'House Robber',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Find the maximum sum of non-adjacent elements in an array. Classic DP problem modeling a robber who cannot rob two adjacent houses.',
  howItWorks: 'For each house, decide to include it (add to best from 2 houses ago) or exclude it (keep best from previous house). dp[i] = max(dp[i-1], dp[i-2] + houses[i]).',
  keyInsight: 'The key insight is that taking current element means skipping the previous one. This creates a simple include/exclude recurrence.',
  bestFor: ['Maximum sum with constraints', 'Include/exclude decisions', 'Understanding DP state transitions'],
  avoidWhen: ['Elements can be adjacent (use simple max sum)', 'Need circular constraint (use House Robber II approach)'],
  funFact: 'This problem has many real-world applications like job scheduling where consecutive jobs cannot overlap.',
  optimizationTips: ['Space optimization: only need prev1 and prev2 variables for O(1) space', 'For circular array, solve twice: exclude first or exclude last house'],
  tags: ['DP', '1D DP', 'Intermediate', 'Optimization', 'Classic'],
};
