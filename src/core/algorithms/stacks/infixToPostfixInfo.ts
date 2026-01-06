/**
 * Infix to Postfix Info
 */
export const infixToPostfixInfo = {
  id: 'infix-to-postfix',
  name: 'Infix to Postfix',
  description: 'Convert an infix expression (operators between operands like A+B) to postfix/Reverse Polish Notation (operators after operands like AB+).',
  howItWorks: 'The Shunting Yard algorithm uses a stack to hold operators. Operands go directly to output. Operators are pushed/popped based on precedence rules.',
  keyInsight: 'Postfix notation eliminates the need for parentheses and makes evaluation trivial with a single left-to-right pass.',
  bestFor: [
    'Calculator implementations',
    'Compiler expression parsing',
    'Spreadsheet formula evaluation',
    'Scientific computing',
  ],
  avoidWhen: [
    'Expression is already in desired form',
    'Simple single-operator expressions',
  ],
  funFact: 'Named "Shunting Yard" because operators are moved around like railroad cars in a switching yard!',
  optimizationTips: [
    'Handle right-associative operators (^) specially',
    'Pre-tokenize the expression for cleaner code',
  ],
  tags: ['Stack', 'Expression', 'Parsing', 'Intermediate'],
};
