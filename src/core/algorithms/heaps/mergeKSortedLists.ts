import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, HeapNode } from '../../events/events';

/**
 * Merge K Sorted Lists using Min Heap
 * 
 * Use a min-heap to efficiently merge k sorted lists.
 * Each heap node contains: value, list index, element index within list.
 * 
 * Time Complexity: O(N log k) where N = total elements
 * Space Complexity: O(k) for the heap
 */
export const mergeKSortedLists: IAlgorithm<ArrayInput> = {
  id: 'merge-k-sorted-lists',
  name: 'Merge K Sorted Lists',
  category: 'heaps',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function mergeKLists(lists):',
    '  minHeap = []',
    '  result = []',
    '',
    '  // Insert first element from each list',
    '  for i = 0 to k-1:',
    '    if lists[i] is not empty:',
    '      insert (lists[i][0], i, 0) into minHeap',
    '',
    '  // Extract min and insert next from same list',
    '  while minHeap is not empty:',
    '    (value, listIdx, elemIdx) = extractMin()',
    '    result.append(value)',
    '',
    '    // Insert next element from same list',
    '    if elemIdx + 1 < len(lists[listIdx]):',
    '      insert (lists[listIdx][elemIdx+1], listIdx, elemIdx+1)',
    '',
    '  return result',
  ],

  timeComplexity: {
    best: 'O(N log k)',
    average: 'O(N log k)',
    worst: 'O(N log k)',
  },

  spaceComplexity: 'O(k)',

  parameters: [
    {
      type: 'number',
      id: 'numLists',
      label: 'Number of Lists',
      default: 3,
      min: 2,
      max: 5,
    },
    {
      type: 'number',
      id: 'listSize',
      label: 'Elements per List',
      default: 4,
      min: 2,
      max: 6,
    },
  ],

  validate(input: ArrayInput) {
    // We'll generate our own sorted lists from the input
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 4) {
      return { ok: false, error: 'Need at least 4 numbers to create lists' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const numLists = Number(params?.numLists) || 3;
    const listSize = Number(params?.listSize) || 4;

    // Create k sorted lists from input
    const allValues = [...input.values];
    const lists: number[][] = [];

    for (let i = 0; i < numLists; i++) {
      const listValues: number[] = [];
      for (let j = 0; j < listSize && allValues.length > 0; j++) {
        listValues.push(allValues.shift()!);
      }
      if (listValues.length > 0) {
        listValues.sort((a, b) => a - b);
        lists.push(listValues);
      }
    }

    // If we still have values, add them to existing lists
    let listIdx = 0;
    while (allValues.length > 0) {
      lists[listIdx % lists.length].push(allValues.shift()!);
      listIdx++;
    }

    // Re-sort lists after adding extra elements
    lists.forEach(list => list.sort((a, b) => a - b));

    const k = lists.length;

    interface HeapEntry {
      value: number;
      listIdx: number;
      elemIdx: number;
    }

    const getHeapNodes = (heap: HeapEntry[]): HeapNode[] => {
      return heap.map((entry, index) => ({
        value: entry.value,
        index,
        left: 2 * index + 1 < heap.length ? 2 * index + 1 : undefined,
        right: 2 * index + 2 < heap.length ? 2 * index + 2 : undefined,
      }));
    };

    yield createEvent.message(`Merging ${k} sorted lists using Min Heap`);
    yield createEvent.highlight([0, 1, 2]);

    // Display the lists
    for (let i = 0; i < k; i++) {
      yield createEvent.message(`List ${i + 1}: [${lists[i].join(', ')}]`);
    }

    const minHeap: HeapEntry[] = [];
    const result: number[] = [];

    // Insert first element from each list
    yield createEvent.message('Inserting first element from each list into heap');
    yield createEvent.highlight([5, 6, 7]);

    for (let i = 0; i < k; i++) {
      if (lists[i].length > 0) {
        const entry: HeapEntry = { value: lists[i][0], listIdx: i, elemIdx: 0 };
        minHeap.push(entry);
        heapifyUp(minHeap, minHeap.length - 1);

        yield createEvent.auxiliary({
          type: 'heap',
          phase: `Added ${entry.value} from List ${i + 1}`,
          heap: { nodes: getHeapNodes(minHeap), heapSize: minHeap.length },
        });
      }
    }

    yield createEvent.message(`Heap initialized with ${minHeap.length} elements`);

    // Main merge loop
    yield createEvent.highlight([10, 11, 12, 13]);

    while (minHeap.length > 0) {
      // Extract min
      const min = minHeap[0];

      yield createEvent.auxiliary({
        type: 'heap',
        phase: `Extracting min: ${min.value} from List ${min.listIdx + 1}`,
        heap: { nodes: getHeapNodes(minHeap), heapSize: minHeap.length },
      });

      yield createEvent.message(`Extracted ${min.value} from List ${min.listIdx + 1}`);
      yield createEvent.highlight([11, 12]);

      result.push(min.value);

      // Replace root with last element
      minHeap[0] = minHeap[minHeap.length - 1];
      minHeap.pop();

      if (minHeap.length > 0) {
        heapifyDown(minHeap, 0);
      }

      // Insert next element from the same list
      const nextElemIdx = min.elemIdx + 1;
      if (nextElemIdx < lists[min.listIdx].length) {
        const nextEntry: HeapEntry = {
          value: lists[min.listIdx][nextElemIdx],
          listIdx: min.listIdx,
          elemIdx: nextElemIdx,
        };

        minHeap.push(nextEntry);
        heapifyUp(minHeap, minHeap.length - 1);

        yield createEvent.message(`Inserted next element ${nextEntry.value} from List ${min.listIdx + 1}`);
        yield createEvent.highlight([15, 16]);
      } else {
        yield createEvent.message(`List ${min.listIdx + 1} exhausted`);
      }

      yield createEvent.auxiliary({
        type: 'heap',
        phase: `Merged so far: [${result.join(', ')}]`,
        heap: { nodes: getHeapNodes(minHeap), heapSize: minHeap.length },
      });

      yield createEvent.pointer(
        [],
        [
          { name: 'merged count', value: result.length, highlight: false },
          { name: 'heap size', value: minHeap.length, highlight: false },
        ],
        `Progress: ${result.length} elements merged`
      );
    }

    yield createEvent.highlight([18]);
    yield createEvent.message(`✓ All ${result.length} elements merged!`);
    yield createEvent.message(`Result: [${result.join(', ')}]`);

    yield createEvent.auxiliary({
      type: 'heap',
      phase: 'Complete',
      heap: { nodes: [], heapSize: 0 },
    });

    yield createEvent.pointer([], [], '');
    yield createEvent.result('indices', result, 'Merged List');
  },
};

function heapifyUp(heap: { value: number }[], index: number): void {
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (heap[index].value < heap[parent].value) {
      const temp = heap[index];
      heap[index] = heap[parent];
      heap[parent] = temp;
      index = parent;
    } else {
      break;
    }
  }
}

function heapifyDown(heap: { value: number }[], index: number): void {
  const n = heap.length;
  while (true) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < n && heap[left].value < heap[smallest].value) {
      smallest = left;
    }
    if (right < n && heap[right].value < heap[smallest].value) {
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
