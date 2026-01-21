import { AlgorithmCodeTemplates } from './types';

export const groupAnagramsCode: AlgorithmCodeTemplates = {
  algorithmId: 'group-anagrams',
  algorithmName: 'Group Anagrams',
  category: 'hashing',
  templates: {
    javascript: `// Group Anagrams - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function groupAnagrams(strs) {
  log(\`Grouping anagrams from [\${strs.map(s => '"' + s + '"').join(', ')}]\`);
  
  const groups = new Map();
  
  for (let i = 0; i < strs.length; i++) {
    const word = strs[i];
    visit(i);
    mark(i, 'current');
    
    // Sort characters as key
    const key = word.split('').sort().join('');
    log(\`"\${word}" -> key: "\${key}"\`);
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(word);
    mark(i, 'found');
  }
  
  const result = Array.from(groups.values());
  log(\`\\nGroups found: \${result.length}\`);
  result.forEach((group, i) => log(\`  Group \${i + 1}: [\${group.join(', ')}]\`));
  
  return result;
}

// Alternative using character count as key
function groupAnagramsOptimized(strs) {
  const groups = new Map();
  
  for (const word of strs) {
    // Create frequency array
    const count = new Array(26).fill(0);
    for (const char of word) {
      count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    const key = count.join('#');
    
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  
  return Array.from(groups.values());
}

// Demo
groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
`,

    java: `// Group Anagrams - Java
import java.util.*;

public class GroupAnagrams {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();
        
        for (String word : strs) {
            char[] chars = word.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
        }
        
        return new ArrayList<>(groups.values());
    }
    
    public static void main(String[] args) {
        GroupAnagrams sol = new GroupAnagrams();
        String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        System.out.println(sol.groupAnagrams(strs));
    }
}
`,

    python: `# Group Anagrams - Python
from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    
    for word in strs:
        key = ''.join(sorted(word))
        groups[key].append(word)
    
    return list(groups.values())

# Using character count (faster for long strings)
def group_anagrams_optimized(strs):
    groups = defaultdict(list)
    
    for word in strs:
        count = [0] * 26
        for c in word:
            count[ord(c) - ord('a')] += 1
        groups[tuple(count)].append(word)
    
    return list(groups.values())


strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
print(group_anagrams(strs))
`,

    cpp: `// Group Anagrams - C++
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    
    for (const string& word : strs) {
        string key = word;
        sort(key.begin(), key.end());
        groups[key].push_back(word);
    }
    
    vector<vector<string>> result;
    for (auto& p : groups) {
        result.push_back(p.second);
    }
    return result;
}

int main() {
    vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
    auto result = groupAnagrams(strs);
    for (auto& group : result) {
        for (auto& s : group) cout << s << " ";
        cout << endl;
    }
    return 0;
}
`,

    go: `// Group Anagrams - Go
package main

import (
    "fmt"
    "sort"
)

func groupAnagrams(strs []string) [][]string {
    groups := make(map[string][]string)
    
    for _, word := range strs {
        chars := []rune(word)
        sort.Slice(chars, func(i, j int) bool { return chars[i] < chars[j] })
        key := string(chars)
        groups[key] = append(groups[key], word)
    }
    
    result := make([][]string, 0, len(groups))
    for _, group := range groups {
        result = append(result, group)
    }
    return result
}

func main() {
    strs := []string{"eat", "tea", "tan", "ate", "nat", "bat"}
    fmt.Println(groupAnagrams(strs))
}
`,
  },
};
