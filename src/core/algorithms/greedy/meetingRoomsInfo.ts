export const meetingRoomsInfo = {
  id: 'meeting-rooms',
  name: 'Meeting Rooms',
  category: 'greedy',
  difficulty: 'intermediate',
  description: 'Finds the minimum number of meeting rooms required to accommodate all meetings without conflicts.',
  howItWorks: 'Separate start and end times, sort both arrays, then use two pointers to track concurrent meetings. When a meeting starts before another ends, we need an additional room.',
  keyInsight: 'The minimum rooms needed equals the maximum number of overlapping meetings at any point. Sorting allows efficient overlap counting.',
  bestFor: ['Conference room scheduling', 'Resource allocation', 'Finding maximum concurrency', 'Interval overlap problems'],
  avoidWhen: ['Rooms have different capacities', 'Need to assign specific rooms to meetings', 'Minimizing setup/transition time matters'],
  funFact: 'Also known as the "Interval Partitioning Problem" and is equivalent to finding the chromatic number of an interval graph.',
  optimizationTips: ['Min-heap can track room end times for assignment', 'Two-pointer approach is simpler for just counting', 'Line sweep with events for more complex variants'],
  tags: ['Greedy', 'Intervals', 'Intermediate', 'Two Pointers', 'Scheduling'],
};
