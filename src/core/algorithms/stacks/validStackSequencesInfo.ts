/**
 * Valid Stack Sequences Info
 */
export const validStackSequencesInfo = {
  id: 'valid-stack-sequences',
  name: 'Valid Stack Sequences',
  description: 'Determine if a given push and pop sequence is valid for stack operations.',
  howItWorks: 'Simulate the push operations. After each push, greedily pop whenever the top matches the expected pop value. Valid if all elements are popped at the end.',
  keyInsight: 'Greedy popping works because if we can pop now, waiting will never help - the element will still need to be popped.',
  bestFor: [
    'Stack behavior validation',
    'Interview problems',
    'Parsing verification',
  ],
  avoidWhen: [
    'Input sequences are guaranteed valid',
    'Simple push/pop counting suffices',
  ],
  funFact: 'This problem tests understanding of LIFO property - the number of valid sequences for n elements is the Catalan number!',
  optimizationTips: [
    'Early termination if sequences have different lengths',
    'Can be done with O(1) extra space by modifying input',
  ],
  tags: ['Stack', 'Simulation', 'Validation', 'Intermediate'],
};
