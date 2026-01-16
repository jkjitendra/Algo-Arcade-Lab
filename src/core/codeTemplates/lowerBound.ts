import { AlgorithmCodeTemplates } from './types';

export const lowerBoundCode: AlgorithmCodeTemplates = {
  algorithmId: 'lower-bound',
  algorithmName: 'Lower Bound',
  category: 'searching',
  templates: {
    javascript: `// Lower Bound - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Finds first position where element >= target

function lowerBound(arr, target) {
  log(\`Finding lower bound for \${target}\`);
  
  let left = 0;
  let right = arr.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    visit(mid);
    compare(mid, mid);
    
    log(\`Checking mid[\${mid}]=\${arr[mid]}\`);
    
    if (arr[mid] < target) {
      mark(mid, 'eliminated');
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  if (left < arr.length) {
    mark(left, 'found');
    log(\`Lower bound at index \${left}, value = \${arr[left]}\`);
  } else {
    log(\`No lower bound found (all elements < \${target})\`);
  }
  
  return left;
}

const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = sortedArray[Math.floor(sortedArray.length / 2)];
lowerBound(sortedArray, target);
`,

    java: `// Lower Bound - Java
public class LowerBound {
    public static int lowerBound(int[] arr, int target) {
        int left = 0, right = arr.length;
        
        while (left < right) {
            int mid = (left + right) / 2;
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 4, 4, 4, 5, 6};
        int target = 4;
        int result = lowerBound(arr, target);
        System.out.println("Lower bound at index: " + result);
    }
}
`,

    python: `# Lower Bound - Python
import bisect

def lower_bound(arr, target):
    left, right = 0, len(arr)
    
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    
    return left


# Using manual implementation
arr = [1, 2, 4, 4, 4, 5, 6]
target = 4
result = lower_bound(arr, target)
print(f"Lower bound at index: {result}")

# Or use bisect_left
result2 = bisect.bisect_left(arr, target)
print(f"Using bisect_left: {result2}")
`,

    cpp: `// Lower Bound - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lowerBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    
    while (left < right) {
        int mid = (left + right) / 2;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

int main() {
    vector<int> arr = {1, 2, 4, 4, 4, 5, 6};
    int target = 4;
    
    // Manual implementation
    int result = lowerBound(arr, target);
    cout << "Lower bound at index: " << result << endl;
    
    // Or use std::lower_bound
    auto it = lower_bound(arr.begin(), arr.end(), target);
    cout << "Using std::lower_bound: " << (it - arr.begin()) << endl;
    
    return 0;
}
`,

    go: `// Lower Bound - Go
package main

import (
    "fmt"
    "sort"
)

func lowerBound(arr []int, target int) int {
    left, right := 0, len(arr)
    
    for left < right {
        mid := (left + right) / 2
        if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left
}

func main() {
    arr := []int{1, 2, 4, 4, 4, 5, 6}
    target := 4
    
    result := lowerBound(arr, target)
    fmt.Printf("Lower bound at index: %d\\n", result)
    
    // Or use sort.SearchInts
    result2 := sort.SearchInts(arr, target)
    fmt.Printf("Using sort.SearchInts: %d\\n", result2)
}
`,
  },
};
