export const astarInfo = {
  id: 'astar',
  name: 'A* Search Algorithm',
  description: 'A* is a best-first search that uses heuristics to guide exploration, combining actual cost (g) with estimated remaining cost (h).',
  howItWorks: 'Maintain f(n) = g(n) + h(n) for each node. Always expand the node with lowest f. Stop when target is reached or no path exists.',
  keyInsight: 'A good heuristic dramatically reduces nodes explored. If h is admissible (never overestimates), A* finds optimal paths.',
  bestFor: ['Pathfinding in games', 'Grid-based navigation', 'Robotics motion planning', 'Puzzle solving (15-puzzle, Rubik\'s cube)'],
  avoidWhen: ['No good heuristic exists', 'Need all-pairs paths', 'Memory is very limited (consider IDA*)'],
  funFact: 'A* was developed in 1968 by Peter Hart, Nils Nilsson, and Bertram Raphael at Stanford Research Institute!',
  optimizationTips: ['Use admissible heuristic for optimality', 'Manhattan distance for grids, Euclidean for continuous', 'Consistent heuristic avoids reopening nodes'],
  tags: ['Graphs', 'Pathfinding', 'Heuristic Search', 'AI', 'O(E)', 'Advanced'],
};
