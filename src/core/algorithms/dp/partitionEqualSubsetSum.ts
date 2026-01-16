import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, DPCell } from '../../events/events';

/**
 * Partition Equal Subset Sum
 * 
 * Check if array can be partitioned into two equal sum subsets
 * Time Complexity: O(n × sum/2)
 * Space Complexity: O(n × sum/2)
 */
export const partitionEqualSubsetSum: IAlgorithm<ArrayInput> = {
  id: 'partition-equal-subset-sum',
  name: 'Partition Equal Subset Sum',
  category: 'dp',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function canPartition(arr):',
    '  totalSum = sum(arr)',
    '  if totalSum is odd: return false',
    '',
    '  target = totalSum / 2',
    '  // Problem reduces to: find subset with sum = target',
    '',
    '  dp[0] = true',
    '  for each num in arr:',
    '    for j = target down to num:',
    '      dp[j] = dp[j] OR dp[j - num]',
    '',
    '  return dp[target]',
  ],

  timeComplexity: {
    best: 'O(n × sum)',
    average: 'O(n × sum)',
    worst: 'O(n × sum)',
  },

  spaceComplexity: 'O(sum)',

  parameters: [],

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 12) {
      return { ok: false, error: 'Maximum 12 elements for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && v > 0 && Number.isInteger(v))) {
      return { ok: false, error: 'All values must be positive integers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const totalSum = arr.reduce((a, b) => a + b, 0);

    yield createEvent.message(`Checking if [${arr.join(', ')}] can be partitioned into equal subsets`, 'info');
    yield createEvent.highlight([0, 1]);

    yield createEvent.pointer(
      [],
      [{ name: 'totalSum', value: totalSum }]
    );

    if (totalSum % 2 !== 0) {
      yield createEvent.message(`Total sum ${totalSum} is odd - cannot partition equally`, 'step');
      yield createEvent.highlight([2]);
      yield createEvent.result('boolean', false, `Sum ${totalSum} is odd, cannot partition`);
      return;
    }

    const target = totalSum / 2;
    yield createEvent.message(`Target for each subset: ${totalSum}/2 = ${target}`, 'step');
    yield createEvent.highlight([4, 5]);

    // 1D space-optimized DP
    const dp: boolean[] = new Array(target + 1).fill(false);
    dp[0] = true;

    yield createEvent.message('Initialize: dp[0] = true (empty subset = sum 0)', 'step');
    yield createEvent.highlight([7]);

    const maxDisplay = Math.min(target + 1, 15);
    const colLabels = ['Sum', ...Array.from({ length: maxDisplay }, (_, i) => i.toString())];

    const buildCells = (currentNum?: number): DPCell[] => {
      const cells: DPCell[] = [];
      for (let j = 0; j < maxDisplay; j++) {
        cells.push({
          row: 0,
          col: j,
          value: dp[j] ? 1 : 0,
          highlight: currentNum !== undefined && j === currentNum ? 'current' : undefined,
        });
      }
      return cells;
    };

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['Reachable'],
        cols: colLabels,
        cells: buildCells(),
      },
    });

    // Fill DP table
    for (let i = 0; i < n; i++) {
      const num = arr[i];
      yield createEvent.message(`Processing element ${num}`, 'step');
      yield createEvent.highlight([8, 9]);
      yield createEvent.mark([i], 'current');

      // Early termination
      if (dp[target]) {
        yield createEvent.message(`Target ${target} already reachable!`, 'explanation');
        break;
      }

      // Iterate backwards to avoid using same element twice
      for (let j = target; j >= num; j--) {
        if (dp[j - num]) {
          dp[j] = true;
          if (j < maxDisplay) {
            yield createEvent.message(`Sum ${j} now reachable: dp[${j - num}] + ${num}`, 'explanation');
            yield createEvent.highlight([10]);
          }
        }
      }

      yield createEvent.auxiliary({
        type: 'dp-table',
        dpTableState: {
          rows: ['Reachable'],
          cols: colLabels,
          cells: buildCells(num < maxDisplay ? num : undefined),
        },
      });

      yield createEvent.unmark([i]);
    }

    // Find the subset
    let subset: number[] = [];
    if (dp[target]) {
      let remaining = target;
      for (let i = n - 1; i >= 0 && remaining > 0; i--) {
        if (arr[i] <= remaining) {
          // Check if we could have achieved (remaining - arr[i]) before this element
          // For simplicity, just use the greedy backtrack
          const temp = [...arr];
          temp.splice(i, 1);
          subset.push(arr[i]);
          remaining -= arr[i];
        }
      }
    }

    // Final visualization
    const finalCells = buildCells();
    if (target < maxDisplay) {
      finalCells[target].highlight = dp[target] ? 'max' : undefined;
    }

    yield createEvent.auxiliary({
      type: 'dp-table',
      dpTableState: {
        rows: ['Reachable'],
        cols: colLabels,
        cells: finalCells,
      },
    });

    yield createEvent.highlight([12]);
    if (dp[target]) {
      yield createEvent.message(`Can partition! Each subset sums to ${target}`, 'info');
      yield createEvent.result('boolean', true, `Partition possible with sum ${target} each`);
    } else {
      yield createEvent.message(`Cannot partition into equal subsets`, 'info');
      yield createEvent.result('boolean', false, `No equal partition exists`);
    }
  },
};
