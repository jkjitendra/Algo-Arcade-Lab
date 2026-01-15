export const connectedComponentsInfo = {
  id: 'connected-components',
  name: 'Connected Components',
  description: 'Find all connected components in an undirected graph. Each component is a maximal set of mutually reachable vertices.',
  howItWorks: 'Run DFS/BFS from each unvisited vertex, marking all reachable vertices as part of the same component. Increment component ID for each new starting vertex.',
  keyInsight: 'In an undirected graph, if A can reach B, then B can reach A. So one DFS/BFS finds an entire component.',
  bestFor: ['Network analysis', 'Image segmentation', 'Social network clusters', 'Checking graph connectivity'],
  avoidWhen: ['Graph is directed (use SCC algorithms)', 'Only need to check if connected (one DFS suffices)', 'Graph changes frequently'],
  funFact: 'Connected components are fundamental to many graph algorithms and are often a preprocessing step!',
  optimizationTips: ['Union-Find can also find components in O(E α(V))', 'BFS and DFS both work equally well', 'For dynamic graphs, consider incremental Union-Find'],
  tags: ['Graphs', 'Connectivity', 'DFS', 'BFS', 'O(V+E)', 'Beginner'],
};
