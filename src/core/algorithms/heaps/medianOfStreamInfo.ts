import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const medianOfStreamInfo: AlgorithmInfo = {
  id: "median-of-stream",
  name: "Median of Stream",
  description:
    "Maintains the running median of a continuous stream of numbers. It effectively balances the data into two halves using two heaps.",
  howItWorks:
    "1. Use a **Max-Heap for the left/smaller half** and a **Min-Heap for the right/larger half**. \n2. Maintain balance so heaps differ in size by at most 1. \n3. Median is either the top of the larger heap or the average of both tops.",
  keyInsight:
    "The median is purely defined by the middle element(s). We don't need the rest of the array to be fully sorted, just split into 'small' and 'large' halves.",
  bestFor: [
    "Real-time sensor data smoothing",
    "Financial tickers (running median price)",
    "Load balancing metrics",
  ],
  avoidWhen: [
    "Data is static (sorting once is simpler)",
    "You need arbitrary percentiles (O(1) approach not possible)",
  ],
  funFact:
    "This pattern is a specific case of the 'Dual Heap' pattern. You can generalize it to find any percentile by adjusting the size ratio of the two heaps.",
  optimizationTips: [
    "Always insert into one heap and move to the other to ensure order, then rebalance. This avoids complex conditional logic.",
  ],
  tags: ["Two Heaps", "Dynamic Data", "Running Median"],
};
