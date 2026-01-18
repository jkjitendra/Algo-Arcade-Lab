import { AlgorithmCodeTemplates } from './types';

export const stringRotationCode: AlgorithmCodeTemplates = {
  algorithmId: 'string-rotation',
  algorithmName: 'String Rotation',
  category: 'strings',
  templates: {
    javascript: `// String Rotation Check - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Check if s2 is a rotation of s1

function isRotation(s1, s2) {
  log(\`Checking if "\${s2}" is a rotation of "\${s1}"\`);
  
  if (s1.length !== s2.length) {
    log('Different lengths - Not a rotation');
    return false;
  }
  
  if (s1.length === 0) {
    log('Empty strings - Are rotations');
    return true;
  }
  
  // Concatenate s1 with itself
  const doubled = s1 + s1;
  log(\`Doubled string: "\${doubled}"\`);
  
  // Check if s2 is a substring of doubled
  for (let i = 0; i <= doubled.length - s2.length; i++) {
    visit(i);
    let match = true;
    
    for (let j = 0; j < s2.length; j++) {
      compare(i + j, j);
      if (doubled[i + j] !== s2[j]) {
        match = false;
        break;
      }
    }
    
    if (match) {
      for (let k = i; k < i + s2.length; k++) {
        mark(k % s1.length, 'found');
      }
      log(\`Found at index \${i} - Is a rotation!\`);
      return true;
    }
  }
  
  log('Not a rotation');
  return false;
}

// Test cases
isRotation("ABCD", "CDAB");
`,

    java: `// String Rotation Check - Java
public class StringRotation {
    public static boolean isRotation(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        if (s1.isEmpty()) return true;
        
        String doubled = s1 + s1;
        return doubled.contains(s2);
    }
    
    public static void main(String[] args) {
        System.out.println("'ABCD' and 'CDAB': " + isRotation("ABCD", "CDAB"));
        System.out.println("'ABCD' and 'ACBD': " + isRotation("ABCD", "ACBD"));
    }
}
`,

    python: `# String Rotation Check - Python

def is_rotation(s1, s2):
    if len(s1) != len(s2):
        return False
    if not s1:
        return True
    
    doubled = s1 + s1
    return s2 in doubled


print(f"'ABCD' and 'CDAB': {is_rotation('ABCD', 'CDAB')}")
print(f"'ABCD' and 'ACBD': {is_rotation('ABCD', 'ACBD')}")
`,

    cpp: `// String Rotation Check - C++
#include <iostream>
#include <string>
using namespace std;

bool isRotation(string s1, string s2) {
    if (s1.length() != s2.length()) return false;
    if (s1.empty()) return true;
    
    string doubled = s1 + s1;
    return doubled.find(s2) != string::npos;
}

int main() {
    cout << "'ABCD' and 'CDAB': " << (isRotation("ABCD", "CDAB") ? "true" : "false") << endl;
    cout << "'ABCD' and 'ACBD': " << (isRotation("ABCD", "ACBD") ? "true" : "false") << endl;
    return 0;
}
`,

    go: `// String Rotation Check - Go
package main

import (
    "fmt"
    "strings"
)

func isRotation(s1, s2 string) bool {
    if len(s1) != len(s2) {
        return false
    }
    if s1 == "" {
        return true
    }
    
    doubled := s1 + s1
    return strings.Contains(doubled, s2)
}

func main() {
    fmt.Printf("'ABCD' and 'CDAB': %v\\n", isRotation("ABCD", "CDAB"))
    fmt.Printf("'ABCD' and 'ACBD': %v\\n", isRotation("ABCD", "ACBD"))
}
`,
  },
};
