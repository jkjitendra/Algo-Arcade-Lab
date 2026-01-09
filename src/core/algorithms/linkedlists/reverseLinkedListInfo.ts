/**
 * Reverse Linked List Info
 * Educational content for reversing a linked list
 */
export const reverseLinkedListInfo = {
  id: 'reverse-linked-list',
  name: 'Reverse Linked List',
  description: 'Reversing a linked list means changing the direction of all the pointers so that the last node becomes the first and vice versa. This is a fundamental linked list operation.',
  howItWorks: 'The iterative approach uses three pointers (prev, current, next) to reverse each link one at a time. The recursive approach reverses the rest of the list first, then fixes the pointer at the current node.',
  keyInsight: 'The iterative approach uses O(1) space, while recursive uses O(n) stack space. Both have O(n) time complexity as each node is visited exactly once.',
  bestFor: [
    'Reversing sequences efficiently',
    'Checking if a linked list is a palindrome',
    'Stack-like LIFO access from a list',
    'Interview questions on pointers',
  ],
  avoidWhen: [
    'Original order must be preserved (make a copy first)',
    'Using recursive approach with very long lists (stack overflow risk)',
  ],
  funFact: 'Reversing a linked list in-place is one of the most common technical interview questions and a great test of pointer manipulation skills!',
  optimizationTips: [
    'Use iterative for O(1) space complexity',
    'Consider recursion only for educational purposes or short lists',
    'Can be done in groups of k for more complex problems (k-reverse)',
  ],
  tags: ['Reversal', 'Pointers', 'In-place', 'Beginner'],
};
