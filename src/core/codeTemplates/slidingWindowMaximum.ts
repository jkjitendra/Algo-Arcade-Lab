import { AlgorithmCodeTemplates } from './types';

export const slidingWindowMaximumCode: AlgorithmCodeTemplates = {
  algorithmId: 'sliding-window-maximum',
  algorithmName: 'Sliding Window Maximum',
  category: 'queues',
  templates: {
    javascript: `// Sliding Window Maximum - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find maximum in each sliding window of size k using deque

function slidingWindowMaximum(nums, k) {
  log(\`Finding max in sliding windows of size \${k}\`);
  log(\`Array: [\${nums.join(', ')}]\`);
  
  const result = [];
  const deque = []; // Store indices, front has max
  
  for (let i = 0; i < nums.length; i++) {
    visit(i);
    
    // Remove indices outside current window
    while (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }
    
    // Remove smaller elements from back
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      compare(deque[deque.length - 1], i);
      deque.pop();
    }
    
    deque.push(i);
    mark(i, 'current');
    
    // Start recording results when window is complete
    if (i >= k - 1) {
      const maxVal = nums[deque[0]];
      result.push(maxVal);
      mark(deque[0], 'found');
      log(\`Window [\${i - k + 1}, \${i}]: max = \${maxVal}\`);
    }
  }
  
  log(\`Result: [\${result.join(', ')}]\`);
  return result;
}

slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3);
`,

    java: `// Sliding Window Maximum - Java
import java.util.*;

public class SlidingWindowMaximum {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums.length == 0) return new int[0];
        
        int[] result = new int[nums.length - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();
        
        for (int i = 0; i < nums.length; i++) {
            // Remove indices outside window
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            
            // Remove smaller elements
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            
            deque.offerLast(i);
            
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return result;
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
        System.out.println(Arrays.toString(maxSlidingWindow(nums, 3)));
    }
}
`,

    python: `# Sliding Window Maximum - Python
from collections import deque

def max_sliding_window(nums, k):
    result = []
    dq = deque()  # Store indices
    
    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result


nums = [1, 3, -1, -3, 5, 3, 6, 7]
print(f"Max in windows: {max_sliding_window(nums, 3)}")
`,

    cpp: `// Sliding Window Maximum - C++
#include <iostream>
#include <vector>
#include <deque>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> result;
    deque<int> dq;
    
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
        
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}

int main() {
    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};
    auto result = maxSlidingWindow(nums, 3);
    for (int x : result) cout << x << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Sliding Window Maximum - Go
package main

import "fmt"

func maxSlidingWindow(nums []int, k int) []int {
    var result []int
    var dq []int // indices
    
    for i := 0; i < len(nums); i++ {
        for len(dq) > 0 && dq[0] < i-k+1 {
            dq = dq[1:]
        }
        for len(dq) > 0 && nums[dq[len(dq)-1]] < nums[i] {
            dq = dq[:len(dq)-1]
        }
        dq = append(dq, i)
        
        if i >= k-1 {
            result = append(result, nums[dq[0]])
        }
    }
    return result
}

func main() {
    nums := []int{1, 3, -1, -3, 5, 3, 6, 7}
    fmt.Printf("Max in windows: %v\\n", maxSlidingWindow(nums, 3))
}
`,
  },
};
