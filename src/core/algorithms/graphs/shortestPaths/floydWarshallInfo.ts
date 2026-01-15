export const floydWarshallInfo = {
  id: 'floyd-warshall',
  name: 'Floyd-Warshall Algorithm',
  description: 'Floyd-Warshall computes shortest paths between all pairs of vertices using dynamic programming.',
  howItWorks: 'Consider each vertex as an intermediate point. For each pair (i,j), check if going through k gives a shorter path: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).',
  keyInsight: 'By systematically considering each vertex as intermediate, we build up shortest paths using smaller subpaths.',
  bestFor: ['All-pairs shortest paths', 'Dense graphs', 'Transitive closure', 'Finding graph diameter'],
  avoidWhen: ['Only need single-source paths', 'Graph is sparse (use Dijkstra/Bellman-Ford)', 'V is very large (O(V³) is prohibitive)'],
  funFact: 'The algorithm was published by Robert Floyd in 1962, based on a theorem by Stephen Warshall!',
  optimizationTips: ['Space can be reduced to O(V²)', 'Negative cycle exists if dist[i][i] < 0', 'Can track paths with predecessor matrix'],
  tags: ['Graphs', 'All-Pairs Shortest Path', 'Dynamic Programming', 'O(V³)', 'Advanced'],
};
