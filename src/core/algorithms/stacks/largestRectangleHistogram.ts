import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Largest Rectangle in Histogram
 * 
 * Find the largest rectangular area in a histogram
 */
export const largestRectangleHistogram: IAlgorithm<ArrayInput> = {
  id: 'largest-rectangle-histogram',
  name: 'Largest Rectangle in Histogram',
  category: 'stacks',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function largestRectangle(heights):',
    '  n = length(heights)',
    '  stack = empty stack',
    '  maxArea = 0',
    '  for i = 0 to n:',
    '    h = (i == n) ? 0 : heights[i]',
    '    while stack not empty and h < heights[top]:',
    '      height = heights[pop(stack)]',
    '      width = stack.empty ? i : i - top - 1',
    '      area = height * width',
    '      maxArea = max(maxArea, area)',
    '    push(stack, i)',
    '  return maxArea',
  ],

  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Heights array cannot be empty' };
    }
    if (input.values.length > 12) {
      return { ok: false, error: 'Array size must be 12 or less' };
    }
    if (input.values.some(v => v < 0)) {
      return { ok: false, error: 'Heights must be non-negative' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const heights = [...input.values];
    const n = heights.length;
    const stack: number[] = [];
    let maxArea = 0;
    let maxHeight = 0;
    let maxWidth = 0;
    let maxStart = 0;

    yield createEvent.message(`Finding largest rectangle in histogram: [${heights.join(', ')}]`, 'info', 0);
    yield createEvent.highlight([0, 1, 2, 3]);

    yield createEvent.auxiliary({
      type: 'stack',
      stackData: { elements: [], topIndex: -1 },
    });

    for (let i = 0; i <= n; i++) {
      const h = i === n ? 0 : heights[i];

      yield createEvent.highlight([4, 5]);
      if (i < n) {
        yield createEvent.mark([i], 'current');
        yield createEvent.pointer(
          [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
          [
            { name: 'height', value: h, highlight: true },
            { name: 'maxArea', value: maxArea },
          ]
        );
      } else {
        yield createEvent.message(`Processing end sentinel (height = 0)`, 'explanation');
      }

      while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
        yield createEvent.highlight([6, 7, 8, 9, 10]);
        const idx = stack[stack.length - 1];  // Get element without removing
        const height = heights[idx];

        // Calculate left and right boundaries for display
        const leftBound = stack.length <= 1 ? 0 : stack[stack.length - 2] + 1;
        const rightBound = i - 1;
        const popMessage = `Popping bar at index ${idx} (height=${height}). Rectangle extends from index ${leftBound} to ${rightBound}`;

        yield createEvent.message(popMessage, 'step');

        // Show pop animation BEFORE removing element
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: stack.map(idx => heights[idx]),  // Element still in array
            topIndex: stack.length - 1,
            animating: 'pop',
            animatingValue: height,
            message: popMessage,
          },
        });

        // Now remove element
        stack.pop();
        yield createEvent.pop(height, 'stack');

        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        const area = height * width;
        const startIdx = stack.length === 0 ? 0 : stack[stack.length - 1] + 1;
        const endIdx = i - 1;

        yield createEvent.message(`Rectangle: indices [${startIdx}..${endIdx}], height=${height}, width=${width}, area=${height}×${width}=${area}`, 'explanation');

        if (area > maxArea) {
          maxArea = area;
          maxHeight = height;
          maxWidth = width;
          maxStart = startIdx;
          yield createEvent.message(`✨ New max area: ${maxArea} (indices ${maxStart} to ${maxStart + maxWidth - 1})`, 'info');
        }
      }

      yield createEvent.highlight([11]);

      // Show push animation first
      if (i < n) {
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: stack.filter(idx => idx < n).map(idx => heights[idx]),
            topIndex: stack.filter(idx => idx < n).length - 1,
            animating: 'push',
            animatingValue: h,
          },
        });
      }

      stack.push(i);
      if (i < n) {
        yield createEvent.push(h, 'stack');
        yield createEvent.unmark([i]);
      }

      yield createEvent.auxiliary({
        type: 'stack',
        stackData: {
          elements: stack.filter(idx => idx < n).map(idx => heights[idx]),
          topIndex: stack.filter(idx => idx < n).length - 1,
        },
      });
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([12]);

    const maxEnd = maxStart + maxWidth - 1;
    const indicesUsed = Array.from({ length: maxWidth }, (_, i) => maxStart + i).join(', ');
    yield createEvent.message(`Largest rectangle: ${maxHeight} × ${maxWidth} = ${maxArea} using bars at indices [${indicesUsed}]`, 'info');
    yield createEvent.result('search', maxArea, `Maximum Area: ${maxArea} (indices ${maxStart} to ${maxEnd}, height=${maxHeight}, width=${maxWidth})`);
  },
};
