import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, RecursionNode } from '../../events/events';
import { updateRecursionState } from './utils';

export const binarySearchRecursiveInfo: IAlgorithm<ArrayInput> = {
  id: 'binary-search-recursion',
  name: 'Binary Search (Recursive)',
  category: 'recursion',
  difficulty: 'beginner',
  pseudocodeLines: [
    'function binarySearch(arr, low, high, target):',
    '  if low > high:',
    '    return -1',
    '  mid = low + (high - low) / 2',
    '  if arr[mid] == target:',
    '    return mid',
    '  if arr[mid] > target:',
    '    return binarySearch(arr, low, mid - 1, target)',
    '  return binarySearch(arr, mid + 1, high, target)',
  ],
  timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
  spaceComplexity: 'O(log n)',
  parameters: [
    { id: 'target', label: 'Target', type: 'number', min: 0, max: 100, default: 3 }
  ],

  validate: (input) => {
    if (!input.values || input.values.length === 0) return { ok: false, error: 'Array cannot be empty' };
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values].sort((a, b) => a - b);
    const target = Number(params?.['target'] ?? 3);
    const n = arr.length;

    yield createEvent.set(0, arr[0]); // Hack to force array update if we sorted
    // Actually set event only updates one index. We need to update whole array in store if we sorted.
    // The visualizer usually uses the input array from store.
    // But algorithms run receives input. 
    // We can emit a sequence of Set events or just assume user provided sorted array or we sort it and emit specific Set events to visualize sorting (too long).
    // Let's just pretend it's sorted or sort it quickly.
    // Better: emit 'message' saying "Sorting array..."

    // Sort logic visualization skipped for brevity, just updating values
    for (let i = 0; i < n; i++) {
      yield createEvent.set(i, arr[i]);
    }

    const nodes: RecursionNode[] = [];
    let rootId: string | undefined;

    yield createEvent.message(`Searching for ${target} in ${n} elements`, 'info');

    function* solve(low: number, high: number, parentId?: string): Generator<AlgoEvent, number, unknown> {
      const nodeId = Math.random().toString(36).substr(2, 9);
      const node: RecursionNode = {
        id: nodeId,
        label: 'search',
        args: `[${low}, ${high}]`,
        status: 'active',
        depth: parentId ? (nodes.find(x => x.id === parentId)?.depth ?? 0) + 1 : 0,
        parentId,
        children: []
      };

      if (!rootId) rootId = nodeId;
      if (parentId) {
        const parent = nodes.find(x => x.id === parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(nodeId);
        }
      }
      nodes.push(node);

      yield* updateRecursionState(nodes, rootId, nodeId, `Searching range [${low}, ${high}]`);
      yield createEvent.highlight([0]);

      // Update Array View Pointers
      yield createEvent.pointer(
        [
          { index: low, label: 'L', color: 'var(--color-accent-compare)' },
          { index: high, label: 'H', color: 'var(--color-accent-compare)' }
        ],
        []
      );

      if (low > high) {
        yield createEvent.highlight([1, 2]);
        node.status = 'completed';
        node.result = '-1';
        yield* updateRecursionState(nodes, rootId, nodeId, `Base case: low > high, not found`);
        return -1;
      }

      const mid = Math.floor(low + (high - low) / 2);
      yield createEvent.highlight([3]);
      yield createEvent.pointer(
        [
          { index: low, label: 'L', color: 'var(--color-accent-compare)' },
          { index: high, label: 'H', color: 'var(--color-accent-compare)' },
          { index: mid, label: 'M', color: 'var(--color-accent-swap)' }
        ],
        [],
        `mid = ${mid}, arr[mid] = ${arr[mid]}`
      );

      // Compare
      yield createEvent.compare([mid, mid], 'eq'); // Just to highlight

      if (arr[mid] === target) {
        yield createEvent.highlight([4, 5]);
        yield createEvent.mark([mid], 'sorted');
        // Note: 'found' is not a standard markType in events.ts, usually 'sorted' or 'match'. 
        // Using 'sorted' (green) for found.
        yield createEvent.mark([mid], 'sorted');

        node.status = 'completed';
        node.result = mid.toString();
        yield* updateRecursionState(nodes, rootId, nodeId, `Found ${target} at index ${mid}`);
        return mid;
      }

      if (arr[mid] > target) {
        yield createEvent.highlight([6, 7]);
        node.status = 'pending';
        yield* updateRecursionState(nodes, rootId, nodeId, `${arr[mid]} > ${target}, searching left half`);

        // Gray out right half? Optional.

        const result = yield* solve(low, mid - 1, nodeId);

        node.status = 'completed';
        node.result = result.toString();
        yield* updateRecursionState(nodes, rootId, nodeId, `Returned ${result}`);

        if (result !== -1) yield createEvent.mark([result], 'sorted'); // Keep found marked
        return result;
      } else {
        yield createEvent.highlight([8]);
        node.status = 'pending';
        yield* updateRecursionState(nodes, rootId, nodeId, `${arr[mid]} < ${target}, searching right half`);

        const result = yield* solve(mid + 1, high, nodeId);

        node.status = 'completed';
        node.result = result.toString();
        yield* updateRecursionState(nodes, rootId, nodeId, `Returned ${result}`);

        if (result !== -1) yield createEvent.mark([result], 'sorted');
        return result;
      }
    }

    const finalResult = yield* solve(0, n - 1);
    yield createEvent.message(`Search complete. Found at index: ${finalResult}`, 'info');
    yield createEvent.result('search', finalResult, finalResult >= 0 ? `Found ${target} at index ${finalResult}` : `${target} not found`);
  }
};

export const binarySearchRecursiveAbout = {
  id: 'binary-search-recursion',
  name: 'Binary Search (Recursive)',
  category: 'recursion',
  difficulty: 'beginner',
  description: 'Finds the position of a target value within a sorted array using divide and conquer.',
  howItWorks: 'Compares target with the middle element. If equal, found. If target < mid, search left half. If target > mid, search right half.',
  keyInsight: 'By eliminating half the search space in every step, it achieves logarithmic time complexity, vastly faster than linear search for large datasets.',
  bestFor: ['Searching in large sorted arrays', 'Finding boundaries/conditions (e.g., first bad version)', 'In-memory sorted data lookups'],
  avoidWhen: ['Array is unsorted', 'Data is a linked list (no random access)', 'Dataset is tiny (linear search may be faster due to cache)'],
  funFact: 'Although the concept is simple, correct implementation is tricky. The first correct binary search was published in 1946, but the first bug-free code appeared in 1962!',
  optimizationTips: ['Iterative version saves O(log n) stack space', 'Use mid = low + (high-low)/2 to avoid integer overflow', 'Use interpolation search for uniformly distributed data'],
  tags: ['Recursion', 'Searching', 'Divide and Conquer', 'Beginner'],
};
