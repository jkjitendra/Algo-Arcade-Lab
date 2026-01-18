import { AlgorithmCodeTemplates } from './types';

export const anagramDetectionCode: AlgorithmCodeTemplates = {
  algorithmId: 'anagram-detection',
  algorithmName: 'Anagram Detection',
  category: 'strings',
  templates: {
    javascript: `// Anagram Detection - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function areAnagrams(s1, s2) {
  log(\`Checking if "\${s1}" and "\${s2}" are anagrams\`);
  
  // Remove spaces and convert to lowercase
  s1 = s1.replace(/\\s/g, '').toLowerCase();
  s2 = s2.replace(/\\s/g, '').toLowerCase();
  
  if (s1.length !== s2.length) {
    log('Different lengths - Not anagrams');
    return false;
  }
  
  // Build frequency map for s1
  const freq = {};
  for (let i = 0; i < s1.length; i++) {
    visit(i);
    freq[s1[i]] = (freq[s1[i]] || 0) + 1;
    mark(i, 'current');
  }
  
  log(\`Frequency map from s1: \${JSON.stringify(freq)}\`);
  
  // Subtract frequencies using s2
  for (let i = 0; i < s2.length; i++) {
    compare(i, i);
    if (!freq[s2[i]]) {
      log(\`Character '\${s2[i]}' not found or count exceeded\`);
      mark(i, 'eliminated');
      return false;
    }
    freq[s2[i]]--;
    mark(i, 'found');
  }
  
  log('Are anagrams: true');
  return true;
}

// Test cases
areAnagrams("listen", "silent");
`,

    java: `// Anagram Detection - Java
import java.util.*;

public class AnagramDetection {
    public static boolean areAnagrams(String s1, String s2) {
        s1 = s1.replaceAll("\\\\s", "").toLowerCase();
        s2 = s2.replaceAll("\\\\s", "").toLowerCase();
        
        if (s1.length() != s2.length()) return false;
        
        int[] freq = new int[26];
        for (char c : s1.toCharArray()) freq[c - 'a']++;
        for (char c : s2.toCharArray()) {
            if (--freq[c - 'a'] < 0) return false;
        }
        
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println("'listen' and 'silent': " + areAnagrams("listen", "silent"));
        System.out.println("'hello' and 'world': " + areAnagrams("hello", "world"));
    }
}
`,

    python: `# Anagram Detection - Python
from collections import Counter

def are_anagrams(s1, s2):
    s1 = s1.replace(' ', '').lower()
    s2 = s2.replace(' ', '').lower()
    
    return Counter(s1) == Counter(s2)


# Alternative: sorted approach
def are_anagrams_sorted(s1, s2):
    s1 = ''.join(sorted(s1.replace(' ', '').lower()))
    s2 = ''.join(sorted(s2.replace(' ', '').lower()))
    return s1 == s2


print(f"'listen' and 'silent': {are_anagrams('listen', 'silent')}")
print(f"'hello' and 'world': {are_anagrams('hello', 'world')}")
`,

    cpp: `// Anagram Detection - C++
#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

bool areAnagrams(string s1, string s2) {
    // Remove spaces and convert to lowercase
    s1.erase(remove(s1.begin(), s1.end(), ' '), s1.end());
    s2.erase(remove(s2.begin(), s2.end(), ' '), s2.end());
    transform(s1.begin(), s1.end(), s1.begin(), ::tolower);
    transform(s2.begin(), s2.end(), s2.begin(), ::tolower);
    
    if (s1.length() != s2.length()) return false;
    
    sort(s1.begin(), s1.end());
    sort(s2.begin(), s2.end());
    
    return s1 == s2;
}

int main() {
    cout << "'listen' and 'silent': " << (areAnagrams("listen", "silent") ? "true" : "false") << endl;
    cout << "'hello' and 'world': " << (areAnagrams("hello", "world") ? "true" : "false") << endl;
    return 0;
}
`,

    go: `// Anagram Detection - Go
package main

import (
    "fmt"
    "sort"
    "strings"
)

func areAnagrams(s1, s2 string) bool {
    s1 = strings.ToLower(strings.ReplaceAll(s1, " ", ""))
    s2 = strings.ToLower(strings.ReplaceAll(s2, " ", ""))
    
    if len(s1) != len(s2) {
        return false
    }
    
    r1, r2 := []rune(s1), []rune(s2)
    sort.Slice(r1, func(i, j int) bool { return r1[i] < r1[j] })
    sort.Slice(r2, func(i, j int) bool { return r2[i] < r2[j] })
    
    return string(r1) == string(r2)
}

func main() {
    fmt.Printf("'listen' and 'silent': %v\\n", areAnagrams("listen", "silent"))
    fmt.Printf("'hello' and 'world': %v\\n", areAnagrams("hello", "world"))
}
`,
  },
};
