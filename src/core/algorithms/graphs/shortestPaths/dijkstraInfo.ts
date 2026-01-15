export const dijkstraInfo = {
  id: 'dijkstra',
  name: "Dijkstra's Algorithm",
  description: "Dijkstra's finds shortest paths from a source to all vertices in a weighted graph with non-negative weights.",
  howItWorks: 'Maintain distances to all nodes (initially ∞ except source=0). Use a priority queue to always process the closest unvisited node, relaxing edges to update distances.',
  keyInsight: 'By always choosing the minimum distance vertex, Dijkstra guarantees that once a vertex is processed, its shortest path is found.',
  bestFor: ['Single-source shortest path', 'Road networks', 'GPS navigation', 'Network routing protocols'],
  avoidWhen: ['Graph has negative edge weights', 'Need all-pairs shortest paths', 'Graph is unweighted (use BFS)'],
  funFact: 'Edsger Dijkstra conceived this algorithm in 20 minutes at a café in 1956, without pencil and paper!',
  optimizationTips: ['Use binary heap for O((V+E) log V)', 'Fibonacci heap gives O(E + V log V)', 'Early termination if only need path to one target'],
  tags: ['Graphs', 'Shortest Path', 'Greedy', 'Priority Queue', 'O((V+E)logV)', 'Intermediate'],
};
