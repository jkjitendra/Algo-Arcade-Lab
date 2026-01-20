import { AlgorithmCodeTemplates } from './types';

export const factorialCode: AlgorithmCodeTemplates = {
  algorithmId: 'factorial',
  algorithmName: 'Factorial',
  category: 'recursion',
  templates: {
    javascript: `// Factorial - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function factorialRecursive(n, depth = 0) {
  const indent = '  '.repeat(depth);
  log(\`\${indent}factorial(\${n}) called\`);
  visit(depth);
  mark(depth, 'current');
  
  // Base case
  if (n <= 1) {
    log(\`\${indent}Base case: factorial(\${n}) = 1\`);
    mark(depth, 'found');
    return 1;
  }
  
  // Recursive case
  const result = n * factorialRecursive(n - 1, depth + 1);
  log(\`\${indent}factorial(\${n}) = \${n} * factorial(\${n-1}) = \${result}\`);
  mark(depth, 'found');
  
  return result;
}

function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Demo
const n = 5;
log(\`Computing \${n}! recursively:\`);
const result = factorialRecursive(n);
log(\`\${n}! = \${result}\`);
`,

    java: `// Factorial - Java
public class Factorial {
    public static long factorialRecursive(int n) {
        if (n <= 1) return 1;
        return n * factorialRecursive(n - 1);
    }
    
    public static long factorialIterative(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) result *= i;
        return result;
    }
    
    public static void main(String[] args) {
        System.out.println("5! = " + factorialRecursive(5));
        System.out.println("10! = " + factorialIterative(10));
    }
}
`,

    python: `# Factorial - Python

def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)

def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Demo
print(f"5! = {factorial_recursive(5)}")
print(f"10! = {factorial_iterative(10)}")
`,

    cpp: `// Factorial - C++
#include <iostream>
using namespace std;

long long factorialRecursive(int n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);
}

long long factorialIterative(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

int main() {
    cout << "5! = " << factorialRecursive(5) << endl;
    cout << "10! = " << factorialIterative(10) << endl;
    return 0;
}
`,

    go: `// Factorial - Go
package main

import "fmt"

func factorialRecursive(n int) int64 {
    if n <= 1 {
        return 1
    }
    return int64(n) * factorialRecursive(n-1)
}

func factorialIterative(n int) int64 {
    result := int64(1)
    for i := 2; i <= n; i++ {
        result *= int64(i)
    }
    return result
}

func main() {
    fmt.Printf("5! = %d\\n", factorialRecursive(5))
    fmt.Printf("10! = %d\\n", factorialIterative(10))
}
`,
  },
};
