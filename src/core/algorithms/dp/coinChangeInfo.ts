export const coinChangeInfo = {
  id: 'coin-change',
  name: 'Coin Change (Min Coins)',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Find the minimum number of coins needed to make a target amount. A classic unbounded knapsack variant where each coin can be used unlimited times.',
  howItWorks: 'For each amount from 1 to target, try all coins. If using coin c leads to fewer coins (dp[amount-c] + 1 < dp[amount]), update dp[amount].',
  keyInsight: 'This is an unbounded knapsack problem - each coin can be used multiple times. The greedy approach (always pick largest coin) does not always work!',
  bestFor: ['Change-making problems', 'Minimum count optimization', 'Understanding unbounded knapsack'],
  avoidWhen: ['Coins are powers of a prime (greedy works)', 'Need to count ways (use different recurrence)'],
  funFact: 'The greedy algorithm fails for coins [1, 3, 4] and amount 6: greedy gives 4+1+1=3 coins, but optimal is 3+3=2 coins.',
  optimizationTips: ['BFS can also solve this as shortest path problem', 'For counting ways, use dp[i] += dp[i-coin] instead', 'Space-optimized: already O(amount)'],
  tags: ['DP', '1D DP', 'Intermediate', 'Optimization', 'Unbounded Knapsack'],
};
