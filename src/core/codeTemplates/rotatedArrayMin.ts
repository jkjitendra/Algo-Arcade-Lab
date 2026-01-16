import { AlgorithmCodeTemplates } from './types';

export const rotatedArrayMinCode: AlgorithmCodeTemplates = {
  algorithmId: 'rotated-array-min',
  algorithmName: 'Rotated Array Minimum',
  category: 'searching',
  templates: {
    javascript: `// Find Minimum in Rotated Sorted Array - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find the minimum element (rotation point)

function findMin(arr) {
  log(\`Finding minimum in rotated array\`);
  
  let left = 0;
  let right = arr.length - 1;
  
  // Array is not rotated
  if (arr[left] <= arr[right]) {
    mark(left, 'found');
    log(\`Array not rotated, min at index 0 = \${arr[0]}\`);
    return arr[left];
  }
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    visit(mid);
    compare(mid, right);
    
    log(\`Checking mid[\${mid}]=\${arr[mid]} vs right[\${right}]=\${arr[right]}\`);
    
    if (arr[mid] > arr[right]) {
      // Minimum is in right half
      mark(mid, 'eliminated');
      left = mid + 1;
    } else {
      // Minimum is in left half (including mid)
      right = mid;
    }
  }
  
  mark(left, 'found');
  log(\`Minimum found at index \${left} = \${arr[left]}\`);
  return arr[left];
}

// Create rotated array
const sorted = [...inputArray].sort((a, b) => a - b);
const pivot = Math.floor(sorted.length / 2);
const rotated = [...sorted.slice(pivot), ...sorted.slice(0, pivot)];
findMin(rotated);
`,

    java: `// Find Minimum in Rotated Sorted Array - Java
public class RotatedArrayMin {
    public static int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int mid = (left + right) / 2;
            
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
    
    public static void main(String[] args) {
        int[] nums = {3, 4, 5, 1, 2};
        System.out.println("Minimum: " + findMin(nums));
        
        int[] nums2 = {4, 5, 6, 7, 0, 1, 2};
        System.out.println("Minimum: " + findMin(nums2));
    }
}
`,

    python: `# Find Minimum in Rotated Sorted Array - Python

def find_min(nums):
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    
    return nums[left]


nums = [3, 4, 5, 1, 2]
print(f"Minimum: {find_min(nums)}")

nums2 = [4, 5, 6, 7, 0, 1, 2]
print(f"Minimum: {find_min(nums2)}")
`,

    cpp: `// Find Minimum in Rotated Sorted Array - C++
#include <iostream>
#include <vector>
using namespace std;

int findMin(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int mid = (left + right) / 2;
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
}

int main() {
    vector<int> nums = {3, 4, 5, 1, 2};
    cout << "Minimum: " << findMin(nums) << endl;
    
    vector<int> nums2 = {4, 5, 6, 7, 0, 1, 2};
    cout << "Minimum: " << findMin(nums2) << endl;
    return 0;
}
`,

    go: `// Find Minimum in Rotated Sorted Array - Go
package main

import "fmt"

func findMin(nums []int) int {
    left, right := 0, len(nums)-1
    
    for left < right {
        mid := (left + right) / 2
        
        if nums[mid] > nums[right] {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return nums[left]
}

func main() {
    nums := []int{3, 4, 5, 1, 2}
    fmt.Printf("Minimum: %d\\n", findMin(nums))
    
    nums2 := []int{4, 5, 6, 7, 0, 1, 2}
    fmt.Printf("Minimum: %d\\n", findMin(nums2))
}
`,
  },
};
