import { AlgorithmCodeTemplates } from './types';

export const kahnTopologicalSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'kahn-topological-sort',
  algorithmName: "Kahn's Topological Sort",
  category: 'graphs',
  templates: {
    javascript: `// Kahn's Topological Sort (BFS-based) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function kahnTopologicalSort(graph, V) {
  log(\`Kahn's Topological Sort with \${V} vertices\`);
  
  // Calculate in-degrees
  const inDegree = Array(V).fill(0);
  for (let u = 0; u < V; u++) {
    for (const v of graph[u] || []) {
      inDegree[v]++;
    }
  }
  
  log(\`In-degrees: [\${inDegree.join(', ')}]\`);
  
  // Queue all vertices with in-degree 0
  const queue = [];
  for (let v = 0; v < V; v++) {
    if (inDegree[v] === 0) {
      queue.push(v);
      log(\`Add \${v} to queue (in-degree 0)\`);
    }
  }
  
  const result = [];
  
  while (queue.length > 0) {
    const u = queue.shift();
    visit(u);
    mark(u, 'current');
    result.push(u);
    log(\`Process \${u}\`);
    
    for (const v of graph[u] || []) {
      compare(u, v);
      inDegree[v]--;
      log(\`  Decrement in-degree[\${v}] to \${inDegree[v]}\`);
      
      if (inDegree[v] === 0) {
        queue.push(v);
        log(\`  Add \${v} to queue\`);
      }
    }
    
    mark(u, 'found');
  }
  
  if (result.length !== V) {
    log('\\nCycle detected! Topological sort not possible.');
    return null;
  }
  
  log(\`\\nTopological order: [\${result.join(' -> ')}]\`);
  return result;
}

// Demo - DAG adjacency list
const graph = {
  0: [1, 2],
  1: [3],
  2: [3, 4],
  3: [5],
  4: [5],
  5: []
};

kahnTopologicalSort(graph, 6);
`,

    java: `// Kahn's Topological Sort - Java
import java.util.*;

public class KahnTopologicalSort {
    public static List<Integer> topologicalSort(List<List<Integer>> graph) {
        int V = graph.size();
        int[] inDegree = new int[V];
        
        for (int u = 0; u < V; u++) {
            for (int v : graph.get(u)) inDegree[v]++;
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int v = 0; v < V; v++) {
            if (inDegree[v] == 0) queue.offer(v);
        }
        
        List<Integer> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            result.add(u);
            for (int v : graph.get(u)) {
                if (--inDegree[v] == 0) queue.offer(v);
            }
        }
        
        return result.size() == V ? result : null; // null if cycle
    }
    
    public static void main(String[] args) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < 6; i++) graph.add(new ArrayList<>());
        graph.get(0).addAll(Arrays.asList(1, 2));
        graph.get(1).add(3);
        System.out.println(topologicalSort(graph));
    }
}
`,

    python: `# Kahn's Topological Sort - Python
from collections import deque

def kahn_topological_sort(graph, V):
    in_degree = [0] * V
    for u in range(V):
        for v in graph.get(u, []):
            in_degree[v] += 1
    
    queue = deque([v for v in range(V) if in_degree[v] == 0])
    result = []
    
    while queue:
        u = queue.popleft()
        result.append(u)
        for v in graph.get(u, []):
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    return result if len(result) == V else None


graph = {0: [1, 2], 1: [3], 2: [3, 4], 3: [5], 4: [5], 5: []}
print(f"Topological order: {kahn_topological_sort(graph, 6)}")
`,

    cpp: `// Kahn's Topological Sort - C++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> kahnTopologicalSort(vector<vector<int>>& graph) {
    int V = graph.size();
    vector<int> inDegree(V, 0);
    
    for (int u = 0; u < V; u++)
        for (int v : graph[u]) inDegree[v]++;
    
    queue<int> q;
    for (int v = 0; v < V; v++)
        if (inDegree[v] == 0) q.push(v);
    
    vector<int> result;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        result.push_back(u);
        for (int v : graph[u])
            if (--inDegree[v] == 0) q.push(v);
    }
    
    return result.size() == V ? result : vector<int>{}; // Empty if cycle
}
`,

    go: `// Kahn's Topological Sort - Go
package main

import "fmt"

func kahnTopologicalSort(graph map[int][]int, V int) []int {
    inDegree := make([]int, V)
    for u := 0; u < V; u++ {
        for _, v := range graph[u] { inDegree[v]++ }
    }
    
    queue := []int{}
    for v := 0; v < V; v++ {
        if inDegree[v] == 0 { queue = append(queue, v) }
    }
    
    result := []int{}
    for len(queue) > 0 {
        u := queue[0]
        queue = queue[1:]
        result = append(result, u)
        for _, v := range graph[u] {
            inDegree[v]--
            if inDegree[v] == 0 { queue = append(queue, v) }
        }
    }
    
    if len(result) != V { return nil }
    return result
}

func main() {
    graph := map[int][]int{0: {1, 2}, 1: {3}, 2: {3, 4}, 3: {5}, 4: {5}, 5: {}}
    fmt.Println(kahnTopologicalSort(graph, 6))
}
`,
  },
};
