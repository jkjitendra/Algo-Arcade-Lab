import { AlgorithmCodeTemplates } from './types';

export const bidirectionalSearchCode: AlgorithmCodeTemplates = {
  algorithmId: 'bidirectional-search',
  algorithmName: 'Bidirectional Search',
  category: 'searching',
  templates: {
    javascript: `// Bidirectional Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Searches from both ends simultaneously

function bidirectionalSearch(arr, target) {
  log(\`Bidirectional Search for \${target}\`);
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    visit(left);
    visit(right);
    compare(left, right);
    
    log(\`Checking left[\${left}]=\${arr[left]} and right[\${right}]=\${arr[right]}\`);
    
    if (arr[left] === target) {
      mark(left, 'found');
      log(\`Found \${target} at index \${left}\`);
      return left;
    }
    
    if (arr[right] === target) {
      mark(right, 'found');
      log(\`Found \${target} at index \${right}\`);
      return right;
    }
    
    left++;
    right--;
  }
  
  log(\`\${target} not found\`);
  return -1;
}

const target = inputArray[Math.floor(Math.random() * inputArray.length)];
bidirectionalSearch(inputArray, target);
`,

    java: `// Bidirectional Search - Java
public class BidirectionalSearch {
    public static int bidirectionalSearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            if (arr[left] == target) return left;
            if (arr[right] == target) return right;
            left++;
            right--;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        int target = 22;
        int result = bidirectionalSearch(arr, target);
        System.out.println("Element found at index: " + result);
    }
}
`,

    python: `# Bidirectional Search - Python

def bidirectional_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        if arr[left] == target:
            return left
        if arr[right] == target:
            return right
        left += 1
        right -= 1
    
    return -1


arr = [64, 34, 25, 12, 22, 11, 90]
target = 22
result = bidirectional_search(arr, target)
print(f"Element found at index: {result}")
`,

    cpp: `// Bidirectional Search - C++
#include <iostream>
#include <vector>
using namespace std;

int bidirectionalSearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        if (arr[left] == target) return left;
        if (arr[right] == target) return right;
        left++;
        right--;
    }
    return -1;
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    int target = 22;
    int result = bidirectionalSearch(arr, target);
    cout << "Element found at index: " << result << endl;
    return 0;
}
`,

    go: `// Bidirectional Search - Go
package main

import "fmt"

func bidirectionalSearch(arr []int, target int) int {
    left, right := 0, len(arr)-1
    
    for left <= right {
        if arr[left] == target {
            return left
        }
        if arr[right] == target {
            return right
        }
        left++
        right--
    }
    return -1
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    target := 22
    result := bidirectionalSearch(arr, target)
    fmt.Printf("Element found at index: %d\\n", result)
}
`,
  },
};
