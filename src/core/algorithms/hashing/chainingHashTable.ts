import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Chaining Hash Table
 * 
 * Collision handling using separate chaining (linked lists at each bucket).
 * Supports insert, search, and delete operations.
 * 
 * Time Complexity: 
 *   - Average: O(1) for all operations
 *   - Worst: O(n) when all keys hash to same bucket
 * Space Complexity: O(n)
 */

export const chainingHashTable: IAlgorithm<ArrayInput> = {
  id: 'chaining-hash-table',
  name: 'Chaining Hash Table',
  category: 'hashing',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function insert(key, value):',
    '  index = hash(key) mod tableSize',
    '  bucket[index].append((key, value))',
    '',
    'function search(key):',
    '  index = hash(key) mod tableSize',
    '  for each (k, v) in bucket[index]:',
    '    if k == key: return v',
    '  return NOT_FOUND',
    '',
    'function delete(key):',
    '  index = hash(key) mod tableSize',
    '  remove (key, _) from bucket[index]',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'insert-all',
      options: [
        { value: 'insert-all', label: 'Insert All Elements' },
        { value: 'search', label: 'Insert & Search' },
      ],
    },
    {
      type: 'number',
      id: 'tableSize',
      label: 'Table Size',
      default: 8,
      min: 4,
      max: 16,
      step: 1,
    },
    {
      type: 'number',
      id: 'searchKey',
      label: 'Search Key',
      default: 5,
      min: 0,
      max: 100,
      step: 1,
      dependsOn: { parameterId: 'operation', values: ['search'] },
    },
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation as string) || 'insert-all';
    const tableSize = (params?.tableSize as number) || 8;
    const searchKey = (params?.searchKey as number) || 5;
    const keys = input.values;

    yield createEvent.message(
      `Chaining Hash Table with ${tableSize} buckets`,
      'info',
      0
    );

    // Initialize empty hash table
    const buckets: {
      index: number;
      items: { key: number; value: number; hash: number; highlight?: 'active' | 'found' | 'collision' | 'deleted' }[];
      highlight?: 'active' | 'probing' | 'found' | 'collision' | 'empty';
    }[] = Array.from({ length: tableSize }, (_, i) => ({
      index: i,
      items: [],
      highlight: undefined,
    }));

    yield createEvent.auxiliary({
      type: 'hashtable',
      hashTableState: {
        buckets,
        capacity: tableSize,
        size: 0,
        loadFactor: 0,
        hashMethod: 'division',
        collisionMethod: 'chaining',
        message: 'Empty hash table with chaining',
      },
    });

    // Insert all elements
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const hash = key % tableSize;

      yield createEvent.highlight([0, 1, 2]);
      yield createEvent.mark([i], 'current');
      yield createEvent.message(`Inserting key ${key}: hash = ${key} mod ${tableSize} = ${hash}`, 'step');

      // Highlight target bucket
      const hasCollision = buckets[hash].items.length > 0;

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'inserting',
        hashTableState: {
          buckets: buckets.map((b, idx) => ({
            ...b,
            highlight: idx === hash ? (hasCollision ? 'collision' : 'active') : undefined,
          })),
          capacity: tableSize,
          size: i,
          loadFactor: i / tableSize,
          hashMethod: 'division',
          collisionMethod: 'chaining',
          currentKey: key,
          currentHash: hash,
          hashCalculation: {
            key,
            step: hasCollision ? 'Collision! Appending to chain' : 'Empty bucket, inserting',
            formula: `${key} mod ${tableSize}`,
            result: hash,
          },
          message: hasCollision ? `Collision at bucket ${hash}` : `Inserting at bucket ${hash}`,
        },
      });

      if (hasCollision) {
        yield createEvent.message(`Collision detected! Adding to chain at bucket ${hash}`, 'explanation');
      }

      // Insert into bucket
      buckets[hash].items.push({
        key,
        value: key * 10,
        hash,
        highlight: 'active',
      });

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'inserted',
        hashTableState: {
          buckets: buckets.map((b, idx) => ({
            ...b,
            items: b.items.map((item, itemIdx) => ({
              ...item,
              highlight: idx === hash && itemIdx === b.items.length - 1 ? 'active' : undefined,
            })),
            highlight: idx === hash ? 'found' : undefined,
          })),
          capacity: tableSize,
          size: i + 1,
          loadFactor: (i + 1) / tableSize,
          hashMethod: 'division',
          collisionMethod: 'chaining',
          message: `Inserted (${key}, ${key * 10}) into bucket ${hash}`,
        },
      });

      yield createEvent.mark([i], 'sorted');
    }

    // Search operation if requested
    if (operation === 'search') {
      yield createEvent.message(`\nSearching for key: ${searchKey}`, 'info');
      yield createEvent.highlight([4, 5, 6, 7, 8]);

      const hash = searchKey % tableSize;
      yield createEvent.message(`Computing hash: ${searchKey} mod ${tableSize} = ${hash}`, 'step');

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'searching',
        hashTableState: {
          buckets: buckets.map((b, idx) => ({
            ...b,
            highlight: idx === hash ? 'active' : undefined,
          })),
          capacity: tableSize,
          size: keys.length,
          loadFactor: keys.length / tableSize,
          hashMethod: 'division',
          collisionMethod: 'chaining',
          currentKey: searchKey,
          currentHash: hash,
          hashCalculation: {
            key: searchKey,
            step: 'Searching in bucket',
            formula: `${searchKey} mod ${tableSize}`,
            result: hash,
          },
          message: `Looking in bucket ${hash}`,
        },
      });

      const bucket = buckets[hash];
      let found = false;
      let foundValue = 0;

      // Traverse chain
      for (let j = 0; j < bucket.items.length; j++) {
        const item = bucket.items[j];

        yield createEvent.auxiliary({
          type: 'hashtable',
          phase: 'comparing',
          hashTableState: {
            buckets: buckets.map((b, idx) => ({
              ...b,
              items: b.items.map((it, itIdx) => ({
                ...it,
                highlight: idx === hash && itIdx === j ? 'active' : undefined,
              })),
              highlight: idx === hash ? 'active' : undefined,
            })),
            capacity: tableSize,
            size: keys.length,
            loadFactor: keys.length / tableSize,
            hashMethod: 'division',
            collisionMethod: 'chaining',
            message: `Comparing with key ${item.key}`,
          },
        });

        yield createEvent.message(`Comparing ${searchKey} with ${item.key}...`, 'explanation');

        if (item.key === searchKey) {
          found = true;
          foundValue = item.value;

          yield createEvent.auxiliary({
            type: 'hashtable',
            phase: 'found',
            hashTableState: {
              buckets: buckets.map((b, idx) => ({
                ...b,
                items: b.items.map((it, itIdx) => ({
                  ...it,
                  highlight: idx === hash && itIdx === j ? 'found' : undefined,
                })),
                highlight: idx === hash ? 'found' : undefined,
              })),
              capacity: tableSize,
              size: keys.length,
              loadFactor: keys.length / tableSize,
              hashMethod: 'division',
              collisionMethod: 'chaining',
              message: `Found! Key ${searchKey} = Value ${foundValue}`,
            },
          });

          break;
        }
      }

      if (found) {
        yield createEvent.message(`✓ Found key ${searchKey} with value ${foundValue}`, 'info');
        yield createEvent.result('string', `Found: ${searchKey} → ${foundValue}`, 'Key found in hash table');
      } else {
        yield createEvent.message(`✗ Key ${searchKey} not found in hash table`, 'info');
        yield createEvent.result('string', `Not Found: ${searchKey}`, 'Key does not exist');
      }
    } else {
      // Final summary for insert-all
      const collisions = buckets.filter(b => b.items.length > 1).length;
      const maxChain = Math.max(...buckets.map(b => b.items.length));
      const emptyBuckets = buckets.filter(b => b.items.length === 0).length;

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'complete',
        hashTableState: {
          buckets: buckets.map(b => ({
            ...b,
            items: b.items.map(item => ({ ...item, highlight: undefined })),
            highlight: undefined,
          })),
          capacity: tableSize,
          size: keys.length,
          loadFactor: keys.length / tableSize,
          hashMethod: 'division',
          collisionMethod: 'chaining',
          message: `Complete! Load factor: ${((keys.length / tableSize) * 100).toFixed(0)}%`,
        },
      });

      yield createEvent.message(
        `Chaining complete. Collisions: ${collisions} buckets, Max chain: ${maxChain}, Empty: ${emptyBuckets}`,
        'info'
      );

      yield createEvent.result(
        'string',
        `${keys.length} keys → ${tableSize} buckets`,
        `Load: ${((keys.length / tableSize) * 100).toFixed(0)}%, Max chain: ${maxChain}`
      );
    }
  },
};
