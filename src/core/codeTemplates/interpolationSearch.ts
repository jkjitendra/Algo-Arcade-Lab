import { AlgorithmCodeTemplates } from './types';

export const interpolationSearchCode: AlgorithmCodeTemplates = {
  algorithmId: 'interpolation-search',
  algorithmName: 'Interpolation Search',
  category: 'searching',
  templates: {
    javascript: `// Interpolation Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Best for uniformly distributed sorted arrays

function interpolationSearch(arr, target) {
  log(\`Interpolation Search for \${target}\`);
  
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      visit(low);
      if (arr[low] === target) {
        mark(low, 'found');
        return low;
      }
      return -1;
    }
    
    // Interpolation formula
    const pos = low + Math.floor(
      ((high - low) / (arr[high] - arr[low])) * (target - arr[low])
    );
    
    visit(pos);
    compare(pos, pos);
    log(\`Interpolated position: \${pos}, value: \${arr[pos]}\`);
    
    if (arr[pos] === target) {
      mark(pos, 'found');
      log(\`Found \${target} at index \${pos}\`);
      return pos;
    }
    
    if (arr[pos] < target) {
      mark(pos, 'eliminated');
      low = pos + 1;
    } else {
      mark(pos, 'eliminated');
      high = pos - 1;
    }
  }
  
  log(\`\${target} not found\`);
  return -1;
}

const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = sortedArray[Math.floor(Math.random() * sortedArray.length)];
interpolationSearch(sortedArray, target);
`,

    java: `// Interpolation Search - Java
public class InterpolationSearch {
    public static int interpolationSearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        
        while (low <= high && target >= arr[low] && target <= arr[high]) {
            if (low == high) {
                if (arr[low] == target) return low;
                return -1;
            }
            
            int pos = low + ((high - low) / (arr[high] - arr[low])) * (target - arr[low]);
            
            if (arr[pos] == target) return pos;
            if (arr[pos] < target) low = pos + 1;
            else high = pos - 1;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50, 60, 70, 80, 90};
        int target = 50;
        int result = interpolationSearch(arr, target);
        System.out.println("Element found at index: " + result);
    }
}
`,

    python: `# Interpolation Search - Python

def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    
    while low <= high and target >= arr[low] and target <= arr[high]:
        if low == high:
            if arr[low] == target:
                return low
            return -1
        
        pos = low + ((high - low) // (arr[high] - arr[low])) * (target - arr[low])
        
        if arr[pos] == target:
            return pos
        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    
    return -1


arr = [10, 20, 30, 40, 50, 60, 70, 80, 90]
target = 50
result = interpolation_search(arr, target)
print(f"Element found at index: {result}")
`,

    cpp: `// Interpolation Search - C++
#include <iostream>
#include <vector>
using namespace std;

int interpolationSearch(vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            if (arr[low] == target) return low;
            return -1;
        }
        
        int pos = low + ((high - low) / (arr[high] - arr[low])) * (target - arr[low]);
        
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}

int main() {
    vector<int> arr = {10, 20, 30, 40, 50, 60, 70, 80, 90};
    int target = 50;
    int result = interpolationSearch(arr, target);
    cout << "Element found at index: " << result << endl;
    return 0;
}
`,

    go: `// Interpolation Search - Go
package main

import "fmt"

func interpolationSearch(arr []int, target int) int {
    low, high := 0, len(arr)-1
    
    for low <= high && target >= arr[low] && target <= arr[high] {
        if low == high {
            if arr[low] == target {
                return low
            }
            return -1
        }
        
        pos := low + ((high-low)/(arr[high]-arr[low]))*(target-arr[low])
        
        if arr[pos] == target {
            return pos
        }
        if arr[pos] < target {
            low = pos + 1
        } else {
            high = pos - 1
        }
    }
    return -1
}

func main() {
    arr := []int{10, 20, 30, 40, 50, 60, 70, 80, 90}
    target := 50
    result := interpolationSearch(arr, target)
    fmt.Printf("Element found at index: %d\\n", result)
}
`,
  },
};
