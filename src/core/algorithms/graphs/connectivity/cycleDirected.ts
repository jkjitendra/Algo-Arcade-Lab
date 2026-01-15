import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Cycle Detection in Directed Graph
 * 
 * Uses DFS with three colors (white/gray/black).
 * A cycle exists if we encounter a gray node (currently in recursion stack).
 * 
 * WHITE = unvisited, GRAY = in progress, BLACK = finished
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export const cycleDirected: IAlgorithm<GraphInput> = {
  id: 'cycle-directed',
  name: 'Cycle Detection (Directed)',
  category: 'graphs',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function hasCycle(graph):',
    '  color[v] = WHITE for all v',
    '  for each vertex v:',
    '    if color[v] == WHITE:',
    '      if DFS(v): return true',
    '  return false',
    '',
    'function DFS(u):',
    '  color[u] = GRAY    // entering',
    '  for each neighbor v of u:',
    '    if color[v] == GRAY:',
    '      return true   // back edge = cycle!',
    '    if color[v] == WHITE:',
    '      if DFS(v): return true',
    '  color[u] = BLACK   // finished',
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
    if (!input.isDirected) {
      return { ok: false, error: 'This algorithm is for directed graphs. Use Cycle Detection (Undirected) for undirected graphs.' };
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
      `Detecting cycles in directed graph (${nodes.length} nodes, ${edges.length} edges)`,
      'info'
    );

    yield createEvent.highlight([0, 1]);

    // Color constants
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color: Map<string, number> = new Map();
    nodes.forEach(node => color.set(node.id, WHITE));

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
      isDirected: true,
    }));

    const getNodeState = (nodeId: string) => {
      const c = color.get(nodeId);
      if (c === GRAY) return 'processing';
      if (c === BLACK) return 'finished';
      return 'default';
    };

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected: true,
        isWeighted,
        message: 'All nodes start WHITE (unvisited)',
      },
    });

    // DFS helper
    function* dfs(u: string): Generator<AlgoEvent, boolean, unknown> {
      color.set(u, GRAY);

      yield createEvent.highlight([7, 8]);
      yield createEvent.message(
        `DFS(${u}): marking GRAY (in recursion stack)`,
        'step'
      );

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
          message: `"${u}" is GRAY (currently being explored)`,
        },
      });

      // Check neighbors
      yield createEvent.highlight([9, 10, 11, 12, 13]);

      const neighbors = adjList.get(u) || [];
      for (const v of neighbors) {
        const edgeIdx = graphEdges.findIndex(e => e.source === u && e.target === v);

        if (color.get(v) === GRAY) {
          // Back edge - cycle detected!
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
                  color.get(n.id) === GRAY ? 'processing' as const :
                    color.get(n.id) === BLACK ? 'finished' as const : 'default' as const,
              })),
              edges: graphEdges,
              isDirected: true,
              isWeighted,
              message: `Cycle detected! Back edge: ${u} → ${v}`,
            },
          });

          return true;
        }

        if (color.get(v) === WHITE) {
          yield createEvent.message(
            `  ${u} → ${v}: unvisited (WHITE), recursing`,
            'explanation'
          );

          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }

          const foundCycle: boolean = yield* dfs(v);
          if (foundCycle) return true;
        } else {
          yield createEvent.message(
            `  ${u} → ${v}: already finished (BLACK), safe edge`,
            'explanation'
          );
        }
      }

      // Mark as finished
      yield createEvent.highlight([14]);
      color.set(u, BLACK);

      yield createEvent.message(
        `DFS(${u}): finished, marking BLACK`,
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
          message: `"${u}" marked BLACK (completely explored)`,
        },
      });

      return false;
    }

    // Run DFS from each unvisited node
    yield createEvent.highlight([2, 3, 4]);

    for (const node of nodes) {
      if (color.get(node.id) === WHITE) {
        yield createEvent.message(
          `Starting DFS from "${node.id}"`,
          'info'
        );

        const foundCycle: boolean = yield* dfs(node.id);
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
            state: color.get(n.id) !== WHITE ? 'finished' as const : 'default' as const,
          })),
          edges: graphEdges,
          isDirected: true,
          isWeighted,
          message: `Cycle detected! Back edge: ${cycleEdge!.u} → ${cycleEdge!.v}`,
        },
      });

      yield createEvent.result(
        'boolean',
        true,
        `Cycle exists (back edge: ${cycleEdge!.u} → ${cycleEdge!.v})`
      );
    } else {
      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'complete',
        graphState: {
          nodes: graphNodes.map(n => ({ ...n, state: 'finished' as const })),
          edges: graphEdges.map(e => ({ ...e, state: 'visited' as const })),
          isDirected: true,
          isWeighted,
          message: 'No cycle detected - graph is a DAG',
        },
      });

      yield createEvent.message(
        'No cycle detected - the graph is a DAG (Directed Acyclic Graph)',
        'info'
      );

      yield createEvent.result(
        'boolean',
        false,
        'No cycle exists - graph is a DAG'
      );
    }
  },
};
