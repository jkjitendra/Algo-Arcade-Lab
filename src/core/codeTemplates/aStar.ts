import { AlgorithmCodeTemplates } from './types';

export const aStarCode: AlgorithmCodeTemplates = {
  algorithmId: 'a-star',
  algorithmName: 'A* Search Algorithm',
  category: 'graphs',
  templates: {
    javascript: `// A* Search Algorithm - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Best-first pathfinding with heuristic

function aStar(graph, start, goal, heuristic) {
  log(\`A* Search from \${start} to \${goal}\`);
  
  const openSet = new Set([start]);
  const cameFrom = new Map();
  
  const gScore = new Map(); // Cost from start
  gScore.set(start, 0);
  
  const fScore = new Map(); // g + heuristic
  fScore.set(start, heuristic(start, goal));
  
  while (openSet.size > 0) {
    // Get node with lowest fScore
    let current = null;
    let lowestF = Infinity;
    for (const node of openSet) {
      const f = fScore.get(node) || Infinity;
      if (f < lowestF) {
        lowestF = f;
        current = node;
      }
    }
    
    visit(current);
    mark(current, 'current');
    log(\`Exploring \${current}, f=\${lowestF}\`);
    
    if (current === goal) {
      // Reconstruct path
      const path = [current];
      while (cameFrom.has(current)) {
        current = cameFrom.get(current);
        path.unshift(current);
      }
      log(\`Path found: \${path.join(' -> ')}\`);
      return path;
    }
    
    openSet.delete(current);
    mark(current, 'found');
    
    for (const [neighbor, weight] of graph[current] || []) {
      compare(current, neighbor);
      const tentativeG = (gScore.get(current) || Infinity) + weight;
      
      if (tentativeG < (gScore.get(neighbor) || Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeG);
        fScore.set(neighbor, tentativeG + heuristic(neighbor, goal));
        
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
          log(\`  Add \${neighbor} to open set, f=\${fScore.get(neighbor)}\`);
        }
      }
    }
  }
  
  log('No path found');
  return null;
}

// Demo - grid-based example
// Nodes as coordinates, Manhattan distance heuristic
const graph = {
  '0,0': [['1,0', 1], ['0,1', 1]],
  '1,0': [['0,0', 1], ['2,0', 1], ['1,1', 1]],
  '2,0': [['1,0', 1], ['2,1', 1]],
  '0,1': [['0,0', 1], ['1,1', 1], ['0,2', 1]],
  '1,1': [['1,0', 1], ['0,1', 1], ['2,1', 1], ['1,2', 1]],
  '2,1': [['2,0', 1], ['1,1', 1], ['2,2', 1]],
  '0,2': [['0,1', 1], ['1,2', 1]],
  '1,2': [['0,2', 1], ['1,1', 1], ['2,2', 1]],
  '2,2': [['1,2', 1], ['2,1', 1]]
};

function manhattan(a, b) {
  const [ax, ay] = a.split(',').map(Number);
  const [bx, by] = b.split(',').map(Number);
  return Math.abs(ax - bx) + Math.abs(ay - by);
}

aStar(graph, '0,0', '2,2', manhattan);
`,

    java: `// A* Search Algorithm - Java
import java.util.*;

public class AStar {
    public static List<Integer> aStar(Map<Integer, List<int[]>> graph, int start, int goal, 
                                       java.util.function.BiFunction<Integer, Integer, Integer> h) {
        PriorityQueue<int[]> openSet = new PriorityQueue<>((a,b) -> a[1] - b[1]);
        openSet.offer(new int[]{start, h.apply(start, goal)});
        
        Map<Integer, Integer> cameFrom = new HashMap<>();
        Map<Integer, Integer> gScore = new HashMap<>();
        gScore.put(start, 0);
        Set<Integer> closed = new HashSet<>();
        
        while (!openSet.isEmpty()) {
            int current = openSet.poll()[0];
            if (closed.contains(current)) continue;
            closed.add(current);
            
            if (current == goal) {
                List<Integer> path = new ArrayList<>();
                while (cameFrom.containsKey(current)) {
                    path.add(0, current);
                    current = cameFrom.get(current);
                }
                path.add(0, start);
                return path;
            }
            
            for (int[] edge : graph.getOrDefault(current, new ArrayList<>())) {
                int neighbor = edge[0], weight = edge[1];
                int tentativeG = gScore.get(current) + weight;
                if (tentativeG < gScore.getOrDefault(neighbor, Integer.MAX_VALUE)) {
                    cameFrom.put(neighbor, current);
                    gScore.put(neighbor, tentativeG);
                    openSet.offer(new int[]{neighbor, tentativeG + h.apply(neighbor, goal)});
                }
            }
        }
        return null;
    }
}
`,

    python: `# A* Search Algorithm - Python
import heapq

def a_star(graph, start, goal, heuristic):
    open_set = [(heuristic(start, goal), start)]
    came_from = {}
    g_score = {start: 0}
    
    while open_set:
        _, current = heapq.heappop(open_set)
        
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]
        
        for neighbor, weight in graph.get(current, []):
            tentative_g = g_score[current] + weight
            if tentative_g < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic(neighbor, goal)
                heapq.heappush(open_set, (f_score, neighbor))
    
    return None


# Manhattan distance for grid
def manhattan(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

graph = {
    (0,0): [((1,0), 1), ((0,1), 1)],
    (1,0): [((2,0), 1), ((1,1), 1)],
    (0,1): [((0,2), 1), ((1,1), 1)],
    (1,1): [((2,1), 1), ((1,2), 1)],
    (2,0): [((2,1), 1)],
    (0,2): [((1,2), 1)],
    (2,1): [((2,2), 1)],
    (1,2): [((2,2), 1)],
    (2,2): []
}

print(f"Path: {a_star(graph, (0,0), (2,2), manhattan)}")
`,

    cpp: `// A* Search Algorithm - C++
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <functional>
using namespace std;

vector<int> aStar(unordered_map<int, vector<pair<int,int>>>& graph, 
                  int start, int goal, function<int(int,int)> h) {
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> openSet;
    openSet.push({h(start, goal), start});
    
    unordered_map<int, int> cameFrom, gScore;
    gScore[start] = 0;
    
    while (!openSet.empty()) {
        int current = openSet.top().second; openSet.pop();
        
        if (current == goal) {
            vector<int> path;
            while (cameFrom.count(current)) {
                path.insert(path.begin(), current);
                current = cameFrom[current];
            }
            path.insert(path.begin(), start);
            return path;
        }
        
        for (auto& [neighbor, weight] : graph[current]) {
            int tentativeG = gScore[current] + weight;
            if (!gScore.count(neighbor) || tentativeG < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeG;
                openSet.push({tentativeG + h(neighbor, goal), neighbor});
            }
        }
    }
    return {};
}
`,

    go: `// A* Search Algorithm - Go
package main

import (
    "container/heap"
    "fmt"
)

type Node struct { id, f int }
type MinHeap []Node
func (h MinHeap) Len() int { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i].f < h[j].f }
func (h MinHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(Node)) }
func (h *MinHeap) Pop() interface{} { old := *h; x := old[len(old)-1]; *h = old[:len(old)-1]; return x }

func aStar(graph map[int][][2]int, start, goal int, h func(int, int) int) []int {
    openSet := &MinHeap{{start, h(start, goal)}}
    heap.Init(openSet)
    cameFrom := make(map[int]int)
    gScore := map[int]int{start: 0}
    
    for openSet.Len() > 0 {
        current := heap.Pop(openSet).(Node).id
        if current == goal {
            path := []int{current}
            for _, ok := cameFrom[current]; ok; _, ok = cameFrom[current] {
                current = cameFrom[current]
                path = append([]int{current}, path...)
            }
            return path
        }
        for _, edge := range graph[current] {
            neighbor, weight := edge[0], edge[1]
            tentativeG := gScore[current] + weight
            if g, ok := gScore[neighbor]; !ok || tentativeG < g {
                cameFrom[neighbor] = current
                gScore[neighbor] = tentativeG
                heap.Push(openSet, Node{neighbor, tentativeG + h(neighbor, goal)})
            }
        }
    }
    return nil
}

func main() { fmt.Println("A* Search Algorithm") }
`,
  },
};
