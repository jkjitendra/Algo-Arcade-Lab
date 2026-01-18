import { AlgorithmCodeTemplates } from './types';

export const longestPalindromicSubstringCode: AlgorithmCodeTemplates = {
  algorithmId: 'longest-palindromic-substring',
  algorithmName: 'Longest Palindromic Substring',
  category: 'strings',
  templates: {
    javascript: `// Longest Palindromic Substring - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Expand around center approach - O(n^2)

function longestPalindrome(s) {
  log(\`Finding longest palindromic substring in "\${s}"\`);
  
  if (s.length < 2) return s;
  
  let start = 0, maxLen = 1;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      visit(left);
      visit(right);
      compare(left, right);
      
      const len = right - left + 1;
      if (len > maxLen) {
        maxLen = len;
        start = left;
        log(\`New longest: "\${s.substring(left, right + 1)}" (length \${len})\`);
      }
      
      mark(left, 'comparing');
      mark(right, 'comparing');
      left--;
      right++;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    // Odd length palindromes (single center)
    expandAroundCenter(i, i);
    // Even length palindromes (two centers)
    expandAroundCenter(i, i + 1);
  }
  
  const result = s.substring(start, start + maxLen);
  
  // Mark the result
  for (let i = start; i < start + maxLen; i++) {
    mark(i, 'found');
  }
  
  log(\`Longest palindrome: "\${result}" (length \${maxLen})\`);
  return result;
}

longestPalindrome("babad");
`,

    java: `// Longest Palindromic Substring - Java
public class LongestPalindromicSubstring {
    private int start = 0, maxLen = 1;
    
    public String longestPalindrome(String s) {
        if (s.length() < 2) return s;
        
        for (int i = 0; i < s.length(); i++) {
            expandAroundCenter(s, i, i);     // Odd
            expandAroundCenter(s, i, i + 1); // Even
        }
        
        return s.substring(start, start + maxLen);
    }
    
    private void expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            int len = right - left + 1;
            if (len > maxLen) {
                maxLen = len;
                start = left;
            }
            left--;
            right++;
        }
    }
    
    public static void main(String[] args) {
        LongestPalindromicSubstring lps = new LongestPalindromicSubstring();
        System.out.println("Longest: " + lps.longestPalindrome("babad"));
    }
}
`,

    python: `# Longest Palindromic Substring - Python

def longest_palindrome(s):
    if len(s) < 2:
        return s
    
    start, max_len = 0, 1
    
    def expand_around_center(left, right):
        nonlocal start, max_len
        while left >= 0 and right < len(s) and s[left] == s[right]:
            length = right - left + 1
            if length > max_len:
                max_len = length
                start = left
            left -= 1
            right += 1
    
    for i in range(len(s)):
        expand_around_center(i, i)      # Odd
        expand_around_center(i, i + 1)  # Even
    
    return s[start:start + max_len]


print(f"Longest: {longest_palindrome('babad')}")
`,

    cpp: `// Longest Palindromic Substring - C++
#include <iostream>
#include <string>
using namespace std;

class Solution {
    int start = 0, maxLen = 1;
    
    void expandAroundCenter(const string& s, int left, int right) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            int len = right - left + 1;
            if (len > maxLen) {
                maxLen = len;
                start = left;
            }
            left--;
            right++;
        }
    }
    
public:
    string longestPalindrome(string s) {
        if (s.length() < 2) return s;
        
        for (int i = 0; i < s.length(); i++) {
            expandAroundCenter(s, i, i);
            expandAroundCenter(s, i, i + 1);
        }
        
        return s.substr(start, maxLen);
    }
};

int main() {
    Solution sol;
    cout << "Longest: " << sol.longestPalindrome("babad") << endl;
    return 0;
}
`,

    go: `// Longest Palindromic Substring - Go
package main

import "fmt"

func longestPalindrome(s string) string {
    if len(s) < 2 {
        return s
    }
    
    start, maxLen := 0, 1
    
    expandAroundCenter := func(left, right int) {
        for left >= 0 && right < len(s) && s[left] == s[right] {
            length := right - left + 1
            if length > maxLen {
                maxLen = length
                start = left
            }
            left--
            right++
        }
    }
    
    for i := 0; i < len(s); i++ {
        expandAroundCenter(i, i)
        expandAroundCenter(i, i+1)
    }
    
    return s[start : start+maxLen]
}

func main() {
    fmt.Printf("Longest: %s\\n", longestPalindrome("babad"))
}
`,
  },
};
