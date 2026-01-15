/**
 * Group Anagrams Info
 * Educational content for grouping anagrams using hashing
 */
export const groupAnagramsInfo = {
  id: 'group-anagrams',
  name: 'Group Anagrams',
  description: 'Group Anagrams collects strings that are anagrams of each other. Using a hash map with sorted strings or character counts as keys enables efficient grouping in O(n·k) time.',
  howItWorks: 'For each string, create a key by either sorting the string or counting characters. Use this key in a hash map, appending the original string to the list for that key. Strings with same key are anagrams.',
  keyInsight: 'All anagrams have the same sorted form (or same character frequency). This creates a perfect hash key for grouping.',
  bestFor: [
    'Grouping related strings',
    'Finding anagram pairs',
    'Word games and puzzles',
    'Text analysis applications',
  ],
  avoidWhen: [
    'Strings are very long (sorting each is expensive)',
    'Need real-time single-string lookup',
    'Case sensitivity matters (need normalization)',
  ],
  funFact: '"listen" and "silent" are classic anagrams. The word "anagram" itself can be rearranged to "nag a ram"!',
  optimizationTips: [
    'Character count key is O(k) vs O(k log k) for sorting',
    'Use tuple or frozen array as key (hashable)',
    'Consider prime multiplication for faster key generation',
  ],
  tags: ['Hashing', 'String', 'Hash Map', 'O(n·k)', 'Intermediate'],
};
