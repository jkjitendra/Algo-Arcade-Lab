export const fractionalKnapsackInfo = {
  id: 'fractional-knapsack',
  name: 'Fractional Knapsack',
  category: 'greedy',
  difficulty: 'beginner',
  description: 'Maximizes the total value in a knapsack of limited capacity by allowing fractional amounts of items to be taken.',
  howItWorks: 'Calculate value/weight ratio for each item, sort by ratio in descending order, then greedily take items (or fractions) until the knapsack is full.',
  keyInsight: 'Unlike 0/1 Knapsack, fractions are allowed, so the greedy approach of taking highest ratio items first is optimal.',
  bestFor: ['Resource allocation with divisible resources', 'Teaching greedy vs DP comparison', 'Continuous optimization problems'],
  avoidWhen: ['Items are indivisible (use 0/1 Knapsack DP)', 'Multiple constraints exist', 'Items have dependencies'],
  funFact: 'This is a classic example showing how allowing fractions changes a problem from NP-hard (0/1 Knapsack) to polynomial time solvable.',
  optimizationTips: ['Can use partial sorting for top-k items if capacity allows few items', 'Linear time selection possible with median-of-medians', 'Consider streaming for online version'],
  tags: ['Greedy', 'Optimization', 'Beginner', 'Classic', 'Knapsack'],
};
