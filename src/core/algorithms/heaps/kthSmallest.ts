import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, HeapNode } from '../../events/events';

/**
 * K-th Smallest Element using Max Heap
 * 
 * Maintain a max-heap of size k containing the k smallest elements seen.
 * The root of this heap is the k-th smallest element.
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */
export const kthSmallest: IAlgorithm<ArrayInput> = {
  id: 'kth-smallest',
  name: 'K-th Smallest Element',
  category: 'heaps',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function findKthSmallest(array, k):',
    '  maxHeap = []  // Size limited to k',
    '',
    '  for each element in array:',
    '    if len(maxHeap) < k:',
    '      insert element into maxHeap',
    '    else if element < maxHeap.peek():',
    '      // Element is smaller than k-th smallest',
    '      maxHeap.extractMax()',
    '      maxHeap.insert(element)',
    '',
    '  // Root of maxHeap is k-th smallest',
    '  return maxHeap.peek()',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n log k)',
    worst: 'O(n log k)',
  },

  spaceComplexity: 'O(k)',

  parameters: [
    {
      type: 'number',
      id: 'k',
      label: 'K (find k-th smallest)',
      default: 3,
      min: 1,
      max: 10,
    },
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

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const k = Math.min(Number(params?.k) || 3, input.values.length);
    const arr = [...input.values];

    const getHeapNodes = (
      heap: number[],
      heapSize: number,
      highlightIdx?: number
    ): HeapNode[] => {
      return heap.map((value, index) => ({
        value,
        index,
        highlight: index === highlightIdx,
        left: 2 * index + 1 < heapSize ? 2 * index + 1 : undefined,
        right: 2 * index + 2 < heapSize ? 2 * index + 2 : undefined,
      }));
    };

    yield createEvent.message(`Finding ${k}-th smallest element in [${arr.join(', ')}]`);
    yield createEvent.highlight([0, 1]);
    yield createEvent.message(`Strategy: Maintain max-heap of size ${k}`);
    yield createEvent.message(`The root will always be the ${k}-th smallest among elements seen`);

    const maxHeap: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      yield createEvent.mark([i], 'current');
      yield createEvent.message(`Processing element ${element} (index ${i})`);
      yield createEvent.highlight([3, 4, 5]);

      if (maxHeap.length < k) {
        yield createEvent.message(`Heap size (${maxHeap.length}) < k (${k}), inserting ${element}`);
        yield createEvent.highlight([4, 5]);

        maxHeap.push(element);
        yield* bubbleUpMax(maxHeap, maxHeap.length - 1);

        yield createEvent.auxiliary({
          type: 'heap',
          phase: `Inserted ${element} (heap size: ${maxHeap.length}/${k})`,
          heap: { nodes: getHeapNodes(maxHeap, maxHeap.length), heapSize: maxHeap.length },
        });

      } else if (element < maxHeap[0]) {
        yield createEvent.message(`${element} < ${maxHeap[0]} (current ${k}-th smallest)`);
        yield createEvent.highlight([6, 7, 8, 9]);
        yield createEvent.message(`Replace ${maxHeap[0]} with ${element}`);

        yield createEvent.auxiliary({
          type: 'heap',
          phase: `Removing ${maxHeap[0]}, adding ${element}`,
          heap: { nodes: getHeapNodes(maxHeap, maxHeap.length, 0), heapSize: maxHeap.length },
        });

        maxHeap[0] = element;
        yield* bubbleDownMax(maxHeap, maxHeap.length, 0);

        yield createEvent.auxiliary({
          type: 'heap',
          phase: `After replacement`,
          heap: { nodes: getHeapNodes(maxHeap, maxHeap.length), heapSize: maxHeap.length },
        });

      } else {
        yield createEvent.message(`${element} ≥ ${maxHeap[0]} (${k}-th smallest), skipping`);
      }

      yield createEvent.unmark([i]);

      yield createEvent.pointer(
        [],
        [
          { name: 'processed', value: i + 1, highlight: false },
          { name: `${k}-th smallest`, value: maxHeap[0], highlight: true },
        ],
        `After ${i + 1} elements, ${k}-th smallest = ${maxHeap[0]}`
      );
    }

    yield createEvent.highlight([11, 12]);
    yield createEvent.message(`✓ The ${k}-th smallest element is ${maxHeap[0]}`);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: `Complete - ${k}-th smallest: ${maxHeap[0]}`,
      heap: { nodes: getHeapNodes(maxHeap, maxHeap.length, 0), heapSize: maxHeap.length },
    });

    const sortedK = [...maxHeap].sort((a, b) => a - b);
    yield createEvent.message(`Smallest ${k} elements: [${sortedK.join(', ')}]`);

    yield createEvent.pointer([], [], '');
    yield createEvent.result('search', maxHeap[0], `${k}-th Smallest`);
  },
};

// Max-heap bubble up
function* bubbleUpMax(heap: number[], index: number): Generator<AlgoEvent, void, unknown> {
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

// Max-heap bubble down
function* bubbleDownMax(heap: number[], heapSize: number, index: number): Generator<AlgoEvent, void, unknown> {
  while (true) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (left < heapSize && heap[left] > heap[largest]) {
      largest = left;
    }
    if (right < heapSize && heap[right] > heap[largest]) {
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
}
