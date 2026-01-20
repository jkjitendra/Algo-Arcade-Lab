import { AlgorithmCodeTemplates } from './types';

export const matrixChainMultiplicationCode: AlgorithmCodeTemplates = {
  algorithmId: 'matrix-chain',
  algorithmName: 'Matrix Chain Multiplication',
  category: 'dp',
  templates: {
    javascript: `// Matrix Chain Multiplication - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find minimum multiplications to multiply chain of matrices

function matrixChainMultiplication(dims) {
  // dims[i-1] x dims[i] is dimension of matrix i
  const n = dims.length - 1; // number of matrices
  log(\`Matrix dimensions: \${dims.join(' x ')}\`);
  log(\`Number of matrices: \${n}\`);
  
  // dp[i][j] = min cost to multiply matrices i to j
  const dp = Array(n).fill(null).map(() => Array(n).fill(0));
  
  // Chain length from 2 to n
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i < n - len + 1; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      visit(i * n + j);
      
      for (let k = i; k < j; k++) {
        compare(i, j);
        const cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
        
        if (cost < dp[i][j]) {
          dp[i][j] = cost;
          log(\`dp[\${i}][\${j}] = \${cost} (split at k=\${k})\`);
        }
      }
      
      mark(i * n + j, 'current');
    }
  }
  
  mark(0 * n + (n - 1), 'found');
  log(\`\\nMinimum multiplications: \${dp[0][n - 1]}\`);
  return dp[0][n - 1];
}

// Demo: 4 matrices with dimensions 10x20, 20x30, 30x40, 40x30
matrixChainMultiplication([10, 20, 30, 40, 30]);
`,

    java: `// Matrix Chain Multiplication - Java
public class MatrixChain {
    public static int mcm(int[] dims) {
        int n = dims.length - 1;
        int[][] dp = new int[n][n];
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i < n - len + 1; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        return dp[0][n-1];
    }
    
    public static void main(String[] args) {
        int[] dims = {10, 20, 30, 40, 30};
        System.out.println("Min: " + mcm(dims));
    }
}
`,

    python: `# Matrix Chain Multiplication - Python

def matrix_chain(dims):
    n = len(dims) - 1
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]
                dp[i][j] = min(dp[i][j], cost)
    
    return dp[0][n-1]


dims = [10, 20, 30, 40, 30]
print(f"Min multiplications: {matrix_chain(dims)}")
`,

    cpp: `// Matrix Chain Multiplication - C++
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int matrixChain(vector<int>& dims) {
    int n = dims.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i < n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
}

int main() {
    vector<int> dims = {10, 20, 30, 40, 30};
    cout << "Min: " << matrixChain(dims) << endl;
    return 0;
}
`,

    go: `// Matrix Chain Multiplication - Go
package main

import (
    "fmt"
    "math"
)

func matrixChain(dims []int) int {
    n := len(dims) - 1
    dp := make([][]int, n)
    for i := range dp { dp[i] = make([]int, n) }
    
    for length := 2; length <= n; length++ {
        for i := 0; i < n-length+1; i++ {
            j := i + length - 1
            dp[i][j] = math.MaxInt32
            for k := i; k < j; k++ {
                cost := dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]
                if cost < dp[i][j] { dp[i][j] = cost }
            }
        }
    }
    return dp[0][n-1]
}

func main() {
    dims := []int{10, 20, 30, 40, 30}
    fmt.Printf("Min: %d\\n", matrixChain(dims))
}
`,
  },
};
