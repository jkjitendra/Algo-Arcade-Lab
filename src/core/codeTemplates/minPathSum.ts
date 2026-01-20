import { AlgorithmCodeTemplates } from './types';

export const minPathSumCode: AlgorithmCodeTemplates = {
  algorithmId: 'min-path-sum',
  algorithmName: 'Minimum Path Sum',
  category: 'dp',
  templates: {
    javascript: `// Minimum Path Sum - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find path with minimum sum from top-left to bottom-right

function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  log(\`Grid: \${m} x \${n}\`);
  
  const dp = Array(m).fill(null).map(() => Array(n).fill(0));
  
  dp[0][0] = grid[0][0];
  
  // First row
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }
  
  // First column
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      visit(i * n + j);
      compare(i, j);
      
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      mark(i * n + j, 'current');
      log(\`dp[\${i}][\${j}] = min(\${dp[i-1][j]}, \${dp[i][j-1]}) + \${grid[i][j]} = \${dp[i][j]}\`);
    }
  }
  
  mark((m - 1) * n + (n - 1), 'found');
  log(\`\\nMinimum path sum: \${dp[m - 1][n - 1]}\`);
  return dp[m - 1][n - 1];
}

// Space-optimized
function minPathSumOptimized(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = [...grid[0]];
  
  for (let j = 1; j < n; j++) dp[j] += dp[j - 1];
  
  for (let i = 1; i < m; i++) {
    dp[0] += grid[i][0];
    for (let j = 1; j < n; j++) {
      dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
    }
  }
  
  return dp[n - 1];
}

// Demo
const grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
];
minPathSum(grid);
`,

    java: `// Minimum Path Sum - Java
public class MinPathSum {
    public static int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dp = new int[m][n];
        
        dp[0][0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
        for (int i = 1; i < m; i++) dp[i][0] = dp[i-1][0] + grid[i][0];
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
            }
        }
        return dp[m-1][n-1];
    }
    
    public static void main(String[] args) {
        int[][] grid = {{1,3,1}, {1,5,1}, {4,2,1}};
        System.out.println("Min sum: " + minPathSum(grid));
    }
}
`,

    python: `# Minimum Path Sum - Python

def min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    dp = [[0] * n for _ in range(m)]
    
    dp[0][0] = grid[0][0]
    for j in range(1, n): dp[0][j] = dp[0][j-1] + grid[0][j]
    for i in range(1, m): dp[i][0] = dp[i-1][0] + grid[i][0]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    
    return dp[m-1][n-1]


grid = [[1,3,1], [1,5,1], [4,2,1]]
print(f"Min sum: {min_path_sum(grid)}")
`,

    cpp: `// Minimum Path Sum - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    vector<vector<int>> dp(m, vector<int>(n));
    
    dp[0][0] = grid[0][0];
    for (int j = 1; j < n; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
    for (int i = 1; i < m; i++) dp[i][0] = dp[i-1][0] + grid[i][0];
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }
    return dp[m-1][n-1];
}

int main() {
    vector<vector<int>> grid = {{1,3,1}, {1,5,1}, {4,2,1}};
    cout << "Min sum: " << minPathSum(grid) << endl;
    return 0;
}
`,

    go: `// Minimum Path Sum - Go
package main

import "fmt"

func minPathSum(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    dp := make([][]int, m)
    for i := range dp { dp[i] = make([]int, n) }
    
    dp[0][0] = grid[0][0]
    for j := 1; j < n; j++ { dp[0][j] = dp[0][j-1] + grid[0][j] }
    for i := 1; i < m; i++ { dp[i][0] = dp[i-1][0] + grid[i][0] }
    
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
        }
    }
    return dp[m-1][n-1]
}

func main() {
    grid := [][]int{{1,3,1}, {1,5,1}, {4,2,1}}
    fmt.Printf("Min sum: %d\\n", minPathSum(grid))
}
`,
  },
};
