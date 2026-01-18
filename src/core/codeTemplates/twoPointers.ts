import { AlgorithmCodeTemplates } from './types';

export const twoPointersCode: AlgorithmCodeTemplates = {
  algorithmId: 'two-pointers',
  algorithmName: 'Two Pointers',
  category: 'arrays',
  templates: {
    javascript: `// Two Pointers Technique - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Classic example: Two Sum II (sorted array)

function twoSumSorted(arr, target) {
  log(\`Finding two numbers that sum to \${target}\`);
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    visit(left);
    visit(right);
    compare(left, right);
    
    const sum = arr[left] + arr[right];
    log(\`arr[\${left}]=\${arr[left]} + arr[\${right}]=\${arr[right]} = \${sum}\`);
    
    if (sum === target) {
      mark(left, 'found');
      mark(right, 'found');
      log(\`Found! Indices: \${left} and \${right}\`);
      return [left, right];
    } else if (sum < target) {
      mark(left, 'eliminated');
      left++;
    } else {
      mark(right, 'eliminated');
      right--;
    }
  }
  
  log('No pair found');
  return [-1, -1];
}

// Sort array for two-pointer technique
const sortedArray = [...inputArray].sort((a, b) => a - b);
const target = sortedArray[0] + sortedArray[sortedArray.length - 1];
twoSumSorted(sortedArray, target);
`,

    java: `// Two Pointers Technique - Java
public class TwoPointers {
    public static int[] twoSumSorted(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return new int[]{left, right};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{-1, -1};
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = twoSumSorted(nums, target);
        System.out.println("Indices: " + result[0] + ", " + result[1]);
    }
}
`,

    python: `# Two Pointers Technique - Python

def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return [-1, -1]


nums = [2, 7, 11, 15]
target = 9
result = two_sum_sorted(nums, target)
print(f"Indices: {result}")
`,

    cpp: `// Two Pointers Technique - C++
#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSumSorted(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {-1, -1};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSumSorted(nums, target);
    cout << "Indices: " << result[0] << ", " << result[1] << endl;
    return 0;
}
`,

    go: `// Two Pointers Technique - Go
package main

import "fmt"

func twoSumSorted(nums []int, target int) []int {
    left, right := 0, len(nums)-1
    
    for left < right {
        sum := nums[left] + nums[right]
        if sum == target {
            return []int{left, right}
        } else if sum < target {
            left++
        } else {
            right--
        }
    }
    return []int{-1, -1}
}

func main() {
    nums := []int{2, 7, 11, 15}
    target := 9
    result := twoSumSorted(nums, target)
    fmt.Printf("Indices: %d, %d\\n", result[0], result[1])
}
`,
  },
};
