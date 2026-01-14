import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const kthLargestInfo: AlgorithmInfo = {
  id: "kth-largest",
  name: "K-th Largest Element",
  description:
    "Finds the k-th largest element in an unsorted array. This uses a Min Heap of size k to keep track of the k largest elements seen so far.",
  howItWorks:
    "1. Maintain a min-heap of size k. \n2. Iterate through the array. \n3. If heap size < k, add element. \n4. If heap full and element > heap root, replace root with element. \n5. The root of the min-heap is the k-th largest element.",
  keyInsight:
    "We don't need to sort the entire array (O(n log n)). By maintaining only the top k elements, we reduce complexity to O(n log k).",
  bestFor: [
    "Large data streams where k is small",
    "Real-time leaderboards (top 10 players)",
    "Finding percentiles (e.g., 90th percentile ≈ top 10%)",
  ],
  avoidWhen: [
    "k is close to n (sorting might be simpler)",
    "Array is already sorted",
  ],
  funFact:
    "This is superior to sorting the whole array when k << n. For finding the median (k=n/2), stricter linear-time selection algorithms (QuickSelect) exist, but heaps are more consistent.",
  optimizationTips: [
    "If k is small (e.g., top 3), the O(n log k) overhead is negligible.",
  ],
  tags: ["Heap Selection", "Stream Processing", "O(n log k)"],
};
