export const uniquePathsInfo = {
  id: 'unique-paths',
  name: 'Unique Paths',
  category: 'dp',
  difficulty: 'beginner',
  description: 'Count distinct paths from grid top-left to bottom-right moving only right or down. Foundation problem for grid-based DP.',
  howItWorks: 'Each cell can be reached from above or left. dp[i][j] = dp[i-1][j] + dp[i][j-1]. First row/column have only one path each.',
  keyInsight: 'This is essentially Pascal\'s Triangle rotated! The answer is C(m+n-2, m-1) = (m+n-2)! / ((m-1)! × (n-1)!).',
  bestFor: ['Learning grid DP', 'Understanding path counting', 'Combinatorics problems'],
  avoidWhen: ['Large grids without obstacles (use math formula)', 'Need actual paths (requires backtracking)'],
  funFact: 'For a 3×3 grid, there are 6 paths. For 10×10, there are 48,620 paths!',
  optimizationTips: ['Space: use 1D array of size n', 'Math formula: C(m+n-2, min(m,n)-1) for O(min(m,n)) time', 'For obstacles, set blocked cells to 0'],
  tags: ['DP', '2D DP', 'Beginner', 'Grid', 'Counting'],
};
