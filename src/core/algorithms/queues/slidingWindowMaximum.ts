import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Sliding Window Maximum
 * 
 * Find maximum in each sliding window of size k.
 * Uses a deque to maintain potential maximums.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */

export const slidingWindowMaximum: IAlgorithm<ArrayInput> = {
  id: 'sliding-window-maximum',
  name: 'Sliding Window Maximum',
  category: 'queues',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function slidingWindowMax(arr, k):',
    '  deque = []  // stores indices',
    '  result = []',
    '  for i = 0 to n-1:',
    '    // Remove elements outside window',
    '    while deque not empty and deque[0] < i-k+1:',
    '      deque.removeFirst()',
    '    // Remove smaller elements',
    '    while deque not empty and arr[deque.last] < arr[i]:',
    '      deque.removeLast()',
    '    deque.addLast(i)',
    '    if i >= k-1:',
    '      result.add(arr[deque[0]])',
    '  return result',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(k)',

  parameters: [
    {
      type: 'number',
      id: 'windowSize',
      label: 'Window Size (k)',
      default: 3,
      min: 2,
      max: 5,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Array must have at least 2 elements' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const k = (params?.windowSize || 3) as number;
    const arr = [...input.values];
    const n = arr.length;
    const deque: number[] = []; // Store indices
    const result: number[] = [];

    yield createEvent.message(`Finding maximum in each window of size ${k}`, 'info', 0);
    yield createEvent.message(`Array: [${arr.join(', ')}]`, 'explanation');

    yield createEvent.highlight([0, 1, 2]);

    for (let i = 0; i < n; i++) {
      yield createEvent.message(`Processing index ${i}, value = ${arr[i]}`, 'step');
      yield createEvent.highlight([3, 4, 5]);

      // Remove elements outside current window
      while (deque.length > 0 && deque[0] < i - k + 1) {
        const removed = deque.shift();
        yield createEvent.message(`Removing ${removed} (outside window)`, 'explanation');
        yield createEvent.highlight([5, 6]);
      }

      // Remove smaller elements from rear
      yield createEvent.highlight([7, 8, 9]);
      while (deque.length > 0 && arr[deque[deque.length - 1]] < arr[i]) {
        const removed = deque.pop();
        yield createEvent.message(`Removing index ${removed} (smaller than ${arr[i]})`, 'explanation');
      }

      // Add current index
      deque.push(i);
      yield createEvent.highlight([10]);
      yield createEvent.message(`Added index ${i} to deque`, 'explanation');

      const windowStart = Math.max(0, i - k + 1);
      const windowEnd = i;

      yield createEvent.auxiliary({
        type: 'queue',
        queueData: {
          elements: arr,
          frontIndex: 0,
          rearIndex: arr.length - 1,
          windowStart,
          windowEnd,
          maxDeque: [...deque],
          message: `Window [${windowStart}, ${windowEnd}], max index: ${deque[0]}`,
        },
      });

      // Record max for complete windows
      if (i >= k - 1) {
        yield createEvent.highlight([11, 12]);
        const max = arr[deque[0]];
        result.push(max);
        yield createEvent.message(`Window complete! Max = ${max}`, 'info');
      }
    }

    yield createEvent.message(`Result: [${result.join(', ')}]`, 'info');
    yield createEvent.result('indices', result, 'Window maximums');
  },
};
