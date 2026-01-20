import { AlgorithmCodeTemplates } from './types';

export const kruskalMSTCode: AlgorithmCodeTemplates = {
  algorithmId: 'kruskal-mst',
  algorithmName: "Kruskal's MST",
  category: 'graphs',
  templates: {
    javascript: `// Kruskal's Minimum Spanning Tree - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Uses Union-Find (Disjoint Set Union)

class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false;
    
    // Union by rank
    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
    return true;
  }
}

function kruskalMST(edges, V) {
  log(\`Kruskal's MST with \${V} vertices and \${edges.length} edges\`);
  
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  log(\`Sorted edges: \${edges.map(e => \`\${e[0]}-\${e[1]}(\${e[2]})\`).join(', ')}\`);
  
  const uf = new UnionFind(V);
  const mst = [];
  let totalWeight = 0;
  
  for (let i = 0; i < edges.length && mst.length < V - 1; i++) {
    const [u, v, weight] = edges[i];
    visit(i);
    compare(u, v);
    
    if (uf.union(u, v)) {
      mst.push([u, v, weight]);
      totalWeight += weight;
      mark(i, 'found');
      log(\`Add edge \${u}-\${v} (weight: \${weight})\`);
    } else {
      mark(i, 'eliminated');
      log(\`Skip \${u}-\${v} (would create cycle)\`);
    }
  }
  
  log(\`\\nMST edges: \${mst.map(e => \`\${e[0]}-\${e[1]}\`).join(', ')}\`);
  log(\`Total weight: \${totalWeight}\`);
  return { mst, totalWeight };
}

// Demo - edges: [u, v, weight]
const edges = [
  [0, 1, 4], [0, 7, 8], [1, 2, 8], [1, 7, 11],
  [2, 3, 7], [2, 5, 4], [2, 8, 2], [3, 4, 9],
  [3, 5, 14], [4, 5, 10], [5, 6, 2], [6, 7, 1], [6, 8, 6], [7, 8, 7]
];
kruskalMST(edges, 9);
`,

    java: `// Kruskal's MST - Java
import java.util.*;

public class KruskalMST {
    static int[] parent, rank;
    
    static int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    static boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) parent[px] = py;
        else if (rank[px] > rank[py]) parent[py] = px;
        else { parent[py] = px; rank[px]++; }
        return true;
    }
    
    public static int kruskal(int[][] edges, int V) {
        parent = new int[V]; rank = new int[V];
        for (int i = 0; i < V; i++) parent[i] = i;
        
        Arrays.sort(edges, (a, b) -> a[2] - b[2]);
        int mstWeight = 0, edgeCount = 0;
        
        for (int[] e : edges) {
            if (edgeCount >= V - 1) break;
            if (union(e[0], e[1])) { mstWeight += e[2]; edgeCount++; }
        }
        return mstWeight;
    }
    
    public static void main(String[] args) {
        int[][] edges = {{0,1,4}, {0,7,8}, {1,2,8}, {2,3,7}};
        System.out.println("MST weight: " + kruskal(edges, 9));
    }
}
`,

    python: `# Kruskal's MST - Python

class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]: self.parent[px] = py
        elif self.rank[px] > self.rank[py]: self.parent[py] = px
        else: self.parent[py] = px; self.rank[px] += 1
        return True

def kruskal_mst(edges, V):
    edges.sort(key=lambda e: e[2])
    uf = UnionFind(V)
    mst, total = [], 0
    
    for u, v, w in edges:
        if len(mst) >= V - 1: break
        if uf.union(u, v):
            mst.append((u, v, w))
            total += w
    
    return mst, total


edges = [(0,1,4), (0,7,8), (1,2,8), (2,3,7), (2,5,4), (5,6,2), (6,7,1)]
mst, weight = kruskal_mst(edges, 9)
print(f"MST: {mst}, Weight: {weight}")
`,

    cpp: `// Kruskal's MST - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class UnionFind {
    vector<int> parent, rank_;
public:
    UnionFind(int n) : parent(n), rank_(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }
    bool unite(int x, int y) {
        x = find(x); y = find(y);
        if (x == y) return false;
        if (rank_[x] < rank_[y]) swap(x, y);
        parent[y] = x;
        if (rank_[x] == rank_[y]) rank_[x]++;
        return true;
    }
};

int kruskalMST(vector<tuple<int,int,int>>& edges, int V) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) { return get<2>(a) < get<2>(b); });
    UnionFind uf(V);
    int weight = 0, count = 0;
    for (auto& [u, v, w] : edges) {
        if (count >= V - 1) break;
        if (uf.unite(u, v)) { weight += w; count++; }
    }
    return weight;
}
`,

    go: `// Kruskal's MST - Go
package main

import (
    "fmt"
    "sort"
)

type UnionFind struct { parent, rank []int }

func NewUF(n int) *UnionFind {
    uf := &UnionFind{make([]int, n), make([]int, n)}
    for i := range uf.parent { uf.parent[i] = i }
    return uf
}

func (uf *UnionFind) Find(x int) int {
    if uf.parent[x] != x { uf.parent[x] = uf.Find(uf.parent[x]) }
    return uf.parent[x]
}

func (uf *UnionFind) Union(x, y int) bool {
    px, py := uf.Find(x), uf.Find(y)
    if px == py { return false }
    if uf.rank[px] < uf.rank[py] { px, py = py, px }
    uf.parent[py] = px
    if uf.rank[px] == uf.rank[py] { uf.rank[px]++ }
    return true
}

func kruskalMST(edges [][3]int, V int) int {
    sort.Slice(edges, func(i, j int) bool { return edges[i][2] < edges[j][2] })
    uf := NewUF(V)
    weight, count := 0, 0
    for _, e := range edges {
        if count >= V-1 { break }
        if uf.Union(e[0], e[1]) { weight += e[2]; count++ }
    }
    return weight
}

func main() {
    edges := [][3]int{{0,1,4}, {0,7,8}, {1,2,8}, {6,7,1}}
    fmt.Println("MST weight:", kruskalMST(edges, 9))
}
`,
  },
};
