import { AlgorithmCodeTemplates } from './types';

export const kthSmallestCode: AlgorithmCodeTemplates = {
  algorithmId: 'kth-smallest',
  algorithmName: 'Kth Smallest Element',
  category: 'heaps',
  templates: {
    javascript: `// Kth Smallest Element - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

// Using max-heap of size k
function findKthSmallest(nums, k) {
  log(\`Finding \${k}th smallest in [\${nums.join(', ')}]\`);
  
  // Maintain a max-heap of size k
  const maxHeap = [];
  
  function heapifyUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (maxHeap[parent] >= maxHeap[i]) break;
      [maxHeap[parent], maxHeap[i]] = [maxHeap[i], maxHeap[parent]];
      i = parent;
    }
  }
  
  function heapifyDown(i) {
    while (true) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < maxHeap.length && maxHeap[left] > maxHeap[largest]) largest = left;
      if (right < maxHeap.length && maxHeap[right] > maxHeap[largest]) largest = right;
      if (largest === i) break;
      [maxHeap[i], maxHeap[largest]] = [maxHeap[largest], maxHeap[i]];
      i = largest;
    }
  }
  
  for (let i = 0; i < nums.length; i++) {
    visit(i);
    
    if (maxHeap.length < k) {
      maxHeap.push(nums[i]);
      heapifyUp(maxHeap.length - 1);
      log(\`Add \${nums[i]} to heap: [\${maxHeap.join(', ')}]\`);
    } else if (nums[i] < maxHeap[0]) {
      compare(0, i);
      log(\`\${nums[i]} < max(\${maxHeap[0]}), replace\`);
      maxHeap[0] = nums[i];
      heapifyDown(0);
    }
    
    mark(i, 'current');
  }
  
  mark(0, 'found');
  log(\`\${k}th smallest: \${maxHeap[0]}\`);
  return maxHeap[0];
}

// Demo
findKthSmallest([3, 2, 1, 5, 6, 4], 2); // Output: 2
`,

    java: `// Kth Smallest Element - Java
import java.util.*;

public class KthSmallest {
    public static int findKthSmallest(int[] nums, int k) {
        // Max heap
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        
        for (int num : nums) {
            if (maxHeap.size() < k) {
                maxHeap.offer(num);
            } else if (num < maxHeap.peek()) {
                maxHeap.poll();
                maxHeap.offer(num);
            }
        }
        
        return maxHeap.peek();
    }
    
    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 5, 6, 4};
        System.out.println("2nd smallest: " + findKthSmallest(nums, 2));
    }
}
`,

    python: `# Kth Smallest Element - Python
import heapq

def find_kth_smallest(nums, k):
    # Use max-heap (negate values) of size k
    max_heap = []
    
    for num in nums:
        if len(max_heap) < k:
            heapq.heappush(max_heap, -num)
        elif num < -max_heap[0]:
            heapq.heapreplace(max_heap, -num)
    
    return -max_heap[0]

# Alternative: use nsmallest
def find_kth_smallest_alt(nums, k):
    return heapq.nsmallest(k, nums)[-1]


nums = [3, 2, 1, 5, 6, 4]
print(f"2nd smallest: {find_kth_smallest(nums, 2)}")
`,

    cpp: `// Kth Smallest Element - C++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int findKthSmallest(vector<int>& nums, int k) {
    priority_queue<int> maxHeap; // Max heap by default
    
    for (int num : nums) {
        if (maxHeap.size() < k) {
            maxHeap.push(num);
        } else if (num < maxHeap.top()) {
            maxHeap.pop();
            maxHeap.push(num);
        }
    }
    
    return maxHeap.top();
}

int main() {
    vector<int> nums = {3, 2, 1, 5, 6, 4};
    cout << "2nd smallest: " << findKthSmallest(nums, 2) << endl;
    return 0;
}
`,

    go: `// Kth Smallest Element - Go
package main

import (
    "container/heap"
    "fmt"
)

type MaxHeap []int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h; n := len(old); x := old[n-1]; *h = old[0:n-1]; return x
}

func findKthSmallest(nums []int, k int) int {
    h := &MaxHeap{}
    heap.Init(h)
    
    for _, num := range nums {
        if h.Len() < k {
            heap.Push(h, num)
        } else if num < (*h)[0] {
            heap.Pop(h)
            heap.Push(h, num)
        }
    }
    
    return (*h)[0]
}

func main() {
    nums := []int{3, 2, 1, 5, 6, 4}
    fmt.Printf("2nd smallest: %d\\n", findKthSmallest(nums, 2))
}
`,
  },
};
