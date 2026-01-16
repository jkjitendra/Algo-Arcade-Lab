import { AlgorithmCodeTemplates } from './types';

export const upperBoundCode: AlgorithmCodeTemplates = {
  algorithmId: 'upper-bound',
  algorithmName: 'Upper Bound',
  category: 'searching',
  templates: {
    javascript: `// Upper Bound - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Finds first position where element > target

function upperBound(arr, target) {
  log(\`Finding upper bound for \${target}\`);
  
  let left = 0;
  let right = arr.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    visit(mid);
    compare(mid, mid);
    
    log(\`Checking mid[\${mid}]=\${arr[mid]}\`);
    
    if (arr[mid] <= target) {
      mark(mid, 'eliminated');
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  if (left < arr.length) {
    mark(left, 'found');
    log(\`Upper bound at index \${left}, value = \${arr[left]}\`);
  } else {
    log(\`No upper bound found (all elements <= \${target})\`);
  }
  
  return left;
}

const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = sortedArray[Math.floor(sortedArray.length / 2)];
upperBound(sortedArray, target);
`,

    java: `// Upper Bound - Java
public class UpperBound {
    public static int upperBound(int[] arr, int target) {
        int left = 0, right = arr.length;
        
        while (left < right) {
            int mid = (left + right) / 2;
            if (arr[mid] <= target) {
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
        int result = upperBound(arr, target);
        System.out.println("Upper bound at index: " + result);
    }
}
`,

    python: `# Upper Bound - Python
import bisect

def upper_bound(arr, target):
    left, right = 0, len(arr)
    
    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    
    return left


arr = [1, 2, 4, 4, 4, 5, 6]
target = 4
result = upper_bound(arr, target)
print(f"Upper bound at index: {result}")

# Or use bisect_right
result2 = bisect.bisect_right(arr, target)
print(f"Using bisect_right: {result2}")
`,

    cpp: `// Upper Bound - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int upperBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    
    while (left < right) {
        int mid = (left + right) / 2;
        if (arr[mid] <= target) {
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
    
    int result = upperBound(arr, target);
    cout << "Upper bound at index: " << result << endl;
    
    // Or use std::upper_bound
    auto it = upper_bound(arr.begin(), arr.end(), target);
    cout << "Using std::upper_bound: " << (it - arr.begin()) << endl;
    
    return 0;
}
`,

    go: `// Upper Bound - Go
package main

import "fmt"

func upperBound(arr []int, target int) int {
    left, right := 0, len(arr)
    
    for left < right {
        mid := (left + right) / 2
        if arr[mid] <= target {
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
    
    result := upperBound(arr, target)
    fmt.Printf("Upper bound at index: %d\\n", result)
}
`,
  },
};
