export const fibonacciDPInfo = {
  id: 'fibonacci-dp',
  name: 'Fibonacci (DP)',
  category: 'dp',
  difficulty: 'beginner',
  description: 'Computes the nth Fibonacci number using Dynamic Programming with tabulation approach, demonstrating the transition from exponential recursive solution to linear time.',
  howItWorks: 'Instead of recursively computing overlapping subproblems, we build a DP table bottom-up: F(0)=0, F(1)=1, then F(i) = F(i-1) + F(i-2) for each i from 2 to n.',
  keyInsight: 'The naive recursive approach has O(2^n) complexity due to repeated calculations. DP eliminates redundancy by storing computed values, reducing to O(n) time.',
  bestFor: ['Teaching DP fundamentals', 'Demonstrating memoization vs tabulation', 'Understanding overlapping subproblems'],
  avoidWhen: ['Need only last few values (use space-optimized version)', 'Very large n (use matrix exponentiation for O(log n))'],
  funFact: 'The ratio of consecutive Fibonacci numbers approaches the Golden Ratio (φ ≈ 1.618) as n increases.',
  optimizationTips: ['Space optimization: only store last 2 values for O(1) space', 'Matrix exponentiation for O(log n) time', 'Binet\'s formula for direct calculation (with precision issues)'],
  tags: ['DP', '1D DP', 'Beginner', 'Classic', 'Sequences'],
};
