import { AlgorithmCodeTemplates } from './types';

export const exponentialSearchCode: AlgorithmCodeTemplates = {
    algorithmId: 'exponential-search',
    algorithmName: 'Exponential Search',
    category: 'searching',
    requiresSortedArray: true,
    templates: {
        javascript: `// Exponential Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Combines exponential bound finding with binary search

function exponentialSearch(arr, target) {
  const n = arr.length;
  log(\`Exponential Search for \${target}\`);
  
  // If target is at first position
  if (arr[0] === target) {
    visit(0);
    mark(0, 'found');
    log(\`Found \${target} at index 0\`);
    return 0;
  }
  
  // Find range for binary search by repeated doubling
  let i = 1;
  while (i < n && arr[i] <= target) {
    visit(i);
    compare(i, i);
    log(\`Exponential: checking index \${i}, value = \${arr[i]}\`);
    i *= 2;
  }
  
  // Binary search in the found range
  const left = Math.floor(i / 2);
  const right = Math.min(i, n - 1);
  log(\`Binary search in range [\${left}, \${right}]\`);
  
  let lo = left, hi = right;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    visit(mid);
    compare(mid, mid);
    
    if (arr[mid] === target) {
      mark(mid, 'found');
      log(\`Found \${target} at index \${mid}\`);
      return mid;
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  
  log(\`\${target} not found\`);
  return -1;
}

const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = sortedArray[Math.floor(Math.random() * sortedArray.length)];
exponentialSearch(sortedArray, target);
`,

        java: `// Exponential Search - Java
public class ExponentialSearch {
    public static int binarySearch(int[] arr, int left, int right, int target) {
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    
    public static int exponentialSearch(int[] arr, int target) {
        int n = arr.length;
        if (arr[0] == target) return 0;
        
        int i = 1;
        while (i < n && arr[i] <= target) {
            i *= 2;
        }
        
        return binarySearch(arr, i / 2, Math.min(i, n - 1), target);
    }
    
    public static void main(String[] args) {
        int[] arr = {2, 3, 4, 10, 40, 50, 60, 70};
        int target = 10;
        int result = exponentialSearch(arr, target);
        System.out.println("Element found at index: " + result);
    }
}
`,

        python: `# Exponential Search - Python

def binary_search(arr, left, right, target):
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

def exponential_search(arr, target):
    n = len(arr)
    if arr[0] == target:
        return 0
    
    i = 1
    while i < n and arr[i] <= target:
        i *= 2
    
    return binary_search(arr, i // 2, min(i, n - 1), target)


arr = [2, 3, 4, 10, 40, 50, 60, 70]
target = 10
result = exponential_search(arr, target)
print(f"Element found at index: {result}")
`,

        cpp: `// Exponential Search - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int binarySearch(vector<int>& arr, int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int exponentialSearch(vector<int>& arr, int target) {
    int n = arr.size();
    if (arr[0] == target) return 0;
    
    int i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    
    return binarySearch(arr, i / 2, min(i, n - 1), target);
}

int main() {
    vector<int> arr = {2, 3, 4, 10, 40, 50, 60, 70};
    int target = 10;
    int result = exponentialSearch(arr, target);
    cout << "Element found at index: " << result << endl;
    return 0;
}
`,

        go: `// Exponential Search - Go
package main

import "fmt"

func binarySearch(arr []int, left, right, target int) int {
    for left <= right {
        mid := left + (right-left)/2
        if arr[mid] == target {
            return mid
        }
        if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}

func exponentialSearch(arr []int, target int) int {
    n := len(arr)
    if arr[0] == target {
        return 0
    }
    
    i := 1
    for i < n && arr[i] <= target {
        i *= 2
    }
    
    return binarySearch(arr, i/2, min(i, n-1), target)
}

func main() {
    arr := []int{2, 3, 4, 10, 40, 50, 60, 70}
    target := 10
    result := exponentialSearch(arr, target)
    fmt.Printf("Element found at index: %d\\n", result)
}
`,
    },
};
