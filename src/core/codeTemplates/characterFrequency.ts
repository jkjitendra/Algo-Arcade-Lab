import { AlgorithmCodeTemplates } from './types';

export const characterFrequencyCode: AlgorithmCodeTemplates = {
  algorithmId: 'character-frequency',
  algorithmName: 'Character Frequency',
  category: 'strings',
  templates: {
    javascript: `// Character Frequency Counter - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function characterFrequency(str) {
  log(\`Counting character frequencies in "\${str}"\`);
  
  const freq = {};
  
  for (let i = 0; i < str.length; i++) {
    visit(i);
    const char = str[i].toLowerCase();
    
    if (char !== ' ') {
      freq[char] = (freq[char] || 0) + 1;
      mark(i, 'current');
      log(\`'\${char}' count: \${freq[char]}\`);
    }
  }
  
  // Find most frequent character
  let maxChar = '';
  let maxCount = 0;
  for (const [char, count] of Object.entries(freq)) {
    if (count > maxCount) {
      maxCount = count;
      maxChar = char;
    }
  }
  
  log(\`Most frequent: '\${maxChar}' appears \${maxCount} times\`);
  log(\`Frequency map: \${JSON.stringify(freq)}\`);
  
  return freq;
}

characterFrequency("hello world");
`,

    java: `// Character Frequency Counter - Java
import java.util.*;

public class CharacterFrequency {
    public static Map<Character, Integer> countFrequency(String str) {
        Map<Character, Integer> freq = new HashMap<>();
        
        for (char c : str.toLowerCase().toCharArray()) {
            if (c != ' ') {
                freq.put(c, freq.getOrDefault(c, 0) + 1);
            }
        }
        
        return freq;
    }
    
    public static void main(String[] args) {
        String str = "hello world";
        Map<Character, Integer> freq = countFrequency(str);
        
        System.out.println("Character frequencies:");
        freq.forEach((k, v) -> System.out.println("'" + k + "': " + v));
        
        // Find max
        char maxChar = Collections.max(freq.entrySet(), Map.Entry.comparingByValue()).getKey();
        System.out.println("Most frequent: '" + maxChar + "'");
    }
}
`,

    python: `# Character Frequency Counter - Python
from collections import Counter

def character_frequency(s):
    # Remove spaces and convert to lowercase
    s = s.lower().replace(' ', '')
    
    # Count frequencies
    freq = Counter(s)
    
    print("Character frequencies:")
    for char, count in sorted(freq.items()):
        print(f"'{char}': {count}")
    
    # Find most common
    most_common = freq.most_common(1)[0]
    print(f"\\nMost frequent: '{most_common[0]}' appears {most_common[1]} times")
    
    return freq


character_frequency("hello world")
`,

    cpp: `// Character Frequency Counter - C++
#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

map<char, int> characterFrequency(string str) {
    map<char, int> freq;
    
    for (char c : str) {
        if (c != ' ') {
            freq[tolower(c)]++;
        }
    }
    
    return freq;
}

int main() {
    string str = "hello world";
    map<char, int> freq = characterFrequency(str);
    
    cout << "Character frequencies:" << endl;
    for (auto& p : freq) {
        cout << "'" << p.first << "': " << p.second << endl;
    }
    
    // Find max
    auto maxIt = max_element(freq.begin(), freq.end(),
        [](const auto& a, const auto& b) { return a.second < b.second; });
    cout << "Most frequent: '" << maxIt->first << "'" << endl;
    
    return 0;
}
`,

    go: `// Character Frequency Counter - Go
package main

import (
    "fmt"
    "strings"
    "unicode"
)

func characterFrequency(s string) map[rune]int {
    freq := make(map[rune]int)
    
    for _, c := range strings.ToLower(s) {
        if !unicode.IsSpace(c) {
            freq[c]++
        }
    }
    
    return freq
}

func main() {
    str := "hello world"
    freq := characterFrequency(str)
    
    fmt.Println("Character frequencies:")
    for char, count := range freq {
        fmt.Printf("'%c': %d\\n", char, count)
    }
    
    // Find max
    var maxChar rune
    maxCount := 0
    for char, count := range freq {
        if count > maxCount {
            maxCount = count
            maxChar = char
        }
    }
    fmt.Printf("Most frequent: '%c' appears %d times\\n", maxChar, maxCount)
}
`,
  },
};
