import { AlgorithmCodeTemplates } from './types';

export const cycleDetectionCode: AlgorithmCodeTemplates = {
  algorithmId: 'cycle-detection-graph',
  algorithmName: 'Cycle Detection in Graphs',
  category: 'graphs',
  templates: {
    javascript: `// Cycle Detection in Graphs - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

// Undirected Graph - using DFS
function hasCycleUndirected(graph, V) {
  log('Checking cycle in undirected graph');
  const visited = new Set();
  
  function dfs(v, parent) {
    visited.add(v);
    visit(v);
    
    for (const neighbor of graph[v] || []) {
      compare(v, neighbor);
      
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, v)) return true;
      } else if (neighbor !== parent) {
        mark(v, 'eliminated');
        log(\`Cycle detected: \${v} -> \${neighbor}\`);
        return true;
      }
    }
    
    mark(v, 'found');
    return false;
  }
  
  for (let v = 0; v < V; v++) {
    if (!visited.has(v)) {
      if (dfs(v, -1)) return true;
    }
  }
  
  log('No cycle detected');
  return false;
}

// Directed Graph - using colors (White, Gray, Black)
function hasCycleDirected(graph, V) {
  log('\\nChecking cycle in directed graph');
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = Array(V).fill(WHITE);
  
  function dfs(v) {
    color[v] = GRAY;
    visit(v);
    mark(v, 'current');
    
    for (const neighbor of graph[v] || []) {
      compare(v, neighbor);
      
      if (color[neighbor] === GRAY) {
        log(\`Back edge found: \${v} -> \${neighbor} (cycle!)\`);
        return true;
      }
      
      if (color[neighbor] === WHITE && dfs(neighbor)) {
        return true;
      }
    }
    
    color[v] = BLACK;
    mark(v, 'found');
    return false;
  }
  
  for (let v = 0; v < V; v++) {
    if (color[v] === WHITE) {
      if (dfs(v)) return true;
    }
  }
  
  log('No cycle detected');
  return false;
}

// Demo
const undirectedGraph = {
  0: [1, 2],
  1: [0, 2],
  2: [0, 1, 3],
  3: [2]
};
hasCycleUndirected(undirectedGraph, 4);

const directedGraph = {
  0: [1],
  1: [2],
  2: [3],
  3: [1]  // Creates cycle 1->2->3->1
};
hasCycleDirected(directedGraph, 4);
`,

    java: `// Cycle Detection - Java
import java.util.*;

public class CycleDetection {
    // Undirected graph
    public static boolean hasCycleUndirected(Map<Integer, List<Integer>> graph, int V) {
        boolean[] visited = new boolean[V];
        for (int v = 0; v < V; v++)
            if (!visited[v] && dfsUndirected(graph, v, -1, visited)) return true;
        return false;
    }
    
    static boolean dfsUndirected(Map<Integer, List<Integer>> g, int v, int parent, boolean[] visited) {
        visited[v] = true;
        for (int neighbor : g.getOrDefault(v, new ArrayList<>())) {
            if (!visited[neighbor]) {
                if (dfsUndirected(g, neighbor, v, visited)) return true;
            } else if (neighbor != parent) return true;
        }
        return false;
    }
    
    // Directed graph (using colors)
    public static boolean hasCycleDirected(Map<Integer, List<Integer>> graph, int V) {
        int[] color = new int[V]; // 0=white, 1=gray, 2=black
        for (int v = 0; v < V; v++)
            if (color[v] == 0 && dfsDirected(graph, v, color)) return true;
        return false;
    }
    
    static boolean dfsDirected(Map<Integer, List<Integer>> g, int v, int[] color) {
        color[v] = 1;
        for (int neighbor : g.getOrDefault(v, new ArrayList<>())) {
            if (color[neighbor] == 1) return true;
            if (color[neighbor] == 0 && dfsDirected(g, neighbor, color)) return true;
        }
        color[v] = 2;
        return false;
    }
}
`,

    python: `# Cycle Detection - Python

def has_cycle_undirected(graph, V):
    visited = set()
    
    def dfs(v, parent):
        visited.add(v)
        for neighbor in graph.get(v, []):
            if neighbor not in visited:
                if dfs(neighbor, v): return True
            elif neighbor != parent:
                return True
        return False
    
    for v in range(V):
        if v not in visited:
            if dfs(v, -1): return True
    return False

def has_cycle_directed(graph, V):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * V
    
    def dfs(v):
        color[v] = GRAY
        for neighbor in graph.get(v, []):
            if color[neighbor] == GRAY: return True
            if color[neighbor] == WHITE and dfs(neighbor): return True
        color[v] = BLACK
        return False
    
    for v in range(V):
        if color[v] == WHITE and dfs(v): return True
    return False


print(f"Undirected cycle: {has_cycle_undirected({0:[1,2], 1:[0,2], 2:[0,1]}, 3)}")
print(f"Directed cycle: {has_cycle_directed({0:[1], 1:[2], 2:[0]}, 3)}")
`,

    cpp: `// Cycle Detection - C++
#include <iostream>
#include <vector>
using namespace std;

bool dfsUndirected(vector<vector<int>>& g, int v, int parent, vector<bool>& visited) {
    visited[v] = true;
    for (int n : g[v]) {
        if (!visited[n]) { if (dfsUndirected(g, n, v, visited)) return true; }
        else if (n != parent) return true;
    }
    return false;
}

bool hasCycleUndirected(vector<vector<int>>& g) {
    int V = g.size();
    vector<bool> visited(V, false);
    for (int v = 0; v < V; v++)
        if (!visited[v] && dfsUndirected(g, v, -1, visited)) return true;
    return false;
}

bool dfsDirected(vector<vector<int>>& g, int v, vector<int>& color) {
    color[v] = 1;
    for (int n : g[v]) {
        if (color[n] == 1) return true;
        if (color[n] == 0 && dfsDirected(g, n, color)) return true;
    }
    color[v] = 2;
    return false;
}

bool hasCycleDirected(vector<vector<int>>& g) {
    int V = g.size();
    vector<int> color(V, 0);
    for (int v = 0; v < V; v++)
        if (color[v] == 0 && dfsDirected(g, v, color)) return true;
    return false;
}
`,

    go: `// Cycle Detection - Go
package main

import "fmt"

func hasCycleUndirected(graph map[int][]int, V int) bool {
    visited := make(map[int]bool)
    
    var dfs func(v, parent int) bool
    dfs = func(v, parent int) bool {
        visited[v] = true
        for _, neighbor := range graph[v] {
            if !visited[neighbor] {
                if dfs(neighbor, v) { return true }
            } else if neighbor != parent { return true }
        }
        return false
    }
    
    for v := 0; v < V; v++ {
        if !visited[v] && dfs(v, -1) { return true }
    }
    return false
}

func hasCycleDirected(graph map[int][]int, V int) bool {
    color := make([]int, V) // 0=white, 1=gray, 2=black
    
    var dfs func(v int) bool
    dfs = func(v int) bool {
        color[v] = 1
        for _, n := range graph[v] {
            if color[n] == 1 { return true }
            if color[n] == 0 && dfs(n) { return true }
        }
        color[v] = 2
        return false
    }
    
    for v := 0; v < V; v++ {
        if color[v] == 0 && dfs(v) { return true }
    }
    return false
}

func main() {
    fmt.Println("Cycle Detection")
}
`,
  },
};
