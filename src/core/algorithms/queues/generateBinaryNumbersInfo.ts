/**
 * Generate Binary Numbers Info
 */
export const generateBinaryNumbersInfo = {
  id: 'generate-binary-numbers',
  name: 'Generate Binary Numbers',
  description: 'Generate binary representations of numbers 1 to n using a queue. Each number generates two children by appending 0 and 1, similar to BFS tree traversal.',
  howItWorks: 'Start with "1" in queue. For each step: dequeue front (output it), enqueue front+"0" and front+"1". The queue naturally maintains ascending order.',
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
