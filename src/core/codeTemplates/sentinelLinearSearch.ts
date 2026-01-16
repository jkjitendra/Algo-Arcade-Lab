import { AlgorithmCodeTemplates } from './types';

export const sentinelLinearSearchCode: AlgorithmCodeTemplates = {
  algorithmId: 'sentinel-linear-search',
  algorithmName: 'Sentinel Linear Search',
  category: 'searching',
  templates: {
    javascript: `// Sentinel Linear Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Optimization: Reduces comparisons by placing target at end

function sentinelLinearSearch(arr, target) {
  const n = arr.length;
  log(\`Sentinel Linear Search for \${target}\`);
  
  // Save last element and place target as sentinel
  const last = arr[n - 1];
  arr[n - 1] = target;
  
  let i = 0;
  while (arr[i] !== target) {
    visit(i);
    compare(i, i);
    i++;
  }
  
  // Restore last element
  arr[n - 1] = last;
  
  // Check if found (not the sentinel)
  if (i < n - 1 || arr[n - 1] === target) {
    mark(i < n - 1 ? i : n - 1, 'found');
    log(\`Found \${target} at index \${i < n - 1 ? i : n - 1}\`);
    return i < n - 1 ? i : n - 1;
  }
  
  log(\`\${target} not found\`);
  return -1;
}

const target = inputArray[Math.floor(Math.random() * inputArray.length)];
sentinelLinearSearch([...inputArray], target);
`,

    java: `// Sentinel Linear Search - Java
public class SentinelLinearSearch {
    public static int sentinelLinearSearch(int[] arr, int target) {
        int n = arr.length;
        int last = arr[n - 1];
        arr[n - 1] = target;
        
        int i = 0;
        while (arr[i] != target) {
            i++;
        }
        
        arr[n - 1] = last;
        
        if (i < n - 1 || arr[n - 1] == target) {
            return i < n - 1 ? i : n - 1;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        int target = 22;
        int result = sentinelLinearSearch(arr, target);
        System.out.println("Element found at index: " + result);
    }
}
`,

    python: `# Sentinel Linear Search - Python

def sentinel_linear_search(arr, target):
    n = len(arr)
    last = arr[n - 1]
    arr[n - 1] = target
    
    i = 0
    while arr[i] != target:
        i += 1
    
    arr[n - 1] = last
    
    if i < n - 1 or arr[n - 1] == target:
        return i if i < n - 1 else n - 1
    return -1


arr = [64, 34, 25, 12, 22, 11, 90]
target = 22
result = sentinel_linear_search(arr, target)
print(f"Element found at index: {result}")
`,

    cpp: `// Sentinel Linear Search - C++
#include <iostream>
#include <vector>
using namespace std;

int sentinelLinearSearch(vector<int>& arr, int target) {
    int n = arr.size();
    int last = arr[n - 1];
    arr[n - 1] = target;
    
    int i = 0;
    while (arr[i] != target) {
        i++;
    }
    
    arr[n - 1] = last;
    
    if (i < n - 1 || arr[n - 1] == target) {
        return i < n - 1 ? i : n - 1;
    }
    return -1;
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    int target = 22;
    int result = sentinelLinearSearch(arr, target);
    cout << "Element found at index: " << result << endl;
    return 0;
}
`,

    go: `// Sentinel Linear Search - Go
package main

import "fmt"

func sentinelLinearSearch(arr []int, target int) int {
    n := len(arr)
    last := arr[n-1]
    arr[n-1] = target
    
    i := 0
    for arr[i] != target {
        i++
    }
    
    arr[n-1] = last
    
    if i < n-1 || arr[n-1] == target {
        if i < n-1 {
            return i
        }
        return n - 1
    }
    return -1
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    target := 22
    result := sentinelLinearSearch(arr, target)
    fmt.Printf("Element found at index: %d\\n", result)
}
`,
  },
};
