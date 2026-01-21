import { AlgorithmCodeTemplates } from './types';

export const countDistinctWindowCode: AlgorithmCodeTemplates = {
  algorithmId: 'count-distinct-window',
  algorithmName: 'Count Distinct in Window',
  category: 'hashing',
  templates: {
    javascript: `// Count Distinct Elements in Windows - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function countDistinctInWindows(arr, k) {
  log(\`Counting distinct in windows of size \${k} in [\${arr.join(', ')}]\`);
  
  const result = [];
  const freqMap = new Map();
  
  // Process first window
  for (let i = 0; i < k; i++) {
    visit(i);
    freqMap.set(arr[i], (freqMap.get(arr[i]) || 0) + 1);
    mark(i, 'current');
  }
  result.push(freqMap.size);
  log(\`Window [0...\${k-1}]: distinct = \${freqMap.size}\`);
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    visit(i);
    
    // Remove element going out of window
    const outElement = arr[i - k];
    if (freqMap.get(outElement) === 1) {
      freqMap.delete(outElement);
    } else {
      freqMap.set(outElement, freqMap.get(outElement) - 1);
    }
    
    // Add new element
    freqMap.set(arr[i], (freqMap.get(arr[i]) || 0) + 1);
    
    result.push(freqMap.size);
    mark(i, 'found');
    log(\`Window [\${i-k+1}...\${i}]: distinct = \${freqMap.size}\`);
  }
  
  log(\`\\nResult: [\${result.join(', ')}]\`);
  return result;
}

// Demo
countDistinctInWindows([1, 2, 1, 3, 4, 2, 3], 4);
// Windows: [1,2,1,3]->3, [2,1,3,4]->4, [1,3,4,2]->4, [3,4,2,3]->3
`,

    java: `// Count Distinct in Windows - Java
import java.util.*;

public class CountDistinctWindow {
    public static List<Integer> countDistinct(int[] arr, int k) {
        List<Integer> result = new ArrayList<>();
        Map<Integer, Integer> freq = new HashMap<>();
        
        // First window
        for (int i = 0; i < k; i++) {
            freq.merge(arr[i], 1, Integer::sum);
        }
        result.add(freq.size());
        
        // Slide window
        for (int i = k; i < arr.length; i++) {
            // Remove outgoing element
            int out = arr[i - k];
            if (freq.get(out) == 1) freq.remove(out);
            else freq.put(out, freq.get(out) - 1);
            
            // Add incoming element
            freq.merge(arr[i], 1, Integer::sum);
            result.add(freq.size());
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 1, 3, 4, 2, 3};
        System.out.println(countDistinct(arr, 4));
    }
}
`,

    python: `# Count Distinct in Windows - Python
from collections import defaultdict

def count_distinct_windows(arr, k):
    result = []
    freq = defaultdict(int)
    
    # First window
    for i in range(k):
        freq[arr[i]] += 1
    result.append(len(freq))
    
    # Slide window
    for i in range(k, len(arr)):
        # Remove outgoing element
        out = arr[i - k]
        freq[out] -= 1
        if freq[out] == 0:
            del freq[out]
        
        # Add incoming element
        freq[arr[i]] += 1
        result.append(len(freq))
    
    return result


arr = [1, 2, 1, 3, 4, 2, 3]
print(count_distinct_windows(arr, 4))  # [3, 4, 4, 3]
`,

    cpp: `// Count Distinct in Windows - C++
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> countDistinct(vector<int>& arr, int k) {
    vector<int> result;
    unordered_map<int, int> freq;
    
    // First window
    for (int i = 0; i < k; i++) freq[arr[i]]++;
    result.push_back(freq.size());
    
    // Slide window
    for (int i = k; i < arr.size(); i++) {
        // Remove outgoing
        if (--freq[arr[i-k]] == 0) freq.erase(arr[i-k]);
        // Add incoming
        freq[arr[i]]++;
        result.push_back(freq.size());
    }
    
    return result;
}

int main() {
    vector<int> arr = {1, 2, 1, 3, 4, 2, 3};
    auto result = countDistinct(arr, 4);
    for (int x : result) cout << x << " ";
    return 0;
}
`,

    go: `// Count Distinct in Windows - Go
package main

import "fmt"

func countDistinctWindows(arr []int, k int) []int {
    result := []int{}
    freq := make(map[int]int)
    
    // First window
    for i := 0; i < k; i++ {
        freq[arr[i]]++
    }
    result = append(result, len(freq))
    
    // Slide window
    for i := k; i < len(arr); i++ {
        // Remove outgoing
        out := arr[i-k]
        freq[out]--
        if freq[out] == 0 {
            delete(freq, out)
        }
        // Add incoming
        freq[arr[i]]++
        result = append(result, len(freq))
    }
    
    return result
}

func main() {
    arr := []int{1, 2, 1, 3, 4, 2, 3}
    fmt.Println(countDistinctWindows(arr, 4))  // [3 4 4 3]
}
`,
  },
};
