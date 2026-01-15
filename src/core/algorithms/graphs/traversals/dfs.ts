import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Depth-First Search (DFS)
 * 
 * Deep exploration before backtracking.
 * Uses a stack (explicit or via recursion) to track nodes.
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export const dfs: IAlgorithm<GraphInput> = {
  id: 'dfs',
  name: 'Depth-First Search (DFS)',
  category: 'graphs',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function DFS(graph, source):',
    '  stack = [source]',
    '  visited = {}',
    '  while stack is not empty:',
    '    current = stack.pop()',
    '    if current not in visited:',
    '      visited.add(current)',
    '      process(current)',
    '      for each neighbor of current:',
    '        if neighbor not in visited:',
    '          stack.push(neighbor)',
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
      `Starting DFS from node "${source.id}"`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2]);

    // Initialize DFS structures
    const stack: string[] = [source.id];
    const visited: Set<string> = new Set();
    const visitOrder: string[] = [];
    const discoveryTime: Map<string, number> = new Map();
    const finishTime: Map<string, number> = new Map();
    let time = 0;

    // Initialize graph state
    const graphNodes: { id: string; label: string; state: 'default' | 'source' | 'target' | 'current' | 'visited' | 'processing' | 'finished' | 'path'; x?: number; y?: number }[] = nodes.map(node => ({
      id: node.id,
      label: node.label || node.id,
      state: node.id === source.id ? 'source' : 'default',
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
        stack: [...stack],
        message: `Stack initialized with source: [${source.id}]`,
      },
    });

    // DFS main loop
    yield createEvent.highlight([3, 4]);

    while (stack.length > 0) {
      const current = stack.pop()!;

      yield createEvent.message(
        `Pop: "${current}" from stack`,
        'step'
      );

      if (visited.has(current)) {
        yield createEvent.message(
          `  "${current}" already visited, skipping`,
          'explanation'
        );
        continue;
      }

      // Mark as visited with discovery time
      yield createEvent.highlight([5, 6, 7]);
      visited.add(current);
      visitOrder.push(current);
      discoveryTime.set(current, time++);

      yield createEvent.message(
        `  Visiting "${current}" (discovery time: ${discoveryTime.get(current)})`,
        'step'
      );

      // Update visualization - current node being processed
      const updatedNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === current ? 'current' as const :
          n.id === source.id && current !== source.id ? 'source' as const :
            visited.has(n.id) ? 'visited' as const : 'default' as const,
      }));

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'processing',
        graphState: {
          nodes: updatedNodes,
          edges: graphEdges,
          isDirected,
          isWeighted,
          stack: [...stack],
          message: `Processing node "${current}"`,
        },
      });

      // Push neighbors onto stack (in reverse order for natural traversal order)
      yield createEvent.highlight([8, 9, 10]);

      const neighbors = adjList.get(current) || [];
      const reversedNeighbors = [...neighbors].reverse();

      for (const neighbor of reversedNeighbors) {
        // Find edge for visualization
        const edgeIdx = graphEdges.findIndex(e =>
          (e.source === current && e.target === neighbor) ||
          (!isDirected && e.source === neighbor && e.target === current)
        );

        if (!visited.has(neighbor) && !stack.includes(neighbor)) {
          stack.push(neighbor);

          yield createEvent.message(
            `  Push "${neighbor}" onto stack`,
            'explanation'
          );

          // Update edge state
          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'current';
          }

          yield createEvent.auxiliary({
            type: 'graph',
            phase: 'exploring',
            graphState: {
              nodes: updatedNodes.map(n => ({
                ...n,
                state: n.id === neighbor ? 'processing' as const : n.state,
              })),
              edges: graphEdges,
              isDirected,
              isWeighted,
              stack: [...stack],
              message: `Pushed "${neighbor}" onto stack`,
            },
          });

          // Reset edge to visited state
          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }
        } else if (visited.has(neighbor)) {
          // Back edge detection (for directed graphs)
          if (isDirected && edgeIdx >= 0 && finishTime.get(neighbor) === undefined) {
            graphEdges[edgeIdx].state = 'back-edge';
            yield createEvent.message(
              `  Back edge detected: ${current} → ${neighbor}`,
              'explanation'
            );
          }
        }
      }

      // Mark finish time
      finishTime.set(current, time++);

      // Mark current as visited in graphNodes
      const nodeIdx = graphNodes.findIndex(n => n.id === current);
      if (nodeIdx >= 0) {
        graphNodes[nodeIdx].state = current === source.id ? 'source' : 'visited';
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
        })),
        edges: graphEdges,
        isDirected,
        isWeighted,
        stack: [],
        message: `DFS complete! Visited ${visited.size} nodes`,
      },
    });

    yield createEvent.message(
      `DFS complete! Visit order: [${visitOrder.join(' → ')}]`,
      'info'
    );

    yield createEvent.result(
      'string',
      `${visited.size} nodes visited`,
      `Order: [${visitOrder.join(', ')}]`
    );
  },
};
