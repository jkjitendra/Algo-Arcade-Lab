import { AlgorithmCodeTemplates } from './types';

export const linearSearchCode: AlgorithmCodeTemplates = {
  algorithmId: 'linear-search',
  algorithmName: 'Linear Search',
  category: 'searching',
  templates: {
    javascript: `// Linear Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function linearSearch(arr, target) {
  log(\`Searching for \${target} in array of \${arr.length} elements\`);
  
  for (let i = 0; i < arr.length; i++) {
    visit(i);
    compare(i, i);
    
    if (arr[i] === target) {
      mark(i, 'found');
      log(\`Found \${target} at index \${i}\`);
      return i;
    }
  }
  
  log(\`\${target} not found in array\`);
  return -1;
}

// Run the algorithm
const target = inputArray[Math.floor(Math.random() * inputArray.length)];
linearSearch(inputArray, target);
`,

    java: `// Linear Search - Java
public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        int target = 22;
        int result = linearSearch(arr, target);
        
        if (result == -1) {
            System.out.println("Element not found");
        } else {
            System.out.println("Element found at index: " + result);
        }
    }
}
`,

    python: `# Linear Search - Python

def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1


# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
target = 22
result = linear_search(arr, target)

if result == -1:
    print("Element not found")
else:
    print(f"Element found at index: {result}")
`,

    cpp: `// Linear Search - C++
#include <iostream>
#include <vector>
using namespace std;

int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    int target = 22;
    int result = linearSearch(arr, target);
    
    if (result == -1) {
        cout << "Element not found" << endl;
    } else {
        cout << "Element found at index: " << result << endl;
    }
    
    return 0;
}
`,

    go: `// Linear Search - Go
package main

import "fmt"

func linearSearch(arr []int, target int) int {
    for i := 0; i < len(arr); i++ {
        if arr[i] == target {
            return i
        }
    }
    return -1
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    target := 22
    result := linearSearch(arr, target)
    
    if result == -1 {
        fmt.Println("Element not found")
    } else {
        fmt.Printf("Element found at index: %d\\n", result)
    }
}
`,
  },
};
