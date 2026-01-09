/**
 * Find Cycle Start Info
 * Educational content for finding where a cycle begins
 */
export const findCycleStartInfo = {
  id: 'find-cycle-start',
  name: 'Find Cycle Start',
  description: 'After detecting a cycle exists, this algorithm finds the exact node where the cycle begins by using the mathematical property that the distance from head to cycle start equals the distance from meeting point to cycle start.',
  howItWorks: 'First detect cycle using Floyd\'s algorithm to find meeting point. Then reset one pointer to head and move both pointers one step at a time. They will meet at the cycle start.',
  keyInsight: 'The math behind this: if the non-cycle part has length F and the cycle has length C, when slow and fast meet, slow has traveled F + a (some distance into cycle). Fast has traveled F + a + nC. Since fast travels 2x slow: 2(F+a) = F+a+nC, so F = nC-a, meaning F steps from meeting point lands at cycle start.',
  bestFor: [
    'Finding the corrupted node in circular data structures',
    'Debugging infinite loops in programs',
    'Memory cycle detection in garbage collection',
  ],
  avoidWhen: [
    'You only need to know IF a cycle exists (use detect cycle only)',
    'Hash set with O(n) space is acceptable',
  ],
  funFact: 'This elegant mathematical proof shows why the two pointers meet at the cycle start - it\'s not intuitive but follows directly from the pointer distances!',
  optimizationTips: [
    'Can be combined with cycle detection in a single function',
    'The meeting point is not necessarily the cycle start',
  ],
  tags: ['Cycle', 'Two Pointers', 'Floyd', 'Intermediate'],
};
