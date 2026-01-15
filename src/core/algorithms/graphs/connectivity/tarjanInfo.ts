export const tarjanInfo = {
  id: 'tarjan',
  name: "Tarjan's Algorithm (Bridges & Articulation Points)",
  description: 'Find bridges (critical edges) and articulation points (critical vertices) in an undirected graph using DFS.',
  howItWorks: 'Track discovery time and low value for each vertex. Low value is the minimum discovery time reachable. Bridges: low[v] > disc[u]. Articulation points: root with 2+ children or non-root with low[v] >= disc[u].',
  keyInsight: 'Low values capture the "earliest" ancestor reachable via a back edge. This reveals whether removing an edge/vertex disconnects the graph.',
  bestFor: ['Finding network vulnerabilities', 'Critical infrastructure analysis', 'Biconnected components', 'Graph robustness testing'],
  avoidWhen: ['Graph is directed (different algorithms needed)', 'Only need connectivity check', 'Graph is very dense (all vertices may be articulation points)'],
  funFact: 'Robert Tarjan developed many fundamental graph algorithms. He won the Turing Award in 1986!',
  optimizationTips: ['Single DFS pass finds both bridges and articulation points', 'Can extend to find biconnected components', 'Consider edge-disjoint spanning trees for redundancy analysis'],
  tags: ['Graphs', 'Bridges', 'Articulation Points', 'DFS', 'O(V+E)', 'Advanced'],
};
