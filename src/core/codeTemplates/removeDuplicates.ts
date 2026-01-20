import { AlgorithmCodeTemplates } from './types';

export const removeDuplicatesCode: AlgorithmCodeTemplates = {
  algorithmId: 'remove-duplicates',
  algorithmName: 'Remove Duplicates',
  category: 'strings',
  templates: {
    javascript: `// Remove Duplicate Characters from String - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function removeDuplicates(str) {
  log(\`Removing duplicates from "\${str}"\`);
  
  const seen = new Set();
  let result = '';
  
  for (let i = 0; i < str.length; i++) {
    visit(i);
    const char = str[i];
    
    if (!seen.has(char)) {
      seen.add(char);
      result += char;
      mark(i, 'found');
      log(\`Adding '\${char}' to result\`);
    } else {
      mark(i, 'eliminated');
      log(\`Skipping duplicate '\${char}'\`);
    }
  }
  
  log(\`Result: "\${result}"\`);
  return result;
}

removeDuplicates("programming");
`,

    java: `// Remove Duplicate Characters from String - Java
import java.util.*;

public class RemoveDuplicates {
    // Using LinkedHashSet to maintain order
    public static String removeDuplicates(String str) {
        Set<Character> seen = new LinkedHashSet<>();
        for (char c : str.toCharArray()) {
            seen.add(c);
        }
        
        StringBuilder sb = new StringBuilder();
        for (char c : seen) {
            sb.append(c);
        }
        return sb.toString();
    }
    
    // Alternative: Using StringBuilder
    public static String removeDuplicates2(String str) {
        StringBuilder sb = new StringBuilder();
        Set<Character> seen = new HashSet<>();
        
        for (char c : str.toCharArray()) {
            if (!seen.contains(c)) {
                seen.add(c);
                sb.append(c);
            }
        }
        return sb.toString();
    }
    
    public static void main(String[] args) {
        System.out.println(removeDuplicates("programming"));
    }
}
`,

    python: `# Remove Duplicate Characters from String - Python

def remove_duplicates(s):
    seen = set()
    result = []
    
    for char in s:
        if char not in seen:
            seen.add(char)
            result.append(char)
    
    return ''.join(result)


# Alternative using dict (Python 3.7+ maintains insertion order)
def remove_duplicates_dict(s):
    return ''.join(dict.fromkeys(s))


print(f"Result: {remove_duplicates('programming')}")
`,

    cpp: `// Remove Duplicate Characters from String - C++
#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

string removeDuplicates(string str) {
    unordered_set<char> seen;
    string result;
    
    for (char c : str) {
        if (seen.find(c) == seen.end()) {
            seen.insert(c);
            result += c;
        }
    }
    
    return result;
}

int main() {
    cout << "Result: " << removeDuplicates("programming") << endl;
    return 0;
}
`,

    go: `// Remove Duplicate Characters from String - Go
package main

import "fmt"

func removeDuplicates(s string) string {
    seen := make(map[rune]bool)
    var result []rune
    
    for _, c := range s {
        if !seen[c] {
            seen[c] = true
            result = append(result, c)
        }
    }
    
    return string(result)
}

func main() {
    fmt.Printf("Result: %s\\n", removeDuplicates("programming"))
}
`,
  },
};
