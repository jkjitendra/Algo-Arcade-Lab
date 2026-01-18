import { AlgorithmCodeTemplates } from './types';

export const matrixBinarySearchCode: AlgorithmCodeTemplates = {
    algorithmId: 'matrix-binary-search',
    algorithmName: 'Matrix Binary Search',
    category: 'searching',
    requiresSortedArray: true,
    templates: {
        javascript: `// Search in 2D Matrix - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Matrix where each row is sorted and first element > last of prev row

function searchMatrix(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;
  
  const m = matrix.length;
  const n = matrix[0].length;
  log(\`Searching for \${target} in \${m}x\${n} matrix\`);
  
  // Treat matrix as 1D sorted array
  let left = 0;
  let right = m * n - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const value = matrix[row][col];
    
    // For visualization, use flattened index
    visit(mid);
    compare(mid, mid);
    log(\`Checking [\${row}][\${col}] = \${value}\`);
    
    if (value === target) {
      mark(mid, 'found');
      log(\`Found \${target} at [\${row}][\${col}]\`);
      return true;
    } else if (value < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  log(\`\${target} not found in matrix\`);
  return false;
}

// Flatten array for visualization
const flattened = inputArray;
const cols = Math.ceil(Math.sqrt(flattened.length));
const target = flattened[Math.floor(Math.random() * flattened.length)];
log(\`Demo: Using flattened array as 1D search\`);

// Binary search on the flattened array
let left = 0, right = flattened.length - 1;
const sorted = [...flattened].sort((a, b) => a - b);
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  visit(mid);
  compare(mid, mid);
  if (sorted[mid] === target) {
    mark(mid, 'found');
    log(\`Found \${target} at index \${mid}\`);
    break;
  } else if (sorted[mid] < target) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}
`,

        java: `// Search in 2D Matrix - Java
public class MatrixBinarySearch {
    public static boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0 || matrix[0].length == 0) return false;
        
        int m = matrix.length;
        int n = matrix[0].length;
        int left = 0, right = m * n - 1;
        
        while (left <= right) {
            int mid = (left + right) / 2;
            int row = mid / n;
            int col = mid % n;
            int value = matrix[row][col];
            
            if (value == target) {
                return true;
            } else if (value < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
    
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 3, 5, 7},
            {10, 11, 16, 20},
            {23, 30, 34, 60}
        };
        System.out.println("Search 3: " + searchMatrix(matrix, 3));
        System.out.println("Search 13: " + searchMatrix(matrix, 13));
    }
}
`,

        python: `# Search in 2D Matrix - Python

def search_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False
    
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1
    
    while left <= right:
        mid = (left + right) // 2
        row, col = mid // n, mid % n
        value = matrix[row][col]
        
        if value == target:
            return True
        elif value < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return False


matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60]
]
print(f"Search 3: {search_matrix(matrix, 3)}")
print(f"Search 13: {search_matrix(matrix, 13)}")
`,

        cpp: `// Search in 2D Matrix - C++
#include <iostream>
#include <vector>
using namespace std;

bool searchMatrix(vector<vector<int>>& matrix, int target) {
    if (matrix.empty() || matrix[0].empty()) return false;
    
    int m = matrix.size();
    int n = matrix[0].size();
    int left = 0, right = m * n - 1;
    
    while (left <= right) {
        int mid = (left + right) / 2;
        int row = mid / n;
        int col = mid % n;
        int value = matrix[row][col];
        
        if (value == target) {
            return true;
        } else if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
}

int main() {
    vector<vector<int>> matrix = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };
    cout << "Search 3: " << (searchMatrix(matrix, 3) ? "true" : "false") << endl;
    cout << "Search 13: " << (searchMatrix(matrix, 13) ? "true" : "false") << endl;
    return 0;
}
`,

        go: `// Search in 2D Matrix - Go
package main

import "fmt"

func searchMatrix(matrix [][]int, target int) bool {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return false
    }
    
    m, n := len(matrix), len(matrix[0])
    left, right := 0, m*n-1
    
    for left <= right {
        mid := (left + right) / 2
        row, col := mid/n, mid%n
        value := matrix[row][col]
        
        if value == target {
            return true
        } else if value < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return false
}

func main() {
    matrix := [][]int{
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60},
    }
    fmt.Printf("Search 3: %v\\n", searchMatrix(matrix, 3))
    fmt.Printf("Search 13: %v\\n", searchMatrix(matrix, 13))
}
`,
    },
};
