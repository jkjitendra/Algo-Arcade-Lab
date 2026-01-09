/**
 * Intersection Point Info
 * Educational content for finding list intersection
 */
export const intersectionPointInfo = {
  id: 'intersection-point',
  name: 'Intersection Point',
  description: 'Find the node where two singly linked lists intersect (share the same nodes from that point onwards). Uses the length difference technique for O(1) space.',
  howItWorks: 'Calculate the lengths of both lists. Advance the pointer of the longer list by the difference. Then move both pointers together - they will meet at the intersection point.',
  keyInsight: 'After equalizing the starting positions (by advancing the longer list), both pointers travel the same distance to the intersection point. If they never meet, there\'s no intersection.',
  bestFor: [
    'Finding shared suffixes between lists',
    'Detecting merged data structures',
    'Memory optimization scenarios',
  ],
  avoidWhen: [
    'Hash set approach is acceptable (simpler, O(n) space)',
    'Lists are not singly linked',
  ],
  funFact: 'There\'s an elegant two-pointer solution where each pointer switches to the other list\'s head when it reaches the end. They\'ll meet at intersection after at most 2 passes!',
  optimizationTips: [
    'Alternative: Traverse A→B and B→A paths - they meet at intersection',
    'If lists are modified, can mark visited nodes (but mutates data)',
  ],
  tags: ['Intersection', 'Two Pointers', 'Length Difference', 'Intermediate'],
};
