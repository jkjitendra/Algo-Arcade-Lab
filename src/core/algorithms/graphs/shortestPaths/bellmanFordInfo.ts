export const bellmanFordInfo = {
  id: 'bellman-ford',
  name: 'Bellman-Ford Algorithm',
  description: 'Bellman-Ford finds shortest paths from a source, supporting negative edge weights and detecting negative cycles.',
  howItWorks: 'Relax all edges V-1 times. In each iteration, update distances if a shorter path is found. One extra iteration detects negative cycles.',
  keyInsight: 'After V-1 relaxations, the shortest path is guaranteed if no negative cycle exists. The extra iteration catches cycles.',
  bestFor: ['Graphs with negative weights', 'Detecting negative cycles', 'Currency arbitrage detection', 'Distance-vector routing'],
  avoidWhen: ['All weights are non-negative (Dijkstra is faster)', 'Need all-pairs shortest paths', 'Graph is very dense'],
  funFact: 'The algorithm was independently discovered by both Richard Bellman and Lester Ford Jr. in 1958!',
  optimizationTips: ['Early termination if no relaxation occurs', 'SPFA optimization uses queue-based approach', 'Can reconstruct paths using parent pointers'],
  tags: ['Graphs', 'Shortest Path', 'Negative Weights', 'Dynamic Programming', 'O(VE)', 'Intermediate'],
};
