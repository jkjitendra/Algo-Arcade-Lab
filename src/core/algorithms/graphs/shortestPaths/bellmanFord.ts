import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Bellman-Ford Algorithm
 * 
 * Shortest path from source with support for negative weights.
 * Detects negative cycles.
 * 
 * Time Complexity: O(V × E)
 * Space Complexity: O(V)
 */

export const bellmanFord: IAlgorithm<GraphInput> = {
  id: 'bellman-ford',
  name: 'Bellman-Ford Algorithm',
  category: 'graphs',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function BellmanFord(graph, source):',
    '  dist[source] = 0, dist[v] = ∞ for all other v',
    '  for i = 1 to V-1:        // V-1 iterations',
    '    for each edge (u, v, w):',
    '      if dist[u] + w < dist[v]:',
    '        dist[v] = dist[u] + w',
    '        parent[v] = u',
    '  // Check for negative cycles',
    '  for each edge (u, v, w):',
    '    if dist[u] + w < dist[v]:',
    '      return "Negative cycle detected"',
    '  return dist, parent',
  ],

  timeComplexity: {
    best: 'O(V × E)',
    average: 'O(V × E)',
    worst: 'O(V × E)',
  },

  spaceComplexity: 'O(V)',

  parameters: [
    {
      type: 'text',
      id: 'source',
      label: 'Source Node',
      default: 'A',
      placeholder: 'Starting node ID',
      maxLength: 10,
    },
  ],

  validate(input: GraphInput) {
    if (!input.nodes || !Array.isArray(input.nodes)) {
      return { ok: false, error: 'Input must have nodes array' };
    }
    if (input.nodes.length === 0) {
      return { ok: false, error: 'Graph must have at least one node' };
    }
    if (input.nodes.length > 10) {
      return { ok: false, error: 'Maximum 10 nodes for visualization' };
    }
    return { ok: true };
  },

  *run(input: GraphInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isDirected, isWeighted } = input;
    const sourceId = (params?.source as string) || nodes[0].id;
    const source = nodes.find(n => n.id === sourceId) || nodes[0];
    const V = nodes.length;

    // Build edge list with weights
    const edgeList: { u: string; v: string; w: number }[] = [];
    edges.forEach(edge => {
      const w = edge.weight ?? 1;
      edgeList.push({ u: edge.source, v: edge.target, w });
      if (!isDirected) {
        edgeList.push({ u: edge.target, v: edge.source, w });
      }
    });

    yield createEvent.message(
      `Running Bellman-Ford from source "${source.id}" (${V} nodes, ${edgeList.length} edges)`,
      'info'
    );

    yield createEvent.highlight([0, 1]);

    // Initialize distances
    const dist: Map<string, number> = new Map();
    const parent: Map<string, string | null> = new Map();
    nodes.forEach(node => {
      dist.set(node.id, node.id === source.id ? 0 : Infinity);
      parent.set(node.id, null);
    });

    // Initialize graph state
    const graphNodes = nodes.map(node => ({
      id: node.id,
      label: node.label || node.id,
      state: node.id === source.id ? 'source' as const : 'default' as const,
      distance: node.id === source.id ? 0 : '∞',
      x: node.x,
      y: node.y,
    }));

    const graphEdges: { source: string; target: string; weight: number; state: 'default' | 'visited' | 'current' | 'path' | 'mst' | 'back-edge'; isDirected: boolean }[] = edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      weight: edge.weight ?? 1,
      state: 'default',
      isDirected,
    }));

    const distances: Record<string, number | string> = {};
    nodes.forEach(n => distances[n.id] = n.id === source.id ? 0 : '∞');

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected,
        isWeighted: true,
        distances,
        message: `Initialized: dist[${source.id}] = 0, all others = ∞`,
      },
    });

    // Main relaxation loop: V-1 iterations
    yield createEvent.highlight([2, 3, 4, 5, 6]);

    for (let i = 1; i < V; i++) {
      yield createEvent.message(
        `=== Iteration ${i} of ${V - 1} ===`,
        'info'
      );

      let anyRelaxation = false;

      for (let j = 0; j < edgeList.length; j++) {
        const { u, v, w } = edgeList[j];

        // Skip if source not reachable
        if (dist.get(u) === Infinity) continue;

        yield createEvent.message(
          `  Checking edge ${u} → ${v} (weight: ${w})`,
          'step'
        );

        // Find edge in graph for visualization
        const edgeIdx = graphEdges.findIndex(e =>
          (e.source === u && e.target === v) ||
          (!isDirected && e.source === v && e.target === u)
        );

        const newDist = dist.get(u)! + w;

        // Update node visualization
        const currentNodes = graphNodes.map(n => ({
          ...n,
          state: n.id === u ? 'current' as const :
            n.id === v ? 'processing' as const :
              n.id === source.id ? 'source' as const : 'default' as const,
          distance: dist.get(n.id) === Infinity ? '∞' : dist.get(n.id),
        }));

        yield createEvent.auxiliary({
          type: 'graph',
          phase: `iteration-${i}`,
          graphState: {
            nodes: currentNodes,
            edges: graphEdges.map((e, idx) => ({
              ...e,
              state: idx === edgeIdx ? 'current' as const : e.state,
            })),
            isDirected,
            isWeighted: true,
            distances,
            message: `Iteration ${i}: checking ${u} → ${v}`,
          },
        });

        if (newDist < dist.get(v)!) {
          const oldDist = dist.get(v) === Infinity ? '∞' : dist.get(v);
          dist.set(v, newDist);
          parent.set(v, u);
          distances[v] = newDist;
          anyRelaxation = true;

          yield createEvent.message(
            `  ✓ Relaxed: dist[${v}] = ${oldDist} → ${newDist}`,
            'explanation'
          );

          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }
        }
      }

      if (!anyRelaxation) {
        yield createEvent.message(
          `No relaxation in iteration ${i}, can terminate early`,
          'info'
        );
        break;
      }
    }

    // Check for negative cycles
    yield createEvent.highlight([7, 8, 9, 10]);

    yield createEvent.message(
      `Checking for negative cycles...`,
      'info'
    );

    let hasNegativeCycle = false;
    let negCycleEdge: { u: string; v: string } | null = null;

    for (const { u, v, w } of edgeList) {
      if (dist.get(u) !== Infinity && dist.get(u)! + w < dist.get(v)!) {
        hasNegativeCycle = true;
        negCycleEdge = { u, v };
        break;
      }
    }

    if (hasNegativeCycle) {
      yield createEvent.message(
        `⚠️ Negative cycle detected at edge ${negCycleEdge!.u} → ${negCycleEdge!.v}!`,
        'info'
      );

      // Highlight the problematic edge
      const edgeIdx = graphEdges.findIndex(e =>
        e.source === negCycleEdge!.u && e.target === negCycleEdge!.v
      );
      if (edgeIdx >= 0) {
        graphEdges[edgeIdx].state = 'back-edge';
      }

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'negative-cycle',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            distance: dist.get(n.id) === Infinity ? '∞' : dist.get(n.id),
          })),
          edges: graphEdges,
          isDirected,
          isWeighted: true,
          distances,
          message: `Negative cycle detected! Shortest paths are undefined.`,
        },
      });

      yield createEvent.result(
        'string',
        'Negative cycle',
        `Graph contains a negative cycle, shortest paths are undefined`
      );
      return;
    }

    // Final result
    yield createEvent.highlight([11]);

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({
          ...n,
          state: n.id === source.id ? 'source' as const : 'finished' as const,
          distance: dist.get(n.id) === Infinity ? '∞' : dist.get(n.id),
        })),
        edges: graphEdges,
        isDirected,
        isWeighted: true,
        distances,
        message: `Bellman-Ford complete! No negative cycles found`,
      },
    });

    yield createEvent.message(
      `Bellman-Ford complete! All shortest distances computed`,
      'info'
    );

    const distStr = Array.from(dist.entries())
      .map(([node, d]) => `${node}: ${d === Infinity ? '∞' : d}`)
      .join(', ');

    yield createEvent.result(
      'string',
      'Shortest paths',
      distStr
    );
  },
};
