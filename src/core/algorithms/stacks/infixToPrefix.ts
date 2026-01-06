import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Infix to Prefix Conversion
 * 
 * Convert infix expression to prefix (Polish Notation)
 * Uses reverse processing approach
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

const precedence: Record<string, number> = {
  '+': 1, '-': 1, '*': 2, '/': 2, '^': 3,
};

const isOperator = (c: string) => '+-*/^'.includes(c);
const isOperand = (c: string) => /[a-zA-Z0-9]/.test(c);

export const infixToPrefix: IAlgorithm<ArrayInput> = {
  id: 'infix-to-prefix',
  name: 'Infix to Prefix',
  category: 'stacks',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function infixToPrefix(expression):',
    '  reverse the expression',
    '  swap \'(\' with \')\' and vice versa',
    '  apply infixToPostfix algorithm',
    '  reverse the result',
    '  return prefix expression',
  ],

  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
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

    yield createEvent.message(`Converting infix "${expression}" to prefix`, 'info', 0);

    // Step 1: Reverse and swap brackets
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(`Step 1: Reverse expression and swap brackets`, 'step');

    const reversed = chars.slice().reverse().map(c => {
      if (c === '(') return ')';
      if (c === ')') return '(';
      return c;
    });

    yield createEvent.message(`Reversed: "${reversed.join('')}"`, 'explanation');

    // Step 2: Apply postfix conversion
    yield createEvent.highlight([3]);
    yield createEvent.message(`Step 2: Apply postfix conversion`, 'step');

    const stack: string[] = [];
    const output: string[] = [];

    yield createEvent.auxiliary({
      type: 'stack',
      stackData: { elements: [], topIndex: -1, outputQueue: [] },
    });

    for (let i = 0; i < reversed.length; i++) {
      const token = reversed[i];
      if (token === ' ') continue;

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [{ name: 'token', value: token, highlight: true }]
      );

      if (isOperand(token)) {
        output.push(token);
        yield createEvent.message(`Operand '${token}' → output`, 'explanation');
      } else if (token === '(') {
        // Show push animation first
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: { elements: [...stack], topIndex: stack.length - 1, outputQueue: [...output], animating: 'push', animatingValue: token },
        });
        stack.push(token);
        yield createEvent.push(token, 'stack');
      } else if (token === ')') {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          const op = stack[stack.length - 1];  // Get without removing
          yield createEvent.message(`Popping '${op}' to output (found before '(')`, 'explanation');
          yield createEvent.auxiliary({
            type: 'stack',
            stackData: {
              elements: [...stack],
              topIndex: stack.length - 1,
              outputQueue: [...output],
              animating: 'pop',
              animatingValue: op,
              message: `Popping '${op}' to output`,
            },
          });
          stack.pop();
          output.push(op);
          yield createEvent.pop(op, 'stack');
        }
        if (stack.length > 0) stack.pop();
      } else if (isOperator(token)) {
        // For prefix, use > instead of >=
        yield createEvent.message(`'${token}' is operator (precedence: ${precedence[token]})`, 'explanation');

        while (
          stack.length > 0 &&
          stack[stack.length - 1] !== '(' &&
          isOperator(stack[stack.length - 1]) &&
          precedence[stack[stack.length - 1]] > precedence[token]
        ) {
          const op = stack[stack.length - 1];  // Get without removing
          const stackPrecedence = precedence[op];
          const tokenPrecedence = precedence[token];
          const popMessage = `Popping '${op}' (precedence ${stackPrecedence}) because ${stackPrecedence} > ${tokenPrecedence} (precedence of '${token}')`;
          yield createEvent.message(popMessage, 'step');
          yield createEvent.auxiliary({
            type: 'stack',
            stackData: {
              elements: [...stack],
              topIndex: stack.length - 1,
              outputQueue: [...output],
              animating: 'pop',
              animatingValue: op,
              message: popMessage,
            },
          });
          stack.pop();
          output.push(op);
          yield createEvent.pop(op, 'stack');
        }
        // Show push animation first
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: { elements: [...stack], topIndex: stack.length - 1, outputQueue: [...output], animating: 'push', animatingValue: token },
        });
        stack.push(token);
        yield createEvent.push(token, 'stack');
      }

      yield createEvent.auxiliary({
        type: 'stack',
        stackData: { elements: [...stack], topIndex: stack.length - 1, outputQueue: [...output] },
      });
    }

    while (stack.length > 0) {
      const op = stack.pop()!;
      if (op !== '(' && op !== ')') output.push(op);
      yield createEvent.pop(op, 'stack');
    }

    // Step 3: Reverse result
    yield createEvent.highlight([4, 5]);
    yield createEvent.message(`Step 3: Reverse the result`, 'step');
    const prefix = output.reverse().join(' ');

    yield createEvent.message(`Prefix expression: ${prefix}`, 'info');
    yield createEvent.result('string', prefix, `Infix: ${expression} → Prefix: ${prefix}`);

    yield createEvent.auxiliary({
      type: 'stack',
      stackData: { elements: [], topIndex: -1, outputQueue: prefix.split(' ') },
    });
  },
};
