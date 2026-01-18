import { AlgorithmCodeTemplates } from './types';

export const fibonacciSearchCode: AlgorithmCodeTemplates = {
    algorithmId: 'fibonacci-search',
    algorithmName: 'Fibonacci Search',
    category: 'searching',
    requiresSortedArray: true,
    templates: {
        javascript: `// Fibonacci Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Uses Fibonacci numbers to divide the array

function fibonacciSearch(arr, target) {
  const n = arr.length;
  log(\`Fibonacci Search for \${target} in array of \${n} elements\`);
  
  // Initialize Fibonacci numbers
  let fibM2 = 0; // (m-2)th Fibonacci
  let fibM1 = 1; // (m-1)th Fibonacci
  let fibM = fibM1 + fibM2; // mth Fibonacci
  
  // Find smallest Fibonacci >= n
  while (fibM < n) {
    fibM2 = fibM1;
    fibM1 = fibM;
    fibM = fibM1 + fibM2;
  }
  
  log(\`Using Fibonacci number \${fibM}\`);
  
  let offset = -1;
  
  while (fibM > 1) {
    const i = Math.min(offset + fibM2, n - 1);
    visit(i);
    compare(i, i);
    log(\`Checking index \${i}, value = \${arr[i]}\`);
    
    if (arr[i] < target) {
      mark(i, 'eliminated');
      fibM = fibM1;
      fibM1 = fibM2;
      fibM2 = fibM - fibM1;
      offset = i;
    } else if (arr[i] > target) {
      mark(i, 'eliminated');
      fibM = fibM2;
      fibM1 = fibM1 - fibM2;
      fibM2 = fibM - fibM1;
    } else {
      mark(i, 'found');
      log(\`Found \${target} at index \${i}\`);
      return i;
    }
  }
  
  if (fibM1 && offset + 1 < n && arr[offset + 1] === target) {
    mark(offset + 1, 'found');
    log(\`Found \${target} at index \${offset + 1}\`);
    return offset + 1;
  }
  
  log(\`\${target} not found\`);
  return -1;
}

const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = sortedArray[Math.floor(Math.random() * sortedArray.length)];
fibonacciSearch(sortedArray, target);
`,

        java: `// Fibonacci Search - Java
public class FibonacciSearch {
    public static int fibonacciSearch(int[] arr, int target) {
        int n = arr.length;
        int fibM2 = 0;
        int fibM1 = 1;
        int fibM = fibM1 + fibM2;
        
        while (fibM < n) {
            fibM2 = fibM1;
            fibM1 = fibM;
            fibM = fibM1 + fibM2;
        }
        
        int offset = -1;
        
        while (fibM > 1) {
            int i = Math.min(offset + fibM2, n - 1);
            
            if (arr[i] < target) {
                fibM = fibM1;
                fibM1 = fibM2;
                fibM2 = fibM - fibM1;
                offset = i;
            } else if (arr[i] > target) {
                fibM = fibM2;
                fibM1 = fibM1 - fibM2;
                fibM2 = fibM - fibM1;
            } else {
                return i;
            }
        }
        
        if (fibM1 == 1 && arr[offset + 1] == target) {
            return offset + 1;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100};
        int target = 85;
        int result = fibonacciSearch(arr, target);
        System.out.println("Element found at index: " + result);
    }
}
`,

        python: `# Fibonacci Search - Python

def fibonacci_search(arr, target):
    n = len(arr)
    fib_m2 = 0
    fib_m1 = 1
    fib_m = fib_m1 + fib_m2
    
    while fib_m < n:
        fib_m2 = fib_m1
        fib_m1 = fib_m
        fib_m = fib_m1 + fib_m2
    
    offset = -1
    
    while fib_m > 1:
        i = min(offset + fib_m2, n - 1)
        
        if arr[i] < target:
            fib_m = fib_m1
            fib_m1 = fib_m2
            fib_m2 = fib_m - fib_m1
            offset = i
        elif arr[i] > target:
            fib_m = fib_m2
            fib_m1 = fib_m1 - fib_m2
            fib_m2 = fib_m - fib_m1
        else:
            return i
    
    if fib_m1 and offset + 1 < n and arr[offset + 1] == target:
        return offset + 1
    
    return -1


arr = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100]
target = 85
result = fibonacci_search(arr, target)
print(f"Element found at index: {result}")
`,

        cpp: `// Fibonacci Search - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int fibonacciSearch(vector<int>& arr, int target) {
    int n = arr.size();
    int fibM2 = 0;
    int fibM1 = 1;
    int fibM = fibM1 + fibM2;
    
    while (fibM < n) {
        fibM2 = fibM1;
        fibM1 = fibM;
        fibM = fibM1 + fibM2;
    }
    
    int offset = -1;
    
    while (fibM > 1) {
        int i = min(offset + fibM2, n - 1);
        
        if (arr[i] < target) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibM2;
            fibM1 = fibM1 - fibM2;
            fibM2 = fibM - fibM1;
        } else {
            return i;
        }
    }
    
    if (fibM1 && offset + 1 < n && arr[offset + 1] == target) {
        return offset + 1;
    }
    return -1;
}

int main() {
    vector<int> arr = {10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100};
    int target = 85;
    int result = fibonacciSearch(arr, target);
    cout << "Element found at index: " << result << endl;
    return 0;
}
`,

        go: `// Fibonacci Search - Go
package main

import "fmt"

func fibonacciSearch(arr []int, target int) int {
    n := len(arr)
    fibM2 := 0
    fibM1 := 1
    fibM := fibM1 + fibM2
    
    for fibM < n {
        fibM2 = fibM1
        fibM1 = fibM
        fibM = fibM1 + fibM2
    }
    
    offset := -1
    
    for fibM > 1 {
        i := min(offset+fibM2, n-1)
        
        if arr[i] < target {
            fibM = fibM1
            fibM1 = fibM2
            fibM2 = fibM - fibM1
            offset = i
        } else if arr[i] > target {
            fibM = fibM2
            fibM1 = fibM1 - fibM2
            fibM2 = fibM - fibM1
        } else {
            return i
        }
    }
    
    if fibM1 == 1 && offset+1 < n && arr[offset+1] == target {
        return offset + 1
    }
    return -1
}

func main() {
    arr := []int{10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100}
    target := 85
    result := fibonacciSearch(arr, target)
    fmt.Printf("Element found at index: %d\\n", result)
}
`,
    },
};
