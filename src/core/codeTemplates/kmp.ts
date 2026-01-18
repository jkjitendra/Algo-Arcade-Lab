import { AlgorithmCodeTemplates } from './types';

export const kmpCode: AlgorithmCodeTemplates = {
  algorithmId: 'kmp',
  algorithmName: 'KMP Algorithm',
  category: 'strings',
  templates: {
    javascript: `// KMP (Knuth-Morris-Pratt) Pattern Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// O(n+m) time complexity

function computeLPS(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let len = 0;
  let i = 1;
  
  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  
  return lps;
}

function kmpSearch(text, pattern) {
  log(\`KMP Search for "\${pattern}" in "\${text}"\`);
  
  const n = text.length;
  const m = pattern.length;
  const lps = computeLPS(pattern);
  
  log(\`LPS array: [\${lps.join(', ')}]\`);
  
  const matches = [];
  let i = 0, j = 0;
  
  while (i < n) {
    visit(i);
    compare(i, j);
    
    if (pattern[j] === text[i]) {
      mark(i, 'comparing');
      i++;
      j++;
    }
    
    if (j === m) {
      log(\`Found match at index \${i - j}!\`);
      matches.push(i - j);
      for (let k = i - j; k < i; k++) {
        mark(k, 'found');
      }
      j = lps[j - 1];
    } else if (i < n && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        mark(i, 'eliminated');
        i++;
      }
    }
  }
  
  log(\`Total matches: \${matches.length}\`);
  return matches;
}

kmpSearch("AABAACAADAABAAABAA", "AABA");
`,

    java: `// KMP (Knuth-Morris-Pratt) Pattern Search - Java
import java.util.*;

public class KMP {
    private static int[] computeLPS(String pattern) {
        int m = pattern.length();
        int[] lps = new int[m];
        int len = 0, i = 1;
        
        while (i < m) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                lps[i++] = ++len;
            } else if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }
        return lps;
    }
    
    public static List<Integer> search(String text, String pattern) {
        List<Integer> matches = new ArrayList<>();
        int n = text.length(), m = pattern.length();
        int[] lps = computeLPS(pattern);
        
        int i = 0, j = 0;
        while (i < n) {
            if (pattern.charAt(j) == text.charAt(i)) {
                i++; j++;
            }
            if (j == m) {
                matches.add(i - j);
                j = lps[j - 1];
            } else if (i < n && pattern.charAt(j) != text.charAt(i)) {
                j = (j != 0) ? lps[j - 1] : 0;
                if (j == 0) i++;
            }
        }
        return matches;
    }
    
    public static void main(String[] args) {
        System.out.println("Matches: " + search("AABAACAADAABAAABAA", "AABA"));
    }
}
`,

    python: `# KMP (Knuth-Morris-Pratt) Pattern Search - Python

def compute_lps(pattern):
    m = len(pattern)
    lps = [0] * m
    length = 0
    i = 1
    
    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length != 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1
    
    return lps

def kmp_search(text, pattern):
    n, m = len(text), len(pattern)
    lps = compute_lps(pattern)
    matches = []
    
    i = j = 0
    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1
        
        if j == m:
            matches.append(i - j)
            j = lps[j - 1]
        elif i < n and pattern[j] != text[i]:
            j = lps[j - 1] if j != 0 else 0
            if j == 0 and pattern[j] != text[i]:
                i += 1
    
    return matches


print(f"Matches: {kmp_search('AABAACAADAABAAABAA', 'AABA')}")
`,

    cpp: `// KMP Pattern Search - C++
#include <iostream>
#include <string>
#include <vector>
using namespace std;

vector<int> computeLPS(string pattern) {
    int m = pattern.length();
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            lps[i++] = ++len;
        } else if (len != 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

vector<int> kmpSearch(string text, string pattern) {
    vector<int> matches;
    int n = text.length(), m = pattern.length();
    vector<int> lps = computeLPS(pattern);
    
    int i = 0, j = 0;
    while (i < n) {
        if (pattern[j] == text[i]) { i++; j++; }
        if (j == m) {
            matches.push_back(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] != text[i]) {
            j = (j != 0) ? lps[j - 1] : 0;
            if (j == 0 && pattern[j] != text[i]) i++;
        }
    }
    return matches;
}

int main() {
    auto matches = kmpSearch("AABAACAADAABAAABAA", "AABA");
    cout << "Matches: ";
    for (int idx : matches) cout << idx << " ";
    cout << endl;
    return 0;
}
`,

    go: `// KMP Pattern Search - Go
package main

import "fmt"

func computeLPS(pattern string) []int {
    m := len(pattern)
    lps := make([]int, m)
    length := 0
    i := 1
    
    for i < m {
        if pattern[i] == pattern[length] {
            length++
            lps[i] = length
            i++
        } else if length != 0 {
            length = lps[length-1]
        } else {
            lps[i] = 0
            i++
        }
    }
    return lps
}

func kmpSearch(text, pattern string) []int {
    n, m := len(text), len(pattern)
    lps := computeLPS(pattern)
    var matches []int
    
    i, j := 0, 0
    for i < n {
        if pattern[j] == text[i] {
            i++
            j++
        }
        if j == m {
            matches = append(matches, i-j)
            j = lps[j-1]
        } else if i < n && pattern[j] != text[i] {
            if j != 0 {
                j = lps[j-1]
            } else {
                i++
            }
        }
    }
    return matches
}

func main() {
    fmt.Printf("Matches: %v\\n", kmpSearch("AABAACAADAABAAABAA", "AABA"))
}
`,
  },
};
