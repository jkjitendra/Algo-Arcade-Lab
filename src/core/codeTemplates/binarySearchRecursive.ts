import { AlgorithmCodeTemplates } from './types';

export const binarySearchRecursiveCode: AlgorithmCodeTemplates = {
  algorithmId: 'binary-search-recursive',
  algorithmName: 'Binary Search Recursive',
  category: 'recursion',
  requiresSortedArray: true,
  templates: {
    javascript: `// Binary Search Recursive - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1, depth = 0) {
  const indent = '  '.repeat(depth);
  
  if (left > right) {
    log(\`\${indent}Search space exhausted, target not found\`);
    return -1;
  }
  
  const mid = Math.floor((left + right) / 2);
  visit(mid);
  compare(mid, mid);
  
  log(\`\${indent}Searching [index \${left} to \${right}], mid = \${mid}, arr[mid] = \${arr[mid]}\`);
  mark(mid, 'current');
  
  if (arr[mid] === target) {
    log(\`\${indent}Found target \${target} at index \${mid}!\`);
    mark(mid, 'found');
    return mid;
  }
  
  if (arr[mid] > target) {
    log(\`\${indent}\${arr[mid]} > \${target}, search left half\`);
    mark(mid, 'eliminated');
    return binarySearchRecursive(arr, target, left, mid - 1, depth + 1);
  } else {
    log(\`\${indent}\${arr[mid]} < \${target}, search right half\`);
    mark(mid, 'eliminated');
    return binarySearchRecursive(arr, target, mid + 1, right, depth + 1);
  }
}

// Demo
const target = inputArray[Math.floor(inputArray.length / 2)];
log(\`Searching for \${target} in sorted array:\`);
log(\`Array: [\${inputArray.join(', ')}]\`);

const result = binarySearchRecursive(inputArray, target);
log(result !== -1 ? \`Found at index \${result}\` : 'Not found');
`,

    java: `// Binary Search Recursive - Java
public class BinarySearchRecursive {
    public static int search(int[] arr, int target, int left, int right) {
        if (left > right) return -1;
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        if (arr[mid] > target) return search(arr, target, left, mid - 1);
        return search(arr, target, mid + 1, right);
    }
    
    public static int search(int[] arr, int target) {
        return search(arr, target, 0, arr.length - 1);
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15};
        System.out.println("Index of 7: " + search(arr, 7));
    }
}
`,

    python: `# Binary Search Recursive - Python

def binary_search(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, left, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, right)


arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(f"Index of 7: {binary_search(arr, 7)}")
`,

    cpp: `// Binary Search Recursive - C++
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target, int left, int right) {
    if (left > right) return -1;
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) return mid;
    if (arr[mid] > target) return binarySearch(arr, target, left, mid - 1);
    return binarySearch(arr, target, mid + 1, right);
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15};
    cout << "Index of 7: " << binarySearch(arr, 7, 0, arr.size() - 1) << endl;
    return 0;
}
`,

    go: `// Binary Search Recursive - Go
package main

import "fmt"

func binarySearch(arr []int, target, left, right int) int {
    if left > right {
        return -1
    }
    
    mid := left + (right-left)/2
    
    if arr[mid] == target {
        return mid
    } else if arr[mid] > target {
        return binarySearch(arr, target, left, mid-1)
    }
    return binarySearch(arr, target, mid+1, right)
}

func main() {
    arr := []int{1, 3, 5, 7, 9, 11, 13, 15}
    fmt.Printf("Index of 7: %d\\n", binarySearch(arr, 7, 0, len(arr)-1))
}
`,
  },
};
