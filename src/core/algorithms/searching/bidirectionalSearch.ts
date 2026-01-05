import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Bidirectional Linear Search Algorithm
 * 
 * Searches from both ends of the array simultaneously,
 * potentially finding the target twice as fast.
 * 
 * Time Complexity: O(n/2) = O(n)
 * Space Complexity: O(1)
 */
export const bidirectionalSearch: IAlgorithm<ArrayInput> = {
  id: 'bidirectional-search',
  name: 'Bidirectional Search',
  category: 'searching',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function bidirectionalSearch(arr, target):',
    '  left = 0',
    '  right = n - 1',
    '',
    '  while left <= right:',
    '    if arr[left] == target:',
    '      return left',
    '    if arr[right] == target:',
    '      return right',
    '',
    '    left++',
    '    right--',
    '',
    '  return -1  // Not found',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n/2)',
    worst: 'O(n/2)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'target',
      label: 'Target Value',
      default: 22,
      min: 0,
      max: 100,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 20) {
      return { ok: false, error: 'Array size must be 20 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const target = (params?.target ?? 22) as number;
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Bidirectional Search: Find ${target} from both ends`,
      'info',
      0
    );
    yield createEvent.highlight([0]);
    yield createEvent.pointer(
      [],
      [
        { name: 'target', value: target },
        { name: 'n', value: n },
      ]
    );

    let left = 0;
    let right = n - 1;
    let comparisons = 0;

    yield createEvent.highlight([1, 2]);
    yield createEvent.pointer(
      [
        { index: left, label: 'left', color: 'var(--color-primary-500)' },
        { index: right, label: 'right', color: 'var(--color-secondary-500)' },
      ],
      [
        { name: 'left', value: left },
        { name: 'right', value: right },
        { name: 'target', value: target },
      ]
    );

    while (left <= right) {
      yield createEvent.highlight([4]);
      yield createEvent.mark([left], 'current');
      yield createEvent.mark([right], 'window');

      // Check left pointer
      yield createEvent.highlight([5]);
      yield createEvent.pointer(
        [
          { index: left, label: 'left', color: 'var(--color-primary-500)' },
          { index: right, label: 'right', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'left', value: left },
          { name: 'arr[left]', value: arr[left], highlight: true },
          { name: 'right', value: right },
          { name: 'arr[right]', value: arr[right] },
          { name: 'target', value: target },
        ],
        `arr[${left}] == ${target} ?`
      );

      comparisons++;
      if (arr[left] === target) {
        yield createEvent.compare([left, left], 'eq');
        yield createEvent.highlight([6]);
        yield createEvent.unmark([right]);
        yield createEvent.mark([left], 'sorted');
        yield createEvent.pointer(
          [{ index: left, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'index', value: left },
            { name: 'arr[left]', value: arr[left], highlight: true },
            { name: 'target', value: target, highlight: true },
          ],
          `${arr[left]} == ${target} ✓`
        );
        yield createEvent.message(
          `Found ${target} at index ${left} (from left)!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons}`,
          'explanation'
        );
        yield createEvent.result('search', left, `Element Found at Index ${left}`);
        return;
      }
      yield createEvent.compare([left, left], 'lt');

      // Check right pointer
      yield createEvent.highlight([7]);
      yield createEvent.pointer(
        [
          { index: left, label: 'left', color: 'var(--color-primary-500)' },
          { index: right, label: 'right', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'left', value: left },
          { name: 'arr[left]', value: arr[left] },
          { name: 'right', value: right },
          { name: 'arr[right]', value: arr[right], highlight: true },
          { name: 'target', value: target },
        ],
        `arr[${right}] == ${target} ?`
      );

      comparisons++;
      if (arr[right] === target) {
        yield createEvent.compare([right, right], 'eq');
        yield createEvent.highlight([8]);
        yield createEvent.unmark([left]);
        yield createEvent.mark([right], 'sorted');
        yield createEvent.pointer(
          [{ index: right, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'index', value: right },
            { name: 'arr[right]', value: arr[right], highlight: true },
            { name: 'target', value: target, highlight: true },
          ],
          `${arr[right]} == ${target} ✓`
        );
        yield createEvent.message(
          `Found ${target} at index ${right} (from right)!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons}`,
          'explanation'
        );
        yield createEvent.result('search', right, `Element Found at Index ${right}`);
        return;
      }
      yield createEvent.compare([right, right], 'lt');

      yield createEvent.message(
        `arr[${left}]=${arr[left]} and arr[${right}]=${arr[right]} ≠ ${target}`,
        'explanation'
      );

      // Move pointers
      yield createEvent.highlight([10, 11]);
      yield createEvent.unmark([left]);
      yield createEvent.unmark([right]);
      left++;
      right--;
    }

    yield createEvent.highlight([13]);
    yield createEvent.pointer([], []);
    yield createEvent.message(
      `${target} not found in the array`,
      'info'
    );
    yield createEvent.message(
      `Total comparisons: ${comparisons}`,
      'explanation'
    );
    yield createEvent.result('search', -1, 'Element Not Present');
  },
};
