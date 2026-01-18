import { AlgorithmCodeTemplates } from './types';

export const rabinKarpCode: AlgorithmCodeTemplates = {
  algorithmId: 'rabin-karp',
  algorithmName: 'Rabin-Karp Algorithm',
  category: 'strings',
  templates: {
    javascript: `// Rabin-Karp Pattern Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Uses rolling hash for O(n+m) average time complexity

function rabinKarp(text, pattern) {
  log(\`Rabin-Karp Search for "\${pattern}" in "\${text}"\`);
  
  const d = 256; // Number of characters in alphabet
  const q = 101; // A prime number for modulo
  const n = text.length;
  const m = pattern.length;
  const matches = [];
  
  let h = 1; // d^(m-1) % q
  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }
  
  // Calculate initial hash values
  let patternHash = 0;
  let textHash = 0;
  for (let i = 0; i < m; i++) {
    patternHash = (d * patternHash + pattern.charCodeAt(i)) % q;
    textHash = (d * textHash + text.charCodeAt(i)) % q;
  }
  
  log(\`Pattern hash: \${patternHash}\`);
  
  // Slide pattern over text
  for (let i = 0; i <= n - m; i++) {
    visit(i);
    log(\`Window hash at \${i}: \${textHash}\`);
    
    // Check hash match
    if (patternHash === textHash) {
      // Verify character by character
      let match = true;
      for (let j = 0; j < m; j++) {
        compare(i + j, i + j);
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      
      if (match) {
        log(\`Found match at index \${i}!\`);
        matches.push(i);
        for (let k = i; k < i + m; k++) {
          mark(k, 'found');
        }
      }
    }
    
    // Calculate hash for next window
    if (i < n - m) {
      textHash = (d * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (textHash < 0) textHash += q;
    }
  }
  
  log(\`Total matches: \${matches.length}\`);
  return matches;
}

rabinKarp("AABAACAADAABAAABAA", "AABA");
`,

    java: `// Rabin-Karp Pattern Search - Java
import java.util.*;

public class RabinKarp {
    static final int d = 256;
    static final int q = 101;
    
    public static List<Integer> search(String text, String pattern) {
        List<Integer> matches = new ArrayList<>();
        int n = text.length(), m = pattern.length();
        int h = 1, patternHash = 0, textHash = 0;
        
        for (int i = 0; i < m - 1; i++) h = (h * d) % q;
        
        for (int i = 0; i < m; i++) {
            patternHash = (d * patternHash + pattern.charAt(i)) % q;
            textHash = (d * textHash + text.charAt(i)) % q;
        }
        
        for (int i = 0; i <= n - m; i++) {
            if (patternHash == textHash) {
                boolean match = true;
                for (int j = 0; j < m; j++) {
                    if (text.charAt(i + j) != pattern.charAt(j)) {
                        match = false;
                        break;
                    }
                }
                if (match) matches.add(i);
            }
            
            if (i < n - m) {
                textHash = (d * (textHash - text.charAt(i) * h) + text.charAt(i + m)) % q;
                if (textHash < 0) textHash += q;
            }
        }
        return matches;
    }
    
    public static void main(String[] args) {
        System.out.println("Matches: " + search("AABAACAADAABAAABAA", "AABA"));
    }
}
`,

    python: `# Rabin-Karp Pattern Search - Python

def rabin_karp(text, pattern):
    d = 256  # alphabet size
    q = 101  # prime modulo
    n, m = len(text), len(pattern)
    matches = []
    
    h = pow(d, m - 1, q)
    pattern_hash = 0
    text_hash = 0
    
    # Calculate initial hashes
    for i in range(m):
        pattern_hash = (d * pattern_hash + ord(pattern[i])) % q
        text_hash = (d * text_hash + ord(text[i])) % q
    
    # Slide pattern over text
    for i in range(n - m + 1):
        if pattern_hash == text_hash:
            if text[i:i+m] == pattern:
                matches.append(i)
        
        if i < n - m:
            text_hash = (d * (text_hash - ord(text[i]) * h) + ord(text[i + m])) % q
    
    return matches


print(f"Matches: {rabin_karp('AABAACAADAABAAABAA', 'AABA')}")
`,

    cpp: `// Rabin-Karp Pattern Search - C++
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int d = 256;
const int q = 101;

vector<int> rabinKarp(string text, string pattern) {
    vector<int> matches;
    int n = text.length(), m = pattern.length();
    int h = 1, patternHash = 0, textHash = 0;
    
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;
    
    for (int i = 0; i < m; i++) {
        patternHash = (d * patternHash + pattern[i]) % q;
        textHash = (d * textHash + text[i]) % q;
    }
    
    for (int i = 0; i <= n - m; i++) {
        if (patternHash == textHash) {
            if (text.substr(i, m) == pattern) {
                matches.push_back(i);
            }
        }
        if (i < n - m) {
            textHash = (d * (textHash - text[i] * h) + text[i + m]) % q;
            if (textHash < 0) textHash += q;
        }
    }
    return matches;
}

int main() {
    auto matches = rabinKarp("AABAACAADAABAAABAA", "AABA");
    cout << "Matches: ";
    for (int idx : matches) cout << idx << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Rabin-Karp Pattern Search - Go
package main

import "fmt"

func rabinKarp(text, pattern string) []int {
    const d = 256
    const q = 101
    n, m := len(text), len(pattern)
    var matches []int
    
    h := 1
    for i := 0; i < m-1; i++ {
        h = (h * d) % q
    }
    
    patternHash, textHash := 0, 0
    for i := 0; i < m; i++ {
        patternHash = (d*patternHash + int(pattern[i])) % q
        textHash = (d*textHash + int(text[i])) % q
    }
    
    for i := 0; i <= n-m; i++ {
        if patternHash == textHash {
            if text[i:i+m] == pattern {
                matches = append(matches, i)
            }
        }
        if i < n-m {
            textHash = (d*(textHash-int(text[i])*h) + int(text[i+m])) % q
            if textHash < 0 {
                textHash += q
            }
        }
    }
    return matches
}

func main() {
    fmt.Printf("Matches: %v\\n", rabinKarp("AABAACAADAABAAABAA", "AABA"))
}
`,
  },
};
