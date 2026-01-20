import { AlgorithmCodeTemplates } from './types';

export const floydWarshallCode: AlgorithmCodeTemplates = {
  algorithmId: 'floyd-warshall',
  algorithmName: 'Floyd-Warshall Algorithm',
  category: 'graphs',
  templates: {
    javascript: `// Floyd-Warshall Algorithm - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// All-pairs shortest paths

function floydWarshall(graph) {
  const V = graph.length;
  
  // Initialize distance matrix
  const dist = graph.map(row => [...row]);
  
  log('Floyd-Warshall: All-pairs shortest paths');
  log(\`Initial matrix:\`);
  printMatrix(dist);
  
  // For each intermediate vertex k
  for (let k = 0; k < V; k++) {
    log(\`\\nUsing vertex \${k} as intermediate:\`);
    visit(k);
    mark(k, 'current');
    
    // For each source i
    for (let i = 0; i < V; i++) {
      // For each destination j
      for (let j = 0; j < V; j++) {
        compare(i, j);
        
        // If path through k is shorter
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            log(\`  dist[\${i}][\${j}] = \${dist[i][j]} (via \${k})\`);
          }
        }
      }
    }
    mark(k, 'found');
  }
  
  log('\\nFinal distance matrix:');
  printMatrix(dist);
  
  return dist;
}

function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    log(\`[\${matrix[i].map(d => d === Infinity ? '∞' : d).join(', ')}]\`);
  }
}

// Demo - adjacency matrix (Infinity for no edge)
const INF = Infinity;
const graph = [
  [0, 3, INF, 5],
  [2, 0, INF, 4],
  [INF, 1, 0, INF],
  [INF, INF, 2, 0]
];

floydWarshall(graph);
`,

    java: `// Floyd-Warshall Algorithm - Java
public class FloydWarshall {
    static final int INF = Integer.MAX_VALUE / 2;
    
    public static int[][] floydWarshall(int[][] graph) {
        int V = graph.length;
        int[][] dist = new int[V][V];
        
        for (int i = 0; i < V; i++)
            System.arraycopy(graph[i], 0, dist[i], 0, V);
        
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
        return dist;
    }
    
    public static void main(String[] args) {
        int[][] graph = {
            {0, 3, INF, 5},
            {2, 0, INF, 4},
            {INF, 1, 0, INF},
            {INF, INF, 2, 0}
        };
        int[][] result = floydWarshall(graph);
        for (int[] row : result) {
            for (int d : row) System.out.print((d >= INF ? "∞" : d) + " ");
            System.out.println();
        }
    }
}
`,

    python: `# Floyd-Warshall Algorithm - Python

def floyd_warshall(graph):
    V = len(graph)
    dist = [row[:] for row in graph]
    
    for k in range(V):
        for i in range(V):
            for j in range(V):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    
    return dist


INF = float('inf')
graph = [
    [0, 3, INF, 5],
    [2, 0, INF, 4],
    [INF, 1, 0, INF],
    [INF, INF, 2, 0]
]

result = floyd_warshall(graph)
for row in result:
    print([x if x != INF else '∞' for x in row])
`,

    cpp: `// Floyd-Warshall Algorithm - C++
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

vector<vector<int>> floydWarshall(vector<vector<int>>& graph) {
    int V = graph.size();
    auto dist = graph;
    
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INT_MAX/2 && dist[k][j] != INT_MAX/2) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    return dist;
}

int main() {
    const int INF = INT_MAX / 2;
    vector<vector<int>> graph = {{0,3,INF,5}, {2,0,INF,4}, {INF,1,0,INF}, {INF,INF,2,0}};
    auto dist = floydWarshall(graph);
    for (auto& row : dist) {
        for (int d : row) cout << (d >= INF ? "∞" : to_string(d)) << " ";
        cout << endl;
    }
    return 0;
}
`,

    go: `// Floyd-Warshall Algorithm - Go
package main

import (
    "fmt"
    "math"
)

func floydWarshall(graph [][]int) [][]int {
    V := len(graph)
    dist := make([][]int, V)
    for i := range dist {
        dist[i] = make([]int, V)
        copy(dist[i], graph[i])
    }
    
    for k := 0; k < V; k++ {
        for i := 0; i < V; i++ {
            for j := 0; j < V; j++ {
                if dist[i][k]+dist[k][j] < dist[i][j] {
                    dist[i][j] = dist[i][k] + dist[k][j]
                }
            }
        }
    }
    return dist
}

func main() {
    INF := math.MaxInt32 / 2
    graph := [][]int{{0,3,INF,5}, {2,0,INF,4}, {INF,1,0,INF}, {INF,INF,2,0}}
    dist := floydWarshall(graph)
    for _, row := range dist { fmt.Println(row) }
}
`,
  },
};
