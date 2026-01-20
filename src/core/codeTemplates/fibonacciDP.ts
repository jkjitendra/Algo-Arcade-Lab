import { AlgorithmCodeTemplates } from './types';

export const fibonacciDPCode: AlgorithmCodeTemplates = {
  algorithmId: 'fibonacci-dp',
  algorithmName: 'Fibonacci (DP)',
  category: 'dp',
  templates: {
    javascript: `// Fibonacci - Dynamic Programming - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

// Top-down with memoization
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  visit(n);
  log(\`Computing fib(\${n})\`);
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  mark(n, 'found');
  log(\`fib(\${n}) = \${memo[n]}\`);
  
  return memo[n];
}

// Bottom-up tabulation
function fibTabulation(n) {
  log(\`Fibonacci bottom-up for n=\${n}\`);
  
  if (n <= 1) return n;
  
  const dp = [0, 1];
  
  for (let i = 2; i <= n; i++) {
    visit(i);
    dp[i] = dp[i - 1] + dp[i - 2];
    compare(i - 1, i - 2);
    mark(i, 'current');
    log(\`dp[\${i}] = dp[\${i-1}] + dp[\${i-2}] = \${dp[i]}\`);
  }
  
  mark(n, 'found');
  log(\`Result: \${dp[n]}\`);
  return dp[n];
}

// Space-optimized O(1) space
function fibOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0, prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}

// Demo
log('Top-down (memoization):');
fibMemo(10);

log('\\nBottom-up (tabulation):');
fibTabulation(10);

log(\`\\nOptimized: \${fibOptimized(10)}\`);
`,

    java: `// Fibonacci DP - Java
public class FibonacciDP {
    // Memoization
    public static long fibMemo(int n, long[] memo) {
        if (n <= 1) return n;
        if (memo[n] != 0) return memo[n];
        return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    }
    
    // Tabulation
    public static long fibTab(int n) {
        if (n <= 1) return n;
        long[] dp = new long[n + 1];
        dp[0] = 0; dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
    
    // Space optimized
    public static long fibOptimized(int n) {
        if (n <= 1) return n;
        long prev2 = 0, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            long curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
    
    public static void main(String[] args) {
        System.out.println("Fib(10) = " + fibTab(10));
    }
}
`,

    python: `# Fibonacci DP - Python
from functools import lru_cache

# Memoization with decorator
@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

# Tabulation
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0, 1]
    for i in range(2, n + 1):
        dp.append(dp[i - 1] + dp[i - 2])
    return dp[n]

# Space optimized
def fib_optimized(n):
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1


print(f"Fib(10) = {fib_tab(10)}")
`,

    cpp: `// Fibonacci DP - C++
#include <iostream>
#include <vector>
using namespace std;

long long fibMemo(int n, vector<long long>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
}

long long fibTab(int n) {
    if (n <= 1) return n;
    vector<long long> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

long long fibOptimized(int n) {
    if (n <= 1) return n;
    long long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long long curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    cout << "Fib(10) = " << fibTab(10) << endl;
    return 0;
}
`,

    go: `// Fibonacci DP - Go
package main

import "fmt"

func fibMemo(n int, memo map[int]int) int {
    if n <= 1 { return n }
    if v, ok := memo[n]; ok { return v }
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo)
    return memo[n]
}

func fibTab(n int) int {
    if n <= 1 { return n }
    dp := make([]int, n+1)
    dp[0], dp[1] = 0, 1
    for i := 2; i <= n; i++ { dp[i] = dp[i-1] + dp[i-2] }
    return dp[n]
}

func fibOptimized(n int) int {
    if n <= 1 { return n }
    prev2, prev1 := 0, 1
    for i := 2; i <= n; i++ {
        curr := prev1 + prev2
        prev2, prev1 = prev1, curr
    }
    return prev1
}

func main() {
    fmt.Printf("Fib(10) = %d\\n", fibTab(10))
}
`,
  },
};
