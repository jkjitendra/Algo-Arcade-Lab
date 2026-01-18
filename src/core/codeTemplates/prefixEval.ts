import { AlgorithmCodeTemplates } from './types';

export const prefixEvalCode: AlgorithmCodeTemplates = {
  algorithmId: 'prefix-eval',
  algorithmName: 'Prefix Evaluation',
  category: 'stacks',
  templates: {
    javascript: `// Prefix Expression Evaluation - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function evaluatePrefix(expr) {
  log(\`Evaluating prefix expression: "\${expr}"\`);
  
  const stack = [];
  const tokens = expr.split(' ').reverse();
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    visit(i);
    
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
      mark(i, 'current');
      log(\`Push \${token}, stack: [\${stack.join(', ')}]\`);
    } else {
      const a = stack.pop();
      const b = stack.pop();
      let result;
      
      switch (token) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
        case '^': result = Math.pow(a, b); break;
      }
      
      stack.push(result);
      mark(i, 'found');
      log(\`\${a} \${token} \${b} = \${result}, stack: [\${stack.join(', ')}]\`);
    }
  }
  
  const finalResult = stack[0];
  log(\`Final result: \${finalResult}\`);
  return finalResult;
}

// Example: * + 2 3 4 = (2+3)*4 = 20
evaluatePrefix("* + 2 3 4");
`,

    java: `// Prefix Expression Evaluation - Java
import java.util.*;

public class PrefixEval {
    public static double evaluate(String expr) {
        Stack<Double> stack = new Stack<>();
        String[] tokens = expr.split(" ");
        
        // Process tokens in reverse order
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];
            if (token.matches("-?\\\\d+(\\\\.\\\\d+)?")) {
                stack.push(Double.parseDouble(token));
            } else {
                double a = stack.pop();
                double b = stack.pop();
                switch (token) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    case "/": stack.push(a / b); break;
                }
            }
        }
        return stack.pop();
    }
    
    public static void main(String[] args) {
        System.out.println("* + 2 3 4 = " + evaluate("* + 2 3 4"));
    }
}
`,

    python: `# Prefix Expression Evaluation - Python

def evaluate_prefix(expr):
    stack = []
    tokens = expr.split()[::-1]  # Reverse tokens
    
    for token in tokens:
        if token.lstrip('-').replace('.', '').isdigit():
            stack.append(float(token))
        else:
            a, b = stack.pop(), stack.pop()
            if token == '+': stack.append(a + b)
            elif token == '-': stack.append(a - b)
            elif token == '*': stack.append(a * b)
            elif token == '/': stack.append(a / b)
            elif token == '^': stack.append(a ** b)
    
    return stack[0]


# (2+3)*4 = 20
print(f"* + 2 3 4 = {evaluate_prefix('* + 2 3 4')}")
`,

    cpp: `// Prefix Expression Evaluation - C++
#include <iostream>
#include <stack>
#include <sstream>
#include <vector>
#include <algorithm>
using namespace std;

double evaluatePrefix(string expr) {
    stack<double> s;
    vector<string> tokens;
    istringstream iss(expr);
    string token;
    
    while (iss >> token) tokens.push_back(token);
    reverse(tokens.begin(), tokens.end());
    
    for (const string& t : tokens) {
        if (isdigit(t[0]) || (t[0] == '-' && t.length() > 1)) {
            s.push(stod(t));
        } else {
            double a = s.top(); s.pop();
            double b = s.top(); s.pop();
            if (t == "+") s.push(a + b);
            else if (t == "-") s.push(a - b);
            else if (t == "*") s.push(a * b);
            else if (t == "/") s.push(a / b);
        }
    }
    return s.top();
}

int main() {
    cout << "* + 2 3 4 = " << evaluatePrefix("* + 2 3 4") << endl;
    return 0;
}
`,

    go: `// Prefix Expression Evaluation - Go
package main

import (
    "fmt"
    "strconv"
    "strings"
)

func evaluatePrefix(expr string) float64 {
    tokens := strings.Fields(expr)
    // Reverse tokens
    for i, j := 0, len(tokens)-1; i < j; i, j = i+1, j-1 {
        tokens[i], tokens[j] = tokens[j], tokens[i]
    }
    
    var stack []float64
    for _, token := range tokens {
        if num, err := strconv.ParseFloat(token, 64); err == nil {
            stack = append(stack, num)
        } else {
            a := stack[len(stack)-1]
            b := stack[len(stack)-2]
            stack = stack[:len(stack)-2]
            
            var result float64
            switch token {
            case "+": result = a + b
            case "-": result = a - b
            case "*": result = a * b
            case "/": result = a / b
            }
            stack = append(stack, result)
        }
    }
    return stack[0]
}

func main() {
    fmt.Printf("* + 2 3 4 = %v\\n", evaluatePrefix("* + 2 3 4"))
}
`,
  },
};
