import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, RecursionNode } from '../../events/events';
import { updateRecursionState } from './utils';

export const fibonacciInfo: IAlgorithm<ArrayInput> = {
  id: 'fibonacci-recursion',
  name: 'Fibonacci (Recursion)',
  category: 'recursion',
  difficulty: 'intermediate',
  pseudocodeLines: [
    'function fib(n):',
    '  if n <= 1:',
    '    return n',
    '  return fib(n - 1) + fib(n - 2)',
  ],
  timeComplexity: { best: 'O(1)', average: 'O(2^n)', worst: 'O(2^n)' },
  spaceComplexity: 'O(n)',
  parameters: [
    { id: 'n', label: 'N', type: 'number', min: 0, max: 6, default: 4 }
  ],

  validate: (input) => ({ ok: true }),

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const n = Number(params?.['n'] ?? 4);
    const nodes: RecursionNode[] = [];
    let rootId: string | undefined;

    yield createEvent.message(`Calculating Fibonacci of ${n}`, 'info');

    function* solve(currentN: number, parentId?: string): Generator<AlgoEvent, number, unknown> {
      const nodeId = Math.random().toString(36).substr(2, 9);
      const node: RecursionNode = {
        id: nodeId,
        label: 'fib',
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

      yield* updateRecursionState(nodes, rootId, nodeId, `Called fib(${currentN})`);
      yield createEvent.highlight([0]);

      if (currentN <= 1) {
        yield createEvent.highlight([1, 2]);
        node.status = 'completed';
        node.result = currentN.toString();
        yield* updateRecursionState(nodes, rootId, nodeId, `Base case: return ${currentN}`);
        return currentN;
      }

      yield createEvent.highlight([3]);
      node.status = 'pending';
      yield* updateRecursionState(nodes, rootId, nodeId, `Computing fib(${currentN - 1})`);

      const leftResult = yield* solve(currentN - 1, nodeId);

      // Re-activate current node context
      node.status = 'active';
      // Mark left child completed clearly? It's already marked completed inside solve.
      yield* updateRecursionState(nodes, rootId, nodeId, `Got fib(${currentN - 1})=${leftResult}, now computing fib(${currentN - 2})`);

      // Set to pending again before going down right
      node.status = 'pending';
      const rightResult = yield* solve(currentN - 2, nodeId);

      const result = leftResult + rightResult;
      node.status = 'completed';
      node.result = result.toString();

      yield createEvent.highlight([3]);
      yield* updateRecursionState(nodes, rootId, nodeId, `Result: ${leftResult} + ${rightResult} = ${result}`);

      return result;
    }

    const finalResult = yield* solve(n);
    yield createEvent.message(`Fibonacci calculation complete. Result: ${finalResult}`, 'info');
    yield createEvent.result('string', `fib(${n}) = ${finalResult}`, `Fibonacci of ${n} = ${finalResult}`);
  }
};

export const fibonacciAbout = {
  id: 'fibonacci-recursion',
  name: 'Fibonacci (Recursion)',
  category: 'recursion',
  difficulty: 'intermediate',
  description: 'Calculates the nth Fibonacci number, where each number is the sum of the two preceding ones (0, 1, 1, 2, 3, 5...).',
  howItWorks: 'Recursively calls fib(n-1) and fib(n-2) until reaching base cases n=0 or n=1. Results are summed up the call tree.',
  keyInsight: 'Naive recursion computes the same values many times (overlapping subproblems), leading to O(2^n) complexity. Memoization or iteration reduces this to O(n).',
  bestFor: ['Demonstrating exponential growth of recursion', 'Teaching memoization/dynamic programming', 'Modeling natural phenomena'],
  avoidWhen: ['Performance is critical (use iterative or matrix exponentiation)', 'n is large'],
  funFact: 'Fibonacci numbers appear often in nature, such as in the arrangement of leaves, pinecone scales, and sunflower seeds (Golden Ratio).',
  optimizationTips: ['Use memoization (top-down DP)', 'Use iterative approach (bottom-up)', 'Use matrix multiplication for O(log n)'],
  tags: ['Recursion', 'Math', 'Sequence', 'Intermediate'],
};
