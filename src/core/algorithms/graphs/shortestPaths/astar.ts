import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * A* Search Algorithm
 * 
 * Heuristic-based shortest path finding.
 * Combines actual cost (g) with estimated remaining cost (h).
 * 
 * Time Complexity: O(E) - depends on heuristic quality
 * Space Complexity: O(V)
 */

export const astar: IAlgorithm<GraphInput> = {
  id: 'astar',
  name: 'A* Search Algorithm',
  category: 'graphs',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function AStar(graph, source, target):',
    '  g[source] = 0, g[v] = ∞ for all other v',
    '  f[v] = g[v] + h[v]   // f = actual + heuristic',
    '  openSet = {source}',
    '  while openSet is not empty:',
    '    current = node in openSet with lowest f',
    '    if current == target:',
    '      return reconstructPath()',
    '    openSet.remove(current), closedSet.add(current)',
    '    for each neighbor of current:',
    '      tentative_g = g[current] + weight(current, neighbor)',
    '      if tentative_g < g[neighbor]:',
    '        parent[neighbor] = current',
    '        g[neighbor] = tentative_g',
    '        f[neighbor] = g[neighbor] + h[neighbor]',
    '        openSet.add(neighbor)',
    '  return "No path found"',
  ],

  timeComplexity: {
    best: 'O(E)',
    average: 'O(E log V)',
    worst: 'O(V²)',
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
    {
      type: 'text',
      id: 'target',
      label: 'Target Node',
      default: 'F',
      placeholder: 'Destination node ID',
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
    const targetId = (params?.target as string) || nodes[nodes.length - 1].id;

    const source = nodes.find(n => n.id === sourceId) || nodes[0];
    const target = nodes.find(n => n.id === targetId) || nodes[nodes.length - 1];

    // Build adjacency list
    const adjList: Map<string, { target: string; weight: number }[]> = new Map();
    nodes.forEach(node => adjList.set(node.id, []));
    edges.forEach(edge => {
      const weight = edge.weight ?? 1;
      adjList.get(edge.source)!.push({ target: edge.target, weight });
      if (!isDirected) {
        adjList.get(edge.target)!.push({ target: edge.source, weight });
      }
    });

    // Simple heuristic: use node positions if available, else use 0 (degrades to Dijkstra)
    const heuristic = (nodeId: string): number => {
      const node = nodes.find(n => n.id === nodeId);
      const targetNode = nodes.find(n => n.id === target.id);
      if (node?.x !== undefined && node?.y !== undefined &&
        targetNode?.x !== undefined && targetNode?.y !== undefined) {
        // Euclidean distance scaled down
        const dx = (targetNode.x - node.x) / 50;
        const dy = (targetNode.y - node.y) / 50;
        return Math.sqrt(dx * dx + dy * dy);
      }
      return 0; // No heuristic available
    };

    yield createEvent.message(
      `A* Search: Finding path from "${source.id}" to "${target.id}"`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2, 3]);

    // Initialize
    const g: Map<string, number> = new Map();
    const f: Map<string, number> = new Map();
    const parent: Map<string, string | null> = new Map();
    const openSet: Set<string> = new Set([source.id]);
    const closedSet: Set<string> = new Set();

    nodes.forEach(node => {
      g.set(node.id, node.id === source.id ? 0 : Infinity);
      f.set(node.id, node.id === source.id ? heuristic(node.id) : Infinity);
      parent.set(node.id, null);
    });

    // Initialize graph state
    const graphNodes = nodes.map(node => ({
      id: node.id,
      label: node.label || node.id,
      state: node.id === source.id ? 'source' as const :
        node.id === target.id ? 'target' as const : 'default' as const,
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
    nodes.forEach(n => {
      const gVal = g.get(n.id)!;
      const hVal = heuristic(n.id);
      distances[n.id] = gVal === Infinity ? '∞' : `g:${gVal.toFixed(1)}`;
    });

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected,
        isWeighted: true,
        distances,
        message: `Open set: [${source.id}], Target: ${target.id}`,
      },
    });

    // A* main loop
    yield createEvent.highlight([4, 5]);

    while (openSet.size > 0) {
      // Find node in open set with lowest f score
      let current: string | null = null;
      let lowestF = Infinity;
      for (const nodeId of openSet) {
        if (f.get(nodeId)! < lowestF) {
          lowestF = f.get(nodeId)!;
          current = nodeId;
        }
      }

      if (current === null) break;

      yield createEvent.message(
        `Expand node "${current}" (f=${f.get(current)!.toFixed(1)}, g=${g.get(current)!.toFixed(1)})`,
        'step'
      );

      // Check if we reached the target
      yield createEvent.highlight([6, 7]);

      if (current === target.id) {
        // Reconstruct path
        const path: string[] = [];
        let curr: string | null = current;
        while (curr !== null) {
          path.unshift(curr);
          curr = parent.get(curr)!;
        }

        yield createEvent.message(
          `✓ Target reached! Path found: [${path.join(' → ')}]`,
          'info'
        );

        // Highlight the path
        const pathSet = new Set(path);
        const pathEdgesIdx: Set<number> = new Set();
        for (let i = 0; i < path.length - 1; i++) {
          const idx = graphEdges.findIndex(e =>
            (e.source === path[i] && e.target === path[i + 1]) ||
            (!isDirected && e.source === path[i + 1] && e.target === path[i])
          );
          if (idx >= 0) pathEdgesIdx.add(idx);
        }

        yield createEvent.auxiliary({
          type: 'graph',
          phase: 'path-found',
          graphState: {
            nodes: graphNodes.map(n => ({
              ...n,
              state: n.id === source.id ? 'source' as const :
                n.id === target.id ? 'target' as const :
                  pathSet.has(n.id) ? 'path' as const :
                    closedSet.has(n.id) ? 'finished' as const : 'default' as const,
            })),
            edges: graphEdges.map((e, i) => ({
              ...e,
              state: pathEdgesIdx.has(i) ? 'path' as const :
                e.state === 'visited' ? 'visited' as const : 'default' as const,
            })),
            isDirected,
            isWeighted: true,
            message: `Shortest path found: ${path.join(' → ')} (cost: ${g.get(target.id)!.toFixed(1)})`,
          },
        });

        yield createEvent.result(
          'string',
          'Path found',
          `Path: [${path.join(' → ')}], Cost: ${g.get(target.id)!.toFixed(1)}`
        );
        return;
      }

      // Move current from open to closed
      yield createEvent.highlight([8]);
      openSet.delete(current);
      closedSet.add(current);

      // Update visualization
      const currentNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === current ? 'current' as const :
          n.id === source.id ? 'source' as const :
            n.id === target.id ? 'target' as const :
              closedSet.has(n.id) ? 'finished' as const :
                openSet.has(n.id) ? 'processing' as const : 'default' as const,
      }));

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'exploring',
        graphState: {
          nodes: currentNodes,
          edges: graphEdges,
          isDirected,
          isWeighted: true,
          distances,
          message: `Closed: "${current}", Open set size: ${openSet.size}`,
        },
      });

      // Explore neighbors
      yield createEvent.highlight([9, 10, 11, 12, 13, 14, 15]);

      const neighbors = adjList.get(current) || [];
      for (const { target: neighbor, weight } of neighbors) {
        if (closedSet.has(neighbor)) continue;

        const tentativeG = g.get(current)! + weight;

        // Find edge for visualization
        const edgeIdx = graphEdges.findIndex(e =>
          (e.source === current && e.target === neighbor) ||
          (!isDirected && e.source === neighbor && e.target === current)
        );

        if (tentativeG < g.get(neighbor)!) {
          parent.set(neighbor, current);
          g.set(neighbor, tentativeG);
          f.set(neighbor, tentativeG + heuristic(neighbor));
          openSet.add(neighbor);

          distances[neighbor] = `g:${tentativeG.toFixed(1)}`;

          yield createEvent.message(
            `  Updated "${neighbor}": g=${tentativeG.toFixed(1)}, f=${f.get(neighbor)!.toFixed(1)}`,
            'explanation'
          );

          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }
        }
      }
    }

    // No path found
    yield createEvent.highlight([16]);

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'no-path',
      graphState: {
        nodes: graphNodes.map(n => ({
          ...n,
          state: n.id === source.id ? 'source' as const :
            n.id === target.id ? 'target' as const :
              closedSet.has(n.id) ? 'finished' as const : 'default' as const,
        })),
        edges: graphEdges,
        isDirected,
        isWeighted: true,
        message: `No path exists from "${source.id}" to "${target.id}"`,
      },
    });

    yield createEvent.message(
      `No path found from "${source.id}" to "${target.id}"`,
      'info'
    );

    yield createEvent.result(
      'string',
      'No path',
      `No path exists between ${source.id} and ${target.id}`
    );
  },
};
