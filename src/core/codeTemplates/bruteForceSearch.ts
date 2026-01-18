import { AlgorithmCodeTemplates } from './types';

export const bruteForceSearchCode: AlgorithmCodeTemplates = {
  algorithmId: 'brute-force-search',
  algorithmName: 'Brute Force Search',
  category: 'strings',
  templates: {
    javascript: `// Brute Force Pattern Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// O(n*m) time complexity

function bruteForceSearch(text, pattern) {
  log(\`Searching for "\${pattern}" in "\${text}"\`);
  
  const n = text.length;
  const m = pattern.length;
  const matches = [];
  
  for (let i = 0; i <= n - m; i++) {
    visit(i);
    let j = 0;
    
    log(\`Checking position \${i}...\`);
    
    while (j < m && text[i + j] === pattern[j]) {
      compare(i + j, i + j);
      mark(i + j, 'comparing');
      j++;
    }
    
    if (j === m) {
      // Pattern found at index i
      log(\`Found match at index \${i}!\`);
      matches.push(i);
      for (let k = i; k < i + m; k++) {
        mark(k, 'found');
      }
    } else {
      mark(i, 'eliminated');
    }
  }
  
  if (matches.length === 0) {
    log('No matches found');
  } else {
    log(\`Total matches: \${matches.length}\`);
  }
  
  return matches;
}

bruteForceSearch("AABAACAADAABAAABAA", "AABA");
`,

    java: `// Brute Force Pattern Search - Java
import java.util.*;

public class BruteForceSearch {
    public static List<Integer> search(String text, String pattern) {
        List<Integer> matches = new ArrayList<>();
        int n = text.length();
        int m = pattern.length();
        
        for (int i = 0; i <= n - m; i++) {
            int j = 0;
            
            while (j < m && text.charAt(i + j) == pattern.charAt(j)) {
                j++;
            }
            
            if (j == m) {
                matches.add(i);
            }
        }
        
        return matches;
    }
    
    public static void main(String[] args) {
        String text = "AABAACAADAABAAABAA";
        String pattern = "AABA";
        List<Integer> matches = search(text, pattern);
        System.out.println("Matches at indices: " + matches);
    }
}
`,

    python: `# Brute Force Pattern Search - Python

def brute_force_search(text, pattern):
    matches = []
    n, m = len(text), len(pattern)
    
    for i in range(n - m + 1):
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j += 1
        
        if j == m:
            matches.append(i)
    
    return matches


text = "AABAACAADAABAAABAA"
pattern = "AABA"
matches = brute_force_search(text, pattern)
print(f"Matches at indices: {matches}")
`,

    cpp: `// Brute Force Pattern Search - C++
#include <iostream>
#include <string>
#include <vector>
using namespace std;

vector<int> bruteForceSearch(string text, string pattern) {
    vector<int> matches;
    int n = text.length();
    int m = pattern.length();
    
    for (int i = 0; i <= n - m; i++) {
        int j = 0;
        
        while (j < m && text[i + j] == pattern[j]) {
            j++;
        }
        
        if (j == m) {
            matches.push_back(i);
        }
    }
    
    return matches;
}

int main() {
    string text = "AABAACAADAABAAABAA";
    string pattern = "AABA";
    vector<int> matches = bruteForceSearch(text, pattern);
    
    cout << "Matches at indices: ";
    for (int idx : matches) cout << idx << " ";
    cout << endl;
    
    return 0;
}
`,

    go: `// Brute Force Pattern Search - Go
package main

import "fmt"

func bruteForceSearch(text, pattern string) []int {
    var matches []int
    n, m := len(text), len(pattern)
    
    for i := 0; i <= n-m; i++ {
        j := 0
        for j < m && text[i+j] == pattern[j] {
            j++
        }
        
        if j == m {
            matches = append(matches, i)
        }
    }
    
    return matches
}

func main() {
    text := "AABAACAADAABAAABAA"
    pattern := "AABA"
    matches := bruteForceSearch(text, pattern)
    fmt.Printf("Matches at indices: %v\\n", matches)
}
`,
  },
};
