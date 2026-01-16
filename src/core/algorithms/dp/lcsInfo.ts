export const lcsInfo = {
  id: 'lcs',
  name: 'Longest Common Subsequence',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Find the longest subsequence common to two sequences. Unlike substrings, subsequence elements need not be consecutive but must maintain relative order.',
  howItWorks: 'Build 2D table where dp[i][j] = LCS length of X[0..i-1] and Y[0..j-1]. If characters match, add 1 to diagonal. Otherwise, take max of left or top cell.',
  keyInsight: 'The recurrence captures two cases: characters match (extend LCS) or they don\'t (take best from subproblems). Backtracking from dp[m][n] reconstructs the LCS.',
  bestFor: ['Diff algorithms', 'DNA sequence alignment', 'Version control (finding common parts)'],
  avoidWhen: ['Need longest common substring (different recurrence)', 'Very long strings (space issues)'],
  funFact: 'LCS is fundamental to the "diff" command in Unix, used to find differences between files.',
  optimizationTips: ['Space optimization: use 2 rows for O(min(m,n)) space', 'Hirschberg\'s algorithm for O(n) space with reconstruction', 'For very similar strings, use LCS with hashing'],
  tags: ['DP', '2D DP', 'Intermediate', 'Strings', 'Classic'],
};
