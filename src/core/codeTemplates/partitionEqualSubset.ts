import { AlgorithmCodeTemplates } from './types';

export const partitionEqualSubsetCode: AlgorithmCodeTemplates = {
  algorithmId: 'partition-equal-subset',
  algorithmName: 'Partition Equal Subset Sum',
  category: 'dp',
  templates: {
    javascript: `// Partition Equal Subset Sum - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Can array be partitioned into two subsets with equal sum?

function canPartition(nums) {
  const totalSum = nums.reduce((a, b) => a + b, 0);
  log(\`Numbers: [\${nums.join(', ')}], Total sum: \${totalSum}\`);
  
  // If odd sum, can't partition equally
  if (totalSum % 2 !== 0) {
    log('Odd sum - cannot partition equally');
    return false;
  }
  
  const target = totalSum / 2;
  log(\`Need subset with sum: \${target}\`);
  
  // Reduce to subset sum problem
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    visit(i);
    
    for (let j = target; j >= num; j--) {
      compare(i, j);
      dp[j] = dp[j] || dp[j - num];
      
      if (dp[j] && j === target) {
        mark(i, 'found');
        log(\`Found! Can make sum \${target}\`);
        return true;
      }
    }
    
    mark(i, 'current');
    log(\`After \${num}: sums [\${dp.map((v, idx) => v ? idx : '').filter(x => x !== '').join(', ')}] possible\`);
  }
  
  log(\`Can partition: \${dp[target]}\`);
  return dp[target];
}

// Demo
canPartition([1, 5, 11, 5]); // true: [1,5,5] and [11]
canPartition([1, 2, 3, 5]); // false
`,

    java: `// Partition Equal Subset Sum - Java
public class PartitionEqualSubset {
    public static boolean canPartition(int[] nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (sum % 2 != 0) return false;
        
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
            if (dp[target]) return true;
        }
        return dp[target];
    }
    
    public static void main(String[] args) {
        System.out.println(canPartition(new int[]{1, 5, 11, 5}));
    }
}
`,

    python: `# Partition Equal Subset Sum - Python

def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in nums:
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]
        if dp[target]:
            return True
    
    return dp[target]


print(f"[1,5,11,5]: {can_partition([1, 5, 11, 5])}")  # True
print(f"[1,2,3,5]: {can_partition([1, 2, 3, 5])}")    # False
`,

    cpp: `// Partition Equal Subset Sum - C++
#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

bool canPartition(vector<int>& nums) {
    int sum = accumulate(nums.begin(), nums.end(), 0);
    if (sum % 2 != 0) return false;
    
    int target = sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    
    for (int num : nums) {
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
        if (dp[target]) return true;
    }
    return dp[target];
}

int main() {
    vector<int> nums = {1, 5, 11, 5};
    cout << boolalpha << canPartition(nums) << endl;
    return 0;
}
`,

    go: `// Partition Equal Subset Sum - Go
package main

import "fmt"

func canPartition(nums []int) bool {
    sum := 0
    for _, n := range nums { sum += n }
    if sum%2 != 0 { return false }
    
    target := sum / 2
    dp := make([]bool, target+1)
    dp[0] = true
    
    for _, num := range nums {
        for j := target; j >= num; j-- {
            dp[j] = dp[j] || dp[j-num]
        }
        if dp[target] { return true }
    }
    return dp[target]
}

func main() {
    fmt.Println(canPartition([]int{1, 5, 11, 5}))
}
`,
  },
};
