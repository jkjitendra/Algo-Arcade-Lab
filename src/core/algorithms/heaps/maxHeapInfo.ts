import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const maxHeapInfo: AlgorithmInfo = {
  id: "max-heap",
  name: "Max Heap",
  description:
    "A Max Heap is a complete binary tree where the value of each node is greater than or equal to the values of its children. The root node always contains the maximum element.",
  howItWorks:
    "1. **Insert**: Add to end, then 'bubble up' until heap property is restored. \n2. **Extract Max**: Remove root (max), move last element to root, then 'bubble down'. \n3. **Peek**: Return the root element.",
  keyInsight:
    "By maintaining the max-heap property (parent ≥ children), we can access the maximum element in O(1) time and modify the heap in O(log n) time.",
  bestFor: [
    "Priority Queues (max priority)",
    "Scheduling systems",
    "Finding the k-th smallest element (using a heap of size k)",
  ],
  avoidWhen: [
    "Searching for arbitrary elements (O(n) search time)",
    "Sorted traversal is needed (needs O(n log n) sorting)",
  ],
  funFact:
    "Heaps are efficiently implemented using arrays. For a node at index i, its children are at 2i+1 and 2i+2, and its parent is at floor((i-1)/2).",
  optimizationTips: [
    "Use a binary heap for simplicity and good cache locality.",
    "For very large datasets, consider Fibonacci heaps for faster theoretical extract-min times.",
  ],
  tags: ["Priority Queue", "Complete Binary Tree", "Array Implementation"],
};
