export const nonOverlappingIntervalsInfo = {
  id: 'non-overlapping-intervals',
  name: 'Non-overlapping Intervals',
  category: 'greedy',
  difficulty: 'intermediate',
  description: 'Finds the minimum number of intervals to remove so that the remaining intervals do not overlap.',
  howItWorks: 'Sort intervals by end time. Greedily keep intervals that do not overlap with the previous kept interval. Count removed intervals.',
  keyInsight: 'This is the complement of Activity Selection - maximizing kept intervals minimizes removed intervals. Same greedy strategy applies.',
  bestFor: ['Schedule conflict resolution', 'Resource deallocation planning', 'Maximizing compatible tasks', 'Interval scheduling optimization'],
  avoidWhen: ['Intervals have different priorities/weights', 'Need to minimize removed duration, not count', 'Must keep specific intervals'],
  funFact: 'The number of removals equals n minus the max non-overlapping set size, directly linking to Activity Selection.',
  optimizationTips: ['Sort by end time is key for optimal greedy', 'DP can handle weighted version', 'Can report which intervals to remove, not just count'],
  tags: ['Greedy', 'Intervals', 'Intermediate', 'Scheduling', 'Optimization'],
};
