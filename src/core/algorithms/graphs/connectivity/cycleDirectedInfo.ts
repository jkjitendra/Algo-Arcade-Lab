export const cycleDirectedInfo = {
  id: 'cycle-directed',
  name: 'Cycle Detection (Directed)',
  description: 'Detect cycles in a directed graph using DFS with three colors (white/gray/black).',
  howItWorks: 'Color nodes: WHITE (unvisited), GRAY (in current DFS path), BLACK (finished). If we visit a GRAY node, we found a back edge and thus a cycle.',
  keyInsight: 'GRAY nodes are ancestors in the current path. Visiting a GRAY node means we can reach an ancestor, forming a cycle.',
  bestFor: ['Checking if graph is a DAG', 'Prerequisite validation', 'Deadlock detection', 'Dependency cycle detection'],
  avoidWhen: ['Graph is undirected', 'Need to find all cycles', 'Need strongly connected components'],
  funFact: 'This three-color scheme is the standard approach taught in CLRS (Introduction to Algorithms)!',
  optimizationTips: ['Can combine with topological sort', 'Track the actual cycle path if needed', 'Consider Tarjan\'s SCC for finding all cycles'],
  tags: ['Graphs', 'Cycle Detection', 'DFS', 'Directed', 'DAG', 'O(V+E)', 'Intermediate'],
};
