import { AlgorithmCodeTemplates } from './types';

export const lcsCode: AlgorithmCodeTemplates = {
  algorithmId: 'lcs',
  algorithmName: 'Longest Common Subsequence',
  category: 'dp',
  templates: {
    javascript: `// Longest Common Subsequence - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function lcs(text1, text2) {
  log(\`Text1: "\${text1}"\`);
  log(\`Text2: "\${text2}"\`);
  
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      visit(i * n + j);
      compare(i, j);
      
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        mark(i * n + j, 'found');
        log(\`Match at (\${i},\${j}): '\${text1[i-1]}' = '\${text2[j-1]}', dp = \${dp[i][j]}\`);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Backtrack to find LCS string
  let lcsStr = '';
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      lcsStr = text1[i - 1] + lcsStr;
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  log(\`\\nLCS length: \${dp[m][n]}\`);
  log(\`LCS: "\${lcsStr}"\`);
  return dp[m][n];
}

// Space-optimized version
function lcsOptimized(text1, text2) {
  const m = text1.length, n = text2.length;
  let prev = Array(n + 1).fill(0);
  let curr = Array(n + 1).fill(0);
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }
  
  return prev[n];
}

// Demo
lcs("abcde", "ace");
log(\`\\nOptimized: \${lcsOptimized("abcde", "ace")}\`);
`,

    java: `// Longest Common Subsequence - Java
public class LCS {
    public static int lcs(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i-1) == text2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }
    
    // Get actual LCS string
    public static String lcsString(String t1, String t2) {
        int m = t1.length(), n = t2.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = t1.charAt(i-1) == t2.charAt(j-1) ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);
        
        StringBuilder sb = new StringBuilder();
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (t1.charAt(i-1) == t2.charAt(j-1)) { sb.insert(0, t1.charAt(i-1)); i--; j--; }
            else if (dp[i-1][j] > dp[i][j-1]) i--;
            else j--;
        }
        return sb.toString();
    }
}
`,

    python: `# Longest Common Subsequence - Python

def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

def lcs_string(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    # Backtrack
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if text1[i-1] == text2[j-1]:
            result.append(text1[i-1])
            i -= 1; j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1
    
    return ''.join(reversed(result))


print(f"LCS length: {lcs('abcde', 'ace')}")
print(f"LCS string: {lcs_string('abcde', 'ace')}")
`,

    cpp: `// Longest Common Subsequence - C++
#include <iostream>
#include <vector>
#include <string>
using namespace std;

int lcs(string& t1, string& t2) {
    int m = t1.size(), n = t2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (t1[i-1] == t2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}

int main() {
    string t1 = "abcde", t2 = "ace";
    cout << "LCS: " << lcs(t1, t2) << endl;
    return 0;
}
`,

    go: `// Longest Common Subsequence - Go
package main

import "fmt"

func lcs(text1, text2 string) int {
    m, n := len(text1), len(text2)
    dp := make([][]int, m+1)
    for i := range dp { dp[i] = make([]int, n+1) }
    
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if text1[i-1] == text2[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            }
        }
    }
    return dp[m][n]
}

func main() {
    fmt.Printf("LCS: %d\\n", lcs("abcde", "ace"))
}
`,
  },
};
