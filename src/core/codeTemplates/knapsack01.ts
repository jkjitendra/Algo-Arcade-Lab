import { AlgorithmCodeTemplates } from './types';

export const knapsack01Code: AlgorithmCodeTemplates = {
  algorithmId: 'knapsack-01',
  algorithmName: '0/1 Knapsack',
  category: 'dp',
  templates: {
    javascript: `// 0/1 Knapsack Problem - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function knapsack01(weights, values, capacity) {
  const n = weights.length;
  log(\`Items: \${n}, Capacity: \${capacity}\`);
  log(\`Weights: [\${weights.join(', ')}]\`);
  log(\`Values:  [\${values.join(', ')}]\`);
  
  // dp[i][w] = max value with first i items and capacity w
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    const wt = weights[i - 1];
    const val = values[i - 1];
    visit(i);
    
    for (let w = 1; w <= capacity; w++) {
      compare(i, w);
      
      if (wt <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt] + val);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
    
    mark(i, 'current');
    log(\`Item \${i} (w=\${wt}, v=\${val}): max values = [\${dp[i].slice(0, 6).join(', ')}...]\`);
  }
  
  mark(n, 'found');
  log(\`\\nMax value: \${dp[n][capacity]}\`);
  
  // Backtrack to find items
  const items = [];
  let w = capacity;
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      items.push(i);
      w -= weights[i - 1];
    }
  }
  log(\`Selected items: [\${items.reverse().join(', ')}]\`);
  
  return dp[n][capacity];
}

// Space-optimized 1D version
function knapsack01Optimized(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(capacity + 1).fill(0);
  
  for (let i = 0; i < n; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  
  return dp[capacity];
}

// Demo
knapsack01([2, 3, 4, 5], [3, 4, 5, 6], 5);
`,

    java: `// 0/1 Knapsack - Java
public class Knapsack01 {
    public static int knapsack(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];
        
        for (int i = 1; i <= n; i++) {
            int wt = weights[i - 1], val = values[i - 1];
            for (int w = 1; w <= capacity; w++) {
                if (wt <= w) {
                    dp[i][w] = Math.max(dp[i-1][w], dp[i-1][w-wt] + val);
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            }
        }
        return dp[n][capacity];
    }
    
    // Space optimized
    public static int knapsackOptimized(int[] wt, int[] val, int cap) {
        int[] dp = new int[cap + 1];
        for (int i = 0; i < wt.length; i++) {
            for (int w = cap; w >= wt[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
            }
        }
        return dp[cap];
    }
    
    public static void main(String[] args) {
        System.out.println("Max: " + knapsack(new int[]{2,3,4,5}, new int[]{3,4,5,6}, 5));
    }
}
`,

    python: `# 0/1 Knapsack - Python

def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        wt, val = weights[i - 1], values[i - 1]
        for w in range(1, capacity + 1):
            if wt <= w:
                dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt] + val)
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]

# Space optimized
def knapsack_optimized(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for wt, val in zip(weights, values):
        for w in range(capacity, wt - 1, -1):
            dp[w] = max(dp[w], dp[w - wt] + val)
    return dp[capacity]


weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
print(f"Max value: {knapsack_01(weights, values, 5)}")
`,

    cpp: `// 0/1 Knapsack - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(vector<int>& wt, vector<int>& val, int cap) {
    int n = wt.size();
    vector<vector<int>> dp(n + 1, vector<int>(cap + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= cap; w++) {
            if (wt[i-1] <= w)
                dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i-1]] + val[i-1]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }
    return dp[n][cap];
}

int knapsackOptimized(vector<int>& wt, vector<int>& val, int cap) {
    vector<int> dp(cap + 1, 0);
    for (int i = 0; i < wt.size(); i++) {
        for (int w = cap; w >= wt[i]; w--) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[cap];
}

int main() {
    vector<int> wt = {2, 3, 4, 5}, val = {3, 4, 5, 6};
    cout << "Max: " << knapsack(wt, val, 5) << endl;
    return 0;
}
`,

    go: `// 0/1 Knapsack - Go
package main

import "fmt"

func knapsack01(weights, values []int, capacity int) int {
    n := len(weights)
    dp := make([][]int, n+1)
    for i := range dp { dp[i] = make([]int, capacity+1) }
    
    for i := 1; i <= n; i++ {
        wt, val := weights[i-1], values[i-1]
        for w := 1; w <= capacity; w++ {
            if wt <= w {
                dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt]+val)
            } else {
                dp[i][w] = dp[i-1][w]
            }
        }
    }
    return dp[n][capacity]
}

func knapsackOptimized(wt, val []int, cap int) int {
    dp := make([]int, cap+1)
    for i := range wt {
        for w := cap; w >= wt[i]; w-- {
            if dp[w-wt[i]]+val[i] > dp[w] {
                dp[w] = dp[w-wt[i]] + val[i]
            }
        }
    }
    return dp[cap]
}

func main() {
    fmt.Printf("Max: %d\\n", knapsack01([]int{2,3,4,5}, []int{3,4,5,6}, 5))
}
`,
  },
};
