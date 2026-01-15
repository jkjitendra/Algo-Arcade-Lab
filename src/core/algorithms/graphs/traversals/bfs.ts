import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Breadth-First Search (BFS)
 * 
 * Level-by-level exploration of a graph.
 * Uses a queue to track nodes to visit.
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export const bfs: IAlgorithm<GraphInput> = {
  id: 'bfs',
  name: 'Breadth-First Search (BFS)',
  category: 'graphs',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function BFS(graph, source):',
    '  queue = [source]',
    '  visited = {source}',
    '  level = {source: 0}',
    '  while queue is not empty:',
    '    current = queue.dequeue()',
    '    for each neighbor of current:',
    '      if neighbor not in visited:',
    '        visited.add(neighbor)',
    '        level[neighbor] = level[current] + 1',
    '        queue.enqueue(neighbor)',
    '  return visited',
  ],

  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
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
    if (input.nodes.length > 15) {
      return { ok: false, error: 'Maximum 15 nodes for visualization' };
    }
    return { ok: true };
  },

  *run(input: GraphInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isDirected, isWeighted } = input;
    const sourceId = (params?.source as string) || nodes[0].id;

    // Validate source node exists
    if (!nodes.find(n => n.id === sourceId)) {
      yield createEvent.message(`Source node "${sourceId}" not found. Using first node.`, 'info');
    }
    const source = nodes.find(n => n.id === sourceId) || nodes[0];

    // Build adjacency list
    const adjList: Map<string, string[]> = new Map();
    nodes.forEach(node => adjList.set(node.id, []));
    edges.forEach(edge => {
      adjList.get(edge.source)!.push(edge.target);
      if (!isDirected) {
        adjList.get(edge.target)!.push(edge.source);
      }
    });

    yield createEvent.message(
      `Starting BFS from node "${source.id}"`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2, 3]);

    // Initialize BFS structures
    const queue: string[] = [source.id];
    const visited: Set<string> = new Set([source.id]);
    const level: Map<string, number> = new Map([[source.id, 0]]);
    const parent: Map<string, string | null> = new Map([[source.id, null]]);
    const visitOrder: string[] = [];

    // Initialize graph state
    const graphNodes: { id: string; label: string; state: 'default' | 'source' | 'target' | 'current' | 'visited' | 'processing' | 'finished' | 'path'; distance: number | string; x?: number; y?: number }[] = nodes.map(node => ({
      id: node.id,
      label: node.label || node.id,
      state: node.id === source.id ? 'source' : 'default',
      distance: node.id === source.id ? 0 : '∞',
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
        queue: [...queue],
        message: `Queue initialized with source: [${source.id}]`,
      },
    });

    // BFS main loop
    yield createEvent.highlight([4, 5]);

    while (queue.length > 0) {
      const current = queue.shift()!;
      visitOrder.push(current);
      const currentLevel = level.get(current)!;

      yield createEvent.message(
        `Dequeue: "${current}" (level ${currentLevel})`,
        'step'
      );

      // Update visualization - current node being processed
      const updatedNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === current ? 'current' as const :
          n.id === source.id ? 'source' as const :
            visited.has(n.id) ? 'visited' as const : 'default' as const,
        distance: level.has(n.id) ? level.get(n.id) : '∞',
      }));

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'processing',
        graphState: {
          nodes: updatedNodes,
          edges: graphEdges,
          isDirected,
          isWeighted,
          queue: [...queue],
          message: `Processing node "${current}" at level ${currentLevel}`,
        },
      });

      // Explore neighbors
      yield createEvent.highlight([6, 7, 8, 9, 10]);

      const neighbors = adjList.get(current) || [];
      for (const neighbor of neighbors) {
        // Find edge for visualization
        const edgeIdx = graphEdges.findIndex(e =>
          (e.source === current && e.target === neighbor) ||
          (!isDirected && e.source === neighbor && e.target === current)
        );

        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          level.set(neighbor, currentLevel + 1);
          parent.set(neighbor, current);
          queue.push(neighbor);

          yield createEvent.message(
            `  Found unvisited neighbor "${neighbor}" → level ${currentLevel + 1}`,
            'explanation'
          );

          // Update edge state
          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }

          // Update nodes visualization
          const exploringNodes = graphNodes.map(n => ({
            ...n,
            state: n.id === current ? 'current' as const :
              n.id === neighbor ? 'processing' as const :
                n.id === source.id ? 'source' as const :
                  visited.has(n.id) ? 'visited' as const : 'default' as const,
            distance: level.has(n.id) ? level.get(n.id) : '∞',
          }));

          yield createEvent.auxiliary({
            type: 'graph',
            phase: 'exploring',
            graphState: {
              nodes: exploringNodes,
              edges: graphEdges.map((e, i) => ({
                ...e,
                state: i === edgeIdx ? 'current' as const : e.state,
              })),
              isDirected,
              isWeighted,
              queue: [...queue],
              message: `Added "${neighbor}" to queue (level ${currentLevel + 1})`,
            },
          });
        } else {
          yield createEvent.message(
            `  Neighbor "${neighbor}" already visited, skipping`,
            'explanation'
          );
        }
      }

      // Mark current as finished
      const nodeIdx = graphNodes.findIndex(n => n.id === current);
      if (nodeIdx >= 0) {
        graphNodes[nodeIdx].state = current === source.id ? 'source' : 'finished';
      }
    }

    // Final result
    yield createEvent.highlight([11]);

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({
          ...n,
          state: n.id === source.id ? 'source' as const :
            visited.has(n.id) ? 'finished' as const : 'default' as const,
          distance: level.has(n.id) ? level.get(n.id) : '∞',
        })),
        edges: graphEdges,
        isDirected,
        isWeighted,
        queue: [],
        message: `BFS complete! Visited ${visited.size} nodes`,
      },
    });

    yield createEvent.message(
      `BFS complete! Visit order: [${visitOrder.join(' → ')}]`,
      'info'
    );

    yield createEvent.result(
      'string',
      `${visited.size} nodes visited`,
      `Order: [${visitOrder.join(', ')}], Levels: ${Math.max(...Array.from(level.values())) + 1}`
    );
  },
};
