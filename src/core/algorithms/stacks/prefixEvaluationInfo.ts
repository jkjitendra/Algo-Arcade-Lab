/**
 * Prefix Evaluation Info
 */
export const prefixEvaluationInfo = {
  id: 'prefix-evaluation',
  name: 'Prefix Evaluation',
  description: 'Evaluate a prefix expression (Polish Notation) where operators come before their operands.',
  howItWorks: 'Scan right to left: push operands onto stack. For operators, pop two operands (order matters!), apply operator, push result.',
  keyInsight: 'Right-to-left scanning with reversed operand order gives the same result as evaluating left-to-right.',
  bestFor: [
    'LISP expression evaluation',
    'Functional programming interpreters',
    'Abstract syntax tree evaluation',
  ],
  avoidWhen: [
    'Postfix evaluation is simpler for your use case',
    'Expression needs to be human-readable',
  ],
  funFact: 'LISP, one of the oldest programming languages (1958), uses prefix notation for all expressions!',
  optimizationTips: [
    'Watch operand order - first popped is first operand',
    'Consider converting to postfix if more convenient',
  ],
  tags: ['Stack', 'Expression', 'Evaluation', 'Intermediate'],
};
