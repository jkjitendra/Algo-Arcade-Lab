import { AlgorithmCodeTemplates } from './types';

export const jumpSearchCode: AlgorithmCodeTemplates = {
  algorithmId: 'jump-search',
  algorithmName: 'Jump Search',
  category: 'searching',
  templates: {
    javascript: `// Jump Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Note: Array must be sorted!

function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  log(\`Jump Search for \${target} with step size \${step}\`);
  
  let prev = 0;
  let curr = step;
  
  // Jump ahead until we find a block where target might be
  while (curr < n && arr[curr] < target) {
    visit(curr);
    compare(curr, curr);
    mark(curr, 'eliminated');
    log(\`Jumping: arr[\${curr}] = \${arr[curr]} < \${target}\`);
    prev = curr;
    curr += step;
  }
  
  // Linear search within the block
  log(\`Linear search from index \${prev} to \${Math.min(curr, n - 1)}\`);
  for (let i = prev; i <= Math.min(curr, n - 1); i++) {
    visit(i);
    compare(i, i);
    
    if (arr[i] === target) {
      mark(i, 'found');
      log(\`Found \${target} at index \${i}\`);
      return i;
    }
  }
  
  log(\`\${target} not found\`);
  return -1;
}

// Sort array first
const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = sortedArray[Math.floor(Math.random() * sortedArray.length)];
jumpSearch(sortedArray, target);
`,

    java: `// Jump Search - Java
public class JumpSearch {
    public static int jumpSearch(int[] arr, int target) {
        int n = arr.length;
        int step = (int) Math.sqrt(n);
        int prev = 0;
        
        while (arr[Math.min(step, n) - 1] < target) {
            prev = step;
            step += (int) Math.sqrt(n);
            if (prev >= n) return -1;
        }
        
        while (arr[prev] < target) {
            prev++;
            if (prev == Math.min(step, n)) return -1;
        }
        
        if (arr[prev] == target) return prev;
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {11, 12, 22, 25, 34, 64, 90};
        int target = 22;
        int result = jumpSearch(arr, target);
        System.out.println("Element found at index: " + result);
    }
}
`,

    python: `# Jump Search - Python
import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
    
    if arr[prev] == target:
        return prev
    return -1


arr = [11, 12, 22, 25, 34, 64, 90]
target = 22
result = jump_search(arr, target)
print(f"Element found at index: {result}")
`,

    cpp: `// Jump Search - C++
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int jumpSearch(vector<int>& arr, int target) {
    int n = arr.size();
    int step = sqrt(n);
    int prev = 0;
    
    while (arr[min(step, n) - 1] < target) {
        prev = step;
        step += sqrt(n);
        if (prev >= n) return -1;
    }
    
    while (arr[prev] < target) {
        prev++;
        if (prev == min(step, n)) return -1;
    }
    
    if (arr[prev] == target) return prev;
    return -1;
}

int main() {
    vector<int> arr = {11, 12, 22, 25, 34, 64, 90};
    int target = 22;
    int result = jumpSearch(arr, target);
    cout << "Element found at index: " << result << endl;
    return 0;
}
`,

    go: `// Jump Search - Go
package main

import (
    "fmt"
    "math"
)

func jumpSearch(arr []int, target int) int {
    n := len(arr)
    step := int(math.Sqrt(float64(n)))
    prev := 0
    
    for arr[min(step, n)-1] < target {
        prev = step
        step += int(math.Sqrt(float64(n)))
        if prev >= n {
            return -1
        }
    }
    
    for arr[prev] < target {
        prev++
        if prev == min(step, n) {
            return -1
        }
    }
    
    if arr[prev] == target {
        return prev
    }
    return -1
}

func main() {
    arr := []int{11, 12, 22, 25, 34, 64, 90}
    target := 22
    result := jumpSearch(arr, target)
    fmt.Printf("Element found at index: %d\\n", result)
}
`,
  },
};
