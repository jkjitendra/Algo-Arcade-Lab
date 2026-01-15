import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Hash Functions Visualization
 * 
 * Demonstrates different hash function methods:
 * - Division method: h(k) = k mod m
 * - Multiplication method: h(k) = floor(m * (k * A mod 1))
 * 
 * Time Complexity: O(1) for hash computation
 * Space Complexity: O(1)
 */

const A = 0.6180339887; // (sqrt(5) - 1) / 2, Knuth's recommended constant

export const hashFunctions: IAlgorithm<ArrayInput> = {
  id: 'hash-functions',
  name: 'Hash Functions',
  category: 'hashing',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function divisionHash(key, tableSize):',
    '  return key mod tableSize',
    '',
    'function multiplicationHash(key, tableSize):',
    '  A = 0.6180339887  // Golden ratio constant',
    '  fractional = (key * A) mod 1',
    '  return floor(tableSize * fractional)',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'select',
      id: 'method',
      label: 'Hash Method',
      default: 'division',
      options: [
        { value: 'division', label: 'Division Method' },
        { value: 'multiplication', label: 'Multiplication Method' },
      ],
    },
    {
      type: 'number',
      id: 'tableSize',
      label: 'Table Size',
      default: 10,
      min: 5,
      max: 20,
      step: 1,
    },
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'Array size must be 10 or less for clear visualization' };
    }
    for (const v of input.values) {
      if (v < 0) {
        return { ok: false, error: 'All values must be non-negative' };
      }
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const method = (params?.method as string) || 'division';
    const tableSize = (params?.tableSize as number) || 10;
    const keys = input.values;

    yield createEvent.message(
      `Demonstrating ${method === 'division' ? 'Division' : 'Multiplication'} hash method with table size ${tableSize}`,
      'info',
      0
    );

    // Initialize empty hash table
    const buckets = Array.from({ length: tableSize }, (_, i) => ({
      index: i,
      items: [] as { key: number; value: number; hash: number; highlight?: 'active' | 'found' | 'collision' | 'deleted' }[],
      highlight: undefined as 'active' | 'probing' | 'found' | 'collision' | 'empty' | undefined,
    }));

    yield createEvent.auxiliary({
      type: 'hashtable',
      hashTableState: {
        buckets,
        capacity: tableSize,
        size: 0,
        loadFactor: 0,
        hashMethod: method as 'division' | 'multiplication',
        collisionMethod: 'chaining',
        message: 'Empty hash table initialized',
      },
    });

    // Process each key
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      yield createEvent.mark([i], 'current');
      yield createEvent.message(`Processing key: ${key}`, 'step');

      let hash: number;
      let formula: string;
      let step: string;

      if (method === 'division') {
        yield createEvent.highlight([0, 1]);
        hash = key % tableSize;
        formula = `${key} mod ${tableSize}`;
        step = `Division: ${key} ÷ ${tableSize} = ${Math.floor(key / tableSize)} remainder ${hash}`;
      } else {
        yield createEvent.highlight([3, 4, 5, 6]);
        const product = key * A;
        const fractional = product - Math.floor(product);
        hash = Math.floor(tableSize * fractional);
        formula = `floor(${tableSize} × (${key} × ${A.toFixed(4)} mod 1))`;
        step = `Multiplication: ${key} × ${A.toFixed(4)} = ${product.toFixed(4)}, fractional = ${fractional.toFixed(4)}, hash = ${hash}`;
      }

      // Show hash calculation
      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'calculating',
        hashTableState: {
          buckets,
          capacity: tableSize,
          size: i,
          loadFactor: i / tableSize,
          hashMethod: method as 'division' | 'multiplication',
          collisionMethod: 'chaining',
          currentKey: key,
          currentHash: hash,
          hashCalculation: {
            key,
            step,
            formula,
            result: hash,
          },
          message: `Computing hash for key ${key}`,
        },
      });

      yield createEvent.message(step, 'explanation');

      // Highlight the target bucket
      const updatedBuckets = buckets.map((b, idx) => ({
        ...b,
        highlight: idx === hash ? 'active' as const : undefined,
      }));

      // Check for collision
      const hasCollision = buckets[hash].items.length > 0;
      if (hasCollision) {
        yield createEvent.message(`Collision detected at bucket ${hash}! Using chaining.`, 'info');
      }

      // Insert into bucket
      buckets[hash].items.push({
        key,
        value: key * 10, // Just use key*10 as value for demo
        hash,
        highlight: 'active',
      });

      yield createEvent.auxiliary({
        type: 'hashtable',
        phase: 'inserting',
        hashTableState: {
          buckets: updatedBuckets.map((b, idx) => ({
            ...b,
            items: buckets[idx].items.map((item, itemIdx) => ({
              ...item,
              highlight: idx === hash && itemIdx === buckets[idx].items.length - 1 ? 'active' as const : undefined,
            })),
          })),
          capacity: tableSize,
          size: i + 1,
          loadFactor: (i + 1) / tableSize,
          hashMethod: method as 'division' | 'multiplication',
          collisionMethod: 'chaining',
          currentKey: key,
          currentHash: hash,
          message: hasCollision
            ? `Inserted ${key} into bucket ${hash} (collision handled with chaining)`
            : `Inserted ${key} into bucket ${hash}`,
        },
      });

      yield createEvent.mark([i], 'sorted');
    }

    // Final state
    const finalSize = keys.length;
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
        size: finalSize,
        loadFactor: finalSize / tableSize,
        hashMethod: method as 'division' | 'multiplication',
        collisionMethod: 'chaining',
        message: `All ${keys.length} keys inserted. Load factor: ${((finalSize / tableSize) * 100).toFixed(0)}%`,
      },
    });

    // Count collisions
    const collisionBuckets = buckets.filter(b => b.items.length > 1).length;
    const maxChainLength = Math.max(...buckets.map(b => b.items.length));

    yield createEvent.message(
      `Hash table complete. ${collisionBuckets} bucket(s) have collisions. Max chain length: ${maxChainLength}`,
      'info'
    );

    yield createEvent.result(
      'string',
      `${method === 'division' ? 'Division' : 'Multiplication'} method: ${keys.length} keys → ${tableSize} buckets`,
      `Load: ${((finalSize / tableSize) * 100).toFixed(0)}%, Max chain: ${maxChainLength}`
    );
  },
};
