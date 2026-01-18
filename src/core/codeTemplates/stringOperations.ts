import { AlgorithmCodeTemplates } from './types';

export const stringOperationsCode: AlgorithmCodeTemplates = {
  algorithmId: 'string-operations',
  algorithmName: 'String Operations',
  category: 'strings',
  templates: {
    javascript: `// Basic String Operations - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function stringOperations(str) {
  log(\`String Operations Demo on "\${str}"\`);
  log(\`Length: \${str.length}\`);
  
  // 1. Reverse a string
  const reversed = str.split('').reverse().join('');
  log(\`Reversed: "\${reversed}"\`);
  
  // 2. Check if palindrome
  const isPalindrome = str === reversed;
  log(\`Is Palindrome: \${isPalindrome}\`);
  
  // 3. Count vowels
  const vowels = str.match(/[aeiou]/gi) || [];
  log(\`Vowel count: \${vowels.length}\`);
  
  // 4. To uppercase/lowercase
  log(\`Uppercase: "\${str.toUpperCase()}"\`);
  log(\`Lowercase: "\${str.toLowerCase()}"\`);
  
  // 5. Find substring
  const subStr = "lo";
  const index = str.indexOf(subStr);
  log(\`Index of "\${subStr}": \${index}\`);
  
  // Visualize character by character
  for (let i = 0; i < str.length && i < 20; i++) {
    visit(i);
    mark(i, 'current');
  }
  
  return { reversed, isPalindrome, vowelCount: vowels.length };
}

// Demo with sample string
stringOperations("hello");
`,

    java: `// Basic String Operations - Java
public class StringOperations {
    public static void main(String[] args) {
        String str = "hello";
        
        // Length
        System.out.println("Length: " + str.length());
        
        // Reverse
        String reversed = new StringBuilder(str).reverse().toString();
        System.out.println("Reversed: " + reversed);
        
        // Check palindrome
        boolean isPalindrome = str.equals(reversed);
        System.out.println("Is Palindrome: " + isPalindrome);
        
        // To uppercase/lowercase
        System.out.println("Uppercase: " + str.toUpperCase());
        System.out.println("Lowercase: " + str.toLowerCase());
        
        // Substring
        System.out.println("Substring(1,4): " + str.substring(1, 4));
        
        // Find character
        System.out.println("Index of 'l': " + str.indexOf('l'));
    }
}
`,

    python: `# Basic String Operations - Python

def string_operations(s):
    print(f"String: '{s}'")
    print(f"Length: {len(s)}")
    
    # Reverse
    reversed_str = s[::-1]
    print(f"Reversed: '{reversed_str}'")
    
    # Check palindrome
    is_palindrome = s == reversed_str
    print(f"Is Palindrome: {is_palindrome}")
    
    # Count vowels
    vowels = sum(1 for c in s.lower() if c in 'aeiou')
    print(f"Vowel count: {vowels}")
    
    # Case conversion
    print(f"Uppercase: '{s.upper()}'")
    print(f"Lowercase: '{s.lower()}'")
    
    # Find substring
    print(f"Index of 'lo': {s.find('lo')}")
    
    return reversed_str, is_palindrome, vowels


string_operations("hello")
`,

    cpp: `// Basic String Operations - C++
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string str = "hello";
    
    cout << "Length: " << str.length() << endl;
    
    // Reverse
    string reversed = str;
    reverse(reversed.begin(), reversed.end());
    cout << "Reversed: " << reversed << endl;
    
    // Check palindrome
    bool isPalindrome = (str == reversed);
    cout << "Is Palindrome: " << (isPalindrome ? "true" : "false") << endl;
    
    // Uppercase (copy to new string)
    string upper = str;
    transform(upper.begin(), upper.end(), upper.begin(), ::toupper);
    cout << "Uppercase: " << upper << endl;
    
    // Find substring
    size_t pos = str.find("lo");
    cout << "Index of 'lo': " << (pos != string::npos ? to_string(pos) : "not found") << endl;
    
    return 0;
}
`,

    go: `// Basic String Operations - Go
package main

import (
    "fmt"
    "strings"
)

func reverseString(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func main() {
    str := "hello"
    
    fmt.Printf("Length: %d\\n", len(str))
    
    reversed := reverseString(str)
    fmt.Printf("Reversed: %s\\n", reversed)
    
    isPalindrome := str == reversed
    fmt.Printf("Is Palindrome: %v\\n", isPalindrome)
    
    fmt.Printf("Uppercase: %s\\n", strings.ToUpper(str))
    fmt.Printf("Lowercase: %s\\n", strings.ToLower(str))
    
    fmt.Printf("Index of 'lo': %d\\n", strings.Index(str, "lo"))
}
`,
  },
};
