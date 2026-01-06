import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Infix to Postfix Conversion (Shunting Yard Algorithm)
 * 
 * Convert infix expression to postfix (Reverse Polish Notation)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

const precedence: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
};

const isOperator = (c: string) => '+-*/^'.includes(c);
const isOperand = (c: string) => /[a-zA-Z0-9]/.test(c);

export const infixToPostfix: IAlgorithm<ArrayInput> = {
  id: 'infix-to-postfix',
  name: 'Infix to Postfix',
  category: 'stacks',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function infixToPostfix(expression):',
    '  stack = empty stack',
    '  output = empty queue',
    '  for each token in expression:',
    '    if token is operand:',
    '      add token to output',
    '    else if token is \'(\':',
    '      push token to stack',
    '    else if token is \')\':',
    '      while top(stack) ≠ \'(\':',
    '        pop and add to output',
    '      pop \'(\' from stack',
    '    else if token is operator:',
    '      while stack not empty and',
    '            precedence(top) >= precedence(token):',
    '        pop and add to output',
    '      push token to stack',
    '  pop all remaining operators',
    '  return output',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Expression cannot be empty' };
    }
    if (input.values.length > 20) {
      return { ok: false, error: 'Expression length must be 20 or less' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const chars = input.values.map(v => String.fromCharCode(v));
    const expression = chars.join('');

    yield createEvent.message(
      `Converting infix "${expression}" to postfix (Shunting Yard Algorithm)`,
      'info',
      0
    );

    const stack: string[] = [];
    const output: string[] = [];

    yield createEvent.highlight([0, 1, 2]);
    yield createEvent.auxiliary({
      type: 'stack',
      stackData: {
        elements: [],
        topIndex: -1,
        outputQueue: [],
      },
    });

    for (let i = 0; i < chars.length; i++) {
      const token = chars[i];

      // Skip whitespace
      if (token === ' ') continue;

      yield createEvent.highlight([3]);
      yield createEvent.mark([i], 'current');
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [{ name: 'token', value: token, highlight: true }],
        `Processing '${token}'`
      );

      if (isOperand(token)) {
        // Operand - add to output
        yield createEvent.highlight([4, 5]);
        output.push(token);
        yield createEvent.message(`'${token}' is operand - adding to output`, 'explanation');

      } else if (token === '(') {
        // Left parenthesis - push to stack
        yield createEvent.highlight([6, 7]);
        yield createEvent.message(`'(' - pushing to stack`, 'explanation');

        // Show push animation first
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: [...stack],
            topIndex: stack.length - 1,
            outputQueue: [...output],
            animating: 'push',
            animatingValue: token,
          },
        });

        stack.push(token);
        yield createEvent.push(token, 'stack');

      } else if (token === ')') {
        // Right parenthesis - pop until '('
        yield createEvent.highlight([8, 9, 10]);
        yield createEvent.message(`')' - popping until we find '('`, 'explanation');

        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          const op = stack[stack.length - 1];  // Get element without removing
          yield createEvent.message(`Popping '${op}' to output`, 'explanation');

          // Show pop animation BEFORE removing element
          yield createEvent.auxiliary({
            type: 'stack',
            stackData: {
              elements: [...stack],  // Element still in array
              topIndex: stack.length - 1,
              outputQueue: [...output],
              animating: 'pop',
              animatingValue: op,
            },
          });

          // Now remove element
          stack.pop();
          output.push(op);
          yield createEvent.pop(op, 'stack');
        }

        // Pop the '('
        if (stack.length > 0) {
          yield createEvent.highlight([11]);
          stack.pop();
          yield createEvent.message(`Discarding '(' from stack`, 'explanation');
        }

      } else if (isOperator(token)) {
        // Operator - pop higher/equal precedence operators
        yield createEvent.highlight([12, 13, 14, 15]);
        yield createEvent.message(`'${token}' is operator (precedence: ${precedence[token]})`, 'explanation');

        while (
          stack.length > 0 &&
          stack[stack.length - 1] !== '(' &&
          isOperator(stack[stack.length - 1]) &&
          precedence[stack[stack.length - 1]] >= precedence[token]
        ) {
          const op = stack[stack.length - 1];  // Get element without removing
          const stackPrecedence = precedence[op];
          const tokenPrecedence = precedence[token];
          yield createEvent.message(
            `Popping '${op}' (precedence ${stackPrecedence}) because ${stackPrecedence} >= ${tokenPrecedence} (precedence of '${token}')`,
            'step'
          );

          // Show pop animation BEFORE removing element
          const popMessage = `Popping '${op}' (precedence ${stackPrecedence}) because ${stackPrecedence} >= ${tokenPrecedence} (precedence of '${token}')`;
          yield createEvent.auxiliary({
            type: 'stack',
            stackData: {
              elements: [...stack],  // Element still in array
              topIndex: stack.length - 1,
              outputQueue: [...output],
              animating: 'pop',
              animatingValue: op,
              message: popMessage,
            },
          });

          // Now remove element
          stack.pop();
          output.push(op);
          yield createEvent.pop(op, 'stack');
        }

        // Show push animation first
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: [...stack],
            topIndex: stack.length - 1,
            outputQueue: [...output],
            animating: 'push',
            animatingValue: token,
          },
        });

        stack.push(token);
        yield createEvent.push(token, 'stack');
        yield createEvent.message(`Pushing '${token}' to stack`, 'explanation');
      }

      yield createEvent.unmark([i]);

      yield createEvent.auxiliary({
        type: 'stack',
        stackData: {
          elements: [...stack],
          topIndex: stack.length - 1,
          outputQueue: [...output],
        },
      });
    }

    // Pop remaining operators
    yield createEvent.highlight([17]);
    yield createEvent.message(`Popping remaining operators from stack`, 'step');

    while (stack.length > 0) {
      const op = stack.pop()!;
      if (op !== '(' && op !== ')') {
        output.push(op);
        yield createEvent.pop(op, 'stack');
        yield createEvent.message(`Popping '${op}' to output`, 'explanation');
      }

      yield createEvent.auxiliary({
        type: 'stack',
        stackData: {
          elements: [...stack],
          topIndex: stack.length - 1,
          outputQueue: [...output],
          animating: 'pop',
        },
      });
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([18]);

    const postfix = output.join(' ');
    yield createEvent.message(`Postfix expression: ${postfix}`, 'info');
    yield createEvent.result('string', postfix, `Infix: ${expression} → Postfix: ${postfix}`);

    // Final state
    yield createEvent.auxiliary({
      type: 'stack',
      stackData: {
        elements: [],
        topIndex: -1,
        outputQueue: [...output],
      },
    });
  },
};
