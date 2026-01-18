import { AlgorithmCodeTemplates } from './types';

export const medianOfStreamCode: AlgorithmCodeTemplates = {
  algorithmId: 'median-of-stream',
  algorithmName: 'Median of Data Stream',
  category: 'heaps',
  templates: {
    javascript: `// Median of Data Stream - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Use two heaps: maxHeap for lower half, minHeap for upper half

class MedianFinder {
  constructor() {
    this.maxHeap = []; // Lower half (negated for max behavior)
    this.minHeap = []; // Upper half
  }
  
  // Min heap operations
  pushMin(val) {
    this.minHeap.push(val);
    let i = this.minHeap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.minHeap[p] <= this.minHeap[i]) break;
      [this.minHeap[p], this.minHeap[i]] = [this.minHeap[i], this.minHeap[p]];
      i = p;
    }
  }
  
  popMin() {
    const min = this.minHeap[0];
    this.minHeap[0] = this.minHeap.pop();
    let i = 0;
    while (true) {
      let smallest = i, l = 2*i+1, r = 2*i+2;
      if (l < this.minHeap.length && this.minHeap[l] < this.minHeap[smallest]) smallest = l;
      if (r < this.minHeap.length && this.minHeap[r] < this.minHeap[smallest]) smallest = r;
      if (smallest === i) break;
      [this.minHeap[i], this.minHeap[smallest]] = [this.minHeap[smallest], this.minHeap[i]];
      i = smallest;
    }
    return min;
  }
  
  // Max heap operations (using negation)
  pushMax(val) {
    this.maxHeap.push(-val);
    let i = this.maxHeap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.maxHeap[p] <= this.maxHeap[i]) break;
      [this.maxHeap[p], this.maxHeap[i]] = [this.maxHeap[i], this.maxHeap[p]];
      i = p;
    }
  }
  
  popMax() {
    const max = -this.maxHeap[0];
    this.maxHeap[0] = this.maxHeap.pop();
    let i = 0;
    while (true) {
      let smallest = i, l = 2*i+1, r = 2*i+2;
      if (l < this.maxHeap.length && this.maxHeap[l] < this.maxHeap[smallest]) smallest = l;
      if (r < this.maxHeap.length && this.maxHeap[r] < this.maxHeap[smallest]) smallest = r;
      if (smallest === i) break;
      [this.maxHeap[i], this.maxHeap[smallest]] = [this.maxHeap[smallest], this.maxHeap[i]];
      i = smallest;
    }
    return max;
  }
  
  addNum(num) {
    visit(this.maxHeap.length + this.minHeap.length);
    
    // Add to maxHeap first
    this.pushMax(num);
    log(\`Add \${num}\`);
    
    // Balance: move max of lower half to upper half
    this.pushMin(this.popMax());
    
    // Keep sizes balanced
    if (this.minHeap.length > this.maxHeap.length) {
      this.pushMax(this.popMin());
    }
    
    log(\`  Lower half max: \${-this.maxHeap[0]}, Upper half min: \${this.minHeap[0]}\`);
  }
  
  findMedian() {
    if (this.maxHeap.length > this.minHeap.length) {
      const median = -this.maxHeap[0];
      mark(0, 'found');
      log(\`Median: \${median}\`);
      return median;
    }
    const median = (-this.maxHeap[0] + this.minHeap[0]) / 2;
    mark(0, 'found');
    log(\`Median: \${median}\`);
    return median;
  }
}

// Demo
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
log(\`Median: \${mf.findMedian()}\`); // 1.5
mf.addNum(3);
log(\`Median: \${mf.findMedian()}\`); // 2
`,

    java: `// Median of Data Stream - Java
import java.util.*;

public class MedianFinder {
    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    
    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }
    
    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
    
    public static void main(String[] args) {
        MedianFinder mf = new MedianFinder();
        mf.addNum(1); mf.addNum(2);
        System.out.println("Median: " + mf.findMedian());
        mf.addNum(3);
        System.out.println("Median: " + mf.findMedian());
    }
}
`,

    python: `# Median of Data Stream - Python
import heapq

class MedianFinder:
    def __init__(self):
        self.max_heap = []  # Negated values for max behavior
        self.min_heap = []
    
    def add_num(self, num):
        heapq.heappush(self.max_heap, -num)
        heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        
        if len(self.min_heap) > len(self.max_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))
    
    def find_median(self):
        if len(self.max_heap) > len(self.min_heap):
            return -self.max_heap[0]
        return (-self.max_heap[0] + self.min_heap[0]) / 2


mf = MedianFinder()
mf.add_num(1)
mf.add_num(2)
print(f"Median: {mf.find_median()}")  # 1.5
mf.add_num(3)
print(f"Median: {mf.find_median()}")  # 2
`,

    cpp: `// Median of Data Stream - C++
#include <iostream>
#include <queue>
using namespace std;

class MedianFinder {
    priority_queue<int> maxHeap;
    priority_queue<int, vector<int>, greater<int>> minHeap;
public:
    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        }
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};

int main() {
    MedianFinder mf;
    mf.addNum(1); mf.addNum(2);
    cout << "Median: " << mf.findMedian() << endl;
    mf.addNum(3);
    cout << "Median: " << mf.findMedian() << endl;
    return 0;
}
`,

    go: `// Median of Data Stream - Go
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
func (h *MaxHeap) Pop() interface{} { old := *h; n := len(old); x := old[n-1]; *h = old[0:n-1]; return x }

type MinHeap []int
func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() interface{} { old := *h; n := len(old); x := old[n-1]; *h = old[0:n-1]; return x }

type MedianFinder struct {
    maxH *MaxHeap
    minH *MinHeap
}

func Constructor() MedianFinder {
    maxH, minH := &MaxHeap{}, &MinHeap{}
    heap.Init(maxH); heap.Init(minH)
    return MedianFinder{maxH, minH}
}

func (mf *MedianFinder) AddNum(num int) {
    heap.Push(mf.maxH, num)
    heap.Push(mf.minH, heap.Pop(mf.maxH))
    if mf.minH.Len() > mf.maxH.Len() {
        heap.Push(mf.maxH, heap.Pop(mf.minH))
    }
}

func (mf *MedianFinder) FindMedian() float64 {
    if mf.maxH.Len() > mf.minH.Len() {
        return float64((*mf.maxH)[0])
    }
    return float64((*mf.maxH)[0]+(*mf.minH)[0]) / 2.0
}

func main() {
    mf := Constructor()
    mf.AddNum(1); mf.AddNum(2)
    fmt.Printf("Median: %.1f\\n", mf.FindMedian())
}
`,
  },
};
