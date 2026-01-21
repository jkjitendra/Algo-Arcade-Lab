import { AlgorithmCodeTemplates } from './types';

export const twoSumHashCode: AlgorithmCodeTemplates = {
  algorithmId: 'two-sum-hash',
  algorithmName: 'Two Sum (Hash Map)',
  category: 'hashing',
  templates: {
    javascript: `// Two Sum using Hash Map - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find two numbers that add up to target

function twoSum(nums, target) {
  log(\`Finding two numbers that sum to \${target} in [\${nums.join(', ')}]\`);
  
  const map = new Map(); // value -> index
  
  for (let i = 0; i < nums.length; i++) {
    visit(i);
    mark(i, 'current');
    
    const complement = target - nums[i];
    log(\`Index \${i}: nums[i]=\${nums[i]}, need complement=\${complement}\`);
    
    if (map.has(complement)) {
      const j = map.get(complement);
      compare(j, i);
      mark(i, 'found');
      mark(j, 'found');
      log(\`Found! indices [\${j}, \${i}]: \${nums[j]} + \${nums[i]} = \${target}\`);
      return [j, i];
    }
    
    map.set(nums[i], i);
    log(\`  Stored \${nums[i]} -> index \${i}\`);
  }
  
  log('No solution found');
  return [];
}

// Demo
twoSum([2, 7, 11, 15], 9); // [0, 1]
twoSum([3, 2, 4], 6);      // [1, 2]
`,

    java: `// Two Sum - Java
import java.util.*;

public class TwoSum {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        
        return new int[]{};
    }
    
    public static void main(String[] args) {
        TwoSum sol = new TwoSum();
        int[] result = sol.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result));
    }
}
`,

    python: `# Two Sum - Python

def two_sum(nums, target):
    seen = {}  # value -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []


print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))      # [1, 2]
`,

    cpp: `// Two Sum - C++
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto result = twoSum(nums, 9);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
}
`,

    go: `// Two Sum - Go
package main

import "fmt"

func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    
    for i, num := range nums {
        complement := target - num
        if j, ok := seen[complement]; ok {
            return []int{j, i}
        }
        seen[num] = i
    }
    
    return nil
}

func main() {
    fmt.Println(twoSum([]int{2, 7, 11, 15}, 9))
    fmt.Println(twoSum([]int{3, 2, 4}, 6))
}
`,
  },
};
