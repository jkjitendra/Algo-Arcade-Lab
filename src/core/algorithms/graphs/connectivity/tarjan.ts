import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Tarjan's Algorithm
 * 
 * Find bridges (critical edges) and articulation points (critical vertices).
 * Uses DFS with discovery and low times.
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export const tarjan: IAlgorithm<GraphInput> = {
  id: 'tarjan',
  name: "Tarjan's Algorithm (Bridges/Articulation Points)",
  category: 'graphs',
  difficulty: 'advanced',

  pseudocodeLines: [
    "function Tarjan(graph):",
    '  disc[v] = low[v] = -1 for all v',
    '  time = 0',
    '  for each vertex v:',
    '    if disc[v] == -1:',
    '      DFS(v, null)',
    '',
    'function DFS(u, parent):',
    '  disc[u] = low[u] = time++',
    '  children = 0',
    '  for each neighbor v of u:',
    '    if disc[v] == -1:',
    '      children++; DFS(v, u)',
    '      low[u] = min(low[u], low[v])',
    '      if low[v] > disc[u]: // bridge',
    '      if parent==null && children>1 OR parent!=null && low[v]>=disc[u]: // AP',
    '    else if v ≠ parent:',
    '      low[u] = min(low[u], disc[v])',
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
    if (input.nodes.length > 12) {
      return { ok: false, error: 'Maximum 12 nodes for visualization' };
    }
    if (input.isDirected) {
      return { ok: false, error: "Tarjan's bridges/articulation points requires an undirected graph" };
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
      `Running Tarjan's Algorithm for bridges and articulation points`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2]);

    // State
    const disc: Map<string, number> = new Map();
    const low: Map<string, number> = new Map();
    nodes.forEach(node => {
      disc.set(node.id, -1);
      low.set(node.id, -1);
    });
    let time = 0;

    const bridges: { u: string; v: string }[] = [];
    const articulationPoints: Set<string> = new Set();

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
        message: 'disc[] and low[] initialized to -1',
      },
    });

    // DFS helper
    function* dfs(u: string, parent: string | null): Generator<AlgoEvent, void, unknown> {
      disc.set(u, time);
      low.set(u, time);
      time++;
      let children = 0;

      yield createEvent.highlight([7, 8, 9]);
      yield createEvent.message(
        `DFS(${u}, parent=${parent ?? 'null'}): disc=${disc.get(u)}, low=${low.get(u)}`,
        'step'
      );

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'exploring',
        graphState: {
          nodes: graphNodes.map(n => ({
            ...n,
            state: n.id === u ? 'current' as const :
              articulationPoints.has(n.id) ? 'target' as const :
                disc.get(n.id)! >= 0 ? 'visited' as const : 'default' as const,
            distance: disc.get(n.id)! >= 0 ? `d:${disc.get(n.id)}/l:${low.get(n.id)}` : undefined,
          })),
          edges: graphEdges,
          isDirected: false,
          isWeighted,
          message: `"${u}": disc=${disc.get(u)}, low=${low.get(u)}`,
        },
      });

      yield createEvent.highlight([10, 11, 12, 13, 14, 15]);

      const neighbors = adjList.get(u) || [];
      for (const v of neighbors) {
        const edgeIdx = graphEdges.findIndex(e =>
          (e.source === u && e.target === v) ||
          (e.source === v && e.target === u)
        );

        if (disc.get(v) === -1) {
          // Unvisited
          children++;

          yield createEvent.message(
            `  ${u} → ${v}: tree edge, recursing`,
            'explanation'
          );

          if (edgeIdx >= 0) {
            graphEdges[edgeIdx].state = 'visited';
          }

          yield* dfs(v, u);

          // Update low value
          low.set(u, Math.min(low.get(u)!, low.get(v)!));

          yield createEvent.message(
            `  Back from ${v}: low[${u}] = min(${low.get(u)}, ${low.get(v)}) = ${low.get(u)}`,
            'explanation'
          );

          // Check for bridge
          if (low.get(v)! > disc.get(u)!) {
            bridges.push({ u, v });
            if (edgeIdx >= 0) {
              graphEdges[edgeIdx].state = 'back-edge'; // Using back-edge style for bridges
            }

            yield createEvent.message(
              `  🌉 BRIDGE found: ${u} — ${v} (low[${v}]=${low.get(v)} > disc[${u}]=${disc.get(u)})`,
              'info'
            );
          }

          // Check for articulation point
          if (parent === null && children > 1) {
            // Root with multiple children
            articulationPoints.add(u);
            yield createEvent.message(
              `  🔴 ARTICULATION POINT: ${u} (root with ${children} children)`,
              'info'
            );
          } else if (parent !== null && low.get(v)! >= disc.get(u)!) {
            // Non-root where subtree can't reach ancestors
            articulationPoints.add(u);
            yield createEvent.message(
              `  🔴 ARTICULATION POINT: ${u} (low[${v}]=${low.get(v)} ≥ disc[${u}]=${disc.get(u)})`,
              'info'
            );
          }

          yield createEvent.auxiliary({
            type: 'graph',
            phase: 'updating',
            graphState: {
              nodes: graphNodes.map(n => ({
                ...n,
                state: n.id === u ? 'current' as const :
                  articulationPoints.has(n.id) ? 'target' as const :
                    disc.get(n.id)! >= 0 ? 'visited' as const : 'default' as const,
                distance: disc.get(n.id)! >= 0 ? `d:${disc.get(n.id)}/l:${low.get(n.id)}` : undefined,
              })),
              edges: graphEdges,
              isDirected: false,
              isWeighted,
              message: `Updated low[${u}] = ${low.get(u)}`,
            },
          });
        } else if (v !== parent) {
          // Back edge
          yield createEvent.highlight([16, 17]);
          low.set(u, Math.min(low.get(u)!, disc.get(v)!));

          yield createEvent.message(
            `  ${u} → ${v}: back edge, low[${u}] = min(${low.get(u)}, ${disc.get(v)}) = ${low.get(u)}`,
            'explanation'
          );
        }
      }
    }

    // Run DFS from each unvisited node
    yield createEvent.highlight([3, 4, 5]);

    for (const node of nodes) {
      if (disc.get(node.id) === -1) {
        yield createEvent.message(
          `Starting DFS from "${node.id}"`,
          'info'
        );
        yield* dfs(node.id, null);
      }
    }

    // Final result
    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({
          ...n,
          state: articulationPoints.has(n.id) ? 'target' as const : 'finished' as const,
          distance: `d:${disc.get(n.id)}/l:${low.get(n.id)}`,
        })),
        edges: graphEdges.map((e, i) => ({
          ...e,
          state: bridges.some(b =>
            (b.u === e.source && b.v === e.target) ||
            (b.u === e.target && b.v === e.source)
          ) ? 'back-edge' as const : 'visited' as const,
        })),
        isDirected: false,
        isWeighted,
        message: `Found ${bridges.length} bridge(s), ${articulationPoints.size} articulation point(s)`,
      },
    });

    yield createEvent.message(
      `Tarjan's Algorithm complete!`,
      'info'
    );

    const bridgesStr = bridges.length > 0
      ? bridges.map(b => `${b.u}—${b.v}`).join(', ')
      : 'None';
    const apStr = articulationPoints.size > 0
      ? Array.from(articulationPoints).join(', ')
      : 'None';

    yield createEvent.result(
      'string',
      `${bridges.length} bridges, ${articulationPoints.size} APs`,
      `Bridges: [${bridgesStr}] | Articulation Points: [${apStr}]`
    );
  },
};
