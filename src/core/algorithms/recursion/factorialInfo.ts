import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, RecursionNode } from '../../events/events';
import { updateRecursionState } from './utils';

export const factorialInfo: IAlgorithm<ArrayInput> = {
  id: 'factorial-recursion',
  name: 'Factorial (Recursion)',
  category: 'recursion',
  difficulty: 'beginner',
  pseudocodeLines: [
    'function factorial(n):',
    '  if n <= 1:',
    '    return 1',
    '  return n * factorial(n - 1)',
  ],
  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(n)',
  parameters: [
    { id: 'n', label: 'N', type: 'number', min: 0, max: 10, default: 5 }
  ],

  validate: (input) => ({ ok: true }), // Params handled separately

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const n = Number(params?.['n'] ?? 5);
    const nodes: RecursionNode[] = [];
    let rootId: string | undefined;

    yield createEvent.message(`Calculating Factorial of ${n}`, 'info');

    function* solve(currentN: number, parentId?: string): Generator<AlgoEvent, number, unknown> {
      const nodeId = Math.random().toString(36).substr(2, 9);
      const node: RecursionNode = {
        id: nodeId,
        label: 'factorial',
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

      yield* updateRecursionState(nodes, rootId, nodeId, `Called factorial(${currentN})`);
      yield createEvent.highlight([0]); // Function definition

      if (currentN <= 1) {
        yield createEvent.highlight([1, 2]); // Base case
        node.status = 'completed';
        node.result = '1';
        yield* updateRecursionState(nodes, rootId, nodeId, `Base case reached: return 1`);
        return 1;
      }

      yield createEvent.highlight([3]); // Recursive call
      node.status = 'pending';
      yield* updateRecursionState(nodes, rootId, nodeId, `Computing ${currentN} * factorial(${currentN - 1})`);

      const subResult = yield* solve(currentN - 1, nodeId);

      const result = currentN * subResult;
      node.status = 'completed';
      node.result = result.toString();

      yield createEvent.highlight([3]); // Return statement
      yield* updateRecursionState(nodes, rootId, nodeId, `Returned: ${currentN} * ${subResult} = ${result}`);

      return result;
    }

    const finalResult = yield* solve(n);
    yield createEvent.message(`Factorial calculation complete. Result: ${finalResult}`, 'info');
    yield createEvent.result('string', `${n}! = ${finalResult}`, `Factorial of ${n} = ${finalResult}`);
  }
};
