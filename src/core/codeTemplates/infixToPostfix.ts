import { AlgorithmCodeTemplates } from './types';

export const infixToPostfixCode: AlgorithmCodeTemplates = {
  algorithmId: 'infix-to-postfix',
  algorithmName: 'Infix to Postfix',
  category: 'stacks',
  templates: {
    javascript: `// Infix to Postfix Conversion - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function infixToPostfix(expr) {
  log(\`Converting infix "\${expr}" to postfix\`);
  
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  const stack = [];
  let result = '';
  
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    visit(i);
    
    if (/[a-zA-Z0-9]/.test(char)) {
      result += char;
      mark(i, 'found');
      log(\`Operand '\${char}' -> output: "\${result}"\`);
    } else if (char === '(') {
      stack.push(char);
      mark(i, 'current');
      log(\`Push '(' to stack\`);
    } else if (char === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        result += stack.pop();
      }
      stack.pop(); // Remove '('
      mark(i, 'comparing');
      log(\`Pop until '(', output: "\${result}"\`);
    } else if (precedence[char]) {
      while (stack.length && 
             precedence[stack[stack.length - 1]] >= precedence[char]) {
        result += stack.pop();
      }
      stack.push(char);
      mark(i, 'current');
      log(\`Operator '\${char}', stack: [\${stack.join(', ')}], output: "\${result}"\`);
    }
  }
  
  while (stack.length) {
    result += stack.pop();
  }
  
  log(\`Final postfix: "\${result}"\`);
  return result;
}

infixToPostfix("a+b*(c^d-e)");
`,

    java: `// Infix to Postfix Conversion - Java
import java.util.*;

public class InfixToPostfix {
    static int precedence(char c) {
        switch (c) {
            case '+': case '-': return 1;
            case '*': case '/': return 2;
            case '^': return 3;
            default: return -1;
        }
    }
    
    public static String convert(String expr) {
        StringBuilder result = new StringBuilder();
        Stack<Character> stack = new Stack<>();
        
        for (char c : expr.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                result.append(c);
            } else if (c == '(') {
                stack.push(c);
            } else if (c == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result.append(stack.pop());
                }
                stack.pop();
            } else {
                while (!stack.isEmpty() && precedence(c) <= precedence(stack.peek())) {
                    result.append(stack.pop());
                }
                stack.push(c);
            }
        }
        
        while (!stack.isEmpty()) result.append(stack.pop());
        return result.toString();
    }
    
    public static void main(String[] args) {
        System.out.println(convert("a+b*(c^d-e)"));
    }
}
`,

    python: `# Infix to Postfix Conversion - Python

def infix_to_postfix(expr):
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    stack = []
    result = []
    
    for char in expr:
        if char.isalnum():
            result.append(char)
        elif char == '(':
            stack.append(char)
        elif char == ')':
            while stack and stack[-1] != '(':
                result.append(stack.pop())
            stack.pop()
        elif char in precedence:
            while stack and stack[-1] != '(' and precedence.get(stack[-1], 0) >= precedence[char]:
                result.append(stack.pop())
            stack.append(char)
    
    while stack:
        result.append(stack.pop())
    
    return ''.join(result)


print(infix_to_postfix("a+b*(c^d-e)"))
`,

    cpp: `// Infix to Postfix Conversion - C++
#include <iostream>
#include <stack>
#include <string>
using namespace std;

int precedence(char c) {
    if (c == '+' || c == '-') return 1;
    if (c == '*' || c == '/') return 2;
    if (c == '^') return 3;
    return -1;
}

string infixToPostfix(string expr) {
    string result;
    stack<char> s;
    
    for (char c : expr) {
        if (isalnum(c)) {
            result += c;
        } else if (c == '(') {
            s.push(c);
        } else if (c == ')') {
            while (!s.empty() && s.top() != '(') {
                result += s.top(); s.pop();
            }
            s.pop();
        } else {
            while (!s.empty() && precedence(c) <= precedence(s.top())) {
                result += s.top(); s.pop();
            }
            s.push(c);
        }
    }
    while (!s.empty()) { result += s.top(); s.pop(); }
    return result;
}

int main() {
    cout << infixToPostfix("a+b*(c^d-e)") << endl;
    return 0;
}
`,

    go: `// Infix to Postfix Conversion - Go
package main

import (
    "fmt"
    "unicode"
)

func precedence(c rune) int {
    switch c {
    case '+', '-': return 1
    case '*', '/': return 2
    case '^': return 3
    default: return -1
    }
}

func infixToPostfix(expr string) string {
    var result []rune
    var stack []rune
    
    for _, c := range expr {
        if unicode.IsLetter(c) || unicode.IsDigit(c) {
            result = append(result, c)
        } else if c == '(' {
            stack = append(stack, c)
        } else if c == ')' {
            for len(stack) > 0 && stack[len(stack)-1] != '(' {
                result = append(result, stack[len(stack)-1])
                stack = stack[:len(stack)-1]
            }
            stack = stack[:len(stack)-1]
        } else {
            for len(stack) > 0 && precedence(c) <= precedence(stack[len(stack)-1]) {
                result = append(result, stack[len(stack)-1])
                stack = stack[:len(stack)-1]
            }
            stack = append(stack, c)
        }
    }
    for len(stack) > 0 {
        result = append(result, stack[len(stack)-1])
        stack = stack[:len(stack)-1]
    }
    return string(result)
}

func main() {
    fmt.Println(infixToPostfix("a+b*(c^d-e)"))
}
`,
  },
};
