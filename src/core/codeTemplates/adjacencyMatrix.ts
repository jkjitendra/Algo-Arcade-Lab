import { AlgorithmCodeTemplates } from './types';

export const adjacencyMatrixCode: AlgorithmCodeTemplates = {
  algorithmId: 'adjacency-matrix',
  algorithmName: 'Adjacency Matrix',
  category: 'graphs',
  templates: {
    javascript: `// Adjacency Matrix Graph Representation - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class GraphMatrix {
  constructor(vertices) {
    this.V = vertices;
    this.matrix = Array(vertices).fill(null).map(() => Array(vertices).fill(0));
  }
  
  addEdge(u, v, weight = 1, directed = false) {
    log(\`Add edge: \${u} -> \${v} (weight: \${weight})\`);
    this.matrix[u][v] = weight;
    if (!directed) {
      this.matrix[v][u] = weight;
    }
  }
  
  removeEdge(u, v, directed = false) {
    this.matrix[u][v] = 0;
    if (!directed) {
      this.matrix[v][u] = 0;
    }
  }
  
  hasEdge(u, v) {
    return this.matrix[u][v] !== 0;
  }
  
  getNeighbors(v) {
    const neighbors = [];
    for (let i = 0; i < this.V; i++) {
      if (this.matrix[v][i] !== 0) {
        neighbors.push(i);
      }
    }
    return neighbors;
  }
  
  printMatrix() {
    log('Adjacency Matrix:');
    log('   ' + [...Array(this.V).keys()].join(' '));
    for (let i = 0; i < this.V; i++) {
      log(\`\${i}: [\${this.matrix[i].join(', ')}]\`);
    }
  }
}

// Demo
const g = new GraphMatrix(5);
g.addEdge(0, 1);
g.addEdge(0, 4);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(1, 4);
g.addEdge(2, 3);
g.addEdge(3, 4);

g.printMatrix();
log(\`Neighbors of 1: [\${g.getNeighbors(1).join(', ')}]\`);
`,

    java: `// Adjacency Matrix - Java
public class GraphMatrix {
    private int[][] matrix;
    private int V;
    
    public GraphMatrix(int vertices) {
        V = vertices;
        matrix = new int[V][V];
    }
    
    public void addEdge(int u, int v, int weight) {
        matrix[u][v] = weight;
        matrix[v][u] = weight; // For undirected
    }
    
    public void addEdge(int u, int v) {
        addEdge(u, v, 1);
    }
    
    public boolean hasEdge(int u, int v) {
        return matrix[u][v] != 0;
    }
    
    public void printMatrix() {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        GraphMatrix g = new GraphMatrix(5);
        g.addEdge(0, 1);
        g.addEdge(0, 4);
        g.addEdge(1, 2);
        g.printMatrix();
    }
}
`,

    python: `# Adjacency Matrix - Python

class GraphMatrix:
    def __init__(self, vertices):
        self.V = vertices
        self.matrix = [[0] * vertices for _ in range(vertices)]
    
    def add_edge(self, u, v, weight=1, directed=False):
        self.matrix[u][v] = weight
        if not directed:
            self.matrix[v][u] = weight
    
    def has_edge(self, u, v):
        return self.matrix[u][v] != 0
    
    def get_neighbors(self, v):
        return [i for i in range(self.V) if self.matrix[v][i] != 0]
    
    def print_matrix(self):
        print("   " + " ".join(str(i) for i in range(self.V)))
        for i, row in enumerate(self.matrix):
            print(f"{i}: {row}")


g = GraphMatrix(5)
g.add_edge(0, 1)
g.add_edge(0, 4)
g.add_edge(1, 2)
g.print_matrix()
print(f"Neighbors of 1: {g.get_neighbors(1)}")
`,

    cpp: `// Adjacency Matrix - C++
#include <iostream>
#include <vector>
using namespace std;

class GraphMatrix {
    vector<vector<int>> matrix;
    int V;
public:
    GraphMatrix(int vertices) : V(vertices), matrix(vertices, vector<int>(vertices, 0)) {}
    
    void addEdge(int u, int v, int weight = 1, bool directed = false) {
        matrix[u][v] = weight;
        if (!directed) matrix[v][u] = weight;
    }
    
    bool hasEdge(int u, int v) { return matrix[u][v] != 0; }
    
    vector<int> getNeighbors(int v) {
        vector<int> neighbors;
        for (int i = 0; i < V; i++)
            if (matrix[v][i] != 0) neighbors.push_back(i);
        return neighbors;
    }
    
    void printMatrix() {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) cout << matrix[i][j] << " ";
            cout << endl;
        }
    }
};

int main() {
    GraphMatrix g(5);
    g.addEdge(0, 1); g.addEdge(0, 4); g.addEdge(1, 2);
    g.printMatrix();
    return 0;
}
`,

    go: `// Adjacency Matrix - Go
package main

import "fmt"

type GraphMatrix struct {
    V      int
    Matrix [][]int
}

func NewGraphMatrix(vertices int) *GraphMatrix {
    matrix := make([][]int, vertices)
    for i := range matrix {
        matrix[i] = make([]int, vertices)
    }
    return &GraphMatrix{V: vertices, Matrix: matrix}
}

func (g *GraphMatrix) AddEdge(u, v, weight int, directed bool) {
    g.Matrix[u][v] = weight
    if !directed { g.Matrix[v][u] = weight }
}

func (g *GraphMatrix) HasEdge(u, v int) bool { return g.Matrix[u][v] != 0 }

func (g *GraphMatrix) GetNeighbors(v int) []int {
    var neighbors []int
    for i := 0; i < g.V; i++ {
        if g.Matrix[v][i] != 0 { neighbors = append(neighbors, i) }
    }
    return neighbors
}

func main() {
    g := NewGraphMatrix(5)
    g.AddEdge(0, 1, 1, false)
    g.AddEdge(0, 4, 1, false)
    fmt.Println(g.Matrix)
}
`,
  },
};
