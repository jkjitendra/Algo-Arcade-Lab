export const insertIntervalInfo = {
  id: 'insert-interval',
  name: 'Insert Interval',
  category: 'greedy',
  difficulty: 'intermediate',
  description: 'Inserts a new interval into a sorted, non-overlapping interval list and merges any resulting overlaps.',
  howItWorks: 'Three phases: (1) add all intervals ending before new interval, (2) merge all overlapping intervals with new interval, (3) add remaining intervals.',
  keyInsight: 'Since input is sorted, we can identify non-overlapping portions in linear time and merge only the overlapping middle section.',
  bestFor: ['Calendar event insertion', 'Booking systems', 'Range updates', 'Maintaining sorted interval lists'],
  avoidWhen: ['Frequent insertions (use interval tree)', 'Need deletion as well', 'Very large interval lists with many insertions'],
  funFact: 'This is a common follow-up to Merge Intervals in interviews - testing whether candidates can adapt the merge logic.',
  optimizationTips: ['Binary search to find insertion point O(log n) + merge O(n)', 'Self-balancing tree for O(log n) operations', 'Lazy propagation for batch insertions'],
  tags: ['Greedy', 'Intervals', 'Intermediate', 'Merging', 'Arrays'],
};
