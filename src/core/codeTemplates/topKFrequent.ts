import { AlgorithmCodeTemplates } from './types';

export const topKFrequentCode: AlgorithmCodeTemplates = {
  algorithmId: 'top-k-frequent',
  algorithmName: 'Top K Frequent Elements',
  category: 'heaps',
  templates: {
    javascript: `// Top K Frequent Elements - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function topKFrequent(nums, k) {
  log(\`Finding top \${k} frequent elements in [\${nums.join(', ')}]\`);
  
  // Count frequencies
  const freq = {};
  for (const num of nums) {
    freq[num] = (freq[num] || 0) + 1;
  }
  log(\`Frequencies: \${JSON.stringify(freq)}\`);
  
  // Min-heap based on frequency
  const heap = [];
  
  function heapifyUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (freq[heap[p]] <= freq[heap[i]]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  }
  
  function heapifyDown(i) {
    while (true) {
      let min = i, l = 2*i+1, r = 2*i+2;
      if (l < heap.length && freq[heap[l]] < freq[heap[min]]) min = l;
      if (r < heap.length && freq[heap[r]] < freq[heap[min]]) min = r;
      if (min === i) break;
      [heap[i], heap[min]] = [heap[min], heap[i]];
      i = min;
    }
  }
  
  let idx = 0;
  for (const num in freq) {
    visit(idx);
    
    if (heap.length < k) {
      heap.push(num);
      heapifyUp(heap.length - 1);
      log(\`Add \${num} (freq: \${freq[num]}) to heap\`);
    } else if (freq[num] > freq[heap[0]]) {
      compare(0, idx);
      log(\`\${num} (freq: \${freq[num]}) > min in heap, replace\`);
      heap[0] = num;
      heapifyDown(0);
    }
    
    mark(idx, 'current');
    idx++;
  }
  
  log(\`Top \${k} frequent: [\${heap.join(', ')}]\`);
  return heap.map(Number);
}

// Demo
topKFrequent([1, 1, 1, 2, 2, 3], 2); // Output: [1, 2]
`,

    java: `// Top K Frequent Elements - Java
import java.util.*;

public class TopKFrequent {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : nums) freq.put(num, freq.getOrDefault(num, 0) + 1);
        
        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> freq.get(a) - freq.get(b));
        
        for (int num : freq.keySet()) {
            heap.offer(num);
            if (heap.size() > k) heap.poll();
        }
        
        int[] result = new int[k];
        for (int i = 0; i < k; i++) result[i] = heap.poll();
        return result;
    }
    
    public static void main(String[] args) {
        TopKFrequent sol = new TopKFrequent();
        int[] result = sol.topKFrequent(new int[]{1,1,1,2,2,3}, 2);
        System.out.println(Arrays.toString(result));
    }
}
`,

    python: `# Top K Frequent Elements - Python
import heapq
from collections import Counter

def top_k_frequent(nums, k):
    freq = Counter(nums)
    # Use min-heap of size k
    return heapq.nlargest(k, freq.keys(), key=freq.get)


# Alternative using heap explicitly
def top_k_frequent_heap(nums, k):
    freq = Counter(nums)
    heap = []
    
    for num, count in freq.items():
        if len(heap) < k:
            heapq.heappush(heap, (count, num))
        elif count > heap[0][0]:
            heapq.heapreplace(heap, (count, num))
    
    return [num for count, num in heap]


nums = [1, 1, 1, 2, 2, 3]
print(f"Top 2 frequent: {top_k_frequent(nums, 2)}")
`,

    cpp: `// Top K Frequent Elements - C++
#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int num : nums) freq[num]++;
    
    auto cmp = [&freq](int a, int b) { return freq[a] > freq[b]; };
    priority_queue<int, vector<int>, decltype(cmp)> heap(cmp);
    
    for (auto& p : freq) {
        heap.push(p.first);
        if (heap.size() > k) heap.pop();
    }
    
    vector<int> result;
    while (!heap.empty()) {
        result.push_back(heap.top());
        heap.pop();
    }
    return result;
}

int main() {
    vector<int> nums = {1,1,1,2,2,3};
    auto result = topKFrequent(nums, 2);
    for (int x : result) cout << x << " ";
    return 0;
}
`,

    go: `// Top K Frequent Elements - Go
package main

import (
    "container/heap"
    "fmt"
)

type Item struct {
    val, freq int
}

type FreqHeap []Item

func (h FreqHeap) Len() int           { return len(h) }
func (h FreqHeap) Less(i, j int) bool { return h[i].freq < h[j].freq }
func (h FreqHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *FreqHeap) Push(x interface{}) { *h = append(*h, x.(Item)) }
func (h *FreqHeap) Pop() interface{} {
    old := *h; n := len(old); x := old[n-1]; *h = old[0:n-1]; return x
}

func topKFrequent(nums []int, k int) []int {
    freq := make(map[int]int)
    for _, num := range nums { freq[num]++ }
    
    h := &FreqHeap{}
    heap.Init(h)
    
    for val, f := range freq {
        if h.Len() < k {
            heap.Push(h, Item{val, f})
        } else if f > (*h)[0].freq {
            heap.Pop(h)
            heap.Push(h, Item{val, f})
        }
    }
    
    result := make([]int, k)
    for i := 0; i < k; i++ { result[i] = heap.Pop(h).(Item).val }
    return result
}

func main() {
    nums := []int{1, 1, 1, 2, 2, 3}
    fmt.Printf("Top 2: %v\\n", topKFrequent(nums, 2))
}
`,
  },
};
