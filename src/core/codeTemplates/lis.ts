import { AlgorithmCodeTemplates } from './types';

export const lisCode: AlgorithmCodeTemplates = {
  algorithmId: 'lis',
  algorithmName: 'Longest Increasing Subsequence',
  category: 'dp',
  templates: {
    javascript: `// Longest Increasing Subsequence - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

// O(n²) DP solution
function lis(nums) {
  log(\`Finding LIS in [\${nums.join(', ')}]\`);
  
  const n = nums.length;
  if (n === 0) return 0;
  
  const dp = Array(n).fill(1); // Each element is LIS of length 1
  
  for (let i = 1; i < n; i++) {
    visit(i);
    log(\`Checking position \${i} (value: \${nums[i]})\`);
    
    for (let j = 0; j < i; j++) {
      compare(i, j);
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        log(\`  nums[\${j}]=\${nums[j]} < nums[\${i}]=\${nums[i]}: dp[\${i}] = \${dp[i]}\`);
      }
    }
    mark(i, 'current');
  }
  
  const maxLen = Math.max(...dp);
  log(\`\\nDP array: [\${dp.join(', ')}]\`);
  log(\`LIS length: \${maxLen}\`);
  return maxLen;
}

// O(n log n) solution using binary search
function lisOptimized(nums) {
  log(\`\\nOptimized LIS (O(n log n)):\`);
  
  const tails = [];
  
  for (const num of nums) {
    let left = 0, right = tails.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }
    
    if (left === tails.length) {
      tails.push(num);
      log(\`Append \${num}: tails = [\${tails.join(', ')}]\`);
    } else {
      tails[left] = num;
      log(\`Replace tails[\${left}] with \${num}: tails = [\${tails.join(', ')}]\`);
    }
  }
  
  log(\`LIS length: \${tails.length}\`);
  return tails.length;
}

// Demo
lis([10, 9, 2, 5, 3, 7, 101, 18]);
lisOptimized([10, 9, 2, 5, 3, 7, 101, 18]);
`,

    java: `// Longest Increasing Subsequence - Java
import java.util.*;

public class LIS {
    // O(n²) solution
    public static int lis(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
        return Arrays.stream(dp).max().getAsInt();
    }
    
    // O(n log n) using binary search
    public static int lisOptimized(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int num : nums) {
            int idx = Collections.binarySearch(tails, num);
            if (idx < 0) idx = -(idx + 1);
            if (idx == tails.size()) tails.add(num);
            else tails.set(idx, num);
        }
        return tails.size();
    }
    
    public static void main(String[] args) {
        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("LIS: " + lis(nums));
    }
}
`,

    python: `# Longest Increasing Subsequence - Python
import bisect

def lis_dp(nums):
    if not nums:
        return 0
    
    n = len(nums)
    dp = [1] * n
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)

# O(n log n) using binary search
def lis_optimized(nums):
    tails = []
    for num in nums:
        idx = bisect.bisect_left(tails, num)
        if idx == len(tails):
            tails.append(num)
        else:
            tails[idx] = num
    return len(tails)


nums = [10, 9, 2, 5, 3, 7, 101, 18]
print(f"LIS: {lis_dp(nums)}")
print(f"LIS (optimized): {lis_optimized(nums)}")
`,

    cpp: `// Longest Increasing Subsequence - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lisDP(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    
    vector<int> dp(n, 1);
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    return *max_element(dp.begin(), dp.end());
}

int lisOptimized(vector<int>& nums) {
    vector<int> tails;
    for (int num : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), num);
        if (it == tails.end()) tails.push_back(num);
        else *it = num;
    }
    return tails.size();
}

int main() {
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS: " << lisDP(nums) << endl;
    return 0;
}
`,

    go: `// Longest Increasing Subsequence - Go
package main

import (
    "fmt"
    "sort"
)

func lisDP(nums []int) int {
    n := len(nums)
    if n == 0 { return 0 }
    
    dp := make([]int, n)
    for i := range dp { dp[i] = 1 }
    
    maxLen := 1
    for i := 1; i < n; i++ {
        for j := 0; j < i; j++ {
            if nums[j] < nums[i] && dp[j]+1 > dp[i] {
                dp[i] = dp[j] + 1
            }
        }
        if dp[i] > maxLen { maxLen = dp[i] }
    }
    return maxLen
}

func lisOptimized(nums []int) int {
    tails := []int{}
    for _, num := range nums {
        idx := sort.SearchInts(tails, num)
        if idx == len(tails) {
            tails = append(tails, num)
        } else {
            tails[idx] = num
        }
    }
    return len(tails)
}

func main() {
    nums := []int{10, 9, 2, 5, 3, 7, 101, 18}
    fmt.Printf("LIS: %d\\n", lisDP(nums))
}
`,
  },
};
