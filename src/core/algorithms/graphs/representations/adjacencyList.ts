import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Adjacency List Representation
 * 
 * List of neighbors for each vertex.
 * More space-efficient for sparse graphs.
 * 
 * Time Complexity: 
 *   - Add edge: O(1)
 *   - Check edge: O(degree)
 *   - Get neighbors: O(1)
 * Space Complexity: O(V + E)
 */

export const adjacencyList: IAlgorithm<GraphInput> = {
  id: 'adjacency-list',
  name: 'Adjacency List',
  category: 'graphs',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function createAdjList(V, edges):',
    '  adjList = array of V empty lists',
    '  for each edge (u, v, weight) in edges:',
    '    adjList[u].append((v, weight))',
    '    if undirected:',
    '      adjList[v].append((u, weight))',
    '  return adjList',
    '',
    'function getNeighbors(adjList, u):',
    '  return adjList[u]',
  ],

  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
  },

  spaceComplexity: 'O(V + E)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'create',
      options: [
        { value: 'create', label: 'Create List' },
        { value: 'get-neighbors', label: 'Get Neighbors' },
        { value: 'add-edge', label: 'Add Edge' },
      ],
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
    return { ok: true };
  },

  *run(input: GraphInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isDirected, isWeighted } = input;
    const operation = (params?.operation as string) ?? 'create';

    yield createEvent.message(
      `Creating Adjacency List for ${nodes.length} nodes, ${edges.length} edges`,
      'info'
    );

    yield createEvent.highlight([0, 1]);

    // Initialize adjacency list
    const adjList: Map<string, { neighbor: string; weight: number }[]> = new Map();
    nodes.forEach(node => {
      adjList.set(node.id, []);
    });

    // Initialize graph state for visualization
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
      isDirected,
    }));

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected,
        isWeighted,
        message: 'Initialized empty adjacency lists for each node',
      },
    });

    yield createEvent.message(
      `Initialized ${nodes.length} empty adjacency lists`,
      'step'
    );

    // Build adjacency list from edges
    yield createEvent.highlight([2, 3, 4, 5]);

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const weight = edge.weight ?? 1;

      yield createEvent.message(
        `Processing edge: ${edge.source} → ${edge.target}` + (isWeighted ? ` (weight: ${weight})` : ''),
        'step'
      );

      // Update graph visualization
      const updatedEdges = graphEdges.map((e, idx) => ({
        ...e,
        state: idx === i ? 'current' as const : (idx < i ? 'visited' as const : 'default' as const),
      }));

      const updatedNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === edge.source ? 'source' as const :
          n.id === edge.target ? 'target' as const :
            'default' as const,
      }));

      // Add to source's list
      adjList.get(edge.source)!.push({ neighbor: edge.target, weight });

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'building',
        graphState: {
          nodes: updatedNodes,
          edges: updatedEdges,
          isDirected,
          isWeighted,
          message: `${edge.source}: [..., (${edge.target}, ${weight})]`,
        },
      });

      yield createEvent.message(
        `Added ${edge.target} to ${edge.source}'s neighbor list`,
        'explanation'
      );

      if (!isDirected) {
        // Add reverse edge for undirected graph
        adjList.get(edge.target)!.push({ neighbor: edge.source, weight });

        yield createEvent.message(
          `Undirected: Added ${edge.source} to ${edge.target}'s neighbor list`,
          'explanation'
        );

        yield createEvent.auxiliary({
          type: 'graph',
          phase: 'building',
          graphState: {
            nodes: updatedNodes,
            edges: updatedEdges,
            isDirected,
            isWeighted,
            message: `${edge.target}: [..., (${edge.source}, ${weight})]`,
          },
        });
      }
    }

    // Final result
    yield createEvent.highlight([6]);

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({ ...n, state: 'finished' as const })),
        edges: graphEdges.map(e => ({ ...e, state: 'visited' as const })),
        isDirected,
        isWeighted,
        message: 'Adjacency list construction complete',
      },
    });

    // Build result string
    const listStr = Array.from(adjList.entries())
      .map(([node, neighbors]) => {
        const neighborsStr = neighbors.length === 0
          ? '[]'
          : `[${neighbors.map(n => isWeighted ? `(${n.neighbor},${n.weight})` : n.neighbor).join(', ')}]`;
        return `${node}: ${neighborsStr}`;
      })
      .join('\n');

    yield createEvent.message(
      `Adjacency list created successfully`,
      'info'
    );

    // Calculate total space
    let totalNeighbors = 0;
    adjList.forEach(neighbors => {
      totalNeighbors += neighbors.length;
    });

    yield createEvent.result(
      'string',
      `${nodes.length} lists`,
      `Nodes: ${nodes.length}, Total entries: ${totalNeighbors}, Space: O(V + E) = ${nodes.length} + ${totalNeighbors}`
    );
  },
};
