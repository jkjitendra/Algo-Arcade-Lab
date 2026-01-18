import { AlgorithmCodeTemplates } from './types';

export const infixToPrefixCode: AlgorithmCodeTemplates = {
  algorithmId: 'infix-to-prefix',
  algorithmName: 'Infix to Prefix',
  category: 'stacks',
  templates: {
    javascript: `// Infix to Prefix Conversion - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function infixToPrefix(expr) {
  log(\`Converting infix "\${expr}" to prefix\`);
  
  // Reverse the expression and swap parentheses
  let reversed = expr.split('').reverse().map(c => {
    if (c === '(') return ')';
    if (c === ')') return '(';
    return c;
  }).join('');
  
  log(\`Reversed: "\${reversed}"\`);
  
  // Convert to postfix
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  const stack = [];
  let result = '';
  
  for (let i = 0; i < reversed.length; i++) {
    const char = reversed[i];
    visit(i);
    
    if (/[a-zA-Z0-9]/.test(char)) {
      result += char;
      mark(i, 'found');
    } else if (char === '(') {
      stack.push(char);
      mark(i, 'current');
    } else if (char === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        result += stack.pop();
      }
      stack.pop();
      mark(i, 'comparing');
    } else if (precedence[char]) {
      // Use > instead of >= for right-to-left processing
      while (stack.length && precedence[stack[stack.length - 1]] > precedence[char]) {
        result += stack.pop();
      }
      stack.push(char);
      mark(i, 'current');
    }
  }
  
  while (stack.length) {
    result += stack.pop();
  }
  
  // Reverse the result
  const prefix = result.split('').reverse().join('');
  log(\`Final prefix: "\${prefix}"\`);
  return prefix;
}

infixToPrefix("a+b*c");
`,

    java: `// Infix to Prefix Conversion - Java
import java.util.*;

public class InfixToPrefix {
    static int precedence(char c) {
        switch (c) {
            case '+': case '-': return 1;
            case '*': case '/': return 2;
            case '^': return 3;
            default: return -1;
        }
    }
    
    public static String convert(String expr) {
        // Reverse and swap parentheses
        StringBuilder sb = new StringBuilder(expr).reverse();
        for (int i = 0; i < sb.length(); i++) {
            if (sb.charAt(i) == '(') sb.setCharAt(i, ')');
            else if (sb.charAt(i) == ')') sb.setCharAt(i, '(');
        }
        
        // Convert to postfix
        StringBuilder result = new StringBuilder();
        Stack<Character> stack = new Stack<>();
        
        for (char c : sb.toString().toCharArray()) {
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
                while (!stack.isEmpty() && precedence(c) < precedence(stack.peek())) {
                    result.append(stack.pop());
                }
                stack.push(c);
            }
        }
        while (!stack.isEmpty()) result.append(stack.pop());
        
        return result.reverse().toString();
    }
    
    public static void main(String[] args) {
        System.out.println(convert("a+b*c"));
    }
}
`,

    python: `# Infix to Prefix Conversion - Python

def infix_to_prefix(expr):
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    
    # Reverse and swap parentheses
    reversed_expr = ''.join('(' if c == ')' else ')' if c == '(' else c for c in reversed(expr))
    
    stack = []
    result = []
    
    for char in reversed_expr:
        if char.isalnum():
            result.append(char)
        elif char == '(':
            stack.append(char)
        elif char == ')':
            while stack and stack[-1] != '(':
                result.append(stack.pop())
            stack.pop()
        elif char in precedence:
            while stack and stack[-1] != '(' and precedence.get(stack[-1], 0) > precedence[char]:
                result.append(stack.pop())
            stack.append(char)
    
    while stack:
        result.append(stack.pop())
    
    return ''.join(reversed(result))


print(infix_to_prefix("a+b*c"))
`,

    cpp: `// Infix to Prefix Conversion - C++
#include <iostream>
#include <stack>
#include <string>
#include <algorithm>
using namespace std;

int precedence(char c) {
    if (c == '+' || c == '-') return 1;
    if (c == '*' || c == '/') return 2;
    if (c == '^') return 3;
    return -1;
}

string infixToPrefix(string expr) {
    reverse(expr.begin(), expr.end());
    for (char& c : expr) {
        if (c == '(') c = ')';
        else if (c == ')') c = '(';
    }
    
    string result;
    stack<char> s;
    
    for (char c : expr) {
        if (isalnum(c)) result += c;
        else if (c == '(') s.push(c);
        else if (c == ')') {
            while (!s.empty() && s.top() != '(') {
                result += s.top(); s.pop();
            }
            s.pop();
        } else {
            while (!s.empty() && precedence(c) < precedence(s.top())) {
                result += s.top(); s.pop();
            }
            s.push(c);
        }
    }
    while (!s.empty()) { result += s.top(); s.pop(); }
    
    reverse(result.begin(), result.end());
    return result;
}

int main() {
    cout << infixToPrefix("a+b*c") << endl;
    return 0;
}
`,

    go: `// Infix to Prefix Conversion - Go
package main

import (
    "fmt"
    "unicode"
)

func reverseString(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func precedence(c rune) int {
    switch c {
    case '+', '-': return 1
    case '*', '/': return 2
    case '^': return 3
    default: return -1
    }
}

func infixToPrefix(expr string) string {
    // Reverse and swap
    var reversed []rune
    for _, c := range reverseString(expr) {
        if c == '(' { c = ')' } else if c == ')' { c = '(' }
        reversed = append(reversed, c)
    }
    
    var result, stack []rune
    for _, c := range reversed {
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
            for len(stack) > 0 && precedence(c) < precedence(stack[len(stack)-1]) {
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
    return reverseString(string(result))
}

func main() {
    fmt.Println(infixToPrefix("a+b*c"))
}
`,
  },
};
