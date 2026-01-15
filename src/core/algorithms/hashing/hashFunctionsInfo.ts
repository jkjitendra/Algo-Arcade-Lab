/**
 * Hash Functions Info
 * Educational content for hash functions
 */
export const hashFunctionsInfo = {
  id: 'hash-functions',
  name: 'Hash Functions',
  description: 'Hash functions transform data of arbitrary size into fixed-size values (hash codes). Good hash functions distribute keys uniformly and minimize collisions.',
  howItWorks: 'Take input data, apply mathematical operations (multiplication, modulo, bit manipulation) to produce a hash code. The code determines where data is stored in a hash table. Same input always produces same output.',
  keyInsight: 'A good hash function balances speed, uniform distribution, and avalanche effect (small input changes cause large output changes).',
  bestFor: [
    'Hash table implementation',
    'Data integrity verification',
    'Caching and deduplication',
    'Fast lookup operations',
  ],
  avoidWhen: [
    'Need cryptographic security (use crypto-specific hashes)',
    'Data naturally has good distribution (might not need hashing)',
    'Order preservation is required',
  ],
  funFact: 'The FNV-1a hash used in many languages was created by Glenn Fowler, Landon Curt Noll, and Phong Vo - their initials form the name!',
  optimizationTips: [
    'Use prime numbers for modulo operations',
    'Consider MurmurHash for speed-critical applications',
    'Power-of-2 table sizes allow bitwise AND instead of modulo',
  ],
  tags: ['Hashing', 'Hash Table', 'O(1) Average', 'Fundamental', 'Beginner'],
};
