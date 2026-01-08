import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * LRU Cache Algorithm
 * 
 * Least Recently Used cache implementation.
 * Uses a queue to track access order and a map for O(1) lookup.
 * 
 * Time Complexity: O(1) for get and put
 * Space Complexity: O(capacity)
 */

type LRUOperation = 'get' | 'put';

export const lruCache: IAlgorithm<ArrayInput> = {
  id: 'lru-cache',
  name: 'LRU Cache',
  category: 'queues',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function get(key):',
    '  if key not in cache:',
    '    return -1',
    '  move key to end (most recent)',
    '  return cache[key]',
    '',
    'function put(key, value):',
    '  if key in cache:',
    '    update value, move to end',
    '  else:',
    '    if cache is full:',
    '      remove least recent (front)',
    '    add key to end, store value',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)',
  },

  spaceComplexity: 'O(capacity)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'put',
      options: [
        { value: 'get', label: 'Get' },
        { value: 'put', label: 'Put' },
      ],
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'capacity',
      label: 'Cache Capacity',
      default: 4,
      min: 2,
      max: 8,
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'key',
      label: 'Key',
      default: 5,
      min: 1,
      max: 20,
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'value',
      label: 'Value (for put)',
      default: 50,
      min: 1,
      max: 100,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'put') as LRUOperation;
    const capacity = (params?.capacity || 4) as number;
    const key = (params?.key || 5) as number;
    const value = (params?.value || 50) as number;

    // Initialize cache with input values as keys (value = key * 10)
    const cache = new Map<number, number>();
    const accessOrder: number[] = [];

    for (let i = 0; i < Math.min(input.values.length, capacity); i++) {
      const k = input.values[i];
      cache.set(k, k * 10);
      accessOrder.push(k);
    }

    yield createEvent.message(
      `LRU Cache: ${operation.toUpperCase()} (capacity: ${capacity})`,
      'info',
      0
    );
    yield createEvent.message(
      `Cache: {${Array.from(cache.entries()).map(([k, v]) => `${k}:${v}`).join(', ')}}`,
      'explanation'
    );

    const cacheMapArray = Array.from(cache.entries()).map(([k, v]) => ({ key: k, value: v }));
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [...accessOrder], // Create copy to prevent reference issues
        frontIndex: accessOrder.length > 0 ? 0 : -1,
        rearIndex: accessOrder.length > 0 ? accessOrder.length - 1 : -1,
        cacheMap: cacheMapArray,
      },
    });

    if (operation === 'get') {
      yield* runLRUGet(cache, accessOrder, capacity, key);
    } else {
      yield* runLRUPut(cache, accessOrder, capacity, key, value);
    }
  },
};

function* runLRUGet(
  cache: Map<number, number>,
  accessOrder: number[],
  capacity: number,
  key: number
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Getting key ${key}...`, 'step');
  yield createEvent.highlight([0, 1]);

  if (!cache.has(key)) {
    yield createEvent.highlight([2]);
    yield createEvent.message(`Key ${key} not found in cache!`, 'info');
    yield createEvent.result('string', '-1', 'Cache miss');
    return;
  }

  yield createEvent.highlight([3]);

  // Save previous state for visualization
  const previousAccessOrder = [...accessOrder];
  const idx = accessOrder.indexOf(key);

  // Show PREVIOUS state - before moving key
  const cacheMapArray1 = Array.from(cache.entries()).map(([k, v]) => ({ key: k, value: v }));
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...accessOrder],
      frontIndex: 0,
      rearIndex: accessOrder.length - 1,
      cacheMap: cacheMapArray1,
      highlight: [idx],
      lruAnimating: 'access',
      lruAnimatingKey: key,
      message: `Key ${key} found at position ${idx} (before move)`,
    },
  });

  yield createEvent.message(`Moving key ${key} from position ${idx} to MRU position...`, 'explanation');

  // Move to end (most recently used)
  accessOrder.splice(idx, 1);
  accessOrder.push(key);

  // Show AFTER state - key moved to MRU
  const cacheMapArray2 = Array.from(cache.entries()).map(([k, v]) => ({ key: k, value: v }));
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: accessOrder,
      frontIndex: 0,
      rearIndex: accessOrder.length - 1,
      cacheMap: cacheMapArray2,
      highlight: [accessOrder.length - 1],
      lruPreviousAccessOrder: previousAccessOrder,
      message: `Key ${key} moved to MRU position (after move)`,
    },
  });

  yield createEvent.highlight([4]);
  const value = cache.get(key)!;
  yield createEvent.message(`Found: cache[${key}] = ${value}`, 'info');
  yield createEvent.result('string', `${value}`, `Cache hit for key ${key}`);
}

function* runLRUPut(
  cache: Map<number, number>,
  accessOrder: number[],
  capacity: number,
  key: number,
  value: number
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Putting key=${key}, value=${value}...`, 'step');
  yield createEvent.highlight([6, 7]);

  if (cache.has(key)) {
    yield createEvent.highlight([8]);
    // Update existing
    cache.set(key, value);
    const idx = accessOrder.indexOf(key);
    accessOrder.splice(idx, 1);
    accessOrder.push(key);

    yield createEvent.message(`Key ${key} exists, updating value and moving to MRU`, 'explanation');

    const cacheMapArray = Array.from(cache.entries()).map(([k, v]) => ({ key: k, value: v }));
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [...accessOrder], // Create copy to prevent reference issues
        frontIndex: 0,
        rearIndex: accessOrder.length - 1,
        cacheMap: cacheMapArray,
        highlight: [accessOrder.length - 1],
        message: `Updated ${key}=${value}`,
      },
    });

    yield createEvent.result('string', `Updated ${key}`, `Value: ${value}`);
    return;
  }

  yield createEvent.highlight([9, 10]);
  // Check if cache is full
  if (accessOrder.length >= capacity) {
    yield createEvent.highlight([11]);
    const lruKey = accessOrder.shift()!;
    cache.delete(lruKey);

    yield createEvent.message(`Cache full! Evicting LRU key ${lruKey}`, 'explanation');

    const cacheMapArray = Array.from(cache.entries()).map(([k, v]) => ({ key: k, value: v }));
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [...accessOrder], // Create copy to prevent reference issues
        frontIndex: accessOrder.length > 0 ? 0 : -1,
        rearIndex: accessOrder.length > 0 ? accessOrder.length - 1 : -1,
        cacheMap: cacheMapArray,
        lruAnimating: 'evict',
        message: `Evicted ${lruKey}`,
      },
    });
  }

  yield createEvent.highlight([12]);

  // Show animation of inserting new entry
  const cacheMapArrayBefore = Array.from(cache.entries()).map(([k, v]) => ({ key: k, value: v }));
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...accessOrder],
      frontIndex: accessOrder.length > 0 ? 0 : -1,
      rearIndex: accessOrder.length > 0 ? accessOrder.length - 1 : -1,
      cacheMap: cacheMapArrayBefore,
      lruAnimating: 'insert',
      lruAnimatingKey: key,
      message: `Adding ${key}=${value}...`,
    },
  });

  // Add new entry
  cache.set(key, value);
  accessOrder.push(key);

  yield createEvent.message(`Added ${key}=${value} to cache`, 'explanation');

  // Show final state with new entry added
  const cacheMapArray = Array.from(cache.entries()).map(([k, v]) => ({ key: k, value: v }));
  yield createEvent.auxiliary({
    type: 'queue',
    queueData: {
      elements: [...accessOrder], // Create copy to prevent reference issues
      frontIndex: 0,
      rearIndex: accessOrder.length - 1,
      cacheMap: cacheMapArray,
      highlight: [accessOrder.length - 1],
      message: `Added ${key}=${value}`,
    },
  });

  yield createEvent.message(`Put complete: cache[${key}] = ${value}`, 'info');
  yield createEvent.result('string', `Added ${key}`, `Value: ${value}`);
}
