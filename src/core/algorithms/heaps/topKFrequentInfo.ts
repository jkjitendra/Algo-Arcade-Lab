import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const topKFrequentInfo: AlgorithmInfo = {
  id: "top-k-frequent",
  name: "Top K Frequent Elements",
  description:
    "Finds the k most frequent elements in an array. It combines a frequency map (Hashtable) with a Min Heap for selection.",
  howItWorks:
    "1. Count frequencies of all elements using a hash map. \n2. Iterate through the unique elements. \n3. Maintain a min-heap of size k storing (frequency, element). \n4. If a new element has higher frequency than root, replace root.",
  keyInsight:
    "Using a hash map gives O(1) frequency lookups. Using a min-heap of size k allows us to keep the 'top k' winners while discarding losers in O(log k) time.",
  bestFor: [
    "Trending topics analysis (hashtags, search queries)",
    "Most popular products/songs",
    "Detecting anomalies/frequent patterns in logs",
  ],
  avoidWhen: [
    "You need exact rankings for ALL items (just sort by count)",
    "Memory is extremely limited (hash map takes O(n) space)",
  ],
  funFact:
    "While this implementation is O(N log k), you can actually achieve O(N) using Bucket Sort (if frequencies are bounded) or QuickSelect!",
  optimizationTips: [
    "The heap only needs to store k items. For top 10 items out of 1 million, the heap operations are effectively constant time.",
  ],
  tags: ["Frequency Analysis", "Hash Map + Heap", "Data Mining"],
};
