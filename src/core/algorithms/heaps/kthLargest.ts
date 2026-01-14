import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, HeapNode } from '../../events/events';

/**
 * K-th Largest Element using Min Heap
 * 
 * Maintain a min-heap of size k containing the k largest elements seen.
 * The root of this heap is the k-th largest element.
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */
export const kthLargest: IAlgorithm<ArrayInput> = {
  id: 'kth-largest',
  name: 'K-th Largest Element',
  category: 'heaps',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function findKthLargest(array, k):',
    '  minHeap = []  // Size limited to k',
    '',
    '  for each element in array:',
    '    if len(minHeap) < k:',
    '      insert element into minHeap',
    '    else if element > minHeap.peek():',
    '      // Element is larger than k-th largest',
    '      minHeap.extractMin()',
    '      minHeap.insert(element)',
    '',
    '  // Root of minHeap is k-th largest',
    '  return minHeap.peek()',
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
      label: 'K (find k-th largest)',
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

    yield createEvent.message(`Finding ${k}-th largest element in [${arr.join(', ')}]`);
    yield createEvent.highlight([0, 1]);
    yield createEvent.message(`Strategy: Maintain min-heap of size ${k}`);
    yield createEvent.message(`The root will always be the ${k}-th largest among elements seen`);

    const minHeap: number[] = [];

    // Process each element
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      yield createEvent.mark([i], 'current');
      yield createEvent.message(`Processing element ${element} (index ${i})`);
      yield createEvent.highlight([3, 4, 5]);

      if (minHeap.length < k) {
        // Heap not full, just insert
        yield createEvent.message(`Heap size (${minHeap.length}) < k (${k}), inserting ${element}`);
        yield createEvent.highlight([4, 5]);

        minHeap.push(element);
        yield* bubbleUp(minHeap, minHeap.length - 1);

        yield createEvent.auxiliary({
          type: 'heap',
          phase: `Inserted ${element} (heap size: ${minHeap.length}/${k})`,
          heap: { nodes: getHeapNodes(minHeap, minHeap.length), heapSize: minHeap.length },
        });

      } else if (element > minHeap[0]) {
        // Element is larger than current k-th largest
        yield createEvent.message(`${element} > ${minHeap[0]} (current ${k}-th largest)`);
        yield createEvent.highlight([6, 7, 8, 9]);
        yield createEvent.message(`Replace ${minHeap[0]} with ${element}`);

        yield createEvent.auxiliary({
          type: 'heap',
          phase: `Removing ${minHeap[0]}, adding ${element}`,
          heap: { nodes: getHeapNodes(minHeap, minHeap.length, 0), heapSize: minHeap.length },
        });

        // Replace root with new element and heapify
        minHeap[0] = element;
        yield* bubbleDown(minHeap, minHeap.length, 0);

        yield createEvent.auxiliary({
          type: 'heap',
          phase: `After replacement`,
          heap: { nodes: getHeapNodes(minHeap, minHeap.length), heapSize: minHeap.length },
        });

      } else {
        yield createEvent.message(`${element} ≤ ${minHeap[0]} (${k}-th largest), skipping`);
      }

      yield createEvent.unmark([i]);

      yield createEvent.pointer(
        [],
        [
          { name: 'processed', value: i + 1, highlight: false },
          { name: `${k}-th largest`, value: minHeap[0], highlight: true },
        ],
        `After ${i + 1} elements, ${k}-th largest = ${minHeap[0]}`
      );
    }

    yield createEvent.highlight([11, 12]);
    yield createEvent.message(`✓ The ${k}-th largest element is ${minHeap[0]}`);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: `Complete - ${k}-th largest: ${minHeap[0]}`,
      heap: { nodes: getHeapNodes(minHeap, minHeap.length, 0), heapSize: minHeap.length },
    });

    // Show the sorted largest k elements
    const sortedK = [...minHeap].sort((a, b) => b - a);
    yield createEvent.message(`Top ${k} elements: [${sortedK.join(', ')}]`);

    yield createEvent.pointer([], [], '');
    yield createEvent.result('search', minHeap[0], `${k}-th Largest`);
  },
};

// Min-heap bubble up
function* bubbleUp(heap: number[], index: number): Generator<AlgoEvent, void, unknown> {
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

// Min-heap bubble down
function* bubbleDown(heap: number[], heapSize: number, index: number): Generator<AlgoEvent, void, unknown> {
  while (true) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < heapSize && heap[left] < heap[smallest]) {
      smallest = left;
    }
    if (right < heapSize && heap[right] < heap[smallest]) {
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
}
