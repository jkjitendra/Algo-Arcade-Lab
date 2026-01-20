import { AlgorithmCodeTemplates } from './types';

export const mergeKSortedListsCode: AlgorithmCodeTemplates = {
  algorithmId: 'merge-k-sorted-lists',
  algorithmName: 'Merge K Sorted Lists',
  category: 'heaps',
  templates: {
    javascript: `// Merge K Sorted Lists - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function mergeKLists(lists) {
  log(\`Merging \${lists.length} sorted lists\`);
  
  // Min-heap implementation
  const heap = [];
  
  function heapifyUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (heap[p].val <= heap[i].val) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  }
  
  function heapifyDown(i) {
    while (true) {
      let min = i, l = 2*i+1, r = 2*i+2;
      if (l < heap.length && heap[l].val < heap[min].val) min = l;
      if (r < heap.length && heap[r].val < heap[min].val) min = r;
      if (min === i) break;
      [heap[i], heap[min]] = [heap[min], heap[i]];
      i = min;
    }
  }
  
  // Add first node from each list
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) {
      heap.push(lists[i]);
      heapifyUp(heap.length - 1);
    }
  }
  
  const dummy = new ListNode(0);
  let current = dummy;
  let step = 0;
  
  while (heap.length > 0) {
    visit(step);
    
    // Extract min
    const minNode = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    if (heap.length) heapifyDown(0);
    
    current.next = minNode;
    current = current.next;
    log(\`Add \${minNode.val}\`);
    mark(step, 'found');
    
    // Add next from same list
    if (minNode.next) {
      heap.push(minNode.next);
      heapifyUp(heap.length - 1);
    }
    
    step++;
  }
  
  return dummy.next;
}

// Demo
const l1 = new ListNode(1); l1.next = new ListNode(4); l1.next.next = new ListNode(5);
const l2 = new ListNode(1); l2.next = new ListNode(3); l2.next.next = new ListNode(4);
const l3 = new ListNode(2); l3.next = new ListNode(6);

const merged = mergeKLists([l1, l2, l3]);
let result = [];
let curr = merged;
while (curr) { result.push(curr.val); curr = curr.next; }
log(\`Result: [\${result.join(', ')}]\`);
`,

    java: `// Merge K Sorted Lists - Java
import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class MergeKSortedLists {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);
        
        for (ListNode list : lists) {
            if (list != null) heap.offer(list);
        }
        
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        while (!heap.isEmpty()) {
            ListNode min = heap.poll();
            current.next = min;
            current = current.next;
            if (min.next != null) heap.offer(min.next);
        }
        
        return dummy.next;
    }
}
`,

    python: `# Merge K Sorted Lists - Python
import heapq

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def merge_k_lists(lists):
    heap = []
    
    # Add first node from each list
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    
    dummy = ListNode(0)
    current = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next


# Demo
l1 = ListNode(1); l1.next = ListNode(4)
l2 = ListNode(1); l2.next = ListNode(3)
l3 = ListNode(2); l3.next = ListNode(6)

merged = merge_k_lists([l1, l2, l3])
result = []
while merged:
    result.append(merged.val)
    merged = merged.next
print(f"Merged: {result}")
`,

    cpp: `// Merge K Sorted Lists - C++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> heap(cmp);
    
    for (auto list : lists) {
        if (list) heap.push(list);
    }
    
    ListNode dummy(0);
    ListNode* current = &dummy;
    
    while (!heap.empty()) {
        ListNode* min = heap.top(); heap.pop();
        current->next = min;
        current = current->next;
        if (min->next) heap.push(min->next);
    }
    
    return dummy.next;
}
`,

    go: `// Merge K Sorted Lists - Go
package main

import (
    "container/heap"
    "fmt"
)

type ListNode struct {
    Val  int
    Next *ListNode
}

type NodeHeap []*ListNode

func (h NodeHeap) Len() int           { return len(h) }
func (h NodeHeap) Less(i, j int) bool { return h[i].Val < h[j].Val }
func (h NodeHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *NodeHeap) Push(x interface{}) { *h = append(*h, x.(*ListNode)) }
func (h *NodeHeap) Pop() interface{} {
    old := *h; n := len(old); x := old[n-1]; *h = old[0:n-1]; return x
}

func mergeKLists(lists []*ListNode) *ListNode {
    h := &NodeHeap{}
    heap.Init(h)
    
    for _, list := range lists {
        if list != nil { heap.Push(h, list) }
    }
    
    dummy := &ListNode{}
    current := dummy
    
    for h.Len() > 0 {
        min := heap.Pop(h).(*ListNode)
        current.Next = min
        current = current.Next
        if min.Next != nil { heap.Push(h, min.Next) }
    }
    
    return dummy.Next
}

func main() {
    fmt.Println("Merge K Sorted Lists")
}
`,
  },
};
