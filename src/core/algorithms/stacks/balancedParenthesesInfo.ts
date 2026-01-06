/**
 * Balanced Parentheses Info
 */
export const balancedParenthesesInfo = {
  id: 'balanced-parentheses',
  name: 'Balanced Parentheses',
  description: 'Check if an expression has balanced brackets - every opening bracket has a corresponding closing bracket in the correct order.',
  howItWorks: 'Scan expression left to right: push opening brackets onto stack, for closing brackets check if top matches. Expression is balanced if stack is empty at the end.',
  keyInsight: 'The stack naturally handles nested brackets because most recent opening bracket must match the next closing bracket.',
  bestFor: [
    'Code editor syntax checking',
    'Compiler/interpreter parsing',
    'Mathematical expression validation',
    'HTML/XML tag matching',
  ],
  avoidWhen: [
    'Only single type of bracket exists',
    'Simple counting would suffice',
  ],
  funFact: 'This algorithm is used in every IDE to highlight matching brackets as you type!',
  optimizationTips: [
    'Early termination when mismatch found',
    'Pre-check: odd length means unbalanced',
  ],
  tags: ['Stack', 'Parsing', 'Validation', 'Beginner'],
};
