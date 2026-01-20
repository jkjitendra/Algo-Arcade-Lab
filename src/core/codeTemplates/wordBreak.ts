import { AlgorithmCodeTemplates } from './types';

export const wordBreakCode: AlgorithmCodeTemplates = {
  algorithmId: 'word-break',
  algorithmName: 'Word Break',
  category: 'dp',
  templates: {
    javascript: `// Word Break - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Can string be segmented into dictionary words?

function wordBreak(s, wordDict) {
  log(\`String: "\${s}"\`);
  log(\`Dictionary: [\${wordDict.map(w => '"' + w + '"').join(', ')}]\`);
  
  const wordSet = new Set(wordDict);
  const n = s.length;
  
  // dp[i] = can s[0...i-1] be segmented?
  const dp = Array(n + 1).fill(false);
  dp[0] = true; // Empty string
  
  for (let i = 1; i <= n; i++) {
    visit(i);
    
    for (let j = 0; j < i; j++) {
      compare(i, j);
      const word = s.substring(j, i);
      
      if (dp[j] && wordSet.has(word)) {
        dp[i] = true;
        mark(i, 'found');
        log(\`dp[\${i}] = true (word "\${word}" at [\${j},\${i}))\`);
        break;
      }
    }
    
    if (!dp[i]) mark(i, 'eliminated');
  }
  
  log(\`\\nCan segment: \${dp[n]}\`);
  return dp[n];
}

// With word reconstruction
function wordBreakWords(s, wordDict) {
  const wordSet = new Set(wordDict);
  const n = s.length;
  const dp = Array(n + 1).fill(false);
  const parent = Array(n + 1).fill(-1);
  dp[0] = true;
  
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        parent[i] = j;
        break;
      }
    }
  }
  
  if (!dp[n]) return null;
  
  // Reconstruct
  const words = [];
  let idx = n;
  while (idx > 0) {
    words.unshift(s.substring(parent[idx], idx));
    idx = parent[idx];
  }
  
  return words;
}

// Demo
wordBreak("leetcode", ["leet", "code"]);
wordBreak("applepenapple", ["apple", "pen"]);
log(\`\\nWords: \${JSON.stringify(wordBreakWords("leetcode", ["leet", "code"]))}\`);
`,

    java: `// Word Break - Java
import java.util.*;

public class WordBreak {
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
    
    public static void main(String[] args) {
        List<String> dict = Arrays.asList("leet", "code");
        System.out.println(wordBreak("leetcode", dict));
    }
}
`,

    python: `# Word Break - Python

def word_break(s, word_dict):
    word_set = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[n]

def word_break_words(s, word_dict):
    word_set = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    parent = [-1] * (n + 1)
    dp[0] = True
    
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                parent[i] = j
                break
    
    if not dp[n]:
        return None
    
    words = []
    idx = n
    while idx > 0:
        words.append(s[parent[idx]:idx])
        idx = parent[idx]
    
    return words[::-1]


print(f"Can break: {word_break('leetcode', ['leet', 'code'])}")
print(f"Words: {word_break_words('leetcode', ['leet', 'code'])}")
`,

    cpp: `// Word Break - C++
#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> wordSet(wordDict.begin(), wordDict.end());
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;
    
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
}

int main() {
    vector<string> dict = {"leet", "code"};
    cout << boolalpha << wordBreak("leetcode", dict) << endl;
    return 0;
}
`,

    go: `// Word Break - Go
package main

import "fmt"

func wordBreak(s string, wordDict []string) bool {
    wordSet := make(map[string]bool)
    for _, w := range wordDict { wordSet[w] = true }
    
    n := len(s)
    dp := make([]bool, n+1)
    dp[0] = true
    
    for i := 1; i <= n; i++ {
        for j := 0; j < i; j++ {
            if dp[j] && wordSet[s[j:i]] {
                dp[i] = true
                break
            }
        }
    }
    return dp[n]
}

func main() {
    dict := []string{"leet", "code"}
    fmt.Println(wordBreak("leetcode", dict))
}
`,
  },
};
