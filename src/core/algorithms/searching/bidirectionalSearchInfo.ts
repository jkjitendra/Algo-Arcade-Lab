import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Bidirectional Search algorithm info card data
 */
export const bidirectionalSearchInfo: AlgorithmInfo = {
  id: "bidirectional-search",
  name: "Bidirectional Search",
  description:
    "Bidirectional Search is an optimization of Linear Search that searches from both ends of the array simultaneously. On average, it finds the target in half the time of standard linear search.",
  howItWorks:
    "Initialize two pointers: one at the start (left) and one at the end (right). In each iteration, check both positions. If the target is found at either position, return that index. Otherwise, move both pointers toward the center until they meet.",
  keyInsight:
    "If the target is equally likely to be anywhere in the array, searching from both ends halves the expected number of comparisons.",
  bestFor: [
    "Unsorted arrays where target location is unknown",
    "When target might be near either end",
    "Reducing average search time",
    "Simple optimization over linear search",
  ],
  avoidWhen: [
    "You know the target is likely near the beginning",
    "Array is sorted (use Binary Search)",
    "Memory access patterns matter (less cache-friendly)",
  ],
  funFact:
    "Bidirectional Search is often used as a simple first optimization before implementing more complex algorithms. It's particularly effective when searching for elements that are frequently at the ends of arrays!",
  optimizationTips: [
    "Can be combined with parallel processing for even faster search",
    "Consider the expected position of targets when choosing search direction",
    "For sorted arrays, use Binary Search instead",
  ],
  tags: ["Bidirectional", "Dual Pointer", "O(n/2)", "Optimized"],
};
