/**
 * Rehashing Info
 * Educational content for rehashing
 */
export const rehashingInfo = {
  id: 'rehashing',
  name: 'Rehashing',
  description: 'Rehashing is the process of resizing a hash table and reinserting all elements. It maintains performance as the table grows by keeping the load factor in an optimal range.',
  howItWorks: 'When load factor exceeds threshold, create a new larger table (typically 2x size). Recalculate hash for each element using new table size and insert into new table. Replace old table with new one.',
  keyInsight: 'Although rehashing is O(n), it happens infrequently. Amortized cost per insertion remains O(1).',
  bestFor: [
    'Dynamic hash tables with varying sizes',
    'Maintaining O(1) average performance',
    'When table size cannot be predicted upfront',
  ],
  avoidWhen: [
    'Table size is fixed and known',
    'Real-time systems (can cause latency spikes)',
    'Memory is very constrained',
  ],
  funFact: 'Some databases use incremental rehashing - moving a few elements per operation to avoid one large pause!',
  optimizationTips: [
    'Double the size for amortized O(1) insertions',
    'Use prime sizes to reduce clustering (especially with modulo)',
    'Consider incremental rehashing to spread the cost',
  ],
  tags: ['Hashing', 'Hash Table', 'Dynamic Resizing', 'O(n) Rehash', 'Intermediate'],
};
