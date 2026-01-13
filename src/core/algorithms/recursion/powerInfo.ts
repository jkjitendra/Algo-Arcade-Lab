import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, RecursionNode } from '../../events/events';
import { updateRecursionState } from './utils';

export const powerInfo: IAlgorithm<ArrayInput> = {
  id: 'power-recursion',
  name: 'Power Function (Fast)',
  category: 'recursion',
  difficulty: 'intermediate',
  pseudocodeLines: [
    'function power(x, n):',
    '  if n == 0: return 1',
    '  if n % 2 == 0:',
    '    half = power(x, n/2)',
    '    return half * half',
    '  return x * power(x, n-1)',
  ],
  timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
  spaceComplexity: 'O(log n)',
  parameters: [
    { id: 'x', label: 'Base', type: 'number', min: 1, max: 10, default: 2 },
    { id: 'n', label: 'Exponent', type: 'number', min: 0, max: 20, default: 10 }
  ],

  validate: (input) => ({ ok: true }),

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const x = Number(params?.['x'] ?? 2);
    const n = Number(params?.['n'] ?? 10);
    const nodes: RecursionNode[] = [];
    let rootId: string | undefined;

    yield createEvent.message(`Calculating ${x}^${n}`, 'info');

    function* solve(currentX: number, currentN: number, parentId?: string): Generator<AlgoEvent, number, unknown> {
      const nodeId = Math.random().toString(36).substr(2, 9);
      const node: RecursionNode = {
        id: nodeId,
        label: 'power',
        args: `(${currentX}, ${currentN})`,
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

      yield* updateRecursionState(nodes, rootId, nodeId, `Called power(${currentX}, ${currentN})`);
      yield createEvent.highlight([0]);

      if (currentN === 0) {
        yield createEvent.highlight([1]);
        node.status = 'completed';
        node.result = '1';
        yield* updateRecursionState(nodes, rootId, nodeId, `Base case: n=0, return 1`);
        return 1;
      }

      if (currentN % 2 === 0) {
        yield createEvent.highlight([2, 3]);
        node.status = 'pending';
        yield* updateRecursionState(nodes, rootId, nodeId, `Even n: computing half = power(${currentX}, ${currentN / 2})`);

        const half: number = yield* solve(currentX, currentN / 2, nodeId);

        node.status = 'active';
        const result = half * half;
        node.result = result.toString();
        node.status = 'completed';

        yield createEvent.highlight([4]);
        yield* updateRecursionState(nodes, rootId, nodeId, `Returned ${half} * ${half} = ${result}`);

        return result;
      } else {
        yield createEvent.highlight([5]);
        node.status = 'pending';
        yield* updateRecursionState(nodes, rootId, nodeId, `Odd n: computing ${currentX} * power(${currentX}, ${currentN - 1})`);

        const sub: number = yield* solve(currentX, currentN - 1, nodeId);

        node.status = 'active';
        const result = currentX * sub;
        node.result = result.toString();
        node.status = 'completed';

        yield* updateRecursionState(nodes, rootId, nodeId, `Returned ${currentX} * ${sub} = ${result}`);

        return result;
      }
    }

    const finalResult = yield* solve(x, n);
    yield createEvent.message(`Calculation complete. Result: ${finalResult}`, 'info');
    yield createEvent.result('string', `${x}^${n} = ${finalResult}`, `${x} to the power ${n} = ${finalResult}`);
  }
};

export const powerAbout = {
  id: 'power-recursion',
  name: 'Power Function (Fast)',
  category: 'recursion',
  difficulty: 'intermediate',
  description: 'Calculates x raised to the power n efficiently using Exponentiation by Squaring.',
  howItWorks: 'Instead of multiplying x by itself n times, it recursively squares the base: x^n = (x^(n/2))^2 for even n. This reduces steps logarithmicly.',
  keyInsight: 'Binary exponentiation reduces O(n) complexity to O(log n), making it feasible to compute huge powers (e.g., for cryptography).',
  bestFor: ['Cryptographic calculations (RSA)', 'Matrix exponentiation for Fibonacci', 'Large number arithmetic'],
  avoidWhen: ['n is small (simple loop is faster due to overhead)', 'Precision loss with floating point numbers is a concern'],
  funFact: 'This algorithm date back to 200 BC in Pingala\'s Chandah-sutra, used for calculating prosody combinations.',
  optimizationTips: ['Use bitwise operators check even/odd (n & 1)', 'Use iterative approach to avoid stack space'],
  tags: ['Recursion', 'Math', 'Optimization', 'Intermediate'],
};
