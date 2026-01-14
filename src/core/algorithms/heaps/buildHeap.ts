import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, HeapNode } from '../../events/events';

/**
 * Build Heap Algorithm
 * 
 * Converts an array to a heap using bottom-up heapify.
 * 
 * Time Complexity: O(n) - not O(n log n)!
 * Space Complexity: O(1) in-place
 */
export const buildHeap: IAlgorithm<ArrayInput> = {
  id: 'build-heap',
  name: 'Build Heap',
  category: 'heaps',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function buildHeap(array, type):',
    '  n = len(array)',
    '',
    '  // Start from the last non-leaf node',
    '  // Last non-leaf is at index (n/2 - 1)',
    '  for i = n/2 - 1 down to 0:',
    '    heapify(array, n, i)',
    '',
    'function heapify(array, n, i):',
    '  // For max-heap: largest = root',
    '  // For min-heap: smallest = root',
    '  target = i',
    '  left = 2 * i + 1',
    '  right = 2 * i + 2',
    '',
    '  // Compare with children',
    '  if left < n and shouldSwap(array[left], array[target]):',
    '    target = left',
    '  if right < n and shouldSwap(array[right], array[target]):',
    '    target = right',
    '',
    '  // If target changed, swap and recurse',
    '  if target != i:',
    '    swap(array[i], array[target])',
    '    heapify(array, n, target)',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'select',
      id: 'heapType',
      label: 'Heap Type',
      default: 'max',
      options: [
        { value: 'max', label: 'Max Heap' },
        { value: 'min', label: 'Min Heap' },
      ],
    },
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 31) {
      return { ok: false, error: 'Array size must be 31 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const heapType = (params?.heapType as string) || 'max';
    const isMaxHeap = heapType === 'max';
    const heap = [...input.values];
    const n = heap.length;

    const getHeapNodes = (
      arr: number[],
      heapSize: number,
      highlightIdx?: number,
      comparingIdx?: number
    ): HeapNode[] => {
      return arr.map((value, index) => ({
        value,
        index,
        highlight: index === highlightIdx || index === comparingIdx,
        left: 2 * index + 1 < heapSize ? 2 * index + 1 : undefined,
        right: 2 * index + 2 < heapSize ? 2 * index + 2 : undefined,
      }));
    };

    yield createEvent.message(`Building ${isMaxHeap ? 'Max' : 'Min'} Heap from array: [${heap.join(', ')}]`);
    yield createEvent.highlight([0, 1]);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: 'Initial Array (Not a Heap)',
      heap: { nodes: getHeapNodes(heap, n), heapSize: n },
    });

    // Explain the algorithm complexity
    yield createEvent.message('💡 Build Heap is O(n), not O(n log n)!');
    yield createEvent.message('Most nodes are near the bottom and need little work.');
    yield createEvent.highlight([3, 4, 5]);

    const lastNonLeaf = Math.floor(n / 2) - 1;
    yield createEvent.message(`Last non-leaf node is at index ${lastNonLeaf}`);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: `Starting at index ${lastNonLeaf}`,
      heap: { nodes: getHeapNodes(heap, n, lastNonLeaf), heapSize: n },
    });

    // Track statistics
    let swapCount = 0;
    let compareCount = 0;

    // Bottom-up heapify
    for (let i = lastNonLeaf; i >= 0; i--) {
      yield createEvent.message(`📍 Heapifying at index ${i} (value: ${heap[i]})`);
      yield createEvent.highlight([5, 6]);

      yield createEvent.auxiliary({
        type: 'heap',
        phase: `Heapify at index ${i}`,
        heap: { nodes: getHeapNodes(heap, n, i), heapSize: n },
      });

      // Heapify at this position
      let currentIdx = i;

      while (true) {
        const left = 2 * currentIdx + 1;
        const right = 2 * currentIdx + 2;
        let target = currentIdx;

        yield createEvent.highlight([8, 9, 10, 11, 12, 13]);

        yield createEvent.pointer(
          [{ index: currentIdx, label: 'parent', color: 'var(--color-accent-current)' }],
          [
            { name: 'left child', value: left < n ? heap[left] : 'none', highlight: false },
            { name: 'right child', value: right < n ? heap[right] : 'none', highlight: false },
          ],
          `Checking children of ${heap[currentIdx]}`
        );

        // Compare with left child
        if (left < n) {
          compareCount++;
          yield createEvent.compare([left, target]);
          yield createEvent.highlight([15, 16]);

          const shouldSwap = isMaxHeap ? heap[left] > heap[target] : heap[left] < heap[target];
          if (shouldSwap) {
            target = left;
          }
        }

        // Compare with right child
        if (right < n) {
          compareCount++;
          yield createEvent.compare([right, target]);
          yield createEvent.highlight([17, 18]);

          const shouldSwap = isMaxHeap ? heap[right] > heap[target] : heap[right] < heap[target];
          if (shouldSwap) {
            target = right;
          }
        }

        if (target !== currentIdx) {
          yield createEvent.highlight([21, 22, 23]);
          swapCount++;

          yield createEvent.pointer(
            [
              { index: currentIdx, label: 'parent', color: 'var(--color-accent-compare)' },
              { index: target, label: isMaxHeap ? 'larger' : 'smaller', color: 'var(--color-accent-swap)' },
            ],
            [
              { name: 'parent', value: heap[currentIdx], highlight: false },
              { name: isMaxHeap ? 'larger child' : 'smaller child', value: heap[target], highlight: true },
            ],
            `Swapping ${heap[currentIdx]} with ${heap[target]}`
          );

          yield createEvent.swap([currentIdx, target]);

          const temp = heap[currentIdx];
          heap[currentIdx] = heap[target];
          heap[target] = temp;

          yield createEvent.auxiliary({
            type: 'heap',
            phase: `After swap`,
            heap: { nodes: getHeapNodes(heap, n, target), heapSize: n },
          });

          currentIdx = target;
        } else {
          yield createEvent.message(`Heap property satisfied at index ${currentIdx}`);
          break;
        }
      }
    }

    yield createEvent.pointer([], [], '');
    yield createEvent.message(`✓ ${isMaxHeap ? 'Max' : 'Min'} Heap built successfully!`);
    yield createEvent.message(`📊 Stats: ${compareCount} comparisons, ${swapCount} swaps`);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: `${isMaxHeap ? 'Max' : 'Min'} Heap Complete`,
      heap: { nodes: getHeapNodes(heap, n), heapSize: n },
    });

    yield createEvent.result('indices', heap, `${isMaxHeap ? 'Max' : 'Min'} Heap`);
  },
};
