/**
 * Infix to Prefix Info
 */
export const infixToPrefixInfo = {
  id: 'infix-to-prefix',
  name: 'Infix to Prefix',
  description: 'Convert an infix expression to prefix/Polish Notation where operators appear before their operands.',
  howItWorks: 'Reverse the expression, swap parentheses, apply infix-to-postfix algorithm, then reverse the result.',
  keyInsight: 'Prefix is essentially the mirror of postfix - same stack-based approach but reversed processing.',
  bestFor: [
    'LISP-like language processing',
    'Functional programming expressions',
    'Mathematical notation systems',
  ],
  avoidWhen: [
    'Postfix is more convenient for evaluation',
    'Target system prefers RPN',
  ],
  funFact: 'Polish notation was invented by Polish logician Jan Łukasiewicz in 1924, hence the name!',
  optimizationTips: [
    'Reuse the postfix algorithm by transforming input/output',
    'Handle associativity carefully during reversal',
  ],
  tags: ['Stack', 'Expression', 'Parsing', 'Intermediate'],
};
