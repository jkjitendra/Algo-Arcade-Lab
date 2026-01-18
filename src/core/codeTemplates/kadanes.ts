import { AlgorithmCodeTemplates } from './types';

export const kadanesCode: AlgorithmCodeTemplates = {
  algorithmId: 'kadanes',
  algorithmName: "Kadane's Algorithm",
  category: 'arrays',
  templates: {
    javascript: `// Kadane's Algorithm - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find maximum sum contiguous subarray

function kadanes(arr) {
  log(\`Finding maximum subarray sum using Kadane's Algorithm\`);
  
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  let start = 0, end = 0, tempStart = 0;
  
  visit(0);
  mark(0, 'current');
  log(\`Starting: maxEndingHere = \${arr[0]}\`);
  
  for (let i = 1; i < arr.length; i++) {
    visit(i);
    
    // Either extend the existing subarray or start new
    if (arr[i] > maxEndingHere + arr[i]) {
      maxEndingHere = arr[i];
      tempStart = i;
      log(\`Starting new subarray at \${i}\`);
    } else {
      maxEndingHere = maxEndingHere + arr[i];
      log(\`Extending subarray: sum = \${maxEndingHere}\`);
    }
    
    mark(i, 'current');
    
    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = tempStart;
      end = i;
      log(\`New max found: \${maxSoFar}\`);
    }
  }
  
  // Mark the maximum subarray
  for (let i = start; i <= end; i++) {
    mark(i, 'found');
  }
  
  log(\`Maximum subarray sum: \${maxSoFar} at indices [\${start}...\${end}]\`);
  return maxSoFar;
}

kadanes(inputArray);
`,

    java: `// Kadane's Algorithm - Java
public class Kadanes {
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        
        return maxSoFar;
    }
    
    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Maximum subarray sum: " + maxSubArray(nums));
    }
}
`,

    python: `# Kadane's Algorithm - Python

def max_subarray(nums):
    max_so_far = nums[0]
    max_ending_here = nums[0]
    
    for i in range(1, len(nums)):
        max_ending_here = max(nums[i], max_ending_here + nums[i])
        max_so_far = max(max_so_far, max_ending_here)
    
    return max_so_far


nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(f"Maximum subarray sum: {max_subarray(nums)}")
`,

    cpp: `// Kadane's Algorithm - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0];
    int maxEndingHere = nums[0];
    
    for (int i = 1; i < nums.size(); i++) {
        maxEndingHere = max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

int main() {
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << "Maximum subarray sum: " << maxSubArray(nums) << endl;
    return 0;
}
`,

    go: `// Kadane's Algorithm - Go
package main

import "fmt"

func maxSubArray(nums []int) int {
    maxSoFar := nums[0]
    maxEndingHere := nums[0]
    
    for i := 1; i < len(nums); i++ {
        if nums[i] > maxEndingHere+nums[i] {
            maxEndingHere = nums[i]
        } else {
            maxEndingHere = maxEndingHere + nums[i]
        }
        if maxEndingHere > maxSoFar {
            maxSoFar = maxEndingHere
        }
    }
    
    return maxSoFar
}

func main() {
    nums := []int{-2, 1, -3, 4, -1, 2, 1, -5, 4}
    fmt.Printf("Maximum subarray sum: %d\\n", maxSubArray(nums))
}
`,
  },
};
