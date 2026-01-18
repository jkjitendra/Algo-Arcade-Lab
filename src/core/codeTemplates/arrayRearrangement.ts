import { AlgorithmCodeTemplates } from './types';

export const arrayRearrangementCode: AlgorithmCodeTemplates = {
  algorithmId: 'array-rearrangement',
  algorithmName: 'Array Rearrangement',
  category: 'arrays',
  templates: {
    javascript: `// Array Rearrangement - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)
// Rearrange array in alternating positive/negative or specific patterns

function rearrangeAlternate(arr) {
  log(\`Rearranging array to alternate positive/negative\`);
  log(\`Original: [\${arr.join(', ')}]\`);
  
  // Separate positives and negatives
  const pos = arr.filter(x => x >= 0);
  const neg = arr.filter(x => x < 0);
  
  log(\`Positives: [\${pos.join(', ')}]\`);
  log(\`Negatives: [\${neg.join(', ')}]\`);
  
  // Merge alternately (positive first)
  const result = [];
  let i = 0, j = 0;
  let usePos = true;
  
  while (i < pos.length && j < neg.length) {
    if (usePos) {
      result.push(pos[i++]);
      mark(result.length - 1, 'sorted');
    } else {
      result.push(neg[j++]);
      mark(result.length - 1, 'found');
    }
    usePos = !usePos;
  }
  
  // Add remaining elements
  while (i < pos.length) result.push(pos[i++]);
  while (j < neg.length) result.push(neg[j++]);
  
  log(\`Rearranged: [\${result.join(', ')}]\`);
  return result;
}

// Create array with both positive and negative numbers
const testArr = inputArray.map((x, i) => i % 2 === 0 ? x : -x);
rearrangeAlternate(testArr);
`,

    java: `// Array Rearrangement - Java
import java.util.*;

public class ArrayRearrangement {
    public static int[] rearrangeAlternate(int[] arr) {
        List<Integer> pos = new ArrayList<>();
        List<Integer> neg = new ArrayList<>();
        
        for (int num : arr) {
            if (num >= 0) pos.add(num);
            else neg.add(num);
        }
        
        int[] result = new int[arr.length];
        int i = 0, j = 0, k = 0;
        boolean usePos = true;
        
        while (i < pos.size() && j < neg.size()) {
            result[k++] = usePos ? pos.get(i++) : neg.get(j++);
            usePos = !usePos;
        }
        
        while (i < pos.size()) result[k++] = pos.get(i++);
        while (j < neg.size()) result[k++] = neg.get(j++);
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, -2, 3, -4, 5, -6};
        int[] result = rearrangeAlternate(arr);
        System.out.print("Rearranged: ");
        for (int num : result) System.out.print(num + " ");
    }
}
`,

    python: `# Array Rearrangement - Python

def rearrange_alternate(arr):
    pos = [x for x in arr if x >= 0]
    neg = [x for x in arr if x < 0]
    
    result = []
    i, j = 0, 0
    use_pos = True
    
    while i < len(pos) and j < len(neg):
        if use_pos:
            result.append(pos[i])
            i += 1
        else:
            result.append(neg[j])
            j += 1
        use_pos = not use_pos
    
    result.extend(pos[i:])
    result.extend(neg[j:])
    
    return result


arr = [1, -2, 3, -4, 5, -6]
print(f"Rearranged: {rearrange_alternate(arr)}")
`,

    cpp: `// Array Rearrangement - C++
#include <iostream>
#include <vector>
using namespace std;

vector<int> rearrangeAlternate(vector<int>& arr) {
    vector<int> pos, neg;
    for (int num : arr) {
        if (num >= 0) pos.push_back(num);
        else neg.push_back(num);
    }
    
    vector<int> result;
    int i = 0, j = 0;
    bool usePos = true;
    
    while (i < pos.size() && j < neg.size()) {
        result.push_back(usePos ? pos[i++] : neg[j++]);
        usePos = !usePos;
    }
    
    while (i < pos.size()) result.push_back(pos[i++]);
    while (j < neg.size()) result.push_back(neg[j++]);
    
    return result;
}

int main() {
    vector<int> arr = {1, -2, 3, -4, 5, -6};
    vector<int> result = rearrangeAlternate(arr);
    cout << "Rearranged: ";
    for (int num : result) cout << num << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Array Rearrangement - Go
package main

import "fmt"

func rearrangeAlternate(arr []int) []int {
    var pos, neg []int
    for _, num := range arr {
        if num >= 0 {
            pos = append(pos, num)
        } else {
            neg = append(neg, num)
        }
    }
    
    var result []int
    i, j := 0, 0
    usePos := true
    
    for i < len(pos) && j < len(neg) {
        if usePos {
            result = append(result, pos[i])
            i++
        } else {
            result = append(result, neg[j])
            j++
        }
        usePos = !usePos
    }
    
    result = append(result, pos[i:]...)
    result = append(result, neg[j:]...)
    
    return result
}

func main() {
    arr := []int{1, -2, 3, -4, 5, -6}
    fmt.Printf("Rearranged: %v\\n", rearrangeAlternate(arr))
}
`,
  },
};
