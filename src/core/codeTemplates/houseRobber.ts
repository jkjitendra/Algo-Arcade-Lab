import { AlgorithmCodeTemplates } from './types';

export const houseRobberCode: AlgorithmCodeTemplates = {
  algorithmId: 'house-robber',
  algorithmName: 'House Robber',
  category: 'dp',
  templates: {
    javascript: `// House Robber - Dynamic Programming - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Max rob without adjacent houses

function houseRobber(nums) {
  log(\`House values: [\${nums.join(', ')}]\`);
  
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  const n = nums.length;
  const dp = Array(n).fill(0);
  
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  
  log(\`dp[0] = \${dp[0]}\`);
  log(\`dp[1] = max(\${nums[0]}, \${nums[1]}) = \${dp[1]}\`);
  
  for (let i = 2; i < n; i++) {
    visit(i);
    compare(i, i - 2);
    
    // Either skip this house or rob this + dp[i-2]
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    
    mark(i, 'current');
    log(\`dp[\${i}] = max(dp[\${i-1}], dp[\${i-2}] + \${nums[i]}) = max(\${dp[i-1]}, \${dp[i-2] + nums[i]}) = \${dp[i]}\`);
  }
  
  mark(n - 1, 'found');
  log(\`\\nMax money: \${dp[n - 1]}\`);
  return dp[n - 1];
}

// Space optimized
function houseRobberOptimized(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);
  
  for (let i = 2; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}

// Demo
houseRobber([2, 7, 9, 3, 1]);
log(\`\\nOptimized: \${houseRobberOptimized([2, 7, 9, 3, 1])}\`);
`,

    java: `// House Robber - Java
public class HouseRobber {
    public static int rob(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        
        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        
        for (int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[nums.length - 1];
    }
    
    public static int robOptimized(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        
        int prev2 = nums[0], prev1 = Math.max(nums[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            int curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
    
    public static void main(String[] args) {
        System.out.println("Max: " + rob(new int[]{2, 7, 9, 3, 1}));
    }
}
`,

    python: `# House Robber - Python

def house_robber(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    
    return dp[-1]

def house_robber_optimized(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    for i in range(2, len(nums)):
        curr = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, curr
    
    return prev1


print(f"Max: {house_robber([2, 7, 9, 3, 1])}")
`,

    cpp: `// House Robber - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    vector<int> dp(n);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);
    
    for (int i = 2; i < n; i++) {
        dp[i] = max(dp[i-1], dp[i-2] + nums[i]);
    }
    return dp[n-1];
}

int robOptimized(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    int prev2 = nums[0], prev1 = max(nums[0], nums[1]);
    for (int i = 2; i < n; i++) {
        int curr = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    vector<int> nums = {2, 7, 9, 3, 1};
    cout << "Max: " << rob(nums) << endl;
    return 0;
}
`,

    go: `// House Robber - Go
package main

import "fmt"

func rob(nums []int) int {
    n := len(nums)
    if n == 0 { return 0 }
    if n == 1 { return nums[0] }
    
    dp := make([]int, n)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i := 2; i < n; i++ {
        dp[i] = max(dp[i-1], dp[i-2]+nums[i])
    }
    return dp[n-1]
}

func robOptimized(nums []int) int {
    n := len(nums)
    if n == 0 { return 0 }
    if n == 1 { return nums[0] }
    
    prev2, prev1 := nums[0], max(nums[0], nums[1])
    for i := 2; i < n; i++ {
        curr := max(prev1, prev2+nums[i])
        prev2, prev1 = prev1, curr
    }
    return prev1
}

func main() {
    fmt.Printf("Max: %d\\n", rob([]int{2, 7, 9, 3, 1}))
}
`,
  },
};
