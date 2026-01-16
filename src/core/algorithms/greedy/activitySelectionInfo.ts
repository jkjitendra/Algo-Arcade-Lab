export const activitySelectionInfo = {
  id: 'activity-selection',
  name: 'Activity Selection',
  category: 'greedy',
  difficulty: 'beginner',
  description: 'Selects the maximum number of non-overlapping activities from a set, where each activity has a start and finish time.',
  howItWorks: 'Sort activities by finish time, then greedily select the first activity and keep selecting activities whose start time is >= the finish time of the last selected activity.',
  keyInsight: 'Selecting the activity that finishes earliest leaves maximum room for remaining activities. This greedy choice leads to an optimal solution.',
  bestFor: ['Scheduling problems', 'Resource allocation', 'Task planning with time constraints'],
  avoidWhen: ['Activities have weights/priorities', 'Need to maximize total duration rather than count'],
  funFact: 'This is one of the classic examples used to teach the greedy paradigm and prove greedy correctness via exchange arguments.',
  optimizationTips: ['Already O(n log n) due to sorting', 'If pre-sorted, selection is O(n)', 'Can be extended to weighted intervals using DP'],
  tags: ['Greedy', 'Scheduling', 'Beginner', 'Classic', 'Intervals'],
};
