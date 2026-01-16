export const matrixChainMultiplicationInfo = {
  id: 'matrix-chain-multiplication',
  name: 'Matrix Chain Multiplication',
  category: 'dp',
  difficulty: 'advanced',
  description: 'Find the optimal way to parenthesize a chain of matrices to minimize scalar multiplications. Different orderings can have vastly different costs.',
  howItWorks: 'Try all possible split points for each subchain. dp[i][j] = min cost to multiply matrices i through j. For each split k, cost = dp[i][k] + dp[k+1][j] + dimension product.',
  keyInsight: 'Matrix multiplication is associative (result is same) but not commutative in terms of cost. A(BC) vs (AB)C can have very different operation counts!',
  bestFor: ['Understanding interval DP', 'Optimization over ranges', 'Compiler optimization for expression evaluation'],
  avoidWhen: ['Only 2 matrices (no choice)', 'All matrices are same size (any order works equally)'],
  funFact: 'For chain of 4 matrices, there are only 5 different parenthesizations. For 10 matrices, there are 4862!',
  optimizationTips: ['Space: 1D array possible with careful bookkeeping', 'For very long chains, consider approximation', 'Can extend to find actual optimal grouping'],
  tags: ['DP', '2D DP', 'Advanced', 'Interval DP', 'Optimization'],
};
