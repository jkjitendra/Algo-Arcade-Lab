import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Balanced Parentheses Algorithm
 * 
 * Check if brackets (), [], {} are balanced using a stack.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n) worst case
 */

// Map ASCII codes and direct character codes for parentheses
const charCodeToParenthesis: Record<number, string> = {
  40: '(', 41: ')',
  91: '[', 93: ']',
  123: '{', 125: '}',
  // Also support direct small integers as indices to parenthesis array
  0: '(', 1: ')',
  2: '[', 3: ']',
  4: '{', 5: '}',
};

const isParenthesisCode = (code: number): boolean => {
  return code in charCodeToParenthesis;
};

export const balancedParentheses: IAlgorithm<ArrayInput> = {
  id: 'balanced-parentheses',
  name: 'Balanced Parentheses',
  category: 'stacks',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function isBalanced(expression):',
    '  stack = empty stack',
    '  for each char in expression:',
    '    if char is opening bracket:',
    '      push(stack, char)',
    '    else if char is closing bracket:',
    '      if stack is empty:',
    '        return false',
    '      if top(stack) matches char:',
    '        pop(stack)',
    '      else:',
    '        return false',
    '  return stack is empty',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of parentheses' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Expression cannot be empty' };
    }
    if (input.values.length > 20) {
      return { ok: false, error: 'Expression length must be 20 or less for visualization' };
    }
    // Validate all values are valid parenthesis codes
    for (const v of input.values) {
      if (!isParenthesisCode(v)) {
        return { ok: false, error: `Invalid character code: ${v}. Use parentheses (), [], {}` };
      }
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    // Convert input to parentheses characters
    const chars = input.values.map(v => charCodeToParenthesis[v] || String.fromCharCode(v));
    const expression = chars.join('');

    yield createEvent.message(
      `Checking if expression "${expression}" has balanced brackets`,
      'info',
      0
    );

    const stack: { char: string; index: number }[] = [];
    const openBrackets = '([{';
    const closeBrackets = ')]}';
    const matchMap: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

    // Color map for bracket types
    const bracketColors: Record<string, string> = {
      '(': 'var(--color-primary-500)',
      ')': 'var(--color-primary-500)',
      '[': 'var(--color-secondary-500)',
      ']': 'var(--color-secondary-500)',
      '{': 'var(--color-accent-sorted)',
      '}': 'var(--color-accent-sorted)',
    };

    yield createEvent.highlight([0, 1]);
    yield createEvent.auxiliary({
      type: 'stack',
      stackData: {
        elements: [],
        topIndex: -1,
      },
    });

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      yield createEvent.highlight([2]);
      yield createEvent.mark([i], 'current');
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: bracketColors[char] || 'var(--color-primary-500)' }],
        [
          { name: 'char', value: char, highlight: true },
        ],
        `Processing '${char}'`
      );

      if (openBrackets.includes(char)) {
        // Opening bracket - push to stack
        yield createEvent.highlight([3, 4]);
        stack.push({ char, index: i });
        yield createEvent.push(char, 'stack');
        yield createEvent.message(`'${char}' is opening bracket - pushing to stack`, 'explanation');

        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: stack.map(s => s.char),
            topIndex: stack.length - 1,
            animating: 'push',
            animatingValue: char,
            highlight: [stack.length - 1],
          },
        });

        // Mark the opening bracket with its type color
        yield createEvent.mark([i], 'window');

      } else if (closeBrackets.includes(char)) {
        // Closing bracket - check for match
        yield createEvent.highlight([5, 6]);

        if (stack.length === 0) {
          yield createEvent.highlight([7]);
          yield createEvent.message(`Stack is empty! No matching opening bracket for '${char}'`, 'info');
          yield createEvent.mark([i], 'pivot');
          yield createEvent.result('string', `Expression "${expression}" is NOT BALANCED`, `Missing opening bracket for '${char}'`);
          return;
        }

        const top = stack[stack.length - 1];
        yield createEvent.highlight([8]);
        yield createEvent.message(`Top of stack: '${top.char}' | Expected match for '${char}': '${matchMap[char]}'`, 'explanation');

        if (top.char === matchMap[char]) {
          yield createEvent.highlight([9]);

          // Mark both matching brackets with sorted color before popping
          yield createEvent.mark([top.index], 'sorted');
          yield createEvent.mark([i], 'sorted');

          yield createEvent.message(`Match found! '${top.char}' matches '${char}' - popping`, 'explanation');

          // Show pop animation
          yield createEvent.auxiliary({
            type: 'stack',
            stackData: {
              elements: stack.map(s => s.char),
              topIndex: stack.length - 1,
              animating: 'pop',
              animatingValue: top.char,
              highlight: [stack.length - 1],
            },
          });

          stack.pop();
          yield createEvent.pop(top.char, 'stack');

          // Update stack after pop
          yield createEvent.auxiliary({
            type: 'stack',
            stackData: {
              elements: stack.map(s => s.char),
              topIndex: stack.length - 1,
            },
          });
        } else {
          yield createEvent.highlight([10, 11]);
          yield createEvent.mark([i], 'pivot');
          yield createEvent.message(`Mismatch! '${top.char}' does not match '${char}'`, 'info');
          yield createEvent.result('string', `Expression "${expression}" is NOT BALANCED`, `Bracket mismatch: '${top.char}' vs '${char}'`);
          return;
        }
      }

      // Small delay between characters for visibility
      yield createEvent.auxiliary({
        type: 'stack',
        stackData: {
          elements: stack.map(s => s.char),
          topIndex: stack.length - 1,
        },
      });
    }

    // Final check
    yield createEvent.highlight([12]);
    yield createEvent.pointer([], []);

    const isBalanced = stack.length === 0;

    if (isBalanced) {
      // Mark all as sorted/matched
      for (let i = 0; i < chars.length; i++) {
        yield createEvent.mark([i], 'sorted');
      }
      yield createEvent.message(`Expression "${expression}" is BALANCED! ✓`, 'info');
      yield createEvent.result('string', `Expression "${expression}" is BALANCED!`, '✓ All brackets matched');
    } else {
      // Mark unmatched brackets
      for (const item of stack) {
        yield createEvent.mark([item.index], 'pivot');
      }
      const unmatchedChars = stack.map(s => s.char).join('');
      yield createEvent.message(`Stack not empty! Unmatched brackets: "${unmatchedChars}"`, 'info');
      yield createEvent.result('string', `Expression "${expression}" is NOT BALANCED`, `${stack.length} unmatched: ${unmatchedChars}`);
    }
  },
};
