import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, RecursionNode } from '../../events/events';
import { updateRecursionState } from './utils';

export const sumDigitsInfo: IAlgorithm<ArrayInput> = {
  id: 'sum-digits-recursion',
  name: 'Sum of Digits',
  category: 'recursion',
  difficulty: 'beginner',
  pseudocodeLines: [
    'function sumDigits(n):',
    '  if n < 10:',
    '    return n',
    '  return (n % 10) + sumDigits(floor(n / 10))',
  ],
  timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
  spaceComplexity: 'O(log n)',
  parameters: [
    { id: 'n', label: 'Number', type: 'number', min: 0, max: 1000000, default: 12345 }
  ],

  validate: (input) => ({ ok: true }),

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const n = Number(params?.['n'] ?? 12345);
    const nodes: RecursionNode[] = [];
    let rootId: string | undefined;

    yield createEvent.message(`Calculating Sum of Digits for ${n}`, 'info');

    function* solve(currentN: number, parentId?: string): Generator<AlgoEvent, number, unknown> {
      const nodeId = Math.random().toString(36).substr(2, 9);
      const node: RecursionNode = {
        id: nodeId,
        label: 'sumDigits',
        args: `(${currentN})`,
        status: 'active',
        depth: parentId ? (nodes.find(x => x.id === parentId)?.depth ?? 0) + 1 : 0,
        parentId,
        children: []
      };

      if (!rootId) rootId = nodeId;
      if (parentId) {
        const parent = nodes.find(x => x.id === parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(nodeId);
        }
      }
      nodes.push(node);

      yield* updateRecursionState(nodes, rootId, nodeId, `Called sumDigits(${currentN})`);
      yield createEvent.highlight([0]);

      if (currentN < 10) {
        yield createEvent.highlight([1, 2]);
        node.status = 'completed';
        node.result = currentN.toString();
        yield* updateRecursionState(nodes, rootId, nodeId, `Base case: ${currentN} < 10, return ${currentN}`);
        return currentN;
      }

      yield createEvent.highlight([3]);
      node.status = 'pending';
      const lastDigit = currentN % 10;
      const remaining = Math.floor(currentN / 10);

      yield* updateRecursionState(nodes, rootId, nodeId, `Splitting: ${lastDigit} + sumDigits(${remaining})`);

      const subResult = yield* solve(remaining, nodeId);

      const result = lastDigit + subResult;
      node.status = 'completed';
      node.result = result.toString();

      yield createEvent.highlight([3]);
      yield* updateRecursionState(nodes, rootId, nodeId, `Result: ${lastDigit} + ${subResult} = ${result}`);

      return result;
    }

    const finalResult = yield* solve(n);
    yield createEvent.message(`Sum of digits complete. Result: ${finalResult}`, 'info');
    yield createEvent.result('string', `Sum = ${finalResult}`, `Sum of digits of ${n} = ${finalResult}`);
  }
};

export const sumDigitsAbout = {
  id: 'sum-digits-recursion',
  name: 'Sum of Digits',
  category: 'recursion',
  difficulty: 'beginner',
  description: 'Calculates the sum of all digits in a number using recursion (e.g., 123 -> 1+2+3 = 6).',
  howItWorks: 'Recursively checks the last digit (n % 10) and adds it to the sum of digits of the remainder (n / 10). Base case: n < 10 returns n.',
  keyInsight: 'Processing digits from right to left using modulo and division is a standard pattern for digit-based algorithms.',
  bestFor: ['Digital root calculations', 'Checksum verification', 'Practicing mathematical recursion'],
  avoidWhen: ['Input number is extremely large (use string processing instead)', 'Stack depth limits are tight'],
  funFact: 'A number is divisible by 9 if and only if the sum of its digits is divisible by 9. This recursive property is the basis of the rule.',
  optimizationTips: ['Iterative version uses a simple while loop', 'Tail recursion can be enabled by passing running sum'],
  tags: ['Recursion', 'Math', 'Digits', 'Beginner'],
};
