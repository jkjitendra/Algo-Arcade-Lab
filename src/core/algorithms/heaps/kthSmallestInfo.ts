import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const kthSmallestInfo: AlgorithmInfo = {
  id: "kth-smallest",
  name: "K-th Smallest Element",
  description:
    "Finds the k-th smallest element in an unsorted array. This uses a Max Heap of size k to keep track of the k smallest elements seen so far.",
  howItWorks:
    "1. Maintain a max-heap of size k. \n2. Iterate through the array. \n3. If heap size < k, add element. \n4. If heap full and element < heap root, replace root with element. \n5. The root of the max-heap is the k-th smallest element.",
  keyInsight:
    "To find the smallest elements, we use a MAX heap to easily discard the largest among our current candidates.",
  bestFor: [
    "Finding lowest prices/scores",
    "KNN (K-Nearest Neighbors) algorithms",
    "Data streams where finding the minimum k items is needed",
  ],
  avoidWhen: [
    "You need the entire sorted order",
    "k is very large (approaching n)",
  ],
  funFact:
    "The names are counter-intuitive: use Min-Heap for k-th Largest, and Max-Heap for k-th Smallest. It's because the root acts as the 'gatekeeper' for the collection.",
  optimizationTips: [
    "For k=1, just use a linear scan (O(n)). Heaps are best for k > 1.",
  ],
  tags: ["Heap Selection", "Stream Processing", "O(n log k)"],
};
