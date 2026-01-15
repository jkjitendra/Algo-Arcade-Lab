export const primInfo = {
  id: 'prim',
  name: "Prim's Algorithm",
  description: "Prim's grows a Minimum Spanning Tree from a starting vertex, always adding the minimum weight edge to an unvisited vertex.",
  howItWorks: 'Start with one vertex in MST. Repeat: find minimum weight edge from MST to outside, add that vertex to MST. Continue until all vertices included.',
  keyInsight: 'Like Dijkstra but tracks minimum edge weight to each vertex, not total distance from source.',
  bestFor: ['Dense graphs', 'When starting vertex matters', 'Real-time MST construction', 'Network infrastructure planning'],
  avoidWhen: ['Graph is very sparse (Kruskal may be faster)', 'Need to process edges in sorted order', 'Graph is disconnected'],
  funFact: 'Developed by Vojtěch Jarník in 1930 and rediscovered by Robert Prim in 1957 and Edsger Dijkstra in 1959!',
  optimizationTips: ['Use binary heap for O((V+E) log V)', 'Fibonacci heap gives O(E + V log V)', 'Adjacency list preferred over matrix for sparse graphs'],
  tags: ['Graphs', 'MST', 'Greedy', 'Priority Queue', 'O((V+E)logV)', 'Intermediate'],
};
