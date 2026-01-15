export const kosarajuInfo = {
  id: 'kosaraju',
  name: "Kosaraju's Algorithm",
  description: 'Find Strongly Connected Components (SCCs) in a directed graph using two DFS passes.',
  howItWorks: 'Pass 1: DFS to get vertices in order of decreasing finish time. Pass 2: DFS on transpose graph in that order. Each DFS tree in Pass 2 is an SCC.',
  keyInsight: 'Processing in reverse finish order on the transpose ensures we can\'t escape the current SCC to reach another.',
  bestFor: ['Finding SCCs', '2-SAT problems', 'Analyzing web page links', 'Social network analysis'],
  avoidWhen: ['Graph is undirected', 'Only need to detect if strongly connected', 'Memory for transpose is prohibitive'],
  funFact: 'Developed by S. Rao Kosaraju in 1978 but not published. It was rediscovered by Micha Sharir in 1981!',
  optimizationTips: ['Transpose can be built implicitly during reverse DFS', 'Tarjan\'s algorithm finds SCCs in one pass', 'Consider path-based SCC algorithm for specific applications'],
  tags: ['Graphs', 'SCC', 'DFS', 'Directed Graphs', 'O(V+E)', 'Advanced'],
};
