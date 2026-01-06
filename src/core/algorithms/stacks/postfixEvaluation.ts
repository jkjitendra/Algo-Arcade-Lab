import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Postfix Expression Evaluation
 * 
 * Evaluate a postfix expression using a stack
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

const isOperator = (c: string) => '+-*/^'.includes(c);
const isDigit = (c: string) => /[0-9]/.test(c);

export const postfixEvaluation: IAlgorithm<ArrayInput> = {
  id: 'postfix-evaluation',
  name: 'Postfix Evaluation',
  category: 'stacks',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function evaluatePostfix(expression):',
    '  stack = empty stack',
    '  for each token in expression:',
    '    if token is operand:',
    '      push(stack, token)',
    '    else if token is operator:',
    '      operand2 = pop(stack)',
    '      operand1 = pop(stack)',
    '      result = operand1 operator operand2',
    '      push(stack, result)',
    '  return pop(stack)',
  ],

  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Expression cannot be empty' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const chars = input.values.map(v => String.fromCharCode(v));
    const expression = chars.join('');

    yield createEvent.message(`Evaluating postfix expression: "${expression}"`, 'info', 0);

    const stack: number[] = [];

    yield createEvent.highlight([0, 1]);
    yield createEvent.auxiliary({
      type: 'stack',
      stackData: { elements: [], topIndex: -1 },
    });

    for (let i = 0; i < chars.length; i++) {
      const token = chars[i];
      if (token === ' ') continue;

      yield createEvent.highlight([2]);
      yield createEvent.mark([i], 'current');
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [{ name: 'token', value: token, highlight: true }]
      );

      if (isDigit(token)) {
        yield createEvent.highlight([3, 4]);
        const num = parseInt(token);
        yield createEvent.message(`Operand ${num} - pushing to stack`, 'explanation');

        // Show push animation first
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: { elements: [...stack], topIndex: stack.length - 1, animating: 'push', animatingValue: num },
        });

        stack.push(num);
        yield createEvent.push(num, 'stack');
      } else if (isOperator(token)) {
        yield createEvent.highlight([5, 6, 7]);

        if (stack.length < 2) {
          yield createEvent.message(`Error: Not enough operands for operator '${token}'`, 'info');
          return;
        }

        // Pop first operand (b) - this will be on the right side
        const b = stack[stack.length - 1];
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: [...stack],
            topIndex: stack.length - 1,
            animating: 'pop',
            animatingValue: b,
            message: `Popping operand ${b}`,
          },
        });
        stack.pop();
        yield createEvent.pop(b, 'stack');

        // Pop second operand (a) - this will be on the left side
        const a = stack[stack.length - 1];
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: [...stack],
            topIndex: stack.length - 1,
            animating: 'pop',
            animatingValue: a,
            message: `Popping operand ${a}`,
          },
        });
        stack.pop();
        yield createEvent.pop(a, 'stack');

        // Calculate result
        let result: number;
        switch (token) {
          case '+': result = a + b; break;
          case '-': result = a - b; break;
          case '*': result = a * b; break;
          case '/': result = Math.floor(a / b); break;
          case '^': result = Math.pow(a, b); break;
          default: result = 0;
        }

        yield createEvent.highlight([8, 9]);

        // Show calculation in Stack Visualization
        const calcMessage = `${a} ${token} ${b} = ${result}`;
        yield createEvent.message(calcMessage, 'step');

        // Show the calculation result before pushing
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: [...stack],
            topIndex: stack.length - 1,
            message: `Calculating: ${calcMessage} → Pushing ${result}`,
          },
        });

        // Show push animation with result
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: [...stack],
            topIndex: stack.length - 1,
            animating: 'push',
            animatingValue: result,
            message: `Pushing result: ${result}`,
          },
        });

        stack.push(result);
        yield createEvent.push(result, 'stack');
      }

      yield createEvent.unmark([i]);
      yield createEvent.auxiliary({
        type: 'stack',
        stackData: { elements: [...stack], topIndex: stack.length - 1 },
      });
    }

    yield createEvent.highlight([10]);
    yield createEvent.pointer([], []);

    const finalResult = stack.length > 0 ? stack[0] : 0;
    yield createEvent.message(`Result: ${finalResult}`, 'info');
    yield createEvent.result('search', finalResult, `${expression} = ${finalResult}`);
  },
};
