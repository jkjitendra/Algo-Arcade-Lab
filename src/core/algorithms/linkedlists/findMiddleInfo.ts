/**
 * Find Middle Info
 * Educational content for finding middle element
 */
export const findMiddleInfo = {
  id: 'find-middle',
  name: 'Find Middle Element',
  description: 'Finding the middle element of a linked list efficiently using the slow/fast pointer technique. The fast pointer moves twice as fast, so when it reaches the end, slow is at the middle.',
  howItWorks: 'Initialize two pointers at head. Move slow by 1 step and fast by 2 steps in each iteration. When fast reaches the end (null or last node), slow points to the middle element.',
  keyInsight: 'This works because fast covers 2x the distance of slow. When fast has traversed the entire list (length n), slow has traversed n/2, which is exactly the middle.',
  bestFor: [
    'Splitting a linked list in half',
    'Finding median in a linked list',
    'Prerequisite for merge sort on linked lists',
    'Checking if linked list is palindrome',
  ],
  avoidWhen: [
    'You already know the length (just traverse to length/2)',
    'Random access is available (use array instead)',
  ],
  funFact: 'For even-length lists, this returns the second of the two middle elements. Some implementations return the first middle by checking one step ahead.',
  optimizationTips: [
    'To get the first middle in even-length lists, check if fast.next.next exists before moving slow',
    'Can be combined with other operations like splitting the list',
  ],
  tags: ['Two Pointers', 'Middle', 'Beginner'],
};
