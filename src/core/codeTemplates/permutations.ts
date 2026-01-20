import { AlgorithmCodeTemplates } from './types';

export const permutationsCode: AlgorithmCodeTemplates = {
  algorithmId: 'permutations',
  algorithmName: 'Permutations',
  category: 'recursion',
  templates: {
    javascript: `// Permutations - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function permute(arr) {
  log(\`Generating permutations of [\${arr.join(', ')}]\`);
  
  const result = [];
  
  function backtrack(current, remaining, depth = 0) {
    const indent = '  '.repeat(depth);
    
    if (remaining.length === 0) {
      result.push([...current]);
      log(\`\${indent}Found: [\${current.join(', ')}]\`);
      mark(result.length - 1, 'found');
      return;
    }
    
    for (let i = 0; i < remaining.length; i++) {
      visit(depth);
      mark(depth, 'current');
      
      const picked = remaining[i];
      const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];
      
      log(\`\${indent}Pick \${picked}, remaining: [\${newRemaining.join(', ')}]\`);
      
      current.push(picked);
      backtrack(current, newRemaining, depth + 1);
      current.pop();
    }
  }
  
  backtrack([], arr);
  
  log(\`Total permutations: \${result.length}\`);
  return result;
}

// Demo
const arr = [1, 2, 3];
const perms = permute(arr);
log('All permutations:');
perms.forEach((p, i) => log(\`\${i + 1}: [\${p.join(', ')}]\`));
`,

    java: `// Permutations - Java
import java.util.*;

public class Permutations {
    public static List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), nums, new boolean[nums.length]);
        return result;
    }
    
    static void backtrack(List<List<Integer>> result, List<Integer> current, 
                          int[] nums, boolean[] used) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            current.add(nums[i]);
            backtrack(result, current, nums, used);
            current.remove(current.size() - 1);
            used[i] = false;
        }
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        System.out.println(permute(nums));
    }
}
`,

    python: `# Permutations - Python
from itertools import permutations as perm

def permute(nums):
    result = []
    
    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return
        
        for i, num in enumerate(remaining):
            current.append(num)
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()
    
    backtrack([], nums)
    return result


nums = [1, 2, 3]
perms = permute(nums)
print(f"Total permutations: {len(perms)}")
for p in perms:
    print(p)

# Using itertools
print(f"\\nUsing itertools: {list(perm([1, 2, 3]))}")
`,

    cpp: `// Permutations - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        backtrack(result, nums, 0);
        return result;
    }
    
    void backtrack(vector<vector<int>>& result, vector<int>& nums, int start) {
        if (start == nums.size()) {
            result.push_back(nums);
            return;
        }
        for (int i = start; i < nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(result, nums, start + 1);
            swap(nums[start], nums[i]);
        }
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3};
    auto result = sol.permute(nums);
    cout << "Total: " << result.size() << endl;
    return 0;
}
`,

    go: `// Permutations - Go
package main

import "fmt"

func permute(nums []int) [][]int {
    var result [][]int
    var backtrack func(current, remaining []int)
    
    backtrack = func(current, remaining []int) {
        if len(remaining) == 0 {
            perm := make([]int, len(current))
            copy(perm, current)
            result = append(result, perm)
            return
        }
        
        for i := 0; i < len(remaining); i++ {
            newCurrent := append(current, remaining[i])
            newRemaining := append([]int{}, remaining[:i]...)
            newRemaining = append(newRemaining, remaining[i+1:]...)
            backtrack(newCurrent, newRemaining)
        }
    }
    
    backtrack([]int{}, nums)
    return result
}

func main() {
    nums := []int{1, 2, 3}
    result := permute(nums)
    fmt.Printf("Total: %d\\n", len(result))
    for _, p := range result {
        fmt.Println(p)
    }
}
`,
  },
};
