import { AlgorithmCodeTemplates } from './types';

export const rotatedArraySearchCode: AlgorithmCodeTemplates = {
  algorithmId: 'rotated-array-search',
  algorithmName: 'Rotated Array Search',
  category: 'searching',
  templates: {
    javascript: `// Search in Rotated Sorted Array - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Binary search in a rotated sorted array

function searchRotated(arr, target) {
  log(\`Searching for \${target} in rotated array\`);
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    visit(mid);
    compare(mid, mid);
    
    log(\`Checking mid[\${mid}]=\${arr[mid]}\`);
    
    if (arr[mid] === target) {
      mark(mid, 'found');
      log(\`Found \${target} at index \${mid}\`);
      return mid;
    }
    
    // Left half is sorted
    if (arr[left] <= arr[mid]) {
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } 
    // Right half is sorted
    else {
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  log(\`\${target} not found\`);
  return -1;
}

// Create a rotated sorted array for demo
const sorted = [...inputArray].sort((a, b) => a - b);
const pivot = Math.floor(sorted.length / 2);
const rotated = [...sorted.slice(pivot), ...sorted.slice(0, pivot)];
const target = rotated[Math.floor(Math.random() * rotated.length)];
searchRotated(rotated, target);
`,

    java: `// Search in Rotated Sorted Array - Java
public class RotatedArraySearch {
    public static int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = (left + right) / 2;
            
            if (nums[mid] == target) return mid;
            
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        System.out.println("Index of 0: " + search(nums, 0));
        System.out.println("Index of 3: " + search(nums, 3));
    }
}
`,

    python: `# Search in Rotated Sorted Array - Python

def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1


nums = [4, 5, 6, 7, 0, 1, 2]
print(f"Index of 0: {search_rotated(nums, 0)}")
print(f"Index of 3: {search_rotated(nums, 3)}")
`,

    cpp: `// Search in Rotated Sorted Array - C++
#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = (left + right) / 2;
        
        if (nums[mid] == target) return mid;
        
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

int main() {
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    cout << "Index of 0: " << search(nums, 0) << endl;
    cout << "Index of 3: " << search(nums, 3) << endl;
    return 0;
}
`,

    go: `// Search in Rotated Sorted Array - Go
package main

import "fmt"

func search(nums []int, target int) int {
    left, right := 0, len(nums)-1
    
    for left <= right {
        mid := (left + right) / 2
        
        if nums[mid] == target {
            return mid
        }
        
        if nums[left] <= nums[mid] {
            if target >= nums[left] && target < nums[mid] {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else {
            if target > nums[mid] && target <= nums[right] {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    return -1
}

func main() {
    nums := []int{4, 5, 6, 7, 0, 1, 2}
    fmt.Printf("Index of 0: %d\\n", search(nums, 0))
    fmt.Printf("Index of 3: %d\\n", search(nums, 3))
}
`,
  },
};
