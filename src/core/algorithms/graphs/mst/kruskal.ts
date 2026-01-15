import { IAlgorithm } from '../../IAlgorithm';
import { GraphInput } from '../../../models';
import { AlgoEvent, createEvent } from '../../../events/events';

/**
 * Kruskal's Algorithm
 * 
 * Minimum Spanning Tree using edge sorting and Union-Find.
 * Greedy: always pick the smallest edge that doesn't form a cycle.
 * 
 * Time Complexity: O(E log E) - dominated by sorting
 * Space Complexity: O(V) - for Union-Find
 */

// Union-Find (Disjoint Set Union) data structure
class UnionFind {
  parent: Map<string, string>;
  rank: Map<string, number>;

  constructor(nodes: string[]) {
    this.parent = new Map();
    this.rank = new Map();
    nodes.forEach(node => {
      this.parent.set(node, node);
      this.rank.set(node, 0);
    });
  }

  find(x: string): string {
    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)!)); // Path compression
    }
    return this.parent.get(x)!;
  }

  union(x: string, y: string): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false; // Already in same set (would form cycle)

    // Union by rank
    const rankX = this.rank.get(rootX)!;
    const rankY = this.rank.get(rootY)!;

    if (rankX < rankY) {
      this.parent.set(rootX, rootY);
    } else if (rankX > rankY) {
      this.parent.set(rootY, rootX);
    } else {
      this.parent.set(rootY, rootX);
      this.rank.set(rootX, rankX + 1);
    }
    return true;
  }

  getState(): { parents: Record<string, string>; ranks: Record<string, number> } {
    const parents: Record<string, string> = {};
    const ranks: Record<string, number> = {};
    this.parent.forEach((v, k) => parents[k] = v);
    this.rank.forEach((v, k) => ranks[k] = v);
    return { parents, ranks };
  }
}

export const kruskal: IAlgorithm<GraphInput> = {
  id: 'kruskal',
  name: "Kruskal's Algorithm",
  category: 'graphs',
  difficulty: 'intermediate',

  pseudocodeLines: [
    "function Kruskal(graph):",
    '  MST = empty set',
    '  edges = sort all edges by weight',
    '  uf = new UnionFind(V)',
    '  for each edge (u, v, w) in sorted edges:',
    '    if uf.find(u) ≠ uf.find(v):',
    '      MST.add(edge)',
    '      uf.union(u, v)',
    '    if |MST| == V-1: break',
    '  return MST',
  ],

  timeComplexity: {
    best: 'O(E log E)',
    average: 'O(E log E)',
    worst: 'O(E log E)',
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
      return { ok: false, error: "Kruskal's algorithm requires an undirected graph" };
    }
    return { ok: true };
  },

  *run(input: GraphInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const { nodes, edges, isWeighted } = input;
    const V = nodes.length;

    yield createEvent.message(
      `Running Kruskal's Algorithm on ${V} nodes, ${edges.length} edges`,
      'info'
    );

    yield createEvent.highlight([0, 1, 2, 3]);

    // Create edge list with weights and sort
    const edgeList = edges.map((edge, idx) => ({
      u: edge.source,
      v: edge.target,
      w: edge.weight ?? 1,
      idx,
    }));

    edgeList.sort((a, b) => a.w - b.w);

    yield createEvent.message(
      `Edges sorted by weight: [${edgeList.map(e => `(${e.u}-${e.v}:${e.w})`).join(', ')}]`,
      'step'
    );

    // Initialize Union-Find
    const uf = new UnionFind(nodes.map(n => n.id));

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
      isDirected: false,
    }));

    yield createEvent.auxiliary({
      type: 'graph',
      graphState: {
        nodes: graphNodes,
        edges: graphEdges,
        isDirected: false,
        isWeighted: true,
        unionFind: uf.getState(),
        message: 'Union-Find initialized: each node is its own parent',
      },
    });

    // MST construction
    const mstEdges: typeof edgeList = [];
    let totalWeight = 0;

    yield createEvent.highlight([4, 5, 6, 7, 8]);

    for (const edge of edgeList) {
      yield createEvent.message(
        `Checking edge (${edge.u}, ${edge.v}) with weight ${edge.w}`,
        'step'
      );

      const rootU = uf.find(edge.u);
      const rootV = uf.find(edge.v);

      // Highlight current edge
      const updatedEdges = graphEdges.map((e, i) => ({
        ...e,
        state: i === edge.idx ? 'current' as const :
          mstEdges.some(mst => mst.idx === i) ? 'mst' as const :
            'default' as const,
      }));

      const updatedNodes = graphNodes.map(n => ({
        ...n,
        state: n.id === edge.u || n.id === edge.v ? 'current' as const : 'default' as const,
        componentId: nodes.findIndex(node => uf.find(node.id) === uf.find(n.id)),
      }));

      yield createEvent.auxiliary({
        type: 'graph',
        phase: 'checking',
        graphState: {
          nodes: updatedNodes,
          edges: updatedEdges,
          isDirected: false,
          isWeighted: true,
          unionFind: uf.getState(),
          message: `find(${edge.u}) = ${rootU}, find(${edge.v}) = ${rootV}`,
        },
      });

      if (rootU !== rootV) {
        // No cycle - add to MST
        uf.union(edge.u, edge.v);
        mstEdges.push(edge);
        totalWeight += edge.w;

        yield createEvent.message(
          `✓ Added edge (${edge.u}, ${edge.v}) to MST (total: ${mstEdges.length} edges)`,
          'explanation'
        );

        // Update edge state to MST
        graphEdges[edge.idx].state = 'mst';

        yield createEvent.auxiliary({
          type: 'graph',
          phase: 'adding',
          graphState: {
            nodes: graphNodes.map(n => ({
              ...n,
              componentId: nodes.findIndex(node => uf.find(node.id) === uf.find(n.id)),
            })),
            edges: graphEdges.map((e, i) => ({
              ...e,
              state: mstEdges.some(mst => mst.idx === i) ? 'mst' as const : 'default' as const,
            })),
            isDirected: false,
            isWeighted: true,
            unionFind: uf.getState(),
            message: `Edge added to MST! Total weight so far: ${totalWeight}`,
          },
        });

        // Check if MST is complete
        if (mstEdges.length === V - 1) {
          yield createEvent.message(
            `MST complete with ${V - 1} edges`,
            'info'
          );
          break;
        }
      } else {
        yield createEvent.message(
          `✗ Skipped (${edge.u}, ${edge.v}) - would form cycle`,
          'explanation'
        );
      }
    }

    // Final result
    yield createEvent.highlight([9]);

    yield createEvent.auxiliary({
      type: 'graph',
      phase: 'complete',
      graphState: {
        nodes: graphNodes.map(n => ({ ...n, state: 'finished' as const })),
        edges: graphEdges.map((e, i) => ({
          ...e,
          state: mstEdges.some(mst => mst.idx === i) ? 'mst' as const : 'default' as const,
        })),
        isDirected: false,
        isWeighted: true,
        unionFind: uf.getState(),
        message: `Kruskal's complete! MST weight: ${totalWeight}`,
      },
    });

    yield createEvent.message(
      `Kruskal's Algorithm complete! MST has ${mstEdges.length} edges with total weight ${totalWeight}`,
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
