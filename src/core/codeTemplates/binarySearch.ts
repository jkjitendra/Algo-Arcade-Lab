import { AlgorithmCodeTemplates } from './types';

export const binarySearchCode: AlgorithmCodeTemplates = {
  algorithmId: 'binary-search',
  algorithmName: 'Binary Search',
  category: 'searching',
  templates: {
    javascript: `// Binary Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Note: Array must be sorted for binary search to work!

function binarySearch(arr, target) {
  log(\`Binary Search for \${target} in sorted array of \${arr.length} elements\`);
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    visit(mid);
    log(\`Checking middle index \${mid}, value = \${arr[mid]}\`);
    
    compare(mid, mid);
    
    if (arr[mid] === target) {
      mark(mid, 'found');
      log(\`Found \${target} at index \${mid}\`);
      return mid;
    } else if (arr[mid] < target) {
      mark(mid, 'eliminated');
      log(\`\${arr[mid]} < \${target}, searching right half\`);
      left = mid + 1;
    } else {
      mark(mid, 'eliminated');
      log(\`\${arr[mid]} > \${target}, searching left half\`);
      right = mid - 1;
    }
  }
  
  log(\`\${target} not found in array\`);
  return -1;
}

// Sort array first, then search
const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = sortedArray[Math.floor(Math.random() * sortedArray.length)];
binarySearch(sortedArray, target);
`,

    java: `// Binary Search - Java
public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {11, 12, 22, 25, 34, 64, 90};  // Must be sorted
        int target = 22;
        int result = binarySearch(arr, target);
        
        if (result == -1) {
            System.out.println("Element not found");
        } else {
            System.out.println("Element found at index: " + result);
        }
    }
}
`,

    python: `# Binary Search - Python

def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1


# Example usage (array must be sorted)
arr = [11, 12, 22, 25, 34, 64, 90]
target = 22
result = binary_search(arr, target)

if result == -1:
    print("Element not found")
else:
    print(f"Element found at index: {result}")
`,

    cpp: `// Binary Search - C++
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

int main() {
    vector<int> arr = {11, 12, 22, 25, 34, 64, 90};  // Must be sorted
    int target = 22;
    int result = binarySearch(arr, target);
    
    if (result == -1) {
        cout << "Element not found" << endl;
    } else {
        cout << "Element found at index: " << result << endl;
    }
    
    return 0;
}
`,

    go: `// Binary Search - Go
package main

import "fmt"

func binarySearch(arr []int, target int) int {
    left, right := 0, len(arr)-1
    
    for left <= right {
        mid := left + (right-left)/2
        
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}

func main() {
    arr := []int{11, 12, 22, 25, 34, 64, 90}  // Must be sorted
    target := 22
    result := binarySearch(arr, target)
    
    if result == -1 {
        fmt.Println("Element not found")
    } else {
        fmt.Printf("Element found at index: %d\\n", result)
    }
}
`,
  },
};
