import { AlgorithmCodeTemplates } from './types';

export const searchInsertPositionCode: AlgorithmCodeTemplates = {
    algorithmId: 'search-insert-position',
    algorithmName: 'Search Insert Position',
    category: 'searching',
    requiresSortedArray: true,
    templates: {
        javascript: `// Search Insert Position - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find index where target should be inserted to maintain sorted order

function searchInsertPosition(arr, target) {
  log(\`Finding insert position for \${target}\`);
  
  let left = 0;
  let right = arr.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    visit(mid);
    compare(mid, mid);
    
    log(\`Checking mid[\${mid}]=\${arr[mid]}\`);
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  mark(left, 'found');
  log(\`Insert position: \${left}\`);
  return left;
}

const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = Math.floor(Math.random() * 100);
searchInsertPosition(sortedArray, target);
`,

        java: `// Search Insert Position - Java
public class SearchInsertPosition {
    public static int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length;
        
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 6};
        int target = 5;
        System.out.println("Insert position: " + searchInsert(nums, target));
        
        target = 2;
        System.out.println("Insert position for 2: " + searchInsert(nums, target));
    }
}
`,

        python: `# Search Insert Position - Python

def search_insert(nums, target):
    left, right = 0, len(nums)
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    
    return left


nums = [1, 3, 5, 6]
print(f"Insert position for 5: {search_insert(nums, 5)}")
print(f"Insert position for 2: {search_insert(nums, 2)}")
print(f"Insert position for 7: {search_insert(nums, 7)}")
`,

        cpp: `// Search Insert Position - C++
#include <iostream>
#include <vector>
using namespace std;

int searchInsert(vector<int>& nums, int target) {
    int left = 0, right = nums.size();
    
    while (left < right) {
        int mid = (left + right) / 2;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

int main() {
    vector<int> nums = {1, 3, 5, 6};
    cout << "Insert position for 5: " << searchInsert(nums, 5) << endl;
    cout << "Insert position for 2: " << searchInsert(nums, 2) << endl;
    return 0;
}
`,

        go: `// Search Insert Position - Go
package main

import "fmt"

func searchInsert(nums []int, target int) int {
    left, right := 0, len(nums)
    
    for left < right {
        mid := (left + right) / 2
        if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left
}

func main() {
    nums := []int{1, 3, 5, 6}
    fmt.Printf("Insert position for 5: %d\\n", searchInsert(nums, 5))
    fmt.Printf("Insert position for 2: %d\\n", searchInsert(nums, 2))
}
`,
    },
};
