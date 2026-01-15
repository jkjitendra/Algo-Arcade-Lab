/**
 * Chaining Hash Table Info
 * Educational content for chaining hash table
 */
export const chainingHashTableInfo = {
  id: 'chaining-hash-table',
  name: 'Chaining Hash Table',
  description: 'Chaining resolves hash collisions by storing multiple elements with the same hash in a linked list (or other collection) at each bucket. Simple and effective for moderate load factors.',
  howItWorks: 'Hash the key to find the bucket index. If bucket is empty, create a new list with the item. If bucket has items, append to the list. For lookup, hash and then search the list at that bucket.',
  keyInsight: 'Average operations are O(1 + α) where α = n/m (load factor). Keep α < 1 for good performance.',
  bestFor: [
    'Unknown or variable number of elements',
    'When deletions are frequent',
    'Simple implementation needed',
    'When load factor might exceed 1',
  ],
  avoidWhen: [
    'Memory is very tight (linked list overhead)',
    'Cache performance is critical (poor locality)',
    'Load factor is always very low (open addressing better)',
  ],
  funFact: 'Java\'s HashMap uses chaining with linked lists, but switches to red-black trees when a bucket gets too long (> 8 elements)!',
  optimizationTips: [
    'Use dynamic arrays instead of linked lists for better cache performance',
    'Rehash when load factor exceeds threshold (typically 0.75)',
    'Consider move-to-front heuristic for frequently accessed items',
  ],
  tags: ['Hashing', 'Hash Table', 'Collision Resolution', 'O(1) Average', 'Beginner'],
};
