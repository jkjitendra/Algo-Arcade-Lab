import { AlgorithmCodeTemplates } from './types';

export const dijkstraCode: AlgorithmCodeTemplates = {
  algorithmId: 'dijkstra',
  algorithmName: "Dijkstra's Shortest Path",
  category: 'graphs',
  templates: {
    javascript: `// Dijkstra's Shortest Path Algorithm - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function dijkstra(graph, start, V) {
  log(\`Dijkstra from vertex \${start}\`);
  
  const dist = Array(V).fill(Infinity);
  const visited = new Set();
  dist[start] = 0;
  
  // Priority queue simulation (min-heap would be better)
  for (let count = 0; count < V; count++) {
    // Find min distance vertex not yet visited
    let u = -1;
    for (let v = 0; v < V; v++) {
      if (!visited.has(v) && (u === -1 || dist[v] < dist[u])) {
        u = v;
      }
    }
    
    if (dist[u] === Infinity) break;
    
    visited.add(u);
    visit(u);
    mark(u, 'current');
    log(\`Process vertex \${u}, distance: \${dist[u]}\`);
    
    // Update distances
    for (const [v, weight] of graph[u] || []) {
      compare(u, v);
      if (!visited.has(v) && dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        log(\`  Update dist[\${v}] = \${dist[v]}\`);
      }
    }
    
    mark(u, 'found');
  }
  
  log(\`\\nShortest distances from \${start}: [\${dist.join(', ')}]\`);
  return dist;
}

// Demo - weighted adjacency list: vertex -> [[neighbor, weight], ...]
const graph = {
  0: [[1, 4], [2, 1]],
  1: [[3, 1]],
  2: [[1, 2], [3, 5]],
  3: [[4, 3]],
  4: []
};

dijkstra(graph, 0, 5);
`,

    java: `// Dijkstra's Shortest Path - Java
import java.util.*;

public class Dijkstra {
    public static int[] dijkstra(List<List<int[]>> graph, int start) {
        int V = graph.size();
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.offer(new int[]{start, 0});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0], d = curr[1];
            
            if (d > dist[u]) continue;
            
            for (int[] edge : graph.get(u)) {
                int v = edge[0], weight = edge[1];
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.offer(new int[]{v, dist[v]});
                }
            }
        }
        return dist;
    }
    
    public static void main(String[] args) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int i = 0; i < 5; i++) graph.add(new ArrayList<>());
        graph.get(0).add(new int[]{1, 4});
        graph.get(0).add(new int[]{2, 1});
        System.out.println(Arrays.toString(dijkstra(graph, 0)));
    }
}
`,

    python: `# Dijkstra's Shortest Path - Python
import heapq

def dijkstra(graph, start, V):
    dist = [float('inf')] * V
    dist[start] = 0
    pq = [(0, start)]  # (distance, vertex)
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        
        for v, weight in graph.get(u, []):
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    
    return dist


graph = {0: [(1, 4), (2, 1)], 1: [(3, 1)], 2: [(1, 2), (3, 5)], 3: [(4, 3)], 4: []}
print(f"Distances: {dijkstra(graph, 0, 5)}")
`,

    cpp: `// Dijkstra's Shortest Path - C++
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

vector<int> dijkstra(vector<vector<pair<int,int>>>& graph, int start) {
    int V = graph.size();
    vector<int> dist(V, INT_MAX);
    dist[start] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        
        for (auto& [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    vector<vector<pair<int,int>>> graph(5);
    graph[0] = {{1,4}, {2,1}};
    graph[1] = {{3,1}};
    graph[2] = {{1,2}, {3,5}};
    auto dist = dijkstra(graph, 0);
    for (int d : dist) cout << d << " ";
    return 0;
}
`,

    go: `// Dijkstra's Shortest Path - Go
package main

import (
    "container/heap"
    "fmt"
    "math"
)

type Item struct { vertex, dist int }
type PQ []Item
func (pq PQ) Len() int { return len(pq) }
func (pq PQ) Less(i, j int) bool { return pq[i].dist < pq[j].dist }
func (pq PQ) Swap(i, j int) { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PQ) Push(x interface{}) { *pq = append(*pq, x.(Item)) }
func (pq *PQ) Pop() interface{} { old := *pq; x := old[len(old)-1]; *pq = old[:len(old)-1]; return x }

func dijkstra(graph map[int][][2]int, start, V int) []int {
    dist := make([]int, V)
    for i := range dist { dist[i] = math.MaxInt32 }
    dist[start] = 0
    
    pq := &PQ{{start, 0}}
    heap.Init(pq)
    
    for pq.Len() > 0 {
        item := heap.Pop(pq).(Item)
        u, d := item.vertex, item.dist
        if d > dist[u] { continue }
        
        for _, edge := range graph[u] {
            v, w := edge[0], edge[1]
            if dist[u]+w < dist[v] {
                dist[v] = dist[u] + w
                heap.Push(pq, Item{v, dist[v]})
            }
        }
    }
    return dist
}

func main() {
    graph := map[int][][2]int{0: {{1,4}, {2,1}}, 1: {{3,1}}, 2: {{1,2}, {3,5}}}
    fmt.Println(dijkstra(graph, 0, 5))
}
`,
  },
};
