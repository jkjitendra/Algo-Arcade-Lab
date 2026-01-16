export const knapsackInfo = {
  id: 'knapsack-01',
  name: '0/1 Knapsack',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Maximize total value of items in a knapsack without exceeding weight capacity. Each item can be taken at most once (0/1 choice).',
  howItWorks: 'Build a 2D table dp[i][w] representing max value using first i items with capacity w. For each item, decide to include it (if it fits) or exclude it.',
  keyInsight: 'Unlike the fractional knapsack (greedy), 0/1 requires DP because items cannot be divided. Each item presents a binary choice.',
  bestFor: ['Resource allocation', 'Subset selection with constraints', 'Budget optimization'],
  avoidWhen: ['Items can be divided (use greedy)', 'Capacity is very large (memory issues)', 'Too many items (consider approximation)'],
  funFact: 'The knapsack problem is NP-complete, but pseudo-polynomial time DP works when capacity is bounded.',
  optimizationTips: ['1D space optimization: iterate w in reverse', 'For large capacity, consider meet-in-the-middle', 'Branch and bound for exact solution with many items'],
  tags: ['DP', '2D DP', 'Intermediate', 'Optimization', 'Classic'],
};
