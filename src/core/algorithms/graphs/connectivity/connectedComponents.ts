import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Connected Components
 * 
 * Find all connected components in an undirected graph.
 * Uses DFS/BFS to explore each component.
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export const connectedComponents: IAlgorithm<GraphInput> = {
  id: 'connected-components',
  name: 'Connected Components',
  category: 'graphs',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function findComponents(graph):',
    '  visited = {} (empty set)',
    '  componentId = 0',
    '  for each vertex v:',
    '    if v not in visited:',
    '      BFS/DFS(v, componentId)',
    '      componentId++',
    '  return componentId  // number of components',
    '',
    'function DFS(u, id):',
    '  visited.add(u)',
    '  component[u] = id',
    '  for each neighbor v of u:',
    '    if v not in visited:',
    '      DFS(v, id)',
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
      return { ok: false, error: 'Use Strongly Connected Components (Kosaraju) for directed graphs' };
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
      `Finding connected components in undirected graph (${nodes.length} nodes)`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2]);

    const visited: Set<string> = new Set();
    const component: Map<string, number> = new Map();
    let componentId = 0;

    // Component colors for visualization
    const colors = ['source', 'target', 'path', 'processing', 'visited'];

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
        message: 'Starting connected components search',
      },
    });

    // DFS helper
    function* dfs(u: string, compId: number): Generator<AlgoEvent, void, unknown> {
      visited.add(u);
      component.set(u, compId);

      yield createEvent.highlight([9, 10, 11]);
      yield createEvent.message(
        `  Visiting "${u}" → component ${compId}`,
        'step'
      );

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'exploring',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            state: n.id === u ? 'current' as const :
              component.has(n.id) ? (colors[component.get(n.id)! % colors.length] as any) : 'default' as const,
            componentId: component.get(n.id),
          })),
          edges: graphEdges,
          isDirected: false,
          isWeighted,
          message: `"${u}" assigned to component ${compId}`,
        },
      });

      yield createEvent.highlight([12, 13, 14]);

      const neighbors = adjList.get(u) || [];
      for (const v of neighbors) {
        if (!visited.has(v)) {
          // Mark edge
          const edgeIdx = graphEdges.findIndex(e =>
            (e.source === u && e.target === v) ||
            (e.source === v && e.target === u)
          );
          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }

          yield* dfs(v, compId);
        }
      }
    }

    // Find all components
    yield createEvent.highlight([3, 4, 5, 6]);

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        yield createEvent.message(
          `=== Starting Component ${componentId} from "${node.id}" ===`,
          'info'
        );

        yield* dfs(node.id, componentId);
        componentId++;

        yield createEvent.message(
          `Component ${componentId - 1} complete`,
          'info'
        );
      }
    }

    // Final result
    yield createEvent.highlight([7]);

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({
          ...n,
          state: (colors[component.get(n.id)! % colors.length] as any),
          componentId: component.get(n.id),
        })),
        edges: graphEdges,
        isDirected: false,
        isWeighted,
        message: `Found ${componentId} connected component(s)`,
      },
    });

    yield createEvent.message(
      `Found ${componentId} connected component(s)`,
      'info'
    );

    // Build component membership string
    const componentGroups: string[][] = Array(componentId).fill(null).map(() => []);
    component.forEach((compId, nodeId) => {
      componentGroups[compId].push(nodeId);
    });

    const groupsStr = componentGroups
      .map((group, idx) => `Component ${idx}: [${group.join(', ')}]`)
      .join(' | ');

    yield createEvent.result(
      'string',
      `${componentId} components`,
      groupsStr
    );
  },
};
