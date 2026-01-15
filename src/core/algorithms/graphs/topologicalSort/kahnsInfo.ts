export const kahnsInfo = {
  id: 'kahns',
  name: "Kahn's Algorithm",
  description: "Kahn's performs topological sort using BFS with in-degree counting, iteratively removing zero in-degree vertices.",
  howItWorks: 'Count in-degree of all vertices. Add zero in-degree vertices to queue. Dequeue, output, and decrement neighbors\' in-degrees. Add new zero-degree vertices to queue.',
  keyInsight: 'If we process all vertices, graph is a DAG. If not, there\'s a cycle. This elegantly detects cycles while sorting.',
  bestFor: ['Task scheduling', 'Build systems', 'Course prerequisites', 'Detecting cycles in DAGs'],
  avoidWhen: ['Graph is undirected', 'Need lexicographically smallest order (use modified version)', 'Only need cycle detection (DFS may be simpler)'],
  funFact: 'Kahn published this algorithm in 1962. It\'s often preferred for parallel processing due to its BFS nature!',
  optimizationTips: ['Use priority queue for lexicographic order', 'Can process multiple zero-degree nodes in parallel', 'Works well for dynamic graphs with incremental updates'],
  tags: ['Graphs', 'Topological Sort', 'BFS', 'DAG', 'O(V+E)', 'Intermediate'],
};
