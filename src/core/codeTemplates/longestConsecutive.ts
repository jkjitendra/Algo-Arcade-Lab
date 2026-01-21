import { AlgorithmCodeTemplates } from './types';

export const longestConsecutiveCode: AlgorithmCodeTemplates = {
  algorithmId: 'longest-consecutive',
  algorithmName: 'Longest Consecutive Sequence',
  category: 'hashing',
  templates: {
    javascript: `// Longest Consecutive Sequence - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find length of longest consecutive elements sequence in O(n)

function longestConsecutive(nums) {
  if (nums.length === 0) return 0;
  
  log(\`Finding longest consecutive in [\${nums.join(', ')}]\`);
  
  const numSet = new Set(nums);
  let maxLength = 0;
  
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    visit(i);
    
    // Only start counting from sequence start
    if (!numSet.has(num - 1)) {
      mark(i, 'current');
      log(\`\\nStart sequence at \${num}:\`);
      
      let currentNum = num;
      let length = 1;
      
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        length++;
        log(\`  Extends to \${currentNum}\`);
      }
      
      if (length > maxLength) {
        maxLength = length;
        mark(i, 'found');
        log(\`  New max length: \${maxLength}\`);
      }
    }
  }
  
  log(\`\\nLongest consecutive sequence length: \${maxLength}\`);
  return maxLength;
}

// Demo
longestConsecutive([100, 4, 200, 1, 3, 2]); // Output: 4 (sequence: 1,2,3,4)
longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]); // Output: 9
`,

    java: `// Longest Consecutive Sequence - Java
import java.util.*;

public class LongestConsecutive {
    public int longestConsecutive(int[] nums) {
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) numSet.add(num);
        
        int maxLength = 0;
        
        for (int num : numSet) {
            // Only start from sequence beginning
            if (!numSet.contains(num - 1)) {
                int currentNum = num;
                int length = 1;
                
                while (numSet.contains(currentNum + 1)) {
                    currentNum++;
                    length++;
                }
                
                maxLength = Math.max(maxLength, length);
            }
        }
        
        return maxLength;
    }
    
    public static void main(String[] args) {
        LongestConsecutive sol = new LongestConsecutive();
        System.out.println(sol.longestConsecutive(new int[]{100, 4, 200, 1, 3, 2}));
    }
}
`,

    python: `# Longest Consecutive Sequence - Python

def longest_consecutive(nums):
    if not nums:
        return 0
    
    num_set = set(nums)
    max_length = 0
    
    for num in num_set:
        # Only start from sequence beginning
        if num - 1 not in num_set:
            current = num
            length = 1
            
            while current + 1 in num_set:
                current += 1
                length += 1
            
            max_length = max(max_length, length)
    
    return max_length


print(longest_consecutive([100, 4, 200, 1, 3, 2]))  # 4
print(longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))  # 9
`,

    cpp: `// Longest Consecutive Sequence - C++
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    unordered_set<int> numSet(nums.begin(), nums.end());
    int maxLength = 0;
    
    for (int num : numSet) {
        if (numSet.find(num - 1) == numSet.end()) {
            int currentNum = num;
            int length = 1;
            
            while (numSet.count(currentNum + 1)) {
                currentNum++;
                length++;
            }
            
            maxLength = max(maxLength, length);
        }
    }
    
    return maxLength;
}

int main() {
    vector<int> nums = {100, 4, 200, 1, 3, 2};
    cout << longestConsecutive(nums) << endl;  // 4
    return 0;
}
`,

    go: `// Longest Consecutive Sequence - Go
package main

import "fmt"

func longestConsecutive(nums []int) int {
    numSet := make(map[int]bool)
    for _, num := range nums {
        numSet[num] = true
    }
    
    maxLength := 0
    
    for num := range numSet {
        if !numSet[num-1] {
            currentNum := num
            length := 1
            
            for numSet[currentNum+1] {
                currentNum++
                length++
            }
            
            if length > maxLength {
                maxLength = length
            }
        }
    }
    
    return maxLength
}

func main() {
    fmt.Println(longestConsecutive([]int{100, 4, 200, 1, 3, 2}))  // 4
}
`,
  },
};
