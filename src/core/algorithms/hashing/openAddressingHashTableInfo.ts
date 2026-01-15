/**
 * Open Addressing Hash Table Info
 * Educational content for open addressing hash table
 */
export const openAddressingHashTableInfo = {
  id: 'open-addressing-hash-table',
  name: 'Open Addressing Hash Table',
  description: 'Open addressing resolves collisions by probing for the next available slot in the table itself. All elements are stored directly in the array, improving cache performance.',
  howItWorks: 'Hash the key to find initial index. If occupied, probe next positions using a probing sequence (linear, quadratic, or double hashing). Insert at first empty slot. For lookup, follow same probe sequence until found or empty slot.',
  keyInsight: 'Load factor must stay below 1 (table can\'t be full). Performance degrades rapidly above 0.7.',
  bestFor: [
    'Cache-critical applications',
    'Fixed or known maximum size',
    'When memory overhead must be minimal',
    'Hot data that benefits from locality',
  ],
  avoidWhen: [
    'Elements are large (wastes table space)',
    'Deletions are frequent (requires tombstones)',
    'Load factor might exceed 0.8',
  ],
  funFact: 'Python\'s dict uses open addressing with a clever probing scheme. It\'s been optimized for decades and is incredibly fast!',
  optimizationTips: [
    'Double hashing avoids clustering better than linear probing',
    'Robin Hood hashing reduces variance in probe lengths',
    'Use tombstones for deletion, but rehash periodically to clean up',
  ],
  tags: ['Hashing', 'Hash Table', 'Collision Resolution', 'O(1) Average', 'Intermediate'],
};
