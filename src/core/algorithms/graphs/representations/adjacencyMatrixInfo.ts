export const adjacencyMatrixInfo = {
  id: 'adjacency-matrix',
  name: 'Adjacency Matrix',
  description: 'A 2D matrix representation of a graph where matrix[i][j] stores the edge weight between vertices i and j.',
  howItWorks: 'Create a V×V matrix. For each edge (u,v,w), set matrix[u][v] = w (and matrix[v][u] = w for undirected). Non-edges are 0 or ∞.',
  keyInsight: 'O(1) edge lookup and update, perfect for dense graphs. Space is always O(V²) regardless of edge count.',
  bestFor: ['Dense graphs (E ≈ V²)', 'Floyd-Warshall algorithm', 'Frequent edge queries', 'Small graphs'],
  avoidWhen: ['Graph is sparse', 'Memory is limited', 'Need to iterate over neighbors efficiently'],
  funFact: 'Matrix operations can be used on adjacency matrices - A^k counts paths of length k between vertices!',
  optimizationTips: ['Use bitsets for unweighted graphs', 'Symmetric matrix can use half the space', 'Consider sparse matrix formats for semi-sparse graphs'],
  tags: ['Graphs', 'Representation', 'Matrix', 'O(V²) Space', 'Beginner'],
};
