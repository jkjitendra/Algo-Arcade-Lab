import { AlgorithmCodeTemplates } from './types';

export const priorityQueueCode: AlgorithmCodeTemplates = {
  algorithmId: 'priority-queue',
  algorithmName: 'Priority Queue',
  category: 'queues',
  templates: {
    javascript: `// Priority Queue (Min Heap) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  
  parent(i) { return Math.floor((i - 1) / 2); }
  leftChild(i) { return 2 * i + 1; }
  rightChild(i) { return 2 * i + 2; }
  
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  
  insert(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;
    visit(i);
    mark(i, 'current');
    log(\`Insert \${value}\`);
    
    // Bubble up
    while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
      compare(i, this.parent(i));
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
    
    this.print();
  }
  
  extractMin() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    log(\`Extract min: \${min}\`);
    this.heapify(0);
    return min;
  }
  
  heapify(i) {
    const left = this.leftChild(i);
    const right = this.rightChild(i);
    let smallest = i;
    
    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }
    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }
    
    if (smallest !== i) {
      compare(i, smallest);
      this.swap(i, smallest);
      this.heapify(smallest);
    }
  }
  
  peek() {
    return this.heap[0];
  }
  
  print() {
    log(\`Heap: [\${this.heap.join(', ')}]\`);
  }
}

// Demo
const pq = new PriorityQueue();
pq.insert(5);
pq.insert(3);
pq.insert(8);
pq.insert(1);
pq.insert(6);

log(\`Min: \${pq.peek()}\`);
pq.extractMin();
pq.extractMin();
pq.print();
`,

    java: `// Priority Queue - Java
import java.util.*;

public class PriorityQueueDemo {
    public static void main(String[] args) {
        // Min heap (default)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        minHeap.offer(5);
        minHeap.offer(3);
        minHeap.offer(8);
        minHeap.offer(1);
        
        System.out.println("Min Heap: " + minHeap);
        System.out.println("Peek: " + minHeap.peek());
        System.out.println("Poll: " + minHeap.poll());
        System.out.println("After poll: " + minHeap);
        
        // Max heap
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.offer(5);
        maxHeap.offer(3);
        maxHeap.offer(8);
        System.out.println("Max Heap peek: " + maxHeap.peek());
    }
}
`,

    python: `# Priority Queue - Python
import heapq

# Min heap
min_heap = []
heapq.heappush(min_heap, 5)
heapq.heappush(min_heap, 3)
heapq.heappush(min_heap, 8)
heapq.heappush(min_heap, 1)

print(f"Min Heap: {min_heap}")
print(f"Smallest: {min_heap[0]}")
print(f"Pop: {heapq.heappop(min_heap)}")
print(f"After pop: {min_heap}")

# Max heap (negate values)
max_heap = []
for val in [5, 3, 8, 1]:
    heapq.heappush(max_heap, -val)

print(f"Max: {-max_heap[0]}")
`,

    cpp: `// Priority Queue - C++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    // Max heap (default)
    priority_queue<int> maxHeap;
    maxHeap.push(5);
    maxHeap.push(3);
    maxHeap.push(8);
    maxHeap.push(1);
    
    cout << "Max: " << maxHeap.top() << endl;
    maxHeap.pop();
    cout << "After pop, Max: " << maxHeap.top() << endl;
    
    // Min heap
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(5);
    minHeap.push(3);
    minHeap.push(8);
    
    cout << "Min: " << minHeap.top() << endl;
    
    return 0;
}
`,

    go: `// Priority Queue - Go
package main

import (
    "container/heap"
    "fmt"
)

type MinHeap []int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func main() {
    h := &MinHeap{5, 3, 8, 1}
    heap.Init(h)
    
    fmt.Printf("Min: %d\\n", (*h)[0])
    
    heap.Push(h, 2)
    fmt.Printf("After push 2: %v\\n", *h)
    
    fmt.Printf("Pop: %d\\n", heap.Pop(h))
    fmt.Printf("After pop: %v\\n", *h)
}
`,
  },
};
