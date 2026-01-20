import { AlgorithmCodeTemplates } from './types';

export const fibonacciRecursiveCode: AlgorithmCodeTemplates = {
  algorithmId: 'fibonacci-recursive',
  algorithmName: 'Fibonacci Recursive',
  category: 'recursion',
  templates: {
    javascript: `// Fibonacci - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

// Naive recursive (exponential time)
function fibRecursive(n, depth = 0) {
  const indent = '  '.repeat(depth);
  log(\`\${indent}fib(\${n})\`);
  visit(n);
  
  if (n <= 1) {
    mark(n, 'found');
    return n;
  }
  
  mark(n, 'current');
  return fibRecursive(n - 1, depth + 1) + fibRecursive(n - 2, depth + 1);
}

// Memoized recursive (linear time)
function fibMemoized(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibMemoized(n - 1, memo) + fibMemoized(n - 2, memo);
  return memo[n];
}

// Iterative (linear time, constant space)
function fibIterative(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

// Demo
log('Fibonacci sequence (first 10):');
for (let i = 0; i < 10; i++) {
  log(\`fib(\${i}) = \${fibMemoized(i)}\`);
}
`,

    java: `// Fibonacci - Java
import java.util.*;

public class Fibonacci {
    static Map<Integer, Long> memo = new HashMap<>();
    
    public static long fibRecursive(int n) {
        if (n <= 1) return n;
        return fibRecursive(n - 1) + fibRecursive(n - 2);
    }
    
    public static long fibMemoized(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n <= 1) return n;
        long result = fibMemoized(n - 1) + fibMemoized(n - 2);
        memo.put(n, result);
        return result;
    }
    
    public static long fibIterative(int n) {
        if (n <= 1) return n;
        long prev = 0, curr = 1;
        for (int i = 2; i <= n; i++) {
            long next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }
    
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.println("fib(" + i + ") = " + fibMemoized(i));
        }
    }
}
`,

    python: `# Fibonacci - Python
from functools import lru_cache

# Memoized with decorator
@lru_cache(maxsize=None)
def fib_memoized(n):
    if n <= 1:
        return n
    return fib_memoized(n - 1) + fib_memoized(n - 2)

# Iterative
def fib_iterative(n):
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr

# Demo
for i in range(10):
    print(f"fib({i}) = {fib_memoized(i)}")
`,

    cpp: `// Fibonacci - C++
#include <iostream>
#include <unordered_map>
using namespace std;

unordered_map<int, long long> memo;

long long fibMemoized(int n) {
    if (memo.count(n)) return memo[n];
    if (n <= 1) return n;
    return memo[n] = fibMemoized(n - 1) + fibMemoized(n - 2);
}

long long fibIterative(int n) {
    if (n <= 1) return n;
    long long prev = 0, curr = 1;
    for (int i = 2; i <= n; i++) {
        long long next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

int main() {
    for (int i = 0; i < 10; i++) {
        cout << "fib(" << i << ") = " << fibMemoized(i) << endl;
    }
    return 0;
}
`,

    go: `// Fibonacci - Go
package main

import "fmt"

var memo = make(map[int]int64)

func fibMemoized(n int) int64 {
    if val, ok := memo[n]; ok {
        return val
    }
    if n <= 1 {
        return int64(n)
    }
    memo[n] = fibMemoized(n-1) + fibMemoized(n-2)
    return memo[n]
}

func fibIterative(n int) int64 {
    if n <= 1 {
        return int64(n)
    }
    prev, curr := int64(0), int64(1)
    for i := 2; i <= n; i++ {
        prev, curr = curr, prev+curr
    }
    return curr
}

func main() {
    for i := 0; i < 10; i++ {
        fmt.Printf("fib(%d) = %d\\n", i, fibMemoized(i))
    }
}
`,
  },
};
