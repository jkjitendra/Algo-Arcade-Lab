import { AlgorithmCodeTemplates } from './types';

export const bfsCode: AlgorithmCodeTemplates = {
  algorithmId: 'bfs',
  algorithmName: 'Breadth First Search',
  category: 'graphs',
  templates: {
    javascript: `// Breadth First Search (BFS) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function bfs(graph, start) {
  log(\`BFS starting from vertex \${start}\`);
  
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    visit(vertex);
    mark(vertex, 'current');
    result.push(vertex);
    log(\`Visit: \${vertex}\`);
    
    // Get neighbors (assuming adjacency list)
    const neighbors = graph[vertex] || [];
    
    for (const neighbor of neighbors) {
      compare(vertex, neighbor);
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        log(\`  Queue: \${neighbor}\`);
      }
    }
    
    mark(vertex, 'found');
  }
  
  log(\`BFS order: [\${result.join(' -> ')}]\`);
  return result;
}

// BFS for shortest path in unweighted graph
function bfsShortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, [start]]];
  
  while (queue.length > 0) {
    const [vertex, path] = queue.shift();
    
    if (vertex === end) {
      log(\`Shortest path: \${path.join(' -> ')}\`);
      return path;
    }
    
    for (const neighbor of graph[vertex] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  
  return null;
}

// Demo - adjacency list
const graph = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 4],
  3: [1, 5],
  4: [1, 2, 5],
  5: [3, 4]
};

bfs(graph, 0);
log('');
bfsShortestPath(graph, 0, 5);
`,

    java: `// Breadth First Search - Java
import java.util.*;

public class BFS {
    public static List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        
        visited.add(start);
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            result.add(vertex);
            
            for (int neighbor : graph.getOrDefault(vertex, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        graph.put(0, Arrays.asList(1, 2));
        graph.put(1, Arrays.asList(0, 3, 4));
        graph.put(2, Arrays.asList(0, 4));
        
        System.out.println("BFS: " + bfs(graph, 0));
    }
}
`,

    python: `# Breadth First Search - Python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

def bfs_shortest_path(graph, start, end):
    visited = {start}
    queue = deque([(start, [start])])
    
    while queue:
        vertex, path = queue.popleft()
        if vertex == end:
            return path
        
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None


graph = {0: [1, 2], 1: [0, 3, 4], 2: [0, 4], 3: [1, 5], 4: [1, 2, 5], 5: [3, 4]}
print(f"BFS: {bfs(graph, 0)}")
print(f"Shortest path 0->5: {bfs_shortest_path(graph, 0, 5)}")
`,

    cpp: `// Breadth First Search - C++
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

vector<int> bfs(vector<vector<int>>& graph, int start) {
    vector<int> result;
    unordered_set<int> visited;
    queue<int> q;
    
    visited.insert(start);
    q.push(start);
    
    while (!q.empty()) {
        int vertex = q.front(); q.pop();
        result.push_back(vertex);
        
        for (int neighbor : graph[vertex]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
    
    return result;
}

int main() {
    vector<vector<int>> graph = {{1,2}, {0,3,4}, {0,4}, {1,5}, {1,2,5}, {3,4}};
    auto result = bfs(graph, 0);
    for (int v : result) cout << v << " ";
    return 0;
}
`,

    go: `// Breadth First Search - Go
package main

import "fmt"

func bfs(graph map[int][]int, start int) []int {
    visited := make(map[int]bool)
    queue := []int{start}
    result := []int{}
    
    visited[start] = true
    
    for len(queue) > 0 {
        vertex := queue[0]
        queue = queue[1:]
        result = append(result, vertex)
        
        for _, neighbor := range graph[vertex] {
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }
    }
    
    return result
}

func main() {
    graph := map[int][]int{0: {1, 2}, 1: {0, 3, 4}, 2: {0, 4}, 3: {1, 5}, 4: {1, 2, 5}, 5: {3, 4}}
    fmt.Println("BFS:", bfs(graph, 0))
}
`,
  },
};
