import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, HeapNode } from '../../events/events';

/**
 * Top K Frequent Elements
 * 
 * Find the k most frequent elements using a min-heap.
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(n) for frequency map + O(k) for heap
 */
export const topKFrequent: IAlgorithm<ArrayInput> = {
  id: 'top-k-frequent',
  name: 'Top K Frequent Elements',
  category: 'heaps',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function topKFrequent(array, k):',
    '  // Phase 1: Count frequencies',
    '  freqMap = {}',
    '  for each element in array:',
    '    freqMap[element]++',
    '',
    '  // Phase 2: Use min-heap of size k',
    '  minHeap = []  // (frequency, element)',
    '',
    '  for (element, freq) in freqMap:',
    '    if len(minHeap) < k:',
    '      insert (freq, element) into minHeap',
    '    else if freq > minHeap.peek().freq:',
    '      extractMin()',
    '      insert (freq, element)',
    '',
    '  // Heap contains k most frequent',
    '  return elements from minHeap',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n log k)',
    worst: 'O(n log k)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'number',
      id: 'k',
      label: 'K (top k frequent)',
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
    if (input.values.length > 30) {
      return { ok: false, error: 'Array size must be 30 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const k = Math.min(Number(params?.k) || 3, arr.length);

    yield createEvent.message(`Finding top ${k} most frequent elements in [${arr.join(', ')}]`);
    yield createEvent.highlight([0]);

    // Phase 1: Count frequencies
    yield createEvent.message('📊 Phase 1: Counting frequencies');
    yield createEvent.highlight([1, 2, 3, 4]);

    const freqMap = new Map<number, number>();

    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];
      const newFreq = (freqMap.get(elem) || 0) + 1;
      freqMap.set(elem, newFreq);

      yield createEvent.mark([i], 'current');
      yield createEvent.message(`Element ${elem}: count = ${newFreq}`);
      yield createEvent.unmark([i]);
    }

    // Display frequency table
    const freqEntries = Array.from(freqMap.entries());
    yield createEvent.message('Frequency counts:');
    for (const [elem, freq] of freqEntries) {
      yield createEvent.message(`  ${elem} → ${freq} times`);
    }

    // Phase 2: Use min-heap of size k
    yield createEvent.message(`📊 Phase 2: Building min-heap of size ${k}`);
    yield createEvent.highlight([6, 7, 8, 9, 10, 11, 12, 13]);

    interface HeapEntry {
      element: number;
      frequency: number;
    }

    const minHeap: HeapEntry[] = [];

    const getHeapNodes = (heap: HeapEntry[]): HeapNode[] => {
      return heap.map((entry, index) => ({
        value: entry.element,
        index,
        left: 2 * index + 1 < heap.length ? 2 * index + 1 : undefined,
        right: 2 * index + 2 < heap.length ? 2 * index + 2 : undefined,
      }));
    };

    for (const [element, freq] of freqEntries) {
      yield createEvent.message(`Processing: element=${element}, frequency=${freq}`);

      if (minHeap.length < k) {
        yield createEvent.message(`Heap size < ${k}, inserting (${element}, freq=${freq})`);
        yield createEvent.highlight([10, 11]);

        minHeap.push({ element, frequency: freq });
        heapifyUp(minHeap, minHeap.length - 1);

        yield createEvent.auxiliary({
          type: 'heap',
          phase: `Added ${element} (freq: ${freq})`,
          heap: { nodes: getHeapNodes(minHeap), heapSize: minHeap.length },
        });

      } else if (freq > minHeap[0].frequency) {
        yield createEvent.message(`${freq} > ${minHeap[0].frequency} (min freq in heap)`);
        yield createEvent.highlight([12, 13, 14]);
        yield createEvent.message(`Replacing ${minHeap[0].element} with ${element}`);

        minHeap[0] = { element, frequency: freq };
        heapifyDown(minHeap, 0);

        yield createEvent.auxiliary({
          type: 'heap',
          phase: `Replaced with ${element} (freq: ${freq})`,
          heap: { nodes: getHeapNodes(minHeap), heapSize: minHeap.length },
        });

      } else {
        yield createEvent.message(`${freq} ≤ ${minHeap[0].frequency}, skipping ${element}`);
      }
    }

    // Extract results
    yield createEvent.highlight([16, 17]);
    const result = minHeap.map(e => e.element);
    const resultWithFreq = minHeap.map(e => `${e.element}(${e.frequency})`);

    yield createEvent.message(`✓ Top ${k} frequent elements: [${result.join(', ')}]`);
    yield createEvent.message(`With frequencies: [${resultWithFreq.join(', ')}]`);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: `Complete - Top ${k}: [${result.join(', ')}]`,
      heap: { nodes: getHeapNodes(minHeap), heapSize: minHeap.length },
    });

    yield createEvent.result('indices', result, `Top ${k} Frequent`);
  },
};

function heapifyUp(heap: { frequency: number }[], index: number): void {
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (heap[index].frequency < heap[parent].frequency) {
      const temp = heap[index];
      heap[index] = heap[parent];
      heap[parent] = temp;
      index = parent;
    } else {
      break;
    }
  }
}

function heapifyDown(heap: { frequency: number }[], index: number): void {
  const n = heap.length;
  while (true) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < n && heap[left].frequency < heap[smallest].frequency) {
      smallest = left;
    }
    if (right < n && heap[right].frequency < heap[smallest].frequency) {
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
