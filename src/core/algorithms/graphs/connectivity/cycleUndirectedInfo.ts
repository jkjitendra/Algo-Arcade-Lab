export const cycleUndirectedInfo = {
  id: 'cycle-undirected',
  name: 'Cycle Detection (Undirected)',
  description: 'Detect if an undirected graph contains a cycle using DFS with parent tracking.',
  howItWorks: 'DFS from each unvisited vertex, tracking parent. If we visit a node that\'s already visited and isn\'t the parent, we found a cycle (back edge).',
  keyInsight: 'In undirected graphs, we must exclude the parent to avoid false positives from the edge we came from.',
  bestFor: ['Checking if graph is a tree/forest', 'Validating DAG-like structures', 'Finding any cycle quickly'],
  avoidWhen: ['Graph is directed (use color-based detection)', 'Need to find all cycles', 'Need the actual cycle path'],
  funFact: 'A connected undirected graph with V vertices and V-1 edges is always a tree (no cycles)!',
  optimizationTips: ['Union-Find can also detect cycles during edge addition', 'Early termination when cycle found', 'BFS can also be used with parent tracking'],
  tags: ['Graphs', 'Cycle Detection', 'DFS', 'Undirected', 'O(V+E)', 'Intermediate'],
};
