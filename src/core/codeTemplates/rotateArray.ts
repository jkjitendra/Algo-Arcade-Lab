import { AlgorithmCodeTemplates } from './types';

export const rotateArrayCode: AlgorithmCodeTemplates = {
  algorithmId: 'rotate-array',
  algorithmName: 'Rotate Array',
  category: 'arrays',
  templates: {
    javascript: `// Rotate Array - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)
// Rotate array right by k positions

function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n;
  
  log(\`Rotating array by \${k} positions to the right\`);
  log(\`Original: [\${arr.join(', ')}]\`);
  
  // Reverse helper function
  function reverse(start, end) {
    while (start < end) {
      visit(start);
      visit(end);
      swap(start, end);
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
  
  // Step 1: Reverse entire array
  log('Step 1: Reverse entire array');
  reverse(0, n - 1);
  for (let i = 0; i < n; i++) mark(i, 'current');
  
  // Step 2: Reverse first k elements
  log(\`Step 2: Reverse first \${k} elements\`);
  reverse(0, k - 1);
  for (let i = 0; i < k; i++) mark(i, 'sorted');
  
  // Step 3: Reverse remaining elements
  log(\`Step 3: Reverse remaining \${n - k} elements\`);
  reverse(k, n - 1);
  for (let i = k; i < n; i++) mark(i, 'sorted');
  
  log(\`Rotated: [\${arr.join(', ')}]\`);
  return arr;
}

const k = Math.min(3, inputArray.length);
rotateArray([...inputArray], k);
`,

    java: `// Rotate Array - Java
public class RotateArray {
    public static void rotate(int[] nums, int k) {
        k = k % nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    
    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6, 7};
        rotate(nums, 3);
        System.out.print("Rotated: ");
        for (int num : nums) System.out.print(num + " ");
    }
}
`,

    python: `# Rotate Array - Python

def rotate(nums, k):
    n = len(nums)
    k = k % n
    
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    
    reverse(0, n - 1)
    reverse(0, k - 1)
    reverse(k, n - 1)
    
    return nums


nums = [1, 2, 3, 4, 5, 6, 7]
print(f"Rotated: {rotate(nums, 3)}")
`,

    cpp: `// Rotate Array - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void rotate(vector<int>& nums, int k) {
    k = k % nums.size();
    reverse(nums.begin(), nums.end());
    reverse(nums.begin(), nums.begin() + k);
    reverse(nums.begin() + k, nums.end());
}

int main() {
    vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
    rotate(nums, 3);
    cout << "Rotated: ";
    for (int num : nums) cout << num << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Rotate Array - Go
package main

import "fmt"

func rotate(nums []int, k int) {
    n := len(nums)
    k = k % n
    
    reverse := func(start, end int) {
        for start < end {
            nums[start], nums[end] = nums[end], nums[start]
            start++
            end--
        }
    }
    
    reverse(0, n-1)
    reverse(0, k-1)
    reverse(k, n-1)
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7}
    rotate(nums, 3)
    fmt.Printf("Rotated: %v\\n", nums)
}
`,
  },
};
