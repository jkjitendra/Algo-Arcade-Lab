export const climbingStairsInfo = {
  id: 'climbing-stairs',
  name: 'Climbing Stairs',
  category: 'dp',
  difficulty: 'beginner',
  description: 'Count distinct ways to climb n stairs when you can take 1 or 2 steps at a time. A classic introductory DP problem that demonstrates state transitions.',
  howItWorks: 'To reach step i, you must come from either step i-1 (one step) or step i-2 (two steps). So dp[i] = dp[i-1] + dp[i-2], same as Fibonacci.',
  keyInsight: 'This is essentially the Fibonacci sequence in disguise! The recurrence relation is identical, making it a great bridge problem.',
  bestFor: ['Learning state transitions in DP', 'Understanding counting problems', 'Building DP intuition'],
  avoidWhen: ['n is very large (use matrix exponentiation)', 'Need exact steps taken (requires backtracking)'],
  funFact: 'If you could take up to k steps, the recurrence becomes dp[i] = sum(dp[i-j]) for j=1 to min(i,k).',
  optimizationTips: ['Space optimization: only need dp[i-1] and dp[i-2]', 'For variable step sizes, use a loop to sum previous k states'],
  tags: ['DP', '1D DP', 'Beginner', 'Counting', 'Fibonacci-like'],
};
