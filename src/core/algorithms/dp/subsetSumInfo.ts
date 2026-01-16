export const subsetSumInfo = {
  id: 'subset-sum',
  name: 'Subset Sum',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Determine if any subset of the array sums to a target value. A fundamental decision problem that is NP-complete but has pseudo-polynomial DP solution.',
  howItWorks: 'Build boolean table dp[i][j] = can we achieve sum j using first i elements? For each element, either include it (check dp[i-1][j-val]) or exclude it (check dp[i-1][j]).',
  keyInsight: 'This is the decision version of 0/1 Knapsack. The boolean DP table answers all subset sum queries for sums 0 to target.',
  bestFor: ['Subset selection problems', 'Partition problems', 'Cryptographic applications'],
  avoidWhen: ['Target is very large (memory issues)', 'Need count of subsets (use different recurrence)', 'Numbers have many digits (use meet-in-middle)'],
  funFact: 'Subset Sum is one of Karp\'s 21 NP-complete problems, yet has efficient solutions when numbers are bounded.',
  optimizationTips: ['Space: use 1D array, iterate j in reverse', 'For counting, use dp[j] += dp[j-val]', 'Early termination if target found'],
  tags: ['DP', 'Advanced DP', 'Intermediate', 'Decision', 'Subset'],
};
