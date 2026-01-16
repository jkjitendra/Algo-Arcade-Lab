export const wordBreakInfo = {
  id: 'word-break',
  name: 'Word Break',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Determine if a string can be segmented into a space-separated sequence of dictionary words. Common in NLP and text processing.',
  howItWorks: 'dp[i] = true if string[0:i] can be segmented. For each position i, check all prefixes [0:j] that are valid and if suffix [j:i] is in dictionary.',
  keyInsight: 'We build valid positions left to right. If we know all valid break points before i, checking position i is just O(i) suffix lookups.',
  bestFor: ['Text segmentation', 'NLP tokenization', 'String parsing problems'],
  avoidWhen: ['Need all segmentations (use backtracking)', 'Dictionary is very large (use Trie)'],
  funFact: 'This is LeetCode #139 and has a follow-up (#140) asking for all possible segmentations.',
  optimizationTips: ['Use Trie for O(1) prefix queries', 'Limit j loop by max word length in dict', 'For Word Break II, add backtracking'],
  tags: ['DP', 'Advanced DP', 'Intermediate', 'Strings', 'Dictionary'],
};
