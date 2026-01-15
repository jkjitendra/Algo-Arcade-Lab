export const bfsInfo = {
  id: 'bfs',
  name: 'Breadth-First Search (BFS)',
  description: 'BFS explores a graph level by level, visiting all neighbors before moving deeper. Uses a queue to track nodes.',
  howItWorks: 'Start from source, add to queue. Dequeue a node, mark visited, add unvisited neighbors to queue. Repeat until queue is empty.',
  keyInsight: 'The queue ensures we explore nodes in order of their distance from the source, making BFS perfect for shortest path in unweighted graphs.',
  bestFor: ['Finding shortest path (unweighted)', 'Level-order traversal', 'Finding connected components', 'Web crawlers'],
  avoidWhen: ['Graph has weighted edges (use Dijkstra)', 'Memory is very limited', 'Only need to detect cycles'],
  funFact: 'BFS was first developed by Konrad Zuse in 1945 as part of his PhD thesis, though not published until 1972!',
  optimizationTips: ['Use a deque for O(1) operations', 'Mark visited before enqueuing to avoid duplicates', 'Consider bidirectional BFS for point-to-point search'],
  tags: ['Graphs', 'Traversal', 'Queue', 'O(V+E)', 'Beginner'],
};
