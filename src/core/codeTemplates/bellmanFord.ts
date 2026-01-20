import { AlgorithmCodeTemplates } from './types';

export const bellmanFordCode: AlgorithmCodeTemplates = {
  algorithmId: 'bellman-ford',
  algorithmName: 'Bellman-Ford Algorithm',
  category: 'graphs',
  templates: {
    javascript: `// Bellman-Ford Algorithm - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Handles negative edge weights, detects negative cycles

function bellmanFord(edges, V, start) {
  log(\`Bellman-Ford from vertex \${start} with \${V} vertices\`);
  
  const dist = Array(V).fill(Infinity);
  dist[start] = 0;
  
  // Relax all edges V-1 times
  for (let i = 0; i < V - 1; i++) {
    log(\`\\nIteration \${i + 1}:\`);
    let updated = false;
    
    for (const [u, v, weight] of edges) {
      visit(u);
      compare(u, v);
      
      if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        mark(v, 'current');
        log(\`  Relax edge \${u}->\${v}: dist[\${v}] = \${dist[v]}\`);
        updated = true;
      }
    }
    
    if (!updated) {
      log(\`  No updates, early exit\`);
      break;
    }
  }
  
  // Check for negative cycles
  for (const [u, v, weight] of edges) {
    if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
      log('\\nNegative cycle detected!');
      return null;
    }
  }
  
  log(\`\\nShortest distances: [\${dist.join(', ')}]\`);
  return dist;
}

// Demo - edges: [source, dest, weight]
const edges = [
  [0, 1, 4], [0, 2, 5], [1, 2, -3],
  [2, 3, 4], [3, 1, -1]
];

bellmanFord(edges, 4, 0);
`,

    java: `// Bellman-Ford Algorithm - Java
import java.util.*;

public class BellmanFord {
    public static int[] bellmanFord(int[][] edges, int V, int start) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        
        // Relax V-1 times
        for (int i = 0; i < V - 1; i++) {
            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }
        
        // Check negative cycle
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                System.out.println("Negative cycle detected!");
                return null;
            }
        }
        
        return dist;
    }
    
    public static void main(String[] args) {
        int[][] edges = {{0,1,4}, {0,2,5}, {1,2,-3}, {2,3,4}};
        System.out.println(Arrays.toString(bellmanFord(edges, 4, 0)));
    }
}
`,

    python: `# Bellman-Ford Algorithm - Python

def bellman_ford(edges, V, start):
    dist = [float('inf')] * V
    dist[start] = 0
    
    # Relax V-1 times
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    
    # Check for negative cycle
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None  # Negative cycle
    
    return dist


edges = [(0,1,4), (0,2,5), (1,2,-3), (2,3,4)]
print(f"Distances: {bellman_ford(edges, 4, 0)}")
`,

    cpp: `// Bellman-Ford Algorithm - C++
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

vector<int> bellmanFord(vector<tuple<int,int,int>>& edges, int V, int start) {
    vector<int> dist(V, INT_MAX);
    dist[start] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (auto& [u, v, w] : edges) {
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    // Check negative cycle
    for (auto& [u, v, w] : edges) {
        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
            cout << "Negative cycle!" << endl;
            return {};
        }
    }
    return dist;
}

int main() {
    vector<tuple<int,int,int>> edges = {{0,1,4}, {0,2,5}, {1,2,-3}};
    auto dist = bellmanFord(edges, 4, 0);
    for (int d : dist) cout << d << " ";
    return 0;
}
`,

    go: `// Bellman-Ford Algorithm - Go
package main

import (
    "fmt"
    "math"
)

func bellmanFord(edges [][3]int, V, start int) []int {
    dist := make([]int, V)
    for i := range dist { dist[i] = math.MaxInt32 }
    dist[start] = 0
    
    for i := 0; i < V-1; i++ {
        for _, e := range edges {
            u, v, w := e[0], e[1], e[2]
            if dist[u] != math.MaxInt32 && dist[u]+w < dist[v] {
                dist[v] = dist[u] + w
            }
        }
    }
    
    // Check negative cycle
    for _, e := range edges {
        u, v, w := e[0], e[1], e[2]
        if dist[u] != math.MaxInt32 && dist[u]+w < dist[v] {
            fmt.Println("Negative cycle!")
            return nil
        }
    }
    return dist
}

func main() {
    edges := [][3]int{{0,1,4}, {0,2,5}, {1,2,-3}, {2,3,4}}
    fmt.Println(bellmanFord(edges, 4, 0))
}
`,
  },
};
