export const rodCuttingInfo = {
  id: 'rod-cutting',
  name: 'Rod Cutting',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Cut a rod into pieces to maximize profit, given prices for each length. Classic unbounded knapsack variant where each length can be used multiple times.',
  howItWorks: 'For each length, try all possible first cuts. dp[len] = max over all cuts c of (prices[c] + dp[len-c]). Same piece can be cut multiple times.',
  keyInsight: 'This is an unbounded knapsack problem! Each cut length is like an item with unlimited supply. The value is the price, weight is the length.',
  bestFor: ['Resource optimization', 'Understanding unbounded knapsack', 'Manufacturing decisions'],
  avoidWhen: ['Cuts have different costs', 'Leftover has value (different recurrence)'],
  funFact: 'Rod cutting is introduced in CLRS (Cormen et al.) as a gentle introduction to DP before tackling more complex problems.',
  optimizationTips: ['Track cuts made for reconstruction', 'O(n) space sufficient', 'If prices are sorted, early termination possible'],
  tags: ['DP', 'Advanced DP', 'Intermediate', 'Unbounded Knapsack', 'Optimization'],
};
