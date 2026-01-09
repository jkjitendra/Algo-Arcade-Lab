/**
 * Palindrome Linked List Info
 * Educational content for checking if list is palindrome
 */
export const palindromeLinkedListInfo = {
  id: 'palindrome-linked-list',
  name: 'Palindrome Linked List',
  description: 'Check if a linked list reads the same forwards and backwards. This combines multiple techniques: finding middle, reversing, and comparing.',
  howItWorks: 'First find the middle using slow/fast pointers. Then reverse the second half in place. Finally, compare the first half with the reversed second half node by node.',
  keyInsight: 'This achieves O(1) space by modifying the list in place (reversing second half). The list can be restored to original by reversing again if needed.',
  bestFor: [
    'Memory-constrained palindrome checking',
    'Interview problems testing multiple techniques',
    'Practicing linked list manipulation',
  ],
  avoidWhen: [
    'List should not be modified (use O(n) stack instead)',
    'Simple array/string check is available',
  ],
  funFact: 'This is often called a "composite" problem because it combines three classic linked list operations: finding middle, reversing, and traversing - all in one!',
  optimizationTips: [
    'Restore the list by re-reversing the second half after comparison',
    'For odd-length lists, the middle element doesn\'t need comparison',
    'Can use stack for simpler O(n) space solution',
  ],
  tags: ['Palindrome', 'Two Pointers', 'Reversal', 'Intermediate'],
};
