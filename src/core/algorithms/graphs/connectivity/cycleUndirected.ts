import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Cycle Detection in Undirected Graph
 * 
 * Uses DFS with parent tracking to detect cycles.
 * A cycle exists if we visit a node that's already visited
 * and it's not the parent of the current node.
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export const cycleUndirected: IAlgorithm<GraphInput> = {
  id: 'cycle-undirected',
  name: 'Cycle Detection (Undirected)',
  category: 'graphs',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function hasCycle(graph):',
    '  visited = {} (empty set)',
    '  for each vertex v:',
    '    if v not in visited:',
    '      if DFS(v, null): return true',
    '  return false',
    '',
    'function DFS(u, parent):',
    '  visited.add(u)',
    '  for each neighbor v of u:',
    '    if v not in visited:',
    '      if DFS(v, u): return true',
    '    else if v ≠ parent:',
    '      return true  // back edge = cycle!',
    '  return false',
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
    if (input.isDirected) {
      return { ok: false, error: 'This algorithm is for undirected graphs. Use Cycle Detection (Directed) for directed graphs.' };
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
      adjList.get(edge.target)!.push(edge.source);
    });

    yield createEvent.message(
      `Detecting cycles in undirected graph (${nodes.length} nodes, ${edges.length} edges)`,
      'info'
    );

    yield createEvent.highlight([0, 1]);

    const visited: Set<string> = new Set();
    let cycleFound = false;
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
      isDirected: false,
    }));

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected: false,
        isWeighted,
        message: 'Starting cycle detection using DFS with parent tracking',
      },
    });

    // DFS helper function
    function* dfs(u: string, parent: string | null): Generator<AlgoEvent, boolean, unknown> {
      visited.add(u);

      yield createEvent.highlight([7, 8]);
      yield createEvent.message(
        `DFS(${u}, parent=${parent ?? 'null'})`,
        'step'
      );

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'exploring',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            state: n.id === u ? 'current' as const :
              n.id === parent ? 'processing' as const :
                visited.has(n.id) ? 'visited' as const : 'default' as const,
          })),
          edges: graphEdges,
          isDirected: false,
          isWeighted,
          message: `Exploring "${u}" (parent: ${parent ?? 'none'})`,
        },
      });

      // Check neighbors
      yield createEvent.highlight([9, 10, 11, 12, 13]);

      const neighbors = adjList.get(u) || [];
      for (const v of neighbors) {
        // Find edge for visualization
        const edgeIdx = graphEdges.findIndex(e =>
          (e.source === u && e.target === v) ||
          (e.source === v && e.target === u)
        );

        if (!visited.has(v)) {
          yield createEvent.message(
            `  ${u} → ${v}: unvisited, recursing`,
            'explanation'
          );

          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }

          const foundCycle: boolean = yield* dfs(v, u);
          if (foundCycle) return true;
        } else if (v !== parent) {
          // Found a back edge - cycle detected!
          cycleFound = true;
          cycleEdge = { u, v };

          yield createEvent.message(
            `  ⚠️ Back edge ${u} → ${v}: CYCLE DETECTED!`,
            'info'
          );

          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'back-edge';
          }

          yield createEvent.auxiliary({
            type: 'graph',
            phase: 'cycle-found',
            graphState: {
              nodes: graphNodes.map(n => ({
                ...n,
                state: n.id === u || n.id === v ? 'current' as const :
                  visited.has(n.id) ? 'visited' as const : 'default' as const,
              })),
              edges: graphEdges,
              isDirected: false,
              isWeighted,
              message: `Cycle detected via back edge: ${u} → ${v}`,
            },
          });

          return true;
        } else {
          yield createEvent.message(
            `  ${u} → ${v}: parent edge, skipping`,
            'explanation'
          );
        }
      }

      return false;
    }

    // Run DFS from each unvisited node
    yield createEvent.highlight([2, 3, 4]);

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        yield createEvent.message(
          `Starting DFS from "${node.id}"`,
          'info'
        );

        const foundCycle: boolean = yield* dfs(node.id, null);
        if (foundCycle) break;
      }
    }

    // Final result
    yield createEvent.highlight([5]);

    if (cycleFound) {
      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'complete',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            state: visited.has(n.id) ? 'finished' as const : 'default' as const,
          })),
          edges: graphEdges,
          isDirected: false,
          isWeighted,
          message: `Cycle detected! Back edge: ${cycleEdge!.u} ↔ ${cycleEdge!.v}`,
        },
      });

      yield createEvent.result(
        'boolean',
        true,
        `Cycle exists (back edge: ${cycleEdge!.u} ↔ ${cycleEdge!.v})`
      );
    } else {
      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'complete',
        graphState: {
          nodes: graphNodes.map(n => ({ ...n, state: 'finished' as const })),
          edges: graphEdges.map(e => ({ ...e, state: 'visited' as const })),
          isDirected: false,
          isWeighted,
          message: 'No cycle detected - graph is a forest',
        },
      });

      yield createEvent.message(
        'No cycle detected - the graph is acyclic (a forest)',
        'info'
      );

      yield createEvent.result(
        'boolean',
        false,
        'No cycle exists - graph is a forest'
      );
    }
  },
};
