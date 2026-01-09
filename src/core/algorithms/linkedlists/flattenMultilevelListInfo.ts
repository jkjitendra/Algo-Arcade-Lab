/**
 * Flatten Multilevel List Info
 * Educational content for flattening multilevel linked lists
 */
export const flattenMultilevelListInfo = {
  id: 'flatten-multilevel-list',
  name: 'Flatten Multilevel List',
  description: 'Flatten a doubly linked list where some nodes have child pointers to sublists. The child list is inserted inline between the node and its next.',
  howItWorks: 'Traverse the list. When a node with a child is found, save the next pointer, connect current to child, find the tail of the child list, and connect tail to saved next. Continue traversal.',
  keyInsight: 'This is essentially inserting a sublist inline. The key is finding the tail of the child list so we can reconnect properly. All children are processed as we traverse.',
  bestFor: [
    'Flattening nested data structures',
    'Converting hierarchical data to linear',
    'DOM flattening operations',
    'Directory tree linearization',
  ],
  avoidWhen: [
    'Hierarchy must be preserved',
    'Recursive structure is too deep (consider iterative with stack)',
  ],
  funFact: 'This problem is popular in interviews at companies like Microsoft. It tests understanding of pointer manipulation while dealing with multiple levels of indirection.',
  optimizationTips: [
    'Can use a stack to track next pointers for deeply nested structures',
    'For very deep nesting, iterative approach avoids stack overflow',
    'Consider restoring prev pointers if doubly linked is required',
  ],
  tags: ['Multilevel', 'Flatten', 'Pointers', 'Advanced'],
};
