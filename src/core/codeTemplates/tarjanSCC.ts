import { AlgorithmCodeTemplates } from './types';

export const tarjanSCCCode: AlgorithmCodeTemplates = {
  algorithmId: 'tarjan-scc',
  algorithmName: "Tarjan's SCC",
  category: 'graphs',
  templates: {
    javascript: `// Tarjan's Strongly Connected Components - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function tarjanSCC(graph, V) {
  log(\`Tarjan's SCC with \${V} vertices\`);
  
  let index = 0;
  const indices = new Map();
  const lowlink = new Map();
  const onStack = new Set();
  const stack = [];
  const sccs = [];
  
  function strongconnect(v) {
    indices.set(v, index);
    lowlink.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);
    
    visit(v);
    mark(v, 'current');
    log(\`Visit \${v}, index=\${indices.get(v)}\`);
    
    for (const w of graph[v] || []) {
      compare(v, w);
      if (!indices.has(w)) {
        // Not visited yet
        strongconnect(w);
        lowlink.set(v, Math.min(lowlink.get(v), lowlink.get(w)));
      } else if (onStack.has(w)) {
        // In stack, part of current SCC
        lowlink.set(v, Math.min(lowlink.get(v), indices.get(w)));
      }
    }
    
    // If v is root of SCC
    if (lowlink.get(v) === indices.get(v)) {
      const scc = [];
      let w;
      do {
        w = stack.pop();
        onStack.delete(w);
        scc.push(w);
      } while (w !== v);
      
      sccs.push(scc);
      mark(v, 'found');
      log(\`SCC found: [\${scc.join(', ')}]\`);
    }
  }
  
  for (let v = 0; v < V; v++) {
    if (!indices.has(v)) {
      strongconnect(v);
    }
  }
  
  log(\`\\nTotal SCCs: \${sccs.length}\`);
  return sccs;
}

// Demo
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

tarjanSCC(graph, 8);
`,

    java: `// Tarjan's SCC - Java
import java.util.*;

public class TarjanSCC {
    static int index;
    static int[] indices, lowlink;
    static boolean[] onStack;
    static Stack<Integer> stack;
    static List<List<Integer>> sccs;
    
    public static List<List<Integer>> findSCC(Map<Integer, List<Integer>> graph, int V) {
        index = 0;
        indices = new int[V]; lowlink = new int[V];
        onStack = new boolean[V];
        Arrays.fill(indices, -1);
        stack = new Stack<>();
        sccs = new ArrayList<>();
        
        for (int v = 0; v < V; v++)
            if (indices[v] == -1) strongconnect(graph, v);
        
        return sccs;
    }
    
    static void strongconnect(Map<Integer, List<Integer>> g, int v) {
        indices[v] = lowlink[v] = index++;
        stack.push(v); onStack[v] = true;
        
        for (int w : g.getOrDefault(v, new ArrayList<>())) {
            if (indices[w] == -1) {
                strongconnect(g, w);
                lowlink[v] = Math.min(lowlink[v], lowlink[w]);
            } else if (onStack[w]) {
                lowlink[v] = Math.min(lowlink[v], indices[w]);
            }
        }
        
        if (lowlink[v] == indices[v]) {
            List<Integer> scc = new ArrayList<>();
            int w;
            do {
                w = stack.pop(); onStack[w] = false; scc.add(w);
            } while (w != v);
            sccs.add(scc);
        }
    }
}
`,

    python: `# Tarjan's SCC - Python

def tarjan_scc(graph, V):
    index = [0]
    indices = {}
    lowlink = {}
    on_stack = set()
    stack = []
    sccs = []
    
    def strongconnect(v):
        indices[v] = lowlink[v] = index[0]
        index[0] += 1
        stack.append(v)
        on_stack.add(v)
        
        for w in graph.get(v, []):
            if w not in indices:
                strongconnect(w)
                lowlink[v] = min(lowlink[v], lowlink[w])
            elif w in on_stack:
                lowlink[v] = min(lowlink[v], indices[w])
        
        if lowlink[v] == indices[v]:
            scc = []
            while True:
                w = stack.pop()
                on_stack.remove(w)
                scc.append(w)
                if w == v:
                    break
            sccs.append(scc)
    
    for v in range(V):
        if v not in indices:
            strongconnect(v)
    
    return sccs


graph = {0: [1], 1: [2], 2: [0, 3], 3: [4], 4: [5, 7], 5: [6], 6: [4], 7: []}
print(f"SCCs: {tarjan_scc(graph, 8)}")
`,

    cpp: `// Tarjan's SCC - C++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

class TarjanSCC {
    int idx = 0;
    vector<int> indices, lowlink;
    vector<bool> onStack;
    stack<int> st;
    vector<vector<int>> sccs;
    
    void strongconnect(vector<vector<int>>& g, int v) {
        indices[v] = lowlink[v] = idx++;
        st.push(v); onStack[v] = true;
        
        for (int w : g[v]) {
            if (indices[w] == -1) {
                strongconnect(g, w);
                lowlink[v] = min(lowlink[v], lowlink[w]);
            } else if (onStack[w]) {
                lowlink[v] = min(lowlink[v], indices[w]);
            }
        }
        
        if (lowlink[v] == indices[v]) {
            vector<int> scc;
            int w;
            do {
                w = st.top(); st.pop(); onStack[w] = false; scc.push_back(w);
            } while (w != v);
            sccs.push_back(scc);
        }
    }
public:
    vector<vector<int>> findSCC(vector<vector<int>>& g) {
        int V = g.size();
        indices.assign(V, -1);
        lowlink.resize(V);
        onStack.assign(V, false);
        for (int v = 0; v < V; v++) if (indices[v] == -1) strongconnect(g, v);
        return sccs;
    }
};
`,

    go: `// Tarjan's SCC - Go
package main

import "fmt"

func tarjanSCC(graph map[int][]int, V int) [][]int {
    index := 0
    indices := make(map[int]int)
    lowlink := make(map[int]int)
    onStack := make(map[int]bool)
    stack := []int{}
    sccs := [][]int{}
    
    for i := 0; i < V; i++ { indices[i] = -1 }
    
    var strongconnect func(v int)
    strongconnect = func(v int) {
        indices[v] = index
        lowlink[v] = index
        index++
        stack = append(stack, v)
        onStack[v] = true
        
        for _, w := range graph[v] {
            if indices[w] == -1 {
                strongconnect(w)
                if lowlink[w] < lowlink[v] { lowlink[v] = lowlink[w] }
            } else if onStack[w] {
                if indices[w] < lowlink[v] { lowlink[v] = indices[w] }
            }
        }
        
        if lowlink[v] == indices[v] {
            scc := []int{}
            for {
                w := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                onStack[w] = false
                scc = append(scc, w)
                if w == v { break }
            }
            sccs = append(sccs, scc)
        }
    }
    
    for v := 0; v < V; v++ { if indices[v] == -1 { strongconnect(v) } }
    return sccs
}

func main() { fmt.Println("Tarjan's SCC") }
`,
  },
};
