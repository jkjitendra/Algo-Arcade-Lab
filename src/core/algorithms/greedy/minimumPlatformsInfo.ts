export const minimumPlatformsInfo = {
  id: 'minimum-platforms',
  name: 'Minimum Platforms',
  category: 'greedy',
  difficulty: 'intermediate',
  description: 'Finds the minimum number of platforms required at a railway station so that no train waits.',
  howItWorks: 'Sort arrival and departure times separately. Use two pointers to simulate time progression, incrementing platform count on arrivals and decrementing on departures.',
  keyInsight: 'Equivalent to finding the maximum number of overlapping intervals at any point in time - the peak concurrent trains.',
  bestFor: ['Railway/airport scheduling', 'Finding peak resource usage', 'Capacity planning', 'Event overlap problems'],
  avoidWhen: ['Platforms have different capacities', 'Train lengths matter', 'Transfer time between platforms needed'],
  funFact: 'This is mathematically identical to the Meeting Rooms problem - same algorithm, different context!',
  optimizationTips: ['Two-pointer after sorting is optimal O(n log n)', 'Can visualize as line sweep algorithm', 'Event-based approach generalizes to complex scenarios'],
  tags: ['Greedy', 'Two Pointers', 'Intermediate', 'Scheduling', 'Intervals'],
};
