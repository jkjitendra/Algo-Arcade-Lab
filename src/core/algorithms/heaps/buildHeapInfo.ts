import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const buildHeapInfo: AlgorithmInfo = {
  id: "build-heap",
  name: "Build Heap",
  description:
    "Build Heap is an efficient algorithm to convert an arbitrary array into a heap (max-heap or min-heap). It works bottom-up, starting from the last non-leaf node.",
  howItWorks:
    "1. Start from the last non-leaf node (index n/2 - 1). \n2. Perform 'heapify' (bubble down) on each node up to the root. \n3. This ensures every subtree satisfies the heap property.",
  keyInsight:
    "Although 'heapifying' a single node takes O(log n), most nodes have small heights. The sum of heights converges to O(n), making it faster than O(n log n) insertions.",
  bestFor: [
    "Initializing a priority queue from an existing list",
    "Heap Sort (first step)",
    "Finding top k elements efficiently",
  ],
  avoidWhen: [
    "Data arrives one by one (use regular Insert)",
    "Array is already sorted (still O(n) checks)",
  ],
  funFact:
    "While N insertions take O(N log N), Floyd's build heap algorithm proved that you can do it in linear time O(N). It's a classic example where precise analysis beats intuition.",
  optimizationTips: [
    "Always use the O(n) build heap approach when you have all data upfront, rather than inserting one by one.",
  ],
  tags: ["Heap Construction", "O(n) Algorithm", "Floyd's Algorithm"],
};
