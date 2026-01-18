import { AlgorithmCodeTemplates } from './types';

export const firstNonRepeatingCharCode: AlgorithmCodeTemplates = {
  algorithmId: 'first-non-repeating-char',
  algorithmName: 'First Non-Repeating Character',
  category: 'queues',
  templates: {
    javascript: `// First Non-Repeating Character in Stream - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Use queue to track potential candidates

function firstNonRepeatingInStream(stream) {
  log(\`Processing stream: "\${stream}"\`);
  
  const queue = [];
  const charCount = {};
  const results = [];
  
  for (let i = 0; i < stream.length; i++) {
    const char = stream[i];
    visit(i);
    mark(i, 'current');
    
    // Update count
    charCount[char] = (charCount[char] || 0) + 1;
    queue.push(char);
    
    // Remove repeating characters from front
    while (queue.length && charCount[queue[0]] > 1) {
      queue.shift();
    }
    
    const firstNonRepeat = queue.length ? queue[0] : '#';
    results.push(firstNonRepeat);
    log(\`After '\${char}': first non-repeating = '\${firstNonRepeat}'\`);
    
    if (queue.length) {
      mark(stream.indexOf(queue[0]), 'found');
    }
  }
  
  log(\`Results: [\${results.join(', ')}]\`);
  return results;
}

firstNonRepeatingInStream("aabcbc");
`,

    java: `// First Non-Repeating Character in Stream - Java
import java.util.*;

public class FirstNonRepeatingChar {
    public static List<Character> firstNonRepeating(String stream) {
        List<Character> results = new ArrayList<>();
        Queue<Character> queue = new LinkedList<>();
        Map<Character, Integer> count = new HashMap<>();
        
        for (char c : stream.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
            queue.offer(c);
            
            while (!queue.isEmpty() && count.get(queue.peek()) > 1) {
                queue.poll();
            }
            
            results.add(queue.isEmpty() ? '#' : queue.peek());
        }
        return results;
    }
    
    public static void main(String[] args) {
        System.out.println(firstNonRepeating("aabcbc"));
    }
}
`,

    python: `# First Non-Repeating Character in Stream - Python
from collections import deque, Counter

def first_non_repeating(stream):
    queue = deque()
    count = Counter()
    results = []
    
    for char in stream:
        count[char] += 1
        queue.append(char)
        
        while queue and count[queue[0]] > 1:
            queue.popleft()
        
        results.append(queue[0] if queue else '#')
    
    return results


print(first_non_repeating("aabcbc"))
`,

    cpp: `// First Non-Repeating Character in Stream - C++
#include <iostream>
#include <queue>
#include <unordered_map>
#include <string>
using namespace std;

string firstNonRepeating(string stream) {
    string result;
    queue<char> q;
    unordered_map<char, int> count;
    
    for (char c : stream) {
        count[c]++;
        q.push(c);
        
        while (!q.empty() && count[q.front()] > 1) {
            q.pop();
        }
        
        result += q.empty() ? '#' : q.front();
    }
    return result;
}

int main() {
    cout << firstNonRepeating("aabcbc") << endl;
    return 0;
}
`,

    go: `// First Non-Repeating Character in Stream - Go
package main

import "fmt"

func firstNonRepeating(stream string) string {
    var queue []rune
    count := make(map[rune]int)
    var result []rune
    
    for _, c := range stream {
        count[c]++
        queue = append(queue, c)
        
        for len(queue) > 0 && count[queue[0]] > 1 {
            queue = queue[1:]
        }
        
        if len(queue) > 0 {
            result = append(result, queue[0])
        } else {
            result = append(result, '#')
        }
    }
    return string(result)
}

func main() {
    fmt.Println(firstNonRepeating("aabcbc"))
}
`,
  },
};
