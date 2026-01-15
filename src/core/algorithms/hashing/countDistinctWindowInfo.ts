/**
 * Count Distinct Elements in Every Window Info
 * Educational content for counting distinct elements in sliding window using hashing
 */
export const countDistinctWindowInfo = {
  id: 'count-distinct-window',
  name: 'Count Distinct in Window',
  description: 'Counts the number of distinct elements in every window of size k. Using a hash map to track element frequencies enables efficient O(n) sliding window processing.',
  howItWorks: 'Use a hash map to count element frequencies. Slide the window: add new element (increment count), remove old element (decrement count, delete if zero). The map size gives distinct count.',
  keyInsight: 'The sliding window technique with a frequency map turns O(n·k) brute force into O(n) by reusing work from previous windows.',
  bestFor: [
    'Real-time analytics (unique visitors per hour)',
    'Network monitoring (distinct IPs in window)',
    'Data stream processing',
    'Moving statistics computation',
  ],
  avoidWhen: [
    'Window size equals array size (just count unique)',
    'Need more than distinct count (may need different structure)',
    'Memory is extremely limited and k is large',
  ],
  funFact: 'This pattern is used by streaming services to count "concurrent unique viewers" in real-time!',
  optimizationTips: [
    'Use Map for O(1) operations',
    'Delete map entries when count reaches zero to maintain accurate size',
    'Can combine with other sliding window problems',
  ],
  tags: ['Hashing', 'Sliding Window', 'Hash Map', 'O(n)', 'Intermediate'],
};
