import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Next Smaller Element using Monotonic Stack
 */
export const nextSmallerElement: IAlgorithm<ArrayInput> = {
  id: 'next-smaller-element',
  name: 'Next Smaller Element',
  category: 'stacks',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function nextSmallerElement(arr):',
    '  n = length(arr)',
    '  result = array of -1 (size n)',
    '  stack = empty stack  // stores indices',
    '  for i = 0 to n - 1:',
    '    while stack not empty and arr[i] < arr[top(stack)]:',
    '      idx = pop(stack)',
    '      result[idx] = arr[i]',
    '    push(stack, i)',
    '  return result',
  ],

  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const result: number[] = new Array(n).fill(-1);
    const stack: number[] = [];

    yield createEvent.message(`Finding next smaller element for each element in [${arr.join(', ')}]`, 'info', 0);
    yield createEvent.highlight([0, 1, 2, 3]);

    yield createEvent.auxiliary({
      type: 'stack',
      stackData: { elements: [], topIndex: -1 },
    });

    for (let i = 0; i < n; i++) {
      yield createEvent.highlight([4]);
      yield createEvent.mark([i], 'current');
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [{ name: 'arr[i]', value: arr[i], highlight: true }]
      );

      // Pop elements larger than current
      while (stack.length > 0 && arr[i] < arr[stack[stack.length - 1]]) {
        yield createEvent.highlight([5, 6, 7]);
        const idx = stack[stack.length - 1];  // Get element without removing
        yield createEvent.message(`arr[${i}]=${arr[i]} < arr[${idx}]=${arr[idx]}, so NSE[${idx}] = ${arr[i]}`, 'explanation');

        // Show pop animation BEFORE removing element (element still in stack)
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: stack.map(idx => arr[idx]),  // Element still in array
            topIndex: stack.length - 1,
            animating: 'pop',
            animatingValue: arr[idx],
          },
        });

        // Now remove element
        stack.pop();
        result[idx] = arr[i];
        yield createEvent.pop(arr[idx], 'stack');
      }

      yield createEvent.highlight([8]);

      // Show push animation first
      yield createEvent.auxiliary({
        type: 'stack',
        stackData: {
          elements: stack.map(idx => arr[idx]),
          topIndex: stack.length - 1,
          animating: 'push',
          animatingValue: arr[i],
        },
      });

      stack.push(i);
      yield createEvent.push(arr[i], 'stack');

      yield createEvent.unmark([i]);
      yield createEvent.auxiliary({
        type: 'stack',
        stackData: {
          elements: stack.map(idx => arr[idx]),
          topIndex: stack.length - 1,
        },
      });
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([9]);
    yield createEvent.message(`Result: [${result.join(', ')}]`, 'info');
    yield createEvent.result('indices', result, `Next Smaller Elements: [${result.join(', ')}]`);
  },
};
