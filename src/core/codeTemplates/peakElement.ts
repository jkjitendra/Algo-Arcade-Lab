import { AlgorithmCodeTemplates } from './types';

export const peakElementCode: AlgorithmCodeTemplates = {
  algorithmId: 'peak-element',
  algorithmName: 'Peak Element',
  category: 'searching',
  templates: {
    javascript: `// Find Peak Element - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Peak: element greater than its neighbors

function findPeakElement(arr) {
  log(\`Finding peak element in array\`);
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    visit(mid);
    compare(mid, mid + 1);
    
    log(\`Checking mid[\${mid}]=\${arr[mid]} vs mid+1[\${mid+1}]=\${arr[mid+1]}\`);
    
    if (arr[mid] > arr[mid + 1]) {
      // Peak is on the left side (including mid)
      right = mid;
    } else {
      // Peak is on the right side
      mark(mid, 'eliminated');
      left = mid + 1;
    }
  }
  
  mark(left, 'found');
  log(\`Peak found at index \${left}, value = \${arr[left]}\`);
  return left;
}

findPeakElement(inputArray);
`,

    java: `// Find Peak Element - Java
public class PeakElement {
    public static int findPeakElement(int[] nums) {
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] > nums[mid + 1]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 1};
        int peak = findPeakElement(nums);
        System.out.println("Peak at index: " + peak + ", value: " + nums[peak]);
        
        int[] nums2 = {1, 2, 1, 3, 5, 6, 4};
        peak = findPeakElement(nums2);
        System.out.println("Peak at index: " + peak + ", value: " + nums2[peak]);
    }
}
`,

    python: `# Find Peak Element - Python

def find_peak_element(nums):
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[mid + 1]:
            right = mid
        else:
            left = mid + 1
    
    return left


nums = [1, 2, 3, 1]
peak = find_peak_element(nums)
print(f"Peak at index: {peak}, value: {nums[peak]}")

nums2 = [1, 2, 1, 3, 5, 6, 4]
peak = find_peak_element(nums2)
print(f"Peak at index: {peak}, value: {nums2[peak]}")
`,

    cpp: `// Find Peak Element - C++
#include <iostream>
#include <vector>
using namespace std;

int findPeakElement(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int mid = (left + right) / 2;
        if (nums[mid] > nums[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

int main() {
    vector<int> nums = {1, 2, 3, 1};
    int peak = findPeakElement(nums);
    cout << "Peak at index: " << peak << ", value: " << nums[peak] << endl;
    return 0;
}
`,

    go: `// Find Peak Element - Go
package main

import "fmt"

func findPeakElement(nums []int) int {
    left, right := 0, len(nums)-1
    
    for left < right {
        mid := (left + right) / 2
        if nums[mid] > nums[mid+1] {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return left
}

func main() {
    nums := []int{1, 2, 3, 1}
    peak := findPeakElement(nums)
    fmt.Printf("Peak at index: %d, value: %d\\n", peak, nums[peak])
}
`,
  },
};
