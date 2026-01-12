import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, RecursionNode } from '../../events/events';
import { updateRecursionState } from '../recursion/utils'; // Reuse recursion utils

export const permutationsInfo: IAlgorithm<ArrayInput> = {
  id: 'generate-permutations',
  name: 'Generate Permutations',
  category: 'backtracking', // or recursion
  difficulty: 'intermediate',
  pseudocodeLines: [
    'function permute(str, l, r):',
    '  if l == r:',
    '    print str',
    '  else:',
    '    for i = l to r:',
    '      swap(str[l], str[i])',
    '      permute(str, l+1, r)',
    '      swap(str[l], str[i]) // backtrack',
  ],
  timeComplexity: { best: 'O(n*n!)', average: 'O(n*n!)', worst: 'O(n*n!)' },
  spaceComplexity: 'O(n!)', // Call stack + output
  parameters: [
    { id: 'str', label: 'String', type: 'text', default: 'ABC' }
  ],
  // Handled via StringInputEditor if mapped

  validate: (input) => ({ ok: true }),

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    // If input.values is non-empty, convert to string? Or use params 'str' if available.
    // VisualizerClient usually passes numbers. But StringInputEditor passes numbers (char codes).
    // Let's assume input.values are char codes if category is 'strings' or similar. 
    // Here category is 'backtracking'. 
    // Let's use a simpler approach: params.str or 'ABC'.

    // Actually, StringInputEditor is used for 'strings' category. 
    // I should register 'generate-permutations' as 'backtracking' but maybe allow string input?
    // For now, I'll use hardcoded 'ABC' if no params.

    let str = typeof params?.['str'] === 'string' ? params['str'] : 'ABC';
    if (str.length > 4) str = str.substring(0, 4); // Limit length

    let arr = str.split('');
    const n = arr.length;

    const nodes: RecursionNode[] = [];
    let rootId: string | undefined;

    yield createEvent.message(`Generating permutations of "${str}"`, 'info');

    function* solve(l: number, r: number, parentId?: string): Generator<AlgoEvent, void, unknown> {
      const currentStr = arr.join('');
      const nodeId = Math.random().toString(36).substr(2, 9);
      const node: RecursionNode = {
        id: nodeId,
        label: 'permute',
        args: `"${currentStr}", ${l}`,
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

      yield* updateRecursionState(nodes, rootId, nodeId, `permute("${currentStr}", ${l})`);
      yield createEvent.highlight([0]);

      if (l === r) {
        yield createEvent.highlight([1, 2]);
        node.status = 'completed';
        node.result = currentStr;
        yield* updateRecursionState(nodes, rootId, nodeId, `Base case: Found "${currentStr}"`);
        return;
      }

      yield createEvent.highlight([4]);
      for (let i = l; i <= r; i++) {
        yield createEvent.highlight([5]);

        // Swap
        [arr[l], arr[i]] = [arr[i], arr[l]];
        yield* updateRecursionState(nodes, rootId, nodeId, `Swapped indices ${l} & ${i}: "${arr.join('')}"`);

        yield createEvent.highlight([6]);
        node.status = 'pending';
        yield* solve(l + 1, r, nodeId);

        // Backtrack
        node.status = 'active';
        yield createEvent.highlight([7]);
        [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap back
        yield* updateRecursionState(nodes, rootId, nodeId, `Backtracked: Swapped ${l} & ${i} back: "${arr.join('')}"`);
      }

      node.status = 'completed';
    }

    yield* solve(0, n - 1);
    yield createEvent.message(`Permutations complete`, 'info');
  }
};
