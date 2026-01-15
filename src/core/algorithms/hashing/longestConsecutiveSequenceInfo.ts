/**
 * Longest Consecutive Sequence Info
 * Educational content for longest consecutive sequence using hashing
 */
export const longestConsecutiveSequenceInfo = {
  id: 'longest-consecutive-sequence',
  name: 'Longest Consecutive Sequence',
  description: 'Finds the length of the longest consecutive elements sequence in an unsorted array. Using a hash set enables O(n) time by only starting sequences from their smallest element.',
  howItWorks: 'Add all numbers to a hash set. For each number, check if it\'s a sequence start (num-1 not in set). If so, count consecutive numbers (num+1, num+2, ...) until the streak breaks. Track maximum length.',
  keyInsight: 'Only start counting from sequence beginnings. This ensures each number is visited at most twice - once to add, once to count.',
  bestFor: [
    'Finding consecutive runs in unsorted data',
    'Stream processing with unique IDs',
    'Gap detection in sequences',
  ],
  avoidWhen: [
    'Data is already sorted (simple scan is faster)',
    'Need actual sequence elements, not just length',
    'Very few unique elements (may not need hashing)',
  ],
  funFact: 'This problem shows the power of "smart iteration" - by only starting at sequence heads, we avoid redundant work!',
  optimizationTips: [
    'Use hash set for O(1) lookups',
    'Can extend to track sequence start/end positions',
    'Early termination if remaining elements can\'t beat current max',
  ],
  tags: ['Hashing', 'Array', 'Hash Set', 'O(n)', 'Intermediate'],
};
