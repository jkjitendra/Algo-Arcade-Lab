/**
 * Detect Cycle Info
 * Educational content for Floyd's cycle detection algorithm
 */
export const detectCycleInfo = {
  id: 'detect-cycle',
  name: 'Detect Cycle (Floyd\'s)',
  description: 'Floyd\'s Cycle Detection, also known as the Tortoise and Hare algorithm, uses two pointers moving at different speeds to detect if a linked list contains a cycle.',
  howItWorks: 'The slow pointer moves one step at a time while the fast pointer moves two steps. If there\'s a cycle, fast will eventually catch up to slow. If fast reaches null, there\'s no cycle.',
  keyInsight: 'If a cycle exists, the fast pointer will lap the slow pointer within at most n steps (where n is list length), guaranteeing O(n) time complexity with O(1) space.',
  bestFor: [
    'Detecting infinite loops in linked structures',
    'Memory leak detection',
    'Validating linked list integrity',
    'Prerequisites for finding cycle start',
  ],
  avoidWhen: [
    'You already know the list structure',
    'A hash set approach is acceptable (O(n) space)',
  ],
  funFact: 'This algorithm was invented by Robert W. Floyd in 1967. The same technique is used in Pollard\'s rho algorithm for integer factorization!',
  optimizationTips: [
    'Always check if fast and fast.next exist before moving',
    'Use this as a building block for finding cycle start point',
  ],
  tags: ['Cycle', 'Two Pointers', 'Floyd', 'Intermediate'],
};
