export const kruskalInfo = {
  id: 'kruskal',
  name: "Kruskal's Algorithm",
  description: "Kruskal's builds a Minimum Spanning Tree by greedily adding the smallest edge that doesn't create a cycle.",
  howItWorks: 'Sort all edges by weight. For each edge, if it connects two different components (using Union-Find), add it to the MST.',
  keyInsight: 'Union-Find enables O(α(n)) ≈ O(1) cycle detection, making the algorithm efficient despite checking all edges.',
  bestFor: ['Sparse graphs', 'When edges are already sorted', 'Network design', 'Clustering algorithms'],
  avoidWhen: ['Graph is very dense (Prim\'s may be faster)', 'Need to build MST incrementally', 'Edges can\'t be easily sorted'],
  funFact: 'Joseph Kruskal published this algorithm in 1956. It\'s one of the first successful applications of the greedy paradigm!',
  optimizationTips: ['Use Union-Find with path compression and union by rank', 'Can stop early when MST has V-1 edges', 'Borůvka\'s can be faster for parallel processing'],
  tags: ['Graphs', 'MST', 'Greedy', 'Union-Find', 'O(E log E)', 'Intermediate'],
};
