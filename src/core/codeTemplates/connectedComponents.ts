import { AlgorithmCodeTemplates } from './types';

export const connectedComponentsCode: AlgorithmCodeTemplates = {
  algorithmId: 'connected-components',
  algorithmName: 'Connected Components',
  category: 'graphs',
  templates: {
    javascript: `// Connected Components - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function findConnectedComponents(graph, V) {
  log(\`Finding connected components in graph with \${V} vertices\`);
  
  const visited = new Set();
  const components = [];
  
  function dfs(v, component) {
    visited.add(v);
    visit(v);
    component.push(v);
    
    for (const neighbor of graph[v] || []) {
      compare(v, neighbor);
      if (!visited.has(neighbor)) {
        dfs(neighbor, component);
      }
    }
  }
  
  for (let v = 0; v < V; v++) {
    if (!visited.has(v)) {
      const component = [];
      mark(v, 'current');
      log(\`Starting new component from vertex \${v}\`);
      dfs(v, component);
      components.push(component);
      log(\`Component \${components.length}: [\${component.join(', ')}]\`);
    }
  }
  
  log(\`\\nTotal components: \${components.length}\`);
  return components;
}

// BFS alternative
function findComponentsBFS(graph, V) {
  const visited = new Set();
  const components = [];
  
  for (let v = 0; v < V; v++) {
    if (!visited.has(v)) {
      const component = [];
      const queue = [v];
      visited.add(v);
      
      while (queue.length > 0) {
        const u = queue.shift();
        component.push(u);
        
        for (const neighbor of graph[u] || []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
      
      components.push(component);
    }
  }
  
  return components;
}

// Demo - undirected graph (vertex -> [neighbors])
const graph = {
  0: [1, 2],
  1: [0, 2],
  2: [0, 1],
  3: [4],
  4: [3],
  5: []
};

findConnectedComponents(graph, 6);
`,

    java: `// Connected Components - Java
import java.util.*;

public class ConnectedComponents {
    public static List<List<Integer>> findComponents(Map<Integer, List<Integer>> graph, int V) {
        boolean[] visited = new boolean[V];
        List<List<Integer>> components = new ArrayList<>();
        
        for (int v = 0; v < V; v++) {
            if (!visited[v]) {
                List<Integer> component = new ArrayList<>();
                dfs(graph, v, visited, component);
                components.add(component);
            }
        }
        return components;
    }
    
    private static void dfs(Map<Integer, List<Integer>> graph, int v, boolean[] visited, List<Integer> component) {
        visited[v] = true;
        component.add(v);
        for (int neighbor : graph.getOrDefault(v, new ArrayList<>())) {
            if (!visited[neighbor]) dfs(graph, neighbor, visited, component);
        }
    }
}
`,

    python: `# Connected Components - Python

def find_connected_components(graph, V):
    visited = set()
    components = []
    
    def dfs(v, component):
        visited.add(v)
        component.append(v)
        for neighbor in graph.get(v, []):
            if neighbor not in visited:
                dfs(neighbor, component)
    
    for v in range(V):
        if v not in visited:
            component = []
            dfs(v, component)
            components.append(component)
    
    return components


graph = {0: [1, 2], 1: [0, 2], 2: [0, 1], 3: [4], 4: [3], 5: []}
print(f"Components: {find_connected_components(graph, 6)}")
`,

    cpp: `// Connected Components - C++
#include <iostream>
#include <vector>
using namespace std;

void dfs(vector<vector<int>>& graph, int v, vector<bool>& visited, vector<int>& component) {
    visited[v] = true;
    component.push_back(v);
    for (int neighbor : graph[v])
        if (!visited[neighbor]) dfs(graph, neighbor, visited, component);
}

vector<vector<int>> findComponents(vector<vector<int>>& graph) {
    int V = graph.size();
    vector<bool> visited(V, false);
    vector<vector<int>> components;
    
    for (int v = 0; v < V; v++) {
        if (!visited[v]) {
            vector<int> component;
            dfs(graph, v, visited, component);
            components.push_back(component);
        }
    }
    return components;
}
`,

    go: `// Connected Components - Go
package main

import "fmt"

func findComponents(graph map[int][]int, V int) [][]int {
    visited := make(map[int]bool)
    components := [][]int{}
    
    var dfs func(v int, component *[]int)
    dfs = func(v int, component *[]int) {
        visited[v] = true
        *component = append(*component, v)
        for _, neighbor := range graph[v] {
            if !visited[neighbor] { dfs(neighbor, component) }
        }
    }
    
    for v := 0; v < V; v++ {
        if !visited[v] {
            component := []int{}
            dfs(v, &component)
            components = append(components, component)
        }
    }
    return components
}

func main() {
    graph := map[int][]int{0: {1, 2}, 1: {0, 2}, 2: {0, 1}, 3: {4}, 4: {3}, 5: {}}
    fmt.Println(findComponents(graph, 6))
}
`,
  },
};
