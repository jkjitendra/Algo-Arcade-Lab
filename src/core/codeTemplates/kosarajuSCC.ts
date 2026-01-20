import { AlgorithmCodeTemplates } from './types';

export const kosarajuSCCCode: AlgorithmCodeTemplates = {
  algorithmId: 'kosaraju-scc',
  algorithmName: "Kosaraju's SCC",
  category: 'graphs',
  templates: {
    javascript: `// Kosaraju's Strongly Connected Components - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function kosarajuSCC(graph, V) {
  log(\`Kosaraju's SCC with \${V} vertices\`);
  
  // Step 1: Fill vertices in stack by finish time
  const visited = new Set();
  const stack = [];
  
  function dfs1(v) {
    visited.add(v);
    for (const neighbor of graph[v] || []) {
      if (!visited.has(neighbor)) {
        dfs1(neighbor);
      }
    }
    stack.push(v);
  }
  
  for (let v = 0; v < V; v++) {
    if (!visited.has(v)) {
      dfs1(v);
    }
  }
  
  log(\`Finish order: [\${stack.join(', ')}]\`);
  
  // Step 2: Create transpose graph
  const transpose = {};
  for (let u = 0; u < V; u++) {
    for (const v of graph[u] || []) {
      if (!transpose[v]) transpose[v] = [];
      transpose[v].push(u);
    }
  }
  
  // Step 3: DFS on transpose in reverse finish order
  visited.clear();
  const sccs = [];
  
  function dfs2(v, scc) {
    visited.add(v);
    visit(v);
    scc.push(v);
    for (const neighbor of transpose[v] || []) {
      compare(v, neighbor);
      if (!visited.has(neighbor)) {
        dfs2(neighbor, scc);
      }
    }
  }
  
  while (stack.length > 0) {
    const v = stack.pop();
    if (!visited.has(v)) {
      const scc = [];
      mark(v, 'current');
      dfs2(v, scc);
      sccs.push(scc);
      log(\`SCC \${sccs.length}: [\${scc.join(', ')}]\`);
    }
  }
  
  log(\`\\nTotal SCCs: \${sccs.length}\`);
  return sccs;
}

// Demo - directed graph
const graph = {
  0: [1],
  1: [2],
  2: [0, 3],
  3: [4],
  4: [5, 7],
  5: [6],
  6: [4],
  7: []
};

kosarajuSCC(graph, 8);
`,

    java: `// Kosaraju's SCC - Java
import java.util.*;

public class KosarajuSCC {
    public static List<List<Integer>> findSCC(Map<Integer, List<Integer>> graph, int V) {
        // Step 1: Fill stack by finish time
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        for (int v = 0; v < V; v++)
            if (!visited[v]) dfs1(graph, v, visited, stack);
        
        // Step 2: Create transpose
        Map<Integer, List<Integer>> transpose = new HashMap<>();
        for (int u = 0; u < V; u++)
            for (int v : graph.getOrDefault(u, new ArrayList<>()))
                transpose.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
        
        // Step 3: DFS on transpose
        Arrays.fill(visited, false);
        List<List<Integer>> sccs = new ArrayList<>();
        while (!stack.isEmpty()) {
            int v = stack.pop();
            if (!visited[v]) {
                List<Integer> scc = new ArrayList<>();
                dfs2(transpose, v, visited, scc);
                sccs.add(scc);
            }
        }
        return sccs;
    }
    
    static void dfs1(Map<Integer, List<Integer>> g, int v, boolean[] visited, Stack<Integer> stack) {
        visited[v] = true;
        for (int n : g.getOrDefault(v, new ArrayList<>()))
            if (!visited[n]) dfs1(g, n, visited, stack);
        stack.push(v);
    }
    
    static void dfs2(Map<Integer, List<Integer>> g, int v, boolean[] visited, List<Integer> scc) {
        visited[v] = true; scc.add(v);
        for (int n : g.getOrDefault(v, new ArrayList<>()))
            if (!visited[n]) dfs2(g, n, visited, scc);
    }
}
`,

    python: `# Kosaraju's SCC - Python

def kosaraju_scc(graph, V):
    # Step 1: Fill stack by finish time
    visited = set()
    stack = []
    
    def dfs1(v):
        visited.add(v)
        for neighbor in graph.get(v, []):
            if neighbor not in visited:
                dfs1(neighbor)
        stack.append(v)
    
    for v in range(V):
        if v not in visited:
            dfs1(v)
    
    # Step 2: Create transpose
    transpose = {}
    for u in range(V):
        for v in graph.get(u, []):
            transpose.setdefault(v, []).append(u)
    
    # Step 3: DFS on transpose in reverse order
    visited.clear()
    sccs = []
    
    def dfs2(v, scc):
        visited.add(v)
        scc.append(v)
        for neighbor in transpose.get(v, []):
            if neighbor not in visited:
                dfs2(neighbor, scc)
    
    while stack:
        v = stack.pop()
        if v not in visited:
            scc = []
            dfs2(v, scc)
            sccs.append(scc)
    
    return sccs


graph = {0: [1], 1: [2], 2: [0, 3], 3: [4], 4: [5, 7], 5: [6], 6: [4], 7: []}
print(f"SCCs: {kosaraju_scc(graph, 8)}")
`,

    cpp: `// Kosaraju's SCC - C++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

void dfs1(vector<vector<int>>& g, int v, vector<bool>& vis, stack<int>& st) {
    vis[v] = true;
    for (int n : g[v]) if (!vis[n]) dfs1(g, n, vis, st);
    st.push(v);
}

void dfs2(vector<vector<int>>& t, int v, vector<bool>& vis, vector<int>& scc) {
    vis[v] = true; scc.push_back(v);
    for (int n : t[v]) if (!vis[n]) dfs2(t, n, vis, scc);
}

vector<vector<int>> kosarajuSCC(vector<vector<int>>& graph) {
    int V = graph.size();
    vector<bool> visited(V, false);
    stack<int> st;
    
    for (int v = 0; v < V; v++) if (!visited[v]) dfs1(graph, v, visited, st);
    
    vector<vector<int>> transpose(V);
    for (int u = 0; u < V; u++) for (int v : graph[u]) transpose[v].push_back(u);
    
    fill(visited.begin(), visited.end(), false);
    vector<vector<int>> sccs;
    while (!st.empty()) {
        int v = st.top(); st.pop();
        if (!visited[v]) {
            vector<int> scc;
            dfs2(transpose, v, visited, scc);
            sccs.push_back(scc);
        }
    }
    return sccs;
}
`,

    go: `// Kosaraju's SCC - Go
package main

import "fmt"

func kosarajuSCC(graph map[int][]int, V int) [][]int {
    visited := make(map[int]bool)
    stack := []int{}
    
    var dfs1 func(v int)
    dfs1 = func(v int) {
        visited[v] = true
        for _, n := range graph[v] { if !visited[n] { dfs1(n) } }
        stack = append(stack, v)
    }
    
    for v := 0; v < V; v++ { if !visited[v] { dfs1(v) } }
    
    transpose := make(map[int][]int)
    for u := 0; u < V; u++ {
        for _, v := range graph[u] { transpose[v] = append(transpose[v], u) }
    }
    
    visited = make(map[int]bool)
    sccs := [][]int{}
    
    var dfs2 func(v int, scc *[]int)
    dfs2 = func(v int, scc *[]int) {
        visited[v] = true
        *scc = append(*scc, v)
        for _, n := range transpose[v] { if !visited[n] { dfs2(n, scc) } }
    }
    
    for len(stack) > 0 {
        v := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if !visited[v] {
            scc := []int{}
            dfs2(v, &scc)
            sccs = append(sccs, scc)
        }
    }
    return sccs
}

func main() { fmt.Println("Kosaraju's SCC") }
`,
  },
};
