import { AlgorithmCodeTemplates } from './types';

export const gcdCode: AlgorithmCodeTemplates = {
  algorithmId: 'gcd',
  algorithmName: 'GCD (Greatest Common Divisor)',
  category: 'recursion',
  templates: {
    javascript: `// GCD (Greatest Common Divisor) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Using Euclidean Algorithm

function gcdRecursive(a, b, depth = 0) {
  const indent = '  '.repeat(depth);
  log(\`\${indent}gcd(\${a}, \${b})\`);
  visit(depth);
  mark(depth, 'current');
  
  // Base case
  if (b === 0) {
    log(\`\${indent}Base case: b = 0, gcd = \${a}\`);
    mark(depth, 'found');
    return a;
  }
  
  // Recursive case: gcd(a, b) = gcd(b, a % b)
  const result = gcdRecursive(b, a % b, depth + 1);
  log(\`\${indent}gcd(\${a}, \${b}) = \${result}\`);
  mark(depth, 'found');
  
  return result;
}

function gcdIterative(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcdRecursive(a, b);
}

// Demo
log('Computing GCD(48, 18):');
const result = gcdRecursive(48, 18);
log(\`GCD(48, 18) = \${result}\`);
log(\`LCM(48, 18) = \${lcm(48, 18)}\`);
`,

    java: `// GCD (Greatest Common Divisor) - Java
public class GCD {
    public static int gcdRecursive(int a, int b) {
        if (b == 0) return a;
        return gcdRecursive(b, a % b);
    }
    
    public static int gcdIterative(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    public static int lcm(int a, int b) {
        return (a * b) / gcdRecursive(a, b);
    }
    
    public static void main(String[] args) {
        System.out.println("GCD(48, 18) = " + gcdRecursive(48, 18));
        System.out.println("LCM(48, 18) = " + lcm(48, 18));
    }
}
`,

    python: `# GCD (Greatest Common Divisor) - Python
import math

def gcd_recursive(a, b):
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

def gcd_iterative(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return (a * b) // gcd_recursive(a, b)

# Demo
print(f"GCD(48, 18) = {gcd_recursive(48, 18)}")
print(f"LCM(48, 18) = {lcm(48, 18)}")
print(f"Using math.gcd: {math.gcd(48, 18)}")
`,

    cpp: `// GCD (Greatest Common Divisor) - C++
#include <iostream>
#include <algorithm>
using namespace std;

int gcdRecursive(int a, int b) {
    if (b == 0) return a;
    return gcdRecursive(b, a % b);
}

int gcdIterative(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int lcm(int a, int b) {
    return (a * b) / gcdRecursive(a, b);
}

int main() {
    cout << "GCD(48, 18) = " << gcdRecursive(48, 18) << endl;
    cout << "LCM(48, 18) = " << lcm(48, 18) << endl;
    cout << "Using __gcd: " << __gcd(48, 18) << endl;
    return 0;
}
`,

    go: `// GCD (Greatest Common Divisor) - Go
package main

import "fmt"

func gcdRecursive(a, b int) int {
    if b == 0 {
        return a
    }
    return gcdRecursive(b, a%b)
}

func gcdIterative(a, b int) int {
    for b != 0 {
        a, b = b, a%b
    }
    return a
}

func lcm(a, b int) int {
    return (a * b) / gcdRecursive(a, b)
}

func main() {
    fmt.Printf("GCD(48, 18) = %d\\n", gcdRecursive(48, 18))
    fmt.Printf("LCM(48, 18) = %d\\n", lcm(48, 18))
}
`,
  },
};
