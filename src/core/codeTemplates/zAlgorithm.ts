import { AlgorithmCodeTemplates } from './types';

export const zAlgorithmCode: AlgorithmCodeTemplates = {
  algorithmId: 'z-algorithm',
  algorithmName: 'Z-Algorithm',
  category: 'strings',
  templates: {
    javascript: `// Z-Algorithm Pattern Search - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// O(n+m) time complexity

function zFunction(s) {
  const n = s.length;
  const z = new Array(n).fill(0);
  let l = 0, r = 0;
  
  for (let i = 1; i < n; i++) {
    if (i < r) {
      z[i] = Math.min(r - i, z[i - l]);
    }
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      z[i]++;
    }
    if (i + z[i] > r) {
      l = i;
      r = i + z[i];
    }
  }
  
  return z;
}

function zAlgorithmSearch(text, pattern) {
  log(\`Z-Algorithm Search for "\${pattern}" in "\${text}"\`);
  
  const concat = pattern + "$" + text;
  const z = zFunction(concat);
  const matches = [];
  const m = pattern.length;
  
  log(\`Z-array: [\${z.join(', ')}]\`);
  
  for (let i = m + 1; i < concat.length; i++) {
    visit(i - m - 1);
    
    if (z[i] === m) {
      const matchIndex = i - m - 1;
      log(\`Found match at index \${matchIndex}!\`);
      matches.push(matchIndex);
      
      for (let k = matchIndex; k < matchIndex + m; k++) {
        mark(k, 'found');
      }
    } else if (z[i] > 0) {
      mark(i - m - 1, 'comparing');
    }
  }
  
  log(\`Total matches: \${matches.length}\`);
  return matches;
}

zAlgorithmSearch("AABAACAADAABAAABAA", "AABA");
`,

    java: `// Z-Algorithm Pattern Search - Java
import java.util.*;

public class ZAlgorithm {
    private static int[] zFunction(String s) {
        int n = s.length();
        int[] z = new int[n];
        int l = 0, r = 0;
        
        for (int i = 1; i < n; i++) {
            if (i < r) z[i] = Math.min(r - i, z[i - l]);
            while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) z[i]++;
            if (i + z[i] > r) { l = i; r = i + z[i]; }
        }
        return z;
    }
    
    public static List<Integer> search(String text, String pattern) {
        String concat = pattern + "$" + text;
        int[] z = zFunction(concat);
        List<Integer> matches = new ArrayList<>();
        int m = pattern.length();
        
        for (int i = m + 1; i < concat.length(); i++) {
            if (z[i] == m) matches.add(i - m - 1);
        }
        return matches;
    }
    
    public static void main(String[] args) {
        System.out.println("Matches: " + search("AABAACAADAABAAABAA", "AABA"));
    }
}
`,

    python: `# Z-Algorithm Pattern Search - Python

def z_function(s):
    n = len(s)
    z = [0] * n
    l, r = 0, 0
    
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    
    return z

def z_algorithm_search(text, pattern):
    concat = pattern + "$" + text
    z = z_function(concat)
    m = len(pattern)
    
    matches = [i - m - 1 for i in range(m + 1, len(concat)) if z[i] == m]
    return matches


print(f"Matches: {z_algorithm_search('AABAACAADAABAAABAA', 'AABA')}")
`,

    cpp: `// Z-Algorithm Pattern Search - C++
#include <iostream>
#include <string>
#include <vector>
using namespace std;

vector<int> zFunction(string s) {
    int n = s.length();
    vector<int> z(n, 0);
    int l = 0, r = 0;
    
    for (int i = 1; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}

vector<int> zAlgorithmSearch(string text, string pattern) {
    string concat = pattern + "$" + text;
    vector<int> z = zFunction(concat);
    vector<int> matches;
    int m = pattern.length();
    
    for (int i = m + 1; i < concat.length(); i++) {
        if (z[i] == m) matches.push_back(i - m - 1);
    }
    return matches;
}

int main() {
    auto matches = zAlgorithmSearch("AABAACAADAABAAABAA", "AABA");
    cout << "Matches: ";
    for (int idx : matches) cout << idx << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Z-Algorithm Pattern Search - Go
package main

import "fmt"

func zFunction(s string) []int {
    n := len(s)
    z := make([]int, n)
    l, r := 0, 0
    
    for i := 1; i < n; i++ {
        if i < r {
            z[i] = min(r-i, z[i-l])
        }
        for i+z[i] < n && s[z[i]] == s[i+z[i]] {
            z[i]++
        }
        if i+z[i] > r {
            l, r = i, i+z[i]
        }
    }
    return z
}

func zAlgorithmSearch(text, pattern string) []int {
    concat := pattern + "$" + text
    z := zFunction(concat)
    var matches []int
    m := len(pattern)
    
    for i := m + 1; i < len(concat); i++ {
        if z[i] == m {
            matches = append(matches, i-m-1)
        }
    }
    return matches
}

func main() {
    fmt.Printf("Matches: %v\\n", zAlgorithmSearch("AABAACAADAABAAABAA", "AABA"))
}
`,
  },
};
