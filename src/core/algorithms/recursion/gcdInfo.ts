import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, RecursionNode } from '../../events/events';
import { updateRecursionState } from './utils';

export const gcdInfo: IAlgorithm<ArrayInput> = {
  id: 'gcd-recursion',
  name: 'GCD (Euclidean)',
  category: 'recursion',
  difficulty: 'beginner',
  pseudocodeLines: [
    'function gcd(a, b):',
    '  if b == 0:',
    '    return a',
    '  return gcd(b, a % b)',
  ],
  timeComplexity: { best: 'O(1)', average: 'O(log(min(a,b)))', worst: 'O(log(min(a,b)))' },
  spaceComplexity: 'O(log(min(a,b)))',
  parameters: [
    { id: 'a', label: 'A', type: 'number', min: 1, max: 100, default: 48 },
    { id: 'b', label: 'B', type: 'number', min: 0, max: 100, default: 18 }
  ],

  validate: (input) => ({ ok: true }),

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const a = Number(params?.['a'] ?? 48);
    const b = Number(params?.['b'] ?? 18);
    const nodes: RecursionNode[] = [];
    let rootId: string | undefined;

    yield createEvent.message(`Calculating GCD of ${a} and ${b}`, 'info');

    function* solve(currentA: number, currentB: number, parentId?: string): Generator<AlgoEvent, number, unknown> {
      const nodeId = Math.random().toString(36).substr(2, 9);
      const node: RecursionNode = {
        id: nodeId,
        label: 'gcd',
        args: `(${currentA}, ${currentB})`,
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

      yield* updateRecursionState(nodes, rootId, nodeId, `Called gcd(${currentA}, ${currentB})`);
      yield createEvent.highlight([0]);

      if (currentB === 0) {
        yield createEvent.highlight([1, 2]);
        node.status = 'completed';
        node.result = currentA.toString();
        yield* updateRecursionState(nodes, rootId, nodeId, `Base case: b=0, return a (${currentA})`);
        return currentA;
      }

      yield createEvent.highlight([3]);
      node.status = 'pending';
      const remainder = currentA % currentB;
      yield* updateRecursionState(nodes, rootId, nodeId, `Recursing: gcd(${currentB}, ${currentA} % ${currentB}) = gcd(${currentB}, ${remainder})`);

      const result = yield* solve(currentB, remainder, nodeId);

      node.status = 'completed';
      node.result = result.toString();

      yield* updateRecursionState(nodes, rootId, nodeId, `Returned ${result}`);

      return result;
    }

    const finalResult = yield* solve(a, b);
    yield createEvent.message(`GCD calculation complete. Result: ${finalResult}`, 'info');
    yield createEvent.result('string', `GCD = ${finalResult}`, `GCD(${a}, ${b}) = ${finalResult}`);
  }
};
