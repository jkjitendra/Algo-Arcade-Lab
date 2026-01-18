import { AlgorithmCodeTemplates } from './types';

export const generateBinaryNumbersCode: AlgorithmCodeTemplates = {
  algorithmId: 'generate-binary-numbers',
  algorithmName: 'Generate Binary Numbers',
  category: 'queues',
  templates: {
    javascript: `// Generate Binary Numbers 1 to N - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Use queue to generate binary representations

function generateBinaryNumbers(n) {
  log(\`Generating binary representations from 1 to \${n}\`);
  
  const queue = ['1'];
  const result = [];
  
  for (let i = 0; i < n; i++) {
    visit(i);
    mark(i, 'current');
    
    const current = queue.shift();
    result.push(current);
    log(\`\${i + 1}: \${current}\`);
    
    // Generate next two binary numbers
    queue.push(current + '0');
    queue.push(current + '1');
  }
  
  log(\`Binary numbers: [\${result.join(', ')}]\`);
  return result;
}

generateBinaryNumbers(10);
`,

    java: `// Generate Binary Numbers 1 to N - Java
import java.util.*;

public class GenerateBinaryNumbers {
    public static List<String> generate(int n) {
        List<String> result = new ArrayList<>();
        Queue<String> queue = new LinkedList<>();
        queue.offer("1");
        
        for (int i = 0; i < n; i++) {
            String current = queue.poll();
            result.add(current);
            queue.offer(current + "0");
            queue.offer(current + "1");
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        System.out.println(generate(10));
    }
}
`,

    python: `# Generate Binary Numbers 1 to N - Python
from collections import deque

def generate_binary_numbers(n):
    result = []
    queue = deque(['1'])
    
    for _ in range(n):
        current = queue.popleft()
        result.append(current)
        queue.append(current + '0')
        queue.append(current + '1')
    
    return result


print(generate_binary_numbers(10))
`,

    cpp: `// Generate Binary Numbers 1 to N - C++
#include <iostream>
#include <vector>
#include <queue>
#include <string>
using namespace std;

vector<string> generateBinaryNumbers(int n) {
    vector<string> result;
    queue<string> q;
    q.push("1");
    
    for (int i = 0; i < n; i++) {
        string current = q.front();
        q.pop();
        result.push_back(current);
        q.push(current + "0");
        q.push(current + "1");
    }
    
    return result;
}

int main() {
    auto result = generateBinaryNumbers(10);
    for (const auto& s : result) cout << s << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Generate Binary Numbers 1 to N - Go
package main

import "fmt"

func generateBinaryNumbers(n int) []string {
    result := make([]string, 0, n)
    queue := []string{"1"}
    
    for i := 0; i < n; i++ {
        current := queue[0]
        queue = queue[1:]
        result = append(result, current)
        queue = append(queue, current+"0", current+"1")
    }
    
    return result
}

func main() {
    fmt.Println(generateBinaryNumbers(10))
}
`,
  },
};
