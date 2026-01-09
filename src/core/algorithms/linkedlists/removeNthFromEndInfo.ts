/**
 * Remove N-th from End Info
 * Educational content for removing n-th node from end
 */
export const removeNthFromEndInfo = {
  id: 'remove-nth-from-end',
  name: 'Remove N-th from End',
  description: 'Remove the n-th node from the end of a linked list in a single pass using two pointers with a fixed gap between them.',
  howItWorks: 'Advance the first pointer by n nodes. Then move both pointers until first reaches the end. The second pointer will be at the node before the one to remove. Update pointers to skip the target node.',
  keyInsight: 'By maintaining a gap of n nodes between two pointers, when the first pointer reaches the end, the second pointer is exactly n nodes behind - pointing to the node before our target.',
  bestFor: [
    'Removing elements from end without knowing list length',
    'Single-pass deletion operations',
    'Memory-constrained environments',
  ],
  avoidWhen: [
    'List length is already known (just calculate position from start)',
    'Random access is available (use array)',
  ],
  funFact: 'This is a classic interview question that tests understanding of the two-pointer technique. The dummy node trick handles the edge case of removing the head elegantly!',
  optimizationTips: [
    'Use a dummy node before head to handle edge case of removing head',
    'Validate n is within bounds before starting',
    'Can be combined with other operations in a single traversal',
  ],
  tags: ['Two Pointers', 'Deletion', 'Single Pass', 'Intermediate'],
};
