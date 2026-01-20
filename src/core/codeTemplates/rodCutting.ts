import { AlgorithmCodeTemplates } from './types';

export const rodCuttingCode: AlgorithmCodeTemplates = {
  algorithmId: 'rod-cutting',
  algorithmName: 'Rod Cutting',
  category: 'dp',
  templates: {
    javascript: `// Rod Cutting Problem - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Maximum revenue from cutting rod into pieces

function rodCutting(prices, n) {
  log(\`Prices: [\${prices.join(', ')}], Rod length: \${n}\`);
  
  // dp[i] = max revenue for rod of length i
  const dp = Array(n + 1).fill(0);
  
  for (let i = 1; i <= n; i++) {
    visit(i);
    let maxVal = 0;
    
    for (let j = 1; j <= i; j++) {
      compare(i, j);
      // Cut piece of length j
      maxVal = Math.max(maxVal, prices[j - 1] + dp[i - j]);
    }
    
    dp[i] = maxVal;
    mark(i, 'current');
    log(\`dp[\${i}] = \${dp[i]}\`);
  }
  
  mark(n, 'found');
  log(\`\\nMax revenue: \${dp[n]}\`);
  return dp[n];
}

// With cut tracking
function rodCuttingWithCuts(prices, n) {
  const dp = Array(n + 1).fill(0);
  const cuts = Array(n + 1).fill(0);
  
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (prices[j - 1] + dp[i - j] > dp[i]) {
        dp[i] = prices[j - 1] + dp[i - j];
        cuts[i] = j;
      }
    }
  }
  
  // Reconstruct cuts
  const result = [];
  let length = n;
  while (length > 0) {
    result.push(cuts[length]);
    length -= cuts[length];
  }
  
  return { revenue: dp[n], cuts: result };
}

// Demo
// prices[i] = price for piece of length i+1
rodCutting([1, 5, 8, 9, 10, 17, 17, 20], 8);
log(\`\\nWith cuts: \${JSON.stringify(rodCuttingWithCuts([1, 5, 8, 9, 10, 17, 17, 20], 4))}\`);
`,

    java: `// Rod Cutting - Java
public class RodCutting {
    public static int rodCutting(int[] prices, int n) {
        int[] dp = new int[n + 1];
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                dp[i] = Math.max(dp[i], prices[j-1] + dp[i-j]);
            }
        }
        return dp[n];
    }
    
    public static void main(String[] args) {
        int[] prices = {1, 5, 8, 9, 10, 17, 17, 20};
        System.out.println("Max revenue: " + rodCutting(prices, 8));
    }
}
`,

    python: `# Rod Cutting - Python

def rod_cutting(prices, n):
    dp = [0] * (n + 1)
    
    for i in range(1, n + 1):
        for j in range(1, i + 1):
            dp[i] = max(dp[i], prices[j-1] + dp[i-j])
    
    return dp[n]

def rod_cutting_with_cuts(prices, n):
    dp = [0] * (n + 1)
    cuts = [0] * (n + 1)
    
    for i in range(1, n + 1):
        for j in range(1, i + 1):
            if prices[j-1] + dp[i-j] > dp[i]:
                dp[i] = prices[j-1] + dp[i-j]
                cuts[i] = j
    
    result = []
    length = n
    while length > 0:
        result.append(cuts[length])
        length -= cuts[length]
    
    return dp[n], result


prices = [1, 5, 8, 9, 10, 17, 17, 20]
print(f"Max revenue: {rod_cutting(prices, 8)}")
`,

    cpp: `// Rod Cutting - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int rodCutting(vector<int>& prices, int n) {
    vector<int> dp(n + 1, 0);
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            dp[i] = max(dp[i], prices[j-1] + dp[i-j]);
        }
    }
    return dp[n];
}

int main() {
    vector<int> prices = {1, 5, 8, 9, 10, 17, 17, 20};
    cout << "Max revenue: " << rodCutting(prices, 8) << endl;
    return 0;
}
`,

    go: `// Rod Cutting - Go
package main

import "fmt"

func rodCutting(prices []int, n int) int {
    dp := make([]int, n+1)
    
    for i := 1; i <= n; i++ {
        for j := 1; j <= i; j++ {
            if prices[j-1]+dp[i-j] > dp[i] {
                dp[i] = prices[j-1] + dp[i-j]
            }
        }
    }
    return dp[n]
}

func main() {
    prices := []int{1, 5, 8, 9, 10, 17, 17, 20}
    fmt.Printf("Max revenue: %d\\n", rodCutting(prices, 8))
}
`,
  },
};
