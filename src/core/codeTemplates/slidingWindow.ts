import { AlgorithmCodeTemplates } from './types';

export const slidingWindowCode: AlgorithmCodeTemplates = {
  algorithmId: 'sliding-window',
  algorithmName: 'Sliding Window',
  category: 'arrays',
  templates: {
    javascript: `// Sliding Window Technique - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Example: Maximum sum subarray of size k

function maxSumSubarray(arr, k) {
  if (arr.length < k) {
    log('Array size is less than window size');
    return -1;
  }
  
  log(\`Finding max sum subarray of size \${k}\`);
  
  // Calculate sum of first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    visit(i);
    mark(i, 'window');
    windowSum += arr[i];
  }
  
  let maxSum = windowSum;
  let maxStart = 0;
  log(\`Initial window sum: \${windowSum}\`);
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    // Remove first element of previous window
    mark(i - k, 'eliminated');
    windowSum -= arr[i - k];
    
    // Add last element of new window
    visit(i);
    mark(i, 'window');
    windowSum += arr[i];
    
    log(\`Window [\${i-k+1}...\${i}] sum: \${windowSum}\`);
    
    if (windowSum > maxSum) {
      maxSum = windowSum;
      maxStart = i - k + 1;
    }
  }
  
  // Mark the maximum window
  for (let i = maxStart; i < maxStart + k; i++) {
    mark(i, 'found');
  }
  
  log(\`Maximum sum: \${maxSum} at indices [\${maxStart}...\${maxStart + k - 1}]\`);
  return maxSum;
}

const k = Math.min(3, inputArray.length);
maxSumSubarray(inputArray, k);
`,

    java: `// Sliding Window Technique - Java
public class SlidingWindow {
    public static int maxSumSubarray(int[] arr, int k) {
        if (arr.length < k) return -1;
        
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        
        int maxSum = windowSum;
        
        for (int i = k; i < arr.length; i++) {
            windowSum = windowSum - arr[i - k] + arr[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 4, 2, 10, 23, 3, 1, 0, 20};
        int k = 4;
        System.out.println("Maximum sum: " + maxSumSubarray(arr, k));
    }
}
`,

    python: `# Sliding Window Technique - Python

def max_sum_subarray(arr, k):
    if len(arr) < k:
        return -1
    
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i - k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum


arr = [1, 4, 2, 10, 23, 3, 1, 0, 20]
k = 4
print(f"Maximum sum: {max_sum_subarray(arr, k)}")
`,

    cpp: `// Sliding Window Technique - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSumSubarray(vector<int>& arr, int k) {
    if (arr.size() < k) return -1;
    
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    int maxSum = windowSum;
    
    for (int i = k; i < arr.size(); i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}

int main() {
    vector<int> arr = {1, 4, 2, 10, 23, 3, 1, 0, 20};
    int k = 4;
    cout << "Maximum sum: " << maxSumSubarray(arr, k) << endl;
    return 0;
}
`,

    go: `// Sliding Window Technique - Go
package main

import "fmt"

func maxSumSubarray(arr []int, k int) int {
    if len(arr) < k {
        return -1
    }
    
    windowSum := 0
    for i := 0; i < k; i++ {
        windowSum += arr[i]
    }
    
    maxSum := windowSum
    
    for i := k; i < len(arr); i++ {
        windowSum = windowSum - arr[i-k] + arr[i]
        if windowSum > maxSum {
            maxSum = windowSum
        }
    }
    
    return maxSum
}

func main() {
    arr := []int{1, 4, 2, 10, 23, 3, 1, 0, 20}
    k := 4
    fmt.Printf("Maximum sum: %d\\n", maxSumSubarray(arr, k))
}
`,
  },
};
