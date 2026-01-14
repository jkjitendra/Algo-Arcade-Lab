import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, HeapNode } from '../../events/events';

/**
 * Median of Stream using Two Heaps
 * 
 * Maintain running median using:
 * - Max-heap for the smaller half (left side)
 * - Min-heap for the larger half (right side)
 * 
 * Time Complexity: O(log n) per insertion, O(1) to find median
 * Space Complexity: O(n)
 */
export const medianOfStream: IAlgorithm<ArrayInput> = {
  id: 'median-of-stream',
  name: 'Median of Stream',
  category: 'heaps',
  difficulty: 'advanced',

  pseudocodeLines: [
    'class MedianFinder:',
    '  maxHeap = []  // Left half (smaller values)',
    '  minHeap = []  // Right half (larger values)',
    '',
    '  function addNum(num):',
    '    // Always add to maxHeap first',
    '    maxHeap.insert(num)',
    '',
    '    // Move max of left to right',
    '    minHeap.insert(maxHeap.extractMax())',
    '',
    '    // Balance: maxHeap can have at most 1 more',
    '    if len(minHeap) > len(maxHeap):',
    '      maxHeap.insert(minHeap.extractMin())',
    '',
    '  function findMedian():',
    '    if len(maxHeap) > len(minHeap):',
    '      return maxHeap.peek()  // Odd count',
    '    else:',
    '      return (maxHeap.peek() + minHeap.peek()) / 2',
  ],

  timeComplexity: {
    best: 'O(log n)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },

  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const stream = [...input.values];

    yield createEvent.message(`Finding running median for stream: [${stream.join(', ')}]`);
    yield createEvent.highlight([0, 1, 2]);
    yield createEvent.message('Using two heaps: Max-Heap (left) and Min-Heap (right)');

    // Max-heap for smaller half (stores negated values for simulation)
    const maxHeap: number[] = [];  // Left half - smaller values
    // Min-heap for larger half
    const minHeap: number[] = [];  // Right half - larger values

    const getMaxHeapNodes = (heap: number[]): HeapNode[] => {
      return heap.map((value, index) => ({
        value,
        index,
        left: 2 * index + 1 < heap.length ? 2 * index + 1 : undefined,
        right: 2 * index + 2 < heap.length ? 2 * index + 2 : undefined,
      }));
    };

    const getMinHeapNodes = (heap: number[]): HeapNode[] => {
      return heap.map((value, index) => ({
        value,
        index,
        left: 2 * index + 1 < heap.length ? 2 * index + 1 : undefined,
        right: 2 * index + 2 < heap.length ? 2 * index + 2 : undefined,
      }));
    };

    const medians: number[] = [];

    for (let i = 0; i < stream.length; i++) {
      const num = stream[i];

      yield createEvent.mark([i], 'current');
      yield createEvent.message(`📍 Processing ${num} (element ${i + 1})`);
      yield createEvent.highlight([4, 5, 6]);

      // Step 1: Add to maxHeap (left half)
      yield createEvent.message(`Step 1: Insert ${num} into Max-Heap (left)`);
      maxHeapInsert(maxHeap, num);

      yield createEvent.auxiliary({
        type: 'heap',
        phase: `Added ${num} to Left (Max-Heap)`,
        heap: { nodes: getMaxHeapNodes(maxHeap), heapSize: maxHeap.length },
      });

      // Step 2: Move max of left to right
      yield createEvent.highlight([8, 9]);
      const maxOfLeft = maxHeapExtract(maxHeap);
      yield createEvent.message(`Step 2: Move max (${maxOfLeft}) from left to right`);
      minHeapInsert(minHeap, maxOfLeft);

      yield createEvent.auxiliary({
        type: 'heap',
        phase: `Moved ${maxOfLeft} to Right (Min-Heap)`,
        heap: { nodes: getMinHeapNodes(minHeap), heapSize: minHeap.length },
      });

      // Step 3: Balance - maxHeap can have at most 1 more element
      yield createEvent.highlight([11, 12, 13]);
      if (minHeap.length > maxHeap.length) {
        const minOfRight = minHeapExtract(minHeap);
        yield createEvent.message(`Step 3: Rebalance - move ${minOfRight} back to left`);
        maxHeapInsert(maxHeap, minOfRight);
      } else {
        yield createEvent.message('Step 3: Heaps balanced (left ≥ right)');
      }

      // Calculate median
      yield createEvent.highlight([15, 16, 17, 18, 19]);
      let median: number;
      if (maxHeap.length > minHeap.length) {
        median = maxHeap[0];
        yield createEvent.message(`Odd count: median = maxHeap.peek() = ${median}`);
      } else {
        median = (maxHeap[0] + minHeap[0]) / 2;
        yield createEvent.message(`Even count: median = (${maxHeap[0]} + ${minHeap[0]}) / 2 = ${median}`);
      }

      medians.push(median);

      yield createEvent.unmark([i]);

      // Show both heaps state
      yield createEvent.pointer(
        [],
        [
          { name: 'elements', value: i + 1, highlight: false },
          { name: 'left size', value: maxHeap.length, highlight: false },
          { name: 'right size', value: minHeap.length, highlight: false },
          { name: 'median', value: median, highlight: true },
        ],
        `After ${i + 1} elements: median = ${median}`
      );

      yield createEvent.message(`Left (Max-Heap): [${maxHeap.join(', ')}]`);
      yield createEvent.message(`Right (Min-Heap): [${minHeap.join(', ')}]`);
      yield createEvent.message(`Running medians: [${medians.join(', ')}]`);
      yield createEvent.message('─'.repeat(40));
    }

    const finalMedian = medians[medians.length - 1];
    yield createEvent.message(`✓ Final median: ${finalMedian}`);
    yield createEvent.message(`All running medians: [${medians.join(', ')}]`);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: `Complete - Final median: ${finalMedian}`,
      heap: { nodes: getMaxHeapNodes(maxHeap), heapSize: maxHeap.length },
    });

    yield createEvent.pointer([], [], '');
    yield createEvent.result('search', finalMedian, 'Final Median');
  },
};

// Max-heap operations
function maxHeapInsert(heap: number[], value: number): void {
  heap.push(value);
  let index = heap.length - 1;
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (heap[index] > heap[parent]) {
      const temp = heap[index];
      heap[index] = heap[parent];
      heap[parent] = temp;
      index = parent;
    } else {
      break;
    }
  }
}

function maxHeapExtract(heap: number[]): number {
  const max = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();

  let index = 0;
  while (true) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (left < heap.length && heap[left] > heap[largest]) {
      largest = left;
    }
    if (right < heap.length && heap[right] > heap[largest]) {
      largest = right;
    }

    if (largest !== index) {
      const temp = heap[index];
      heap[index] = heap[largest];
      heap[largest] = temp;
      index = largest;
    } else {
      break;
    }
  }

  return max;
}

// Min-heap operations
function minHeapInsert(heap: number[], value: number): void {
  heap.push(value);
  let index = heap.length - 1;
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (heap[index] < heap[parent]) {
      const temp = heap[index];
      heap[index] = heap[parent];
      heap[parent] = temp;
      index = parent;
    } else {
      break;
    }
  }
}

function minHeapExtract(heap: number[]): number {
  const min = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();

  let index = 0;
  while (true) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < heap.length && heap[left] < heap[smallest]) {
      smallest = left;
    }
    if (right < heap.length && heap[right] < heap[smallest]) {
      smallest = right;
    }

    if (smallest !== index) {
      const temp = heap[index];
      heap[index] = heap[smallest];
      heap[smallest] = temp;
      index = smallest;
    } else {
      break;
    }
  }

  return min;
}
