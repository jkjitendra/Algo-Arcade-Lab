import { AlgorithmCodeTemplates } from './types';

export const uniquePathsCode: AlgorithmCodeTemplates = {
  algorithmId: 'unique-paths',
  algorithmName: 'Unique Paths',
  category: 'dp',
  templates: {
    javascript: `// Unique Paths - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Count paths from top-left to bottom-right (only right or down)

function uniquePaths(m, n) {
  log(\`Grid: \${m} x \${n}\`);
  
  const dp = Array(m).fill(null).map(() => Array(n).fill(0));
  
  // First row and column have only 1 path
  for (let i = 0; i < m; i++) dp[i][0] = 1;
  for (let j = 0; j < n; j++) dp[0][j] = 1;
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      visit(i * n + j);
      compare(i, j);
      
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      mark(i * n + j, 'current');
      log(\`dp[\${i}][\${j}] = dp[\${i-1}][\${j}] + dp[\${i}][\${j-1}] = \${dp[i-1][j]} + \${dp[i][j-1]} = \${dp[i][j]}\`);
    }
  }
  
  mark((m - 1) * n + (n - 1), 'found');
  log(\`\\nUnique paths: \${dp[m - 1][n - 1]}\`);
  return dp[m - 1][n - 1];
}

// Space-optimized 1D
function uniquePathsOptimized(m, n) {
  const dp = Array(n).fill(1);
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  
  return dp[n - 1];
}

// With obstacles
function uniquePathsWithObstacles(grid) {
  const m = grid.length, n = grid[0].length;
  if (grid[0][0] === 1 || grid[m-1][n-1] === 1) return 0;
  
  const dp = Array(m).fill(null).map(() => Array(n).fill(0));
  dp[0][0] = 1;
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) continue;
      if (i > 0) dp[i][j] += dp[i-1][j];
      if (j > 0) dp[i][j] += dp[i][j-1];
    }
  }
  
  return dp[m-1][n-1];
}

// Demo
uniquePaths(3, 7);
log(\`\\nOptimized: \${uniquePathsOptimized(3, 7)}\`);
`,

    java: `// Unique Paths - Java
public class UniquePaths {
    public static int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for (int i = 0; i < m; i++) dp[i][0] = 1;
        for (int j = 0; j < n; j++) dp[0][j] = 1;
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        return dp[m-1][n-1];
    }
    
    public static int uniquePathsOptimized(int m, int n) {
        int[] dp = new int[n];
        java.util.Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j-1];
            }
        }
        return dp[n-1];
    }
    
    public static void main(String[] args) {
        System.out.println("Paths: " + uniquePaths(3, 7));
    }
}
`,

    python: `# Unique Paths - Python

def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]

def unique_paths_optimized(m, n):
    dp = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    return dp[n-1]

# Math solution: C(m+n-2, m-1)
from math import comb
def unique_paths_math(m, n):
    return comb(m + n - 2, m - 1)


print(f"Paths (3x7): {unique_paths(3, 7)}")
`,

    cpp: `// Unique Paths - C++
#include <iostream>
#include <vector>
using namespace std;

int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 1));
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
    return dp[m-1][n-1];
}

int uniquePathsOptimized(int m, int n) {
    vector<int> dp(n, 1);
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j-1];
    return dp[n-1];
}

int main() {
    cout << "Paths: " << uniquePaths(3, 7) << endl;
    return 0;
}
`,

    go: `// Unique Paths - Go
package main

import "fmt"

func uniquePaths(m, n int) int {
    dp := make([][]int, m)
    for i := range dp {
        dp[i] = make([]int, n)
        for j := range dp[i] { dp[i][j] = 1 }
    }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }
    return dp[m-1][n-1]
}

func uniquePathsOptimized(m, n int) int {
    dp := make([]int, n)
    for i := range dp { dp[i] = 1 }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ { dp[j] += dp[j-1] }
    }
    return dp[n-1]
}

func main() {
    fmt.Printf("Paths: %d\\n", uniquePaths(3, 7))
}
`,
  },
};
