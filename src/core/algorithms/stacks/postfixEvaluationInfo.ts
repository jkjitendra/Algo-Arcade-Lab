/**
 * Postfix Evaluation Info
 */
export const postfixEvaluationInfo = {
  id: 'postfix-evaluation',
  name: 'Postfix Evaluation',
  description: 'Evaluate a postfix expression (Reverse Polish Notation) where operators come after their operands.',
  howItWorks: 'Scan left to right: push operands onto stack. For operators, pop two operands, apply the operator, push result back. Final stack value is the answer.',
  keyInsight: 'No parentheses needed and no operator precedence to worry about - the order is encoded in the expression itself.',
  bestFor: [
    'Calculator implementations',
    'Stack-based virtual machines',
    'Expression evaluation in compilers',
  ],
  avoidWhen: [
    'Expression is in infix form (convert first)',
    'Human-readable output is needed',
  ],
  funFact: 'HP calculators used RPN exclusively for decades - users loved it once they learned it!',
  optimizationTips: [
    'Validate expression before evaluation',
    'Handle division by zero gracefully',
  ],
  tags: ['Stack', 'Expression', 'Evaluation', 'Intermediate'],
};
