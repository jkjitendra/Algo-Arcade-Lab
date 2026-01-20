import { AlgorithmCodeTemplates } from './types';

export const powerRecursiveCode: AlgorithmCodeTemplates = {
  algorithmId: 'power-recursive',
  algorithmName: 'Power (Exponentiation)',
  category: 'recursion',
  templates: {
    javascript: `// Power / Exponentiation - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

// Naive recursive O(n)
function powerNaive(base, exp, depth = 0) {
  const indent = '  '.repeat(depth);
  log(\`\${indent}power(\${base}, \${exp})\`);
  visit(depth);
  
  if (exp === 0) {
    mark(depth, 'found');
    return 1;
  }
  
  mark(depth, 'current');
  return base * powerNaive(base, exp - 1, depth + 1);
}

// Fast exponentiation O(log n)
function powerFast(base, exp, depth = 0) {
  const indent = '  '.repeat(depth);
  log(\`\${indent}power(\${base}, \${exp})\`);
  visit(depth);
  
  if (exp === 0) {
    mark(depth, 'found');
    return 1;
  }
  
  mark(depth, 'current');
  
  if (exp % 2 === 0) {
    const half = powerFast(base, exp / 2, depth + 1);
    log(\`\${indent}Even: \${half} * \${half}\`);
    return half * half;
  } else {
    const half = powerFast(base, (exp - 1) / 2, depth + 1);
    log(\`\${indent}Odd: \${base} * \${half} * \${half}\`);
    return base * half * half;
  }
}

// Demo
log('Computing 2^10 using fast exponentiation:');
const result = powerFast(2, 10);
log(\`2^10 = \${result}\`);
`,

    java: `// Power / Exponentiation - Java
public class Power {
    // Fast exponentiation O(log n)
    public static long power(long base, int exp) {
        if (exp == 0) return 1;
        if (exp % 2 == 0) {
            long half = power(base, exp / 2);
            return half * half;
        } else {
            long half = power(base, (exp - 1) / 2);
            return base * half * half;
        }
    }
    
    public static void main(String[] args) {
        System.out.println("2^10 = " + power(2, 10));
        System.out.println("3^5 = " + power(3, 5));
    }
}
`,

    python: `# Power / Exponentiation - Python

def power_fast(base, exp):
    if exp == 0:
        return 1
    if exp % 2 == 0:
        half = power_fast(base, exp // 2)
        return half * half
    else:
        half = power_fast(base, (exp - 1) // 2)
        return base * half * half

# Demo
print(f"2^10 = {power_fast(2, 10)}")
print(f"3^5 = {power_fast(3, 5)}")
`,

    cpp: `// Power / Exponentiation - C++
#include <iostream>
using namespace std;

long long power(long long base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        long long half = power(base, exp / 2);
        return half * half;
    } else {
        long long half = power(base, (exp - 1) / 2);
        return base * half * half;
    }
}

int main() {
    cout << "2^10 = " << power(2, 10) << endl;
    cout << "3^5 = " << power(3, 5) << endl;
    return 0;
}
`,

    go: `// Power / Exponentiation - Go
package main

import "fmt"

func power(base int64, exp int) int64 {
    if exp == 0 {
        return 1
    }
    if exp%2 == 0 {
        half := power(base, exp/2)
        return half * half
    }
    half := power(base, (exp-1)/2)
    return base * half * half
}

func main() {
    fmt.Printf("2^10 = %d\\n", power(2, 10))
    fmt.Printf("3^5 = %d\\n", power(3, 5))
}
`,
  },
};
