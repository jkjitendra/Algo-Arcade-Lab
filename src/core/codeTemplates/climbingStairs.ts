import { AlgorithmCodeTemplates } from './types';

export const climbingStairsCode: AlgorithmCodeTemplates = {
  algorithmId: 'climbing-stairs',
  algorithmName: 'Climbing Stairs',
  category: 'dp',
  templates: {
    javascript: `// Climbing Stairs - Dynamic Programming - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Ways to climb n stairs taking 1 or 2 steps at a time

function climbStairs(n) {
  log(\`Climbing \${n} stairs (1 or 2 steps at a time)\`);
  
  if (n <= 2) return n;
  
  const dp = [0, 1, 2];
  
  for (let i = 3; i <= n; i++) {
    visit(i);
    dp[i] = dp[i - 1] + dp[i - 2];
    compare(i - 1, i - 2);
    mark(i, 'current');
    log(\`dp[\${i}] = dp[\${i-1}] + dp[\${i-2}] = \${dp[i-1]} + \${dp[i-2]} = \${dp[i]}\`);
  }
  
  mark(n, 'found');
  log(\`\\nWays to climb \${n} stairs: \${dp[n]}\`);
  return dp[n];
}

// Space optimized
function climbStairsOptimized(n) {
  if (n <= 2) return n;
  
  let prev2 = 1, prev1 = 2;
  
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}

// With variable step sizes
function climbStairsK(n, k) {
  log(\`\\nClimbing \${n} stairs with 1 to \${k} steps\`);
  
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, k); j++) {
      dp[i] += dp[i - j];
    }
    log(\`dp[\${i}] = \${dp[i]}\`);
  }
  
  return dp[n];
}

// Demo
climbStairs(5);
log(\`\\nOptimized: \${climbStairsOptimized(5)}\`);
climbStairsK(5, 3);
`,

    java: `// Climbing Stairs - Java
public class ClimbingStairs {
    public static int climbStairs(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n + 1];
        dp[1] = 1; dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
    
    public static int climbStairsOptimized(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
    
    public static void main(String[] args) {
        System.out.println("Ways to climb 5 stairs: " + climbStairs(5));
    }
}
`,

    python: `# Climbing Stairs - Python

def climb_stairs(n):
    if n <= 2:
        return n
    dp = [0, 1, 2]
    for i in range(3, n + 1):
        dp.append(dp[i - 1] + dp[i - 2])
    return dp[n]

def climb_stairs_optimized(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1

# With k-step variations
def climb_stairs_k(n, k):
    dp = [0] * (n + 1)
    dp[0] = 1
    for i in range(1, n + 1):
        for j in range(1, min(i, k) + 1):
            dp[i] += dp[i - j]
    return dp[n]


print(f"Ways to climb 5 stairs: {climb_stairs(5)}")
`,

    cpp: `// Climbing Stairs - C++
#include <iostream>
#include <vector>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;
    vector<int> dp(n + 1);
    dp[1] = 1; dp[2] = 2;
    for (int i = 3; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

int climbStairsOptimized(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    cout << "Ways to climb 5 stairs: " << climbStairs(5) << endl;
    return 0;
}
`,

    go: `// Climbing Stairs - Go
package main

import "fmt"

func climbStairs(n int) int {
    if n <= 2 { return n }
    dp := make([]int, n+1)
    dp[1], dp[2] = 1, 2
    for i := 3; i <= n; i++ { dp[i] = dp[i-1] + dp[i-2] }
    return dp[n]
}

func climbStairsOptimized(n int) int {
    if n <= 2 { return n }
    prev2, prev1 := 1, 2
    for i := 3; i <= n; i++ {
        curr := prev1 + prev2
        prev2, prev1 = prev1, curr
    }
    return prev1
}

func main() {
    fmt.Printf("Ways to climb 5 stairs: %d\\n", climbStairs(5))
}
`,
  },
};
