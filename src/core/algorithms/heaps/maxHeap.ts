import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, HeapNode } from '../../events/events';

/**
 * Max Heap Operations
 * 
 * Time Complexity:
 *   - Insert: O(log n)
 *   - Extract Max: O(log n)
 *   - Peek: O(1)
 *   - Build Heap: O(n)
 * 
 * Space Complexity: O(n)
 */
export const maxHeap: IAlgorithm<ArrayInput> = {
  id: 'max-heap',
  name: 'Max Heap',
  category: 'heaps',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'class MaxHeap:',
    '  heap = []',
    '',
    '  function insert(value):',
    '    heap.append(value)',
    '    bubbleUp(len(heap) - 1)',
    '',
    '  function bubbleUp(index):',
    '    while index > 0:',
    '      parent = (index - 1) // 2',
    '      if heap[index] > heap[parent]:',
    '        swap(heap[index], heap[parent])',
    '        index = parent',
    '      else: break',
    '',
    '  function extractMax():',
    '    if isEmpty(): return null',
    '    max = heap[0]',
    '    heap[0] = heap[len(heap) - 1]',
    '    heap.pop()',
    '    bubbleDown(0)',
    '    return max',
    '',
    '  function bubbleDown(index):',
    '    while hasChildren(index):',
    '      largest = getLargestChild(index)',
    '      if heap[index] < heap[largest]:',
    '        swap(heap[index], heap[largest])',
    '        index = largest',
    '      else: break',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'build',
      options: [
        { value: 'build', label: 'Build Heap' },
        { value: 'insert', label: 'Insert Elements' },
        { value: 'extract', label: 'Extract Max (repeatedly)' },
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
    const operation = (params?.operation as string) || 'build';
    const values = [...input.values];

    // Helper to create heap tree visualization
    const getHeapNodes = (
      heap: number[],
      heapSize: number,
      highlightIdx?: number,
      removingIdx?: number,
      swapWithValue?: number,
      reason?: string
    ): HeapNode[] => {
      return heap.map((value, index) => ({
        value,
        index,
        highlight: index === highlightIdx,
        isRemoving: index === removingIdx,
        swapWith: index === removingIdx ? swapWithValue : undefined,
        reason: index === removingIdx ? reason : undefined,
        left: 2 * index + 1 < heapSize ? 2 * index + 1 : undefined,
        right: 2 * index + 2 < heapSize ? 2 * index + 2 : undefined,
      }));
    };

    if (operation === 'build') {
      yield* buildMaxHeap(values, getHeapNodes);
    } else if (operation === 'insert') {
      yield* insertElements(values, getHeapNodes);
    } else {
      yield* extractMaxRepeatedly(values, getHeapNodes);
    }
  },
};

function* buildMaxHeap(
  arr: number[],
  getHeapNodes: (heap: number[], heapSize: number, highlightIdx?: number) => HeapNode[]
): Generator<AlgoEvent, void, unknown> {
  const heap = [...arr];
  const n = heap.length;

  yield createEvent.message(`Building Max Heap from array: [${arr.join(', ')}]`);
  yield createEvent.highlight([0, 1]);

  yield createEvent.auxiliary({
    type: 'heap',
    phase: 'Initial Array',
    heap: { nodes: getHeapNodes(heap, n), heapSize: n },
  });

  yield createEvent.message('Using bottom-up heapify - start from last non-leaf node');
  yield createEvent.highlight([23, 24]);

  // Bottom-up heapify - O(n) approach
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield createEvent.message(`Heapifying at index ${i} (value: ${heap[i]})`);
    yield createEvent.auxiliary({
      type: 'heap',
      phase: `Heapify at index ${i}`,
      heap: { nodes: getHeapNodes(heap, n, i), heapSize: n },
    });

    yield* bubbleDown(heap, n, i, getHeapNodes);
  }

  yield createEvent.message('✓ Max Heap built successfully!');
  yield createEvent.highlight([0, 1]);
  yield createEvent.auxiliary({
    type: 'heap',
    phase: 'Max Heap Complete',
    heap: { nodes: getHeapNodes(heap, n), heapSize: n },
  });

  yield createEvent.result('indices', heap, 'Max Heap');
}

function* insertElements(
  values: number[],
  getHeapNodes: (heap: number[], heapSize: number, highlightIdx?: number) => HeapNode[]
): Generator<AlgoEvent, void, unknown> {
  const heap: number[] = [];

  yield createEvent.message(`Inserting elements one by one: [${values.join(', ')}]`);
  yield createEvent.highlight([3, 4, 5]);

  for (const value of values) {
    yield createEvent.message(`Inserting ${value}`);
    heap.push(value);
    const insertIdx = heap.length - 1;

    yield createEvent.auxiliary({
      type: 'heap',
      phase: `Inserted ${value} at index ${insertIdx}`,
      heap: { nodes: getHeapNodes(heap, heap.length, insertIdx), heapSize: heap.length },
    });

    yield createEvent.highlight([4, 5]);

    // Bubble up
    yield* bubbleUp(heap, insertIdx, getHeapNodes);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: `After inserting ${value}`,
      heap: { nodes: getHeapNodes(heap, heap.length), heapSize: heap.length },
    });
  }

  yield createEvent.message(`✓ All elements inserted! Max Heap: [${heap.join(', ')}]`);
  yield createEvent.result('indices', heap, 'Max Heap');
}

function* extractMaxRepeatedly(
  values: number[],
  getHeapNodes: (heap: number[], heapSize: number, highlightIdx?: number, removingIdx?: number, swapWith?: number, reason?: string) => HeapNode[]
): Generator<AlgoEvent, void, unknown> {
  // First build the heap
  const heap = [...values];
  const n = heap.length;

  yield createEvent.message('First, building Max Heap...');

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* bubbleDown(heap, n, i, getHeapNodes);
  }

  yield createEvent.auxiliary({
    type: 'heap',
    phase: 'Max Heap Built',
    heap: { nodes: getHeapNodes(heap, n), heapSize: n },
  });

  // Now extract max repeatedly
  yield createEvent.message('Now extracting max elements one by one...');
  yield createEvent.highlight([15, 16, 17, 18, 19, 20, 21]);

  const extracted: number[] = [];
  let heapSize = n;

  while (heapSize > 0) {
    const maxValue = heap[0];
    extracted.push(maxValue);

    yield createEvent.message(`🔴 Extracting max: ${maxValue}`);
    yield createEvent.highlight([16, 17]);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: `Extracting ${maxValue}`,
      heap: {
        nodes: getHeapNodes(heap, heapSize, undefined, 0, heap[heapSize - 1], `Swap with last element ${heap[heapSize - 1]}`),
        heapSize
      },
    });

    // Swap with last and reduce heap size
    heap[0] = heap[heapSize - 1];
    heapSize--;

    yield createEvent.highlight([18, 19, 20]);

    if (heapSize > 0) {
      yield createEvent.auxiliary({
        type: 'heap',
        phase: `Heapifying after removal`,
        heap: { nodes: getHeapNodes(heap, heapSize, 0), heapSize },
      });

      yield* bubbleDown(heap, heapSize, 0, getHeapNodes);
    }

    yield createEvent.message(`✓ Extracted: [${extracted.join(', ')}]`);
  }

  yield createEvent.message(`✓ All elements extracted in descending order: [${extracted.join(', ')}]`);
  yield createEvent.auxiliary({
    type: 'heap',
    phase: 'Complete',
    heap: { nodes: [], heapSize: 0 },
  });
  yield createEvent.result('indices', extracted, 'Extracted Elements');
}

function* bubbleUp(
  heap: number[],
  index: number,
  getHeapNodes: (heap: number[], heapSize: number, highlightIdx?: number) => HeapNode[]
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([7, 8, 9, 10, 11, 12, 13]);

  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);

    yield createEvent.pointer(
      [
        { index, label: 'current', color: 'var(--color-accent-current)' },
        { index: parent, label: 'parent', color: 'var(--color-accent-compare)' },
      ],
      [
        { name: 'current', value: heap[index], highlight: true },
        { name: 'parent', value: heap[parent], highlight: true },
      ],
      `Compare: ${heap[index]} > ${heap[parent]}?`
    );

    yield createEvent.compare([index, parent]);

    if (heap[index] > heap[parent]) {
      yield createEvent.message(`Swapping ${heap[index]} with parent ${heap[parent]}`);
      yield createEvent.swap([index, parent]);

      const temp = heap[index];
      heap[index] = heap[parent];
      heap[parent] = temp;

      yield createEvent.auxiliary({
        type: 'heap',
        phase: 'Bubble Up',
        heap: { nodes: getHeapNodes(heap, heap.length, parent), heapSize: heap.length },
      });

      index = parent;
    } else {
      yield createEvent.message(`${heap[index]} ≤ ${heap[parent]}, heap property satisfied`);
      break;
    }
  }

  yield createEvent.pointer([], [], '');
}

function* bubbleDown(
  heap: number[],
  heapSize: number,
  index: number,
  getHeapNodes: (heap: number[], heapSize: number, highlightIdx?: number) => HeapNode[]
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.highlight([23, 24, 25, 26, 27, 28, 29]);

  while (true) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (left < heapSize) {
      yield createEvent.compare([left, largest]);
      if (heap[left] > heap[largest]) {
        largest = left;
      }
    }

    if (right < heapSize) {
      yield createEvent.compare([right, largest]);
      if (heap[right] > heap[largest]) {
        largest = right;
      }
    }

    if (largest !== index) {
      yield createEvent.pointer(
        [
          { index, label: 'parent', color: 'var(--color-accent-compare)' },
          { index: largest, label: 'largest', color: 'var(--color-accent-swap)' },
        ],
        [
          { name: 'parent', value: heap[index], highlight: false },
          { name: 'largest', value: heap[largest], highlight: true },
        ],
        `Swapping ${heap[index]} with ${heap[largest]}`
      );

      yield createEvent.swap([index, largest]);
      const temp = heap[index];
      heap[index] = heap[largest];
      heap[largest] = temp;

      yield createEvent.auxiliary({
        type: 'heap',
        phase: 'Bubble Down',
        heap: { nodes: getHeapNodes(heap, heapSize, largest), heapSize },
      });

      index = largest;
    } else {
      yield createEvent.message(`Heap property satisfied at index ${index}`);
      break;
    }
  }

  yield createEvent.pointer([], [], '');
}
