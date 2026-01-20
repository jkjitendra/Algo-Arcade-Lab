import { AlgorithmCodeTemplates } from './types';

export const adjacencyListCode: AlgorithmCodeTemplates = {
  algorithmId: 'adjacency-list',
  algorithmName: 'Adjacency List',
  category: 'graphs',
  templates: {
    javascript: `// Adjacency List Graph Representation - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class GraphList {
  constructor(vertices) {
    this.V = vertices;
    this.adjList = new Map();
    for (let i = 0; i < vertices; i++) {
      this.adjList.set(i, []);
    }
  }
  
  addEdge(u, v, weight = 1, directed = false) {
    log(\`Add edge: \${u} -> \${v} (weight: \${weight})\`);
    this.adjList.get(u).push({ node: v, weight });
    if (!directed) {
      this.adjList.get(v).push({ node: u, weight });
    }
  }
  
  removeEdge(u, v, directed = false) {
    this.adjList.set(u, this.adjList.get(u).filter(e => e.node !== v));
    if (!directed) {
      this.adjList.set(v, this.adjList.get(v).filter(e => e.node !== u));
    }
  }
  
  getNeighbors(v) {
    return this.adjList.get(v) || [];
  }
  
  printList() {
    log('Adjacency List:');
    for (let [vertex, edges] of this.adjList) {
      const neighbors = edges.map(e => \`\${e.node}(\${e.weight})\`).join(', ');
      log(\`\${vertex}: [\${neighbors}]\`);
    }
  }
}

// Demo
const g = new GraphList(5);
g.addEdge(0, 1);
g.addEdge(0, 4);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(1, 4);
g.addEdge(2, 3);
g.addEdge(3, 4);

g.printList();
`,

    java: `// Adjacency List - Java
import java.util.*;

class Edge {
    int node, weight;
    Edge(int n, int w) { node = n; weight = w; }
}

public class GraphList {
    private Map<Integer, List<Edge>> adjList;
    private int V;
    
    public GraphList(int vertices) {
        V = vertices;
        adjList = new HashMap<>();
        for (int i = 0; i < V; i++) adjList.put(i, new ArrayList<>());
    }
    
    public void addEdge(int u, int v, int weight, boolean directed) {
        adjList.get(u).add(new Edge(v, weight));
        if (!directed) adjList.get(v).add(new Edge(u, weight));
    }
    
    public void addEdge(int u, int v) { addEdge(u, v, 1, false); }
    
    public List<Edge> getNeighbors(int v) { return adjList.get(v); }
    
    public void printList() {
        for (int v : adjList.keySet()) {
            System.out.print(v + ": ");
            for (Edge e : adjList.get(v)) System.out.print(e.node + " ");
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        GraphList g = new GraphList(5);
        g.addEdge(0, 1); g.addEdge(0, 4); g.addEdge(1, 2);
        g.printList();
    }
}
`,

    python: `# Adjacency List - Python
from collections import defaultdict

class GraphList:
    def __init__(self, vertices):
        self.V = vertices
        self.adj_list = defaultdict(list)
    
    def add_edge(self, u, v, weight=1, directed=False):
        self.adj_list[u].append((v, weight))
        if not directed:
            self.adj_list[v].append((u, weight))
    
    def get_neighbors(self, v):
        return self.adj_list[v]
    
    def print_list(self):
        for v in range(self.V):
            neighbors = ', '.join(f"{n}({w})" for n, w in self.adj_list[v])
            print(f"{v}: [{neighbors}]")


g = GraphList(5)
g.add_edge(0, 1)
g.add_edge(0, 4)
g.add_edge(1, 2)
g.print_list()
`,

    cpp: `// Adjacency List - C++
#include <iostream>
#include <vector>
#include <list>
using namespace std;

class GraphList {
    int V;
    vector<list<pair<int, int>>> adjList; // node, weight
public:
    GraphList(int vertices) : V(vertices), adjList(vertices) {}
    
    void addEdge(int u, int v, int weight = 1, bool directed = false) {
        adjList[u].push_back({v, weight});
        if (!directed) adjList[v].push_back({u, weight});
    }
    
    void printList() {
        for (int v = 0; v < V; v++) {
            cout << v << ": ";
            for (auto& edge : adjList[v]) cout << edge.first << " ";
            cout << endl;
        }
    }
};

int main() {
    GraphList g(5);
    g.addEdge(0, 1); g.addEdge(0, 4); g.addEdge(1, 2);
    g.printList();
    return 0;
}
`,

    go: `// Adjacency List - Go
package main

import "fmt"

type Edge struct {
    Node, Weight int
}

type GraphList struct {
    V       int
    AdjList map[int][]Edge
}

func NewGraphList(vertices int) *GraphList {
    g := &GraphList{V: vertices, AdjList: make(map[int][]Edge)}
    for i := 0; i < vertices; i++ { g.AdjList[i] = []Edge{} }
    return g
}

func (g *GraphList) AddEdge(u, v, weight int, directed bool) {
    g.AdjList[u] = append(g.AdjList[u], Edge{v, weight})
    if !directed { g.AdjList[v] = append(g.AdjList[v], Edge{u, weight}) }
}

func (g *GraphList) PrintList() {
    for v := 0; v < g.V; v++ {
        fmt.Printf("%d: ", v)
        for _, e := range g.AdjList[v] { fmt.Printf("%d ", e.Node) }
        fmt.Println()
    }
}

func main() {
    g := NewGraphList(5)
    g.AddEdge(0, 1, 1, false)
    g.AddEdge(0, 4, 1, false)
    g.PrintList()
}
`,
  },
};
