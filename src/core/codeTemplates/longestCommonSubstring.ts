import { AlgorithmCodeTemplates } from './types';

export const longestCommonSubstringCode: AlgorithmCodeTemplates = {
  algorithmId: 'longest-common-substring',
  algorithmName: 'Longest Common Substring',
  category: 'strings',
  templates: {
    javascript: `// Longest Common Substring - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Dynamic Programming approach - O(m*n)

function longestCommonSubstring(s1, s2) {
  log(\`Finding longest common substring between "\${s1}" and "\${s2}"\`);
  
  const m = s1.length;
  const n = s2.length;
  
  // DP table
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  let maxLen = 0;
  let endIndex = 0;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      visit(i - 1);
      compare(i - 1, j - 1);
      
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        mark(i - 1, 'comparing');
        
        if (dp[i][j] > maxLen) {
          maxLen = dp[i][j];
          endIndex = i;
          log(\`New max at (\${i},\${j}): length = \${maxLen}\`);
        }
      }
    }
  }
  
  const result = s1.substring(endIndex - maxLen, endIndex);
  
  // Mark the result in s1
  for (let i = endIndex - maxLen; i < endIndex; i++) {
    mark(i, 'found');
  }
  
  log(\`Longest common substring: "\${result}" (length \${maxLen})\`);
  return result;
}

longestCommonSubstring("ABCDGH", "ACDGHR");
`,

    java: `// Longest Common Substring - Java
public class LongestCommonSubstring {
    public static String longestCommonSubstring(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        int maxLen = 0, endIndex = 0;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    if (dp[i][j] > maxLen) {
                        maxLen = dp[i][j];
                        endIndex = i;
                    }
                }
            }
        }
        
        return s1.substring(endIndex - maxLen, endIndex);
    }
    
    public static void main(String[] args) {
        System.out.println("LCS: " + longestCommonSubstring("ABCDGH", "ACDGHR"));
    }
}
`,

    python: `# Longest Common Substring - Python

def longest_common_substring(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_len = 0
    end_index = 0
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                if dp[i][j] > max_len:
                    max_len = dp[i][j]
                    end_index = i
    
    return s1[end_index - max_len:end_index]


print(f"LCS: {longest_common_substring('ABCDGH', 'ACDGHR')}")
`,

    cpp: `// Longest Common Substring - C++
#include <iostream>
#include <string>
#include <vector>
using namespace std;

string longestCommonSubstring(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    int maxLen = 0, endIndex = 0;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLen) {
                    maxLen = dp[i][j];
                    endIndex = i;
                }
            }
        }
    }
    
    return s1.substr(endIndex - maxLen, maxLen);
}

int main() {
    cout << "LCS: " << longestCommonSubstring("ABCDGH", "ACDGHR") << endl;
    return 0;
}
`,

    go: `// Longest Common Substring - Go
package main

import "fmt"

func longestCommonSubstring(s1, s2 string) string {
    m, n := len(s1), len(s2)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    
    maxLen, endIndex := 0, 0
    
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if s1[i-1] == s2[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
                if dp[i][j] > maxLen {
                    maxLen = dp[i][j]
                    endIndex = i
                }
            }
        }
    }
    
    return s1[endIndex-maxLen : endIndex]
}

func main() {
    fmt.Printf("LCS: %s\\n", longestCommonSubstring("ABCDGH", "ACDGHR"))
}
`,
  },
};
