import { AlgorithmCodeTemplates } from './types';

export const nextPermutationCode: AlgorithmCodeTemplates = {
  algorithmId: 'next-permutation',
  algorithmName: 'Next Permutation',
  category: 'arrays',
  templates: {
    javascript: `// Next Permutation - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)
// Find the next lexicographically greater permutation

function nextPermutation(arr) {
  const n = arr.length;
  log(\`Finding next permutation of [\${arr.join(', ')}]\`);
  
  // Step 1: Find the largest index i such that arr[i] < arr[i+1]
  let i = n - 2;
  while (i >= 0 && arr[i] >= arr[i + 1]) {
    visit(i);
    compare(i, i + 1);
    i--;
  }
  
  if (i >= 0) {
    mark(i, 'current');
    log(\`Found pivot at index \${i}: \${arr[i]}\`);
    
    // Step 2: Find largest j such that arr[j] > arr[i]
    let j = n - 1;
    while (arr[j] <= arr[i]) {
      visit(j);
      j--;
    }
    
    mark(j, 'found');
    log(\`Found swap target at index \${j}: \${arr[j]}\`);
    
    // Step 3: Swap arr[i] and arr[j]
    swap(i, j);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    log(\`After swap: [\${arr.join(', ')}]\`);
  } else {
    log('Already at last permutation, will wrap to first');
  }
  
  // Step 4: Reverse the suffix starting at i+1
  let left = i + 1, right = n - 1;
  while (left < right) {
    swap(left, right);
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  
  for (let k = 0; k < n; k++) {
    mark(k, 'sorted');
  }
  
  log(\`Next permutation: [\${arr.join(', ')}]\`);
  return arr;
}

nextPermutation([...inputArray]);
`,

    java: `// Next Permutation - Java
public class NextPermutation {
    public static void nextPermutation(int[] nums) {
        int n = nums.length;
        int i = n - 2;
        
        // Find pivot
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        
        if (i >= 0) {
            // Find swap target
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            // Swap
            int temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
        
        // Reverse suffix
        int left = i + 1, right = n - 1;
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        nextPermutation(nums);
        System.out.print("Next: ");
        for (int num : nums) System.out.print(num + " ");
    }
}
`,

    python: `# Next Permutation - Python

def next_permutation(nums):
    n = len(nums)
    i = n - 2
    
    # Find pivot
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    
    if i >= 0:
        # Find swap target
        j = n - 1
        while nums[j] <= nums[i]:
            j -= 1
        # Swap
        nums[i], nums[j] = nums[j], nums[i]
    
    # Reverse suffix
    left, right = i + 1, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
    
    return nums


nums = [1, 2, 3]
print(f"Next: {next_permutation(nums)}")
`,

    cpp: `// Next Permutation - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void nextPermutation(vector<int>& nums) {
    // Can use built-in: next_permutation(nums.begin(), nums.end());
    
    int n = nums.size();
    int i = n - 2;
    
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }
    
    if (i >= 0) {
        int j = n - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        swap(nums[i], nums[j]);
    }
    
    reverse(nums.begin() + i + 1, nums.end());
}

int main() {
    vector<int> nums = {1, 2, 3};
    nextPermutation(nums);
    cout << "Next: ";
    for (int num : nums) cout << num << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Next Permutation - Go
package main

import "fmt"

func nextPermutation(nums []int) {
    n := len(nums)
    i := n - 2
    
    for i >= 0 && nums[i] >= nums[i+1] {
        i--
    }
    
    if i >= 0 {
        j := n - 1
        for nums[j] <= nums[i] {
            j--
        }
        nums[i], nums[j] = nums[j], nums[i]
    }
    
    // Reverse suffix
    left, right := i+1, n-1
    for left < right {
        nums[left], nums[right] = nums[right], nums[left]
        left++
        right--
    }
}

func main() {
    nums := []int{1, 2, 3}
    nextPermutation(nums)
    fmt.Printf("Next: %v\\n", nums)
}
`,
  },
};
