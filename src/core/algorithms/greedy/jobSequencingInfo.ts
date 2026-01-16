export const jobSequencingInfo = {
  id: 'job-sequencing',
  name: 'Job Sequencing',
  category: 'greedy',
  difficulty: 'intermediate',
  description: 'Schedules jobs with deadlines to maximize total profit, where each job takes one unit of time and must complete before its deadline.',
  howItWorks: 'Sort jobs by profit (descending), then for each job, find the latest available time slot before its deadline and assign the job there.',
  keyInsight: 'Processing high-profit jobs first and assigning them to the latest possible slot maximizes profit while preserving earlier slots for other jobs.',
  bestFor: ['Task scheduling with deadlines', 'Profit maximization', 'Resource constrained scheduling'],
  avoidWhen: ['Jobs have varying durations', 'Dependencies exist between jobs', 'Need to minimize lateness rather than maximize profit'],
  funFact: 'This problem can be solved in O(n log n) using Union-Find (Disjoint Set Union) for slot finding instead of linear search.',
  optimizationTips: ['Use Union-Find for O(n log n) time', 'Binary search for finding slots', 'Consider priority queue for dynamic job arrivals'],
  tags: ['Greedy', 'Scheduling', 'Intermediate', 'Optimization', 'Deadlines'],
};
