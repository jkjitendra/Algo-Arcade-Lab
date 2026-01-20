import { AlgorithmCodeTemplates } from './types';

export const subsetSumCode: AlgorithmCodeTemplates = {
  algorithmId: 'subset-sum',
  algorithmName: 'Subset Sum',
  category: 'dp',
  templates: {
    javascript: `// Subset Sum Problem - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Check if subset with given sum exists

function subsetSum(nums, target) {
  log(\`Numbers: [\${nums.join(', ')}], Target: \${target}\`);
  
  const n = nums.length;
  // dp[i][j] = can we make sum j using first i elements?
  const dp = Array(n + 1).fill(null).map(() => Array(target + 1).fill(false));
  
  // Sum 0 is always possible (empty subset)
  for (let i = 0; i <= n; i++) dp[i][0] = true;
  
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    
    for (let j = 1; j <= target; j++) {
      visit(i * (target + 1) + j);
      
      if (num <= j) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
      
      if (dp[i][j]) {
        mark(i * (target + 1) + j, 'found');
      }
    }
    
    log(\`After element \${num}: sums [\${dp[i].map((v, idx) => v ? idx : '').filter(x => x !== '').join(', ')}] possible\`);
  }
  
  log(\`\\nCan make sum \${target}: \${dp[n][target]}\`);
  return dp[n][target];
}

// Space-optimized
function subsetSumOptimized(nums, target) {
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  
  return dp[target];
}

// Demo
subsetSum([3, 34, 4, 12, 5, 2], 9);
log(\`\\nOptimized: \${subsetSumOptimized([3, 34, 4, 12, 5, 2], 9)}\`);
`,

    java: `// Subset Sum - Java
public class SubsetSum {
    public static boolean subsetSum(int[] nums, int target) {
        int n = nums.length;
        boolean[][] dp = new boolean[n + 1][target + 1];
        
        for (int i = 0; i <= n; i++) dp[i][0] = true;
        
        for (int i = 1; i <= n; i++) {
            int num = nums[i - 1];
            for (int j = 1; j <= target; j++) {
                if (num <= j) dp[i][j] = dp[i-1][j] || dp[i-1][j-num];
                else dp[i][j] = dp[i-1][j];
            }
        }
        return dp[n][target];
    }
    
    public static boolean subsetSumOptimized(int[] nums, int target) {
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }
    
    public static void main(String[] args) {
        System.out.println(subsetSum(new int[]{3, 34, 4, 12, 5, 2}, 9));
    }
}
`,

    python: `# Subset Sum - Python

def subset_sum(nums, target):
    n = len(nums)
    dp = [[False] * (target + 1) for _ in range(n + 1)]
    
    for i in range(n + 1):
        dp[i][0] = True
    
    for i in range(1, n + 1):
        num = nums[i - 1]
        for j in range(1, target + 1):
            if num <= j:
                dp[i][j] = dp[i-1][j] or dp[i-1][j-num]
            else:
                dp[i][j] = dp[i-1][j]
    
    return dp[n][target]

def subset_sum_optimized(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True
    for num in nums:
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]
    return dp[target]


print(f"Can make 9: {subset_sum([3, 34, 4, 12, 5, 2], 9)}")
`,

    cpp: `// Subset Sum - C++
#include <iostream>
#include <vector>
using namespace std;

bool subsetSum(vector<int>& nums, int target) {
    int n = nums.size();
    vector<vector<bool>> dp(n + 1, vector<bool>(target + 1, false));
    
    for (int i = 0; i <= n; i++) dp[i][0] = true;
    
    for (int i = 1; i <= n; i++) {
        int num = nums[i - 1];
        for (int j = 1; j <= target; j++) {
            if (num <= j) dp[i][j] = dp[i-1][j] || dp[i-1][j-num];
            else dp[i][j] = dp[i-1][j];
        }
    }
    return dp[n][target];
}

bool subsetSumOptimized(vector<int>& nums, int target) {
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums) {
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}

int main() {
    vector<int> nums = {3, 34, 4, 12, 5, 2};
    cout << boolalpha << subsetSum(nums, 9) << endl;
    return 0;
}
`,

    go: `// Subset Sum - Go
package main

import "fmt"

func subsetSum(nums []int, target int) bool {
    n := len(nums)
    dp := make([][]bool, n+1)
    for i := range dp { dp[i] = make([]bool, target+1) }
    
    for i := 0; i <= n; i++ { dp[i][0] = true }
    
    for i := 1; i <= n; i++ {
        num := nums[i-1]
        for j := 1; j <= target; j++ {
            if num <= j {
                dp[i][j] = dp[i-1][j] || dp[i-1][j-num]
            } else {
                dp[i][j] = dp[i-1][j]
            }
        }
    }
    return dp[n][target]
}

func subsetSumOptimized(nums []int, target int) bool {
    dp := make([]bool, target+1)
    dp[0] = true
    for _, num := range nums {
        for j := target; j >= num; j-- {
            dp[j] = dp[j] || dp[j-num]
        }
    }
    return dp[target]
}

func main() {
    fmt.Println(subsetSum([]int{3, 34, 4, 12, 5, 2}, 9))
}
`,
  },
};
