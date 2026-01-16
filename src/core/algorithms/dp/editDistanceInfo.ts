export const editDistanceInfo = {
  id: 'edit-distance',
  name: 'Edit Distance (Levenshtein)',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Find minimum number of single-character operations (insert, delete, replace) to transform one string into another. Named after Vladimir Levenshtein.',
  howItWorks: 'Build 2D table where dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]. For each cell, consider insert, delete, or replace operations.',
  keyInsight: 'When characters match, no operation is needed (take diagonal). Otherwise, take minimum of three operations, each adding cost of 1.',
  bestFor: ['Spell checking', 'DNA sequence alignment', 'Fuzzy string matching', 'Auto-correction'],
  avoidWhen: ['Only need to check equality', 'Strings are very long (consider approximation)'],
  funFact: 'Edit distance powers spell checkers: words with small edit distance from the input are suggested as corrections.',
  optimizationTips: ['Space: use 2 rows for O(min(m,n)) space', 'For similarity %, normalize: 1 - (distance / max(m,n))', 'Damerau-Levenshtein adds transposition as 4th operation'],
  tags: ['DP', '2D DP', 'Intermediate', 'Strings', 'Classic'],
};
