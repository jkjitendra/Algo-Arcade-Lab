import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Open Addressing Hash Table
 * 
 * Collision handling using open addressing with probe sequences:
 * - Linear Probing: h(k, i) = (h(k) + i) mod m
 * - Quadratic Probing: h(k, i) = (h(k) + i²) mod m
 * - Double Hashing: h(k, i) = (h1(k) + i * h2(k)) mod m
 * 
 * Time Complexity:
 *   - Average: O(1) for all operations
 *   - Worst: O(n) when table is nearly full
 * Space Complexity: O(n)
 */

export const openAddressingHashTable: IAlgorithm<ArrayInput> = {
  id: 'open-addressing-hash-table',
  name: 'Open Addressing Hash Table',
  category: 'hashing',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function insert(key, value):',
    '  for i = 0 to tableSize - 1:',
    '    index = probe(key, i)',
    '    if table[index] is empty:',
    '      table[index] = (key, value)',
    '      return SUCCESS',
    '  return TABLE_FULL',
    '',
    'function probe(key, i):  // depends on method',
    '  Linear:    (hash(key) + i) mod size',
    '  Quadratic: (hash(key) + i²) mod size',
    '  Double:    (h1(key) + i * h2(key)) mod size',
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
      id: 'probingMethod',
      label: 'Probing Method',
      default: 'linear',
      options: [
        { value: 'linear', label: 'Linear Probing' },
        { value: 'quadratic', label: 'Quadratic Probing' },
        { value: 'double', label: 'Double Hashing' },
      ],
    },
    {
      type: 'number',
      id: 'tableSize',
      label: 'Table Size',
      default: 11,
      min: 7,
      max: 17,
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
      return { ok: false, error: 'Array size must be 10 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const probingMethod = (params?.probingMethod as string) || 'linear';
    const tableSize = (params?.tableSize as number) || 11;
    const keys = input.values;

    // Ensure we don't overflow the table
    if (keys.length > tableSize) {
      yield createEvent.message('Error: Too many keys for table size!', 'info');
      yield createEvent.result('string', 'Error', 'Keys exceed table capacity');
      return;
    }

    yield createEvent.message(
      `Open Addressing with ${probingMethod} probing, table size ${tableSize}`,
      'info',
      0
    );

    // Initialize table (single slot per bucket)
    const table: (null | { key: number; value: number; hash: number })[] = Array(tableSize).fill(null);

    const getBuckets = () => table.map((item, i) => ({
      index: i,
      items: item ? [{ key: item.key, value: item.value, hash: item.hash, highlight: undefined as 'active' | 'found' | 'collision' | 'deleted' | undefined }] : [],
      highlight: undefined as 'active' | 'probing' | 'found' | 'collision' | 'empty' | undefined,
    }));

    yield createEvent.auxiliary({
      type: 'hashtable',
      hashTableState: {
        buckets: getBuckets(),
        capacity: tableSize,
        size: 0,
        loadFactor: 0,
        hashMethod: 'division',
        collisionMethod: probingMethod as 'linear' | 'quadratic' | 'double',
        message: 'Empty hash table with open addressing',
      },
    });

    // Hash functions
    const h1 = (k: number) => k % tableSize;
    const h2 = (k: number) => 7 - (k % 7); // Secondary hash for double hashing

    // Probe function
    const probe = (key: number, i: number): number => {
      switch (probingMethod) {
        case 'linear':
          return (h1(key) + i) % tableSize;
        case 'quadratic':
          return (h1(key) + i * i) % tableSize;
        case 'double':
          return (h1(key) + i * h2(key)) % tableSize;
        default:
          return (h1(key) + i) % tableSize;
      }
    };

    // Get probe formula string
    const getProbeFormula = (key: number, i: number): string => {
      const hash = h1(key);
      switch (probingMethod) {
        case 'linear':
          return `(${hash} + ${i}) mod ${tableSize}`;
        case 'quadratic':
          return `(${hash} + ${i}²) mod ${tableSize}`;
        case 'double':
          return `(${hash} + ${i} × ${h2(key)}) mod ${tableSize}`;
        default:
          return '';
      }
    };

    let totalProbes = 0;

    // Insert all elements
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const initialHash = h1(key);

      yield createEvent.highlight([0, 1, 2, 3, 4, 5]);
      yield createEvent.mark([i], 'current');
      yield createEvent.message(`Inserting key ${key}: initial hash = ${initialHash}`, 'step');

      const probeSequence: number[] = [];
      let inserted = false;

      for (let j = 0; j < tableSize; j++) {
        const probeIdx = probe(key, j);
        probeSequence.push(probeIdx);
        totalProbes++;

        yield createEvent.highlight([8, 9, 10, 11]);
        yield createEvent.message(
          `Probe ${j + 1}: ${getProbeFormula(key, j)} = ${probeIdx}`,
          'explanation'
        );

        // Show probing animation
        yield createEvent.auxiliary({
          type: 'hashtable',
          phase: 'probing',
          hashTableState: {
            buckets: getBuckets().map((b, idx) => ({
              ...b,
              highlight: idx === probeIdx ? 'probing' : probeSequence.slice(0, -1).includes(idx) ? 'collision' : undefined,
            })),
            capacity: tableSize,
            size: Object.values(table).filter(x => x !== null).length,
            loadFactor: Object.values(table).filter(x => x !== null).length / tableSize,
            hashMethod: 'division',
            collisionMethod: probingMethod as 'linear' | 'quadratic' | 'double',
            currentKey: key,
            currentHash: probeIdx,
            probeSequence,
            currentProbeIndex: j,
            hashCalculation: {
              key,
              step: `Probe attempt ${j + 1}`,
              formula: getProbeFormula(key, j),
              result: probeIdx,
            },
            message: `Probing slot ${probeIdx}...`,
          },
        });

        if (table[probeIdx] === null) {
          // Found empty slot
          table[probeIdx] = { key, value: key * 10, hash: initialHash };
          inserted = true;

          yield createEvent.auxiliary({
            type: 'hashtable',
            phase: 'inserted',
            hashTableState: {
              buckets: getBuckets().map((b, idx) => ({
                ...b,
                items: b.items.map(item => ({
                  ...item,
                  highlight: idx === probeIdx ? 'active' : undefined,
                })),
                highlight: idx === probeIdx ? 'found' : undefined,
              })),
              capacity: tableSize,
              size: Object.values(table).filter(x => x !== null).length,
              loadFactor: Object.values(table).filter(x => x !== null).length / tableSize,
              hashMethod: 'division',
              collisionMethod: probingMethod as 'linear' | 'quadratic' | 'double',
              probeSequence,
              message: `Inserted (${key}, ${key * 10}) at slot ${probeIdx} after ${j + 1} probe(s)`,
            },
          });

          if (j > 0) {
            yield createEvent.message(`Inserted after ${j + 1} probes due to collisions`, 'info');
          }

          break;
        } else {
          yield createEvent.message(`Slot ${probeIdx} occupied by ${table[probeIdx]?.key}, probing next...`, 'explanation');
        }
      }

      if (!inserted) {
        yield createEvent.message(`Failed to insert ${key}: table is full!`, 'info');
      }

      yield createEvent.mark([i], 'sorted');
    }

    // Final summary
    const filledSlots = table.filter(x => x !== null).length;
    const avgProbes = (totalProbes / keys.length).toFixed(2);

    yield createEvent.auxiliary({
      type: 'hashtable',
      phase: 'complete',
      hashTableState: {
        buckets: getBuckets().map(b => ({
          ...b,
          items: b.items.map(item => ({ ...item, highlight: undefined })),
          highlight: undefined,
        })),
        capacity: tableSize,
        size: filledSlots,
        loadFactor: filledSlots / tableSize,
        hashMethod: 'division',
        collisionMethod: probingMethod as 'linear' | 'quadratic' | 'double',
        message: `Complete! Load: ${((filledSlots / tableSize) * 100).toFixed(0)}%, Avg probes: ${avgProbes}`,
      },
    });

    yield createEvent.message(
      `Open addressing complete. Load factor: ${((filledSlots / tableSize) * 100).toFixed(0)}%, Average probes per insert: ${avgProbes}`,
      'info'
    );

    yield createEvent.result(
      'string',
      `${probingMethod} probing: ${keys.length} keys → ${tableSize} slots`,
      `Load: ${((filledSlots / tableSize) * 100).toFixed(0)}%, Avg probes: ${avgProbes}`
    );
  },
};
