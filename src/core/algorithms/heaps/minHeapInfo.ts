import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const minHeapInfo: AlgorithmInfo = {
  id: "min-heap",
  name: "Min Heap",
  description:
    "A Min Heap is a complete binary tree where the value of each node is less than or equal to the values of its children. The root node always contains the minimum element.",
  howItWorks:
    "1. **Insert**: Add to end, then 'bubble up' until heap property is restored. \n2. **Extract Min**: Remove root (min), move last element to root, then 'bubble down'. \n3. **Peek**: Return the root element.",
  keyInsight:
    "By maintaining the min-heap property (parent ≤ children), we can access the minimum element in O(1) time and modify the heap in O(log n) time.",
  bestFor: [
    "Priority Queues (min priority)",
    "Graph algorithms (Dijkstra's, Prim's)",
    "Finding the k-th largest element (using a heap of size k)",
  ],
  avoidWhen: [
    "Searching for arbitrary elements (O(n) search time)",
    "Sorted traversal is needed (needs O(n log n) sorting)",
  ],
  funFact:
    "The 'heap' memory in programming languages (for dynamic allocation) has nothing to do with the heap data structure! It's just a pile of memory.",
  optimizationTips: [
    "Building a heap from an array can be done in O(n) time, faster than O(n log n) insertions.",
  ],
  tags: ["Priority Queue", "Complete Binary Tree", "Array Implementation"],
};
