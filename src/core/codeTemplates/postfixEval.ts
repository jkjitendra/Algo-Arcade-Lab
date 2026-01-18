import { AlgorithmCodeTemplates } from './types';

export const postfixEvalCode: AlgorithmCodeTemplates = {
  algorithmId: 'postfix-eval',
  algorithmName: 'Postfix Evaluation',
  category: 'stacks',
  templates: {
    javascript: `// Postfix Expression Evaluation - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function evaluatePostfix(expr) {
  log(\`Evaluating postfix expression: "\${expr}"\`);
  
  const stack = [];
  const tokens = expr.split(' ');
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    visit(i);
    
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
      mark(i, 'current');
      log(\`Push \${token}, stack: [\${stack.join(', ')}]\`);
    } else {
      const b = stack.pop();
      const a = stack.pop();
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

// Example: 2 3 + 4 * = (2+3)*4 = 20
evaluatePostfix("2 3 + 4 *");
`,

    java: `// Postfix Expression Evaluation - Java
import java.util.*;

public class PostfixEval {
    public static double evaluate(String expr) {
        Stack<Double> stack = new Stack<>();
        
        for (String token : expr.split(" ")) {
            if (token.matches("-?\\\\d+(\\\\.\\\\d+)?")) {
                stack.push(Double.parseDouble(token));
            } else {
                double b = stack.pop();
                double a = stack.pop();
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
        System.out.println("2 3 + 4 * = " + evaluate("2 3 + 4 *"));
    }
}
`,

    python: `# Postfix Expression Evaluation - Python

def evaluate_postfix(expr):
    stack = []
    
    for token in expr.split():
        if token.lstrip('-').replace('.', '').isdigit():
            stack.append(float(token))
        else:
            b, a = stack.pop(), stack.pop()
            if token == '+': stack.append(a + b)
            elif token == '-': stack.append(a - b)
            elif token == '*': stack.append(a * b)
            elif token == '/': stack.append(a / b)
            elif token == '^': stack.append(a ** b)
    
    return stack[0]


# (2+3)*4 = 20
print(f"2 3 + 4 * = {evaluate_postfix('2 3 + 4 *')}")
`,

    cpp: `// Postfix Expression Evaluation - C++
#include <iostream>
#include <stack>
#include <sstream>
#include <cmath>
using namespace std;

double evaluatePostfix(string expr) {
    stack<double> s;
    istringstream iss(expr);
    string token;
    
    while (iss >> token) {
        if (isdigit(token[0]) || (token[0] == '-' && token.length() > 1)) {
            s.push(stod(token));
        } else {
            double b = s.top(); s.pop();
            double a = s.top(); s.pop();
            if (token == "+") s.push(a + b);
            else if (token == "-") s.push(a - b);
            else if (token == "*") s.push(a * b);
            else if (token == "/") s.push(a / b);
            else if (token == "^") s.push(pow(a, b));
        }
    }
    return s.top();
}

int main() {
    cout << "2 3 + 4 * = " << evaluatePostfix("2 3 + 4 *") << endl;
    return 0;
}
`,

    go: `// Postfix Expression Evaluation - Go
package main

import (
    "fmt"
    "math"
    "strconv"
    "strings"
)

func evaluatePostfix(expr string) float64 {
    var stack []float64
    
    for _, token := range strings.Fields(expr) {
        if num, err := strconv.ParseFloat(token, 64); err == nil {
            stack = append(stack, num)
        } else {
            b := stack[len(stack)-1]
            a := stack[len(stack)-2]
            stack = stack[:len(stack)-2]
            
            var result float64
            switch token {
            case "+": result = a + b
            case "-": result = a - b
            case "*": result = a * b
            case "/": result = a / b
            case "^": result = math.Pow(a, b)
            }
            stack = append(stack, result)
        }
    }
    return stack[0]
}

func main() {
    fmt.Printf("2 3 + 4 * = %v\\n", evaluatePostfix("2 3 + 4 *"))
}
`,
  },
};
