import { AlgorithmCodeTemplates } from './types';

export const ternarySearchCode: AlgorithmCodeTemplates = {
    algorithmId: 'ternary-search',
    algorithmName: 'Ternary Search',
    category: 'searching',
    requiresSortedArray: true,
    templates: {
        javascript: `// Ternary Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Divides array into three parts instead of two

function ternarySearch(arr, target) {
  log(\`Ternary Search for \${target}\`);
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
    
    visit(mid1);
    visit(mid2);
    compare(mid1, mid2);
    log(\`Checking mid1=\${mid1} (\${arr[mid1]}) and mid2=\${mid2} (\${arr[mid2]})\`);
    
    if (arr[mid1] === target) {
      mark(mid1, 'found');
      log(\`Found \${target} at index \${mid1}\`);
      return mid1;
    }
    if (arr[mid2] === target) {
      mark(mid2, 'found');
      log(\`Found \${target} at index \${mid2}\`);
      return mid2;
    }
    
    if (target < arr[mid1]) {
      mark(mid1, 'eliminated');
      mark(mid2, 'eliminated');
      right = mid1 - 1;
    } else if (target > arr[mid2]) {
      mark(mid1, 'eliminated');
      mark(mid2, 'eliminated');
      left = mid2 + 1;
    } else {
      mark(mid1, 'eliminated');
      mark(mid2, 'eliminated');
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }
  
  log(\`\${target} not found\`);
  return -1;
}

const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = sortedArray[Math.floor(Math.random() * sortedArray.length)];
ternarySearch(sortedArray, target);
`,

        java: `// Ternary Search - Java
public class TernarySearch {
    public static int ternarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left <= right) {
            int mid1 = left + (right - left) / 3;
            int mid2 = right - (right - left) / 3;
            
            if (arr[mid1] == target) return mid1;
            if (arr[mid2] == target) return mid2;
            
            if (target < arr[mid1]) {
                right = mid1 - 1;
            } else if (target > arr[mid2]) {
                left = mid2 + 1;
            } else {
                left = mid1 + 1;
                right = mid2 - 1;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int target = 5;
        int result = ternarySearch(arr, target);
        System.out.println("Element found at index: " + result);
    }
}
`,

        python: `# Ternary Search - Python

def ternary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid1 = left + (right - left) // 3
        mid2 = right - (right - left) // 3
        
        if arr[mid1] == target:
            return mid1
        if arr[mid2] == target:
            return mid2
        
        if target < arr[mid1]:
            right = mid1 - 1
        elif target > arr[mid2]:
            left = mid2 + 1
        else:
            left = mid1 + 1
            right = mid2 - 1
    
    return -1


arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = 5
result = ternary_search(arr, target)
print(f"Element found at index: {result}")
`,

        cpp: `// Ternary Search - C++
#include <iostream>
#include <vector>
using namespace std;

int ternarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid1 = left + (right - left) / 3;
        int mid2 = right - (right - left) / 3;
        
        if (arr[mid1] == target) return mid1;
        if (arr[mid2] == target) return mid2;
        
        if (target < arr[mid1]) {
            right = mid1 - 1;
        } else if (target > arr[mid2]) {
            left = mid2 + 1;
        } else {
            left = mid1 + 1;
            right = mid2 - 1;
        }
    }
    return -1;
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int target = 5;
    int result = ternarySearch(arr, target);
    cout << "Element found at index: " << result << endl;
    return 0;
}
`,

        go: `// Ternary Search - Go
package main

import "fmt"

func ternarySearch(arr []int, target int) int {
    left, right := 0, len(arr)-1
    
    for left <= right {
        mid1 := left + (right-left)/3
        mid2 := right - (right-left)/3
        
        if arr[mid1] == target {
            return mid1
        }
        if arr[mid2] == target {
            return mid2
        }
        
        if target < arr[mid1] {
            right = mid1 - 1
        } else if target > arr[mid2] {
            left = mid2 + 1
        } else {
            left = mid1 + 1
            right = mid2 - 1
        }
    }
    return -1
}

func main() {
    arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    target := 5
    result := ternarySearch(arr, target)
    fmt.Printf("Element found at index: %d\\n", result)
}
`,
    },
};
