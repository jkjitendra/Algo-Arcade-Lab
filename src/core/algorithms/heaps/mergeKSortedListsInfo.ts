import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const mergeKSortedListsInfo: AlgorithmInfo = {
  id: "merge-k-sorted-lists",
  name: "Merge K Sorted Lists",
  description:
    "Merges K sorted lists into a single sorted list. It uses a min-heap to efficiently select the smallest current element from all K lists.",
  howItWorks:
    "1. Insert the first element of each list into a Min Heap (annotated with its source list). \n2. Extract min (root) -> add to result. \n3. Insert the next element from the extracted element's source list. \n4. Repeat until heap is empty.",
  keyInsight:
    "At any point, we only need to compare the 'heads' of the K lists. A min-heap allows us to find the minimum of K items and update it in O(log K) time.",
  bestFor: [
    "External sorting (merging chunks from disk)",
    "Combining multiple sorted data streams (e.g., logs from different servers)",
  ],
  avoidWhen: [
    "K is 1 or 2 (simple merge is sufficient)",
    "Lists are not sorted (must sort them first)",
  ],
  funFact:
    "This is the core mechanic behind how databases perform Sort-Merge Joins and how massive datasets (terabytes) are sorted using limited RAM.",
  optimizationTips: [
    "The complexity is O(N log K), where N is total elements. If K is small, this is extremely fast.",
  ],
  tags: ["Divide and Conquer", "External Sorting", "O(N log K)"],
};
