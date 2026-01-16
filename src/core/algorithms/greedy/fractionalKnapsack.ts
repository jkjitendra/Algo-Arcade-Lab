import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Fractional Knapsack Problem
 * 
 * Maximize value by taking fractions of items
 * Greedy choice: Sort by value/weight ratio, take greedily
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export const fractionalKnapsack: IAlgorithm<ArrayInput> = {
  id: 'fractional-knapsack',
  name: 'Fractional Knapsack',
  category: 'greedy',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function fractionalKnapsack(items, capacity):',
    '  // Calculate value/weight ratio for each item',
    '  for each item: ratio = value / weight',
    '',
    '  // Sort items by ratio (descending)',
    '  sort(items, by = ratio, desc)',
    '',
    '  totalValue = 0',
    '  for each item in sorted items:',
    '    if capacity >= item.weight:',
    '      take whole item',
    '      capacity -= item.weight',
    '    else:',
    '      take fraction = capacity / item.weight',
    '      break',
    '',
    '  return totalValue',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    { id: 'numItems', label: 'Number of Items', type: 'number', min: 4, max: 8, default: 5 },
    { id: 'capacity', label: 'Knapsack Capacity', type: 'number', min: 10, max: 50, default: 20 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const numItems = Number(params?.['numItems'] ?? 5);
    const capacity = Number(params?.['capacity'] ?? 20);

    // Generate random items
    const items: { id: string; weight: number; value: number; ratio: number }[] = [];
    for (let i = 0; i < numItems; i++) {
      const weight = Math.floor(Math.random() * 10) + 2; // 2-11
      const value = Math.floor(Math.random() * 50) + 10; // 10-59
      items.push({
        id: String.fromCharCode(65 + i),
        weight,
        value,
        ratio: value / weight,
      });
    }

    yield createEvent.message(`Knapsack capacity: ${capacity}, Items: ${numItems}`, 'info');
    yield createEvent.highlight([0]);

    // Display items
    yield createEvent.pointer(
      [],
      items.map(item => ({
        name: `${item.id}(w=${item.weight})`,
        value: item.value,
      })),
      'Items (value)'
    );

    // Calculate ratios
    yield createEvent.message('Calculating value/weight ratios', 'step');
    yield createEvent.highlight([1, 2]);

    yield createEvent.pointer(
      [],
      items.map(item => ({
        name: `${item.id}`,
        value: Number(item.ratio.toFixed(2)),
      })),
      'Value/Weight Ratios'
    );

    // Sort by ratio descending
    yield createEvent.message('Sorting items by ratio (greedy choice)', 'step');
    yield createEvent.highlight([4, 5]);

    items.sort((a, b) => b.ratio - a.ratio);

    yield createEvent.pointer(
      [],
      items.map(item => ({
        name: `${item.id}(r=${item.ratio.toFixed(1)})`,
        value: item.value,
      })),
      'Sorted by ratio'
    );

    // Greedy selection
    let remainingCapacity = capacity;
    let totalValue = 0;
    const taken: { id: string; fraction: number; value: number }[] = [];

    yield createEvent.message('Filling knapsack greedily', 'step');
    yield createEvent.highlight([7, 8]);

    for (let i = 0; i < items.length && remainingCapacity > 0; i++) {
      const item = items[i];

      yield createEvent.message(`Considering item ${item.id}: weight=${item.weight}, value=${item.value}`, 'step');

      if (remainingCapacity >= item.weight) {
        // Take whole item
        remainingCapacity -= item.weight;
        totalValue += item.value;
        taken.push({ id: item.id, fraction: 1, value: item.value });

        yield createEvent.message(`✓ Take whole item ${item.id} (${item.weight}kg, $${item.value})`, 'step');
        yield createEvent.highlight([9, 10, 11]);
      } else if (remainingCapacity > 0) {
        // Take fraction
        const fraction = remainingCapacity / item.weight;
        const fractionalValue = Number((item.value * fraction).toFixed(2));
        totalValue += fractionalValue;
        taken.push({ id: item.id, fraction, value: fractionalValue });

        yield createEvent.message(
          `✓ Take ${(fraction * 100).toFixed(1)}% of item ${item.id} (${remainingCapacity}kg, $${fractionalValue})`,
          'step'
        );
        yield createEvent.highlight([12, 13, 14]);

        remainingCapacity = 0;
      } else {
        yield createEvent.message(`✗ Skip item ${item.id} (no capacity left)`, 'step');
      }

      yield createEvent.pointer(
        [],
        [
          { name: 'capacity', value: remainingCapacity },
          { name: 'totalValue', value: Number(totalValue.toFixed(2)), highlight: true },
        ]
      );
    }

    // Final result
    yield createEvent.highlight([16]);
    const takenSummary = taken.map(t =>
      t.fraction === 1 ? t.id : `${(t.fraction * 100).toFixed(0)}% ${t.id}`
    ).join(', ');

    yield createEvent.message(
      `Maximum value: $${totalValue.toFixed(2)} with items: ${takenSummary}`,
      'info'
    );
    yield createEvent.result('string', `$${totalValue.toFixed(2)}`, 'Fractional Knapsack');
  },
};
