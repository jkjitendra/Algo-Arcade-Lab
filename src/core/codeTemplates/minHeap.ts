import { AlgorithmCodeTemplates } from './types';

export const minHeapCode: AlgorithmCodeTemplates = {
  algorithmId: 'min-heap',
  algorithmName: 'Min Heap',
  category: 'heaps',
  templates: {
    javascript: `// Min Heap Implementation - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)

class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  parent(i) { return Math.floor((i - 1) / 2); }
  leftChild(i) { return 2 * i + 1; }
  rightChild(i) { return 2 * i + 2; }
  
  swap(i, j) {
    swap(i, j);
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  
  insert(val) {
    this.heap.push(val);
    log(\`Insert \${val}\`);
    this.heapifyUp(this.heap.length - 1);
    log(\`Heap: [\${this.heap.join(', ')}]\`);
  }
  
  heapifyUp(i) {
    while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
      visit(i);
      compare(this.parent(i), i);
      log(\`  Swap \${this.heap[i]} with parent \${this.heap[this.parent(i)]}\`);
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
    mark(i, 'found');
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    log(\`Extract min: \${min}\`);
    if (this.heap.length > 0) this.heapifyDown(0);
    return min;
  }
  
  heapifyDown(i) {
    let minIdx = i;
    const left = this.leftChild(i);
    const right = this.rightChild(i);
    
    if (left < this.heap.length && this.heap[left] < this.heap[minIdx]) {
      minIdx = left;
    }
    if (right < this.heap.length && this.heap[right] < this.heap[minIdx]) {
      minIdx = right;
    }
    
    if (minIdx !== i) {
      compare(i, minIdx);
      this.swap(i, minIdx);
      this.heapifyDown(minIdx);
    }
  }
  
  peek() { return this.heap[0]; }
  size() { return this.heap.length; }
}

// Demo
const heap = new MinHeap();
[4, 10, 3, 5, 1, 8, 2].forEach(v => heap.insert(v));
log(\`Min: \${heap.extractMin()}\`);
log(\`Heap after extract: [\${heap.heap.join(', ')}]\`);
`,

    java: `// Min Heap - Java
import java.util.*;

public class MinHeap {
    private List<Integer> heap = new ArrayList<>();
    
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }
    
    void insert(int val) {
        heap.add(val);
        heapifyUp(heap.size() - 1);
    }
    
    void heapifyUp(int i) {
        while (i > 0 && heap.get(parent(i)) > heap.get(i)) {
            Collections.swap(heap, i, parent(i));
            i = parent(i);
        }
    }
    
    int extractMin() {
        int min = heap.get(0);
        heap.set(0, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) heapifyDown(0);
        return min;
    }
    
    void heapifyDown(int i) {
        int minIdx = i, l = left(i), r = right(i);
        if (l < heap.size() && heap.get(l) < heap.get(minIdx)) minIdx = l;
        if (r < heap.size() && heap.get(r) < heap.get(minIdx)) minIdx = r;
        if (minIdx != i) { Collections.swap(heap, i, minIdx); heapifyDown(minIdx); }
    }
    
    public static void main(String[] args) {
        // Java has PriorityQueue as min-heap by default
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int v : new int[]{4, 10, 3, 5}) pq.add(v);
        System.out.println("Min: " + pq.poll());
    }
}
`,

    python: `# Min Heap - Python
import heapq

# Python's heapq is a min-heap by default
class MinHeap:
    def __init__(self):
        self.heap = []
    
    def insert(self, val):
        heapq.heappush(self.heap, val)
    
    def extract_min(self):
        return heapq.heappop(self.heap) if self.heap else None
    
    def peek(self):
        return self.heap[0] if self.heap else None


h = MinHeap()
for v in [4, 10, 3, 5, 1]:
    h.insert(v)

print(f"Min: {h.extract_min()}")  # 1
print(f"Min: {h.extract_min()}")  # 3
`,

    cpp: `// Min Heap - C++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class MinHeap {
    vector<int> heap;
    
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }
    
    void heapifyUp(int i) {
        while (i > 0 && heap[parent(i)] > heap[i]) {
            swap(heap[i], heap[parent(i)]);
            i = parent(i);
        }
    }
    
    void heapifyDown(int i) {
        int minIdx = i, l = left(i), r = right(i);
        if (l < heap.size() && heap[l] < heap[minIdx]) minIdx = l;
        if (r < heap.size() && heap[r] < heap[minIdx]) minIdx = r;
        if (minIdx != i) { swap(heap[i], heap[minIdx]); heapifyDown(minIdx); }
    }
public:
    void insert(int val) { heap.push_back(val); heapifyUp(heap.size() - 1); }
    int extractMin() {
        int min = heap[0];
        heap[0] = heap.back(); heap.pop_back();
        if (!heap.empty()) heapifyDown(0);
        return min;
    }
};

int main() {
    // C++ priority_queue is max-heap by default, use greater<int> for min-heap
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int v : {4, 10, 3, 5}) pq.push(v);
    cout << "Min: " << pq.top() << endl; pq.pop();
    return 0;
}
`,

    go: `// Min Heap - Go
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
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func main() {
    h := &MinHeap{4, 10, 3, 5}
    heap.Init(h)
    heap.Push(h, 1)
    fmt.Printf("Min: %d\\n", heap.Pop(h))
}
`,
  },
};
