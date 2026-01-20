import { AlgorithmCodeTemplates } from './types';

export const dfsCode: AlgorithmCodeTemplates = {
  algorithmId: 'dfs',
  algorithmName: 'Depth First Search',
  category: 'graphs',
  templates: {
    javascript: `// Depth First Search (DFS) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function dfsRecursive(graph, start, visited = new Set(), result = []) {
  visited.add(start);
  visit(start);
  mark(start, 'current');
  result.push(start);
  log(\`Visit: \${start}\`);
  
  for (const neighbor of graph[start] || []) {
    compare(start, neighbor);
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited, result);
    }
  }
  
  mark(start, 'found');
  return result;
}

function dfsIterative(graph, start) {
  log(\`DFS (Iterative) starting from vertex \${start}\`);
  
  const visited = new Set();
  const stack = [start];
  const result = [];
  
  while (stack.length > 0) {
    const vertex = stack.pop();
    
    if (!visited.has(vertex)) {
      visited.add(vertex);
      visit(vertex);
      mark(vertex, 'current');
      result.push(vertex);
      log(\`Visit: \${vertex}\`);
      
      // Add neighbors in reverse order for correct order
      const neighbors = graph[vertex] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
      
      mark(vertex, 'found');
    }
  }
  
  log(\`DFS order: [\${result.join(' -> ')}]\`);
  return result;
}

// DFS to find all paths
function findAllPaths(graph, start, end, path = [], paths = []) {
  path = [...path, start];
  
  if (start === end) {
    paths.push(path);
    return paths;
  }
  
  for (const neighbor of graph[start] || []) {
    if (!path.includes(neighbor)) {
      findAllPaths(graph, neighbor, end, path, paths);
    }
  }
  
  return paths;
}

// Demo
const graph = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 4],
  3: [1, 5],
  4: [1, 2, 5],
  5: [3, 4]
};

log('DFS Recursive:');
dfsRecursive(graph, 0);

log('\\nDFS Iterative:');
dfsIterative(graph, 0);
`,

    java: `// Depth First Search - Java
import java.util.*;

public class DFS {
    public static List<Integer> dfsRecursive(Map<Integer, List<Integer>> graph, int start) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        dfs(graph, start, visited, result);
        return result;
    }
    
    private static void dfs(Map<Integer, List<Integer>> graph, int vertex, 
                            Set<Integer> visited, List<Integer> result) {
        visited.add(vertex);
        result.add(vertex);
        
        for (int neighbor : graph.getOrDefault(vertex, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                dfs(graph, neighbor, visited, result);
            }
        }
    }
    
    public static List<Integer> dfsIterative(Map<Integer, List<Integer>> graph, int start) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Stack<Integer> stack = new Stack<>();
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int vertex = stack.pop();
            if (!visited.contains(vertex)) {
                visited.add(vertex);
                result.add(vertex);
                for (int n : graph.getOrDefault(vertex, new ArrayList<>())) {
                    stack.push(n);
                }
            }
        }
        return result;
    }
    
    public static void main(String[] args) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        graph.put(0, Arrays.asList(1, 2));
        graph.put(1, Arrays.asList(0, 3, 4));
        System.out.println("DFS: " + dfsRecursive(graph, 0));
    }
}
`,

    python: `# Depth First Search - Python

def dfs_recursive(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))
    
    return result

def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        vertex = stack.pop()
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            # Add neighbors in reverse for correct order
            stack.extend(reversed(graph.get(vertex, [])))
    
    return result


graph = {0: [1, 2], 1: [0, 3, 4], 2: [0, 4], 3: [1, 5], 4: [1, 2, 5], 5: [3, 4]}
print(f"DFS Recursive: {dfs_recursive(graph, 0)}")
print(f"DFS Iterative: {dfs_iterative(graph, 0)}")
`,

    cpp: `// Depth First Search - C++
#include <iostream>
#include <vector>
#include <stack>
#include <unordered_set>
using namespace std;

void dfsRecursive(vector<vector<int>>& graph, int v, unordered_set<int>& visited, vector<int>& result) {
    visited.insert(v);
    result.push_back(v);
    for (int n : graph[v]) {
        if (visited.find(n) == visited.end()) {
            dfsRecursive(graph, n, visited, result);
        }
    }
}

vector<int> dfsIterative(vector<vector<int>>& graph, int start) {
    vector<int> result;
    unordered_set<int> visited;
    stack<int> s;
    s.push(start);
    
    while (!s.empty()) {
        int v = s.top(); s.pop();
        if (visited.find(v) == visited.end()) {
            visited.insert(v);
            result.push_back(v);
            for (int n : graph[v]) s.push(n);
        }
    }
    return result;
}

int main() {
    vector<vector<int>> graph = {{1,2}, {0,3,4}, {0,4}, {1,5}, {1,2,5}, {3,4}};
    auto result = dfsIterative(graph, 0);
    for (int v : result) cout << v << " ";
    return 0;
}
`,

    go: `// Depth First Search - Go
package main

import "fmt"

func dfsRecursive(graph map[int][]int, start int, visited map[int]bool, result *[]int) {
    visited[start] = true
    *result = append(*result, start)
    for _, neighbor := range graph[start] {
        if !visited[neighbor] {
            dfsRecursive(graph, neighbor, visited, result)
        }
    }
}

func dfsIterative(graph map[int][]int, start int) []int {
    visited := make(map[int]bool)
    stack := []int{start}
    result := []int{}
    
    for len(stack) > 0 {
        v := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if !visited[v] {
            visited[v] = true
            result = append(result, v)
            for _, n := range graph[v] { stack = append(stack, n) }
        }
    }
    return result
}

func main() {
    graph := map[int][]int{0: {1, 2}, 1: {0, 3, 4}, 2: {0, 4}}
    result := []int{}
    dfsRecursive(graph, 0, make(map[int]bool), &result)
    fmt.Println("DFS:", result)
}
`,
  },
};
