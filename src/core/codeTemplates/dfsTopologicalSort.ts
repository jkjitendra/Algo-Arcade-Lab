import { AlgorithmCodeTemplates } from './types';

export const dfsTopologicalSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'dfs-topological-sort',
  algorithmName: 'DFS Topological Sort',
  category: 'graphs',
  templates: {
    javascript: `// DFS-based Topological Sort - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function dfsTopologicalSort(graph, V) {
  log(\`DFS Topological Sort with \${V} vertices\`);
  
  const visited = new Set();
  const stack = [];
  
  function dfs(u) {
    visited.add(u);
    visit(u);
    mark(u, 'current');
    log(\`Visit \${u}\`);
    
    for (const v of graph[u] || []) {
      compare(u, v);
      if (!visited.has(v)) {
        dfs(v);
      }
    }
    
    stack.push(u);
    mark(u, 'found');
    log(\`Push \${u} to stack\`);
  }
  
  // Call DFS for all vertices
  for (let v = 0; v < V; v++) {
    if (!visited.has(v)) {
      dfs(v);
    }
  }
  
  const result = stack.reverse();
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

dfsTopologicalSort(graph, 6);
`,

    java: `// DFS Topological Sort - Java
import java.util.*;

public class DFSTopologicalSort {
    public static List<Integer> topologicalSort(List<List<Integer>> graph) {
        int V = graph.size();
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        
        for (int v = 0; v < V; v++) {
            if (!visited[v]) dfs(graph, v, visited, stack);
        }
        
        List<Integer> result = new ArrayList<>();
        while (!stack.isEmpty()) result.add(stack.pop());
        return result;
    }
    
    private static void dfs(List<List<Integer>> graph, int u, boolean[] visited, Stack<Integer> stack) {
        visited[u] = true;
        for (int v : graph.get(u)) {
            if (!visited[v]) dfs(graph, v, visited, stack);
        }
        stack.push(u);
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

    python: `# DFS Topological Sort - Python

def dfs_topological_sort(graph, V):
    visited = set()
    stack = []
    
    def dfs(u):
        visited.add(u)
        for v in graph.get(u, []):
            if v not in visited:
                dfs(v)
        stack.append(u)
    
    for v in range(V):
        if v not in visited:
            dfs(v)
    
    return stack[::-1]


graph = {0: [1, 2], 1: [3], 2: [3, 4], 3: [5], 4: [5], 5: []}
print(f"Topological order: {dfs_topological_sort(graph, 6)}")
`,

    cpp: `// DFS Topological Sort - C++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

void dfs(vector<vector<int>>& graph, int u, vector<bool>& visited, stack<int>& st) {
    visited[u] = true;
    for (int v : graph[u])
        if (!visited[v]) dfs(graph, v, visited, st);
    st.push(u);
}

vector<int> topologicalSort(vector<vector<int>>& graph) {
    int V = graph.size();
    vector<bool> visited(V, false);
    stack<int> st;
    
    for (int v = 0; v < V; v++)
        if (!visited[v]) dfs(graph, v, visited, st);
    
    vector<int> result;
    while (!st.empty()) { result.push_back(st.top()); st.pop(); }
    return result;
}
`,

    go: `// DFS Topological Sort - Go
package main

import "fmt"

func dfsTopologicalSort(graph map[int][]int, V int) []int {
    visited := make(map[int]bool)
    stack := []int{}
    
    var dfs func(u int)
    dfs = func(u int) {
        visited[u] = true
        for _, v := range graph[u] {
            if !visited[v] { dfs(v) }
        }
        stack = append(stack, u)
    }
    
    for v := 0; v < V; v++ {
        if !visited[v] { dfs(v) }
    }
    
    // Reverse
    for i, j := 0, len(stack)-1; i < j; i, j = i+1, j-1 {
        stack[i], stack[j] = stack[j], stack[i]
    }
    return stack
}

func main() {
    graph := map[int][]int{0: {1, 2}, 1: {3}, 2: {3, 4}, 3: {5}, 4: {5}, 5: {}}
    fmt.Println(dfsTopologicalSort(graph, 6))
}
`,
  },
};
