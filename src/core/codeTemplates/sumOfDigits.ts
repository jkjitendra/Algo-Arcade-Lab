import { AlgorithmCodeTemplates } from './types';

export const sumOfDigitsCode: AlgorithmCodeTemplates = {
  algorithmId: 'sum-of-digits',
  algorithmName: 'Sum of Digits',
  category: 'recursion',
  templates: {
    javascript: `// Sum of Digits - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function sumOfDigitsRecursive(n, depth = 0) {
  const indent = '  '.repeat(depth);
  n = Math.abs(n);
  
  log(\`\${indent}sumDigits(\${n})\`);
  visit(depth);
  mark(depth, 'current');
  
  // Base case
  if (n < 10) {
    log(\`\${indent}Base case: single digit \${n}\`);
    mark(depth, 'found');
    return n;
  }
  
  // Recursive case: last digit + sum of remaining digits
  const lastDigit = n % 10;
  const remaining = Math.floor(n / 10);
  const result = lastDigit + sumOfDigitsRecursive(remaining, depth + 1);
  
  log(\`\${indent}sumDigits(\${n}) = \${lastDigit} + sumDigits(\${remaining}) = \${result}\`);
  mark(depth, 'found');
  
  return result;
}

function sumOfDigitsIterative(n) {
  n = Math.abs(n);
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}

// Demo
const num = 12345;
log(\`Computing sum of digits of \${num}:\`);
const result = sumOfDigitsRecursive(num);
log(\`Sum of digits of \${num} = \${result}\`);
`,

    java: `// Sum of Digits - Java
public class SumOfDigits {
    public static int sumRecursive(int n) {
        n = Math.abs(n);
        if (n < 10) return n;
        return n % 10 + sumRecursive(n / 10);
    }
    
    public static int sumIterative(int n) {
        n = Math.abs(n);
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }
    
    public static void main(String[] args) {
        System.out.println("Sum of 12345: " + sumRecursive(12345));
    }
}
`,

    python: `# Sum of Digits - Python

def sum_digits_recursive(n):
    n = abs(n)
    if n < 10:
        return n
    return n % 10 + sum_digits_recursive(n // 10)

def sum_digits_iterative(n):
    n = abs(n)
    return sum(int(d) for d in str(n))

# Demo
print(f"Sum of 12345: {sum_digits_recursive(12345)}")
`,

    cpp: `// Sum of Digits - C++
#include <iostream>
#include <cstdlib>
using namespace std;

int sumRecursive(int n) {
    n = abs(n);
    if (n < 10) return n;
    return n % 10 + sumRecursive(n / 10);
}

int sumIterative(int n) {
    n = abs(n);
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}

int main() {
    cout << "Sum of 12345: " << sumRecursive(12345) << endl;
    return 0;
}
`,

    go: `// Sum of Digits - Go
package main

import "fmt"

func sumRecursive(n int) int {
    if n < 0 { n = -n }
    if n < 10 { return n }
    return n%10 + sumRecursive(n/10)
}

func sumIterative(n int) int {
    if n < 0 { n = -n }
    sum := 0
    for n > 0 {
        sum += n % 10
        n /= 10
    }
    return sum
}

func main() {
    fmt.Printf("Sum of 12345: %d\\n", sumRecursive(12345))
}
`,
  },
};
