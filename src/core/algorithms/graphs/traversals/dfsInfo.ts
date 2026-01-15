export const dfsInfo = {
  id: 'dfs',
  name: 'Depth-First Search (DFS)',
  description: 'DFS explores as deep as possible along each branch before backtracking. Uses a stack (or recursion).',
  howItWorks: 'Start from source, push to stack. Pop a node, mark visited, push unvisited neighbors. Repeat. Recursion naturally implements this via call stack.',
  keyInsight: 'DFS uses less memory than BFS for wide graphs and naturally finds paths, though not necessarily shortest ones.',
  bestFor: ['Cycle detection', 'Topological sorting', 'Finding connected components', 'Solving mazes', 'Generate & test problems'],
  avoidWhen: ['Need shortest path', 'Graph is very deep (stack overflow risk)', 'Need level-order processing'],
  funFact: 'DFS is the basis for many advanced algorithms including Tarjan\'s SCC and bridge-finding algorithms!',
  optimizationTips: ['Iterative version avoids stack overflow', 'Use colors (white/gray/black) for cycle detection', 'Track discovery and finish times for advanced applications'],
  tags: ['Graphs', 'Traversal', 'Stack', 'Recursion', 'O(V+E)', 'Beginner'],
};
