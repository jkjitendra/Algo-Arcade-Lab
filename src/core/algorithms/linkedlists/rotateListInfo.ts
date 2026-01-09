/**
 * Rotate List Info
 * Educational content for rotating a linked list
 */
export const rotateListInfo = {
  id: 'rotate-list',
  name: 'Rotate List',
  description: 'Rotate a linked list to the right by k positions. The last k elements become the new beginning of the list.',
  howItWorks: 'Find the length and tail. Make the list circular by connecting tail to head. Find the new tail at position (length - k - 1) from head. Break the circle at the new tail to create the rotated list.',
  keyInsight: 'Making the list temporarily circular simplifies the rotation - we just need to find where to "cut" the circle. K is normalized with modulo to handle k > length.',
  bestFor: [
    'Circular array rotation problems',
    'Shifting data in circular buffers',
    'List reordering operations',
  ],
  avoidWhen: [
    'k is very large and length is unknown (calculate length first anyway)',
    'In-place array rotation is possible (can be done with reversal)',
  ],
  funFact: 'This is conceptually similar to rotating an array, but in linked lists we can do it by just changing a few pointers instead of moving elements!',
  optimizationTips: [
    'Always normalize k with modulo to avoid unnecessary full rotations',
    'Handle edge cases: empty list, single node, k=0, k=length',
    'Can combine length finding with making circular in one pass',
  ],
  tags: ['Rotation', 'Circular', 'Pointers', 'Intermediate'],
};
