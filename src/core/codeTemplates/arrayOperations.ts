import { AlgorithmCodeTemplates } from './types';

export const arrayOperationsCode: AlgorithmCodeTemplates = {
  algorithmId: 'array-operations',
  algorithmName: 'Array Operations',
  category: 'arrays',
  templates: {
    javascript: `// Basic Array Operations - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)
// Demonstrates common array operations

function arrayOperations(arr) {
  log(\`Array Operations Demo on [\${arr.join(', ')}]\`);
  
  // 1. Find min and max
  let min = arr[0], max = arr[0];
  let minIdx = 0, maxIdx = 0;
  
  for (let i = 1; i < arr.length; i++) {
    visit(i);
    compare(i, minIdx);
    
    if (arr[i] < min) {
      min = arr[i];
      minIdx = i;
    }
    if (arr[i] > max) {
      max = arr[i];
      maxIdx = i;
    }
  }
  
  mark(minIdx, 'found');
  mark(maxIdx, 'found');
  log(\`Min: \${min} at index \${minIdx}\`);
  log(\`Max: \${max} at index \${maxIdx}\`);
  
  // 2. Calculate sum and average
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  const avg = sum / arr.length;
  log(\`Sum: \${sum}, Average: \${avg.toFixed(2)}\`);
  
  // 3. Reverse in place
  log('Reversing array in place...');
  let left = 0, right = arr.length - 1;
  while (left < right) {
    visit(left);
    visit(right);
    swap(left, right);
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  
  for (let i = 0; i < arr.length; i++) {
    mark(i, 'sorted');
  }
  
  log(\`Reversed: [\${arr.join(', ')}]\`);
  return { min, max, sum, avg, reversed: arr };
}

arrayOperations([...inputArray]);
`,

    java: `// Basic Array Operations - Java
public class ArrayOperations {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        // Find min and max
        int min = arr[0], max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
            if (arr[i] > max) max = arr[i];
        }
        System.out.println("Min: " + min + ", Max: " + max);
        
        // Calculate sum
        int sum = 0;
        for (int num : arr) sum += num;
        System.out.println("Sum: " + sum + ", Avg: " + (sum / (double)arr.length));
        
        // Reverse
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        System.out.print("Reversed: ");
        for (int num : arr) System.out.print(num + " ");
    }
}
`,

    python: `# Basic Array Operations - Python

def array_operations(arr):
    # Find min and max
    min_val, max_val = min(arr), max(arr)
    print(f"Min: {min_val}, Max: {max_val}")
    
    # Calculate sum and average
    total = sum(arr)
    avg = total / len(arr)
    print(f"Sum: {total}, Avg: {avg:.2f}")
    
    # Reverse in place
    arr.reverse()
    print(f"Reversed: {arr}")
    
    return arr


arr = [64, 34, 25, 12, 22, 11, 90]
array_operations(arr)
`,

    cpp: `// Basic Array Operations - C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    // Find min and max
    int minVal = *min_element(arr.begin(), arr.end());
    int maxVal = *max_element(arr.begin(), arr.end());
    cout << "Min: " << minVal << ", Max: " << maxVal << endl;
    
    // Calculate sum
    int sum = accumulate(arr.begin(), arr.end(), 0);
    cout << "Sum: " << sum << ", Avg: " << (double)sum / arr.size() << endl;
    
    // Reverse
    reverse(arr.begin(), arr.end());
    cout << "Reversed: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    
    return 0;
}
`,

    go: `// Basic Array Operations - Go
package main

import "fmt"

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    
    // Find min and max
    minVal, maxVal := arr[0], arr[0]
    sum := 0
    for _, num := range arr {
        if num < minVal {
            minVal = num
        }
        if num > maxVal {
            maxVal = num
        }
        sum += num
    }
    fmt.Printf("Min: %d, Max: %d\\n", minVal, maxVal)
    fmt.Printf("Sum: %d, Avg: %.2f\\n", sum, float64(sum)/float64(len(arr)))
    
    // Reverse
    for i, j := 0, len(arr)-1; i < j; i, j = i+1, j-1 {
        arr[i], arr[j] = arr[j], arr[i]
    }
    fmt.Printf("Reversed: %v\\n", arr)
}
`,
  },
};
