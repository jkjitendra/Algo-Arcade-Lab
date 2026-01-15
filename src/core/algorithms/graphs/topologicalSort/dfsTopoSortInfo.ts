export const dfsTopoSortInfo = {
  id: 'dfs-topo-sort',
  name: 'DFS Topological Sort',
  description: 'Topological sort using DFS finish times. Vertices are added to result in reverse order of completion.',
  howItWorks: 'Run DFS from each unvisited vertex. When DFS finishes a vertex (all descendants explored), push it to a stack. Final order is stack contents.',
  keyInsight: 'A vertex finishes only after all its dependencies, so reverse finish order gives valid topological order.',
  bestFor: ['When DFS is already needed', 'Finding cycles simultaneously', 'SCCs computation (Kosaraju)', 'Single-pass processing'],
  avoidWhen: ['Need to process in parallel (Kahn\'s is better)', 'Graph has very deep paths (stack overflow)', 'Need lexicographic order'],
  funFact: 'This method is the basis for many advanced algorithms including Kosaraju\'s SCC algorithm!',
  optimizationTips: ['Use colors (white/gray/black) to detect cycles', 'Gray node encounter means back edge (cycle)', 'Can combine with other DFS-based algorithms'],
  tags: ['Graphs', 'Topological Sort', 'DFS', 'DAG', 'O(V+E)', 'Intermediate'],
};
