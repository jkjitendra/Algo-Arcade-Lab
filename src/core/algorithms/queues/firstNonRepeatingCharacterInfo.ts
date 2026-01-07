/**
 * First Non-Repeating Character Info
 */
export const firstNonRepeatingCharacterInfo = {
  id: 'first-non-repeating-character',
  name: 'First Non-Repeating Character',
  description: 'Find the first non-repeating (unique) character at each position as characters stream in. Maintains a queue of candidate unique characters and a frequency counter.',
  howItWorks: 'Track frequency of each character in a hashmap. Maintain queue of candidates. When checking, pop from front until finding a character with frequency 1. That\'s your answer.',
  keyInsight: 'Each character enters and leaves the queue at most once, giving O(n) amortized time despite the while loop inside the for loop.',
  bestFor: [
    'Real-time stream processing',
    'Finding unique identifiers',
    'First available resource allocation',
    'Data deduplication',
  ],
  avoidWhen: [
    'Only need final answer (scan once at end)',
    'Character set is very small (direct array)',
    'Memory is extremely limited',
  ],
  funFact: 'This is a popular interview question at Google and Amazon! It tests understanding of both queues and hashmaps working together.',
  optimizationTips: [
    'Use array[26] for lowercase letters instead of HashMap',
    'Doubly-linked list with HashMap for O(1) removal',
    'Count array can replace HashMap for bounded alphabet',
  ],
  tags: ['Stream', 'Queue', 'HashMap', 'O(n)', 'Advanced', 'Interview'],
};
