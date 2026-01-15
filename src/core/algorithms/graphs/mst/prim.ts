import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Prim's Algorithm
 * 
 * Minimum Spanning Tree using a growing tree approach.
 * Uses priority queue to always add the minimum weight edge.
 * 
 * Time Complexity: O((V + E) log V) with binary heap
 * Space Complexity: O(V)
 */

export const prim: IAlgorithm<GraphInput> = {
  id: 'prim',
  name: "Prim's Algorithm",
  category: 'graphs',
  difficulty: 'intermediate',

  pseudocodeLines: [
    "function Prim(graph, start):",
    '  key[start] = 0, key[v] = ∞ for all other v',
    '  parent[v] = null for all v',
    '  inMST = {} (empty set)',
    '  PQ = priority queue with all vertices',
    '  while PQ is not empty:',
    '    u = PQ.extractMin()',
    '    inMST.add(u)',
    '    for each neighbor v of u:',
    '      if v not in inMST and weight(u,v) < key[v]:',
    '        key[v] = weight(u,v)',
    '        parent[v] = u',
    '  return MST from parent',
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
      id: 'start',
      label: 'Starting Node',
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
    if (input.isDirected) {
      return { ok: false, error: "Prim's algorithm requires an undirected graph" };
    }
    return { ok: true };
  },

  *run(input: GraphInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isWeighted } = input;
    const startId = (params?.start as string) || nodes[0].id;
    const start = nodes.find(n => n.id === startId) || nodes[0];
    const V = nodes.length;

    // Build adjacency list
    const adjList: Map<string, { target: string; weight: number }[]> = new Map();
    nodes.forEach(node => adjList.set(node.id, []));
    edges.forEach(edge => {
      const weight = edge.weight ?? 1;
      adjList.get(edge.source)!.push({ target: edge.target, weight });
      adjList.get(edge.target)!.push({ target: edge.source, weight });
    });

    yield createEvent.message(
      `Running Prim's Algorithm starting from "${start.id}"`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2, 3, 4]);

    // Initialize
    const key: Map<string, number> = new Map();
    const parent: Map<string, string | null> = new Map();
    const inMST: Set<string> = new Set();

    nodes.forEach(node => {
      key.set(node.id, node.id === start.id ? 0 : Infinity);
      parent.set(node.id, null);
    });

    // Priority queue (simple array-based)
    const pq: Set<string> = new Set(nodes.map(n => n.id));

    // Initialize graph state
    const graphNodes = nodes.map(node => ({
      id: node.id,
      label: node.label || node.id,
      state: node.id === start.id ? 'source' as const : 'default' as const,
      distance: node.id === start.id ? 0 : '∞',
      x: node.x,
      y: node.y,
    }));

    const graphEdges: { source: string; target: string; weight: number; state: 'default' | 'visited' | 'current' | 'path' | 'mst' | 'back-edge'; isDirected: boolean }[] = edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      weight: edge.weight ?? 1,
      state: 'default',
      isDirected: false,
    }));

    const distances: Record<string, number | string> = {};
    nodes.forEach(n => distances[n.id] = n.id === start.id ? 0 : '∞');

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected: false,
        isWeighted: true,
        distances,
        message: `Initialized: key[${start.id}] = 0, all others = ∞`,
      },
    });

    // Main Prim's loop
    yield createEvent.highlight([5, 6, 7]);

    let totalWeight = 0;
    const mstEdges: { u: string; v: string; w: number }[] = [];

    while (pq.size > 0) {
      // Extract minimum key vertex from PQ
      let u: string | null = null;
      let minKey = Infinity;
      for (const nodeId of pq) {
        if (key.get(nodeId)! < minKey) {
          minKey = key.get(nodeId)!;
          u = nodeId;
        }
      }

      if (u === null || minKey === Infinity) break;

      pq.delete(u);
      inMST.add(u);

      yield createEvent.message(
        `Extract min: "${u}" with key ${minKey}`,
        'step'
      );

      // Add edge to MST (if not start node)
      if (parent.get(u) !== null) {
        const parentU = parent.get(u)!;
        mstEdges.push({ u: parentU, v: u, w: key.get(u)! });
        totalWeight += key.get(u)!;

        // Mark edge as MST
        const edgeIdx = graphEdges.findIndex(e =>
          (e.source === parentU && e.target === u) ||
          (e.source === u && e.target === parentU)
        );
        if (edgeIdx >= 0) {
          graphEdges[edgeIdx].state = 'mst';
        }
      }

      // Update visualization
      const currentNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === u ? 'current' as const :
          inMST.has(n.id) ? 'finished' as const :
            n.id === start.id ? 'source' as const : 'default' as const,
        distance: key.get(n.id) === Infinity ? '∞' : key.get(n.id),
      }));

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'extracting',
        graphState: {
          nodes: currentNodes,
          edges: graphEdges,
          isDirected: false,
          isWeighted: true,
          distances,
          message: `Added "${u}" to MST (total weight: ${totalWeight})`,
        },
      });

      // Update keys of adjacent vertices
      yield createEvent.highlight([8, 9, 10, 11]);

      const neighbors = adjList.get(u) || [];
      for (const { target: v, weight } of neighbors) {
        if (inMST.has(v)) continue;

        // Find edge for visualization
        const edgeIdx = graphEdges.findIndex(e =>
          (e.source === u && e.target === v) ||
          (e.source === v && e.target === u)
        );

        yield createEvent.message(
          `  Checking neighbor "${v}" (edge weight: ${weight})`,
          'step'
        );

        if (weight < key.get(v)!) {
          const oldKey = key.get(v) === Infinity ? '∞' : key.get(v);
          key.set(v, weight);
          parent.set(v, u);
          distances[v] = weight;

          yield createEvent.message(
            `  ✓ Updated key[${v}] = ${oldKey} → ${weight}`,
            'explanation'
          );

          yield createEvent.auxiliary({
            type: 'graph',
            phase: 'updating',
            graphState: {
              nodes: graphNodes.map(n => ({
                ...n,
                state: n.id === u ? 'current' as const :
                  n.id === v ? 'processing' as const :
                    inMST.has(n.id) ? 'finished' as const : 'default' as const,
                distance: key.get(n.id) === Infinity ? '∞' : key.get(n.id),
              })),
              edges: graphEdges.map((e, i) => ({
                ...e,
                state: e.state === 'mst' ? 'mst' as const :
                  i === edgeIdx ? 'current' as const : 'default' as const,
              })),
              isDirected: false,
              isWeighted: true,
              distances,
              message: `key[${v}] updated to ${weight} via ${u}`,
            },
          });
        }
      }
    }

    // Final result
    yield createEvent.highlight([12]);

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({ ...n, state: 'finished' as const })),
        edges: graphEdges,
        isDirected: false,
        isWeighted: true,
        distances,
        message: `Prim's complete! MST weight: ${totalWeight}`,
      },
    });

    yield createEvent.message(
      `Prim's Algorithm complete! MST has ${mstEdges.length} edges with total weight ${totalWeight}`,
      'info'
    );

    const mstStr = mstEdges.map(e => `(${e.u}-${e.v}:${e.w})`).join(', ');

    yield createEvent.result(
      'string',
      `Weight: ${totalWeight}`,
      `MST edges: [${mstStr}]`
    );
  },
};
