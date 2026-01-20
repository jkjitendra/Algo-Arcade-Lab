import { AlgorithmCodeTemplates } from './types';

export const editDistanceCode: AlgorithmCodeTemplates = {
  algorithmId: 'edit-distance',
  algorithmName: 'Edit Distance (Levenshtein)',
  category: 'dp',
  templates: {
    javascript: `// Edit Distance (Levenshtein Distance) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function editDistance(word1, word2) {
  log(\`Word1: "\${word1}"\`);
  log(\`Word2: "\${word2}"\`);
  
  const m = word1.length, n = word2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      visit(i * n + j);
      compare(i, j);
      
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        mark(i * n + j, 'found');
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // Delete
          dp[i][j - 1],     // Insert
          dp[i - 1][j - 1]  // Replace
        );
        mark(i * n + j, 'current');
      }
    }
  }
  
  log(\`\\nEdit distance: \${dp[m][n]}\`);
  return dp[m][n];
}

// Space-optimized version
function editDistanceOptimized(word1, word2) {
  const m = word1.length, n = word2.length;
  let prev = Array.from({length: n + 1}, (_, i) => i);
  let curr = Array(n + 1).fill(0);
  
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }
  
  return prev[n];
}

// Demo
editDistance("horse", "ros");
editDistance("intention", "execution");
`,

    java: `// Edit Distance - Java
public class EditDistance {
    public static int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i-1) == word2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]));
                }
            }
        }
        return dp[m][n];
    }
    
    public static void main(String[] args) {
        System.out.println("Distance: " + minDistance("horse", "ros"));
    }
}
`,

    python: `# Edit Distance - Python

def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]


print(f"Distance: {edit_distance('horse', 'ros')}")
print(f"Distance: {edit_distance('intention', 'execution')}")
`,

    cpp: `// Edit Distance - C++
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int editDistance(string& w1, string& w2) {
    int m = w1.size(), n = w2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (w1[i-1] == w2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]});
        }
    }
    return dp[m][n];
}

int main() {
    string w1 = "horse", w2 = "ros";
    cout << "Distance: " << editDistance(w1, w2) << endl;
    return 0;
}
`,

    go: `// Edit Distance - Go
package main

import "fmt"

func editDistance(word1, word2 string) int {
    m, n := len(word1), len(word2)
    dp := make([][]int, m+1)
    for i := range dp { dp[i] = make([]int, n+1) }
    
    for i := 0; i <= m; i++ { dp[i][0] = i }
    for j := 0; j <= n; j++ { dp[0][j] = j }
    
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if word1[i-1] == word2[j-1] {
                dp[i][j] = dp[i-1][j-1]
            } else {
                dp[i][j] = 1 + min(dp[i-1][j-1], min(dp[i-1][j], dp[i][j-1]))
            }
        }
    }
    return dp[m][n]
}

func main() {
    fmt.Printf("Distance: %d\\n", editDistance("horse", "ros"))
}
`,
  },
};
