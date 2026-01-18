import { AlgorithmCodeTemplates } from './types';

export const mooresVotingCode: AlgorithmCodeTemplates = {
  algorithmId: 'moores-voting',
  algorithmName: "Moore's Voting",
  category: 'arrays',
  templates: {
    javascript: `// Moore's Voting Algorithm - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find majority element (appears more than n/2 times)

function majorityElement(arr) {
  log(\`Finding majority element using Moore's Voting\`);
  
  // Phase 1: Find candidate
  let candidate = arr[0];
  let count = 1;
  
  visit(0);
  mark(0, 'current');
  log(\`Initial candidate: \${candidate}\`);
  
  for (let i = 1; i < arr.length; i++) {
    visit(i);
    compare(i, i);
    
    if (count === 0) {
      candidate = arr[i];
      count = 1;
      log(\`New candidate: \${candidate}\`);
      mark(i, 'current');
    } else if (arr[i] === candidate) {
      count++;
      log(\`Match! Count: \${count}\`);
      mark(i, 'found');
    } else {
      count--;
      log(\`No match. Count: \${count}\`);
      mark(i, 'eliminated');
    }
  }
  
  // Phase 2: Verify candidate
  log(\`Verifying candidate: \${candidate}\`);
  let actualCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === candidate) {
      actualCount++;
      mark(i, 'found');
    }
  }
  
  if (actualCount > arr.length / 2) {
    log(\`Majority element: \${candidate} (appears \${actualCount} times)\`);
    return candidate;
  }
  
  log('No majority element exists');
  return -1;
}

majorityElement(inputArray);
`,

    java: `// Moore's Voting Algorithm - Java
public class MooresVoting {
    public static int majorityElement(int[] nums) {
        // Phase 1: Find candidate
        int candidate = nums[0];
        int count = 1;
        
        for (int i = 1; i < nums.length; i++) {
            if (count == 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] == candidate) {
                count++;
            } else {
                count--;
            }
        }
        
        // Phase 2: Verify
        count = 0;
        for (int num : nums) {
            if (num == candidate) count++;
        }
        
        return count > nums.length / 2 ? candidate : -1;
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 2, 1, 1, 1, 2, 2};
        System.out.println("Majority element: " + majorityElement(nums));
    }
}
`,

    python: `# Moore's Voting Algorithm - Python

def majority_element(nums):
    # Phase 1: Find candidate
    candidate = nums[0]
    count = 1
    
    for i in range(1, len(nums)):
        if count == 0:
            candidate = nums[i]
            count = 1
        elif nums[i] == candidate:
            count += 1
        else:
            count -= 1
    
    # Phase 2: Verify
    actual_count = nums.count(candidate)
    return candidate if actual_count > len(nums) // 2 else -1


nums = [2, 2, 1, 1, 1, 2, 2]
print(f"Majority element: {majority_element(nums)}")
`,

    cpp: `// Moore's Voting Algorithm - C++
#include <iostream>
#include <vector>
using namespace std;

int majorityElement(vector<int>& nums) {
    int candidate = nums[0];
    int count = 1;
    
    for (int i = 1; i < nums.size(); i++) {
        if (count == 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] == candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    // Verify
    count = 0;
    for (int num : nums) {
        if (num == candidate) count++;
    }
    
    return count > nums.size() / 2 ? candidate : -1;
}

int main() {
    vector<int> nums = {2, 2, 1, 1, 1, 2, 2};
    cout << "Majority element: " << majorityElement(nums) << endl;
    return 0;
}
`,

    go: `// Moore's Voting Algorithm - Go
package main

import "fmt"

func majorityElement(nums []int) int {
    candidate := nums[0]
    count := 1
    
    for i := 1; i < len(nums); i++ {
        if count == 0 {
            candidate = nums[i]
            count = 1
        } else if nums[i] == candidate {
            count++
        } else {
            count--
        }
    }
    
    // Verify
    count = 0
    for _, num := range nums {
        if num == candidate {
            count++
        }
    }
    
    if count > len(nums)/2 {
        return candidate
    }
    return -1
}

func main() {
    nums := []int{2, 2, 1, 1, 1, 2, 2}
    fmt.Printf("Majority element: %d\\n", majorityElement(nums))
}
`,
  },
};
