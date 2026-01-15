export const adjacencyListInfo = {
  id: 'adjacency-list',
  name: 'Adjacency List',
  description: 'A graph representation where each vertex stores a list of its neighbors. Space-efficient for sparse graphs.',
  howItWorks: 'Create an array/map of V lists. For edge (u,v), add v to the list of u (and u to v\'s list for undirected). Weights can be stored as pairs.',
  keyInsight: 'Space is O(V+E), much better than O(V²) matrix for sparse graphs. Neighbor iteration is O(degree).',
  bestFor: ['Sparse graphs', 'BFS/DFS traversals', 'Most real-world graphs', 'When space is limited'],
  avoidWhen: ['Frequent edge existence queries needed (O(degree) vs O(1))', 'Graph is very dense', 'Matrix operations are required'],
  funFact: 'Most real-world graphs (social networks, web, roads) are sparse, making adjacency lists the default choice!',
  optimizationTips: ['Use vector/ArrayList for cache efficiency', 'Sort neighbor lists for binary search edge queries', 'Consider CSR format for very large graphs'],
  tags: ['Graphs', 'Representation', 'List', 'O(V+E) Space', 'Beginner'],
};
