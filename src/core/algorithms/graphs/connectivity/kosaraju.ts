import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Kosaraju's Algorithm
 * 
 * Find Strongly Connected Components (SCCs) in a directed graph.
 * Two passes: DFS to get finish order, then DFS on transpose.
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export const kosaraju: IAlgorithm<GraphInput> = {
  id: 'kosaraju',
  name: "Kosaraju's Algorithm (SCCs)",
  category: 'graphs',
  difficulty: 'advanced',

  pseudocodeLines: [
    "function Kosaraju(graph):",
    '  // Pass 1: Get finish order via DFS',
    '  stack = []',
    '  for each vertex v:',
    '    if v not visited:',
    '      DFS1(v, stack)',
    '  ',
    '  // Pass 2: Process in reverse finish order on transpose',
    '  transpose = reverse all edges',
    '  sccId = 0',
    '  while stack not empty:',
    '    v = stack.pop()',
    '    if v not visited:',
    '      DFS2(v, sccId, transpose)',
    '      sccId++',
    '  return SCCs',
  ],

  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
  },

  spaceComplexity: 'O(V)',

  validate(input: GraphInput) {
    if (!input.nodes || !Array.isArray(input.nodes)) {
      return { ok: false, error: 'Input must have nodes array' };
    }
    if (input.nodes.length === 0) {
      return { ok: false, error: 'Graph must have at least one node' };
    }
    if (input.nodes.length > 12) {
      return { ok: false, error: 'Maximum 12 nodes for visualization' };
    }
    if (!input.isDirected) {
      return { ok: false, error: "Kosaraju's algorithm requires a directed graph" };
    }
    return { ok: true };
  },

  *run(input: GraphInput): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isWeighted } = input;

    // Build adjacency list and transpose
    const adjList: Map<string, string[]> = new Map();
    const transpose: Map<string, string[]> = new Map();
    nodes.forEach(node => {
      adjList.set(node.id, []);
      transpose.set(node.id, []);
    });
    edges.forEach(edge => {
      adjList.get(edge.source)!.push(edge.target);
      transpose.get(edge.target)!.push(edge.source); // Reverse direction
    });

    yield createEvent.message(
      `Running Kosaraju's Algorithm for SCCs (${nodes.length} nodes)`,
      'info'
    );

    // Initialize graph state
    const graphNodes = nodes.map(node => ({
      id: node.id,
      label: node.label || node.id,
      state: 'default' as const,
      x: node.x,
      y: node.y,
    }));

    const graphEdges: { source: string; target: string; weight?: number; state: 'default' | 'visited' | 'current' | 'path' | 'mst' | 'back-edge'; isDirected: boolean }[] = edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      weight: edge.weight,
      state: 'default',
      isDirected: true,
    }));

    // ============ PASS 1: Get finish order ============
    yield createEvent.highlight([1, 2, 3, 4, 5]);
    yield createEvent.message(
      '=== Pass 1: DFS to determine finish order ===',
      'info'
    );

    const visited1: Set<string> = new Set();
    const finishStack: string[] = [];

    function* dfs1(u: string): Generator<AlgoEvent, void, unknown> {
      visited1.add(u);

      yield createEvent.message(
        `  DFS1(${u})`,
        'step'
      );

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'pass1',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            state: n.id === u ? 'current' as const :
              visited1.has(n.id) ? 'visited' as const : 'default' as const,
          })),
          edges: graphEdges,
          isDirected: true,
          isWeighted,
          stack: [...finishStack],
          message: `Pass 1: Exploring "${u}"`,
        },
      });

      const neighbors = adjList.get(u) || [];
      for (const v of neighbors) {
        if (!visited1.has(v)) {
          yield* dfs1(v);
        }
      }

      finishStack.push(u);
      yield createEvent.message(
        `  Finished "${u}" → push to stack`,
        'explanation'
      );
    }

    for (const node of nodes) {
      if (!visited1.has(node.id)) {
        yield* dfs1(node.id);
      }
    }

    yield createEvent.message(
      `Finish order (stack): [${finishStack.join(', ')}]`,
      'info'
    );

    // ============ PASS 2: DFS on transpose ============
    yield createEvent.highlight([7, 8, 9, 10, 11, 12, 13, 14]);
    yield createEvent.message(
      '=== Pass 2: DFS on transpose graph ===',
      'info'
    );

    const visited2: Set<string> = new Set();
    const scc: Map<string, number> = new Map();
    let sccId = 0;
    const sccNodes: string[][] = [];

    // SCC colors for visualization
    const colors = ['source', 'target', 'path', 'processing', 'visited'];

    function* dfs2(u: string, compId: number): Generator<AlgoEvent, void, unknown> {
      visited2.add(u);
      scc.set(u, compId);
      sccNodes[compId].push(u);

      yield createEvent.message(
        `  DFS2(${u}) → SCC ${compId}`,
        'step'
      );

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'pass2',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            state: n.id === u ? 'current' as const :
              scc.has(n.id) ? (colors[scc.get(n.id)! % colors.length] as any) : 'default' as const,
            componentId: scc.get(n.id),
          })),
          edges: graphEdges,
          isDirected: true,
          isWeighted,
          message: `Pass 2: "${u}" assigned to SCC ${compId}`,
        },
      });

      // Use transpose graph
      const neighbors = transpose.get(u) || [];
      for (const v of neighbors) {
        if (!visited2.has(v)) {
          yield* dfs2(v, compId);
        }
      }
    }

    // Process in reverse finish order
    while (finishStack.length > 0) {
      const v = finishStack.pop()!;
      if (!visited2.has(v)) {
        yield createEvent.message(
          `Starting SCC ${sccId} from "${v}"`,
          'info'
        );
        sccNodes.push([]);
        yield* dfs2(v, sccId);
        sccId++;
      }
    }

    // Final result
    yield createEvent.highlight([15]);

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({
          ...n,
          state: (colors[scc.get(n.id)! % colors.length] as any),
          componentId: scc.get(n.id),
        })),
        edges: graphEdges,
        isDirected: true,
        isWeighted,
        message: `Found ${sccId} Strongly Connected Component(s)`,
      },
    });

    yield createEvent.message(
      `Kosaraju's Algorithm complete! Found ${sccId} SCCs`,
      'info'
    );

    const sccsStr = sccNodes
      .map((nodes, idx) => `SCC ${idx}: [${nodes.join(', ')}]`)
      .join(' | ');

    yield createEvent.result(
      'string',
      `${sccId} SCCs`,
      sccsStr
    );
  },
};
