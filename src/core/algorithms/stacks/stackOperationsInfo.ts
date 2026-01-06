/**
 * Stack Operations Info
 * Educational content for basic stack operations
 */
export const stackOperationsInfo = {
  id: 'stack-operations',
  name: 'Stack Operations',
  description: 'A Stack is a linear data structure that follows the LIFO (Last In, First Out) principle. The last element added to the stack is the first one to be removed.',
  howItWorks: 'Select an operation: Push adds an element to the top, Pop removes the top element, Peek views the top without removing, isEmpty checks if empty, and isFull checks capacity.',
  keyInsight: 'All stack operations have O(1) time complexity - they only ever touch the top element.',
  bestFor: [
    'Function call stack (recursion)',
    'Undo/Redo operations in editors',
    'Browser history (back button)',
    'Expression evaluation and parsing',
  ],
  avoidWhen: [
    'Need random access to elements',
    'Need to access bottom elements frequently',
    'FIFO order is required (use Queue instead)',
  ],
  funFact: 'The call stack in programming languages is literally a stack - that\'s why stack overflow errors happen when recursion goes too deep!',
  optimizationTips: [
    'Use array-based implementation for better cache performance',
    'Consider using a dynamic array to avoid fixed capacity limits',
  ],
  tags: ['LIFO', 'O(1)', 'Data Structure', 'Beginner'],
};
