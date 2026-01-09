/**
 * Merge Sorted Lists Info
 * Educational content for merging two sorted linked lists
 */
export const mergeSortedListsInfo = {
  id: 'merge-sorted-lists',
  name: 'Merge Two Sorted Lists',
  description: 'Merging two sorted linked lists into a single sorted list by comparing elements and linking nodes in order. A fundamental operation used in merge sort.',
  howItWorks: 'Use two pointers, one for each list. Compare the current nodes, attach the smaller one to the result, and advance that pointer. Repeat until one list is exhausted, then attach the remaining nodes.',
  keyInsight: 'Since both lists are already sorted, we only need to compare the current heads. The result is built in O(n+m) time with O(1) extra space (we\'re reusing existing nodes).',
  bestFor: [
    'Merge step in merge sort for linked lists',
    'Combining sorted data streams',
    'K-way merge (repeatedly merge pairs)',
    'External sorting when data doesn\'t fit in memory',
  ],
  avoidWhen: [
    'Lists are not sorted (sort first or use different approach)',
    'In-place sort of a single list is needed',
  ],
  funFact: 'This is the merge step of merge sort for linked lists. Unlike array merge sort, linked list merge sort can be done in O(1) space since we just rearrange pointers!',
  optimizationTips: [
    'Use a dummy head node to simplify edge cases',
    'Can be extended to merge k sorted lists using a min-heap',
    'Consider recursive implementation for cleaner code (but O(n) stack space)',
  ],
  tags: ['Merge', 'Sorted', 'Two Pointers', 'Beginner'],
};
