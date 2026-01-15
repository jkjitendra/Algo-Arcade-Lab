import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Kahn's Algorithm (BFS-based Topological Sort)
 * 
 * Topological ordering using in-degree counting.
 * Repeatedly removes vertices with zero in-degree.
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export const kahns: IAlgorithm<GraphInput> = {
  id: 'kahns',
  name: "Kahn's Algorithm (Topological Sort)",
  category: 'graphs',
  difficulty: 'intermediate',

  pseudocodeLines: [
    "function Kahn(graph):",
    '  inDegree[v] = 0 for all v',
    '  for each edge (u, v): inDegree[v]++',
    '  queue = all v where inDegree[v] == 0',
    '  result = []',
    '  while queue is not empty:',
    '    u = queue.dequeue()',
    '    result.append(u)',
    '    for each neighbor v of u:',
    '      inDegree[v]--',
    '      if inDegree[v] == 0:',
    '        queue.enqueue(v)',
    '  if |result| ≠ V: return "Cycle detected"',
    '  return result',
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
    const V = nodes.length;

    // Build adjacency list
    const adjList: Map<string, string[]> = new Map();
    nodes.forEach(node => adjList.set(node.id, []));
    edges.forEach(edge => {
      adjList.get(edge.source)!.push(edge.target);
    });

    yield createEvent.message(
      `Running Kahn's Algorithm for topological sort on ${V} nodes`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2]);

    // Calculate in-degrees
    const inDegree: Map<string, number> = new Map();
    nodes.forEach(node => inDegree.set(node.id, 0));
    edges.forEach(edge => {
      inDegree.set(edge.target, inDegree.get(edge.target)! + 1);
    });

    // Initialize graph state
    const graphNodes = nodes.map(node => ({
      id: node.id,
      label: node.label || node.id,
      state: 'default' as const,
      distance: inDegree.get(node.id),
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

    yield createEvent.message(
      `In-degrees: ${Array.from(inDegree.entries()).map(([k, v]) => `${k}:${v}`).join(', ')}`,
      'step'
    );

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected: true,
        isWeighted,
        message: 'In-degrees calculated (shown as distance labels)',
      },
    });

    // Initialize queue with zero in-degree nodes
    yield createEvent.highlight([3, 4]);

    const queue: string[] = [];
    nodes.forEach(node => {
      if (inDegree.get(node.id) === 0) {
        queue.push(node.id);
      }
    });

    const result: string[] = [];

    yield createEvent.message(
      `Initial queue (in-degree 0): [${queue.join(', ')}]`,
      'step'
    );

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes.map(n => ({
          ...n,
          state: queue.includes(n.id) ? 'processing' as const : 'default' as const,
        })),
        edges: graphEdges,
        isDirected: true,
        isWeighted,
        queue: [...queue],
        message: 'Queue initialized with zero in-degree nodes',
      },
    });

    // Main loop
    yield createEvent.highlight([5, 6, 7]);

    while (queue.length > 0) {
      const u = queue.shift()!;
      result.push(u);

      yield createEvent.message(
        `Dequeue "${u}" → result: [${result.join(', ')}]`,
        'step'
      );

      // Update visualization
      const currentNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === u ? 'current' as const :
          result.includes(n.id) ? 'finished' as const :
            queue.includes(n.id) ? 'processing' as const : 'default' as const,
        distance: inDegree.get(n.id),
      }));

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'processing',
        graphState: {
          nodes: currentNodes,
          edges: graphEdges,
          isDirected: true,
          isWeighted,
          queue: [...queue],
          message: `Processing "${u}" (position ${result.length} in ordering)`,
        },
      });

      // Reduce in-degree of neighbors
      yield createEvent.highlight([8, 9, 10, 11]);

      const neighbors = adjList.get(u) || [];
      for (const v of neighbors) {
        inDegree.set(v, inDegree.get(v)! - 1);

        // Find edge for visualization
        const edgeIdx = graphEdges.findIndex(e => e.source === u && e.target === v);
        if (edgeIdx >= 0) {
          graphEdges[edgeIdx].state = 'visited';
        }

        yield createEvent.message(
          `  Decrement in-degree of "${v}": ${inDegree.get(v)! + 1} → ${inDegree.get(v)}`,
          'explanation'
        );

        if (inDegree.get(v) === 0) {
          queue.push(v);
          yield createEvent.message(
            `  "${v}" now has in-degree 0, added to queue`,
            'explanation'
          );

          yield createEvent.auxiliary({
            type: 'graph',
            phase: 'enqueue',
            graphState: {
              nodes: graphNodes.map(n => ({
                ...n,
                state: n.id === u ? 'current' as const :
                  n.id === v ? 'processing' as const :
                    result.includes(n.id) ? 'finished' as const : 'default' as const,
                distance: inDegree.get(n.id),
              })),
              edges: graphEdges,
              isDirected: true,
              isWeighted,
              queue: [...queue],
              message: `"${v}" added to queue (in-degree = 0)`,
            },
          });
        }
      }
    }

    // Check for cycle
    yield createEvent.highlight([12, 13]);

    if (result.length !== V) {
      yield createEvent.message(
        `⚠️ Cycle detected! Only ${result.length} of ${V} nodes processed`,
        'info'
      );

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'cycle',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            state: result.includes(n.id) ? 'finished' as const : 'default' as const,
          })),
          edges: graphEdges,
          isDirected: true,
          isWeighted,
          message: 'Graph contains a cycle - topological sort not possible!',
        },
      });

      yield createEvent.result(
        'string',
        'Cycle detected',
        `Graph is not a DAG. Partial order: [${result.join(', ')}]`
      );
      return;
    }

    // Final result
    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map((n, i) => ({
          ...n,
          state: 'finished' as const,
          distance: result.indexOf(n.id) + 1, // Position in ordering
        })),
        edges: graphEdges,
        isDirected: true,
        isWeighted,
        message: `Topological order: [${result.join(' → ')}]`,
      },
    });

    yield createEvent.message(
      `Kahn's Algorithm complete! Topological order: [${result.join(' → ')}]`,
      'info'
    );

    yield createEvent.result(
      'string',
      'Topological order',
      `[${result.join(', ')}]`
    );
  },
};
