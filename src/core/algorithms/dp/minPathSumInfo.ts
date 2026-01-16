export const minPathSumInfo = {
  id: 'min-path-sum',
  name: 'Minimum Path Sum',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Find the path from top-left to bottom-right that minimizes sum of values along the path. Can only move right or down.',
  howItWorks: 'For each cell, choice is to come from above or left - pick the minimum. dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j].',
  keyInsight: 'Unlike Unique Paths (counting), this is optimization (minimization). Same structure, different aggregation.',
  bestFor: ['Path optimization in grids', 'Cost minimization', 'Understanding grid DP with costs'],
  avoidWhen: ['Need to explore all paths (use DFS)', 'Can move in all 4 directions (use Dijkstra)'],
  funFact: 'This is equivalent to finding shortest path in a DAG, since the grid only allows right/down moves.',
  optimizationTips: ['Space: modify grid in-place for O(1) extra space', 'Or use 1D array of size n', 'For path reconstruction, track direction taken'],
  tags: ['DP', '2D DP', 'Intermediate', 'Grid', 'Optimization'],
};
