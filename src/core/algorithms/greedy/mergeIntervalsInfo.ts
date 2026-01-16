export const mergeIntervalsInfo = {
  id: 'merge-intervals',
  name: 'Merge Intervals',
  category: 'greedy',
  difficulty: 'beginner',
  description: 'Merges all overlapping intervals in a collection, returning a set of non-overlapping intervals that cover the same ranges.',
  howItWorks: 'Sort intervals by start time. Iterate through, extending the current interval if the next one overlaps, or starting a new interval if it does not.',
  keyInsight: 'After sorting by start, we only need to check if the next interval overlaps with the current merged interval - a single pass suffices.',
  bestFor: ['Calendar merging', 'Range consolidation', 'Time slot combining', 'Memory allocation'],
  avoidWhen: ['Need to track which original intervals merged', 'Intervals have associated data that cannot merge', 'Frequent updates require dynamic data structure'],
  funFact: 'This problem appears frequently in coding interviews and is a building block for more complex interval problems.',
  optimizationTips: ['Already optimal at O(n log n)', 'Use linked list for in-place merging', 'Interval tree for dynamic merge operations'],
  tags: ['Greedy', 'Intervals', 'Beginner', 'Sorting', 'Classic'],
};
