import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Floyd-Warshall Algorithm
 * 
 * All-pairs shortest paths.
 * Dynamic programming approach using intermediate vertices.
 * 
 * Time Complexity: O(V³)
 * Space Complexity: O(V²)
 */

export const floydWarshall: IAlgorithm<GraphInput> = {
  id: 'floyd-warshall',
  name: 'Floyd-Warshall Algorithm',
  category: 'graphs',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function FloydWarshall(graph):',
    '  dist = V×V matrix, dist[i][j] = weight(i,j) or ∞',
    '  for k = 0 to V-1:         // intermediate vertex',
    '    for i = 0 to V-1:       // source',
    '      for j = 0 to V-1:     // destination',
    '        if dist[i][k] + dist[k][j] < dist[i][j]:',
    '          dist[i][j] = dist[i][k] + dist[k][j]',
    '          next[i][j] = next[i][k]  // for path reconstruction',
    '  return dist',
  ],

  timeComplexity: {
    best: 'O(V³)',
    average: 'O(V³)',
    worst: 'O(V³)',
  },

  spaceComplexity: 'O(V²)',

  validate(input: GraphInput) {
    if (!input.nodes || !Array.isArray(input.nodes)) {
      return { ok: false, error: 'Input must have nodes array' };
    }
    if (input.nodes.length === 0) {
      return { ok: false, error: 'Graph must have at least one node' };
    }
    if (input.nodes.length > 8) {
      return { ok: false, error: 'Maximum 8 nodes for Floyd-Warshall visualization' };
    }
    return { ok: true };
  },

  *run(input: GraphInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isDirected, isWeighted } = input;
    const V = nodes.length;

    // Create node ID to index mapping
    const nodeIndex: Map<string, number> = new Map();
    const indexNode: Map<number, string> = new Map();
    nodes.forEach((node, idx) => {
      nodeIndex.set(node.id, idx);
      indexNode.set(idx, node.id);
    });

    yield createEvent.message(
      `Running Floyd-Warshall on ${V} nodes (${V}³ = ${V * V * V} operations)`,
      'info'
    );

    yield createEvent.highlight([0, 1]);

    // Initialize distance matrix
    const dist: number[][] = Array(V).fill(null).map(() => Array(V).fill(Infinity));
    const next: (number | null)[][] = Array(V).fill(null).map(() => Array(V).fill(null));

    // Set diagonal to 0
    for (let i = 0; i < V; i++) {
      dist[i][i] = 0;
    }

    // Set edge weights
    edges.forEach(edge => {
      const u = nodeIndex.get(edge.source)!;
      const v = nodeIndex.get(edge.target)!;
      const w = edge.weight ?? 1;
      dist[u][v] = w;
      next[u][v] = v;
      if (!isDirected) {
        dist[v][u] = w;
        next[v][u] = u;
      }
    });

    // Initialize graph state
    const graphNodes = nodes.map(node => ({
      id: node.id,
      label: node.label || node.id,
      state: 'default' as const,
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

    // Create matrix display
    const matrixToDisplay = (m: number[][]): (number | string)[][] =>
      m.map(row => row.map(val => val === Infinity ? '∞' : val));

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected,
        isWeighted: true,
        adipMatrix: matrixToDisplay(dist),
        message: 'Initial distance matrix with direct edge weights',
      },
    });

    yield createEvent.message(
      `Initial matrix set with direct edges`,
      'step'
    );

    // Main Floyd-Warshall loop
    yield createEvent.highlight([2, 3, 4, 5, 6, 7]);

    for (let k = 0; k < V; k++) {
      const kNode = indexNode.get(k)!;

      yield createEvent.message(
        `=== Using "${kNode}" as intermediate vertex (k=${k}) ===`,
        'info'
      );

      // Highlight intermediate node
      const kNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === kNode ? 'current' as const : 'default' as const,
      }));

      yield createEvent.auxiliary({
        type: 'graph',
        phase: `k=${k}`,
        graphState: {
          nodes: kNodes,
          edges: graphEdges,
          isDirected,
          isWeighted: true,
          adipMatrix: matrixToDisplay(dist),
          message: `Intermediate vertex: "${kNode}"`,
        },
      });

      for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
          if (i === j || i === k || j === k) continue;
          if (dist[i][k] === Infinity || dist[k][j] === Infinity) continue;

          const iNode = indexNode.get(i)!;
          const jNode = indexNode.get(j)!;
          const newDist = dist[i][k] + dist[k][j];

          if (newDist < dist[i][j]) {
            const oldDist = dist[i][j] === Infinity ? '∞' : dist[i][j];
            dist[i][j] = newDist;
            next[i][j] = next[i][k];

            yield createEvent.message(
              `  Updated dist[${iNode}][${jNode}] = ${oldDist} → ${newDist} (via ${kNode})`,
              'explanation'
            );

            // Highlight the i -> k -> j path
            const pathNodes = graphNodes.map(n => ({
              ...n,
              state: n.id === kNode ? 'current' as const :
                n.id === iNode ? 'source' as const :
                  n.id === jNode ? 'target' as const : 'default' as const,
            }));

            yield createEvent.auxiliary({
              type: 'graph',
              phase: `update-${i}-${j}`,
              graphState: {
                nodes: pathNodes,
                edges: graphEdges,
                isDirected,
                isWeighted: true,
                adipMatrix: matrixToDisplay(dist),
                message: `dist[${iNode}][${jNode}] = dist[${iNode}][${kNode}] + dist[${kNode}][${jNode}] = ${dist[i][k]} + ${dist[k][j]} = ${newDist}`,
              },
            });
          }
        }
      }
    }

    // Check for negative cycles (diagonal < 0)
    let hasNegativeCycle = false;
    for (let i = 0; i < V; i++) {
      if (dist[i][i] < 0) {
        hasNegativeCycle = true;
        break;
      }
    }

    if (hasNegativeCycle) {
      yield createEvent.message(
        `⚠️ Negative cycle detected!`,
        'info'
      );

      yield createEvent.result(
        'string',
        'Negative cycle',
        'Graph contains a negative cycle'
      );
      return;
    }

    // Final result
    yield createEvent.highlight([8]);

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({ ...n, state: 'finished' as const })),
        edges: graphEdges,
        isDirected,
        isWeighted: true,
        adipMatrix: matrixToDisplay(dist),
        message: `Floyd-Warshall complete! All-pairs shortest paths computed`,
      },
    });

    yield createEvent.message(
      `Floyd-Warshall complete! ${V}×${V} distance matrix computed`,
      'info'
    );

    // Count reachable pairs
    let reachablePairs = 0;
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (i !== j && dist[i][j] !== Infinity) reachablePairs++;
      }
    }

    yield createEvent.result(
      'string',
      `${V}×${V} matrix`,
      `Reachable pairs: ${reachablePairs}, Time: O(${V}³) = ${V * V * V}`
    );
  },
};
