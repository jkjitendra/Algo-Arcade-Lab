import { AlgorithmCodeTemplates } from './types';

export const nextGreaterElementCode: AlgorithmCodeTemplates = {
  algorithmId: 'next-greater-element',
  algorithmName: 'Next Greater Element',
  category: 'stacks',
  templates: {
    javascript: `// Next Greater Element - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// For each element, find the next greater element to its right

function nextGreaterElement(arr) {
  log(\`Finding next greater elements for [\${arr.join(', ')}]\`);
  
  const n = arr.length;
  const result = new Array(n).fill(-1);
  const stack = []; // Stack of indices
  
  for (let i = 0; i < n; i++) {
    visit(i);
    compare(i, i);
    
    // While stack is not empty and current element is greater than stack top
    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = arr[i];
      mark(idx, 'found');
      log(\`NGE of \${arr[idx]} is \${arr[i]}\`);
    }
    
    stack.push(i);
    mark(i, 'current');
  }
  
  // Remaining elements in stack have no greater element
  while (stack.length) {
    const idx = stack.pop();
    mark(idx, 'eliminated');
    log(\`NGE of \${arr[idx]} is -1 (none)\`);
  }
  
  log(\`Result: [\${result.join(', ')}]\`);
  return result;
}

nextGreaterElement(inputArray);
`,

    java: `// Next Greater Element - Java
import java.util.*;

public class NextGreaterElement {
    public static int[] findNGE(int[] arr) {
        int n = arr.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[i] > arr[stack.peek()]) {
                result[stack.pop()] = arr[i];
            }
            stack.push(i);
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] arr = {4, 5, 2, 10, 8};
        int[] nge = findNGE(arr);
        System.out.println("NGE: " + Arrays.toString(nge));
    }
}
`,

    python: `# Next Greater Element - Python

def next_greater_element(arr):
    n = len(arr)
    result = [-1] * n
    stack = []  # Stack of indices
    
    for i in range(n):
        while stack and arr[i] > arr[stack[-1]]:
            result[stack.pop()] = arr[i]
        stack.append(i)
    
    return result


arr = [4, 5, 2, 10, 8]
print(f"NGE: {next_greater_element(arr)}")
`,

    cpp: `// Next Greater Element - C++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElement(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> s;
    
    for (int i = 0; i < n; i++) {
        while (!s.empty() && arr[i] > arr[s.top()]) {
            result[s.top()] = arr[i];
            s.pop();
        }
        s.push(i);
    }
    
    return result;
}

int main() {
    vector<int> arr = {4, 5, 2, 10, 8};
    vector<int> nge = nextGreaterElement(arr);
    cout << "NGE: ";
    for (int x : nge) cout << x << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Next Greater Element - Go
package main

import "fmt"

func nextGreaterElement(arr []int) []int {
    n := len(arr)
    result := make([]int, n)
    for i := range result {
        result[i] = -1
    }
    var stack []int
    
    for i := 0; i < n; i++ {
        for len(stack) > 0 && arr[i] > arr[stack[len(stack)-1]] {
            result[stack[len(stack)-1]] = arr[i]
            stack = stack[:len(stack)-1]
        }
        stack = append(stack, i)
    }
    
    return result
}

func main() {
    arr := []int{4, 5, 2, 10, 8}
    fmt.Printf("NGE: %v\\n", nextGreaterElement(arr))
}
`,
  },
};
