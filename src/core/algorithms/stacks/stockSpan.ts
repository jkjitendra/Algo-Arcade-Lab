import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Stock Span Problem
 * 
 * For each day, find how many consecutive previous days had price <= current
 */
export const stockSpan: IAlgorithm<ArrayInput> = {
  id: 'stock-span',
  name: 'Stock Span Problem',
  category: 'stacks',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function stockSpan(prices):',
    '  n = length(prices)',
    '  span = array of size n',
    '  stack = empty stack  // stores indices',
    '  for i = 0 to n - 1:',
    '    while stack not empty and prices[top] <= prices[i]:',
    '      pop(stack)',
    '    if stack is empty:',
    '      span[i] = i + 1',
    '    else:',
    '      span[i] = i - top(stack)',
    '    push(stack, i)',
    '  return span',
  ],

  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Price array cannot be empty' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const prices = [...input.values];
    const n = prices.length;
    const span: number[] = new Array(n).fill(0);
    const stack: number[] = [];

    yield createEvent.message(`Calculating stock span for prices: [${prices.join(', ')}]`, 'info', 0);
    yield createEvent.message(`Span = number of consecutive days with price ≤ current`, 'explanation');
    yield createEvent.highlight([0, 1, 2, 3]);

    yield createEvent.auxiliary({
      type: 'stack',
      stackData: { elements: [], topIndex: -1 },
    });

    for (let i = 0; i < n; i++) {
      yield createEvent.highlight([4]);
      yield createEvent.mark([i], 'current');
      yield createEvent.pointer(
        [{ index: i, label: 'day', color: 'var(--color-primary-500)' }],
        [
          { name: 'price', value: prices[i], highlight: true },
          { name: 'day', value: i },
        ]
      );

      // Pop days with smaller or equal prices
      while (stack.length > 0 && prices[stack[stack.length - 1]] <= prices[i]) {
        yield createEvent.highlight([5, 6]);
        const idx = stack[stack.length - 1];  // Get element without removing
        yield createEvent.message(`Price[${idx}]=${prices[idx]} ≤ ${prices[i]}, popping`, 'explanation');

        // Show pop animation BEFORE removing element
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: stack.map(idx => prices[idx]),  // Element still in array
            topIndex: stack.length - 1,
            animating: 'pop',
            animatingValue: prices[idx],
          },
        });

        // Now remove element
        stack.pop();
        yield createEvent.pop(prices[idx], 'stack');
      }

      // Calculate span
      if (stack.length === 0) {
        yield createEvent.highlight([7, 8]);
        span[i] = i + 1;
        yield createEvent.message(`Stack empty: span[${i}] = ${i} + 1 = ${span[i]}`, 'explanation');
      } else {
        yield createEvent.highlight([9, 10]);
        span[i] = i - stack[stack.length - 1];
        yield createEvent.message(`Span[${i}] = ${i} - ${stack[stack.length - 1]} = ${span[i]}`, 'explanation');
      }

      yield createEvent.highlight([11]);

      // Show push animation first
      yield createEvent.auxiliary({
        type: 'stack',
        stackData: {
          elements: stack.map(idx => prices[idx]),
          topIndex: stack.length - 1,
          animating: 'push',
          animatingValue: prices[i],
        },
      });

      stack.push(i);
      yield createEvent.push(prices[i], 'stack');

      yield createEvent.unmark([i]);
      yield createEvent.auxiliary({
        type: 'stack',
        stackData: {
          elements: stack.map(idx => prices[idx]),
          topIndex: stack.length - 1,
        },
      });
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([12]);
    yield createEvent.message(`Stock spans: [${span.join(', ')}]`, 'info');
    yield createEvent.result('indices', span, `Spans: [${span.join(', ')}]`);
  },
};
