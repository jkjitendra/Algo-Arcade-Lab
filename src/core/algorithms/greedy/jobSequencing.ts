import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Job Sequencing Problem
 * 
 * Schedule jobs with deadlines to maximize profit
 * Greedy choice: Sort by profit, assign to latest available slot before deadline
 * 
 * Time Complexity: O(n²) or O(n log n) with Union-Find
 * Space Complexity: O(n) for slots
 */
export const jobSequencing: IAlgorithm<ArrayInput> = {
  id: 'job-sequencing',
  name: 'Job Sequencing',
  category: 'greedy',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function jobSequencing(jobs):',
    '  // Sort jobs by profit (descending)',
    '  sort(jobs, by = profit, desc)',
    '',
    '  slots = array of size maxDeadline, filled with null',
    '',
    '  for each job in jobs:',
    '    // Find latest free slot before deadline',
    '    for slot = job.deadline-1 down to 0:',
    '      if slots[slot] is null:',
    '        slots[slot] = job',
    '        break',
    '',
    '  return slots (non-null jobs)',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    { id: 'numJobs', label: 'Number of Jobs', type: 'number', min: 4, max: 8, default: 5 },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const numJobs = Number(params?.['numJobs'] ?? 5);

    // Generate random jobs with profits and deadlines
    const jobs: { id: string; profit: number; deadline: number }[] = [];
    for (let i = 0; i < numJobs; i++) {
      jobs.push({
        id: String.fromCharCode(65 + i), // A, B, C, ...
        profit: (Math.floor(Math.random() * 10) + 1) * 10, // 10-100
        deadline: Math.floor(Math.random() * 4) + 1, // 1-4
      });
    }

    const maxDeadline = Math.max(...jobs.map(j => j.deadline));

    yield createEvent.message(`Generated ${numJobs} jobs with deadlines 1-${maxDeadline}`, 'info');
    yield createEvent.highlight([0]);

    yield createEvent.pointer(
      [],
      jobs.map(j => ({ name: `${j.id}(d=${j.deadline})`, value: j.profit })),
      'Jobs with deadlines and profits'
    );

    // Sort by profit descending
    yield createEvent.message('Sorting jobs by profit (descending) - greedy choice', 'step');
    yield createEvent.highlight([1, 2]);

    jobs.sort((a, b) => b.profit - a.profit);

    yield createEvent.pointer(
      [],
      jobs.map(j => ({ name: `${j.id}(d=${j.deadline})`, value: j.profit })),
      'Sorted by profit'
    );

    // Initialize slots
    const slots: (typeof jobs[0] | null)[] = new Array(maxDeadline).fill(null);

    yield createEvent.message(`Created ${maxDeadline} time slots`, 'step');
    yield createEvent.highlight([4]);

    let totalProfit = 0;
    const scheduledJobs: typeof jobs = [];

    // Process each job
    for (const job of jobs) {
      yield createEvent.message(`Processing Job ${job.id}: profit=$${job.profit}, deadline=${job.deadline}`, 'step');
      yield createEvent.highlight([6, 7, 8]);

      let placed = false;

      // Find latest available slot before deadline
      for (let slot = job.deadline - 1; slot >= 0; slot--) {
        yield createEvent.highlight([8, 9]);

        if (slots[slot] === null) {
          slots[slot] = job;
          totalProfit += job.profit;
          scheduledJobs.push(job);
          placed = true;

          yield createEvent.message(`✓ Job ${job.id} placed in slot ${slot + 1}`, 'step');
          yield createEvent.highlight([10, 11]);

          break;
        } else {
          yield createEvent.message(`Slot ${slot + 1} occupied by Job ${slots[slot]!.id}`, 'step');
        }
      }

      if (!placed) {
        yield createEvent.message(`✗ Job ${job.id} cannot be scheduled (no free slot before deadline ${job.deadline})`, 'step');
      }

      // Show current slot assignments
      const slotDisplay = slots.map((s, i) => s ? `${i + 1}:${s.id}` : `${i + 1}:_`).join(' ');
      yield createEvent.pointer(
        [],
        [
          { name: 'slots', value: slotDisplay },
          { name: 'totalProfit', value: totalProfit, highlight: true },
        ]
      );
    }

    // Final result
    yield createEvent.highlight([13]);
    yield createEvent.message(
      `Maximum profit: $${totalProfit} from ${scheduledJobs.length} jobs: ${scheduledJobs.map(j => j.id).join(', ')}`,
      'info'
    );
    yield createEvent.result('string', `$${totalProfit} profit`, 'Job Sequencing');
  },
};
