import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * DFS-based Topological Sort
 * 
 * Topological ordering using DFS finish times.
 * Nodes are added to result in reverse finish order.
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export const dfsTopoSort: IAlgorithm<GraphInput> = {
  id: 'dfs-topo-sort',
  name: 'DFS Topological Sort',
  category: 'graphs',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function DFSTopoSort(graph):',
    '  visited = {} (empty set)',
    '  stack = []   // result stack',
    '  for each vertex v in graph:',
    '    if v not in visited:',
    '      DFS(v)',
    '  return reverse(stack)',
    '',
    'function DFS(u):',
    '  visited.add(u)',
    '  for each neighbor v of u:',
    '    if v not in visited:',
    '      DFS(v)',
    '  stack.push(u)  // add after exploring all descendants',
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
    if (input.nodes.length > 15) {
      return { ok: false, error: 'Maximum 15 nodes for visualization' };
    }
    if (!input.isDirected) {
      return { ok: false, error: 'Topological sort requires a directed graph' };
    }
    return { ok: true };
  },

  *run(input: GraphInput): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isWeighted } = input;

    // Build adjacency list
    const adjList: Map<string, string[]> = new Map();
    nodes.forEach(node => adjList.set(node.id, []));
    edges.forEach(edge => {
      adjList.get(edge.source)!.push(edge.target);
    });

    yield createEvent.message(
      `Running DFS-based Topological Sort on ${nodes.length} nodes`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2]);

    // State tracking
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color: Map<string, number> = new Map();
    nodes.forEach(node => color.set(node.id, WHITE));

    const stack: string[] = [];
    let hasCycle = false;
    let cycleEdge: { u: string; v: string } | null = null;

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

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected: true,
        isWeighted,
        stack: [],
        message: 'All nodes start as WHITE (unvisited)',
      },
    });

    // DFS helper generator
    function* dfs(u: string): Generator<AlgoEvent, void, unknown> {
      color.set(u, GRAY);

      yield createEvent.highlight([8, 9]);
      yield createEvent.message(
        `DFS(${u}): marking GRAY (in progress)`,
        'step'
      );

      // Update visualization
      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'exploring',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            state: n.id === u ? 'current' as const :
              color.get(n.id) === GRAY ? 'processing' as const :
                color.get(n.id) === BLACK ? 'finished' as const : 'default' as const,
          })),
          edges: graphEdges,
          isDirected: true,
          isWeighted,
          stack: [...stack],
          message: `Exploring "${u}" (GRAY)`,
        },
      });

      // Explore neighbors
      yield createEvent.highlight([10, 11, 12]);

      const neighbors = adjList.get(u) || [];
      for (const v of neighbors) {
        // Find edge for visualization
        const edgeIdx = graphEdges.findIndex(e => e.source === u && e.target === v);

        if (color.get(v) === WHITE) {
          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'current';
          }

          yield createEvent.message(
            `  ${u} → ${v}: recursing into unvisited node`,
            'explanation'
          );

          yield* dfs(v);

          if (hasCycle) return;

          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }
        } else if (color.get(v) === GRAY) {
          // Back edge - cycle detected!
          hasCycle = true;
          cycleEdge = { u, v };

          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'back-edge';
          }

          yield createEvent.message(
            `  ⚠️ Back edge ${u} → ${v}: cycle detected!`,
            'info'
          );

          yield createEvent.auxiliary({
            type: 'graph',
            phase: 'cycle',
            graphState: {
              nodes: graphNodes.map(n => ({
                ...n,
                state: n.id === u || n.id === v ? 'current' as const :
                  color.get(n.id) === GRAY ? 'processing' as const : 'default' as const,
              })),
              edges: graphEdges,
              isDirected: true,
              isWeighted,
              message: `Back edge detected: ${u} → ${v}`,
            },
          });
          return;
        } else {
          yield createEvent.message(
            `  ${u} → ${v}: already finished (BLACK), skipping`,
            'explanation'
          );
        }
      }

      // Finish: mark BLACK and add to stack
      yield createEvent.highlight([13]);
      color.set(u, BLACK);
      stack.push(u);

      yield createEvent.message(
        `DFS(${u}): finished, marking BLACK, pushing to stack`,
        'step'
      );

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'finishing',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            state: n.id === u ? 'finished' as const :
              color.get(n.id) === GRAY ? 'processing' as const :
                color.get(n.id) === BLACK ? 'finished' as const : 'default' as const,
          })),
          edges: graphEdges,
          isDirected: true,
          isWeighted,
          stack: [...stack],
          message: `"${u}" finished, added to stack`,
        },
      });
    }

    // Run DFS from each unvisited node
    yield createEvent.highlight([3, 4, 5]);

    for (const node of nodes) {
      if (color.get(node.id) === WHITE) {
        yield createEvent.message(
          `Starting DFS from "${node.id}"`,
          'info'
        );

        yield* dfs(node.id);

        if (hasCycle) break;
      }
    }

    // Check for cycle
    if (hasCycle) {
      yield createEvent.result(
        'string',
        'Cycle detected',
        `Graph contains a cycle (${cycleEdge!.u} → ${cycleEdge!.v}). Topological sort not possible.`
      );
      return;
    }

    // Reverse stack to get topological order
    yield createEvent.highlight([6]);

    const result = [...stack].reverse();

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map((n, i) => ({
          ...n,
          state: 'finished' as const,
          distance: result.indexOf(n.id) + 1, // Position in ordering
        })),
        edges: graphEdges.map(e => ({ ...e, state: 'visited' as const })),
        isDirected: true,
        isWeighted,
        stack: result,
        message: `Topological order: [${result.join(' → ')}]`,
      },
    });

    yield createEvent.message(
      `DFS Topological Sort complete! Order: [${result.join(' → ')}]`,
      'info'
    );

    yield createEvent.result(
      'string',
      'Topological order',
      `[${result.join(', ')}]`
    );
  },
};
