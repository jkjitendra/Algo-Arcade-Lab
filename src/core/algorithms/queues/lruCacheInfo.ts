/**
 * LRU Cache Info
 */
export const lruCacheInfo = {
  id: 'lru-cache',
  name: 'LRU Cache',
  description: 'Least Recently Used (LRU) Cache evicts the least recently accessed item when the cache is full. Combines a hashmap for O(1) lookup with a doubly-linked list (or queue) for O(1) reordering.',
  howItWorks: 'Maintains access order - most recently used at tail, least recently used at head. On access, move item to tail. On eviction, remove from head. HashMap provides O(1) key lookup.',
  keyInsight: 'The combination of HashMap + Doubly Linked List achieves O(1) for both get and put operations - neither structure alone can do this!',
  bestFor: [
    'Database query caching',
    'Web browser cache',
    'Operating system page replacement',
    'CDN content caching',
    'Any memory-bounded cache',
  ],
  avoidWhen: [
    'Access patterns are uniform (MRU might be better)',
    'Future access is predictable (use optimal)',
    'Memory not constrained',
  ],
  funFact: 'LRU is used in Redis (MAXMEMORY policy), Linux page cache, and virtually every web browser. It\'s one of the most practical cache eviction strategies!',
  optimizationTips: [
    'Use doubly-linked list for O(1) removal',
    'Consider LRU-K for better performance',
    'Segmented LRU (SLRU) resists scan pollution',
  ],
  tags: ['Cache', 'HashMap', 'O(1)', 'Advanced', 'LeetCode'],
};
