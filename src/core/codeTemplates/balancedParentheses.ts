import { AlgorithmCodeTemplates } from './types';

export const balancedParenthesesCode: AlgorithmCodeTemplates = {
  algorithmId: 'balanced-parentheses',
  algorithmName: 'Balanced Parentheses',
  category: 'stacks',
  templates: {
    javascript: `// Balanced Parentheses Check - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function isBalanced(str) {
  log(\`Checking if "\${str}" has balanced parentheses\`);
  
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };
  const opening = new Set(['(', '{', '[']);
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    visit(i);
    
    if (opening.has(char)) {
      stack.push(char);
      mark(i, 'current');
      log(\`Push '\${char}', stack: [\${stack.join(', ')}]\`);
    } else if (pairs[char]) {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        mark(i, 'eliminated');
        log(\`Unmatched '\${char}' at index \${i}\`);
        return false;
      }
      stack.pop();
      mark(i, 'found');
      log(\`Match '\${char}', stack: [\${stack.join(', ')}]\`);
    }
  }
  
  const result = stack.length === 0;
  log(\`Result: \${result ? 'Balanced' : 'Not Balanced'}\`);
  return result;
}

// Test cases
isBalanced("{[()]}");
`,

    java: `// Balanced Parentheses Check - Java
import java.util.*;

public class BalancedParentheses {
    public static boolean isBalanced(String str) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> pairs = Map.of(')', '(', '}', '{', ']', '[');
        
        for (char c : str.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else if (pairs.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != pairs.get(c)) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
    
    public static void main(String[] args) {
        System.out.println("{[()]}: " + isBalanced("{[()]}"));
        System.out.println("{[(])}: " + isBalanced("{[(])}"));
    }
}
`,

    python: `# Balanced Parentheses Check - Python

def is_balanced(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in '({[':
            stack.append(char)
        elif char in pairs:
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
    
    return len(stack) == 0


print(f"{{[()]}}: {is_balanced('{[()]}')}")
print(f"{{[(])}}: {is_balanced('{[(])}')}")
`,

    cpp: `// Balanced Parentheses Check - C++
#include <iostream>
#include <stack>
#include <string>
#include <unordered_map>
using namespace std;

bool isBalanced(string str) {
    stack<char> s;
    unordered_map<char, char> pairs = {{')', '('}, {'}', '{'}, {']', '['}};
    
    for (char c : str) {
        if (c == '(' || c == '{' || c == '[') {
            s.push(c);
        } else if (pairs.count(c)) {
            if (s.empty() || s.top() != pairs[c]) return false;
            s.pop();
        }
    }
    
    return s.empty();
}

int main() {
    cout << "{[()]}: " << (isBalanced("{[()]}") ? "true" : "false") << endl;
    cout << "{[(])}: " << (isBalanced("{[(])}") ? "true" : "false") << endl;
    return 0;
}
`,

    go: `// Balanced Parentheses Check - Go
package main

import "fmt"

func isBalanced(s string) bool {
    var stack []rune
    pairs := map[rune]rune{')': '(', '}': '{', ']': '['}
    
    for _, c := range s {
        switch c {
        case '(', '{', '[':
            stack = append(stack, c)
        case ')', '}', ']':
            if len(stack) == 0 || stack[len(stack)-1] != pairs[c] {
                return false
            }
            stack = stack[:len(stack)-1]
        }
    }
    
    return len(stack) == 0
}

func main() {
    fmt.Printf("{[()]}: %v\\n", isBalanced("{[()]}"))
    fmt.Printf("{[(])}: %v\\n", isBalanced("{[(])}"))
}
`,
  },
};
