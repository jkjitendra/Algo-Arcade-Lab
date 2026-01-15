import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Rehashing
 * 
 * When load factor exceeds threshold, resize the hash table
 * and rehash all existing elements to new positions.
 * 
 * Time Complexity: O(n) for rehashing operation
 * Space Complexity: O(n) for new table
 */

export const rehashing: IAlgorithm<ArrayInput> = {
  id: 'rehashing',
  name: 'Rehashing',
  category: 'hashing',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function rehash(table):',
    '  if loadFactor > threshold:',
    '    newSize = nextPrime(2 * oldSize)',
    '    newTable = createTable(newSize)',
    '    for each (key, value) in oldTable:',
    '      newIndex = hash(key) mod newSize',
    '      insert (key, value) into newTable[newIndex]',
    '    return newTable',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'number',
      id: 'initialSize',
      label: 'Initial Table Size',
      default: 5,
      min: 3,
      max: 7,
      step: 1,
    },
    {
      type: 'number',
      id: 'threshold',
      label: 'Load Factor Threshold (%)',
      default: 70,
      min: 50,
      max: 90,
      step: 10,
    },
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array' };
    }
    if (input.values.length < 4) {
      return { ok: false, error: 'Need at least 4 elements to demonstrate rehashing' };
    }
    if (input.values.length > 12) {
      return { ok: false, error: 'Array size must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const initialSize = (params?.initialSize as number) || 5;
    const threshold = ((params?.threshold as number) || 70) / 100;
    const keys = input.values;

    yield createEvent.message(
      `Rehashing demo: initial size ${initialSize}, threshold ${threshold * 100}%`,
      'info',
      0
    );

    // Initialize hash table
    let tableSize = initialSize;
    let buckets: { key: number; value: number; hash: number }[][] = Array.from(
      { length: tableSize },
      () => []
    );

    const getBuckets = (table: { key: number; value: number; hash: number }[][], size: number) =>
      table.map((items, i) => ({
        index: i,
        items: items.map(item => ({ ...item, highlight: undefined as 'active' | 'found' | 'collision' | 'deleted' | undefined })),
        highlight: undefined as 'active' | 'probing' | 'found' | 'collision' | 'empty' | undefined,
      }));

    yield createEvent.auxiliary({
      type: 'hashtable',
      hashTableState: {
        buckets: getBuckets(buckets, tableSize),
        capacity: tableSize,
        size: 0,
        loadFactor: 0,
        hashMethod: 'division',
        collisionMethod: 'chaining',
        message: `Initial table with ${tableSize} buckets`,
      },
    });

    let totalElements = 0;
    let rehashCount = 0;

    // Insert elements
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const hash = key % tableSize;

      yield createEvent.highlight([4, 5, 6]);
      yield createEvent.mark([i], 'current');
      yield createEvent.message(`Inserting ${key}: hash = ${key} mod ${tableSize} = ${hash}`, 'step');

      // Insert
      buckets[hash].push({ key, value: key * 10, hash });
      totalElements++;

      const currentLoadFactor = totalElements / tableSize;

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'inserting',
        hashTableState: {
          buckets: getBuckets(buckets, tableSize).map((b, idx) => ({
            ...b,
            items: b.items.map((item, itemIdx) => ({
              ...item,
              highlight: idx === hash && itemIdx === b.items.length - 1 ? 'active' : undefined,
            })),
            highlight: idx === hash ? 'active' : undefined,
          })),
          capacity: tableSize,
          size: totalElements,
          loadFactor: currentLoadFactor,
          hashMethod: 'division',
          collisionMethod: 'chaining',
          message: `Inserted ${key}. Load factor: ${(currentLoadFactor * 100).toFixed(0)}%`,
        },
      });

      yield createEvent.mark([i], 'sorted');

      // Check if rehashing is needed
      if (currentLoadFactor > threshold) {
        rehashCount++;
        const oldSize = tableSize;
        const newSize = findNextPrime(tableSize * 2);

        yield createEvent.highlight([0, 1, 2, 3]);
        yield createEvent.message(
          `⚠️ Load factor ${(currentLoadFactor * 100).toFixed(0)}% exceeds threshold ${threshold * 100}%! Rehashing...`,
          'info'
        );

        // Save old table
        const oldBuckets = buckets;

        // Create new table
        const newBuckets: { key: number; value: number; hash: number }[][] = Array.from(
          { length: newSize },
          () => []
        );

        yield createEvent.auxiliary({
          type: 'hashtable',
          phase: 'rehashing',
          hashTableState: {
            buckets: getBuckets(newBuckets, newSize),
            capacity: newSize,
            size: 0,
            loadFactor: 0,
            hashMethod: 'division',
            collisionMethod: 'chaining',
            isRehashing: true,
            oldBuckets: getBuckets(oldBuckets, oldSize),
            newBuckets: getBuckets(newBuckets, newSize),
            message: `Rehashing: ${oldSize} → ${newSize} buckets`,
          },
        });

        // Migrate each element
        let migrated = 0;
        for (let j = 0; j < oldBuckets.length; j++) {
          for (const item of oldBuckets[j]) {
            const newHash = item.key % newSize;

            yield createEvent.message(
              `Migrating ${item.key}: old bucket ${j} → new bucket ${newHash}`,
              'explanation'
            );

            yield createEvent.auxiliary({
              type: 'hashtable',
              phase: 'migrating',
              hashTableState: {
                buckets: getBuckets(newBuckets, newSize),
                capacity: newSize,
                size: migrated,
                loadFactor: migrated / newSize,
                hashMethod: 'division',
                collisionMethod: 'chaining',
                isRehashing: true,
                oldBuckets: getBuckets(oldBuckets, oldSize).map((b, idx) => ({
                  ...b,
                  items: b.items.map(it => ({
                    ...it,
                    highlight: idx === j && it.key === item.key ? 'active' : undefined,
                  })),
                  highlight: idx === j ? 'active' : undefined,
                })),
                newBuckets: getBuckets(newBuckets, newSize).map((b, idx) => ({
                  ...b,
                  highlight: idx === newHash ? 'active' : undefined,
                })),
                migratingItem: { key: item.key, value: item.value, hash: newHash, highlight: 'active' },
                message: `Moving ${item.key}: ${item.key} mod ${newSize} = ${newHash}`,
              },
            });

            newBuckets[newHash].push({ key: item.key, value: item.value, hash: newHash });
            migrated++;

            yield createEvent.auxiliary({
              type: 'hashtable',
              phase: 'migrated',
              hashTableState: {
                buckets: getBuckets(newBuckets, newSize),
                capacity: newSize,
                size: migrated,
                loadFactor: migrated / newSize,
                hashMethod: 'division',
                collisionMethod: 'chaining',
                isRehashing: true,
                oldBuckets: getBuckets(oldBuckets, oldSize),
                newBuckets: getBuckets(newBuckets, newSize).map((b, idx) => ({
                  ...b,
                  items: b.items.map((it, itIdx) => ({
                    ...it,
                    highlight: idx === newHash && itIdx === b.items.length - 1 ? 'found' : undefined,
                  })),
                  highlight: idx === newHash ? 'found' : undefined,
                })),
                message: `Migrated ${migrated}/${totalElements} elements`,
              },
            });
          }
        }

        // Switch to new table
        buckets = newBuckets;
        tableSize = newSize;

        yield createEvent.auxiliary({
          type: 'hashtable',
          phase: 'rehash-complete',
          hashTableState: {
            buckets: getBuckets(buckets, tableSize),
            capacity: tableSize,
            size: totalElements,
            loadFactor: totalElements / tableSize,
            hashMethod: 'division',
            collisionMethod: 'chaining',
            message: `Rehash complete! New size: ${tableSize}, Load: ${((totalElements / tableSize) * 100).toFixed(0)}%`,
          },
        });

        yield createEvent.message(
          `✓ Rehashing complete. New size: ${tableSize}, New load: ${((totalElements / tableSize) * 100).toFixed(0)}%`,
          'info'
        );
      }
    }

    // Final state
    yield createEvent.auxiliary({
      type: 'hashtable',
      phase: 'complete',
      hashTableState: {
        buckets: getBuckets(buckets, tableSize),
        capacity: tableSize,
        size: totalElements,
        loadFactor: totalElements / tableSize,
        hashMethod: 'division',
        collisionMethod: 'chaining',
        message: `Complete! Rehashed ${rehashCount} time(s)`,
      },
    });

    yield createEvent.message(
      `Finished. ${keys.length} keys inserted with ${rehashCount} rehash operation(s). Final table size: ${tableSize}`,
      'info'
    );

    yield createEvent.result(
      'string',
      `${keys.length} keys, ${rehashCount} rehash(es)`,
      `Initial: ${initialSize} → Final: ${tableSize} buckets`
    );
  },
};

// Helper function to find next prime number
function findNextPrime(n: number): number {
  let candidate = n;
  while (!isPrime(candidate)) {
    candidate++;
  }
  return candidate;
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
