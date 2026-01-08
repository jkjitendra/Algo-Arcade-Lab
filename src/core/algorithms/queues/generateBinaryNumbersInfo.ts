/**
 * Generate Binary Numbers Info
 */
export const generateBinaryNumbersInfo = {
  id: 'generate-binary-numbers',
  name: 'Generate Binary Numbers',
  description: 'Generate binary representations of numbers 1 to n using a queue. Each number generates two children by appending 0 and 1, similar to BFS tree traversal.',
  howItWorks: 'Start with "1" in queue. For each step: dequeue front (output it), enqueue front+"0" and front+"1". The queue naturally maintains ascending order.',
  example: `Step-by-Step Execution for N=5:

Step | Action                            | Queue (after)                        | Generated
-----|-----------------------------------|--------------------------------------|------------------
Start| Enqueue "1"                       | [1]                                  | []
1    | Dequeue "1", enqueue "10", "11"   | [10, 11]                             | [1] ✅
2    | Dequeue "10", enqueue "100","101" | [11, 100, 101]                       | [1, 10] ✅
3    | Dequeue "11", enqueue "110","111" | [100, 101, 110, 111]                 | [1, 10, 11] ✅
4    | Dequeue "100", enqueue "1000"...  | [101, 110, 111, 1000, 1001]          | [1, 10, 11, 100] ✅
5    | Dequeue "101", enqueue "1010"...  | [110, 111, 1000, 1001, 1010, 1011]   | [1, 10, 11, 100, 101] ✅ STOP!

The Queue shows leftover numbers that were generated but not needed (we only wanted 5).`,
  keyInsight: 'This is essentially BFS on an implicit binary tree! The root is "1", and each node has children node+"0" and node+"1".',
  bestFor: [
    'Understanding BFS conceptually',
    'Generating sequences efficiently',
    'Interview problem demonstration',
    'Teaching queue applications',
  ],
  avoidWhen: [
    'Standard binary conversion needed',
    'Only specific numbers needed',
    'Memory is very limited (strings grow)',
  ],
  funFact: 'This elegant solution was popularized by programming competitions. It demonstrates how queues can generate sequences that seem unrelated to FIFO ordering!',
  optimizationTips: [
    'Use bit manipulation for actual binary numbers',
    'Avoid string concatenation with StringBuilder',
    'Can be parallelized for very large n',
  ],
  tags: ['BFS', 'Binary', 'Generation', 'O(n)', 'Intermediate'],
};
