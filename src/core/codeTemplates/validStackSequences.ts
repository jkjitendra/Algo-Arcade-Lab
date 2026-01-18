import { AlgorithmCodeTemplates } from './types';

export const validStackSequencesCode: AlgorithmCodeTemplates = {
  algorithmId: 'valid-stack-sequences',
  algorithmName: 'Valid Stack Sequences',
  category: 'stacks',
  templates: {
    javascript: `// Valid Stack Sequences - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Check if popped sequence is valid given pushed sequence

function validateStackSequences(pushed, popped) {
  log(\`Pushed: [\${pushed.join(', ')}]\`);
  log(\`Popped: [\${popped.join(', ')}]\`);
  
  const stack = [];
  let j = 0;
  
  for (let i = 0; i < pushed.length; i++) {
    visit(i);
    stack.push(pushed[i]);
    mark(i, 'current');
    log(\`Push \${pushed[i]}, stack: [\${stack.join(', ')}]\`);
    
    // Pop elements that match the popped sequence
    while (stack.length && stack[stack.length - 1] === popped[j]) {
      const val = stack.pop();
      mark(j, 'found');
      log(\`Pop \${val}, matches popped[\${j}]\`);
      j++;
    }
  }
  
  const result = j === popped.length;
  log(\`Valid sequence: \${result}\`);
  return result;
}

// Example: Valid sequence
validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]);
`,

    java: `// Valid Stack Sequences - Java
import java.util.*;

public class ValidStackSequences {
    public static boolean validateStackSequences(int[] pushed, int[] popped) {
        Stack<Integer> stack = new Stack<>();
        int j = 0;
        
        for (int val : pushed) {
            stack.push(val);
            while (!stack.isEmpty() && stack.peek() == popped[j]) {
                stack.pop();
                j++;
            }
        }
        
        return j == popped.length;
    }
    
    public static void main(String[] args) {
        int[] pushed = {1, 2, 3, 4, 5};
        int[] popped = {4, 5, 3, 2, 1};
        System.out.println("Valid: " + validateStackSequences(pushed, popped));
        
        int[] popped2 = {4, 3, 5, 1, 2};
        System.out.println("Valid: " + validateStackSequences(pushed, popped2));
    }
}
`,

    python: `# Valid Stack Sequences - Python

def validate_stack_sequences(pushed, popped):
    stack = []
    j = 0
    
    for val in pushed:
        stack.append(val)
        while stack and stack[-1] == popped[j]:
            stack.pop()
            j += 1
    
    return j == len(popped)


pushed = [1, 2, 3, 4, 5]
print(f"[4,5,3,2,1]: {validate_stack_sequences(pushed, [4, 5, 3, 2, 1])}")
print(f"[4,3,5,1,2]: {validate_stack_sequences(pushed, [4, 3, 5, 1, 2])}")
`,

    cpp: `// Valid Stack Sequences - C++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
    stack<int> s;
    int j = 0;
    
    for (int val : pushed) {
        s.push(val);
        while (!s.empty() && s.top() == popped[j]) {
            s.pop();
            j++;
        }
    }
    
    return j == popped.size();
}

int main() {
    vector<int> pushed = {1, 2, 3, 4, 5};
    vector<int> popped1 = {4, 5, 3, 2, 1};
    vector<int> popped2 = {4, 3, 5, 1, 2};
    
    cout << "[4,5,3,2,1]: " << (validateStackSequences(pushed, popped1) ? "true" : "false") << endl;
    cout << "[4,3,5,1,2]: " << (validateStackSequences(pushed, popped2) ? "true" : "false") << endl;
    return 0;
}
`,

    go: `// Valid Stack Sequences - Go
package main

import "fmt"

func validateStackSequences(pushed, popped []int) bool {
    var stack []int
    j := 0
    
    for _, val := range pushed {
        stack = append(stack, val)
        for len(stack) > 0 && stack[len(stack)-1] == popped[j] {
            stack = stack[:len(stack)-1]
            j++
        }
    }
    
    return j == len(popped)
}

func main() {
    pushed := []int{1, 2, 3, 4, 5}
    fmt.Printf("[4,5,3,2,1]: %v\\n", validateStackSequences(pushed, []int{4, 5, 3, 2, 1}))
    fmt.Printf("[4,3,5,1,2]: %v\\n", validateStackSequences(pushed, []int{4, 3, 5, 1, 2}))
}
`,
  },
};
