import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Dijkstra's Algorithm
 * 
 * Shortest path from source to all nodes (non-negative weights).
 * Uses a priority queue for efficient minimum distance selection.
 * 
 * Time Complexity: O((V + E) log V) with binary heap
 * Space Complexity: O(V)
 */

export const dijkstra: IAlgorithm<GraphInput> = {
  id: 'dijkstra',
  name: "Dijkstra's Algorithm",
  category: 'graphs',
  difficulty: 'intermediate',

  pseudocodeLines: [
    "function Dijkstra(graph, source):",
    '  dist[source] = 0, dist[v] = ∞ for all other v',
    '  parent[v] = null for all v',
    '  PQ = priority queue with (0, source)',
    '  while PQ is not empty:',
    '    (d, u) = PQ.extractMin()',
    '    if d > dist[u]: continue  // outdated entry',
    '    for each neighbor v of u:',
    '      if dist[u] + weight(u,v) < dist[v]:',
    '        dist[v] = dist[u] + weight(u,v)',
    '        parent[v] = u',
    '        PQ.insert((dist[v], v))',
    '  return dist, parent',
  ],

  timeComplexity: {
    best: 'O((V + E) log V)',
    average: 'O((V + E) log V)',
    worst: 'O((V + E) log V)',
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
    if (input.nodes.length > 12) {
      return { ok: false, error: 'Maximum 12 nodes for visualization' };
    }
    // Check for negative weights
    for (const edge of input.edges) {
      if (edge.weight !== undefined && edge.weight < 0) {
        return { ok: false, error: 'Dijkstra does not support negative weights. Use Bellman-Ford.' };
      }
    }
    return { ok: true };
  },

  *run(input: GraphInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isDirected, isWeighted } = input;
    const sourceId = (params?.source as string) || nodes[0].id;

    const source = nodes.find(n => n.id === sourceId) || nodes[0];

    // Build adjacency list with weights
    const adjList: Map<string, { target: string; weight: number }[]> = new Map();
    nodes.forEach(node => adjList.set(node.id, []));
    edges.forEach(edge => {
      const weight = edge.weight ?? 1;
      adjList.get(edge.source)!.push({ target: edge.target, weight });
      if (!isDirected) {
        adjList.get(edge.target)!.push({ target: edge.source, weight });
      }
    });

    yield createEvent.message(
      `Running Dijkstra from source "${source.id}"`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2, 3]);

    // Initialize distances and parents
    const dist: Map<string, number> = new Map();
    const parent: Map<string, string | null> = new Map();
    nodes.forEach(node => {
      dist.set(node.id, node.id === source.id ? 0 : Infinity);
      parent.set(node.id, null);
    });

    // Priority queue as array of [distance, nodeId] - simple implementation
    // In a real implementation, use a proper min-heap
    const pq: [number, string][] = [[0, source.id]];
    const processed: Set<string> = new Set();

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

    // Main Dijkstra loop
    yield createEvent.highlight([4, 5, 6]);

    while (pq.length > 0) {
      // Extract minimum (sort and pop - simple priority queue)
      pq.sort((a, b) => a[0] - b[0]);
      const [d, u] = pq.shift()!;

      yield createEvent.message(
        `Extract min: node "${u}" with distance ${d}`,
        'step'
      );

      // Skip if already processed with shorter distance
      if (processed.has(u)) {
        yield createEvent.message(
          `  Node "${u}" already processed, skipping`,
          'explanation'
        );
        continue;
      }

      processed.add(u);

      // Update visualization
      const currentNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === u ? 'current' as const :
          n.id === source.id ? 'source' as const :
            processed.has(n.id) ? 'finished' as const : 'default' as const,
        distance: dist.get(n.id) === Infinity ? '∞' : dist.get(n.id),
      }));

      distances[u] = dist.get(u)!;

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'processing',
        graphState: {
          nodes: currentNodes,
          edges: graphEdges,
          isDirected,
          isWeighted: true,
          distances,
          message: `Processing node "${u}" (shortest path distance: ${d})`,
        },
      });

      // Relax edges
      yield createEvent.highlight([7, 8, 9, 10, 11]);

      const neighbors = adjList.get(u) || [];
      for (const { target: v, weight } of neighbors) {
        if (processed.has(v)) continue;

        const newDist = dist.get(u)! + weight;

        // Find edge for visualization
        const edgeIdx = graphEdges.findIndex(e =>
          (e.source === u && e.target === v) ||
          (!isDirected && e.source === v && e.target === u)
        );

        yield createEvent.message(
          `  Checking edge ${u} → ${v} (weight: ${weight})`,
          'step'
        );

        if (newDist < dist.get(v)!) {
          const oldDist = dist.get(v) === Infinity ? '∞' : dist.get(v);
          dist.set(v, newDist);
          parent.set(v, u);
          pq.push([newDist, v]);
          distances[v] = newDist;

          yield createEvent.message(
            `  ✓ Relaxed: dist[${v}] = ${oldDist} → ${newDist}`,
            'explanation'
          );

          // Highlight relaxed edge
          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'path';
          }

          yield createEvent.auxiliary({
            type: 'graph',
            phase: 'relaxing',
            graphState: {
              nodes: graphNodes.map(n => ({
                ...n,
                state: n.id === v ? 'processing' as const :
                  n.id === u ? 'current' as const :
                    n.id === source.id ? 'source' as const :
                      processed.has(n.id) ? 'finished' as const : 'default' as const,
                distance: dist.get(n.id) === Infinity ? '∞' : dist.get(n.id),
              })),
              edges: graphEdges.map((e, i) => ({
                ...e,
                state: i === edgeIdx ? 'current' as const : e.state,
              })),
              isDirected,
              isWeighted: true,
              distances,
              message: `Relaxed edge: dist[${v}] updated to ${newDist}`,
            },
          });

          // Reset edge state
          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }
        } else {
          yield createEvent.message(
            `  No improvement: ${dist.get(u)!} + ${weight} ≥ ${dist.get(v)}`,
            'explanation'
          );
        }
      }
    }

    // Final result
    yield createEvent.highlight([12]);

    // Build shortest path tree edges
    const pathEdges = graphEdges.map(e => {
      const isInTree = (parent.get(e.target) === e.source) ||
        (!isDirected && parent.get(e.source) === e.target);
      return { ...e, state: isInTree ? 'path' as const : 'visited' as const };
    });

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({
          ...n,
          state: n.id === source.id ? 'source' as const : 'finished' as const,
          distance: dist.get(n.id) === Infinity ? '∞' : dist.get(n.id),
        })),
        edges: pathEdges,
        isDirected,
        isWeighted: true,
        distances,
        message: `Dijkstra complete! Shortest paths from "${source.id}" computed`,
      },
    });

    yield createEvent.message(
      `Dijkstra complete! All shortest distances computed`,
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
