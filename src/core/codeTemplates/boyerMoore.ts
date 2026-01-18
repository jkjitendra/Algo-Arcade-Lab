import { AlgorithmCodeTemplates } from './types';

export const boyerMooreCode: AlgorithmCodeTemplates = {
  algorithmId: 'boyer-moore',
  algorithmName: 'Boyer-Moore Algorithm',
  category: 'strings',
  templates: {
    javascript: `// Boyer-Moore Pattern Search (Bad Character Heuristic) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function boyerMoore(text, pattern) {
  log(\`Boyer-Moore Search for "\${pattern}" in "\${text}"\`);
  
  const n = text.length;
  const m = pattern.length;
  const matches = [];
  
  // Build bad character table
  const badChar = {};
  for (let i = 0; i < m; i++) {
    badChar[pattern[i]] = i;
  }
  
  log(\`Bad character table: \${JSON.stringify(badChar)}\`);
  
  let s = 0; // Shift of pattern
  
  while (s <= n - m) {
    visit(s);
    let j = m - 1;
    
    // Compare from right to left
    while (j >= 0 && pattern[j] === text[s + j]) {
      compare(s + j, s + j);
      mark(s + j, 'comparing');
      j--;
    }
    
    if (j < 0) {
      // Pattern found
      log(\`Found match at index \${s}!\`);
      matches.push(s);
      for (let k = s; k < s + m; k++) {
        mark(k, 'found');
      }
      s += (s + m < n) ? m - (badChar[text[s + m]] ?? -1) : 1;
    } else {
      // Shift using bad character heuristic
      const shift = Math.max(1, j - (badChar[text[s + j]] ?? -1));
      log(\`Mismatch at j=\${j}, shifting by \${shift}\`);
      s += shift;
    }
  }
  
  log(\`Total matches: \${matches.length}\`);
  return matches;
}

boyerMoore("AABAACAADAABAAABAA", "AABA");
`,

    java: `// Boyer-Moore Pattern Search - Java
import java.util.*;

public class BoyerMoore {
    public static List<Integer> search(String text, String pattern) {
        List<Integer> matches = new ArrayList<>();
        int n = text.length(), m = pattern.length();
        
        // Bad character table
        int[] badChar = new int[256];
        Arrays.fill(badChar, -1);
        for (int i = 0; i < m; i++) {
            badChar[pattern.charAt(i)] = i;
        }
        
        int s = 0;
        while (s <= n - m) {
            int j = m - 1;
            while (j >= 0 && pattern.charAt(j) == text.charAt(s + j)) j--;
            
            if (j < 0) {
                matches.add(s);
                s += (s + m < n) ? m - badChar[text.charAt(s + m)] : 1;
            } else {
                s += Math.max(1, j - badChar[text.charAt(s + j)]);
            }
        }
        return matches;
    }
    
    public static void main(String[] args) {
        System.out.println("Matches: " + search("AABAACAADAABAAABAA", "AABA"));
    }
}
`,

    python: `# Boyer-Moore Pattern Search (Bad Character Heuristic) - Python

def boyer_moore(text, pattern):
    n, m = len(text), len(pattern)
    matches = []
    
    # Build bad character table
    bad_char = {c: i for i, c in enumerate(pattern)}
    
    s = 0
    while s <= n - m:
        j = m - 1
        
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1
        
        if j < 0:
            matches.append(s)
            s += m - bad_char.get(text[s + m], -1) if s + m < n else 1
        else:
            s += max(1, j - bad_char.get(text[s + j], -1))
    
    return matches


print(f"Matches: {boyer_moore('AABAACAADAABAAABAA', 'AABA')}")
`,

    cpp: `// Boyer-Moore Pattern Search - C++
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> boyerMoore(string text, string pattern) {
    vector<int> matches;
    int n = text.length(), m = pattern.length();
    
    vector<int> badChar(256, -1);
    for (int i = 0; i < m; i++) badChar[pattern[i]] = i;
    
    int s = 0;
    while (s <= n - m) {
        int j = m - 1;
        while (j >= 0 && pattern[j] == text[s + j]) j--;
        
        if (j < 0) {
            matches.push_back(s);
            s += (s + m < n) ? m - badChar[text[s + m]] : 1;
        } else {
            s += max(1, j - badChar[text[s + j]]);
        }
    }
    return matches;
}

int main() {
    auto matches = boyerMoore("AABAACAADAABAAABAA", "AABA");
    cout << "Matches: ";
    for (int idx : matches) cout << idx << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Boyer-Moore Pattern Search - Go
package main

import "fmt"

func boyerMoore(text, pattern string) []int {
    n, m := len(text), len(pattern)
    var matches []int
    
    badChar := make(map[byte]int)
    for i := 0; i < m; i++ {
        badChar[pattern[i]] = i
    }
    
    s := 0
    for s <= n-m {
        j := m - 1
        for j >= 0 && pattern[j] == text[s+j] {
            j--
        }
        
        if j < 0 {
            matches = append(matches, s)
            if s+m < n {
                if idx, ok := badChar[text[s+m]]; ok {
                    s += m - idx
                } else {
                    s += m + 1
                }
            } else {
                s++
            }
        } else {
            shift := 1
            if idx, ok := badChar[text[s+j]]; ok {
                shift = max(1, j-idx)
            } else {
                shift = j + 1
            }
            s += shift
        }
    }
    return matches
}

func main() {
    fmt.Printf("Matches: %v\\n", boyerMoore("AABAACAADAABAAABAA", "AABA"))
}
`,
  },
};
