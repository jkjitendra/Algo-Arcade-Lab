import { AlgorithmCodeTemplates } from './types';

export const primMSTCode: AlgorithmCodeTemplates = {
  algorithmId: 'prim-mst',
  algorithmName: "Prim's MST",
  category: 'graphs',
  templates: {
    javascript: `// Prim's Minimum Spanning Tree - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function primMST(graph, V) {
  log(\`Prim's MST with \${V} vertices\`);
  
  const inMST = Array(V).fill(false);
  const key = Array(V).fill(Infinity);
  const parent = Array(V).fill(-1);
  
  key[0] = 0;
  
  for (let count = 0; count < V; count++) {
    // Find min key vertex not in MST
    let u = -1;
    for (let v = 0; v < V; v++) {
      if (!inMST[v] && (u === -1 || key[v] < key[u])) {
        u = v;
      }
    }
    
    inMST[u] = true;
    visit(u);
    mark(u, 'current');
    log(\`Add vertex \${u} to MST\`);
    
    // Update keys of adjacent vertices
    for (const [v, weight] of graph[u] || []) {
      compare(u, v);
      if (!inMST[v] && weight < key[v]) {
        key[v] = weight;
        parent[v] = u;
        log(\`  Update key[\${v}] = \${weight} (from \${u})\`);
      }
    }
    
    mark(u, 'found');
  }
  
  // Build MST edges
  let totalWeight = 0;
  const mstEdges = [];
  for (let v = 1; v < V; v++) {
    if (parent[v] !== -1) {
      mstEdges.push([parent[v], v, key[v]]);
      totalWeight += key[v];
    }
  }
  
  log(\`\\nMST edges: \${mstEdges.map(e => \`\${e[0]}-\${e[1]}(\${e[2]})\`).join(', ')}\`);
  log(\`Total weight: \${totalWeight}\`);
  return { edges: mstEdges, totalWeight };
}

// Demo - adjacency list: vertex -> [[neighbor, weight], ...]
const graph = {
  0: [[1, 4], [7, 8]],
  1: [[0, 4], [2, 8], [7, 11]],
  2: [[1, 8], [3, 7], [5, 4], [8, 2]],
  3: [[2, 7], [4, 9], [5, 14]],
  4: [[3, 9], [5, 10]],
  5: [[2, 4], [3, 14], [4, 10], [6, 2]],
  6: [[5, 2], [7, 1], [8, 6]],
  7: [[0, 8], [1, 11], [6, 1], [8, 7]],
  8: [[2, 2], [6, 6], [7, 7]]
};

primMST(graph, 9);
`,

    java: `// Prim's MST - Java
import java.util.*;

public class PrimMST {
    public static int primMST(List<List<int[]>> graph) {
        int V = graph.size();
        boolean[] inMST = new boolean[V];
        int[] key = new int[V];
        Arrays.fill(key, Integer.MAX_VALUE);
        key[0] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1] - b[1]);
        pq.offer(new int[]{0, 0});
        int totalWeight = 0;
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0];
            if (inMST[u]) continue;
            
            inMST[u] = true;
            totalWeight += curr[1];
            
            for (int[] edge : graph.get(u)) {
                int v = edge[0], w = edge[1];
                if (!inMST[v] && w < key[v]) {
                    key[v] = w;
                    pq.offer(new int[]{v, w});
                }
            }
        }
        return totalWeight;
    }
}
`,

    python: `# Prim's MST - Python
import heapq

def prim_mst(graph, V):
    in_mst = [False] * V
    key = [float('inf')] * V
    key[0] = 0
    pq = [(0, 0)]  # (weight, vertex)
    total_weight = 0
    
    while pq:
        w, u = heapq.heappop(pq)
        if in_mst[u]:
            continue
        
        in_mst[u] = True
        total_weight += w
        
        for v, weight in graph.get(u, []):
            if not in_mst[v] and weight < key[v]:
                key[v] = weight
                heapq.heappush(pq, (weight, v))
    
    return total_weight


graph = {
    0: [(1, 4), (7, 8)],
    1: [(0, 4), (2, 8)],
    2: [(1, 8), (3, 7)],
    3: [(2, 7)],
    7: [(0, 8)]
}
print(f"MST weight: {prim_mst(graph, 9)}")
`,

    cpp: `// Prim's MST - C++
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

int primMST(vector<vector<pair<int,int>>>& graph) {
    int V = graph.size();
    vector<bool> inMST(V, false);
    vector<int> key(V, INT_MAX);
    key[0] = 0;
    
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 0});
    int total = 0;
    
    while (!pq.empty()) {
        auto [w, u] = pq.top(); pq.pop();
        if (inMST[u]) continue;
        inMST[u] = true;
        total += w;
        
        for (auto& [v, weight] : graph[u]) {
            if (!inMST[v] && weight < key[v]) {
                key[v] = weight;
                pq.push({weight, v});
            }
        }
    }
    return total;
}
`,

    go: `// Prim's MST - Go
package main

import (
    "container/heap"
    "fmt"
    "math"
)

type Edge struct { v, w int }
type PQ []Edge
func (pq PQ) Len() int { return len(pq) }
func (pq PQ) Less(i, j int) bool { return pq[i].w < pq[j].w }
func (pq PQ) Swap(i, j int) { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PQ) Push(x interface{}) { *pq = append(*pq, x.(Edge)) }
func (pq *PQ) Pop() interface{} { old := *pq; x := old[len(old)-1]; *pq = old[:len(old)-1]; return x }

func primMST(graph map[int][][2]int, V int) int {
    inMST := make([]bool, V)
    key := make([]int, V)
    for i := range key { key[i] = math.MaxInt32 }
    key[0] = 0
    
    pq := &PQ{{0, 0}}
    heap.Init(pq)
    total := 0
    
    for pq.Len() > 0 {
        e := heap.Pop(pq).(Edge)
        if inMST[e.v] { continue }
        inMST[e.v] = true
        total += e.w
        for _, edge := range graph[e.v] {
            v, w := edge[0], edge[1]
            if !inMST[v] && w < key[v] {
                key[v] = w
                heap.Push(pq, Edge{v, w})
            }
        }
    }
    return total
}

func main() { fmt.Println("Prim's MST") }
`,
  },
};
