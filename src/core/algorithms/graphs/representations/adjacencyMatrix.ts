import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Adjacency Matrix Representation
 * 
 * 2D matrix representation of a graph.
 * matrix[i][j] = weight if edge exists, 0/∞ otherwise.
 * 
 * Time Complexity: 
 *   - Check edge: O(1)
 *   - Add edge: O(1)
 *   - Get neighbors: O(V)
 * Space Complexity: O(V²)
 */

export const adjacencyMatrix: IAlgorithm<GraphInput> = {
  id: 'adjacency-matrix',
  name: 'Adjacency Matrix',
  category: 'graphs',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function createAdjMatrix(V, edges):',
    '  matrix = V×V matrix of zeros',
    '  for each edge (u, v, weight) in edges:',
    '    matrix[u][v] = weight',
    '    if undirected:',
    '      matrix[v][u] = weight',
    '  return matrix',
    '',
    'function hasEdge(matrix, u, v):',
    '  return matrix[u][v] ≠ 0',
  ],

  timeComplexity: {
    best: 'O(V²)',
    average: 'O(V²)',
    worst: 'O(V²)',
  },

  spaceComplexity: 'O(V²)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'create',
      options: [
        { value: 'create', label: 'Create Matrix' },
        { value: 'check-edge', label: 'Check Edge' },
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
    if (input.nodes.length > 10) {
      return { ok: false, error: 'Maximum 10 nodes for visualization' };
    }
    return { ok: true };
  },

  *run(input: GraphInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isDirected, isWeighted } = input;
    const operation = (params?.operation as string) ?? 'create';
    const n = nodes.length;

    // Create node ID to index mapping
    const nodeIndex: Record<string, number> = {};
    nodes.forEach((node, idx) => {
      nodeIndex[node.id] = idx;
    });

    yield createEvent.message(
      `Creating Adjacency Matrix for ${n} nodes, ${edges.length} edges`,
      'info'
    );

    yield createEvent.highlight([0, 1]);

    // Initialize matrix with zeros
    const matrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));

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
        adipMatrix: matrix,
        message: 'Initialized empty adjacency matrix',
      },
    });

    yield createEvent.message('Matrix initialized with zeros', 'step');

    // Fill matrix with edges
    yield createEvent.highlight([2, 3, 4, 5]);

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const u = nodeIndex[edge.source];
      const v = nodeIndex[edge.target];
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

      // Mark source and target nodes
      const updatedNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === edge.source ? 'source' as const :
          n.id === edge.target ? 'target' as const :
            'default' as const,
      }));

      matrix[u][v] = weight;

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'building',
        graphState: {
          nodes: updatedNodes,
          edges: updatedEdges,
          isDirected,
          isWeighted,
          adipMatrix: matrix,
          message: `Set matrix[${u}][${v}] = ${weight}`,
        },
      });

      if (!isDirected) {
        matrix[v][u] = weight;
        yield createEvent.message(
          `Undirected: Also set matrix[${v}][${u}] = ${weight}`,
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
            adipMatrix: matrix,
            message: `Set matrix[${v}][${u}] = ${weight} (symmetric)`,
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
        adipMatrix: matrix,
        message: `Adjacency matrix complete: ${n}×${n} matrix`,
      },
    });

    yield createEvent.message(
      `Adjacency matrix created successfully`,
      'info'
    );

    // Calculate matrix properties
    let edgeCount = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] !== 0) edgeCount++;
      }
    }
    if (!isDirected) edgeCount /= 2;

    yield createEvent.result(
      'string',
      `${n}×${n} matrix`,
      `Matrix size: ${n}×${n}, Edges: ${edgeCount}, Space: O(${n}²) = ${n * n} cells`
    );
  },
};
