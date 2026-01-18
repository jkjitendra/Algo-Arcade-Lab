import { AlgorithmCodeTemplates } from './types';

export const maxHeapCode: AlgorithmCodeTemplates = {
  algorithmId: 'max-heap',
  algorithmName: 'Max Heap',
  category: 'heaps',
  templates: {
    javascript: `// Max Heap Implementation - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)

class MaxHeap {
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
    while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
      visit(i);
      compare(this.parent(i), i);
      log(\`  Swap \${this.heap[i]} with parent \${this.heap[this.parent(i)]}\`);
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
    mark(i, 'found');
  }
  
  extractMax() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    log(\`Extract max: \${max}\`);
    this.heapifyDown(0);
    return max;
  }
  
  heapifyDown(i) {
    let maxIdx = i;
    const left = this.leftChild(i);
    const right = this.rightChild(i);
    
    if (left < this.heap.length && this.heap[left] > this.heap[maxIdx]) {
      maxIdx = left;
    }
    if (right < this.heap.length && this.heap[right] > this.heap[maxIdx]) {
      maxIdx = right;
    }
    
    if (maxIdx !== i) {
      compare(i, maxIdx);
      this.swap(i, maxIdx);
      this.heapifyDown(maxIdx);
    }
  }
  
  peek() { return this.heap[0]; }
  size() { return this.heap.length; }
}

// Demo
const heap = new MaxHeap();
[4, 10, 3, 5, 1, 8, 2].forEach(v => heap.insert(v));
log(\`Max: \${heap.extractMax()}\`);
log(\`Heap after extract: [\${heap.heap.join(', ')}]\`);
`,

    java: `// Max Heap - Java
import java.util.*;

public class MaxHeap {
    private List<Integer> heap = new ArrayList<>();
    
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }
    
    void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }
    
    void insert(int val) {
        heap.add(val);
        heapifyUp(heap.size() - 1);
    }
    
    void heapifyUp(int i) {
        while (i > 0 && heap.get(parent(i)) < heap.get(i)) {
            swap(i, parent(i));
            i = parent(i);
        }
    }
    
    int extractMax() {
        if (heap.isEmpty()) return -1;
        int max = heap.get(0);
        heap.set(0, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);
        heapifyDown(0);
        return max;
    }
    
    void heapifyDown(int i) {
        int maxIdx = i;
        int l = left(i), r = right(i);
        if (l < heap.size() && heap.get(l) > heap.get(maxIdx)) maxIdx = l;
        if (r < heap.size() && heap.get(r) > heap.get(maxIdx)) maxIdx = r;
        if (maxIdx != i) { swap(i, maxIdx); heapifyDown(maxIdx); }
    }
    
    public static void main(String[] args) {
        MaxHeap h = new MaxHeap();
        for (int v : new int[]{4, 10, 3, 5}) h.insert(v);
        System.out.println("Max: " + h.extractMax());
    }
}
`,

    python: `# Max Heap - Python
import heapq

class MaxHeap:
    def __init__(self):
        self.heap = []
    
    def insert(self, val):
        heapq.heappush(self.heap, -val)  # Negate for max heap
    
    def extract_max(self):
        return -heapq.heappop(self.heap) if self.heap else None
    
    def peek(self):
        return -self.heap[0] if self.heap else None


# Using custom implementation
class MaxHeapManual:
    def __init__(self):
        self.heap = []
    
    def parent(self, i): return (i - 1) // 2
    def left(self, i): return 2 * i + 1
    def right(self, i): return 2 * i + 2
    
    def insert(self, val):
        self.heap.append(val)
        self._heapify_up(len(self.heap) - 1)
    
    def _heapify_up(self, i):
        while i > 0 and self.heap[self.parent(i)] < self.heap[i]:
            self.heap[i], self.heap[self.parent(i)] = self.heap[self.parent(i)], self.heap[i]
            i = self.parent(i)
    
    def extract_max(self):
        if not self.heap: return None
        max_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        if self.heap: self._heapify_down(0)
        return max_val
    
    def _heapify_down(self, i):
        max_idx = i
        l, r = self.left(i), self.right(i)
        if l < len(self.heap) and self.heap[l] > self.heap[max_idx]: max_idx = l
        if r < len(self.heap) and self.heap[r] > self.heap[max_idx]: max_idx = r
        if max_idx != i:
            self.heap[i], self.heap[max_idx] = self.heap[max_idx], self.heap[i]
            self._heapify_down(max_idx)


h = MaxHeapManual()
for v in [4, 10, 3, 5]: h.insert(v)
print(f"Max: {h.extract_max()}")
`,

    cpp: `// Max Heap - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class MaxHeap {
    vector<int> heap;
    
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }
    
    void heapifyUp(int i) {
        while (i > 0 && heap[parent(i)] < heap[i]) {
            swap(heap[i], heap[parent(i)]);
            i = parent(i);
        }
    }
    
    void heapifyDown(int i) {
        int maxIdx = i, l = left(i), r = right(i);
        if (l < heap.size() && heap[l] > heap[maxIdx]) maxIdx = l;
        if (r < heap.size() && heap[r] > heap[maxIdx]) maxIdx = r;
        if (maxIdx != i) { swap(heap[i], heap[maxIdx]); heapifyDown(maxIdx); }
    }
public:
    void insert(int val) { heap.push_back(val); heapifyUp(heap.size() - 1); }
    int extractMax() {
        int max = heap[0];
        heap[0] = heap.back(); heap.pop_back();
        heapifyDown(0);
        return max;
    }
};

int main() {
    MaxHeap h; for (int v : {4, 10, 3, 5}) h.insert(v);
    cout << "Max: " << h.extractMax() << endl; return 0;
}
`,

    go: `// Max Heap - Go
package main

import "fmt"

type MaxHeap struct { heap []int }

func (h *MaxHeap) parent(i int) int { return (i - 1) / 2 }
func (h *MaxHeap) left(i int) int   { return 2*i + 1 }
func (h *MaxHeap) right(i int) int  { return 2*i + 2 }

func (h *MaxHeap) Insert(val int) {
    h.heap = append(h.heap, val)
    h.heapifyUp(len(h.heap) - 1)
}

func (h *MaxHeap) heapifyUp(i int) {
    for i > 0 && h.heap[h.parent(i)] < h.heap[i] {
        h.heap[i], h.heap[h.parent(i)] = h.heap[h.parent(i)], h.heap[i]
        i = h.parent(i)
    }
}

func (h *MaxHeap) ExtractMax() int {
    max := h.heap[0]
    h.heap[0] = h.heap[len(h.heap)-1]
    h.heap = h.heap[:len(h.heap)-1]
    h.heapifyDown(0)
    return max
}

func (h *MaxHeap) heapifyDown(i int) {
    maxIdx, l, r := i, h.left(i), h.right(i)
    if l < len(h.heap) && h.heap[l] > h.heap[maxIdx] { maxIdx = l }
    if r < len(h.heap) && h.heap[r] > h.heap[maxIdx] { maxIdx = r }
    if maxIdx != i { h.heap[i], h.heap[maxIdx] = h.heap[maxIdx], h.heap[i]; h.heapifyDown(maxIdx) }
}

func main() {
    h := &MaxHeap{}
    for _, v := range []int{4, 10, 3, 5} { h.Insert(v) }
    fmt.Printf("Max: %d\\n", h.ExtractMax())
}
`,
  },
};
