import { AlgorithmCodeTemplates } from './types';

export const kthLargestCode: AlgorithmCodeTemplates = {
  algorithmId: 'kth-largest',
  algorithmName: 'Kth Largest Element',
  category: 'heaps',
  templates: {
    javascript: `// Kth Largest Element - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

// Using min-heap of size k
function findKthLargest(nums, k) {
  log(\`Finding \${k}th largest in [\${nums.join(', ')}]\`);
  
  // Maintain a min-heap of size k
  const minHeap = [];
  
  function heapifyUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (minHeap[parent] <= minHeap[i]) break;
      [minHeap[parent], minHeap[i]] = [minHeap[i], minHeap[parent]];
      i = parent;
    }
  }
  
  function heapifyDown(i) {
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < minHeap.length && minHeap[left] < minHeap[smallest]) smallest = left;
      if (right < minHeap.length && minHeap[right] < minHeap[smallest]) smallest = right;
      if (smallest === i) break;
      [minHeap[i], minHeap[smallest]] = [minHeap[smallest], minHeap[i]];
      i = smallest;
    }
  }
  
  for (let i = 0; i < nums.length; i++) {
    visit(i);
    
    if (minHeap.length < k) {
      minHeap.push(nums[i]);
      heapifyUp(minHeap.length - 1);
      log(\`Add \${nums[i]} to heap: [\${minHeap.join(', ')}]\`);
    } else if (nums[i] > minHeap[0]) {
      compare(0, i);
      log(\`\${nums[i]} > min(\${minHeap[0]}), replace\`);
      minHeap[0] = nums[i];
      heapifyDown(0);
    }
    
    mark(i, 'current');
  }
  
  mark(0, 'found');
  log(\`\${k}th largest: \${minHeap[0]}\`);
  return minHeap[0];
}

// Demo
findKthLargest([3, 2, 1, 5, 6, 4], 2); // Output: 5
`,

    java: `// Kth Largest Element - Java
import java.util.*;

public class KthLargest {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        for (int num : nums) {
            if (minHeap.size() < k) {
                minHeap.offer(num);
            } else if (num > minHeap.peek()) {
                minHeap.poll();
                minHeap.offer(num);
            }
        }
        
        return minHeap.peek();
    }
    
    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 5, 6, 4};
        System.out.println("2nd largest: " + findKthLargest(nums, 2));
    }
}
`,

    python: `# Kth Largest Element - Python
import heapq

def find_kth_largest(nums, k):
    # Use min-heap of size k
    min_heap = []
    
    for num in nums:
        if len(min_heap) < k:
            heapq.heappush(min_heap, num)
        elif num > min_heap[0]:
            heapq.heapreplace(min_heap, num)
    
    return min_heap[0]

# Alternative: use nlargest
def find_kth_largest_alt(nums, k):
    return heapq.nlargest(k, nums)[-1]


nums = [3, 2, 1, 5, 6, 4]
print(f"2nd largest: {find_kth_largest(nums, 2)}")
`,

    cpp: `// Kth Largest Element - C++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int num : nums) {
        if (minHeap.size() < k) {
            minHeap.push(num);
        } else if (num > minHeap.top()) {
            minHeap.pop();
            minHeap.push(num);
        }
    }
    
    return minHeap.top();
}

int main() {
    vector<int> nums = {3, 2, 1, 5, 6, 4};
    cout << "2nd largest: " << findKthLargest(nums, 2) << endl;
    return 0;
}
`,

    go: `// Kth Largest Element - Go
package main

import (
    "container/heap"
    "fmt"
)

type MinHeap []int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() interface{} {
    old := *h; n := len(old); x := old[n-1]; *h = old[0:n-1]; return x
}

func findKthLargest(nums []int, k int) int {
    h := &MinHeap{}
    heap.Init(h)
    
    for _, num := range nums {
        if h.Len() < k {
            heap.Push(h, num)
        } else if num > (*h)[0] {
            heap.Pop(h)
            heap.Push(h, num)
        }
    }
    
    return (*h)[0]
}

func main() {
    nums := []int{3, 2, 1, 5, 6, 4}
    fmt.Printf("2nd largest: %d\\n", findKthLargest(nums, 2))
}
`,
  },
};
